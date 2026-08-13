"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import PrimaryButton from "@/components/ui/PrimaryButton";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Products", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

function linkIsActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navPath, setNavPath] = useState(pathname);

  if (navPath !== pathname) {
    setNavPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    queueMicrotask(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/50 backdrop-blur-md transition-[height,box-shadow,border-color] duration-300 ${
        scrolled
          ? "border-footer-border shadow-[0_8px_24px_rgba(28,27,27,0.06)]"
          : "border-transparent"
      }`}
    >
      <div
        className={`container-site flex items-center px-4 sm:px-6 lg:px-8 transition-[height] duration-300 ${
          scrolled ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24"
        }`}
      >
        <Link
          href="/"
          className={`relative shrink-0 overflow-hidden transition-[width,height] duration-300 ${
            scrolled ? "size-14 lg:size-16" : "size-16 lg:size-20"
          }`}
          aria-label="Lotus Design Studio home"
        >
          <img
            src="/images/navbar/logo.webp"
            alt="LOTUS Design Studio"
            className="absolute left-[-8.15%] top-[-4.41%] size-[116.08%] max-w-none object-cover"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-6 xl:gap-8 lg:flex"
        >
          {navLinks.map((link) => {
            const active = linkIsActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-fraunces text-sm font-normal uppercase leading-5 tracking-wide transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-nav"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <ProductSearchBar />
          <PrimaryButton href="/contact" variant="outline">
            GET Appointment
          </PrimaryButton>
        </div>

        <button
          type="button"
          className="ml-auto p-2 text-nav lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-navigation"
          className="flex max-h-[calc(100dvh-4rem)] flex-col gap-4 overflow-y-auto border-t border-gray-100 bg-white px-6 py-5 lg:hidden"
        >
          {navLinks.map((link) => {
            const active = linkIsActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-fraunces text-base font-normal uppercase transition-colors hover:text-primary ${
                  active ? "text-primary" : "text-nav"
                }`}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}

          <ProductSearchBar className="w-full max-w-sm" />

          <PrimaryButton
            href="/contact"
            variant="outline"
            className="w-fit"
            onClick={() => setMobileOpen(false)}
          >
            GET Appointment
          </PrimaryButton>
        </nav>
      )}
    </header>
  );
}
