import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LearnMore = () => {
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          asChild
          className="mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="mb-6 text-4xl font-bold">About Brandlytics</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-semibold">Why Personal Branding Matters</h2>
            <p className="text-lg text-muted-foreground">
              In today's digital age, your personal brand is your most valuable asset. It's how you're perceived online, 
              and it can make the difference between landing your dream job, attracting ideal clients, or being overlooked.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">How Brandlytics Helps</h2>
            <div className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Brandlytics uses advanced AI algorithms to analyze your online presence across multiple platforms, providing:
              </p>
              <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
                <li>Comprehensive brand audits</li>
                <li>Real-time monitoring of your online presence</li>
                <li>Competitive analysis against industry peers</li>
                <li>Actionable recommendations for improvement</li>
                <li>Detailed analytics and performance metrics</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Our Technology</h2>
            <p className="text-lg text-muted-foreground">
              We combine machine learning, natural language processing, and data analytics to provide you with 
              actionable insights about your personal brand. Our platform continuously learns and adapts to 
              changing digital trends to keep your brand ahead of the curve.
            </p>
          </section>

          <div className="mt-12 rounded-xl bg-primary/5 p-8">
            <h2 className="mb-4 text-2xl font-semibold">Ready to Transform Your Brand?</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Start your free brand audit today and discover how you can improve your digital presence.
            </p>
            <Button asChild size="lg">
              <Link to="/audit">Start Free Audit</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LearnMore;