import {
  faqIntro,
  faqQuote,
  primaryFaqItems,
  secondaryFaqItems,
} from "@/data/faqPageContent";
import { FaqAccordionList } from "@/components/ui/FaqAccordionItem";

export default function FaqPageSection() {
  return (
    <section
      aria-labelledby="faq-page-title"
      className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-10">
        <header className="flex flex-col gap-4 text-center">
          <p className="type-eyebrow text-services-eyebrow">{faqIntro.eyebrow}</p>
          <h1 id="faq-page-title" className="type-display-heading text-nav">
            {faqIntro.title}
          </h1>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-10">
          <aside className="flex flex-col gap-5">
            <figure className="relative h-64 overflow-hidden sm:h-80">
              <img
                src={faqQuote.image}
                alt=""
                className="absolute inset-0 size-full object-cover object-top"
                loading="eager"
              />
            </figure>
            <blockquote className="flex flex-col gap-3">
              <p className="font-fraunces text-sm italic leading-7 text-services-eyebrow sm:text-base sm:leading-8">
                {faqQuote.text}
              </p>
              <cite className="font-fraunces text-[10px] not-italic uppercase tracking-[1px] text-nav">
                {faqQuote.attribution}
              </cite>
            </blockquote>
          </aside>

          <FaqAccordionList items={primaryFaqItems} idPrefix="primary" />
        </div>

        <FaqAccordionList items={secondaryFaqItems} idPrefix="secondary" />
      </div>
    </section>
  );
}
