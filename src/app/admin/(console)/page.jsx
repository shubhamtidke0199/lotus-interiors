import Link from "next/link";
import { getDashboardStats } from "@/lib/cms/store";

export const metadata = {
  title: "Overview",
};

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();

  const cards = [
    { label: "Products", value: stats.productCount, href: "/admin/products" },
    { label: "Published", value: stats.publishedCount, href: "/admin/products" },
    { label: "Categories", value: stats.categoryCount, href: "/admin/categories" },
    { label: "New orders", value: stats.newEnquiryCount, href: "/admin/orders" },
  ];

  return (
    <main>
      <p className="type-eyebrow text-eyebrow">Dashboard</p>
      <h1 className="mt-2 font-fraunces text-3xl text-heading">Studio overview</h1>
      <p className="mt-3 max-w-2xl font-fraunces text-sm leading-6 text-muted">
        Orders here are consultation enquiries from the website — not paid
        checkout. Follow up by phone or WhatsApp, then quote offline.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white px-5 py-6 transition-colors hover:bg-accent-cream"
          >
            <p className="font-helvetica text-xs uppercase tracking-wide text-muted">
              {card.label}
            </p>
            <p className="mt-3 font-fraunces text-3xl text-heading">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center bg-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-white hover:bg-primary/90"
        >
          Add product
        </Link>
        <Link
          href="/admin/orders"
          className="inline-flex h-11 items-center border border-primary px-6 font-fraunces text-sm uppercase tracking-[var(--tracking-cta)] text-primary hover:bg-primary/5"
        >
          View orders
        </Link>
      </div>
    </main>
  );
}
