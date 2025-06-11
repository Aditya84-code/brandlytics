import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, X, MessageCircle, Timer, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  queries: z.array(z.string().min(1, 'Query cannot be empty')).min(1, 'At least one query is required').max(5, 'Maximum 5 queries allowed'),
});

interface ScheduleMeetFormProps {
  isOpen: boolean;
  onClose: () => void;
  userSummary: string;
  userName: string;
}

const ScheduleMeetForm = ({ isOpen, onClose, userSummary, userName }: ScheduleMeetFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState<string[]>(['']);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userName || '',
      queries: [''],
    },
  });

  const addQuery = () => {
    if (queries.length < 5) {
      const newQueries = [...queries, ''];
      setQueries(newQueries);
      form.setValue('queries', newQueries);
    }
  };

  const removeQuery = (index: number) => {
    if (queries.length > 1) {
      const newQueries = queries.filter((_, i) => i !== index);
      setQueries(newQueries);
      form.setValue('queries', newQueries);
    }
  };

  const updateQuery = (index: number, value: string) => {
    const newQueries = [...queries];
    newQueries[index] = value;
    setQueries(newQueries);
    form.setValue('queries', newQueries);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Filter out empty queries
      const validQueries = values.queries.filter(query => query.trim() !== '');
      
      if (validQueries.length === 0) {
        toast({
          title: 'Error',
          description: 'Please add at least one query.',
          variant: 'destructive',
        });
        return;
      }

      // Create conversation context with 5-minute session note
      const conversationalContext = `
        User Name: ${values.name}
        
        Session Duration: 5 minutes (this is a brief consultation)
        
        Brand Analysis Summary:
        ${userSummary}
        
        User's Specific Questions:
        ${validQueries.map((query, index) => `${index + 1}. ${query}`).join('\n')}
        
        Please provide concise, actionable brand coaching based on their analysis and address their specific questions. 
        Keep responses focused and efficient given the 5-minute time limit.
      `;

      // Call Supabase edge function to create Tavus conversation
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-tavus-conversation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_name: `Brand Coaching Session - ${values.name}`,
          conversational_context: conversationalContext,
          custom_greeting: `Hello ${values.name}! I'm your AI brand coach. I've reviewed your brand analysis and I'm here to help you improve your personal brand in our 5-minute session. Let's make the most of our time together and discuss your questions!`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create conversation');
      }

      const conversationData = await response.json();

      // Store conversation data and navigate to meeting
      localStorage.setItem('tavus-conversation', JSON.stringify({
        ...conversationData,
        userName: values.name,
        queries: validQueries,
      }));

      toast({
        title: 'Meeting Scheduled!',
        description: 'Redirecting you to your 5-minute AI coach consultation...',
      });

      setTimeout(() => {
        navigate('/ai-coach-meeting');
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Error creating conversation:', error);
      toast({
        title: 'Error',
        description: 'Failed to schedule meeting. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Schedule 5-Minute AI Coach Meeting
          </DialogTitle>
          <DialogDescription>
            Prepare for your personalized brand coaching session
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Brand Summary</CardTitle>
                <CardDescription>
                  This summary will be shared with your AI coach
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="max-h-40 overflow-y-auto rounded-lg bg-muted p-4 text-sm">
                  <div dangerouslySetInnerHTML={{ __html: userSummary }} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Timer className="h-5 w-5 text-blue-600" />
                  5-Minute Session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Focused & Efficient</p>
                    <p className="text-sm text-blue-700">
                      Your session is limited to 5 minutes to ensure focused, actionable advice
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5 border-blue-300 text-blue-700">Auto-End</Badge>
                  <p className="text-sm text-blue-700">
                    The session will automatically end after 5 minutes with a 1-minute warning
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meeting Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <p className="text-sm">Prepare specific, focused questions about your brand challenges</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <p className="text-sm">Have a quiet environment for the video call</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <p className="text-sm">Take notes during the session for future reference</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">4</Badge>
                  <p className="text-sm">Make the most of your 5-minute consultation</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Your Questions (Max 5)</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addQuery}
                      disabled={queries.length >= 5}
                      className="gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Question
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {queries.map((query, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <div className="flex-1">
                          <Textarea
                            placeholder={`Question ${index + 1}: e.g., How can I improve my LinkedIn engagement quickly?`}
                            value={query}
                            onChange={(e) => updateQuery(index, e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        {queries.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeQuery(index)}
                            className="mt-0 shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                    <p className="text-sm text-amber-700">
                      <strong>Tip:</strong> Keep questions specific and actionable to get the most value from your 5-minute session.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Meeting...
                      </>
                    ) : (
                      'Start 5-Min Meeting'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeetForm;