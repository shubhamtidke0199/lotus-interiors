import { materialMasteryCards } from "@/data/productDetailContent";

export default function ProductMaterialMasterySection() {
  return (
    <section
      aria-labelledby="material-mastery-title"
      className="bg-white px-4 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto flex max-w-[1376px] flex-col gap-16">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-[645px] flex-col gap-1.5">
            <p className="font-fraunces text-base uppercase tracking-[var(--tracking-eyebrow)] text-eyebrow">
              Material Mastery
            </p>
            <h2
              id="material-mastery-title"
              className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-nav sm:text-[32px] lg:text-[36px]"
            >
              Master of Form &amp; Material
            </h2>
          </div>
          <p className="max-w-[395px] font-fraunces text-base leading-6 text-services-muted lg:text-right">
            We use the finest materials to ensure lasting strength and timeless
            quality.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          {materialMasteryCards.map((card) => (
            <article
              key={card.number}
              className="flex flex-col gap-8 rounded bg-white p-8 shadow-[0_12px_40px_rgba(83,70,108,0.08)] lg:-mt-12 first:lg:mt-0"
            >
              <div className="flex flex-col gap-4">
                <p className="font-fraunces text-[48px] leading-none text-services-eyebrow">
                  {card.number}
                </p>
                <h3 className="font-fraunces text-xl font-semibold leading-7 text-nav">
                  {card.title}
                </h3>
                <p className="font-fraunces text-sm leading-[23px] text-nav">
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
