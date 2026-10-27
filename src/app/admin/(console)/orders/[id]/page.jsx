import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import { adminLabel, adminPanelPad, statusBadgeClass } from "@/components/admin/adminUi";
import {
  buildWhatsAppFollowUpMessage,
  selectionSummary,
} from "@/lib/cms/enquiry";
import { enquiryStatusLabel, whatsappHref } from "@/lib/cms/format";
import { getEnquiryById, getProductById } from "@/lib/cms/store";

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const order = await getEnquiryById(id);
  return { title: order ? `Enquiry · ${order.email}` : "Enquiry" };
}

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  const order = await getEnquiryById(id);
  if (!order) notFound();

  const product = order.productId ? await getProductById(order.productId) : null;
  const snapshot = order.productSnapshot;
  const selectedOptions = selectionSummary(snapshot);
  const productName =
    snapshot?.name || product?.name || order.productName || "General enquiry";
  const productImage = snapshot?.image || product?.image || "";
  const productPrice = snapshot?.price || "";
  const productHref = product?.slug
    ? `/products/${product.slug}`
    : snapshot?.slug
      ? `/products/${snapshot.slug}`
      : "";
  const whatsappMessage = buildWhatsAppFollowUpMessage({
    productName,
    snapshot,
    customerMessage: order.message,
  });
  const whatsapp = whatsappHref(order.phone, whatsappMessage);
  const tone =
    order.status === "new"
      ? "new"
      : order.status === "won"
        ? "won"
        : order.status === "lost"
          ? "lost"
          : "default";

  return (
    <main className="flex flex-col gap-8">
      <AdminPageHeader
        backHref="/admin/orders"
        backLabel="Enquiries"
        eyebrow="Inbox"
        title={productName}
        description={`${formatDate(order.createdAt)} · ${order.source}`}
        actions={
          <span className={statusBadgeClass(tone)}>
            {enquiryStatusLabel(order.status)}
          </span>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <section className={adminPanelPad}>
          <h2 className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
            Contact
          </h2>
          <dl className="mt-5 grid gap-5">
            <div>
              <dt className={adminLabel}>Email</dt>
              <dd className="mt-1.5">
                <a
                  href={`mailto:${order.email}`}
                  className="font-helvetica text-sm text-[color:var(--admin-ink)] underline-offset-4 hover:underline"
                >
                  {order.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className={adminLabel}>Phone</dt>
              <dd className="mt-1.5 font-helvetica text-sm">
                {order.phone ? (
                  <span className="flex flex-wrap gap-4">
                    <a
                      href={`tel:${order.phone}`}
                      className="text-[color:var(--admin-ink)] underline-offset-4 hover:underline"
                    >
                      {order.phone}
                    </a>
                    {whatsapp ? (
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[color:var(--admin-muted)] underline-offset-4 hover:text-[color:var(--admin-ink)] hover:underline"
                      >
                        WhatsApp follow-up
                      </a>
                    ) : null}
                  </span>
                ) : (
                  <span className="text-[color:var(--admin-muted)]">Not provided</span>
                )}
              </dd>
            </div>
            <div>
              <dt className={adminLabel}>Product</dt>
              <dd className="mt-2">
                {productName !== "General enquiry" || productImage ? (
                  <div className="flex gap-3.5 border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] p-3">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt=""
                        className="size-16 shrink-0 object-cover bg-white"
                      />
                    ) : null}
                    <div className="min-w-0">
                      {productHref ? (
                        <Link
                          href={productHref}
                          className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)] underline-offset-4 hover:underline"
                        >
                          {productName}
                        </Link>
                      ) : (
                        <p className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
                          {productName}
                        </p>
                      )}
                      {productPrice ? (
                        <p className="mt-1 font-helvetica text-xs text-[color:var(--admin-muted)]">
                          {productPrice}
                        </p>
                      ) : null}
                      {selectedOptions.length > 0 ? (
                        <ul className="mt-2 flex flex-col gap-1">
                          {selectedOptions.map((item) => (
                            <li
                              key={item.label}
                              className="font-helvetica text-xs text-[color:var(--admin-ink)]"
                            >
                              <span className="text-[color:var(--admin-muted)]">
                                {item.label}:
                              </span>{" "}
                              {item.value}
                              {item.label === "Colour" &&
                              snapshot?.selection?.colour?.hex ? (
                                <span
                                  className="ml-2 inline-block size-3 align-middle border border-[color:var(--admin-line)]"
                                  style={{
                                    backgroundColor: snapshot.selection.colour.hex,
                                  }}
                                  aria-hidden="true"
                                />
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <p className="font-helvetica text-sm text-[color:var(--admin-muted)]">
                    General enquiry
                  </p>
                )}
              </dd>
            </div>
            <div>
              <dt className={adminLabel}>Message</dt>
              <dd className="mt-2 whitespace-pre-wrap border border-[color:var(--admin-line)] bg-[color:var(--admin-surface)] px-4 py-3 font-helvetica text-sm leading-6 text-[color:var(--admin-ink)]">
                {order.message || "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className={adminPanelPad}>
          <h2 className="font-helvetica text-sm font-medium text-[color:var(--admin-ink)]">
            Follow-up
          </h2>
          <p className="mt-1 font-helvetica text-xs text-[color:var(--admin-muted)]">
            Update status and keep internal notes for the studio.
          </p>
          <div className="mt-5">
            <OrderStatusForm order={order} />
          </div>
        </section>
      </div>
    </main>
  );
}
