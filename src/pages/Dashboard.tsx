import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, FolderOpen, Camera, Globe, Plus, TrendingUp, Users, Crown, Zap, ChevronDown, Car, MapPin, Compass, Palette, GraduationCap, Plane, Building, ShoppingBag, Landmark, Clapperboard, TreePine, MapPin as Golf, Home, Ship, Hotel, Building2, Anchor, Factory, Train, Utensils, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { UploadSpaceDialog } from "@/components/UploadSpaceDialog";
import { CarUploadDialog } from "@/components/CarUploadDialog";
import { SchoolEducationUploadDialog } from "@/components/SchoolEducationUploadDialog";
import { AviationUploadDialog } from "@/components/AviationUploadDialog";
import OfficesShowroomsStudiosUploadDialog from "@/components/OfficesShowroomsStudiosUploadDialog";
import RetailPopUpUploadDialog from "@/components/RetailPopUpUploadDialog";
import HeritageWorshipUploadDialog from "@/components/HeritageWorshipUploadDialog";
import SetsStagesVenuesUploadDialog from "@/components/SetsStagesVenuesUploadDialog";
import SportsStadiumsThemeParksUploadDialog from "@/components/SportsStadiumsThemeParksUploadDialog";
import GolfCourseUploadDialog from "@/components/GolfCourseUploadDialog";
import GovHospitalUploadDialog from "@/components/GovHospitalUploadDialog";
import MerchantShippingUploadDialog from "@/components/MerchantShippingUploadDialog";
import ManufacturingFacilityUploadDialog from "@/components/ManufacturingFacilityUploadDialog";
import MaritimeInfrastructureUploadDialog from "@/components/MaritimeInfrastructureUploadDialog";
import CruiseShipUploadDialog from "@/components/CruiseShipUploadDialog";
import TrainTramUploadDialog from "@/components/TrainTramUploadDialog";
import RestaurantBarUploadDialog from "@/components/RestaurantBarUploadDialog";
import UAEDevelopmentUploadDialog from "@/components/UAEDevelopmentUploadDialog";
import DevelopmentUploadDialog from "@/components/DevelopmentUploadDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [carUploadDialogOpen, setCarUploadDialogOpen] = useState(false);
  const [showMerchantShippingDialog, setShowMerchantShippingDialog] = useState(false);
  const [showManufacturingFacilityDialog, setShowManufacturingFacilityDialog] = useState(false);
  const [showMaritimeInfrastructureDialog, setShowMaritimeInfrastructureDialog] = useState(false);
  const [showCruiseShipDialog, setShowCruiseShipDialog] = useState(false);
  const [showTrainTramDialog, setShowTrainTramDialog] = useState(false);
  const [showRestaurantBarDialog, setShowRestaurantBarDialog] = useState(false);
  const [showUAEDevelopmentDialog, setShowUAEDevelopmentDialog] = useState(false);
  const [showDevelopmentDialog, setShowDevelopmentDialog] = useState(false);
  const [schoolEducationDialogOpen, setSchoolEducationDialogOpen] = useState(false);
  const [aviationDialogOpen, setAviationDialogOpen] = useState(false);
  const [officesShowroomsStudiosUploadDialogOpen, setOfficesShowroomsStudiosUploadDialogOpen] = useState(false);
  const [retailPopUpUploadDialogOpen, setRetailPopUpUploadDialogOpen] = useState(false);
  const [heritageWorshipUploadDialogOpen, setHeritageWorshipUploadDialogOpen] = useState(false);
  const [setsStagesVenuesUploadDialogOpen, setSetsStagesVenuesUploadDialogOpen] = useState(false);
  const [sportsStadiumsThemeParksUploadDialogOpen, setSportsStadiumsThemeParksUploadDialogOpen] = useState(false);
  const [golfCourseUploadDialogOpen, setGolfCourseUploadDialogOpen] = useState(false);
  const [govHospitalUploadDialogOpen, setGovHospitalUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const location = useLocation();
  
  console.log('Dashboard state:', { uploadDialogOpen, selectedCategory });

  // Handle navigation state to auto-open upload dialog
  useEffect(() => {
    if (location.state?.openUpload && location.state?.category) {
      setSelectedCategory(location.state.category);
      setUploadDialogOpen(true);
    }
  }, [location.state]);
  
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
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Home className="h-4 w-4 mr-2" />
                  Real Estate
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem 
                    onClick={() => {
                      setSelectedCategory("real-estate");
                      setUploadDialogOpen(true);
                    }}
                  >
                    General Real Estate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setShowDevelopmentDialog(true);
                    }}
                  >
                    Developments
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setShowUAEDevelopmentDialog(true);
                    }}
                  >
                    UAE Developments
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("yacht");
                  setUploadDialogOpen(true);
                }}
              >
                <Ship className="h-4 w-4 mr-2" />
                Yachts
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("marinas-shipyards");
                  setUploadDialogOpen(true);
                }}
              >
                <Anchor className="h-4 w-4 mr-2" />
                Marinas & Shipyards
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("hotel-resort");
                  setUploadDialogOpen(true);
                }}
              >
                <Hotel className="h-4 w-4 mr-2" />
                Hotels & Resorts
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setCarUploadDialogOpen(true);
                }}
              >
                <Car className="h-4 w-4 mr-2" />
                Cars & Vehicles
              </DropdownMenuItem>
              
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("experiences");
                  setUploadDialogOpen(true);
                }}
              >
                <Compass className="h-4 w-4 mr-2" />
                Experiences
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  console.log('Museums & Art Galleries clicked');
                  setSelectedCategory("museums-art");
                  setUploadDialogOpen(true);
                }}
              >
                <Palette className="h-4 w-4 mr-2" />
                Museums & Art Galleries
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSchoolEducationDialogOpen(true);
                }}
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Schools & Educational Spaces
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setAviationDialogOpen(true);
                }}
              >
                <Plane className="h-4 w-4 mr-2" />
                Airports, Aviation & Aircraft
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setOfficesShowroomsStudiosUploadDialogOpen(true);
                }}
              >
                <Building className="h-4 w-4 mr-2" />
                Offices, Showrooms & Studios
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setRetailPopUpUploadDialogOpen(true);
                }}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Retail & Pop-Up Experiences
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setHeritageWorshipUploadDialogOpen(true);
                }}
              >
                <Landmark className="h-4 w-4 mr-2" />
                Heritage Sites & Places of Worship
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSetsStagesVenuesUploadDialogOpen(true);
                }}
              >
                <Clapperboard className="h-4 w-4 mr-2" />
                Sets, Stages & Venues
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSportsStadiumsThemeParksUploadDialogOpen(true);
                }}
              >
                <TreePine className="h-4 w-4 mr-2" />
                Sports Stadiums & Theme Parks
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setGolfCourseUploadDialogOpen(true);
                }}
              >
                <Golf className="h-4 w-4 mr-2" />
                Golf Courses
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setGovHospitalUploadDialogOpen(true);
                }}
              >
                <Building2 className="h-4 w-4 mr-2" />
                Government Buildings & Hospitals
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowMerchantShippingDialog(true)}
              >
                <Anchor className="h-4 w-4 mr-2" />
                Merchant Shipping
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowMaritimeInfrastructureDialog(true)}
              >
                <Anchor className="h-4 w-4 mr-2" />
                Maritime Infrastructure
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowCruiseShipDialog(true)}
              >
                <Ship className="h-4 w-4 mr-2" />
                Cruise Ships
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowManufacturingFacilityDialog(true)}
              >
                <Factory className="h-4 w-4 mr-2" />
                Manufacturing Facilities
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowTrainTramDialog(true)}
              >
                <Train className="h-4 w-4 mr-2" />
                Trains & Trams
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setShowRestaurantBarDialog(true)}
              >
                <Utensils className="h-4 w-4 mr-2" />
                Restaurants & Bars
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  setSelectedCategory("offices-showrooms-studios");
                  setUploadDialogOpen(true);
                }}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Offices, Showrooms & Studios
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Subscription Plan - {subscriptionData.plan}
              </CardTitle>
              <CardDescription>Your current plan usage and limits</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <a href="/pricing">Upgrade My Plan</a>
            </Button>
          </div>
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
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Home className="h-4 w-4 mr-2" />
                    Real Estate
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem 
                      onClick={() => {
                        setSelectedCategory("real-estate");
                        setUploadDialogOpen(true);
                      }}
                    >
                      General Real Estate
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        setShowDevelopmentDialog(true);
                      }}
                    >
                      Developments
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => {
                        setShowUAEDevelopmentDialog(true);
                      }}
                    >
                      UAE Developments
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("yacht");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Ship className="h-4 w-4 mr-2" />
                  Yachts
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("marinas-shipyards");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Anchor className="h-4 w-4 mr-2" />
                  Marinas & Shipyards
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("hotel-resort");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Hotel className="h-4 w-4 mr-2" />
                  Hotels & Resorts
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
                
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("experiences");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Compass className="h-4 w-4 mr-2" />
                  Experiences
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("museums-art");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  Museums & Art Galleries
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("schools-education");
                    setUploadDialogOpen(true);
                  }}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Schools & Educational Spaces
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("aircraft-jets");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Plane className="h-4 w-4 mr-2" />
                  Aircraft & Private Jets
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("offices-showrooms-studios");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Offices, Showrooms & Studios
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("retail-popup");
                    setUploadDialogOpen(true);
                  }}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Retail & Pop-Up Experiences
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("heritage-worship");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Landmark className="h-4 w-4 mr-2" />
                  Heritage Sites & Places of Worship
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("sets-stages");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Clapperboard className="h-4 w-4 mr-2" />
                  Sets, Stages & Venues
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setSelectedCategory("sports-theme");
                    setUploadDialogOpen(true);
                  }}
                >
                  <TreePine className="h-4 w-4 mr-2" />
                  Sports Stadiums & Theme Parks
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setGolfCourseUploadDialogOpen(true);
                  }}
                >
                  <Golf className="h-4 w-4 mr-2" />
                  Golf Courses
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setGovHospitalUploadDialogOpen(true);
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Government Buildings & Hospitals
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowMerchantShippingDialog(true)}
                >
                  <Anchor className="h-4 w-4 mr-2" />
                  Merchant Shipping
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowMaritimeInfrastructureDialog(true)}
                >
                  <Anchor className="h-4 w-4 mr-2" />
                  Maritime Infrastructure
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowCruiseShipDialog(true)}
                >
                  <Ship className="h-4 w-4 mr-2" />
                  Cruise Ships
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowManufacturingFacilityDialog(true)}
                >
                  <Factory className="h-4 w-4 mr-2" />
                  Manufacturing Facilities
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setShowTrainTramDialog(true)}
                >
                  <Train className="h-4 w-4 mr-2" />
                  Trains & Trams
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
      
      <CarUploadDialog 
        open={carUploadDialogOpen} 
        onOpenChange={setCarUploadDialogOpen}
      />
      
      <SchoolEducationUploadDialog 
        open={schoolEducationDialogOpen} 
        onOpenChange={setSchoolEducationDialogOpen}
      />
      
      <AviationUploadDialog 
        open={aviationDialogOpen} 
        onOpenChange={setAviationDialogOpen}
      />
      
      <OfficesShowroomsStudiosUploadDialog 
        open={uploadDialogOpen && selectedCategory === "offices-showrooms-studios"} 
        onOpenChange={setUploadDialogOpen}
      />
      
      <RetailPopUpUploadDialog 
        open={uploadDialogOpen && selectedCategory === "retail-popup"} 
        onOpenChange={setUploadDialogOpen}
      />
      
      <HeritageWorshipUploadDialog 
        open={uploadDialogOpen && selectedCategory === "heritage-worship"} 
        onOpenChange={setUploadDialogOpen}
      />
      
      <SetsStagesVenuesUploadDialog
        open={setsStagesVenuesUploadDialogOpen}
        onOpenChange={setSetsStagesVenuesUploadDialogOpen}
      />
      
      <SportsStadiumsThemeParksUploadDialog
        open={sportsStadiumsThemeParksUploadDialogOpen}
        onOpenChange={setSportsStadiumsThemeParksUploadDialogOpen}
      />
      
      <GolfCourseUploadDialog
        open={golfCourseUploadDialogOpen}
        onOpenChange={setGolfCourseUploadDialogOpen}
      />
      
      <GovHospitalUploadDialog
        open={govHospitalUploadDialogOpen}
        onOpenChange={setGovHospitalUploadDialogOpen}
      />
      
      <MerchantShippingUploadDialog
        open={showMerchantShippingDialog}
        onOpenChange={setShowMerchantShippingDialog}
      />
      
      <ManufacturingFacilityUploadDialog
        open={showManufacturingFacilityDialog}
        onOpenChange={setShowManufacturingFacilityDialog}
      />
      
      <MaritimeInfrastructureUploadDialog
        open={showMaritimeInfrastructureDialog}
        onOpenChange={setShowMaritimeInfrastructureDialog}
      />
      
      <CruiseShipUploadDialog
        open={showCruiseShipDialog}
        onOpenChange={setShowCruiseShipDialog}
      />
      
      <TrainTramUploadDialog
        open={showTrainTramDialog}
        onOpenChange={setShowTrainTramDialog}
      />
      
      <RestaurantBarUploadDialog
        open={showRestaurantBarDialog}
        onOpenChange={setShowRestaurantBarDialog}
      />
      
      <UAEDevelopmentUploadDialog
        open={showUAEDevelopmentDialog}
        onOpenChange={setShowUAEDevelopmentDialog}
      />
      
      <DevelopmentUploadDialog
        open={showDevelopmentDialog}
        onOpenChange={setShowDevelopmentDialog}
      />
    </div>
  );
};

export default Dashboard;