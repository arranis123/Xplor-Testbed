import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DevelopmentForm from './DevelopmentForm';

interface DevelopmentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DevelopmentUploadDialog({ 
  open, 
  onOpenChange 
}: DevelopmentUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Development</DialogTitle>
        </DialogHeader>
        <DevelopmentForm />
      </DialogContent>
    </Dialog>
  );
}