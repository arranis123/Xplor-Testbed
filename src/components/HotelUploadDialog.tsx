import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { HotelUploadForm } from './HotelUploadForm';
import { Hotel } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface HotelUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HotelUploadDialog: React.FC<HotelUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const form = useForm({
    defaultValues: {
      roomProfiles: [],
      // Add other default values for hotel form
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      console.log('Hotel data:', data);
      toast.success('Hotel listing created successfully!');
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
            <Hotel className="h-5 w-5" />
            Create Hotel/Resort Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive hotel or resort listing with room details and amenities.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 p-6">
              <HotelUploadForm form={form} />
              
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create Listing
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};