import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Target,
  Eye,
  Hash,
  Settings,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle: {
    regular: string;
    gradient: string;
  };
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  bottomImage?: {
    light: string;
    dark: string;
  };
  gridOptions?: {
    angle: number;
    opacity: number;
    cellSize: number;
    lightLineColor: string;
    darkLineColor: string;
  };
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: HeroSectionProps) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(0);

  const analysisSteps = [
    { icon: Search, text: "Analyzing LinkedIn profile...", user: "Sarah Chen", score: 85 },
    { icon: BarChart3, text: "Evaluating content consistency...", user: "Mike Rodriguez", score: 72 },
    { icon: TrendingUp, text: "Measuring brand visibility...", user: "Alex Thompson", score: 91 },
    { icon: Target, text: "Benchmarking competitors...", user: "Emma Davis", score: 78 }
  ];

  const notifications = [
    { id: 1, user: "Sarah Chen", action: "completed brand audit", time: "2m ago", score: 85 },
    { id: 2, user: "Mike Rodriguez", action: "improved visibility score", time: "5m ago", score: 72 },
    { id: 3, user: "Alex Thompson", action: "achieved top 10% ranking", time: "8m ago", score: 91 },
    { id: 4, user: "Emma Davis", action: "boosted engagement rate", time: "12m ago", score: 78 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnalysis((prev) => (prev + 1) % analysisSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get the current icon component
  const CurrentIcon = analysisSteps[currentAnalysis].icon;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, #e5e7eb 1px, transparent 1px),
            linear-gradient(180deg, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10 px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Zap className="h-4 w-4" />
                AI-POWERED BRAND ANALYTICS
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {subtitle.regular}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {subtitle.gradient}
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="gap-2 px-8 py-6 text-lg">
                <Link to={ctaHref}>
                  {ctaText}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg border-2 hover:bg-muted"
              >
                <Link to={secondaryCtaHref}>
                  {secondaryCtaText}
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex items-center gap-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Brands Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Monitoring</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Dashboard Mockup */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Dashboard Card */}
            <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Brand Analytics</h3>
                        <p className="text-sm text-muted-foreground">Real-time insights</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search brand metrics..."
                      className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Current Analysis */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Live Analysis
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                        Active
                      </Badge>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentAnalysis}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CurrentIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{analysisSteps[currentAnalysis].text}</p>
                          <p className="text-xs text-muted-foreground">{analysisSteps[currentAnalysis].user}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{analysisSteps[currentAnalysis].score}</div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        Recent Activity
                      </h4>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {notifications.slice(0, 3).map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-lg transition-colors"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {notification.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              <span className="font-medium">{notification.user}</span>
                              <span className="text-muted-foreground"> {notification.action}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{notification.time}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-primary">{notification.score}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Growth</span>
                      </div>
                      <div className="text-lg font-bold text-green-700">+24%</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-700">Visibility</span>
                      </div>
                      <div className="text-lg font-bold text-blue-700">89%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Notification */}
            <motion.div
              className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Analysis Complete!</span>
              </div>
            </motion.div>

            {/* Floating Score Card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">92</div>
                <div className="text-xs text-muted-foreground">Brand Score</div>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};