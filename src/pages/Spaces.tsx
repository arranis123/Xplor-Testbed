import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List, Plus, MoreVertical, X, ChevronDown, FolderOpen, Globe, Lock, EyeOff, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { ShareDialog } from "@/components/ShareDialog";
import { UploadSpaceDialog } from "@/components/UploadSpaceDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Spaces = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [sortBy, setSortBy] = useState("recommended");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pinDialogOpen, setPinDialogOpen] = useState(false);
  const [currentSpaceId, setCurrentSpaceId] = useState<number | null>(null);
  const [pin, setPin] = useState("");
  const [pinEmail, setPinEmail] = useState("");
  const [spaces, setSpaces] = useState([
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
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Boutique Hotel Suite",
      description: "Luxury accommodation virtual tour",
      status: "Active",
      visibility: "Public",
      views: 1890,
      created: "2024-01-05",
      type: "Hotel",
      thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Beach House Rental",
      description: "Stunning oceanfront vacation property",
      status: "Draft",
      visibility: "Unlisted",
      views: 523,
      created: "2024-01-03",
      type: "Vacation Rental",
      thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      name: "Corporate Event Center",
      description: "Professional event and conference space",
      status: "Active",
      visibility: "Private",
      views: 1156,
      created: "2024-01-01",
      type: "Event Space",
      thumbnail: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      name: "Industrial Warehouse",
      description: "Large-scale storage and distribution facility",
      status: "Processing",
      visibility: "Unlisted",
      views: 667,
      created: "2023-12-28",
      type: "Warehouse",
      thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
    }
  ]);
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

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "newest", label: "New Listings First" },
    { value: "views-high", label: "Views (high to low)" },
    { value: "views-low", label: "Views (low to high)" },
    { value: "name-asc", label: "Name (A to Z)" },
    { value: "name-desc", label: "Name (Z to A)" },
    { value: "type", label: "Space Type" },
    { value: "status", label: "Status" },
    { value: "visibility", label: "Visibility" },
    { value: "upload-date", label: "Upload Date" },
    { value: "last-updated", label: "Last Updated" }
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

  const sortSpaces = (spaces: any[], sortBy: string) => {
    const sortedSpaces = [...spaces];
    
    switch (sortBy) {
      case "recommended":
        // Default order - could be based on algorithm combining views, recency, etc.
        return sortedSpaces;
      case "newest":
        return sortedSpaces.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      case "views-high":
        return sortedSpaces.sort((a, b) => b.views - a.views);
      case "views-low":
        return sortedSpaces.sort((a, b) => a.views - b.views);
      case "name-asc":
        return sortedSpaces.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedSpaces.sort((a, b) => b.name.localeCompare(a.name));
      case "type":
        return sortedSpaces.sort((a, b) => a.type.localeCompare(b.type));
      case "status":
        return sortedSpaces.sort((a, b) => a.status.localeCompare(b.status));
      case "visibility":
        return sortedSpaces.sort((a, b) => a.visibility.localeCompare(b.visibility));
      case "upload-date":
        return sortedSpaces.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      case "last-updated":
        return sortedSpaces.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
      default:
        return sortedSpaces;
    }
  };

  const sortedSpaces = sortSpaces(spaces, sortBy);

  const handleShare = (space: any) => {
    setSelectedSpace(space);
    setShareDialogOpen(true);
  };

  const handleEdit = (space: any) => {
    // Map space types to upload categories
    const typeToCategory: { [key: string]: string } = {
      "Office": "real-estate",
      "Residential": "real-estate", 
      "Restaurant": "real-estate",
      "Retail": "real-estate",
      "Hotel": "hotel-resort",
      "Vacation Rental": "real-estate",
      "Event Space": "real-estate",
      "Warehouse": "real-estate",
      // For any yacht-related types (if they exist)
      "Yacht": "yacht",
      "Boat": "yacht",
      "Vessel": "yacht"
    };
    
    const category = typeToCategory[space.type] || "real-estate";
    setSelectedCategory(category);
    setUploadDialogOpen(true);
  };

  const handleVisibilityChange = (spaceId: number, newVisibility: string) => {
    if (newVisibility === "Private") {
      setCurrentSpaceId(spaceId);
      setPinDialogOpen(true);
    } else {
      // Update the visibility in the spaces state
      setSpaces(prevSpaces => 
        prevSpaces.map(space => 
          space.id === spaceId 
            ? { ...space, visibility: newVisibility }
            : space
        )
      );
    }
  };

  const handlePinSetup = () => {
    if (currentSpaceId && pin && pinEmail) {
      // Update the space visibility to Private
      setSpaces(prevSpaces => 
        prevSpaces.map(space => 
          space.id === currentSpaceId 
            ? { ...space, visibility: "Private" }
            : space
        )
      );
      
      // Here you would typically make an API call to set up the PIN and email for the space
      console.log(`Setting up PIN for space ${currentSpaceId}: PIN=${pin}, Email=${pinEmail}`);
      setPinDialogOpen(false);
      setPin("");
      setPinEmail("");
      setCurrentSpaceId(null);
    }
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

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "Public": return Globe;
      case "Private": return Lock;
      case "Unlisted": return EyeOff;
      default: return Globe;
    }
  };

  const getVisibilityText = (visibility: string) => {
    switch (visibility) {
      case "Public": return "Public";
      case "Private": return "Private (Pin protected)";
      case "Unlisted": return "Unlisted";
      default: return visibility;
    }
  };

  return (
    <div className="p-mobile-md sm:p-6 space-y-mobile-lg sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-mobile-md sm:gap-4">
        <div>
          <h1 className="text-mobile-3xl sm:text-2xl font-bold text-foreground">All Spaces</h1>
          <p className="text-mobile-sm sm:text-base text-muted-foreground">Manage and organize your virtual spaces</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black min-h-touch px-mobile-md sm:px-4 text-mobile-sm sm:text-base w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Space</span>
              <span className="sm:hidden">New</span>
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 sm:w-48">
            <DropdownMenuItem 
              onClick={() => {
                setSelectedCategory("real-estate");
                setUploadDialogOpen(true);
              }}
              className="min-h-touch py-mobile-sm px-mobile-md"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Real Estate
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedCategory("yacht");
                setUploadDialogOpen(true);
              }}
              className="min-h-touch py-mobile-sm px-mobile-md"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Yacht
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSelectedCategory("hotel-resort");
                setUploadDialogOpen(true);
              }}
              className="min-h-touch py-mobile-sm px-mobile-md"
            >
              <FolderOpen className="h-4 w-4 mr-2" />
              Hotel/Resort
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-mobile-md sm:gap-4">
        <Card>
          <CardContent className="p-mobile-md sm:p-4">
            <div className="flex items-center gap-mobile-sm sm:gap-3">
              <div className="p-mobile-sm sm:p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-mobile-xs sm:text-sm text-muted-foreground">Public</p>
                <p className="text-mobile-xl sm:text-2xl font-bold text-foreground">
                  {spaces.filter(space => space.visibility === "Public").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-mobile-md sm:p-4">
            <div className="flex items-center gap-mobile-sm sm:gap-3">
              <div className="p-mobile-sm sm:p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-mobile-xs sm:text-sm text-muted-foreground">Unlisted</p>
                <p className="text-mobile-xl sm:text-2xl font-bold text-foreground">
                  {spaces.filter(space => space.visibility === "Unlisted").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-mobile-md sm:p-4">
            <div className="flex items-center gap-mobile-sm sm:gap-3">
              <div className="p-mobile-sm sm:p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-mobile-xs sm:text-sm text-muted-foreground">Private</p>
                <p className="text-mobile-xl sm:text-2xl font-bold text-foreground">
                  {spaces.filter(space => space.visibility === "Private").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 sm:col-span-1">
          <CardContent className="p-mobile-md sm:p-4">
            <div className="flex items-center gap-mobile-sm sm:gap-3">
              <div className="p-mobile-sm sm:p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-mobile-xs sm:text-sm text-muted-foreground">Total Views</p>
                <p className="text-mobile-xl sm:text-2xl font-bold text-foreground">
                  {spaces.reduce((total, space) => total + space.views, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-mobile-md sm:gap-4 p-mobile-md sm:p-4 border border-border rounded-lg bg-card">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search spaces..." 
            className="pl-10 min-h-touch"
          />
        </div>
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative min-h-touch px-mobile-md sm:px-4 w-full sm:w-auto">
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          {sortedSpaces.map((space) => (
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1 h-6 px-2">
                          {(() => {
                            const IconComponent = getVisibilityIcon(space.visibility);
                            return <IconComponent className="h-3 w-3" />;
                          })()}
                          <span className="text-xs">{getVisibilityText(space.visibility)}</span>
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => handleVisibilityChange(space.id, "Public")}>
                          <Globe className="h-4 w-4 mr-2" />
                          Public
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleVisibilityChange(space.id, "Private")}>
                          <Lock className="h-4 w-4 mr-2" />
                          Private (Pin protected)
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleVisibilityChange(space.id, "Unlisted")}>
                          <EyeOff className="h-4 w-4 mr-2" />
                          Unlisted
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{space.views.toLocaleString()} views</span>
                    <span>Created {space.created}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(space)}>
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
          {sortedSpaces.map((space) => (
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
                        <Button variant="outline" size="sm" onClick={() => handleEdit(space)}>
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
      
      <UploadSpaceDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        category={selectedCategory}
      />

      {/* PIN Setup Dialog */}
      <Dialog open={pinDialogOpen} onOpenChange={setPinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up PIN Protection</DialogTitle>
            <DialogDescription>
              Create a PIN and provide an email for PIN requests to protect this space.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pin">PIN (4-6 digits)</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email for PIN requests</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={pinEmail}
                onChange={(e) => setPinEmail(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This email will receive requests when someone wants access to the PIN.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setPinDialogOpen(false);
                setPin("");
                setPinEmail("");
                setCurrentSpaceId(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePinSetup}
              disabled={!pin || !pinEmail}
            >
              Set PIN Protection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Spaces;