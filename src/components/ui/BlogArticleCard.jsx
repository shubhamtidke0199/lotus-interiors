import Link from "next/link";
import ArrowIcon from "@/components/icons/ArrowIcon";

function BlogMeta({ category, date }) {
  return (
    <div className="flex items-center gap-3 font-fraunces text-[10px] uppercase tracking-[1px]">
      <span className="bg-accent-cream px-2 py-0.5 text-services-eyebrow">
        {category}
      </span>
      <time className="text-nav">{date}</time>
    </div>
  );
}

function ExploreLink({ href = "#" }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 pt-4 font-fraunces text-xs uppercase tracking-[1.2px] text-primary transition-colors hover:text-primary/80"
    >
      Explore Article
      <ArrowIcon className="size-2 text-primary" />
    </Link>
  );
}

export function BlogFeaturedHorizontalCard({
  category,
  date,
  title,
  excerpt,
  image,
  imageClassName,
  href = "#",
}) {
  return (
    <article className="flex flex-col gap-8 bg-product-bg p-8 sm:flex-row sm:items-center">
      <figure className="relative aspect-[4/3] w-full overflow-hidden sm:max-w-[280px] sm:flex-1">
        <img
          src={image}
          alt=""
          className={imageClassName}
          loading="lazy"
        />
      </figure>
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <BlogMeta category={category} date={date} />
        <h2 className="font-fraunces text-[30px] leading-[38px] text-nav">
          <Link href={href} className="hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="font-fraunces text-sm leading-6 text-muted">{excerpt}</p>
        <ExploreLink href={href} />
      </div>
    </article>
  );
}

export function BlogFeaturedVerticalCard({
  category,
  date,
  title,
  excerpt,
  image,
  imageClassName,
  href = "#",
}) {
  return (
    <article className="flex flex-col gap-6">
      <figure className="relative h-[467px] overflow-hidden bg-[#f4f4f2]">
        <img
          src={image}
          alt=""
          className={imageClassName}
          loading="lazy"
        />
      </figure>
      <div className="flex flex-col gap-3 px-2">
        <BlogMeta category={category} date={date} />
        <h2 className="font-fraunces text-[30px] leading-[38px] text-nav">
          <Link href={href} className="hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="max-w-[356px] font-fraunces text-sm leading-6 text-muted">
          {excerpt}
        </p>
        <ExploreLink href={href} />
      </div>
    </article>
  );
}

export default function BlogArticleCard({
  category,
  date,
  title,
  excerpt,
  image,
  imageClassName,
  staggered = false,
  href = "#",
}) {
  return (
    <article className={`flex flex-col gap-6 ${staggered ? "pt-8 lg:pt-16" : ""}`}>
      <figure className="relative aspect-[4/5] overflow-hidden bg-[#f4f4f2]">
        <img
          src={image}
          alt=""
          className={imageClassName}
          loading="lazy"
        />
      </figure>
      <div className="flex flex-col gap-3 px-2">
        <BlogMeta category={category} date={date} />
        <h2 className="font-fraunces text-[30px] leading-[38px] text-nav">
          <Link href={href} className="hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="font-fraunces text-sm leading-6 text-muted">{excerpt}</p>
        <ExploreLink href={href} />
      </div>
    </article>
  );
}
