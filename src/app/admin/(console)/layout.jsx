import { Suspense } from "react";
import AdminRouteProgress from "@/components/admin/AdminRouteProgress";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({ children }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden lg:flex-row">
      <Suspense fallback={null}>
        <AdminRouteProgress />
      </Suspense>
      <AdminSidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:overflow-y-auto">
        <div
          id="main-content"
          className="mx-auto w-full max-w-[72rem] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-9"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
