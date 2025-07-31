import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FolderOpen, Camera, Globe, Plus, TrendingUp, Users, Crown, Zap, ChevronDown, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { UploadSpaceDialog } from "@/components/UploadSpaceDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Dashboard = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  
  const stats = [
    { title: "Total Spaces", value: "24", icon: FolderOpen, color: "text-blue-600", change: "+12%" },
    { title: "Public Spaces", value: "18", icon: Globe, color: "text-green-600", change: "+8%" },
    { title: "Capture Sessions", value: "12", icon: Camera, color: "text-purple-600", change: "+25%" },
    { title: "Views This Month", value: "2,847", icon: BarChart3, color: "text-xplor-yellow", change: "+18%" },
  ];

  // Subscription plan data
  const subscriptionData = {
    plan: "Professional",
    spacesUsed: 24,
    spacesLimit: 50,
    storageUsed: 45.8, // GB
    storageLimit: 100, // GB
    teamMembers: 3,
    teamLimit: 10,
    monthlyViews: 2847,
    viewsLimit: 10000
  };

  // Chart data
  const spaceTypeData = [
    { name: 'Public', value: 18, color: '#10B981' },
    { name: 'Private', value: 6, color: '#6366F1' },
  ];

  const monthlyUsageData = [
    { month: 'Jan', spaces: 15, views: 1200 },
    { month: 'Feb', spaces: 18, views: 1800 },
    { month: 'Mar', spaces: 22, views: 2100 },
    { month: 'Apr', spaces: 24, views: 2847 },
  ];

  const planFeatures = [
    { feature: "Spaces", used: subscriptionData.spacesUsed, limit: subscriptionData.spacesLimit },
    { feature: "Storage (GB)", used: subscriptionData.storageUsed, limit: subscriptionData.storageLimit },
    { feature: "Team Members", used: subscriptionData.teamMembers, limit: subscriptionData.teamLimit },
    { feature: "Monthly Views", used: subscriptionData.monthlyViews, limit: subscriptionData.viewsLimit },
  ];

  const COLORS = ['#10B981', '#6366F1'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your spaces.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Crown className="h-4 w-4" />
            {subscriptionData.plan}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                <Plus className="h-4 w-4 mr-2" />
                New Space
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("real-estate");
                  setUploadDialogOpen(true);
                }}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Real Estate
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("yacht");
                  setUploadDialogOpen(true);
                }}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Yacht
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("hotel-resort");
                  setUploadDialogOpen(true);
                }}
              >
                <FolderOpen className="h-4 w-4 mr-2" />
                Hotel/Resort
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("car");
                  setUploadDialogOpen(true);
                }}
              >
                <Car className="h-4 w-4 mr-2" />
                Cars & Vehicles
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subscription Plan Overview */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Subscription Plan - {subscriptionData.plan}
          </CardTitle>
          <CardDescription>Your current plan usage and limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {planFeatures.map((item) => (
              <div key={item.feature} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.feature}</span>
                  <span className="font-medium">
                    {typeof item.used === 'number' && item.used % 1 !== 0 
                      ? item.used.toFixed(1) 
                      : item.used
                    } / {item.limit}
                  </span>
                </div>
                <Progress 
                  value={(item.used / item.limit) * 100} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  {Math.round((item.used / item.limit) * 100)}% used
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Space Distribution Pie Chart */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Space Distribution</CardTitle>
            <CardDescription>Breakdown of your public vs private spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spaceTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {spaceTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Usage Trends */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>Spaces and views over the last 4 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="spaces" 
                    stackId="1" 
                    stroke="#6366F1" 
                    fill="#6366F1" 
                    fillOpacity={0.6}
                    name="Spaces"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stackId="2" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.6}
                    name="Views"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Spaces</CardTitle>
            <CardDescription>Your most recently updated spaces</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Downtown Office Tour", updated: "2 hours ago", views: "124" },
              { name: "Luxury Apartment Showcase", updated: "1 day ago", views: "89" },
              { name: "Restaurant Virtual Tour", updated: "3 days ago", views: "256" },
            ].map((space) => (
              <div key={space.name} className="flex items-center justify-between p-3 border border-border rounded-md">
                <div>
                  <p className="font-medium text-foreground">{space.name}</p>
                  <p className="text-sm text-muted-foreground">Updated {space.updated}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{space.views} views</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
            <CardDescription>Common tasks and tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Camera className="h-4 w-4 mr-2" />
              Schedule Capture Service
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Upload New Space
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("real-estate");
                    setUploadDialogOpen(true);
                  }}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Real Estate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("yacht");
                    setUploadDialogOpen(true);
                  }}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Yacht
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("hotel-resort");
                    setUploadDialogOpen(true);
                  }}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Hotel/Resort
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("car");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Car className="h-4 w-4 mr-2" />
                  Cars & Vehicles
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-2" />
              Manage Public Spaces
            </Button>
          </CardContent>
        </Card>
      </div>

      <UploadSpaceDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        category={selectedCategory}
      />
    </div>
  );
};

export default Dashboard;