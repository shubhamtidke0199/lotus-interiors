"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { slugify } from "@/lib/cms/format";

const inputClassName =
  "h-11 w-full border-0 border-b border-appointment-line bg-transparent font-fraunces text-sm text-nav outline-none focus:border-primary";

export default function ProductForm({ product, categories }) {
  const router = useRouter();
  const isEdit = Boolean(product?.id);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    originalPrice: product?.originalPrice ?? "",
    salePrice: product?.salePrice ?? "",
    onSale: Boolean(product?.onSale),
    published: product?.published !== false,
    image: product?.image ?? "",
    galleryTop: product?.galleryTop ?? "",
    galleryBottom: product?.galleryBottom ?? "",
    selectedMaterial: product?.selectedMaterial ?? "",
    frameFinish: product?.frameFinish ?? "Matte",
  });

  const slugHint = useMemo(
    () => (form.slug ? form.slug : slugify(form.name)),
    [form.name, form.slug],
  );

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function uploadImage(file, field = "image") {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("file", file);
      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      update(field, data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      originalPrice: Number(form.originalPrice) || 0,
      salePrice: Number(form.salePrice) || 0,
    };

    try {
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
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!window.confirm(`Delete “${product.name}”? This cannot be undone.`)) {
      return;
    }

    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete product.");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
      <div className="grid gap-8 lg:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Name
          </span>
          <input
            required
            value={form.name}
            onChange={(event) => {
              const name = event.target.value;
              setForm((current) => ({
                ...current,
                name,
                slug: isEdit ? current.slug : slugify(name),
              }));
            }}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Slug
          </span>
          <input
            value={form.slug}
            onChange={(event) => update("slug", event.target.value)}
            placeholder={slugHint}
            className={inputClassName}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
          Description
        </span>
        <textarea
          rows={4}
          value={form.description}
          onChange={(event) => update("description", event.target.value)}
          className="min-h-28 w-full resize-y border-0 border-b border-appointment-line bg-transparent py-2 font-fraunces text-sm text-nav outline-none focus:border-primary"
        />
      </label>

      <div className="grid gap-8 sm:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Category
          </span>
          <select
            required
            value={form.categoryId}
            onChange={(event) => update("categoryId", event.target.value)}
            className={inputClassName}
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
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Original price (INR)
          </span>
          <input
            type="number"
            min="0"
            value={form.originalPrice}
            onChange={(event) => update("originalPrice", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Sale price (INR)
          </span>
          <input
            type="number"
            min="0"
            value={form.salePrice}
            onChange={(event) => update("salePrice", event.target.value)}
            className={inputClassName}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-3 font-fraunces text-sm">
          <input
            type="checkbox"
            checked={form.onSale}
            onChange={(event) => update("onSale", event.target.checked)}
          />
          On sale
        </label>
        <label className="flex items-center gap-3 font-fraunces text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(event) => update("published", event.target.checked)}
          />
          Published on website
        </label>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-4">
          <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Cover image
          </p>
          <input
            value={form.image}
            onChange={(event) => update("image", event.target.value)}
            placeholder="/images/products-page/example.png"
            className={inputClassName}
          />
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => uploadImage(event.target.files?.[0], "image")}
            className="font-fraunces text-sm text-muted"
          />
          {uploading ? (
            <p className="font-fraunces text-sm text-muted">Uploading…</p>
          ) : null}
        </div>
        {form.image ? (
          <figure className="overflow-hidden bg-product-bg">
            <img src={form.image} alt="" className="h-48 w-full object-cover" />
          </figure>
        ) : null}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Gallery top (optional)
          </span>
          <input
            value={form.galleryTop}
            onChange={(event) => update("galleryTop", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Gallery bottom (optional)
          </span>
          <input
            value={form.galleryBottom}
            onChange={(event) => update("galleryBottom", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Material note
          </span>
          <input
            value={form.selectedMaterial}
            onChange={(event) => update("selectedMaterial", event.target.value)}
            className={inputClassName}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            Frame finish
          </span>
          <input
            value={form.frameFinish}
            onChange={(event) => update("frameFinish", event.target.value)}
            className={inputClassName}
          />
        </label>
      </div>

      {error ? (
        <p className="font-fraunces text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="inline-flex h-11 items-center bg-primary px-8 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save product" : "Add product"}
        </button>
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving}
            className="font-fraunces text-sm text-red-700 hover:underline disabled:opacity-60"
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
