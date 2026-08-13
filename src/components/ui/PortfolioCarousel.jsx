"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PortfolioCard from "@/components/ui/PortfolioCard";

const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 48;

function ChevronIcon({ direction = "left" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 15 12"
      fill="none"
      className={`h-3 w-4 ${direction === "left" ? "rotate-180" : ""}`}
    >
      <path
        d="M9.34611 11.3076L8.29228 10.2231L12.1115 6.4038H0V4.90384H12.1115L8.29228 1.08459L9.34611 0L14.9999 5.65382L9.34611 11.3076Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSlidesPerView(width) {
  if (width >= 1280) return 5;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function PortfolioCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef(null);
  const dragOffsetRef = useRef(0);
  const blockClickRef = useRef(false);
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    active: false,
    axis: null,
  });

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const count = projects.length;
  const maxIndex = Math.max(0, count - slidesPerView);
  const safeIndex = Math.min(activeIndex, maxIndex);
  const slideWidth = 100 / slidesPerView;
  const canNavigate = count > slidesPerView;

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => {
      const index = Math.min(current, maxIndex);
      return index <= 0 ? maxIndex : index - 1;
    });
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((current) => {
      const index = Math.min(current, maxIndex);
      return index >= maxIndex ? 0 : index + 1;
    });
  }, [maxIndex]);

  useEffect(() => {
    if (!canNavigate || isPaused) return undefined;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return undefined;

    const interval = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [canNavigate, isPaused, goNext]);

  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !canNavigate) return undefined;

    const resetTouch = () => {
      touchRef.current = {
        startX: 0,
        startY: 0,
        active: false,
        axis: null,
      };
      setIsDragging(false);
      setDragOffset(0);
    };

    const onTouchStart = (event) => {
      const touch = event.touches[0];
      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        active: true,
        axis: null,
      };
      setIsPaused(true);
      setIsDragging(true);
    };

    const onTouchMove = (event) => {
      if (!touchRef.current.active) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - touchRef.current.startX;
      const deltaY = touch.clientY - touchRef.current.startY;

      if (touchRef.current.axis === null) {
        if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          touchRef.current.active = false;
          resetTouch();
          setIsPaused(false);
          return;
        }

        touchRef.current.axis = "x";
      }

      if (touchRef.current.axis === "x") {
        event.preventDefault();
        const width = viewport.offsetWidth || 1;
        const maxDrag = width * 0.4;
        const clamped = Math.max(-maxDrag, Math.min(maxDrag, deltaX));
        setDragOffset(clamped);
      }
    };

    const onTouchEnd = () => {
      if (!touchRef.current.active) {
        setIsPaused(false);
        return;
      }

      const offset = dragOffsetRef.current;

      if (Math.abs(offset) >= SWIPE_THRESHOLD) {
        if (offset <= -SWIPE_THRESHOLD) {
          goNext();
        } else {
          goPrevious();
        }

        blockClickRef.current = true;
        window.setTimeout(() => {
          blockClickRef.current = false;
        }, 400);
      }

      resetTouch();
      setIsPaused(false);
    };

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd);
    viewport.addEventListener("touchcancel", onTouchEnd);

    return () => {
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [canNavigate, goNext, goPrevious]);

  if (count === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={viewportRef}
          className="touch-pan-y overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
          onClickCapture={(event) => {
            if (blockClickRef.current) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          <div
            className={`portfolio-carousel-track flex ${isDragging ? "is-dragging" : ""}`}
            style={{
              transform: `translateX(calc(-${safeIndex * slideWidth}% + ${dragOffset}px))`,
            }}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="shrink-0 px-1.5 sm:px-2"
                style={{ width: `${slideWidth}%` }}
              >
                <PortfolioCard {...project} />
              </div>
            ))}
          </div>
        </div>

        {canNavigate && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={goPrevious}
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-product-bg bg-white p-2.5 text-nav shadow-md transition-opacity hover:opacity-90 sm:-left-3 md:inline-flex"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={goNext}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-product-bg bg-white p-2.5 text-nav shadow-md transition-opacity hover:opacity-90 sm:-right-3 md:inline-flex"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        )}
      </div>

      {canNavigate && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`size-2 rounded-full transition-colors ${
                index === safeIndex ? "bg-primary" : "bg-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
