export default function ServicesSectionHeader({ titleId }) {
  return (
    <header className="relative mb-10 pt-12 lg:mb-[52px] lg:pt-20">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-1 top-8 select-none font-marcellus text-[120px] leading-none text-services-watermark opacity-[0.23] sm:text-[180px] lg:left-5 lg:text-[250px]"
      >
        SERVICES
      </p>

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-[645px] flex-col gap-2">
          <p className="font-fraunces text-base font-normal uppercase leading-6 tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
            DESIGN SERVICES
          </p>
          <h2
            id={titleId}
            className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:text-[36px]"
          >
            Design Solutions Crafted for Every Space
          </h2>
        </div>
        <p className="max-w-[395px] font-fraunces text-base font-normal leading-6 text-services-muted lg:text-right">
          Designing elegant spaces with complete solutions from planning to
          execution.
        </p>
      </div>
    </header>
  );
}
