/**
 * Push local data/catalog.json (+ enquiries) into Supabase.
 *
 * Usage:
 *   node --env-file=.env scripts/sync-catalog-to-supabase.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const root = process.cwd();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function readJson(relativePath, fallback) {
  try {
    return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
  } catch {
    return fallback;
  }
}

const catalog = await readJson("data/catalog.json", null);
if (!catalog) {
  console.error("data/catalog.json not found. Start the app once to seed it.");
  process.exit(1);
}

const attributeRows = (catalog.attributeDefinitions ?? []).map((definition) => ({
  id: definition.id,
  slug: definition.slug,
  label: definition.label,
  type: definition.type,
  required: Boolean(definition.required),
  filterable: Boolean(definition.filterable),
  sort_order: Number(definition.sortOrder) || 0,
  unit: definition.unit ?? "",
  options: definition.options ?? [],
  fields: definition.fields ?? [],
  active: definition.active !== false,
  updated_at: new Date().toISOString(),
}));

const categoryRows = (catalog.categories ?? []).map((category) => ({
  id: category.id,
  name: category.name,
  slug: category.slug,
  sort_order: Number(category.sortOrder) || 0,
  active: category.active !== false,
  attribute_ids: category.attributeIds ?? [],
  updated_at: new Date().toISOString(),
}));

const productRows = (catalog.products ?? []).map((product) => ({
  id: product.id,
  slug: product.slug,
  name: product.name,
  description: product.description ?? "",
  category_id: product.categoryId,
  original_price: product.originalPrice ?? 0,
  sale_price: product.salePrice ?? 0,
  on_sale: Boolean(product.onSale),
  published: product.published !== false,
  image: product.image ?? "",
  images: Array.isArray(product.images) ? product.images : [],
  gallery_top: product.images?.[0] ?? product.galleryTop ?? "",
  gallery_bottom: product.images?.[1] ?? product.galleryBottom ?? "",
  attributes: product.attributes ?? {},
  created_at: product.createdAt ?? new Date().toISOString(),
  updated_at: product.updatedAt ?? new Date().toISOString(),
}));

const enquiriesFile = await readJson("data/enquiries.json", { enquiries: [] });
const enquiryRows = (enquiriesFile.enquiries ?? []).map((enquiry) => ({
  id: enquiry.id,
  product_id: enquiry.productId ?? "",
  product_name: enquiry.productName ?? "",
  email: enquiry.email ?? "",
  phone: enquiry.phone ?? "",
  message: enquiry.message ?? "",
  source: enquiry.source ?? "contact",
  status: enquiry.status ?? "new",
  notes: enquiry.notes ?? "",
  created_at: enquiry.createdAt ?? new Date().toISOString(),
  updated_at: enquiry.updatedAt ?? new Date().toISOString(),
}));

async function upsert(table, rows) {
  if (!rows.length) {
    console.log(`Skip ${table} (empty).`);
    return;
  }
  const { error } = await supabase.from(table).upsert(rows, { onConflict: "id" });
  if (error) {
    console.error(`Failed upserting ${table}:`, error.message);
    process.exit(1);
  }
  console.log(`Upserted ${rows.length} row(s) into ${table}.`);
}

await upsert("attribute_definitions", attributeRows);
await upsert("categories", categoryRows);
await upsert("products", productRows);
await upsert("enquiries", enquiryRows);

console.log("Sync complete. The app will use Supabase when env vars are set.");
