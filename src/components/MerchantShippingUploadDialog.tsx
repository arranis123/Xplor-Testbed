import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MerchantShippingForm from './MerchantShippingForm';

interface MerchantShippingUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MerchantShippingUploadDialog({ 
  open, 
  onOpenChange 
}: MerchantShippingUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Merchant Shipping Listing</DialogTitle>
        </DialogHeader>
        <MerchantShippingForm />
      </DialogContent>
    </Dialog>
  );
}