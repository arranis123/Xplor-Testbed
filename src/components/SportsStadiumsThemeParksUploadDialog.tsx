import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SportsStadiumsThemeParksForm from './SportsStadiumsThemeParksForm';

interface SportsStadiumsThemeParksUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SportsStadiumsThemeParksUploadDialog({ 
  open, 
  onOpenChange 
}: SportsStadiumsThemeParksUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Sports Stadiums & Theme Parks</DialogTitle>
        </DialogHeader>
        <SportsStadiumsThemeParksForm />
      </DialogContent>
    </Dialog>
  );
}