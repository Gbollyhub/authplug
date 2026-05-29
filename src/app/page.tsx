import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import LogoBar from "./_components/LogoBar";
import Features from "./_components/Features";
import HowItWorks from "./_components/HowItWorks";
import SecuritySection from "./_components/SecuritySection";
import DeveloperSection from "./_components/DeveloperSection";
import Stats from "./_components/Stats";
import Testimonials from "./_components/Testimonials";
import Pricing from "./_components/Pricing";
import CTABanner from "./_components/CTABanner";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoBar />
      <Features />
      <HowItWorks />
      <SecuritySection />
      <DeveloperSection />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTABanner />
      <Footer />
    </main>
  );
}
