import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import ProductDetailHero from "@/components/sections/ProductDetailHero";
import ProductMaterialMasterySection from "@/components/sections/ProductMaterialMasterySection";
import ProductSustainabilitySection from "@/components/sections/ProductSustainabilitySection";
import {
  getAllProductSlugs,
  getProductDetail,
} from "@/data/productDetailContent";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) {
    return { title: "Product Not Found | Lotus Design Studio" };
  }

  return {
    title: `${product.title} | Lotus Design Studio`,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductDetail(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ProductDetailHero
          title={product.title}
          summary={product.summary}
          price={product.price}
          selectedMaterial={product.selectedMaterial}
          frameFinish={product.frameFinish}
          gallery={product.gallery}
        />
        <ProductMaterialMasterySection />
        <ProductSustainabilitySection {...product.sustainability} />
      </main>
      <SiteFooter />
    </div>
  );
}
