import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GolfCourseForm from './GolfCourseForm';

interface GolfCourseUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GolfCourseUploadDialog({ 
  open, 
  onOpenChange 
}: GolfCourseUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Golf Course</DialogTitle>
        </DialogHeader>
        <GolfCourseForm />
      </DialogContent>
    </Dialog>
  );
}