import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  CalendarIcon, 
  Upload, 
  Link as LinkIcon, 
  Plus, 
  X, 
  MapPin,
  Building,
  Home,
  DollarSign,
  Bed,
  Bath,
  Car,
  Wifi,
  Shield,
  Eye,
  Pin,
  Download,
  FileText,
  Camera,
  Check,
  ChevronsUpDown
} from "lucide-react";

interface RealEstatePropertyFormProps {
  form: UseFormReturn<any>;
}

// Helper function to get property type label from value
const getPropertyTypeLabel = (value: string): string => {
  const propertyTypes = {
    // Residential
    "apartment": "Apartment",
    "penthouse": "Penthouse", 
    "condo": "Condo / Condominium",
    "townhouse": "Townhouse",
    "duplex": "Duplex",
    "triplex": "Triplex",
    "studio": "Studio",
    "loft": "Loft",
    "maisonette": "Maisonette",
    "single-family": "Single-Family Home",
    "multi-family": "Multi-Family Home",
    "bungalow": "Bungalow",
    "villa": "Villa",
    "chalet": "Chalet",
    "cabin": "Cabin",
    "tiny-house": "Tiny House",
    "manufactured-home": "Manufactured Home",
    "mobile-home": "Mobile Home",
    "modular-home": "Modular Home",
    "farmhouse": "Farmhouse",
    "country-house": "Country House",
    "floating-home": "Floating Home",
    "treehouse": "Treehouse",
    "co-living": "Co-Living Unit",
    "serviced-apartment": "Serviced Apartment",
    "senior-living": "Retirement / Senior Living",
    // Commercial
    "office-space": "Office Space",
    "retail-space": "Retail Space",
    "shopping-mall": "Shopping Mall Unit",
    "co-working": "Co-Working Space",
    "showroom": "Showroom",
    "medical-office": "Medical Office / Clinic",
    "warehouse": "Warehouse",
    "distribution-center": "Distribution Center",
    "factory": "Factory / Industrial",
    "commercial-building": "Commercial Building",
    "mixed-use": "Mixed-Use Building",
    "data-center": "Data Center",
    "cold-storage": "Cold Storage Facility",
    "self-storage": "Self-Storage Facility",
    "car-dealership": "Car Dealership",
    "bank": "Bank / Financial Building",
    "research-lab": "Research Lab",
    // Land & Development
    "residential-land": "Residential Land",
    "commercial-land": "Commercial Land",
    "agricultural-land": "Agricultural Land / Farm",
    "industrial-land": "Industrial Land",
    "mixed-use-land": "Mixed-Use Land",
    "vineyard": "Vineyard / Orchard",
    "gated-plot": "Plot in Gated Community",
    "island": "Island / Private Island",
    "development-project": "Development Project",
    "construction-site": "Construction Site",
    "undeveloped-lot": "Undeveloped Lot",
    "approved-parcel": "Approved Land Parcel",
    "reclaimed-land": "Reclaimed Land",
    // Specialty & Other
    "parking-space": "Parking Space",
    "marina-berth": "Marina Berth",
    "hangar": "Hangar / Airstrip",
    "greenhouse": "Greenhouse",
    "barn": "Barn / Stable",
    "wind-farm": "Wind Farm / Solar Site",
    "telecom-tower": "Telecom Tower Site",
    "storage-container": "Storage Container Unit",
    "cryptomine": "Cryptomine Facility",
    "billboard": "Billboard / Ad Space",
    "historic-property": "Historic Property / Monument",
    "off-grid": "Off-Grid Property",
    "shelter": "Shelter / Bunker",
    "other": "Other"
  };
  
  return propertyTypes[value as keyof typeof propertyTypes] || value;
};

