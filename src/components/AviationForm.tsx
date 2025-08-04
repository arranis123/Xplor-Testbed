import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MapboxLocationPicker from '@/components/MapboxLocationPicker';
import { PlusCircle, X, Upload, Plane, Building, MapPin, Eye, Lock, Settings, FileText } from 'lucide-react';
import { toast } from 'sonner';

const runwaySchema = z.object({
  id: z.string(),
  designation: z.string().min(1, 'Runway designation required'),
  length: z.number().min(1, 'Length required'),
  width: z.number().optional(),
  surface: z.string().optional()
});

const mediaFileSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['360tour', 'photo', 'video', 'drone', 'technical', 'layout', 'certificates']),
  url: z.string().optional(),
  file: z.any().optional(),
  zone: z.string().optional(), // for categorizing photos (cockpit, cabin, etc.)
  visibility: z.enum(['public', 'private', 'admin']).default('public'),
  pinProtected: z.boolean().default(false),
  pin: z.string().optional()
});

const aviationSchema = z.object({
  // Basic Info
  listingTitle: z.string().min(1, 'Listing title is required'),
  category: z.string().min(1, 'Category is required'),
  customCategory: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  yearBuilt: z.number().optional(),
  ownerOperator: z.string().optional(),
  listingType: z.string().min(1, 'Listing type is required'),
  
  // Listing Type & Details - Facility fields
  icaoIataCode: z.string().optional(),
  airportSize: z.string().optional(),
  terminalCapacity: z.number().optional(),
  numberOfHangars: z.number().optional(),
  numberOfParkingBays: z.number().optional(),
  runways: z.array(runwaySchema).optional(),
  atcTower: z.boolean().default(false),
  fuelTypes: z.array(z.string()).optional(),
  securityServices: z.array(z.string()).optional(),
  
  // Listing Type & Details - Aircraft fields
  makeModel: z.string().optional(),
  yearOfManufacture: z.number().optional(),
  serialNumber: z.string().optional(),
  totalAirframeTime: z.number().optional(),
  engineType: z.string().optional(),
  engineHours: z.number().optional(),
  numberOfCrew: z.number().optional(),
  passengerCapacity: z.number().optional(),
  maxRange: z.number().optional(),
  cruiseSpeed: z.number().optional(),
  avionicsSuite: z.string().optional(),
  refurbishmentDate: z.string().optional(),
  
  // Specifications
  cabinConfiguration: z.string().optional(),
  lavatories: z.string().optional(),
  lavatoriesVipFeatures: z.boolean().default(false),
  galley: z.boolean().default(false),
  galleyAppliances: z.string().optional(),
  wifiConnectivity: z.boolean().default(false),
  wifiProvider: z.string().optional(),
  wifiSpeed: z.string().optional(),
  inflightEntertainment: z.boolean().default(false),
  entertainmentSystem: z.string().optional(),
  noiseLevel: z.string().optional(),
  baggageCapacity: z.string().optional(),
  accessibilityFeatures: z.object({
    wheelchairAccess: z.boolean().default(false),
    liftSystem: z.boolean().default(false),
    rampAccess: z.boolean().default(false),
    dedicatedStaff: z.boolean().default(false)
  }).optional(),
  customFeatures: z.array(z.string()).optional(),
  
  // Access & Services - Facility
  facilityAccess: z.string().optional(),
  securityClearanceRequired: z.boolean().default(false),
  customsImmigration: z.boolean().default(false),
  vipLounge: z.boolean().default(false),
  conferenceRooms: z.boolean().default(false),
  parkingTransport: z.array(z.string()).optional(),
  helicopterAccess: z.boolean().default(false),
  fboServices: z.array(z.string()).optional(),
  
  // Access & Services - Aircraft
  availability: z.string().optional(),
  charterPricingDaily: z.string().optional(),
  charterPricingHourly: z.string().optional(),
  currency: z.string().optional(),
  homeBase: z.string().optional(),
  crewIncluded: z.boolean().default(false),
  crewSize: z.number().optional(),
  onDemandBooking: z.boolean().default(false),
  flightRestrictions: z.string().optional(),
  petsAllowed: z.boolean().default(false),
  smokingPolicy: z.string().optional(),
  
  // Media & Files
  mediaFiles: z.array(mediaFileSchema).optional(),
  
  // Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().optional(),
  googlePlusCode: z.string().optional(),
  airportCode: z.string().optional(),
  locationDescription: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  
  // Visibility & Permissions
  listingStatus: z.string().default('draft'),
  visibility: z.string().default('public'),
  assignedTourPro: z.string().optional(),
  attribution: z.string().optional(),
  pinProtection: z.boolean().default(false),
  accessPin: z.string().optional()
});

