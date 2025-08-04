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
import { Plus, X, Upload, Building, Users, Shield, MapPin, Settings, FileText, Stethoscope } from "lucide-react";

const zoneSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  publicAccess: z.boolean(),
  size: z.string().optional(),
  notes: z.string().optional(),
});

const formSchema = z.object({
  // Basic Info
  title: z.string().min(1, "Title is required"),
  buildingType: z.string().min(1, "Building type is required"),
  description: z.string().min(1, "Description is required"),
  yearBuilt: z.string().optional(),
  managingEntity: z.string().optional(),
  publicOrPrivate: z.boolean().default(true),
  listingType: z.string().min(1, "Listing type is required"),
  operationalStatus: z.string().min(1, "Status is required"),

  // Building Type & Use
  primaryFunction: z.array(z.string()).default([]),
  totalFloorArea: z.string().optional(),
  floorAreaUnit: z.string().default("sqm"),
  floorsAbove: z.string().optional(),
  floorsBelow: z.string().optional(),
  occupancyCapacity: z.string().optional(),
  certifications: z.array(z.string()).default([]),

  // Departments & Zones
  zones: z.array(zoneSchema).default([]),

  // Facilities & Services (Government)
  receptionDesk: z.boolean().default(false),
  passportServices: z.boolean().default(false),
  translationServices: z.boolean().default(false),
  accessibilityDesks: z.boolean().default(false),
  meetingRooms: z.boolean().default(false),
  meetingRoomCapacity: z.string().optional(),
  cafeteria: z.boolean().default(false),
  publicToilets: z.boolean().default(false),
  accessibleToilets: z.boolean().default(false),
  publicWifi: z.boolean().default(false),
  wifiRestrictions: z.string().optional(),
  securityCheckpoint: z.boolean().default(false),
  securityDescription: z.string().optional(),
  parkingType: z.string().optional(),

  // Hospital-specific facilities
  emergencyRoom: z.boolean().default(false),
  emergency24h: z.boolean().default(false),
  ambulanceBay: z.boolean().default(false),
  ambulanceBayDescription: z.string().optional(),
  icuWard: z.boolean().default(false),
  maternityServices: z.boolean().default(false),
  specialtyServices: z.array(z.string()).default([]),
  totalPatientCapacity: z.string().optional(),
  icuCapacity: z.string().optional(),
  dailyVisits: z.string().optional(),
  doctorsCount: z.string().optional(),
  nursesCount: z.string().optional(),
  adminCount: z.string().optional(),
  pharmacyType: z.string().optional(),
  imagingServices: z.array(z.string()).default([]),
  pathologyLab: z.boolean().default(false),
  helipad: z.boolean().default(false),
  helipadNotes: z.string().optional(),

  // Access & Rules
  entryControl: z.string().optional(),
  visitingHours: z.string().optional(),
  idRequired: z.boolean().default(false),
  ageRestrictions: z.string().optional(),
  healthRestrictions: z.boolean().default(false),
  healthRestrictionsDetails: z.string().optional(),
  escortRequired: z.boolean().default(false),
  staffEntryProtocol: z.string().optional(),
  dronePolicy: z.string().optional(),
  smokingPolicy: z.string().optional(),
  emergencyExits: z.boolean().default(false),
  emergencyExitCount: z.string().optional(),
  fireSafety: z.array(z.string()).default([]),

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
  }).optional(),
  mapDisplay: z.string().default("exact"),
  nearbyServices: z.array(z.string()).default([]),

  // Visibility
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
  uploaderName: z.string().optional(),
  pinProtection: z.boolean().default(false),
  pin: z.string().optional(),
  allowEmbedding: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

