import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import DesignProcessSection from "@/components/sections/DesignProcessSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <DesignProcessSection />
    </div>
  );
}
