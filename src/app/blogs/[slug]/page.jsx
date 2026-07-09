import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
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
    return { title: "Article Not Found | Lotus Design Studio" };
  }

  return {
    title: `${blog.title} | Lotus Design Studio`,
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="flex flex-col gap-8 pt-4">
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
      <SiteFooter />
    </div>
  );
}
