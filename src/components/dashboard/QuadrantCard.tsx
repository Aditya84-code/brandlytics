import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DivideIcon as LucideIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuadrantCardProps {
  title: string;
  score: number;
  description: string;
  icon: LucideIcon;
  review?: string;
}

const QuadrantCard = ({ title, score, description, icon: Icon, review }: QuadrantCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription>{description}</CardDescription>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`mr-2 text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
                      <span className="text-sm text-muted-foreground">/100</span>
                    </div>
                    <span className={`text-sm ${getScoreColor(score)}`}>
                      {getScoreText(score)}
                    </span>
                  </div>
                  <Progress
                    value={score}
                    className="mt-2 h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TooltipTrigger>
        {review && (
          <TooltipContent>
            <p className="max-w-xs">{review}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default QuadrantCard;