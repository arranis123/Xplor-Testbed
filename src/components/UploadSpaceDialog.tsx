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
import { Upload, X, ImageIcon, Video, MapPin, Home, DollarSign, Calendar as CalendarIcon, Ruler, Users, Car, Wifi, Shield, Bath, Bed, Coffee, Waves, Utensils, Tv, Wind, Heater, Gamepad2, TreePine, ParkingCircle, Dumbbell, Dog, Cigarette, PartyPopper, User, MessageCircle, Clock, Zap, Shirt, Laptop, Flame, HeartHandshake, AlertTriangle, Plus } from "lucide-react";
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
  salePrice: z.string().optional(),
  rentalPriceRange: z.string().optional(),
  rentalPeriod: z.string().optional(),
  availableFrom: z.date().optional(),
  availableTo: z.date().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  beds: z.string().optional(),
  maxGuests: z.string().optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  infants: z.string().optional(),
  pets: z.string().optional(),
  area: z.string().optional(),
  yearBuilt: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  amenities: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  accessibility: z.array(z.string()).optional(),
  houseRules: z.array(z.string()).optional(),
  healthSafety: z.array(z.string()).optional(),
  workFeatures: z.array(z.string()).optional(),
  hostLanguage: z.string().optional(),
  responseTime: z.string().optional(),
  bookingType: z.string().optional(),
  availability: z.string().min(1, "Please select availability"),
  visibility: z.string().min(1, "Please select visibility"),
  // Hotel-specific fields
  hotelStarRating: z.string().optional(),
  hotelChain: z.string().optional(),
  roomType: z.string().optional(),
  bedConfiguration: z.string().optional(),
  maxOccupancy: z.string().optional(),
  roomSize: z.string().optional(),
  floorLevel: z.string().optional(),
  averageNightlyRate: z.string().optional(),
  seasonalPricing: z.string().optional(),
  minimumStay: z.string().optional(),
  hotelAmenities: z.array(z.string()).optional(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  hotelPolicies: z.string().optional(),
  nearbyAttractions: z.string().optional(),
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
      rentalPeriod: "",
      bedrooms: "",
      bathrooms: "",
      beds: "",
      maxGuests: "",
      adults: "",
      children: "",
      infants: "",
      pets: "",
      area: "",
      yearBuilt: "",
      location: "",
      amenities: [],
      facilities: [],
      accessibility: [],
      houseRules: [],
      healthSafety: [],
      workFeatures: [],
      hostLanguage: "",
      responseTime: "",
      bookingType: "",
      availability: "",
      visibility: "public",
      // Hotel-specific default values
      hotelStarRating: "",
      hotelChain: "",
      roomType: "",
      bedConfiguration: "",
      maxOccupancy: "",
      roomSize: "",
      floorLevel: "",
      averageNightlyRate: "",
      seasonalPricing: "",
      minimumStay: "",
      hotelAmenities: [],
      checkInTime: "",
      checkOutTime: "",
      hotelPolicies: "",
      nearbyAttractions: "",
    },
  });

  const propertyTypes = [
    { value: "entire-place", label: "Entire Place" },
    { value: "private-room", label: "Private Room" },
    { value: "shared-room", label: "Shared Room" },
    { value: "hotel-room", label: "Hotel Room" },
    { value: "residential-house", label: "Residential House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condominium" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "treehouse", label: "Treehouse" },
    { value: "castle", label: "Castle" },
    { value: "boat", label: "Boat" },
    { value: "cabin", label: "Cabin" },
    { value: "commercial-office", label: "Commercial Office" },
    { value: "retail-space", label: "Retail Space" },
    { value: "warehouse", label: "Warehouse" },
    { value: "land", label: "Land/Plot" },
    { value: "hotel", label: "Hotel/Resort" },
    { value: "restaurant", label: "Restaurant/Cafe" },
    { value: "other", label: "Other" },
  ];

  const hotelPropertyTypes = [
    { value: "hotel-room", label: "Hotel Room – Standard guest room in a traditional hotel" },
    { value: "boutique-hotel", label: "Boutique Hotel – Stylish, smaller hotel with personalized service" },
    { value: "resort", label: "Resort – Full-service property with leisure amenities (pools, restaurants, etc.)" },
    { value: "aparthotel", label: "Aparthotel – Apartment-style rooms with hotel services (kitchenette, cleaning)" },
    { value: "hostel", label: "Hostel – Budget lodging, often with shared dormitories" },
    { value: "motel", label: "Motel – Roadside lodging with easy car access" },
    { value: "guesthouse", label: "Guesthouse – Small, privately owned accommodation" },
    { value: "inn", label: "Inn – Traditional and cozy lodging, often with breakfast" },
    { value: "bed-and-breakfast", label: "Bed and Breakfast (B&B) – Home-like stay with breakfast included" },
    { value: "capsule-hotel", label: "Capsule Hotel – Compact, pod-style sleeping spaces" },
    { value: "luxury-hotel", label: "Luxury Hotel – High-end property with premium features and services" },
    { value: "business-hotel", label: "Business Hotel – Designed for professionals and travelers" },
    { value: "extended-stay-hotel", label: "Extended Stay Hotel – Equipped for long-term stays with self-service features" },
    { value: "eco-hotel", label: "Eco-Hotel – Environmentally sustainable lodging" },
    { value: "casino-hotel", label: "Casino Hotel – Hotel with integrated casino and entertainment" },
  ];

  const amenities = [
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "washer", label: "Washer", icon: Waves },
    { id: "dryer", label: "Dryer", icon: Wind },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "heating", label: "Heating", icon: Heater },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "tv", label: "TV", icon: Tv },
    { id: "hair-dryer", label: "Hair Dryer", icon: Wind },
    { id: "iron", label: "Iron", icon: Shirt },
  ];

  const facilities = [
    { id: "pool", label: "Pool", icon: Waves },
    { id: "hot-tub", label: "Hot Tub", icon: Bath },
    { id: "parking", label: "Free Parking", icon: ParkingCircle },
    { id: "ev-charger", label: "EV Charger", icon: Zap },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "bbq", label: "BBQ Grill", icon: Flame },
    { id: "patio", label: "Patio or Balcony", icon: TreePine },
    { id: "garden", label: "Garden or Backyard", icon: TreePine },
  ];

  const houseRules = [
    { id: "pets-allowed", label: "Pets Allowed", icon: Dog },
    { id: "smoking-allowed", label: "Smoking Allowed", icon: Cigarette },
    { id: "events-allowed", label: "Events Allowed", icon: PartyPopper },
  ];

  const accessibility = [
    { id: "step-free", label: "Step-free Entry", icon: User },
    { id: "wide-doorways", label: "Wide Doorways", icon: Home },
    { id: "accessible-bathroom", label: "Accessible Bathroom", icon: Bath },
    { id: "shower-grab-bars", label: "Shower Grab Bars", icon: Shield },
    { id: "wheelchair-paths", label: "Wheelchair-accessible Paths", icon: User },
  ];

  const workFeatures = [
    { id: "workspace", label: "Laptop-friendly Workspace", icon: Laptop },
    { id: "fast-wifi", label: "Fast WiFi", icon: Wifi },
    { id: "iron", label: "Iron", icon: Shirt },
    { id: "hangers", label: "Hangers", icon: Shirt },
  ];

  const healthSafety = [
    { id: "cleaning-protocol", label: "Enhanced Cleaning Protocol", icon: HeartHandshake },
    { id: "smoke-detector", label: "Smoke Detector", icon: AlertTriangle },
    { id: "carbon-detector", label: "Carbon Monoxide Detector", icon: AlertTriangle },
    { id: "first-aid", label: "First Aid Kit", icon: Plus },
    { id: "fire-extinguisher", label: "Fire Extinguisher", icon: Flame },
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
  const isRentalProperty = category === "real-estate" && form.watch("listingType") === "for-rent";

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
                <TabsList className={`grid w-full ${(category === "hotel" || category === "hotel/resort") ? "grid-cols-5" : "grid-cols-6"}`}>
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  {(category === "hotel" || category === "hotel/resort") ? (
                    <TabsTrigger value="hotel-details">Hotel Details</TabsTrigger>
                  ) : (
                    <TabsTrigger value="details">Property Details</TabsTrigger>
                  )}
                  {!(category === "hotel" || category === "hotel/resort") && (
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  )}
                  <TabsTrigger value="rules">Rules & Access</TabsTrigger>
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
                              {(category === "hotel" || category === "hotel/resort" ? hotelPropertyTypes : propertyTypes).map((type) => (
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

                {(category === "hotel" || category === "hotel/resort") ? (
                  <TabsContent value="hotel-details" className="space-y-4">
                    <HotelUploadForm form={form} />
                  </TabsContent>
                ) : (
                  <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Bed className="h-4 w-4" />
                            Bedrooms
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select bedrooms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="studio">Studio</SelectItem>
                              <SelectItem value="1">1 bedroom</SelectItem>
                              <SelectItem value="2">2 bedrooms</SelectItem>
                              <SelectItem value="3">3 bedrooms</SelectItem>
                              <SelectItem value="4">4 bedrooms</SelectItem>
                              <SelectItem value="5+">5+ bedrooms</SelectItem>
                            </SelectContent>
                          </Select>
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select bathrooms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 bathroom</SelectItem>
                              <SelectItem value="1.5">1.5 bathrooms</SelectItem>
                              <SelectItem value="2">2 bathrooms</SelectItem>
                              <SelectItem value="2.5">2.5 bathrooms</SelectItem>
                              <SelectItem value="3">3 bathrooms</SelectItem>
                              <SelectItem value="3.5">3.5 bathrooms</SelectItem>
                              <SelectItem value="4+">4+ bathrooms</SelectItem>
                            </SelectContent>
                          </Select>
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
                    <FormField
                      control={form.control}
                      name="yearBuilt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Built</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 2020" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Enhanced fields for real estate */}
                  {category === "real-estate" && (
                    <>
                      {form.watch("listingType") === "for-sale" && (
                        <div className="grid grid-cols-1 gap-4">
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
                        </div>
                      )}

                      {form.watch("listingType") === "for-rent" && (
                        <>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                            <FormField
                              control={form.control}
                              name="rentalPeriod"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Rental Period</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select period" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="nightly">Nightly</SelectItem>
                                      <SelectItem value="weekly">Weekly</SelectItem>
                                      <SelectItem value="monthly">Monthly</SelectItem>
                                      <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="beds"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Bed className="h-4 w-4" />
                                    Number of Beds
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select beds" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1 bed</SelectItem>
                                      <SelectItem value="2">2 beds</SelectItem>
                                      <SelectItem value="3">3 beds</SelectItem>
                                      <SelectItem value="4">4 beds</SelectItem>
                                      <SelectItem value="5">5 beds</SelectItem>
                                      <SelectItem value="6+">6+ beds</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="maxGuests"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Max Guests
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select max guests" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1 guest</SelectItem>
                                      <SelectItem value="2">2 guests</SelectItem>
                                      <SelectItem value="3">3 guests</SelectItem>
                                      <SelectItem value="4">4 guests</SelectItem>
                                      <SelectItem value="5">5 guests</SelectItem>
                                      <SelectItem value="6">6 guests</SelectItem>
                                      <SelectItem value="7">7 guests</SelectItem>
                                      <SelectItem value="8">8 guests</SelectItem>
                                      <SelectItem value="9+">9+ guests</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormField
                              control={form.control}
                              name="adults"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Adults</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select adults" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {[...Array(16)].map((_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                          {i} {i === 1 ? 'adult' : 'adults'}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="children"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Children (Ages 2-12)</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select children" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {[...Array(6)].map((_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                          {i} {i === 1 ? 'child' : 'children'}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="infants"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Infants (Under 2)</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select infants" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {[...Array(6)].map((_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                          {i} {i === 1 ? 'infant' : 'infants'}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="pets"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Pets</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select pets" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {[...Array(6)].map((_, i) => (
                                        <SelectItem key={i} value={i.toString()}>
                                          {i} {i === 1 ? 'pet' : 'pets'}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="availableFrom"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Available From</FormLabel>
                                  <Popover modal>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick start date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent 
                                      className="w-auto p-0 bg-popover text-popover-foreground border shadow-xl z-[9999]" 
                                      align="start"
                                      side="bottom"
                                      avoidCollisions={true}
                                      collisionPadding={8}
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                        className="p-3 pointer-events-auto"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="availableTo"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Available To</FormLabel>
                                  <Popover modal>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick end date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent 
                                      className="w-auto p-0 bg-popover text-popover-foreground border shadow-xl z-[9999]" 
                                      align="start"
                                      side="bottom"
                                      avoidCollisions={true}
                                      collisionPadding={8}
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => date < new Date() || (form.watch("availableFrom") && date <= form.watch("availableFrom"))}
                                        initialFocus
                                        className="p-3 pointer-events-auto"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </div>
                        </>
                      )}
                     </>
                   )}
                 </TabsContent>
                )}

                {!(category === "hotel" || category === "hotel/resort") && (
                  <TabsContent value="amenities" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Coffee className="h-5 w-5" />
                        Property Amenities
                      </h3>
                      <FormField
                        control={form.control}
                        name="amenities"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
                                                ? field.onChange([...field.value, amenity.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== amenity.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                          <amenity.icon className="h-4 w-4" />
                                          {amenity.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <Waves className="h-5 w-5" />
                        Facilities
                      </h3>
                      <FormField
                        control={form.control}
                        name="facilities"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {facilities.map((facility) => (
                                <FormField
                                  key={facility.id}
                                  control={form.control}
                                  name="facilities"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={facility.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(facility.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, facility.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== facility.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                          <facility.icon className="h-4 w-4" />
                                          {facility.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {isRentalProperty && (
                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Laptop className="h-5 w-5" />
                          Work Features
                        </h3>
                        <FormField
                          control={form.control}
                          name="workFeatures"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {workFeatures.map((feature) => (
                                  <FormField
                                    key={feature.id}
                                    control={form.control}
                                    name="workFeatures"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={feature.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(feature.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, feature.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== feature.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                            <feature.icon className="h-4 w-4" />
                                            {feature.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                   </div>
                 </TabsContent>
                )}

                 <TabsContent value="rules" className="space-y-4">
                  <div className="space-y-6">
                    {isRentalProperty && (
                      <>
                        <div>
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            House Rules
                          </h3>
                          <FormField
                            control={form.control}
                            name="houseRules"
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {houseRules.map((rule) => (
                                    <FormField
                                      key={rule.id}
                                      control={form.control}
                                      name="houseRules"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={rule.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(rule.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, rule.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== rule.id
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                              <rule.icon className="h-4 w-4" />
                                              {rule.label}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <HeartHandshake className="h-5 w-5" />
                            Health & Safety
                          </h3>
                          <FormField
                            control={form.control}
                            name="healthSafety"
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {healthSafety.map((safety) => (
                                    <FormField
                                      key={safety.id}
                                      control={form.control}
                                      name="healthSafety"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={safety.id}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(safety.id)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value, safety.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== safety.id
                                                        )
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                              <safety.icon className="h-4 w-4" />
                                              {safety.label}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="hostLanguage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <MessageCircle className="h-4 w-4" />
                                  Host Language
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select host language" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="spanish">Spanish</SelectItem>
                                    <SelectItem value="french">French</SelectItem>
                                    <SelectItem value="german">German</SelectItem>
                                    <SelectItem value="italian">Italian</SelectItem>
                                    <SelectItem value="portuguese">Portuguese</SelectItem>
                                    <SelectItem value="chinese">Chinese</SelectItem>
                                    <SelectItem value="japanese">Japanese</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="responseTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  Response Time
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select response time" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="within-hour">Within an hour</SelectItem>
                                    <SelectItem value="within-few-hours">Within a few hours</SelectItem>
                                    <SelectItem value="within-day">Within a day</SelectItem>
                                    <SelectItem value="few-days">A few days or more</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="bookingType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Booking Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select booking type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="instant-book">Instant Book</SelectItem>
                                  <SelectItem value="request-book">Request to Book</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <div>
                      <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Accessibility Features
                      </h3>
                      <FormField
                        control={form.control}
                        name="accessibility"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {accessibility.map((feature) => (
                                <FormField
                                  key={feature.id}
                                  control={form.control}
                                  name="accessibility"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={feature.id}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(feature.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, feature.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== feature.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                          <feature.icon className="h-4 w-4" />
                                          {feature.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
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
