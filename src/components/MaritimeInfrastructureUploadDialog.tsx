import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MaritimeInfrastructureForm from './MaritimeInfrastructureForm';

interface MaritimeInfrastructureUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MaritimeInfrastructureUploadDialog({ 
  open, 
  onOpenChange 
}: MaritimeInfrastructureUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Maritime Infrastructure</DialogTitle>
        </DialogHeader>
        <MaritimeInfrastructureForm />
      </DialogContent>
    </Dialog>
  );
}