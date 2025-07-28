import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Plus, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

const Spaces = () => {
  const spaces = [
    {
      id: 1,
      name: "Downtown Office Tour",
      description: "Professional office space showcase",
      status: "Active",
      visibility: "Public",
      views: 1247,
      created: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1667440027778-311080d08141?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Luxury Apartment Showcase",
      description: "High-end residential property tour",
      status: "Active",
      visibility: "Unlisted",
      views: 856,
      created: "2024-01-12",
      thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Restaurant Virtual Tour",
      description: "Interactive dining experience",
      status: "Processing",
      visibility: "Public",
      views: 2103,
      created: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Retail Store Experience",
      description: "Shopping center virtual walkthrough",
      status: "Active",
      visibility: "Private",
      views: 743,
      created: "2024-01-08",
      thumbnail: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Hotel Suite Walkthrough",
      description: "Luxury hotel accommodation tour",
      status: "Active",
      visibility: "Public",
      views: 689,
      created: "2024-01-06",
      thumbnail: "https://images.unsplash.com/photo-1571508601851-4d5c82c93041?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Mountain Cabin Retreat",
      description: "Remote vacation rental showcase",
      status: "Active",
      visibility: "Unlisted",
      views: 456,
      created: "2024-01-04",
      thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "Public": return "bg-blue-100 text-blue-800";
      case "Unlisted": return "bg-orange-100 text-orange-800";
      case "Private": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Spaces</h1>
          <p className="text-muted-foreground">Manage and organize your virtual spaces</p>
        </div>
        <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
          <Plus className="h-4 w-4 mr-2" />
          Create Space
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search spaces..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <div className="flex border border-border rounded-md">
          <Button variant="ghost" size="sm" className="border-r">
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id} className="border-border hover:shadow-medium transition-shadow">
            <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
              <img 
                src={space.thumbnail} 
                alt={space.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{space.name}</CardTitle>
                  <CardDescription>{space.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Badge className={getStatusColor(space.status)}>
                    {space.status}
                  </Badge>
                  <Badge className={getVisibilityColor(space.visibility)}>
                    {space.visibility}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{space.views.toLocaleString()} views</span>
                  <span>Created {space.created}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Spaces;