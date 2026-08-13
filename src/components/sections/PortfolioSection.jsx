"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FilterTabs from "@/components/ui/FilterTabs";
import PortfolioCarousel from "@/components/ui/PortfolioCarousel";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { portfolioFilters, portfolioProjects } from "@/data/landingContent";

export default function PortfolioSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFilter = portfolioFilters[activeIndex];

  const filteredProjects = useMemo(
    () => portfolioProjects.filter((project) => project.filter === activeFilter),
    [activeFilter],
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-12">
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

        {filteredProjects.length > 0 ? (
          <PortfolioCarousel key={activeFilter} projects={filteredProjects} />
        ) : (
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
