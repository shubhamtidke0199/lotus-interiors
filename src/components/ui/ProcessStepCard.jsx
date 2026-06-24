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
  connectorWidthClass = "w-[268px]",
}) {
  return (
    <article className="relative mx-auto w-full max-w-[310px] xl:mx-0">
      <figure className="relative h-[326px] w-full overflow-hidden bg-accent-lavender">
        <img src={image} alt={imageAlt} className={imageClassName} loading="lazy" />
      </figure>

      <div className="relative -mt-[41px] flex gap-3">
        <ProcessStepNumberBadge step={step} />
        <div className="flex min-w-0 max-w-[216px] flex-col justify-center pt-[38px]">
          <h3 className="font-fraunces text-base font-normal leading-6 text-primary">
            {title}
          </h3>
          <p
            className={`mt-3 text-xs font-normal leading-5 text-muted ${descriptionFonts[descriptionFont]}`}
          >
            {description}
          </p>
        </div>
      </div>

      {!isLast && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-[82px] top-[439px] hidden h-px xl:block ${connectorWidthClass}`}
        >
          <img
            src={connectorSrc}
            alt=""
            className="block h-auto w-full max-w-none"
            loading="lazy"
          />
        </div>
      )}
    </article>
  );
}
