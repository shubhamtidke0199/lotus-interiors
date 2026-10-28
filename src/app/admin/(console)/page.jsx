import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import {
  adminBtnPrimary,
  adminBtnSecondary,
  statusBadgeClass,
} from "@/components/admin/adminUi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Badge className={statusBadgeClass(backend === "supabase" ? "published" : "draft")}>
            Data · {backend === "supabase" ? "Supabase" : "Local file"}
          </Badge>
        }
      />

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="group block">
            <Card className="transition-colors hover:border-foreground/30">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <CardDescription className="font-helvetica text-[11px] font-medium uppercase tracking-[0.14em]">
                    {card.label}
                  </CardDescription>
                  {card.emphasize ? (
                    <Badge className={statusBadgeClass("new")}>Needs attention</Badge>
                  ) : null}
                </div>
                <CardTitle className="font-helvetica text-3xl font-medium tracking-[-0.03em]">
                  {card.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="font-helvetica text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                  {card.meta}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <CardTitle className="font-helvetica text-sm font-medium">
              Recent enquiries
            </CardTitle>
            <CardDescription className="font-helvetica text-xs">
              Latest consultation requests from the site
            </CardDescription>
          </div>
          <Button
            variant="outline"
            className={adminBtnSecondary}
            render={<Link href="/admin/orders" />}
          >
            View all
          </Button>
        </CardHeader>

        {recent.length === 0 ? (
          <div className="p-5">
            <AdminEmptyState
              title="No enquiries yet"
              description="New requests from Enquire Now and contact forms will land here."
              className="border-0 bg-transparent shadow-none"
            />
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex flex-col gap-2 px-5 py-4 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-helvetica text-sm text-foreground">
                      {order.productName || "General enquiry"}
                    </p>
                    <p className="mt-1 truncate font-helvetica text-xs text-muted-foreground">
                      {order.email}
                      {order.phone ? ` · ${order.phone}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge
                      className={statusBadgeClass(
                        order.status === "new" ? "new" : "default",
                      )}
                    >
                      {enquiryStatusLabel(order.status)}
                    </Badge>
                    <span className="font-helvetica text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <div className="flex flex-wrap gap-2 md:hidden">
        <Button className={adminBtnPrimary} render={<Link href="/admin/products/new" />}>
          Add product
        </Button>
        <Button
          variant="outline"
          className={adminBtnSecondary}
          render={<Link href="/admin/orders" />}
        >
          Open inbox
        </Button>
      </div>
    </main>
  );
}
