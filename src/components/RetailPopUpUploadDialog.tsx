import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RetailPopUpForm from './RetailPopUpForm';

interface RetailPopUpUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RetailPopUpUploadDialog({ 
  open, 
  onOpenChange 
}: RetailPopUpUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Retail & Pop-Up Experience</DialogTitle>
        </DialogHeader>
        <RetailPopUpForm />
      </DialogContent>
    </Dialog>
  );
}