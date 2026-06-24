export default function LocationCard({ city, stores, image, imageClassName }) {
  return (
    <article className="relative h-[280px] overflow-hidden bg-accent-lavender/20 sm:h-[460px]">
      <img src={image} alt={`${city} store location`} className={imageClassName} loading="lazy" />
      <div className="service-card-overlay absolute bottom-4 left-4 right-4 backdrop-blur-[27px] px-6 py-4 text-center">
        <p className="font-helvetica text-[22px] leading-7 text-white">{city}</p>
        <p className="font-helvetica text-sm leading-5 text-white">{stores}</p>
      </div>
    </article>
  );
}
