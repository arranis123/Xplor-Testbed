import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ManufacturingFacilityForm from './ManufacturingFacilityForm';

interface ManufacturingFacilityUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ManufacturingFacilityUploadDialog({ 
  open, 
  onOpenChange 
}: ManufacturingFacilityUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Manufacturing Facility</DialogTitle>
        </DialogHeader>
        <ManufacturingFacilityForm />
      </DialogContent>
    </Dialog>
  );
}