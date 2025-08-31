import AboutHero from '../components/sections/heros/AboutHero';
import AboutContent from '../components/sections/AboutContent';
import About from "@/components/sections/about";
import Reviews from '@/components/sections/reviews';
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
      <About />
      <Reviews />
    </>
  );
}