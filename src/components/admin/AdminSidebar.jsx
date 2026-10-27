"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ExternalLink, LoaderCircle, LogOut, Menu, X } from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";

const navGroups = [
  {
    label: "Workspace",
    links: [{ href: "/admin", label: "Overview", exact: true }],
  },
  {
    label: "Catalog",
    links: [
      { href: "/admin/products", label: "Products" },
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/attributes", label: "Attributes" },
    ],
  },
  {
    label: "Inbox",
    links: [{ href: "/admin/orders", label: "Enquiries" }],
  },
];

function linkActive(pathname, href, exact) {
  if (exact || href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const currentLabel =
    navGroups
      .flatMap((group) => group.links)
      .find((link) => linkActive(pathname, link.href, link.exact))?.label ??
    "Admin";

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <aside className="z-30 flex shrink-0 flex-col border-b border-white/10 bg-[color:var(--admin-sidebar)] text-white lg:h-full lg:w-[15.5rem] lg:border-b-0 lg:border-r lg:border-white/10">
      <AdminBusyOverlay
        show={signingOut}
        fullscreen
        label="Signing out…"
      />
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3.5 lg:block lg:px-5 lg:pb-6 lg:pt-7">
        <div>
          <p className="font-helvetica text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--admin-sidebar-text)]">
            Lotus
          </p>
          <p className="mt-1 font-helvetica text-sm font-medium tracking-[-0.01em] text-white">
            Studio console
          </p>
          <p className="mt-0.5 font-helvetica text-xs text-[color:var(--admin-sidebar-text)] lg:hidden">
            {currentLabel}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-white/15 px-3 py-1.5 font-helvetica text-xs text-white/85 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          {open ? (
            <X className="size-3.5" aria-hidden="true" />
          ) : (
            <Menu className="size-3.5" aria-hidden="true" />
          )}
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        className={`${open ? "flex" : "hidden"} min-h-0 flex-col gap-6 overflow-y-auto px-3 pb-5 lg:flex lg:flex-1 lg:px-3`}
      >
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-2.5 font-helvetica text-[10px] font-medium uppercase tracking-[0.16em] text-white/35">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.links.map((link) => {
                const active = linkActive(pathname, link.href, link.exact);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`admin-sidebar-link ${active ? "is-active" : ""}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div
        className={`${open ? "flex" : "hidden"} shrink-0 flex-col gap-3 border-t border-white/10 px-5 py-4 lg:flex`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-helvetica text-xs text-[color:var(--admin-sidebar-text)] transition-colors hover:text-white"
        >
          View live site
          <ExternalLink className="size-3" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="inline-flex w-fit items-center gap-1.5 font-helvetica text-xs text-white/70 transition-colors hover:text-white disabled:opacity-50"
        >
          {signingOut ? (
            <LoaderCircle className="size-3 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="size-3" aria-hidden="true" />
          )}
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  );
}
