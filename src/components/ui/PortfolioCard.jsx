import Link from "next/link";

export default function PortfolioCard({
  category,
  title,
  location,
  image,
  imageClassName,
  tall = false,
}) {
  return (
    <article className="group flex w-full flex-col">
      <Link href="/portfolio" className="block">
        <figure
          className={`relative mt-5 overflow-hidden bg-[#f3f3f3] ${
            tall ? "h-[26rem] sm:h-[32rem]" : "h-80 sm:h-[26rem]"
          }`}
        >
          <img
            src={image}
            alt={title}
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageClassName}`}
            loading="lazy"
          />
          <div className="portfolio-card-overlay absolute -left-3 top-6 flex flex-col gap-1 px-5 py-3 pl-6">
            <p className="font-fraunces text-[10px] uppercase leading-4 tracking-wide text-accent-peach">
              {category}
            </p>
            <h3 className="font-fraunces text-base leading-6 text-white">
              {title}
            </h3>
          </div>
        </figure>
      </Link>
      <p className="mt-4 px-2 font-fraunces text-xs uppercase leading-4 tracking-wide text-[#444748]">
        {location}
      </p>
    </article>
  );
}
