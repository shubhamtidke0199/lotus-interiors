"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Eye, EyeOff, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  adminBtnDanger,
  adminBtnGhost,
  adminBtnPrimary,
  adminBtnSecondary,
  adminChip,
  adminChipActive,
  adminError,
  adminInput,
  adminLabel,
  adminRow,
  adminTableWrap,
  adminTd,
  adminTh,
  statusBadgeClass,
} from "@/components/admin/adminUi";
import { paginate } from "@/lib/cms/pagination";

export default function CategoryManager({ categories, attributeDefinitions }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [attributeIds, setAttributeIds] = useState(
    () => attributeDefinitions.map((definition) => definition.id),
  );
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draftAttributeIds, setDraftAttributeIds] = useState([]);
  const [page, setPage] = useState(1);
  const pagination = useMemo(() => paginate(categories, page), [categories, page]);
  const showBusy = busy || isPending;

  function toggleCreateAttribute(id) {
    setAttributeIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function beginEdit(category) {
    setEditingId(category.id);
    setDraftAttributeIds([...(category.attributeIds || [])]);
  }

  function refreshPage(label = "Updating…") {
    setBusyLabel(label);
    startTransition(() => {
      router.refresh();
    });
  }

  async function createCategory(event) {
    event.preventDefault();
    setBusy(true);
    setBusyLabel("Adding category…");
    setError("");
    try {
      const response = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attributeIds }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to add category.");
      setName("");
      setAttributeIds(attributeDefinitions.map((definition) => definition.id));
      refreshPage("Refreshing categories…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function saveCategoryAttributes(category) {
    setBusy(true);
    setBusyLabel("Saving fields…");
    setError("");
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, attributeIds: draftAttributeIds }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to update category attributes.");
      }
      setEditingId(null);
      setDraftAttributeIds([]);
      refreshPage("Refreshing categories…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(category) {
    setBusy(true);
    setBusyLabel(category.active ? "Hiding category…" : "Showing category…");
    setError("");
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...category, active: !category.active }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update category.");
      refreshPage("Refreshing categories…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(category) {
    if (!window.confirm(`Delete category “${category.name}”?`)) return;
    setBusy(true);
    setBusyLabel("Deleting category…");
    setError("");
    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete category.");
      refreshPage("Refreshing categories…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative flex flex-col gap-8">
      <AdminBusyOverlay
        show={showBusy}
        label={isPending && !busy ? "Updating…" : busyLabel || "Working…"}
      />

      <form
        className="border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] p-5"
        onSubmit={createCategory}
      >
        <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
          New category
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex min-w-0 flex-1 flex-col gap-2">
            <span className={adminLabel}>Name</span>
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Kitchen"
              className={adminInput}
              disabled={showBusy}
            />
          </label>
          <button type="submit" disabled={showBusy} className={adminBtnPrimary}>
            {showBusy ? (
              <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="size-3.5" aria-hidden="true" />
            )}
            {busy ? "Adding…" : "Add category"}
          </button>
        </div>

        {attributeDefinitions.length > 0 ? (
          <fieldset className="mt-5 flex flex-col gap-3" disabled={showBusy}>
            <legend className={adminLabel}>Default attributes for new products</legend>
            <div className="flex flex-wrap gap-2">
              {attributeDefinitions.map((definition) => {
                const checked = attributeIds.includes(definition.id);
                return (
                  <label
                    key={definition.id}
                    className={`cursor-pointer ${checked ? adminChipActive : adminChip}`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => toggleCreateAttribute(definition.id)}
                    />
                    {definition.label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ) : null}
      </form>

      {error ? (
        <p className={adminError} role="alert">
          {error}
        </p>
      ) : null}

      <div className={adminTableWrap}>
        <table className="w-full min-w-[44rem] text-left">
          <thead>
            <tr>
              <th className={adminTh}>Category</th>
              <th className={adminTh}>Attributes</th>
              <th className={adminTh}>Status</th>
              <th className={adminTh}> </th>
            </tr>
          </thead>
          <tbody>
            {pagination.items.map((category) => {
              const bound = category.attributeIds || [];
              const isEditing = editingId === category.id;
              return (
                <tr key={category.id} className={`${adminRow} align-top`}>
                  <td className={adminTd}>
                    <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
                      {category.name}
                    </p>
                    <p className="mt-0.5 font-helvetica text-xs text-[color:var(--admin-muted)]">
                      {category.slug}
                    </p>
                  </td>
                  <td className={adminTd}>
                    {isEditing ? (
                      <div className="flex max-w-lg flex-col gap-3">
                        <div className="flex flex-wrap gap-2">
                          {attributeDefinitions.map((definition) => {
                            const checked = draftAttributeIds.includes(definition.id);
                            return (
                              <label
                                key={definition.id}
                                className={`cursor-pointer ${checked ? adminChipActive : adminChip}`}
                              >
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={checked}
                                  disabled={showBusy}
                                  onChange={() => {
                                    setDraftAttributeIds((current) =>
                                      checked
                                        ? current.filter((id) => id !== definition.id)
                                        : [...current, definition.id],
                                    );
                                  }}
                                />
                                {definition.label}
                              </label>
                            );
                          })}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            className={adminBtnPrimary}
                            disabled={showBusy}
                            onClick={() => saveCategoryAttributes(category)}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className={adminBtnGhost}
                            disabled={showBusy}
                            onClick={() => {
                              setEditingId(null);
                              setDraftAttributeIds([]);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="font-helvetica text-sm text-[color:var(--admin-muted)]">
                        {bound.length
                          ? bound
                              .map(
                                (id) =>
                                  attributeDefinitions.find(
                                    (definition) => definition.id === id,
                                  )?.label ?? id,
                              )
                              .join(" · ")
                          : "All attributes"}
                      </span>
                    )}
                  </td>
                  <td className={adminTd}>
                    <span
                      className={statusBadgeClass(
                        category.active ? "active" : "hidden",
                      )}
                    >
                      {category.active ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className={adminTd}>
                    <div className="flex flex-wrap justify-end gap-1">
                      <button
                        type="button"
                        className={adminBtnSecondary}
                        disabled={showBusy}
                        onClick={() => {
                          if (isEditing) {
                            setEditingId(null);
                            setDraftAttributeIds([]);
                            return;
                          }
                          beginEdit(category);
                        }}
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                        {isEditing ? "Close" : "Fields"}
                      </button>
                      <button
                        type="button"
                        className={adminBtnGhost}
                        disabled={showBusy}
                        onClick={() => toggleActive(category)}
                      >
                        {category.active ? (
                          <EyeOff className="size-3.5" aria-hidden="true" />
                        ) : (
                          <Eye className="size-3.5" aria-hidden="true" />
                        )}
                        {category.active ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        className={adminBtnDanger}
                        disabled={showBusy}
                        onClick={() => remove(category)}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AdminPagination
          {...pagination}
          noun="categories"
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
