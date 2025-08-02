import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MuseumGalleryForm } from './MuseumGalleryForm';
import { Palette } from 'lucide-react';
import { toast } from 'sonner';

interface MuseumGalleryUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MuseumGalleryUploadDialog: React.FC<MuseumGalleryUploadDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const handleSubmit = async (data: any) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Museum/Gallery data:', data);
      
      toast.success('Museum/Gallery listing created successfully!');
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
            <Palette className="h-5 w-5" />
            Create Museum/Art Gallery Listing
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive listing for your museum or art gallery with detailed information and virtual tours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <MuseumGalleryForm 
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};