import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import MapboxLocationPicker from '@/components/MapboxLocationPicker';
import MultiImageUpload from '@/components/MultiImageUpload';
import { Zap, MapPin, Clock, DollarSign, Car, Info } from 'lucide-react';

const chargeStationSchema = z.object({
  // Basic Information
  stationName: z.string().min(1, 'Station name is required'),
  operatorName: z.string().min(1, 'Operator name is required'),
  description: z.string().optional(),
  
  // Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Station Details
  stationType: z.string().min(1, 'Station type is required'),
  accessType: z.string().min(1, 'Access type is required'),
  operatingHours: z.string().min(1, 'Operating hours are required'),
  
  // Charging Ports
  totalPorts: z.number().min(1, 'Total ports is required'),
  portConfigurations: z.array(z.object({
    connectorType: z.string(),
    powerLevel: z.string(),
    quantity: z.number(),
    maxPower: z.number(),
    pricing: z.string(),
  })),
  
  // Amenities
  amenities: z.array(z.string()),
  accessibilityFeatures: z.array(z.string()),
  
  // Contact & Pricing
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
  website: z.string().url().optional(),
  pricingStructure: z.string().optional(),
  
  // Images
  images: z.array(z.any()).optional(),
});

type ChargeStationFormData = z.infer<typeof chargeStationSchema>;

