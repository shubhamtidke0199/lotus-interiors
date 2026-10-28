import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminPanel from "@/components/admin/AdminPanel";
import OrderStatusForm from "@/components/admin/OrderStatusForm";
import { adminLabel, statusBadgeClass } from "@/components/admin/adminUi";
import {
  buildWhatsAppFollowUpMessage,
  selectionSummary,
} from "@/lib/cms/enquiry";
import { enquiryStatusLabel, whatsappHref } from "@/lib/cms/format";
import { getEnquiryById, getProductById } from "@/lib/cms/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
          <Badge className={statusBadgeClass(tone)}>
            {enquiryStatusLabel(order.status)}
          </Badge>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <AdminPanel title="Contact">
          <dl className="grid gap-5">
            <div>
              <dt className={adminLabel}>Email</dt>
              <dd className="mt-1.5">
                <Button
                  variant="link"
                  className="h-auto p-0 font-helvetica text-sm"
                  render={<a href={`mailto:${order.email}`} />}
                >
                  {order.email}
                </Button>
              </dd>
            </div>
            <div>
              <dt className={adminLabel}>Phone</dt>
              <dd className="mt-1.5 font-helvetica text-sm">
                {order.phone ? (
                  <span className="flex flex-wrap gap-3">
                    <Button
                      variant="link"
                      className="h-auto p-0 font-helvetica text-sm"
                      render={<a href={`tel:${order.phone}`} />}
                    >
                      {order.phone}
                    </Button>
                    {whatsapp ? (
                      <Button
                        variant="link"
                        className="h-auto p-0 font-helvetica text-sm text-muted-foreground"
                        render={
                          <a href={whatsapp} target="_blank" rel="noreferrer" />
                        }
                      >
                        WhatsApp follow-up
                      </Button>
                    ) : null}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </dd>
            </div>
            <Separator />
            <div>
              <dt className={adminLabel}>Product</dt>
              <dd className="mt-2">
                {productName !== "General enquiry" || productImage ? (
                  <Card className="bg-muted/40 shadow-none">
                    <CardContent className="flex gap-3.5 p-3">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt=""
                          className="size-16 shrink-0 rounded-md object-cover bg-background"
                        />
                      ) : null}
                      <div className="min-w-0">
                        {productHref ? (
                          <Button
                            variant="link"
                            className="h-auto p-0 font-helvetica text-sm font-medium"
                            render={<Link href={productHref} />}
                          >
                            {productName}
                          </Button>
                        ) : (
                          <p className="font-helvetica text-sm font-medium text-foreground">
                            {productName}
                          </p>
                        )}
                        {productPrice ? (
                          <p className="mt-1 font-helvetica text-xs text-muted-foreground">
                            {productPrice}
                          </p>
                        ) : null}
                        {selectedOptions.length > 0 ? (
                          <ul className="mt-2 flex flex-col gap-1">
                            {selectedOptions.map((item) => (
                              <li
                                key={item.label}
                                className="font-helvetica text-xs text-foreground"
                              >
                                <span className="text-muted-foreground">
                                  {item.label}:
                                </span>{" "}
                                {item.value}
                                {item.label === "Colour" &&
                                snapshot?.selection?.colour?.hex ? (
                                  <span
                                    className="ml-2 inline-block size-3 align-middle rounded-sm border border-border"
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
                    </CardContent>
                  </Card>
                ) : (
                  <p className="font-helvetica text-sm text-muted-foreground">
                    General enquiry
                  </p>
                )}
              </dd>
            </div>
            <div>
              <dt className={adminLabel}>Message</dt>
              <dd className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/50 px-4 py-3 font-helvetica text-sm leading-6 text-foreground">
                {order.message || "—"}
              </dd>
            </div>
          </dl>
        </AdminPanel>

        <AdminPanel
          title="Follow-up"
          description="Update status and keep internal notes for the studio."
        >
          <OrderStatusForm order={order} />
        </AdminPanel>
      </div>
    </main>
  );
}
