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
import { Upload, Plus, X, Trash2 } from "lucide-react";
import MapboxLocationPicker from './MapboxLocationPicker';

interface Subspace {
  id: string;
  name: string;
  type: string;
  description: string;
  publicAccess: boolean;
}

interface FormData {
  // Basic Info
  title: string;
  siteType: string;
  religiousAffiliation: string;
  denomination: string;
  listingType: string;
  yearBuilt: string;
  description: string;
  currentUse: string;
  managedBy: string;
  
  // Cultural & Historical Context
  historicalSignificance: string;
  keyEvents: string;
  restorationHistory: string;
  heritageStatus: boolean;
  heritageDocument: string;
  artRelics: string;
  languages: string[];
  religiousHolidays: string;
  
  // Site Structure & Spaces
  totalArea: string;
  areaUnit: string;
  architecturalStyle: string;
  subspaces: Subspace[];
  
  // Visitor Info & Experiences
  openingHours: string;
  entryFee: string;
  currency: string;
  toursAvailable: boolean;
  tourInfo: string;
  groupVisits: boolean;
  groupMinSize: string;
  groupMaxSize: string;
  bookingRequired: boolean;
  bookingContact: string;
  dressCode: boolean;
  dressCodeInfo: string;
  audioGuides: string[];
  pilgrimage: boolean;
  ceremonyViewing: boolean;
  meditation: boolean;
  climbing: boolean;
  exhibits: boolean;
  festivals: boolean;
  nightTours: boolean;
  wheelchairAccessible: boolean;
  hearingSupport: boolean;
  ramps: boolean;
  braille: boolean;
  multilingualSignage: boolean;
  
  // Access & Rules
  entryControl: string;
  idRequired: boolean;
  quietZone: boolean;
  noFlashPhoto: boolean;
  noShoes: boolean;
  noTouching: boolean;
  genderSpecific: boolean;
  modestDress: boolean;
  headCovering: boolean;
  noSmoking: boolean;
  noFood: boolean;
  petRestrictions: boolean;
  staffedAreas: boolean;
  filmingRestrictions: string;
  droneUse: string;
  eventHosting: boolean;
  eventDescription: string;
  
  // Location
  address: string;
  coordinates: { lat: number; lng: number } | null;
  gpsCoordinates: string;
  googlePlusCode: string;
  mapDisplay: string;
  region: string;
  country: string;
  culturalZone: string;
  proximityLandmark: string;
  transportInfo: string;
  
  // Visibility
  listingStatus: string;
  visibility: string;
  uploader: string;
  tourPro: string;
  pinProtection: boolean;
  pinCode: string;
}

