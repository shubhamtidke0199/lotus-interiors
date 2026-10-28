"use client";

import { useMemo, useState } from "react";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { useContactModal } from "@/components/contact/ContactModalContext";

const CUSTOM_SIZE_ID = "__custom__";

function dimensionKey(row, index) {
  return row.id || row.label || `size-${index}`;
}

function formatSizeValue(row) {
  const unit = row.unit || "cm";
  return `${row.w} × ${row.d} × ${row.h} ${unit}`;
}

function parseCustomSize(custom) {
  const w = Number(custom.w);
  const d = Number(custom.d);
  const h = Number(custom.h);
  if (![w, d, h].every((value) => Number.isFinite(value) && value >= 0)) {
    return null;
  }
  const unit = String(custom.unit ?? "cm").trim() || "cm";
  return { label: "Custom", w, d, h, unit };
}

function emptyCustomSize(unit = "cm") {
  return { w: "", d: "", h: "", unit };
}

function SizeSelectChevron({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`size-5 ${className}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductDetailHero({
  slug,
  title,
  summary,
  price,
  selectedMaterial,
  frameFinish,
  gallery,
  specs = [],
  swatches: initialSwatches = [],
  highlights = [],
  dimensions = [],
}) {
  const { openContactModal } = useContactModal();
  const galleryImages = useMemo(() => {
    const extras = Array.isArray(gallery?.images)
      ? gallery.images.filter(Boolean)
      : [gallery?.top, gallery?.bottom].filter(Boolean);
    return [gallery?.main, ...extras].filter(Boolean);
  }, [gallery]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [swatches, setSwatches] = useState(() =>
    Array.isArray(initialSwatches) ? initialSwatches : [],
  );
  const dimensionRows = useMemo(
    () => (Array.isArray(dimensions) ? dimensions.filter(Boolean) : []),
    [dimensions],
  );
  const defaultSizeUnit = dimensionRows[0]?.unit || "cm";
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [customSize, setCustomSize] = useState(() => emptyCustomSize(defaultSizeUnit));

  const displaySpecs = Array.isArray(specs) ? specs : [];
  const displayHighlights = Array.isArray(highlights) ? highlights : [];
  const activeImage = galleryImages[activeIndex] || galleryImages[0];

  const selectedSwatch = useMemo(
    () => swatches.find((swatch) => swatch.selected) || null,
    [swatches],
  );

  const activeMaterial = useMemo(() => {
    if (selectedSwatch?.label) return selectedSwatch.label;
    if (selectedSwatch?.id) {
      return (
        selectedSwatch.id.charAt(0).toUpperCase() + selectedSwatch.id.slice(1)
      );
    }
    return selectedMaterial;
  }, [selectedSwatch, selectedMaterial]);

  const selectedPresetRow = useMemo(() => {
    if (!selectedSizeId || selectedSizeId === CUSTOM_SIZE_ID) return null;
    return (
      dimensionRows.find((row, index) => dimensionKey(row, index) === selectedSizeId) ??
      null
    );
  }, [dimensionRows, selectedSizeId]);

  const parsedCustomSize = useMemo(() => {
    if (selectedSizeId !== CUSTOM_SIZE_ID) return null;
    return parseCustomSize(customSize);
  }, [customSize, selectedSizeId]);

  const selectedSizeSummary = useMemo(() => {
    if (parsedCustomSize) {
      return {
        label: parsedCustomSize.label,
        value: formatSizeValue(parsedCustomSize),
        isCustom: true,
      };
    }
    if (selectedPresetRow) {
      return {
        label: selectedPresetRow.label || "Size",
        value: formatSizeValue(selectedPresetRow),
        isCustom: false,
      };
    }
    return null;
  }, [parsedCustomSize, selectedPresetRow]);

  const shortSummary =
    summary.length > 160 && !expanded
      ? `${summary.slice(0, 160).trim()}…`
      : summary;

  function updateCustomSize(field, value) {
    setCustomSize((current) => ({ ...current, [field]: value }));
  }

  function handleSizeSelectChange(event) {
    const value = event.target.value;
    setSelectedSizeId(value || null);
  }

  function buildSizeSelection() {
    if (selectedSizeId === CUSTOM_SIZE_ID) {
      const parsed = parseCustomSize(customSize);
      if (!parsed) return null;
      return {
        id: CUSTOM_SIZE_ID,
        label: parsed.label,
        value: formatSizeValue(parsed),
        w: parsed.w,
        d: parsed.d,
        h: parsed.h,
        unit: parsed.unit,
        isCustom: true,
      };
    }
    if (!selectedPresetRow) return null;
    const index = dimensionRows.indexOf(selectedPresetRow);
    return {
      id: dimensionKey(selectedPresetRow, index),
      label: selectedPresetRow.label || "Size",
      value: formatSizeValue(selectedPresetRow),
      isCustom: false,
    };
  }

  function handleEnquire() {
    const colourLabel = activeMaterial || selectedSwatch?.label || "";
    const sizeSelection = buildSizeSelection();
    const sizePhrase = sizeSelection
      ? `${sizeSelection.label} (${sizeSelection.value})`
      : "";

    let interest = title;
    const detailParts = [colourLabel, sizePhrase].filter(Boolean);
    if (detailParts.length) {
      interest = `${title} (${detailParts.join(" · ")})`;
    }

    let defaultMessage = `I'm interested in ${title}`;
    if (colourLabel) defaultMessage += ` in ${colourLabel}`;
    if (sizeSelection) {
      defaultMessage += `. Size: ${sizeSelection.label} — ${sizeSelection.value}.`;
    }
    defaultMessage += ".";

    openContactModal({
      source: "enquire",
      title: "Enquire Now",
      description:
        "Share a few details and a Lotus designer will get back to you within one business day.",
      defaultMessage,
      submitLabel: "Send Enquiry",
      interest,
      productId: slug || "",
      productSnapshot: {
        slug: slug || "",
        name: title,
        price: price || "",
        image: activeImage || "",
        selection: {
          ...(selectedSwatch || colourLabel
            ? {
                colour: {
                  id: selectedSwatch?.id || "",
                  label: colourLabel,
                  hex: selectedSwatch?.color || "",
                },
              }
            : {}),
          ...(frameFinish ? { frameFinish: String(frameFinish) } : {}),
          ...(sizeSelection ? { size: sizeSelection } : {}),
        },
      },
    });
  }

  return (
    <section
      aria-labelledby="product-detail-title"
      className="border-t border-product-bg px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
    >
      <div className="container-site grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-8">
        <div className="flex w-full flex-col gap-2">
          <figure className="relative aspect-square overflow-hidden bg-white">
            {activeImage ? (
              <img
                src={activeImage}
                alt={title}
                className="absolute inset-0 size-full object-cover"
                loading="eager"
              />
            ) : null}
          </figure>

          {galleryImages.length > 1 ? (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
              {galleryImages.map((src, index) => (
                <button
                  key={`${src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                  className={`relative aspect-square overflow-hidden bg-white ${
                    activeIndex === index
                      ? "ring-1 ring-primary"
                      : "hover:ring-1 hover:ring-primary/40"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 size-full object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1
              id="product-detail-title"
              className="type-display-heading text-nav"
            >
              {title}
            </h1>
            <p className="font-fraunces text-sm leading-6 text-[#504444] sm:text-base">
              {shortSummary}{" "}
              {summary.length > 160 && (
                <button
                  type="button"
                  className="font-fraunces text-primary underline-offset-2 hover:underline"
                  onClick={() => setExpanded((value) => !value)}
                >
                  {expanded ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>

          <p className="font-fraunces text-2xl leading-none text-services-eyebrow sm:text-3xl">
            {price}
          </p>

          <div className="flex flex-col gap-6">
            {swatches.length > 0 ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-end justify-between gap-4">
                  <p className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav sm:text-base">
                    Colour options
                  </p>
                  <p className="font-fraunces text-xs text-[#504444]">
                    {activeMaterial}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {swatches.map((swatch) => (
                    <button
                      key={swatch.id}
                      type="button"
                      aria-label={`Select ${swatch.label || swatch.id}`}
                      aria-pressed={swatch.selected}
                      onClick={() =>
                        setSwatches((current) =>
                          current.map((item) => ({
                            ...item,
                            selected: item.id === swatch.id,
                          })),
                        )
                      }
                      className={`size-14 shrink-0 border-4 border-white transition-shadow ${
                        swatch.selected
                          ? "ring-1 ring-primary"
                          : "hover:ring-1 hover:ring-primary/40"
                      }`}
                      style={{ backgroundColor: swatch.color }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {frameFinish ? (
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="frame-finish"
                  className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav sm:text-base"
                >
                  Frame Finish
                </label>
                <input
                  id="frame-finish"
                  readOnly
                  value={String(frameFinish).toUpperCase()}
                  className="w-full max-w-xs bg-product-bg px-5 py-3 font-fraunces text-xs uppercase tracking-[1.2px] text-nav"
                />
              </div>
            ) : null}

            {dimensionRows.length > 0 ? (
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="product-size-select"
                  className="font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav sm:text-base"
                >
                  Available sizes
                  <span className="ml-2 font-fraunces text-xs normal-case tracking-normal text-[#504444]">
                    Optional
                  </span>
                </label>
                <div className="relative max-w-md">
                  <select
                    id="product-size-select"
                    value={selectedSizeId ?? ""}
                    onChange={handleSizeSelectChange}
                    className="w-full appearance-none bg-product-bg py-3 pl-5 pr-12 font-fraunces text-sm text-nav outline-none ring-primary focus:ring-1"
                  >
                    <option value="">Select a size</option>
                    {dimensionRows.map((row, index) => {
                      const key = dimensionKey(row, index);
                      const label = row.label || "Size";
                      return (
                        <option key={key} value={key}>
                          {`${label} — ${formatSizeValue(row)}`}
                        </option>
                      );
                    })}
                    <option value={CUSTOM_SIZE_ID}>Custom size — enter dimensions</option>
                  </select>
                  <SizeSelectChevron className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
                </div>
                {selectedSizeId === CUSTOM_SIZE_ID ? (
                  <div className="flex flex-col gap-3 bg-product-bg px-4 py-4">
                    <p className="font-fraunces text-xs uppercase tracking-[var(--tracking-cta)] text-muted">
                      Custom dimensions
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        ["w", "Width"],
                        ["d", "Depth"],
                        ["h", "Height"],
                      ].map(([field, label]) => (
                        <label key={field} className="flex flex-col gap-1.5">
                          <span className="font-fraunces text-xs text-muted">{label}</span>
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={customSize[field]}
                            onChange={(event) => updateCustomSize(field, event.target.value)}
                            placeholder="0"
                            className="bg-white px-3 py-2.5 font-fraunces text-sm text-nav outline-none ring-primary focus:ring-1"
                          />
                        </label>
                      ))}
                    </div>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-fraunces text-xs text-muted">Unit</span>
                      <select
                        value={customSize.unit}
                        onChange={(event) => updateCustomSize("unit", event.target.value)}
                        className="bg-white px-3 py-2.5 font-fraunces text-sm text-nav outline-none ring-primary focus:ring-1"
                      >
                        {["cm", "ft", "in", "m"].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ) : null}
                {selectedSizeSummary ? (
                  <p className="font-fraunces text-xs leading-5 text-[#504444]">
                    Selected:{" "}
                    <span className="text-nav">
                      {`${selectedSizeSummary.label} · ${selectedSizeSummary.value}`}
                    </span>
                  </p>
                ) : null}
              </div>
            ) : null}

            {displaySpecs.length > 0 ? (
              <div className="bg-accent-cream px-5 sm:px-8">
                {displaySpecs.map((spec, index) => (
                  <div
                    key={`${spec.label}-${index}`}
                    className={`flex items-start justify-between gap-6 border-white py-4 ${
                      index < displaySpecs.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <span className="type-eyebrow text-eyebrow">{spec.label}</span>
                    <span className="max-w-[60%] text-right font-fraunces text-base text-nav">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-6 border-t border-[rgba(212,194,194,0.2)] pt-5">
              {displayHighlights.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-3">
                  {displayHighlights.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-3 text-center"
                    >
                      <img
                        src="/images/product-view/column/column-graphic.svg"
                        alt=""
                        aria-hidden="true"
                        className="size-12"
                      />
                      <p className="whitespace-pre-line font-fraunces text-base leading-6 text-nav">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleEnquire}
                className="inline-flex h-12 w-full items-center justify-center gap-3 bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white transition-colors hover:bg-primary/90"
              >
                Enquire Now
                <ArrowIcon className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
