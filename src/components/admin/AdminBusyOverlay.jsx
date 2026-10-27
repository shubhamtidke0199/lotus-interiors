"use client";

import { LoaderCircle } from "lucide-react";

export default function AdminBusyOverlay({
  show,
  label = "Working…",
  fullscreen = false,
}) {
  if (!show) return null;

  return (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--admin-panel)]/70 backdrop-blur-[1px]"
          : "absolute inset-0 z-20 flex items-center justify-center bg-[color:var(--admin-panel)]/80 backdrop-blur-[1px]"
      }
      aria-live="polite"
      aria-busy="true"
      role="status"
    >
      <div className="flex items-center gap-3 border border-[color:var(--admin-line)] bg-white px-5 py-4 shadow-sm">
        <LoaderCircle
          className="size-5 animate-spin text-[color:var(--admin-ink)]"
          aria-hidden="true"
        />
        <p className="font-helvetica text-sm text-[color:var(--admin-ink)]">
          {label}
        </p>
      </div>
    </div>
  );
}
