import {
  brandFilters,
  colorFilters,
  materialFilters,
  upholsteryFilters,
} from "@/data/productsPageContent";

function FilterSection({ title, children }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-fraunces text-xs uppercase tracking-[1.2px] text-[#6c5d33]">
        {title}
      </p>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function CheckboxFilter({ label, rounded = false }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span
        className={`size-4 shrink-0 border border-nav ${rounded ? "rounded-full" : ""}`}
        aria-hidden="true"
      />
      <span className="font-fraunces text-base text-nav">{label}</span>
    </label>
  );
}

function ColorFilter({ label, color }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span
        className="size-5 shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="font-fraunces text-base text-nav">{label}</span>
    </label>
  );
}

export default function ProductsFilterSidebar() {
  return (
    <aside aria-label="Product filters" className="w-full shrink-0 lg:w-72">
      <div className="flex flex-col gap-12">
        <FilterSection title="Brand">
          {brandFilters.map((brand) => (
            <CheckboxFilter key={brand} label={brand} />
          ))}
        </FilterSection>

        <FilterSection title="Upholstery Material">
          {upholsteryFilters.map((material) => (
            <CheckboxFilter key={material} label={material} />
          ))}
        </FilterSection>

        <FilterSection title="Material">
          {materialFilters.map((material) => (
            <CheckboxFilter key={material} label={material} rounded />
          ))}
        </FilterSection>

        <FilterSection title="Color">
          {colorFilters.map((item) => (
            <ColorFilter key={item.label} label={item.label} color={item.color} />
          ))}
        </FilterSection>

        <div className="flex flex-col gap-4">
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
    </aside>
  );
}
