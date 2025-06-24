import HeroSection from "../components/home/HeroSection";
import FeaturedEvents from "../components/home/FeaturedEvents";
import FeaturesSection from "../components/home/FeaturesSection";
import CategoriesSection from "../components/home/CategoriesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CallToActionSection from "../components/home/CallToActionSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedEvents />
      <FeaturesSection />
      <CategoriesSection />
      <TestimonialsSection />
      <CallToActionSection />
    </main>
  );
}
