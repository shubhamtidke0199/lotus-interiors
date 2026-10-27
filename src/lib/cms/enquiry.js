import { formatPrice } from "@/lib/cms/format";

function cleanSelection(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const selection = {};

  if (raw.colour && typeof raw.colour === "object") {
    const label = String(raw.colour.label ?? "").trim();
    const id = String(raw.colour.id ?? "").trim();
    if (label || id) {
      selection.colour = {
        id,
        label: label || id,
        hex: String(raw.colour.hex ?? raw.colour.color ?? "").trim(),
      };
    }
  }

  const frameFinish = String(raw.frameFinish ?? "").trim();
  if (frameFinish) selection.frameFinish = frameFinish;

  if (raw.size && typeof raw.size === "object") {
    const label = String(raw.size.label ?? "").trim();
    const value = String(raw.size.value ?? raw.size.dimensions ?? "").trim();
    if (label || value) {
      selection.size = {
        id: String(raw.size.id ?? "").trim(),
        label: label || (raw.size.isCustom ? "Custom" : "Size"),
        value,
        isCustom: Boolean(raw.size.isCustom),
      };
    }
  }

  return selection;
}

export function normalizeProductSnapshot(raw, product) {
  const input = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const selection = cleanSelection(input.selection);

  const name =
    String(input.name ?? product?.name ?? "").trim() ||
    String(product?.name ?? "").trim();
  const slug =
    String(input.slug ?? product?.slug ?? "").trim() ||
    String(product?.slug ?? "").trim();
  const id =
    String(input.id ?? product?.id ?? "").trim() ||
    String(product?.id ?? "").trim();
  const image =
    String(input.image ?? product?.image ?? "").trim() ||
    String(product?.image ?? "").trim();
  const price =
    String(input.price ?? "").trim() ||
    formatPrice(product?.salePrice) ||
    formatPrice(product?.originalPrice) ||
    "";

  if (!name && !id && !slug && !Object.keys(selection).length) {
    return null;
  }

  return {
    id,
    slug,
    name,
    price,
    image,
    selection,
  };
}

export function selectionSummary(snapshot) {
  const selection = snapshot?.selection;
  if (!selection || typeof selection !== "object") return [];

  const lines = [];
  if (selection.colour?.label) {
    lines.push({ label: "Colour", value: selection.colour.label });
  }
  if (selection.frameFinish) {
    lines.push({ label: "Frame finish", value: selection.frameFinish });
  }
  if (selection.size?.value) {
    lines.push({
      label: selection.size.label || "Size",
      value: selection.size.value,
    });
  }
  return lines;
}

/** Prefilled WhatsApp text for studio follow-up (admin). */
export function buildWhatsAppFollowUpMessage({
  productName,
  snapshot,
  customerMessage,
}) {
  const name =
    String(productName ?? "").trim() ||
    String(snapshot?.name ?? "").trim() ||
    "your enquiry";

  const lines = selectionSummary(snapshot);
  let text = `Hi, this is Lotus Design Studio following up on your enquiry for ${name}.`;

  if (lines.length) {
    text += `\n\n${lines.map((item) => `${item.label}: ${item.value}`).join("\n")}`;
  }

  const brief = String(customerMessage ?? "")
    .trim()
    .split("\n")[0]
    .slice(0, 160);
  if (brief) {
    text += `\n\nYour note: ${brief}${brief.length >= 160 ? "…" : ""}`;
  }

  return text;
}

export function buildEnquiryMessage({ message, productName, snapshot }) {
  const base = String(message ?? "").trim();
  const lines = selectionSummary(snapshot).map(
    (item) => `${item.label}: ${item.value}`,
  );
  if (!lines.length) return base;

  const block = ["Selected options:", ...lines.map((line) => `• ${line}`)].join(
    "\n",
  );
  if (!base) return block;
  if (base.includes("Selected options:")) return base;
  return `${base}\n\n${block}`;
}
