import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Upload, Plus, X } from "lucide-react";

interface FormData {
  // Basic Info
  title: string;
  category: string;
  description: string;
  yearBuilt: string;
  condition: string;
  listedBy: string;
  listingType: string;
  
  // Space Type & Layout
  floorArea: string;
  areaUnit: string;
  ceilingHeight: string;
  heightUnit: string;
  numberOfRooms: string;
  floorNumber: string;
  layoutType: string;
  includedRooms: string[];
  
  // Features & Amenities
  highSpeedInternet: boolean;
  internetSpeed: string;
  fiberOptic: boolean;
  smartSystems: boolean;
  securityCameras: boolean;
  audioVisualSetup: boolean;
  soundproofing: boolean;
  liveStreaming: boolean;
  airConditioning: boolean;
  naturalLight: boolean;
  backupGenerator: boolean;
  elevatorAccess: boolean;
  wheelchairAccessible: boolean;
  fireSafety: boolean;
  furnished: boolean;
  furnitureType: string;
  brandingOpportunities: boolean;
  frontageVisibility: boolean;
  loadingDock: boolean;
  kitchenette: boolean;
  waitingArea: boolean;
  printCopyEquipment: boolean;
  parkingSpaces: string;
  lightingGrid: boolean;
  greenScreen: boolean;
  whiteCyclorama: boolean;
  blackoutCurtains: boolean;
  controlRoom: boolean;
  riggingPoints: boolean;
  driveInAccess: boolean;
  
  // Access & Rules
  entryType: string;
  operatingHours: string;
  bookingRequired: boolean;
  bookingUrl: string;
  bookingWindow: string;
  idRequired: boolean;
  guestPolicy: string;
  smokingAllowed: boolean;
  petsAllowed: boolean;
  petConditions: string;
  foodDrinkAllowed: boolean;
  alcoholAllowed: boolean;
  alcoholLicense: string;
  maxOccupancy: string;
  insuranceRequired: boolean;
  insuranceDescription: string;
  
  // Location
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  googlePlusCode: string;
  locationAccuracy: string;
  proximityToTransit: string;
  transitDetails: string;
  
  // Visibility
  listingStatus: string;
  visibility: string;
  uploader: string;
  attribution: string;
  pinProtection: boolean;
  pinCode: string;
}

export default function OfficesShowroomsStudiosForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    yearBuilt: '',
    condition: '',
    listedBy: '',
    listingType: '',
    floorArea: '',
    areaUnit: 'sq-ft',
    ceilingHeight: '',
    heightUnit: 'ft',
    numberOfRooms: '',
    floorNumber: '',
    layoutType: '',
    includedRooms: [],
    highSpeedInternet: false,
    internetSpeed: '',
    fiberOptic: false,
    smartSystems: false,
    securityCameras: false,
    audioVisualSetup: false,
    soundproofing: false,
    liveStreaming: false,
    airConditioning: false,
    naturalLight: false,
    backupGenerator: false,
    elevatorAccess: false,
    wheelchairAccessible: false,
    fireSafety: false,
    furnished: false,
    furnitureType: '',
    brandingOpportunities: false,
    frontageVisibility: false,
    loadingDock: false,
    kitchenette: false,
    waitingArea: false,
    printCopyEquipment: false,
    parkingSpaces: '',
    lightingGrid: false,
    greenScreen: false,
    whiteCyclorama: false,
    blackoutCurtains: false,
    controlRoom: false,
    riggingPoints: false,
    driveInAccess: false,
    entryType: '',
    operatingHours: '',
    bookingRequired: false,
    bookingUrl: '',
    bookingWindow: '',
    idRequired: false,
    guestPolicy: '',
    smokingAllowed: false,
    petsAllowed: false,
    petConditions: '',
    foodDrinkAllowed: false,
    alcoholAllowed: false,
    alcoholLicense: '',
    maxOccupancy: '',
    insuranceRequired: false,
    insuranceDescription: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postalCode: '',
    googlePlusCode: '',
    locationAccuracy: '',
    proximityToTransit: '',
    transitDetails: '',
    listingStatus: 'draft',
    visibility: 'public',
    uploader: '',
    attribution: '',
    pinProtection: false,
    pinCode: ''
  });

  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({
    tours: [],
    photos: [],
    videos: [],
    droneFootage: [],
    floorPlans: [],
    documents: []
  });

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoomToggle = (room: string) => {
    setFormData(prev => ({
      ...prev,
      includedRooms: prev.includedRooms.includes(room)
        ? prev.includedRooms.filter(r => r !== room)
        : [...prev.includedRooms, room]
    }));
  };

  const handleFileUpload = (section: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles(prev => ({
        ...prev,
        [section]: [...prev[section], ...Array.from(files)]
      }));
    }
  };

  const removeFile = (section: string, index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const categoryOptions = [
    "Office",
    "Co-Working Space", 
    "Private Suite",
    "Corporate Headquarters",
    "Retail Showroom",
    "Art/Design Studio",
    "Photography Studio",
    "Film Set / Production Space",
    "Podcast Studio",
    "Multi-Use Commercial Space",
    "Other"
  ];

  const includedRoomsOptions = [
    "Lobby / Reception",
    "Open Work Area",
    "Private Offices",
    "Meeting Room(s)",
    "Recording Booth",
    "Editing Room",
    "Green Room / Lounge",
    "Kitchen / Breakroom",
    "Dressing Room",
    "Washrooms",
    "Storage / Equipment Room",
    "Outdoor Space / Terrace"
  ];

  const isStudioCategory = formData.category.toLowerCase().includes('studio') || 
                          formData.category.toLowerCase().includes('film') ||
                          formData.category.toLowerCase().includes('production');

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Office, Showroom or Studio
        </h1>
        <p className="text-muted-foreground">
          Create an immersive listing for your commercial space with 360° tours and detailed specifications
        </p>
      </div>

      <Tabs defaultValue="basic-info" className="w-full flex gap-6">
        <div className="w-64 shrink-0">
          <TabsList className="flex flex-col h-auto w-full bg-muted p-1 space-y-1">
            <TabsTrigger value="basic-info" className="w-full justify-start text-left px-3 py-2">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="space-layout" className="w-full justify-start text-left px-3 py-2">
              Space & Layout
            </TabsTrigger>
            <TabsTrigger value="features" className="w-full justify-start text-left px-3 py-2">
              Features
            </TabsTrigger>
            <TabsTrigger value="access-rules" className="w-full justify-start text-left px-3 py-2">
              Access & Rules
            </TabsTrigger>
            <TabsTrigger value="media" className="w-full justify-start text-left px-3 py-2">
              Media & Files
            </TabsTrigger>
            <TabsTrigger value="location" className="w-full justify-start text-left px-3 py-2">
              Location
            </TabsTrigger>
            <TabsTrigger value="visibility" className="w-full justify-start text-left px-3 py-2">
              Visibility
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 min-w-0">

        <TabsContent value="basic-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Listing Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Downtown LA Creative Studio"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select space category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your space, its features, and ideal use cases..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    placeholder="2020"
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="renovated">Renovated</SelectItem>
                      <SelectItem value="historic">Historic</SelectItem>
                      <SelectItem value="needs-work">Needs Work</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="listedBy">Listed By</Label>
                  <Select onValueChange={(value) => handleInputChange('listedBy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="tour-pro">Tour Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="listingType">Listing Type</Label>
                  <Select onValueChange={(value) => handleInputChange('listingType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select listing purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="showcase">Showcase Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="space-layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Space Type & Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="floorArea">Floor Area *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="floorArea"
                      type="number"
                      placeholder="2500"
                      value={formData.floorArea}
                      onChange={(e) => handleInputChange('floorArea', e.target.value)}
                    />
                    <Select onValueChange={(value) => handleInputChange('areaUnit', value)}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sq-ft">sq ft</SelectItem>
                        <SelectItem value="sq-m">sq m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="ceilingHeight">Ceiling Height</Label>
                  <div className="flex gap-2">
                    <Input
                      id="ceilingHeight"
                      type="number"
                      placeholder="12"
                      value={formData.ceilingHeight}
                      onChange={(e) => handleInputChange('ceilingHeight', e.target.value)}
                    />
                    <Select onValueChange={(value) => handleInputChange('heightUnit', value)}>
                      <SelectTrigger className="w-16">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ft">ft</SelectItem>
                        <SelectItem value="m">m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfRooms">Number of Rooms/Zones</Label>
                  <Input
                    id="numberOfRooms"
                    type="number"
                    placeholder="5"
                    value={formData.numberOfRooms}
                    onChange={(e) => handleInputChange('numberOfRooms', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="floorNumber">Floor Number</Label>
                  <Input
                    id="floorNumber"
                    placeholder="3 or Multiple Levels"
                    value={formData.floorNumber}
                    onChange={(e) => handleInputChange('floorNumber', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="layoutType">Type of Layout</Label>
                <Select onValueChange={(value) => handleInputChange('layoutType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open-plan">Open Plan</SelectItem>
                    <SelectItem value="cubicle-based">Cubicle-Based</SelectItem>
                    <SelectItem value="divided-offices">Divided Offices</SelectItem>
                    <SelectItem value="studio-layout">Studio Layout</SelectItem>
                    <SelectItem value="retail-layout">Retail Layout</SelectItem>
                    <SelectItem value="soundstage-warehouse">Soundstage / Warehouse</SelectItem>
                    <SelectItem value="flexible-modular">Flexible / Modular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Included Rooms</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {includedRoomsOptions.map((room) => (
                    <div key={room} className="flex items-center space-x-2">
                      <Checkbox
                        id={room}
                        checked={formData.includedRooms.includes(room)}
                        onCheckedChange={() => handleRoomToggle(room)}
                      />
                      <Label htmlFor={room} className="text-sm">{room}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Technology</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>High-Speed Internet</Label>
                      <p className="text-sm text-muted-foreground">Reliable internet connection</p>
                    </div>
                    <Switch
                      checked={formData.highSpeedInternet}
                      onCheckedChange={(checked) => handleInputChange('highSpeedInternet', checked)}
                    />
                  </div>
                  {formData.highSpeedInternet && (
                    <div>
                      <Label htmlFor="internetSpeed">Internet Speed (Mbps)</Label>
                      <Input
                        id="internetSpeed"
                        placeholder="100"
                        value={formData.internetSpeed}
                        onChange={(e) => handleInputChange('internetSpeed', e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label>Fiber Optic</Label>
                      <Switch
                        checked={formData.fiberOptic}
                        onCheckedChange={(checked) => handleInputChange('fiberOptic', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Smart Systems</Label>
                      <Switch
                        checked={formData.smartSystems}
                        onCheckedChange={(checked) => handleInputChange('smartSystems', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Security Cameras</Label>
                      <Switch
                        checked={formData.securityCameras}
                        onCheckedChange={(checked) => handleInputChange('securityCameras', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>A/V Setup</Label>
                      <Switch
                        checked={formData.audioVisualSetup}
                        onCheckedChange={(checked) => handleInputChange('audioVisualSetup', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Soundproofing</Label>
                      <Switch
                        checked={formData.soundproofing}
                        onCheckedChange={(checked) => handleInputChange('soundproofing', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Live Streaming</Label>
                      <Switch
                        checked={formData.liveStreaming}
                        onCheckedChange={(checked) => handleInputChange('liveStreaming', checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Comfort & Utilities</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Air Conditioning</Label>
                    <Switch
                      checked={formData.airConditioning}
                      onCheckedChange={(checked) => handleInputChange('airConditioning', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Natural Light</Label>
                    <Switch
                      checked={formData.naturalLight}
                      onCheckedChange={(checked) => handleInputChange('naturalLight', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Backup Generator</Label>
                    <Switch
                      checked={formData.backupGenerator}
                      onCheckedChange={(checked) => handleInputChange('backupGenerator', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Elevator Access</Label>
                    <Switch
                      checked={formData.elevatorAccess}
                      onCheckedChange={(checked) => handleInputChange('elevatorAccess', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Wheelchair Accessible</Label>
                    <Switch
                      checked={formData.wheelchairAccessible}
                      onCheckedChange={(checked) => handleInputChange('wheelchairAccessible', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Fire Safety/Sprinklers</Label>
                    <Switch
                      checked={formData.fireSafety}
                      onCheckedChange={(checked) => handleInputChange('fireSafety', checked)}
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <Label>Furnished</Label>
                    <Switch
                      checked={formData.furnished}
                      onCheckedChange={(checked) => handleInputChange('furnished', checked)}
                    />
                  </div>
                  {formData.furnished && (
                    <div className="mt-2">
                      <Label htmlFor="furnitureType">Furniture Type</Label>
                      <Input
                        id="furnitureType"
                        placeholder="Desks, sofas, displays, etc."
                        value={formData.furnitureType}
                        onChange={(e) => handleInputChange('furnitureType', e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Business Features</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <Label>Branding Opportunities</Label>
                      <Switch
                        checked={formData.brandingOpportunities}
                        onCheckedChange={(checked) => handleInputChange('brandingOpportunities', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Frontage/Visibility</Label>
                      <Switch
                        checked={formData.frontageVisibility}
                        onCheckedChange={(checked) => handleInputChange('frontageVisibility', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Loading Dock</Label>
                      <Switch
                        checked={formData.loadingDock}
                        onCheckedChange={(checked) => handleInputChange('loadingDock', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Kitchenette</Label>
                      <Switch
                        checked={formData.kitchenette}
                        onCheckedChange={(checked) => handleInputChange('kitchenette', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Waiting Area</Label>
                      <Switch
                        checked={formData.waitingArea}
                        onCheckedChange={(checked) => handleInputChange('waitingArea', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Print/Copy Equipment</Label>
                      <Switch
                        checked={formData.printCopyEquipment}
                        onCheckedChange={(checked) => handleInputChange('printCopyEquipment', checked)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                    <Input
                      id="parkingSpaces"
                      type="number"
                      placeholder="10"
                      value={formData.parkingSpaces}
                      onChange={(e) => handleInputChange('parkingSpaces', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {isStudioCategory && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Production-Specific Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <Label>Lighting Grid/Truss</Label>
                        <Switch
                          checked={formData.lightingGrid}
                          onCheckedChange={(checked) => handleInputChange('lightingGrid', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Green Screen</Label>
                        <Switch
                          checked={formData.greenScreen}
                          onCheckedChange={(checked) => handleInputChange('greenScreen', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>White Cyclorama</Label>
                        <Switch
                          checked={formData.whiteCyclorama}
                          onCheckedChange={(checked) => handleInputChange('whiteCyclorama', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Blackout Curtains</Label>
                        <Switch
                          checked={formData.blackoutCurtains}
                          onCheckedChange={(checked) => handleInputChange('blackoutCurtains', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Control Room</Label>
                        <Switch
                          checked={formData.controlRoom}
                          onCheckedChange={(checked) => handleInputChange('controlRoom', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Rigging Points</Label>
                        <Switch
                          checked={formData.riggingPoints}
                          onCheckedChange={(checked) => handleInputChange('riggingPoints', checked)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center justify-between">
                        <Label>Drive-In Access</Label>
                        <Switch
                          checked={formData.driveInAccess}
                          onCheckedChange={(checked) => handleInputChange('driveInAccess', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access & Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="entryType">Entry Type</Label>
                <Select onValueChange={(value) => handleInputChange('entryType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select entry method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="key">Key</SelectItem>
                    <SelectItem value="smart-lock">Smart Lock</SelectItem>
                    <SelectItem value="concierge">Concierge</SelectItem>
                    <SelectItem value="staffed">Staffed</SelectItem>
                    <SelectItem value="access-code">Access Code</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="operatingHours">Operating Hours</Label>
                <Input
                  id="operatingHours"
                  placeholder="Mon-Fri 9AM-5PM or 24/7"
                  value={formData.operatingHours}
                  onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Booking Required</Label>
                    <p className="text-sm text-muted-foreground">Advance booking needed</p>
                  </div>
                  <Switch
                    checked={formData.bookingRequired}
                    onCheckedChange={(checked) => handleInputChange('bookingRequired', checked)}
                  />
                </div>
                
                {formData.bookingRequired && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bookingUrl">Booking URL</Label>
                      <Input
                        id="bookingUrl"
                        placeholder="https://booking.example.com"
                        value={formData.bookingUrl}
                        onChange={(e) => handleInputChange('bookingUrl', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bookingWindow">Booking Window</Label>
                      <Input
                        id="bookingWindow"
                        placeholder="24 hours notice"
                        value={formData.bookingWindow}
                        onChange={(e) => handleInputChange('bookingWindow', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>ID Required</Label>
                  <Switch
                    checked={formData.idRequired}
                    onCheckedChange={(checked) => handleInputChange('idRequired', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Smoking Allowed</Label>
                  <Switch
                    checked={formData.smokingAllowed}
                    onCheckedChange={(checked) => handleInputChange('smokingAllowed', checked)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="guestPolicy">Guest Policy</Label>
                <Textarea
                  id="guestPolicy"
                  placeholder="Describe guest access rules and requirements..."
                  value={formData.guestPolicy}
                  onChange={(e) => handleInputChange('guestPolicy', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Pets Allowed</Label>
                  <Switch
                    checked={formData.petsAllowed}
                    onCheckedChange={(checked) => handleInputChange('petsAllowed', checked)}
                  />
                </div>
                
                {formData.petsAllowed && (
                  <div>
                    <Label htmlFor="petConditions">Pet Conditions</Label>
                    <Input
                      id="petConditions"
                      placeholder="Size restrictions, deposits, etc."
                      value={formData.petConditions}
                      onChange={(e) => handleInputChange('petConditions', e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <Label>Food/Drink Allowed</Label>
                  <Switch
                    checked={formData.foodDrinkAllowed}
                    onCheckedChange={(checked) => handleInputChange('foodDrinkAllowed', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Alcohol Allowed</Label>
                  <Switch
                    checked={formData.alcoholAllowed}
                    onCheckedChange={(checked) => handleInputChange('alcoholAllowed', checked)}
                  />
                </div>
              </div>

              {formData.alcoholAllowed && (
                <div>
                  <Label htmlFor="alcoholLicense">Alcohol License Info</Label>
                  <Input
                    id="alcoholLicense"
                    placeholder="License details or restrictions"
                    value={formData.alcoholLicense}
                    onChange={(e) => handleInputChange('alcoholLicense', e.target.value)}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="maxOccupancy">Maximum Occupancy</Label>
                <Input
                  id="maxOccupancy"
                  type="number"
                  placeholder="50"
                  value={formData.maxOccupancy}
                  onChange={(e) => handleInputChange('maxOccupancy', e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Insurance Required</Label>
                  <Switch
                    checked={formData.insuranceRequired}
                    onCheckedChange={(checked) => handleInputChange('insuranceRequired', checked)}
                  />
                </div>
                
                {formData.insuranceRequired && (
                  <div>
                    <Label htmlFor="insuranceDescription">Insurance Requirements</Label>
                    <Textarea
                      id="insuranceDescription"
                      placeholder="Describe insurance requirements..."
                      value={formData.insuranceDescription}
                      onChange={(e) => handleInputChange('insuranceDescription', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Media & Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({
                tours: "360° Virtual Tours",
                photos: "Photos", 
                videos: "Videos",
                droneFootage: "Drone Footage",
                floorPlans: "Floor Plans",
                documents: "PDF Documents"
              }).map(([key, title]) => (
                <div key={key}>
                  <Label className="text-base font-semibold">{title}</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <label htmlFor={`file-${key}`} className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Drop files here or click to upload
                          </span>
                          <input
                            id={`file-${key}`}
                            type="file"
                            className="hidden"
                            multiple
                            accept={key === 'documents' ? '.pdf' : 'image/*,video/*'}
                            onChange={(e) => handleFileUpload(key, e.target.files)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {uploadedFiles[key].length > 0 && (
                    <div className="mt-4 space-y-2">
                      {uploadedFiles[key].map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(key, index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Full Address *</Label>
                <Input
                  id="address"
                  placeholder="123 Business Street, Downtown"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Los Angeles"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region/State</Label>
                  <Input
                    id="region"
                    placeholder="California"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="90210"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="googlePlusCode">Google Plus Code</Label>
                  <Input
                    id="googlePlusCode"
                    placeholder="8FW4V75X+XX"
                    value={formData.googlePlusCode}
                    onChange={(e) => handleInputChange('googlePlusCode', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="locationAccuracy">Location Accuracy</Label>
                <Select onValueChange={(value) => handleInputChange('locationAccuracy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location accuracy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact</SelectItem>
                    <SelectItem value="approximate">Approximate</SelectItem>
                    <SelectItem value="hidden">Hidden on Map</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="proximityToTransit">Proximity to Transit</Label>
                <Select onValueChange={(value) => handleInputChange('proximityToTransit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select nearest transit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metro-train">Metro / Train</SelectItem>
                    <SelectItem value="bus">Bus</SelectItem>
                    <SelectItem value="highway">Highway</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="transitDetails">Transit Details</Label>
                <Input
                  id="transitDetails"
                  placeholder="2 blocks from Metro Red Line"
                  value={formData.transitDetails}
                  onChange={(e) => handleInputChange('transitDetails', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visibility & Permissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="listingStatus">Listing Status</Label>
                  <Select onValueChange={(value) => handleInputChange('listingStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select onValueChange={(value) => handleInputChange('visibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="admin-only">Admin Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="uploader">Uploader/Tour Pro</Label>
                  <Input
                    id="uploader"
                    placeholder="John Doe"
                    value={formData.uploader}
                    onChange={(e) => handleInputChange('uploader', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="attribution">Attribution</Label>
                  <Input
                    id="attribution"
                    placeholder="Business or creator name"
                    value={formData.attribution}
                    onChange={(e) => handleInputChange('attribution', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>PIN Protection</Label>
                    <p className="text-sm text-muted-foreground">Require PIN to access listing</p>
                  </div>
                  <Switch
                    checked={formData.pinProtection}
                    onCheckedChange={(checked) => handleInputChange('pinProtection', checked)}
                  />
                </div>
                
                {formData.pinProtection && (
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      type="password"
                      placeholder="Enter 4-6 digit PIN"
                      value={formData.pinCode}
                      onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label>Shareable URL</Label>
                <div className="flex mt-1">
                  <Input
                    value={`https://xplor.com/space/${formData.title.toLowerCase().replace(/\s+/g, '-')}`}
                    readOnly
                    className="bg-muted"
                  />
                  <Button type="button" variant="outline" className="ml-2">
                    Copy
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between pt-6">
            <Button type="button" variant="outline">Save as Draft</Button>
            <Button type="submit" className="bg-primary">Publish Listing</Button>
          </div>
        </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}