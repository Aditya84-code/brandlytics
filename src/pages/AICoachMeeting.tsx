import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  Settings,
  MessageCircle,
  Clock,
  User,
  Loader2,
  ExternalLink,
  AlertTriangle,
  Timer
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConversationData {
  conversation_id: string;
  conversation_url: string;
  conversation_name: string;
  status: string;
  userName: string;
  queries: string[];
}

const MEETING_DURATION = 300; // 5 minutes in seconds

const AICoachMeeting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meetingStarted, setMeetingStarted] = useState(false);
  const [isEndingCall, setIsEndingCall] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(MEETING_DURATION);
  const [autoEndWarningShown, setAutoEndWarningShown] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('tavus-conversation');
    
    if (!storedData) {
      toast({
        title: 'No meeting found',
        description: 'Please schedule a meeting first.',
        variant: 'destructive',
      });
      navigate('/dashboard');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setConversationData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error parsing conversation data:', error);
      navigate('/dashboard');
    }
  }, [navigate, toast]);

  // Session timer and auto-end logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (meetingStarted && !isEndingCall) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          const remaining = MEETING_DURATION - newTime;
          setTimeRemaining(remaining);

          // Show warning at 1 minute remaining
          if (remaining === 60 && !autoEndWarningShown) {
            setAutoEndWarningShown(true);
            toast({
              title: 'Meeting ending soon',
              description: 'Your session will automatically end in 1 minute.',
              variant: 'destructive',
            });
          }

          // Auto-end the call when time is up
          if (remaining <= 0) {
            handleAutoEnd();
            return newTime;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [meetingStarted, isEndingCall, autoEndWarningShown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeRemaining = (seconds: number) => {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeRemainingColor = () => {
    if (timeRemaining <= 60) return 'text-red-500';
    if (timeRemaining <= 120) return 'text-amber-500';
    return 'text-green-500';
  };

  const handleAutoEnd = async () => {
    if (isEndingCall) return;
    
    toast({
      title: 'Session time limit reached',
      description: 'Your 5-minute consultation has ended automatically.',
      variant: 'destructive',
    });
    
    await endMeeting(true);
  };

  const startMeeting = () => {
    setMeetingStarted(true);
    setSessionTime(0);
    setTimeRemaining(MEETING_DURATION);
    setAutoEndWarningShown(false);
  };

  const openInNewTab = () => {
    if (conversationData?.conversation_url) {
      window.open(conversationData.conversation_url, '_blank', 'noopener,noreferrer');
      setMeetingStarted(true);
      setSessionTime(0);
      setTimeRemaining(MEETING_DURATION);
      setAutoEndWarningShown(false);
    }
  };

  const endMeeting = async (isAutoEnd = false) => {
    if (!conversationData) return;

    try {
      setIsEndingCall(true);

      // Call Supabase edge function to end Tavus conversation
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/end-tavus-conversation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation_id: conversationData.conversation_id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to end conversation');
      }

      const result = await response.json();
      console.log('Conversation ended:', result);

      // Clean up local storage
      localStorage.removeItem('tavus-conversation');
      
      if (!isAutoEnd) {
        toast({
          title: 'Meeting ended successfully',
          description: `Session duration: ${formatTime(sessionTime)}. Thank you for your consultation!`,
        });
      }

      // Navigate back to dashboard
      navigate('/dashboard');

    } catch (error) {
      console.error('Error ending conversation:', error);
      toast({
        title: 'Error ending call',
        description: 'The call may have ended, but there was an issue with cleanup.',
        variant: 'destructive',
      });
      
      // Still navigate back even if there was an error
      localStorage.removeItem('tavus-conversation');
      navigate('/dashboard');
    } finally {
      setIsEndingCall(false);
    }
  };

  const handleIframeError = () => {
    setIframeError(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading your meeting...</p>
        </div>
      </div>
    );
  }

  if (!conversationData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Meeting not found</h2>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              disabled={isEndingCall}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-semibold">AI Brand Coach Session</h1>
              <p className="text-sm text-muted-foreground">
                {conversationData.userName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {meetingStarted && (
              <>
                <Badge variant="outline\" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(sessionTime)}
                </Badge>
                <Badge variant="outline" className={`gap-1 ${getTimeRemainingColor()}`}>
                  <Timer className="h-3 w-3" />
                  {formatTimeRemaining(timeRemaining)} left
                </Badge>
              </>
            )}
            <Badge variant="outline" className="gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              {meetingStarted ? 'In Session' : 'Ready'}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6">
        {!meetingStarted ? (
          /* Pre-meeting Setup */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Ready to Meet Your AI Coach?
                </CardTitle>
                <CardDescription>
                  Your personalized brand coaching session is about to begin
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Session Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Participant:</strong> {conversationData.userName}</p>
                      <p><strong>Session ID:</strong> {conversationData.conversation_id}</p>
                      <p><strong>Duration:</strong> 5 minutes</p>
                      <p><strong>Status:</strong> {conversationData.status}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Your Questions
                    </h3>
                    <div className="space-y-1">
                      {conversationData.queries.map((query, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {index + 1}. {query}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <div className="flex items-start gap-3">
                    <Timer className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">5-Minute Session Limit</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        Your consultation will automatically end after 5 minutes to ensure efficient use of time. 
                        You'll receive a 1-minute warning before the session ends.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-muted p-4">
                  <h4 className="font-medium mb-2">Before you start:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Ensure your camera and microphone are working</li>
                    <li>• Find a quiet, well-lit environment</li>
                    <li>• Have a notepad ready for key insights</li>
                    <li>• The AI coach has reviewed your brand analysis</li>
                    <li>• Make the most of your 5-minute session</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button
                    onClick={startMeeting}
                    size="lg"
                    className="gap-2"
                  >
                    <Video className="h-5 w-5" />
                    Start 5-Minute Meeting
                  </Button>
                  <Button
                    onClick={openInNewTab}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    Open in New Tab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Meeting Interface */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Time Warning Banner */}
            {timeRemaining <= 60 && timeRemaining > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg bg-red-50 border border-red-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <Timer className="h-5 w-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-red-800">Session Ending Soon</h4>
                    <p className="text-sm text-red-700">
                      Your consultation will automatically end in {formatTimeRemaining(timeRemaining)}.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Video Call Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
              {iframeError ? (
                /* Fallback UI when iframe fails */
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
                  <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Connection Issue</h3>
                  <p className="text-center text-gray-300 mb-6 max-w-md">
                    The video call couldn't load in this window. Please use the button below to open it in a new tab.
                  </p>
                  <Button
                    onClick={openInNewTab}
                    variant="outline"
                    className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open Meeting in New Tab
                  </Button>
                </div>
              ) : (
                <>
                  <iframe
                    src={conversationData.conversation_url}
                    className="h-full w-full"
                    allow="camera; microphone; fullscreen; display-capture; autoplay"
                    title="AI Coach Video Call"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
                    onError={handleIframeError}
                    onLoad={() => {
                      // Check if iframe loaded successfully
                      setTimeout(() => {
                        try {
                          const iframe = document.querySelector('iframe[title="AI Coach Video Call"]') as HTMLIFrameElement;
                          if (iframe && !iframe.contentDocument) {
                            setIframeError(true);
                          }
                        } catch (e) {
                          setIframeError(true);
                        }
                      }, 3000);
                    }}
                  />
                  
                  {/* Meeting Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                        title="Toggle Microphone"
                      >
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                        title="Toggle Camera"
                      >
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={openInNewTab}
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30"
                        title="Open in New Tab"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => endMeeting(false)}
                        disabled={isEndingCall}
                        variant="destructive"
                        size="icon"
                        className="h-10 w-10 rounded-full"
                        title="End Call"
                      >
                        {isEndingCall ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Phone className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* End Call Confirmation */}
              {isEndingCall && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <div className="rounded-lg bg-background p-6 text-center">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-2 font-medium">Ending conversation...</p>
                    <p className="text-sm text-muted-foreground">Please wait</p>
                  </div>
                </div>
              )}
            </div>

            {/* Connection Help */}
            {iframeError && (
              <Card className="border-yellow-200 bg-yellow-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Having trouble connecting?</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Some browsers block embedded video calls. Try opening the meeting in a new tab for the best experience.
                      </p>
                      <Button
                        onClick={openInNewTab}
                        variant="outline"
                        size="sm"
                        className="mt-2 gap-1 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open in New Tab
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Session Info */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Session Time</span>
                  </div>
                  <p className="text-2xl font-bold">{formatTime(sessionTime)}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Time Left</span>
                  </div>
                  <p className={`text-2xl font-bold ${getTimeRemainingColor()}`}>
                    {formatTimeRemaining(timeRemaining)}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Questions</span>
                  </div>
                  <p className="text-2xl font-bold">{conversationData.queries.length}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Coach Status</span>
                  </div>
                  <p className="text-sm font-medium text-green-600">Active</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Session Controls</h3>
                    <p className="text-sm text-muted-foreground">
                      Your session will automatically end after 5 minutes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={openInNewTab}
                      variant="outline"
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      New Tab
                    </Button>
                    <Button
                      onClick={() => endMeeting(false)}
                      disabled={isEndingCall}
                      variant="destructive"
                      className="gap-2"
                    >
                      {isEndingCall ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Ending Call...
                        </>
                      ) : (
                        <>
                          <Phone className="h-4 w-4" />
                          End Call
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AICoachMeeting;