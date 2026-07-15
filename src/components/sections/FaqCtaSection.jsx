import Link from "next/link";
import { faqCta } from "@/data/faqPageContent";

export default function FaqCtaSection() {
  return (
    <section
      aria-labelledby="faq-cta-title"
      className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container-site flex flex-col gap-6 bg-primary px-6 py-12 sm:px-8 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-xl">
          <h2
            id="faq-cta-title"
            className="type-section-heading text-[#ffdeac]"
          >
            {faqCta.title}
          </h2>
          <p className="mt-3 font-fraunces text-sm leading-6 text-white sm:mt-4 sm:text-base">
            {faqCta.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center bg-white px-6 font-fraunces text-xs uppercase tracking-[1.2px] text-primary transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center border border-white px-6 font-fraunces text-xs uppercase tracking-[1.2px] text-white transition-colors hover:bg-white/10"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
