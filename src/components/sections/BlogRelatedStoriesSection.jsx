import BlogArticleCard from "@/components/ui/BlogArticleCard";

export default function BlogRelatedStoriesSection({ stories }) {
  if (!stories?.length) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-stories-title"
      className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container-site flex flex-col gap-6">
        <header className="max-w-xl">
          <p className="type-eyebrow text-services-eyebrow">Related Stories</p>
          <h2
            id="related-stories-title"
            className="type-section-heading text-nav"
          >
            Curated insights from our Lotus Design Studio
          </h2>
        </header>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <BlogArticleCard key={story.id} {...story} href={story.href} />
          ))}
        </div>
      </div>
    </section>
  );
}
