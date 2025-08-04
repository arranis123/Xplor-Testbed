import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import MapboxLocationPicker from './MapboxLocationPicker';
import { toast } from "sonner";
import { Plus, X, Upload, MapPin, Settings, Users, Calendar, Target } from "lucide-react";

const formSchema = z.object({
  // Basic Info
  title: z.string().min(1, "Title is required"),
  courseType: z.string().min(1, "Course type is required"),
  description: z.string().min(1, "Description is required"),
  yearEstablished: z.string().optional(),
  managedBy: z.string().optional(),
  listingType: z.string().min(1, "Listing type is required"),
  status: z.string().min(1, "Status is required"),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactWebsite: z.string().url().optional().or(z.literal("")),

  // Course Details
  numberOfHoles: z.string().min(1, "Number of holes is required"),
  totalYardage: z.string().optional(),
  yardageUnit: z.string().default("yards"),
  totalPar: z.string().optional(),
  courseArchitect: z.string().optional(),
  fairwayGrassType: z.string().optional(),
  greensGrassType: z.string().optional(),
  golfCartsAllowed: z.boolean().default(true),
  walkingAllowed: z.boolean().default(true),
  caddieService: z.boolean().default(false),
  cartPathOnly: z.boolean().default(false),
  courseRating: z.string().optional(),
  slopeRating: z.string().optional(),
  drivingRange: z.boolean().default(false),
  drivingRangeYardage: z.string().optional(),
  puttingGreen: z.boolean().default(false),
  chippingArea: z.boolean().default(false),
  courseTerrain: z.string().optional(),

  // Facilities
  proShop: z.boolean().default(false),
  lockerRooms: z.boolean().default(false),
  showers: z.boolean().default(false),
  restaurant: z.boolean().default(false),
  restaurantDescription: z.string().optional(),
  eventHall: z.boolean().default(false),
  eventHallCapacity: z.string().optional(),
  equipmentRental: z.array(z.string()).default([]),
  pgaInstructors: z.boolean().default(false),
  clinics: z.boolean().default(false),
  juniorProgram: z.boolean().default(false),
  golfAcademy: z.boolean().default(false),
  otherAmenities: z.array(z.string()).default([]),
  parkingType: z.string().optional(),
  evCharging: z.boolean().default(false),

  // Tee Times & Rules
  bookingRequired: z.boolean().default(false),
  bookingMethod: z.string().optional(),
  bookingUrl: z.string().url().optional().or(z.literal("")),
  advanceBooking: z.string().optional(),
  paceOfPlay: z.string().optional(),
  teeTimeIntervals: z.string().optional(),
  hostTournaments: z.boolean().default(false),
  venueRental: z.boolean().default(false),
  privateEvents: z.boolean().default(false),
  dressCode: z.boolean().default(false),
  dressCodeDetails: z.string().optional(),
  handicapRequired: z.boolean().default(false),
  alcoholPolicy: z.string().optional(),
  petsAllowed: z.string().optional(),
  smokingPolicy: z.string().optional(),
  dronePolicy: z.string().optional(),

  // Location
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional(),
  nearestAirport: z.string().optional(),
  transportAccess: z.array(z.string()).default([]),

  // Visibility
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
  uploaderName: z.string().optional(),
  pinProtection: z.boolean().default(false),
  pin: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function GolfCourseForm() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({
    featured: [],
    tours: [],
    photos: [],
    videos: [],
    droneFootage: [],
    scorecards: [],
    documents: []
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseType: "",
      listingType: "",
      status: "open",
      yardageUnit: "yards",
      golfCartsAllowed: true,
      walkingAllowed: true,
      equipmentRental: [],
      otherAmenities: [],
      transportAccess: [],
      listingStatus: "draft",
      visibility: "public",
    },
  });

  const courseTypeOptions = [
    "Public", "Private", "Resort", "Semi-Private", "Driving Range Only",
    "Pitch & Putt", "Golf Academy", "Executive / Par 3", "Mini-Golf / Adventure Golf", "Other"
  ];

  const listingTypeOptions = ["Showcase", "Bookable", "For Sale"];
  const statusOptions = ["Open", "Seasonal", "Under Maintenance", "Closed"];
  const holeOptions = ["9", "18", "27", "36", "Other"];
  const grassTypeOptions = ["Bermuda", "Bent", "Zoysia", "Fescue", "Rye", "Paspalum", "Other"];
  const terrainOptions = ["Flat", "Hilly", "Coastal", "Mountain", "Desert", "Forest / Parkland", "Links Style", "Other"];
  const equipmentOptions = ["Clubs", "Shoes", "Carts", "Trolleys", "GPS"];
  const amenityOptions = ["Spa / Wellness Center", "Swimming Pool", "Tennis / Padel Courts", "Fitness Center", "Hotel / Resort Accommodation"];
  const parkingOptions = ["Free", "Paid", "Valet", "Limited"];
  const transportOptions = ["Road", "Shuttle", "Public Transit", "Helicopter Pad"];

  const handleFileUpload = (key: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [key]: [...prev[key], ...Array.from(files)]
      }));
    }
  };

  const removeFile = (key: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index)
    }));
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    console.log("Uploaded files:", uploadedFiles);
    toast.success("Golf course listing saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="basic-info" className="text-xs">
                <Target className="h-4 w-4 mr-1" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="course-details" className="text-xs">
                Course Details
              </TabsTrigger>
              <TabsTrigger value="facilities" className="text-xs">
                <Users className="h-4 w-4 mr-1" />
                Facilities
              </TabsTrigger>
              <TabsTrigger value="rules" className="text-xs">
                <Calendar className="h-4 w-4 mr-1" />
                Rules
              </TabsTrigger>
              <TabsTrigger value="media" className="text-xs">
                Media & Files
              </TabsTrigger>
              <TabsTrigger value="location" className="text-xs">
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </TabsTrigger>
              <TabsTrigger value="visibility" className="text-xs">
                <Settings className="h-4 w-4 mr-1" />
                Visibility
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic-info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details about your golf course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., St. Andrews Old Course" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="courseType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Golf Course Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select course type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courseTypeOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearEstablished"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Established</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1895" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your golf course, its features, and what makes it special..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="managedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Managed By</FormLabel>
                          <FormControl>
                            <Input placeholder="Company/Club/Municipality" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="listingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Listing Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {listingTypeOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Information (Optional)</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
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
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="info@golfcourse.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="contactWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://www.golfcourse.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Details Tab */}
            <TabsContent value="course-details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>Specify the technical details of your golf course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="numberOfHoles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Holes *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select holes" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {holeOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalYardage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Yardage</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 7200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalPar"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Par</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 72" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="courseArchitect"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Architect</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Jack Nicklaus" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="courseTerrain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Terrain</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select terrain" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {terrainOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                  {option}
                                </SelectItem>
                              ))}
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
                      name="fairwayGrassType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fairway Grass Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select grass type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {grassTypeOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="greensGrassType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Greens Grass Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select grass type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {grassTypeOptions.map((option) => (
                                <SelectItem key={option} value={option.toLowerCase()}>
                                  {option}
                                </SelectItem>
                              ))}
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
                      name="courseRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Rating</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 74.2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slopeRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slope Rating</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 135" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Course Features</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="golfCartsAllowed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Golf Carts Allowed</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="walkingAllowed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Walking Allowed</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="caddieService"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Caddie Service Available</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cartPathOnly"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Golf Cart Path Only</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Practice Facilities</h4>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="drivingRange"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Driving Range</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="puttingGreen"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Putting Green</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="chippingArea"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Chipping Area</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("drivingRange") && (
                      <FormField
                        control={form.control}
                        name="drivingRangeYardage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Driving Range Yardage</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 300 yards" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Facilities & Services Tab */}
            <TabsContent value="facilities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Facilities & Services</CardTitle>
                  <CardDescription>Detail the amenities and services available at your golf course</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Clubhouse & Amenities</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="proShop"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Pro Shop</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lockerRooms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Locker Rooms</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="showers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Showers</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="restaurant"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Restaurant / Bar</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {form.watch("restaurant") && (
                      <FormField
                        control={form.control}
                        name="restaurantDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Restaurant Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your restaurant and bar facilities..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="eventHall"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Event / Banquet Hall</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {form.watch("eventHall") && (
                        <FormField
                          control={form.control}
                          name="eventHallCapacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Hall Capacity</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 200 people" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Equipment Rental</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {equipmentOptions.map((equipment) => (
                        <FormField
                          key={equipment}
                          control={form.control}
                          name="equipmentRental"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(equipment)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, equipment])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== equipment
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {equipment}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Instruction & Training</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="pgaInstructors"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">PGA Instructors</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clinics"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Clinics / Group Lessons</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="juniorProgram"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Junior Program</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="golfAcademy"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Golf Academy</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Other Onsite Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {amenityOptions.map((amenity) => (
                        <FormField
                          key={amenity}
                          control={form.control}
                          name="otherAmenities"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(amenity)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, amenity])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== amenity
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {amenity}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Parking & Transportation</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="parkingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Parking</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select parking type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {parkingOptions.map((option) => (
                                  <SelectItem key={option} value={option.toLowerCase()}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="evCharging"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">EV Charging Stations</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tee Times, Events & Rules Tab */}
            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tee Times, Events & Rules</CardTitle>
                  <CardDescription>Configure booking policies, events, and course rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Tee Time Booking</h4>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bookingRequired"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Booking Required</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {form.watch("bookingRequired") && (
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="bookingMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Booking Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                    <SelectItem value="walk-in">Walk-in</SelectItem>
                                    <SelectItem value="multiple">Multiple Methods</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="bookingUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Booking URL</FormLabel>
                                <FormControl>
                                  <Input placeholder="https://booking.example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="advanceBooking"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Advance Booking Window</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 7 days" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="teeTimeIntervals"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tee Time Intervals</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., every 10 minutes" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}

                      <FormField
                        control={form.control}
                        name="paceOfPlay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pace of Play Policy</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Describe your pace of play expectations..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Tournaments & Events</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="hostTournaments"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Host Tournaments</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="venueRental"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Venue Rental Available</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="privateEvents"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Wedding / Private Events</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Rules & Restrictions</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="dressCode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Dress Code Required</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="handicapRequired"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Handicap Required</FormLabel>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      {form.watch("dressCode") && (
                        <FormField
                          control={form.control}
                          name="dressCodeDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Dress Code Details</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Describe your dress code requirements..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="alcoholPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alcohol Policy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select policy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="allowed">Allowed</SelectItem>
                                  <SelectItem value="licensed">Licensed Areas Only</SelectItem>
                                  <SelectItem value="not-allowed">Not Allowed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petsAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pets Policy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select policy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Allowed</SelectItem>
                                  <SelectItem value="service-only">Service Animals Only</SelectItem>
                                  <SelectItem value="no">Not Allowed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="smokingPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Smoking Policy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select policy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="allowed">Allowed</SelectItem>
                                  <SelectItem value="designated">Designated Areas Only</SelectItem>
                                  <SelectItem value="not-allowed">Not Allowed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dronePolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Drone Use Policy</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select policy" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="allowed">Allowed</SelectItem>
                                  <SelectItem value="permit-only">Permit Required</SelectItem>
                                  <SelectItem value="not-allowed">Not Allowed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media & Files Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media & Files</CardTitle>
                  <CardDescription>Upload visual content and documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Featured Image Section */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Featured Image</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="text-muted-foreground">Upload main image for your golf course listing</p>
                        <p className="text-sm text-muted-foreground mt-2">This will be the primary image shown in search results</p>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('featured', e.target.files)}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Or paste image URL" className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                    </div>
                  </div>

                  {[
                    { key: 'tours', title: '360° Virtual Tours', desc: 'Immersive course tours' },
                    { key: 'photos', title: 'Photos', desc: 'Clubhouse, holes, views, amenities' },
                    { key: 'videos', title: 'Videos', desc: 'Drone flyovers, hole guides, promos' },
                    { key: 'droneFootage', title: 'Drone Footage', desc: 'Aerial course views' },
                    { key: 'scorecards', title: 'Scorecard & Course Map', desc: 'PDF/image course layouts' },
                    { key: 'documents', title: 'Documents', desc: 'Brochures, rate cards, safety docs' }
                  ].map(({ key, title, desc }) => (
                    <div key={key}>
                      <h4 className="text-lg font-semibold mb-2">{title}</h4>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                          <p className="text-muted-foreground">{desc}</p>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept={key === 'documents' ? '.pdf,.doc,.docx' : key === 'videos' ? 'video/*' : 'image/*'}
                            onChange={(e) => handleFileUpload(key, e.target.files)}
                          />
                        </div>

                        {(['tours', 'videos', 'droneFootage'].includes(key)) && (
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Add {title}
                            </Button>
                            
                            <Card className="p-4">
                              <div className="flex justify-between items-start mb-3">
                                <Badge variant="outline">{title}</Badge>
                                <Button variant="ghost" size="sm">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Name</Label>
                                  <Input placeholder={`e.g., ${key === 'tours' ? 'Full Course Tour' : key === 'videos' ? 'Hole 18 Walkthrough' : 'Course Overview'}`} />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">URL or File Upload</Label>
                                  <Input placeholder="Enter URL or upload file..." />
                                </div>
                                <div className="md:col-span-2">
                                  <Label className="text-sm font-medium">Description</Label>
                                  <Textarea placeholder={`Describe this ${title.toLowerCase()}...`} rows={2} />
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}

                        {uploadedFiles[key].length > 0 && (
                          <div className="space-y-2">
                            {uploadedFiles[key].map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFile(key, index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Location Information</CardTitle>
                  <CardDescription>Specify the golf course location and accessibility details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City *</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
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
                          <FormLabel>Region/State *</FormLabel>
                          <FormControl>
                            <Input placeholder="Region or State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country *</FormLabel>
                          <FormControl>
                            <Input placeholder="Country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal Code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <Label>Interactive Map</Label>
                    <p className="text-sm text-muted-foreground mb-2">Click on the map to set the exact location</p>
                    <MapboxLocationPicker
                      coordinates={{ lat: 40.7128, lng: -74.0060, ...form.watch("coordinates") }}
                      onCoordinatesChange={(coords) => form.setValue("coordinates", coords)}
                      className="h-64"
                    />
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-lg font-semibold mb-4">Transportation & Access</h4>
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="nearestAirport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nearest Airport</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., JFK International Airport" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <Label className="text-base font-medium">Transport Access</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {transportOptions.map((transport) => (
                            <FormField
                              key={transport}
                              control={form.control}
                              name="transportAccess"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(transport)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, transport])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== transport
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {transport}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visibility & Permissions Tab */}
            <TabsContent value="visibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibility & Permissions</CardTitle>
                  <CardDescription>Control who can see and access your golf course listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                              <SelectItem value="live">Live</SelectItem>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="archived">Archived</SelectItem>
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
                              <SelectItem value="admin-only">Admin Only</SelectItem>
                              <SelectItem value="link-only">Link Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="uploaderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Uploader Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Creator, Manager, or Organization" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="pinProtection"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">PIN Protection</FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Require a PIN to access this listing
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch("pinProtection") && (
                      <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>PIN Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter 4-6 digit PIN" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Shareable Listing Link</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      This link will be automatically generated once you save your listing
                    </p>
                    <div className="flex gap-2">
                      <Input 
                        value="https://yourdomain.com/golf-course/your-listing-id" 
                        readOnly 
                        className="bg-background"
                      />
                      <Button variant="outline" size="sm">
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Publish Golf Course
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
