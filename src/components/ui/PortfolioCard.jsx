export default function PortfolioCard({
  category,
  title,
  location,
  image,
  imageClassName,
  tall = false,
}) {
  return (
    <article className="flex w-full flex-col">
      <figure
        className={`relative mt-6 overflow-hidden bg-[#f3f3f3] ${
          tall ? "h-[480px] sm:h-[620px]" : "h-[400px] sm:h-[517px]"
        }`}
      >
        <img src={image} alt={title} className={imageClassName} loading="lazy" />
        <div className="portfolio-card-overlay absolute -left-4 top-8 flex flex-col gap-1 px-6 pb-4 pl-[26px] pt-[15px]">
          <p className="font-fraunces text-[10.4px] uppercase leading-[15.6px] tracking-[1.04px] text-accent-peach">
            {category}
          </p>
          <h3 className="font-fraunces text-lg leading-7 text-white">{title}</h3>
        </div>
      </figure>
      <p className="mt-6 px-2 font-fraunces text-xs uppercase leading-4 tracking-[1.2px] text-[#444748]">
        {location}
      </p>
    </article>
  );
}
