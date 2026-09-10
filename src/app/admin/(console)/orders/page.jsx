import Link from "next/link";
import { enquiryStatusLabel } from "@/lib/cms/format";
import { getEnquiries } from "@/lib/cms/store";

export const metadata = {
  title: "Orders",
};

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminOrdersPage() {
  const orders = await getEnquiries();

  return (
    <main>
      <p className="type-eyebrow text-eyebrow">Inbox</p>
      <h1 className="mt-2 font-fraunces text-3xl text-heading">Orders</h1>
      <p className="mt-3 max-w-2xl font-fraunces text-sm leading-6 text-muted">
        Consultation requests from Enquire Now, contact, and appointment forms.
        No payment is collected on the site.
      </p>

      {orders.length === 0 ? (
        <p className="mt-10 font-fraunces text-sm text-muted">
          No orders yet. New enquiries from the website will appear here.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto bg-white">
          <table className="w-full min-w-[52rem] text-left">
            <thead>
              <tr className="border-b border-product-bg font-helvetica text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-normal">Received</th>
                <th className="px-5 py-3 font-normal">Contact</th>
                <th className="px-5 py-3 font-normal">Product</th>
                <th className="px-5 py-3 font-normal">Source</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal"> </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-product-bg">
                  <td className="px-5 py-4 font-fraunces text-sm text-muted">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-fraunces text-sm text-nav">{order.email}</p>
                    <p className="mt-1 font-fraunces text-xs text-muted">
                      {order.phone || "No phone"}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm text-nav">
                    {order.productName || "General enquiry"}
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm text-muted">
                    {order.source}
                  </td>
                  <td className="px-5 py-4 font-fraunces text-sm">
                    {enquiryStatusLabel(order.status)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-fraunces text-sm text-primary hover:underline"
                    >
                      Open
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
