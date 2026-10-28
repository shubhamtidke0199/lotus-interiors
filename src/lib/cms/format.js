export function parsePrice(value) {
  if (value == null || value === "") return 0;
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value);
  }

  let raw = String(value).trim();
  if (!raw) return 0;

  raw = raw.replace(/^rs\.?\s*/i, "").trim();
  const normalized = raw.replace(/,/g, "").replace(/\s+/g, "");

  // Decimal rupee amounts (e.g. 10000.00) — do not strip the dot and merge digits.
  if (/^\d+\.\d+$/.test(normalized)) {
    const amount = Number.parseFloat(normalized);
    return Number.isFinite(amount) ? Math.round(amount) : 0;
  }

  // Grouped integers only (12,000 or 1,20,000)
  if (/^\d+$/.test(normalized)) {
    return Number(normalized);
  }

  // Fallback: currency text without decimals
  if (!raw.includes(".")) {
    const digits = raw.replace(/\D/g, "");
    return digits ? Number(digits) : 0;
  }

  const amount = Number.parseFloat(normalized);
  return Number.isFinite(amount) ? Math.round(amount) : 0;
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

/** Indian mobile: 10 digits, leading digit 6–9. Returns +91XXXXXXXXXX or null. */
export function parseIndiaPhone(input) {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  let digits = digitsOnly(raw);
  if (digits.startsWith("91") && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return null;
  }
  return `+91${digits}`;
}

export function whatsappHref(phone, text) {
  const digits = digitsOnly(phone);
  if (!digits) return "";
  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  const base = `https://wa.me/${withCountry}`;
  const message = String(text ?? "").trim();
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** True when local part is exactly 10 digits and passes Indian mobile rules. */
export function isValidIndiaPhoneLocal(phoneLocal) {
  return Boolean(parseIndiaPhone(phoneLocal));
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