export default function HeritageWorshipForm() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    siteType: '',
    religiousAffiliation: '',
    denomination: '',
    listingType: '',
    yearBuilt: '',
    description: '',
    currentUse: '',
    managedBy: '',
    historicalSignificance: '',
    keyEvents: '',
    restorationHistory: '',
    heritageStatus: false,
    heritageDocument: '',
    artRelics: '',
    languages: [],
    religiousHolidays: '',
    totalArea: '',
    areaUnit: 'sq-m',
    architecturalStyle: '',
    subspaces: [],
    openingHours: '',
    entryFee: '',
    currency: 'USD',
    toursAvailable: false,
    tourInfo: '',
    groupVisits: false,
    groupMinSize: '',
    groupMaxSize: '',
    bookingRequired: false,
    bookingContact: '',
    dressCode: false,
    dressCodeInfo: '',
    audioGuides: [],
    pilgrimage: false,
    ceremonyViewing: false,
    meditation: false,
    climbing: false,
    exhibits: false,
    festivals: false,
    nightTours: false,
    wheelchairAccessible: false,
    hearingSupport: false,
    ramps: false,
    braille: false,
    multilingualSignage: false,
    entryControl: '',
    idRequired: false,
    quietZone: false,
    noFlashPhoto: false,
    noShoes: false,
    noTouching: false,
    genderSpecific: false,
    modestDress: false,
    headCovering: false,
    noSmoking: false,
    noFood: false,
    petRestrictions: false,
    staffedAreas: false,
    filmingRestrictions: '',
    droneUse: '',
    eventHosting: false,
    eventDescription: '',
    address: '',
    coordinates: null,
    gpsCoordinates: '',
    googlePlusCode: '',
    mapDisplay: '',
    region: '',
    country: '',
    culturalZone: '',
    proximityLandmark: '',
    transportInfo: '',
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
    maps: [],
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

  const addSubspace = () => {
    const newSubspace: Subspace = {
      id: Date.now().toString(),
      name: '',
      type: '',
      description: '',
      publicAccess: true
    };
    setFormData(prev => ({
      ...prev,
      subspaces: [...prev.subspaces, newSubspace]
    }));
  };

  const updateSubspace = (id: string, field: keyof Subspace, value: any) => {
    setFormData(prev => ({
      ...prev,
      subspaces: prev.subspaces.map(space => 
        space.id === id ? { ...space, [field]: value } : space
      )
    }));
  };

  const removeSubspace = (id: string) => {
    setFormData(prev => ({
      ...prev,
      subspaces: prev.subspaces.filter(space => space.id !== id)
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

  const siteTypeOptions = [
    "Church", "Mosque", "Temple", "Synagogue", "Shrine", "Monastery",
    "Ancient Ruins", "Palace / Castle", "Fortress", "Cultural Landmark", 
    "Archaeological Site", "UNESCO Heritage Site", "Other"
  ];

  const subspaceTypeOptions = [
    "Worship Hall", "Courtyard", "Sanctuary", "Tomb / Mausoleum", 
    "Monastic Cells", "Museum Area", "Gift Shop / Entry Hall", 
    "Gardens", "Rest Area", "Viewing Deck", "Other"
  ];

  const languageOptions = [
    "English", "Arabic", "Spanish", "French", "German", "Italian", 
    "Portuguese", "Russian", "Chinese", "Japanese", "Hindi", "Sanskrit"
  ];

  const audioGuideOptions = [
    "English", "Spanish", "French", "German", "Italian", "Chinese", 
    "Japanese", "Arabic", "Self-Guided App", "Audio Device"
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Upload Heritage Site & Place of Worship
        </h1>
        <p className="text-muted-foreground">
          Create an immersive listing for your heritage site with cultural context and 360° tours
        </p>
      </div>

      <Tabs defaultValue="basic-info" className="w-full flex gap-6">
        <div className="w-64 shrink-0">
          <TabsList className="flex flex-col h-auto w-full bg-muted p-1 space-y-1">
            <TabsTrigger value="basic-info" className="w-full justify-start text-left px-3 py-2">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="cultural-context" className="w-full justify-start text-left px-3 py-2">
              Cultural Context
            </TabsTrigger>
            <TabsTrigger value="site-structure" className="w-full justify-start text-left px-3 py-2">
              Site Structure
            </TabsTrigger>
            <TabsTrigger value="visitor-info" className="w-full justify-start text-left px-3 py-2">
              Visitor Info
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
                    placeholder="e.g., Notre-Dame Cathedral"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteType">Site Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('siteType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select site type" />
                      </SelectTrigger>
                      <SelectContent>
                        {siteTypeOptions.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="religiousAffiliation">Religious Affiliation</Label>
                    <Input
                      id="religiousAffiliation"
                      placeholder="e.g., Catholic, Islamic, Buddhist"
                      value={formData.religiousAffiliation}
                      onChange={(e) => handleInputChange('religiousAffiliation', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="denomination">Denomination</Label>
                    <Input
                      id="denomination"
                      placeholder="e.g., Roman Catholic, Sunni, Theravada"
                      value={formData.denomination}
                      onChange={(e) => handleInputChange('denomination', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="listingType">Listing Type</Label>
                    <Select onValueChange={(value) => handleInputChange('listingType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select listing purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tourism">Tourism</SelectItem>
                        <SelectItem value="religious-use">Religious Use</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="preservation">For Preservation Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearBuilt">Year Built</Label>
                    <Input
                      id="yearBuilt"
                      placeholder="e.g., 1163-1345 or circa 800 AD"
                      value={formData.yearBuilt}
                      onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="managedBy">Managed By</Label>
                    <Select onValueChange={(value) => handleInputChange('managedBy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select management type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="religious-institution">Religious Institution</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="foundation">Foundation</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the heritage site, its significance, and visitor experience..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="currentUse">Current Use</Label>
                  <Select onValueChange={(value) => handleInputChange('currentUse', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select current status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active-worship">Active Worship</SelectItem>
                      <SelectItem value="museum">Museum</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="restoration">Under Restoration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cultural-context" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Cultural & Historical Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="historicalSignificance">Historical Significance</Label>
                  <Textarea
                    id="historicalSignificance"
                    placeholder="Describe the historical importance and cultural significance..."
                    value={formData.historicalSignificance}
                    onChange={(e) => handleInputChange('historicalSignificance', e.target.value)}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="keyEvents">Key Events / Traditions Held</Label>
                  <Textarea
                    id="keyEvents"
                    placeholder="Important ceremonies, festivals, pilgrimages, historical events..."
                    value={formData.keyEvents}
                    onChange={(e) => handleInputChange('keyEvents', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="restorationHistory">Restoration History</Label>
                  <Textarea
                    id="restorationHistory"
                    placeholder="Major restoration projects, dates, and activities..."
                    value={formData.restorationHistory}
                    onChange={(e) => handleInputChange('restorationHistory', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>UNESCO / Heritage Status</Label>
                      <p className="text-sm text-muted-foreground">Official heritage designation</p>
                    </div>
                    <Switch
                      checked={formData.heritageStatus}
                      onCheckedChange={(checked) => handleInputChange('heritageStatus', checked)}
                    />
                  </div>
                  
                  {formData.heritageStatus && (
                    <div>
                      <Label htmlFor="heritageDocument">Heritage Certificate / Link</Label>
                      <Input
                        id="heritageDocument"
                        placeholder="Upload certificate or provide official link"
                        value={formData.heritageDocument}
                        onChange={(e) => handleInputChange('heritageDocument', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="artRelics">Art / Relics / Iconography</Label>
                  <Textarea
                    id="artRelics"
                    placeholder="Description of significant artworks, relics, or iconographic elements..."
                    value={formData.artRelics}
                    onChange={(e) => handleInputChange('artRelics', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Languages Used on Site</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {languageOptions.map((language) => (
                      <div key={language} className="flex items-center space-x-2">
                        <Checkbox
                          id={language}
                          checked={formData.languages.includes(language)}
                          onCheckedChange={() => handleMultiSelectToggle('languages', language)}
                        />
                        <Label htmlFor={language} className="text-sm">{language}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="religiousHolidays">Religious Holidays / Pilgrimage Days</Label>
                  <Textarea
                    id="religiousHolidays"
                    placeholder="Important dates, festivals, pilgrimage seasons..."
                    value={formData.religiousHolidays}
                    onChange={(e) => handleInputChange('religiousHolidays', e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="site-structure" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Site Structure & Spaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="totalArea">Total Site Area</Label>
                    <div className="flex gap-2">
                      <Input
                        id="totalArea"
                        type="number"
                        placeholder="5000"
                        value={formData.totalArea}
                        onChange={(e) => handleInputChange('totalArea', e.target.value)}
                      />
                      <Select onValueChange={(value) => handleInputChange('areaUnit', value)}>
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sq-m">sq m</SelectItem>
                          <SelectItem value="acres">acres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="architecturalStyle">Main Architectural Style</Label>
                    <Input
                      id="architecturalStyle"
                      placeholder="e.g., Gothic, Baroque, Islamic, Classical"
                      value={formData.architecturalStyle}
                      onChange={(e) => handleInputChange('architecturalStyle', e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Subspaces & Zones</h3>
                    <Button type="button" onClick={addSubspace} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Space
                    </Button>
                  </div>

                  {formData.subspaces.map((subspace, index) => (
                    <Card key={subspace.id} className="mb-4">
                      <CardContent className="pt-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">Space {index + 1}</h4>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSubspace(subspace.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Space Name</Label>
                            <Input
                              placeholder="e.g., Main Prayer Hall"
                              value={subspace.name}
                              onChange={(e) => updateSubspace(subspace.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Select onValueChange={(value) => updateSubspace(subspace.id, 'type', value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select space type" />
                              </SelectTrigger>
                              <SelectContent>
                                {subspaceTypeOptions.map((option) => (
                                  <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>{option}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Description</Label>
                          <Textarea
                            placeholder="Describe this space..."
                            value={subspace.description}
                            onChange={(e) => updateSubspace(subspace.id, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Public Access</Label>
                          <Switch
                            checked={subspace.publicAccess}
                            onCheckedChange={(checked) => updateSubspace(subspace.id, 'publicAccess', checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {formData.subspaces.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No spaces added yet. Click "Add Space" to define areas within your site.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitor-info" className="space-y-6 mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Info & Experiences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="openingHours">Opening Hours</Label>
                  <Input
                    id="openingHours"
                    placeholder="Mon-Fri 9AM-5PM, Sat-Sun 10AM-6PM"
                    value={formData.openingHours}
                    onChange={(e) => handleInputChange('openingHours', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entryFee">Entry Fee</Label>
                    <Input
                      id="entryFee"
                      placeholder="Free, 10, or suggested donation"
                      value={formData.entryFee}
                      onChange={(e) => handleInputChange('entryFee', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select onValueChange={(value) => handleInputChange('currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="CNY">CNY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Tours Available</Label>
                    <Switch
                      checked={formData.toursAvailable}
                      onCheckedChange={(checked) => handleInputChange('toursAvailable', checked)}
                    />
                  </div>
                  
                  {formData.toursAvailable && (
                    <div>
                      <Label htmlFor="tourInfo">Tour Information</Label>
                      <Input
                        id="tourInfo"
                        placeholder="Guided tours daily at 10AM, 2PM. Self-guided app available."
                        value={formData.tourInfo}
                        onChange={(e) => handleInputChange('tourInfo', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Group Visits Allowed</Label>
                    <Switch
                      checked={formData.groupVisits}
                      onCheckedChange={(checked) => handleInputChange('groupVisits', checked)}
                    />
                  </div>
                  
                  {formData.groupVisits && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="groupMinSize">Min Group Size</Label>
                        <Input
                          id="groupMinSize"
                          type="number"
                          placeholder="5"
                          value={formData.groupMinSize}
                          onChange={(e) => handleInputChange('groupMinSize', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="groupMaxSize">Max Group Size</Label>
                        <Input
                          id="groupMaxSize"
                          type="number"
                          placeholder="50"
                          value={formData.groupMaxSize}
                          onChange={(e) => handleInputChange('groupMaxSize', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Booking Required</Label>
                    <Switch
                      checked={formData.bookingRequired}
                      onCheckedChange={(checked) => handleInputChange('bookingRequired', checked)}
                    />
                  </div>
                  
                  {formData.bookingRequired && (
                    <div>
                      <Label htmlFor="bookingContact">Booking Contact</Label>
                      <Input
                        id="bookingContact"
                        placeholder="Email, phone, or website URL"
                        value={formData.bookingContact}
                        onChange={(e) => handleInputChange('bookingContact', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Dress Code Required</Label>
                    <Switch
                      checked={formData.dressCode}
                      onCheckedChange={(checked) => handleInputChange('dressCode', checked)}
                    />
                  </div>
                  
                  {formData.dressCode && (
                    <div>
                      <Label htmlFor="dressCodeInfo">Dress Code Information</Label>
                      <Input
                        id="dressCodeInfo"
                        placeholder="Modest clothing required, cover shoulders and knees"
                        value={formData.dressCodeInfo}
                        onChange={(e) => handleInputChange('dressCodeInfo', e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label>Translation / Audio Guides</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {audioGuideOptions.map((guide) => (
                      <div key={guide} className="flex items-center space-x-2">
                        <Checkbox
                          id={guide}
                          checked={formData.audioGuides.includes(guide)}
                          onCheckedChange={() => handleMultiSelectToggle('audioGuides', guide)}
                        />
                        <Label htmlFor={guide} className="text-sm">{guide}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Special Experiences</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'pilgrimage', label: 'Pilgrimage' },
                      { key: 'ceremonyViewing', label: 'Religious Ceremony Viewing' },
                      { key: 'meditation', label: 'Meditation / Prayer Access' },
                      { key: 'climbing', label: 'Climbing / Panoramic Views' },
                      { key: 'exhibits', label: 'Exhibit Viewing' },
                      { key: 'festivals', label: 'Festival / Parade Participation' },
                      { key: 'nightTours', label: 'Lighting / Night Tours' }
                    ].map((experience) => (
                      <div key={experience.key} className="flex items-center justify-between">
                        <Label>{experience.label}</Label>
                        <Switch
                          checked={formData[experience.key as keyof FormData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(experience.key as keyof FormData, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Accessibility Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
                      { key: 'hearingSupport', label: 'Hearing Support' },
                      { key: 'ramps', label: 'Ramps / Elevators' },
                      { key: 'braille', label: 'Braille Materials' },
                      { key: 'multilingualSignage', label: 'Multilingual Signage' }
                    ].map((feature) => (
                      <div key={feature.key} className="flex items-center justify-between">
                        <Label>{feature.label}</Label>
                        <Switch
                          checked={formData[feature.key as keyof FormData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(feature.key as keyof FormData, checked)}
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
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="entryControl">Entry Control</Label>
                    <Select onValueChange={(value) => handleInputChange('entryControl', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="controlled">Controlled</SelectItem>
                        <SelectItem value="permit-required">Permit Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>ID Required</Label>
                    <Switch
                      checked={formData.idRequired}
                      onCheckedChange={(checked) => handleInputChange('idRequired', checked)}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Behavior Guidelines</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'quietZone', label: 'Quiet Zone' },
                      { key: 'noFlashPhoto', label: 'No Flash Photography' },
                      { key: 'noShoes', label: 'No Shoes Indoors' },
                      { key: 'noTouching', label: 'No Touching Relics' },
                      { key: 'genderSpecific', label: 'Gender-Specific Zones' },
                      { key: 'modestDress', label: 'Modest Dress Required' },
                      { key: 'headCovering', label: 'Head Covering Required' },
                      { key: 'noSmoking', label: 'No Smoking' },
                      { key: 'noFood', label: 'No Food / Drink' },
                      { key: 'petRestrictions', label: 'Pet Restrictions' }
                    ].map((rule) => (
                      <div key={rule.key} className="flex items-center justify-between">
                        <Label>{rule.label}</Label>
                        <Switch
                          checked={formData[rule.key as keyof FormData] as boolean}
                          onCheckedChange={(checked) => handleInputChange(rule.key as keyof FormData, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Staffed or Supervised Areas</Label>
                  <Switch
                    checked={formData.staffedAreas}
                    onCheckedChange={(checked) => handleInputChange('staffedAreas', checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="filmingRestrictions">Filming Restrictions</Label>
                  <Select onValueChange={(value) => handleInputChange('filmingRestrictions', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filming policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes - Allowed</SelectItem>
                      <SelectItem value="with-permit">With Permit Only</SelectItem>
                      <SelectItem value="no">Not Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="droneUse">Drone Use</Label>
                  <Select onValueChange={(value) => handleInputChange('droneUse', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select drone policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allowed">Allowed</SelectItem>
                      <SelectItem value="with-permission">With Permission</SelectItem>
                      <SelectItem value="not-allowed">Not Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Event Hosting Possible</Label>
                    <Switch
                      checked={formData.eventHosting}
                      onCheckedChange={(checked) => handleInputChange('eventHosting', checked)}
                    />
                  </div>
                  
                  {formData.eventHosting && (
                    <div>
                      <Label htmlFor="eventDescription">Event Description</Label>
                      <Textarea
                        id="eventDescription"
                        placeholder="Types of events that can be hosted..."
                        value={formData.eventDescription}
                        onChange={(e) => handleInputChange('eventDescription', e.target.value)}
                        rows={3}
                      />
                    </div>
                  )}
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
                {/* Featured Image Section */}
                <div>
                  <Label className="text-base font-semibold">Featured Image</Label>
                  <div className="space-y-3">
                    <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div className="mt-4">
                          <label htmlFor="file-featured" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-foreground">
                              Upload main image for your heritage site listing
                            </span>
                            <input
                              id="file-featured"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('featured', e.target.files)}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Or paste image URL" className="flex-1" />
                      <Button variant="outline">Add URL</Button>
                    </div>
                  </div>
                </div>

                {Object.entries({
                  tours: "360° Virtual Tours",
                  photos: "Photos", 
                  videos: "Videos",
                  droneFootage: "Drone Footage",
                  maps: "Maps & Floor Plans",
                  documents: "Documents & Certificates"
                }).map(([key, title]) => (
                  <div key={key}>
                    <Label className="text-base font-semibold">{title}</Label>
                    <div className="space-y-3">
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
                      <div className="flex gap-2">
                        <Input placeholder={`Or paste URL to ${title.toLowerCase()}`} className="flex-1" />
                        <Button variant="outline">Add URL</Button>
                      </div>
                      
                      {/* Multiple Items Section */}
                      {(['tours', 'videos', 'droneFootage'].includes(key)) && (
                        <div className="space-y-3 mt-4">
                          <Button variant="outline" className="w-full">
                            <Plus className="h-4 w-4 mr-2" />
                            Add {title}
                          </Button>
                          
                          <Card className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="outline">{title}</Badge>
                              <Button variant="ghost" size="sm">
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Name</Label>
                                <Input placeholder={`e.g., ${key === 'tours' ? 'Sacred Hall Tour' : key === 'videos' ? 'Heritage Documentary' : 'Site Overview'}`} />
                              </div>
                              <div>
                                <Label className="text-sm font-medium">URL or File Upload</Label>
                                <Input placeholder="Enter URL or upload file..." />
                              </div>
                              <div className="md:col-span-2">
                                <Label className="text-sm font-medium">Description</Label>
                                <Textarea placeholder={`Describe this ${title.toLowerCase()}...`} rows={2} />
                              </div>
                            </div>
                          </Card>
                        </div>
                      )}
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
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Full address of the heritage site"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div>
                  <Label>Interactive Map</Label>
                  <p className="text-sm text-muted-foreground mb-2">Click on the map to set the exact location</p>
                  <MapboxLocationPicker
                    coordinates={formData.coordinates}
                    onCoordinatesChange={(coords) => handleInputChange('coordinates', coords)}
                    className="h-64"
                  />
                </div>

                <div>
                  <Label>Interactive Map</Label>
                  <p className="text-sm text-muted-foreground mb-2">Click on the map to set the exact location</p>
                  <MapboxLocationPicker
                    coordinates={formData.coordinates}
                    onCoordinatesChange={(coords) => handleInputChange('coordinates', coords)}
                    className="h-64"
                  />
                </div>
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
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="Full address of the heritage site"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
                    <Input
                      id="gpsCoordinates"
                      placeholder="48.8566° N, 2.3522° E"
                      value={formData.gpsCoordinates}
                      onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
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
                  <Label htmlFor="mapDisplay">Display Map</Label>
                  <Select onValueChange={(value) => handleInputChange('mapDisplay', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select map display level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exact">Exact</SelectItem>
                      <SelectItem value="approximate">Approximate</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      placeholder="Île-de-France"
                      value={formData.region}
                      onChange={(e) => handleInputChange('region', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="France"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="culturalZone">Cultural Zone</Label>
                    <Input
                      id="culturalZone"
                      placeholder="Historic City Center"
                      value={formData.culturalZone}
                      onChange={(e) => handleInputChange('culturalZone', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="proximityLandmark">Proximity to City / Tourist Landmark</Label>
                  <Input
                    id="proximityLandmark"
                    placeholder="200m from Seine River, 1km from Louvre Museum"
                    value={formData.proximityLandmark}
                    onChange={(e) => handleInputChange('proximityLandmark', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="transportInfo">Transport Info</Label>
                  <Input
                    id="transportInfo"
                    placeholder="Metro Line 4 - Châtelet, Bus 21, 27, CDG Airport 45min"
                    value={formData.transportInfo}
                    onChange={(e) => handleInputChange('transportInfo', e.target.value)}
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
                    <Label htmlFor="visibility">Visibility Level</Label>
                    <Select onValueChange={(value) => handleInputChange('visibility', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="link-only">Link Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="uploader">Uploader Attribution</Label>
                    <Input
                      id="uploader"
                      placeholder="Person or organization name"
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
                  <Label>Shareable Listing URL</Label>
                  <div className="flex mt-1">
                    <Input
                      value={`https://xplor.com/heritage/${formData.title.toLowerCase().replace(/\s+/g, '-')}`}
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