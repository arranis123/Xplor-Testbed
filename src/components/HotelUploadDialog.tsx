import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { HotelUploadForm } from './HotelUploadForm';
import { Hotel } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface HotelUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HotelUploadDialog: React.FC<HotelUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      roomProfiles: []
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Hotel data:', data);
      
      toast.success('Hotel/Resort listing created successfully!');
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hotel className="h-5 w-5" />
            Create Hotel/Resort Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive hotel or resort listing with room profiles and amenities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <HotelUploadForm form={form} />
              
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
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};