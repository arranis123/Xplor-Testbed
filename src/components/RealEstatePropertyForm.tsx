import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Building, Home, MapPin, Ruler, Bed, Bath, Car, Wrench, Shield, Leaf, Calendar, Phone, Star } from "lucide-react";

interface RealEstatePropertyFormProps {
  form: UseFormReturn<any>;
}

export function RealEstatePropertyForm({ form }: RealEstatePropertyFormProps) {
  const availabilityStatusOptions = [
    { value: "available", label: "Available" },
    { value: "under-offer", label: "Under Offer" },
    { value: "sold", label: "Sold" },
    { value: "let-agreed", label: "Let Agreed" }
  ];

  const kitchenTypes = [
    { value: "open", label: "Open Kitchen" },
    { value: "closed", label: "Closed Kitchen" },
    { value: "fully-fitted", label: "Fully Fitted" },
    { value: "american", label: "American Kitchen" }
  ];

  const furnishingOptions = [
    { value: "unfurnished", label: "Unfurnished" },
    { value: "semi-furnished", label: "Semi-furnished" },
    { value: "fully-furnished", label: "Fully furnished" }
  ];

  const flooringTypes = [
    { value: "marble", label: "Marble" },
    { value: "wood", label: "Wood" },
    { value: "ceramic", label: "Ceramic" },
    { value: "laminate", label: "Laminate" },
    { value: "tile", label: "Tile" },
    { value: "carpet", label: "Carpet" }
  ];

  const heatingTypes = [
    { value: "central", label: "Central Heating" },
    { value: "radiators", label: "Radiators" },
    { value: "underfloor", label: "Underfloor Heating" },
    { value: "electric", label: "Electric Heating" }
  ];

  const poolTypes = [
    { value: "private", label: "Private Pool" },
    { value: "shared", label: "Shared Pool" },
    { value: "infinity", label: "Infinity Pool" },
    { value: "indoor", label: "Indoor Pool" }
  ];

  const viewTypes = [
    { value: "sea", label: "Sea View" },
    { value: "mountain", label: "Mountain View" },
    { value: "city", label: "City View" },
    { value: "garden", label: "Garden View" },
    { value: "lake", label: "Lake View" },
    { value: "forest", label: "Forest View" }
  ];

  const ownershipTypes = [
    { value: "freehold", label: "Freehold" },
    { value: "leasehold", label: "Leasehold" },
    { value: "co-op", label: "Co-op" }
  ];

  const titleDeedStatus = [
    { value: "clear", label: "Clear" },
    { value: "in-process", label: "In Process" },
    { value: "shared", label: "Shared" }
  ];

  return (
    <div className="space-y-8">
      {/* Core Property Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Home className="h-5 w-5" />
          Core Property Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="listingTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Listing Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Modern 3-Bedroom Apartment in Central Barcelona" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pricePerSqm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (Per sqm or sqft)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="streetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full or partial address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="locationTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location Tags</FormLabel>
                <FormControl>
                  <Input placeholder="City, neighborhood, district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="availabilityStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availabilityStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Size & Dimensions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Size & Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="internalArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Internal Area (sqm/sqft)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 120" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plotSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lot Size / Plot Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 250" {...field} />
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
                <FormLabel>Number of Floors / Levels</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ceilingHeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ceiling Height (meters/feet)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3.2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floorNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Number (for apartments)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5th floor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="balconyArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Balcony / Terrace Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 15 sqm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Rooms & Layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Rooms & Layout
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="bedrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bathrooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="livingRooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Living Rooms / Lounges</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diningArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dining Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Separate dining room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    {kitchenTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="study"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Study / Office</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 study room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="utilityRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Utility Room / Laundry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Separate laundry room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="guestWC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest WC</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 guest toilet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maidsRoom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maid's Room</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., With en-suite" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Storage / Pantry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Walk-in pantry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Property Features & Equipment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Property Features & Equipment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="furnishing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Furnishing</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {furnishingOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
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
            name="flooringType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Flooring Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flooring" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {flooringTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="windows"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Windows</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Double-glazed, floor-to-ceiling" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="heatingSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heating System</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select heating type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {heatingTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="airConditioning"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooling System / AC</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Central AC, Split units" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smartHome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Smart Home / Automation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Smart lighting, security system" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="securitySystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Security System / CCTV</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 24/7 CCTV, alarm system" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parkingSpaces"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Parking Spaces</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="viewType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>View Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select view type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {viewTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Boolean Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          <FormField
            control={form.control}
            name="hasFireplace"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Fireplace
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasElevator"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Elevator / Lift Access
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasPrivateGarden"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Private Garden
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasBasement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Basement / Cellar
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasGarage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Garage / Carport
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="swimmingPool"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Swimming Pool</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pool type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No Pool</SelectItem>
                  {poolTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Building & Community Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Building className="h-5 w-5" />
          Building & Community Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="yearBuilt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Built</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2020" {...field} />
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
                <FormLabel>Year Renovated / Refit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="developer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Developer / Builder</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ABC Development Group" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buildingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Marina Towers" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalFloorsInBuilding"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Floors in Building</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfUnits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Units</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commonAreas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Common Areas</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Gym, Pool, Rooftop Lounge, Kids' Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="serviceCharges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Charges / HOA Fees</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $500/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="energyRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Energy Efficiency Rating</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., A+ rating" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Building Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          <FormField
            control={form.control}
            name="hasDoorman"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Doorman / Concierge
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="petsAllowed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Pets Allowed
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gatedCommunity"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Gated Community
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buildingSecurity"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Building Security
                </FormLabel>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Legal & Transactional Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Legal & Transactional Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ownershipType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ownership Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ownershipTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="titleDeedStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title Deed Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title deed status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {titleDeedStatus.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
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
            name="buildingPermit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Building Permit / Occupancy Certificate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Valid certificate available" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mortgageAvailability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mortgage Availability</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bank financing available" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tenancyInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tenancy Information</FormLabel>
                <FormControl>
                  <Input placeholder="For investment properties" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax / Transfer Fee Information</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3% transfer tax" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Location & Proximity */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location & Proximity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="walkScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Walk Score / Accessibility Rating</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 95/100 - Walker's Paradise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nearbyLandmarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nearby Landmarks</FormLabel>
                <FormControl>
                  <Input placeholder="Schools, Hospitals, Parks, Beaches" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transportLinks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport Links</FormLabel>
                <FormControl>
                  <Input placeholder="Metro, Highway Access, Airport Proximity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schoolCatchment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Catchment Areas</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Top-rated school district" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="distanceToCityCenter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance to City Center / Business District</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 15 minutes by metro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Agent & Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Agent & Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agencyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agency / Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Premium Properties Ltd" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., +1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="e.g., agent@agency.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., +1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agentLicense"
            render={({ field }) => (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., RE123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Optional Extras */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="h-5 w-5" />
          Optional Extras
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="openHouseDates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open House Dates</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Saturdays 2-4 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="propertyHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property History</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Last sold in 2019, renovated in 2021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rentalYield"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rental Yield Estimate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 6.5% annual yield" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="energyUtilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Energy & Utilities Breakdown</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $150/month average" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="noiseLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Noise Level / Environmental Score</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Quiet residential area, 8/10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="videoTestimonials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Testimonials</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Links to video testimonials or customer reviews..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}