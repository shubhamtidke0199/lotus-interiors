import FaqCtaSection from "@/components/sections/FaqCtaSection";
import FaqPageSection from "@/components/sections/FaqPageSection";

export const metadata = {
  title: "FAQ",
  description:
    "Find answers to common questions about our design process, customization, locations, timelines, and fees.",
};

export default function FaqPage() {
  return (
    <main className="bg-white">
      <FaqPageSection />
      <FaqCtaSection />
    </main>
  );
}
