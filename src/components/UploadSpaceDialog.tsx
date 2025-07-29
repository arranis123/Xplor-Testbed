import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, Info } from "lucide-react";
import { aisStreamService } from "@/services/aisStreamService";

interface UploadSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
}

export function UploadSpaceDialog({ open, onOpenChange, category }: UploadSpaceDialogProps) {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: category || "",
    mmsiNumber: "",
    aisApiKey: aisStreamService.getApiKey() || ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Virtual space created successfully!",
      });
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create virtual space. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setFormData(prev => ({ ...prev, aisApiKey: value }));
    aisStreamService.setApiKey(value);
  };

  const handleMMSILookup = async () => {
    if (!formData.mmsiNumber) return;
    
    try {
      console.log(`Looking up MMSI: ${formData.mmsiNumber}`);
      const vesselData = await aisStreamService.getVesselData(formData.mmsiNumber);
      
      if (vesselData) {
        toast({
          title: "Vessel Found",
          description: `Found vessel: ${vesselData.shipName || 'Unknown'} at ${vesselData.latitude}, ${vesselData.longitude}`,
        });
      } else {
        toast({
          title: "No Data",
          description: "No vessel data found for this MMSI number.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to lookup vessel data.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Virtual Space
          </DialogTitle>
          <DialogDescription>
            Create a new virtual space listing. Fill in the basic details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                placeholder="e.g., Modern Downtown Apartment" 
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="yacht">Yacht</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description"
              placeholder="Brief description of the space" 
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {formData.category === "yacht" && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-lg font-semibold">Yacht Information</h3>
              
              {/* AIS Stream API Key */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    AIS Stream API Key (Optional)
                    <Info className="h-4 w-4 text-blue-500" />
                  </Label>
                  <Input 
                    placeholder="Enter your AISStream.io API key for real-time data" 
                    value={formData.aisApiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    type="password"
                  />
                  <p className="text-xs text-gray-600">
                    Get your free API key from{" "}
                    <a 
                      href="https://aisstream.io/apikeys" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline"
                    >
                      aisstream.io/apikeys
                    </a>
                    . Without an API key, we'll use MarineTraffic.com as fallback.
                  </p>
                </div>
              </div>

              {/* MMSI Number */}
              <div className="space-y-2">
                <Label htmlFor="mmsi">MMSI Number (9 digits)</Label>
                <div className="flex gap-2">
                  <Input 
                    id="mmsi"
                    placeholder="e.g., 319011900" 
                    value={formData.mmsiNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, mmsiNumber: e.target.value }))}
                    maxLength={9}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleMMSILookup}
                    disabled={!formData.mmsiNumber || formData.mmsiNumber.length !== 9}
                  >
                    Lookup
                  </Button>
                </div>
                <p className="text-xs text-gray-600">
                  Optional: 9-digit Maritime Mobile Service Identity number for automatic vessel data lookup
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Creating..." : "Create Space"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}