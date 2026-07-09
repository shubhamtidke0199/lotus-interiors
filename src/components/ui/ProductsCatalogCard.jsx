export default function ProductsCatalogCard({
  name,
  description,
  originalPrice,
  salePrice,
  image,
  imageClassName,
  onSale = false,
  staggered = false,
}) {
  return (
    <article
      className={`flex flex-col gap-3 pb-12 ${staggered ? "pt-8" : ""}`}
    >
      <div className="relative bg-[#f7f3ea]">
        <figure className="relative h-[340px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className={imageClassName}
            loading="lazy"
          />
        </figure>
        {onSale && (
          <span className="absolute right-0 top-0 border border-white bg-why-choose-lavender px-3 py-1 font-fraunces text-xs uppercase tracking-[var(--tracking-cta)] text-services-eyebrow">
            25% off
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="font-fraunces text-base leading-7 text-nav line-through">
          {originalPrice}
        </span>
        <span className="font-fraunces text-xl leading-7 text-services-eyebrow">
          {salePrice}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-fraunces text-xl leading-7 text-nav">{name}</h3>
        <p className="font-fraunces text-sm leading-[23px] text-nav">
          {description}
        </p>
      </div>

      <button
        type="button"
        className="mt-1 w-full border border-[rgba(206,198,183,0.2)] bg-primary py-4 font-fraunces text-xs uppercase tracking-[1.2px] text-white transition-colors hover:bg-primary/90"
      >
        Add to Cart
      </button>
    </article>
  );
}
