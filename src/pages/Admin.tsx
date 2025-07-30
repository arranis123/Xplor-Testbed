import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, FileText, Building, Settings, BarChart3, AlertTriangle, RefreshCw, Database, Zap, MapPin } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "sonner";
import UserManagement from "@/components/admin/UserManagement";
import TourManagement from "@/components/admin/TourManagement";
import SpaceManagement from "@/components/admin/SpaceManagement";
import HotelManagement from "@/components/admin/HotelManagement";
import CategoryManagement from "@/components/admin/CategoryManagement";
import StorageMonitoring from "@/components/admin/StorageMonitoring";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import SystemSettings from "@/components/admin/SystemSettings";


export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  
  // Allow access for authorized admin emails (temporary fix) or development mode
  const isDevelopment = import.meta.env.DEV;
  const shouldAllowAccess = isAdmin || user?.email === 'info@xplor.io' || isDevelopment;
  
  useEffect(() => {
    if (!isLoading && !shouldAllowAccess && user) {
      toast.error("Access denied. Admin privileges required.");
      
      // Only navigate away if user is logged in but not admin
      if (user && user.email !== 'info@xplor.io') {
        setTimeout(() => navigate("/"), 3000);
      }
    }
  }, [shouldAllowAccess, isLoading, navigate, user]);

  if (isLoading && !shouldAllowAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div className="text-center">
          <div className="font-medium">Loading admin panel...</div>
          <div className="text-sm text-muted-foreground mt-1">
            Verifying admin privileges for {user?.email}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
        <div className="text-center">
          <h2 className="text-xl font-semibold">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to access the admin console.</p>
          <Button 
            onClick={() => navigate("/")} 
            className="mt-4"
            variant="outline"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (!shouldAllowAccess) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
          <Shield className="h-16 w-16 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold">Access Denied</h2>
            <p className="text-muted-foreground max-w-md">
              Admin privileges are required to access this console.
            </p>
            {user.email && (
              <p className="text-sm text-muted-foreground">
                Logged in as: <span className="font-mono">{user.email}</span>
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate("/")}
              variant="default"
            >
              Return Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const adminTabs = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "spaces", label: "Spaces", icon: MapPin },
    { id: "tours", label: "Tours", icon: FileText },
    { id: "hotels", label: "Hotels", icon: Building },
    { id: "categories", label: "Categories", icon: Settings },
    { id: "storage", label: "Storage", icon: Database },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "system", label: "System", icon: Zap },
  ];

  const stats = [
    { label: "Total Users", value: "2,348", change: "+12%", icon: Users },
    { label: "Active Tours", value: "1,234", change: "+8%", icon: FileText },
    { label: "Storage Used", value: "45.2 GB", change: "+5%", icon: Database },
    { label: "Monthly Revenue", value: "$12,480", change: "+15%", icon: BarChart3 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Console</h1>
            <p className="text-muted-foreground">
              Welcome, {user.email} • Manage your platform and users
            </p>
          </div>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          Admin Access Active
        </Badge>
      </div>


      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-9">
          {adminTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change} from last month
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button onClick={() => setActiveTab("users")} variant="outline" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
                <Button onClick={() => setActiveTab("spaces")} variant="outline" className="justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Manage Spaces
                </Button>
                <Button onClick={() => setActiveTab("system")} variant="outline" className="justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button onClick={() => setActiveTab("analytics")} variant="outline" className="justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Platform health overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="default">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage</span>
                  <Badge variant="default">75% Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">CDN</span>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Background Jobs</span>
                  <Badge variant="default">Running</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="spaces">
          <SpaceManagement />
        </TabsContent>

        <TabsContent value="tours">
          <TourManagement />
        </TabsContent>

        <TabsContent value="hotels">
          <HotelManagement />
        </TabsContent>

        <TabsContent value="categories">
          <CategoryManagement />
        </TabsContent>

        <TabsContent value="storage">
          <StorageMonitoring />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="system">
          <SystemSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}