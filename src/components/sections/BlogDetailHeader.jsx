export default function BlogDetailHeader({ title, category, date, topic }) {
  return (
    <header className="mx-auto flex max-w-[1376px] flex-col gap-4 px-4 text-center sm:px-8">
      <h1 className="font-fraunces text-[clamp(28px,4vw,48px)] leading-tight text-nav">
        {title}
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-4 font-fraunces text-[15px] uppercase tracking-[1px] text-nav">
        <span className="bg-accent-cream px-5 py-2 text-services-eyebrow">
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
