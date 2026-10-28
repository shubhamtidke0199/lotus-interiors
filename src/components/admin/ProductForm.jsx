"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import { AdminSectionTitle } from "@/components/admin/AdminField";
import ProductAttributesFields from "@/components/admin/ProductAttributesFields";
import {
  adminBtnDanger,
  adminBtnPrimary,
  adminBtnSecondary,
  adminInput,
  adminLabel,
  adminTextarea,
} from "@/components/admin/adminUi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { definitionsForCategory } from "@/lib/cms/attributes";
import { createId, parsePrice, slugify } from "@/lib/cms/format";
import {
  isSupabaseStorageUrl,
  MAX_GALLERY_IMAGES,
  normalizeGalleryImages,
} from "@/lib/cms/images";

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function formatBytes(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateImageFile(file) {
  if (!file) return "No file selected.";
  if (!ACCEPTED_TYPES.has(file.type)) {
    return `"${file.name}" is not a supported type. Use JPG, PNG, WebP, or GIF.`;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return `"${file.name}" is ${formatBytes(file.size)}. Max size is 10 MB.`;
  }
  return "";
}

function createLocalImage(file) {
  return {
    id: createId("local-"),
    file,
    preview: URL.createObjectURL(file),
    remoteUrl: "",
  };
}

function createRemoteImage(url) {
  return {
    id: createId("remote-"),
    file: null,
    preview: url,
    remoteUrl: url,
  };
}

async function uploadFileToServer(file) {
  const payload = new FormData();
  payload.append("file", file);
  const response = await fetch("/api/admin/uploads", {
    method: "POST",
    body: payload,
  });
  let data = {};
  try {
    data = await response.json();
  } catch {
    throw new Error("Upload failed with an empty server response.");
  }
  if (!response.ok) throw new Error(data.error || `Upload failed (${response.status}).`);
  if (data.storage !== "supabase" || !data.url) {
    throw new Error("Upload did not reach Supabase Storage.");
  }
  return data.url;
}

async function deleteStorageUrls(urls) {
  const remote = [...new Set(urls.filter((url) => isSupabaseStorageUrl(url)))];
  if (!remote.length) return;

  const response = await fetch("/api/admin/uploads", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls: remote }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Unable to delete image from Storage.");
  }
}

