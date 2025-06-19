import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Target,
  TrendingUp,
  BarChart,
  Search,
  Crown,
  EyeOff,
  UserX,
  Hash,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PainPointsSolutionsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const painPoints = [
    {
      id: 1,
      icon: EyeOff,
      title: "Low Online Visibility",
      description: "Your content gets lost in the noise, and potential clients can't find you online, limiting your professional opportunities and growth."
    },
    {
      id: 2,
      icon: Hash,
      title: "Inconsistent Brand Message",
      description: "Your brand feels scattered across platforms, confusing your audience about who you are and what value you provide."
    },
    {
      id: 3,
      icon: TrendingDown,
      title: "Poor Engagement Rates",
      description: "Your posts get minimal likes, comments, and shares despite your efforts to create content, reducing your reach and impact."
    },
    {
      id: 4,
      icon: UserX,
      title: "No Clear Competitive Edge",
      description: "You blend in with everyone else in your industry, making it hard to stand out and win business in a crowded market."
    }
  ];

  const solutions = [
    {
      id: 1,
      icon: Search,
      title: "SEO-Optimized Brand Strategy",
      description: "Strategic keyword optimization and content positioning that puts you in front of your ideal audience with measurable results."
    },
    {
      id: 2,
      icon: Target,
      title: "Unified Brand Identity",
      description: "Cohesive messaging and visual identity that tells your story consistently across all platforms, building trust and recognition."
    },
    {
      id: 3,
      icon: TrendingUp,
      title: "Engagement-Driven Content",
      description: "Data-backed content strategies that spark conversations and build genuine community engagement with your target audience."
    },
    {
      id: 4,
      icon: Crown,
      title: "Unique Value Positioning",
      description: "Discover and amplify what makes you uniquely valuable, creating a distinct competitive advantage in your industry."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="landing-container px-4 md:px-6">
        {/* Problems Section - Dark Background */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="relative bg-gray-900 rounded-3xl p-8 md:p-16 overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-dotted border-gray-600"></div>
                ))}
              </div>
            </div>
            
            {/* Corner Plus Icons */}
            <div className="absolute top-8 left-8 text-gray-600">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-l-2 border-t-2 border-dotted border-gray-600"></div>
                <div className="absolute top-0 left-2 w-2 h-0.5 bg-gray-600"></div>
                <div className="absolute left-0 top-2 w-0.5 h-2 bg-gray-600"></div>
              </div>
            </div>
            <div className="absolute top-8 right-8 text-gray-600">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-r-2 border-t-2 border-dotted border-gray-600"></div>
                <div className="absolute top-0 right-2 w-2 h-0.5 bg-gray-600"></div>
                <div className="absolute right-0 top-2 w-0.5 h-2 bg-gray-600"></div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-gray-600">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-l-2 border-b-2 border-dotted border-gray-600"></div>
                <div className="absolute bottom-0 left-2 w-2 h-0.5 bg-gray-600"></div>
                <div className="absolute left-0 bottom-2 w-0.5 h-2 bg-gray-600"></div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 text-gray-600">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-r-2 border-b-2 border-dotted border-gray-600"></div>
                <div className="absolute bottom-0 right-2 w-2 h-0.5 bg-gray-600"></div>
                <div className="absolute right-0 bottom-2 w-0.5 h-2 bg-gray-600"></div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-red-500/20 text-red-400 border-red-500/30 backdrop-blur-sm">
                  The Problem Today
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Personal Brand Challenges Are
                  <span className="block text-red-400">Holding You Back</span>
                </h2>
                <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                  Professionals struggle with brand visibility—content gets lost, messaging is inconsistent, and standing out is nearly impossible. 
                  These challenges limit career growth and business opportunities.
                </p>
              </div>

              {/* Problems Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {painPoints.map((problem, index) => (
                  <motion.div
                    key={problem.id}
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Grid Border */}
                    <div className="absolute inset-0 border border-dotted border-gray-600 rounded-lg"></div>
                    
                    <div className="relative p-6 h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-12 h-12 rounded-lg border-2 border-red-500 bg-red-500/10 flex items-center justify-center">
                          <problem.icon className="h-6 w-6 text-red-400" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-4">{problem.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">
                        {problem.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solutions Section - Light Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative bg-white rounded-3xl p-8 md:p-16 overflow-hidden border border-gray-200">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-dotted border-gray-400"></div>
                ))}
              </div>
            </div>
            
            {/* Corner Plus Icons */}
            <div className="absolute top-8 left-8 text-gray-300">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-l-2 border-t-2 border-dotted border-gray-300"></div>
                <div className="absolute top-0 left-2 w-2 h-0.5 bg-gray-300"></div>
                <div className="absolute left-0 top-2 w-0.5 h-2 bg-gray-300"></div>
              </div>
            </div>
            <div className="absolute top-8 right-8 text-gray-300">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-r-2 border-t-2 border-dotted border-gray-300"></div>
                <div className="absolute top-0 right-2 w-2 h-0.5 bg-gray-300"></div>
                <div className="absolute right-0 top-2 w-0.5 h-2 bg-gray-300"></div>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 text-gray-300">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-l-2 border-b-2 border-dotted border-gray-300"></div>
                <div className="absolute bottom-0 left-2 w-2 h-0.5 bg-gray-300"></div>
                <div className="absolute left-0 bottom-2 w-0.5 h-2 bg-gray-300"></div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 text-gray-300">
              <div className="w-4 h-4 relative">
                <div className="absolute inset-0 border-r-2 border-b-2 border-dotted border-gray-300"></div>
                <div className="absolute bottom-0 right-2 w-2 h-0.5 bg-gray-300"></div>
                <div className="absolute right-0 bottom-2 w-0.5 h-2 bg-gray-300"></div>
              </div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-16">
                <Badge className="mb-4 bg-green-500/20 text-green-600 border-green-500/30 backdrop-blur-sm">
                  Brandlytics Solves This
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                  The Complete Solution for
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Personal Brand Success
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Providing AI-powered, data-driven brand optimization that transforms your digital presence 
                  and positions you as a leader in your industry.
                </p>
              </div>

              {/* Solutions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={solution.id}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    {/* Grid Border */}
                    <div className="absolute inset-0 border border-dotted border-gray-300 rounded-lg group-hover:border-blue-300 transition-colors"></div>
                    
                    <div className="relative p-6 h-full">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-12 h-12 rounded-lg border-2 border-green-500 bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                          <solution.icon className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {solution.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-yellow-300" />
                <span className="text-sm font-medium text-blue-100 uppercase tracking-wide">
                  Transform Your Brand Today
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Solve Your Brand Challenges?
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've transformed their personal brand obstacles into competitive advantages.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 gap-2 px-8"
                >
                  <Link to="/audit">
                    Start Your Brand Transformation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-blue-100">
                  <BarChart className="h-4 w-4" />
                  <span className="text-sm">Free analysis • 5-minute setup</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PainPointsSolutionsSection;