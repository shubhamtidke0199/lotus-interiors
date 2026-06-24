export default function PortfolioCard({
  category,
  title,
  location,
  image,
  imageClassName,
  tall = false,
}) {
  return (
    <article className="flex flex-col gap-6">
      <figure
        className={`relative overflow-hidden bg-[#f3f3f3] ${
          tall ? "h-[620px]" : "aspect-[3/4]"
        }`}
      >
        <img src={image} alt={title} className={imageClassName} loading="lazy" />
        <div className="absolute left-0 top-8 border-l-2 border-primary bg-primary/65 px-6 py-4">
          <p className="font-fraunces text-[10.4px] uppercase leading-4 tracking-[1.04px] text-accent-peach">
            {category}
          </p>
          <h3 className="font-fraunces text-lg leading-7 text-white">{title}</h3>
        </div>
      </figure>
      <p className="px-2 font-fraunces text-xs uppercase leading-4 tracking-[1.2px] text-[#444748]">
        {location}
      </p>
    </article>
  );
}
