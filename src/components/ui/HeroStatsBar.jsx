import HeroStatItem from "@/components/ui/HeroStatItem";
import { heroStats } from "@/data/heroContent";

export default function HeroStatsBar() {
  return (
    <aside
      aria-label="Studio highlights"
      className="hero-stats-panel w-full max-w-[710px] rounded-[16px] px-6 py-5 backdrop-blur-[27px] sm:rounded-[20px] sm:px-10 sm:py-6"
    >
      <div className="flex items-center">
        {heroStats.map((stat, index) => (
          <div key={stat.number} className="flex min-w-0 flex-1 items-center">
            {index > 0 && (
              <div
                aria-hidden="true"
                className="mx-4 hidden h-[70px] w-px shrink-0 self-center bg-white/30 sm:mx-6 sm:block"
              />
            )}
            <HeroStatItem number={stat.number} label={stat.label} />
          </div>
        ))}
      </div>
    </aside>
  );
}
