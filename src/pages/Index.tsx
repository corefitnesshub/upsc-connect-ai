import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import SubjectsSection from "@/components/landing/SubjectsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SubjectsSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;