export function RealEstatePropertyForm({ form }: RealEstatePropertyFormProps) {
  const [mediaFiles, setMediaFiles] = useState({
    virtualTours: [],
    photos: [],
    videos: [],
    droneFootage: [],
    documents: []
  });

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="details-features">Details & Features</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="access-rules">Access & Rules</TabsTrigger>
          <TabsTrigger value="media-files">Media & Files</TabsTrigger>
          <TabsTrigger value="visibility">Visibility</TabsTrigger>
        </TabsList>

        {/* 1️⃣ Basic Info Tab */}
        <TabsContent value="basic-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Basic Property Information
              </CardTitle>
              <CardDescription>
                Core identifying details about the property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter property title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? getPropertyTypeLabel(field.value) : "Select property type"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search property types..." />
                            <CommandEmpty>No property type found.</CommandEmpty>
                            
                            <CommandGroup heading="🏠 Residential">
                              {[
                                { value: "apartment", label: "Apartment" },
                                { value: "penthouse", label: "Penthouse" },
                                { value: "condo", label: "Condo / Condominium" },
                                { value: "townhouse", label: "Townhouse" },
                                { value: "duplex", label: "Duplex" },
                                { value: "triplex", label: "Triplex" },
                                { value: "studio", label: "Studio" },
                                { value: "loft", label: "Loft" },
                                { value: "maisonette", label: "Maisonette" },
                                { value: "single-family", label: "Single-Family Home" },
                                { value: "multi-family", label: "Multi-Family Home" },
                                { value: "bungalow", label: "Bungalow" },
                                { value: "villa", label: "Villa" },
                                { value: "chalet", label: "Chalet" },
                                { value: "cabin", label: "Cabin" },
                                { value: "tiny-house", label: "Tiny House" },
                                { value: "manufactured-home", label: "Manufactured Home" },
                                { value: "mobile-home", label: "Mobile Home" },
                                { value: "modular-home", label: "Modular Home" },
                                { value: "farmhouse", label: "Farmhouse" },
                                { value: "country-house", label: "Country House" },
                                { value: "floating-home", label: "Floating Home" },
                                { value: "treehouse", label: "Treehouse" },
                                { value: "co-living", label: "Co-Living Unit" },
                                { value: "serviced-apartment", label: "Serviced Apartment" },
                                { value: "senior-living", label: "Retirement / Senior Living" }
                              ].map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={() => {
                                    field.onChange(type.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>

                            <CommandGroup heading="🏢 Commercial">
                              {[
                                { value: "office-space", label: "Office Space" },
                                { value: "retail-space", label: "Retail Space" },
                                { value: "shopping-mall", label: "Shopping Mall Unit" },
                                { value: "co-working", label: "Co-Working Space" },
                                { value: "showroom", label: "Showroom" },
                                { value: "medical-office", label: "Medical Office / Clinic" },
                                { value: "warehouse", label: "Warehouse" },
                                { value: "distribution-center", label: "Distribution Center" },
                                { value: "factory", label: "Factory / Industrial" },
                                { value: "commercial-building", label: "Commercial Building" },
                                { value: "mixed-use", label: "Mixed-Use Building" },
                                { value: "data-center", label: "Data Center" },
                                { value: "cold-storage", label: "Cold Storage Facility" },
                                { value: "self-storage", label: "Self-Storage Facility" },
                                { value: "car-dealership", label: "Car Dealership" },
                                { value: "bank", label: "Bank / Financial Building" },
                                { value: "research-lab", label: "Research Lab" }
                              ].map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={() => {
                                    field.onChange(type.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>

                            <CommandGroup heading="🏞️ Land & Development">
                              {[
                                { value: "residential-land", label: "Residential Land" },
                                { value: "commercial-land", label: "Commercial Land" },
                                { value: "agricultural-land", label: "Agricultural Land / Farm" },
                                { value: "industrial-land", label: "Industrial Land" },
                                { value: "mixed-use-land", label: "Mixed-Use Land" },
                                { value: "vineyard", label: "Vineyard / Orchard" },
                                { value: "gated-plot", label: "Plot in Gated Community" },
                                { value: "island", label: "Island / Private Island" },
                                { value: "development-project", label: "Development Project" },
                                { value: "construction-site", label: "Construction Site" },
                                { value: "undeveloped-lot", label: "Undeveloped Lot" },
                                { value: "approved-parcel", label: "Approved Land Parcel" },
                                { value: "reclaimed-land", label: "Reclaimed Land" }
                              ].map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={() => {
                                    field.onChange(type.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>

                            <CommandGroup heading="🅿️ Specialty & Other">
                              {[
                                { value: "parking-space", label: "Parking Space" },
                                { value: "marina-berth", label: "Marina Berth" },
                                { value: "hangar", label: "Hangar / Airstrip" },
                                { value: "greenhouse", label: "Greenhouse" },
                                { value: "barn", label: "Barn / Stable" },
                                { value: "wind-farm", label: "Wind Farm / Solar Site" },
                                { value: "telecom-tower", label: "Telecom Tower Site" },
                                { value: "storage-container", label: "Storage Container Unit" },
                                { value: "cryptomine", label: "Cryptomine Facility" },
                                { value: "billboard", label: "Billboard / Ad Space" },
                                { value: "historic-property", label: "Historic Property / Monument" },
                                { value: "off-grid", label: "Off-Grid Property" },
                                { value: "shelter", label: "Shelter / Bunker" },
                                { value: "other", label: "Other" }
                              ].map((type) => (
                                <CommandItem
                                  key={type.value}
                                  value={type.value}
                                  onSelect={() => {
                                    field.onChange(type.value);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      type.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {type.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="listingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select listing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="for-sale">For Sale</SelectItem>
                          <SelectItem value="for-rent">For Rent</SelectItem>
                          <SelectItem value="leasehold">Leasehold</SelectItem>
                          <SelectItem value="auction">Auction</SelectItem>
                          <SelectItem value="short-term">Short-Term</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="cad">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pricePerSqFt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price per Sq Ft/Sq M</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-calculated" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearBuilt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Built</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter year built" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearRenovated"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Renovated (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter year renovated" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="listingReferenceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Reference ID (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter reference ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2️⃣ Details & Features Tab */}
        <TabsContent value="details-features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Property Details & Features
              </CardTitle>
              <CardDescription>
                Technical and structural information about the property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="bedrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bedrooms</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Number of bedrooms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullBathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Bathrooms</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Number of full bathrooms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="halfBathrooms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Half Bathrooms</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Number of half bathrooms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorArea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floor Area (Sq Ft / Sq M)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Floor area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="plotLotSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plot/Lot Size (Sq Ft / Sq M)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Plot/lot size" {...field} />
                      </FormControl>
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
                        <Input type="number" placeholder="Number of floors" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="architecturalStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Architectural Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="contemporary">Contemporary</SelectItem>
                          <SelectItem value="traditional">Traditional</SelectItem>
                          <SelectItem value="colonial">Colonial</SelectItem>
                          <SelectItem value="victorian">Victorian</SelectItem>
                          <SelectItem value="mediterranean">Mediterranean</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="constructionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Construction Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select construction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="brick">Brick</SelectItem>
                          <SelectItem value="wood">Wood Frame</SelectItem>
                          <SelectItem value="concrete">Concrete</SelectItem>
                          <SelectItem value="steel">Steel Frame</SelectItem>
                          <SelectItem value="stone">Stone</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="furnishingStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Furnishing Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select furnishing status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="furnished">Furnished</SelectItem>
                          <SelectItem value="semi">Semi-Furnished</SelectItem>
                          <SelectItem value="unfurnished">Unfurnished</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Property Features Checkboxes */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { id: "basement", label: "Basement" },
                    { id: "attic", label: "Attic" },
                    { id: "loft", label: "Loft" },
                    { id: "homeOffice", label: "Home Office" },
                    { id: "walkInCloset", label: "Walk-in Closet" },
                    { id: "fireplace", label: "Fireplace" },
                    { id: "smartHome", label: "Smart Home" },
                    { id: "laundryArea", label: "Laundry Area" },
                    { id: "elevator", label: "Elevator" },
                    { id: "solarPanels", label: "Solar Panels" }
                  ].map((feature) => (
                    <FormField
                      key={feature.id}
                      control={form.control}
                      name={feature.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {feature.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="kitchenType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kitchen Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select kitchen type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open Kitchen</SelectItem>
                          <SelectItem value="closed">Closed Kitchen</SelectItem>
                          <SelectItem value="island">Island Kitchen</SelectItem>
                          <SelectItem value="butlers">Butler's Kitchen</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heatingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heating Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select heating type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="central">Central Heating</SelectItem>
                          <SelectItem value="gas">Gas Heating</SelectItem>
                          <SelectItem value="electric">Electric Heating</SelectItem>
                          <SelectItem value="underfloor">Underfloor Heating</SelectItem>
                          <SelectItem value="heat-pump">Heat Pump</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acSystem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>A/C System</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select A/C system" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="central">Central A/C</SelectItem>
                          <SelectItem value="split">Split System</SelectItem>
                          <SelectItem value="window">Window Units</SelectItem>
                          <SelectItem value="ducted">Ducted System</SelectItem>
                          <SelectItem value="none">No A/C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Energy & Green Building */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Energy & Sustainability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="energyCertification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Energy Certification</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter energy rating" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="greenBuildingCertified"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Green Building Certified
                          </FormLabel>
                          <div className="text-[0.8rem] text-muted-foreground">
                            LEED, BREEAM, or other green certifications
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3️⃣ Amenities Tab */}
        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Amenities</CardTitle>
              <CardDescription>
                Lifestyle and community features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pool Amenities */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Pool & Water Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: "poolPrivate", label: "Private Pool" },
                    { id: "poolHeated", label: "Heated Pool" },
                    { id: "poolShared", label: "Shared Pool" },
                    { id: "poolInfinity", label: "Infinity Pool" },
                    { id: "jacuzzi", label: "Jacuzzi/Hot Tub" }
                  ].map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name={amenity.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {amenity.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Entertainment & Recreation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Entertainment & Recreation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: "gym", label: "Gym/Fitness Room" },
                    { id: "homeCinema", label: "Home Cinema/Game Room" },
                    { id: "playground", label: "Playground" },
                    { id: "sportsCourt", label: "Sports Court" },
                    { id: "puttingGreen", label: "Putting Green" }
                  ].map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name={amenity.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {amenity.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Outdoor Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Outdoor Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: "bbqArea", label: "BBQ Area/Outdoor Kitchen" },
                    { id: "rooftopTerrace", label: "Rooftop Terrace" },
                    { id: "garden", label: "Garden" },
                    { id: "patio", label: "Patio" },
                    { id: "deck", label: "Deck" }
                  ].map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name={amenity.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {amenity.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Parking & Transportation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Parking & Transportation</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: "garage", label: "Garage" },
                    { id: "coveredParking", label: "Covered Parking" },
                    { id: "evCharger", label: "EV Charger" },
                    { id: "boatDock", label: "Boat Dock" },
                    { id: "helipad", label: "Helipad" }
                  ].map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name={amenity.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {amenity.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Security & Services */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Security & Services</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: "concierge", label: "Concierge/Doorman" },
                    { id: "securitySystem", label: "Security System" },
                    { id: "gatedCommunity", label: "Gated Community" },
                    { id: "petFriendly", label: "Pet Friendly" }
                  ].map((amenity) => (
                    <FormField
                      key={amenity.id}
                      control={form.control}
                      name={amenity.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm">
                              {amenity.label}
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4️⃣ Location Tab */}
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location Information
              </CardTitle>
              <CardDescription>
                Precise geolocation and surrounding information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip/Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter zip/postal code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-filled from map" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input placeholder="Auto-filled from map" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="googlePlusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Plus Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Google Plus Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Map Input Placeholder */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Map Location</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Google Maps integration with draggable pin</p>
                  <p className="text-sm text-gray-400 mt-2">Click to select exact location</p>
                </div>
              </div>

              {/* Proximity to Key Locations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Proximity to Key Locations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nearbySchools"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Schools</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List nearby schools and distances" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nearbyHospitals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Hospitals</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List nearby hospitals and distances" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publicTransport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Public Transport</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List nearby public transport and distances" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nearbyAirport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nearby Airport</FormLabel>
                        <FormControl>
                          <Input placeholder="Distance to nearest airport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beachesParks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beaches/Parks</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List nearby beaches and parks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shoppingMalls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shopping Malls</FormLabel>
                        <FormControl>
                          <Textarea placeholder="List nearby shopping centers" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 5️⃣ Access & Rules Tab */}
        <TabsContent value="access-rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Access & Rules
              </CardTitle>
              <CardDescription>
                Guest and rental rules for short-term or managed properties
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Access Rules */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: "petsAllowed", label: "Pets Allowed" },
                    { id: "smokingAllowed", label: "Smoking Allowed" },
                    { id: "partiesAllowed", label: "Parties/Events Allowed" },
                    { id: "shortTermRentals", label: "Short-Term Rentals Allowed" },
                    { id: "wheelchairAccessible", label: "Wheelchair Accessible" },
                    { id: "staffedEntry", label: "Staffed Entry/Concierge" },
                    { id: "smartLock", label: "Smart Lock/Keyless Entry" }
                  ].map((rule) => (
                    <FormField
                      key={rule.id}
                      control={form.control}
                      name={rule.id}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              {rule.label}
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Occupancy & Stay Rules */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minimumStay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Stay (days)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter minimum stay" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maximumOccupancy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Occupancy</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter maximum occupancy" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quietHoursStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiet Hours Start</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quietHoursEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiet Hours End</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Check-in Instructions */}
              <FormField
                control={form.control}
                name="selfCheckinInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Self Check-in Instructions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide detailed check-in instructions for guests"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6️⃣ Media & Files Tab */}
        <TabsContent value="media-files" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Media & Files
              </CardTitle>
              <CardDescription>
                Upload or link media content showcasing the property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 360 Virtual Tours */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">360 Virtual Tours</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Upload 360 virtual tour files</p>
                      <p className="text-xs text-gray-500">Drag & drop .zip, .html files or click to browse</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="virtualTourLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Virtual Tour Links</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add links to Matterport, Kuula, 3DVista, etc."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Photos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <Camera className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Upload property photos</p>
                      <p className="text-xs text-gray-500">JPG, PNG files supported</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="featuredImageToggle"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Highlight Featured Image
                        </FormLabel>
                        <div className="text-[0.8rem] text-muted-foreground">
                          Mark the main property image
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {/* Videos */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Videos</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Upload property videos</p>
                      <p className="text-xs text-gray-500">MP4 files supported</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Videos
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="videoLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Links</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add YouTube or Vimeo links"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Drone Footage */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Drone Footage</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <div className="text-center space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">Upload drone footage</p>
                      <p className="text-xs text-gray-500">MP4 files supported</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Drone Footage
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="droneFootageLinks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Drone Footage Links</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Add Dropbox, Vimeo, or other links"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Floor Plan PDFs", name: "floorPlans" },
                    { label: "Brochures", name: "brochures" },
                    { label: "Energy Certificate", name: "energyCertificate" },
                    { label: "HOA Documents", name: "hoaDocuments" },
                    { label: "Purchase/Rental Terms", name: "purchaseRentalTerms" }
                  ].map((doc) => (
                    <div key={doc.name} className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <div className="text-center space-y-2">
                        <FileText className="h-8 w-8 mx-auto text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">{doc.label}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* File Sharing Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">File Sharing Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fileVisibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>File Visibility</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="brokers-only">Brokers Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowDownloads"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Allow Downloads
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pinProtection"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN Protection (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter PIN for file access"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Generate Shareable Link
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 7️⃣ Visibility Tab */}
        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Listing Visibility
              </CardTitle>
              <CardDescription>
                Control who can view or access the listing and its assets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Listing Visibility */}
              <FormField
                control={form.control}
                name="listingVisibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="brokers-only">Brokers Only</SelectItem>
                        <SelectItem value="private">Private/Unlisted</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Media Visibility */}
              <FormField
                control={form.control}
                name="mediaVisibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Media Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select media visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="brokers-only">Brokers Only</SelectItem>
                        <SelectItem value="private">Private/Unlisted</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PIN Protection */}
              <FormField
                control={form.control}
                name="listingPinProtection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN Protection (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter PIN for listing access"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Download Permissions */}
              <FormField
                control={form.control}
                name="downloadPermissions"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Allow Downloads
                      </FormLabel>
                      <div className="text-[0.8rem] text-muted-foreground">
                        Allow users to download media files
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Shareable Link Generator */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shareable Links</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Generate Listing Link
                  </Button>
                  <Button variant="outline">
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Generate Media Link
                  </Button>
                </div>
              </div>

              {/* Schedule Listing Visibility */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Schedule Listing Visibility</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="visibilityStartDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick start date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibilityEndDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick end date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}