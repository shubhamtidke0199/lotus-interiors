"use client";

import { useEffect, useState } from "react";
import HeroContentCard from "@/components/ui/HeroContentCard";
import HeroStatsBar from "@/components/ui/HeroStatsBar";
import { heroBackgrounds } from "@/data/heroContent";

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroBackgrounds.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroBackgrounds.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section aria-label="Hero" className="px-5 pb-5">
      <div className="relative mx-auto min-h-[600px] max-w-[1440px] overflow-hidden rounded-[40px] sm:rounded-[60px] lg:min-h-[832px]">
        {heroBackgrounds.map((background, index) => (
          <img
            key={background.id}
            src={background.src}
            alt={background.alt}
            className={`absolute inset-0 h-[224.36%] w-full max-w-none object-cover transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            } top-[-59.05%]`}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}

        <div className="relative z-10 flex min-h-[600px] flex-col justify-end gap-3 p-6 sm:gap-4 sm:p-8 lg:min-h-[832px] lg:px-[60px] lg:pb-[70px] lg:pt-[344px]">
          <HeroContentCard />
          <HeroStatsBar />
        </div>

        {heroBackgrounds.length > 1 && (
          <div
            className="absolute bottom-6 right-6 z-20 flex gap-2 lg:bottom-10 lg:right-10"
            aria-label="Hero image selection"
          >
            {heroBackgrounds.map((background, index) => (
              <button
                key={background.id}
                type="button"
                aria-label={`Show ${background.id} hero image`}
                aria-pressed={index === activeSlide}
                onClick={() => setActiveSlide(index)}
                className={`size-2.5 rounded-full transition-colors ${
                  index === activeSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
