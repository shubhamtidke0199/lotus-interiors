export default function ProductCard({
  name,
  material,
  price,
  image,
  imageClassName,
}) {
  return (
    <article className="flex flex-col">
      <figure className="relative mb-4 h-72 overflow-hidden bg-product-bg">
        <img src={image} alt={name} className={imageClassName} loading="lazy" />
      </figure>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="font-fraunces text-base font-bold leading-6 text-nav">
            {name}
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
