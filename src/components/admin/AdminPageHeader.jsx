import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { adminBtnGhost, adminBtnPrimary, adminBtnSecondary } from "@/components/admin/adminUi";

export default function AdminPageHeader({
  eyebrow,
  title,
  description,
  backHref,
  backLabel = "Back",
  actions,
  primaryAction,
  secondaryAction,
}) {
  return (
    <header className="flex flex-col gap-5 border-b border-[color:var(--admin-line)] pb-6">
      {backHref ? (
        <Link href={backHref} className={`${adminBtnGhost} -ml-3 w-fit px-3`}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {backLabel}
        </Link>
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          {eyebrow ? (
            <p className="font-helvetica text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--admin-muted)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1.5 font-helvetica text-[1.75rem] font-medium tracking-[-0.02em] text-[color:var(--admin-ink)] sm:text-[2rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-xl font-helvetica text-sm leading-6 text-[color:var(--admin-muted)]">
              {description}
            </p>
          ) : null}
        </div>

        {(actions || primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-2">
            {secondaryAction ? (
              <Link href={secondaryAction.href} className={adminBtnSecondary}>
                {secondaryAction.label}
              </Link>
            ) : null}
            {primaryAction ? (
              <Link href={primaryAction.href} className={adminBtnPrimary}>
                {primaryAction.label}
              </Link>
            ) : null}
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
