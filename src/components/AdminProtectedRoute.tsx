
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
      
      // Verify that the user is still an admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', data.session.user.id)
        .single();
      
      if (profileError || !profileData || !profileData.is_admin) {
        localStorage.removeItem("adminAuthenticated");
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        return;
      }
      
      setIsAuthenticated(true);
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
