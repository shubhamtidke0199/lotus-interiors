import PortfolioGalleryCard from "@/components/ui/PortfolioGalleryCard";
import { portfolioGalleryRows } from "@/data/portfolioGalleryContent";

export default function PortfolioGalleryGrid() {
  return (
    <section aria-label="Gallery locations" className="px-4 pb-24 sm:px-8">
      <div className="mx-auto -mt-24 flex max-w-[1440px] flex-col gap-10 sm:-mt-32 lg:-mt-[152px] lg:gap-16">
        {portfolioGalleryRows.map((row, rowIndex) => (
          <div
            key={`gallery-row-${rowIndex}`}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
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
