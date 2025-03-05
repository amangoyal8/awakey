
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LogOut, Menu, X, User, Settings, FileText, Briefcase, Shield } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

type UserRole = 'candidate' | 'manager' | 'admin';

interface UserData {
  email?: string;
  avatarUrl?: string;
  role?: UserRole;
}

export function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the initial session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('email, avatar_url, role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        setUser({ email: "" });
        return;
      }

      if (data) {
        let avatarUrl;
        if (data.avatar_url) {
          try {
            const { data: avatarData } = await supabase.storage
              .from('avatars')
              .getPublicUrl(data.avatar_url);
              
            if (avatarData) {
              avatarUrl = avatarData.publicUrl;
            }
          } catch (error) {
            console.error("Error getting avatar URL:", error);
          }
        }
        
        setUser({ 
          email: data.email || "",
          avatarUrl: avatarUrl,
          role: data.role as UserRole
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser({ email: "" });
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Successfully logged out");
      navigate("/");
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error(error.message || "Error logging out");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Helper function to get role badge color
  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'candidate':
      default:
        return 'secondary';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">HiringDash</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          
          <Link to="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
            Jobs
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              
              {/* Role-specific navigation links */}
              {user?.role === 'candidate' && (
                <>
                  <Link to="/applications" className="text-sm font-medium transition-colors hover:text-primary">
                    My Applications
                  </Link>
                </>
              )}
              
              {user?.role === 'manager' && (
                <>
                  <Link to="/jobs/manage" className="text-sm font-medium transition-colors hover:text-primary">
                    Manage Jobs
                  </Link>
                  <Link to="/applications/review" className="text-sm font-medium transition-colors hover:text-primary">
                    Review Applications
                  </Link>
                </>
              )}
              
              {user?.role === 'admin' && (
                <Link to="/admin/approvals" className="text-sm font-medium transition-colors hover:text-primary">
                  Manager Approvals
                </Link>
              )}
              
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user?.avatarUrl || ""} alt="User" />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user?.email?.charAt(0).toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            <div className="flex items-center justify-between">
                              <span>My Account</span>
                              {user?.role && (
                                <Badge variant={getRoleBadgeVariant(user.role)} className="ml-2 capitalize">
                                  {user.role}
                                </Badge>
                              )}
                            </div>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => navigate("/user-profile")}>
                            <User className="h-4 w-4 mr-2" />
                            User Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate("/settings")}>
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Log out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 animate-fade-in">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/jobs" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Briefcase className="h-4 w-4 inline mr-2" />
              Jobs
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4 inline mr-2" />
                  Dashboard
                </Link>
                
                {/* Role-specific navigation links */}
                {user?.role === 'candidate' && (
                  <>
                    <Link 
                      to="/applications" 
                      className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileText className="h-4 w-4 inline mr-2" />
                      My Applications
                    </Link>
                  </>
                )}
                
                {user?.role === 'manager' && (
                  <>
                    <Link 
                      to="/jobs/manage" 
                      className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Briefcase className="h-4 w-4 inline mr-2" />
                      Manage Jobs
                    </Link>
                    <Link 
                      to="/applications/review" 
                      className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FileText className="h-4 w-4 inline mr-2" />
                      Review Applications
                    </Link>
                  </>
                )}
                
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin/approvals" 
                    className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="h-4 w-4 inline mr-2" />
                    Manager Approvals
                  </Link>
                )}
                
                <Link 
                  to="/user-profile" 
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 inline mr-2" />
                  User Profile
                </Link>
                <Link 
                  to="/settings" 
                  className="block py-2 text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Settings className="h-4 w-4 inline mr-2" />
                  Settings
                </Link>
                <div className="pt-2 border-t border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">
                      Signed in as {user?.email}
                    </p>
                    {user?.role && (
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                        {user.role}
                      </Badge>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t border-border/40 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild 
                  className="w-full justify-start"
                >
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild 
                  className="w-full justify-start"
                >
                  <Link 
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
