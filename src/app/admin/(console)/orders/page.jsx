import Link from "next/link";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagination from "@/components/admin/AdminPagination";
import AdminTableShell, {
  adminTableHeadClass,
} from "@/components/admin/AdminTableShell";
import { statusBadgeClass } from "@/components/admin/adminUi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectionSummary } from "@/lib/cms/enquiry";
import { enquiryStatusLabel } from "@/lib/cms/format";
import { paginate, parsePageParam } from "@/lib/cms/pagination";
import { getEnquiries } from "@/lib/cms/store";

export const metadata = {
  title: "Enquiries",
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function orderTone(status) {
  if (status === "new") return "new";
  if (status === "won") return "won";
  if (status === "lost") return "lost";
  return "default";
}

export default async function AdminOrdersPage({ searchParams }) {
  const params = await searchParams;
  const orders = await getEnquiries();
  const pagination = paginate(orders, parsePageParam(params?.page));
  const newCount = orders.filter((order) => order.status === "new").length;

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        eyebrow="Inbox"
        title="Enquiries"
        description={
          newCount > 0
            ? `${newCount} new · ${pagination.total} total. Follow up offline — nothing is charged on the site.`
            : `${pagination.total} total. Consultation requests from Enquire Now, contact, and appointment forms.`
        }
      />

      {pagination.total === 0 ? (
        <AdminEmptyState
          title="Inbox is clear"
          description="New enquiries from the website will appear here for follow-up."
        />
      ) : (
        <AdminTableShell>
          <Table className="min-w-[56rem]">
            <TableHeader>
              <TableRow>
                <TableHead className={adminTableHeadClass}>Received</TableHead>
                <TableHead className={adminTableHeadClass}>Contact</TableHead>
                <TableHead className={adminTableHeadClass}>Interest</TableHead>
                <TableHead className={adminTableHeadClass}>Source</TableHead>
                <TableHead className={adminTableHeadClass}>Status</TableHead>
                <TableHead className={`${adminTableHeadClass} text-right`}>
                  {" "}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.items.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="whitespace-nowrap font-helvetica text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell>
                    <p className="font-helvetica text-sm font-medium text-foreground">
                      {order.email}
                    </p>
                    <p className="mt-0.5 font-helvetica text-xs text-muted-foreground">
                      {order.phone || "No phone"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-helvetica text-sm text-foreground">
                      {order.productSnapshot?.name ||
                        order.productName ||
                        "General enquiry"}
                    </p>
                    {selectionSummary(order.productSnapshot).length > 0 ? (
                      <p className="mt-0.5 font-helvetica text-xs text-muted-foreground">
                        {selectionSummary(order.productSnapshot)
                          .map((item) => item.value)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </TableCell>
                  <TableCell className="font-helvetica text-muted-foreground">
                    {order.source}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusBadgeClass(orderTone(order.status))}>
                      {enquiryStatusLabel(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="link"
                      className="h-auto p-0 font-helvetica text-sm"
                      render={<Link href={`/admin/orders/${order.id}`} />}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination
            {...pagination}
            noun="enquiries"
            basePath="/admin/orders"
          />
        </AdminTableShell>
      )}
    </main>
  );
}
