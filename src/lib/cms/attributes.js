import { createId, slugify } from "@/lib/cms/format";

export const ATTRIBUTE_TYPES = [
  {
    id: "text",
    label: "Text",
    description: "Free-form text (warranty, notes).",
  },
  {
    id: "number",
    label: "Number",
    description: "Numeric value with optional unit.",
  },
  {
    id: "select",
    label: "Select",
    description: "Pick one option from a list.",
  },
  {
    id: "multiselect",
    label: "Multi-select",
    description: "Pick one or more options.",
  },
  {
    id: "color",
    label: "Colour swatches",
    description: "Multi-select options with hex colours for the product page.",
  },
  {
    id: "dimension_list",
    label: "Dimension list",
    description: "Named sizes with W × D × H (beds, tables, custom sizes).",
  },
];

export const ATTRIBUTE_TYPE_IDS = new Set(ATTRIBUTE_TYPES.map((type) => type.id));

export function createDefaultAttributeDefinitions() {
  return [
    {
      id: "material",
      slug: "material",
      label: "Material",
      type: "select",
      required: false,
      filterable: true,
      sortOrder: 1,
      unit: "",
      options: [
        { id: "full-grain-leather", label: "Full Grain Leather" },
        { id: "teak", label: "Solid Teak" },
        { id: "walnut", label: "Walnut" },
        { id: "oak", label: "Oak" },
        { id: "cane", label: "Cane" },
        { id: "fabric", label: "Premium Fabric" },
        { id: "laminate", label: "Matte Laminate" },
        { id: "acrylic", label: "Architectural Acrylic" },
      ],
      active: true,
    },
    {
      id: "colour",
      slug: "colour",
      label: "Colour options",
      type: "color",
      required: false,
      filterable: true,
      sortOrder: 2,
      unit: "",
      options: [
        { id: "walnut", label: "Walnut", hex: "#7c5050" },
        { id: "rose", label: "Rose", hex: "#b18a8a" },
        { id: "espresso", label: "Espresso", hex: "#5c4a4a" },
        { id: "blush", label: "Blush", hex: "#d4c2c2" },
        { id: "sand", label: "Sand", hex: "#cbb79b" },
        { id: "ink", label: "Ink", hex: "#2f2a33" },
      ],
      active: true,
    },
    {
      id: "dimensions",
      slug: "dimensions",
      label: "Overall dimensions",
      type: "dimension_list",
      required: false,
      filterable: false,
      sortOrder: 3,
      unit: "cm",
      fields: ["w", "d", "h"],
      options: [],
      active: true,
    },
    {
      id: "warranty",
      slug: "warranty",
      label: "Warranty",
      type: "text",
      required: false,
      filterable: false,
      sortOrder: 4,
      unit: "",
      options: [],
      active: true,
    },
    {
      id: "use-area",
      slug: "use-area",
      label: "Use / Area",
      type: "select",
      required: false,
      filterable: true,
      sortOrder: 5,
      unit: "",
      options: [
        { id: "living-room", label: "Living room" },
        { id: "bedroom", label: "Bedroom" },
        { id: "dining", label: "Dining" },
        { id: "office", label: "Office" },
        { id: "kitchen", label: "Kitchen" },
        { id: "outdoor", label: "Outdoor" },
        { id: "entryway", label: "Entryway" },
      ],
      active: true,
    },
    {
      id: "frame-finish",
      slug: "frame-finish",
      label: "Frame finish",
      type: "select",
      required: false,
      filterable: false,
      sortOrder: 6,
      unit: "",
      options: [
        { id: "matte", label: "Matte" },
        { id: "satin", label: "Satin" },
        { id: "gloss", label: "Gloss" },
        { id: "natural", label: "Natural oil" },
      ],
      active: true,
    },
  ];
}

export function defaultAttributeIds() {
  return createDefaultAttributeDefinitions().map((definition) => definition.id);
}

function sanitizeOption(raw, index, { withHex = false } = {}) {
  if (!raw || typeof raw !== "object") return null;
  const label = String(raw.label ?? "").trim();
  if (!label) return null;
  const id = slugify(raw.id || label) || `option-${index + 1}`;
  const option = { id, label };
  if (withHex) {
    const hex = String(raw.hex ?? "#cccccc").trim();
    option.hex = /^#[0-9a-fA-F]{3,8}$/.test(hex) ? hex : "#cccccc";
  }
  return option;
}

