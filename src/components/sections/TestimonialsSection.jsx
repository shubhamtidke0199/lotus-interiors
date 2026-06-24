"use client";

import { useState } from "react";
import { testimonials } from "@/data/landingContent";

function ChevronIcon({ direction = "left", className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`size-6 ${className}`}
    >
      {direction === "left" ? (
        <path
          d="M15 6L9 12L15 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9 6L15 12L9 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = testimonials[activeIndex];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <img
        src="/images/testimonials/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-[1011px] gap-12 lg:grid-cols-2 lg:gap-20">
        <header className="flex flex-col justify-center">
          <p className="font-fraunces text-base font-normal uppercase leading-4 tracking-[var(--tracking-eyebrow)] text-white/80">
            Client Voices
          </p>
          <h2
            id="testimonials-title"
            className="mt-8 font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-white sm:text-[32px] lg:text-[36px] lg:leading-12"
          >
            Shared visions, meticulously realized.
          </h2>

          <div className="mt-8 flex gap-4">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + testimonials.length) % testimonials.length,
                )
              }
              className="inline-flex size-12 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % testimonials.length)
              }
              className="inline-flex size-12 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </header>

        <figure className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 91 64"
            className="absolute -top-8 left-0 h-16 w-[91px] text-white/20"
            fill="currentColor"
          >
            <path d="M0 64V38.4C0 24.96 2.56 14.08 7.68 5.76 12.8-2.56 20.48-6.4 30.72-6.4c8.96 0 15.68 2.56 20.16 7.68 4.48 5.12 6.72 11.52 6.72 19.2 0 6.4-1.92 11.84-5.76 16.32-3.84 4.48-9.28 6.72-16.32 6.72-5.12 0-9.28-1.28-12.48-3.84V64H0zm48 0V38.4c0-13.44 2.56-24.32 7.68-32.64C60.8-2.56 68.48-6.4 78.72-6.4c8.96 0 15.68 2.56 20.16 7.68 4.48 5.12 6.72 11.52 6.72 19.2 0 6.4-1.92 11.84-5.76 16.32-3.84 4.48-9.28 6.72-16.32 6.72-5.12 0-9.28-1.28-12.48-3.84V64H48z" />
          </svg>
          <blockquote className="font-fraunces text-xl font-normal italic leading-8 text-white sm:text-2xl sm:leading-[39px]">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-10 flex flex-col gap-1">
            <cite className="not-italic font-helvetica text-base leading-6 text-white">
              {testimonial.author}
            </cite>
            <p className="font-helvetica text-sm leading-4 text-white/70">
              {testimonial.role}
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
