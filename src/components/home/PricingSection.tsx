import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PricingTier } from '@/types';
import { Link } from 'react-router-dom';

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for individuals starting their brand journey.',
    features: [
      'Basic brand audit',
      '1 scan per month',
      'Single platform analysis',
      'Core recommendations',
      'Email report',
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'For professionals serious about their personal brand.',
    features: [
      'Everything in Free',
      'Weekly brand scans',
      'Multi-platform analysis',
      'Detailed recommendations',
      'Export to PDF/CSV',
      'Competitor comparison',
      'Content quality analysis',
    ],
    buttonText: 'Go Pro',
    recommended: true,
  },
  {
    name: 'Business',
    price: '$49',
    description: 'For teams and business professionals.',
    features: [
      'Everything in Pro',
      'Daily brand monitoring',
      'Team collaboration',
      'Advanced analytics',
      'White-label reports',
      'API access',
      'Custom metrics tracking',
      'Priority support',
    ],
    buttonText: 'Get Business',
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="container space-y-12 py-20 md:py-32">
      <div className="text-center">
        <motion.h2 
          className="mb-4 text-3xl font-bold tracking-tight md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Choose the Right Plan for You
        </motion.h2>
        <motion.p 
          className="mx-auto max-w-[800px] text-muted-foreground md:text-lg"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Simple, transparent pricing that grows with your brand
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            className={`relative flex flex-col rounded-xl border ${
              tier.recommended
                ? 'border-primary shadow-lg'
                : 'border-border'
            } bg-card p-6 transition-all duration-200 hover:shadow-md`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {tier.recommended && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Most Popular
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <div className="mt-2">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.price !== '$0' && <span className="text-muted-foreground">/month</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
            </div>

            <ul className="mb-6 space-y-3">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <Button 
                asChild 
                className={`w-full ${tier.recommended ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Link to="/audit">{tier.buttonText}</Link>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-3xl rounded-xl border p-6 text-center">
        <h3 className="text-xl font-bold">Need a custom solution?</h3>
        <p className="mt-2 text-muted-foreground">
          Contact us for tailored enterprise pricing and features.
        </p>
        <Button variant="outline" className="mt-4">
          Contact Sales
        </Button>
      </div>
    </section>
  );
};

export default PricingSection;