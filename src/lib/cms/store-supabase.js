import {
  normalizeAttributeDefinition,
  normalizeProductAttributes,
} from "@/lib/cms/attributes";
import { createId, parsePrice, slugify } from "@/lib/cms/format";
import { normalizeGalleryImages } from "@/lib/cms/images";
import {
  assertRemoteImageList,
  assertRemoteImageUrl,
  getSupabaseAdmin,
} from "@/lib/cms/supabase";

function mapAttribute(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    label: row.label,
    type: row.type,
    required: Boolean(row.required),
    filterable: Boolean(row.filterable),
    sortOrder: Number(row.sort_order) || 0,
    unit: row.unit ?? "",
    options: Array.isArray(row.options) ? row.options : [],
    fields: Array.isArray(row.fields) ? row.fields : [],
    active: row.active !== false,
  };
}

function mapCategory(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    sortOrder: Number(row.sort_order) || 0,
    active: row.active !== false,
    attributeIds: Array.isArray(row.attribute_ids) ? row.attribute_ids : [],
  };
}

function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    categoryId: row.category_id,
    originalPrice: parsePrice(row.original_price),
    salePrice: parsePrice(row.sale_price),
    onSale: Boolean(row.on_sale),
    published: row.published !== false,
    image: row.image ?? "",
    images: normalizeGalleryImages(row.images, {
      galleryTop: row.gallery_top,
      galleryBottom: row.gallery_bottom,
    }),
    attributes:
      row.attributes && typeof row.attributes === "object" && !Array.isArray(row.attributes)
        ? row.attributes
        : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapEnquiry(row) {
  if (!row) return null;
  return {
    id: row.id,
    productId: row.product_id ?? "",
    productName: row.product_name ?? "",
    productSnapshot:
      row.product_snapshot &&
      typeof row.product_snapshot === "object" &&
      !Array.isArray(row.product_snapshot) &&
      Object.keys(row.product_snapshot).length > 0
        ? row.product_snapshot
        : null,
    email: row.email ?? "",
    phone: row.phone ?? "",
    message: row.message ?? "",
    source: row.source ?? "contact",
    status: row.status ?? "new",
    notes: row.notes ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function attributeToRow(record) {
  return {
    id: record.id,
    slug: record.slug,
    label: record.label,
    type: record.type,
    required: Boolean(record.required),
    filterable: Boolean(record.filterable),
    sort_order: Number(record.sortOrder) || 0,
    unit: record.unit ?? "",
    options: record.options ?? [],
    fields: record.fields ?? [],
    active: record.active !== false,
    updated_at: new Date().toISOString(),
  };
}

function categoryToRow(record) {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    sort_order: Number(record.sortOrder) || 0,
    active: record.active !== false,
    attribute_ids: record.attributeIds ?? [],
    updated_at: new Date().toISOString(),
  };
}

function productToRow(record) {
  return {
    id: record.id,
    slug: record.slug,
    name: record.name,
    description: record.description ?? "",
    category_id: record.categoryId,
    original_price: record.originalPrice,
    sale_price: record.salePrice,
    on_sale: Boolean(record.onSale),
    published: record.published !== false,
    image: record.image ?? "",
    images: record.images ?? [],
    gallery_top: record.images?.[0] ?? "",
    gallery_bottom: record.images?.[1] ?? "",
    attributes: record.attributes ?? {},
    created_at: record.createdAt,
    updated_at: record.updatedAt,
  };
}

function throwIfError(error, fallback) {
  if (!error) return;
  throw new Error(error.message || fallback);
}

async function listAttributes(supabase) {
  const { data, error } = await supabase
    .from("attribute_definitions")
    .select("*")
    .order("sort_order", { ascending: true });
  throwIfError(error, "Unable to load attributes.");
  return (data ?? []).map(mapAttribute);
}

async function listCategories(supabase) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  throwIfError(error, "Unable to load categories.");
  return (data ?? []).map(mapCategory);
}

async function listProducts(supabase) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  throwIfError(error, "Unable to load products.");
  return (data ?? []).map(mapProduct);
}

export async function getCatalog() {
  const supabase = getSupabaseAdmin();
  const [attributeDefinitions, categories, products] = await Promise.all([
    listAttributes(supabase),
    listCategories(supabase),
    listProducts(supabase),
  ]);
  return { attributeDefinitions, categories, products };
}

export async function getPublishedCatalog() {
  const { attributeDefinitions, categories, products } = await getCatalog();
  const activeCategories = categories.filter((category) => category.active);
  const activeIds = new Set(activeCategories.map((category) => category.id));

  return {
    attributeDefinitions: attributeDefinitions.filter((definition) => definition.active !== false),
    categories: activeCategories,
    products: products.filter(
      (product) => product.published && activeIds.has(product.categoryId),
    ),
  };
}

