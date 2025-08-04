import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AviationForm } from './AviationForm';
import { Plane } from 'lucide-react';
import { toast } from 'sonner';

interface AviationUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AviationUploadDialog: React.FC<AviationUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const handleSubmit = async (data: any) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Aviation data:', data);
      
      toast.success('Aviation listing created successfully!');
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
            <Plane className="h-5 w-5" />
            Create Aviation Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive listing for airports, aircraft, hangars, and aviation services with detailed specifications and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <AviationForm 
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};