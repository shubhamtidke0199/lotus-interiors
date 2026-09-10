"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryManager({ categories }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function createCategory(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to add category.");
      setName("");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(category) {
    setError("");
    const response = await fetch(`/api/admin/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...category, active: !category.active }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Unable to update category.");
      return;
    }
    router.refresh();
  }

  async function remove(category) {
    if (!window.confirm(`Delete category “${category.name}”?`)) return;
    setError("");
    const response = await fetch(`/api/admin/categories/${category.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Unable to delete category.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-8">
      <form className="flex flex-col gap-4 sm:flex-row sm:items-end" onSubmit={createCategory}>
        <label className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="font-helvetica text-xs uppercase tracking-wide text-muted">
            New category
          </span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Kitchen"
            className="h-11 w-full border-0 border-b border-appointment-line bg-transparent font-fraunces text-sm outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-11 items-center justify-center bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add category"}
        </button>
      </form>

      {error ? (
        <p className="font-fraunces text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left">
          <thead>
            <tr className="border-b border-product-bg font-helvetica text-xs uppercase tracking-wide text-muted">
              <th className="py-3 pr-4 font-normal">Name</th>
              <th className="py-3 pr-4 font-normal">Slug</th>
              <th className="py-3 pr-4 font-normal">Status</th>
              <th className="py-3 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-product-bg">
                <td className="py-4 pr-4 font-fraunces text-sm text-nav">
                  {category.name}
                </td>
                <td className="py-4 pr-4 font-fraunces text-sm text-muted">
                  {category.slug}
                </td>
                <td className="py-4 pr-4 font-fraunces text-sm">
                  {category.active ? "Active" : "Hidden"}
                </td>
                <td className="py-4">
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="font-fraunces text-sm text-primary hover:underline"
                      onClick={() => toggleActive(category)}
                    >
                      {category.active ? "Hide" : "Show"}
                    </button>
                    <button
                      type="button"
                      className="font-fraunces text-sm text-red-700 hover:underline"
                      onClick={() => remove(category)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
