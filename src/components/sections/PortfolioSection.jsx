"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FilterTabs from "@/components/ui/FilterTabs";
import PortfolioCard from "@/components/ui/PortfolioCard";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { portfolioFilters, portfolioProjects } from "@/data/landingContent";

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFilter = portfolioFilters[activeIndex];

  const filteredProjects = useMemo(() => {
    if (activeFilter === "ALL") return portfolioProjects;
    return portfolioProjects.filter(
      (project) => project.filter === activeFilter,
    );
  }, [activeFilter]);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-16">
        <Reveal>
          <SectionIntro
            eyebrow="Portfolio"
            title="Design Excellence Across Typologies"
            titleId="portfolio-title"
            action={
              <FilterTabs
                tabs={portfolioFilters}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
                className="lg:justify-end"
              />
            }
          />
        </Reveal>

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-3 lg:items-end xl:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_minmax(0,1fr)] xl:justify-between">
          {filteredProjects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={index * 80}
              className={
                index === 1 && filteredProjects.length > 2
                  ? "lg:-translate-y-6 xl:-translate-y-10"
                  : undefined
              }
            >
              <PortfolioCard {...project} />
            </Reveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="font-fraunces text-sm text-muted">
            No projects in this category yet.{" "}
            <Link
              href="/portfolio"
              className="text-primary underline-offset-2 hover:underline"
            >
              View the full gallery
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
