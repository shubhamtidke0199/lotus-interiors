import BlogsListingSection from "@/components/sections/BlogsListingSection";
import BlogsPageHero from "@/components/sections/BlogsPageHero";

export const metadata = {
  title: "Blogs",
  description:
    "Curated insights on interior design, materials, and the craft of creating beautiful spaces from Lotus Design Studio.",
};

export default function BlogsPage() {
  return (
    <main className="bg-white">
      <BlogsPageHero />
      <BlogsListingSection />
    </main>
  );
}
