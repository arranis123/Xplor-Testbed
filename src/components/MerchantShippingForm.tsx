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

// Comprehensive schema for merchant shipping form
const merchantShippingSchema = z.object({
  // Basic Info
  listingTitle: z.string().min(1, "Listing title is required"),
  vesselType: z.string().min(1, "Vessel type is required"),
  imoNumber: z.string().min(1, "IMO number is required"),
  flagState: z.string().min(1, "Flag state is required"),
  yearBuilt: z.string().min(4, "Year built is required"),
  builder: z.string().optional(),
  hullMaterial: z.string().optional(),
  operationalStatus: z.string().min(1, "Operational status is required"),
  listingType: z.string().min(1, "Listing type is required"),
  
  // Vessel Details
  grossTonnage: z.string().optional(),
  netTonnage: z.string().optional(),
  deadweightTonnage: z.string().optional(),
  lengthOverall: z.string().optional(),
  beam: z.string().optional(),
  draft: z.string().optional(),
  depth: z.string().optional(),
  numberOfDecks: z.string().optional(),
  engineType: z.string().optional(),
  mainEnginePower: z.string().optional(),
  propulsionType: z.string().optional(),
  serviceSpeed: z.string().optional(),
  maxSpeed: z.string().optional(),
  fuelTypes: z.array(z.string()).default([]),
  crewBerths: z.string().optional(),
  navigationStatus: z.string().optional(),
  
  // Capacity & Equipment
  cargoCapacity: z.string().optional(),
  cargoCapacityUnit: z.string().optional(),
  tankCapacity: z.string().optional(),
  deckCranes: z.boolean().default(false),
  numberOfCranes: z.string().optional(),
  craneCapacity: z.string().optional(),
  roroAccess: z.boolean().default(false),
  roroDimensions: z.string().optional(),
  reeferPoints: z.boolean().default(false),
  numberOfReeferPoints: z.string().optional(),
  containerLashing: z.boolean().default(false),
  deckStrength: z.string().optional(),
  cargoHoldType: z.string().optional(),
  ballastWaterTreatment: z.boolean().default(false),
  wasteManagementSystem: z.boolean().default(false),
  wasteManagementDescription: z.string().optional(),
  lifeSavingEquipment: z.array(z.string()).default([]),
  
  // Compliance & Classification
  classificationSociety: z.string().optional(),
  classNotation: z.string().optional(),
  ismCertified: z.boolean().default(false),
  ispsCompliant: z.boolean().default(false),
  mlcCertified: z.boolean().default(false),
  solasCompliant: z.boolean().default(false),
  ballastWaterCompliance: z.boolean().default(false),
  nextDrydockDue: z.string().optional(),
  nextSpecialSurveyDue: z.string().optional(),
  
  // Location & Operational Area
  currentLocation: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  aisLiveFeed: z.string().optional(),
  operationalRegions: z.array(z.string()).default([]),
  portOfRegistry: z.string().optional(),
  typicalTradingRoute: z.string().optional(),
  availabilityPort: z.string().optional(),
  
  // Visibility & Permissions
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
  uploaderName: z.string().optional(),
  verifiedByXplor: z.boolean().default(false),
  assignedTourPro: z.string().optional(),
  pinProtection: z.boolean().default(false),
  pinCode: z.string().optional(),
});

type MerchantShippingFormData = z.infer<typeof merchantShippingSchema>;

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

const vesselTypes = [
  "Bulk Carrier", "Container Ship", "General Cargo", "Tanker", "LPG Carrier",
  "LNG Carrier", "Ro-Ro Vessel", "Reefer", "Car Carrier", "Dredger",
  "Supply / OSV", "Research Vessel", "Cable Layer", "Other"
];

const flagStates = [
  "Liberia", "Marshall Islands", "Panama", "Singapore", "Malta", "Bahamas",
  "Cyprus", "Greece", "Japan", "Norway", "United Kingdom", "Germany", "Other"
];

const operationalRegions = [
  "Global", "Asia-Pacific", "Europe", "Americas", "Africa", "Middle East",
  "Coastal / Short-Sea", "Inland Waterways"
];

const lifeSavingEquipmentOptions = [
  "Lifeboats", "Life Rafts", "EPIRB", "SART", "Rescue Boat", "Immersion Suits", "Fire Fighting Equipment"
];

const fuelTypeOptions = [
  "HFO", "MGO", "LNG", "Methanol", "Hybrid / Electric", "Other"
];

