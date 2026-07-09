import { portfolioGalleryIntro } from "@/data/portfolioGalleryContent";

export default function PortfolioGalleryIntro() {
  return (
    <section
      aria-labelledby="portfolio-gallery-title"
      className="px-4 pt-8 sm:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 text-center">
        <div className="flex flex-col gap-4">
          <p className="font-fraunces text-base uppercase tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
            {portfolioGalleryIntro.eyebrow}
          </p>
          <h1
            id="portfolio-gallery-title"
            className="font-fraunces text-[clamp(28px,4vw,48px)] leading-tight text-nav"
          >
            {portfolioGalleryIntro.title}
          </h1>
          <p className="mx-auto max-w-[1008px] font-fraunces text-base leading-7 text-[#504444] sm:text-lg sm:leading-10">
            {portfolioGalleryIntro.description}
          </p>
        </div>

        <figure className="relative h-[420px] overflow-hidden sm:h-[620px] lg:h-[862px]">
          <img
            src={portfolioGalleryIntro.heroImage}
            alt=""
            className="size-full rounded-[40px] object-cover sm:rounded-[60px]"
            loading="eager"
          />
        </figure>
      </div>
    </section>
  );
}
