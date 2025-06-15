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
  Crown,
  MessageCircle,
  Bot,
  Headphones,
  RefreshCw
} from 'lucide-react';
import { BrandScore, BrandReport, Recommendation, FormData, WebhookResponse } from '@/types';
import BrandScoreRadarChart from '@/components/dashboard/BrandScoreRadarChart';
import RecommendationList from '@/components/dashboard/RecommendationList';
import QuadrantCard from '@/components/dashboard/QuadrantCard';
import AICoachConsultation from '@/components/dashboard/AICoachConsultation';
import { useAuth } from '@/contexts/AuthContext';
import { getBrandResult } from '@/lib/database';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [userData, setUserData] = useState<{ formData: FormData; webhookResponse: WebhookResponse; auditId?: string } | null>(null);
  const [brandReport, setBrandReport] = useState<BrandReport | null>(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [chatbotLoaded, setChatbotLoaded] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      loadDashboardData();
    }
  }, [user, authLoading, navigate]);

  // Load the chatbot script when the chat coach tab is selected
  useEffect(() => {
    if (selectedTab === 'chat-coach' && !chatbotLoaded) {
      loadChatbotScript();
    }
  }, [selectedTab, chatbotLoaded]);

  const loadChatbotScript = () => {
    // Remove any existing script first
    const existingScript = document.querySelector('script[widget-id="wd_01jxsk0frbe8tspzv5jk4nwhjg"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = 'https://assets.dappier.com/widget/dappier-loader.min.js';
    script.setAttribute('widget-id', 'wd_01jxsk0frbe8tspzv5jk4nwhjg');
    script.async = true;
    
    script.onload = () => {
      console.log('Dappier widget script loaded successfully');
      setChatbotLoaded(true);
      
      // Give the widget time to initialize
      setTimeout(() => {
        const widget = document.querySelector('dappier-ask-ai-widget');
        if (widget) {
          console.log('Dappier widget found and should be active');
        } else {
          console.warn('Dappier widget not found after script load');
        }
      }, 1000);
    };
    
    script.onerror = () => {
      console.error('Failed to load Dappier widget script');
    };
    
    document.head.appendChild(script);
  };

  const reloadChatbot = () => {
    setChatbotLoaded(false);
    const widget = document.getElementById('dappier-ask-ai-widget');
    if (widget) {
      widget.innerHTML = '<dappier-ask-ai-widget widgetId="wd_01jxsk0frbe8tspzv5jk4nwhjg" />';
    }
    loadChatbotScript();
  };

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // First, try to get data from localStorage (for immediate access after audit)
      const storedData = localStorage.getItem('brandlytics-audit-data');
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          
          // Validate the stored data
          if (parsedData.webhookResponse && parsedData.webhookResponse.scores && 
              typeof parsedData.webhookResponse.scores.overall !== 'undefined') {
            setUserData(parsedData);
            setBrandReport({
              score: parsedData.webhookResponse.scores,
              recommendations: parsedData.webhookResponse.recommendations || []
            });
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing localStorage data:', error);
          localStorage.removeItem('brandlytics-audit-data');
        }
      }

      // If no valid localStorage data, try to load from database
      // For now, we'll redirect to audit form if no data is found
      // In a real implementation, you might want to load the most recent audit result
      navigate('/audit');
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      navigate('/audit');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
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

  if (!userData || !brandReport || !brandReport.score) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">No analysis data found</h2>
          <p className="text-muted-foreground mt-2">Please complete a brand audit first.</p>
          <Button onClick={() => navigate('/audit')} className="mt-4">
            Start Brand Audit
          </Button>
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
                {brandReport.score.overall >= 80 ? 'Excellent' : 
                 brandReport.score.overall >= 60 ? 'Good' : 
                 brandReport.score.overall >= 40 ? 'Fair' : 'Needs Improvement'}
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {userData.webhookResponse.summary ? 
                userData.webhookResponse.summary.substring(0, 150) + '...' :
                'Your brand analysis has been completed successfully.'
              }
            </p>
          </div>
          <div className="col-span-2 h-60">
            <BrandScoreRadarChart scores={brandReport.score} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setSelectedTab} className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-5 h-auto p-1">
          <TabsTrigger value="overview" className="text-sm py-3">
            Overview
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-sm py-3">
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-sm py-3">
            Summary
          </TabsTrigger>
          <TabsTrigger value="ai-coach" className="relative text-sm py-3">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="relative">
                <Sparkles className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-semibold whitespace-nowrap">
                AI Coach
              </span>
              <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs px-1.5 py-0.5">
                <Crown className="h-2.5 w-2.5 mr-1" />
                PREMIUM
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="chat-coach" className="relative text-sm py-3">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <div className="relative">
                <Bot className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse"></div>
              </div>
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold whitespace-nowrap">
                Chat Coach
              </span>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs px-1.5 py-0.5">
                <MessageCircle className="h-2.5 w-2.5 mr-1" />
                LIVE
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
              review={userData.webhookResponse.reviews?.consistency}
            />
            
            <QuadrantCard
              title="Content Quality"
              score={brandReport.score.contentQuality}
              description="Analysis of your content engagement and value"
              icon={LineChart}
              review={userData.webhookResponse.reviews?.contentQuality}
            />
            
            <QuadrantCard
              title="Visibility Metrics"
              score={brandReport.score.visibility}
              description="Your brand's searchability and reach"
              icon={ArrowUpRight}
              review={userData.webhookResponse.reviews?.visibility}
            />
            
            <QuadrantCard
              title="Competitive Position"
              score={brandReport.score.competitive}
              description="How you compare to industry peers"
              icon={Users}
              review={userData.webhookResponse.reviews?.competitive}
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
              <div className="space-y-4" dangerouslySetInnerHTML={{ __html: userData.webhookResponse.summary || 'No summary available.' }} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-coach">
          <AICoachConsultation 
            userSummary={userData.webhookResponse.summary || 'Brand analysis completed successfully.'}
            userName={userData.formData.personalInfo.name}
          />
        </TabsContent>

        <TabsContent value="chat-coach">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Enhanced Chat Coach Header */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 p-8 text-white">
              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="rounded-full bg-white/20 p-3">
                      <Bot className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-pulse"></div>
                  </div>
                  <div>
                    <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      LIVE CHAT
                    </Badge>
                    <h2 className="text-3xl font-bold">Chat with Your AI Brand Coach</h2>
                  </div>
                </div>
                <p className="mb-6 text-lg text-white/90 max-w-2xl">
                  Get instant answers to your brand questions. Our AI coach is available 24/7 to help you 
                  improve your personal brand with personalized advice and strategies.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <Zap className="h-4 w-4" />
                    <span className="text-sm">Instant Responses</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Personalized Advice</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Headphones className="h-4 w-4" />
                    <span className="text-sm">24/7 Available</span>
                  </div>
                </div>
              </div>
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
              <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-2xl"></div>
            </div>

            {/* Chat Widget Container */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-green-600" />
                      AI Brand Coach Chat
                    </CardTitle>
                    <CardDescription>
                      Ask questions about your brand analysis, get improvement tips, or discuss strategies
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={reloadChatbot}
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reload Chat
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Chatbot Widget Container */}
                <div className="min-h-[600px] w-full bg-white relative">
                  {!chatbotLoaded && selectedTab === 'chat-coach' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="text-center">
                        <Bot className="h-12 w-12 text-green-500 mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-600">Loading AI Chat Coach...</p>
                      </div>
                    </div>
                  )}
                  <div id="dappier-ask-ai-widget" className="h-full min-h-[600px]">
                    <dappier-ask-ai-widget widgetId="wd_01jxsk0frbe8tspzv5jk4nwhjg" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Troubleshooting Section */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <MessageCircle className="h-5 w-5" />
                  Chat Not Working?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-amber-700">
                  <p className="text-sm">If the chat isn't responding, try these steps:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="font-medium">1.</span>
                      <span>Click the "Reload Chat" button above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">2.</span>
                      <span>Wait a few seconds for the widget to fully load</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">3.</span>
                      <span>Check your internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">4.</span>
                      <span>Try refreshing the entire page</span>
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.location.reload()}
                      className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Refresh Page
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Quick Tips for Better Conversations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-700">Ask Specific Questions</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• "How can I improve my LinkedIn engagement?"</li>
                      <li>• "What content should I post for my industry?"</li>
                      <li>• "How do I build thought leadership?"</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium text-green-700">Reference Your Analysis</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• "Based on my brand score, what should I focus on?"</li>
                      <li>• "Help me implement the recommendations"</li>
                      <li>• "Explain my competitive positioning"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default Dashboard;