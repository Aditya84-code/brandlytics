import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  ArrowUpRight, 
  BarChart, 
  LineChart, 
  Users, 
  AlertTriangle, 
  Check, 
  DivideIcon as LucideIcon,
  Sparkles,
  Zap,
  Star,
  Crown
} from 'lucide-react';
import { BrandScore, BrandReport, Recommendation, FormData, WebhookResponse } from '@/types';
import BrandScoreRadarChart from '@/components/dashboard/BrandScoreRadarChart';
import RecommendationList from '@/components/dashboard/RecommendationList';
import QuadrantCard from '@/components/dashboard/QuadrantCard';
import AICoachConsultation from '@/components/dashboard/AICoachConsultation';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ formData: FormData; webhookResponse: WebhookResponse } | null>(null);
  const [brandReport, setBrandReport] = useState<BrandReport | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    const storedData = localStorage.getItem('brandlytics-audit-data');
    
    if (!storedData) {
      navigate('/audit');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      
      // Add validation to ensure we have valid score data
      if (parsedData.webhookResponse && parsedData.webhookResponse.scores && 
          typeof parsedData.webhookResponse.scores.overall !== 'undefined') {
        setBrandReport({
          score: parsedData.webhookResponse.scores,
          recommendations: parsedData.webhookResponse.recommendations || []
        });
      } else {
        console.error('Invalid or missing score data');
        navigate('/audit');
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
      navigate('/audit');
    }
  }, [navigate]);

  if (!userData || !brandReport || !brandReport.score) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading your brand analysis...</h2>
          <div className="mt-4 h-4 w-48 rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container px-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Brand Analysis Dashboard</h1>
            <p className="text-muted-foreground">
              Results for {userData.formData.personalInfo.name}, {userData.formData.personalInfo.profession}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" /> Export Report
            </Button>
            <Button className="gap-1">
              <ArrowUpRight className="h-4 w-4" /> Upgrade to Pro
            </Button>
          </div>
        </div>
      </header>

      <div className="mb-8 rounded-xl bg-card p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="col-span-1">
            <h2 className="mb-2 text-2xl font-bold">Overall Brand Score</h2>
            <div className="flex items-center gap-3">
              <div className="text-5xl font-bold text-primary">{brandReport.score.overall}</div>
              <div className="rounded-lg bg-primary/10 px-2 py-1 text-sm text-primary">
                Needs Improvement
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Your brand needs significant improvement in visibility and competitive positioning.
            </p>
          </div>
          <div className="col-span-2 h-60">
            <BrandScoreRadarChart scores={brandReport.score} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setSelectedTab}>
        <TabsList className="mb-8 grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="ai-coach" className="relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Sparkles className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold">
                AI Coach
              </span>
              <Badge className="ml-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs px-1.5 py-0.5">
                <Crown className="h-2.5 w-2.5 mr-1" />
                PREMIUM
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <QuadrantCard
              title="Brand Consistency"
              score={brandReport.score.consistency}
              description="How consistent your brand appears across platforms"
              icon={BarChart}
              review={userData.webhookResponse.reviews.consistency}
            />
            
            <QuadrantCard
              title="Content Quality"
              score={brandReport.score.contentQuality}
              description="Analysis of your content engagement and value"
              icon={LineChart}
              review={userData.webhookResponse.reviews.contentQuality}
            />
            
            <QuadrantCard
              title="Visibility Metrics"
              score={brandReport.score.visibility}
              description="Your brand's searchability and reach"
              icon={ArrowUpRight}
              review={userData.webhookResponse.reviews.visibility}
            />
            
            <QuadrantCard
              title="Competitive Position"
              score={brandReport.score.competitive}
              description="How you compare to industry peers"
              icon={Users}
              review={userData.webhookResponse.reviews.competitive}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Brand Improvement Recommendations
              </CardTitle>
              <CardDescription>
                Actionable insights to enhance your personal brand based on our analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecommendationList recommendations={brandReport.recommendations} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Brand Analysis Summary</CardTitle>
              <CardDescription>
                Comprehensive overview of your personal brand status
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <div className="space-y-4" dangerouslySetInnerHTML={{ __html: userData.webhookResponse.summary }} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-coach">
          <AICoachConsultation 
            userSummary={userData.webhookResponse.summary}
            userName={userData.formData.personalInfo.name}
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;