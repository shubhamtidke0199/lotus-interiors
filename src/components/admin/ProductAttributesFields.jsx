"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  adminBtnDanger,
  adminBtnSecondary,
  adminChip,
  adminChipActive,
  adminInput,
  adminLabel,
} from "@/components/admin/adminUi";
import { createId } from "@/lib/cms/format";

function emptyDimension(unit = "cm") {
  return {
    id: createId("dim-"),
    label: "",
    w: "",
    d: "",
    h: "",
    unit,
  };
}

export default function ProductAttributesFields({
  definitions,
  values,
  onChange,
}) {
  if (!definitions?.length) {
    return (
      <div className="admin-empty">
        <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
          No attributes for this category
        </p>
        <p className="font-helvetica text-sm text-[color:var(--admin-muted)]">
          Bind fields on Categories, or create them under Attributes.
        </p>
      </div>
    );
  }

  function setValue(attributeId, next) {
    onChange({ ...values, [attributeId]: next });
  }

  function toggleMulti(attributeId, optionId) {
    const current = Array.isArray(values[attributeId]) ? values[attributeId] : [];
    const next = current.includes(optionId)
      ? current.filter((id) => id !== optionId)
      : [...current, optionId];
    setValue(attributeId, next);
  }

  function updateDimension(attributeId, index, field, fieldValue) {
    const rows = Array.isArray(values[attributeId]) ? [...values[attributeId]] : [];
    rows[index] = { ...rows[index], [field]: fieldValue };
    setValue(attributeId, rows);
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
          Specifications
        </h2>
        <p className="mt-1 font-helvetica text-xs leading-5 text-[color:var(--admin-muted)]">
          Fields come from the selected category. Leave blank when not relevant.
        </p>
      </div>

      <div className="grid gap-5">
        {definitions.map((definition) => {
          const value = values[definition.id];

          if (definition.type === "text") {
            return (
              <label key={definition.id} className="flex flex-col gap-2">
                <span className={adminLabel}>
                  {definition.label}
                  {definition.required ? " *" : ""}
                </span>
                <input
                  value={value ?? ""}
                  required={definition.required}
                  onChange={(event) => setValue(definition.id, event.target.value)}
                  className={adminInput}
                />
              </label>
            );
          }

          if (definition.type === "number") {
            return (
              <label key={definition.id} className="flex flex-col gap-2">
                <span className={adminLabel}>
                  {definition.label}
                  {definition.unit ? ` (${definition.unit})` : ""}
                  {definition.required ? " *" : ""}
                </span>
                <input
                  type="number"
                  value={value ?? ""}
                  required={definition.required}
                  onChange={(event) => setValue(definition.id, event.target.value)}
                  className={adminInput}
                />
              </label>
            );
          }

          if (definition.type === "select") {
            return (
              <label key={definition.id} className="flex flex-col gap-2">
                <span className={adminLabel}>
                  {definition.label}
                  {definition.required ? " *" : ""}
                </span>
                <select
                  value={value ?? ""}
                  required={definition.required}
                  onChange={(event) => setValue(definition.id, event.target.value)}
                  className={adminInput}
                >
                  <option value="">Select…</option>
                  {definition.options.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            );
          }

          if (definition.type === "multiselect" || definition.type === "color") {
            const selected = Array.isArray(value) ? value : [];
            return (
              <fieldset key={definition.id} className="flex flex-col gap-2.5">
                <legend className={adminLabel}>
                  {definition.label}
                  {definition.required ? " *" : ""}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {definition.options.map((option) => {
                    const checked = selected.includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className={`cursor-pointer ${checked ? adminChipActive : adminChip}`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleMulti(definition.id, option.id)}
                        />
                        {definition.type === "color" ? (
                          <span
                            className="mr-2 inline-block size-3 align-middle"
                            style={{ backgroundColor: option.hex || "#ccc" }}
                            aria-hidden="true"
                          />
                        ) : null}
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          }

          if (definition.type === "dimension_list") {
            const rows =
              Array.isArray(value) && value.length > 0
                ? value
                : [emptyDimension(definition.unit || "cm")];

            return (
              <div key={definition.id} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <p className={adminLabel}>
                    {definition.label}
                    {definition.required ? " *" : ""}
                  </p>
                  <button
                    type="button"
                    className={adminBtnSecondary}
                    onClick={() =>
                      setValue(definition.id, [
                        ...rows,
                        emptyDimension(definition.unit || "cm"),
                      ])
                    }
                  >
                    <Plus className="size-3.5" aria-hidden="true" />
                    Add size
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {rows.map((row, index) => (
                    <div
                      key={row.id || `dim-${index}`}
                      className="grid gap-2 lg:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.7fr))_auto]"
                    >
                      <input
                        value={row.label ?? ""}
                        onChange={(event) =>
                          updateDimension(
                            definition.id,
                            index,
                            "label",
                            event.target.value,
                          )
                        }
                        placeholder="Queen / Overall"
                        className={adminInput}
                      />
                      {["w", "d", "h"].map((axis) => (
                        <input
                          key={axis}
                          type="number"
                          min="0"
                          step="any"
                          value={row[axis] ?? ""}
                          onChange={(event) =>
                            updateDimension(
                              definition.id,
                              index,
                              axis,
                              event.target.value,
                            )
                          }
                          placeholder={`${axis.toUpperCase()} (${row.unit || definition.unit || "cm"})`}
                          className={adminInput}
                        />
                      ))}
                      <button
                        type="button"
                        className={adminBtnDanger}
                        onClick={() => {
                          const next = rows.filter((_, rowIndex) => rowIndex !== index);
                          setValue(
                            definition.id,
                            next.length
                              ? next
                              : [emptyDimension(definition.unit || "cm")],
                          );
                        }}
                      >
                        <Trash2 className="size-3.5" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
