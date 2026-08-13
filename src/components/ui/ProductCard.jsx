import Link from "next/link";

export default function ProductCard({
  id,
  name,
  material,
  price,
  image,
  imageClassName,
  href,
}) {
  const productHref = href ?? `/products/${id}`;

  return (
    <article className="group flex flex-col">
      <Link
        href={productHref}
        className="relative mb-4 block h-72 overflow-hidden bg-product-bg"
      >
        <figure className="relative size-full">
          <img
            src={image}
            alt={name}
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageClassName}`}
            loading="lazy"
          />
        </figure>
      </Link>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="font-fraunces text-base font-bold leading-6 text-nav">
            <Link href={productHref} className="transition-colors hover:text-primary">
              {name}
            </Link>
          </h3>
          <p className="font-fraunces text-xs uppercase leading-4 tracking-wide text-muted">
            {material}
          </p>
        </div>
        <p className="shrink-0 font-fraunces text-lg leading-6 text-services-eyebrow">
          {price}
        </p>
      </div>
    </article>
  );
}
