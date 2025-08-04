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
import { Plus, X, Upload, Link, Image, Video, FileText, Map, Clock } from "lucide-react";
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
  visibility: 'public' | 'admin' | 'pin_protected' | 'link_only';
}

interface OpeningHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export default function RestaurantBarForm() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHours[]>([
    { day: 'Monday', open: '09:00', close: '22:00', closed: false },
    { day: 'Tuesday', open: '09:00', close: '22:00', closed: false },
    { day: 'Wednesday', open: '09:00', close: '22:00', closed: false },
    { day: 'Thursday', open: '09:00', close: '22:00', closed: false },
    { day: 'Friday', open: '09:00', close: '23:00', closed: false },
    { day: 'Saturday', open: '09:00', close: '23:00', closed: false },
    { day: 'Sunday', open: '10:00', close: '21:00', closed: false },
  ]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
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

  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: '',
      url: ''
    };
    setSocialLinks([...socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setSocialLinks(links => links.map(link => 
      link.id === id ? { ...link, ...updates } : link
    ));
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(links => links.filter(link => link.id !== id));
  };

  const updateOpeningHours = (index: number, updates: Partial<OpeningHours>) => {
    const newHours = [...openingHours];
    newHours[index] = { ...newHours[index], ...updates };
    setOpeningHours(newHours);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    console.log('Media items:', mediaItems);
    console.log('Opening hours:', openingHours);
    console.log('Location:', location);
    toast.success("Restaurant/Bar listing created successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="venue-details">Venue Details</TabsTrigger>
          <TabsTrigger value="food-drink">Food & Drink</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="access">Access & Rules</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the restaurant or bar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingTitle">Listing Title *</Label>
                  <Input
                    id="listingTitle"
                    placeholder="e.g., The Botanist Rooftop Bar"
                    {...register("listingTitle", { required: "Title is required" })}
                  />
                  {errors.listingTitle && (
                    <span className="text-sm text-red-500">{errors.listingTitle.message as string}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venueType">Venue Type *</Label>
                  <Select onValueChange={(value) => setValue("venueType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="cafe">Café</SelectItem>
                      <SelectItem value="bar-pub">Bar / Pub</SelectItem>
                      <SelectItem value="wine-bar">Wine Bar</SelectItem>
                      <SelectItem value="rooftop-bar">Rooftop Bar</SelectItem>
                      <SelectItem value="nightclub">Nightclub</SelectItem>
                      <SelectItem value="tapas-bar">Tapas Bar</SelectItem>
                      <SelectItem value="cocktail-lounge">Lounge / Cocktail Bar</SelectItem>
                      <SelectItem value="coffee-shop">Coffee Shop</SelectItem>
                      <SelectItem value="fast-casual">Fast Casual</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="restaurantChain">Restaurant Chain (optional)</Label>
                  <Select onValueChange={(value) => setValue("restaurantChain", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select chain or leave blank for independent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="independent">Independent</SelectItem>
                      <SelectItem value="mcdonalds">McDonald's</SelectItem>
                      <SelectItem value="starbucks">Starbucks</SelectItem>
                      <SelectItem value="hard-rock-cafe">Hard Rock Cafe</SelectItem>
                      <SelectItem value="wagamama">Wagamama</SelectItem>
                      <SelectItem value="pizza-hut">Pizza Hut</SelectItem>
                      <SelectItem value="kfc">KFC</SelectItem>
                      <SelectItem value="subway">Subway</SelectItem>
                      <SelectItem value="burger-king">Burger King</SelectItem>
                      <SelectItem value="tgi-fridays">TGI Friday's</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select onValueChange={(value) => setValue("businessType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="independent">Independent</SelectItem>
                      <SelectItem value="franchise">Franchise</SelectItem>
                      <SelectItem value="chain-owned">Chain-Owned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the restaurant or bar..."
                  className="min-h-[100px]"
                  {...register("description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    placeholder="YYYY"
                    {...register("yearEstablished")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bookingMethod">Booking Method</Label>
                  <Select onValueChange={(value) => setValue("bookingMethod", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select booking method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walk-in">Walk-in</SelectItem>
                      <SelectItem value="reservation-only">Reservation Only</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Cuisine Style</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Italian', 'Japanese', 'Mediterranean', 'Fusion', 'Vegan', 'Fast Food', 'Mexican', 'Indian', 'Thai', 'French', 'American', 'Chinese'].map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox id={cuisine} {...register(`cuisineStyle.${cuisine.toLowerCase()}`)} />
                      <Label htmlFor={cuisine}>{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Contact Information</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      {...register("phone")}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="info@restaurant.com"
                      {...register("email")}
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://www.restaurant.com"
                    {...register("website")}
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Label className="text-sm font-medium">Social Links</Label>
                    <Button type="button" onClick={addSocialLink} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Social Link
                    </Button>
                  </div>
                  
                  {socialLinks.map((link, index) => (
                    <div key={link.id} className="flex gap-2 mb-2">
                      <Select onValueChange={(value) => updateSocialLink(link.id, { platform: value })}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, { url: e.target.value })}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSocialLink(link.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="venue-details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Venue Details</CardTitle>
              <CardDescription>Physical space and accessibility information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="indoorSeating">Indoor Seating Capacity</Label>
                  <Input
                    id="indoorSeating"
                    type="number"
                    placeholder="e.g., 50"
                    {...register("indoorSeating")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outdoorSeating">Outdoor Seating Capacity</Label>
                  <Input
                    id="outdoorSeating"
                    type="number"
                    placeholder="e.g., 30"
                    {...register("outdoorSeating")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floorArea">Floor Area (m²)</Label>
                  <Input
                    id="floorArea"
                    type="number"
                    placeholder="e.g., 200"
                    {...register("floorArea")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfFloors">Number of Floors</Label>
                  <Input
                    id="numberOfFloors"
                    type="number"
                    placeholder="e.g., 2"
                    {...register("numberOfFloors")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kitchenType">Kitchen Type</Label>
                  <Select onValueChange={(value) => setValue("kitchenType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select kitchen type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open-kitchen">Open Kitchen</SelectItem>
                      <SelectItem value="closed-kitchen">Closed Kitchen</SelectItem>
                      <SelectItem value="food-truck">Food Truck</SelectItem>
                      <SelectItem value="offsite-prep">Offsite Prep</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Venue Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="rooftopAccess" {...register("rooftopAccess")} />
                    <Label htmlFor="rooftopAccess">Rooftop Access</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="restrooms" {...register("restrooms")} />
                    <Label htmlFor="restrooms">Restrooms</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="accessibleRestrooms" {...register("accessibleRestrooms")} />
                    <Label htmlFor="accessibleRestrooms">Accessible Restrooms</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="childFriendly" {...register("childFriendly")} />
                    <Label htmlFor="childFriendly">Child-Friendly</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="highChairs" {...register("highChairs")} />
                    <Label htmlFor="highChairs">High Chairs</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="petFriendly" {...register("petFriendly")} />
                    <Label htmlFor="petFriendly">Pet-Friendly</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="wheelchairAccess" {...register("wheelchairAccess")} />
                    <Label htmlFor="wheelchairAccess">Wheelchair Access</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="parking">Parking</Label>
                <Select onValueChange={(value) => setValue("parking", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select parking options" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Parking</SelectItem>
                    <SelectItem value="public">Public Parking</SelectItem>
                    <SelectItem value="private">Private Parking</SelectItem>
                    <SelectItem value="valet">Valet Parking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="food-drink" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Food, Drink & Services</CardTitle>
              <CardDescription>Menu offerings and service options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Meal Times Offered</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Breakfast', 'Brunch', 'Lunch', 'Dinner', 'Late Night', '24/7'].map((mealTime) => (
                    <div key={mealTime} className="flex items-center space-x-2">
                      <Checkbox id={mealTime} {...register(`mealTimes.${mealTime.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={mealTime}>{mealTime}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Menu Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['À la Carte', 'Tasting Menu', 'Prix Fixe', 'Buffet', 'Vegan / Vegetarian', 'Allergy Friendly', "Kids' Menu", 'Seasonal / Rotating'].map((menuType) => (
                    <div key={menuType} className="flex items-center space-x-2">
                      <Checkbox id={menuType} {...register(`menuTypes.${menuType.toLowerCase().replace(/[\/'\s]+/g, '_')}`)} />
                      <Label htmlFor={menuType}>{menuType}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Service Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="takeaway" {...register("takeaway")} />
                    <Label htmlFor="takeaway">Takeaway / To-Go</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="catering" {...register("catering")} />
                    <Label htmlFor="catering">Catering Services</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="inHouseDelivery" {...register("inHouseDelivery")} />
                    <Label htmlFor="inHouseDelivery">In-house Delivery</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="uberEats" {...register("uberEats")} />
                    <Label htmlFor="uberEats">Uber Eats</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="deliveroo" {...register("deliveroo")} />
                    <Label htmlFor="deliveroo">Deliveroo</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Drink Services</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="alcoholServed" {...register("alcoholServed")} />
                    <Label htmlFor="alcoholServed">Alcohol Served</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="cocktailProgram" {...register("cocktailProgram")} />
                    <Label htmlFor="cocktailProgram">Cocktail Program</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="wineList" {...register("wineList")} />
                    <Label htmlFor="wineList">Wine List</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="sommelier" {...register("sommelier")} />
                    <Label htmlFor="sommelier">Sommelier</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="craftBeers" {...register("craftBeers")} />
                    <Label htmlFor="craftBeers">Craft Beers</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="happyHour" {...register("happyHour")} />
                    <Label htmlFor="happyHour">Happy Hour</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signatureDrinks">Signature Drinks</Label>
                <Textarea
                  id="signatureDrinks"
                  placeholder="Describe signature cocktails or specialty drinks..."
                  {...register("signatureDrinks")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Amenities & Seating</CardTitle>
              <CardDescription>Seating arrangements and entertainment options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Seating Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Standard Tables', 'Booths', 'Bar Seating', 'Outdoor Patio', 'Communal Table', 'Lounge Seating', 'Rooftop Terrace'].map((seatingType) => (
                    <div key={seatingType} className="flex items-center space-x-2">
                      <Checkbox id={seatingType} {...register(`seatingTypes.${seatingType.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={seatingType}>{seatingType}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="privateDiningCapacity">Private Dining Room Capacity</Label>
                <Input
                  id="privateDiningCapacity"
                  type="number"
                  placeholder="e.g., 20"
                  {...register("privateDiningCapacity")}
                />
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Entertainment</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Live Music', 'DJ / Dance Floor', 'TV Screens / Sports', 'Karaoke', 'Board Games / Billiards', 'None'].map((entertainment) => (
                    <div key={entertainment} className="flex items-center space-x-2">
                      <Checkbox id={entertainment} {...register(`entertainment.${entertainment.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={entertainment}>{entertainment}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="wifi" {...register("wifi")} />
                    <Label htmlFor="wifi">Wi-Fi</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="chargingStations" {...register("chargingStations")} />
                    <Label htmlFor="chargingStations">Charging Stations</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="smokingArea" {...register("smokingArea")} />
                    <Label htmlFor="smokingArea">Smoking Area</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="eventHosting" {...register("eventHosting")} />
                    <Label htmlFor="eventHosting">Event Hosting Available</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxEventCapacity">Max Event Capacity</Label>
                <Input
                  id="maxEventCapacity"
                  type="number"
                  placeholder="e.g., 100"
                  {...register("maxEventCapacity")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="themedEvents">Themed Nights / Events</Label>
                <Textarea
                  id="themedEvents"
                  placeholder="Describe regular themed nights or special events..."
                  {...register("themedEvents")}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access & Guest Rules</CardTitle>
              <CardDescription>Operating hours and establishment policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Opening Hours</Label>
                <div className="space-y-3">
                  {openingHours.map((day, index) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-24">
                        <Label className="text-sm">{day.day}</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={day.closed}
                          onCheckedChange={(checked) => 
                            updateOpeningHours(index, { closed: checked as boolean })
                          }
                        />
                        <Label className="text-sm">Closed</Label>
                      </div>
                      {!day.closed && (
                        <>
                          <Input
                            type="time"
                            value={day.open}
                            onChange={(e) => updateOpeningHours(index, { open: e.target.value })}
                            className="w-32"
                          />
                          <span className="text-sm">to</span>
                          <Input
                            type="time"
                            value={day.close}
                            onChange={(e) => updateOpeningHours(index, { close: e.target.value })}
                            className="w-32"
                          />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Entry Requirements</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['ID Required', 'Booking Deposit', 'Age Limit', 'QR Code Check-In', 'Walk-ins Welcome', 'Minimum Spend'].map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox id={requirement} {...register(`entryRequirements.${requirement.toLowerCase().replace(/[\/\s-]+/g, '_')}`)} />
                      <Label htmlFor={requirement}>{requirement}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dressCode">Dress Code</Label>
                <Textarea
                  id="dressCode"
                  placeholder="Describe dress code requirements..."
                  {...register("dressCode")}
                />
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">House Rules</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['No Outside Food or Drink', 'No Pets (unless service animals)', 'Quiet Zone', 'No Smoking Indoors', 'Smart Casual Dress Code', 'Card-Only Payments', 'Group Booking Limits', 'Family-Friendly'].map((rule) => (
                    <div key={rule} className="flex items-center space-x-2">
                      <Checkbox id={rule} {...register(`houseRules.${rule.toLowerCase().replace(/[()\/\s-]+/g, '_')}`)} />
                      <Label htmlFor={rule}>{rule}</Label>
                    </div>
                  ))}
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
              <FeaturedImageUpload
                featuredImage={featuredImage}
                onFeaturedImageChange={setFeaturedImage}
                label="Featured Image (shown in listings)"
              />

              <Separator />

              <MultiImageUpload
                mediaItems={mediaItems}
                onMediaItemsChange={setMediaItems}
                maxFiles={30}
                showComponentTags={true}
                componentTagOptions={[
                  { value: 'patio', label: 'Patio' },
                  { value: 'kitchen', label: 'Kitchen' },
                  { value: 'bar', label: 'Bar' },
                  { value: 'dining-room', label: 'Dining Room' },
                  { value: 'exterior', label: 'Exterior' },
                  { value: 'interior', label: 'Interior' },
                  { value: 'food', label: 'Food & Drinks' },
                  { value: 'events', label: 'Events' }
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
                <Label htmlFor="fullAddress">Full Address</Label>
                <Textarea
                  id="fullAddress"
                  placeholder="Street address, city, state/province, postal code, country"
                  {...register("fullAddress")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="neighborhood">Neighborhood or Landmark</Label>
                <Input
                  id="neighborhood"
                  placeholder="e.g., SoHo, Times Square, Covent Garden"
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

              <div>
                <Label className="text-base font-medium mb-4 block">Proximity Tags</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Public Transit', 'Tourist Attractions', 'Beach / Park', 'Hotels', 'Museums', 'Stadiums / Venues'].map((proximity) => (
                    <div key={proximity} className="flex items-center space-x-2">
                      <Checkbox id={proximity} {...register(`proximityTags.${proximity.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={proximity}>{proximity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="googlePlusCode">Google Plus Code (optional)</Label>
                <Input
                  id="googlePlusCode"
                  placeholder="e.g., 9G8F+5X New York"
                  {...register("googlePlusCode")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="directionsText">Directions</Label>
                <Textarea
                  id="directionsText"
                  placeholder="Additional directions or landmarks..."
                  {...register("directionsText")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingInfo">Parking Information</Label>
                <Textarea
                  id="parkingInfo"
                  placeholder="Describe parking options, rates, validation..."
                  {...register("parkingInfo")}
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
                      <SelectItem value="link-only">Link Only</SelectItem>
                      <SelectItem value="admin-only">Admin Only</SelectItem>
                      <SelectItem value="pin-protected">PIN Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactManager">Contact / Manager Name</Label>
                <Input
                  id="contactManager"
                  placeholder="Manager or primary contact name"
                  {...register("contactManager")}
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
                <Checkbox id="embeddingEnabled" {...register("embeddingEnabled")} />
                <Label htmlFor="embeddingEnabled">Embedding Enabled</Label>
              </div>

              <div className="space-y-2">
                <Label>Shareable Listing URL</Label>
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    value="https://xplor.app/restaurant-bar/the-botanist-rooftop-bar"
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