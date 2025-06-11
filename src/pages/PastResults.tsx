import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  BarChart, 
  TrendingUp, 
  Eye,
  Download,
  Search,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { getBrandAudits, getBrandResults } from '@/lib/database';
import type { BrandAudit, BrandResult } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface AuditWithResult extends BrandAudit {
  result?: BrandResult;
}

const PastResults = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [audits, setAudits] = useState<AuditWithResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
      return;
    }

    if (user) {
      loadPastResults();
    }
  }, [user, authLoading, navigate]);

  const loadPastResults = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Get all brand audits for the user
      const brandAudits = await getBrandAudits(user.id);
      
      // Get all brand results for the user
      const brandResults = await getBrandResults(user.id);
      
      // Combine audits with their results
      const auditsWithResults: AuditWithResult[] = brandAudits.map(audit => {
        const result = brandResults.find(r => r.audit_id === audit.id);
        return { ...audit, result };
      });

      setAudits(auditsWithResults);
    } catch (error: any) {
      console.error('Error loading past results:', error);
      toast({
        title: 'Error',
        description: 'Failed to load past results. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const viewResult = (audit: AuditWithResult) => {
    if (audit.result) {
      // Store the audit data in localStorage to view in dashboard
      const auditData = {
        formData: {
          personalInfo: audit.personal_info,
          socialProfiles: audit.social_profiles,
          preferences: audit.preferences
        },
        webhookResponse: audit.result.webhook_response,
        auditId: audit.id
      };
      
      localStorage.setItem('brandlytics-audit-data', JSON.stringify(auditData));
      navigate('/dashboard');
    }
  };

  const filteredAndSortedAudits = audits
    .filter(audit => {
      const matchesSearch = searchTerm === '' || 
        audit.personal_info.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        audit.personal_info.profession.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'score-high':
          return (b.result?.scores.overall || 0) - (a.result?.scores.overall || 0);
        case 'score-low':
          return (a.result?.scores.overall || 0) - (b.result?.scores.overall || 0);
        default:
          return 0;
      }
    });

  if (authLoading || loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading your past results...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="container px-4 py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Past Results</h1>
            <p className="text-muted-foreground">
              View and manage your previous brand audit results
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/audit">New Audit</Link>
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or profession..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="score-high">Highest Score</SelectItem>
                <SelectItem value="score-low">Lowest Score</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      {filteredAndSortedAudits.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BarChart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {audits.length === 0 ? 'No audit results found' : 'No results match your filters'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {audits.length === 0 
                ? 'Start your first brand audit to see results here.'
                : 'Try adjusting your search or filter criteria.'
              }
            </p>
            {audits.length === 0 && (
              <Button asChild>
                <Link to="/audit">Start Your First Audit</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedAudits.map((audit, index) => (
            <motion.div
              key={audit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{audit.personal_info.name}</CardTitle>
                      <CardDescription>{audit.personal_info.profession}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(audit.status)}
                      <Badge variant="outline" className={getStatusColor(audit.status)}>
                        {audit.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Overall Score */}
                  {audit.result && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className={`text-2xl font-bold ${getOverallScoreColor(audit.result.scores.overall)}`}>
                        {audit.result.scores.overall}
                      </span>
                    </div>
                  )}

                  {/* Audit Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(audit.created_at).toLocaleDateString()}</span>
                  </div>

                  {/* Industry */}
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{audit.preferences.industry}</Badge>
                    <Badge variant="outline">{audit.preferences.goals.length} goals</Badge>
                  </div>

                  {/* Quick Stats */}
                  {audit.result && (
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{audit.result.scores.consistency}</div>
                        <div className="text-muted-foreground">Consistency</div>
                      </div>
                      <div className="text-center p-2 bg-muted rounded">
                        <div className="font-medium">{audit.result.scores.visibility}</div>
                        <div className="text-muted-foreground">Visibility</div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    {audit.status === 'completed' && audit.result ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => viewResult(audit)}
                          className="flex-1 gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                        >
                          <Download className="h-3 w-3" />
                          Export
                        </Button>
                      </>
                    ) : audit.status === 'processing' ? (
                      <Button size="sm" disabled className="flex-1">
                        <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        Processing...
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled className="flex-1">
                        <AlertCircle className="mr-2 h-3 w-3" />
                        Failed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {audits.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Summary Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{audits.length}</div>
                <div className="text-sm text-muted-foreground">Total Audits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {audits.filter(a => a.status === 'completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {audits.filter(a => a.status === 'processing').length}
                </div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">
                  {audits.filter(a => a.result).length > 0 
                    ? Math.round(audits.filter(a => a.result).reduce((sum, a) => sum + (a.result?.scores.overall || 0), 0) / audits.filter(a => a.result).length)
                    : 0
                  }
                </div>
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default PastResults;