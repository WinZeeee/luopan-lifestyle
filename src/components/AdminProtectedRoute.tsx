
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminAuth = async () => {
      // First check if the user was previously authenticated as admin
      const storedAuth = localStorage.getItem("adminAuthenticated") === "true";
      
      if (!storedAuth) {
        setIsAuthenticated(false);
        return;
      }
      
      // Verify that the user is still logged in with Supabase
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        localStorage.removeItem("adminAuthenticated");
        setIsAuthenticated(false);
        return;
      }
      
      // Use the RPC function to check admin status safely
      try {
        const { data: isAdmin, error } = await supabase
          .rpc('is_admin')
          .single();
        
        if (error || !isAdmin) {
          localStorage.removeItem("adminAuthenticated");
          await supabase.auth.signOut();
          setIsAuthenticated(false);
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Admin verification error:", error);
        localStorage.removeItem("adminAuthenticated");
        await supabase.auth.signOut();
        setIsAuthenticated(false);
      }
    };
    
    checkAdminAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
