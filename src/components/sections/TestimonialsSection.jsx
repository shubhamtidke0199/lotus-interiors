"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/data/landingContent";

const SCROLL_SPEED = 0.4;
const RESUME_DELAY_MS = 1800;

function QuoteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 36"
      fill="none"
      className="h-8 w-10 text-testimonial-accent/80 sm:h-9 sm:w-11"
    >
      <path
        d="M0 36V21.6C0 14.4 1.6 9.07 4.8 5.6 8 2.13 12.53 0.27 18.4 0v7.2c-3.2.53-5.6 1.87-7.2 4-1.6 2.13-2.4 5.07-2.4 8.8H18.4V36H0Zm29.6 0V21.6c0-7.2 1.6-12.53 4.8-16 3.2-3.47 7.73-5.33 13.6-5.6v7.2c-3.2.53-5.6 1.87-7.2 4-1.6 2.13-2.4 5.07-2.4 8.8h9.6V36H29.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TestimonialSlide({ testimonial }) {
  return (
    <article className="testimonial-glass-card flex h-full min-h-[22rem] w-[min(88vw,22rem)] shrink-0 flex-col justify-between rounded-3xl px-6 py-8 sm:min-h-[24rem] sm:w-[28rem] sm:px-8 sm:py-10 lg:min-h-[26rem] lg:w-[34rem] lg:px-10 lg:py-12">
      <div>
        <QuoteIcon />
        <blockquote className="mt-6 font-fraunces text-lg font-normal leading-8 text-heading sm:text-xl sm:leading-9 lg:text-[1.375rem] lg:leading-9">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <footer className="mt-10 flex flex-col gap-1.5 border-t border-white/50 pt-6">
        <p className="font-fraunces text-base font-semibold leading-6 text-heading">
          {testimonial.author}
        </p>
        <p className="font-fraunces text-xs uppercase leading-4 tracking-[0.08em] text-testimonial-accent">
          {testimonial.role}
        </p>
      </footer>
    </article>
  );
}

export default function TestimonialsSection() {
  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || testimonials.length === 0) return undefined;

    const getLoopWidth = () => viewport.scrollWidth / 2;

    const wrapScroll = () => {
      const loopWidth = getLoopWidth();
      if (loopWidth <= 0) return;

      if (viewport.scrollLeft >= loopWidth) {
        viewport.scrollLeft -= loopWidth;
      } else if (viewport.scrollLeft <= 0) {
        viewport.scrollLeft += loopWidth;
      }
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const tick = () => {
      if (!pausedRef.current && !motionQuery.matches) {
        viewport.scrollLeft += SCROLL_SPEED;
        wrapScroll();
      }
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    const pause = () => {
      pausedRef.current = true;
      window.clearTimeout(resumeTimerRef.current);
    };

    const scheduleResume = () => {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
      }, RESUME_DELAY_MS);
    };

    const onPointerEnter = () => pause();
    const onPointerLeave = () => scheduleResume();
    const onTouchStart = () => pause();
    const onTouchEnd = () => scheduleResume();
    const onWheel = () => {
      pause();
      scheduleResume();
    };
    const onScroll = () => wrapScroll();

    viewport.addEventListener("pointerenter", onPointerEnter);
    viewport.addEventListener("pointerleave", onPointerLeave);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchend", onTouchEnd);
    viewport.addEventListener("touchcancel", onTouchEnd);
    viewport.addEventListener("wheel", onWheel, { passive: true });
    viewport.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(resumeTimerRef.current);
      viewport.removeEventListener("pointerenter", onPointerEnter);
      viewport.removeEventListener("pointerleave", onPointerLeave);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("scroll", onScroll);
    };
  }, []);

  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-24"
    >
      <img
        src="/images/testimonials/background.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/25"
      />

      <div className="relative z-10">
        <header className="container-site mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="type-eyebrow text-testimonial-accent">Client Voices</p>
          <h2
            id="testimonials-title"
            className="type-section-heading mt-3 text-heading sm:mt-4"
          >
            Shared visions, meticulously realized.
          </h2>
        </header>

        <div
          ref={viewportRef}
          className="testimonials-carousel-viewport mt-10 touch-pan-y overflow-x-auto overscroll-x-contain sm:mt-12 lg:mt-14"
          aria-label="Client testimonials"
        >
          <div className="flex w-max gap-4 px-4 sm:gap-5 sm:px-6 lg:gap-6 lg:px-8">
            {loopedTestimonials.map((testimonial, index) => (
              <TestimonialSlide
                key={`${testimonial.author}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
