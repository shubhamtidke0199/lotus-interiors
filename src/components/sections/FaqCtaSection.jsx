import Link from "next/link";
import { faqCta } from "@/data/faqPageContent";

export default function FaqCtaSection() {
  return (
    <section
      aria-labelledby="faq-cta-title"
      className="px-4 pb-24 sm:px-8"
    >
      <div className="mx-auto flex max-w-[1376px] flex-col gap-8 bg-primary px-8 py-16 sm:px-12 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-[575px]">
          <h2
            id="faq-cta-title"
            className="font-fraunces text-[28px] leading-10 text-[#ffdeac] sm:text-[32px] lg:text-[36px]"
          >
            {faqCta.title}
          </h2>
          <p className="mt-4 font-fraunces text-base leading-7 text-white">
            {faqCta.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex min-h-[50px] items-center justify-center bg-white px-8 py-4 font-fraunces text-xs uppercase tracking-[1.2px] text-primary transition-opacity hover:opacity-90"
          >
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[50px] items-center justify-center border border-white px-8 py-4 font-fraunces text-xs uppercase tracking-[1.2px] text-white transition-colors hover:bg-white/10"
          >
            Schedule a Call
          </Link>
        </div>
      </div>
    </section>
  );
}
