import { BrandReport, FormData } from '@/types';

// Helper function to calculate overall score
export const calculateOverallScore = (scores: {
  consistency: number;
  contentQuality: number;
  visibility: number;
  competitive: number;
}): number => {
  return Math.round(
    (scores.consistency * 0.25) +
    (scores.contentQuality * 0.3) +
    (scores.visibility * 0.25) +
    (scores.competitive * 0.2)
  );
};

// Mock function to generate a brand report
// In a real application, this would make API calls to analyze social media profiles
export const generateBrandReport = (formData: FormData): BrandReport => {
  // Calculate scores based on form data
  // This is a simplified mock implementation
  
  // Base scores
  let consistencyScore = 75;
  let contentQualityScore = 65;
  let visibilityScore = 60;
  let competitiveScore = 70;
  
  // Adjust scores based on provided social profiles
  const profilesProvided = Object.values(formData.socialProfiles).filter(Boolean).length;
  const profileCompleteness = profilesProvided / 4; // 4 possible profiles
  
  consistencyScore += profileCompleteness * 15;
  visibilityScore += profileCompleteness * 20;
  
  // Industry-specific adjustments
  if (formData.preferences.industry === 'technology') {
    contentQualityScore += 10;
  } else if (formData.preferences.industry === 'creative') {
    contentQualityScore += 15;
  }
  
  // Goals-based adjustments
  if (formData.preferences.goals.includes('build-authority')) {
    competitiveScore += 5;
  }
  if (formData.preferences.goals.includes('increase-visibility')) {
    visibilityScore += 5;
  }
  
  // Normalize scores to 0-100 range
  const normalizeScore = (score: number) => Math.min(Math.max(Math.round(score), 0), 100);
  
  const scores = {
    consistency: normalizeScore(consistencyScore),
    contentQuality: normalizeScore(contentQualityScore),
    visibility: normalizeScore(visibilityScore),
    competitive: normalizeScore(competitiveScore)
  };
  
  // Calculate overall score using the helper function
  const overall = normalizeScore(calculateOverallScore(scores));
  
  // Generate recommendations based on lowest scores
  const recommendations = generateRecommendations(scores);
  
  return {
    score: {
      overall,
      ...scores
    },
    recommendations
  };
};

// Generate personalized recommendations based on scores
const generateRecommendations = (scores: Omit<BrandScore, 'overall'>) => {
  const recommendations = [];
  
  // Common recommendations
  recommendations.push({
    id: '1',
    category: 'consistency' as const,
    priority: 'medium' as const,
    title: 'Maintain consistent profile photos',
    description: 'Use the same professional photo across all platforms to strengthen brand recognition.'
  });
  
  // Score-based recommendations
  if (scores.visibility < 70) {
    recommendations.push({
      id: '2',
      category: 'visibility' as const,
      priority: 'high' as const,
      title: 'Optimize your LinkedIn headline',
      description: 'Include industry-specific keywords in your headline to improve searchability.'
    });
  }
  
  if (scores.contentQuality < 75) {
    recommendations.push({
      id: '3',
      category: 'contentQuality' as const,
      priority: 'high' as const,
      title: 'Improve content engagement',
      description: 'Post more visual content and ask questions to increase audience interaction.'
    });
  }
  
  if (scores.competitive < 80) {
    recommendations.push({
      id: '4',
      category: 'competitive' as const,
      priority: scores.competitive < 60 ? 'high' as const : 'medium' as const,
      title: 'Analyze top competitors',
      description: 'Study content strategies of top performers in your field to identify improvement areas.'
    });
  }
  
  return recommendations;
};

export default generateBrandReport;