export function normalizeAttributeOptionList(options, type) {
  const withHex = type === "color";
  const list = Array.isArray(options) ? options : [];
  const seen = new Set();
  const normalized = [];

  list.forEach((raw, index) => {
    const option = sanitizeOption(raw, index, { withHex });
    if (!option || seen.has(option.id)) return;
    seen.add(option.id);
    normalized.push(option);
  });

  return normalized;
}

export function normalizeAttributeDefinition(input = {}, existing = null) {
  const label = String(input.label ?? existing?.label ?? "").trim();
  if (!label) {
    throw new Error("Attribute label is required.");
  }

  const type = String(input.type ?? existing?.type ?? "text").trim();
  if (!ATTRIBUTE_TYPE_IDS.has(type)) {
    throw new Error("Choose a valid attribute type.");
  }

  const slugSource = input.slug || existing?.slug || label;
  const slug = slugify(slugSource);
  if (!slug) {
    throw new Error("Attribute slug is required.");
  }

  const needsOptions = type === "select" || type === "multiselect" || type === "color";
  const options = needsOptions
    ? normalizeAttributeOptionList(input.options ?? existing?.options, type)
    : [];

  if (needsOptions && options.length === 0) {
    throw new Error("Add at least one option for this attribute type.");
  }

  const fields =
    type === "dimension_list"
      ? ["w", "d", "h"]
      : Array.isArray(input.fields)
        ? input.fields.map(String)
        : existing?.fields ?? [];

  return {
    id: existing?.id ?? (slugify(input.id || slug) || createId("attr-")),
    slug,
    label,
    type,
    required: Boolean(input.required ?? existing?.required ?? false),
    filterable: Boolean(input.filterable ?? existing?.filterable ?? false),
    sortOrder: Number(input.sortOrder ?? existing?.sortOrder ?? 0) || 0,
    unit: String(input.unit ?? existing?.unit ?? "").trim(),
    options,
    fields,
    active: input.active ?? existing?.active ?? true,
  };
}

function emptyValueForType(type) {
  switch (type) {
    case "multiselect":
    case "color":
    case "dimension_list":
      return [];
    case "number":
      return null;
    default:
      return "";
  }
}

function normalizeDimensionRow(raw, index, fallbackUnit) {
  if (!raw || typeof raw !== "object") return null;
  const label = String(raw.label ?? "").trim() || `Size ${index + 1}`;
  const w = Number(raw.w);
  const d = Number(raw.d);
  const h = Number(raw.h);
  if (![w, d, h].every((value) => Number.isFinite(value) && value >= 0)) {
    return null;
  }
  return {
    id: String(raw.id ?? createId("dim-")),
    label,
    w,
    d,
    h,
    unit: String(raw.unit ?? fallbackUnit ?? "cm").trim() || "cm",
  };
}

export function normalizeAttributeValue(definition, raw) {
  if (!definition) return undefined;

  switch (definition.type) {
    case "text": {
      return String(raw ?? "").trim();
    }
    case "number": {
      if (raw === "" || raw == null) return null;
      const value = Number(raw);
      return Number.isFinite(value) ? value : null;
    }
    case "select": {
      const value = String(raw ?? "").trim();
      if (!value) return "";
      const allowed = new Set(definition.options.map((option) => option.id));
      return allowed.has(value) ? value : "";
    }
    case "multiselect":
    case "color": {
      const values = Array.isArray(raw)
        ? raw
        : String(raw ?? "")
            .split(",")
            .map((part) => part.trim())
            .filter(Boolean);
      const allowed = new Set(definition.options.map((option) => option.id));
      return [...new Set(values.map(String).filter((id) => allowed.has(id)))];
    }
    case "dimension_list": {
      const rows = Array.isArray(raw) ? raw : [];
      return rows
        .map((row, index) => normalizeDimensionRow(row, index, definition.unit))
        .filter(Boolean);
    }
    default:
      return emptyValueForType(definition.type);
  }
}

