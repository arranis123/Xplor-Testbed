import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, MapPin, Star, Hotel, Camera, Video, FileText, Users, Bed, Wifi, Car, Coffee, Utensils, Waves, Dumbbell } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface HotelUploadFormProps {
  form: UseFormReturn<any>;
}

interface Facility {
  id: string;
  name: string;
  description: string;
  tourUrl: string;
  images: File[];
  floorWing: string;
  openToPublic: boolean;
}

interface Tour {
  id: string;
  name: string;
  type: 'url' | 'file';
  tourUrl?: string;
  tourFile?: File;
  description: string;
}

interface RoomType {
  id: string;
  name: string;
  description: string;
  category: string;
  assignedTours: string[];
  images: File[];
  maxGuests: number;
  roomSize: string;
  roomSizeUnit: string;
  bedType: string;
  amenities: string[];
  priceRange: string;
  bookingUrl: string;
  floorWing: string;
}

export function HotelUploadForm({ form }: HotelUploadFormProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [currentFacility, setCurrentFacility] = useState<Partial<Facility>>({});
  const [currentRoom, setCurrentRoom] = useState<Partial<RoomType>>({});
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentTour, setCurrentTour] = useState<Partial<Tour>>({});

  const hotelCategories = [
    { value: "hotel", label: "Hotel" },
    { value: "resort", label: "Resort" },
    { value: "boutique-hotel", label: "Boutique Hotel" },
    { value: "hostel", label: "Hostel" },
    { value: "serviced-apartments", label: "Serviced Apartments" }
  ];

  const starRatings = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" }
  ];

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "es", label: "Spain" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "ae", label: "United Arab Emirates" }
  ];

  const roomCategories = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
    { value: "studio", label: "Studio" },
    { value: "family", label: "Family" },
    { value: "penthouse", label: "Penthouse" }
  ];

  const bedTypes = [
    { value: "king", label: "King" },
    { value: "queen", label: "Queen" },
    { value: "twin", label: "Twin" },
    { value: "bunk", label: "Bunk" },
    { value: "sofa-bed", label: "Sofa Bed" }
  ];

  const amenitiesList = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "mini-bar", label: "Mini Bar", icon: Coffee },
    { id: "balcony", label: "Balcony", icon: Hotel },
    { id: "bathtub", label: "Bathtub", icon: Waves },
    { id: "ac", label: "AC", icon: Hotel },
    { id: "tv", label: "TV", icon: Hotel },
    { id: "desk", label: "Desk", icon: Hotel },
    { id: "parking", label: "Parking", icon: Car },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "fitness", label: "Fitness Center", icon: Dumbbell }
  ];

  const addFacility = () => {
    if (currentFacility.name && currentFacility.description) {
      const facility: Facility = {
        id: Math.random().toString(36).substr(2, 9),
        name: currentFacility.name || '',
        description: currentFacility.description || '',
        tourUrl: currentFacility.tourUrl || '',
        images: currentFacility.images || [],
        floorWing: currentFacility.floorWing || '',
        openToPublic: currentFacility.openToPublic || false
      };
      setFacilities([...facilities, facility]);
      setCurrentFacility({});
    }
  };

  const addTour = () => {
    if (currentTour.name && currentTour.description && (currentTour.tourUrl || currentTour.tourFile)) {
      const tour: Tour = {
        id: Math.random().toString(36).substr(2, 9),
        name: currentTour.name || '',
        type: currentTour.tourFile ? 'file' : 'url',
        tourUrl: currentTour.tourUrl || '',
        tourFile: currentTour.tourFile,
        description: currentTour.description || ''
      };
      setTours([...tours, tour]);
      setCurrentTour({});
    }
  };

  const removeTour = (id: string) => {
    setTours(tours.filter(t => t.id !== id));
  };

  const addRoomType = () => {
    if (currentRoom.name && currentRoom.description && currentRoom.category) {
      const room: RoomType = {
        id: Math.random().toString(36).substr(2, 9),
        name: currentRoom.name || '',
        description: currentRoom.description || '',
        category: currentRoom.category || '',
        assignedTours: currentRoom.assignedTours || [],
        images: currentRoom.images || [],
        maxGuests: currentRoom.maxGuests || 1,
        roomSize: currentRoom.roomSize || '',
        roomSizeUnit: currentRoom.roomSizeUnit || 'sqm',
        bedType: currentRoom.bedType || '',
        amenities: currentRoom.amenities || [],
        priceRange: currentRoom.priceRange || '',
        bookingUrl: currentRoom.bookingUrl || '',
        floorWing: currentRoom.floorWing || ''
      };
      setRoomTypes([...roomTypes, room]);
      setCurrentRoom({});
    }
  };

  const removeFacility = (id: string) => {
    setFacilities(facilities.filter(f => f.id !== id));
  };

  const removeRoomType = (id: string) => {
    setRoomTypes(roomTypes.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="media">Media & Files</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="rooms">Room Types</TabsTrigger>
          <TabsTrigger value="submission">Submission</TabsTrigger>
        </TabsList>

        {/* SECTION 1: Hotel Overview */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Hotel Overview
              </CardTitle>
              <CardDescription>Basic information about your hotel property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hotelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hotel name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hotelCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {hotelCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
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
                  name="starRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Star Rating</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {starRatings.map((rating) => (
                            <SelectItem key={rating.value} value={rating.value}>
                              <div className="flex items-center gap-1">
                                {[...Array(parseInt(rating.value))].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                ))}
                                <span className="ml-1">{rating.label}</span>
                              </div>
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
                  name="numberOfFloors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Floors</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 15" {...field} />
                      </FormControl>
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
                        placeholder="Brief overview of the property (max 500 characters)" 
                        maxLength={500}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of the property" 
                        rows={6}
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="fullAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Complete street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="hotel@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hotel Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://hotelwebsite.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bookingPageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Booking Page URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://booking.com/hotel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="facebookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/hotel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instagramUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/hotel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 2: Hotel Media & Files */}
        <TabsContent value="media" className="space-y-6">
          {/* Virtual Tours Section - Moved to Top */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Virtual Tours Management
              </CardTitle>
              <CardDescription>Create and manage virtual tours that can be assigned to room types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Tour */}
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add New Virtual Tour</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Tour name (e.g., Hotel Lobby Tour, Premium Suite Tour)"
                    value={currentTour.name || ''}
                    onChange={(e) => setCurrentTour({...currentTour, name: e.target.value})}
                  />
                  <Select
                    value={currentTour.type || ''}
                    onValueChange={(value: 'url' | 'file') => setCurrentTour({...currentTour, type: value, tourUrl: '', tourFile: undefined})}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Tour type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      <SelectItem value="url">URL Link</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Textarea
                  placeholder="Tour description"
                  value={currentTour.description || ''}
                  onChange={(e) => setCurrentTour({...currentTour, description: e.target.value})}
                />

                {currentTour.type === 'url' && (
                  <Input
                    placeholder="Matterport, 360°, YouTube URL, etc."
                    value={currentTour.tourUrl || ''}
                    onChange={(e) => setCurrentTour({...currentTour, tourUrl: e.target.value})}
                  />
                )}

                {currentTour.type === 'file' && (
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Upload tour file (Video, 360° image, etc.)</p>
                    <Input 
                      type="file" 
                      accept="video/*,image/*,.mp4,.mov,.360" 
                      className="mt-2"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setCurrentTour({...currentTour, tourFile: file});
                        }
                      }}
                    />
                  </div>
                )}

                <Button 
                  type="button" 
                  onClick={addTour}
                  disabled={!currentTour.name || !currentTour.description || (!currentTour.tourUrl && !currentTour.tourFile)}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Tour
                </Button>
              </div>

              {/* Display Added Tours */}
              {tours.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Tours</h4>
                  {tours.map((tour) => (
                    <div key={tour.id} className="border border-border rounded p-3 flex justify-between items-start">
                      <div>
                        <div className="font-medium">{tour.name}</div>
                        <div className="text-sm text-muted-foreground">{tour.description}</div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{tour.type === 'url' ? 'URL Link' : 'File Upload'}</Badge>
                          {tour.type === 'url' && tour.tourUrl && (
                            <Badge variant="secondary" className="text-xs">URL: {tour.tourUrl.substring(0, 30)}...</Badge>
                          )}
                          {tour.type === 'file' && tour.tourFile && (
                            <Badge variant="secondary" className="text-xs">File: {tour.tourFile.name}</Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeTour(tour.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hotel Media Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Hotel Media & Files
              </CardTitle>
              <CardDescription>Upload images, videos, and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="mainImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Hotel Image *</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload main hotel image (JPG or PNG)</p>
                        <Input type="file" accept="image/*" className="mt-2" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="galleryImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Gallery</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload additional hotel images</p>
                        <Input type="file" accept="image/*" multiple className="mt-2" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floorPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Floor Plan Upload</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Upload floor plan (PDF or Image)</p>
                        <Input type="file" accept=".pdf,image/*" className="mt-2" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="promotionalVideo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Promotional Video</FormLabel>
                    <FormControl>
                      <Input placeholder="YouTube URL or embed code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 3: Hotel Facilities */}
        <TabsContent value="facilities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Hotel Facilities
              </CardTitle>
              <CardDescription>Add facilities and amenities as named spaces</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add New Facility</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Facility name (e.g., Gym, Restaurant, Spa)"
                    value={currentFacility.name || ''}
                    onChange={(e) => setCurrentFacility({...currentFacility, name: e.target.value})}
                  />
                  <Input
                    placeholder="Floor/Wing location"
                    value={currentFacility.floorWing || ''}
                    onChange={(e) => setCurrentFacility({...currentFacility, floorWing: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Description of the facility"
                  value={currentFacility.description || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, description: e.target.value})}
                />
                <Input
                  placeholder="Virtual tour URL for this space"
                  value={currentFacility.tourUrl || ''}
                  onChange={(e) => setCurrentFacility({...currentFacility, tourUrl: e.target.value})}
                />
                <div className="flex items-center gap-2">
                  <Switch
                    checked={currentFacility.openToPublic || false}
                    onCheckedChange={(checked) => setCurrentFacility({...currentFacility, openToPublic: checked})}
                  />
                  <label className="text-sm">Open to Public?</label>
                </div>
                <Button 
                  type="button" 
                  onClick={addFacility}
                  disabled={!currentFacility.name || !currentFacility.description}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Facility
                </Button>
              </div>

              {facilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Facilities</h4>
                  {facilities.map((facility) => (
                    <div key={facility.id} className="border border-border rounded p-3 flex justify-between items-start">
                      <div>
                        <div className="font-medium">{facility.name}</div>
                        <div className="text-sm text-muted-foreground">{facility.description}</div>
                        {facility.floorWing && <div className="text-xs text-muted-foreground">Location: {facility.floorWing}</div>}
                        {facility.openToPublic && <Badge variant="secondary" className="mt-1">Public Access</Badge>}
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeFacility(facility.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 4: Room Types */}
        <TabsContent value="rooms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bed className="h-5 w-5" />
                Room Types
              </CardTitle>
              <CardDescription>Add different room types with details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add New Room Type</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Room name (e.g., Deluxe King Suite)"
                    value={currentRoom.name || ''}
                    onChange={(e) => setCurrentRoom({...currentRoom, name: e.target.value})}
                  />
                  <Select
                    value={currentRoom.category || ''}
                    onValueChange={(value) => setCurrentRoom({...currentRoom, category: value})}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Room category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      {roomCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  placeholder="Room description"
                  value={currentRoom.description || ''}
                  onChange={(e) => setCurrentRoom({...currentRoom, description: e.target.value})}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Max guests"
                    value={currentRoom.maxGuests || ''}
                    onChange={(e) => setCurrentRoom({...currentRoom, maxGuests: parseInt(e.target.value)})}
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Room size"
                      value={currentRoom.roomSize || ''}
                      onChange={(e) => setCurrentRoom({...currentRoom, roomSize: e.target.value})}
                    />
                    <Select
                      value={currentRoom.roomSizeUnit || 'sqm'}
                      onValueChange={(value) => setCurrentRoom({...currentRoom, roomSizeUnit: value})}
                    >
                      <SelectTrigger className="w-20 bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="sqft">sqft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select
                    value={currentRoom.bedType || ''}
                    onValueChange={(value) => setCurrentRoom({...currentRoom, bedType: value})}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Bed type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      {bedTypes.map((bed) => (
                        <SelectItem key={bed.value} value={bed.value}>
                          {bed.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Price range (e.g., €150–€250/night)"
                    value={currentRoom.priceRange || ''}
                    onChange={(e) => setCurrentRoom({...currentRoom, priceRange: e.target.value})}
                  />
                  <Input
                    placeholder="Floor/Wing"
                    value={currentRoom.floorWing || ''}
                    onChange={(e) => setCurrentRoom({...currentRoom, floorWing: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Assign Tours</label>
                    <div className="space-y-2 max-h-24 overflow-y-auto border border-border rounded p-2">
                      {tours.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No tours available. Add tours in Media & Files section.</p>
                      ) : (
                        tours.map((tour) => (
                          <div key={tour.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tour-${tour.id}`}
                              checked={currentRoom.assignedTours?.includes(tour.id) || false}
                              onCheckedChange={(checked) => {
                                const assignedTours = currentRoom.assignedTours || [];
                                if (checked) {
                                  setCurrentRoom({...currentRoom, assignedTours: [...assignedTours, tour.id]});
                                } else {
                                  setCurrentRoom({...currentRoom, assignedTours: assignedTours.filter(t => t !== tour.id)});
                                }
                              }}
                            />
                            <label htmlFor={`tour-${tour.id}`} className="text-sm">
                              {tour.name} ({tour.type})
                            </label>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="Booking page URL"
                    value={currentRoom.bookingUrl || ''}
                    onChange={(e) => setCurrentRoom({...currentRoom, bookingUrl: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Room Amenities</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {amenitiesList.map((amenity) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={currentRoom.amenities?.includes(amenity.id) || false}
                            onCheckedChange={(checked) => {
                              const amenities = currentRoom.amenities || [];
                              if (checked) {
                                setCurrentRoom({...currentRoom, amenities: [...amenities, amenity.id]});
                              } else {
                                setCurrentRoom({...currentRoom, amenities: amenities.filter(a => a !== amenity.id)});
                              }
                            }}
                          />
                          <label htmlFor={amenity.id} className="text-sm flex items-center gap-1">
                            <Icon className="h-3 w-3" />
                            {amenity.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button 
                  type="button" 
                  onClick={addRoomType}
                  disabled={!currentRoom.name || !currentRoom.description || !currentRoom.category}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </div>

              {roomTypes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Added Room Types</h4>
                  {roomTypes.map((room) => (
                    <div key={room.id} className="border border-border rounded p-3 flex justify-between items-start">
                      <div>
                        <div className="font-medium">{room.name}</div>
                        <div className="text-sm text-muted-foreground">{room.description}</div>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{room.category}</Badge>
                          {room.maxGuests && <Badge variant="outline">{room.maxGuests} guests</Badge>}
                          {room.roomSize && <Badge variant="outline">{room.roomSize} {room.roomSizeUnit}</Badge>}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => removeRoomType(room.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 5: Visibility & Submission */}
        <TabsContent value="submission" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visibility & Submission</CardTitle>
              <CardDescription>Final settings and submission details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="listingVisibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="unlisted">Unlisted</SelectItem>
                        <SelectItem value="admin-only">Admin Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="submitterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submitter Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submitterEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submitter Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to Xplor Terms of Service *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}