import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import PortfolioGalleryGrid from "@/components/sections/PortfolioGalleryGrid";
import PortfolioGalleryIntro from "@/components/sections/PortfolioGalleryIntro";

export const metadata = {
  title: "Portfolio | Lotus Design Studio",
  description:
    "Experience our craft firsthand at Lotus Design Studio galleries in Nagpur, Pune, and Mumbai.",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PortfolioGalleryIntro />
        <PortfolioGalleryGrid />
      </main>
      <SiteFooter />
    </div>
  );
}
