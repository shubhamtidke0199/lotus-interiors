import {
  buildEnquiryMessage,
  normalizeProductSnapshot,
} from "@/lib/cms/enquiry";
import { parseIndiaPhone } from "@/lib/cms/format";
import { createEnquiry, getProductById } from "@/lib/cms/store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseSnapshotInput(body) {
  if (body.productSnapshot && typeof body.productSnapshot === "object") {
    return body.productSnapshot;
  }
  if (typeof body.productSnapshot === "string" && body.productSnapshot.trim()) {
    try {
      return JSON.parse(body.productSnapshot);
    } catch {
      return null;
    }
  }
  if (body.selection && typeof body.selection === "object") {
    return { selection: body.selection };
  }
  if (typeof body.selection === "string" && body.selection.trim()) {
    try {
      return { selection: JSON.parse(body.selection) };
    } catch {
      return null;
    }
  }
  return null;
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const phoneRaw = String(body.phone ?? body["contact-number"] ?? "").trim();
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

  let phone = "";
  if (source !== "consultation") {
    phone = parseIndiaPhone(phoneRaw) ?? "";
    if (!phone) {
      return Response.json(
        {
          error:
            "Enter a valid 10-digit Indian mobile number (country code +91 only).",
        },
        { status: 400 },
      );
    }
  } else if (phoneRaw) {
    phone = parseIndiaPhone(phoneRaw) ?? phoneRaw;
  }

  if (!message && source !== "consultation") {
    return Response.json(
      { error: "Please share your requirement or query." },
      { status: 400 },
    );
  }

  let product = null;
  if (productId) {
    product = await getProductById(productId);
    if (product) {
      productId = product.id;
    }
  }

  const productSnapshot = normalizeProductSnapshot(
    parseSnapshotInput(body),
    product,
  );
  const productName =
    product?.name ||
    productSnapshot?.name ||
    interest ||
    "";

  try {
    await createEnquiry({
      productId: productId || productSnapshot?.id || "",
      productName,
      productSnapshot,
      email,
      phone,
      message: buildEnquiryMessage({
        message:
          message ||
          (source === "consultation"
            ? "Consultation request from homepage CTA."
            : ""),
        productName,
        snapshot: productSnapshot,
      }),
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
