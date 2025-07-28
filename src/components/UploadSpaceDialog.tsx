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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ImageIcon, Video, MapPin, Home, DollarSign, Calendar as CalendarIcon, Ruler, Users, Car, Wifi, Shield, Bath, Bed, Coffee, Waves, Utensils, Tv, Wind, Heater, Gamepad2, TreePine, ParkingCircle, Dumbbell, Dog, Cigarette, PartyPopper, User, MessageCircle, Clock, Zap, Shirt, Laptop, Flame, HeartHandshake, AlertTriangle, Plus, FileText } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HotelUploadForm } from "./HotelUploadForm";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  listingType: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  neighborhood: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  price: z.string().optional(),
  currency: z.string().optional(),
  pricePerSqm: z.string().optional(),
  areaSize: z.string().optional(),
  plotSize: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  parkingSpaces: z.string().optional(),
  balconies: z.string().optional(),
  yearBuilt: z.string().optional(),
  floors: z.string().optional(),
  floorNumber: z.string().optional(),
  propertyCondition: z.string().optional(),
  constructionStatus: z.string().optional(),
  furnishing: z.string().optional(),
  buildingType: z.string().optional(),
  architectureStyle: z.string().optional(),
  ownershipType: z.string().optional(),
  titleDeedAvailable: z.string().optional(),
  mortgageStatus: z.string().optional(),
  occupancyCertificate: z.string().optional(),
  availabilityDate: z.date().optional(),
  sellerName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  agencyName: z.string().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  urlSlug: z.string().optional(),
  availability: z.string().optional(),
  visibility: z.string().optional(),
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
    documents: File[];
    floorPlans: File[];
  }>({
    photos: [],
    videos: [],
    droneFootage: [],
    documents: [],
    floorPlans: [],
  });

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "",
      currency: "USD",
    },
  });

  const handleFileUpload = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans', files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (type === 'photos') {
        return file.type.startsWith('image/');
      } else if (type === 'documents') {
        return file.type === 'application/pdf' || file.type.includes('document') || file.type === 'text/plain';
      } else if (type === 'floorPlans') {
        return file.type.startsWith('image/') || file.type === 'application/pdf';
      } else {
        return file.type.startsWith('video/');
      }
    });

    if (validFiles.length !== fileArray.length) {
      toast({
        title: "Some files were rejected",
        description: "Only valid file types are allowed.",
        variant: "destructive",
      });
    }

    setUploadedFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...validFiles],
    }));

    toast({
      title: "Files added",
      description: `${validFiles.length} file(s) added successfully.`,
    });
  };

  const removeFile = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans', index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (values: UploadFormValues) => {
    try {
      setIsUploading(true);
      
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      toast({
        title: "Space uploaded successfully!",
        description: "Your space has been created and is now live.",
      });
      
      // Reset form and close dialog
      form.reset();
      setUploadedFiles({ photos: [], videos: [], droneFootage: [], documents: [], floorPlans: [] });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your space. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const totalFiles = uploadedFiles.photos.length + uploadedFiles.videos.length + uploadedFiles.droneFootage.length + uploadedFiles.documents.length + uploadedFiles.floorPlans.length;
  const isRentalProperty = category === "real-estate" && form.watch("listingType") === "for-rent";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Upload New Space</DialogTitle>
          <DialogDescription>
            Fill in the details about your space to create a new listing.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="location">Location Details</TabsTrigger>
                  <TabsTrigger value="property">Property Details</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="media">Media Uploads</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter space title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your space..." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="villa">Villa</SelectItem>
                                <SelectItem value="studio">Studio</SelectItem>
                                <SelectItem value="office">Office</SelectItem>
                                <SelectItem value="retail">Retail Space</SelectItem>
                                <SelectItem value="warehouse">Warehouse</SelectItem>
                                <SelectItem value="land">Land</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {category === "real-estate" && (
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
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Address Information
                    </h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input placeholder="State or Province" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP/Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="ZIP code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Neighborhood (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Neighborhood" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 40.7128" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., -74.0060" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="property" className="space-y-4">
                  {category === "real-estate" && form.watch("listingType") === "for-sale" && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Home className="h-5 w-5" />
                          Property Specifications
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter price" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="currency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Currency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Currency" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                    <SelectItem value="AED">AED (د.إ)</SelectItem>
                                    <SelectItem value="SAR">SAR (ر.س)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="pricePerSqm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price per sqm/sqft (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Price per unit" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="areaSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Area Size (interior)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 1200 sqft or 110 sqm" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="plotSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Plot Size (for land/villas)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 5000 sqft" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Bedrooms" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="studio">Studio</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="6+">6+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bathrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Bathrooms" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="1.5">1.5</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="2.5">2.5</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="3.5">3.5</SelectItem>
                                    <SelectItem value="4+">4+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="parkingSpaces"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Parking Spaces</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Parking" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">None</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4+">4+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="balconies"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Balconies/Terraces</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Balconies" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="0">None</SelectItem>
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3+">3+</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="yearBuilt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year Built</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2020" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="floors"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floors/Levels</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="floorNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor Number (apartments)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 5th floor" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="propertyCondition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Property Condition</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Property condition" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="under-construction">Under Construction</SelectItem>
                                  <SelectItem value="renovated">Renovated</SelectItem>
                                  <SelectItem value="needs-renovation">Needs Renovation</SelectItem>
                                  <SelectItem value="shell-core">Shell & Core</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Construction & Style</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="constructionStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Construction Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Construction status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="off-plan">Off-plan</SelectItem>
                                    <SelectItem value="ready">Ready to move</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="furnishing"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Furnishing</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Furnishing" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="fully-furnished">Fully Furnished</SelectItem>
                                    <SelectItem value="semi-furnished">Semi-Furnished</SelectItem>
                                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="buildingType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Building Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Building type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="detached">Detached</SelectItem>
                                    <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                                    <SelectItem value="terraced">Terraced</SelectItem>
                                    <SelectItem value="low-rise">Low-rise</SelectItem>
                                    <SelectItem value="mid-rise">Mid-rise</SelectItem>
                                    <SelectItem value="high-rise">High-rise</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="architectureStyle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Architecture Style (optional)</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="modern">Modern</SelectItem>
                                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                                  <SelectItem value="colonial">Colonial</SelectItem>
                                  <SelectItem value="contemporary">Contemporary</SelectItem>
                                  <SelectItem value="traditional">Traditional</SelectItem>
                                  <SelectItem value="minimalist">Minimalist</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          Ownership & Legal
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="ownershipType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Ownership Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Ownership type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="freehold">Freehold</SelectItem>
                                    <SelectItem value="leasehold">Leasehold</SelectItem>
                                    <SelectItem value="share-transfer">Share Transfer</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="titleDeedAvailable"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title Deed Available</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Yes/No" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mortgageStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mortgage Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Mortgage status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="no-mortgage">No Mortgage</SelectItem>
                                    <SelectItem value="under-mortgage">Under Mortgage</SelectItem>
                                    <SelectItem value="tenanted">Tenanted</SelectItem>
                                    <SelectItem value="vacant">Vacant</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="occupancyCertificate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Occupancy Certificate</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Yes/No" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Contact & Availability
                        </h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="availabilityDate"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Availability Date</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date < new Date()
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="sellerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Seller/Agent Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contact name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="Email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="agencyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Agency Name (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Real estate agency" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">SEO & Meta Fields</h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="seoTitle"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SEO Title (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="SEO optimized title" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="metaDescription"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Meta Description (optional)</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="SEO meta description" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="urlSlug"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL Slug (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="url-friendly-slug" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {isRentalProperty && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Rental property details form will be implemented here.</p>
                    </div>
                  )}

                  {category !== "real-estate" && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">Basic property information for {category} category.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="amenities" className="space-y-4">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Amenities selection will be implemented here.</p>
                  </div>
                </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <ImageIcon className="h-5 w-5" />
                        Photos
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Photos</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('photos', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.photos.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                            {uploadedFiles.photos.map((file, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('photos', index)}
                                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                                <p className="text-xs truncate mt-1">{file.name}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Videos
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Videos</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="video/*"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('videos', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.videos.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.videos.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('videos', index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Video className="h-5 w-5" />
                        Drone Footage
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Drone Footage</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="video/*"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('droneFootage', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.droneFootage.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.droneFootage.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <Video className="h-4 w-4" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('droneFootage', index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Documents</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.txt"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('documents', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.documents.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.documents.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('documents', index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Home className="h-5 w-5" />
                        Floor Plans
                      </Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Floor Plans</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept="image/*,.pdf"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('floorPlans', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.floorPlans.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.floorPlans.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <Home className="h-4 w-4" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('floorPlans', index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {totalFiles > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Upload Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                              <Badge variant="secondary">
                                {uploadedFiles.photos.length} Photos
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.videos.length} Videos
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.droneFootage.length} Drone Footage
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.documents.length} Documents
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.floorPlans.length} Floor Plans
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Total: {totalFiles} files
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
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
                              <SelectItem value="under-construction">Under Construction</SelectItem>
                              <SelectItem value="maintenance">Under Maintenance</SelectItem>
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
            </form>
          </Form>
        </div>

        <DialogFooter className="flex-shrink-0">
          {isUploading && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
          {!isUploading && (
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Create Space
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}