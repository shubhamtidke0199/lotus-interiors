import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import DesignProcessSection from "@/components/sections/DesignProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <DesignProcessSection />
      <ServicesSection />
    </div>
  );
}
