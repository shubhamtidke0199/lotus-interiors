/** Shared class names for the admin console — keep screens visually consistent. */

export const adminLabel =
  "font-helvetica text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--admin-muted)]";

export const adminInput =
  "h-10 w-full border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] px-3 font-helvetica text-sm text-[color:var(--admin-ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[color:var(--admin-muted)]/70 focus:border-[color:var(--admin-ink)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,20,19,0.06)]";

export const adminTextarea =
  "min-h-28 w-full resize-y border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] px-3 py-2.5 font-helvetica text-sm leading-6 text-[color:var(--admin-ink)] outline-none transition-[border-color,box-shadow] placeholder:text-[color:var(--admin-muted)]/70 focus:border-[color:var(--admin-ink)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,20,19,0.06)]";

export const adminSelect = adminInput;

export const adminBtnPrimary =
  "inline-flex h-10 items-center justify-center gap-2 bg-[color:var(--admin-ink)] px-4 font-helvetica text-[13px] font-medium text-white transition-colors hover:bg-[color:var(--admin-accent)] disabled:cursor-not-allowed disabled:opacity-45";

export const adminBtnSecondary =
  "inline-flex h-10 items-center justify-center gap-2 border border-[color:var(--admin-line)] bg-white px-4 font-helvetica text-[13px] font-medium text-[color:var(--admin-ink)] transition-colors hover:border-[color:var(--admin-ink)] hover:bg-[color:var(--admin-surface)] disabled:cursor-not-allowed disabled:opacity-45";

export const adminBtnGhost =
  "inline-flex h-10 items-center justify-center gap-2 px-3 font-helvetica text-[13px] font-medium text-[color:var(--admin-muted)] transition-colors hover:text-[color:var(--admin-ink)] disabled:opacity-45";

export const adminBtnDanger =
  "inline-flex h-10 items-center justify-center gap-2 px-3 font-helvetica text-[13px] font-medium text-[color:var(--admin-danger)] transition-colors hover:bg-[color:var(--admin-danger)]/8 disabled:opacity-45";

export const adminPanel =
  "border border-[color:var(--admin-line)] bg-[color:var(--admin-panel)]";

export const adminPanelPad = `${adminPanel} px-5 py-5 sm:px-6 sm:py-6`;

export const adminTableWrap = `${adminPanel} overflow-x-auto`;

export const adminTh =
  "border-b border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] px-4 py-3 text-left font-helvetica text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--admin-muted)]";

export const adminTd =
  "border-b border-[color:var(--admin-line)] px-4 py-3.5 align-middle font-helvetica text-sm text-[color:var(--admin-ink)] last:border-b-0";

export const adminRow = "transition-colors hover:bg-[color:var(--admin-surface)]/80";

export const adminError =
  "border border-[color:var(--admin-danger)]/25 bg-[color:var(--admin-danger)]/6 px-3 py-2 font-helvetica text-sm text-[color:var(--admin-danger)]";

export const adminSuccess =
  "border border-[color:var(--admin-ok)]/25 bg-[color:var(--admin-ok)]/8 px-3 py-2 font-helvetica text-sm text-[color:var(--admin-ok)]";

export const adminChip =
  "inline-flex items-center border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] px-2.5 py-1 font-helvetica text-xs text-[color:var(--admin-ink)]";

export const adminChipActive =
  "inline-flex items-center border border-[color:var(--admin-ink)] bg-[color:var(--admin-ink)] px-2.5 py-1 font-helvetica text-xs text-white";

export function statusTone(kind) {
  switch (kind) {
    case "published":
    case "active":
    case "won":
      return "bg-[color:var(--admin-ok)]/12 text-[color:var(--admin-ok)]";
    case "draft":
    case "hidden":
    case "lost":
      return "bg-[color:var(--admin-muted)]/12 text-[color:var(--admin-muted)]";
    case "new":
      return "bg-[#3d4f5f]/12 text-[#3d4f5f]";
    default:
      return "bg-[color:var(--admin-surface)] text-[color:var(--admin-ink)]";
  }
}

export function statusBadgeClass(tone = "default") {
  return `inline-flex items-center px-2 py-0.5 font-helvetica text-[11px] font-medium tracking-wide ${statusTone(tone)}`;
}
