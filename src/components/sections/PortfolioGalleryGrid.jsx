import PortfolioGalleryCard from "@/components/ui/PortfolioGalleryCard";
import { portfolioGalleryRows } from "@/data/portfolioGalleryContent";

export default function PortfolioGalleryGrid() {
  return (
    <section aria-label="Gallery locations" className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
      <div className="container-site -mt-16 flex flex-col gap-8 sm:-mt-24 lg:-mt-32 lg:gap-10">
        {portfolioGalleryRows.map((row, rowIndex) => (
          <div
            key={`gallery-row-${rowIndex}`}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {row.map((item) => (
              <PortfolioGalleryCard key={item.id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
