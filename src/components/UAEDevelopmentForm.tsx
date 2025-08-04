import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Plus, X, Upload, Link, Image, Video, FileText, Map, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import MapboxLocationPicker from './MapboxLocationPicker';
import MultiImageUpload from './MultiImageUpload';
import FeaturedImageUpload from './FeaturedImageUpload';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'document' | 'tour';
  file?: File;
  url?: string;
  name: string;
  description?: string;
  tags: string[];
  componentTag?: string;
  visibility: 'public' | 'admin' | 'pin_protected' | 'link_only';
}

interface ProjectComponent {
  id: string;
  type: string;
  name: string;
  units: number;
  usageType: string;
  height: string;
  floors: string;
  area: string;
  amenities: string;
}

interface ProximityItem {
  id: string;
  type: string;
  name: string;
  distance: string;
}

export default function UAEDevelopmentForm() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [projectComponents, setProjectComponents] = useState<ProjectComponent[]>([]);
  const [proximityItems, setProximityItems] = useState<ProximityItem[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [location, setLocation] = useState<{lng: number, lat: number} | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const addMediaItem = (type: MediaItem['type']) => {
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type,
      name: '',
      tags: [],
      visibility: 'public'
    };
    setMediaItems([...mediaItems, newItem]);
  };

  const updateMediaItem = (id: string, updates: Partial<MediaItem>) => {
    setMediaItems(items => items.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeMediaItem = (id: string) => {
    setMediaItems(items => items.filter(item => item.id !== id));
  };

  const addProjectComponent = () => {
    const newComponent: ProjectComponent = {
      id: Date.now().toString(),
      type: '',
      name: '',
      units: 0,
      usageType: '',
      height: '',
      floors: '',
      area: '',
      amenities: ''
    };
    setProjectComponents([...projectComponents, newComponent]);
  };

  const updateProjectComponent = (id: string, updates: Partial<ProjectComponent>) => {
    setProjectComponents(components => components.map(component => 
      component.id === id ? { ...component, ...updates } : component
    ));
  };

  const removeProjectComponent = (id: string) => {
    setProjectComponents(components => components.filter(component => component.id !== id));
  };

  const addProximityItem = () => {
    const newItem: ProximityItem = {
      id: Date.now().toString(),
      type: '',
      name: '',
      distance: ''
    };
    setProximityItems([...proximityItems, newItem]);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    console.log('Media items:', mediaItems);
    console.log('Project components:', projectComponents);
    console.log('Location:', location);
    toast.success("UAE Development listing created successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="sales">Sales & Leasing</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the UAE development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingTitle">Listing Title *</Label>
                  <Input
                    id="listingTitle"
                    placeholder="e.g., DAMAC Lagoons – Dubai"
                    {...register("listingTitle", { required: "Title is required" })}
                  />
                  {errors.listingTitle && (
                    <span className="text-sm text-red-500">{errors.listingTitle.message as string}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developmentType">Development Type *</Label>
                  <Select onValueChange={(value) => setValue("developmentType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select development type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="developer">Developer</Label>
                  <Select onValueChange={(value) => setValue("developer", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select developer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emaar">Emaar</SelectItem>
                      <SelectItem value="damac">DAMAC</SelectItem>
                      <SelectItem value="nakheel">Nakheel</SelectItem>
                      <SelectItem value="aldar">Aldar</SelectItem>
                      <SelectItem value="sobha">Sobha</SelectItem>
                      <SelectItem value="binghatti">Binghatti</SelectItem>
                      <SelectItem value="meraas">Meraas</SelectItem>
                      <SelectItem value="dubai-holding">Dubai Holding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandedPartner">Branded Residences Partner (optional)</Label>
                  <Select onValueChange={(value) => setValue("brandedPartner", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branded partner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bulgari">Bulgari</SelectItem>
                      <SelectItem value="armani">Armani</SelectItem>
                      <SelectItem value="versace">Versace</SelectItem>
                      <SelectItem value="trump">Trump</SelectItem>
                      <SelectItem value="address">Address</SelectItem>
                      <SelectItem value="vida">Vida</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chainRestaurant">Chain Restaurant Options (for mixed-use)</Label>
                <Select onValueChange={(value) => setValue("chainRestaurant", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select restaurant chains (if applicable)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starbucks">Starbucks</SelectItem>
                    <SelectItem value="mcdonalds">McDonald's</SelectItem>
                    <SelectItem value="pf-changs">P.F. Chang's</SelectItem>
                    <SelectItem value="shake-shack">Shake Shack</SelectItem>
                    <SelectItem value="cheesecake-factory">The Cheesecake Factory</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the development..."
                  className="min-h-[120px]"
                  {...register("description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="completionStatus">Completion Status</Label>
                  <Select onValueChange={(value) => setValue("completionStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select completion status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-construction">Under Construction</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                      <SelectItem value="off-plan">Off-Plan</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    {...register("deliveryDate")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfBuildings">Number of Buildings/Towers</Label>
                  <Input
                    id="numberOfBuildings"
                    type="number"
                    placeholder="e.g., 5"
                    {...register("numberOfBuildings")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfUnits">Number of Units (approx.)</Label>
                  <Input
                    id="numberOfUnits"
                    type="number"
                    placeholder="e.g., 1500"
                    {...register("numberOfUnits")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listingType">Listing Type</Label>
                  <Select onValueChange={(value) => setValue("listingType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="showcase">Showcase</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-lease">For Lease</SelectItem>
                      <SelectItem value="archive">Archive Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="architect">Architect / Masterplanner (optional)</Label>
                <Input
                  id="architect"
                  placeholder="e.g., Foster + Partners"
                  {...register("architect")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Overview</CardTitle>
              <CardDescription>Project scale and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalArea">Total Area (sq m)</Label>
                  <Input
                    id="totalArea"
                    type="number"
                    placeholder="e.g., 500000"
                    {...register("totalArea")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tallestTowerHeight">Height of Tallest Tower (m)</Label>
                  <Input
                    id="tallestTowerHeight"
                    type="number"
                    placeholder="e.g., 300"
                    {...register("tallestTowerHeight")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownershipType">Freehold / Leasehold</Label>
                  <Select onValueChange={(value) => setValue("ownershipType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communityType">Community Type</Label>
                  <Select onValueChange={(value) => setValue("communityType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select community type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urban</SelectItem>
                      <SelectItem value="waterfront">Waterfront</SelectItem>
                      <SelectItem value="golf">Golf</SelectItem>
                      <SelectItem value="desert-oasis">Desert Oasis</SelectItem>
                      <SelectItem value="city-core">City Core</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="masterDeveloper">Master Developer</Label>
                  <Input
                    id="masterDeveloper"
                    placeholder="e.g., Dubai Holding"
                    {...register("masterDeveloper")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subDeveloper">Sub-Developer (optional)</Label>
                  <Input
                    id="subDeveloper"
                    placeholder="e.g., Joint venture partner"
                    {...register("subDeveloper")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedPopulation">Estimated Population (if residential)</Label>
                  <Input
                    id="estimatedPopulation"
                    type="number"
                    placeholder="e.g., 8000"
                    {...register("estimatedPopulation")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentZone">Investment Zone</Label>
                  <Select onValueChange={(value) => setValue("investmentZone", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free-zone">Free Zone</SelectItem>
                      <SelectItem value="mainland">Mainland</SelectItem>
                      <SelectItem value="difc">DIFC</SelectItem>
                      <SelectItem value="tecom">TECOM</SelectItem>
                      <SelectItem value="dmcc">DMCC</SelectItem>
                      <SelectItem value="adgm">ADGM</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="gatedCommunity" {...register("gatedCommunity")} />
                <Label htmlFor="gatedCommunity">Gated Community</Label>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Sustainability Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['LEED Certification', 'Green Roof', 'Solar Panels', 'Water Reuse', 'Car-Free Zones'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox id={feature} {...register(`sustainabilityFeatures.${feature.toLowerCase().replace(/[\/\s-]+/g, '_')}`)} />
                      <Label htmlFor={feature}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Components</CardTitle>
              <CardDescription>Individual buildings and facilities within the development</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Development Components</Label>
                <Button type="button" onClick={addProjectComponent} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Component
                </Button>
              </div>
              
              {projectComponents.map((component, index) => (
                <div key={component.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Component {index + 1}</Badge>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProjectComponent(component.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Component Type</Label>
                      <Select onValueChange={(value) => updateProjectComponent(component.id, { type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select component type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential-tower">Residential Tower</SelectItem>
                          <SelectItem value="villas">Villas</SelectItem>
                          <SelectItem value="retail-plaza">Retail Plaza</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="office-building">Office Building</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="mosque">Mosque</SelectItem>
                          <SelectItem value="park">Park</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Name / Label</Label>
                      <Input
                        placeholder="e.g., Tower A, Villa District"
                        value={component.name}
                        onChange={(e) => updateProjectComponent(component.id, { name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Number of Units</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 200"
                        value={component.units || ''}
                        onChange={(e) => updateProjectComponent(component.id, { units: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Usage Type</Label>
                      <Input
                        placeholder="e.g., Apartments, Townhouses"
                        value={component.usageType}
                        onChange={(e) => updateProjectComponent(component.id, { usageType: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Height (m)</Label>
                      <Input
                        placeholder="e.g., 150"
                        value={component.height}
                        onChange={(e) => updateProjectComponent(component.id, { height: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Floors</Label>
                      <Input
                        placeholder="e.g., 40"
                        value={component.floors}
                        onChange={(e) => updateProjectComponent(component.id, { floors: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Area (sq m)</Label>
                      <Input
                        placeholder="e.g., 50000"
                        value={component.area}
                        onChange={(e) => updateProjectComponent(component.id, { area: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Attached Amenities</Label>
                    <Textarea
                      placeholder="Describe specific amenities for this component..."
                      value={component.amenities}
                      onChange={(e) => updateProjectComponent(component.id, { amenities: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Facilities & Amenities</CardTitle>
              <CardDescription>Community-wide facilities and accessibility features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Community Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Clubhouse', 'Swimming Pools', 'Gym / Fitness Center', 'Running Track', 'BBQ Area', 'Private Beach', 'Kids Play Area', 'Mosque', 'Business Center / Coworking', 'Smart Security / CCTV', 'Covered Parking', 'Guest Parking', 'Concierge / Lobby', 'Event Hall', 'Private Gardens', 'Golf Course / Tennis Courts', 'Shops / Retail Promenade', 'Hotel or Branded Service Provider', 'Delivery Locker Room', 'Charging Stations'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} {...register(`communityAmenities.${amenity.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Accessibility Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Wheelchair Friendly', 'Elevators', 'Tactile Paving', 'Ramp Access', 'Braille Signage'].map((accessibility) => (
                    <div key={accessibility} className="flex items-center space-x-2">
                      <Checkbox id={accessibility} {...register(`accessibility.${accessibility.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={accessibility}>{accessibility}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales, Leasing & Availability</CardTitle>
              <CardDescription>Commercial information and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentStatus">Current Status</Label>
                  <Select onValueChange={(value) => setValue("currentStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-launch">Pre-Launch</SelectItem>
                      <SelectItem value="off-plan">Off-Plan</SelectItem>
                      <SelectItem value="under-construction">Under Construction</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownershipOptions">Ownership Options</Label>
                  <Select onValueChange={(value) => setValue("ownershipOptions", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership options" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="fractional">Fractional Ownership</SelectItem>
                      <SelectItem value="timeshare">Timeshare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="unitsAvailable" {...register("unitsAvailable")} />
                <Label htmlFor="unitsAvailable">Units Available</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salesOfficeLocation">Sales Office Location</Label>
                  <Input
                    id="salesOfficeLocation"
                    placeholder="e.g., Downtown Dubai Sales Gallery"
                    {...register("salesOfficeLocation")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricingRange">Pricing Range (AED)</Label>
                  <Input
                    id="pricingRange"
                    placeholder="e.g., 800,000 - 5,000,000"
                    {...register("pricingRange")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="handoverTimeline">Handover Timeline</Label>
                <Input
                  id="handoverTimeline"
                  placeholder="e.g., Q4 2025"
                  {...register("handoverTimeline")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentPlans">Payment Plans</Label>
                <Textarea
                  id="paymentPlans"
                  placeholder="Describe available payment plans..."
                  {...register("paymentPlans")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agentContact">Agents / Broker Contact</Label>
                <Textarea
                  id="agentContact"
                  placeholder="List agent contacts or broker information..."
                  {...register("agentContact")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media & Files</CardTitle>
              <CardDescription>Upload images, videos, documents and virtual tours</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FeaturedImageUpload
                featuredImage={featuredImage}
                onFeaturedImageChange={setFeaturedImage}
                label="Featured Image (listing thumbnail)"
              />

              <Separator />

              <MultiImageUpload
                mediaItems={mediaItems}
                onMediaItemsChange={setMediaItems}
                maxFiles={50}
                showComponentTags={true}
                componentTagOptions={[
                  { value: 'masterplan', label: 'Masterplan' },
                  { value: 'tower', label: 'Tower' },
                  { value: 'amenities', label: 'Amenities' },
                  { value: 'villa', label: 'Villa' },
                  { value: 'retail', label: 'Retail' },
                  { value: 'lifestyle', label: 'Lifestyle' },
                  { value: 'construction', label: 'Construction' },
                  { value: 'location', label: 'Location' }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Address and proximity information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="developmentName">Development Name</Label>
                <Input
                  id="developmentName"
                  placeholder="e.g., Dubai Creek Harbour"
                  {...register("developmentName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Textarea
                  id="streetAddress"
                  placeholder="Full street address including area, city, and postal code"
                  {...register("streetAddress")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="community">Community / District</Label>
                  <Select onValueChange={(value) => setValue("community", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select community/district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business-bay">Business Bay</SelectItem>
                      <SelectItem value="palm-jumeirah">Palm Jumeirah</SelectItem>
                      <SelectItem value="downtown-dubai">Downtown Dubai</SelectItem>
                      <SelectItem value="marina">Dubai Marina</SelectItem>
                      <SelectItem value="al-reem-island">Al Reem Island</SelectItem>
                      <SelectItem value="corniche">Corniche</SelectItem>
                      <SelectItem value="saadiyat-island">Saadiyat Island</SelectItem>
                      <SelectItem value="jumeirah-village-circle">Jumeirah Village Circle</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select onValueChange={(value) => setValue("city", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                      <SelectItem value="sharjah">Sharjah</SelectItem>
                      <SelectItem value="ajman">Ajman</SelectItem>
                      <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                      <SelectItem value="fujairah">Fujairah</SelectItem>
                      <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location on Map</Label>
                <div className="h-64 border rounded-lg overflow-hidden">
                  <MapboxLocationPicker
                    coordinates={location}
                    onCoordinatesChange={setLocation}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googlePlusCode">Google Plus Code (optional)</Label>
                <Input
                  id="googlePlusCode"
                  placeholder="e.g., 7HQQ+4X Dubai"
                  {...register("googlePlusCode")}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Proximity</Label>
                  <Button type="button" onClick={addProximityItem} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Proximity
                  </Button>
                </div>
                
                {proximityItems.map((item, index) => (
                  <div key={item.id} className="flex gap-2 mb-2">
                    <Select onValueChange={(value) => {
                      const newItems = [...proximityItems];
                      newItems[index] = { ...item, type: value };
                      setProximityItems(newItems);
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro-station">Metro Station</SelectItem>
                        <SelectItem value="airport">Airport</SelectItem>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="mall">Mall</SelectItem>
                        <SelectItem value="beach">Beach</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="mosque">Mosque</SelectItem>
                        <SelectItem value="business-district">Business District</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Name"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...proximityItems];
                        newItems[index] = { ...item, name: e.target.value };
                        setProximityItems(newItems);
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Distance"
                      value={item.distance}
                      onChange={(e) => {
                        const newItems = [...proximityItems];
                        newItems[index] = { ...item, distance: e.target.value };
                        setProximityItems(newItems);
                      }}
                      className="w-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setProximityItems(items => items.filter(i => i.id !== item.id))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Visibility & Permissions</CardTitle>
              <CardDescription>Control who can see and access this listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingStatus">Listing Status</Label>
                  <Select onValueChange={(value) => setValue("listingStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select onValueChange={(value) => setValue("visibility", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="link-only">Link Only</SelectItem>
                      <SelectItem value="admin-only">Admin Only</SelectItem>
                      <SelectItem value="pin-protected">PIN Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploadingEntity">Uploading Entity / Developer / Agent Name</Label>
                <Input
                  id="uploadingEntity"
                  placeholder="Your name, company, or agency"
                  {...register("uploadingEntity")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tourPro">Tour Pro</Label>
                <Select onValueChange={(value) => setValue("tourPro", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour pro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pinCode">PIN Code (optional)</Label>
                <Input
                  id="pinCode"
                  placeholder="Enter PIN for protected access"
                  {...register("pinCode")}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="allowEmbedding" {...register("allowEmbedding")} />
                <Label htmlFor="allowEmbedding">Allow Embedding</Label>
              </div>

              <div className="space-y-2">
                <Label>Auto-generated Listing URL</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value="https://xplor.app/uae-development/damac-lagoons-dubai"
                    className="bg-gray-50"
                  />
                  <Button type="button" variant="outline" size="sm">
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit">
          Publish Listing
        </Button>
      </div>
    </form>
  );
}