import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Crown, Zap, Star } from 'lucide-react';
import { PricingTier } from '@/types';
import { Link } from 'react-router-dom';

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for individuals exploring their personal brand potential.',
    features: [
      'Basic brand audit (1 per month)',
      'Single platform analysis',
      'Core brand score metrics',
      'Basic recommendations',
      'Email report delivery',
      'Community support',
    ],
    buttonText: 'Start Free',
  },
  {
    name: 'Professional',
    price: '$29',
    description: 'For professionals serious about building their personal brand presence.',
    features: [
      'Everything in Starter',
      'Unlimited brand audits',
      'Multi-platform analysis (LinkedIn, Instagram)',
      'Advanced AI recommendations',
      'Competitor benchmarking',
      'Content optimization insights',
      'Export to PDF/CSV',
      'Priority email support',
      'Monthly trend reports',
    ],
    buttonText: 'Go Professional',
    recommended: true,
  },
  {
    name: 'Enterprise',
    price: '$59',
    description: 'For teams and business leaders who need comprehensive brand intelligence.',
    features: [
      'Everything in Professional',
      'AI Coach video consultations',
      'Real-time brand monitoring',
      'Team collaboration tools',
      'Advanced analytics dashboard',
      'Custom brand metrics',
      'White-label reports',
      'API access for integrations',
      'Dedicated account manager',
      'Custom training sessions',
    ],
    buttonText: 'Get Enterprise',
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="landing-container">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Simple Pricing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Brand Growth Plan
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free and scale as you grow. Every plan includes our core brand analysis tools 
            with advanced features for serious personal brand builders.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`relative group ${tier.recommended ? 'lg:scale-105' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Recommended Badge */}
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`relative h-full rounded-3xl border-2 bg-white p-8 shadow-lg transition-all duration-300 ${
                tier.recommended
                  ? 'border-blue-200 shadow-blue-100/50 group-hover:shadow-blue-200/50'
                  : 'border-gray-200 group-hover:border-gray-300 group-hover:shadow-xl'
              }`}>
                {/* Background Gradient for Recommended */}
                {tier.recommended && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl" />
                )}

                <div className="relative z-10">
                  {/* Plan Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tier.name === 'Starter' 
                          ? 'bg-green-100 text-green-600'
                          : tier.name === 'Professional'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {tier.name === 'Starter' && <Zap className="h-6 w-6" />}
                        {tier.name === 'Professional' && <Star className="h-6 w-6" />}
                        {tier.name === 'Enterprise' && <Crown className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                        {tier.recommended && (
                          <div className="text-sm text-blue-600 font-medium">Recommended</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900">{tier.price}</span>
                        {tier.price !== '$0' && (
                          <span className="text-lg text-gray-500 font-medium">/month</span>
                        )}
                      </div>
                      {tier.price !== '$0' && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed monthly • Cancel anytime
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">{tier.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <div className="space-y-4">
                      {tier.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            tier.recommended 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-green-100 text-green-600'
                          }`}>
                            <Check className="h-3 w-3 font-bold" />
                          </div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      asChild 
                      className={`w-full py-6 text-base font-semibold rounded-xl transition-all duration-300 ${
                        tier.recommended
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                          : tier.name === 'Enterprise'
                          ? 'bg-gray-900 hover:bg-gray-800 text-white'
                          : 'bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Link to="/audit" className="flex items-center justify-center gap-2">
                        {tier.buttonText}
                        {tier.recommended && <Sparkles className="h-4 w-4" />}
                      </Link>
                    </Button>
                    
                    {tier.price === '$0' && (
                      <p className="text-center text-sm text-gray-500 mt-3">
                        No credit card required
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                  Enterprise Solutions
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                For large teams, agencies, or custom integrations, we offer tailored enterprise 
                solutions with dedicated support and custom features.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8"
                >
                  Contact Sales
                </Button>
                <div className="flex items-center gap-2 text-gray-300">
                  <Check className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Custom pricing available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Teaser */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4">
            Have questions about our pricing?
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Check className="h-4 w-4 text-green-500" />
              <span>No setup fees</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;