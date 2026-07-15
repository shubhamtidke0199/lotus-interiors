export default function ConsultationCTASection() {
  return (
    <section
      aria-labelledby="consultation-cta-title"
      className="bg-white  py-4 md:px-6 lg:px-8"
    >
      <div className="consultation-cta-card container-site overflow-hidden md:rounded-xl lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center bg-primary px-6 py-12 sm:px-10 lg:min-h-[28rem] lg:px-16 lg:py-16">
          <h2
            id="consultation-cta-title"
            className="type-display-heading max-w-md font-semibold text-white"
          >
            Book a Design Consultation!
          </h2>

          <p className="mt-6 max-w-md font-fraunces text-sm leading-6 text-white/75 sm:text-base">
            Book a private consultation with our principal designers in Nagpur,
            Mumbai, or Pune.
          </p>

          <form className="mt-6 flex w-full max-w-sm flex-col gap-5">
            <label htmlFor="consultation-email" className="sr-only">
              Email address
            </label>
            <input
              id="consultation-email"
              name="email"
              type="email"
              placeholder="YOUR EMAIL ADDRESS"
              className="h-12 bg-consultation-input px-4 font-fraunces text-sm uppercase leading-5 tracking-wide text-white placeholder:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            />
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center bg-white px-8 font-fraunces text-sm font-semibold uppercase leading-5 tracking-[var(--tracking-cta)] text-primary transition-opacity hover:opacity-90"
            >
              Request Consultation
            </button>
          </form>
        </div>

        <figure className="relative min-h-72 sm:min-h-80 lg:min-h-[28rem]">
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
