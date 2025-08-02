import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Car, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface CarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CarUploadDialog: React.FC<CarUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Car/Vehicle data submitted');
      
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Create Car/Vehicle Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive car or vehicle listing with detailed specifications and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Car/Vehicle Upload Form
              </h3>
              <p className="text-muted-foreground">
                The car/vehicle specific form will be implemented here. This will include vehicle specifications, features, condition, and pricing details.
              </p>
            </div>
            
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Listing'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};