import { notFound } from "next/navigation";
import BlogDetailArticle from "@/components/sections/BlogDetailArticle";
import BlogDetailHeader from "@/components/sections/BlogDetailHeader";
import BlogRelatedStoriesSection from "@/components/sections/BlogRelatedStoriesSection";
import {
  getAllBlogSlugs,
  getBlogDetail,
  getRelatedStories,
} from "@/data/blogDetailContent";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogDetail(slug);

  if (!blog) {
    return { title: "Article Not Found" };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const blog = getBlogDetail(slug);

  if (!blog) {
    notFound();
  }

  const relatedStories = getRelatedStories(slug);

  return (
    <main className="flex flex-col gap-8 bg-white pt-4">
      <BlogDetailHeader
        title={blog.title}
        category={blog.category}
        date={blog.date}
        topic={blog.topic}
      />
      <BlogDetailArticle
        heroImage={blog.heroImage}
        title={blog.title}
        body={blog.body}
      />
      <BlogRelatedStoriesSection stories={relatedStories} />
    </main>
  );
}
