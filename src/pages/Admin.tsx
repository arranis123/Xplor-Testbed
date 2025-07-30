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
                <Button 
                  onClick={() => {
                    const csvContent = `Title,Description,Property Type,Bedrooms,Bathrooms,Living Rooms,Dining Area,Kitchen Type,Study/Office,Utility Room/Laundry,Guest WC,Maid's Room,Storage/Pantry,Internal Area,Internal Area Unit,Plot Size,Plot Size Unit,Number of Floors,Ceiling Height,Ceiling Height Unit,Floor Number,Balcony Area,Balcony Area Unit,Built Area Price Per Unit,Built Area Price Unit,Plot Area Price Per Unit,Plot Area Price Unit,Availability Status,Furnishing,Flooring Type,Windows,Heating System,Air Conditioning,Smart Home,Security System,Parking Spaces,View Type,Has Fireplace,Has Elevator,Has Private Garden,Has Basement,Has Garage,Swimming Pool,Year Renovated,Developer,Building Name,Total Floors in Building,Number of Units,Common Areas,Service Charges,Energy Rating,Has Doorman,Pets Allowed,Gated Community,Building Security,Ownership Type,Title Deed Status,Building Permit,Mortgage Availability,Tenancy Info,Tax Info,Open House Dates,Property History,Rental Yield,Energy Utilities,Noise Level,Nearby Schools,Shopping Centers,Public Transport,Healthcare Facilities,Recreational Areas,Unique Selling Points,Additional Notes,Address,Latitude,Longitude,Price,Sale Price,VR Link,Thumbnail URL
"Modern 3BR Apartment in Marina District","Beautiful 3-bedroom apartment with sea views in premium location","apartment-building",3,2,1,"Separate dining room","open",1,"Separate laundry room","1 guest toilet","","Walk-in pantry",120,"sqm",,"","2",3.2,"meters","5th floor",15,"sqm",3500,"sqm",,"","available","semi-furnished","marble","Double-glazed, floor-to-ceiling","central","Central AC, Split units","Smart lighting, security system","24/7 CCTV, alarm system",2,"sea","Yes","Yes","No","No","Yes","private",2023,"ABC Development Group","Marina Towers",20,150,"Gym, Pool, Rooftop Lounge, Kids Area","$500/month","A+ rating","Yes","Yes","Yes","Yes","freehold","clear","Valid certificate available","Bank financing available","","3% transfer tax","Saturdays 2-4 PM","Last sold in 2019, renovated in 2021","6.5% annual yield","$150/month average","Low noise, excellent environmental score","Marina International School within 1km","Dubai Marina Mall 500m","Metro station 300m","American Hospital 2km","Marina Walk, Beach access","Prime location with sea views","Recently renovated to highest standards","Dubai Marina, UAE",25.0772,55.1390,850000,800000,"https://example.com/vr-tour","https://example.com/thumbnail.jpg"
"Instructions: Please fill out all relevant fields for each property. Use the dropdown values provided in the form when possible.",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","DROPDOWN VALUES FOR REFERENCE:",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Property Types: detached-house, semi-detached-house, bungalow, villa, cottage-cabin, townhouse-row-house, duplex-triplex-fourplex, farmhouse-country-house, mansion-estate-home, apartment-building, condominium-tower, co-living-building, student-housing-residence, senior-living-facility, mixed-use-residential-tower, retail-storefront, shopping-center, department-store, standalone-retail-building, convenience-store, supermarket-grocery-store, showroom, office-tower, business-center, low-rise-office-building, executive-suite-complex, medical-office-building, government-building, embassy, warehouse-storage-facility, distribution-center, light-industrial-unit, heavy-manufacturing-plant, rd-facility, cold-storage-warehouse, data-center, flex-building, logistics-hub, hotel, motel, hostel, bed-breakfast, serviced-apartment-building, resort-spa-complex, aparthotel, restaurant-bistro, cafe-coffee-shop, fast-food-building, drive-thru-location, ghost-kitchen, brewery-winery, bare-land, mixed-use-development-site, urban-infill-lot, brownfield-redevelopment, greenfield-land, build-to-suit-building, hospital-clinic, dental-surgery, rehabilitation-center, wellness-center, veterinary-clinic, school-kindergarten, university-building, training-center, library-learning-hub, daycare-center, church-temple-mosque, community-center, town-hall, cultural-center, cinema-movie-theater, nightclub-bar, bowling-alley, sports-complex, stadium-arena, event-hall, music-venue, auto-dealership, service-garage, gas-station, trucking-depot, car-wash, parking-garage, marina-dry-dock, yacht-club-facility, hangar-airstrip",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Kitchen Types: open, closed, fully-fitted, american",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Area Units: sqm, sqft",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Length Units: meters, feet",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Availability Status: available, under-offer, sold, let-agreed",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Furnishing: unfurnished, semi-furnished, fully-furnished",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Flooring Types: marble, wood, ceramic, laminate, tile, carpet",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Heating Types: central, radiators, underfloor, electric",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","View Types: sea, mountain, city, garden, lake, forest",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Pool Types: none, private, shared, infinity, indoor",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Ownership Types: freehold, leasehold, co-op",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Title Deed Status: clear, in-process, shared",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
"","Boolean Fields (Yes/No): Has Fireplace, Has Elevator, Has Private Garden, Has Basement, Has Garage, Has Doorman, Pets Allowed, Gated Community, Building Security",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,`;
                    
                    const blob = new Blob([csvContent], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Real_Estate_Bulk_Upload_Template.csv';
                    a.click();
                    URL.revokeObjectURL(url);
                    toast.success("Template downloaded successfully!");
                  }}
                  variant="outline" 
                  className="justify-start col-span-2"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Real Estate Template
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