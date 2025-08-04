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
  usage: string;
  floors: number;
  units: number;
  floorArea: string;
  uniqueFeature: string;
}

interface ProximityTag {
  id: string;
  type: string;
  name: string;
  distance: string;
}

export default function DevelopmentForm() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [projectComponents, setProjectComponents] = useState<ProjectComponent[]>([]);
  const [proximityTags, setProximityTags] = useState<ProximityTag[]>([]);
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
      usage: '',
      floors: 0,
      units: 0,
      floorArea: '',
      uniqueFeature: ''
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

  const addProximityTag = () => {
    const newTag: ProximityTag = {
      id: Date.now().toString(),
      type: '',
      name: '',
      distance: ''
    };
    setProximityTags([...proximityTags, newTag]);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    console.log('Media items:', mediaItems);
    console.log('Project components:', projectComponents);
    console.log('Location:', location);
    toast.success("Development listing created successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="sales">Sales & Marketing</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the development project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingTitle">Listing Title *</Label>
                  <Input
                    id="listingTitle"
                    placeholder="e.g., Aria Hills – Luxury Urban Development"
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
                      <SelectItem value="masterplan-city">Masterplan / City</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="developerName">Developer Name</Label>
                  <Input
                    id="developerName"
                    placeholder="e.g., XYZ Development Group"
                    {...register("developerName")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chainRestaurantPartners">Chain Restaurant Partners (optional)</Label>
                  <Select onValueChange={(value) => setValue("chainRestaurantPartners", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select restaurant chains" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcdonalds">McDonald's</SelectItem>
                      <SelectItem value="starbucks">Starbucks</SelectItem>
                      <SelectItem value="nandos">Nando's</SelectItem>
                      <SelectItem value="pf-changs">P.F. Chang's</SelectItem>
                      <SelectItem value="subway">Subway</SelectItem>
                      <SelectItem value="kfc">KFC</SelectItem>
                      <SelectItem value="burger-king">Burger King</SelectItem>
                      <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandedResidencePartner">Branded Residence Partner (optional)</Label>
                <Select onValueChange={(value) => setValue("brandedResidencePartner", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branded residence partner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="armani">Armani</SelectItem>
                    <SelectItem value="ritz-carlton">Ritz-Carlton</SelectItem>
                    <SelectItem value="four-seasons">Four Seasons</SelectItem>
                    <SelectItem value="bulgari">Bulgari</SelectItem>
                    <SelectItem value="versace">Versace</SelectItem>
                    <SelectItem value="trump">Trump</SelectItem>
                    <SelectItem value="waldorf-astoria">Waldorf Astoria</SelectItem>
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
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="under-construction">Under Construction</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
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
                  <Label htmlFor="numberOfBuildings">Number of Buildings/Clusters</Label>
                  <Input
                    id="numberOfBuildings"
                    type="number"
                    placeholder="e.g., 12"
                    {...register("numberOfBuildings")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfUnits">Number of Units (approx.)</Label>
                  <Input
                    id="numberOfUnits"
                    type="number"
                    placeholder="e.g., 850"
                    {...register("numberOfUnits")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="listingPurpose">Listing Purpose</Label>
                  <Select onValueChange={(value) => setValue("listingPurpose", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
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
                  placeholder="e.g., Skidmore, Owings & Merrill"
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
              <CardDescription>Project scale and key characteristics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalSiteArea">Total Site Area (sq ft or sq m)</Label>
                  <Input
                    id="totalSiteArea"
                    type="number"
                    placeholder="e.g., 2500000"
                    {...register("totalSiteArea")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectPhase">Project Phase</Label>
                  <Select onValueChange={(value) => setValue("projectPhase", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase-1">Phase 1</SelectItem>
                      <SelectItem value="entire-development">Entire Development</SelectItem>
                      <SelectItem value="final-phase">Final Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownershipType">Ownership Type</Label>
                  <Select onValueChange={(value) => setValue("ownershipType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zoning">Zoning</Label>
                  <Select onValueChange={(value) => setValue("zoning", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select zoning" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="communityType">Community Type</Label>
                  <Select onValueChange={(value) => setValue("communityType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select community type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urban">Urban</SelectItem>
                      <SelectItem value="suburban">Suburban</SelectItem>
                      <SelectItem value="waterfront">Waterfront</SelectItem>
                      <SelectItem value="golf">Golf</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                      <SelectItem value="smart-city">Smart City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetDemographics">Target Demographics</Label>
                  <Select onValueChange={(value) => setValue("targetDemographics", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target demographics" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="investors">Investors</SelectItem>
                      <SelectItem value="families">Families</SelectItem>
                      <SelectItem value="expats">Expats</SelectItem>
                      <SelectItem value="vacation-buyers">Vacation Buyers</SelectItem>
                      <SelectItem value="institutional">Institutional</SelectItem>
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
                  {['LEED', 'Passive Cooling', 'Green Spaces', 'EV Chargers', 'Car-Free Design', 'Smart Utilities'].map((feature) => (
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
                          <SelectItem value="mall">Mall</SelectItem>
                          <SelectItem value="office-block">Office Block</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="park">Park</SelectItem>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="mosque">Mosque</SelectItem>
                          <SelectItem value="community-center">Community Center</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Name / Label</Label>
                      <Input
                        placeholder="e.g., Block A, Central Plaza"
                        value={component.name}
                        onChange={(e) => updateProjectComponent(component.id, { name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Usage</Label>
                      <Select onValueChange={(value) => updateProjectComponent(component.id, { usage: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select usage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="living">Living</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="hospitality">Hospitality</SelectItem>
                          <SelectItem value="public-amenity">Public Amenity</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Number of Floors</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 25"
                        value={component.floors || ''}
                        onChange={(e) => updateProjectComponent(component.id, { floors: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Number of Units</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 150"
                        value={component.units || ''}
                        onChange={(e) => updateProjectComponent(component.id, { units: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Floor Area (optional)</Label>
                      <Input
                        placeholder="e.g., 25000 sq ft"
                        value={component.floorArea}
                        onChange={(e) => updateProjectComponent(component.id, { floorArea: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Unique Feature</Label>
                      <Input
                        placeholder="e.g., Rooftop garden, Smart home technology"
                        value={component.uniqueFeature}
                        onChange={(e) => updateProjectComponent(component.id, { uniqueFeature: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Facilities</CardTitle>
              <CardDescription>Community amenities, safety features, and accessibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Community Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Swimming Pools', 'Clubhouse', 'Kids Play Area', 'Jogging Track', 'Event Spaces', 'Gym / Wellness', 'Spa / Sauna', 'Beach Access', 'Marina / Waterway', 'Business Lounge / Coworking', 'Amphitheatre', 'Retail Strip', 'Medical Center / Clinic', 'Hotel', 'Schools', 'Smart Community Features'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} {...register(`communityAmenities.${amenity.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Safety & Security</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['24/7 Security', 'CCTV', 'Gated Entrances', 'Intercom System', 'Fire Safety Systems', 'Emergency Services Access'].map((safety) => (
                    <div key={safety} className="flex items-center space-x-2">
                      <Checkbox id={safety} {...register(`safetyFeatures.${safety.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={safety}>{safety}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Accessibility</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Elevators', 'Wheelchair Access', 'Braille Signage', 'Family Friendly Design', 'Pet Friendly Design'].map((accessibility) => (
                    <div key={accessibility} className="flex items-center space-x-2">
                      <Checkbox id={accessibility} {...register(`accessibilityFeatures.${accessibility.toLowerCase().replace(/\s+/g, '_')}`)} />
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
              <CardTitle>Sales, Leasing & Marketing</CardTitle>
              <CardDescription>Commercial information and marketing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingStatus">Listing Status</Label>
                  <Select onValueChange={(value) => setValue("listingStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing status" />
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
                  <Label htmlFor="ownership">Ownership</Label>
                  <Select onValueChange={(value) => setValue("ownership", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freehold">Freehold</SelectItem>
                      <SelectItem value="leasehold">Leasehold</SelectItem>
                      <SelectItem value="fractional">Fractional</SelectItem>
                      <SelectItem value="timeshare">Timeshare</SelectItem>
                      <SelectItem value="rental-only">Rental Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="availableUnits" {...register("availableUnits")} />
                <Label htmlFor="availableUnits">Available Units</Label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salesOfficeLocation">Sales Office / Showroom Location</Label>
                  <Input
                    id="salesOfficeLocation"
                    placeholder="e.g., City Center Sales Gallery"
                    {...register("salesOfficeLocation")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pricingRange">Pricing Range</Label>
                  <Input
                    id="pricingRange"
                    placeholder="e.g., $500,000 - $2,500,000"
                    {...register("pricingRange")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="handoverTimeline">Handover Timeline</Label>
                <Input
                  id="handoverTimeline"
                  placeholder="e.g., Q2 2026"
                  {...register("handoverTimeline")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentPlans">Payment Plans</Label>
                <Textarea
                  id="paymentPlans"
                  placeholder="Describe available payment plans and terms..."
                  {...register("paymentPlans")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadAgent">Lead Agent or Broker</Label>
                  <Input
                    id="leadAgent"
                    placeholder="Agent name or brokerage"
                    {...register("leadAgent")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developerContact">Developer Sales Contact</Label>
                  <Input
                    id="developerContact"
                    placeholder="Developer contact information"
                    {...register("developerContact")}
                  />
                </div>
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
              <div>
                <Label className="text-base font-medium mb-4 block">Featured Image</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFeaturedImage(file);
                        toast.success("Featured image uploaded");
                      }
                    }}
                    className="hidden"
                    id="featured-image"
                  />
                  <label htmlFor="featured-image" className="cursor-pointer">
                    <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600">
                      {featuredImage ? featuredImage.name : "Click to upload featured image"}
                    </p>
                  </label>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Media Items</Label>
                  <div className="flex gap-2">
                    <Button type="button" onClick={() => addMediaItem('image')} size="sm" variant="outline">
                      <Image className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                    <Button type="button" onClick={() => addMediaItem('video')} size="sm" variant="outline">
                      <Video className="h-4 w-4 mr-2" />
                      Add Video
                    </Button>
                    <Button type="button" onClick={() => addMediaItem('tour')} size="sm" variant="outline">
                      <Map className="h-4 w-4 mr-2" />
                      Add 360° Tour
                    </Button>
                    <Button type="button" onClick={() => addMediaItem('document')} size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Add Document
                    </Button>
                  </div>
                </div>

                {mediaItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.type.toUpperCase()} {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMediaItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          placeholder="Media name"
                          value={item.name}
                          onChange={(e) => updateMediaItem(item.id, { name: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Component Tag</Label>
                        <Select onValueChange={(value) => updateMediaItem(item.id, { componentTag: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Tag by component" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masterplan">Masterplan</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="amenities">Amenities</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="lifestyle">Lifestyle</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="location">Location</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Visibility</Label>
                        <Select onValueChange={(value: any) => updateMediaItem(item.id, { visibility: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="admin">Admin Only</SelectItem>
                            <SelectItem value="pin_protected">PIN Protected</SelectItem>
                            <SelectItem value="link_only">Link Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Upload File</Label>
                        <input
                          type="file"
                          accept={item.type === 'image' ? 'image/*' : item.type === 'video' ? 'video/*' : '*'}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              updateMediaItem(item.id, { file });
                            }
                          }}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Or URL</Label>
                      <Input
                        placeholder="https://..."
                        value={item.url || ''}
                        onChange={(e) => updateMediaItem(item.id, { url: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Description / Caption</Label>
                      <Textarea
                        placeholder="Description or caption for this media item"
                        value={item.description || ''}
                        onChange={(e) => updateMediaItem(item.id, { description: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                <Label htmlFor="projectAddress">Project Address</Label>
                <Textarea
                  id="projectAddress"
                  placeholder="Full project address including street, city, state/province, postal code"
                  {...register("projectAddress")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="e.g., United States"
                    {...register("country")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City / Municipality</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Miami"
                    {...register("city")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood (optional)</Label>
                <Input
                  id="neighborhood"
                  placeholder="e.g., Brickell, Downtown"
                  {...register("neighborhood")}
                />
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
                  placeholder="e.g., 76QXX+XX Miami"
                  {...register("googlePlusCode")}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Proximity Tags</Label>
                  <Button type="button" onClick={addProximityTag} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Proximity
                  </Button>
                </div>
                
                {proximityTags.map((tag, index) => (
                  <div key={tag.id} className="flex gap-2 mb-2">
                    <Select onValueChange={(value) => {
                      const newTags = [...proximityTags];
                      newTags[index] = { ...tag, type: value };
                      setProximityTags(newTags);
                    }}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro-transport">Metro / Transport Hubs</SelectItem>
                        <SelectItem value="airport">Airport</SelectItem>
                        <SelectItem value="mall">Mall</SelectItem>
                        <SelectItem value="schools">Schools</SelectItem>
                        <SelectItem value="parks">Parks</SelectItem>
                        <SelectItem value="beach">Beach</SelectItem>
                        <SelectItem value="tourist-sites">Tourist Sites</SelectItem>
                        <SelectItem value="business-district">Business District</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Name"
                      value={tag.name}
                      onChange={(e) => {
                        const newTags = [...proximityTags];
                        newTags[index] = { ...tag, name: e.target.value };
                        setProximityTags(newTags);
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Distance"
                      value={tag.distance}
                      onChange={(e) => {
                        const newTags = [...proximityTags];
                        newTags[index] = { ...tag, distance: e.target.value };
                        setProximityTags(newTags);
                      }}
                      className="w-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setProximityTags(tags => tags.filter(t => t.id !== tag.id))}
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
                  <Label htmlFor="listingStatusFinal">Listing Status</Label>
                  <Select onValueChange={(value) => setValue("listingStatusFinal", value)}>
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
                  <Label htmlFor="publicVisibility">Public Visibility</Label>
                  <Select onValueChange={(value) => setValue("publicVisibility", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="pin-protected">PIN Protected</SelectItem>
                      <SelectItem value="admin-only">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploaderInfo">Uploader Info (Developer / Tour Pro / Broker name)</Label>
                <Input
                  id="uploaderInfo"
                  placeholder="Your name, company, or role"
                  {...register("uploaderInfo")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTourPro">Assigned Tour Pro (optional)</Label>
                <Select onValueChange={(value) => setValue("assignedTourPro", value)}>
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
                <Checkbox id="embeddingAllowed" {...register("embeddingAllowed")} />
                <Label htmlFor="embeddingAllowed">Embedding Allowed</Label>
              </div>

              <div className="space-y-2">
                <Label>Auto-generated Listing URL</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value="https://xplor.app/development/aria-hills-luxury-urban-development"
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