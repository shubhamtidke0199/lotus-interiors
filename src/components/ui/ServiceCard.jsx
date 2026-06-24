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
      className={`group relative h-full overflow-hidden bg-accent-lavender/30 ${className}`}
      aria-label={title}
    >
      <figure className="relative size-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className={imageClassName}
          loading="lazy"
        />
        <figcaption
          className={`service-card-overlay absolute bottom-4 backdrop-blur-[27px] px-6 py-4 ${overlayClassName}`}
        >
          <div
            className={`flex flex-col font-fraunces text-[22px] font-normal leading-10 text-white ${labelAlignment}`}
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
