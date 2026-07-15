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
      className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-8">
        <article className="flex min-h-[24rem] flex-col items-center justify-center gap-3 bg-accent-cream px-6 py-12 text-center lg:min-h-[40rem] lg:px-10">
          <p
            id="sustainability-title"
            className="font-fraunces text-5xl leading-none text-services-eyebrow"
          >
            {stat}
          </p>
          <h2 className="font-fraunces text-lg font-bold uppercase leading-6 text-primary">
            {title}
          </h2>
          <p className="max-w-xs font-fraunces text-sm leading-5 text-[#504444]">
            {description}
          </p>
        </article>

        <figure className="relative min-h-[24rem] overflow-hidden bg-cover bg-center lg:min-h-[40rem]">
          <img
            src={inSituImage}
            alt="Product shown in situ"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-[rgba(124,80,80,0.2)] px-6 py-8">
            <span className="inline-flex bg-[#fcf8f7] px-5 py-2 font-fraunces text-xs font-semibold uppercase tracking-[1.2px] text-nav">
              {inSituLabel}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
