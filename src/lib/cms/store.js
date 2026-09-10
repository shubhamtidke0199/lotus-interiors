import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createSeedCatalog } from "@/lib/cms/seed";
import { createId, slugify } from "@/lib/cms/format";

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

async function readCatalog() {
  const seeded = createSeedCatalog();
  const stored = await readJson(CATALOG_FILE, null);
  if (!stored) {
    return seeded;
  }

  return {
    categories: Array.isArray(stored.categories) ? stored.categories : seeded.categories,
    products: Array.isArray(stored.products) ? stored.products : seeded.products,
  };
}

async function readEnquiries() {
  const stored = await readJson(ENQUIRIES_FILE, { enquiries: [] });
  return Array.isArray(stored.enquiries) ? stored.enquiries : [];
}

export async function getCatalog() {
  const catalog = await readCatalog();
  return {
    categories: [...catalog.categories].sort((a, b) => a.sortOrder - b.sortOrder),
    products: [...catalog.products].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  };
}

export async function getPublishedCatalog() {
  const { categories, products } = await getCatalog();
  const activeCategories = categories.filter((category) => category.active);
  const activeIds = new Set(activeCategories.map((category) => category.id));

  return {
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

    const record = {
      id: existing?.id ?? slug,
      name,
      slug,
      sortOrder: Number(input.sortOrder ?? existing?.sortOrder ?? catalog.categories.length + 1),
      active: input.active ?? existing?.active ?? true,
    };

    const categories = existing
      ? catalog.categories.map((category) =>
          category.id === existing.id ? record : category,
        )
      : [...catalog.categories, record];

    await writeJson(CATALOG_FILE, { ...catalog, categories });
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

    await writeJson(CATALOG_FILE, { ...catalog, categories });
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

    const now = new Date().toISOString();
    const record = {
      id: existing?.id ?? slug,
      slug,
      name,
      description,
      categoryId,
      originalPrice: Math.max(0, Number(input.originalPrice) || 0),
      salePrice: Math.max(0, Number(input.salePrice) || 0),
      onSale: Boolean(input.onSale),
      published: input.published !== false,
      image,
      galleryTop: String(input.galleryTop ?? "").trim(),
      galleryBottom: String(input.galleryBottom ?? "").trim(),
      selectedMaterial: String(input.selectedMaterial ?? existing?.selectedMaterial ?? "").trim(),
      frameFinish: String(input.frameFinish ?? existing?.frameFinish ?? "Matte").trim() || "Matte",
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };

    const products = existing
      ? catalog.products.map((product) => (product.id === existing.id ? record : product))
      : [record, ...catalog.products];

    await writeJson(CATALOG_FILE, { ...catalog, products });
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
    await writeJson(CATALOG_FILE, { ...catalog, products });
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
  const [{ products, categories }, enquiries] = await Promise.all([
    getCatalog(),
    getEnquiries(),
  ]);

  return {
    productCount: products.length,
    publishedCount: products.filter((product) => product.published).length,
    categoryCount: categories.length,
    enquiryCount: enquiries.length,
    newEnquiryCount: enquiries.filter((enquiry) => enquiry.status === "new").length,
  };
}
