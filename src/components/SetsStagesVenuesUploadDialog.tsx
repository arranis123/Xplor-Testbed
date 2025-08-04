import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SetsStagesVenuesForm from './SetsStagesVenuesForm';

interface SetsStagesVenuesUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SetsStagesVenuesUploadDialog({ 
  open, 
  onOpenChange 
}: SetsStagesVenuesUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Sets, Stages & Venues</DialogTitle>
        </DialogHeader>
        <SetsStagesVenuesForm />
      </DialogContent>
    </Dialog>
  );
}