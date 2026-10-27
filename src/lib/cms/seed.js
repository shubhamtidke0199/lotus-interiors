import { catalogProducts } from "@/data/productsPageContent";
import {
  createDefaultAttributeDefinitions,
  defaultAttributeIds,
  normalizeProductAttributes,
} from "@/lib/cms/attributes";
import { parsePrice, slugify } from "@/lib/cms/format";

export function createSeedCatalog() {
  const attributeDefinitions = createDefaultAttributeDefinitions();
  const names = [...new Set(catalogProducts.map((product) => product.category))];
  const attributeIds = defaultAttributeIds();

  const categories = names.map((name, index) => ({
    id: slugify(name),
    name,
    slug: slugify(name),
    sortOrder: index + 1,
    active: true,
    attributeIds: [...attributeIds],
  }));

  const categoryByName = Object.fromEntries(
    categories.map((category) => [category.name, category]),
  );

  const products = catalogProducts.map((product, index) => {
    const legacy = {
      selectedMaterial: "Full Grain Leather",
      frameFinish: "Matte",
    };
    const attributes = normalizeProductAttributes(
      attributeDefinitions,
      {
        material: "full-grain-leather",
        colour: ["walnut", "rose", "espresso", "blush"],
        dimensions: [
          {
            id: "overall",
            label: "Overall",
            w: 180,
            d: 90,
            h: 75,
            unit: "cm",
          },
        ],
        warranty: "11 years",
        "use-area": slugify(product.category) || "living-room",
        "frame-finish": "matte",
      },
      legacy,
    );

    return {
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
      images: [],
      attributes,
      createdAt: new Date(Date.now() - (catalogProducts.length - index) * 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });

  return { attributeDefinitions, categories, products };
}
