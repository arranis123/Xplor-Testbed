import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GovHospitalForm from './GovHospitalForm';

interface GovHospitalUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GovHospitalUploadDialog({ 
  open, 
  onOpenChange 
}: GovHospitalUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Government Building & Hospital</DialogTitle>
        </DialogHeader>
        <GovHospitalForm />
      </DialogContent>
    </Dialog>
  );
}