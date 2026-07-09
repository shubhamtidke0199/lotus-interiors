import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import FaqCtaSection from "@/components/sections/FaqCtaSection";
import FaqPageSection from "@/components/sections/FaqPageSection";

export const metadata = {
  title: "FAQ | Lotus Design Studio",
  description:
    "Find answers to common questions about our design process, customization, locations, timelines, and fees.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <FaqPageSection />
        <FaqCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
