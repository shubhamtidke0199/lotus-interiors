import BlogArticleCard from "@/components/ui/BlogArticleCard";

export default function BlogRelatedStoriesSection({ stories }) {
  if (!stories?.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-stories-title"
      className="px-4 pb-20 sm:px-8"
    >
      <div className="mx-auto flex max-w-[1380px] flex-col gap-6">
        <header className="max-w-[544px]">
          <p className="font-fraunces text-base uppercase tracking-[var(--tracking-eyebrow)] text-services-eyebrow">
            Related Stories
          </p>
          <h2
            id="related-stories-title"
            className="font-fraunces text-[28px] font-semibold leading-10 tracking-[var(--tracking-heading)] text-nav sm:text-[32px] lg:text-[36px]"
          >
            Curated insights from our Lotus Design Studio
          </h2>
        </header>

        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <BlogArticleCard key={story.id} {...story} href={story.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
