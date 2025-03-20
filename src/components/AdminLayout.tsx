
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { LayoutDashboard, BookOpen, LogOut } from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  const handleTabChange = (value: string) => {
    navigate(`/admin/${value}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-bold">Luopan Crafts Admin</h1>
          <Button variant="ghost" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      <div className="container py-4">
        <Tabs defaultValue="dashboard" onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="blog" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Blog Management
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <main className="py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
