"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildPageHref } from "@/lib/cms/pagination";

function Control({ disabled, href, onClick, children, label }) {
  const className =
    "inline-flex h-9 items-center gap-1.5 border border-[color:var(--admin-line)] bg-white px-3 font-helvetica text-xs font-medium text-[color:var(--admin-ink)] transition-colors hover:border-[color:var(--admin-ink)] hover:bg-[color:var(--admin-surface)] disabled:cursor-not-allowed disabled:opacity-40";

  if (href && !disabled) {
    return (
      <Link href={href} className={className} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      {children}
    </button>
  );
}

export default function AdminPagination({
  page,
  totalPages,
  total,
  from,
  to,
  basePath,
  query = {},
  onPageChange,
  noun = "items",
}) {
  if (total <= 0 || totalPages <= 1) return null;

  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;
  const useLinks = Boolean(basePath);

  return (
    <div className="flex flex-col gap-3 border-t border-[color:var(--admin-line)] bg-[color:var(--admin-panel)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-helvetica text-xs text-[color:var(--admin-muted)]">
        Showing {from}–{to} of {total} {noun}
      </p>
      <div className="flex items-center gap-2">
        <Control
          disabled={prevDisabled}
          href={
            useLinks && !prevDisabled
              ? buildPageHref(basePath, page - 1, query)
              : undefined
          }
          onClick={
            !useLinks && onPageChange ? () => onPageChange(page - 1) : undefined
          }
          label="Previous page"
        >
          <ChevronLeft className="size-3.5" aria-hidden="true" />
          Prev
        </Control>
        <span className="min-w-[4.5rem] text-center font-helvetica text-xs text-[color:var(--admin-ink)]">
          {page} / {totalPages}
        </span>
        <Control
          disabled={nextDisabled}
          href={
            useLinks && !nextDisabled
              ? buildPageHref(basePath, page + 1, query)
              : undefined
          }
          onClick={
            !useLinks && onPageChange ? () => onPageChange(page + 1) : undefined
          }
          label="Next page"
        >
          Next
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Control>
      </div>
    </div>
  );
}
