export default function HeroStatItem({ number, label, variant = "overlay" }) {
  const isOverlay = variant === "overlay";

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5">
      <div
        className={`size-8 shrink-0 sm:size-10 ${
          isOverlay ? "bg-white" : "bg-primary/15"
        }`}
        aria-hidden="true"
      />
      <div className="flex min-w-0 flex-col gap-0.5">
        <span
          className={`font-fraunces text-sm font-normal leading-5 sm:text-base ${
            isOverlay ? "text-white" : "text-heading"
          }`}
        >
          {number}
        </span>
        <span
          className={`font-fraunces text-[9px] font-normal leading-4 sm:text-[10px] ${
            isOverlay ? "text-white/85" : "text-muted"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
