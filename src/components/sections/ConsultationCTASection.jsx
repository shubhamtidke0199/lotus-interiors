export default function ConsultationCTASection() {
  return (
    <section
      aria-labelledby="consultation-cta-title"
      className="bg-white px-4 py-5 sm:px-8"
    >
      <div className="consultation-cta-card mx-auto max-w-[1376px] overflow-hidden rounded-xl lg:grid lg:grid-cols-[725fr_564fr]">
        <div className="flex flex-col justify-center bg-primary px-8 py-14 sm:px-12 lg:min-h-[610px] lg:px-24 lg:py-24">
          <h2
            id="consultation-cta-title"
            className="max-w-[533px] font-fraunces text-[32px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-white sm:text-[36px] lg:text-[40px] lg:leading-[70px]"
          >
            Book a Design Consultation!
          </h2>

          <p className="mt-8 max-w-[533px] font-fraunces text-base leading-7 text-white/75">
            Book a private consultation with our principal designers in Nagpur,
            Mumbai, or Pune.
          </p>

          <form className="mt-8 flex w-full max-w-[448px] flex-col gap-6">
            <label htmlFor="consultation-email" className="sr-only">
              Email address
            </label>
            <input
              id="consultation-email"
              name="email"
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="h-[54px] bg-consultation-input px-4 font-fraunces text-base uppercase leading-5 tracking-[1px] text-white placeholder:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            />
            <button
              type="submit"
              className="inline-flex h-16 w-full items-center justify-center bg-white px-10 font-fraunces text-base font-semibold uppercase leading-6 tracking-[var(--tracking-cta)] text-primary transition-opacity hover:opacity-90"
            >
              Request Consultation
            </button>
          </form>
        </div>

        <figure className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[610px]">
          <img
            src="/images/cta/studio-space.webp"
            alt="Luxury purple-toned interior living room"
            className="absolute inset-0 size-full object-cover"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
