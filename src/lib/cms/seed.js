import { catalogProducts } from "@/data/productsPageContent";
import { parsePrice, slugify } from "@/lib/cms/format";

export function createSeedCatalog() {
  const names = [...new Set(catalogProducts.map((product) => product.category))];
  const categories = names.map((name, index) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    sortOrder: index + 1,
    active: true,
  }));

  const categoryByName = Object.fromEntries(
    categories.map((category) => [category.name, category]),
  );

  const products = catalogProducts.map((product, index) => ({
    id: product.id,
    slug: product.id,
    name: product.name,
    description: product.description,
    categoryId: categoryByName[product.category]?.id ?? slugify(product.category),
    originalPrice: parsePrice(product.originalPrice),
    salePrice: parsePrice(product.salePrice),
    onSale: Boolean(product.onSale),
    published: true,
    image: product.image,
    galleryTop: "",
    galleryBottom: "",
    selectedMaterial: "Full Grain Leather",
    frameFinish: "Matte",
    createdAt: new Date(Date.now() - (catalogProducts.length - index) * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return { categories, products };
}
