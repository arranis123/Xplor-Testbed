import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { MuseumGalleryUploadDialog } from "./MuseumGalleryUploadDialog";
import { RealEstateUploadDialog } from "./RealEstateUploadDialog";
import { HotelUploadDialog } from "./HotelUploadDialog";
import { ExperienceUploadDialog } from "./ExperienceUploadDialog";
import { YachtUploadDialog } from "./YachtUploadDialog";
import { CarUploadDialog } from "./CarUploadDialog";
import { toast } from "sonner";

interface UploadSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
}

export const UploadSpaceDialog: React.FC<UploadSpaceDialogProps> = ({
  open,
  onOpenChange,
  category = "",
}) => {
  console.log('UploadSpaceDialog rendered:', { open, category });

  const handleDialogClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
  };

  // Route to the appropriate form based on category
  switch (category) {
    case "museums-art":
      return (
        <MuseumGalleryUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    case "real-estate":
      return (
        <RealEstateUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    case "hotel-resort":
      return (
        <HotelUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    case "experiences":
      return (
        <ExperienceUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    case "yacht":
      return (
        <YachtUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    case "car":
      return (
        <CarUploadDialog 
          open={open}
          onOpenChange={handleDialogClose}
        />
      );
    
    default:
      // Generic form for other categories
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Space uploaded successfully!");
        onOpenChange(false);
      };

      return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload New Virtual Space
              </DialogTitle>
              <DialogDescription>
                Create a new virtual space by uploading photos, videos, and providing property details.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-auto p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center py-12">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Upload form for {category || "general"} spaces
                  </h3>
                  <p className="text-muted-foreground">
                    This is a simplified upload interface. The full form implementation will be added based on the category.
                  </p>
                </div>
              </form>
            </div>

            <DialogFooter className="flex-shrink-0">
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
  }
};