import React, { useEffect } from "react";
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
  const propertyTypeOptions = [
    { category: "🏡 Single-Family Residential", options: [
      { value: "detached-house", label: "Detached House" },
      { value: "semi-detached-house", label: "Semi-Detached House" },
      { value: "bungalow", label: "Bungalow" },
      { value: "villa", label: "Villa" },
      { value: "cottage-cabin", label: "Cottage / Cabin" },
      { value: "townhouse-row-house", label: "Townhouse / Row House" },
      { value: "duplex-triplex-fourplex", label: "Duplex / Triplex / Fourplex" },
      { value: "farmhouse-country-house", label: "Farmhouse / Country House" },
      { value: "mansion-estate-home", label: "Mansion / Estate Home" }
    ]},
    { category: "🏙️ Multi-Family & Urban Living", options: [
      { value: "apartment-building", label: "Apartment Building" },
      { value: "condominium-tower", label: "Condominium Tower" },
      { value: "co-living-building", label: "Co-living Building" },
      { value: "student-housing-residence", label: "Student Housing Residence" },
      { value: "senior-living-facility", label: "Senior Living Facility / Assisted Living" },
      { value: "mixed-use-residential-tower", label: "Mixed-Use Residential Tower (residential + commercial)" }
    ]},
    { category: "🏬 Retail & Shopping", options: [
      { value: "retail-storefront", label: "Retail Storefront / High Street Shop" },
      { value: "shopping-center", label: "Shopping Center / Strip Mall" },
      { value: "department-store", label: "Department Store" },
      { value: "standalone-retail-building", label: "Standalone Retail Building" },
      { value: "convenience-store", label: "Convenience Store / Corner Shop" },
      { value: "supermarket-grocery-store", label: "Supermarket / Grocery Store" },
      { value: "showroom", label: "Showroom (e.g., furniture, cars)" }
    ]},
    { category: "🏢 Office & Administrative", options: [
      { value: "office-tower", label: "Office Tower / High-Rise" },
      { value: "business-center", label: "Business Center / Co-working Hub" },
      { value: "low-rise-office-building", label: "Low-Rise Office Building" },
      { value: "executive-suite-complex", label: "Executive Suite Complex" },
      { value: "medical-office-building", label: "Medical Office Building (MOB)" },
      { value: "government-building", label: "Government Building / Municipal Hall" },
      { value: "embassy", label: "Embassy / Diplomatic Mission" }
    ]},
    { category: "🏭 Industrial & Logistics", options: [
      { value: "warehouse-storage-facility", label: "Warehouse / Storage Facility" },
      { value: "distribution-center", label: "Distribution Center" },
      { value: "light-industrial-unit", label: "Light Industrial Unit" },
      { value: "heavy-manufacturing-plant", label: "Heavy Manufacturing Plant" },
      { value: "rd-facility", label: "R&D Facility (Research & Development)" },
      { value: "cold-storage-warehouse", label: "Cold Storage Warehouse" },
      { value: "data-center", label: "Data Center" },
      { value: "flex-building", label: "Flex Building (Warehouse + Office)" },
      { value: "logistics-hub", label: "Logistics Hub / Depot" }
    ]},
    { category: "🏨 Hospitality & Accommodation", options: [
      { value: "hotel", label: "Hotel (Luxury / Boutique / Business)" },
      { value: "motel", label: "Motel / Roadside Inn" },
      { value: "hostel", label: "Hostel" },
      { value: "bed-breakfast", label: "Bed & Breakfast (B&B)" },
      { value: "serviced-apartment-building", label: "Serviced Apartment Building" },
      { value: "resort-spa-complex", label: "Resort or Spa Complex" },
      { value: "aparthotel", label: "Aparthotel" }
    ]},
    { category: "🍽️ Food & Beverage", options: [
      { value: "restaurant-bistro", label: "Restaurant / Bistro" },
      { value: "cafe-coffee-shop", label: "Café / Coffee Shop" },
      { value: "fast-food-building", label: "Fast Food Building (QSR)" },
      { value: "drive-thru-location", label: "Drive-Thru Location" },
      { value: "ghost-kitchen", label: "Ghost Kitchen / Delivery-Only Facility" },
      { value: "brewery-winery", label: "Brewery / Winery / Tasting Room" }
    ]},
    { category: "🚧 Development & Investment", options: [
      { value: "bare-land", label: "Bare Land (Zoned Residential/Commercial/Industrial)" },
      { value: "mixed-use-development-site", label: "Mixed-Use Development Site" },
      { value: "urban-infill-lot", label: "Urban Infill Lot" },
      { value: "brownfield-redevelopment", label: "Brownfield / Redevelopment Site" },
      { value: "greenfield-land", label: "Greenfield Land" },
      { value: "build-to-suit-building", label: "Build-to-Suit Building" }
    ]},
    { category: "🚑 Health & Wellness", options: [
      { value: "hospital-clinic", label: "Hospital / Clinic" },
      { value: "dental-surgery", label: "Dental Surgery / Medical Practice" },
      { value: "rehabilitation-center", label: "Rehabilitation Center" },
      { value: "wellness-center", label: "Wellness Center / Spa" },
      { value: "veterinary-clinic", label: "Veterinary Clinic" }
    ]},
    { category: "🎓 Education & Training", options: [
      { value: "school-kindergarten", label: "School / Kindergarten" },
      { value: "university-building", label: "University Building" },
      { value: "training-center", label: "Training Center" },
      { value: "library-learning-hub", label: "Library / Learning Hub" },
      { value: "daycare-center", label: "Daycare Center" }
    ]},
    { category: "🛐 Civic & Religious", options: [
      { value: "church-temple-mosque", label: "Church / Temple / Mosque" },
      { value: "community-center", label: "Community Center" },
      { value: "town-hall", label: "Town Hall / Civic Hall" },
      { value: "cultural-center", label: "Cultural Center" }
    ]},
    { category: "🎭 Leisure, Sports & Events", options: [
      { value: "cinema-movie-theater", label: "Cinema / Movie Theater" },
      { value: "nightclub-bar", label: "Nightclub / Bar" },
      { value: "bowling-alley", label: "Bowling Alley / Arcade" },
      { value: "sports-complex", label: "Sports Complex / Gym / Fitness Center" },
      { value: "stadium-arena", label: "Stadium / Arena" },
      { value: "event-hall", label: "Event Hall / Banquet Hall" },
      { value: "music-venue", label: "Music Venue / Performance Theater" }
    ]},
    { category: "🚗 Auto & Transport", options: [
      { value: "auto-dealership", label: "Auto Dealership" },
      { value: "service-garage", label: "Service Garage / Mechanic Shop" },
      { value: "gas-station", label: "Gas Station / Petrol Station" },
      { value: "trucking-depot", label: "Trucking Depot" },
      { value: "car-wash", label: "Car Wash" },
      { value: "parking-garage", label: "Parking Garage / Lot" }
    ]},
    { category: "🛥️ Marine & Aviation", options: [
      { value: "marina-dry-dock", label: "Marina / Dry Dock / Boatyard" },
      { value: "yacht-club-facility", label: "Yacht Club Facility" },
      { value: "hangar-airstrip", label: "Hangar / Airstrip / Private Airport Terminal" }
    ]}
  ];

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

  const areaUnits = [
    { value: "sqm", label: "sqm" },
    { value: "sqft", label: "sqft" }
  ];

  const lengthUnits = [
    { value: "meters", label: "meters" },
    { value: "feet", label: "feet" }
  ];

  // Watch for changes in price fields and internal area to auto-calculate price per unit
  const watchedPrice = form.watch("price");
  const watchedSalePrice = form.watch("salePrice");
  const watchedInternalArea = form.watch("internalArea");
  const watchedPlotSize = form.watch("plotSize");

  useEffect(() => {
    // Use sale price if available, otherwise use regular price
    const price = watchedSalePrice || watchedPrice;
    const area = watchedInternalArea;
    
    if (price && area && !isNaN(parseFloat(price)) && !isNaN(parseFloat(area))) {
      const calculation = parseFloat(price) / parseFloat(area);
      const roundedResult = Math.round(calculation * 100) / 100; // Round to 2 decimal places
      form.setValue("pricePerSqm", roundedResult.toString());
    } else if (!price || !area) {
      // Clear the field if either price or area is empty
      form.setValue("pricePerSqm", "");
    }
  }, [watchedPrice, watchedSalePrice, watchedInternalArea, form]);

  useEffect(() => {
    // Calculate plot area price per unit
    const price = watchedSalePrice || watchedPrice;
    const plotArea = watchedPlotSize;
    
    if (price && plotArea && !isNaN(parseFloat(price)) && !isNaN(parseFloat(plotArea))) {
      const calculation = parseFloat(price) / parseFloat(plotArea);
      const roundedResult = Math.round(calculation * 100) / 100; // Round to 2 decimal places
      form.setValue("plotAreaPricePerUnit", roundedResult.toString());
    } else if (!price || !plotArea) {
      // Clear the field if either price or plot area is empty
      form.setValue("plotAreaPricePerUnit", "");
    }
  }, [watchedPrice, watchedSalePrice, watchedPlotSize, form]);

  return (
    <div className="space-y-8">
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

      {/* Size & Dimensions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Ruler className="h-5 w-5" />
          Size & Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="internalArea"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Internal Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 120" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="internalAreaUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="plotSize"
              render={({ field }) => (
                <FormItem className="col-span-2">
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
              name="plotSizeUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="ceilingHeight"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Ceiling Height</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3.2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ceilingHeightUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lengthUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="balconyArea"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Balcony / Terrace Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="balconyAreaUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
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
      </div>

      {/* Core Property Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Home className="h-5 w-5" />
          Core Property Details
        </h3>
        
        {/* Property Type Field */}
        <FormField
          control={form.control}
          name="realEstatePropertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {propertyTypeOptions.map((category) => (
                    <SelectGroup key={category.category}>
                      <SelectLabel>{category.category}</SelectLabel>
                      {category.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="pricePerSqm"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Built area Price per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pricePerUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="plotAreaPricePerUnit"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Plot area price per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plotAreaPricePerUnitUnit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map((unit) => (
                        <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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