import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RealEstatePropertyForm } from './RealEstatePropertyForm';
import { Building } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface RealEstateUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RealEstateUploadDialog: React.FC<RealEstateUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      // Default values for real estate form
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Real Estate data:', data);
      
      toast.success('Real Estate property listing created successfully!');
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
            <Building className="h-5 w-5" />
            Create Real Estate Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive real estate property listing with detailed information and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <RealEstatePropertyForm form={form} />
              
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
                  {isSubmitting ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};