"use client";

import FilterTabs from "@/components/ui/FilterTabs";
import PortfolioCard from "@/components/ui/PortfolioCard";
import SectionIntro from "@/components/ui/SectionIntro";
import { portfolioProjects, productFilters } from "@/data/landingContent";

export default function PortfolioSection() {
  return (
    <section
      aria-labelledby="portfolio-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-16">
        <SectionIntro
          eyebrow="Presence"
          title="Design Excellence in Your City"
          titleId="portfolio-title"
          action={
            <FilterTabs tabs={productFilters} className="lg:justify-end" />
          }
        />

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-3 lg:items-end xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] xl:justify-between">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className={index === 1 ? "lg:-translate-y-10" : undefined}
            >
              <PortfolioCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
