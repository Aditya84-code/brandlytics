export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  recommended?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface SocialProfile {
  platform: string;
  url: string;
}

export interface FormData {
  personalInfo: {
    name: string;
    profession: string;
    email: string;
  };
  socialProfiles: {
    linkedin: string;
    instagram: string;
  };
  preferences: {
    industry: string;
    goals: string[];
  };
}

export interface BrandScore {
  overall: number;
  consistency: number;
  contentQuality: number;
  visibility: number;
  competitive: number;
}

export interface BrandReport {
  score: BrandScore;
  recommendations: Recommendation[];
}

export interface Recommendation {
  id?: string;
  category: 'consistency' | 'contentQuality' | 'visibility' | 'competitive';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
}

export interface WebhookResponse {
  recommendations: Recommendation[];
  scores: BrandScore;
  summary: string;
  reviews: {
    consistency: string;
    contentQuality: string;
    visibility: string;
    competitive: string;
  };
}