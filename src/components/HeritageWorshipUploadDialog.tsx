import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HeritageWorshipForm from './HeritageWorshipForm';

interface HeritageWorshipUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HeritageWorshipUploadDialog({ 
  open, 
  onOpenChange 
}: HeritageWorshipUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Heritage Site & Place of Worship</DialogTitle>
        </DialogHeader>
        <HeritageWorshipForm />
      </DialogContent>
    </Dialog>
  );
}