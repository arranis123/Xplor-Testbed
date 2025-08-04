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
import { Plus, X } from "lucide-react";

const formSchema = z.object({
  // Basic Info
  listingTitle: z.string().min(1, "Listing title is required"),
  venueCategory: z.string().min(1, "Venue category is required"),
  description: z.string().min(1, "Description is required"),
  yearBuilt: z.string().optional(),
  capacity: z.string().optional(),
  ownership: z.string().optional(),
  listingType: z.string().min(1, "Listing type is required"),
  status: z.string().min(1, "Status is required"),
  
  // Venue Type & Layout
  stageType: z.array(z.string()).optional(),
  floorArea: z.string().optional(),
  ceilingHeight: z.string().optional(),
  floorType: z.string().optional(),
  fixedSeating: z.boolean().default(false),
  seatingCount: z.string().optional(),
  dressingRooms: z.boolean().default(false),
  dressingRoomCount: z.string().optional(),
  greenRooms: z.boolean().default(false),
  greenRoomCount: z.string().optional(),
  controlRoom: z.boolean().default(false),
  attachedRooms: z.array(z.string()).optional(),
  stageDimensions: z.string().optional(),
  modularSpace: z.boolean().default(false),
  
  // Specifications & Features
  acousticRating: z.string().optional(),
  soundproofing: z.boolean().default(false),
  lightingGrid: z.boolean().default(false),
  lightingHeight: z.string().optional(),
  specialLighting: z.array(z.string()).optional(),
  naturalLight: z.boolean().default(false),
  blackoutCurtains: z.boolean().default(false),
  avEquipment: z.array(z.string()).optional(),
  wifi: z.boolean().default(false),
  internetSpeed: z.string().optional(),
  controlBoothAccess: z.boolean().default(false),
  powerSupply: z.string().optional(),
  generatorBackup: z.boolean().default(false),
  fireCertification: z.boolean().default(false),
  adaAccessible: z.boolean().default(false),
  emergencyExits: z.string().optional(),
  sprinklerSystem: z.boolean().default(false),
  firstAidStation: z.boolean().default(false),
  onsiteSecurity: z.boolean().default(false),
  
  // Access & Usage Rules
  entryType: z.string().optional(),
  bookingRequired: z.boolean().default(false),
  minimumNotice: z.string().optional(),
  insuranceRequired: z.boolean().default(false),
  staffingIncluded: z.boolean().default(false),
  staffingDetails: z.string().optional(),
  guestCapacitySeated: z.string().optional(),
  guestCapacityStanding: z.string().optional(),
  technicalCrewRequired: z.boolean().default(false),
  permittedUses: z.array(z.string()).optional(),
  restrictions: z.array(z.string()).optional(),
  
  // Location
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().optional(),
  googlePlusCode: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).nullable().optional(),
  locationDisplay: z.string().default("exact"),
  transitAccess: z.array(z.string()).optional(),
  loadingAccess: z.boolean().default(false),
  nearbyLandmarks: z.string().optional(),
  
  // Visibility & Permissions
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
  uploaderAttribution: z.string().optional(),
  assignedTourPro: z.string().optional(),
  pinProtection: z.boolean().default(false),
  pinCode: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function SetsStagesVenuesForm() {
  const [activeTab, setActiveTab] = useState("basic-info");
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingStatus: "draft",
      visibility: "public",
      locationDisplay: "exact",
      fixedSeating: false,
      dressingRooms: false,
      greenRooms: false,
      controlRoom: false,
      modularSpace: false,
      soundproofing: false,
      lightingGrid: false,
      naturalLight: false,
      blackoutCurtains: false,
      wifi: false,
      controlBoothAccess: false,
      generatorBackup: false,
      fireCertification: false,
      adaAccessible: false,
      sprinklerSystem: false,
      firstAidStation: false,
      onsiteSecurity: false,
      bookingRequired: false,
      insuranceRequired: false,
      staffingIncluded: false,
      technicalCrewRequired: false,
      loadingAccess: false,
      pinProtection: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Sets, Stages & Venues listing created successfully!");
  };

  const venueCategories = [
    "Soundstage",
    "Film Set", 
    "Television Studio",
    "Theater",
    "Music Venue",
    "Concert Hall",
    "Event Space",
    "Arena / Stadium",
    "Rehearsal Hall",
    "Immersive Experience Venue",
    "Recording Studio",
    "Multi-Use Venue",
    "Other"
  ];

  const stageTypes = [
    "Proscenium",
    "Black Box",
    "Open Air",
    "In-the-Round",
    "Modular / Flexible",
    "Soundstage",
    "Recording Booth",
    "TV Set",
    "Live Event Setup",
    "Film Lot / Outdoor Set"
  ];

  const attachedRoomOptions = [
    "Rehearsal Studio",
    "Storage Room",
    "Backstage Area",
    "Lighting Grid Access",
    "VIP Lounge",
    "Catering Area",
    "Toilets",
    "Loading Bay"
  ];

  const specialLightingOptions = [
    "Follow Spots",
    "LED Grid",
    "Color Changing",
    "Spotlights",
    "Wash Lights",
    "Gobos",
    "Haze Machine",
    "Strobe Lights"
  ];

  const avEquipmentOptions = [
    "PA System",
    "Mixing Board",
    "Video Wall",
    "Projectors",
    "Microphones",
    "Audio Monitors",
    "Live Feed Capable",
    "Camera Mounting Rigs",
    "Live Streaming Support"
  ];

  const permittedUsesOptions = [
    "Filming",
    "Live Events",
    "Concerts",
    "Streaming / Broadcast",
    "Corporate Events",
    "Rehearsals",
    "Photography / Content Shoots",
    "Immersive Exhibits",
    "Product Launches"
  ];

  const restrictionsOptions = [
    "No Smoking",
    "No Alcohol",
    "No Food",
    "Quiet Hours",
    "Time Limits",
    "Permit Required for Drone Use",
    "Additional Fees for Overtime"
  ];

  const transitOptions = [
    "Metro",
    "Bus",
    "Highway",
    "Airport"
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="venue-layout">Venue & Layout</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="access-rules">Access & Rules</TabsTrigger>
            <TabsTrigger value="media">Media & Files</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the fundamental details about your venue or stage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="listingTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Soundstage 7 – Burbank" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venueCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select venue type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {venueCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the venue, its features, and unique characteristics..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1985" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500 seated / 800 standing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="ownership"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ownership</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production Company, Municipality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="hire">Available for Hire</SelectItem>
                            <SelectItem value="sale">For Sale</SelectItem>
                            <SelectItem value="showcase">Showcase Only</SelectItem>
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
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="in-use">In Use</SelectItem>
                            <SelectItem value="renovation">Under Renovation</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="venue-layout" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Type & Layout</CardTitle>
                <CardDescription>Define the physical characteristics and layout of your venue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="stageType"
                  render={() => (
                    <FormItem>
                      <FormLabel>Stage Type (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {stageTypes.map((type) => (
                          <FormField
                            key={type}
                            control={form.control}
                            name="stageType"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={type}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(type)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), type])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== type
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {type}
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

                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="floorArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floor Area</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2000 sq ft" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ceilingHeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ceiling Height</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 20 ft" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="floorType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Floor Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select floor type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="wood">Wood</SelectItem>
                            <SelectItem value="concrete">Concrete</SelectItem>
                            <SelectItem value="rubberized">Rubberized</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fixedSeating"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Fixed Seating</FormLabel>
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

                    {form.watch("fixedSeating") && (
                      <FormField
                        control={form.control}
                        name="seatingCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seating Count</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 300" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="dressingRooms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dressing Rooms</FormLabel>
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

                    {form.watch("dressingRooms") && (
                      <FormField
                        control={form.control}
                        name="dressingRoomCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Dressing Rooms</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="greenRooms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Green Rooms</FormLabel>
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

                    {form.watch("greenRooms") && (
                      <FormField
                        control={form.control}
                        name="greenRoomCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Green Rooms</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="controlRoom"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Control Room / Booth</FormLabel>
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
                      name="modularSpace"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Modular/Reconfigurable Space</FormLabel>
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

                <FormField
                  control={form.control}
                  name="attachedRooms"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attached Rooms (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {attachedRoomOptions.map((room) => (
                          <FormField
                            key={room}
                            control={form.control}
                            name="attachedRooms"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={room}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(room)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), room])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== room
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {room}
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

                <FormField
                  control={form.control}
                  name="stageDimensions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stage Dimensions (L x W x H)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 40ft x 30ft x 25ft" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Specifications & Features</CardTitle>
                <CardDescription>Technical specifications and equipment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Acoustics & Lighting</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="acousticRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Acoustic Rating</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 40 dB" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lightingHeight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lighting Grid Height</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 18 ft" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="soundproofing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Soundproofing</FormLabel>
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
                      name="lightingGrid"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Lighting Grid</FormLabel>
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
                      name="naturalLight"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Natural Light</FormLabel>
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
                      name="blackoutCurtains"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Blackout Curtains</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="specialLighting"
                    render={() => (
                      <FormItem className="mt-4">
                        <FormLabel>Special Lighting (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {specialLightingOptions.map((lighting) => (
                            <FormField
                              key={lighting}
                              control={form.control}
                              name="specialLighting"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={lighting}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(lighting)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), lighting])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== lighting
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {lighting}
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

                <Separator />

                <div>
                  <h4 className="text-lg font-semibold mb-4">Technology</h4>
                  
                  <FormField
                    control={form.control}
                    name="avEquipment"
                    render={() => (
                      <FormItem>
                        <FormLabel>AV Equipment (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {avEquipmentOptions.map((equipment) => (
                            <FormField
                              key={equipment}
                              control={form.control}
                              name="avEquipment"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={equipment}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(equipment)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), equipment])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== equipment
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {equipment}
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

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="wifi"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">WiFi & Internet</FormLabel>
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
                      name="controlBoothAccess"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Control Booth Access</FormLabel>
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

                  {form.watch("wifi") && (
                    <FormField
                      control={form.control}
                      name="internetSpeed"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel>Internet Speed/Capacity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1 Gbps" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="powerSupply"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Power Supply (Amps/Phase)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 400A/3-Phase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="generatorBackup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Generator Backup</FormLabel>
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
                  <h4 className="text-lg font-semibold mb-4">Accessibility & Safety</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fireCertification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Fire Certification</FormLabel>
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
                      name="adaAccessible"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">ADA Accessible</FormLabel>
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
                      name="sprinklerSystem"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Sprinkler System</FormLabel>
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
                      name="firstAidStation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">First Aid Station</FormLabel>
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
                      name="onsiteSecurity"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Onsite Security</FormLabel>
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
                      name="emergencyExits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Emergency Exits</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 4" {...field} />
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

          <TabsContent value="access-rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access & Usage Rules</CardTitle>
                <CardDescription>Define access requirements and permitted uses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="entryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select entry type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="key">Key</SelectItem>
                            <SelectItem value="code">Code</SelectItem>
                            <SelectItem value="security-staff">Security Staff</SelectItem>
                            <SelectItem value="staff-only">Staff Only Access</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minimumNotice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Notice Required</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 48 hours" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
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

                  <FormField
                    control={form.control}
                    name="insuranceRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Insurance Required</FormLabel>
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
                    name="staffingIncluded"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Staffing Included</FormLabel>
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
                    name="technicalCrewRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Technical Crew Required</FormLabel>
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

                {form.watch("staffingIncluded") && (
                  <FormField
                    control={form.control}
                    name="staffingDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Staffing Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe included staff (technician, security, etc.)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guestCapacitySeated"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Capacity (Seated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 300" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestCapacityStanding"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Capacity (Standing)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="permittedUses"
                  render={() => (
                    <FormItem>
                      <FormLabel>Permitted Uses (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {permittedUsesOptions.map((use) => (
                          <FormField
                            key={use}
                            control={form.control}
                            name="permittedUses"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={use}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(use)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), use])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== use
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {use}
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

                <FormField
                  control={form.control}
                  name="restrictions"
                  render={() => (
                    <FormItem>
                      <FormLabel>Restrictions (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {restrictionsOptions.map((restriction) => (
                          <FormField
                            key={restriction}
                            control={form.control}
                            name="restrictions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={restriction}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(restriction)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), restriction])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== restriction
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {restriction}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>Upload visual content and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-6">
                  {/* Featured Image Section */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Featured Image</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Upload main image for your venue listing</p>
                        <p className="text-sm text-muted-foreground mt-2">This will be the primary image shown in search results</p>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Or paste image URL" className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">360° Virtual Tours</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">Drag and drop 360° tour files here, or click to browse</p>
                        <p className="text-sm text-muted-foreground mt-2">Recommended first for immersive experiences</p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add 360° Tour
                        </Button>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">360° Tour</Badge>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Tour Name</Label>
                              <Input placeholder="e.g., Main Stage Tour" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL or File Upload</Label>
                              <Input placeholder="Enter URL or upload file..." />
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">Description</Label>
                              <Textarea placeholder="Describe this tour..." rows={2} />
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Photos</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">Upload interior, stage, equipment, seating, and backstage photos</p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">Photo</Badge>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Photo Name</Label>
                              <Input placeholder="e.g., Main Stage Setup" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL or File Upload</Label>
                              <Input placeholder="Enter URL or upload file..." />
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">Description</Label>
                              <Textarea placeholder="Describe this photo..." rows={2} />
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Videos</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">Upload performance videos, venue walkthroughs, setup videos</p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Video
                        </Button>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">Video</Badge>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Video Name</Label>
                              <Input placeholder="e.g., Performance Showcase" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL or File Upload</Label>
                              <Input placeholder="YouTube, Vimeo, or upload file..." />
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">Description</Label>
                              <Textarea placeholder="Describe this video..." rows={2} />
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Drone Footage</h4>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <p className="text-muted-foreground">Upload aerial footage (if applicable)</p>
                      </div>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Drone Footage
                        </Button>
                        
                        <Card className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline">Drone Footage</Badge>
                            <Button variant="ghost" size="sm">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Footage Name</Label>
                              <Input placeholder="e.g., Venue Aerial View" />
                            </div>
                            <div>
                              <Label className="text-sm font-medium">URL or File Upload</Label>
                              <Input placeholder="Enter URL or upload file..." />
                            </div>
                            <div className="md:col-span-2">
                              <Label className="text-sm font-medium">Description</Label>
                              <Textarea placeholder="Describe this drone footage..." rows={2} />
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Floor Plans & Technical Layouts</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Upload PDF or image files of floor plans and technical layouts</p>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Or paste URLs to floor plans/documents" className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Documents & Licenses</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Upload fire safety docs, sound ratings, insurance, venue specifications</p>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Or paste URLs to documents" className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>Specify the venue's location and accessibility details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
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
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Region/State</FormLabel>
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

                <FormField
                  control={form.control}
                  name="googlePlusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Plus Code (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 8Q7X+2F" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>Select Location on Map</FormLabel>
                  <div className="h-[400px] border rounded-lg overflow-hidden">
                    <MapboxLocationPicker
                      coordinates={form.watch("coordinates") ? { lat: form.watch("coordinates")!.lat, lng: form.watch("coordinates")!.lng } : undefined}
                      onCoordinatesChange={(coords) => coords && form.setValue("coordinates", coords)}
                      zoom={14}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="locationDisplay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Display</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select display option" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="exact">Exact</SelectItem>
                          <SelectItem value="approximate">Approximate</SelectItem>
                          <SelectItem value="hidden">Hidden</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transitAccess"
                  render={() => (
                    <FormItem>
                      <FormLabel>Accessibility via Transit (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {transitOptions.map((transit) => (
                          <FormField
                            key={transit}
                            control={form.control}
                            name="transitAccess"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={transit}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(transit)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), transit])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== transit
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {transit}
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

                <FormField
                  control={form.control}
                  name="loadingAccess"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Loading Access for Trucks</FormLabel>
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
                  name="nearbyLandmarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nearby Landmarks (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe notable nearby landmarks or points of interest"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibility & Permissions</CardTitle>
                <CardDescription>Control who can see and access your listing</CardDescription>
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
                            <SelectItem value="private">Private</SelectItem>
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
                            <SelectItem value="link-only">Link Only</SelectItem>
                            <SelectItem value="admin-only">Admin Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="uploaderAttribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Uploader Attribution</FormLabel>
                      <FormControl>
                        <Input placeholder="Person or Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="assignedTourPro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned Tour Pro (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Tour professional name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                    name="pinCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Enter PIN" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="rounded-lg border p-4 bg-muted/50">
                  <h4 className="font-semibold">Shareable Listing URL</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Auto-generated: https://xplor.com/venues/[listing-id]
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit">
            Create Listing
          </Button>
        </div>
      </form>
    </Form>
  );
}