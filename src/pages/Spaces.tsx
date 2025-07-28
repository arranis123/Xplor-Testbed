import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Plus, MoreVertical, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ShareDialog } from "@/components/ShareDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Spaces = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    visibility: [],
    type: [],
    dateRange: "",
    views: ""
  });

  const filterOptions = {
    status: ["Active", "Processing", "Draft", "Inactive"],
    visibility: ["Public", "Unlisted", "Private"],
    type: ["Office", "Residential", "Restaurant", "Retail", "Hotel", "Vacation Rental", "Event Space", "Warehouse"],
    dateRange: ["Last 7 days", "Last 30 days", "Last 3 months", "Last 6 months", "All time"],
    views: ["0-100 views", "100-500 views", "500-1000 views", "1000+ views"]
  };

  const spaces = [
    {
      id: 1,
      name: "Downtown Office Tour",
      description: "Professional office space showcase",
      status: "Active",
      visibility: "Public",
      views: 1247,
      created: "2024-01-15",
      type: "Office",
      thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Luxury Apartment Showcase",
      description: "High-end residential property tour",
      status: "Active",
      visibility: "Unlisted",
      views: 856,
      created: "2024-01-12",
      type: "Residential",
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
      type: "Restaurant",
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
      type: "Retail",
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
      type: "Hotel",
      thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Mountain Cabin Retreat",
      description: "Remote vacation rental showcase",
      status: "Active",
      visibility: "Unlisted",
      views: 456,
      created: "2024-01-04",
      type: "Vacation Rental",
      thumbnail: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop"
    },
  ];

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...(prev[category] as string[]), value]
        : (prev[category] as string[]).filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      status: [],
      visibility: [],
      type: [],
      dateRange: "",
      views: ""
    });
  };

  const getActiveFilterCount = () => {
    return activeFilters.status.length + 
           activeFilters.visibility.length + 
           activeFilters.type.length +
           (activeFilters.dateRange ? 1 : 0) +
           (activeFilters.views ? 1 : 0);
  };

  const handleShare = (space: any) => {
    setSelectedSpace(space);
    setShareDialogOpen(true);
  };

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
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {getActiveFilterCount() > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-popover text-popover-foreground border shadow-xl z-[9999]" align="start">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <div className="flex items-center gap-2">
                  {getActiveFilterCount() > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs h-7">
                      Clear all
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)} className="h-7 w-7 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {/* Status Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium mb-3">Status</h4>
                <div className="space-y-2">
                  {filterOptions.status.map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={`status-${status}`}
                        checked={activeFilters.status.includes(status)}
                        onCheckedChange={(checked) => handleFilterChange("status", status, checked as boolean)}
                      />
                      <label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                        {status}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visibility Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium mb-3">Visibility</h4>
                <div className="space-y-2">
                  {filterOptions.visibility.map((visibility) => (
                    <div key={visibility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`visibility-${visibility}`}
                        checked={activeFilters.visibility.includes(visibility)}
                        onCheckedChange={(checked) => handleFilterChange("visibility", visibility, checked as boolean)}
                      />
                      <label htmlFor={`visibility-${visibility}`} className="text-sm cursor-pointer">
                        {visibility}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium mb-3">Space Type</h4>
                <div className="space-y-2">
                  {filterOptions.type.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={activeFilters.type.includes(type)}
                        onCheckedChange={(checked) => handleFilterChange("type", type, checked as boolean)}
                      />
                      <label htmlFor={`type-${type}`} className="text-sm cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Views Filter */}
              <div className="p-4 border-b">
                <h4 className="font-medium mb-3">View Count</h4>
                <div className="space-y-2">
                  {filterOptions.views.map((viewRange) => (
                    <div key={viewRange} className="flex items-center space-x-2">
                      <Checkbox
                        id={`views-${viewRange}`}
                        checked={activeFilters.views === viewRange}
                        onCheckedChange={(checked) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            views: checked ? viewRange : ""
                          }));
                        }}
                      />
                      <label htmlFor={`views-${viewRange}`} className="text-sm cursor-pointer">
                        {viewRange}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="p-4">
                <h4 className="font-medium mb-3">Created</h4>
                <div className="space-y-2">
                  {filterOptions.dateRange.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={`date-${range}`}
                        checked={activeFilters.dateRange === range}
                        onCheckedChange={(checked) => {
                          setActiveFilters(prev => ({
                            ...prev,
                            dateRange: checked ? range : ""
                          }));
                        }}
                      />
                      <label htmlFor={`date-${range}`} className="text-sm cursor-pointer">
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex border border-border rounded-md">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'ghost'} 
            size="sm" 
            className="border-r"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'ghost'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Spaces Display */}
      {viewMode === 'grid' ? (
        /* Grid View */
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
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleShare(space)}>
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {spaces.map((space) => (
            <Card key={space.id} className="border-border hover:shadow-medium transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-32 h-24 bg-muted rounded-lg relative overflow-hidden flex-shrink-0">
                    <img 
                      src={space.thumbnail} 
                      alt={space.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">{space.name}</CardTitle>
                        <CardDescription className="mt-1">{space.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(space.status)}>
                        {space.status}
                      </Badge>
                      <Badge className={getVisibilityColor(space.visibility)}>
                        {space.visibility}
                      </Badge>
                      <Badge variant="outline">
                        {space.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{space.views.toLocaleString()} views</span>
                        <span>Created {space.created}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleShare(space)}>
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Share Dialog */}
      {selectedSpace && (
        <ShareDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          spaceName={selectedSpace.name}
          spaceDescription={selectedSpace.description}
          spaceUrl={`${window.location.origin}/space/${selectedSpace.id}`}
        />
      )}
    </div>
  );
};

export default Spaces;