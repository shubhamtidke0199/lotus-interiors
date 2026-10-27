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
    <main
      id="main-content"
      className="grid min-h-dvh lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
    >
      <section className="relative hidden overflow-hidden bg-[color:var(--admin-sidebar)] lg:flex lg:flex-col lg:justify-between lg:px-12 lg:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(145deg, rgba(200,208,192,0.18), transparent 42%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06), transparent 45%)",
          }}
        />
        <div className="relative">
          <p className="font-helvetica text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
            Lotus Interiors
          </p>
          <h1 className="mt-6 max-w-sm font-helvetica text-3xl font-medium leading-tight tracking-[-0.03em] text-white">
            Quiet tools for a considered catalog.
          </h1>
        </div>
        <p className="relative max-w-xs font-helvetica text-sm leading-6 text-white/45">
          Manage products, attributes, and consultation requests without the
          noise of a storefront.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-14 sm:px-8">
        <div className="w-full max-w-sm">
          <p className="font-helvetica text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--admin-muted)] lg:hidden">
            Lotus Interiors
          </p>
          <h2 className="mt-3 font-helvetica text-2xl font-medium tracking-[-0.02em] text-[color:var(--admin-ink)]">
            Sign in
          </h2>
          <p className="mt-2 font-helvetica text-sm leading-6 text-[color:var(--admin-muted)]">
            Enter the studio password to continue.
          </p>
          <div className="mt-8 border border-[color:var(--admin-line)] bg-[color:var(--admin-panel)] p-6 sm:p-7">
            <AdminLoginForm />
          </div>
        </div>
      </section>
    </main>
  );
}
