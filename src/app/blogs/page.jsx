import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import BlogsListingSection from "@/components/sections/BlogsListingSection";
import BlogsPageHero from "@/components/sections/BlogsPageHero";

export const metadata = {
  title: "Blogs | Lotus Design Studio",
  description:
    "Curated insights on interior design, materials, and the craft of creating beautiful spaces from Lotus Design Studio.",
};

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <BlogsPageHero />
        <BlogsListingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
