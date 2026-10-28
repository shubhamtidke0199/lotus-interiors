"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
  adminInput,
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
import { ATTRIBUTE_TYPES } from "@/lib/cms/attributes";
import { slugify } from "@/lib/cms/format";
import { paginate } from "@/lib/cms/pagination";

function emptyOption(withHex) {
  return withHex ? { id: "", label: "", hex: "#cccccc" } : { id: "", label: "" };
}

function blankForm() {
  return {
    label: "",
    slug: "",
    type: "select",
    unit: "",
    required: false,
    filterable: false,
    active: true,
    options: [emptyOption(false), emptyOption(false)],
  };
}

export default function AttributeManager({ attributes }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [busyLabel, setBusyLabel] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm());
  const [page, setPage] = useState(1);
  const showBusy = busy || isPending;

  const needsOptions =
    form.type === "select" || form.type === "multiselect" || form.type === "color";
  const withHex = form.type === "color";
  const typeHint = useMemo(
    () => ATTRIBUTE_TYPES.find((type) => type.id === form.type)?.description ?? "",
    [form.type],
  );
  const pagination = useMemo(() => paginate(attributes, page), [attributes, page]);

  function refreshPage(label = "Updating…") {
    setBusyLabel(label);
    startTransition(() => {
      router.refresh();
    });
  }

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(blankForm());
    setError("");
  }

  function startEdit(attribute) {
    setEditingId(attribute.id);
    setForm({
      label: attribute.label,
      slug: attribute.slug,
      type: attribute.type,
      unit: attribute.unit ?? "",
      required: Boolean(attribute.required),
      filterable: Boolean(attribute.filterable),
      active: attribute.active !== false,
      options:
        attribute.options?.length > 0
          ? attribute.options.map((option) => ({
              id: option.id,
              label: option.label,
              hex: option.hex ?? "#cccccc",
            }))
          : [emptyOption(attribute.type === "color")],
    });
    setError("");
  }

  function updateOption(index, field, value) {
    setForm((current) => {
      const options = current.options.map((option, optionIndex) =>
        optionIndex === index ? { ...option, [field]: value } : option,
      );
      return { ...current, options };
    });
  }

  function addOption() {
    setForm((current) => ({
      ...current,
      options: [...current.options, emptyOption(current.type === "color")],
    }));
  }

  function removeOption(index) {
    setForm((current) => ({
      ...current,
      options: current.options.filter((_, optionIndex) => optionIndex !== index),
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setBusyLabel(editingId ? "Saving attribute…" : "Adding attribute…");
    setError("");

    const payload = {
      label: form.label,
      slug: form.slug || slugify(form.label),
      type: form.type,
      unit: form.unit,
      required: form.required,
      filterable: form.filterable,
      active: form.active,
      options: needsOptions
        ? form.options
            .map((option) => ({
              id: option.id || slugify(option.label),
              label: option.label,
              ...(withHex ? { hex: option.hex || "#cccccc" } : {}),
            }))
            .filter((option) => option.label.trim())
        : [],
    };

    try {
      const response = await fetch(
        editingId ? `/api/admin/attributes/${editingId}` : "/api/admin/attributes",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save attribute.");
      startCreate();
      refreshPage("Refreshing attributes…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove(attribute) {
    if (
      !window.confirm(
        `Delete attribute “${attribute.label}”? Values will be removed from products.`,
      )
    ) {
      return;
    }
    setBusy(true);
    setBusyLabel("Deleting attribute…");
    setError("");
    try {
      const response = await fetch(`/api/admin/attributes/${attribute.id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to delete attribute.");
      if (editingId === attribute.id) startCreate();
      refreshPage("Refreshing attributes…");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(attribute) {
    setBusy(true);
    setBusyLabel(attribute.active ? "Hiding attribute…" : "Showing attribute…");
    setError("");
    try {
      const response = await fetch(`/api/admin/attributes/${attribute.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...attribute, active: !attribute.active }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to update attribute.");
      refreshPage("Refreshing attributes…");
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
      <AdminPanel
        title={editingId ? "Edit attribute" : "New attribute"}
        description={typeHint}
        headerAction={
          editingId ? (
            <Button type="button" variant="ghost" onClick={startCreate} className={adminBtnGhost}>
              Cancel edit
            </Button>
          ) : null
        }
      >
      <form onSubmit={handleSubmit} className="flex flex-col">

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <AdminField label="Label">
            <Input
              required
              value={form.label}
              onChange={(event) => {
                const label = event.target.value;
                setForm((current) => ({
                  ...current,
                  label,
                  slug: editingId ? current.slug : slugify(label),
                }));
              }}
              placeholder="Material"
              className="font-helvetica h-10"
            />
          </AdminField>
          <AdminField label="Slug">
            <Input
              value={form.slug}
              onChange={(event) => update("slug", event.target.value)}
              className="font-helvetica h-10"
            />
          </AdminField>
          <AdminField label="Type">
            <select
              value={form.type}
              onChange={(event) => {
                const type = event.target.value;
                setForm((current) => ({
                  ...current,
                  type,
                  options:
                    type === "select" || type === "multiselect" || type === "color"
                      ? current.options.length
                        ? current.options
                        : [emptyOption(type === "color")]
                      : [],
                }));
              }}
              className={adminInput}
            >
              {ATTRIBUTE_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Unit (optional)">
            <Input
              value={form.unit}
              onChange={(event) => update("unit", event.target.value)}
              placeholder="cm, years…"
              className="font-helvetica h-10"
            />
          </AdminField>
        </div>

        <div className="mt-5 flex flex-wrap gap-5">
          {[
            ["required", "Required on products"],
            ["filterable", "Filterable later"],
            ["active", "Active"],
          ].map(([field, label]) => (
            <label
              key={field}
              className="inline-flex items-center gap-2 font-helvetica text-sm text-foreground"
            >
              <input
                type="checkbox"
                checked={form[field]}
                onChange={(event) => update(field, event.target.checked)}
              />
              {label}
            </label>
          ))}
        </div>

        {needsOptions ? (
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <p className={adminLabel}>Options</p>
              <Button type="button" onClick={addOption} variant="outline" className={adminBtnSecondary}>
                <Plus className="size-3.5" aria-hidden="true" />
                Add option
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              {form.options.map((option, index) => (
                <div
                  key={`option-${index}`}
                  className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]"
                >
                  <Input
                    value={option.label}
                    onChange={(event) => updateOption(index, "label", event.target.value)}
                    placeholder="Label"
                    className="font-helvetica h-10"
                  />
                  <Input
                    value={option.id}
                    onChange={(event) => updateOption(index, "id", event.target.value)}
                    placeholder="id (optional)"
                    className="font-helvetica h-10"
                  />
                  {withHex ? (
                    <input
                      type="color"
                      value={option.hex || "#cccccc"}
                      onChange={(event) => updateOption(index, "hex", event.target.value)}
                      className="h-10 w-12 cursor-pointer rounded-md border border-input bg-background p-1"
                      aria-label="Swatch colour"
                    />
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeOption(index)}
                    className={adminBtnDanger}
                  >
                    <Trash2 className="size-3.5" aria-hidden="true" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {error ? (
          <Alert variant="destructive" className="mt-5">
            <AlertDescription className="font-helvetica text-sm">{error}</AlertDescription>
          </Alert>
        ) : null}

        <Button
          type="submit"
          disabled={showBusy}
          className={`${adminBtnPrimary} mt-6 w-fit`}
        >
          {showBusy ? (
            <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
          ) : !editingId ? (
            <Plus className="size-3.5" aria-hidden="true" />
          ) : null}
          {busy ? "Saving…" : editingId ? "Save attribute" : "Add attribute"}
        </Button>
      </form>
      </AdminPanel>

      <AdminTableShell>
        <Table className="min-w-[48rem]">
          <TableHeader>
            <TableRow>
              <TableHead className={adminTableHeadClass}>Label</TableHead>
              <TableHead className={adminTableHeadClass}>Type</TableHead>
              <TableHead className={adminTableHeadClass}>Options</TableHead>
              <TableHead className={adminTableHeadClass}>Status</TableHead>
              <TableHead className={adminTableHeadClass}> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.items.map((attribute) => (
              <TableRow key={attribute.id}>
                <TableCell>
                  <p className="font-helvetica text-sm font-medium">
                    {attribute.label}
                  </p>
                  <p className="mt-0.5 font-helvetica text-xs text-muted-foreground">
                    {attribute.slug}
                  </p>
                </TableCell>
                <TableCell className="font-helvetica text-muted-foreground">
                  {ATTRIBUTE_TYPES.find((type) => type.id === attribute.type)?.label ??
                    attribute.type}
                </TableCell>
                <TableCell className="font-helvetica text-muted-foreground">
                  {attribute.type === "dimension_list"
                    ? "Named W×D×H rows"
                    : attribute.options?.length
                      ? `${attribute.options.length} option(s)`
                      : "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    className={statusBadgeClass(
                      attribute.active ? "active" : "hidden",
                    )}
                  >
                    {attribute.active ? "Active" : "Hidden"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap justify-end gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      className={adminBtnSecondary}
                      disabled={showBusy}
                      onClick={() => startEdit(attribute)}
                    >
                      <Pencil className="size-3.5" aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className={adminBtnGhost}
                      disabled={showBusy}
                      onClick={() => toggleActive(attribute)}
                    >
                      {attribute.active ? (
                        <EyeOff className="size-3.5" aria-hidden="true" />
                      ) : (
                        <Eye className="size-3.5" aria-hidden="true" />
                      )}
                      {attribute.active ? "Hide" : "Show"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className={adminBtnDanger}
                      disabled={showBusy}
                      onClick={() => remove(attribute)}
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <AdminPagination
          {...pagination}
          noun="attributes"
          onPageChange={setPage}
        />
      </AdminTableShell>
    </div>
  );
}
