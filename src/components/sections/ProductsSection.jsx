"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import FilterTabs from "@/components/ui/FilterTabs";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";
import { productFilters, products } from "@/data/landingContent";

export default function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFilter = productFilters[activeIndex];

  const filteredProducts = useMemo(() => {
    if (activeFilter === "ALL") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="products"
      aria-labelledby="products-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-10">
        <Reveal>
          <SectionIntro
            eyebrow="products"
            title="Essentials for the Refined Interiors"
            titleId="products-title"
            action={
              <FilterTabs
                tabs={productFilters}
                activeIndex={activeIndex}
                onChange={setActiveIndex}
              />
            }
          />
        </Reveal>

        <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} delay={index * 60}>
              <ProductCard {...product} />
            </Reveal>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="font-fraunces text-sm text-muted">
            No pieces in this category yet.{" "}
            <Link
              href="/products"
              className="text-primary underline-offset-2 hover:underline"
            >
              Browse the full catalog
            </Link>
            .
          </p>
        )}
      </div>
    </section>
  );
}
