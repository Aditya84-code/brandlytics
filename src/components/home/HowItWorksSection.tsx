import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Clock,
  Zap,
  Link as LinkIcon,
  Brain,
  Target,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const steps = [
    {
      id: 1,
      icon: LinkIcon,
      title: "Step 1",
      subtitle: "Connect Your Profiles",
      description: "Link your social media accounts and provide basic information about your professional background for comprehensive analysis.",
      features: [
        "LinkedIn & Instagram Analysis",
        "Professional background setup",
        "Privacy-focused data collection"
      ],
      duration: "30 seconds"
    },
    {
      id: 2,
      icon: Brain,
      title: "Step 2", 
      subtitle: "AI Analysis Engine",
      description: "Our advanced AI scans your digital presence, analyzing content quality, consistency, and competitive positioning across platforms.",
      features: [
        "Content quality assessment",
        "Brand consistency analysis", 
        "Competitive benchmarking"
      ],
      duration: "2 minutes"
    },
    {
      id: 3,
      icon: Target,
      title: "Step 3",
      subtitle: "Get Actionable Insights",
      description: "Receive a comprehensive report with personalized recommendations and strategies to elevate your personal brand effectively.",
      features: [
        "Detailed scoring metrics",
        "Custom recommendations",
        "Growth strategy roadmap"
      ],
      duration: "Instant"
    },
    {
      id: 4,
      icon: MessageCircle,
      title: "Step 4",
      subtitle: "AI Coach Consultation",
      description: "Schedule a personalized video consultation with our AI brand coach for expert guidance and strategic planning sessions.",
      features: [
        "Face-to-face AI coaching",
        "Personalized strategy session",
        "Implementation guidance"
      ],
      duration: "5 minutes"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white">
      <div className="landing-container px-4 md:px-6">
        <div className="relative bg-gray-50 rounded-3xl p-8 md:p-16 overflow-hidden border border-gray-200">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-16 h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border-r border-b border-dotted border-gray-300"></div>
              ))}
            </div>
          </div>
          
          {/* Corner Plus Icons */}
          <div className="absolute top-8 left-8 text-gray-400">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-l-2 border-t-2 border-dotted border-gray-400"></div>
              <div className="absolute top-0 left-2 w-2 h-0.5 bg-gray-400"></div>
              <div className="absolute left-0 top-2 w-0.5 h-2 bg-gray-400"></div>
            </div>
          </div>
          <div className="absolute top-8 right-8 text-gray-400">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-r-2 border-t-2 border-dotted border-gray-400"></div>
              <div className="absolute top-0 right-2 w-2 h-0.5 bg-gray-400"></div>
              <div className="absolute right-0 top-2 w-0.5 h-2 bg-gray-400"></div>
            </div>
          </div>
          <div className="absolute bottom-8 left-8 text-gray-400">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-l-2 border-b-2 border-dotted border-gray-400"></div>
              <div className="absolute bottom-0 left-2 w-2 h-0.5 bg-gray-400"></div>
              <div className="absolute left-0 bottom-2 w-0.5 h-2 bg-gray-400"></div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 text-gray-400">
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 border-r-2 border-b-2 border-dotted border-gray-400"></div>
              <div className="absolute bottom-0 right-2 w-2 h-0.5 bg-gray-400"></div>
              <div className="absolute right-0 bottom-2 w-0.5 h-2 bg-gray-400"></div>
            </div>
          </div>

          <div className="relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                How it <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> works </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Brandlytics acts as your personal brand optimization platform—analyzing your digital presence, 
                providing actionable insights, and delivering personalized coaching to elevate your professional image.
              </p>
            </motion.div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Grid Border */}
                  <div className="absolute inset-0 border border-dotted border-gray-400 rounded-lg group-hover:border-blue-400 transition-colors"></div>
                  
                  <div className="relative p-6 h-full bg-white/50 backdrop-blur-sm rounded-lg group-hover:bg-white/80 transition-all">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg border-2 border-blue-500 bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <step.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    
                    {/* Step Title */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                      <h4 className="text-xl font-bold text-gray-900">{step.subtitle}</h4>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm mb-6">
                      {step.description}
                    </p>
                    
                    {/* Features List */}
                    <div className="space-y-2 mb-4">
                      {step.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm text-gray-700"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.05 + 0.3 }}
                        >
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">{step.duration}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Progress Indicator */}
            <motion.div
              className="flex justify-center mt-12 space-x-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-blue-500"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
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
                  Start Your Journey
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Transform Your Personal Brand?
              </h3>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who've elevated their digital presence with our AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-white/90 gap-2 px-8"
                >
                  <Link to="/audit">
                    Start Your Free Analysis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-blue-100">
                  <Zap className="h-4 w-4" />
                  <span className="text-sm">No credit card required • 5-minute setup</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;