export function normalizeProductAttributes(definitions, attributes = {}, legacy = {}) {
  const byId = Object.fromEntries(
    (definitions || []).map((definition) => [definition.id, definition]),
  );
  const source =
    attributes && typeof attributes === "object" && !Array.isArray(attributes)
      ? { ...attributes }
      : {};

  // Migrate older hard-coded product fields into the flexible map.
  if (!source.material && legacy.selectedMaterial) {
    const material = byId.material;
    const match = material?.options?.find(
      (option) =>
        option.label.toLowerCase() === String(legacy.selectedMaterial).toLowerCase() ||
        option.id === slugify(legacy.selectedMaterial),
    );
    source.material = match?.id ?? "";
    if (!match && material) {
      // Keep readable text via warranty-style fallback only if select fails — store as text in a temp key ignored.
    }
  }
  if (!source["frame-finish"] && legacy.frameFinish) {
    const finish = byId["frame-finish"];
    const match = finish?.options?.find(
      (option) =>
        option.label.toLowerCase() === String(legacy.frameFinish).toLowerCase() ||
        option.id === slugify(legacy.frameFinish),
    );
    source["frame-finish"] = match?.id ?? slugify(legacy.frameFinish);
  }

  const normalized = {};
  for (const definition of definitions || []) {
    if (definition.active === false) continue;
    const value = normalizeAttributeValue(definition, source[definition.id]);
    if (value === undefined) continue;
    const isEmptyArray = Array.isArray(value) && value.length === 0;
    const isEmptyString = value === "";
    const isNull = value == null;
    if (definition.required && (isEmptyArray || isEmptyString || isNull)) {
      throw new Error(`${definition.label} is required.`);
    }
    normalized[definition.id] = value;
  }

  return normalized;
}

export function resolveOptionLabel(definition, optionId) {
  return (
    definition?.options?.find((option) => option.id === optionId)?.label ??
    optionId ??
    ""
  );
}

export function formatDimensionRow(row) {
  if (!row) return "";
  const unit = row.unit || "cm";
  return `${row.label}: ${row.w} × ${row.d} × ${row.h} ${unit}`;
}

export function formatAttributeDisplayValue(definition, value) {
  if (!definition) return "";

  switch (definition.type) {
    case "text":
      return String(value ?? "").trim();
    case "number": {
      if (value == null || value === "") return "";
      const unit = definition.unit ? ` ${definition.unit}` : "";
      return `${value}${unit}`;
    }
    case "select":
      return resolveOptionLabel(definition, value);
    case "multiselect":
    case "color": {
      const ids = Array.isArray(value) ? value : [];
      return ids
        .map((id) => resolveOptionLabel(definition, id))
        .filter(Boolean)
        .join(", ");
    }
    case "dimension_list": {
      const rows = Array.isArray(value) ? value : [];
      return rows.map(formatDimensionRow).filter(Boolean).join(" · ");
    }
    default:
      return String(value ?? "");
  }
}

export function buildProductDisplayAttributes(product, definitions = []) {
  const attributes = product?.attributes ?? {};
  const activeDefs = [...definitions]
    .filter((definition) => definition.active !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const specs = [];
  let swatches = [];
  let selectedMaterial = "";
  let frameFinish = "";
  let warranty = "";
  let dimensions = [];

  for (const definition of activeDefs) {
    const value = attributes[definition.id];
    const display = formatAttributeDisplayValue(definition, value);
    if (!display && definition.type !== "color" && definition.type !== "dimension_list") {
      continue;
    }

    if (definition.type === "color") {
      const selectedIds = Array.isArray(value) ? value : [];
      swatches = definition.options
        .filter((option) => selectedIds.includes(option.id))
        .map((option, index) => ({
          id: option.id,
          label: option.label,
          color: option.hex || "#cccccc",
          selected: index === 0,
        }));
      continue;
    }

    if (definition.type === "dimension_list") {
      dimensions = Array.isArray(value) ? value : [];
      continue;
    }

    if (definition.id === "material" || definition.slug === "material") {
      selectedMaterial = display || selectedMaterial;
    }
    if (definition.id === "frame-finish" || definition.slug === "frame-finish") {
      frameFinish = display || frameFinish;
    }
    if (definition.id === "warranty" || definition.slug === "warranty") {
      warranty = display || warranty;
    }

    if (display) {
      specs.push({ label: definition.label, value: display });
    }
  }

  // Back-compat when attributes are empty.
  if (!selectedMaterial && product?.selectedMaterial) {
    selectedMaterial = product.selectedMaterial;
  }
  if (!frameFinish && product?.frameFinish) {
    frameFinish = product.frameFinish;
  }

  return {
    specs,
    swatches,
    selectedMaterial,
    frameFinish,
    warranty,
    dimensions,
  };
}

export function definitionsForCategory(definitions, category) {
  const all = [...(definitions || [])]
    .filter((definition) => definition.active !== false)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const ids = Array.isArray(category?.attributeIds) ? category.attributeIds : null;
  if (!ids || ids.length === 0) {
    return all;
  }

  const byId = Object.fromEntries(all.map((definition) => [definition.id, definition]));
  return ids.map((id) => byId[id]).filter(Boolean);
}
