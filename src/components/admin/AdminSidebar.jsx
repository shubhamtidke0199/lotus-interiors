"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  FolderTree,
  Inbox,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Package,
  SlidersHorizontal,
} from "lucide-react";
import AdminBusyOverlay from "@/components/admin/AdminBusyOverlay";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const navGroups = [
  {
    label: "Workspace",
    links: [
      {
        href: "/admin",
        label: "Overview",
        exact: true,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Catalog",
    links: [
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/categories", label: "Categories", icon: FolderTree },
      { href: "/admin/attributes", label: "Attributes", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Inbox",
    links: [{ href: "/admin/orders", label: "Enquiries", icon: Inbox }],
  },
];

function linkActive(pathname, href, exact) {
  if (exact || href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <>
      <AdminBusyOverlay show={signingOut} fullscreen label="Signing out…" />
      <Sidebar collapsible="icon" className="border-sidebar-border">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-1 py-0.5 group-data-[collapsible=icon]:justify-center">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              L
            </div>
            <div className="min-w-0 group-data-[collapsible=icon]:hidden">
              <p className="truncate text-sm font-semibold leading-none">
                Lotus Studio
              </p>
              <p className="mt-1 truncate text-xs text-sidebar-foreground/70">
                Console
              </p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {navGroups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    const active = linkActive(pathname, link.href, link.exact);
                    return (
                      <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                          isActive={active}
                          tooltip={link.label}
                          render={<Link href={link.href} />}
                        >
                          <Icon />
                          <span>{link.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="View live site"
                render={<Link href="/" target="_blank" rel="noreferrer" />}
              >
                <ExternalLink />
                <span>View live site</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign out"
                onClick={signOut}
                disabled={signingOut}
              >
                {signingOut ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <LogOut />
                )}
                <span>{signingOut ? "Signing out…" : "Sign out"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
