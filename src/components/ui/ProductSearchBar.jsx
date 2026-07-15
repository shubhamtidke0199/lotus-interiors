import SearchIcon from "@/components/icons/SearchIcon";

export default function ProductSearchBar({
  className = "",
  placeholder = "Search products...",
}) {
  return (
    <div
      className={`flex h-11 items-center gap-3 bg-accent-cream py-3 pl-1.5 pr-5 ${className}`}
      role="search"
    >
      <div className="flex size-9 shrink-0 items-center justify-center bg-white p-2">
        <SearchIcon className="text-primary" />
      </div>
      <span className="font-helvetica text-xs font-medium uppercase leading-5 tracking-[var(--tracking-cta)] text-primary">
        {placeholder}
      </span>
    </div>
  );
}
