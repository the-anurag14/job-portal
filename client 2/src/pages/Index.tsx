import AppNavbar from "@/components/layout/AppNavbar";
import HeroSection from "@/components/HeroSection";
import FeaturedJobs from "@/components/FeaturedJobs";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5" />
    <AppNavbar />
    <HeroSection />
    <StatsSection />
    <FeaturedJobs />
    <HowItWorks />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
