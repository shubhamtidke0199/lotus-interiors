import { buildProductDisplayAttributes } from "@/lib/cms/attributes";
import { defaultProductDetail } from "@/data/productDetailContent";
import { formatPrice, parsePrice } from "@/lib/cms/format";
import {
  getCatalog,
  getProductById,
  getPublishedCatalog,
} from "@/lib/cms/store";

function categoryName(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Uncategorised";
}

export function resolveProductPrices(product) {
  const original = parsePrice(product?.originalPrice);
  let sale = parsePrice(product?.salePrice);
  const onSale = Boolean(product?.onSale);

  if (!original && sale) {
    return {
      original: sale,
      sale,
      display: sale,
      showCompareAt: false,
      onSale: false,
    };
  }

  if (!sale) sale = original;

  const showCompareAt =
    onSale && original > 0 && sale > 0 && sale < original;
  const display = showCompareAt ? sale : sale || original;

  return {
    original,
    sale,
    display,
    showCompareAt,
    onSale: showCompareAt,
  };
}

export function toCatalogCard(product, category) {
  const prices = resolveProductPrices(product);

  return {
    id: product.slug,
    name: product.name,
    description: product.description,
    originalPrice: formatPrice(prices.original),
    salePrice: formatPrice(prices.display),
    category: category?.name ?? "Uncategorised",
    image: product.image,
    imageClassName: "absolute inset-0 size-full object-cover",
    onSale: prices.onSale,
    showCompareAt: prices.showCompareAt,
    staggered: false,
  };
}

export async function getCatalogProducts() {
  const { products, categories } = await getPublishedCatalog();
  const byId = Object.fromEntries(categories.map((category) => [category.id, category]));
  return products.map((product) => toCatalogCard(product, byId[product.categoryId]));
}

export async function getCatalogCategoryNames() {
  const { categories } = await getPublishedCatalog();
  return categories.map((category) => category.name);
}

export async function getAdminProductList() {
  const { products, categories } = await getCatalog();
  return products.map((product) => {
    const prices = resolveProductPrices(product);
    return {
      ...product,
      categoryName: categoryName(categories, product.categoryId),
      priceLabel: formatPrice(prices.display),
    };
  });
}

export async function getProductDetailBySlug(slug) {
  const [{ attributeDefinitions, categories }, product] = await Promise.all([
    getPublishedCatalog(),
    getProductById(slug),
  ]);

  if (!product || !product.published) return null;

  const category = categories.find((item) => item.id === product.categoryId);
  if (!category) return null;

  const display = buildProductDisplayAttributes(product, attributeDefinitions);
  const prices = resolveProductPrices(product);
  const highlights = display.warranty
    ? [{ label: display.warranty.replace(/\s+/g, "\n") }]
    : [];

  return {
    slug: product.slug,
    title: product.name,
    summary: product.description || "",
    price: formatPrice(prices.display),
    compareAtPrice: prices.showCompareAt ? formatPrice(prices.original) : "",
    selectedMaterial: display.selectedMaterial,
    frameFinish: display.frameFinish,
    specs: display.specs,
    swatches: display.swatches,
    dimensions: display.dimensions,
    highlights,
    attributes: product.attributes ?? {},
    sustainability: defaultProductDetail.sustainability,
    gallery: {
      main: product.image || "",
      images: Array.isArray(product.images) ? product.images.filter(Boolean) : [],
    },
  };
}

export async function getAllProductSlugs() {
  const { products } = await getPublishedCatalog();
  return products.map((product) => product.slug);
}
