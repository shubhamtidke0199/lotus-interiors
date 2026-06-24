import Navbar from "@/components/layouts/Navbar";
import SiteFooter from "@/components/layouts/SiteFooter";
import AppointmentSection from "@/components/sections/AppointmentSection";
import ConsultationCTASection from "@/components/sections/ConsultationCTASection";
import DesignProcessSection from "@/components/sections/DesignProcessSection";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PresenceSection from "@/components/sections/PresenceSection";
import ProductsSection from "@/components/sections/ProductsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <DesignProcessSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <ProductsSection />
        <PortfolioSection />
        <PresenceSection />
        <ConsultationCTASection />
        <TestimonialsSection />
        <AppointmentSection />
      </main>
      <SiteFooter />
    </div>
  );
}
