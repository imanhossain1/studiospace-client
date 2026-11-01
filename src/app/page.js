import FeaturedStudios from "@/components/home/FeaturedStudios";
import HeroSlider from "@/components/home/HeroSlider";
import HostGuarantee from "@/components/home/HostGuarantee";
import HowItWorks from "@/components/home/HowItWorks";
import StudioCategories from "@/components/home/StudioCategories";



const HomePage = () => {
  return (
    <div>
       <HeroSlider />
      <FeaturedStudios />
      <StudioCategories />
      <HowItWorks />
      <HostGuarantee/>

    </div>
  );
};

export default HomePage;  


