function BlogDetailImage({ src, alt = "" }) {
  return (
    <figure className="container-site relative mt-3 h-[20rem] w-full px-4 sm:h-[26rem] sm:px-6 lg:h-[32rem] lg:px-8">
      <img
        src={src}
        alt={alt}
        className="size-full rounded-3xl object-cover sm:rounded-[2.5rem]"
        loading="lazy"
      />
    </figure>
  );
}

export default function BlogDetailArticle({ heroImage, title, body }) {
  return (
    <article className="flex flex-col gap-5 pb-12">
      <BlogDetailImage src={heroImage} alt={title} />

      <p className="container-site px-4 font-fraunces text-sm leading-6 text-[#43474c] sm:px-6 sm:text-base lg:px-8">
        {body.intro}
      </p>

      {body.sections.map((section, index) => (
        <div key={index} className="flex flex-col gap-5">
          {section.heading && (
            <>
              <h2 className="type-section-heading px-4 text-center text-nav sm:px-6 lg:px-8">
                {section.heading}
              </h2>
              {section.image && <BlogDetailImage src={section.image} alt="" />}
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="container-site px-4 font-fraunces text-sm leading-6 text-[#43474c] sm:px-6 sm:text-base lg:px-8"
                >
                  {paragraph}
                </p>
              ))}
            </>
          )}

          {section.proTip && (
            <p className="mx-auto max-w-3xl px-4 text-center font-fraunces text-lg font-light italic leading-relaxed text-services-eyebrow sm:px-6 sm:text-xl lg:px-8">
              <span className="font-semibold not-italic">Pro Tip: </span>
              {section.proTip}
            </p>
          )}
        </div>
      ))}
    </article>
  );
}
