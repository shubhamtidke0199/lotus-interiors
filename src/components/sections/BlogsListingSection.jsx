"use client";

import { useMemo, useState } from "react";
import BlogArticleCard, {
  BlogFeaturedHorizontalCard,
  BlogFeaturedVerticalCard,
} from "@/components/ui/BlogArticleCard";
import FilterTabs from "@/components/ui/FilterTabs";
import {
  blogFilters,
  blogPagination,
  blogPosts,
} from "@/data/blogsPageContent";

function matchesFilter(category, filterIndex) {
  if (filterIndex === 0) {
    return true;
  }

  const filter = blogFilters[filterIndex];
  return category.toLowerCase() === filter.toLowerCase();
}

export default function BlogsListingSection() {
  const [activeFilter, setActiveFilter] = useState(0);

  const filteredPosts = useMemo(
    () => blogPosts.filter((post) => matchesFilter(post.category, activeFilter)),
    [activeFilter],
  );

  const featuredHorizontal = filteredPosts.filter(
    (post) => post.layout === "featured-horizontal",
  );
  const featuredVertical = filteredPosts.find(
    (post) => post.layout === "featured-vertical",
  );
  const standardPosts = filteredPosts.filter(
    (post) => post.layout === "standard",
  );

  return (
    <section
      aria-labelledby="blogs-listing-title"
      className="px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-12">
        <header className="flex flex-col gap-6 pt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex max-w-xl flex-col gap-2">
            <p className="type-eyebrow text-services-eyebrow">
              Latest Reflections
            </p>
            <h2
              id="blogs-listing-title"
              className="type-section-heading text-nav"
            >
              Curated insights from our Lotus Design Studio
            </h2>
          </div>
          <FilterTabs
            tabs={blogFilters}
            activeIndex={activeFilter}
            onChange={setActiveFilter}
          />
        </header>

        {(featuredHorizontal.length > 0 || featuredVertical) && (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
            {featuredHorizontal.length > 0 && (
              <div className="flex flex-col gap-8">
                {featuredHorizontal.map((post) => (
                  <BlogFeaturedHorizontalCard
                    key={post.id}
                    {...post}
                    href={`/blogs/${post.id}`}
                  />
                ))}
              </div>
            )}
            {featuredVertical && (
              <BlogFeaturedVerticalCard
                {...featuredVertical}
                href={`/blogs/${featuredVertical.id}`}
              />
            )}
          </div>
        )}

        {standardPosts.length > 0 && (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {standardPosts.map((post) => (
              <BlogArticleCard key={post.id} {...post} href={`/blogs/${post.id}`} />
            ))}
          </div>
        )}

        <nav
          aria-label="Blog pagination"
          className="flex flex-wrap items-center justify-center gap-6"
        >
          {blogPagination.map((page, index) =>
            page === 1 ? (
              <button
                key={`page-${page}`}
                type="button"
                aria-current="page"
                className="rounded-lg bg-[#f5f3f7] px-3 py-2 font-fraunces text-base text-primary"
              >
                {page}
              </button>
            ) : (
              <button
                key={`page-${page}-${index}`}
                type="button"
                className="font-fraunces text-base text-nav transition-colors hover:text-primary"
              >
                {page}
              </button>
            ),
          )}
        </nav>
      </div>
    </section>
  );
}
