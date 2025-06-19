import { motion } from 'framer-motion';
import { Feature } from '@/types';
import { Users, TrendingUp, Zap, Shield, Globe, BarChart2 } from 'lucide-react';

const features: Feature[] = [
  {
    id: '1',
    title: 'Cross-Platform Analysis',
    description: 'Analyze and compare your presence across LinkedIn, Instagram.',
    icon: Globe,
  },
  {
    id: '2',
    title: 'Real-Time Brand Monitoring',
    description: 'Get instant insights into how your brand is perceived with continuous monitoring.',
    icon: TrendingUp,
  },
  {
    id: '3',
    title: 'AI-Powered Insights',
    description: 'Our AI analyzes your content quality, engagement patterns, and brand consistency.',
    icon: Zap,
  },
  {
    id: '4',
    title: 'Competitive Benchmarking',
    description: 'See how your personal brand stacks up against industry peers and competitors.',
    icon: Users,
  },
  {
    id: '5',
    title: 'Detailed Analytics',
    description: 'Dive deep into metrics that matter with comprehensive data visualizations.',
    icon: BarChart2,
  },
  {
    id: '6',
    title: 'Secure Data Processing',
    description: 'Your data is processed securely and never shared with third parties.',
    icon: Shield,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="landing-container space-y-12 py-20 md:py-32 lg:py-40">
      <div className="text-center space-y-4 lg:space-y-6">
        <motion.h2 
          className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features for Your <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Personal Brand Success </span>
        </motion.h2>
        <motion.p 
          className="mx-auto max-w-[800px] text-muted-foreground md:text-lg lg:text-xl leading-relaxed"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Every tool you need to analyze, optimize, and elevate your personal brand
        </motion.p>
      </div>
      <motion.div 
        className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={item}
            className="rounded-xl border bg-card p-6 lg:p-8 transition-all hover:shadow-md"
          >
            <div className="mb-4 lg:mb-6 inline-flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <feature.icon className="h-6 w-6 lg:h-7 lg:w-7" />
            </div>
            <h3 className="mb-2 lg:mb-3 text-xl lg:text-2xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed lg:text-lg">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;