import AdminSidebar from "@/components/admin/AdminSidebar";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminConsoleLayout({ children }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-dvh flex-col lg:flex-row">
      <AdminSidebar />
      <div id="main-content" className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
        {children}
      </div>
    </div>
  );
}
