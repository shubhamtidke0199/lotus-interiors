import { portfolioGalleryIntro } from "@/data/portfolioGalleryContent";

export default function PortfolioGalleryIntro() {
  return (
    <section
      aria-labelledby="portfolio-gallery-title"
      className="px-4 pt-8 sm:px-6 lg:px-8"
    >
      <div className="container-site flex flex-col gap-6 text-center">
        <div className="flex flex-col gap-4">
          <p className="type-eyebrow text-services-eyebrow">
            {portfolioGalleryIntro.eyebrow}
          </p>
          <h1
            id="portfolio-gallery-title"
            className="type-display-heading text-nav"
          >
            {portfolioGalleryIntro.title}
          </h1>
          <p className="mx-auto max-w-3xl font-fraunces text-sm leading-6 text-[#504444] sm:text-base sm:leading-7">
            {portfolioGalleryIntro.description}
          </p>
        </div>

        <figure className="relative h-[20rem] overflow-hidden sm:h-[28rem] lg:h-[36rem]">
          <img
            src={portfolioGalleryIntro.heroImage}
            alt=""
            className="size-full rounded-3xl object-cover sm:rounded-[2.5rem]"
            loading="eager"
          />
        </figure>
      </div>
    </section>
  );
}
