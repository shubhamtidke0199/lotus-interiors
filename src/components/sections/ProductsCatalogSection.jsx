import ProductsCatalogCard from "@/components/ui/ProductsCatalogCard";
import ProductsFilterSidebar from "@/components/ui/ProductsFilterSidebar";
import ProductSearchBar from "@/components/ui/ProductSearchBar";
import { catalogProducts } from "@/data/productsPageContent";

export default function ProductsCatalogSection() {
  return (
    <section
      aria-labelledby="products-catalog-title"
      className="border-t border-product-bg px-4 pb-6 pt-12 sm:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <div className="flex max-w-[900px] flex-col gap-2">
            <p className="font-fraunces text-base uppercase tracking-[var(--tracking-eyebrow)] text-eyebrow">
              Our Products
            </p>
            <h2
              id="products-catalog-title"
              className="font-fraunces text-[28px] leading-10 tracking-[var(--tracking-heading)] text-nav sm:text-[32px] lg:text-[36px]"
            >
              Curated &amp; Customized Furniture
              <br />
              for Every Space
            </h2>
          </div>
          <p className="max-w-[395px] font-fraunces text-base leading-6 text-services-muted lg:text-right">
            Elevating functional living through architectural precision and
            artisanal craftsmanship. Discover pieces tailored to your aesthetic
            narrative.
          </p>
        </header>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-12">
          <ProductsFilterSidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <ProductSearchBar
                className="w-full max-w-[380px] bg-product-bg!"
                placeholder="Search our collection..."
              />

              <div className="flex items-center gap-4">
                <p className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                  Showing {catalogProducts.length} Designs
                </p>
                <span
                  className="h-4 w-px bg-[rgba(206,198,183,0.3)]"
                  aria-hidden="true"
                />
                <label className="font-fraunces text-xs uppercase tracking-[1.2px] text-nav">
                  <span className="sr-only">Sort products</span>
                  <select className="cursor-pointer appearance-none bg-transparent pr-6 uppercase tracking-[1.2px]">
                    <option>Latest Arrivals</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
              {catalogProducts.map((product) => (
                <ProductsCatalogCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
