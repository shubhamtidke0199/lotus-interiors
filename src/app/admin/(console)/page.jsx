import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  adminPanel,
  statusBadgeClass,
} from "@/components/admin/adminUi";
import { getCatalogBackend, getDashboardStats, getEnquiries } from "@/lib/cms/store";
import { enquiryStatusLabel } from "@/lib/cms/format";

export const metadata = {
  title: "Overview",
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminOverviewPage() {
  const [stats, orders] = await Promise.all([getDashboardStats(), getEnquiries()]);
  const backend = getCatalogBackend();
  const recent = orders.slice(0, 5);

  const cards = [
    {
      label: "Products",
      value: stats.productCount,
      meta: `${stats.publishedCount} live`,
      href: "/admin/products",
    },
    {
      label: "Categories",
      value: stats.categoryCount,
      meta: "Browse filters",
      href: "/admin/categories",
    },
    {
      label: "Attributes",
      value: stats.attributeCount ?? 0,
      meta: "Spec fields",
      href: "/admin/attributes",
    },
    {
      label: "New enquiries",
      value: stats.newEnquiryCount,
      meta: `${stats.enquiryCount} total`,
      href: "/admin/orders",
      emphasize: stats.newEnquiryCount > 0,
    },
  ];

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="Workspace"
        title="Overview"
        description="Catalog health and consultation requests. Enquiries are not paid checkouts — follow up by phone or WhatsApp."
        primaryAction={{ href: "/admin/products/new", label: "Add product" }}
        secondaryAction={{ href: "/admin/orders", label: "Open inbox" }}
        actions={
          <span className={statusBadgeClass(backend === "supabase" ? "published" : "draft")}>
            Data · {backend === "supabase" ? "Supabase" : "Local file"}
          </span>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`${adminPanel} group px-5 py-5 transition-colors hover:border-[color:var(--admin-ink)]`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-helvetica text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--admin-muted)]">
                {card.label}
              </p>
              {card.emphasize ? (
                <span className={statusBadgeClass("new")}>Needs attention</span>
              ) : null}
            </div>
            <p className="mt-4 font-helvetica text-3xl font-medium tracking-[-0.03em] text-[color:var(--admin-ink)]">
              {card.value}
            </p>
            <p className="mt-2 font-helvetica text-xs text-[color:var(--admin-muted)] transition-colors group-hover:text-[color:var(--admin-ink)]">
              {card.meta}
            </p>
          </Link>
        ))}
      </section>

      <section className={adminPanel}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--admin-line)] px-5 py-4">
          <div>
            <h2 className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
              Recent enquiries
            </h2>
            <p className="mt-0.5 font-helvetica text-xs text-[color:var(--admin-muted)]">
              Latest consultation requests from the site
            </p>
          </div>
          <Link href="/admin/orders" className={adminBtnSecondary}>
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="admin-empty m-5">
            <p className="font-helvetica text-sm text-[color:var(--admin-ink)]">
              No enquiries yet
            </p>
            <p className="font-helvetica text-sm text-[color:var(--admin-muted)]">
              New requests from Enquire Now and contact forms will land here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[color:var(--admin-line)]">
            {recent.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-[color:var(--admin-surface)]/80 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-helvetica text-sm text-[color:var(--admin-ink)]">
                      {order.productName || "General enquiry"}
                    </p>
                    <p className="mt-1 truncate font-helvetica text-xs text-[color:var(--admin-muted)]">
                      {order.email}
                      {order.phone ? ` · ${order.phone}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span
                      className={statusBadgeClass(
                        order.status === "new" ? "new" : "default",
                      )}
                    >
                      {enquiryStatusLabel(order.status)}
                    </span>
                    <span className="font-helvetica text-xs text-[color:var(--admin-muted)]">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-wrap gap-2 lg:hidden">
        <Link href="/admin/products/new" className={adminBtnPrimary}>
          Add product
        </Link>
        <Link href="/admin/orders" className={adminBtnSecondary}>
          Open inbox
        </Link>
      </div>
    </main>
  );
}
