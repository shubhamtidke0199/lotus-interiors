"use client";

import FilterTabs from "@/components/ui/FilterTabs";
import ProductCard from "@/components/ui/ProductCard";
import SectionIntro from "@/components/ui/SectionIntro";
import { productFilters, products } from "@/data/landingContent";

export default function ProductsSection() {
  return (
    <section
      aria-labelledby="products-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-10">
        <SectionIntro
          eyebrow="products"
          title="Essentials for the Refined Interiors"
          titleId="products-title"
          action={<FilterTabs tabs={productFilters} />}
        />

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