interface ChargeStationUploadFormProps {
  onSubmit: (data: ChargeStationFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const connectorTypes = [
  'CHAdeMO',
  'CCS Combo 1',
  'CCS Combo 2',
  'Tesla Supercharger',
  'J1772',
  'Type 2',
  'GB/T DC',
  'GB/T AC'
];

const powerLevels = [
  'Level 1 (120V AC)',
  'Level 2 (240V AC)',
  'DC Fast Charging (50kW+)',
  'Ultra-Fast Charging (150kW+)',
  'Tesla Supercharger'
];

const amenitiesList = [
  'Restrooms',
  'Food/Restaurants',
  'Shopping',
  'WiFi',
  'Parking',
  'ATM',
  'Car Wash',
  'Lounge Area',
  'Vending Machines',
  'EV Charging Lounge'
];

const accessibilityFeatures = [
  'Wheelchair Accessible',
  'Wide Parking Spaces',
  'Audio Assistance',
  'Braille Signage',
  'Ground Level Access',
  'Accessible Restrooms'
];

export const ChargeStationUploadForm: React.FC<ChargeStationUploadFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ChargeStationFormData>({
    resolver: zodResolver(chargeStationSchema),
    defaultValues: {
      amenities: [],
      accessibilityFeatures: [],
      portConfigurations: [{ connectorType: '', powerLevel: '', quantity: 1, maxPower: 0, pricing: '' }],
    },
  });

  const watchedAmenities = watch('amenities') || [];
  const watchedAccessibility = watch('accessibilityFeatures') || [];
  const watchedPorts = watch('portConfigurations') || [];

  const handleLocationSelect = (location: { latitude: number; longitude: number; address: string }) => {
    setValue('latitude', location.latitude);
    setValue('longitude', location.longitude);
    setValue('address', location.address);
  };

  const addPortConfiguration = () => {
    const currentPorts = watchedPorts;
    setValue('portConfigurations', [
      ...currentPorts,
      { connectorType: '', powerLevel: '', quantity: 1, maxPower: 0, pricing: '' }
    ]);
  };

  const removePortConfiguration = (index: number) => {
    const currentPorts = watchedPorts;
    setValue('portConfigurations', currentPorts.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenity: string) => {
    const current = watchedAmenities;
    const updated = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setValue('amenities', updated);
  };

  const toggleAccessibility = (feature: string) => {
    const current = watchedAccessibility;
    const updated = current.includes(feature)
      ? current.filter(f => f !== feature)
      : [...current, feature];
    setValue('accessibilityFeatures', updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="charging">Charging Details</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Provide basic details about your charging station
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stationName">Station Name *</Label>
                  <Input
                    id="stationName"
                    {...register('stationName')}
                    placeholder="e.g., Downtown Tesla Supercharger"
                  />
                  {errors.stationName && (
                    <p className="text-sm text-red-500 mt-1">{errors.stationName.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="operatorName">Operator Name *</Label>
                  <Input
                    id="operatorName"
                    {...register('operatorName')}
                    placeholder="e.g., Tesla, ChargePoint, EVgo"
                  />
                  {errors.operatorName && (
                    <p className="text-sm text-red-500 mt-1">{errors.operatorName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Describe your charging station, location highlights, and any special features..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stationType">Station Type *</Label>
                  <Select onValueChange={(value) => setValue('stationType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select station type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="semi-public">Semi-Public</SelectItem>
                      <SelectItem value="workplace">Workplace</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="fleet">Fleet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accessType">Access Type *</Label>
                  <Select onValueChange={(value) => setValue('accessType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24/7">24/7 Access</SelectItem>
                      <SelectItem value="business-hours">Business Hours Only</SelectItem>
                      <SelectItem value="restricted">Restricted Access</SelectItem>
                      <SelectItem value="member-only">Members Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="operatingHours">Operating Hours *</Label>
                <Input
                  id="operatingHours"
                  {...register('operatingHours')}
                  placeholder="e.g., 24/7, Mon-Fri 8AM-6PM, or specific hours"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Details
              </CardTitle>
              <CardDescription>
                Specify the exact location of your charging station
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-muted-foreground">Map component will be available here for location selection</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Street address"
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="City"
                  />
                </div>

                <div>
                  <Label htmlFor="state">State/Province *</Label>
                  <Input
                    id="state"
                    {...register('state')}
                    placeholder="State or Province"
                  />
                </div>

                <div>
                  <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                  <Input
                    id="zipCode"
                    {...register('zipCode')}
                    placeholder="ZIP or Postal Code"
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    {...register('country')}
                    placeholder="Country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charging" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Charging Port Configurations
              </CardTitle>
              <CardDescription>
                Define the types and specifications of charging ports available
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="totalPorts">Total Number of Ports *</Label>
                <Input
                  id="totalPorts"
                  type="number"
                  {...register('totalPorts', { valueAsNumber: true })}
                  placeholder="e.g., 8"
                  min="1"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Port Configurations</h4>
                  <Button type="button" onClick={addPortConfiguration} variant="outline" size="sm">
                    Add Port Type
                  </Button>
                </div>

                {watchedPorts.map((port, index) => (
                  <Card key={index} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                      <div>
                        <Label>Connector Type</Label>
                        <Select onValueChange={(value) => {
                          const updatedPorts = [...watchedPorts];
                          updatedPorts[index].connectorType = value;
                          setValue('portConfigurations', updatedPorts);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select connector" />
                          </SelectTrigger>
                          <SelectContent>
                            {connectorTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Power Level</Label>
                        <Select onValueChange={(value) => {
                          const updatedPorts = [...watchedPorts];
                          updatedPorts[index].powerLevel = value;
                          setValue('portConfigurations', updatedPorts);
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select power level" />
                          </SelectTrigger>
                          <SelectContent>
                            {powerLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={port.quantity}
                          onChange={(e) => {
                            const updatedPorts = [...watchedPorts];
                            updatedPorts[index].quantity = parseInt(e.target.value) || 1;
                            setValue('portConfigurations', updatedPorts);
                          }}
                        />
                      </div>

                      <div>
                        <Label>Max Power (kW)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.1"
                          value={port.maxPower}
                          onChange={(e) => {
                            const updatedPorts = [...watchedPorts];
                            updatedPorts[index].maxPower = parseFloat(e.target.value) || 0;
                            setValue('portConfigurations', updatedPorts);
                          }}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Input
                          placeholder="Pricing"
                          value={port.pricing}
                          onChange={(e) => {
                            const updatedPorts = [...watchedPorts];
                            updatedPorts[index].pricing = e.target.value;
                            setValue('portConfigurations', updatedPorts);
                          }}
                        />
                        {watchedPorts.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePortConfiguration(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Contact & Pricing Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      {...register('contactPhone')}
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      {...register('contactEmail')}
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      {...register('website')}
                      placeholder="https://website.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pricingStructure">Pricing Structure</Label>
                  <Textarea
                    id="pricingStructure"
                    {...register('pricingStructure')}
                    placeholder="Describe your pricing model (e.g., per kWh, per minute, membership rates, etc.)"
                    rows={2}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Accessibility</CardTitle>
              <CardDescription>
                Select available amenities and accessibility features at your charging station
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Available Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {amenitiesList.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        checked={watchedAmenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />
                      <Label className="text-sm">{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Accessibility Features</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {accessibilityFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        checked={watchedAccessibility.includes(feature)}
                        onCheckedChange={() => toggleAccessibility(feature)}
                      />
                      <Label className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Station Images</h4>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-muted-foreground">Image upload component will be available here</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Upload images of your charging station, including exterior views, charging ports, and nearby amenities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Charging Station Listing'}
        </Button>
      </div>
    </form>
  );
};