"use client";
import Link from "next/link";
import { useState } from "react";


const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blogs", href: "/blogs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white relative z-50">
      <div className="flex items-center h-[120px] px-4 sm:px-8 lg:px-[35px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0f59c599e3d65921073ed83d888fb231e165948c?width=220"
            alt="LOTUS 9"
            className="w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-[42px]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-fraunces text-[20px] font-normal leading-[20px] uppercase text-[#080808] hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right: search + CTA */}
        <div className="hidden lg:flex items-center gap-4 ml-auto">
          {/* Search bar */}
          <div className="flex items-center gap-4 bg-[#FFEEDD] h-[52px] pl-1.5 pr-6">
            <div className="flex w-[42px] h-[42px] p-[9px] justify-center items-center bg-white flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path
                  d="M21 21L17 17M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-primary text-[12px] font-medium leading-[24px] tracking-[1.6px] uppercase whitespace-nowrap">
              Search products...
            </span>
          </div>

          {/* GET APPOINTMENT button */}
          <button className="flex items-center gap-4 h-[52px] px-5 border border-primary hover:bg-primary/5 transition-colors">
            <span className="text-primary text-[14px] font-medium leading-[24px] uppercase whitespace-nowrap">
              GET Appointment
            </span>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" className="text-primary">
              <path
                d="M9.34611 11.3076L8.29228 10.2231L12.1115 6.4038H0V4.90384H12.1115L8.29228 1.08459L9.34611 0L14.9999 5.65382L9.34611 11.3076Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden ml-auto p-2 text-[#080808]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-[18px] font-normal uppercase text-[#080808] hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile search */}
          <div className="flex items-center gap-3 bg-[#FFEEDD] h-[48px] pl-1.5 pr-4 w-fit">
            <div className="flex w-[38px] h-[38px] p-2 justify-center items-center bg-white flex-shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path
                  d="M21 21L17 17M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-primary text-[11px] font-medium tracking-[1.6px] uppercase">
              Search products...
            </span>
          </div>

          {/* Mobile CTA */}
          <button className="flex items-center gap-4 h-[48px] px-5 border border-primary w-fit">
            <span className="text-primary text-[13px] font-medium uppercase">
              GET Appointment
            </span>
            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" className="text-primary">
              <path
                d="M9.34611 11.3076L8.29228 10.2231L12.1115 6.4038H0V4.90384H12.1115L8.29228 1.08459L9.34611 0L14.9999 5.65382L9.34611 11.3076Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      )}
    </header>
  );
}
