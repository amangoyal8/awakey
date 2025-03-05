
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/ui/Header";
import { Dashboard } from "@/components/ui/Dashboard";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated with Supabase
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          toast.error("Please log in to access the dashboard");
          navigate("/login");
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth error:", error);
        toast.error("Authentication error");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
        if (!session) {
          navigate("/login");
        }
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        {isAuthenticated && <Dashboard />}
      </main>
    </div>
  );
};

export default DashboardPage;
