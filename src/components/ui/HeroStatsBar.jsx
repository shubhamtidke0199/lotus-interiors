import HeroStatItem from "@/components/ui/HeroStatItem";
import { heroStats } from "@/data/heroContent";

const variants = {
  overlay: "hero-stats-panel backdrop-blur-[20px]",
  standalone:
    "border border-product-bg bg-accent-cream shadow-[0_4px_20px_rgba(83,70,108,0.06)]",
};

export default function HeroStatsBar({ variant = "overlay" }) {
  const panelClass = variants[variant] ?? variants.overlay;
  const dividerClass =
    variant === "overlay" ? "bg-white/30" : "bg-primary/20";

  return (
    <aside
      aria-label="Studio highlights"
      className={`w-full max-w-xl rounded-2xl px-5 py-4 sm:px-8 sm:py-5 ${panelClass}`}
    >
      <div className="flex items-center">
        {heroStats.map((stat, index) => (
          <div key={stat.number} className="flex min-w-0 flex-1 items-center">
            {index > 0 && (
              <div
                aria-hidden="true"
                className={`mx-3 hidden h-14 w-px shrink-0 self-center sm:mx-5 sm:block ${dividerClass}`}
              />
            )}
            <HeroStatItem
              number={stat.number}
              label={stat.label}
              variant={variant}
            />
          </div>
        ))}
      </div>
    </aside>
  );
}
