import HeroSection from '../components/sections/HeroSection';
import FeatureSection from '../components/sections/FeatureSection';
import StatsSection from '../components/sections/StatsSection';
import FAQSection from '../components/sections/FAQSection';
import CTASection from '../components/sections/CTASection';

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
} 