import { notFound } from "next/navigation";
import ProductDetailHero from "@/components/sections/ProductDetailHero";
import ProductMaterialMasterySection from "@/components/sections/ProductMaterialMasterySection";
import ProductSustainabilitySection from "@/components/sections/ProductSustainabilitySection";
import { getProductDetailBySlug } from "@/lib/cms/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductDetailBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-white">
      <ProductDetailHero
        slug={product.slug}
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
  );
}