export default function MerchantShippingForm() {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [featuredImage, setFeaturedImage] = useState<MediaFile | null>(null);

  const form = useForm<MerchantShippingFormData>({
    resolver: zodResolver(merchantShippingSchema),
    defaultValues: {
      listingStatus: "draft",
      visibility: "public",
      fuelTypes: [],
      operationalRegions: [],
      lifeSavingEquipment: [],
    },
  });

  const onSubmit = (data: MerchantShippingFormData) => {
    console.log('Form submitted:', data);
    console.log('Media files:', mediaFiles);
    console.log('Featured image:', featuredImage);
    toast.success("Merchant shipping listing saved successfully!");
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
    { id: "vessel-details", label: "Vessel Details", icon: "🚢" },
    { id: "capacity-equipment", label: "Capacity & Equipment", icon: "⚙️" },
    { id: "compliance", label: "Compliance", icon: "📜" },
    { id: "media", label: "Media & Files", icon: "📸" },
    { id: "location", label: "Location", icon: "📍" },
    { id: "visibility", label: "Visibility", icon: "👁️" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Upload Merchant Shipping Listing</h1>
        <p className="text-muted-foreground">
          Upload detailed specifications, media, and compliance data for merchant vessels
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
                              <Input placeholder="e.g., MV Nordic Carrier – 50,000 DWT Tanker" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="vesselType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vessel Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select vessel type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {vesselTypes.map((type) => (
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
                        name="imoNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IMO Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 9123456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="flagState"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flag State *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select flag state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {flagStates.map((state) => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
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
                            <FormLabel>Year Built *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 2010" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="builder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Builder / Shipyard</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Hyundai Heavy Industries" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hullMaterial"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hull Material</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hull material" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="steel">Steel</SelectItem>
                                <SelectItem value="aluminium">Aluminium</SelectItem>
                                <SelectItem value="composite">Composite</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
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
                                  <SelectValue placeholder="Select operational status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="laid-up">Laid Up</SelectItem>
                                <SelectItem value="under-refit">Under Refit</SelectItem>
                                <SelectItem value="decommissioned">Decommissioned</SelectItem>
                              </SelectContent>
                            </Select>
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
                                  <SelectValue placeholder="Select listing type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="showcase">Showcase</SelectItem>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-charter">For Charter</SelectItem>
                                <SelectItem value="for-registration">For Registration</SelectItem>
                                <SelectItem value="documentation-only">Documentation Only</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Vessel Details Content */}
              {activeTab === "vessel-details" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Vessel Specifications</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="grossTonnage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gross Tonnage (GT)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 25000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="netTonnage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Net Tonnage (NT)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 15000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deadweightTonnage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deadweight Tonnage (DWT)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lengthOverall"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Length Overall (m)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 180" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="beam"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Beam (m)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 32" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="draft"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Draft (m)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 12" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="depth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Depth (m)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 18" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfDecks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Decks</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 7" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="crewBerths"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Crew Berths</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 25" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engine & Propulsion</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="engineType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engine Type</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., MAN B&W 6S60MC-C" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="mainEnginePower"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Engine Power (kW)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 15000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="propulsionType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Propulsion Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select propulsion type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="single-screw">Single Screw</SelectItem>
                                <SelectItem value="twin-screw">Twin Screw</SelectItem>
                                <SelectItem value="azimuth">Azimuth</SelectItem>
                                <SelectItem value="jet">Jet</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serviceSpeed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Speed (knots)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 14" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxSpeed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Speed (knots)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 16" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="navigationStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Navigation Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select navigation status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="in-service">In Service</SelectItem>
                                <SelectItem value="laid-up">Laid Up</SelectItem>
                                <SelectItem value="ballast-voyage">Ballast Voyage</SelectItem>
                                <SelectItem value="laden-voyage">Laden Voyage</SelectItem>
                                <SelectItem value="drydock">Drydock</SelectItem>
                                <SelectItem value="delivery-voyage">Delivery Voyage</SelectItem>
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
                      <CardTitle>Fuel Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="fuelTypes"
                        render={() => (
                          <FormItem>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {fuelTypeOptions.map((fuel) => (
                                <FormField
                                  key={fuel}
                                  control={form.control}
                                  name="fuelTypes"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={fuel}
                                        className="flex flex-row items-start space-x-3 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(fuel)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, fuel])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== fuel
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          {fuel}
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

              {/* Capacity & Equipment Content */}
              {activeTab === "capacity-equipment" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cargo Capacity</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="cargoCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo Capacity</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 45000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cargoCapacityUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cubic-meters">Cubic Meters</SelectItem>
                                <SelectItem value="teu">TEU</SelectItem>
                                <SelectItem value="barrels">Barrels</SelectItem>
                                <SelectItem value="tons">Tons</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="tankCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tank Capacity (for tankers)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 50000 m³" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cargoHoldType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cargo Hold Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hold type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="box">Box</SelectItem>
                                <SelectItem value="trunk">Trunk</SelectItem>
                                <SelectItem value="open-hatch">Open Hatch</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="deckStrength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deck Strength</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 5 t/m²" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Deck Equipment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="deckCranes"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Deck Cranes</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("deckCranes") && (
                            <div className="grid grid-cols-2 gap-4 ml-6">
                              <FormField
                                control={form.control}
                                name="numberOfCranes"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number of Cranes</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., 4" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="craneCapacity"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Capacity per Crane</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., 25t" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="roroAccess"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>RoRo Access</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("roroAccess") && (
                            <div className="ml-6">
                              <FormField
                                control={form.control}
                                name="roroDimensions"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Ramp Dimensions</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., 20m x 4m" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="reeferPoints"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Reefer Points</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("reeferPoints") && (
                            <div className="ml-6">
                              <FormField
                                control={form.control}
                                name="numberOfReeferPoints"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Number of Reefer Points</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., 200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </div>

                        <FormField
                          control={form.control}
                          name="containerLashing"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Container Lashing Gear</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Environmental & Safety Systems</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="ballastWaterTreatment"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Ballast Water Treatment</FormLabel>
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="wasteManagementSystem"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel>Waste Management System</FormLabel>
                              </FormItem>
                            )}
                          />

                          {form.watch("wasteManagementSystem") && (
                            <FormField
                              control={form.control}
                              name="wasteManagementDescription"
                              render={({ field }) => (
                                <FormItem className="ml-6">
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Describe the waste management system..." {...field} />
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
                        <h4 className="text-lg font-semibold mb-4">Life-Saving Equipment</h4>
                        <FormField
                          control={form.control}
                          name="lifeSavingEquipment"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {lifeSavingEquipmentOptions.map((equipment) => (
                                  <FormField
                                    key={equipment}
                                    control={form.control}
                                    name="lifeSavingEquipment"
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
                                                  ? field.onChange([...field.value, equipment])
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
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Compliance & Classification Content */}
              {activeTab === "compliance" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Classification & Certification</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="classificationSociety"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Classification Society</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select classification society" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="abs">ABS</SelectItem>
                                <SelectItem value="dnv-gl">DNV GL</SelectItem>
                                <SelectItem value="lr">Lloyd's Register</SelectItem>
                                <SelectItem value="bv">Bureau Veritas</SelectItem>
                                <SelectItem value="rina">RINA</SelectItem>
                                <SelectItem value="ccs">CCS</SelectItem>
                                <SelectItem value="nk">NK</SelectItem>
                                <SelectItem value="kr">KR</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="classNotation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Class Notation</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., +A1 E0 LMC UMS" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nextDrydockDue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Drydock Due</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="nextSpecialSurveyDue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Next Special Survey Due</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Compliance Certifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="ismCertified"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>ISM Certified</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ispsCompliant"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>ISPS Compliant</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="mlcCertified"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>MLC Certified</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="solasCompliant"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>SOLAS Compliant</FormLabel>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="ballastWaterCompliance"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Ballast Water Compliance</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Media & Files Content */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  {/* Featured Image Section */}
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

                  {/* Media Upload Sections */}
                  {[
                    { type: 'tour' as const, title: '360° Virtual Tours', icon: '🌐' },
                    { type: 'image' as const, title: 'Photos', icon: '📸' },
                    { type: 'video' as const, title: 'Videos', icon: '🎥' },
                    { type: 'plan' as const, title: 'Plans & Blueprints', icon: '📋' },
                    { type: 'document' as const, title: 'Documents & Certificates', icon: '📄' }
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
                                    placeholder="e.g., Bridge, Engine Room, Hold 1"
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

              {/* Location & Operational Area Content */}
              {activeTab === "location" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="currentLocation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Port of Rotterdam, Netherlands" {...field} />
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

                      <FormField
                        control={form.control}
                        name="aisLiveFeed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>AIS Live Feed URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://marinetraffic.com/..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Visibility & Permissions Content */}
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
                                <SelectItem value="admin">Admin Only</SelectItem>
                                <SelectItem value="link-only">Link Only</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="uploaderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Uploader Name or Company</FormLabel>
                            <FormControl>
                              <Input placeholder="Company or individual name" {...field} />
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
                      <CardTitle>Access Control</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="verifiedByXplor"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Listing Verified By Xplor</FormLabel>
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
                          value="https://360emirates.com/merchant-shipping/..." 
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
