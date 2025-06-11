import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import AIConsultationSection from '@/components/home/AIConsultationSection';
import PainPointsSolutionsSection from '@/components/home/PainPointsSolutionsSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';

const Home = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <AIConsultationSection />
      <PainPointsSolutionsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
    </div>
  );
};

export default Home;