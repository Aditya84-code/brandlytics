import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import SocialProfilesForm from '@/components/forms/SocialProfilesForm';
import PreferencesForm from '@/components/forms/PreferencesForm';
import { FormData } from '@/types';
import { ChevronLeft, ChevronRight, Brain, Zap, BarChart3, Search, Target, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { calculateOverallScore } from '@/utils/brandAnalysis';

const WEBHOOK_URL = 'https://motivatrix7.app.n8n.cloud/webhook/226738f5-daa8-45fe-8e79-c6f8b08d654e';

const AuditForm = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formSchema = z.object({
    personalInfo: z.object({
      name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
      profession: z.string().min(2, { message: 'Profession is required' }),
      email: z.string().email({ message: 'Please enter a valid email' }),
    }),
    socialProfiles: z.object({
      linkedin: z.string().url({ message: 'Please enter a valid LinkedIn URL' }).optional().or(z.literal('')),
      instagram: z.string().url({ message: 'Please enter a valid Instagram URL' }).optional().or(z.literal('')),
    }),
    preferences: z.object({
      industry: z.string().min(1, { message: 'Please select an industry' }),
      goals: z.array(z.string()).min(1, { message: 'Please select at least one goal' }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        profession: '',
        email: '',
      },
      socialProfiles: {
        linkedin: '',
        instagram: '',
      },
      preferences: {
        industry: '',
        goals: [],
      },
    },
  });

  const nextStep = async () => {
    if (step === 1) {
      const result = await form.trigger('personalInfo');
      if (!result) return;
      setStep(2);
    } else if (step === 2) {
      const result = await form.trigger('socialProfiles');
      if (!result) return;
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Prepare webhook data
      const webhookData = {
        fullName: data.personalInfo.name,
        email: data.personalInfo.email,
        instagramUrl: data.socialProfiles.instagram,
        linkedinUrl: data.socialProfiles.linkedin
      };

      // Send data to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      // Wait for webhook response
      const webhookResponse = await response.json();
      
      // Ensure overall score exists
      if (webhookResponse.scores && !webhookResponse.scores.overall) {
        webhookResponse.scores.overall = calculateOverallScore({
          consistency: webhookResponse.scores.consistency,
          contentQuality: webhookResponse.scores.contentQuality,
          visibility: webhookResponse.scores.visibility,
          competitive: webhookResponse.scores.competitive
        });
      }
      
      // Store both form data and webhook response
      localStorage.setItem('brandlytics-audit-data', JSON.stringify({
        formData: data,
        webhookResponse
      }));
      
      toast({
        title: 'Audit request submitted!',
        description: 'Redirecting to your brand analysis dashboard...',
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error submitting audit',
        description: 'Please try again later',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  };

  // Custom Loading Animation Component
  const LoadingAnimation = () => {
    const analysisSteps = [
      { icon: Search, text: "Scanning social profiles...", delay: 0 },
      { icon: Brain, text: "Analyzing brand consistency...", delay: 1 },
      { icon: BarChart3, text: "Calculating visibility metrics...", delay: 2 },
      { icon: Target, text: "Benchmarking competitors...", delay: 3 },
      { icon: TrendingUp, text: "Generating recommendations...", delay: 4 },
      { icon: Zap, text: "Finalizing your report...", delay: 5 }
    ];

    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Analyzing Your Brand
            </h3>
            <p className="text-gray-600 text-sm">
              Our AI is processing your data to create a comprehensive brand audit
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span>Processing...</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 6, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Analysis Steps */}
          <div className="space-y-3">
            {analysisSteps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg"
                initial={{ opacity: 0.3, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  backgroundColor: ["rgba(59, 130, 246, 0.05)", "rgba(59, 130, 246, 0.1)", "rgba(59, 130, 246, 0.05)"]
                }}
                transition={{ 
                  delay: step.delay * 0.8,
                  duration: 0.5,
                  backgroundColor: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    delay: step.delay * 0.8,
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <step.icon className="h-4 w-4 text-white" />
                </motion.div>
                <motion.span
                  className="text-sm font-medium text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: step.delay * 0.8 + 0.2 }}
                >
                  {step.text}
                </motion.span>
                <motion.div
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: step.delay * 0.8 + 0.5 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Bottom Message */}
          <motion.div
            className="text-center mt-6 pt-4 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <p className="text-xs text-gray-500">
              This usually takes 30-60 seconds
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div
        className="container flex min-h-[calc(100vh-4rem)] items-center justify-center py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Personal Brand Audit</CardTitle>
            <CardDescription className="text-center">
              Complete the form below to receive your comprehensive brand analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="relative mx-auto flex w-full max-w-lg justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className="relative z-10 flex flex-col items-center bg-background"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                        stepNumber === step
                          ? 'border-primary bg-primary text-primary-foreground'
                          : stepNumber < step
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-muted-foreground bg-muted text-muted-foreground'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="mt-2 text-xs">
                      {stepNumber === 1
                        ? 'Personal Info'
                        : stepNumber === 2
                        ? 'Social Profiles'
                        : 'Preferences'}
                    </span>
                  </div>
                ))}
                <div className="absolute left-0 top-5 -z-10 h-[2px] w-full bg-muted">
                  <motion.div
                    className="h-full bg-[hsl(244,75%,67%)]"
                    initial={{ width: '0%' }}
                    animate={{
                      width: step === 1 ? '0%' : step === 2 ? '50%' : '100%',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {step === 1 && <PersonalInfoForm form={form} />}
                {step === 2 && <SocialProfilesForm form={form} />}
                {step === 3 && <PreferencesForm form={form} />}

                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </Button>

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} className="gap-1">
                      Next <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button disabled={isSubmitting} type="submit" className="gap-2 min-w-[200px]">
                      {isSubmitting ? (
                        <>
                          <Brain className="h-4 w-4" />
                          Generating Report...
                        </>
                      ) : (
                        'Submit & Generate Report'
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Custom Loading Animation Overlay */}
      {isSubmitting && <LoadingAnimation />}
    </>
  );
};

export default AuditForm;