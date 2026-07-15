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
    <div aria-hidden="true" className="mb-5 flex gap-2.5">
      <span className="size-8 rounded-full bg-white/35" />
      <span className="size-8 rounded-full bg-white/35" />
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
    <article className="testimonial-glass-card flex min-h-[26rem] w-full max-w-4xl flex-col rounded-3xl px-5 py-8 sm:px-8 lg:min-h-[28rem] lg:px-8 lg:pb-12 lg:pt-20">
      <div className="grid flex-1 gap-8 lg:grid-cols-2 lg:gap-14">
        <header className="flex flex-col justify-between">
          <div>
            <p className="type-eyebrow text-testimonial-accent">Client Voices</p>
            <h2
              id={titleId}
              className="type-section-heading mt-6 text-heading"
            >
              Shared visions, meticulously realized.
            </h2>
          </div>

          {showNavigation && (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={onPrevious}
                className="inline-flex size-10 items-center justify-center rounded-lg bg-white text-nav shadow-sm transition-opacity hover:opacity-80"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={onNext}
                className="inline-flex size-10 items-center justify-center rounded-lg bg-white text-nav shadow-sm transition-opacity hover:opacity-80"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>
          )}
        </header>

        <figure className="flex flex-col">
          <QuoteMarkIcon />
          <blockquote className="font-fraunces text-base font-normal leading-7 text-heading sm:text-lg sm:leading-8">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-col gap-1">
            <cite className="not-italic font-fraunces text-sm font-semibold leading-5 text-heading">
              {testimonial.author}
            </cite>
            <p className="font-fraunces text-xs uppercase leading-4 tracking-wide text-testimonial-accent">
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
      className="relative overflow-hidden py-12 lg:py-20"
    >
      <img
        src="/images/testimonials/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />

      <div className="container-site relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-5 lg:gap-6">
          <div
            aria-hidden="true"
            className="testimonial-glass-card hidden min-h-[26rem] w-full max-w-[12vw] shrink-0 scale-[0.92] rounded-3xl opacity-45 lg:block"
          />

          <TestimonialCard
            testimonial={testimonials[activeIndex]}
            titleId="testimonials-title"
            onPrevious={goPrevious}
            onNext={goNext}
          />

          <div
            aria-hidden="true"
            className="testimonial-glass-card hidden min-h-[26rem] w-full max-w-[12vw] shrink-0 scale-[0.92] rounded-3xl opacity-45 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
