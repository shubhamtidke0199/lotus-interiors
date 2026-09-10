import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdminApi } from "@/lib/admin/auth";
import { createId } from "@/lib/cms/format";

const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Please choose an image to upload." }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: "Images must be 2 MB or smaller." }, { status: 400 });
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
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), buffer);

  return Response.json({ url: `/uploads/${filename}` }, { status: 201 });
}
