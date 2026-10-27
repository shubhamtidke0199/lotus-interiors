import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPagination from "@/components/admin/AdminPagination";
import {
  adminTableWrap,
  adminTd,
  adminTh,
  adminRow,
  statusBadgeClass,
} from "@/components/admin/adminUi";
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
        <div className="admin-empty">
          <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
            Inbox is clear
          </p>
          <p className="max-w-md font-helvetica text-sm text-[color:var(--admin-muted)]">
            New enquiries from the website will appear here for follow-up.
          </p>
        </div>
      ) : (
        <div className={adminTableWrap}>
          <table className="w-full min-w-[56rem] text-left">
            <thead>
              <tr>
                <th className={adminTh}>Received</th>
                <th className={adminTh}>Contact</th>
                <th className={adminTh}>Interest</th>
                <th className={adminTh}>Source</th>
                <th className={adminTh}>Status</th>
                <th className={`${adminTh} text-right`}> </th>
              </tr>
            </thead>
            <tbody>
              {pagination.items.map((order) => (
                <tr key={order.id} className={adminRow}>
                  <td className={`${adminTd} whitespace-nowrap text-[color:var(--admin-muted)]`}>
                    {formatDate(order.createdAt)}
                  </td>
                  <td className={adminTd}>
                    <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
                      {order.email}
                    </p>
                    <p className="mt-0.5 font-helvetica text-xs text-[color:var(--admin-muted)]">
                      {order.phone || "No phone"}
                    </p>
                  </td>
                  <td className={adminTd}>
                    <p className="font-helvetica text-sm text-[color:var(--admin-ink)]">
                      {order.productSnapshot?.name ||
                        order.productName ||
                        "General enquiry"}
                    </p>
                    {selectionSummary(order.productSnapshot).length > 0 ? (
                      <p className="mt-0.5 font-helvetica text-xs text-[color:var(--admin-muted)]">
                        {selectionSummary(order.productSnapshot)
                          .map((item) => item.value)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </td>
                  <td className={`${adminTd} text-[color:var(--admin-muted)]`}>
                    {order.source}
                  </td>
                  <td className={adminTd}>
                    <span className={statusBadgeClass(orderTone(order.status))}>
                      {enquiryStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className={`${adminTd} text-right`}>
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)] underline-offset-4 hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AdminPagination
            {...pagination}
            noun="enquiries"
            basePath="/admin/orders"
          />
        </div>
      )}
    </main>
  );
}
