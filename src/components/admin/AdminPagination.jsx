"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { adminBtnSecondary } from "@/components/admin/adminUi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildPageHref } from "@/lib/cms/pagination";

function Control({ disabled, href, onClick, children, label }) {
  const className = cn(adminBtnSecondary, "h-9 px-3 text-xs");

  if (href && !disabled) {
    return (
      <Button variant="outline" className={className} render={<Link href={href} />} aria-label={label}>
        {children}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={onClick}
      className={className}
      aria-label={label}
    >
      {children}
    </Button>
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
    <div className="flex flex-col gap-3 border-t border-border bg-card px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-helvetica text-xs text-muted-foreground">
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
        <span className="min-w-[4.5rem] text-center font-helvetica text-xs text-foreground">
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
