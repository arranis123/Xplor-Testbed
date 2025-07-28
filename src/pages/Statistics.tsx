import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Eye, 
  Users, 
  Clock, 
  Globe, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  MapPin,
  Download,
  Share,
  Filter,
  ChevronUp,
  ChevronDown,
  Activity,
  FileText
} from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Statistics = () => {
  // Sample data for charts
  const viewsData = [
    { date: "Jan 1", views: 245, uniqueViews: 189 },
    { date: "Jan 2", views: 312, uniqueViews: 234 },
    { date: "Jan 3", views: 189, uniqueViews: 145 },
    { date: "Jan 4", views: 428, uniqueViews: 321 },
    { date: "Jan 5", views: 567, uniqueViews: 423 },
    { date: "Jan 6", views: 389, uniqueViews: 298 },
    { date: "Jan 7", views: 445, uniqueViews: 334 },
  ];

  const deviceData = [
    { name: "Desktop", value: 65, color: "#fbbf24" },
    { name: "Mobile", value: 25, color: "#374151" },
    { name: "Tablet", value: 10, color: "#9ca3af" },
  ];

  const locationData = [
    { country: "United States", views: 1247, percentage: 45 },
    { country: "Canada", views: 567, percentage: 20 },
    { country: "United Kingdom", views: 389, percentage: 14 },
    { country: "Germany", views: 298, percentage: 11 },
    { country: "France", views: 223, percentage: 8 },
    { country: "Others", views: 145, percentage: 5 },
  ];

  const engagementData = [
    { metric: "Average Session Duration", value: "4:32", change: "+12%", trend: "up" },
    { metric: "Bounce Rate", value: "23.4%", change: "-5.2%", trend: "down" },
    { metric: "Pages per Session", value: "3.8", change: "+8.1%", trend: "up" },
    { metric: "Return Visitors", value: "34.2%", change: "+15.3%", trend: "up" },
  ];

  const topSpaces = [
    { name: "Downtown Office Tour", views: 1247, uniqueViews: 934, avgTime: "5:23", thumbnail: "🏢" },
    { name: "Luxury Apartment Showcase", views: 1089, uniqueViews: 823, avgTime: "4:15", thumbnail: "🏠" },
    { name: "Restaurant Virtual Tour", views: 856, uniqueViews: 645, avgTime: "3:47", thumbnail: "🍽️" },
    { name: "Retail Store Experience", views: 743, uniqueViews: 567, avgTime: "3:12", thumbnail: "🛍️" },
    { name: "Hotel Suite Walkthrough", views: 689, uniqueViews: 498, avgTime: "4:38", thumbnail: "🏨" },
  ];

  return (
    <div className="p-6 space-y-8 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Statistics & Analytics</h1>
          <p className="text-muted-foreground">Track performance and engagement across all your spaces</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="7days">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log('Exporting to Excel...')}>
                <FileText className="h-4 w-4 mr-2" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Exporting to PDF...')}>
                <Download className="h-4 w-4 mr-2" />
                Export to PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-xplor-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12,847</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+18.2%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-xplor-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8,432</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+12.5%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Time</CardTitle>
            <Clock className="h-4 w-4 text-xplor-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4:23</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+8.7%</span>
              <span className="text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Spaces</CardTitle>
            <Globe className="h-4 w-4 text-xplor-yellow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+2</span>
              <span className="text-muted-foreground ml-1">new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Over Time */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Views Over Time</CardTitle>
            <CardDescription>Daily views and unique visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stackId="1" 
                  stroke="hsl(var(--xplor-yellow))" 
                  fill="hsl(var(--xplor-yellow))" 
                  fillOpacity={0.3}
                  name="Total Views"
                />
                <Area 
                  type="monotone" 
                  dataKey="uniqueViews" 
                  stackId="2" 
                  stroke="hsl(var(--xplor-black))" 
                  fill="hsl(var(--xplor-black))" 
                  fillOpacity={0.3}
                  name="Unique Views"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Device Usage</CardTitle>
            <CardDescription>How visitors access your spaces</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="engagement" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="spaces">Top Spaces</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {engagementData.map((item) => (
              <Card key={item.metric} className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-2">{item.value}</div>
                  <div className="flex items-center text-sm">
                    {item.trend === "up" ? (
                      <ChevronUp className="h-3 w-3 text-green-600 mr-1" />
                    ) : (
                      <ChevronDown className="h-3 w-3 text-red-600 mr-1" />
                    )}
                    <span className={item.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {item.change}
                    </span>
                    <span className="text-muted-foreground ml-1">this week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Geography Tab */}
        <TabsContent value="geography">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Visitor Locations</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locationData.map((location) => (
                  <div key={location.country} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{location.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium text-foreground">{location.views.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{location.percentage}%</div>
                      </div>
                      <div className="w-20">
                        <Progress value={location.percentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Spaces Tab */}
        <TabsContent value="spaces">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Top Performing Spaces</CardTitle>
              <CardDescription>Your most viewed and engaging spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSpaces.map((space, index) => (
                  <div key={space.name} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-xl">
                        {space.thumbnail}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{space.name}</h3>
                        <p className="text-sm text-muted-foreground">Avg. time: {space.avgTime}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-right">
                      <div>
                        <div className="font-medium text-foreground">{space.views.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Views</div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{space.uniqueViews.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Unique Views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Real-time Tab */}
        <TabsContent value="realtime">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Activity className="h-5 w-5 text-green-500" />
                Real-time Analytics
              </CardTitle>
              <CardDescription>Live activity on your spaces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">47</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-xplor-yellow">12</div>
                  <div className="text-sm text-muted-foreground">Active Spaces</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">3:42</div>
                  <div className="text-sm text-muted-foreground">Avg. Session</div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-foreground mb-4">Current Activity</h4>
                <div className="space-y-3">
                  {[
                    { space: "Downtown Office Tour", users: 12, location: "New York, US" },
                    { space: "Luxury Apartment Showcase", users: 8, location: "Los Angeles, US" },
                    { space: "Restaurant Virtual Tour", users: 6, location: "Toronto, CA" },
                    { space: "Retail Store Experience", users: 4, location: "London, UK" },
                  ].map((activity) => (
                    <div key={activity.space} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium text-foreground">{activity.space}</div>
                        <div className="text-sm text-muted-foreground">{activity.location}</div>
                      </div>
                      <Badge variant="secondary">
                        {activity.users} active
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;