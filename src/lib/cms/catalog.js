import { defaultProductDetail } from "@/data/productDetailContent";
import { formatPrice } from "@/lib/cms/format";
import { getCatalog, getProductById, getPublishedCatalog } from "@/lib/cms/store";

function categoryName(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)?.name ?? "Uncategorised";
}

export function toCatalogCard(product, category) {
  return {
    id: product.slug,
    name: product.name,
    description: product.description,
    originalPrice: formatPrice(product.originalPrice),
    salePrice: formatPrice(product.salePrice) || formatPrice(product.originalPrice),
    category: category?.name ?? "Uncategorised",
    image: product.image,
    imageClassName: "absolute inset-0 size-full object-cover",
    onSale: Boolean(product.onSale),
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
  return products.map((product) => ({
    ...product,
    categoryName: categoryName(categories, product.categoryId),
    priceLabel: formatPrice(product.salePrice) || formatPrice(product.originalPrice),
  }));
}

export async function getProductDetailBySlug(slug) {
  const product = await getProductById(slug);
  if (!product || !product.published) return null;

  return {
    ...defaultProductDetail,
    slug: product.slug,
    title: product.name,
    summary: product.description || defaultProductDetail.summary,
    price: formatPrice(product.salePrice) || formatPrice(product.originalPrice),
    selectedMaterial: product.selectedMaterial || defaultProductDetail.selectedMaterial,
    frameFinish: product.frameFinish || defaultProductDetail.frameFinish,
    gallery: {
      top: product.galleryTop || defaultProductDetail.gallery.top,
      main: product.image || defaultProductDetail.gallery.main,
      bottom: product.galleryBottom || defaultProductDetail.gallery.bottom,
    },
  };
}

export async function getAllProductSlugs() {
  const { products } = await getPublishedCatalog();
  return products.map((product) => product.slug);
}
