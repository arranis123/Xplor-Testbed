import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface UseImageUploadProps {
  bucketName: string;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

export const useImageUpload = ({
  bucketName,
  maxFiles = 10,
  maxFileSize = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
}: UseImageUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please use: ${allowedTypes.join(', ')}`;
    }
    
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`;
    }
    
    return null;
  };

  const uploadFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    
    if (uploadedFiles.length + fileArray.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setIsUploading(true);

    // Validate all files first
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        toast.error(error);
        setIsUploading(false);
        return;
      }
    }

    // Create initial file objects
    const newFiles: UploadedFile[] = fileArray.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: '',
      file,
      progress: 0,
      status: 'uploading' as const
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Upload files to appropriate buckets
    for (const newFile of newFiles) {
      try {
        const fileExtension = newFile.file.name.split('.').pop();
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        
        // Determine the correct bucket based on file type
        let targetBucket = bucketName;
        if (newFile.file.type.startsWith('image/')) {
          targetBucket = 'space-images';
        } else if (newFile.file.type.startsWith('video/')) {
          targetBucket = 'space-videos';
        } else if (newFile.file.type === 'application/pdf' || newFile.file.type.startsWith('application/')) {
          targetBucket = 'space-documents';
        }
        
        const { data, error } = await supabase.storage
          .from(targetBucket)
          .upload(fileName, newFile.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          throw error;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(targetBucket)
          .getPublicUrl(fileName);

        // Update file status
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, url: publicUrl, progress: 100, status: 'completed' as const }
            : f
        ));

      } catch (error) {
        console.error('Upload error:', error);
        setUploadedFiles(prev => prev.map(f => 
          f.id === newFile.id 
            ? { ...f, status: 'error' as const }
            : f
        ));
        toast.error(`Failed to upload ${newFile.name}`);
      }
    }

    setIsUploading(false);
  };

  const removeFile = async (fileId: string) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    // If file was uploaded successfully, delete from storage
    if (file.status === 'completed' && file.url) {
      try {
        // Extract the file path from the URL
        const urlParts = file.url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        
        // Determine bucket from file type
        let targetBucket = bucketName;
        if (file.file.type.startsWith('image/')) {
          targetBucket = 'space-images';
        } else if (file.file.type.startsWith('video/')) {
          targetBucket = 'space-videos';
        } else if (file.file.type === 'application/pdf' || file.file.type.startsWith('application/')) {
          targetBucket = 'space-documents';
        }
        
        if (fileName) {
          await supabase.storage
            .from(targetBucket)
            .remove([fileName]);
        }
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete file from storage');
      }
    }

    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const clearAll = async () => {
    // Delete all uploaded files from storage
    const filesToDelete = uploadedFiles
      .filter(f => f.status === 'completed' && f.url)
      .map(f => f.url.split('/').pop())
      .filter(Boolean) as string[];

    if (filesToDelete.length > 0) {
      try {
        await supabase.storage
          .from(bucketName)
          .remove(filesToDelete);
      } catch (error) {
        console.error('Batch delete error:', error);
        toast.error('Failed to delete some files from storage');
      }
    }

    setUploadedFiles([]);
  };

  return {
    uploadedFiles,
    isUploading,
    uploadFiles,
    removeFile,
    clearAll
  };
};