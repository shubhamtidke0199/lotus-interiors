import {
  faqIntro,
  faqQuote,
  primaryFaqItems,
  secondaryFaqItems,
} from "@/data/faqPageContent";
import { FaqAccordionList } from "@/components/ui/FaqAccordionItem";

export default function FaqPageSection() {
  return (
    <section aria-labelledby="faq-page-title" className="px-4 py-10 sm:px-8 lg:py-16">
      <div className="mx-auto flex max-w-[1376px] flex-col gap-12">
        <header className="flex flex-col gap-4 text-center">
          <p className="font-fraunces text-base uppercase tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
            {faqIntro.eyebrow}
          </p>
          <h1
            id="faq-page-title"
            className="font-fraunces text-[clamp(28px,4vw,48px)] leading-tight text-nav"
          >
            {faqIntro.title}
          </h1>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,459px)_minmax(0,1fr)] lg:gap-16">
          <aside className="flex flex-col gap-6">
            <figure className="relative h-[360px] overflow-hidden sm:h-[484px]">
              <img
                src={faqQuote.image}
                alt=""
                className="absolute inset-0 size-full object-cover object-top"
                loading="eager"
              />
            </figure>
            <blockquote className="flex flex-col gap-4">
              <p className="font-fraunces text-base italic leading-7 text-services-eyebrow sm:text-lg sm:leading-10">
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
