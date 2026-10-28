"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminAppShell({ children }) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider defaultOpen>
        <AdminSidebar />
        <SidebarInset className="min-h-dvh bg-transparent">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4 md:hidden">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="font-helvetica text-sm font-medium text-foreground">
              Studio console
            </span>
          </header>
          <div className="mx-auto flex w-full max-w-[72rem] flex-1 flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-9">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
