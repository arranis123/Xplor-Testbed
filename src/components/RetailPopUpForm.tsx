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
  listingType: string;
  availableFor: string[];
  owner: string;
  yearBuilt: string;
  status: string;
  
  // Type & Use
  industryFocus: string[];
  targetCustomers: string;
  operatingHours: string;
  idealUsage: string;
  staffingIncluded: boolean;
  
  // Layout & Fixtures
  floorArea: string;
  areaUnit: string;
  ceilingHeight: string;
  heightUnit: string;
  floorLevel: string;
  numberOfZones: string;
  storefrontType: string;
  includedRooms: string[];
  shelving: boolean;
  displayRails: boolean;
  countertops: boolean;
  mannequins: boolean;
  checkoutDesk: boolean;
  mirrors: boolean;
  lighting: boolean;
  speakers: boolean;
  posSystem: boolean;
  storageUnits: boolean;
  refrigeration: boolean;
  wifi: boolean;
  hvac: boolean;
  securitySystem: boolean;
  powerOutlets: boolean;
  plumbing: boolean;
  
  // Access & Rules
  entryType: string;
  accessHours: string;
  bookingRequirements: string;
  publicAccess: string;
  brandCustomization: boolean;
  installationsPermitted: string;
  insuranceRequired: boolean;
  insuranceDetails: string;
  permittedActivities: string[];
  smokingAllowed: boolean;
  alcoholPermitted: boolean;
  alcoholLicensing: string;
  maxOccupancy: string;
  noiseRestrictions: string;
  
  // Location
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  googlePlusCode: string;
  storefrontVisibility: string;
  footTraffic: string;
  proximityToTransit: string;
  transitNotes: string;
  
  // Visibility
  listingStatus: string;
  visibility: string;
  uploader: string;
  tourPro: string;
  pinProtection: boolean;
  pinCode: string;
}

