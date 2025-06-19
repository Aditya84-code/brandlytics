import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  MessageCircle, 
  Sparkles, 
  Zap, 
  Brain, 
  Target, 
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AIConsultationSection = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const scenarios = [
    {
      id: 1,
      title: "Social media Optimization",
      question: "How can I improve my social engagement?",
      response: "Based on your profile analysis, I recommend posting 3x per week with industry insights, using 3-5 relevant hashtags, and engaging with comments within 2 hours of posting.",
      metrics: { engagement: "+150%", connections: "+89", visibility: "+200%" },
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Content Strategy",
      question: "What content should I create to build authority?",
      response: "Focus on thought leadership content: 40% industry insights, 30% personal experiences, 20% educational content, and 10% behind-the-scenes. Consistency is key.",
      metrics: { authority: "+85%", followers: "+234", shares: "+120%" },
      icon: Target,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Brand Positioning",
      question: "How do I differentiate myself from competitors?",
      response: "Your unique value proposition should emphasize your cross-industry experience. Position yourself as a bridge between traditional and digital approaches.",
      metrics: { uniqueness: "+95%", inquiries: "+67", recognition: "+140%" },
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500"
    }
  ];

  // Auto-rotate scenarios
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setActiveScenario((prev) => (prev + 1) % scenarios.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, scenarios.length]);

  const currentScenario = scenarios[activeScenario];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="landing-container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI-Powered Consultation</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Your Personal
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> AI Brand Coach</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get instant, personalized guidance from our advanced AI that understands your unique brand challenges and provides actionable solutions.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - AI Visualization */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* AI Brain Visualization */}
            <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Central AI Brain */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-12 w-12 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-white mb-2">AI Personal Brand Intelligence</h3>
                <p className="text-blue-200 mb-6">Processing your personal brand data in real-time</p>

                {/* Capability Badges */}
                <div className="flex flex-wrap gap-2 justify-center ml-12">
                  {[
                    { icon: Zap, label: "Instant Analysis" },
                    { icon: Target, label: "Personalized Strategy" },
                    { icon: TrendingUp, label: "Growth Insights" }
                  ].map((capability, index) => (
                    <motion.div
                      key={capability.label}
                      className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <capability.icon className="h-3 w-3 text-blue-300" />
                      <span className="text-xs text-white">{capability.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating Data Points */}
              {[
                { icon: Users, value: "2.5M+", label: "Profiles Analyzed", position: "top-4 right-4" },
                { icon: MessageCircle, value: "98%", label: "Accuracy Rate", position: "bottom-4 left-4" },
                { icon: Clock, value: "<30s", label: "Response Time", position: "top-4 left-4" }
              ].map((stat, _index) => (
                <motion.div
                  key={stat.label}
                  className={`absolute ${stat.position} bg-white/10 backdrop-blur-sm rounded-lg p-3`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + _index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-blue-300" />
                    <div>
                      <div className="text-white font-bold text-sm">{stat.value}</div>
                      <div className="text-blue-200 text-xs">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Interactive Consultation Demo */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Scenario Selector */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Live Consultation Demo</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="gap-2"
                >
                  {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              </div>
            </div>

            {/* Scenario Tabs */}
            <div className="flex gap-2 mb-6">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenario(index)}
                  className={`flex-1 p-3 rounded-lg text-sm font-medium transition-all ${
                    activeScenario === index
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  <scenario.icon className="h-4 w-4 mx-auto mb-1" />
                  {scenario.title}
                </button>
              ))}
            </div>

            {/* Active Consultation */}
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Question */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">You asked:</p>
                      <p className="text-gray-700">{currentScenario.question}</p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`w-8 h-8 bg-gradient-to-r ${currentScenario.color} rounded-full flex items-center justify-center flex-shrink-0`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Brain className="h-4 w-4 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="font-medium text-gray-900">AI Brand Coach</p>
                        <Badge variant="secondary" className="text-xs">
                          <Sparkles className="h-2 w-2 mr-1" />
                          AI-Powered
                        </Badge>
                      </div>
                      <motion.p
                        key={activeScenario}
                        className="text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {currentScenario.response}
                      </motion.p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <motion.div
                    className="mt-6 grid grid-cols-3 gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {Object.entries(currentScenario.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{value}</div>
                        <div className="text-xs text-gray-600 capitalize">{key}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link to="/audit">
                  Start Your AI Consultation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Get personalized insights in under 5 minutes
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Key Features */}
        <motion.div
          className="mt-20 grid md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: Video,
              title: "Face-to-Face Sessions",
              description: "Real-time video consultations with our AI coach"
            },
            {
              icon: Brain,
              title: "Advanced AI Analysis",
              description: "Deep learning algorithms analyze your brand data"
            },
            {
              icon: Target,
              title: "Personalized Strategy",
              description: "Custom recommendations based on your goals"
            },
            {
              icon: Star,
              title: "Proven Results",
              description: "Average 150% improvement in brand metrics"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 rounded-xl bg-white shadow-sm border hover:shadow-md transition-shadow"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AIConsultationSection;