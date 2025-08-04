import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Car } from 'lucide-react';
import { toast } from 'sonner';
import { CarUploadForm } from './CarUploadForm';

interface CarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CarUploadDialog: React.FC<CarUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Car/Vehicle data submitted:', data);
      
      toast.success('Car/Vehicle listing created successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Create Car/Vehicle Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive car or vehicle listing with detailed specifications and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <CarUploadForm
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};