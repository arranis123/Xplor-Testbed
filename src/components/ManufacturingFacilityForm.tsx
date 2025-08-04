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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, MapPin } from 'lucide-react';
import { toast } from "sonner";
import MapboxLocationPicker from './MapboxLocationPicker';

// Schema
const manufacturingFacilitySchema = z.object({
  // Basic Info
  listingTitle: z.string().min(1, "Listing title is required"),
  facilityType: z.string().min(1, "Facility type is required"),
  description: z.string().optional(),
  yearBuilt: z.string().optional(),
  currentUse: z.string().min(1, "Current use is required"),
  status: z.string().min(1, "Status is required"),
  ownerOperator: z.string().optional(),
  availableFloorArea: z.string().optional(),
  floorAreaUnit: z.string().default("m2"),
  totalSiteArea: z.string().optional(),
  siteAreaUnit: z.string().default("m2"),
  numberOfFloors: z.string().optional(),
  ceilingHeight: z.string().optional(),
  ceilingHeightUnit: z.string().default("m"),
  
  // Facility Details
  constructionType: z.string().optional(),
  buildingCondition: z.string().optional(),
  powerSupply: z.string().optional(),
  hvacVentilation: z.boolean().default(false),
  hvacDescription: z.string().optional(),
  lighting: z.array(z.string()).default([]),
  loadingBays: z.string().optional(),
  loadingBayDetails: z.string().optional(),
  dockLevelAccess: z.boolean().default(false),
  driveInAccess: z.boolean().default(false),
  productionLines: z.string().optional(),
  productionLinesDescription: z.string().optional(),
  staffCapacity: z.string().optional(),
  officeSpace: z.string().optional(),
  controlRoom: z.boolean().default(false),
  cafeteria: z.boolean().default(false),
  meetingRooms: z.string().optional(),
  
  // Production Capabilities & Equipment
  manufacturingType: z.string().optional(),
  cleanRoom: z.boolean().default(false),
  cleanRoomClass: z.string().optional(),
  automationLevel: z.string().optional(),
  machineryList: z.string().optional(),
  cncEquipment: z.boolean().default(false),
  cncNumber: z.string().optional(),
  assemblyLine: z.boolean().default(false),
  assemblyCapacity: z.string().optional(),
  packagingLine: z.boolean().default(false),
  testingLab: z.boolean().default(false),
  testingEquipment: z.string().optional(),
  temperatureControlled: z.boolean().default(false),
  temperatureControlledArea: z.string().optional(),
  certifications: z.array(z.string()).default([]),
  
  // Utilities & Compliance
  electricityCapacity: z.string().optional(),
  electricityBackup: z.string().optional(),
  waterSupply: z.string().optional(),
  gasConnection: z.boolean().default(false),
  gasFlowRate: z.string().optional(),
  compressedAir: z.boolean().default(false),
  wastewaterTreatment: z.string().optional(),
  drainageSystem: z.string().optional(),
  fireSafetySystem: z.array(z.string()).default([]),
  emergencyExits: z.boolean().default(false),
  emergencyExitNumber: z.string().optional(),
  environmentalClearance: z.boolean().default(false),
  workerSafety: z.boolean().default(false),
  buildingPermit: z.boolean().default(false),
  hazardousMaterialPermit: z.boolean().default(false),
  
  // Location
  fullAddress: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  mainRoads: z.boolean().default(false),
  mainRoadsDistance: z.string().optional(),
  ports: z.boolean().default(false),
  portsDetails: z.string().optional(),
  airports: z.boolean().default(false),
  airportsDetails: z.string().optional(),
  industrialZones: z.boolean().default(false),
  industrialZonesName: z.string().optional(),
  laborAvailability: z.string().optional(),
  publicTransport: z.boolean().default(false),
  publicTransportDetails: z.string().optional(),
  
  // Visibility & Permissions
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
  uploaderContact: z.string().optional(),
  assignedTourPro: z.string().optional(),
  allowEmbedding: z.boolean().default(true),
  pinProtection: z.boolean().default(false),
  pinCode: z.string().optional(),
});

type ManufacturingFacilityFormData = z.infer<typeof manufacturingFacilitySchema>;

// Media file interface
interface MediaFile {
  id: string;
  name: string;
  description: string;
  tag: string;
  visibility: 'public' | 'admin' | 'pin';
  type: 'image' | 'video' | 'document' | 'tour' | 'plan';
  url?: string;
  file?: File;
}

const facilityTypes = [
  "General Manufacturing", "Heavy Industry", "Food Processing", "Pharmaceutical",
  "Automotive Assembly", "Chemical Plant", "Electronics / Semiconductor", 
  "Textile Mill", "Warehouse & Distribution", "Research & Development", "Other"
];

