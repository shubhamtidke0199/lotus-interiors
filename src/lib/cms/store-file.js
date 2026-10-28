import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  createDefaultAttributeDefinitions,
  defaultAttributeIds,
  normalizeAttributeDefinition,
  normalizeProductAttributes,
} from "@/lib/cms/attributes";
import { createId, parsePrice, slugify } from "@/lib/cms/format";
import { normalizeGalleryImages } from "@/lib/cms/images";
import { createSeedCatalog } from "@/lib/cms/seed";

const DATA_DIR = path.join(process.cwd(), "data");
const CATALOG_FILE = path.join(DATA_DIR, "catalog.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

let writeQueue = Promise.resolve();

function withLock(task) {
  const run = writeQueue.then(task, task);
  writeQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeCatalog(stored) {
  const seeded = createSeedCatalog();
  const defaults = createDefaultAttributeDefinitions();

  const attributeDefinitions = (
    Array.isArray(stored?.attributeDefinitions) && stored.attributeDefinitions.length > 0
      ? stored.attributeDefinitions
      : defaults
  )
    .map((definition) => {
      try {
        return normalizeAttributeDefinition(definition, definition);
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const attributeIds = attributeDefinitions.map((definition) => definition.id);
  const fallbackIds = attributeIds.length > 0 ? attributeIds : defaultAttributeIds();

  const categories = (
    Array.isArray(stored?.categories) && stored.categories.length > 0
      ? stored.categories
      : seeded.categories
  ).map((category, index) => ({
    id: category.id || slugify(category.name),
    name: category.name,
    slug: category.slug || slugify(category.name),
    sortOrder: Number(category.sortOrder ?? index + 1) || index + 1,
    active: category.active !== false,
    attributeIds: Array.isArray(category.attributeIds) && category.attributeIds.length > 0
      ? category.attributeIds
      : [...fallbackIds],
  }));

  const products = (
    Array.isArray(stored?.products) && stored.products.length > 0
      ? stored.products
      : seeded.products
  ).map((product) => {
    let attributes = product.attributes;
    try {
      attributes = normalizeProductAttributes(attributeDefinitions, product.attributes, {
        selectedMaterial: product.selectedMaterial,
        frameFinish: product.frameFinish,
      });
    } catch {
      attributes =
        product.attributes && typeof product.attributes === "object"
          ? product.attributes
          : {};
    }

    return {
      id: product.id,
      slug: product.slug || product.id,
      name: product.name,
      description: product.description ?? "",
      categoryId: product.categoryId,
      originalPrice: parsePrice(product.originalPrice),
      salePrice: parsePrice(product.salePrice),
      onSale: Boolean(product.onSale),
      published: product.published !== false,
      image: product.image ?? "",
      images: normalizeGalleryImages(product.images, product),
      attributes,
      createdAt: product.createdAt ?? new Date().toISOString(),
      updatedAt: product.updatedAt ?? new Date().toISOString(),
    };
  });

  return { attributeDefinitions, categories, products };
}

async function readCatalog() {
  const stored = await readJson(CATALOG_FILE, null);
  if (!stored) {
    const seeded = createSeedCatalog();
    await writeJson(CATALOG_FILE, seeded);
    return seeded;
  }

  const catalog = normalizeCatalog(stored);
  const needsUpgrade =
    !Array.isArray(stored.attributeDefinitions) ||
    stored.attributeDefinitions.length === 0 ||
    (stored.products || []).some(
      (product) =>
        !product.attributes ||
        typeof product.attributes !== "object" ||
        !Array.isArray(product.images),
    ) ||
    (stored.categories || []).some((category) => !Array.isArray(category.attributeIds));

  if (needsUpgrade) {
    await persistCatalog(catalog);
  }

  return catalog;
}

async function persistCatalog(catalog) {
  await writeJson(CATALOG_FILE, {
    attributeDefinitions: catalog.attributeDefinitions,
    categories: catalog.categories,
    products: catalog.products,
  });
}

async function readEnquiries() {
  const stored = await readJson(ENQUIRIES_FILE, { enquiries: [] });
  return Array.isArray(stored.enquiries) ? stored.enquiries : [];
}

export async function getCatalog() {
  const catalog = await readCatalog();
  return {
    attributeDefinitions: [...catalog.attributeDefinitions].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    ),
    categories: [...catalog.categories].sort((a, b) => a.sortOrder - b.sortOrder),
    products: [...catalog.products].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  };
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
  const { products } = await getCatalog();
  return products.find((product) => product.id === id || product.slug === id) ?? null;
}

export async function getCategoryById(id) {
  const { categories } = await getCatalog();
  return categories.find((category) => category.id === id) ?? null;
}

export async function getAttributeDefinitionById(id) {
  const { attributeDefinitions } = await getCatalog();
  return (
    attributeDefinitions.find(
      (definition) => definition.id === id || definition.slug === id,
    ) ?? null
  );
}

export async function saveAttributeDefinition(input) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const existing = input.id
      ? catalog.attributeDefinitions.find((definition) => definition.id === input.id)
      : null;

    const record = normalizeAttributeDefinition(input, existing);

    if (
      catalog.attributeDefinitions.some(
        (definition) =>
          definition.id !== existing?.id &&
          (definition.slug === record.slug ||
            definition.label.toLowerCase() === record.label.toLowerCase()),
      )
    ) {
      throw new Error("An attribute with this name already exists.");
    }

    if (!existing) {
      record.sortOrder =
        Number(input.sortOrder) ||
        catalog.attributeDefinitions.reduce(
          (max, definition) => Math.max(max, definition.sortOrder),
          0,
        ) + 1;
    }

    const attributeDefinitions = existing
      ? catalog.attributeDefinitions.map((definition) =>
          definition.id === existing.id ? record : definition,
        )
      : [...catalog.attributeDefinitions, record];

    // Keep category bindings in sync when adding a new attribute optionally.
    const categories = catalog.categories.map((category) => {
      if (existing) return category;
      if (!Array.isArray(category.attributeIds)) {
        return { ...category, attributeIds: [record.id] };
      }
      return category;
    });

    await persistCatalog({ ...catalog, attributeDefinitions, categories });
    return record;
  });
}

export async function deleteAttributeDefinition(id) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const attributeDefinitions = catalog.attributeDefinitions.filter(
      (definition) => definition.id !== id && definition.slug !== id,
    );
    if (attributeDefinitions.length === catalog.attributeDefinitions.length) {
      throw new Error("Attribute not found.");
    }

    const categories = catalog.categories.map((category) => ({
      ...category,
      attributeIds: (category.attributeIds || []).filter(
        (attributeId) => attributeId !== id,
      ),
    }));

    const products = catalog.products.map((product) => {
      if (!product.attributes || !(id in product.attributes)) return product;
      const attributes = { ...product.attributes };
      delete attributes[id];
      return { ...product, attributes };
    });

    await persistCatalog({ attributeDefinitions, categories, products });
  });
}

