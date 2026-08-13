import Link from "next/link";

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
  href,
}) {
  const labelAlignment =
    labelAlign === "center"
      ? "text-center items-center"
      : "text-left items-start";

  const content = (
    <>
      <figure className="relative size-full overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imageClassName}`}
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
    </>
  );

  const sharedClass = `group relative overflow-hidden ${className}`;

  if (href) {
    return (
      <Link href={href} className={sharedClass} aria-label={title}>
        {content}
      </Link>
    );
  }

  return (
    <article className={sharedClass} aria-label={title}>
      {content}
    </article>
  );
}
