"use client";

import { useEffect, useRef } from "react";
import LocationCard from "@/components/ui/LocationCard";

const SCROLL_SPEED = 0.8;
const RESUME_DELAY_MS = 1800;

export default function LocationsCarousel({ locations }) {
  const viewportRef = useRef(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || locations.length === 0) return undefined;

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
  }, [locations.length]);

  if (locations.length === 0) return null;

  const loopedLocations = [...locations, ...locations];

  return (
    <div
      ref={viewportRef}
      className="presence-locations-viewport min-w-0 flex-1 overflow-x-auto overscroll-x-contain"
      aria-label="Studio locations"
    >
      <div className="flex w-max gap-3 sm:gap-4">
        {loopedLocations.map((location, index) => (
          <LocationCard
            key={`${location.city}-${index}`}
            {...location}
          />
        ))}
      </div>
    </div>
  );
}
