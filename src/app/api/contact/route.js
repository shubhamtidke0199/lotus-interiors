import { createEnquiry, getProductById } from "@/lib/cms/store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? body["contact-number"] ?? "").trim();
  const message = String(
    body.message ?? body["requirement-brief"] ?? body.brief ?? "",
  ).trim();
  const source = String(body.source ?? "contact").trim();
  const interest = String(body.interest ?? "").trim();
  let productId = String(body.productId ?? body.product ?? "").trim();

  if (!email) {
    return Response.json({ error: "Please enter your email." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  if (!phone && source !== "consultation") {
    return Response.json({ error: "Please enter your phone number." }, { status: 400 });
  }

  if (!message && source !== "consultation") {
    return Response.json(
      { error: "Please share your requirement or query." },
      { status: 400 },
    );
  }

  let productName = interest;
  if (productId) {
    const product = await getProductById(productId);
    if (product) {
      productId = product.id;
      productName = product.name;
    }
  }

  try {
    await createEnquiry({
      productId,
      productName,
      email,
      phone,
      message:
        message ||
        (source === "consultation"
          ? "Consultation request from homepage CTA."
          : ""),
      source,
    });
  } catch (error) {
    console.error("[lotus-contact]", error);
    return Response.json(
      { error: "Unable to save your request right now. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({
    ok: true,
    message: "Thank you. Our studio will reach out shortly.",
  });
}
