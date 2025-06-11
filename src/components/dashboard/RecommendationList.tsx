import { motion } from 'framer-motion';
import { Recommendation } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';

interface RecommendationListProps {
  recommendations: Recommendation[];
}

const RecommendationList = ({ recommendations }: RecommendationListProps) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'low':
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return '';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'consistency':
        return 'Brand Consistency';
      case 'contentQuality':
        return 'Content Quality';
      case 'visibility':
        return 'Visibility';
      case 'competitive':
        return 'Competitive Position';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id || index}
          className={`rounded-lg border p-4 ${getPriorityColor(rec.priority)}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                {getPriorityIcon(rec.priority)}
                <h3 className="font-semibold">{rec.title}</h3>
              </div>
              <p className="mt-1 text-sm">{rec.description}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-2 pt-2 sm:flex-col sm:items-end sm:pt-0">
              <Badge variant="outline">{getCategoryText(rec.category)}</Badge>
              <Badge variant="outline" className="text-xs">
                {getPriorityText(rec.priority)}
              </Badge>
            </div>
          </div>
        </motion.div>
      ))}

      {recommendations.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <div className="rounded-lg border-2 border-dashed border-muted p-8">
            <Check className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No recommendations found</h3>
            <p className="text-sm">Your brand analysis didn't generate any specific recommendations at this time.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationList;