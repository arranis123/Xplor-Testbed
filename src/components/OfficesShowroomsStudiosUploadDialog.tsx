import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OfficesShowroomsStudiosForm from './OfficesShowroomsStudiosForm';

interface OfficesShowroomsStudiosUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OfficesShowroomsStudiosUploadDialog({ 
  open, 
  onOpenChange 
}: OfficesShowroomsStudiosUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Office, Showroom or Studio</DialogTitle>
        </DialogHeader>
        <OfficesShowroomsStudiosForm />
      </DialogContent>
    </Dialog>
  );
}