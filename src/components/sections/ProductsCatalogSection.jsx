"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductsCatalogCard from "@/components/ui/ProductsCatalogCard";
import ProductsFilterSidebar from "@/components/ui/ProductsFilterSidebar";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import { catalogProducts } from "@/data/productsPageContent";

export default function ProductsCatalogSection() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const [sort, setSort] = useState("latest");
  const [activeBrands, setActiveBrands] = useState([]);

  const filteredProducts = useMemo(() => {
    const query = queryFromUrl.trim().toLowerCase();

    let next = catalogProducts.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      const matchesBrand =
        activeBrands.length === 0 ||
        activeBrands.includes(product.category);

      return matchesQuery && matchesBrand;
    });

    if (sort === "price-asc") {
      next = [...next].sort(
        (a, b) =>
          Number(a.salePrice.replace(/[^0-9.]/g, "")) -
          Number(b.salePrice.replace(/[^0-9.]/g, "")),
      );
    } else if (sort === "price-desc") {
      next = [...next].sort(
        (a, b) =>
          Number(b.salePrice.replace(/[^0-9.]/g, "")) -
          Number(a.salePrice.replace(/[^0-9.]/g, "")),
      );
    }

    return next;
  }, [queryFromUrl, sort, activeBrands]);

  return (
    <section
      aria-labelledby="products-catalog-title"
      className="border-t border-product-bg px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-10">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-3xl flex-col gap-2">
            <p className="type-eyebrow text-eyebrow">Our Products</p>
            <h2
              id="products-catalog-title"
              className="type-section-heading text-nav"
            >
              Curated &amp; Customized Furniture
              <br />
              for Every Space
            </h2>
          </div>
          <p className="max-w-sm font-fraunces text-sm leading-6 text-services-muted sm:text-base lg:text-right">
            Elevating functional living through architectural precision and
            artisanal craftsmanship. Discover pieces tailored to your aesthetic
            narrative.
          </p>
        </header>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductsFilterSidebar
              activeBrands={activeBrands}
              onBrandChange={setActiveBrands}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-8 lg:gap-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <ProductSearchBar
                key={queryFromUrl}
                className="w-full max-w-sm !bg-product-bg"
                placeholder="Search our collection..."
                defaultValue={queryFromUrl}
              />

              <div className="flex flex-wrap items-center gap-4">
                <p className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                  Showing {filteredProducts.length} Designs
                </p>
                <span
                  className="hidden h-4 w-px bg-[rgba(206,198,183,0.3)] sm:block"
                  aria-hidden="true"
                />
                <label className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                  <span className="sr-only">Sort products</span>
                  <select
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                    className="cursor-pointer appearance-none bg-transparent pr-6 uppercase tracking-[1.2px] focus-visible:outline-none"
                  >
                    <option value="latest">Latest Arrivals</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </label>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductsCatalogCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <p className="font-fraunces text-sm text-muted">
                No products match your search. Try another keyword or clear
                filters.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
