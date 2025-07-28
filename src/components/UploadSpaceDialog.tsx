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
  yachtSubtype: z.string().optional(),
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
  // Real Estate Property Specifications
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
  constructionStatus: z.string().optional(),
  furnishing: z.string().optional(),
  buildingType: z.string().optional(),
  architectureStyle: z.string().optional(),
  ownershipType: z.string().optional(),
  titleDeedAvailable: z.string().optional(),
  mortgageStatus: z.string().optional(),
  occupancyStatus: z.string().optional(),
  occupancyCertificate: z.string().optional(),
  featuresAmenities: z.array(z.string()).optional(),
  buildingFeatures: z.array(z.string()).optional(),
  parkingType: z.string().optional(),
  availabilityDate: z.date().optional(),
  openHouseDates: z.string().optional(),
  sellerName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  agencyName: z.string().optional(),
  agentLicense: z.string().optional(),
  preferredContact: z.string().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  urlSlug: z.string().optional(),
  listingId: z.string().optional(),
  listingStatus: z.string().optional(),
  priorityListing: z.string().optional(),
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
  const [showContactForm, setShowContactForm] = useState(false);
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
      yachtSubtype: "",
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
      // Real Estate Property Specifications default values
      price: "",
      currency: "USD",
      pricePerSqm: "",
      areaSize: "",
      areaUnit: "sqm",
      plotSize: "",
      plotUnit: "sqm",
      parkingSpaces: "",
      balconies: "",
      floors: "",
      floorNumber: "",
      propertyCondition: "",
      constructionStatus: "",
      furnishing: "",
      buildingType: "",
      architectureStyle: "",
      ownershipType: "",
      titleDeedAvailable: "",
      mortgageStatus: "",
      occupancyStatus: "",
      occupancyCertificate: "",
      featuresAmenities: [],
      buildingFeatures: [],
      parkingType: "",
      availabilityDate: undefined,
      openHouseDates: "",
      sellerName: "",
      contactPhone: "",
      contactEmail: "",
      agencyName: "",
      agentLicense: "",
      preferredContact: "",
      seoTitle: "",
      metaDescription: "",
      urlSlug: "",
      listingId: "",
      listingStatus: "draft",
      priorityListing: "",
      dateListed: undefined,
      lastUpdated: undefined,
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

  const yachtPropertyTypes = [
    { value: "motor-yacht", label: "Motor Yacht" },
    { value: "sailing-yacht", label: "Sailing Yacht" },
    { value: "hybrid-electric-yacht", label: "Hybrid & Electric Yachts" },
  ];

  const sailingYachtSubtypes = [
    { value: "sloop-single-mast", label: "Sloop (single-mast)" },
    { value: "ketch-two-mast", label: "Ketch (two-mast)" },
    { value: "schooner-three-or-more-masts", label: "Schooner (three or more masts)" },
    { value: "cutter", label: "Cutter" },
    { value: "yawl", label: "Yawl" },
    { value: "classic-sailing-yacht", label: "Classic Sailing Yacht" },
    { value: "racing-yacht", label: "Racing Yacht" },
    { value: "bluewater-cruiser", label: "Bluewater Cruiser" },
    { value: "performance-cruiser", label: "Performance Cruiser" },
    { value: "daysailer", label: "Daysailer" },
  ];

  const hybridElectricYachtSubtypes = [
    { value: "hybrid-propulsion-yacht", label: "Hybrid Propulsion Yacht" },
    { value: "electric-yacht", label: "Electric Yacht" },
    { value: "solar-powered-yacht", label: "Solar-powered Yacht" },
    { value: "hydrogen-powered-yacht", label: "Hydrogen-powered Yacht (emerging)" },
  ];

  const motorYachtSubtypes = [
    { value: "flybridge-motor-yacht", label: "Flybridge Motor Yacht" },
    { value: "hardtop-motor-yacht", label: "Hardtop Motor Yacht" },
    { value: "open-sport-yacht", label: "Open / Sport Yacht" },
    { value: "semi-displacement-yacht", label: "Semi-Displacement Yacht" },
    { value: "displacement-yacht", label: "Displacement Yacht" },
    { value: "trawler-yacht", label: "Trawler Yacht" },
    { value: "expedition-explorer-yacht", label: "Expedition / Explorer Yacht" },
    { value: "fast-displacement-yacht", label: "Fast Displacement Yacht" },
    { value: "planing-yacht", label: "Planing Yacht" },
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

  const handleFileUpload = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans', files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (type === 'photos' || type === 'floorPlans') {
        return file.type.startsWith('image/');
      } else if (type === 'documents') {
        return file.type === 'application/pdf' || file.type.includes('document') || file.type === 'text/plain';
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

  const removeFile = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans', index: number) => {
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
      setUploadedFiles({ photos: [], videos: [], droneFootage: [], documents: [], floorPlans: [] });
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

  const totalFiles = uploadedFiles.photos.length + uploadedFiles.videos.length + uploadedFiles.droneFootage.length + uploadedFiles.documents.length + uploadedFiles.floorPlans.length;
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
                          <FormLabel>{category === "yacht" ? "Yacht Name" : "Property Title"}</FormLabel>
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
                          <FormLabel>{(category === "hotel" || category === "hotel/resort") ? "Hotel Type" : category === "yacht" ? "Yacht Type" : "Property Type"}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={(category === "hotel" || category === "hotel/resort") ? "Select hotel type" : category === "yacht" ? "Select yacht type" : "Select property type"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {(category === "hotel" || category === "hotel/resort" ? hotelPropertyTypes : category === "yacht" ? yachtPropertyTypes : propertyTypes).map((type) => (
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
                    
                    {category === "yacht" && form.watch("propertyType") === "motor-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motor Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select motor yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {motorYachtSubtypes.map((type) => (
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
                    )}

                    {category === "yacht" && form.watch("propertyType") === "sailing-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sailing Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sailing yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sailingYachtSubtypes.map((type) => (
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
                    )}

                    {category === "yacht" && form.watch("propertyType") === "hybrid-electric-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hybrid & Electric Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hybrid/electric yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hybridElectricYachtSubtypes.map((type) => (
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
                    )}
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
                    {category === "real-estate" && form.watch("listingType") === "for-sale" && (
                      <>
                        {/* Property Specifications */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <DollarSign className="h-5 w-5" />
                            Property Specifications
                          </h3>
                          
                          {/* Price with Currency */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-2">
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
                            </div>
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
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="pricePerSqm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price per sqm/sqft (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2500" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {/* Area and Plot Size */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="col-span-2">
                                <FormField
                                  control={form.control}
                                  name="areaSize"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Area Size (interior)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="e.g., 120" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="areaUnit"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="sqm">m²</SelectItem>
                                        <SelectItem value="sqft">ft²</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="col-span-2">
                                <FormField
                                  control={form.control}
                                  name="plotSize"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Plot Size (for land/villas)</FormLabel>
                                      <FormControl>
                                        <Input placeholder="e.g., 200" {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="plotUnit"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Unit</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="sqm">m²</SelectItem>
                                        <SelectItem value="sqft">ft²</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Property Details */}
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
                                        <SelectValue placeholder="Floors" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="1">1</SelectItem>
                                      <SelectItem value="2">2</SelectItem>
                                      <SelectItem value="3">3</SelectItem>
                                      <SelectItem value="4+">4+</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                        <SelectValue placeholder="Condition" />
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
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Construction & Style */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Construction & Style
                          </h3>
                          
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
                                        <SelectValue placeholder="Status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="off-plan">Off-plan</SelectItem>
                                      <SelectItem value="ready-to-move">Ready to move</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Ownership & Legal */}
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
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="occupancyStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Occupancy Status</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Occupancy" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="vacant">Vacant</SelectItem>
                                      <SelectItem value="tenanted">Tenanted</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

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
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Features & Amenities */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Features & Amenities</h3>
                          <FormField
                            control={form.control}
                            name="featuresAmenities"
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                  {[
                                    "Central Heating/Cooling", "Private Garden", "Private Pool", "Shared Pool",
                                    "Gym/Fitness Center", "Elevator", "Security/Gated Community", "Sea View",
                                    "Lake View", "Mountain View", "City View", "Smart Home Features",
                                    "Fireplace", "Laundry Room", "Storage Room", "Basement",
                                    "Rooftop Access", "Solar Panels", "Wheelchair Accessible"
                                  ].map((feature) => (
                                    <FormField
                                      key={feature}
                                      control={form.control}
                                      name="featuresAmenities"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={feature}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(feature)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value || [], feature])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== feature
                                                        ) || []
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                              {feature}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Building Features */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Building / Community Features</h3>
                          <FormField
                            control={form.control}
                            name="buildingFeatures"
                            render={() => (
                              <FormItem>
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                  {[
                                    "Concierge", "Children's Play Area", "BBQ Area", "Clubhouse",
                                    "Business Center", "Co-working Space", "Pets Allowed"
                                  ].map((feature) => (
                                    <FormField
                                      key={feature}
                                      control={form.control}
                                      name="buildingFeatures"
                                      render={({ field }) => {
                                        return (
                                          <FormItem
                                            key={feature}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                          >
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.includes(feature)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([...field.value || [], feature])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                          (value) => value !== feature
                                                        ) || []
                                                      )
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                              {feature}
                                            </FormLabel>
                                          </FormItem>
                                        )
                                      }}
                                    />
                                  ))}
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="parkingType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Parking Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Parking type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="covered">Covered</SelectItem>
                                    <SelectItem value="street">Street</SelectItem>
                                    <SelectItem value="valet">Valet</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Availability & Contact */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            Availability & Contact
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
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="openHouseDates"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Open House Dates (optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Saturdays 2-4 PM" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="sellerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Seller or Agent Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., John Smith" {...field} />
                                  </FormControl>
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
                                    <Input placeholder="e.g., +1-555-123-4567" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="contactEmail"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., contact@agency.com" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="agencyName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Agency Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., ABC Real Estate" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="agentLicense"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Agent License Number (optional)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., RE123456" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="preferredContact"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Preferred Contact Method</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Contact method" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="call">Call</SelectItem>
                                      <SelectItem value="email">Email</SelectItem>
                                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* SEO & Meta Fields */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">SEO & Meta Fields</h3>
                          
                          <div className="grid grid-cols-1 gap-4">
                            <FormField
                              control={form.control}
                              name="seoTitle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Page Title (SEO)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Modern 3BR Apartment for Sale in Downtown" {...field} />
                                  </FormControl>
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
                                      placeholder="Brief description for search engines (150-160 characters)"
                                      className="min-h-[80px]"
                                      {...field} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="urlSlug"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>URL Slug</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., modern-3br-apartment-downtown" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Internal Use */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Internal Use</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="listingId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Listing ID / Reference Code</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., RE-2024-001" {...field} />
                                  </FormControl>
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
                                        <SelectValue placeholder="Status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="draft">Draft</SelectItem>
                                      <SelectItem value="published">Published</SelectItem>
                                      <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="priorityListing"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Priority / Featured Listing</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Priority" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="normal">Normal</SelectItem>
                                      <SelectItem value="featured">Featured</SelectItem>
                                      <SelectItem value="premium">Premium</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="dateListed"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date Listed</FormLabel>
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
                                            <span>Pick date listed</span>
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
                              name="lastUpdated"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Last Updated</FormLabel>
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
                                            <span>Pick last updated</span>
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
                                        initialFocus
                                        className="p-3 pointer-events-auto"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Default property details for non-real-estate or non-for-sale */}
                    {!(category === "real-estate" && form.watch("listingType") === "for-sale") && (
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
                    )}

                    {/* Enhanced fields for real estate rental */}
                    {category === "real-estate" && form.watch("listingType") === "for-rent" && (
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
                        <FileText className="h-5 w-5" />
                        Floor Plans [Need Floor Plans? <button type="button" onClick={() => setShowContactForm(true)} className="text-primary hover:underline">Click Here</button> to contact a Floor Plan creator]
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
                            accept="image/*"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('floorPlans', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.floorPlans.length > 0 && (
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                            {uploadedFiles.floorPlans.map((file, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                  <FileText className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('floorPlans', index)}
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

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Floor Plan Creator</DialogTitle>
            <DialogDescription>
              Get in touch with our floor plan specialists to create professional floor plans for your property.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              description: formData.get('description')
            };
            console.log('Contact form data:', data);
            toast({
              title: "Message Sent!",
              description: "We'll get back to you within 24 hours with a quote.",
            });
            setShowContactForm(false);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-description">Project Description</Label>
              <Textarea
                id="contact-description"
                name="description"
                placeholder="Tell us about your property and floor plan requirements..."
                className="min-h-[100px]"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