export default function RetailPopUpForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    category: '',
    description: '',
    listingType: '',
    availableFor: [],
    owner: '',
    yearBuilt: '',
    status: 'available',
    industryFocus: [],
    targetCustomers: '',
    operatingHours: '',
    idealUsage: '',
    staffingIncluded: false,
    floorArea: '',
    areaUnit: 'sq-ft',
    ceilingHeight: '',
    heightUnit: 'ft',
    floorLevel: '',
    numberOfZones: '',
    storefrontType: '',
    includedRooms: [],
    shelving: false,
    displayRails: false,
    countertops: false,
    mannequins: false,
    checkoutDesk: false,
    mirrors: false,
    lighting: false,
    speakers: false,
    posSystem: false,
    storageUnits: false,
    refrigeration: false,
    wifi: false,
    hvac: false,
    securitySystem: false,
    powerOutlets: false,
    plumbing: false,
    entryType: '',
    accessHours: '',
    bookingRequirements: '',
    publicAccess: '',
    brandCustomization: false,
    installationsPermitted: '',
    insuranceRequired: false,
    insuranceDetails: '',
    permittedActivities: [],
    smokingAllowed: false,
    alcoholPermitted: false,
    alcoholLicensing: '',
    maxOccupancy: '',
    noiseRestrictions: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postalCode: '',
    googlePlusCode: '',
    storefrontVisibility: '',
    footTraffic: '',
    proximityToTransit: '',
    transitNotes: '',
    listingStatus: 'draft',
    visibility: 'public',
    uploader: '',
    tourPro: '',
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

  const handleMultiSelectToggle = (field: keyof FormData, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(item)
        ? (prev[field] as string[]).filter(i => i !== item)
        : [...(prev[field] as string[]), item]
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
    "Permanent Shop",
    "Boutique",
    "Flagship Store", 
    "Department Store",
    "Mall Kiosk",
    "Pop-Up Retail",
    "Experiential Installation",
    "Showroom",
    "Marketplace Stall",
    "Other"
  ];

  const availableForOptions = [
    "Brand Takeover",
    "Retail Activation",
    "Short-Term Rental",
    "Long-Term Lease",
    "Filming / Press Event",
    "Static Tour Only"
  ];

  const industryFocusOptions = [
    "Fashion / Apparel",
    "Beauty / Cosmetics", 
    "Luxury / Jewelry",
    "Electronics",
    "Home & Decor",
    "Food & Beverage",
    "Books & Stationery",
    "Tech / Experiential",
    "Pop Culture / Gaming",
    "Art / Culture",
    "Mixed Retail"
  ];

  const includedRoomsOptions = [
    "Retail Floor",
    "Fitting Room(s)",
    "Stockroom",
    "Office", 
    "Staff Bathroom",
    "Demo / Activation Zone",
    "Pop-Up Installation Area",
    "Outdoor Display"
  ];

  const permittedActivitiesOptions = [
    "Product Sales",
    "Sampling",
    "Events",
    "Photoshoots",
    "Filming",
    "VR/AR Experiences",
    "Food Preparation",
    "Live Demonstrations"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Retail & Pop-Up Experience
        </h1>
        <p className="text-muted-foreground">
          Create an immersive listing for your retail space with 360° tours and detailed specifications
        </p>
      </div>

      <Tabs defaultValue="basic-info" className="w-full flex gap-6">
        <div className="w-64 shrink-0">
          <TabsList className="flex flex-col h-auto w-full bg-muted p-1 space-y-1">
            <TabsTrigger value="basic-info" className="w-full justify-start text-left px-3 py-2">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="type-use" className="w-full justify-start text-left px-3 py-2">
              Type & Use
            </TabsTrigger>
            <TabsTrigger value="layout-fixtures" className="w-full justify-start text-left px-3 py-2">
              Layout & Fixtures
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
          <TabsContent value="basic-info" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Listing Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Flagship Streetwear Store in Milan"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select retail category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your retail space, its features, and ideal use cases..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="listingType">Listing Type</Label>
                    <Select onValueChange={(value) => handleInputChange('listingType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="for-lease">For Lease</SelectItem>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="showcase">Showcase Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="booked">Booked</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Available For</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {availableForOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.availableFor.includes(option)}
                          onCheckedChange={() => handleMultiSelectToggle('availableFor', option)}
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="owner">Owner / Brand</Label>
                    <Input
                      id="owner"
                      placeholder="Business or brand name"
                      value={formData.owner}
                      onChange={(e) => handleInputChange('owner', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearBuilt">Year Built / Last Renovated</Label>
                    <Input
                      id="yearBuilt"
                      type="number"
                      placeholder="2023"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="type-use" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Type & Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Retail Industry Focus</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {industryFocusOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={formData.industryFocus.includes(option)}
                          onCheckedChange={() => handleMultiSelectToggle('industryFocus', option)}
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="targetCustomers">Target Customers</Label>
                  <Input
                    id="targetCustomers"
                    placeholder="e.g., Youth-oriented, international shoppers"
                    value={formData.targetCustomers}
                    onChange={(e) => handleInputChange('targetCustomers', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    placeholder="Mon-Fri 10AM-8PM, Sat-Sun 10AM-9PM"
                    value={formData.operatingHours}
                    onChange={(e) => handleInputChange('operatingHours', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="idealUsage">Ideal Usage</Label>
                  <Input
                    id="idealUsage"
                    placeholder="Fashion pop-up, product launch, experiential marketing"
                    value={formData.idealUsage}
                    onChange={(e) => handleInputChange('idealUsage', e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Staffing Included</Label>
                    <p className="text-sm text-muted-foreground">Staff support available</p>
                  </div>
                  <Switch
                    checked={formData.staffingIncluded}
                    onCheckedChange={(checked) => handleInputChange('staffingIncluded', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout-fixtures" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Layout & Fixtures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="floorArea">Floor Area *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="floorArea"
                        type="number"
                        placeholder="1500"
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
                        placeholder="10"
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="floorLevel">Floor Level</Label>
                    <Select onValueChange={(value) => handleInputChange('floorLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basement">Basement</SelectItem>
                        <SelectItem value="ground">Ground</SelectItem>
                        <SelectItem value="1st">1st Floor</SelectItem>
                        <SelectItem value="rooftop">Rooftop</SelectItem>
                        <SelectItem value="multi-level">Multi-level</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="numberOfZones">Number of Zones</Label>
                    <Input
                      id="numberOfZones"
                      type="number"
                      placeholder="3"
                      value={formData.numberOfZones}
                      onChange={(e) => handleInputChange('numberOfZones', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="storefrontType">Storefront Type</Label>
                    <Select onValueChange={(value) => handleInputChange('storefrontType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="street-access">Street Access</SelectItem>
                        <SelectItem value="mall-interior">Mall Interior</SelectItem>
                        <SelectItem value="window-display">Window Display Only</SelectItem>
                        <SelectItem value="container-pod">Container / Pod</SelectItem>
                        <SelectItem value="open-market">Open Market</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Included Rooms</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {includedRoomsOptions.map((room) => (
                      <div key={room} className="flex items-center space-x-2">
                        <Checkbox
                          id={room}
                          checked={formData.includedRooms.includes(room)}
                          onCheckedChange={() => handleMultiSelectToggle('includedRooms', room)}
                        />
                        <Label htmlFor={room} className="text-sm">{room}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Fixtures & Utilities</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { key: 'shelving', label: 'Shelving' },
                      { key: 'displayRails', label: 'Display Rails' },
                      { key: 'countertops', label: 'Countertops' },
                      { key: 'mannequins', label: 'Mannequins' },
                      { key: 'checkoutDesk', label: 'Checkout Desk' },
                      { key: 'mirrors', label: 'Mirrors' },
                      { key: 'lighting', label: 'LED/Track Lighting' },
                      { key: 'speakers', label: 'Speakers/AV' },
                      { key: 'posSystem', label: 'POS System' },
                      { key: 'storageUnits', label: 'Storage Units' },
                      { key: 'refrigeration', label: 'Refrigeration' },
                      { key: 'wifi', label: 'WiFi' },
                      { key: 'hvac', label: 'HVAC/AC' },
                      { key: 'securitySystem', label: 'Security System' },
                      { key: 'powerOutlets', label: 'Power Outlets' },
                      { key: 'plumbing', label: 'Plumbing Access' }
                    ].map((fixture) => (
                      <div key={fixture.key} className="flex items-center justify-between">
                        <Label>{fixture.label}</Label>
                        <Switch
                          checked={formData[fixture.key as keyof FormData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(fixture.key as keyof FormData, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access-rules" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Access & Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entryType">Entry Type</Label>
                    <Select onValueChange={(value) => handleInputChange('entryType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entry method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smart-lock">Smart Lock</SelectItem>
                        <SelectItem value="key">Key</SelectItem>
                        <SelectItem value="security-desk">Security Desk</SelectItem>
                        <SelectItem value="staff-only">Staff Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="accessHours">Access Hours</Label>
                    <Select onValueChange={(value) => handleInputChange('accessHours', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select access type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24-7">24/7</SelectItem>
                        <SelectItem value="limited">Limited</SelectItem>
                        <SelectItem value="booking-required">Booking Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bookingRequirements">Booking Requirements</Label>
                  <Input
                    id="bookingRequirements"
                    placeholder="e.g., minimum 3 days notice"
                    value={formData.bookingRequirements}
                    onChange={(e) => handleInputChange('bookingRequirements', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="publicAccess">Public Access</Label>
                  <Select onValueChange={(value) => handleInputChange('publicAccess', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="private-invitation">Private Invitation</SelectItem>
                      <SelectItem value="during-hours">During Hours Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Brand Customization Allowed</Label>
                    <Switch
                      checked={formData.brandCustomization}
                      onCheckedChange={(checked) => handleInputChange('brandCustomization', checked)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="installationsPermitted">Installations Permitted</Label>
                    <Select onValueChange={(value) => handleInputChange('installationsPermitted', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select permission level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="with-approval">With Approval</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                      <Label htmlFor="insuranceDetails">Insurance Details</Label>
                      <Textarea
                        id="insuranceDetails"
                        placeholder="Describe insurance requirements..."
                        value={formData.insuranceDetails}
                        onChange={(e) => handleInputChange('insuranceDetails', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Permitted Activities</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {permittedActivitiesOptions.map((activity) => (
                      <div key={activity} className="flex items-center space-x-2">
                        <Checkbox
                          id={activity}
                          checked={formData.permittedActivities.includes(activity)}
                          onCheckedChange={() => handleMultiSelectToggle('permittedActivities', activity)}
                        />
                        <Label htmlFor={activity} className="text-sm">{activity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center justify-between">
                    <Label>Smoking Allowed</Label>
                    <Switch
                      checked={formData.smokingAllowed}
                      onCheckedChange={(checked) => handleInputChange('smokingAllowed', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Alcohol Permitted</Label>
                    <Switch
                      checked={formData.alcoholPermitted}
                      onCheckedChange={(checked) => handleInputChange('alcoholPermitted', checked)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxOccupancy">Max Occupancy</Label>
                    <Input
                      id="maxOccupancy"
                      type="number"
                      placeholder="50"
                      value={formData.maxOccupancy}
                      onChange={(e) => handleInputChange('maxOccupancy', e.target.value)}
                    />
                  </div>
                </div>

                {formData.alcoholPermitted && (
                  <div>
                    <Label htmlFor="alcoholLicensing">Alcohol Licensing Note</Label>
                    <Input
                      id="alcoholLicensing"
                      placeholder="License details or restrictions"
                      value={formData.alcoholLicensing}
                      onChange={(e) => handleInputChange('alcoholLicensing', e.target.value)}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="noiseRestrictions">Noise Restrictions</Label>
                  <Input
                    id="noiseRestrictions"
                    placeholder="e.g., No amplified music after 10PM"
                    value={formData.noiseRestrictions}
                    onChange={(e) => handleInputChange('noiseRestrictions', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6 mt-0">
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

          <TabsContent value="location" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Fashion Street, Downtown"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Milan"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="region">Region/State</Label>
                    <Input
                      id="region"
                      placeholder="Lombardy"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Italy"
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
                      placeholder="20121"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="googlePlusCode">Google Plus Code</Label>
                    <Input
                      id="googlePlusCode"
                      placeholder="8FQF8M9W+XX"
                      value={formData.googlePlusCode}
                      onChange={(e) => handleInputChange('googlePlusCode', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="storefrontVisibility">Storefront Visibility</Label>
                  <Select onValueChange={(value) => handleInputChange('storefrontVisibility', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="street-level">Street-Level</SelectItem>
                      <SelectItem value="mall-interior">Mall Interior</SelectItem>
                      <SelectItem value="popup-market">Pop-Up Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="footTraffic">Foot Traffic Info</Label>
                  <Input
                    id="footTraffic"
                    placeholder="High foot traffic, 10,000+ daily visitors"
                    value={formData.footTraffic}
                    onChange={(e) => handleInputChange('footTraffic', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="proximityToTransit">Proximity to Public Transit</Label>
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
                  <Label htmlFor="transitNotes">Transit Notes</Label>
                  <Input
                    id="transitNotes"
                    placeholder="2 blocks from Duomo Metro Station"
                    value={formData.transitNotes}
                    onChange={(e) => handleInputChange('transitNotes', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visibility" className="space-y-6 mt-0">
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
                        <SelectItem value="archived">Archived</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
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
                        <SelectItem value="link-only">Link Only</SelectItem>
                        <SelectItem value="admin-only">Admin Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="uploader">Uploader Attribution</Label>
                    <Input
                      id="uploader"
                      placeholder="Creator or brand name"
                      value={formData.uploader}
                      onChange={(e) => handleInputChange('uploader', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tourPro">Assigned Tour Pro</Label>
                    <Input
                      id="tourPro"
                      placeholder="Tour Pro name (optional)"
                      value={formData.tourPro}
                      onChange={(e) => handleInputChange('tourPro', e.target.value)}
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
                  <Label>Shareable Link</Label>
                  <div className="flex mt-1">
                    <Input
                      value={`https://xplor.com/retail/${formData.title.toLowerCase().replace(/\s+/g, '-')}`}
                      readOnly
                      className="bg-muted"
                    />
                    <Button type="button" variant="outline" className="ml-2">
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline">Save as Draft</Button>
                  <Button type="submit" className="bg-primary">Publish Listing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}