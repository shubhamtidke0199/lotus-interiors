export default function PortfolioGalleryCard({
  city,
  name,
  image,
  imageClassName,
  backgroundImage,
  labelOnly = false,
}) {
  return (
    <article className="relative h-[400px] overflow-hidden">
      {labelOnly ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      ) : (
        <div className="absolute inset-0">
          <img
            src={image}
            alt={`${name}, ${city}`}
            className={imageClassName}
            loading="lazy"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 text-white">
        <p className="font-fraunces text-[10px] uppercase leading-[15px] tracking-[1px] text-white/80">
          {city}
        </p>
        <h3 className="font-fraunces text-lg font-bold uppercase leading-7">
          {name}
        </h3>
      </div>
    </article>
  );
}