const lightingOptions = [
  "LED", "Fluorescent", "Skylights", "Natural"
];

const certificationOptions = [
  "ISO 9001", "ISO 14001", "ISO 22000", "GMP", "FDA Registered", "HACCP", "CE", "Other"
];

const fireSafetyOptions = [
  "Sprinklers", "Extinguishers", "Fire Doors", "Detectors"
];

export default function ManufacturingFacilityForm() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [featuredImage, setFeaturedImage] = useState<MediaFile | null>(null);

  const form = useForm<ManufacturingFacilityFormData>({
    resolver: zodResolver(manufacturingFacilitySchema),
    defaultValues: {
      listingStatus: "draft",
      visibility: "public",
      floorAreaUnit: "m2",
      siteAreaUnit: "m2",
      ceilingHeightUnit: "m",
      lighting: [],
      certifications: [],
      fireSafetySystem: [],
      allowEmbedding: true,
    },
  });

  const onSubmit = (data: ManufacturingFacilityFormData) => {
    console.log('Form submitted:', data);
    console.log('Media files:', mediaFiles);
    console.log('Featured image:', featuredImage);
    toast.success("Manufacturing facility listing saved successfully!");
  };

  const addMediaFile = (type: MediaFile['type']) => {
    const newFile: MediaFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      description: '',
      tag: '',
      visibility: 'public',
      type
    };
    setMediaFiles([...mediaFiles, newFile]);
  };

  const updateMediaFile = (id: string, updates: Partial<MediaFile>) => {
    setMediaFiles(files => files.map(file => 
      file.id === id ? { ...file, ...updates } : file
    ));
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles(files => files.filter(file => file.id !== id));
    if (featuredImage?.id === id) {
      setFeaturedImage(null);
    }
  };

  const setAsFeatured = (file: MediaFile) => {
    if (file.type === 'image') {
      setFeaturedImage(file);
      toast.success("Featured image set successfully!");
    }
  };

  const handleCoordinatesChange = (lat: number, lng: number) => {
    form.setValue('coordinates', { lat, lng });
  };

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: "📋" },
    { id: "facility-details", label: "Facility Details", icon: "🏭" },
    { id: "production", label: "Production & Equipment", icon: "⚙️" },
    { id: "utilities", label: "Utilities & Compliance", icon: "🔧" },
    { id: "media", label: "Media & Files", icon: "📸" },
    { id: "location", label: "Location", icon: "📍" },
    { id: "visibility", label: "Visibility", icon: "👁️" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Upload Manufacturing Facility</h1>
        <p className="text-muted-foreground">
          Showcase, lease, sell, or document manufacturing spaces with technical and operational details
        </p>
      </div>

      <div className="flex gap-6">
        {/* Vertical Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Basic Info Content */}
              {activeTab === "basic-info" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="listingTitle"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Listing Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Steel Fabrication Plant – Barcelona" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facilityType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facility Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select facility type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {facilityTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
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
                              <Input placeholder="e.g., 2010" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currentUse"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Use *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select current use" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="operational">Operational</SelectItem>
                                <SelectItem value="idle">Idle</SelectItem>
                                <SelectItem value="under-renovation">Under Renovation</SelectItem>
                                <SelectItem value="repurposed">Repurposed</SelectItem>
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
                            <FormLabel>Status *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-lease">For Lease</SelectItem>
                                <SelectItem value="showcase-only">Showcase Only</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="ownerOperator"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner / Operator</FormLabel>
                            <FormControl>
                              <Input placeholder="Company or individual name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="availableFloorArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Available Floor Area</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 5000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="floorAreaUnit"
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
                                  <SelectItem value="m2">m²</SelectItem>
                                  <SelectItem value="ft2">ft²</SelectItem>
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
                          name="totalSiteArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Total Site Area</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 10000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="siteAreaUnit"
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
                                  <SelectItem value="m2">m²</SelectItem>
                                  <SelectItem value="acres">acres</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="numberOfFloors"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Floors</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="ceilingHeight"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ceiling Height</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 8" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="ceilingHeightUnit"
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
                                  <SelectItem value="m">meters</SelectItem>
                                  <SelectItem value="ft">feet</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed description of the manufacturing facility..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Facility Details Content */}
              {activeTab === "facility-details" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Construction & Infrastructure</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="constructionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Construction Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select construction type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="steel-frame">Steel Frame</SelectItem>
                                <SelectItem value="concrete">Concrete</SelectItem>
                                <SelectItem value="hybrid">Hybrid</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buildingCondition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Building Condition</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="good">Good</SelectItem>
                                <SelectItem value="fair">Fair</SelectItem>
                                <SelectItem value="requires-renovation">Requires Renovation</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="powerSupply"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Power Supply</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 500 kW, 415V" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="hvacVentilation"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>HVAC / Ventilation System</FormLabel>
                            </FormItem>
                          )}
                        />

                        {form.watch("hvacVentilation") && (
                          <FormField
                            control={form.control}
                            name="hvacDescription"
                            render={({ field }) => (
                              <FormItem className="ml-6">
                                <FormLabel>HVAC Description</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Describe HVAC/ventilation system..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Lighting & Access</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Lighting Options</h4>
                        <FormField
                          control={form.control}
                          name="lighting"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {lightingOptions.map((lighting) => (
                                  <FormField
                                    key={lighting}
                                    control={form.control}
                                    name="lighting"
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
                                                  ? field.onChange([...field.value, lighting])
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="loadingBays"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loading Bays (Number)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 4" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="loadingBayDetails"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Loading Bay Details</FormLabel>
                              <FormControl>
                                <Input placeholder="Height, covered/uncovered" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="dockLevelAccess"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Dock Level Access</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="driveInAccess"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Drive-in Access</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Facility Features</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="productionLines"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Production Lines</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productionLinesDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Production Lines Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of production capabilities" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="staffCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Staff Capacity (Full-time)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 150" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="officeSpace"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Office Space (m²)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 500" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="controlRoom"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Control Room</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cafeteria"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Cafeteria / Canteen</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="meetingRooms"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Meeting Rooms / Admin Area</FormLabel>
                            <FormControl>
                              <Input placeholder="Description of meeting and admin facilities" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Production Capabilities Content */}
              {activeTab === "production" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Production Capabilities</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="manufacturingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Manufacturing Type</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Metal fabrication, Assembly operations" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cleanRoom"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Clean Room Available</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("cleanRoom") && (
                            <FormField
                              control={form.control}
                              name="cleanRoomClass"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Clean Room Class</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., ISO 7, Class 10,000" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name="automationLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Automation Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select automation level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="manual">Manual</SelectItem>
                                  <SelectItem value="semi-auto">Semi-Automated</SelectItem>
                                  <SelectItem value="fully-automated">Fully Automated</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="machineryList"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Machinery List</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List of major equipment and machinery..."
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Equipment & Testing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="cncEquipment"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>CNC Equipment</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("cncEquipment") && (
                            <FormField
                              control={form.control}
                              name="cncNumber"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Number of CNC Machines</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 5" {...field} />
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
                            name="assemblyLine"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Assembly Line</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("assemblyLine") && (
                            <FormField
                              control={form.control}
                              name="assemblyCapacity"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Capacity per Hour</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 100 units/hour" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name="packagingLine"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Packaging Line</FormLabel>
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="testingLab"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Testing / QC Lab</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("testingLab") && (
                            <FormField
                              control={form.control}
                              name="testingEquipment"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Testing Equipment</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="List testing and quality control equipment..." {...field} />
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
                            name="temperatureControlled"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Temperature Controlled Zones</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("temperatureControlled") && (
                            <FormField
                              control={form.control}
                              name="temperatureControlledArea"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Area Size (m²)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 200" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Certifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="certifications"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {certificationOptions.map((cert) => (
                                <FormField
                                  key={cert}
                                  control={form.control}
                                  name="certifications"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={cert}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(cert)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, cert])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== cert
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {cert}
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
                </div>
              )}

              {/* Media & Files Content */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {featuredImage ? (
                        <div className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{featuredImage.name || 'Featured Image'}</p>
                            <Badge variant="secondary">Featured</Badge>
                          </div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setFeaturedImage(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                          <p className="mt-2 text-muted-foreground">No featured image selected</p>
                          <p className="text-sm text-muted-foreground">Select an image from the photos section below</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {[
                    { type: 'tour' as const, title: '360° Virtual Tours', icon: '🌐' },
                    { type: 'image' as const, title: 'Photos', icon: '📸' },
                    { type: 'video' as const, title: 'Videos', icon: '🎥' },
                    { type: 'plan' as const, title: 'Blueprints / Floor Plans', icon: '📋' },
                    { type: 'document' as const, title: 'Documents & Compliance', icon: '📄' }
                  ].map(({ type, title, icon }) => (
                    <Card key={type}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-2">
                            <span>{icon}</span>
                            <span>{title}</span>
                          </CardTitle>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => addMediaFile(type)}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add {title.split(' ')[0]}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {mediaFiles.filter(file => file.type === type).map((file) => (
                            <div key={file.id} className="border rounded-lg p-4 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Name</label>
                                  <Input
                                    placeholder={`${title.split(' ')[0]} name`}
                                    value={file.name}
                                    onChange={(e) => updateMediaFile(file.id, { name: e.target.value })}
                                  />
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Tag/Section</label>
                                  <Input
                                    placeholder="e.g., Production Area, Office, Equipment"
                                    value={file.tag}
                                    onChange={(e) => updateMediaFile(file.id, { tag: e.target.value })}
                                  />
                                </div>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium">Description</label>
                                <Textarea
                                  placeholder="Description or caption"
                                  value={file.description}
                                  onChange={(e) => updateMediaFile(file.id, { description: e.target.value })}
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Visibility</label>
                                  <Select 
                                    value={file.visibility} 
                                    onValueChange={(value: 'public' | 'admin' | 'pin') => 
                                      updateMediaFile(file.id, { visibility: value })
                                    }
                                  >
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
                                <div className="flex items-end space-x-2">
                                  {type === 'image' && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setAsFeatured(file)}
                                      disabled={featuredImage?.id === file.id}
                                    >
                                      {featuredImage?.id === file.id ? 'Featured' : 'Set as Featured'}
                                    </Button>
                                  )}
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeMediaFile(file.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium">File Upload</label>
                                <Input
                                  type="file"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      updateMediaFile(file.id, { file: e.target.files[0] });
                                    }
                                  }}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Or URL</label>
                                <Input
                                  placeholder="https://..."
                                  value={file.url || ''}
                                  onChange={(e) => updateMediaFile(file.id, { url: e.target.value })}
                                />
                              </div>
                            </div>
                          ))}

                          {mediaFiles.filter(file => file.type === type).length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <p>No {title.toLowerCase()} added yet</p>
                              <p className="text-sm">Click "Add {title.split(' ')[0]}" to get started</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Location Content */}
              {activeTab === "location" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Address & Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Street address, building number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <Input placeholder="Region or state" {...field} />
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
                      </div>

                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input placeholder="Postal/ZIP code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          GPS Coordinates
                        </h4>
                        <div className="h-96 border rounded-lg overflow-hidden">
                          <MapboxLocationPicker
                            coordinates={form.watch('coordinates') && form.watch('coordinates')?.lat && form.watch('coordinates')?.lng ? 
                              { lat: form.watch('coordinates')!.lat!, lng: form.watch('coordinates')!.lng! } : 
                              undefined}
                            onCoordinatesChange={(coords) => handleCoordinatesChange(coords.lat, coords.lng)}
                            zoom={10}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Proximity & Accessibility</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="mainRoads"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Near Main Roads</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("mainRoads") && (
                            <FormField
                              control={form.control}
                              name="mainRoadsDistance"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Distance to Main Roads</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2 km to Highway A1" {...field} />
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
                            name="ports"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Near Ports</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("ports") && (
                            <FormField
                              control={form.control}
                              name="portsDetails"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Port Details</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Port name and distance" {...field} />
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
                            name="airports"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Near Airports</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("airports") && (
                            <FormField
                              control={form.control}
                              name="airportsDetails"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Airport Details</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Airport name and distance" {...field} />
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
                            name="industrialZones"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>In Industrial Zone</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("industrialZones") && (
                            <FormField
                              control={form.control}
                              name="industrialZonesName"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Zone Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Industrial zone name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      </div>

                      <FormField
                        control={form.control}
                        name="laborAvailability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Labor Availability</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Description of local labor availability and skills..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="publicTransport"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Public Transport Access</FormLabel>
                            </FormItem>
                          )}
                        />

                        {form.watch("publicTransport") && (
                          <FormField
                            control={form.control}
                            name="publicTransportDetails"
                            render={({ field }) => (
                              <FormItem className="ml-6">
                                <FormLabel>Transport Details</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Details about public transport options..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Visibility Content */}
              {activeTab === "visibility" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Listing Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="listingStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Listing Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
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
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="public">Public</SelectItem>
                                <SelectItem value="link-only">Link Only</SelectItem>
                                <SelectItem value="admin">Admin Only</SelectItem>
                                <SelectItem value="pin-protected">PIN Protected</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="uploaderContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uploader Contact</FormLabel>
                            <FormControl>
                              <Input placeholder="Contact person or company" {...field} />
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
                            <FormLabel>Assigned Tour Pro</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select tour pro" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="john-doe">John Doe</SelectItem>
                                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Advanced Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="allowEmbedding"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Allow Embedding</FormLabel>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="pinProtection"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>PIN Protection</FormLabel>
                            </FormItem>
                          )}
                        />

                        {form.watch("pinProtection") && (
                          <FormField
                            control={form.control}
                            name="pinCode"
                            render={({ field }) => (
                              <FormItem className="ml-6">
                                <FormLabel>PIN Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter PIN code" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">Shareable URL</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          This URL will be generated automatically when the listing is saved.
                        </p>
                        <Input 
                          value="https://360emirates.com/manufacturing-facility/..." 
                          readOnly 
                          className="bg-background"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <div className="space-x-4">
                  <Button type="button" variant="outline">
                    Preview
                  </Button>
                  <Button type="submit">
                    Save Listing
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}