type AviationFormData = z.infer<typeof aviationSchema>;

interface AviationFormProps {
  onSubmit: (data: AviationFormData) => Promise<void>;
  onCancel: () => void;
}

const categoryOptions = [
  'Airport',
  'Private Terminal', 
  'Fixed Base Operator (FBO)',
  'Hangar',
  'Runway',
  'Private Jet',
  'Helicopter',
  'Seaplane',
  'Charter Company',
  'Aircraft Management Office',
  'Maintenance Facility',
  'Other'
];

const listingTypeOptions = [
  'For Charter',
  'For Sale',
  'Showcase Only'
];

const fuelTypeOptions = [
  'Jet A',
  'Avgas',
  'Jet A-1',
  'Other'
];

const securityServiceOptions = [
  'Armed Security',
  'CCTV Monitoring',
  'Access Control',
  'Perimeter Security',
  'TSA Screening',
  'Background Checks'
];

const fboServiceOptions = [
  'Ground Handling',
  'Concierge',
  'Refueling',
  'Maintenance',
  'Crew Lounge',
  'Crew Sleeping Quarters',
  'Hangar Rental',
  'Aircraft Cleaning',
  'Catering',
  'Ground Transportation'
];

const parkingTransportOptions = [
  'Free Parking',
  'Valet Parking',
  'Taxi Service',
  'Uber/Lyft',
  'Rental Cars',
  'Private Shuttle',
  'Public Transit'
];

const smokingPolicyOptions = [
  'Allowed',
  'Not Allowed',
  'Crew Only'
];

const facilityAccessOptions = [
  { value: 'public', label: 'Public Access' },
  { value: 'private', label: 'Private Access Only' },
  { value: 'restricted', label: 'Restricted - Clearance Required' }
];

const availabilityOptions = [
  'For Charter',
  'For Sale',
  'Not Available'
];

const photoZoneOptions = [
  'Exterior',
  'Cockpit',
  'Cabin',
  'Galley',
  'Lavatory',
  'Tarmac',
  'Hangar',
  'Lounge',
  'Terminal',
  'Other'
];

