import ArrowIcon from "@/components/icons/ArrowIcon";

export default function ConsultationCTASection() {
  return (
    <section
      aria-labelledby="consultation-cta-title"
      className="bg-white px-4 py-5 sm:px-6 lg:px-8 lg:py-5"
    >
      <div className="mx-auto grid max-w-[1440px] overflow-hidden lg:grid-cols-[725px_564px] lg:gap-6">
        <div className="flex flex-col justify-center bg-accent-lavender/20 px-8 py-16 sm:px-16 lg:min-h-[610px] lg:px-24">
          <h2
            id="consultation-cta-title"
            className="max-w-[533px] font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:text-[36px] lg:leading-[70px]"
          >
            Book a Design Consultation!
          </h2>

          <p className="mt-8 max-w-[533px] font-fraunces text-base leading-7 text-muted">
            Book a private consultation with our principal designers in Nagpur,
            Mumbai, or Pune.
          </p>

          <form className="mt-8 flex max-w-[448px] flex-col gap-6">
            <label htmlFor="consultation-email" className="sr-only">
              Email address
            </label>
            <input
              id="consultation-email"
              name="email"
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="h-[54px] border border-[#d9d9d9] bg-white px-4 font-helvetica text-base uppercase leading-5 tracking-[1px] text-nav placeholder:text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
            <button
              type="submit"
              className="inline-flex h-16 items-center justify-center gap-4 bg-primary px-10 font-helvetica text-base uppercase leading-6 tracking-[var(--tracking-cta)] text-white transition-colors hover:bg-primary/90"
            >
              Request Consultation
              <ArrowIcon className="text-white" />
            </button>
          </form>
        </div>

        <figure className="relative min-h-[360px] lg:min-h-[610px]">
          <img
            src="/images/cta/studio-space.webp"
            alt="Lotus Design Studio interior space"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
