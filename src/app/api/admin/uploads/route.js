import { requireAdminApi } from "@/lib/admin/auth";
import { createId } from "@/lib/cms/format";
import { PRODUCT_IMAGES_BUCKET, storagePathFromPublicUrl } from "@/lib/cms/images";
import {
  getStorageDriver,
  getSupabaseAdmin,
  isSupabaseConfigured,
} from "@/lib/cms/supabase";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const BUCKET = PRODUCT_IMAGES_BUCKET;
const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function requireSupabaseUploads() {
  if (getStorageDriver() === "file") {
    return Response.json(
      {
        error:
          "Local file uploads are disabled. Remove CMS_STORAGE=file and configure Supabase so images go to Storage.",
      },
      { status: 503 },
    );
  }

  if (!isSupabaseConfigured()) {
    return Response.json(
      {
        error:
          "Supabase is required for uploads. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env, then restart the server.",
      },
      { status: 503 },
    );
  }

  return null;
}

async function ensureProductImagesBucket(supabase) {
  const { data: existing } = await supabase.storage.getBucket(BUCKET);

  if (existing) {
    await supabase.storage.updateBucket(BUCKET, {
      public: true,
      fileSizeLimit: MAX_UPLOAD_BYTES,
      allowedMimeTypes: Object.keys(ALLOWED_TYPES),
    });
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_UPLOAD_BYTES,
    allowedMimeTypes: Object.keys(ALLOWED_TYPES),
  });

  if (createError && !/already exists|duplicate/i.test(createError.message || "")) {
    throw new Error(
      createError.message || "Unable to create product-images storage bucket.",
    );
  }
}

export async function POST(request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const blocked = requireSupabaseUploads();
  if (blocked) return blocked;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Please choose an image to upload." }, { status: 400 });
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return Response.json(
      { error: "Images must be 10 MB or smaller." },
      { status: 400 },
    );
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return Response.json(
      { error: "Use a JPG, PNG, WebP, or GIF image." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${createId("img-")}.${extension}`;

  try {
    const supabase = getSupabaseAdmin();
    await ensureProductImagesBucket(supabase);

    const objectPath = `products/${filename}`;
    const { error } = await supabase.storage.from(BUCKET).upload(objectPath, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return Response.json(
        { error: error.message || "Upload to Supabase Storage failed." },
        { status: 400 },
      );
    }

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
    if (!data?.publicUrl) {
      return Response.json(
        { error: "Upload succeeded but no public URL was returned." },
        { status: 500 },
      );
    }

    return Response.json({ url: data.publicUrl, storage: "supabase" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message || "Upload to Supabase Storage failed." },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const blocked = requireSupabaseUploads();
  if (blocked) return blocked;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const urls = Array.isArray(body?.urls)
    ? body.urls
    : body?.url
      ? [body.url]
      : [];

  const paths = [
    ...new Set(
      urls
        .map((url) => storagePathFromPublicUrl(url))
        .filter(Boolean),
    ),
  ];

  if (paths.length === 0) {
    return Response.json(
      { error: "No Supabase Storage image URLs were provided." },
      { status: 400 },
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from(BUCKET).remove(paths);
    if (error) {
      return Response.json(
        { error: error.message || "Unable to delete image from Storage." },
        { status: 400 },
      );
    }
    return Response.json({ ok: true, deleted: paths.length });
  } catch (error) {
    return Response.json(
      { error: error.message || "Unable to delete image from Storage." },
      { status: 500 },
    );
  }
}