export const AviationForm: React.FC<AviationFormProps> = ({ onSubmit, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [runways, setRunways] = useState<z.infer<typeof runwaySchema>[]>([]);
  const [mediaFiles, setMediaFiles] = useState<z.infer<typeof mediaFileSchema>[]>([]);

  const form = useForm<AviationFormData>({
    resolver: zodResolver(aviationSchema),
    defaultValues: {
      category: '',
      listingType: '',
      atcTower: false,
      fuelTypes: [],
      securityServices: [],
      lavatoriesVipFeatures: false,
      galley: false,
      wifiConnectivity: false,
      inflightEntertainment: false,
      accessibilityFeatures: {
        wheelchairAccess: false,
        liftSystem: false,
        rampAccess: false,
        dedicatedStaff: false
      },
      securityClearanceRequired: false,
      customsImmigration: false,
      vipLounge: false,
      conferenceRooms: false,
      helicopterAccess: false,
      crewIncluded: false,
      onDemandBooking: false,
      petsAllowed: false,
      listingStatus: 'draft',
      visibility: 'public',
      pinProtection: false,
      runways: [],
      mediaFiles: []
    }
  });

  const watchedCategory = form.watch('category');
  const isAircraft = ['Private Jet', 'Helicopter', 'Seaplane'].includes(watchedCategory);
  const isFacility = !isAircraft && watchedCategory !== '';

  const handleFormSubmit = async (data: AviationFormData) => {
    try {
      data.runways = runways;
      data.mediaFiles = mediaFiles;
      await onSubmit(data);
      toast.success('Aviation listing created successfully!');
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
      throw error;
    }
  };

  const addRunway = () => {
    const newRunway = {
      id: Date.now().toString(),
      designation: '',
      length: 0,
      width: 0,
      surface: ''
    };
    setRunways([...runways, newRunway]);
  };

  const removeRunway = (id: string) => {
    setRunways(runways.filter(runway => runway.id !== id));
  };

  const updateRunway = (id: string, field: string, value: any) => {
    const updatedRunways = runways.map(runway =>
      runway.id === id ? { ...runway, [field]: value } : runway
    );
    setRunways(updatedRunways);
  };

  const addMediaFile = (type: 'photo' | 'video' | '360tour' | 'drone' | 'technical' | 'layout' | 'certificates') => {
    const newMedia = {
      id: Date.now().toString(),
      title: '',
      type,
      visibility: 'public' as const,
      pinProtected: false
    };
    setMediaFiles([...mediaFiles, newMedia]);
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
  };

  const updateMediaFile = (id: string, field: string, value: any) => {
    const updatedMedia = mediaFiles.map(file =>
      file.id === id ? { ...file, [field]: value } : file
    );
    setMediaFiles(updatedMedia);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="basic-info" className="text-xs">
              <Plane className="h-3 w-3 mr-1" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="listing-details" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              Details
            </TabsTrigger>
            <TabsTrigger value="specifications" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Specs
            </TabsTrigger>
            <TabsTrigger value="access-services" className="text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Access
            </TabsTrigger>
            <TabsTrigger value="media" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Media
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </TabsTrigger>
            <TabsTrigger value="visibility" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Visibility
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Essential details about your aviation listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="listingTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Signature FBO – LAX or Gulfstream G650ER 2021" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((category) => (
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

                  {form.watch('category') === 'Other' && (
                    <FormField
                      control={form.control}
                      name="customCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Category</FormLabel>
                          <FormControl>
                            <Input placeholder="Specify category" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="listingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {listingTypeOptions.map((type) => (
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
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your aviation listing, its features, and unique selling points..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{isAircraft ? 'Year Manufactured' : 'Year Built'}</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 2021" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listing Type & Details Tab */}
          <TabsContent value="listing-details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Listing Type & Details</CardTitle>
                <CardDescription>
                  {isAircraft ? 'Aircraft specifications and details' : 'Facility information and specifications'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isFacility && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="icaoIataCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ICAO / IATA Code</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., KLAX / LAX" {...field} />
                            </FormControl>
                            <FormDescription>International airport identifier codes</FormDescription>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="airportSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Airport Size</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 500 acres or 2,000 sq meters" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="terminalCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Terminal Capacity (passengers/hour)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 500" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfHangars"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Hangars</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 12" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfParkingBays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Parking Bays</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 25" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Runways</h4>
                        <Button type="button" onClick={addRunway} variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Runway
                        </Button>
                      </div>

                      {runways.map((runway, index) => (
                        <Card key={runway.id} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h5 className="font-medium">Runway {index + 1}</h5>
                            <Button 
                              type="button" 
                              onClick={() => removeRunway(runway.id)}
                              variant="ghost" 
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                              <label className="text-sm font-medium">Designation *</label>
                              <Input 
                                placeholder="e.g., 07L/25R"
                                value={runway.designation}
                                onChange={(e) => updateRunway(runway.id, 'designation', e.target.value)}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Length (ft) *</label>
                              <Input 
                                type="number"
                                placeholder="e.g., 12091"
                                value={runway.length || ''}
                                onChange={(e) => updateRunway(runway.id, 'length', e.target.value ? parseInt(e.target.value) : 0)}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Width (ft)</label>
                              <Input 
                                type="number"
                                placeholder="e.g., 150"
                                value={runway.width || ''}
                                onChange={(e) => updateRunway(runway.id, 'width', e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Surface</label>
                              <Input 
                                placeholder="e.g., Asphalt"
                                value={runway.surface}
                                onChange={(e) => updateRunway(runway.id, 'surface', e.target.value)}
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="atcTower"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>ATC Tower</FormLabel>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormLabel>Fuel Types Offered</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {fuelTypeOptions.map((fuel) => (
                            <FormField
                              key={fuel}
                              control={form.control}
                              name="fuelTypes"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(fuel)}
                                      onCheckedChange={(checked) => {
                                        const value = field.value || [];
                                        if (checked) {
                                          field.onChange([...value, fuel]);
                                        } else {
                                          field.onChange(value.filter((item) => item !== fuel));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {fuel}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <FormLabel>Security Services</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {securityServiceOptions.map((service) => (
                            <FormField
                              key={service}
                              control={form.control}
                              name="securityServices"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(service)}
                                      onCheckedChange={(checked) => {
                                        const value = field.value || [];
                                        if (checked) {
                                          field.onChange([...value, service]);
                                        } else {
                                          field.onChange(value.filter((item) => item !== service));
                                        }
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {service}
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {isAircraft && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="makeModel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Make & Model *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Bombardier Global 7500" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="yearOfManufacture"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year of Manufacture</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 2021" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="serialNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serial Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Aircraft serial number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="totalAirframeTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Time on Airframe (hours)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 2500" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="engineType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engine Type(s)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Rolls-Royce Pearl 700" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="engineHours"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Engine Hours</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 2300" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfCrew"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Crew</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 2" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="passengerCapacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Passenger Capacity</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 19" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="maxRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Range (nm)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 7700" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cruiseSpeed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cruise Speed (knots)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="e.g., 516" 
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="avionicsSuite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avionics Suite</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Honeywell Primus Epic" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="refurbishmentDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Refurbishment Date</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 2023" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
                <CardDescription>
                  Detailed specifications and features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="cabinConfiguration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cabin Configuration</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe seating layout, zones, etc..."
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <FormLabel>Lavatories</FormLabel>
                      <Select 
                        value={form.watch('lavatories')} 
                        onValueChange={(value) => form.setValue('lavatories', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select lavatory count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2+">2+</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {form.watch('lavatories') && form.watch('lavatories') !== 'none' && (
                        <FormField
                          control={form.control}
                          name="lavatoriesVipFeatures"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0 mt-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>VIP Features</FormLabel>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="galley"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Galley</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch('galley') && (
                        <FormField
                          control={form.control}
                          name="galleyAppliances"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  placeholder="List galley appliances and features..."
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="wifiConnectivity"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>WiFi / Connectivity</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch('wifiConnectivity') && (
                        <div className="grid grid-cols-1 gap-2">
                          <FormField
                            control={form.control}
                            name="wifiProvider"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="WiFi provider" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="wifiSpeed"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Speed (e.g., 100 Mbps)" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="inflightEntertainment"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Inflight Entertainment</FormLabel>
                          </FormItem>
                        )}
                      />

                      {form.watch('inflightEntertainment') && (
                        <FormField
                          control={form.control}
                          name="entertainmentSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Entertainment system type" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="noiseLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Noise Level / Soundproofing</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Low noise, excellent soundproofing" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="baggageCapacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Baggage Capacity</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 195 cu ft or 1500 kg" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Accessibility Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { key: 'wheelchairAccess', label: 'Wheelchair Access' },
                      { key: 'liftSystem', label: 'Lift System' },
                      { key: 'rampAccess', label: 'Ramp Access' },
                      { key: 'dedicatedStaff', label: 'Dedicated Staff' }
                    ].map((feature) => (
                      <FormField
                        key={feature.key}
                        control={form.control}
                        name={`accessibilityFeatures.${feature.key}` as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">{feature.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="customFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Features</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List any unique or custom features..."
                          {...field}
                          value={field.value?.join('\n') || ''}
                          onChange={(e) => field.onChange(e.target.value.split('\n').filter(item => item.trim() !== ''))}
                        />
                      </FormControl>
                      <FormDescription>Enter each feature on a new line</FormDescription>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access & Services Tab */}
          <TabsContent value="access-services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access & Services</CardTitle>
                <CardDescription>
                  {isAircraft ? 'Charter information and service details' : 'Facility access and available services'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {isFacility && (
                  <>
                    <FormField
                      control={form.control}
                      name="facilityAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facility Access</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select access level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {facilityAccessOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {[
                        { key: 'securityClearanceRequired', label: 'Security Clearance Required' },
                        { key: 'customsImmigration', label: 'Customs / Immigration Available' },
                        { key: 'vipLounge', label: 'VIP Lounge' },
                        { key: 'conferenceRooms', label: 'Conference Rooms' },
                        { key: 'helicopterAccess', label: 'Helicopter Access' }
                      ].map((feature) => (
                        <FormField
                          key={feature.key}
                          control={form.control}
                          name={feature.key as any}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm">{feature.label}</FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <FormLabel>Parking / Ground Transport</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {parkingTransportOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="parkingTransport"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(option)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, option]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== option));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {option}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <FormLabel>FBO Services</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {fboServiceOptions.map((service) => (
                          <FormField
                            key={service}
                            control={form.control}
                            name="fboServices"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, service]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== service));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {service}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {isAircraft && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availabilityOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    {form.watch('availability') === 'For Charter' && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name="charterPricingDaily"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Daily Charter Rate</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 50000" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="charterPricingHourly"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Charter Rate</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 8500" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="GBP">GBP</SelectItem>
                                  <SelectItem value="CAD">CAD</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="homeBase"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Home Base</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., KTEB or Teterboro" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="crewIncluded"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel>Crew Included</FormLabel>
                            </FormItem>
                          )}
                        />

                        {form.watch('crewIncluded') && (
                          <FormField
                            control={form.control}
                            name="crewSize"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input 
                                    type="number"
                                    placeholder="Number of crew members"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="onDemandBooking"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>On-Demand Booking</FormLabel>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="petsAllowed"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Pets Allowed</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="smokingPolicy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Smoking Policy</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select policy" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {smokingPolicyOptions.map((policy) => (
                                  <SelectItem key={policy} value={policy}>
                                    {policy}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="flightRestrictions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flight Restrictions</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any flight restrictions or limitations..."
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media & Files Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>
                  Upload virtual tours, photos, videos, and documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { type: '360tour', label: '360° Virtual Tours', icon: '🏢' },
                  { type: 'photo', label: 'Photos', icon: '📷' },
                  { type: 'video', label: 'Videos', icon: '🎥' },
                  { type: 'drone', label: 'Drone Footage', icon: '🚁' },
                  { type: 'technical', label: 'Technical Documents', icon: '📋' },
                  { type: 'layout', label: 'Layout Diagrams', icon: '🗺️' },
                  { type: 'certificates', label: 'Certificates & Registrations', icon: '📜' }
                ].map((mediaType) => (
                  <div key={mediaType.type} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center gap-2">
                        <span>{mediaType.icon}</span>
                        {mediaType.label}
                      </h4>
                      <Button 
                        type="button" 
                        onClick={() => addMediaFile(mediaType.type as any)}
                        variant="outline" 
                        size="sm"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add {mediaType.label}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {mediaFiles
                        .filter(file => file.type === mediaType.type)
                        .map((file) => (
                          <Card key={file.id} className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="outline">{mediaType.label}</Badge>
                              <Button 
                                type="button" 
                                onClick={() => removeMediaFile(file.id)}
                                variant="ghost" 
                                size="sm"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Title *</label>
                                <Input 
                                  placeholder="Enter title..."
                                  value={file.title}
                                  onChange={(e) => updateMediaFile(file.id, 'title', e.target.value)}
                                />
                              </div>

                              {mediaType.type === 'photo' && (
                                <div>
                                  <label className="text-sm font-medium">Zone</label>
                                  <Select 
                                    value={file.zone}
                                    onValueChange={(value) => updateMediaFile(file.id, 'zone', value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select zone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {photoZoneOptions.map((zone) => (
                                        <SelectItem key={zone} value={zone}>
                                          {zone}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}

                              <div>
                                <label className="text-sm font-medium">URL or File Upload</label>
                                <Input 
                                  placeholder="Enter URL or upload file..."
                                  value={file.url}
                                  onChange={(e) => updateMediaFile(file.id, 'url', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Visibility</label>
                                <Select 
                                  value={file.visibility}
                                  onValueChange={(value) => updateMediaFile(file.id, 'visibility', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="admin">Admin Only</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={file.pinProtected}
                                  onCheckedChange={(checked) => updateMediaFile(file.id, 'pinProtected', checked)}
                                />
                                <label className="text-sm font-medium">PIN Protected</label>
                              </div>

                              {file.pinProtected && (
                                <div>
                                  <label className="text-sm font-medium">PIN</label>
                                  <Input 
                                    placeholder="Enter PIN..."
                                    value={file.pin}
                                    onChange={(e) => updateMediaFile(file.id, 'pin', e.target.value)}
                                  />
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
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
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  Set the geographical location and address details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facility Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Interactive Map</FormLabel>
                  <p className="text-sm text-muted-foreground">Click on the map to set the exact location</p>
                  <MapboxLocationPicker
                    coordinates={form.watch('coordinates') ? { lat: form.watch('coordinates').lat, lng: form.watch('coordinates').lng } : null}
                    onCoordinatesChange={(coords) => form.setValue('coordinates', coords)}
                    className="h-64"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country / Region *</FormLabel>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="airportCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Airport Code (ICAO/IATA)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., KLAX / LAX" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="googlePlusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Plus Code (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 9G8F+5X New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="locationDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="e.g., North Hangar Entrance, Terminal 3 Level 2..."
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="h-96 rounded-lg border">
                  <MapboxLocationPicker
                    coordinates={form.watch('coordinates') ? { lat: form.watch('coordinates')!.lat || 0, lng: form.watch('coordinates')!.lng || 0 } : null}
                    onCoordinatesChange={(coords) => form.setValue('coordinates', coords)}
                    zoom={15}
                    className="h-full w-full rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visibility & Permissions Tab */}
          <TabsContent value="visibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibility & Permissions</CardTitle>
                <CardDescription>
                  Control who can access and view this listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="listingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="unlisted">Unlisted</SelectItem>
                            <SelectItem value="admin">Admin Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assignedTourPro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Tour Pro</FormLabel>
                        <FormControl>
                          <Input placeholder="Tour professional name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribution</FormLabel>
                        <FormControl>
                          <Input placeholder="Name or company" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="pinProtection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>PIN Protection</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch('pinProtection') && (
                    <FormField
                      control={form.control}
                      name="accessPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access PIN</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter access PIN" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Shareable URL</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    This link will be generated after creating the listing
                  </p>
                  <Input 
                    readOnly 
                    value="Link will be generated automatically" 
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create Aviation Listing
          </Button>
        </div>
      </form>
    </Form>
  );
};