export function parsePrice(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value);
  }

  const digits = String(value ?? "").replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export function formatPrice(value) {
  const amount = parsePrice(value);
  if (!amount) return "";
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createId(prefix = "") {
  return `${prefix}${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function digitsOnly(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function whatsappHref(phone) {
  const digits = digitsOnly(phone);
  if (!digits) return "";
  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountry}`;
}

export const ENQUIRY_STATUSES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "consult_booked", label: "Consult booked" },
  { id: "quoted", label: "Quoted" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export function enquiryStatusLabel(status) {
  return ENQUIRY_STATUSES.find((item) => item.id === status)?.label ?? status;
}