export default function GovHospitalForm() {
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({
    featured: [],
    tours: [],
    photos: [],
    videos: [],
    droneFootage: [],
    documents: []
  });

  const [zones, setZones] = useState<z.infer<typeof zoneSchema>[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buildingType: "",
      listingType: "",
      operationalStatus: "open",
      publicOrPrivate: true,
      floorAreaUnit: "sqm",
      primaryFunction: [],
      certifications: [],
      zones: [],
      specialtyServices: [],
      imagingServices: [],
      fireSafety: [],
      nearbyServices: [],
      mapDisplay: "exact",
      listingStatus: "draft",
      visibility: "public",
      allowEmbedding: true,
    },
  });

  const buildingTypeOptions = [
    "Government Office", "Courthouse", "Parliament / City Hall", "Embassy / Consulate",
    "Customs / Immigration", "Police Station", "Fire Station", "Public Library",
    "Public Service Center", "General Hospital", "Specialty Hospital", "Research Hospital",
    "Clinic", "Military Medical Facility", "Rehabilitation Center", "Other"
  ];

  const listingTypeOptions = ["Showcase Only", "For Access", "For Training", "For Planning"];
  const statusOptions = ["Open", "Restricted", "Renovation", "Decommissioned"];
  const primaryFunctionOptions = [
    "Administrative", "Legislative", "Judicial", "Health Services", "Emergency Response",
    "Research / Laboratory", "Education / Outreach", "Archival / Records", 
    "International Relations", "Diagnostic / Treatment", "Surgical / Intensive Care", "Other"
  ];

  const zoneTypeOptions = [
    "Administrative Office", "Public Service Counter", "Waiting Area", "Examination Room",
    "Operating Theater", "Wards / Patient Rooms", "Pharmacy", "Laboratory", "Morgue",
    "Archives / Storage", "Cafeteria / Kitchen", "Lobby / Entrance", "Helipad / Ambulance Bay",
    "Secure Area", "Utility / Maintenance", "Other"
  ];

  const certificationOptions = ["LEED / BREEAM", "Hospital Accreditation", "Safety or Emergency Planning Cert", "Accessibility Compliance"];
  const specialtyOptions = ["Pediatrics", "Oncology", "Cardiology", "Neurology", "Orthopedics", "Psychiatry", "Radiology", "Other"];
  const imagingOptions = ["X-ray", "MRI", "CT", "Ultrasound", "PET Scan", "Mammography"];
  const pharmacyOptions = ["In-house", "Adjacent", "None"];
  const entryControlOptions = ["Security", "Badge Access", "Open Access", "Staff Only"];
  const fireSafetyOptions = ["Extinguishers", "Sprinklers", "Emergency Lighting", "Fire Doors", "Alarm System"];
  const droneOptions = ["Allowed", "Permit Required", "Not Allowed"];
  const nearbyServiceOptions = ["Public Transport", "Parking", "Hotels", "Government Buildings", "Medical Facilities"];

  const isHospital = form.watch("buildingType")?.includes("hospital") || form.watch("buildingType")?.includes("clinic");

  const addZone = () => {
    const newZone = {
      id: Date.now().toString(),
      name: "",
      type: "",
      publicAccess: true,
      size: "",
      notes: ""
    };
    setZones([...zones, newZone]);
    form.setValue("zones", [...zones, newZone]);
  };

  const removeZone = (id: string) => {
    const updatedZones = zones.filter(zone => zone.id !== id);
    setZones(updatedZones);
    form.setValue("zones", updatedZones);
  };

  const updateZone = (id: string, field: string, value: any) => {
    const updatedZones = zones.map(zone =>
      zone.id === id ? { ...zone, [field]: value } : zone
    );
    setZones(updatedZones);
    form.setValue("zones", updatedZones);
  };

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
    toast.success("Government/Hospital listing saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-8 text-xs">
              <TabsTrigger value="basic-info">
                <Building className="h-3 w-3 mr-1" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="building-type">
                Type & Use
              </TabsTrigger>
              <TabsTrigger value="zones">
                <Users className="h-3 w-3 mr-1" />
                Zones
              </TabsTrigger>
              <TabsTrigger value="facilities">
                {isHospital ? <Stethoscope className="h-3 w-3 mr-1" /> : <FileText className="h-3 w-3 mr-1" />}
                Facilities
              </TabsTrigger>
              <TabsTrigger value="access">
                <Shield className="h-3 w-3 mr-1" />
                Access
              </TabsTrigger>
              <TabsTrigger value="media">
                Media
              </TabsTrigger>
              <TabsTrigger value="location">
                <MapPin className="h-3 w-3 mr-1" />
                Location
              </TabsTrigger>
              <TabsTrigger value="visibility">
                <Settings className="h-3 w-3 mr-1" />
                Visibility
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic-info" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Enter the basic details about your government building or hospital</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ministry of Finance – Abu Dhabi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="buildingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Building Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select building type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {buildingTypeOptions.map((option) => (
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
                      name="yearBuilt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Built</FormLabel>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the building, its purpose, and key features..."
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
                      name="managingEntity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Managing Entity</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Ministry of Health" {...field} />
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
                      name="operationalStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operational Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusOptions.map((option) => (
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

                  <FormField
                    control={form.control}
                    name="publicOrPrivate"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Public Entity</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Toggle off if this is a private facility
                          </div>
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
                        <p className="text-muted-foreground">Upload main image for your building listing</p>
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
                    { key: 'tours', title: '360° Virtual Tours', desc: 'Immersive building tours' },
                    { key: 'photos', title: 'Photos', desc: 'Interior, exterior, departments, entrances' },
                    { key: 'videos', title: 'Videos', desc: 'Walkthroughs, public service messages, training' },
                    { key: 'droneFootage', title: 'Drone Footage', desc: 'Aerial building views (if allowed)' },
                    { key: 'documents', title: 'Documents', desc: 'Floor plans, emergency plans, certificates' }
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
                                  <Input placeholder={`e.g., ${key === 'tours' ? 'Main Building Tour' : key === 'videos' ? 'Public Service Guide' : 'Building Overview'}`} />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Department/Zone</Label>
                                  <Select>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {zones.map((zone) => (
                                        <SelectItem key={zone.id} value={zone.id}>
                                          {zone.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">URL or File Upload</Label>
                                  <Input placeholder="Enter URL or upload file..." />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Visibility</Label>
                                  <Select defaultValue="public">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="public">Public</SelectItem>
                                      <SelectItem value="admin">Admin Only</SelectItem>
                                      <SelectItem value="pin">PIN Protected</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                  <CardDescription>Specify the building location and accessibility details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Address *</FormLabel>
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
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              Publish Listing
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}