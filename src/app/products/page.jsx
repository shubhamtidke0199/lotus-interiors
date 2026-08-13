import ProductsCatalogSection from "@/components/sections/ProductsCatalogSection";
import ProductsPageHero from "@/components/sections/ProductsPageHero";
import { Suspense } from "react";

export const metadata = {
  title: "Products",
  description:
    "Explore curated and customized furniture for every space. Discover pieces tailored to your aesthetic narrative.",
};

export default function ProductsPage() {
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
        <ProductsCatalogSection />
      </Suspense>
    </main>
  );
}
