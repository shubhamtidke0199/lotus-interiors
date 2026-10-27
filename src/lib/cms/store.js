import { getStorageDriver, isSupabaseConfigured } from "@/lib/cms/supabase";

async function backend() {
  const driver = getStorageDriver();

  if (driver === "supabase") {
    if (!isSupabaseConfigured()) {
      throw new Error(
        "CMS_STORAGE is supabase (or implied) but NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are missing. Fix .env and restart.",
      );
    }
    return import("@/lib/cms/store-supabase");
  }

  // Explicit local-only escape hatch: CMS_STORAGE=file
  return import("@/lib/cms/store-file");
}

export function getCatalogBackend() {
  return getStorageDriver();
}

export async function getCatalog() {
  return (await backend()).getCatalog();
}

export async function getPublishedCatalog() {
  return (await backend()).getPublishedCatalog();
}

export async function getProductById(id) {
  return (await backend()).getProductById(id);
}

export async function getCategoryById(id) {
  return (await backend()).getCategoryById(id);
}

export async function getAttributeDefinitionById(id) {
  return (await backend()).getAttributeDefinitionById(id);
}

export async function saveAttributeDefinition(input) {
  return (await backend()).saveAttributeDefinition(input);
}

export async function deleteAttributeDefinition(id) {
  return (await backend()).deleteAttributeDefinition(id);
}

export async function saveCategory(input) {
  return (await backend()).saveCategory(input);
}

export async function deleteCategory(id) {
  return (await backend()).deleteCategory(id);
}

export async function saveProduct(input) {
  return (await backend()).saveProduct(input);
}

export async function deleteProduct(id) {
  return (await backend()).deleteProduct(id);
}

export async function getEnquiries() {
  return (await backend()).getEnquiries();
}

export async function getEnquiryById(id) {
  return (await backend()).getEnquiryById(id);
}

export async function createEnquiry(input) {
  return (await backend()).createEnquiry(input);
}

export async function updateEnquiry(id, input) {
  return (await backend()).updateEnquiry(id, input);
}

export async function getDashboardStats() {
  return (await backend()).getDashboardStats();
}
