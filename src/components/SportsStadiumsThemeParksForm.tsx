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
import { Plus, X, MapPin, Ticket, Shield, Users } from "lucide-react";

const formSchema = z.object({
  // Basic Info
  listingTitle: z.string().min(1, "Listing title is required"),
  venueType: z.string().min(1, "Venue type is required"),
  description: z.string().min(1, "Description is required"),
  ownerOperator: z.string().optional(),
  yearBuilt: z.string().optional(),
  maxCapacity: z.string().optional(),
  primaryUse: z.array(z.string()).optional(),
  listingType: z.string().min(1, "Listing type is required"),
  currentStatus: z.string().min(1, "Current status is required"),
  
  // Venue Type & Zones
  totalArea: z.string().optional(),
  totalZones: z.string().optional(),
  zones: z.array(z.object({
    name: z.string(),
    type: z.string(),
    description: z.string().optional(),
    sizeCapacity: z.string().optional(),
    publicAccess: z.boolean().default(true),
  })).optional(),
  
  // Attractions & Facilities
  rideTypes: z.array(z.string()).optional(),
  eventCapabilities: z.array(z.string()).optional(),
  guestServices: z.array(z.string()).optional(),
  foodBeverage: z.array(z.string()).optional(),
  alcoholServing: z.boolean().default(false),
  
  // Access & Rules
  entryType: z.string().optional(),
  ticketRequired: z.boolean().default(false),
  bookingUrl: z.string().optional(),
  idRequired: z.boolean().default(false),
  operatingHours: z.string().optional(),
  parkingAvailable: z.boolean().default(false),
  parkingSpaces: z.string().optional(),
  shuttleTransport: z.boolean().default(false),
  shuttleNotes: z.string().optional(),
  dressCode: z.boolean().default(false),
  dressCodeDetails: z.string().optional(),
  ageRestrictions: z.boolean().default(false),
  minAge: z.string().optional(),
  maxAge: z.string().optional(),
  supervisionRequired: z.boolean().default(false),
  groupVisits: z.boolean().default(false),
  groupSizeLimit: z.string().optional(),
  securityScreening: z.boolean().default(false),
  securityDetails: z.string().optional(),
  foodAllowed: z.boolean().default(false),
  smokingAllowed: z.boolean().default(false),
  droneUse: z.string().optional(),
  restrictedZones: z.string().optional(),
  petPolicy: z.string().optional(),
  
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
  transportAccess: z.array(z.string()).optional(),
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

export default function SportsStadiumsThemeParksForm() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [zones, setZones] = useState<Array<{ name: string; type: string; description: string; sizeCapacity: string; publicAccess: boolean }>>([]);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingStatus: "draft",
      visibility: "public",
      alcoholServing: false,
      ticketRequired: false,
      idRequired: false,
      parkingAvailable: false,
      shuttleTransport: false,
      dressCode: false,
      ageRestrictions: false,
      supervisionRequired: false,
      groupVisits: false,
      securityScreening: false,
      foodAllowed: false,
      smokingAllowed: false,
      pinProtection: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Sports Stadium & Theme Park listing created successfully!");
  };

  const venueTypes = [
    "Sports Stadium",
    "Arena", 
    "Theme Park",
    "Water Park",
    "Amusement Park",
    "Racing Track",
    "Multi-Sport Complex",
    "Zoo / Safari Park",
    "Exhibition & Event Park",
    "Other"
  ];

  const primaryUseOptions = [
    "Sports",
    "Concerts", 
    "Entertainment",
    "Educational",
    "Tourism",
    "Business Events"
  ];

  const zoneTypes = [
    "Seating Area",
    "Ride / Attraction",
    "Performance Stage", 
    "Food Court",
    "Rest Area / Park",
    "Parking",
    "Guest Entrance",
    "Locker Area",
    "Hospitality Suite",
    "Kids Zone",
    "Animal Exhibit",
    "Water Zone",
    "Other"
  ];

  const rideTypeOptions = [
    "Roller Coasters",
    "Water Slides",
    "Simulators / VR",
    "Ferris Wheel",
    "Go-Karts",
    "Haunted House",
    "Safari Ride",
    "Educational Zone",
    "Petting Zoo",
    "Live Performance Stage",
    "Stadium Field / Arena",
    "Zip Line / Ropes Course"
  ];

  const eventCapabilityOptions = [
    "Concert Hosting",
    "Sport Matches",
    "Private Events",
    "Film Shoots",
    "Parades & Fireworks",
    "Seasonal Festivals"
  ];

  const guestServiceOptions = [
    "Locker Rooms",
    "First Aid Stations",
    "ATMs",
    "Lost & Found",
    "Baby Changing Stations",
    "Rental Equipment",
    "Rest Areas",
    "Drinking Water Stations",
    "Accessibility Paths (ADA compliant)"
  ];

  const foodBeverageOptions = [
    "Food Court",
    "Fine Dining",
    "Snack Booths",
    "Themed Restaurants"
  ];

  const transportOptions = [
    "Metro / Train",
    "Bus / Tram",
    "Highway",
    "Airport",
    "Taxi Drop-Off"
  ];

  const addZone = () => {
    setZones([...zones, { name: "", type: "", description: "", sizeCapacity: "", publicAccess: true }]);
  };

  const removeZone = (index: number) => {
    setZones(zones.filter((_, i) => i !== index));
  };

  const updateZone = (index: number, field: string, value: any) => {
    const updatedZones = [...zones];
    updatedZones[index] = { ...updatedZones[index], [field]: value };
    setZones(updatedZones);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="venue-zones">Venue & Zones</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="access-rules">Access & Rules</TabsTrigger>
            <TabsTrigger value="media">Media & Files</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the fundamental details about your venue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="listingTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Olympic Stadium Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="venueType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Venue Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select venue type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {venueTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
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
                    name="ownerOperator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner / Operator</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., City Sports Authority" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built / Established</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 1985" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="maxCapacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Visitor Capacity</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 80,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="primaryUse"
                  render={() => (
                    <FormItem>
                      <FormLabel>Primary Use (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {primaryUseOptions.map((use) => (
                          <FormField
                            key={use}
                            control={form.control}
                            name="primaryUse"
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
                            <SelectItem value="showcase">Showcase Only</SelectItem>
                            <SelectItem value="booking">Available for Private Booking</SelectItem>
                            <SelectItem value="public">Public Venue</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="seasonal">Seasonal</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                            <SelectItem value="closed">Temporarily Closed</SelectItem>
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

          <TabsContent value="venue-zones" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Venue Type & Zones</CardTitle>
                <CardDescription>Define the physical layout and zones of your venue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="totalArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Area</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 50 acres / 200,000 sq m" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="totalZones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Number of Zones</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">Zone Configuration</h4>
                    <Button type="button" onClick={addZone} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Zone
                    </Button>
                  </div>

                  {zones.map((zone, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="font-medium">Zone {index + 1}</h5>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeZone(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Zone Name</label>
                          <Input
                            placeholder="e.g., North Stand"
                            value={zone.name}
                            onChange={(e) => updateZone(index, "name", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Zone Type</label>
                          <Select 
                            value={zone.type} 
                            onValueChange={(value) => updateZone(index, "type", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {zoneTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          placeholder="Brief description of this zone..."
                          value={zone.description}
                          onChange={(e) => updateZone(index, "description", e.target.value)}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="text-sm font-medium">Size or Capacity</label>
                          <Input
                            placeholder="e.g., 5,000 seats"
                            value={zone.sizeCapacity}
                            onChange={(e) => updateZone(index, "sizeCapacity", e.target.value)}
                          />
                        </div>
                        <div className="flex items-center space-x-2 mt-6">
                          <Switch
                            checked={zone.publicAccess}
                            onCheckedChange={(checked) => updateZone(index, "publicAccess", checked)}
                          />
                          <label className="text-sm font-medium">Public Access</label>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attractions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attractions & Facilities</CardTitle>
                <CardDescription>Define the attractions, services, and amenities available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Attractions & Experiences</h4>
                  
                  <FormField
                    control={form.control}
                    name="rideTypes"
                    render={() => (
                      <FormItem>
                        <FormLabel>Ride Types (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {rideTypeOptions.map((ride) => (
                            <FormField
                              key={ride}
                              control={form.control}
                              name="rideTypes"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={ride}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(ride)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), ride])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== ride
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {ride}
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
                    name="eventCapabilities"
                    render={() => (
                      <FormItem>
                        <FormLabel>Event Capabilities (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {eventCapabilityOptions.map((capability) => (
                            <FormField
                              key={capability}
                              control={form.control}
                              name="eventCapabilities"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={capability}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(capability)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), capability])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== capability
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {capability}
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
                  <h4 className="text-lg font-semibold mb-4">Guest Services</h4>
                  
                  <FormField
                    control={form.control}
                    name="guestServices"
                    render={() => (
                      <FormItem>
                        <FormLabel>Available Services (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {guestServiceOptions.map((service) => (
                            <FormField
                              key={service}
                              control={form.control}
                              name="guestServices"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={service}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(service)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), service])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== service
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {service}
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
                  <h4 className="text-lg font-semibold mb-4">Food & Beverage</h4>
                  
                  <FormField
                    control={form.control}
                    name="foodBeverage"
                    render={() => (
                      <FormItem>
                        <FormLabel>Food & Beverage Options (Multi-select)</FormLabel>
                        <div className="grid grid-cols-2 gap-2">
                          {foodBeverageOptions.map((option) => (
                            <FormField
                              key={option}
                              control={form.control}
                              name="foodBeverage"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), option])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== option
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option}
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
                    name="alcoholServing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Alcohol Serving Zones</FormLabel>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access-rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access & Rules</CardTitle>
                <CardDescription>Define entry requirements and venue policies</CardDescription>
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
                            <SelectItem value="staffed">Staffed</SelectItem>
                            <SelectItem value="digital">Digital Ticket</SelectItem>
                            <SelectItem value="rfid">RFID Band</SelectItem>
                            <SelectItem value="qr">QR Code</SelectItem>
                            <SelectItem value="access-card">Access Card</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Daily Operating Hours</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 9:00 AM - 6:00 PM" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ticketRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Ticket Required</FormLabel>
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
                    name="idRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">ID Required</FormLabel>
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

                {form.watch("ticketRequired") && (
                  <FormField
                    control={form.control}
                    name="bookingUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://tickets.venue.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="parkingAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Parking Available</FormLabel>
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
                    name="shuttleTransport"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Shuttle / Transport Access</FormLabel>
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

                {form.watch("parkingAvailable") && (
                  <FormField
                    control={form.control}
                    name="parkingSpaces"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Parking Spaces</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5,000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("shuttleTransport") && (
                  <FormField
                    control={form.control}
                    name="shuttleNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shuttle / Transport Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe shuttle routes, schedules, pickup points..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dressCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dress Code</FormLabel>
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
                    name="ageRestrictions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Age Restrictions</FormLabel>
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
                          <Input placeholder="Describe dress code requirements..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch("ageRestrictions") && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Age</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Age (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 65" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="supervisionRequired"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Supervision for Children Required</FormLabel>
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
                    name="groupVisits"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Group Visit Policy</FormLabel>
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

                {form.watch("groupVisits") && (
                  <FormField
                    control={form.control}
                    name="groupSizeLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Group Size Limit</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Max 50 people per group" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="securityScreening"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Security Screening</FormLabel>
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
                    name="foodAllowed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Food Allowed</FormLabel>
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
                    name="smokingAllowed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Smoking Allowed</FormLabel>
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

                {form.watch("securityScreening") && (
                  <FormField
                    control={form.control}
                    name="securityDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe security procedures, prohibited items, etc."
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
                    name="droneUse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drone Use</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select drone policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="allowed">Allowed</SelectItem>
                            <SelectItem value="not-allowed">Not Allowed</SelectItem>
                            <SelectItem value="permit">Only With Permit</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="petPolicy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pet Policy</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pet policy" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="allowed">Allowed</SelectItem>
                            <SelectItem value="not-allowed">Not Allowed</SelectItem>
                            <SelectItem value="service-only">Only Service Animals</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="restrictedZones"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Restricted Zones</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any restricted areas or zones with limited access..."
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

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>Upload visual content and documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                        <p className="text-sm text-muted-foreground mt-2">Required for Xplor Certified status</p>
                      </div>
                      
                      {/* Multiple 360 Tours with names and descriptions */}
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add 360° Tour
                        </Button>
                        
                        {/* Example tour item - this would be dynamically generated */}
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
                              <Input placeholder="e.g., Main Arena Tour" />
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
                        <p className="text-muted-foreground">Upload photos of attractions, zones, maps, crowds, infrastructure</p>
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
                              <Input placeholder="e.g., Main Entrance" />
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
                        <p className="text-muted-foreground">Upload tours, performances, walkthroughs</p>
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
                              <Input placeholder="e.g., Stadium Walkthrough" />
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
                        <p className="text-muted-foreground">Upload aerial footage of the venue</p>
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
                              <Input placeholder="e.g., Aerial Overview" />
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
                    <h4 className="text-lg font-semibold mb-2">Maps & Floor Plans</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Upload PDF or image files of venue maps and layouts</p>
                      </div>
                      <div className="flex gap-2">
                        <Input placeholder="Or paste URLs to maps/floor plans" className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">Safety & Operational Documents</h4>
                    <div className="space-y-3">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground">Upload insurance certificates, permits, fire safety plans</p>
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
                <CardDescription>Specify the venue location and accessibility details</CardDescription>
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
                  name="transportAccess"
                  render={() => (
                    <FormItem>
                      <FormLabel>Transport Access (Multi-select)</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                        {transportOptions.map((transport) => (
                          <FormField
                            key={transport}
                            control={form.control}
                            name="transportAccess"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={transport}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(transport)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), transport])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== transport
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {transport}
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
                  name="nearbyLandmarks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nearest Hotels or Landmarks</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe nearby hotels, landmarks, or points of interest"
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
                            <SelectItem value="private">Private</SelectItem>
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
                        <Input placeholder="Business Name or Creator" {...field} />
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