export async function getProductById(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .maybeSingle();
  throwIfError(error, "Unable to load product.");
  return mapProduct(data);
}

export async function getCategoryById(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  throwIfError(error, "Unable to load category.");
  return mapCategory(data);
}

export async function getAttributeDefinitionById(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("attribute_definitions")
    .select("*")
    .or(`id.eq.${id},slug.eq.${id}`)
    .maybeSingle();
  throwIfError(error, "Unable to load attribute.");
  return mapAttribute(data);
}

export async function saveAttributeDefinition(input) {
  const supabase = getSupabaseAdmin();
  const existing = input.id ? await getAttributeDefinitionById(input.id) : null;
  const record = normalizeAttributeDefinition(input, existing);

  if (!existing) {
    const attributes = await listAttributes(supabase);
    if (
      attributes.some(
        (definition) =>
          definition.slug === record.slug ||
          definition.label.toLowerCase() === record.label.toLowerCase(),
      )
    ) {
      throw new Error("An attribute with this name already exists.");
    }
    record.sortOrder =
      Number(input.sortOrder) ||
      attributes.reduce((max, definition) => Math.max(max, definition.sortOrder), 0) + 1;
  }

  const { data, error } = await supabase
    .from("attribute_definitions")
    .upsert(attributeToRow(record), { onConflict: "id" })
    .select("*")
    .single();
  throwIfError(error, "Unable to save attribute.");
  return mapAttribute(data);
}

export async function deleteAttributeDefinition(id) {
  const supabase = getSupabaseAdmin();
  const existing = await getAttributeDefinitionById(id);
  if (!existing) throw new Error("Attribute not found.");

  const categories = await listCategories(supabase);
  await Promise.all(
    categories.map(async (category) => {
      if (!category.attributeIds.includes(existing.id)) return;
      const { error } = await supabase
        .from("categories")
        .update({
          attribute_ids: category.attributeIds.filter((attributeId) => attributeId !== existing.id),
          updated_at: new Date().toISOString(),
        })
        .eq("id", category.id);
      throwIfError(error, "Unable to update category attribute bindings.");
    }),
  );

  const products = await listProducts(supabase);
  await Promise.all(
    products.map(async (product) => {
      if (!(existing.id in (product.attributes || {}))) return;
      const attributes = { ...product.attributes };
      delete attributes[existing.id];
      const { error } = await supabase
        .from("products")
        .update({ attributes, updated_at: new Date().toISOString() })
        .eq("id", product.id);
      throwIfError(error, "Unable to clean product attributes.");
    }),
  );

  const { error } = await supabase
    .from("attribute_definitions")
    .delete()
    .eq("id", existing.id);
  throwIfError(error, "Unable to delete attribute.");
}

export async function saveCategory(input) {
  const supabase = getSupabaseAdmin();
  const name = String(input.name ?? "").trim();
  if (!name) throw new Error("Category name is required.");

  const slug = slugify(input.slug || name);
  if (!slug) throw new Error("Category slug is required.");

  const existing = input.id ? await getCategoryById(input.id) : null;
  const categories = await listCategories(supabase);
  if (
    categories.some(
      (category) =>
        category.id !== existing?.id &&
        (category.slug === slug || category.name.toLowerCase() === name.toLowerCase()),
    )
  ) {
    throw new Error("A category with this name already exists.");
  }

  const attributes = await listAttributes(supabase);
  const validAttributeIds = new Set(attributes.map((definition) => definition.id));
  const attributeIds = Array.isArray(input.attributeIds)
    ? [...new Set(input.attributeIds.map(String).filter((id) => validAttributeIds.has(id)))]
    : existing?.attributeIds ?? attributes.map((definition) => definition.id);

  const record = {
    id: existing?.id ?? slug,
    name,
    slug,
    sortOrder: Number(input.sortOrder ?? existing?.sortOrder ?? categories.length + 1),
    active: input.active ?? existing?.active ?? true,
    attributeIds,
  };

  const { data, error } = await supabase
    .from("categories")
    .upsert(categoryToRow(record), { onConflict: "id" })
    .select("*")
    .single();
  throwIfError(error, "Unable to save category.");
  return mapCategory(data);
}

export async function deleteCategory(id) {
  const supabase = getSupabaseAdmin();
  const { count, error: countError } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id);
  throwIfError(countError, "Unable to check category usage.");
  if (count > 0) {
    throw new Error("Move or delete products in this category first.");
  }

  const { error, count: deleted } = await supabase
    .from("categories")
    .delete({ count: "exact" })
    .eq("id", id);
  throwIfError(error, "Unable to delete category.");
  if (!deleted) throw new Error("Category not found.");
}

