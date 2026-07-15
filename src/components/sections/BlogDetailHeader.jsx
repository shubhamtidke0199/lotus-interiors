export default function BlogDetailHeader({ title, category, date, topic }) {
  return (
    <header className="container-site flex flex-col gap-4 px-4 text-center sm:px-6 lg:px-8">
      <h1 className="type-display-heading text-nav">{title}</h1>
      <div className="flex flex-wrap items-center justify-center gap-4 font-fraunces text-sm uppercase tracking-[1px] text-nav">
        <span className="bg-accent-cream px-4 py-1.5 text-services-eyebrow">
          {category}
        </span>
        <img
          src="/images/blog-view/container-group.svg"
          alt=""
          aria-hidden="true"
          className="size-4"
        />
        <time>{date}</time>
        <img
          src="/images/blog-view/container-group.svg"
          alt=""
          aria-hidden="true"
          className="size-4"
        />
        <span>{topic}</span>
      </div>
    </header>
  );
}
