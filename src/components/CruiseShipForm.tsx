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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

interface DeckInfo {
  id: string;
  name: string;
  purpose: string;
  description?: string;
}

interface CabinType {
  type: string;
  quantity: number;
}

interface DiningVenue {
  id: string;
  name: string;
  type: string;
  deck: string;
  capacity: number;
  description: string;
}

export default function CruiseShipForm() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [decks, setDecks] = useState<DeckInfo[]>([]);
  const [cabinTypes, setCabinTypes] = useState<CabinType[]>([]);
  const [diningVenues, setDiningVenues] = useState<DiningVenue[]>([]);
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

  const addDeck = () => {
    const newDeck: DeckInfo = {
      id: Date.now().toString(),
      name: '',
      purpose: ''
    };
    setDecks([...decks, newDeck]);
  };

  const updateDeck = (id: string, updates: Partial<DeckInfo>) => {
    setDecks(decks => decks.map(deck => 
      deck.id === id ? { ...deck, ...updates } : deck
    ));
  };

  const removeDeck = (id: string) => {
    setDecks(decks => decks.filter(deck => deck.id !== id));
  };

  const addCabinType = () => {
    setCabinTypes([...cabinTypes, { type: '', quantity: 0 }]);
  };

  const addDiningVenue = () => {
    const newVenue: DiningVenue = {
      id: Date.now().toString(),
      name: '',
      type: '',
      deck: '',
      capacity: 0,
      description: ''
    };
    setDiningVenues([...diningVenues, newVenue]);
  };

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    console.log('Media items:', mediaItems);
    console.log('Decks:', decks);
    console.log('Location:', location);
    toast.success("Cruise ship listing created successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="ship-details">Ship Details</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
          <TabsTrigger value="dining">Dining & Entertainment</TabsTrigger>
          <TabsTrigger value="safety">Safety & Compliance</TabsTrigger>
          <TabsTrigger value="media">Media & Files</TabsTrigger>
          <TabsTrigger value="location">Location & Itinerary</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>General details about the cruise ship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="listingTitle">Listing Title *</Label>
                  <Input
                    id="listingTitle"
                    placeholder="e.g., MV Aurora – Mediterranean Cruise"
                    {...register("listingTitle", { required: "Title is required" })}
                  />
                  {errors.listingTitle && (
                    <span className="text-sm text-red-500">{errors.listingTitle.message as string}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shipType">Ship Type *</Label>
                  <Select onValueChange={(value) => setValue("shipType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ship type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ocean-cruise">Ocean Cruise Ship</SelectItem>
                      <SelectItem value="river-cruise">River Cruise Vessel</SelectItem>
                      <SelectItem value="expedition">Expedition Ship</SelectItem>
                      <SelectItem value="yacht-cruise">Yacht Cruise Ship</SelectItem>
                      <SelectItem value="luxury-barge">Luxury Barge</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="operator">Operator / Cruise Line</Label>
                  <Input
                    id="operator"
                    placeholder="e.g., Royal Caribbean"
                    {...register("operator")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="flagState">Flag State</Label>
                  <Input
                    id="flagState"
                    placeholder="e.g., Bahamas"
                    {...register("flagState")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imoNumber">IMO Number</Label>
                  <Input
                    id="imoNumber"
                    placeholder="e.g., 9074729"
                    {...register("imoNumber")}
                  />
                </div>

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
                  <Label htmlFor="yearRefitted">Year Refitted</Label>
                  <Input
                    id="yearRefitted"
                    type="number"
                    placeholder="YYYY"
                    {...register("yearRefitted")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setValue("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="laid-up">Laid Up</SelectItem>
                      <SelectItem value="under-refit">Under Refit</SelectItem>
                      <SelectItem value="planned-launch">Planned Launch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select onValueChange={(value) => setValue("availability", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for-booking">For Booking</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="showcase">Showcase Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the cruise ship..."
                  className="min-h-[100px]"
                  {...register("description")}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerCapacity">Passenger Capacity</Label>
                  <Input
                    id="passengerCapacity"
                    type="number"
                    placeholder="e.g., 2850"
                    {...register("passengerCapacity")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="crewCapacity">Crew Capacity</Label>
                  <Input
                    id="crewCapacity"
                    type="number"
                    placeholder="e.g., 1100"
                    {...register("crewCapacity")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ship-details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ship Specifications</CardTitle>
              <CardDescription>Technical details and specifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grossTonnage">Gross Tonnage (GT)</Label>
                  <Input
                    id="grossTonnage"
                    type="number"
                    placeholder="e.g., 225282"
                    {...register("grossTonnage")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loa">Length Overall (m)</Label>
                  <Input
                    id="loa"
                    type="number"
                    placeholder="e.g., 362"
                    {...register("loa")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="beam">Beam (m)</Label>
                  <Input
                    id="beam"
                    type="number"
                    placeholder="e.g., 41"
                    {...register("beam")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="draft">Draft (m)</Label>
                  <Input
                    id="draft"
                    type="number"
                    placeholder="e.g., 8.5"
                    {...register("draft")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propulsion">Propulsion</Label>
                  <Select onValueChange={(value) => setValue("propulsion", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select propulsion type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diesel">Diesel</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="lng">LNG</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engineOutput">Engine Output (kW/HP)</Label>
                  <Input
                    id="engineOutput"
                    placeholder="e.g., 75000 kW"
                    {...register("engineOutput")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfDecks">Number of Decks</Label>
                  <Input
                    id="numberOfDecks"
                    type="number"
                    placeholder="e.g., 18"
                    {...register("numberOfDecks")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shipyard">Shipyard / Builder</Label>
                  <Input
                    id="shipyard"
                    placeholder="e.g., STX France"
                    {...register("shipyard")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="classificationSociety">Classification Society</Label>
                  <Select onValueChange={(value) => setValue("classificationSociety", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classification society" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dnv">DNV</SelectItem>
                      <SelectItem value="abs">ABS</SelectItem>
                      <SelectItem value="lloyds">Lloyd's Register</SelectItem>
                      <SelectItem value="bv">Bureau Veritas</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="stabilizers" {...register("stabilizers")} />
                  <Label htmlFor="stabilizers">Stabilizers</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="elevatorAccess" {...register("elevatorAccess")} />
                  <Label htmlFor="elevatorAccess">Elevator Access</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="accessibilityFeatures" {...register("accessibilityFeatures")} />
                  <Label htmlFor="accessibilityFeatures">Accessibility Features</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accommodation & Decks</CardTitle>
              <CardDescription>Deck layout and cabin information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Deck Structure</Label>
                  <Button type="button" onClick={addDeck} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deck
                  </Button>
                </div>
                
                {decks.map((deck, index) => (
                  <div key={deck.id} className="border rounded-lg p-4 space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Deck {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDeck(deck.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Deck Name/Number</Label>
                        <Input
                          placeholder="e.g., Promenade Deck"
                          value={deck.name}
                          onChange={(e) => updateDeck(deck.id, { name: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Purpose</Label>
                        <Select onValueChange={(value) => updateDeck(deck.id, { purpose: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select purpose" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="accommodation">Accommodation</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="utility">Utility</SelectItem>
                            <SelectItem value="bridge">Bridge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Cabin Types</Label>
                <div className="space-y-4">
                  {['Interior Stateroom', 'Ocean View Stateroom', 'Balcony Cabin', 'Mini Suite', 'Suite', 'Presidential Suite'].map((cabinType) => (
                    <div key={cabinType} className="flex items-center space-x-4">
                      <Label className="min-w-[200px]">{cabinType}</Label>
                      <Input
                        type="number"
                        placeholder="Quantity"
                        className="w-24"
                        {...register(`cabinTypes.${cabinType.toLowerCase().replace(/\s+/g, '_')}`)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Cabin Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Ensuite Bathroom', 'Balcony', 'Sofa/Lounge', 'Workspace/Desk', 'TV/Media System', 'Mini Bar', 'Wi-Fi Access', 'Room Service'].map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox id={amenity} {...register(`cabinAmenities.${amenity.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={amenity}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dining" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dining, Leisure & Entertainment</CardTitle>
              <CardDescription>Dining venues and onboard activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-base font-medium">Dining Venues</Label>
                  <Button type="button" onClick={addDiningVenue} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Venue
                  </Button>
                </div>
                
                {diningVenues.map((venue, index) => (
                  <div key={venue.id} className="border rounded-lg p-4 space-y-4 mb-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Venue {index + 1}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setDiningVenues(venues => venues.filter(v => v.id !== venue.id))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Venue Name"
                        value={venue.name}
                        onChange={(e) => {
                          const newVenues = [...diningVenues];
                          const venueIndex = newVenues.findIndex(v => v.id === venue.id);
                          newVenues[venueIndex] = { ...venue, name: e.target.value };
                          setDiningVenues(newVenues);
                        }}
                      />
                      
                      <Select onValueChange={(value) => {
                        const newVenues = [...diningVenues];
                        const venueIndex = newVenues.findIndex(v => v.id === venue.id);
                        newVenues[venueIndex] = { ...venue, type: value };
                        setDiningVenues(newVenues);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Venue Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buffet">Buffet</SelectItem>
                          <SelectItem value="a-la-carte">À La Carte</SelectItem>
                          <SelectItem value="fine-dining">Fine Dining</SelectItem>
                          <SelectItem value="lounge">Lounge</SelectItem>
                          <SelectItem value="snack-bar">Snack Bar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <Label className="text-base font-medium mb-4 block">Leisure & Activities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Pool', 'Whirlpool/Jacuzzi', 'Spa/Sauna', 'Fitness Center', 'Casino', 'Theatre/Showroom', 'Nightclub/Bar', 'Shops/Boutiques', 'Library', 'Art Gallery', 'Kids Club', 'Medical Center'].map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox id={activity} {...register(`activities.${activity.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={activity}>{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Safety & Compliance</CardTitle>
              <CardDescription>Safety equipment and certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lifeboats">Number of Lifeboats</Label>
                  <Input
                    id="lifeboats"
                    type="number"
                    placeholder="e.g., 24"
                    {...register("lifeboats")}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lifeRafts">Number of Life Rafts</Label>
                  <Input
                    id="lifeRafts"
                    type="number"
                    placeholder="e.g., 48"
                    {...register("lifeRafts")}
                  />
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Fire Safety Systems</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Sprinklers', 'Fire Doors', 'Smoke Detectors', 'Alarms', 'Extinguishers'].map((system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox id={system} {...register(`fireSafety.${system.toLowerCase()}`)} />
                      <Label htmlFor={system}>{system}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Security Systems</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Surveillance', 'ID Access', 'Crew Screening'].map((system) => (
                    <div key={system} className="flex items-center space-x-2">
                      <Checkbox id={system} {...register(`security.${system.toLowerCase().replace(/\s+/g, '_')}`)} />
                      <Label htmlFor={system}>{system}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="medicalCenter" {...register("medicalCenter")} />
                <Label htmlFor="medicalCenter">Medical Center Available</Label>
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
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Description or caption"
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
              <CardTitle>Location & Itinerary</CardTitle>
              <CardDescription>Current location and cruise regions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPort">Current Port</Label>
                <Input
                  id="currentPort"
                  placeholder="e.g., Port of Miami"
                  {...register("currentPort")}
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
                <Label className="text-base font-medium mb-4 block">Typical Cruise Regions</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Mediterranean', 'Caribbean', 'Northern Europe', 'Alaska', 'Asia-Pacific', 'River Europe', 'Antarctica/Expedition', 'Transatlantic', 'Global/Round-the-World'].map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox id={region} {...register(`cruiseRegions.${region.toLowerCase().replace(/[\/\s]+/g, '_')}`)} />
                      <Label htmlFor={region}>{region}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="basePort">Base Port / Embarkation Ports</Label>
                <Textarea
                  id="basePort"
                  placeholder="List main embarkation ports..."
                  {...register("basePort")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sampleItinerary">Sample Itinerary</Label>
                <Textarea
                  id="sampleItinerary"
                  placeholder="Describe a typical cruise itinerary..."
                  className="min-h-[100px]"
                  {...register("sampleItinerary")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="aisTrackingUrl">AIS Tracking URL (optional)</Label>
                <Input
                  id="aisTrackingUrl"
                  placeholder="https://www.marinetraffic.com/..."
                  {...register("aisTrackingUrl")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operationalStatus">Operational Status</Label>
                <Select onValueChange={(value) => setValue("operationalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                    <SelectItem value="charter-only">Charter Only</SelectItem>
                    <SelectItem value="museum-ship">Museum Ship</SelectItem>
                  </SelectContent>
                </Select>
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
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="pin-protected">PIN Protected</SelectItem>
                      <SelectItem value="link-only">Link Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uploaderName">Uploader Name / Entity</Label>
                <Input
                  id="uploaderName"
                  placeholder="Your name or company"
                  {...register("uploaderName")}
                />
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
                    value="https://xplor.app/cruise-ship/mv-aurora-mediterranean"
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