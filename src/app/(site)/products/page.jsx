import ProductsCatalogSection from "@/components/sections/ProductsCatalogSection";
import ProductsPageHero from "@/components/sections/ProductsPageHero";
import { getCatalogCategoryNames, getCatalogProducts } from "@/lib/cms/catalog";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Products",
  description:
    "Explore curated and customized furniture for every space. Discover pieces tailored to your aesthetic narrative.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getCatalogProducts(),
    getCatalogCategoryNames(),
  ]);

  return (
    <main className="bg-white">
      <ProductsPageHero />
      <Suspense
        fallback={
          <div className="container-site px-4 py-16 font-fraunces text-sm text-muted">
            Loading catalog…
          </div>
        }
      >
        <ProductsCatalogSection products={products} categories={categories} />
      </Suspense>
    </main>
  );
}
