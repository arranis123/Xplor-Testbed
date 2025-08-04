import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import MapboxLocationPicker from '@/components/MapboxLocationPicker';
import { CarDataService } from '@/services/carDataService';
import { 
  Car, 
  Settings, 
  FileText, 
  Shield, 
  Camera, 
  MapPin, 
  Eye, 
  ChevronDown,
  Upload,
  Plus,
  X
} from 'lucide-react';
import { toast } from 'sonner';

const carFormSchema = z.object({
  // Basic Info
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  trim: z.string().optional(),
  bodyStyle: z.string().min(1, 'Body style is required'),
  vin: z.string().optional(),
  listingType: z.string().min(1, 'Listing type is required'),
  price: z.number().positive(),
  currency: z.string().min(1, 'Currency is required'),
  mileage: z.number().nonnegative(),
  mileageUnit: z.string().min(1, 'Mileage unit is required'),
  condition: z.string().min(1, 'Condition is required'),
  seats: z.number().positive(),
  doors: z.number().positive(),
  exteriorColor: z.string().min(1, 'Exterior color is required'),
  interiorColor: z.string().min(1, 'Interior color is required'),
  
  // Specifications
  transmission: z.string().min(1, 'Transmission is required'),
  drivetrain: z.string().min(1, 'Drivetrain is required'),
  engine: z.string().min(1, 'Engine is required'),
  horsepower: z.number().optional(),
  torque: z.number().optional(),
  fuelType: z.string().min(1, 'Fuel type is required'),
  batteryRange: z.number().optional(),
  topSpeed: z.number().optional(),
  acceleration: z.number().optional(),
  
  // Features & Options
  features: z.array(z.string()).default([]),
  customFeatures: z.string().optional(),
  hasModifications: z.boolean().default(false),
  modificationsDescription: z.string().optional(),
  
  // Ownership & Documentation
  registeredOwner: z.string().min(1, 'Registered owner is required'),
  registrationStatus: z.string().min(1, 'Registration status is required'),
  registrationCountry: z.string().min(1, 'Registration country is required'),
  
  // Access & Rules
  availableFor: z.array(z.string()).default([]),
  rentalRules: z.array(z.string()).default([]),
  accessInstructions: z.string().optional(),
  guestBehaviorNotes: z.string().optional(),
  
  // Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().optional(),
  googlePlusCode: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  approximateLocationOnly: z.boolean().default(false),
  
  // Visibility & Protection
  listingStatus: z.string().min(1, 'Listing status is required'),
  visibility: z.string().min(1, 'Visibility is required'),
  pinProtection: z.boolean().default(false),
  pin: z.string().optional(),
  displayPricing: z.boolean().default(true),
});

type CarFormData = z.infer<typeof carFormSchema>;

