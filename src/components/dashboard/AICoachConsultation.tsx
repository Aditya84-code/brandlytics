import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Calendar, MessageCircle, Star, Clock, Users, Crown, Sparkles, Zap } from 'lucide-react';
import ScheduleMeetForm from './ScheduleMeetForm';

interface AICoachConsultationProps {
  userSummary: string;
  userName: string;
}

const AICoachConsultation = ({ userSummary, userName }: AICoachConsultationProps) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const features = [
    {
      icon: Video,
      title: 'Face-to-Face Consultation',
      description: 'Meet with our AI brand coach in a personalized video call'
    },
    {
      icon: MessageCircle,
      title: 'Personalized Guidance',
      description: 'Get specific advice based on your brand analysis results'
    },
    {
      icon: Star,
      title: 'Expert Strategies',
      description: 'Learn proven techniques to elevate your personal brand'
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Available 24/7 to fit your busy schedule'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced AI Coach Header with Schedule Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 text-white"
      >
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="relative">
              <div className="rounded-full bg-white/20 p-3">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
            </div>
            <div>
              <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                <Crown className="h-3 w-3 mr-1" />
                PREMIUM FEATURE
              </Badge>
              <h2 className="text-3xl font-bold">Meet Your AI Brand Coach</h2>
            </div>
          </div>
          <p className="mb-6 text-lg text-white/90 max-w-2xl">
            Get personalized, one-on-one coaching from our advanced AI brand expert. 
            Transform your digital presence with tailored strategies and actionable insights.
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-white/80">
              <Zap className="h-4 w-4" />
              <span className="text-sm">Instant Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Star className="h-4 w-4" />
              <span className="text-sm">Personalized Strategy</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="h-4 w-4" />
              <span className="text-sm">Expert Guidance</span>
            </div>
          </div>
          <Button
            onClick={() => setShowScheduleForm(true)}
            size="lg"
            className="bg-white text-purple-600 hover:bg-white/90 gap-2"
          >
            <Calendar className="h-5 w-5" />
            Schedule Meeting
          </Button>
        </div>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            What to Expect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <h4 className="font-medium">Personalized Brand Review</h4>
                <p className="text-sm text-muted-foreground">
                  Deep dive into your current brand analysis and identify key improvement areas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <h4 className="font-medium">Strategic Action Plan</h4>
                <p className="text-sm text-muted-foreground">
                  Get a customized roadmap with specific steps to enhance your digital presence
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <h4 className="font-medium">Q&A Session</h4>
                <p className="text-sm text-muted-foreground">
                  Ask specific questions about your brand challenges and get expert guidance
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <h4 className="font-medium">Follow-up Resources</h4>
                <p className="text-sm text-muted-foreground">
                  Receive additional tools and templates to implement your brand strategy
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScheduleMeetForm
        isOpen={showScheduleForm}
        onClose={() => setShowScheduleForm(false)}
        userSummary={userSummary}
        userName={userName}
      />
    </div>
  );
};

export default AICoachConsultation;