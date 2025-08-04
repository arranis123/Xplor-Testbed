import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CruiseShipForm from './CruiseShipForm';

interface CruiseShipUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CruiseShipUploadDialog({ 
  open, 
  onOpenChange 
}: CruiseShipUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Cruise Ship</DialogTitle>
        </DialogHeader>
        <CruiseShipForm />
      </DialogContent>
    </Dialog>
  );
}