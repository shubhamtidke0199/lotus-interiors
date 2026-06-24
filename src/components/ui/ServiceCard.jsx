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
    labelAlign === "center" ? "text-center items-center" : "text-left items-start";

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
          className={`service-card-overlay absolute bottom-3 left-4 max-w-[calc(100%-2rem)] overflow-hidden px-4 py-3 sm:bottom-4 sm:px-6 sm:py-4 ${overlayClassName}`}
        >
          <div
            className={`flex flex-col font-fraunces text-lg font-normal leading-8 text-white sm:text-[22px] sm:leading-10 ${labelAlignment}`}
          >
            {lines.map((line) => (
              <span key={line} className={multiline ? "leading-10" : "leading-10"}>
                {line}
              </span>
            ))}
          </div>
        </figcaption>
      </figure>
    </article>
  );
}
