import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Eye, Share2, MoreVertical, Globe, Unlock } from "lucide-react";
import { Input } from "@/components/ui/input";

const PublicSpaces = () => {
  const publicSpaces = [
    {
      id: 1,
      name: "Modern Art Gallery",
      description: "Contemporary art exhibition space with interactive displays",
      status: "Active",
      visibility: "Public",
      views: 5847,
      created: "2024-01-20",
      thumbnail: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      category: "Cultural"
    },
    {
      id: 2,
      name: "Historic Downtown Museum",
      description: "Virtual tour of local history and heritage artifacts",
      status: "Active",
      visibility: "Public",
      views: 3291,
      created: "2024-01-18",
      thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      category: "Educational"
    },
    {
      id: 3,
      name: "Luxury Real Estate Showcase",
      description: "Premium property portfolio for potential buyers",
      status: "Active",
      visibility: "Unlisted",
      views: 1876,
      created: "2024-01-16",
      thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
      category: "Real Estate"
    },
    {
      id: 4,
      name: "University Campus Tour",
      description: "Virtual campus experience for prospective students",
      status: "Active",
      visibility: "Public",
      views: 7432,
      created: "2024-01-14",
      thumbnail: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop",
      category: "Educational"
    },
    {
      id: 5,
      name: "Wedding Venue Collection",
      description: "Exclusive wedding venues for special events",
      status: "Active",
      visibility: "Unlisted",
      views: 2104,
      created: "2024-01-12",
      thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      category: "Events"
    },
    {
      id: 6,
      name: "Tech Innovation Center",
      description: "Interactive showcase of cutting-edge technology",
      status: "Active",
      visibility: "Public",
      views: 4625,
      created: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
      category: "Technology"
    },
    {
      id: 7,
      name: "Boutique Hotel Suite",
      description: "Premium accommodation virtual experience",
      status: "Active", 
      visibility: "Unlisted",
      views: 1543,
      created: "2024-01-08",
      thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop",
      category: "Hospitality"
    },
    {
      id: 8,
      name: "Community Recreation Center",
      description: "Public facility tour with amenities showcase",
      status: "Active",
      visibility: "Public",
      views: 2987,
      created: "2024-01-06",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "Recreation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "Processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "Draft": return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getVisibilityColor = (visibility: string) => {
    switch (visibility) {
      case "Public": return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "Unlisted": return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const publicSpacesList = publicSpaces.filter(space => space.visibility === "Public");
  const unlistedSpacesList = publicSpaces.filter(space => space.visibility === "Unlisted");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Public & Unlisted Spaces</h1>
          <p className="text-muted-foreground">Manage spaces that are discoverable and shareable</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share All
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search public and unlisted spaces..." 
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Public Spaces</p>
                <p className="text-2xl font-bold text-foreground">{publicSpacesList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Unlock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unlisted Spaces</p>
                <p className="text-2xl font-bold text-foreground">{unlistedSpacesList.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Eye className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold text-foreground">
                  {publicSpaces.reduce((total, space) => total + space.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Public Spaces Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-foreground">Public Spaces</h2>
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            {publicSpacesList.length} spaces
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicSpacesList.map((space) => (
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
                <div className="absolute top-2 left-2">
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                    {space.category}
                  </Badge>
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

      {/* Unlisted Spaces Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Unlock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <h2 className="text-xl font-semibold text-foreground">Unlisted Spaces</h2>
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
            {unlistedSpacesList.length} spaces
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {unlistedSpacesList.map((space) => (
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
                <div className="absolute top-2 left-2">
                  <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                    {space.category}
                  </Badge>
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
    </div>
  );
};

export default PublicSpaces;