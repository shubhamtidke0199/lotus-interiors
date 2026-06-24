import SearchIcon from "@/components/icons/SearchIcon";

export default function ProductSearchBar({ className = "" }) {
  return (
    <div
      className={`flex h-[52px] items-center gap-4 bg-accent-cream py-5 pl-1.5 pr-6 ${className}`}
      role="search"
    >
      <div className="flex size-[42px] shrink-0 items-center justify-center bg-white p-[9px]">
        <SearchIcon className="text-primary" />
      </div>
      <span className="font-helvetica text-xs font-medium uppercase leading-6 tracking-[var(--tracking-cta)] text-primary">
        Search products...
      </span>
    </div>
  );
}
