import { materialMasteryCards } from "@/data/productDetailContent";

export default function ProductMaterialMasterySection() {
  return (
    <section
      aria-labelledby="material-mastery-title"
      className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-12">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-xl flex-col gap-1.5">
            <p className="type-eyebrow text-eyebrow">Material Mastery</p>
            <h2
              id="material-mastery-title"
              className="type-section-heading text-nav"
            >
              Master of Form &amp; Material
            </h2>
          </div>
          <p className="max-w-sm font-fraunces text-sm leading-6 text-services-muted sm:text-base lg:text-right">
            We use the finest materials to ensure lasting strength and timeless
            quality.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          {materialMasteryCards.map((card) => (
            <article
              key={card.number}
              className="flex flex-col gap-6 rounded bg-white p-6 shadow-[0_12px_40px_rgba(83,70,108,0.08)] lg:-mt-10 first:lg:mt-0"
            >
              <div className="flex flex-col gap-4">
                <p className="font-fraunces text-4xl leading-none text-services-eyebrow">
                  {card.number}
                </p>
                <h3 className="font-fraunces text-lg font-semibold leading-6 text-nav">
                  {card.title}
                </h3>
                <p className="font-fraunces text-sm leading-5 text-nav">
                  {card.description}
                </p>
              </div>
              <img
                src={card.image}
                alt=""
                className="h-auto w-full rounded-md object-cover"
                loading="lazy"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
