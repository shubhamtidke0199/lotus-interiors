import PortfolioGalleryGrid from "@/components/sections/PortfolioGalleryGrid";
import PortfolioGalleryIntro from "@/components/sections/PortfolioGalleryIntro";

export const metadata = {
  title: "Portfolio",
  description:
    "Experience our craft firsthand at Lotus Design Studio galleries in Nagpur, Pune, and Mumbai.",
};

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <PortfolioGalleryIntro />
      <PortfolioGalleryGrid />
    </main>
  );
}
