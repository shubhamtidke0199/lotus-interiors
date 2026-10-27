"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function isAdminInternalHref(href) {
  if (!href || href.startsWith("#") || href.startsWith("mailto:")) return false;
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    return url.pathname.startsWith("/admin");
  } catch {
    return false;
  }
}

export default function AdminRouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams?.toString() ?? ""}`;
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setActive(false);
    setVisible(false);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [routeKey]);

  useEffect(() => {
    function onClick(event) {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = event.target.closest?.("a[href]");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!isAdminInternalHref(href)) return;

      const next = new URL(href, window.location.origin);
      const current = new URL(window.location.href);
      if (
        next.pathname === current.pathname &&
        next.search === current.search
      ) {
        return;
      }

      setActive(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(true), 120);
    }

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 overflow-hidden bg-transparent"
      aria-hidden={!visible}
    >
      <div
        className={`h-full origin-left bg-[color:var(--admin-ink)] transition-opacity duration-150 ${
          visible ? "opacity-100 admin-route-progress" : "opacity-0"
        }`}
      />
    </div>
  );
}
