"use client";

import { useState } from "react";
import { testimonials } from "@/data/landingContent";

function ChevronIcon({ direction = "left", className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 12"
      fill="none"
      className={`h-3 w-4 ${direction === "left" ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M9.34611 11.3076L8.29228 10.2231L12.1115 6.4038H0V4.90384H12.1115L8.29228 1.08459L9.34611 0L14.9999 5.65382L9.34611 11.3076Z"
        fill="currentColor"
      />
    </svg>
  );
}

function QuoteMarkIcon() {
  return (
    <div aria-hidden="true" className="mb-6 flex gap-3">
      <span className="size-10 rounded-full bg-white/35" />
      <span className="size-10 rounded-full bg-white/35" />
    </div>
  );
}

function TestimonialCard({
  testimonial,
  titleId,
  onPrevious,
  onNext,
  showNavigation = true,
}) {
  return (
    <article className="testimonial-glass-card flex min-h-[535px] w-full max-w-[1011px] flex-col rounded-[32px] px-6 py-10 sm:px-10 lg:px-10 lg:pb-16 lg:pt-32">
      <div className="grid flex-1 gap-10 lg:grid-cols-2 lg:gap-20">
        <header className="flex flex-col justify-between">
          <div>
            <p className="font-fraunces text-base uppercase leading-4 tracking-[var(--tracking-eyebrow)] text-testimonial-accent">
              Client Voices
            </p>
            <h2
              id={titleId}
              className="mt-8 font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:text-[36px] lg:leading-12"
            >
              Shared visions, meticulously realized.
            </h2>
          </div>

          {showNavigation && (
            <div className="mt-8 flex gap-4">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={onPrevious}
                className="inline-flex size-12 items-center justify-center rounded-lg bg-white text-nav shadow-sm transition-opacity hover:opacity-80"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={onNext}
                className="inline-flex size-12 items-center justify-center rounded-lg bg-white text-nav shadow-sm transition-opacity hover:opacity-80"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          )}
        </header>

        <figure className="flex flex-col">
          <QuoteMarkIcon />
          <blockquote className="font-fraunces text-lg font-normal leading-8 text-heading sm:text-xl sm:leading-[39px]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-10 flex flex-col gap-1">
            <cite className="not-italic font-fraunces text-base font-semibold leading-6 text-heading">
              {testimonial.author}
            </cite>
            <p className="font-fraunces text-xs uppercase leading-4 tracking-[1.2px] text-testimonial-accent">
              {testimonial.role}
            </p>
          </figcaption>
        </figure>
      </div>
    </article>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = testimonials.length;

  const goPrevious = () =>
    setActiveIndex((prev) => (prev - 1 + slideCount) % slideCount);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % slideCount);

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative min-h-[640px] overflow-hidden py-16 lg:min-h-[815px] lg:py-[110px]"
    >
      <img
        src="/images/testimonials/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex items-center justify-center gap-6 lg:gap-8">
          <div
            aria-hidden="true"
            className="testimonial-glass-card hidden min-h-[535px] w-[1011px] max-w-[18vw] shrink-0 scale-[0.92] rounded-[32px] opacity-45 lg:block"
          />

          <TestimonialCard
            testimonial={testimonials[activeIndex]}
            titleId="testimonials-title"
            onPrevious={goPrevious}
            onNext={goNext}
          />

          <div
            aria-hidden="true"
            className="testimonial-glass-card hidden min-h-[535px] w-[1011px] max-w-[18vw] shrink-0 scale-[0.92] rounded-[32px] opacity-45 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
