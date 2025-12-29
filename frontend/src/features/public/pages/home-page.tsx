import { HeroSlider } from '../components/hero-slider';
import { EnergySection } from '../components/energy-section';
import { NewsSection } from '../components/news-section';

export const HomePage = () => (
  <main className="bg-[#0A1F44]">
    <HeroSlider />
    <EnergySection />
    <NewsSection />
  </main>
);
