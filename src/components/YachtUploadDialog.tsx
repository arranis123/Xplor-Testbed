import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { YachtRulesForm } from './YachtRulesForm';
import { Ship } from 'lucide-react';
import { toast } from 'sonner';

interface YachtUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const YachtUploadDialog: React.FC<YachtUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Here you would typically send the data to your backend
      console.log('Yacht data:', data);
      
      toast.success('Yacht listing created successfully!');
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Create Yacht Listing
          </DialogTitle>
          <DialogDescription>
            Configure yacht rules, access parameters, and charter information.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <YachtRulesForm 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};