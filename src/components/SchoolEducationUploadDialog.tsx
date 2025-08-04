import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SchoolEducationForm } from './SchoolEducationForm';
import { GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface SchoolEducationUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SchoolEducationUploadDialog: React.FC<SchoolEducationUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const handleSubmit = async (data: any) => {
    try {
      // Here you would typically send the data to your backend
      console.log('School/Education data:', data);
      
      toast.success('School listing created successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Create School/Educational Facility Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive listing for your educational institution with detailed information, facilities, and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <SchoolEducationForm 
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};