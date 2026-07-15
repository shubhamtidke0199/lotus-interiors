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
      className={`flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between ${className}`}
    >
      <div className="flex max-w-2xl flex-col gap-1.5">
        <p className={`type-eyebrow ${eyebrowClassName}`}>{eyebrow}</p>
        <h2 id={titleId} className="type-section-heading text-heading">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-sm font-fraunces text-sm font-normal leading-6 text-services-muted lg:text-right">
          {description}
        </p>
      )}
      {action}
    </header>
  );
}
