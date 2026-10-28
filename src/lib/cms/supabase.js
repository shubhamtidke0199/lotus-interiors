import { createClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(value) {
  const trimmed = String(value ?? "").trim().replace(/\/+$/, "");
  // Dashboard sometimes copies the Data API path — supabase-js wants the project root.
  return trimmed.replace(/\/rest\/v1$/i, "");
}

export function getSupabaseUrl() {
  return normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
}

export function getSupabaseServiceKey() {
  return String(process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceKey());
}

/**
 * Catalog + uploads go to Supabase by default.
 * Local JSON/files only when CMS_STORAGE=file is set explicitly.
 */
export function getStorageDriver() {
  const forced = String(process.env.CMS_STORAGE ?? "")
    .trim()
    .toLowerCase();

  if (forced === "file") return "file";
  if (forced === "supabase") return "supabase";
  return isSupabaseConfigured() ? "supabase" : "file";
}

export function requireSupabaseBackend(action = "This action") {
  if (getStorageDriver() === "supabase") {
    if (!isSupabaseConfigured()) {
      throw new Error(
        `${action} requires Supabase. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env, then restart the server.`,
      );
    }
    return;
  }

  if (getStorageDriver() === "file") {
    return;
  }
}

export function getSupabaseAdmin() {
  requireSupabaseBackend("Database access");
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createClient(getSupabaseUrl(), getSupabaseServiceKey(), {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function assertRemoteImageUrl(url, fieldLabel = "Image") {
  const value = String(url ?? "").trim();
  if (!value) return value;

  if (value.startsWith("/uploads/")) {
    throw new Error(
      `${fieldLabel} is still a local /uploads path. Re-upload it so the file is stored in Supabase Storage.`,
    );
  }

  return value;
}

export function assertRemoteImageList(urls, fieldLabel = "Gallery image") {
  const list = Array.isArray(urls) ? urls : [];
  return list.map((url, index) =>
    assertRemoteImageUrl(url, `${fieldLabel} ${index + 1}`),
  );
}
