import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FolderOpen, Camera, Globe, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    { title: "Total Spaces", value: "24", icon: FolderOpen, color: "text-blue-600" },
    { title: "Public Spaces", value: "18", icon: Globe, color: "text-green-600" },
    { title: "Capture Sessions", value: "12", icon: Camera, color: "text-purple-600" },
    { title: "Views This Month", value: "2,847", icon: BarChart3, color: "text-xplor-yellow" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your spaces.</p>
        </div>
        <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
          <Plus className="h-4 w-4 mr-2" />
          New Space
        </Button>
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
            </CardContent>
          </Card>
        ))}
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
            <Button variant="outline" className="w-full justify-start">
              <FolderOpen className="h-4 w-4 mr-2" />
              Upload New Space
            </Button>
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
    </div>
  );
};

export default Dashboard;