export async function saveProduct(input) {
  const supabase = getSupabaseAdmin();
  const name = String(input.name ?? "").trim();
  const description = String(input.description ?? "").trim();
  const categoryId = String(input.categoryId ?? "").trim();
  const slug = slugify(input.slug || name);
  const image = String(input.image ?? "").trim();

  if (!name) throw new Error("Product name is required.");
  if (!slug) throw new Error("Product slug is required.");
  if (!categoryId) throw new Error("Please choose a category.");
  if (!image) throw new Error("Please add a product image.");
  assertRemoteImageUrl(image, "Cover image");

  const category = await getCategoryById(categoryId);
  if (!category) throw new Error("Choose a valid category.");

  const existing = input.id ? await getProductById(input.id) : null;
  assertRemoteImageList(input.images ?? existing?.images ?? [], "Gallery image");
  const products = await listProducts(supabase);
  if (products.some((product) => product.id !== existing?.id && product.slug === slug)) {
    throw new Error("Another product already uses this slug.");
  }

  const attributeDefinitions = await listAttributes(supabase);
  const relevantDefinitions = attributeDefinitions.filter(
    (definition) =>
      definition.active !== false &&
      (!category.attributeIds?.length || category.attributeIds.includes(definition.id)),
  );

  const attributes = normalizeProductAttributes(
    relevantDefinitions.length > 0 ? relevantDefinitions : attributeDefinitions,
    input.attributes ?? existing?.attributes ?? {},
    {
      selectedMaterial: input.selectedMaterial ?? existing?.selectedMaterial,
      frameFinish: input.frameFinish ?? existing?.frameFinish,
    },
  );

  const now = new Date().toISOString();
  const record = {
    id: existing?.id ?? slug,
    slug,
    name,
    description,
    categoryId,
    originalPrice: parsePrice(input.originalPrice),
    salePrice: parsePrice(input.salePrice),
    onSale: Boolean(input.onSale),
    published: input.published !== false,
    image,
    images: normalizeGalleryImages(input.images, existing ?? {}),
    attributes,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from("products")
    .upsert(productToRow(record), { onConflict: "id" })
    .select("*")
    .single();
  throwIfError(error, "Unable to save product.");
  return mapProduct(data);
}

export async function deleteProduct(id) {
  const supabase = getSupabaseAdmin();
  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found.");

  const { error } = await supabase.from("products").delete().eq("id", existing.id);
  throwIfError(error, "Unable to delete product.");
}

export async function getEnquiries() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  throwIfError(error, "Unable to load orders.");
  return (data ?? []).map(mapEnquiry);
}

export async function getEnquiryById(id) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  throwIfError(error, "Unable to load order.");
  return mapEnquiry(data);
}

export async function createEnquiry(input) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const record = {
    id: createId("enq-"),
    product_id: String(input.productId ?? "").trim(),
    product_name: String(input.productName ?? "").trim(),
    product_snapshot:
      input.productSnapshot &&
      typeof input.productSnapshot === "object" &&
      !Array.isArray(input.productSnapshot)
        ? input.productSnapshot
        : {},
    email: String(input.email ?? "").trim(),
    phone: String(input.phone ?? "").trim(),
    message: String(input.message ?? "").trim(),
    source: String(input.source ?? "contact").trim() || "contact",
    status: "new",
    notes: "",
    created_at: now,
    updated_at: now,
  };

  const { data, error } = await supabase
    .from("enquiries")
    .insert(record)
    .select("*")
    .single();
  throwIfError(error, "Unable to create enquiry.");
  return mapEnquiry(data);
}

export async function updateEnquiry(id, input) {
  const supabase = getSupabaseAdmin();
  const current = await getEnquiryById(id);
  if (!current) throw new Error("Order not found.");

  const { data, error } = await supabase
    .from("enquiries")
    .update({
      status: String(input.status ?? current.status),
      notes: String(input.notes ?? current.notes),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();
  throwIfError(error, "Unable to update order.");
  return mapEnquiry(data);
}

export async function getDashboardStats() {
  const [{ products, categories, attributeDefinitions }, enquiries] = await Promise.all([
    getCatalog(),
    getEnquiries(),
  ]);

  return {
    productCount: products.length,
    publishedCount: products.filter((product) => product.published).length,
    categoryCount: categories.length,
    attributeCount: attributeDefinitions.length,
    enquiryCount: enquiries.length,
    newEnquiryCount: enquiries.filter((enquiry) => enquiry.status === "new").length,
  };
}
