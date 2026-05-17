import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="bg-lightBg min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;