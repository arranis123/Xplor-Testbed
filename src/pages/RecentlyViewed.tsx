import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, MapPin, Share2 } from "lucide-react";

const RecentlyViewed = () => {
  // Mock data for recently viewed spaces
  const recentSpaces = [
    {
      id: 1,
      title: "Modern Luxury Villa - Monaco",
      type: "Property",
      viewedAt: "2 hours ago",
      location: "Monaco, French Riviera",
      thumbnail: "https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=400&q=80",
      description: "Stunning contemporary villa with panoramic ocean views",
      views: 1247
    },
    {
      id: 2,
      title: "Superyacht Azure Dreams",
      type: "Yacht",
      viewedAt: "1 day ago",
      location: "Cannes, France",
      thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=400&q=80",
      description: "180ft luxury superyacht with full crew and amenities",
      views: 892
    },
    {
      id: 3,
      title: "Penthouse Suite - Manhattan",
      type: "Property",
      viewedAt: "3 days ago",
      location: "New York, USA",
      thumbnail: "https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=400&q=80",
      description: "Exclusive penthouse with 360° city views",
      views: 2103
    },
    {
      id: 4,
      title: "Historic Castle Estate",
      type: "Property",
      viewedAt: "1 week ago",
      location: "Tuscany, Italy",
      thumbnail: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=400&q=80",
      description: "Restored 16th century castle with vineyard",
      views: 567
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Recently Viewed</h1>
          <p className="text-muted-foreground">
            Your browsing history of luxury spaces and virtual tours
          </p>
        </div>
        <Button variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Clear History
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentSpaces.map((space) => (
          <Card key={space.id} className="overflow-hidden hover:shadow-medium transition-all duration-300 group cursor-pointer">
            <div className="relative">
              <img
                src={space.thumbnail}
                alt={space.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                  {space.type}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                  <Eye className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{space.views}</span>
                </div>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="line-clamp-1">{space.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {space.viewedAt}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {space.location}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <CardDescription className="line-clamp-2 mb-4">
                {space.description}
              </CardDescription>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  View Again
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {recentSpaces.length === 0 && (
        <Card className="p-12 text-center">
          <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Recently Viewed Items</h3>
          <p className="text-muted-foreground">
            Start exploring luxury spaces to see your viewing history here
          </p>
          <Button className="mt-4">
            Explore Spaces
          </Button>
        </Card>
      )}
    </div>
  );
};

export default RecentlyViewed;