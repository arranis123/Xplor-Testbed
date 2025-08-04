import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Image, Upload, X } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface FeaturedImageUploadProps {
  featuredImage: File | null;
  onFeaturedImageChange: (file: File | null) => void;
  label?: string;
  className?: string;
}

export default function FeaturedImageUpload({
  featuredImage,
  onFeaturedImageChange,
  label = "Featured Image",
  className = ""
}: FeaturedImageUploadProps) {

  const {
    uploadFiles,
    isUploading
  } = useImageUpload({
    bucketName: 'space-images',
    maxFiles: 1,
    maxFileSize: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFeaturedImageChange(file);
      
      try {
        await uploadFiles([file]);
        toast.success("Featured image uploaded successfully");
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  }, [onFeaturedImageChange, uploadFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeImage = () => {
    onFeaturedImageChange(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-base font-medium">{label}</Label>
      
      {featuredImage ? (
        <Card className="relative">
          <div className="relative">
            <img 
              src={URL.createObjectURL(featuredImage)} 
              alt="Featured"
              className="w-full h-48 object-cover rounded-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-3">
            <p className="text-sm text-muted-foreground">{featuredImage.name}</p>
            <p className="text-xs text-muted-foreground">
              {(featuredImage.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </Card>
      ) : (
        <Card 
          {...getRootProps()} 
          className={`
            border-2 border-dashed cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-primary/50'
            }
          `}
        >
          <input {...getInputProps()} />
          <div className="p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragActive ? 'Drop image here' : 'Click to upload featured image'}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WebP up to 5MB
              </p>
            </div>
          </div>
        </Card>
      )}
      
      {isUploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Upload className="h-4 w-4 animate-pulse" />
          <span>Uploading...</span>
        </div>
      )}
    </div>
  );
}