interface CarUploadFormProps {
  onSubmit: (data: CarFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const CarUploadForm: React.FC<CarUploadFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({
    photos: [],
    videos: [],
    documents: [],
    tours: []
  });

  const form = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      features: [],
      availableFor: [],
      rentalRules: [],
      hasModifications: false,
      approximateLocationOnly: false,
      pinProtection: false,
      displayPricing: true,
    }
  });

  const handleFormSubmit = async (data: CarFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      toast.error('Failed to submit form');
    }
  };

  const vehicleTypes = CarDataService.getVehicleTypes();
  const manufacturers = CarDataService.getManufacturers();

  const handleFileUpload = (category: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setUploadedFiles(prev => ({
        ...prev,
        [category]: [...prev[category], ...fileArray]
      }));
    }
  };

  const removeFile = (category: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const featureCategories = {
    'Comfort & Convenience': [
      '❄️ Air Conditioning',
      '🌡️ Climate Control', 
      '🔥 Heated Seats',
      '☀️ Sunroof',
      '🔑 Keyless Entry',
      '💡 Ambient Lighting'
    ],
    'Technology & Entertainment': [
      '🗺️ Navigation',
      '📱 Apple CarPlay / Android Auto',
      '📶 Bluetooth',
      '📡 Wi-Fi',
      '🔌 USB Ports',
      '📱 Touchscreen',
      '📹 Rear Camera'
    ],
    'Safety & Assistance': [
      '🛡️ ABS',
      '🎈 Airbags',
      '📡 Parking Sensors',
      '🛣️ Lane Assist',
      '🚗 Adaptive Cruise Control',
      '⚠️ Collision Warning'
    ],
    'Performance / Off-Road': [
      '⚙️ Adaptive Suspension',
      '🏁 Sport Mode',
      '🔧 Tuning Mods',
      '🔒 Locking Differential',
      '🌄 All-Terrain Tires'
    ],
    'Interior / Exterior': [
      '🪑 Leather Interior',
      '⚡ Alloy Wheels',
      '📦 Roof Rack',
      '👣 Running Boards',
      '🔄 Convertible Roof'
    ]
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full h-auto p-1">
            <TabsTrigger value="basic-info" className="text-xs">Basic Info</TabsTrigger>
            <TabsTrigger value="specifications" className="text-xs">Specs</TabsTrigger>
            <TabsTrigger value="features" className="text-xs">Features</TabsTrigger>
            <TabsTrigger value="ownership" className="text-xs">Ownership</TabsTrigger>
            <TabsTrigger value="access" className="text-xs">Access</TabsTrigger>
            <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
            <TabsTrigger value="location" className="text-xs">Location</TabsTrigger>
            <TabsTrigger value="visibility" className="text-xs">Visibility</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Essential details about your vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="vehicleType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicleTypes.map(type => (
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

                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {manufacturers.map(make => (
                              <SelectItem key={make.value} value={make.value}>
                                {make.label}
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
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter model" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2024" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trim"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trim / Edition (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., GT, Limited, Sport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bodyStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Style</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select body style" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sedan">Sedan</SelectItem>
                            <SelectItem value="coupe">Coupe</SelectItem>
                            <SelectItem value="hatchback">Hatchback</SelectItem>
                            <SelectItem value="suv">SUV</SelectItem>
                            <SelectItem value="pickup">Pickup Truck</SelectItem>
                            <SelectItem value="wagon">Wagon</SelectItem>
                            <SelectItem value="convertible">Convertible</SelectItem>
                            <SelectItem value="van">Van</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VIN (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="17-character VIN" {...field} />
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
                            <SelectItem value="showcase">Showcase Only</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="50000" 
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
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
                              <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="AUD">AUD</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                            <SelectItem value="collector">Collector</SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Mileage</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="50000" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="mileageUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="km">km</SelectItem>
                              <SelectItem value="mi">mi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <FormField
                      control={form.control}
                      name="seats"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seats</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="5" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="doors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Doors</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="4" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="exteriorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exterior Color</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Midnight Black" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="interiorColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interior Color</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Cream Leather" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Specifications
                </CardTitle>
                <CardDescription>
                  Technical specifications and performance details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="manual">Manual</SelectItem>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="cvt">CVT</SelectItem>
                            <SelectItem value="semi-auto">Semi-Automatic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="drivetrain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drivetrain</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select drivetrain" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fwd">FWD</SelectItem>
                            <SelectItem value="rwd">RWD</SelectItem>
                            <SelectItem value="awd">AWD</SelectItem>
                            <SelectItem value="4x4">4x4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="engine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Engine</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 6.2L V8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="horsepower"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horsepower (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="400" 
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
                    name="torque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Torque (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="500" 
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
                    name="fuelType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select fuel type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="petrol">Petrol</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                            <SelectItem value="electric">Electric</SelectItem>
                            <SelectItem value="biofuel">Biofuel</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="batteryRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Battery Range (km)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="400" 
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
                    name="topSpeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Top Speed (km/h)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="250" 
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
                    name="acceleration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>0-100km/h (seconds)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.1"
                            placeholder="5.5" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features & Options Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Features & Options
                </CardTitle>
                <CardDescription>
                  Select all applicable features and options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(featureCategories).map(([category, features]) => (
                  <Collapsible key={category} defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <h4 className="font-medium text-primary">{category}</h4>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {features.map(feature => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={feature}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedFeatures([...selectedFeatures, feature]);
                                } else {
                                  setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
                                }
                                form.setValue('features', checked ? [...selectedFeatures, feature] : selectedFeatures.filter(f => f !== feature));
                              }}
                            />
                            <label htmlFor={feature} className="text-sm cursor-pointer">
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}

                <FormField
                  control={form.control}
                  name="customFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Features</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any custom or unique features not listed above..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hasModifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Modifications Made</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Has this vehicle been modified from factory specifications?
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

                  {form.watch('hasModifications') && (
                    <FormField
                      control={form.control}
                      name="modificationsDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modifications Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe all modifications made to the vehicle..." 
                              {...field} 
                            />
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

          {/* Ownership & Documentation Tab */}
          <TabsContent value="ownership" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Ownership & Documentation
                </CardTitle>
                <CardDescription>
                  Upload relevant documents and ownership information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="registeredOwner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Owner</FormLabel>
                        <FormControl>
                          <Input placeholder="Name or Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="registered">Registered</SelectItem>
                            <SelectItem value="unregistered">Unregistered</SelectItem>
                            <SelectItem value="historic">Historic</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country/Region of Registration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., United States" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Document Uploads</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { key: 'registration', label: 'Registration Certificate' },
                      { key: 'title', label: 'Title / Deed of Ownership' },
                      { key: 'insurance', label: 'Insurance Document' },
                      { key: 'service', label: 'Service History' },
                      { key: 'inspection', label: 'Recent Inspection Report' },
                      { key: 'receipts', label: 'Customization Receipts' }
                    ].map(doc => (
                      <div key={doc.key} className="border rounded-lg p-4">
                        <Label className="text-sm font-medium">{doc.label}</Label>
                        <div className="mt-2">
                          <Input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(doc.key, e.target.files)}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                          />
                        </div>
                        {uploadedFiles[doc.key]?.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {uploadedFiles[doc.key].map((file, index) => (
                              <div key={index} className="flex items-center justify-between text-xs bg-muted p-2 rounded">
                                <span>{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(doc.key, index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access & Rules Tab */}
          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Access & Rules
                </CardTitle>
                <CardDescription>
                  Define availability and rules for your vehicle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Available For</Label>
                  <div className="mt-3 space-y-2">
                    {[
                      { value: 'rent-self', label: '🚗 Rent (Self-Drive)' },
                      { value: 'rent-driver', label: '👨‍✈️ Rent (With Driver)' },
                      { value: 'display', label: '👁️ Static Display Only' },
                      { value: 'private', label: '🔒 Private Use Only' }
                    ].map(option => (
                      <FormField
                        key={option.value}
                        control={form.control}
                        name="availableFor"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={option.value}
                                checked={field.value?.includes(option.value)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, option.value]);
                                  } else {
                                    field.onChange(current.filter(v => v !== option.value));
                                  }
                                }}
                              />
                              <label htmlFor={option.value} className="text-sm cursor-pointer">
                                {option.label}
                              </label>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Rental Rules</Label>
                  <div className="mt-3 space-y-2">
                    {[
                      { value: 'no-smoking', label: '🚭 No Smoking' },
                      { value: 'no-pets', label: '🐕 No Pets' },
                      { value: 'min-age', label: '🔞 Minimum Age Requirement' },
                      { value: 'deposit', label: '💰 Deposit Required' },
                      { value: 'insurance', label: '🛡️ Insurance Required' },
                      { value: 'full-tank', label: '⛽ Return Full Tank' },
                      { value: 'no-offroad', label: '🏔️ No Off-Road Driving' }
                    ].map(rule => (
                      <FormField
                        key={rule.value}
                        control={form.control}
                        name="rentalRules"
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={rule.value}
                                checked={field.value?.includes(rule.value)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, rule.value]);
                                  } else {
                                    field.onChange(current.filter(v => v !== rule.value));
                                  }
                                }}
                              />
                              <label htmlFor={rule.value} className="text-sm cursor-pointer">
                                {rule.label}
                              </label>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="accessInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Instructions</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide detailed instructions for accessing the vehicle..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guestBehaviorNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Guest Behavior Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Any additional notes about expected behavior or special considerations..." 
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

          {/* Media & Files Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Media & Files
                </CardTitle>
                <CardDescription>
                  Upload photos, videos, and virtual tours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { key: 'tours', label: '🌐 360° Virtual Tours', accept: '.jpg,.jpeg,.png' },
                  { key: 'photos', label: '📸 Photos', accept: '.jpg,.jpeg,.png' },
                  { key: 'videos', label: '🎥 Videos', accept: '.mp4,.mov,.avi' },
                  { key: 'documents', label: '📄 Documents & Specs', accept: '.pdf,.doc,.docx' }
                ].map(media => (
                  <div key={media.key} className="border rounded-lg p-4">
                    <Label className="text-base font-medium">{media.label}</Label>
                    <div className="mt-4 space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <Input
                          type="file"
                          multiple
                          accept={media.accept}
                          onChange={(e) => handleFileUpload(media.key, e.target.files)}
                          className="hidden"
                          id={`upload-${media.key}`}
                        />
                        <Label 
                          htmlFor={`upload-${media.key}`}
                          className="cursor-pointer text-sm text-muted-foreground"
                        >
                          Drag & drop files here or click to upload
                        </Label>
                      </div>
                      
                      {uploadedFiles[media.key]?.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="font-medium text-sm">Uploaded Files:</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {uploadedFiles[media.key].map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted p-3 rounded">
                                <span className="text-sm truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(media.key, index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
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
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
                <CardDescription>
                  Set the vehicle's location
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                          <Input placeholder="Postal code" {...field} />
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
                      <FormLabel>Google Plus Code (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 9G8F+5X New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

                <FormField
                  control={form.control}
                  name="approximateLocationOnly"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Display Approximate Location Only</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Show general area instead of exact address for privacy
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

                <div className="h-64 w-full rounded-lg overflow-hidden">
                  <MapboxLocationPicker
                    coordinates={
                      form.watch('coordinates')?.lat && form.watch('coordinates')?.lng 
                        ? { lat: form.watch('coordinates')!.lat!, lng: form.watch('coordinates')!.lng! }
                        : null
                    }
                    onCoordinatesChange={(coords) => form.setValue('coordinates', coords)}
                    onZoomChange={() => {}}
                    zoom={12}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visibility & Protection Tab */}
          <TabsContent value="visibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Visibility & Protection
                </CardTitle>
                <CardDescription>
                  Control who can see and access your listing
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
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="unlisted">Unlisted Link</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="pinProtection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">PIN Protection</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Require a PIN to access this listing
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

                {form.watch('pinProtection') && (
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Code</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="Enter 4-6 digit PIN" 
                            maxLength={6}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="displayPricing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Display Pricing</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Show pricing information to visitors
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

                <div className="bg-muted p-4 rounded-lg">
                  <Label className="text-base font-medium">Shareable Link</Label>
                  <div className="mt-2 flex gap-2">
                    <Input 
                      value={`https://xplor.com/vehicles/listing-${Math.random().toString(36).substr(2, 9)}`}
                      readOnly 
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(`https://xplor.com/vehicles/listing-${Math.random().toString(36).substr(2, 9)}`);
                        toast.success('Link copied to clipboard!');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-background">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Creating Listing...' : 'Create Vehicle Listing'}
          </Button>
        </div>
      </form>
    </Form>
  );
};