export async function saveCategory(input) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const name = String(input.name ?? "").trim();
    if (!name) {
      throw new Error("Category name is required.");
    }

    const slug = slugify(input.slug || name);
    if (!slug) {
      throw new Error("Category slug is required.");
    }

    const existing = input.id
      ? catalog.categories.find((category) => category.id === input.id)
      : null;

    if (
      catalog.categories.some(
        (category) =>
          category.id !== existing?.id &&
          (category.slug === slug || category.name.toLowerCase() === name.toLowerCase()),
      )
    ) {
      throw new Error("A category with this name already exists.");
    }

    const validAttributeIds = new Set(
      catalog.attributeDefinitions.map((definition) => definition.id),
    );
    const attributeIds = Array.isArray(input.attributeIds)
      ? [...new Set(input.attributeIds.map(String).filter((id) => validAttributeIds.has(id)))]
      : existing?.attributeIds ?? catalog.attributeDefinitions.map((definition) => definition.id);

    const record = {
      id: existing?.id ?? slug,
      name,
      slug,
      sortOrder: Number(input.sortOrder ?? existing?.sortOrder ?? catalog.categories.length + 1),
      active: input.active ?? existing?.active ?? true,
      attributeIds,
    };

    const categories = existing
      ? catalog.categories.map((category) =>
          category.id === existing.id ? record : category,
        )
      : [...catalog.categories, record];

    await persistCatalog({ ...catalog, categories });
    return record;
  });
}

