import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Upload, Image, Video, FileText, Link2 } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document' | 'tour';
  file?: File;
  url?: string;
  name: string;
  description?: string;
  tags: string[];
  componentTag?: string;
  visibility: 'public' | 'admin' | 'pin_protected' | 'link_only';
}

interface MultiImageUploadProps {
  mediaItems: MediaItem[];
  onMediaItemsChange: (items: MediaItem[]) => void;
  maxFiles?: number;
  allowedTypes?: string[];
  showComponentTags?: boolean;
  componentTagOptions?: { value: string; label: string; }[];
}

export default function MultiImageUpload({
  mediaItems,
  onMediaItemsChange,
  maxFiles = 20,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'application/pdf'],
  showComponentTags = true,
  componentTagOptions = [
    { value: 'exterior', label: 'Exterior' },
    { value: 'interior', label: 'Interior' },
    { value: 'amenities', label: 'Amenities' },
    { value: 'location', label: 'Location' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ]
}: MultiImageUploadProps) {

  const [dragActive, setDragActive] = useState(false);

  // Determine bucket based on file types
  const getBucketName = (fileType: string) => {
    if (fileType.startsWith('image/')) return 'space-images';
    if (fileType.startsWith('video/')) return 'space-videos';
    if (fileType === 'application/pdf' || fileType.startsWith('application/')) return 'space-documents';
    return 'space-images'; // default
  };

  const {
    uploadedFiles,
    isUploading,
    uploadFiles,
    removeFile
  } = useImageUpload({
    bucketName: 'space-images', // We'll handle different buckets in the upload logic
    maxFiles,
    maxFileSize: 10, // 10MB max
    allowedTypes
  });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (mediaItems.length + acceptedFiles.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    // Create media items from dropped files
    const newMediaItems: MediaItem[] = [];
    
    for (const file of acceptedFiles) {
      const mediaType = file.type.startsWith('image/') ? 'image' :
                       file.type.startsWith('video/') ? 'video' :
                       file.type === 'application/pdf' ? 'document' : 'document';
      
      const newItem: MediaItem = {
        id: crypto.randomUUID(),
        type: mediaType,
        file,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
        tags: [],
        visibility: 'public'
      };
      
      newMediaItems.push(newItem);
    }

    onMediaItemsChange([...mediaItems, ...newMediaItems]);
    
    // Upload files to appropriate buckets
    for (const file of acceptedFiles) {
      try {
        await uploadFiles([file]);
      } catch (error) {
        console.error('Upload failed:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }
  }, [mediaItems, maxFiles, onMediaItemsChange, uploadFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragActive: dropzoneActive
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'application/pdf': ['.pdf']
    },
    maxFiles: maxFiles - mediaItems.length,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => {
      setDragActive(false);
      toast.error('Some files were rejected. Please check file types and sizes.');
    }
  });

  const addMediaItem = (type: MediaItem['type']) => {
    if (mediaItems.length >= maxFiles) {
      toast.error(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newItem: MediaItem = {
      id: crypto.randomUUID(),
      type,
      name: '',
      tags: [],
      visibility: 'public'
    };
    onMediaItemsChange([...mediaItems, newItem]);
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    onMediaItemsChange(mediaItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeMediaItem = async (id: string) => {
    const item = mediaItems.find(m => m.id === id);
    if (item && item.file) {
      // Find corresponding uploaded file and remove it
      const uploadedFile = uploadedFiles.find(f => f.file === item.file);
      if (uploadedFile) {
        await removeFile(uploadedFile.id);
      }
    }
    onMediaItemsChange(mediaItems.filter(item => item.id !== id));
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'tour': return <Upload className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag and Drop Zone */}
      <Card 
        {...getRootProps()} 
        className={`
          border-2 border-dashed cursor-pointer transition-colors
          ${dragActive || dropzoneActive 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
      >
        <input {...getInputProps()} />
        <div className="p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {dragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse files ({maxFiles - mediaItems.length} remaining)
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: Images, Videos, PDFs (max 10MB each)
            </p>
          </div>
        </div>
      </Card>

      {/* Add Media Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button 
          type="button" 
          onClick={() => addMediaItem('image')} 
          size="sm" 
          variant="outline"
          disabled={mediaItems.length >= maxFiles}
        >
          <Image className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <Button 
          type="button" 
          onClick={() => addMediaItem('video')} 
          size="sm" 
          variant="outline"
          disabled={mediaItems.length >= maxFiles}
        >
          <Video className="h-4 w-4 mr-2" />
          Add Video
        </Button>
        <Button 
          type="button" 
          onClick={() => addMediaItem('tour')} 
          size="sm" 
          variant="outline"
          disabled={mediaItems.length >= maxFiles}
        >
          <Upload className="h-4 w-4 mr-2" />
          Add 360° Tour
        </Button>
        <Button 
          type="button" 
          onClick={() => addMediaItem('document')} 
          size="sm" 
          variant="outline"
          disabled={mediaItems.length >= maxFiles}
        >
          <FileText className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">Uploading files...</span>
          </div>
          {uploadedFiles.filter(f => f.status === 'uploading').map(file => (
            <div key={file.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{file.name}</span>
                <span>{file.progress}%</span>
              </div>
              <Progress value={file.progress} className="h-2" />
            </div>
          ))}
        </Card>
      )}

      {/* Media Items List */}
      <div className="space-y-4">
        {mediaItems.map((item, index) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getFileTypeIcon(item.type)}
                <Badge variant="outline">
                  {item.type.toUpperCase()} {index + 1}
                </Badge>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeMediaItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Media name"
                  value={item.name}
                  onChange={(e) => updateMediaItem(item.id, { name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Visibility</Label>
                <Select 
                  value={item.visibility} 
                  onValueChange={(value: any) => updateMediaItem(item.id, { visibility: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="admin">Admin Only</SelectItem>
                    <SelectItem value="pin_protected">PIN Protected</SelectItem>
                    <SelectItem value="link_only">Link Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {showComponentTags && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Component Tag</Label>
                  <Select 
                    value={item.componentTag} 
                    onValueChange={(value) => updateMediaItem(item.id, { componentTag: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tag by component" />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTagOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Upload File</Label>
                <input
                  type="file"
                  accept={item.type === 'image' ? 'image/*' : item.type === 'video' ? 'video/*' : '*'}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateMediaItem(item.id, { file });
                      uploadFiles([file]);
                    }
                  }}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>Or URL</Label>
                <div className="flex gap-2">
                  <Link2 className="h-4 w-4 mt-3 text-muted-foreground" />
                  <Input
                    placeholder="https://..."
                    value={item.url || ''}
                    onChange={(e) => updateMediaItem(item.id, { url: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Description or caption for this media item"
                value={item.description || ''}
                onChange={(e) => updateMediaItem(item.id, { description: e.target.value })}
                rows={2}
              />
            </div>

            {/* Show file preview if available */}
            {item.file && item.type === 'image' && (
              <div className="mt-4">
                <img 
                  src={URL.createObjectURL(item.file)} 
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </Card>
        ))}
      </div>

      {mediaItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No media items added yet. Use the drag & drop zone or buttons above to add files.</p>
        </div>
      )}
    </div>
  );
}