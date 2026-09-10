import Link from "next/link";

export default function ProductsCatalogCard({
  id,
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
      className={`group flex flex-col gap-3 pb-8 ${staggered ? "pt-6" : ""}`}
    >
      <Link href={`/products/${id}`} className="relative block bg-[#f7f3ea]">
        <figure className="relative h-72 overflow-hidden">
          <img
            src={image}
            alt={name}
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageClassName}`}
            loading="lazy"
          />
        </figure>
        {onSale && (
          <span className="absolute right-0 top-0 border border-white bg-why-choose-lavender px-3 py-1 font-fraunces text-xs uppercase tracking-[var(--tracking-cta)] text-services-eyebrow">
            25% off
          </span>
        )}
      </Link>

      <div className="flex items-center gap-2">
        <span className="font-fraunces text-sm leading-6 text-nav line-through sm:text-base">
          {originalPrice}
        </span>
        <span className="font-fraunces text-lg leading-6 text-services-eyebrow">
          {salePrice}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-fraunces text-lg leading-6 text-nav">
          <Link href={`/products/${id}`} className="hover:text-primary">
            {name}
          </Link>
        </h3>
        <p className="font-fraunces text-sm leading-5 text-nav">{description}</p>
      </div>

      <Link
        href={`/contact?interest=${encodeURIComponent(name)}&product=${encodeURIComponent(id)}`}
        className="mt-1 flex h-11 w-full items-center justify-center border border-[rgba(206,198,183,0.2)] bg-primary font-fraunces text-xs uppercase tracking-[1.2px] text-white transition-colors hover:bg-primary/90"
      >
        Enquire Now
      </Link>
    </article>
  );
}
