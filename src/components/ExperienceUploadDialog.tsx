import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ExperienceForm } from './ExperienceForm';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';

interface ExperienceUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExperienceUploadDialog: React.FC<ExperienceUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      additionalLanguages: [],
      includes: [],
      excludes: [],
      equipmentProvided: [],
      equipmentRequired: [],
      safetyRequirements: []
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Experience data:', data);
      
      toast.success('Experience listing created successfully!');
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
            <MapPin className="h-5 w-5" />
            Create Experience Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive experience listing with detailed information and requirements.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <ExperienceForm form={form} />
              
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