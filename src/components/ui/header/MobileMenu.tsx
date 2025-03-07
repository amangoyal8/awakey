
import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, User, Settings, FileText, Briefcase, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUnreadApplications } from "@/hooks/useUnreadApplications";

type UserRole = 'candidate' | 'manager' | 'admin';

interface UserData {
  email?: string;
  avatarUrl?: string;
  role?: UserRole;
}

interface MobileMenuProps {
  isAuthenticated: boolean;
  user: UserData | null;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

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

export function MobileMenu({ isAuthenticated, user, isOpen, onClose, onLogout }: MobileMenuProps) {
  const { unreadCount } = useUnreadApplications();
  const isManager = user?.role === 'manager';
  const hasUnread = isManager && unreadCount > 0;

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border/40 animate-fade-in">
      <div className="container py-4 space-y-4">
        <Link 
          to="/jobs" 
          className="block py-2 text-sm font-medium transition-colors hover:text-primary"
          onClick={onClose}
        >
          <Briefcase className="h-4 w-4 inline mr-2" />
          Jobs
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link 
              to="/dashboard" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={onClose}
            >
              <LayoutDashboard className="h-4 w-4 inline mr-2" />
              Dashboard
            </Link>
            
            <Link 
              to="/user-profile" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={onClose}
            >
              <User className="h-4 w-4 inline mr-2" />
              User Profile
            </Link>
            <Link 
              to="/settings" 
              className="block py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={onClose}
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
                  onLogout();
                  onClose();
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
                onClick={onClose}
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
                onClick={onClose}
              >
                Sign up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
