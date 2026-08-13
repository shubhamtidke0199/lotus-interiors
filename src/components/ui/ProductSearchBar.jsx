"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";

export default function ProductSearchBar({
  className = "",
  placeholder = "Search products...",
  defaultValue = "",
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    const href = trimmed
      ? `/products?q=${encodeURIComponent(trimmed)}`
      : "/products";
    router.push(href);
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex h-11 items-center gap-3 bg-accent-cream py-3 pl-1.5 pr-3 ${className}`}
    >
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <button
        type="submit"
        className="flex size-9 shrink-0 items-center justify-center bg-white p-2 text-primary transition-opacity hover:opacity-80"
        aria-label="Search"
      >
        <SearchIcon className="text-primary" />
      </button>
      <input
        id="product-search"
        name="q"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent font-helvetica text-xs font-medium uppercase leading-5 tracking-[var(--tracking-cta)] text-primary placeholder:text-primary/70 focus-visible:outline-none"
      />
    </form>
  );
}
