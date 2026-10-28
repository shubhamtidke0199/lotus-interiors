import { Suspense } from "react";
import AdminAppShell from "@/components/admin/AdminAppShell";
import AdminRouteProgress from "@/components/admin/AdminRouteProgress";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({ children }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <Suspense fallback={null}>
        <AdminRouteProgress />
      </Suspense>
      <AdminAppShell>
        <div id="main-content">{children}</div>
      </AdminAppShell>
    </>
  );
}
