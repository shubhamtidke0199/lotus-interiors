import { digitsOnly, parseIndiaPhone } from "@/lib/cms/format";

export const ENQUIRY_CONTACT_STORAGE_KEY = "lotus-enquiry-contact";

export function loadEnquiryContactDraft() {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(ENQUIRY_CONTACT_STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);
    const email = String(data.email ?? "").trim();
    let phoneLocal = digitsOnly(data.phoneLocal ?? data.phone ?? "");

    if (phoneLocal.startsWith("91") && phoneLocal.length === 12) {
      phoneLocal = phoneLocal.slice(2);
    } else if (phoneLocal.length === 11 && phoneLocal.startsWith("0")) {
      phoneLocal = phoneLocal.slice(1);
    }
    phoneLocal = phoneLocal.slice(0, 10);

    if (!email && !phoneLocal) return null;
    return { email, phoneLocal };
  } catch {
    return null;
  }
}

export function saveEnquiryContactDraft({ email, phoneLocal, phone }) {
  if (typeof window === "undefined") return;

  const storedEmail = String(email ?? "").trim();
  let local = digitsOnly(phoneLocal ?? "");

  if (!local && phone) {
    const normalized = parseIndiaPhone(phone);
    if (normalized) {
      local = normalized.slice(3);
    }
  }
  local = local.slice(0, 10);

  if (!storedEmail && !local) return;

  try {
    window.localStorage.setItem(
      ENQUIRY_CONTACT_STORAGE_KEY,
      JSON.stringify({
        email: storedEmail,
        phoneLocal: local,
        updatedAt: Date.now(),
      }),
    );
  } catch {
    // ignore quota / private browsing
  }
}
