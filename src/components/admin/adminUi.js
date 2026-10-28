/** Shared admin UI — shadcn/ui primitives + Lotus console tokens. */

import { cn } from "@/lib/utils";
import { badgeVariants } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

export const adminLabel =
  "font-helvetica text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground";

export const adminInput =
  "font-helvetica h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export const adminTextarea =
  "font-helvetica min-h-28 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-6 shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export const adminSelect = adminInput;

export const adminBtnPrimary = cn(
  buttonVariants({ variant: "default", size: "lg" }),
  "h-10 px-4 font-helvetica text-[13px] font-medium",
);

export const adminBtnSecondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-10 px-4 font-helvetica text-[13px] font-medium bg-background",
);

export const adminBtnGhost = cn(
  buttonVariants({ variant: "ghost", size: "lg" }),
  "h-10 px-3 font-helvetica text-[13px] font-medium text-muted-foreground",
);

export const adminBtnDanger = cn(
  buttonVariants({ variant: "destructive", size: "lg" }),
  "h-10 px-3 font-helvetica text-[13px] font-medium bg-transparent",
);

export const adminTh =
  "h-10 px-4 text-left align-middle font-helvetica text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground";

export const adminTd =
  "px-4 py-3.5 align-middle font-helvetica text-sm text-foreground";

export const adminRow = "border-b border-border transition-colors hover:bg-muted/50";

export const adminError =
  "rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 font-helvetica text-sm text-destructive";

export const adminSuccess =
  "rounded-md border border-[color:var(--admin-ok)]/25 bg-[color:var(--admin-ok)]/10 px-3 py-2 font-helvetica text-sm text-[color:var(--admin-ok)]";

export const adminChip = cn(
  badgeVariants({ variant: "outline" }),
  "h-auto rounded-md px-2.5 py-1 font-helvetica font-normal",
);

export const adminChipActive = cn(
  badgeVariants({ variant: "default" }),
  "h-auto rounded-md px-2.5 py-1 font-helvetica font-normal",
);

export function statusTone(kind) {
  switch (kind) {
    case "published":
    case "active":
    case "won":
      return "border-transparent bg-[color:var(--admin-ok)]/12 text-[color:var(--admin-ok)] hover:bg-[color:var(--admin-ok)]/12";
    case "draft":
    case "hidden":
    case "lost":
      return "border-transparent bg-muted text-muted-foreground hover:bg-muted";
    case "new":
      return "border-transparent bg-[#3d4f5f]/12 text-[#3d4f5f] hover:bg-[#3d4f5f]/12";
    default:
      return "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary";
  }
}

export function statusBadgeClass(tone = "default") {
  return cn(
    badgeVariants({ variant: "secondary" }),
    "h-auto rounded-md px-2 py-0.5 font-helvetica text-[11px] font-medium tracking-wide",
    statusTone(tone),
  );
}
