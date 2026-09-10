import Link from "next/link";
import { notFound } from "next/navigation";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
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
  return { title: order ? `Order ${order.email}` : "Order" };
}

export default async function AdminOrderDetailPage({ params }) {
  const { id } = await params;
  const order = await getEnquiryById(id);
  if (!order) notFound();

  const product = order.productId ? await getProductById(order.productId) : null;
  const whatsapp = whatsappHref(order.phone);

  return (
    <main>
      <Link
        href="/admin/orders"
        className="font-fraunces text-sm text-muted hover:text-primary"
      >
        ← Orders
      </Link>
      <h1 className="mt-4 font-fraunces text-3xl text-heading">Order detail</h1>
      <p className="mt-2 font-fraunces text-sm text-muted">
        {enquiryStatusLabel(order.status)} · {formatDate(order.createdAt)}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="bg-white px-6 py-8 sm:px-8">
          <h2 className="font-fraunces text-lg text-heading">Buyer</h2>
          <dl className="mt-6 grid gap-4">
            <div>
              <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${order.email}`}
                  className="font-fraunces text-sm text-primary hover:underline"
                >
                  {order.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
                Phone
              </dt>
              <dd className="mt-1 font-fraunces text-sm">
                {order.phone ? (
                  <span className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${order.phone}`}
                      className="text-primary hover:underline"
                    >
                      {order.phone}
                    </a>
                    {whatsapp ? (
                      <a
                        href={whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        WhatsApp
                      </a>
                    ) : null}
                  </span>
                ) : (
                  "Not provided"
                )}
              </dd>
            </div>
            <div>
              <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
                Source
              </dt>
              <dd className="mt-1 font-fraunces text-sm text-nav">{order.source}</dd>
            </div>
            <div>
              <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
                Product
              </dt>
              <dd className="mt-1 font-fraunces text-sm text-nav">
                {product ? (
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-primary hover:underline"
                  >
                    {product.name}
                  </Link>
                ) : (
                  order.productName || "General enquiry"
                )}
              </dd>
            </div>
            <div>
              <dt className="font-helvetica text-xs uppercase tracking-wide text-muted">
                Message
              </dt>
              <dd className="mt-2 whitespace-pre-wrap font-fraunces text-sm leading-6 text-nav">
                {order.message || "—"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="bg-white px-6 py-8 sm:px-8">
          <h2 className="font-fraunces text-lg text-heading">Follow-up</h2>
          <div className="mt-6">
            <OrderStatusForm order={order} />
          </div>
        </section>
      </div>
    </main>
  );
}
