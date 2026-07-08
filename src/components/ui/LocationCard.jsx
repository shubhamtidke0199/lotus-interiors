export default function LocationCard({
  city,
  stores,
  image,
  imageClassName,
  overlayClassName = "",
}) {
  return (
    <article className="relative h-[360px] w-[300px] shrink-0 overflow-hidden sm:h-[460px] sm:w-[382px]">
      <img
        src={image}
        alt={`${city} store location`}
        className={imageClassName}
        loading="lazy"
      />
      <div
        className={`location-card-overlay absolute inset-x-0 bottom-0 flex min-h-[58px] flex-col items-center justify-center px-6 py-3 text-center sm:min-h-[66px] sm:py-0 ${overlayClassName}`}
      >
        <p className="font-helvetica text-lg font-normal leading-7 text-white sm:text-[22px]">
          {city}
        </p>
        <p className="font-helvetica text-xs leading-5 text-white sm:text-sm">
          {stores}
        </p>
      </div>
    </article>
  );
}