export default function ProductForm({ product, categories, attributeDefinitions }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEdit = Boolean(product?.id);
  const errorRef = useRef(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [pendingDeletes, setPendingDeletes] = useState([]);
  const showBusy = busy || isPending;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    originalPrice: product?.originalPrice ?? "",
    salePrice: product?.salePrice ?? "",
    onSale: Boolean(product?.onSale),
    published: product?.published !== false,
    attributes: product?.attributes ?? {},
  });
  const [cover, setCover] = useState(() =>
    product?.image ? createRemoteImage(product.image) : null,
  );
  const [gallery, setGallery] = useState(() =>
    normalizeGalleryImages(product?.images, product ?? {}).map(createRemoteImage),
  );

  const slugHint = useMemo(
    () => (form.slug ? form.slug : slugify(form.name)),
    [form.name, form.slug],
  );

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === form.categoryId) ?? null,
    [categories, form.categoryId],
  );

  const activeDefinitions = useMemo(
    () => definitionsForCategory(attributeDefinitions, selectedCategory),
    [attributeDefinitions, selectedCategory],
  );

  const canAddGalleryImage = gallery.length < MAX_GALLERY_IMAGES;

  useEffect(() => {
    if (!error) return;
    errorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [error]);

  useEffect(() => {
    return () => {
      if (cover?.file && cover.preview) URL.revokeObjectURL(cover.preview);
      gallery.forEach((item) => {
        if (item.file && item.preview) URL.revokeObjectURL(item.preview);
      });
    };
    // Only on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function showError(message) {
    setError(message);
  }

  function queueDelete(url) {
    if (!isSupabaseStorageUrl(url)) return;
    setPendingDeletes((current) =>
      current.includes(url) ? current : [...current, url],
    );
  }

  function selectCover(file) {
    if (!file) return;
    const invalid = validateImageFile(file);
    if (invalid) {
      showError(invalid);
      return;
    }
    setError("");
    if (cover?.remoteUrl) queueDelete(cover.remoteUrl);
    if (cover?.file && cover.preview) URL.revokeObjectURL(cover.preview);
    setCover(createLocalImage(file));
  }

  function clearCover() {
    if (!cover) return;
    if (cover.remoteUrl) queueDelete(cover.remoteUrl);
    if (cover.file && cover.preview) URL.revokeObjectURL(cover.preview);
    setCover(null);
  }

  function addGalleryFiles(fileList) {
    const files = [...(fileList || [])].filter(Boolean);
    if (!files.length) return;

    const remaining = MAX_GALLERY_IMAGES - gallery.length;
    if (remaining <= 0) {
      showError(`You can add up to ${MAX_GALLERY_IMAGES} gallery images.`);
      return;
    }

    const selected = files.slice(0, remaining);
    for (const file of selected) {
      const invalid = validateImageFile(file);
      if (invalid) {
        showError(invalid);
        return;
      }
    }

    setError("");
    setGallery((current) => [
      ...current,
      ...selected.map((file) => createLocalImage(file)),
    ]);

    if (files.length > remaining) {
      showError(
        `Only ${remaining} more image(s) could be added (max ${MAX_GALLERY_IMAGES}).`,
      );
    }
  }

  function removeGalleryItem(id) {
    const target = gallery.find((item) => item.id === id);
    if (!target) return;
    if (target.remoteUrl) queueDelete(target.remoteUrl);
    if (target.file && target.preview) URL.revokeObjectURL(target.preview);
    setGallery((current) => current.filter((item) => item.id !== id));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");

    if (!cover) {
      showError("Add a cover image before saving.");
      setBusy(false);
      return;
    }

    try {
      setBusyLabel("Uploading images…");
      let coverUrl = cover.remoteUrl;
      if (cover.file) {
        coverUrl = await uploadFileToServer(cover.file);
      }

      const galleryUrls = [];
      for (let index = 0; index < gallery.length; index += 1) {
        const item = gallery[index];
        setBusyLabel(`Uploading gallery ${index + 1}/${gallery.length}…`);
        if (item.file) {
          galleryUrls.push(await uploadFileToServer(item.file));
        } else if (item.remoteUrl) {
          galleryUrls.push(item.remoteUrl);
        }
      }

      if (pendingDeletes.length) {
        setBusyLabel("Removing deleted images…");
        // Don't delete URLs that are still referenced after save.
        const retained = new Set([coverUrl, ...galleryUrls]);
        const toDelete = pendingDeletes.filter((url) => !retained.has(url));
        if (toDelete.length) {
          await deleteStorageUrls(toDelete);
        }
      }

      setBusyLabel("Saving product…");
      const payload = {
        ...form,
        slug: form.slug || slugify(form.name),
        originalPrice: parsePrice(form.originalPrice),
        salePrice: parsePrice(form.salePrice),
        image: coverUrl,
        images: normalizeGalleryImages(galleryUrls),
        attributes: form.attributes,
      };

      const response = await fetch(
        isEdit ? `/api/admin/products/${product.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save product.");

      setBusyLabel("Opening products…");
      startTransition(() => {
        router.push("/admin/products");
        router.refresh();
      });
      setBusy(false);
    } catch (err) {
      showError(err.message);
      setBusy(false);
      setBusyLabel("");
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) {
      return;
    }

    setBusy(true);
    setBusyLabel("Deleting product…");
    setError("");
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete product.");

      const urls = [
        product.image,
        ...(Array.isArray(product.images) ? product.images : []),
      ].filter(Boolean);
      if (urls.length) {
        setBusyLabel("Cleaning up images…");
        await deleteStorageUrls(urls);
      }

      setBusyLabel("Opening products…");
      startTransition(() => {
        router.push("/admin/products");
        router.refresh();
      });
      setBusy(false);
    } catch (err) {
      showError(err.message);
      setBusy(false);
      setBusyLabel("");
    }
  }

  return (
    <form className="relative flex flex-col gap-8" onSubmit={handleSubmit}>
      <AdminBusyOverlay
        show={showBusy}
        label={isPending ? "Updating page…" : busyLabel || "Working…"}
      />

      {error ? (
        <div ref={errorRef}>
          <Alert variant="destructive">
            <AlertCircle className="size-4" aria-hidden="true" />
            <AlertDescription className="font-helvetica text-sm">{error}</AlertDescription>
          </Alert>
        </div>
      ) : null}

      <section className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
        <AdminSectionTitle
          title="Basics"
          description="Name, listing, and pricing shown on the storefront."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className={adminLabel}>Name</span>
            <input
              required
              value={form.name}
              disabled={showBusy}
              onChange={(event) => {
                const name = event.target.value;
                setForm((current) => ({
                  ...current,
                  name,
                  slug: isEdit ? current.slug : slugify(name),
                }));
              }}
              className={adminInput}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={adminLabel}>Slug</span>
            <input
              value={form.slug}
              disabled={showBusy}
              onChange={(event) => update("slug", event.target.value)}
              placeholder={slugHint}
              className={adminInput}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className={adminLabel}>Description</span>
          <Textarea
            rows={4}
            value={form.description}
            disabled={showBusy}
            onChange={(event) => update("description", event.target.value)}
            className={adminTextarea}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className={adminLabel}>Category</span>
            <select
              required
              value={form.categoryId}
              disabled={showBusy}
              onChange={(event) => update("categoryId", event.target.value)}
              className={adminInput}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2">
            <span className={adminLabel}>Original price (INR)</span>
            <input
              type="number"
              min="0"
              value={form.originalPrice}
              disabled={showBusy}
              onChange={(event) => update("originalPrice", event.target.value)}
              className={adminInput}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={adminLabel}>Sale price (INR)</span>
            <input
              type="number"
              min="0"
              value={form.salePrice}
              disabled={showBusy}
              onChange={(event) => update("salePrice", event.target.value)}
              className={adminInput}
            />
          </label>
        </div>

        <div className="flex flex-wrap gap-5">
          <label className="inline-flex items-center gap-2 font-helvetica text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.onSale}
              disabled={showBusy}
              onChange={(event) => update("onSale", event.target.checked)}
            />
            On sale
          </label>
          <label className="inline-flex items-center gap-2 font-helvetica text-sm text-foreground">
            <input
              type="checkbox"
              checked={form.published}
              disabled={showBusy}
              onChange={(event) => update("published", event.target.checked)}
            />
            Published on website
          </label>
        </div>
      </section>

      <section className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
        <AdminSectionTitle
          title="Imagery"
          description="Choose images now — they upload to Supabase only when you click Save. Removing an existing image also deletes it from Storage on save. JPG, PNG, WebP, or GIF · max 10 MB each."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <span className={adminLabel}>Cover image *</span>
            <label
              className={`flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-center transition-colors hover:border-foreground/40 ${
                showBusy ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {cover ? (
                <img
                  src={cover.preview}
                  alt=""
                  className="max-h-40 w-full object-contain"
                />
              ) : (
                <>
                  <ImagePlus className="size-6 opacity-50" aria-hidden="true" />
                  <span className="font-helvetica text-sm text-foreground">
                    Click to choose cover
                  </span>
                  <span className="font-helvetica text-xs text-muted-foreground">
                    Uploads on save · max 10 MB
                  </span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                disabled={showBusy}
                onChange={(event) => {
                  selectCover(event.target.files?.[0]);
                  event.target.value = "";
                }}
              />
            </label>
            {cover ? (
              <div className="flex flex-wrap gap-2">
                <label
                  className={`${adminBtnSecondary} cursor-pointer ${
                    showBusy ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  Replace cover
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="sr-only"
                    disabled={showBusy}
                    onChange={(event) => {
                      selectCover(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  className={adminBtnDanger}
                  disabled={showBusy}
                  onClick={clearCover}
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  Remove
                </Button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={adminLabel}>
                Gallery ({gallery.length}/{MAX_GALLERY_IMAGES})
              </span>
              {canAddGalleryImage ? (
                <label
                  className={`${adminBtnSecondary} cursor-pointer ${
                    showBusy ? "pointer-events-none opacity-60" : ""
                  }`}
                >
                  <ImagePlus className="size-3.5" aria-hidden="true" />
                  Add images
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    className="sr-only"
                    disabled={showBusy}
                    onChange={(event) => {
                      addGalleryFiles(event.target.files);
                      event.target.value = "";
                    }}
                  />
                </label>
              ) : null}
            </div>

            {gallery.length === 0 ? (
              <label
                className={`flex min-h-44 cursor-pointer flex-col items-center justify-center gap-2 border border-dashed border-border bg-muted/50 px-4 py-6 text-center transition-colors hover:border-foreground/40 ${
                  showBusy || !canAddGalleryImage ? "pointer-events-none opacity-60" : ""
                }`}
              >
                <ImagePlus className="size-6 opacity-50" aria-hidden="true" />
                <span className="font-helvetica text-sm text-foreground">
                  Click to choose gallery images
                </span>
                <span className="font-helvetica text-xs text-muted-foreground">
                  Uploads on save · up to {MAX_GALLERY_IMAGES}
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="sr-only"
                  disabled={showBusy || !canAddGalleryImage}
                  onChange={(event) => {
                    addGalleryFiles(event.target.files);
                    event.target.value = "";
                  }}
                />
              </label>
            ) : (
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((item) => (
                  <li
                    key={item.id}
                    className="relative overflow-hidden border border-border bg-muted/50"
                  >
                    <img
                      src={item.preview}
                      alt=""
                      className="aspect-square w-full object-cover"
                    />
                    {!item.remoteUrl ? (
                      <span className="absolute left-1.5 top-1.5 bg-foreground/80 px-1.5 py-0.5 font-helvetica text-[10px] uppercase tracking-wide text-white">
                        New
                      </span>
                    ) : null}
                    <button
                      type="button"
                      className="absolute right-1.5 top-1.5 inline-flex size-8 items-center justify-center bg-foreground/85 text-white hover:bg-destructive disabled:opacity-50"
                      onClick={() => removeGalleryItem(item.id)}
                      disabled={showBusy}
                      aria-label="Remove gallery image"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6">
        <ProductAttributesFields
          definitions={activeDefinitions}
          values={form.attributes}
          onChange={(attributes) => update("attributes", attributes)}
        />
      </section>

      <div className="sticky bottom-0 z-10 -mx-5 flex flex-col gap-3 rounded-lg border border-border bg-card/95 px-5 py-4 shadow-md backdrop-blur-sm sm:-mx-6 sm:px-6">
        <Separator />
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button type="submit" disabled={showBusy} className={adminBtnPrimary}>
            {showBusy ? (
              <>
                <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                {busyLabel || "Saving…"}
              </>
            ) : isEdit ? (
              "Save product"
            ) : (
              "Add product"
            )}
          </Button>
          {isEdit ? (
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              disabled={showBusy}
              className={adminBtnDanger}
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
