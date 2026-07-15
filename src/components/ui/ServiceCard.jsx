export default function ServiceCard({
  title,
  image,
  imageAlt,
  imageClassName,
  overlayClassName = "",
  labelAlign = "left",
  lines,
  multiline = false,
  className = "",
}) {
  const labelAlignment =
    labelAlign === "center"
      ? "text-center items-center"
      : "text-left items-start";

  return (
    <article
      className={`group relative overflow-hidden ${className}`}
      aria-label={title}
    >
      <figure className="relative size-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 size-full object-cover ${imageClassName}`}
          loading="lazy"
        />
        <figcaption
          className={`service-card-overlay absolute bottom-2.5 left-3 max-w-[calc(100%-1.5rem)] overflow-hidden px-3 py-2.5 sm:bottom-3 sm:px-5 sm:py-3 ${overlayClassName}`}
        >
          <div
            className={`flex flex-col font-fraunces text-base font-normal leading-7 text-white sm:text-lg sm:leading-8 ${labelAlignment}`}
          >
            {lines.map((line) => (
              <span
                key={line}
                className={multiline ? "leading-8" : "leading-8"}
              >
                {line}
              </span>
            ))}
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
