import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ImageIcon, Video, MapPin, Home, DollarSign, Calendar, Ruler, Users, Car, Wifi, Shield, Bath, Bed } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  listingType: z.string().min(1, "Please select listing type"),
  salePrice: z.string().optional(),
  rentalPriceRange: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  area: z.string().optional(),
  yearBuilt: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  amenities: z.array(z.string()).optional(),
  availability: z.string().min(1, "Please select availability"),
  visibility: z.string().min(1, "Please select visibility"),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
}

export function UploadSpaceDialog({ open, onOpenChange, category }: UploadSpaceDialogProps) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    photos: File[];
    videos: File[];
    droneFootage: File[];
  }>({
    photos: [],
    videos: [],
    droneFootage: [],
  });

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "",
      listingType: "",
      salePrice: "",
      rentalPriceRange: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      yearBuilt: "",
      location: "",
      amenities: [],
      availability: "",
      visibility: "public",
    },
  });

  const propertyTypes = [
    { value: "residential-house", label: "Residential House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condominium" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "commercial-office", label: "Commercial Office" },
    { value: "retail-space", label: "Retail Space" },
    { value: "warehouse", label: "Warehouse" },
    { value: "land", label: "Land/Plot" },
    { value: "hotel", label: "Hotel/Resort" },
    { value: "restaurant", label: "Restaurant/Cafe" },
    { value: "other", label: "Other" },
  ];

  const amenities = [
    { id: "parking", label: "Parking", icon: Car },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "security", label: "Security", icon: Shield },
    { id: "garden", label: "Garden/Outdoor Space", icon: Home },
    { id: "pool", label: "Swimming Pool", icon: Users },
    { id: "gym", label: "Gym/Fitness Center", icon: Users },
    { id: "elevator", label: "Elevator", icon: Home },
    { id: "balcony", label: "Balcony/Terrace", icon: Home },
    { id: "furnished", label: "Furnished", icon: Home },
    { id: "ac", label: "Air Conditioning", icon: Home },
  ];

  const handleFileUpload = (type: 'photos' | 'videos' | 'droneFootage', files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (type === 'photos') {
        return file.type.startsWith('image/');
      } else {
        return file.type.startsWith('video/');
      }
    });

    setUploadedFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...validFiles],
    }));

    toast({
      title: "Files Added",
      description: `${validFiles.length} ${type} added successfully`,
    });
  };

  const removeFile = (type: 'photos' | 'videos' | 'droneFootage', index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (data: UploadFormValues) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      
      toast({
        title: "Space Uploaded Successfully!",
        description: "Your virtual space has been created and is now processing.",
      });
      
      // Reset form and close dialog
      form.reset();
      setUploadedFiles({ photos: [], videos: [], droneFootage: [] });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your space. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const totalFiles = uploadedFiles.photos.length + uploadedFiles.videos.length + uploadedFiles.droneFootage.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Virtual Space
          </DialogTitle>
          <DialogDescription>
            Create a new virtual space by uploading photos, videos, and providing property details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="details">Property Details</TabsTrigger>
                  <TabsTrigger value="media">Media Upload</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Title</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Modern Downtown Apartment" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {propertyTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {category === "real-estate" && (
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="listingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Listing Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select listing type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-rent">For Rent</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the property, its features, and what makes it special..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 123 Main St, Downtown, City, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {category === "real-estate" && (
                      <>
                        <FormField
                          control={form.control}
                          name="salePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                Sale Price
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., $500,000" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rentalPriceRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                Rental Price Range
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select price range" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="under-1000">Under $1,000/month</SelectItem>
                                  <SelectItem value="1000-2000">$1,000 - $2,000/month</SelectItem>
                                  <SelectItem value="2000-3000">$2,000 - $3,000/month</SelectItem>
                                  <SelectItem value="3000-4000">$3,000 - $4,000/month</SelectItem>
                                  <SelectItem value="4000-5000">$4,000 - $5,000/month</SelectItem>
                                  <SelectItem value="over-5000">Over $5,000/month</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            Bedrooms
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 3" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Bath className="h-4 w-4" />
                            Bathrooms
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Ruler className="h-4 w-4" />
                            Area (sq ft)
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1,200" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Year Built
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2020" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label className="text-sm font-medium mb-3 block">Amenities</Label>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      {amenities.map((amenity) => (
                        <FormField
                          key={amenity.id}
                          control={form.control}
                          name="amenities"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={amenity.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(amenity.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value || [], amenity.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== amenity.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="flex items-center gap-2 font-normal">
                                  <amenity.icon className="h-4 w-4" />
                                  {amenity.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-6">
                  <div className="grid gap-6">
                    {/* Photos Upload */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ImageIcon className="h-5 w-5" />
                          Photos
                        </CardTitle>
                        <CardDescription>Upload property photos (JPG, PNG, WebP)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileUpload('photos', e.target.files)}
                            className="hidden"
                            id="photos-upload"
                          />
                          <Label htmlFor="photos-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm font-medium">Click to upload photos</span>
                              <span className="text-xs text-muted-foreground">or drag and drop</span>
                            </div>
                          </Label>
                        </div>
                        {uploadedFiles.photos.length > 0 && (
                          <div className="mt-4 grid grid-cols-3 gap-2">
                            {uploadedFiles.photos.map((file, index) => (
                              <div key={index} className="relative">
                                <Badge variant="secondary" className="w-full justify-between">
                                  <span className="truncate">{file.name}</span>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile('photos', index)}
                                    className="h-4 w-4 p-0 ml-2"
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Videos Upload */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5" />
                          Videos & Walkthrough
                        </CardTitle>
                        <CardDescription>Upload property videos and virtual walkthroughs (MP4, MOV, AVI)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Input
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={(e) => handleFileUpload('videos', e.target.files)}
                            className="hidden"
                            id="videos-upload"
                          />
                          <Label htmlFor="videos-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <Video className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm font-medium">Click to upload videos</span>
                              <span className="text-xs text-muted-foreground">or drag and drop</span>
                            </div>
                          </Label>
                        </div>
                        {uploadedFiles.videos.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.videos.map((file, index) => (
                              <Badge key={index} variant="secondary" className="w-full justify-between">
                                <span className="truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile('videos', index)}
                                  className="h-4 w-4 p-0 ml-2"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Drone Footage Upload */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Video className="h-5 w-5" />
                          Drone Footage
                        </CardTitle>
                        <CardDescription>Upload aerial drone footage and exterior shots</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                          <Input
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={(e) => handleFileUpload('droneFootage', e.target.files)}
                            className="hidden"
                            id="drone-upload"
                          />
                          <Label htmlFor="drone-upload" className="cursor-pointer">
                            <div className="flex flex-col items-center gap-2">
                              <Video className="h-8 w-8 text-muted-foreground" />
                              <span className="text-sm font-medium">Click to upload drone footage</span>
                              <span className="text-xs text-muted-foreground">or drag and drop</span>
                            </div>
                          </Label>
                        </div>
                        {uploadedFiles.droneFootage.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.droneFootage.map((file, index) => (
                              <Badge key={index} variant="secondary" className="w-full justify-between">
                                <span className="truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile('droneFootage', index)}
                                  className="h-4 w-4 p-0 ml-2"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="available">Available Now</SelectItem>
                              <SelectItem value="coming-soon">Coming Soon</SelectItem>
                              <SelectItem value="under-offer">Under Offer</SelectItem>
                              <SelectItem value="sold">Sold</SelectItem>
                              <SelectItem value="rented">Rented</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visibility</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="unlisted">Unlisted</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {isUploading && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading space...</span>
                        <span>{Math.round(uploadProgress)}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </form>
          </Form>
        </div>

        <DialogFooter className="border-t pt-4">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{totalFiles} files selected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isUploading}
                className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black"
              >
                {isUploading ? "Uploading..." : "Create Space"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}