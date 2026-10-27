import { LoaderCircle } from "lucide-react";

export default function AdminConsoleLoading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <LoaderCircle
        className="size-6 animate-spin text-[color:var(--admin-ink)]"
        aria-hidden="true"
      />
      <p className="font-helvetica text-sm text-[color:var(--admin-muted)]">
        Loading…
      </p>
    </div>
  );
}
