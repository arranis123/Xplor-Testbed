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
import { Plus, X, Upload, Link, Image, Video, FileText, Map } from "lucide-react";
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
  visibility: 'public' | 'admin' | 'pin_protected' | 'link_only';
}

interface Coach {
  id: string;
  name: string;
  type: string;
  capacity: number;
  class: string;
}

interface Route {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: number;
}

export default function TrainTramForm() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
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

  const addCoach = () => {
    const newCoach: Coach = {
      id: Date.now().toString(),
      name: '',
      type: '',
      capacity: 0,
      class: ''
    };
    setCoaches([...coaches, newCoach]);
  };

  const updateCoach = (id: string, updates: Partial<Coach>) => {
    setCoaches(coaches => coaches.map(coach => 
      coach.id === id ? { ...coach, ...updates } : coach
    ));
  };

  const removeCoach = (id: string) => {
    setCoaches(coaches => coaches.filter(coach => coach.id !== id));
  };

  const addRoute = () => {
    const newRoute: Route = {
      id: Date.now().toString(),
      name: '',
      startPoint: '',
      endPoint: '',
      distance: 0
    };
    setRoutes([...routes, newRoute]);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    console.log('Media items:', mediaItems);
    console.log('Location:', location);
    toast.success("Train/Tram listing created successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the train or tram</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingTitle">Listing Title *</Label>
                  <Input
                    id="listingTitle"
                    placeholder="e.g., Historic London Tram 1935"
                    {...register("listingTitle", { required: "Title is required" })}
                  />
                  {errors.listingTitle && (
                    <span className="text-sm text-red-500">{errors.listingTitle.message as string}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type *</Label>
                  <Select onValueChange={(value) => setValue("vehicleType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light-rail">Light Rail / Tram</SelectItem>
                      <SelectItem value="metro">Metro / Subway</SelectItem>
                      <SelectItem value="commuter">Commuter Train</SelectItem>
                      <SelectItem value="intercity">Intercity Train</SelectItem>
                      <SelectItem value="high-speed">High-Speed Train</SelectItem>
                      <SelectItem value="heritage">Heritage / Tourist Train</SelectItem>
                      <SelectItem value="luxury">Luxury Railcar</SelectItem>
                      <SelectItem value="sleeper">Sleeper Train</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Operator</Label>
                  <Input
                    id="operator"
                    placeholder="e.g., Deutsche Bahn"
                    {...register("operator")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer / Builder</Label>
                  <Input
                    id="manufacturer"
                    placeholder="e.g., Siemens"
                    {...register("manufacturer")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="YYYY"
                    {...register("yearBuilt")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearRefurbished">Year Refurbished</Label>
                  <Input
                    id="yearRefurbished"
                    type="number"
                    placeholder="YYYY"
                    {...register("yearRefurbished")}
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
                      <SelectItem value="for-lease">For Lease</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="museum">Museum Entry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={(value) => setValue("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="in-storage">In Storage</SelectItem>
                    <SelectItem value="decommissioned">Decommissioned</SelectItem>
                    <SelectItem value="under-restoration">Under Restoration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the train or tram..."
                  className="min-h-[100px]"
                  {...register("description")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Train / Tram Details</CardTitle>
              <CardDescription>Technical specifications and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trainModel">Train Model / Series</Label>
                  <Input
                    id="trainModel"
                    placeholder="e.g., ICE 4"
                    {...register("trainModel")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfCars">Number of Cars / Coaches</Label>
                  <Input
                    id="numberOfCars"
                    type="number"
                    placeholder="e.g., 8"
                    {...register("numberOfCars")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="length">Length (meters)</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="e.g., 200"
                    {...register("length")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">Width (meters)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="e.g., 3.2"
                    {...register("width")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (meters)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g., 4.3"
                    {...register("height")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trackGauge">Track Gauge</Label>
                  <Select onValueChange={(value) => setValue("trackGauge", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select track gauge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (1435mm)</SelectItem>
                      <SelectItem value="narrow">Narrow</SelectItem>
                      <SelectItem value="broad">Broad</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topSpeed">Top Speed (km/h)</Label>
                  <Input
                    id="topSpeed"
                    type="number"
                    placeholder="e.g., 320"
                    {...register("topSpeed")}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Power Source</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Diesel', 'Electric Overhead', 'Electric Third Rail', 'Battery', 'Hybrid', 'Steam', 'Other'].map((power) => (
                    <div key={power} className="flex items-center space-x-2">
                      <Checkbox id={power} {...register(`powerSource.${power.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={power}>{power}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operatingVoltage">Operating Voltage (if electric)</Label>
                  <Input
                    id="operatingVoltage"
                    placeholder="e.g., 25kV AC"
                    {...register("operatingVoltage")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="couplingType">Coupling Type</Label>
                  <Input
                    id="couplingType"
                    placeholder="e.g., Scharfenberg"
                    {...register("couplingType")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brakingSystem">Braking System</Label>
                  <Input
                    id="brakingSystem"
                    placeholder="e.g., Regenerative + Disc"
                    {...register("brakingSystem")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bogieManufacturer">Bogie Manufacturer</Label>
                  <Input
                    id="bogieManufacturer"
                    placeholder="e.g., Jacobs"
                    {...register("bogieManufacturer")}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="driverCab" {...register("driverCab")} />
                <Label htmlFor="driverCab">Driver Cab Present</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration & Capacity</CardTitle>
              <CardDescription>Seating, layout and capacity information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerCapacitySeated">Passenger Capacity (Seated)</Label>
                  <Input
                    id="passengerCapacitySeated"
                    type="number"
                    placeholder="e.g., 400"
                    {...register("passengerCapacitySeated")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengerCapacityStanding">Passenger Capacity (Standing)</Label>
                  <Input
                    id="passengerCapacityStanding"
                    type="number"
                    placeholder="e.g., 200"
                    {...register("passengerCapacityStanding")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coachLayout">Coach Layout</Label>
                <Select onValueChange={(value) => setValue("coachLayout", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-deck">Single Deck</SelectItem>
                    <SelectItem value="double-deck">Double Deck</SelectItem>
                    <SelectItem value="articulated">Articulated</SelectItem>
                    <SelectItem value="open-plan">Open Plan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Class Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Economy', 'First Class', 'Business', 'Sleeper', 'Observation Lounge', 'Dining Car', 'Driver Cab'].map((classType) => (
                    <div key={classType} className="flex items-center space-x-2">
                      <Checkbox id={classType} {...register(`classOptions.${classType.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={classType}>{classType}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Coach Configuration</Label>
                  <Button type="button" onClick={addCoach} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Coach
                  </Button>
                </div>
                
                {coaches.map((coach, index) => (
                  <div key={coach.id} className="border rounded-lg p-4 space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Coach {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCoach(coach.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Coach Name"
                        value={coach.name}
                        onChange={(e) => updateCoach(coach.id, { name: e.target.value })}
                      />
                      
                      <Input
                        placeholder="Coach Type"
                        value={coach.type}
                        onChange={(e) => updateCoach(coach.id, { type: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Capacity"
                        value={coach.capacity || ''}
                        onChange={(e) => updateCoach(coach.id, { capacity: parseInt(e.target.value) || 0 })}
                      />
                      
                      <Input
                        placeholder="Class"
                        value={coach.class}
                        onChange={(e) => updateCoach(coach.id, { class: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Accessibility Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Wheelchair Access', 'Ramp Entry', 'Low-Floor Entry', 'Accessible Toilet', 'Audio Announcements', 'Braille Signage'].map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox id={feature} {...register(`accessibilityFeatures.${feature.toLowerCase().replace(/[\/\s-]+/g, '_')}`)} />
                      <Label htmlFor={feature}>{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="onboardCrew">Onboard Crew Capacity</Label>
                  <Input
                    id="onboardCrew"
                    type="number"
                    placeholder="e.g., 4"
                    {...register("onboardCrew")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toiletFacilities">Toilet Facilities</Label>
                  <Input
                    id="toiletFacilities"
                    type="number"
                    placeholder="Number of toilets"
                    {...register("toiletFacilities")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="climateControl">Climate Control</Label>
                  <Select onValueChange={(value) => setValue("climateControl", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select climate control" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="air-conditioning">Air Conditioning</SelectItem>
                      <SelectItem value="heating">Heating</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="wifi" {...register("wifi")} />
                <Label htmlFor="wifi">Wi-Fi Availability</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Services & Features</CardTitle>
              <CardDescription>Onboard amenities and safety systems</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Onboard Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Food & Beverage Service', 'Vending Machines', 'Power Outlets', 'USB Charging', 'Entertainment Screens', 'Reading Lights', 'Luggage Storage', 'Pet-Friendly Zones', 'Bike Racks', 'Quiet Zone', 'Baby Changing Facilities'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} {...register(`amenities.${amenity.toLowerCase().replace(/[&\/\s]+/g, '_')}`)} />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Special Areas</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['VIP / Business Lounge', 'Bar / Bistro', "Kids' Play Zone", 'Observation Deck / Dome Car', 'Sleeper Cabins'].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox id={area} {...register(`specialAreas.${area.toLowerCase().replace(/[\/'\s]+/g, '_')}`)} />
                      <Label htmlFor={area}>{area}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Safety Systems</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['CCTV', 'Passenger Intercom', 'Fire Suppression System', 'Emergency Brakes'].map((system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox id={system} {...register(`safetySystems.${system.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={system}>{system}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signalSystem">Signal System Compatibility</Label>
                <Select onValueChange={(value) => setValue("signalSystem", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select signal system" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="etcs">ETCS</SelectItem>
                    <SelectItem value="ptc">PTC</SelectItem>
                    <SelectItem value="cbtc">CBTC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                      <div className="space-y-2">
                        <Label>Or URL</Label>
                        <Input
                          placeholder="https://..."
                          value={item.url || ''}
                          onChange={(e) => updateMediaItem(item.id, { url: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description / Tags</Label>
                      <Textarea
                        placeholder="Description or tags (e.g., Driver Cab, Coach A, First Class)"
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

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Routes & Operations</CardTitle>
              <CardDescription>Operating routes and location information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentOperator">Current Operator / Route</Label>
                <Input
                  id="currentOperator"
                  placeholder="e.g., London Underground - Piccadilly Line"
                  {...register("currentOperator")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="typicalRoutes">Typical Route(s)</Label>
                <Textarea
                  id="typicalRoutes"
                  placeholder="Describe typical routes or service patterns..."
                  {...register("typicalRoutes")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseDepot">Base Depot / Terminal</Label>
                <Input
                  id="baseDepot"
                  placeholder="e.g., King's Cross Depot"
                  {...register("baseDepot")}
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

              <div>
                <Label className="text-base font-medium mb-4 block">Geographic Region</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Europe', 'North America', 'Asia-Pacific', 'South America', 'Africa', 'Middle East', 'Heritage / Museum'].map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox id={region} {...register(`geographicRegion.${region.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={region}>{region}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availabilityNotes">Availability Notes</Label>
                <Textarea
                  id="availabilityNotes"
                  placeholder="e.g., Runs only summer weekends..."
                  {...register("availabilityNotes")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trackingUrl">Tracking URL</Label>
                <Input
                  id="trackingUrl"
                  placeholder="GPS or rail tracking URL"
                  {...register("trackingUrl")}
                />
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
                      <SelectItem value="admin-only">Admin Only</SelectItem>
                      <SelectItem value="pin-protected">PIN Protected</SelectItem>
                      <SelectItem value="link-only">Link Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploaderName">Uploader Name / Organization</Label>
                <Input
                  id="uploaderName"
                  placeholder="Your name or organization"
                  {...register("uploaderName")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTourPro">Assigned Tour Pro</Label>
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
                <Checkbox id="allowEmbedding" {...register("allowEmbedding")} />
                <Label htmlFor="allowEmbedding">Allow Embedding</Label>
              </div>

              <div className="space-y-2">
                <Label>Auto-generated Public URL</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value="https://xplor.app/train-tram/historic-london-tram-1935"
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