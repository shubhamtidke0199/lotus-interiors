"use client";

import {
  brandFilters,
  colorFilters,
  materialFilters,
  upholsteryFilters,
} from "@/data/productsPageContent";

function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-fraunces text-xs uppercase tracking-[1.2px] text-[#6c5d33]">
        {title}
      </p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function CheckboxFilter({ label, checked, onChange, rounded = false }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={`flex size-4 shrink-0 items-center justify-center border border-nav ${
          rounded ? "rounded-full" : ""
        } ${checked ? "bg-primary border-primary" : ""}`}
        aria-hidden="true"
      >
        {checked && !rounded && (
          <span className="size-1.5 bg-white" />
        )}
      </span>
      <span className="font-fraunces text-sm text-nav">{label}</span>
    </label>
  );
}

function ColorFilter({ label, color }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="size-5 shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="font-fraunces text-sm text-nav">{label}</span>
    </div>
  );
}

export default function ProductsFilterSidebar({
  categories,
  activeBrands = [],
  onBrandChange,
}) {
  function toggleBrand(brand) {
    if (!onBrandChange) return;
    if (activeBrands.includes(brand)) {
      onBrandChange(activeBrands.filter((item) => item !== brand));
    } else {
      onBrandChange([...activeBrands, brand]);
    }
  }

  return (
    <aside
      aria-label="Product filters"
      className="w-full shrink-0 border-b border-product-bg pb-8 lg:w-64 lg:border-b-0 lg:pb-0"
    >
      <details className="group lg:open" open>
        <summary className="cursor-pointer list-none font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-nav lg:pointer-events-none lg:cursor-default">
          <span className="lg:hidden">Filters</span>
          <span className="hidden lg:inline">Refine</span>
        </summary>
        <div className="mt-6 flex flex-col gap-8 lg:mt-0 lg:gap-10">
          <FilterSection title="Category">
            {(categories ?? brandFilters).map((brand) => (
              <CheckboxFilter
                key={brand}
                label={brand}
                checked={activeBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
            ))}
          </FilterSection>

          <FilterSection title="Upholstery Material">
            {upholsteryFilters.map((material) => (
              <div key={material} className="flex items-center gap-3">
                <span className="size-4 shrink-0 border border-nav" aria-hidden="true" />
                <span className="font-fraunces text-sm text-nav">{material}</span>
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Material">
            {materialFilters.map((material) => (
              <div key={material} className="flex items-center gap-3">
                <span
                  className="size-4 shrink-0 rounded-full border border-nav"
                  aria-hidden="true"
                />
                <span className="font-fraunces text-sm text-nav">{material}</span>
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Finish Swatches">
            {colorFilters.map((item) => (
              <ColorFilter
                key={item.label}
                label={item.label}
                color={item.color}
              />
            ))}
          </FilterSection>

          <div className="flex flex-col gap-3">
            <p className="pb-2 font-fraunces text-xs uppercase tracking-[1.2px] text-[#6c5d33]">
              Price Preference
            </p>
            <div className="relative mt-2 h-1.5 rounded-xl bg-primary">
              <span className="absolute left-0 top-1/2 size-[18px] -translate-y-1/2 rounded-full border border-white bg-white" />
            </div>
            <div className="flex items-start justify-between">
              <span className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                Bespoke
              </span>
              <span className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                Premium
              </span>
            </div>
          </div>
        </div>
      </details>
    </aside>
  );
}
