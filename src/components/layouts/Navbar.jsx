"use client";

import Link from "next/link";
import { useState } from "react";
import SearchIcon from "@/components/icons/SearchIcon";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import PrimaryButton from "@/components/ui/PrimaryButton";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 bg-white">
      <div className="container-site flex h-20 items-center px-4 sm:px-6 lg:h-24 lg:px-8">
        <Link
          href="/"
          className="relative size-16 shrink-0 overflow-hidden lg:size-20"
        >
          <img
            src="/images/navbar/logo.webp"
            alt="LOTUS Design Studio"
            className="absolute left-[-8.15%] top-[-4.41%] size-[116.08%] max-w-none object-cover"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-8 lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-fraunces text-sm font-normal uppercase leading-5 tracking-wide text-nav transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
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
          onClick={() => setMobileOpen(!mobileOpen)}
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
          className="flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-5 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-fraunces text-base font-normal uppercase text-nav transition-colors hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex h-11 w-fit items-center gap-3 bg-accent-cream py-3 pl-1.5 pr-4">
            <div className="flex size-8 shrink-0 items-center justify-center bg-white p-1.5">
              <SearchIcon className="text-primary" />
            </div>
            <span className="font-helvetica text-[11px] font-medium uppercase tracking-[var(--tracking-cta)] text-primary">
              Search products...
            </span>
          </div>

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
