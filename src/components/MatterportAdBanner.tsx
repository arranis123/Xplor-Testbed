import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Play, ExternalLink, Zap, Building2, Eye } from "lucide-react";

export default function MatterportAdBanner() {
  return (
    <Card className="sticky top-4 border-2 border-gradient-to-br from-blue-500/20 to-purple-500/20 bg-gradient-to-br from-blue-50/5 to-purple-50/5 dark:from-blue-950/10 dark:to-purple-950/10">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="text-center">
          <Badge className="mb-3 bg-blue-600 text-white">
            Professional Partner
          </Badge>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Camera className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-foreground">
              Matterport
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Industry-leading 3D capture technology
          </p>
        </div>

        {/* Value Props */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Eye className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">4K Quality Scans</p>
              <p className="text-xs text-muted-foreground">Ultra-high resolution virtual tours</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Any Space Type</p>
              <p className="text-xs text-muted-foreground">Yachts, homes, jets, showrooms</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">Quick Processing</p>
              <p className="text-xs text-muted-foreground">Ready in 24-48 hours</p>
            </div>
          </div>
        </div>

        {/* Demo Video */}
        <div className="relative bg-muted rounded-lg overflow-hidden">
          <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-600/10 to-purple-600/10">
            <div className="text-center">
              <Play className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Watch Demo</p>
            </div>
          </div>
        </div>

        {/* Special Offer */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-3 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">
            Xplor Members Save 15%
          </p>
          <p className="text-xs text-muted-foreground">
            Professional capture starts at $299
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.open('https://matterport.com', '_blank')}
          >
            Get a Quote
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={() => window.open('https://matterport.com/cameras', '_blank')}
          >
            View Cameras
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            Trusted by 600K+ professionals worldwide
          </p>
        </div>
      </CardContent>
    </Card>
  );
}