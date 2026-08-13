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
    <section aria-label="Hero" className="pb-4 sm:pb-5 md:px-5">
      <div className="container-site flex flex-col gap-4 lg:gap-0">
        <div className="relative min-h-[14rem] overflow-hidden sm:min-h-[18rem] md:rounded-[2.5rem] lg:min-h-[36rem]">
          {heroBackgrounds.map((background, index) => (
            <img
              key={background.id}
              src={background.src}
              alt={background.alt}
              className={`absolute inset-0 h-full w-full max-w-none object-cover object-[center_35%] transition-opacity duration-1000 ease-in-out sm:object-[center_30%] ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}

          <div className="relative z-10 hidden min-h-[36rem] flex-col justify-end gap-3 p-5 sm:gap-4 sm:p-7 lg:flex lg:px-12 lg:pb-12 lg:pt-48">
            <HeroContentCard variant="overlay" />
            <div className="animate-[fadeUp_1s_ease_both] [animation-delay:120ms]">
              <HeroStatsBar variant="overlay" />
            </div>
          </div>

          {heroBackgrounds.length > 1 && (
            <div
              className="absolute bottom-4 right-4 z-20 flex gap-2 sm:bottom-5 sm:right-5 lg:bottom-8 lg:right-8"
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

        <div className="flex flex-col gap-3 px-1 sm:px-0 lg:hidden">
          <HeroContentCard variant="standalone" />
          <HeroStatsBar variant="standalone" />
        </div>
      </div>
    </section>
  );
}
