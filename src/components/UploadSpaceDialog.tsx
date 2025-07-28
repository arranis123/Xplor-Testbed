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
  // Location-specific fields
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  googlePlusCode: z.string().optional(),
  // Property Specifications
  price: z.string().optional(),
  currency: z.string().optional(),
  pricePerSqm: z.string().optional(),
  areaSize: z.string().optional(),
  areaUnit: z.string().optional(),
  plotSize: z.string().optional(),
  plotUnit: z.string().optional(),
  parkingSpaces: z.string().optional(),
  balconies: z.string().optional(),
  floors: z.string().optional(),
  floorNumber: z.string().optional(),
  propertyCondition: z.string().optional(),
  // Construction & Style
  constructionStatus: z.string().optional(),
  furnishing: z.string().optional(),
  buildingType: z.string().optional(),
  architectureStyle: z.string().optional(),
  // Ownership & Legal
  ownershipType: z.string().optional(),
  titleDeedAvailable: z.string().optional(),
  mortgageStatus: z.string().optional(),
  tenancyStatus: z.string().optional(),
  occupancyCertificate: z.string().optional(),
  // Features & Amenities
  propertyFeatures: z.array(z.string()).optional(),
  buildingFeatures: z.array(z.string()).optional(),
  // Availability & Contact
  availabilityDate: z.date().optional(),
  openHouseDates: z.string().optional(),
  sellerAgentName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  agencyName: z.string().optional(),
  agentLicense: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  // SEO & Meta Fields
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  urlSlug: z.string().optional(),
  // Internal Use Fields
  listingId: z.string().optional(),
  listingStatus: z.string().optional(),
  featuredListing: z.string().optional(),
  dateListed: z.date().optional(),
  lastUpdated: z.date().optional(),
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
      // Location-specific default values
      country: "",
      region: "",
      city: "",
      neighborhood: "",
      streetAddress: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      googlePlusCode: "",
      // Property Specifications default values
      price: "",
      currency: "USD",
      pricePerSqm: "",
      areaSize: "",
      areaUnit: "sqft",
      plotSize: "",
      plotUnit: "sqft",
      parkingSpaces: "",
      balconies: "",
      floors: "",
      floorNumber: "",
      propertyCondition: "",
      // Construction & Style default values
      constructionStatus: "",
      furnishing: "",
      buildingType: "",
      architectureStyle: "",
      // Ownership & Legal default values
      ownershipType: "",
      titleDeedAvailable: "",
      mortgageStatus: "",
      tenancyStatus: "",
      occupancyCertificate: "",
      // Features & Amenities default values
      propertyFeatures: [],
      buildingFeatures: [],
      // Availability & Contact default values
      openHouseDates: "",
      sellerAgentName: "",
      contactPhone: "",
      contactEmail: "",
      agencyName: "",
      agentLicense: "",
      preferredContactMethod: "",
      // SEO & Meta Fields default values
      seoTitle: "",
      metaDescription: "",
      urlSlug: "",
      // Internal Use Fields default values
      listingId: "",
      listingStatus: "draft",
      featuredListing: "",
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
                <TabsList className={`grid w-full ${(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? "grid-cols-6" : (category === "real-estate") ? "grid-cols-6" : "grid-cols-7"}`}>
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? (
                    <TabsTrigger value="hotel-details">Hotel Details</TabsTrigger>
                  ) : (
                    <TabsTrigger value="details">Property Details</TabsTrigger>
                  )}
                  <TabsTrigger value="location">Location Details</TabsTrigger>
                  {!(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && category !== "real-estate" && (
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
                          <FormLabel>{(category === "hotel" || category === "hotel/resort") ? "Hotel Type" : "Property Type"}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={(category === "hotel" || category === "hotel/resort") ? "Select hotel type" : "Select property type"} />
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

                </TabsContent>

                {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? (
                  <TabsContent value="hotel-details" className="space-y-4">
                    <HotelUploadForm form={form} />
                  </TabsContent>
                ) : (
                   <TabsContent value="details" className="space-y-6">
                     <div className="space-y-8">
                       {/* Property Specifications Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           <DollarSign className="h-5 w-5" />
                           Property Specifications
                         </h3>
                         
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="price"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Price</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 500000" {...field} />
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
                                       <SelectValue placeholder="Select currency" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="USD">USD ($)</SelectItem>
                                     <SelectItem value="EUR">EUR (€)</SelectItem>
                                     <SelectItem value="GBP">GBP (£)</SelectItem>
                                     <SelectItem value="AED">AED (د.إ)</SelectItem>
                                     <SelectItem value="CAD">CAD (C$)</SelectItem>
                                     <SelectItem value="AUD">AUD (A$)</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         <FormField
                           control={form.control}
                           name="pricePerSqm"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Price per sqm/sqft (Optional)</FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., 1200" {...field} />
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                           )}
                         />

                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="areaSize"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Area Size (Interior)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 1200" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="areaUnit"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Area Unit</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select unit" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="sqft">Square Feet (ft²)</SelectItem>
                                     <SelectItem value="sqm">Square Meters (m²)</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="plotSize"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Plot Size (for land/villas)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 2000" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="plotUnit"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Plot Unit</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select unit" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="sqft">Square Feet (ft²)</SelectItem>
                                     <SelectItem value="sqm">Square Meters (m²)</SelectItem>
                                   </SelectContent>
                                 </Select>
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
                                 <FormLabel className="flex items-center gap-2">
                                   <Bed className="h-4 w-4" />
                                   Bedrooms
                                 </FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="studio">Studio</SelectItem>
                                     <SelectItem value="1">1</SelectItem>
                                     <SelectItem value="2">2</SelectItem>
                                     <SelectItem value="3">3</SelectItem>
                                     <SelectItem value="4">4</SelectItem>
                                     <SelectItem value="5+">5+</SelectItem>
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
                                 <FormLabel className="flex items-center gap-2">
                                   <Bath className="h-4 w-4" />
                                   Bathrooms
                                 </FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select" />
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
                                 <FormLabel className="flex items-center gap-2">
                                   <Car className="h-4 w-4" />
                                   Parking Spaces
                                 </FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select" />
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
                                       <SelectValue placeholder="Select" />
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

                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="1">1 Floor</SelectItem>
                                     <SelectItem value="2">2 Floors</SelectItem>
                                     <SelectItem value="3">3 Floors</SelectItem>
                                     <SelectItem value="4+">4+ Floors</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="floorNumber"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Floor Number (for apartments)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 5" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="propertyCondition"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Property Condition</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select condition" />
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
                       </div>

                       {/* Construction & Style Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           🏗️ Construction & Style
                         </h3>
                         
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="constructionStatus"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Construction Status</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select status" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="off-plan">Off-plan</SelectItem>
                                     <SelectItem value="ready-to-move">Ready to move</SelectItem>
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
                                       <SelectValue placeholder="Select furnishing" />
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
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="buildingType"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Building Type</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select type" />
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
                           <FormField
                             control={form.control}
                             name="architectureStyle"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Architecture Style (Optional)</FormLabel>
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
                                     <SelectItem value="industrial">Industrial</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Ownership & Legal Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           🔑 Ownership & Legal
                         </h3>
                         
                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                           <FormField
                             control={form.control}
                             name="ownershipType"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Ownership Type</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select type" />
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
                                       <SelectValue placeholder="Select" />
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
                                       <SelectValue placeholder="Select status" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="no-mortgage">No Mortgage</SelectItem>
                                     <SelectItem value="under-mortgage">Under Mortgage</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="tenancyStatus"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Tenanted / Vacant</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select status" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="vacant">Vacant</SelectItem>
                                     <SelectItem value="tenanted">Tenanted</SelectItem>
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
                                       <SelectValue placeholder="Select" />
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

                       {/* Availability & Contact Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           📆 Availability & Contact
                         </h3>
                         
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="availabilityDate"
                             render={({ field }) => (
                               <FormItem className="flex flex-col">
                                 <FormLabel>Availability Date</FormLabel>
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
                                           <span>Pick availability date</span>
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
                                       disabled={(date) => date < new Date()}
                                       initialFocus
                                       className="p-3 pointer-events-auto"
                                     />
                                   </PopoverContent>
                                 </Popover>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="openHouseDates"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Open House Dates (Optional)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., Saturdays 2-4 PM" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                           <FormField
                             control={form.control}
                             name="sellerAgentName"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Seller or Agent Name</FormLabel>
                                 <FormControl>
                                   <Input placeholder="Full name" {...field} />
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
                                   <Input placeholder="+1 234 567 8900" {...field} />
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
                                   <Input placeholder="email@example.com" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>

                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                           <FormField
                             control={form.control}
                             name="agencyName"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Agency Name</FormLabel>
                                 <FormControl>
                                   <Input placeholder="Real Estate Agency" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="agentLicense"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Agent License Number (Optional)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="License number" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="preferredContactMethod"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Preferred Contact Method</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select method" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="call">Call</SelectItem>
                                     <SelectItem value="email">Email</SelectItem>
                                     <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* SEO & Meta Fields Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           🔍 SEO & Meta Fields
                         </h3>
                         
                         <div className="space-y-4">
                           <FormField
                             control={form.control}
                             name="seoTitle"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Page Title (SEO)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="SEO-optimized page title" {...field} />
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
                                 <FormLabel>Meta Description</FormLabel>
                                 <FormControl>
                                   <Textarea 
                                     placeholder="Brief description for search engines..."
                                     className="min-h-[80px]"
                                     {...field}
                                   />
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
                                 <FormLabel>Slug / URL handle</FormLabel>
                                 <FormControl>
                                   <Input placeholder="property-name-location" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Internal Use Fields Section */}
                       <div className="space-y-4">
                         <h3 className="text-lg font-medium flex items-center gap-2">
                           📦 Internal Use
                         </h3>
                         
                         <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                           <FormField
                             control={form.control}
                             name="listingId"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Listing ID / Reference Code</FormLabel>
                                 <FormControl>
                                   <Input placeholder="AUTO-GENERATED" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="listingStatus"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Listing Status</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select status" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="draft">Draft</SelectItem>
                                     <SelectItem value="published">Published</SelectItem>
                                     <SelectItem value="archived">Archived</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="featuredListing"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Priority / Featured Listing</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select priority" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="normal">Normal</SelectItem>
                                     <SelectItem value="featured">Featured</SelectItem>
                                     <SelectItem value="premium">Premium</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>
                     </div>
                   </TabsContent>
                 )}

                 <TabsContent value="location" className="space-y-4">
                   <div className="space-y-4">
                     <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                       <MapPin className="h-5 w-5" />
                       Location Details
                     </h3>
                     
                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="country"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Country</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., United States" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name="region"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Region / State / Province</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., California" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="city"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>City / Town</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., San Francisco" {...field} />
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
                             <FormLabel>Neighborhood / District</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., Mission District" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>

                     <FormField
                       control={form.control}
                       name="streetAddress"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Street Address</FormLabel>
                           <FormControl>
                             <Input placeholder="e.g., 123 Main Street, Apt 4B" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="postalCode"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Postal / ZIP Code</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., 94103" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name="googlePlusCode"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Google Plus Code</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., 849VCWC8+R9" {...field} />
                             </FormControl>
                             <FormDescription>
                               Optional: 10-11 character location code from Google Maps
                             </FormDescription>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>

                     <div className="space-y-4">
                       <h4 className="text-md font-medium">Map Integration (Optional)</h4>
                       <div className="grid grid-cols-2 gap-4">
                         <FormField
                           control={form.control}
                           name="latitude"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Latitude</FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., 37.7749" {...field} />
                               </FormControl>
                               <FormDescription>
                                 Optional: Used for precise map positioning
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="longitude"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Longitude</FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., -122.4194" {...field} />
                               </FormControl>
                               <FormDescription>
                                 Optional: Used for precise map positioning
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       </div>
                       
                       <Card className="p-4">
                         <div className="flex items-center gap-2 mb-2">
                           <MapPin className="h-4 w-4" />
                           <span className="text-sm font-medium">Map Pin Drop / Location Picker</span>
                         </div>
                         <p className="text-sm text-muted-foreground mb-3">
                           Click on the map below to set the exact location, or use the coordinates above.
                         </p>
                         <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                           <div className="text-center">
                             <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                             <p className="text-sm text-muted-foreground">Interactive Map Coming Soon</p>
                             <p className="text-xs text-muted-foreground">Use latitude/longitude fields above for now</p>
                           </div>
                         </div>
                       </Card>
                     </div>
                   </div>
                 </TabsContent>

                 {!(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && category !== "real-estate" && (
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
