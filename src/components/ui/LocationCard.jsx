export default function LocationCard({
  city,
  stores,
  image,
  imageClassName,
  overlayClassName = "",
}) {
  return (
    <article className="relative h-80 w-[17.5rem] shrink-0 overflow-hidden sm:h-[26rem] sm:w-[22rem]">
      <img
        src={image}
        alt={`${city} store location`}
        className={imageClassName}
        loading="lazy"
      />
      <div
        className={`location-card-overlay absolute inset-x-0 bottom-0 flex min-h-14 flex-col items-center justify-center px-5 py-3 text-center sm:min-h-16 ${overlayClassName}`}
      >
        <p className="font-helvetica text-base font-normal leading-6 text-white sm:text-lg">
          {city}
        </p>
        <p className="font-helvetica text-xs leading-5 text-white">
          {stores}
        </p>
      </div>
    </article>
  );
}
