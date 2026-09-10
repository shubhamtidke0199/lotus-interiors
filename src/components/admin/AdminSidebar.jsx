"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
];

function linkActive(pathname, href) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="border-b border-white/10 bg-footer-dark text-white lg:flex lg:min-h-full lg:w-64 lg:flex-col lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-5 py-4 lg:block lg:px-6 lg:py-8">
        <div>
          <p className="type-eyebrow text-accent-peach/80">Lotus Studio</p>
          <p className="mt-1 font-fraunces text-lg">Admin</p>
        </div>
        <button
          type="button"
          className="font-fraunces text-sm text-white/80 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        className={`${open ? "flex" : "hidden"} flex-col gap-1 px-3 pb-4 lg:flex lg:flex-1 lg:px-4`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={`rounded-sm px-3 py-2.5 font-fraunces text-sm tracking-wide ${
              linkActive(pathname, link.href)
                ? "bg-white/10 text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={`${open ? "block" : "hidden"} px-5 pb-5 lg:mt-auto lg:block lg:px-6 lg:pb-8`}>
        <Link
          href="/"
          className="block font-fraunces text-sm text-white/60 hover:text-white"
        >
          View website
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="mt-3 font-fraunces text-sm text-accent-peach hover:underline disabled:opacity-60"
        >
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
