"use client";

import FilterTabs from "@/components/ui/FilterTabs";
import PortfolioCard from "@/components/ui/PortfolioCard";
import SectionIntro from "@/components/ui/SectionIntro";
import { portfolioProjects, productFilters } from "@/data/landingContent";

export default function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-title"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <SectionIntro
          eyebrow="Presence"
          title="Design Excellence in Your City"
          titleId="portfolio-title"
          action={<FilterTabs tabs={productFilters} />}
        />

        <div className="grid gap-8 lg:grid-cols-3 lg:items-end xl:grid-cols-[388px_500px_388px] xl:justify-between">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className={index === 1 ? "lg:-translate-y-14" : undefined}
            >
              <PortfolioCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
