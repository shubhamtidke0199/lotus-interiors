export default function ProductCard({ name, material, price, image, imageClassName }) {
  return (
    <article className="flex flex-col">
      <figure className="relative mb-6 h-[350px] overflow-hidden bg-product-bg">
        <img src={image} alt={name} className={imageClassName} loading="lazy" />
      </figure>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="font-fraunces text-lg font-bold leading-7 text-nav">
            {name}
          </h3>
          <p className="font-fraunces text-xs uppercase leading-4 tracking-[1.2px] text-muted">
            {material}
          </p>
        </div>
        <p className="shrink-0 font-fraunces text-xl leading-7 text-services-eyebrow">
          {price}
        </p>
      </div>
    </article>
  );
}
