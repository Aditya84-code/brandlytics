import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import AuditForm from '@/pages/AuditForm';
import LearnMore from '@/pages/LearnMore';
import NotFound from '@/pages/NotFound';
import SignIn from '@/pages/auth/SignIn';
import SignUp from '@/pages/auth/SignUp';
import UserProfile from '@/pages/auth/UserProfile';
import AICoachMeeting from '@/pages/AICoachMeeting';
import PastResults from '@/pages/PastResults';
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="audit" element={<AuditForm />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="learn-more" element={<LearnMore />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="ai-coach-meeting" element={<AICoachMeeting />} />
            <Route path="past-results" element={<PastResults />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;