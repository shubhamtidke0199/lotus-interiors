import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import ProductsCatalogSection from "@/components/sections/ProductsCatalogSection";
import ProductsPageHero from "@/components/sections/ProductsPageHero";

export const metadata = {
  title: "Products | Lotus Design Studio",
  description:
    "Explore curated and customized furniture for every space. Discover pieces tailored to your aesthetic narrative.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ProductsPageHero />
        <ProductsCatalogSection />
      </main>
      <SiteFooter />
    </div>
  );
}