export async function deleteCategory(id) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const inUse = catalog.products.some((product) => product.categoryId === id);
    if (inUse) {
      throw new Error("Move or delete products in this category first.");
    }

    const categories = catalog.categories.filter((category) => category.id !== id);
    if (categories.length === catalog.categories.length) {
      throw new Error("Category not found.");
    }

    await persistCatalog({ ...catalog, categories });
  });
}

export async function saveProduct(input) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const name = String(input.name ?? "").trim();
    const description = String(input.description ?? "").trim();
    const categoryId = String(input.categoryId ?? "").trim();
    const slug = slugify(input.slug || name);
    const image = String(input.image ?? "").trim();

    if (!name) throw new Error("Product name is required.");
    if (!slug) throw new Error("Product slug is required.");
    if (!categoryId) throw new Error("Please choose a category.");
    if (!catalog.categories.some((category) => category.id === categoryId)) {
      throw new Error("Choose a valid category.");
    }
    if (!image) throw new Error("Please add a product image.");

    const existing = input.id
      ? catalog.products.find((product) => product.id === input.id)
      : null;

    if (
      catalog.products.some(
        (product) => product.id !== existing?.id && product.slug === slug,
      )
    ) {
      throw new Error("Another product already uses this slug.");
    }

    const category = catalog.categories.find((item) => item.id === categoryId);
    const relevantDefinitions = catalog.attributeDefinitions.filter(
      (definition) =>
        definition.active !== false &&
        (!category?.attributeIds?.length || category.attributeIds.includes(definition.id)),
    );

    const attributes = normalizeProductAttributes(
      relevantDefinitions.length > 0 ? relevantDefinitions : catalog.attributeDefinitions,
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

    const products = existing
      ? catalog.products.map((product) => (product.id === existing.id ? record : product))
      : [record, ...catalog.products];

    await persistCatalog({ ...catalog, products });
    return record;
  });
}

export async function deleteProduct(id) {
  return withLock(async () => {
    const catalog = await readCatalog();
    const products = catalog.products.filter(
      (product) => product.id !== id && product.slug !== id,
    );
    if (products.length === catalog.products.length) {
      throw new Error("Product not found.");
    }
    await persistCatalog({ ...catalog, products });
  });
}

export async function getEnquiries() {
  const enquiries = await readEnquiries();
  return [...enquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getEnquiryById(id) {
  const enquiries = await getEnquiries();
  return enquiries.find((enquiry) => enquiry.id === id) ?? null;
}

export async function createEnquiry(input) {
  return withLock(async () => {
    const enquiries = await readEnquiries();
    const now = new Date().toISOString();
    const record = {
      id: createId("enq-"),
      productId: String(input.productId ?? "").trim(),
      productName: String(input.productName ?? "").trim(),
      productSnapshot:
        input.productSnapshot &&
        typeof input.productSnapshot === "object" &&
        !Array.isArray(input.productSnapshot)
          ? input.productSnapshot
          : null,
      email: String(input.email ?? "").trim(),
      phone: String(input.phone ?? "").trim(),
      message: String(input.message ?? "").trim(),
      source: String(input.source ?? "contact").trim() || "contact",
      status: "new",
      notes: "",
      createdAt: now,
      updatedAt: now,
    };
    await writeJson(ENQUIRIES_FILE, { enquiries: [record, ...enquiries] });
    return record;
  });
}

export async function updateEnquiry(id, input) {
  return withLock(async () => {
    const enquiries = await readEnquiries();
    const current = enquiries.find((enquiry) => enquiry.id === id);
    if (!current) {
      throw new Error("Order not found.");
    }

    const record = {
      ...current,
      status: String(input.status ?? current.status),
      notes: String(input.notes ?? current.notes),
      updatedAt: new Date().toISOString(),
    };

    await writeJson(ENQUIRIES_FILE, {
      enquiries: enquiries.map((enquiry) => (enquiry.id === id ? record : enquiry)),
    });
    return record;
  });
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
