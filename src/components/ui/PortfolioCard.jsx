import Link from "next/link";

export default function PortfolioCard({
  category,
  title,
  location,
  image,
  imageClassName,
}) {
  return (
    <article className="group flex h-full flex-col">
      <Link href="/portfolio" className="block">
        <figure className="relative aspect-[3/4] w-full overflow-hidden bg-[#f3f3f3]">
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] ${imageClassName}`}
            loading="lazy"
          />
          <div className="portfolio-card-overlay absolute -left-2 top-4 flex flex-col gap-0.5 px-3.5 py-2.5 pl-4 sm:-left-3 sm:top-5 sm:gap-1 sm:px-4 sm:py-3 sm:pl-5">
            <p className="font-fraunces text-[9px] uppercase leading-3 tracking-wide text-accent-peach sm:text-[10px] sm:leading-4">
              {category}
            </p>
            <h3 className="font-fraunces text-sm leading-5 text-white sm:text-base sm:leading-6">
              {title}
            </h3>
          </div>
        </figure>
      </Link>
      <p className="mt-3 px-1 font-fraunces text-[10px] uppercase leading-4 tracking-wide text-[#444748] sm:mt-3.5 sm:px-2 sm:text-xs">
        {location}
      </p>
    </article>
  );
}
