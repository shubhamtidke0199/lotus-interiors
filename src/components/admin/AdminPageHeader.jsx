import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { adminBtnGhost, adminBtnPrimary, adminBtnSecondary } from "@/components/admin/adminUi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <header className="flex flex-col gap-5 border-b border-border pb-6">
      {backHref ? (
        <Button
          variant="ghost"
          size="sm"
          className={cn(adminBtnGhost, "-ml-2 w-fit")}
          render={<Link href={backHref} />}
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {backLabel}
        </Button>
      ) : null}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-2xl">
          {eyebrow ? (
            <p className="font-helvetica text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-1.5 font-helvetica text-[1.75rem] font-medium tracking-[-0.02em] text-foreground sm:text-[2rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-xl font-helvetica text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>

        {(actions || primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center gap-2">
            {secondaryAction ? (
              <Button
                variant="outline"
                className={adminBtnSecondary}
                render={<Link href={secondaryAction.href} />}
              >
                {secondaryAction.label}
              </Button>
            ) : null}
            {primaryAction ? (
              <Button
                className={adminBtnPrimary}
                render={<Link href={primaryAction.href} />}
              >
                {primaryAction.label}
              </Button>
            ) : null}
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}
