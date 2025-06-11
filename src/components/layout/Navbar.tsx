import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, User, Settings, LogOut, History } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut, loading } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navItems = [
    { name: 'Features', id: 'features' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Testimonials', id: 'testimonials' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getUserDisplayName = () => {
    if (profile?.username) return profile.username;
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getUserInitials = () => {
    if (profile?.username) return profile.username[0].toUpperCase();
    if (profile?.full_name) return profile.full_name[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return 'U';
  };

  // Generate a consistent mock avatar URL based on user email
  const getMockAvatarUrl = () => {
    if (user?.email) {
      // Use a deterministic avatar service that generates consistent avatars
      const seed = user.email.split('@')[0];
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=6366f1&radius=50`;
    }
    return null;
  };

  // Get the best available avatar URL with fallbacks
  const getAvatarUrl = () => {
    // First try the profile avatar URL
    if (profile?.avatar_url) {
      return profile.avatar_url;
    }
    
    // Then try user metadata avatar
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    
    // Finally use mock avatar
    return getMockAvatarUrl();
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <motion.div 
        className="bg-white/95 backdrop-blur-md rounded-full border border-gray-200/50 shadow-lg"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex items-center"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src="https://i.postimg.cc/kXNBmVqF/Chat-GPT-Image-Jun-9-2025-05-26-29-PM-1.png" 
                  alt="Brandlytics Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-3 text-lg font-semibold text-foreground">Brandlytics</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
              </div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={getAvatarUrl() || ''} 
                        alt={getUserDisplayName()}
                        onError={(e) => {
                          // If image fails to load, try the mock avatar
                          const target = e.target as HTMLImageElement;
                          const mockUrl = getMockAvatarUrl();
                          if (mockUrl && target.src !== mockUrl) {
                            target.src = mockUrl;
                          }
                        }}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={getAvatarUrl() || ''} 
                        alt={getUserDisplayName()}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const mockUrl = getMockAvatarUrl();
                          if (mockUrl && target.src !== mockUrl) {
                            target.src = mockUrl;
                          }
                        }}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{getUserDisplayName()}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/past-results" className="flex items-center">
                      <History className="mr-2 h-4 w-4" />
                      <span>Past Results</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center text-red-600 focus:text-red-600"
                    onSelect={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  asChild 
                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Link to="/signin">Log in</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
                >
                  <Link to="/signup">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            className="border-t border-border bg-white/95 backdrop-blur-md rounded-b-3xl p-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block py-2 text-left text-sm font-medium text-foreground hover:text-primary"
                >
                  {item.name}
                </button>
              ))}
              {loading ? (
                <div className="h-8 w-full animate-pulse rounded bg-muted" />
              ) : user ? (
                <>
                  <div className="flex items-center gap-3 py-2 border-t border-border pt-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={getAvatarUrl() || ''} 
                        alt={getUserDisplayName()}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const mockUrl = getMockAvatarUrl();
                          if (mockUrl && target.src !== mockUrl) {
                            target.src = mockUrl;
                          }
                        }}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{getUserDisplayName()}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/past-results"
                    className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <History className="h-4 w-4" />
                    Past Results
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <Link
                    to="/signin"
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </motion.div>
    </header>
  );
};