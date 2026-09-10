import { catalogProducts } from "@/data/productsPageContent";

export const materialSwatches = [
  { id: "walnut", color: "#7c5050", selected: true },
  { id: "rose", color: "#b18a8a", selected: false },
  { id: "espresso", color: "#5c4a4a", selected: false },
  { id: "blush", color: "#d4c2c2", selected: false },
];

export const productSpecs = [
  { label: "Theme", value: "Sliding" },
  { label: "Size", value: "Medium" },
  { label: "Configuration", value: "Custom" },
  { label: "Floor Material", value: "Laminate" },
  { label: "Type", value: "Sliding" },
];

export const productHighlights = [
  { label: "11 Year\nWarranty" },
  { label: "2 lac+\nDesigns" },
  { label: "4.5 Google Ratings" },
];

export const materialMasteryCards = [
  {
    number: "01",
    title: "Matte Laminated",
    description:
      "Industrial strength meets organic aesthetic. Our laminates offer a high-durability surface that mimics the warmth of natural wood with zero maintenance.",
    image: "/images/product-view/card-background/card-background-margin1.png",
  },
  {
    number: "02",
    title: "Premium PU Finish",
    description:
      "A buttery, velvet-like tactile experience. Polyurethane finishing provides a flawless solid-color coat that is both water-resistant and scratch-proof.",
    image: "/images/product-view/card-background/card-background-margin2.png",
  },
  {
    number: "03",
    title: "Architectural Acrylic",
    description:
      "For a hyper-modern edge. High-gloss acrylic components provide deep reflections and a laboratory-clean aesthetic to any interior setting.",
    image: "/images/product-view/card-background/card-background-margin2.png",
  },
];

export const defaultProductDetail = {
  title: "Warm Wood Sliding Wardrobe with Mirror Open Shelves",
  summary:
    "This floor-to-ceiling sliding wardrobe combines warm wood tones with soft beige panels for a balanced, modern look. The sliding shutters save space and keep the room visually calm while offering generous storage.",
  price: "Rs. 4,25,000",
  selectedMaterial: "Full Grain Leather",
  frameFinish: "Matte",
  gallery: {
    top: "/images/product-view/background/background-ab6a.png",
    main: "/images/product-view/hero-section-img.png",
    bottom: "/images/product-view/background/background-ab6axu-aja.png",
  },
  sustainability: {
    stat: "0%",
    title: "Plastic Components",
    description:
      "The Lyra chair is composed entirely of infinitely recyclable metal and natural biodegradable upholstery.",
    inSituLabel: "In Situ / 04",
    inSituImage: "/images/product-view/bento-item.png",
  },
};

export function getProductDetail(slug) {
  const catalogProduct = catalogProducts.find((product) => product.id === slug);
  if (!catalogProduct) {
    return null;
  }

  return {
    ...defaultProductDetail,
    slug: catalogProduct.id,
    title: catalogProduct.name,
    price: catalogProduct.salePrice,
    summary: catalogProduct.description,
    gallery: {
      ...defaultProductDetail.gallery,
      main: catalogProduct.image,
    },
  };
}

export function getAllProductSlugs() {
  return catalogProducts.map((product) => product.id);
}
