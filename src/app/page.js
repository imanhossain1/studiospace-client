// ========================================
// 01. HOME PAGE COMPONENT IMPORTS
// ========================================

// 1. Hero Slider
import HeroSlider from "@/components/home/HeroSlider";

// 2. Featured Studios
import FeaturedStudios from "@/components/home/FeaturedStudios";

// 3. Studio Categories
import StudioCategories from "@/components/home/StudioCategories";

// 4. How It Works
import HowItWorks from "@/components/home/HowItWorks";

// 5. Host Guarantee
import HostGuarantee from "@/components/home/HostGuarantee";

// 6. About Us
import AboutUs from "@/components/home/AboutUs";


// ========================================
// 02. HOME PAGE COMPONENT
// ========================================

const HomePage = () => {
  return (
    <main>

      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured Studios */}
      <FeaturedStudios />

      {/* 3. Studio Categories */}
      <StudioCategories />

      {/* 4. How It Works */}
      <HowItWorks />

      {/* 5. Host Guarantee & Creator Support */}
      <HostGuarantee />

      <AboutUs />

    </main>
  );
};


// ========================================
// 03. EXPORT HOME PAGE
// ========================================

export default HomePage;