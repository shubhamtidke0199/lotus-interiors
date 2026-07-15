import HeroStatItem from "@/components/ui/HeroStatItem";
import { heroStats } from "@/data/heroContent";

export default function HeroStatsBar() {
  return (
    <aside
      aria-label="Studio highlights"
      className="hero-stats-panel w-full max-w-xl rounded-2xl px-5 py-4 backdrop-blur-[20px] sm:px-8 sm:py-5"
    >
      <div className="flex items-center">
        {heroStats.map((stat, index) => (
          <div key={stat.number} className="flex min-w-0 flex-1 items-center">
            {index > 0 && (
              <div
                aria-hidden="true"
                className="mx-3 hidden h-14 w-px shrink-0 self-center bg-white/30 sm:mx-5 sm:block"
              />
            )}
            <HeroStatItem number={stat.number} label={stat.label} />
          </div>
        ))}
      </div>
    </aside>
  );
}
