"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Eye, EyeOff, LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminPanel from "@/components/admin/AdminPanel";
import AdminTableShell, {
  adminTableHeadClass,
} from "@/components/admin/AdminTableShell";
import { AdminField } from "@/components/admin/AdminField";
import {
  adminBtnDanger,
  adminBtnGhost,
  adminBtnPrimary,
  adminBtnSecondary,
  adminChip,
  adminChipActive,
  adminLabel,
  statusBadgeClass,
} from "@/components/admin/adminUi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="relative flex flex-col gap-6">
      <AdminBusyOverlay
        show={showBusy}
        label={isPending && !busy ? "Updating…" : busyLabel || "Working…"}
      />

      <AdminPanel title="New category" contentClassName="pt-0">
        <form onSubmit={createCategory} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <AdminField label="Name" className="min-w-0 flex-1">
              <Input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Kitchen"
                className="font-helvetica h-10"
                disabled={showBusy}
              />
            </AdminField>
            <Button type="submit" disabled={showBusy} className={adminBtnPrimary}>
              {showBusy ? (
                <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Plus className="size-3.5" aria-hidden="true" />
              )}
              {busy ? "Adding…" : "Add category"}
            </Button>
          </div>

          {attributeDefinitions.length > 0 ? (
            <fieldset className="flex flex-col gap-3" disabled={showBusy}>
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
      </AdminPanel>

      {error ? (
        <Alert variant="destructive">
          <AlertDescription className="font-helvetica text-sm">{error}</AlertDescription>
        </Alert>
      ) : null}

      <AdminTableShell>
        <Table className="min-w-[44rem]">
          <TableHeader>
            <TableRow>
              <TableHead className={adminTableHeadClass}>Category</TableHead>
              <TableHead className={adminTableHeadClass}>Attributes</TableHead>
              <TableHead className={adminTableHeadClass}>Status</TableHead>
              <TableHead className={adminTableHeadClass}> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.items.map((category) => {
              const bound = category.attributeIds || [];
              const isEditing = editingId === category.id;
              return (
                <TableRow key={category.id} className="align-top">
                  <TableCell>
                    <p className="font-helvetica text-sm font-medium text-foreground">
                      {category.name}
                    </p>
                    <p className="mt-0.5 font-helvetica text-xs text-muted-foreground">
                      {category.slug}
                    </p>
                  </TableCell>
                  <TableCell>
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
                          <Button
                            type="button"
                            className={adminBtnPrimary}
                            disabled={showBusy}
                            onClick={() => saveCategoryAttributes(category)}
                          >
                            Save
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            className={adminBtnGhost}
                            disabled={showBusy}
                            onClick={() => {
                              setEditingId(null);
                              setDraftAttributeIds([]);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <span className="font-helvetica text-sm text-muted-foreground">
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
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusBadgeClass(
                        category.active ? "active" : "hidden",
                      )}
                    >
                      {category.active ? "Visible" : "Hidden"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap justify-end gap-1">
                      <Button
                        type="button"
                        variant="outline"
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
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
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
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        className={adminBtnDanger}
                        disabled={showBusy}
                        onClick={() => remove(category)}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <AdminPagination {...pagination} noun="categories" onPageChange={setPage} />
      </AdminTableShell>
    </div>
  );
}
