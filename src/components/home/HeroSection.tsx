import { HeroSection as NewHeroSection } from '@/components/ui/hero-section-dark';

const HeroSection = () => {
  return (
    <NewHeroSection
      title=""
      subtitle={{
        regular: "Transform your digital presence with ",
        gradient: "AI-powered brand analytics"
      }}
      description="Get a comprehensive audit of your personal brand across platforms in minutes. Discover what's working, what's not, and how to improve."
      ctaText="Start Free Audit"
      ctaHref="/audit"
      secondaryCtaText="Learn More"
      secondaryCtaHref="/learn-more"
      bottomImage={{
        light: "https://i.postimg.cc/Dy5btCrP/hero.png",
        dark: "https://i.postimg.cc/Dy5btCrP/hero.png"
      }}
      gridOptions={{
        angle: 65,
        opacity: 0.3,
        cellSize: 50,
        lightLineColor: "#6366f1",
        darkLineColor: "#4f46e5",
      }}
    />
  );
};

export default HeroSection;