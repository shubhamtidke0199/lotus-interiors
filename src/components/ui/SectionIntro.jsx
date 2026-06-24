export default function SectionIntro({
  eyebrow,
  title,
  titleId,
  description,
  action,
  eyebrowClassName = "text-services-eyebrow",
  className = "",
}) {
  return (
    <header
      className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div className="flex max-w-[722px] flex-col gap-2">
        <p
          className={`font-fraunces text-base font-normal uppercase leading-6 tracking-[var(--tracking-eyebrow)] ${eyebrowClassName}`}
        >
          {eyebrow}
        </p>
        <h2
          id={titleId}
          className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-heading sm:text-[32px] lg:text-[36px]"
        >
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-[395px] font-fraunces text-base font-normal leading-6 text-services-muted lg:text-right">
          {description}
        </p>
      )}
      {action}
    </header>
  );
}
