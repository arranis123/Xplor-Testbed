import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UAEDevelopmentForm from './UAEDevelopmentForm';

interface UAEDevelopmentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UAEDevelopmentUploadDialog({ 
  open, 
  onOpenChange 
}: UAEDevelopmentUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload UAE Development</DialogTitle>
        </DialogHeader>
        <UAEDevelopmentForm />
      </DialogContent>
    </Dialog>
  );
}