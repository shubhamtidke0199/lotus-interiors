import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in",
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main id="main-content" className="flex min-h-dvh items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white px-8 py-10 shadow-[0_16px_48px_rgba(83,70,108,0.08)]">
        <p className="type-eyebrow text-eyebrow">Lotus Studio</p>
        <h1 className="mt-3 font-fraunces text-3xl text-heading">Admin sign in</h1>
        <p className="mt-3 font-fraunces text-sm leading-6 text-muted">
          Manage products, categories, and consultation requests.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
