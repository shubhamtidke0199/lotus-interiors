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
      <div className="mx-auto flex h-[120px] max-w-[1440px] items-center px-4 sm:px-8 lg:px-[35px]">
        <Link href="/" className="relative size-[90px] shrink-0 overflow-hidden lg:size-[110px]">
          <img
            src="/images/navbar/logo.webp"
            alt="LOTUS Design Studio"
            className="absolute left-[-8.15%] top-[-4.41%] size-[116.08%] max-w-none object-cover"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-[42px] lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-fraunces text-xl font-normal uppercase leading-5 text-nav transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-4 lg:flex">
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
          className="flex flex-col gap-5 border-t border-gray-100 bg-white px-6 py-6 lg:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-fraunces text-lg font-normal uppercase text-nav transition-colors hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex h-[48px] w-fit items-center gap-3 bg-accent-cream py-4 pl-1.5 pr-4">
            <div className="flex size-[38px] shrink-0 items-center justify-center bg-white p-2">
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
