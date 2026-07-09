function BlogDetailImage({ src, alt = "" }) {
  return (
    <figure className="relative mx-auto mt-3 h-[400px] w-full max-w-[1376px] px-4 sm:h-[520px] sm:px-8 lg:h-[660px]">
      <img
        src={src}
        alt={alt}
        className="size-full rounded-[40px] object-cover sm:rounded-[60px]"
        loading="lazy"
      />
    </figure>
  );
}

export default function BlogDetailArticle({ heroImage, title, body }) {
  return (
    <article className="flex flex-col gap-5 pb-12">
      <BlogDetailImage src={heroImage} alt={title} />

      <p className="mx-auto max-w-[1376px] px-4 font-fraunces text-base leading-[26px] text-[#43474c] sm:px-8 lg:text-lg">
        {body.intro}
      </p>

      {body.sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-5">
          {section.heading && (
            <>
              <h2 className="px-4 text-center font-fraunces text-[clamp(24px,3vw,36px)] text-nav sm:px-8">
                {section.heading}
              </h2>
              {section.image && <BlogDetailImage src={section.image} alt="" />}
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mx-auto max-w-[1376px] px-4 font-fraunces text-base leading-[26px] text-[#43474c] sm:px-8 lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </>
          )}

          {section.proTip && (
            <p className="mx-auto max-w-[997px] px-4 text-center font-fraunces text-[clamp(19px,2.5vw,28px)] font-light italic leading-[1.43] text-services-eyebrow sm:px-8">
              <span className="font-semibold not-italic">Pro Tip: </span>
              {section.proTip}
            </p>
          )}
        </div>
      ))}
    </article>
  );
}
