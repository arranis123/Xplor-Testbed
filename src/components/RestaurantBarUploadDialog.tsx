import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RestaurantBarForm from './RestaurantBarForm';

interface RestaurantBarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RestaurantBarUploadDialog({ 
  open, 
  onOpenChange 
}: RestaurantBarUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Restaurant / Bar</DialogTitle>
        </DialogHeader>
        <RestaurantBarForm />
      </DialogContent>
    </Dialog>
  );
}