export default function ProductSustainabilitySection({
  stat,
  title,
  description,
  inSituLabel,
  inSituImage,
}) {
  return (
    <section
      aria-labelledby="sustainability-title"
      className="px-4 pb-24 sm:px-8"
    >
      <div className="mx-auto grid max-w-[1376px] gap-8 lg:grid-cols-[437px_minmax(0,1fr)]">
        <article className="flex min-h-[500px] flex-col items-center justify-center gap-3 bg-accent-cream px-8 py-16 text-center lg:min-h-[800px] lg:px-12">
          <p
            id="sustainability-title"
            className="font-fraunces text-[60px] leading-none text-services-eyebrow"
          >
            {stat}
          </p>
          <h2 className="font-fraunces text-xl font-bold uppercase leading-7 text-primary">
            {title}
          </h2>
          <p className="max-w-[320px] font-fraunces text-sm leading-5 text-[#504444]">
            {description}
          </p>
        </article>

        <figure className="relative min-h-[500px] overflow-hidden bg-cover bg-center lg:min-h-[800px]">
          <img
            src={inSituImage}
            alt="Product shown in situ"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[rgba(124,80,80,0.2)] px-8 py-10">
            <span className="inline-flex bg-[#fcf8f7] px-6 py-2 font-fraunces text-xs font-semibold uppercase tracking-[1.2px] text-nav">
              {inSituLabel}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
