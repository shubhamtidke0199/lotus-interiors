import ProcessStepNumberBadge from "@/components/ui/ProcessStepNumberBadge";

const descriptionFonts = {
  fraunces: "font-fraunces",
  helvetica: "font-helvetica",
};

export default function ProcessStepCard({
  step,
  title,
  description,
  image,
  imageAlt,
  imageClassName,
  descriptionFont = "fraunces",
  isLast = false,
  connectorSrc = "/images/design-process/connector.svg",
  connectorWidthClass = "w-56",
}) {
  return (
    <article className="relative mx-auto w-full md:max-w-[18rem] xl:mx-0">
      <figure className="relative h-72 w-full overflow-hidden bg-accent-lavender ">
        <img
          src={image}
          alt={imageAlt}
          className={imageClassName}
          loading="lazy"
        />
      </figure>

      <div className="relative -mt-8 flex gap-2.5">
        <ProcessStepNumberBadge step={step} />
        <div className="flex min-w-0 max-w-[13rem] flex-col justify-center pt-7">
          <h3 className="font-fraunces text-sm font-normal leading-5 text-primary">
            {title}
          </h3>
          <p
            className={`mt-2 text-xs font-normal leading-5 text-muted ${descriptionFonts[descriptionFont]}`}
          >
            {description}
          </p>
        </div>
      </div>

      {!isLast && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-16 top-[24.5rem] hidden h-px xl:block ${connectorWidthClass}`}
        >
          <img
            src={connectorSrc}
            alt=""
            className="block h-px w-full max-w-none"
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}
