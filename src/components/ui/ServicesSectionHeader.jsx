export default function ServicesSectionHeader({ titleId }) {
  return (
    <header className="relative mb-6 overflow-hidden pt-8 sm:mb-8 sm:pt-10 lg:mb-10 lg:pt-14">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute left-1 top-6 select-none font-marcellus text-[5.5rem] leading-none text-services-watermark opacity-[0.23] sm:text-[8rem] lg:left-4 lg:text-[11rem]"
      >
        SERVICES
      </p>

      <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-xl flex-col gap-1.5">
          <p className="type-eyebrow text-services-eyebrow">DESIGN SERVICES</p>
          <h2 id={titleId} className="type-section-heading text-heading">
            Design Solutions Crafted for Every Space
          </h2>
        </div>
        <p className="max-w-sm font-fraunces text-sm font-normal leading-6 text-services-muted lg:text-right">
          Designing elegant spaces with complete solutions from planning to
          execution.
        </p>
      </div>
    </header>
  );
}
