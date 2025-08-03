import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Home, MapPin, Ruler, Bed, Bath, Car, Wrench, Shield, Leaf, Calendar, Phone, Star, Plus, X, Upload, Link } from "lucide-react";
interface RealEstatePropertyFormProps {
  form: UseFormReturn<any>;
}
export function RealEstatePropertyForm({
  form
}: RealEstatePropertyFormProps) {
  // State for dynamic sections
  const [propertyFeatures, setPropertyFeatures] = useState([{
    name: '',
    description: ''
  }]);
  const [roomTypes, setRoomTypes] = useState([{
    name: '',
    size: '',
    description: ''
  }]);

  // State for media uploads
  const [propertyVirtualTours, setPropertyVirtualTours] = useState([{
    name: '',
    url: '',
    file: null
  }]);
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [propertyVideos, setPropertyVideos] = useState([]);
  const [propertyDroneFootage, setPropertyDroneFootage] = useState([]);
  const [propertyFloorPlans, setPropertyFloorPlans] = useState([]);
  const [propertyDocuments, setPropertyDocuments] = useState([]);
  const [featureMedia, setFeatureMedia] = useState({});
  const [roomMedia, setRoomMedia] = useState({});

  // Helper functions for media management
  const addPropertyVirtualTour = () => {
    setPropertyVirtualTours([...propertyVirtualTours, {
      name: '',
      url: '',
      file: null
    }]);
  };
  const removePropertyVirtualTour = (index: number) => {
    setPropertyVirtualTours(propertyVirtualTours.filter((_, i) => i !== index));
  };
  const updatePropertyVirtualTour = (index: number, field: string, value: any) => {
    const updated = [...propertyVirtualTours];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    setPropertyVirtualTours(updated);
  };
  const addPropertyFeature = () => {
    setPropertyFeatures([...propertyFeatures, {
      name: '',
      description: ''
    }]);
  };
  const removePropertyFeature = (index: number) => {
    setPropertyFeatures(propertyFeatures.filter((_, i) => i !== index));
  };
  const addRoomType = () => {
    setRoomTypes([...roomTypes, {
      name: '',
      size: '',
      description: ''
    }]);
  };
  const removeRoomType = (index: number) => {
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
  };
  const propertyTypeOptions = [{
    category: "🏡 Single-Family Residential",
    options: [{
      value: "detached-house",
      label: "Detached House"
    }, {
      value: "semi-detached-house",
      label: "Semi-Detached House"
    }, {
      value: "bungalow",
      label: "Bungalow"
    }, {
      value: "villa",
      label: "Villa"
    }, {
      value: "cottage-cabin",
      label: "Cottage / Cabin"
    }, {
      value: "townhouse-row-house",
      label: "Townhouse / Row House"
    }, {
      value: "duplex-triplex-fourplex",
      label: "Duplex / Triplex / Fourplex"
    }, {
      value: "farmhouse-country-house",
      label: "Farmhouse / Country House"
    }, {
      value: "mansion-estate-home",
      label: "Mansion / Estate Home"
    }]
  }, {
    category: "🏙️ Multi-Family & Urban Living",
    options: [{
      value: "apartment-building",
      label: "Apartment Building"
    }, {
      value: "condominium-tower",
      label: "Condominium Tower"
    }, {
      value: "co-living-building",
      label: "Co-living Building"
    }, {
      value: "student-housing-residence",
      label: "Student Housing Residence"
    }, {
      value: "senior-living-facility",
      label: "Senior Living Facility / Assisted Living"
    }, {
      value: "mixed-use-residential-tower",
      label: "Mixed-Use Residential Tower (residential + commercial)"
    }]
  }, {
    category: "🏬 Retail & Shopping",
    options: [{
      value: "retail-storefront",
      label: "Retail Storefront / High Street Shop"
    }, {
      value: "shopping-center",
      label: "Shopping Center / Strip Mall"
    }, {
      value: "department-store",
      label: "Department Store"
    }, {
      value: "standalone-retail-building",
      label: "Standalone Retail Building"
    }, {
      value: "convenience-store",
      label: "Convenience Store / Corner Shop"
    }, {
      value: "supermarket-grocery-store",
      label: "Supermarket / Grocery Store"
    }, {
      value: "showroom",
      label: "Showroom (e.g., furniture, cars)"
    }]
  }, {
    category: "🏢 Office & Administrative",
    options: [{
      value: "office-tower",
      label: "Office Tower / High-Rise"
    }, {
      value: "business-center",
      label: "Business Center / Co-working Hub"
    }, {
      value: "low-rise-office-building",
      label: "Low-Rise Office Building"
    }, {
      value: "executive-suite-complex",
      label: "Executive Suite Complex"
    }, {
      value: "medical-office-building",
      label: "Medical Office Building (MOB)"
    }, {
      value: "government-building",
      label: "Government Building / Municipal Hall"
    }, {
      value: "embassy",
      label: "Embassy / Diplomatic Mission"
    }]
  }, {
    category: "🏭 Industrial & Logistics",
    options: [{
      value: "warehouse-storage-facility",
      label: "Warehouse / Storage Facility"
    }, {
      value: "distribution-center",
      label: "Distribution Center"
    }, {
      value: "light-industrial-unit",
      label: "Light Industrial Unit"
    }, {
      value: "heavy-manufacturing-plant",
      label: "Heavy Manufacturing Plant"
    }, {
      value: "rd-facility",
      label: "R&D Facility (Research & Development)"
    }, {
      value: "cold-storage-warehouse",
      label: "Cold Storage Warehouse"
    }, {
      value: "data-center",
      label: "Data Center"
    }, {
      value: "flex-building",
      label: "Flex Building (Warehouse + Office)"
    }, {
      value: "logistics-hub",
      label: "Logistics Hub / Depot"
    }]
  }, {
    category: "🏨 Hospitality & Accommodation",
    options: [{
      value: "hotel",
      label: "Hotel (Luxury / Boutique / Business)"
    }, {
      value: "motel",
      label: "Motel / Roadside Inn"
    }, {
      value: "hostel",
      label: "Hostel"
    }, {
      value: "bed-breakfast",
      label: "Bed & Breakfast (B&B)"
    }, {
      value: "serviced-apartment-building",
      label: "Serviced Apartment Building"
    }, {
      value: "resort-spa-complex",
      label: "Resort or Spa Complex"
    }, {
      value: "aparthotel",
      label: "Aparthotel"
    }]
  }, {
    category: "🍽️ Food & Beverage",
    options: [{
      value: "restaurant-bistro",
      label: "Restaurant / Bistro"
    }, {
      value: "cafe-coffee-shop",
      label: "Café / Coffee Shop"
    }, {
      value: "fast-food-building",
      label: "Fast Food Building (QSR)"
    }, {
      value: "drive-thru-location",
      label: "Drive-Thru Location"
    }, {
      value: "ghost-kitchen",
      label: "Ghost Kitchen / Delivery-Only Facility"
    }, {
      value: "brewery-winery",
      label: "Brewery / Winery / Tasting Room"
    }]
  }, {
    category: "🚧 Development & Investment",
    options: [{
      value: "bare-land",
      label: "Bare Land (Zoned Residential/Commercial/Industrial)"
    }, {
      value: "mixed-use-development-site",
      label: "Mixed-Use Development Site"
    }, {
      value: "urban-infill-lot",
      label: "Urban Infill Lot"
    }, {
      value: "brownfield-redevelopment",
      label: "Brownfield / Redevelopment Site"
    }, {
      value: "greenfield-land",
      label: "Greenfield Land"
    }, {
      value: "build-to-suit-building",
      label: "Build-to-Suit Building"
    }]
  }, {
    category: "🚑 Health & Wellness",
    options: [{
      value: "hospital-clinic",
      label: "Hospital / Clinic"
    }, {
      value: "dental-surgery",
      label: "Dental Surgery / Medical Practice"
    }, {
      value: "rehabilitation-center",
      label: "Rehabilitation Center"
    }, {
      value: "wellness-center",
      label: "Wellness Center / Spa"
    }, {
      value: "veterinary-clinic",
      label: "Veterinary Clinic"
    }]
  }, {
    category: "🎓 Education & Training",
    options: [{
      value: "school-kindergarten",
      label: "School / Kindergarten"
    }, {
      value: "university-building",
      label: "University Building"
    }, {
      value: "training-center",
      label: "Training Center"
    }, {
      value: "library-learning-hub",
      label: "Library / Learning Hub"
    }, {
      value: "daycare-center",
      label: "Daycare Center"
    }]
  }, {
    category: "🛐 Civic & Religious",
    options: [{
      value: "church-temple-mosque",
      label: "Church / Temple / Mosque"
    }, {
      value: "community-center",
      label: "Community Center"
    }, {
      value: "town-hall",
      label: "Town Hall / Civic Hall"
    }, {
      value: "cultural-center",
      label: "Cultural Center"
    }]
  }, {
    category: "🎭 Leisure, Sports & Events",
    options: [{
      value: "cinema-movie-theater",
      label: "Cinema / Movie Theater"
    }, {
      value: "nightclub-bar",
      label: "Nightclub / Bar"
    }, {
      value: "bowling-alley",
      label: "Bowling Alley / Arcade"
    }, {
      value: "sports-complex",
      label: "Sports Complex / Gym / Fitness Center"
    }, {
      value: "stadium-arena",
      label: "Stadium / Arena"
    }, {
      value: "event-hall",
      label: "Event Hall / Banquet Hall"
    }, {
      value: "music-venue",
      label: "Music Venue / Performance Theater"
    }]
  }, {
    category: "🚗 Auto & Transport",
    options: [{
      value: "auto-dealership",
      label: "Auto Dealership"
    }, {
      value: "service-garage",
      label: "Service Garage / Mechanic Shop"
    }, {
      value: "gas-station",
      label: "Gas Station / Petrol Station"
    }, {
      value: "trucking-depot",
      label: "Trucking Depot"
    }, {
      value: "car-wash",
      label: "Car Wash"
    }, {
      value: "parking-garage",
      label: "Parking Garage / Lot"
    }]
  }, {
    category: "🛥️ Marine & Aviation",
    options: [{
      value: "marina-dry-dock",
      label: "Marina / Dry Dock / Boatyard"
    }, {
      value: "yacht-club-facility",
      label: "Yacht Club Facility"
    }, {
      value: "hangar-airstrip",
      label: "Hangar / Airstrip / Private Airport Terminal"
    }]
  }];
  const availabilityStatusOptions = [{
    value: "available",
    label: "Available"
  }, {
    value: "under-offer",
    label: "Under Offer"
  }, {
    value: "sold",
    label: "Sold"
  }, {
    value: "let-agreed",
    label: "Let Agreed"
  }];
  const kitchenTypes = [{
    value: "open",
    label: "Open Kitchen"
  }, {
    value: "closed",
    label: "Closed Kitchen"
  }, {
    value: "fully-fitted",
    label: "Fully Fitted"
  }, {
    value: "american",
    label: "American Kitchen"
  }];
  const furnishingOptions = [{
    value: "unfurnished",
    label: "Unfurnished"
  }, {
    value: "semi-furnished",
    label: "Semi-furnished"
  }, {
    value: "fully-furnished",
    label: "Fully furnished"
  }];
  const flooringTypes = [{
    value: "marble",
    label: "Marble"
  }, {
    value: "wood",
    label: "Wood"
  }, {
    value: "ceramic",
    label: "Ceramic"
  }, {
    value: "laminate",
    label: "Laminate"
  }, {
    value: "tile",
    label: "Tile"
  }, {
    value: "carpet",
    label: "Carpet"
  }];
  const heatingTypes = [{
    value: "central",
    label: "Central Heating"
  }, {
    value: "radiators",
    label: "Radiators"
  }, {
    value: "underfloor",
    label: "Underfloor Heating"
  }, {
    value: "electric",
    label: "Electric Heating"
  }];
  const poolTypes = [{
    value: "private",
    label: "Private Pool"
  }, {
    value: "shared",
    label: "Shared Pool"
  }, {
    value: "infinity",
    label: "Infinity Pool"
  }, {
    value: "indoor",
    label: "Indoor Pool"
  }];
  const viewTypes = [{
    value: "sea",
    label: "Sea View"
  }, {
    value: "mountain",
    label: "Mountain View"
  }, {
    value: "city",
    label: "City View"
  }, {
    value: "garden",
    label: "Garden View"
  }, {
    value: "lake",
    label: "Lake View"
  }, {
    value: "forest",
    label: "Forest View"
  }];
  const ownershipTypes = [{
    value: "freehold",
    label: "Freehold"
  }, {
    value: "leasehold",
    label: "Leasehold"
  }, {
    value: "co-op",
    label: "Co-op"
  }];
  const titleDeedStatus = [{
    value: "clear",
    label: "Clear"
  }, {
    value: "in-process",
    label: "In Process"
  }, {
    value: "shared",
    label: "Shared"
  }];
  const areaUnits = [{
    value: "sqm",
    label: "sqm"
  }, {
    value: "sqft",
    label: "sqft"
  }];
  const lengthUnits = [{
    value: "meters",
    label: "meters"
  }, {
    value: "feet",
    label: "feet"
  }];

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
  return <Tabs defaultValue="property-details" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="property-details">Property Details</TabsTrigger>
        <TabsTrigger value="property-features">Property Features</TabsTrigger>
        <TabsTrigger value="room-types">Room Types</TabsTrigger>
        <TabsTrigger value="media-files">Media & Files</TabsTrigger>
        <TabsTrigger value="agent-info">Agent Info</TabsTrigger>
      </TabsList>

      <TabsContent value="property-details" className="space-y-8">
      {/* Rooms & Layout */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Rooms & Layout
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField control={form.control} name="bedrooms" render={({
            field
          }) => <FormItem>
                <FormLabel>Number of Bedrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="bathrooms" render={({
            field
          }) => <FormItem>
                <FormLabel>Number of Bathrooms</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="livingRooms" render={({
            field
          }) => <FormItem>
                <FormLabel>Living Rooms / Lounges</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="diningArea" render={({
            field
          }) => <FormItem>
                <FormLabel>Dining Area</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Separate dining room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="kitchenType" render={({
            field
          }) => <FormItem>
                <FormLabel>Kitchen Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select kitchen type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {kitchenTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="study" render={({
            field
          }) => <FormItem>
                <FormLabel>Study / Office</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 study room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="utilityRoom" render={({
            field
          }) => <FormItem>
                <FormLabel>Utility Room / Laundry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Separate laundry room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="guestWC" render={({
            field
          }) => <FormItem>
                <FormLabel>Guest WC</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 guest toilet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="maidsRoom" render={({
            field
          }) => <FormItem>
                <FormLabel>Maid's Room</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., With en-suite" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="storage" render={({
            field
          }) => <FormItem>
                <FormLabel>Storage / Pantry</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Walk-in pantry" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
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
            <FormField control={form.control} name="internalArea" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Internal Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 120" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="internalAreaUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormField control={form.control} name="plotSize" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Lot Size / Plot Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 250" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="plotSizeUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
          </div>

          <FormField control={form.control} name="numberOfFloors" render={({
            field
          }) => <FormItem>
                <FormLabel>Number of Floors / Levels</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <div className="grid grid-cols-3 gap-2">
            <FormField control={form.control} name="ceilingHeight" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Ceiling Height</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3.2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="ceilingHeightUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lengthUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
          </div>

          <FormField control={form.control} name="floorNumber" render={({
            field
          }) => <FormItem>
                <FormLabel>Floor Number (for apartments)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5th floor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <div className="grid grid-cols-3 gap-2">
            <FormField control={form.control} name="balconyArea" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Balcony / Terrace Area</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="balconyAreaUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
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
        <FormField control={form.control} name="realEstatePropertyType" render={({
          field
        }) => <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {propertyTypeOptions.map(category => <SelectGroup key={category.category}>
                      <SelectLabel>{category.category}</SelectLabel>
                      {category.options.map(option => <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>)}
                    </SelectGroup>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-3 gap-2">
            <FormField control={form.control} name="pricePerSqm" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Built area Price per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 3500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="pricePerUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <FormField control={form.control} name="plotAreaPricePerUnit" render={({
              field
            }) => <FormItem className="col-span-2">
                  <FormLabel>Plot area price per unit</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <FormField control={form.control} name="plotAreaPricePerUnitUnit" render={({
              field
            }) => <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areaUnits.map(unit => <SelectItem key={unit.value} value={unit.value}>
                          {unit.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
          </div>

          <FormField control={form.control} name="availabilityStatus" render={({
            field
          }) => <FormItem>
                <FormLabel>Availability Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availabilityStatusOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />
        </div>
      </div>

      {/* Property Features & Equipment */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Property Features & Equipment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField control={form.control} name="furnishing" render={({
            field
          }) => <FormItem>
                <FormLabel>Furnishing</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnishing" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {furnishingOptions.map(option => <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="flooringType" render={({
            field
          }) => <FormItem>
                <FormLabel>Flooring Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select flooring" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {flooringTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="windows" render={({
            field
          }) => <FormItem>
                <FormLabel>Windows</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Double-glazed, floor-to-ceiling" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="heatingSystem" render={({
            field
          }) => <FormItem>
                <FormLabel>Heating System</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select heating type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {heatingTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="airConditioning" render={({
            field
          }) => <FormItem>
                <FormLabel>Cooling System / AC</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Central AC, Split units" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="smartHome" render={({
            field
          }) => <FormItem>
                <FormLabel>Smart Home / Automation</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Smart lighting, security system" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="securitySystem" render={({
            field
          }) => <FormItem>
                <FormLabel>Security System / CCTV</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 24/7 CCTV, alarm system" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="parkingSpaces" render={({
            field
          }) => <FormItem>
                <FormLabel>Number of Parking Spaces</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="viewType" render={({
            field
          }) => <FormItem>
                <FormLabel>View Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select view type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {viewTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />
        </div>

        {/* Boolean Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          <FormField control={form.control} name="hasFireplace" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Fireplace
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="hasElevator" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Elevator / Lift Access
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="hasPrivateGarden" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Private Garden
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="hasBasement" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Basement / Cellar
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="hasGarage" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Garage / Carport
                </FormLabel>
              </FormItem>} />
        </div>

        <FormField control={form.control} name="swimmingPool" render={({
          field
        }) => <FormItem>
              <FormLabel>Swimming Pool</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pool type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">No Pool</SelectItem>
                  {poolTypes.map(type => <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>)}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>} />
      </div>

      {/* Building & Community Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Building className="h-5 w-5" />
          Building & Community Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField control={form.control} name="yearRenovated" render={({
            field
          }) => <FormItem>
                <FormLabel>Year Renovated / Refit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2023" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="developer" render={({
            field
          }) => <FormItem>
                <FormLabel>Developer / Builder</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ABC Development Group" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="buildingName" render={({
            field
          }) => <FormItem>
                <FormLabel>Building Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Marina Towers" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="totalFloorsInBuilding" render={({
            field
          }) => <FormItem>
                <FormLabel>Total Floors in Building</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="numberOfUnits" render={({
            field
          }) => <FormItem>
                <FormLabel>Number of Units</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 150" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="commonAreas" render={({
            field
          }) => <FormItem>
                <FormLabel>Common Areas</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Gym, Pool, Rooftop Lounge, Kids' Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="serviceCharges" render={({
            field
          }) => <FormItem>
                <FormLabel>Service Charges / HOA Fees</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $500/month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="energyRating" render={({
            field
          }) => <FormItem>
                <FormLabel>Energy Efficiency Rating</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., A+ rating" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>

        {/* Building Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
          <FormField control={form.control} name="hasDoorman" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Doorman / Concierge
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="petsAllowed" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Pets Allowed
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="gatedCommunity" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Gated Community
                </FormLabel>
              </FormItem>} />

          <FormField control={form.control} name="buildingSecurity" render={({
            field
          }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Building Security
                </FormLabel>
              </FormItem>} />
        </div>
      </div>

      {/* Legal & Transactional Info */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Legal & Transactional Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField control={form.control} name="ownershipType" render={({
            field
          }) => <FormItem>
                <FormLabel>Ownership Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select ownership type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ownershipTypes.map(type => <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="titleDeedStatus" render={({
            field
          }) => <FormItem>
                <FormLabel>Title Deed Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select title deed status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {titleDeedStatus.map(status => <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="buildingPermit" render={({
            field
          }) => <FormItem>
                <FormLabel>Building Permit / Occupancy Certificate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Valid certificate available" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="mortgageAvailability" render={({
            field
          }) => <FormItem>
                <FormLabel>Mortgage Availability</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Bank financing available" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="tenancyInfo" render={({
            field
          }) => <FormItem>
                <FormLabel>Tenancy Information</FormLabel>
                <FormControl>
                  <Input placeholder="For investment properties" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="taxInfo" render={({
            field
          }) => <FormItem>
                <FormLabel>Tax / Transfer Fee Information</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3% transfer tax" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>
      </div>



      {/* Optional Extras */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Star className="h-5 w-5" />
          Optional Extras
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="openHouseDates" render={({
            field
          }) => <FormItem>
                <FormLabel>Open House Dates</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Saturdays 2-4 PM" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="propertyHistory" render={({
            field
          }) => <FormItem>
                <FormLabel>Property History</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Last sold in 2019, renovated in 2021" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="rentalYield" render={({
            field
          }) => <FormItem>
                <FormLabel>Rental Yield Estimate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 6.5% annual yield" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="energyUtilities" render={({
            field
          }) => <FormItem>
                <FormLabel>Energy & Utilities Breakdown</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $150/month average" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <FormField control={form.control} name="noiseLevel" render={({
            field
          }) => <FormItem>
                <FormLabel>Noise Level / Environmental Score</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Quiet residential area, 8/10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>} />
        </div>

        <FormField control={form.control} name="videoTestimonials" render={({
          field
        }) => <FormItem>
              <FormLabel>Video Testimonials</FormLabel>
              <FormControl>
                <Textarea placeholder="Links to video testimonials or customer reviews..." className="min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>} />
      </div>
      </TabsContent>

      <TabsContent value="property-features" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Property Features</CardTitle>
            <CardDescription>Defining the special features and amenities of your property will automatically create an upload section for each space that you want to showcase to help structure and manage your listing.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {propertyFeatures.map((feature, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  {propertyFeatures.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removePropertyFeature(index)}>
                      <X className="h-4 w-4" />
                    </Button>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Feature Name</label>
                    <Input placeholder="e.g., Swimming Pool, Garden" value={feature.name} onChange={e => {
                  const updated = [...propertyFeatures];
                  updated[index].name = e.target.value;
                  setPropertyFeatures(updated);
                }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Brief description" value={feature.description} onChange={e => {
                  const updated = [...propertyFeatures];
                  updated[index].description = e.target.value;
                  setPropertyFeatures(updated);
                }} />
                  </div>
                </div>
              </div>)}
            <Button type="button" variant="outline" onClick={addPropertyFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property Feature
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="room-types" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Room Types</CardTitle>
            <CardDescription>Define the different room types in your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roomTypes.map((room, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Room Type {index + 1}</h4>
                  {roomTypes.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removeRoomType(index)}>
                      <X className="h-4 w-4" />
                    </Button>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Room Name</label>
                    <Input placeholder="e.g., Master Bedroom, Living Room" value={room.name} onChange={e => {
                  const updated = [...roomTypes];
                  updated[index].name = e.target.value;
                  setRoomTypes(updated);
                }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Size</label>
                    <Input placeholder="e.g., 20 sqm" value={room.size} onChange={e => {
                  const updated = [...roomTypes];
                  updated[index].size = e.target.value;
                  setRoomTypes(updated);
                }} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input placeholder="Brief description" value={room.description} onChange={e => {
                  const updated = [...roomTypes];
                  updated[index].description = e.target.value;
                  setRoomTypes(updated);
                }} />
                  </div>
                </div>
              </div>)}
            <Button type="button" variant="outline" onClick={addRoomType}>
              <Plus className="h-4 w-4 mr-2" />
              Add Room Type
            </Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="media-files" className="space-y-6">
        {/* Property Media (Main Property) */}
        <Card>
          <CardHeader>
            <CardTitle>Property Media (Main Property)</CardTitle>
            <CardDescription>Upload general media assets that represent the property as a whole</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 360 Virtual Tours */}
            <div className="space-y-4">
              <h4 className="font-medium flex items-center gap-2">
                <Link className="h-4 w-4" />
                360 Virtual Tours
              </h4>
              {propertyVirtualTours.map((tour, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tour {index + 1}</span>
                    {propertyVirtualTours.length > 1 && <Button type="button" variant="ghost" size="sm" onClick={() => removePropertyVirtualTour(index)}>
                        <X className="h-4 w-4" />
                      </Button>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Tour Name</label>
                      <Input placeholder="e.g., Main Living Area Tour" value={tour.name} onChange={e => updatePropertyVirtualTour(index, 'name', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-sm font-medium">URL Link</label>
                      <Input placeholder="https://..." value={tour.url} onChange={e => updatePropertyVirtualTour(index, 'url', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">File Upload</label>
                    <Input type="file" accept=".mp4,.mov,.avi" onChange={e => updatePropertyVirtualTour(index, 'file', e.target.files?.[0])} />
                  </div>
                </div>)}
              <Button type="button" variant="outline" onClick={addPropertyVirtualTour}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Tour
              </Button>
            </div>

            {/* Photos */}
            <div className="space-y-4">
              <h4 className="font-medium">Photos</h4>
              <div>
                <label className="text-sm font-medium">Upload Photos</label>
                <Input type="file" multiple accept="image/*" />
              </div>
              <div>
                <label className="text-sm font-medium">Photo URLs</label>
                <Textarea placeholder="Enter photo URLs (one per line)" />
              </div>
            </div>

            {/* Videos */}
            <div className="space-y-4">
              <h4 className="font-medium">Videos</h4>
              <div>
                <label className="text-sm font-medium">Upload Videos</label>
                <Input type="file" multiple accept="video/*" />
              </div>
              <div>
                <label className="text-sm font-medium">Video URLs (YouTube, Vimeo)</label>
                <Textarea placeholder="Enter video URLs (one per line)" />
              </div>
            </div>

            {/* Drone Footage */}
            <div className="space-y-4">
              <h4 className="font-medium">Drone Footage</h4>
              <div>
                <label className="text-sm font-medium">Upload Drone Videos</label>
                <Input type="file" multiple accept="video/*" />
              </div>
              <div>
                <label className="text-sm font-medium">Drone Footage URLs</label>
                <Textarea placeholder="Enter drone footage URLs (one per line)" />
              </div>
            </div>

            {/* Floor Plans */}
            <div className="space-y-4">
              <h4 className="font-medium">Floor Plans</h4>
              <div>
                <label className="text-sm font-medium">Upload Floor Plans</label>
                <Input type="file" multiple accept=".pdf,.jpg,.png" />
              </div>
              <div>
                <label className="text-sm font-medium">Floor Plan URLs</label>
                <Textarea placeholder="Enter floor plan URLs (one per line)" />
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h4 className="font-medium">Documents</h4>
              <div>
                <label className="text-sm font-medium">Upload Documents</label>
                <Input type="file" multiple accept=".pdf,.doc,.docx" />
              </div>
              <div>
                <label className="text-sm font-medium">Document URLs</label>
                <Textarea placeholder="Enter document URLs (one per line)" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Features Media */}
        {propertyFeatures.length > 0 && propertyFeatures.some(feature => feature.name) && <Card>
            <CardHeader>
              <CardTitle>Media for Property Features</CardTitle>
              <CardDescription>Upload media for each property feature you've defined</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {propertyFeatures.filter(feature => feature.name).map((feature, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">{feature.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">360 Virtual Tours</label>
                      <Input type="file" accept="video/*" />
                      <Input placeholder="Tour URL" className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Photos</label>
                      <Input type="file" multiple accept="image/*" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Videos</label>
                      <Input type="file" multiple accept="video/*" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Drone Footage</label>
                      <Input type="file" multiple accept="video/*" />
                    </div>
                  </div>
                </div>)}
            </CardContent>
          </Card>}

        {/* Room Types Media */}
        {roomTypes.length > 0 && roomTypes.some(room => room.name) && <Card>
            <CardHeader>
              <CardTitle>Media for Room Types</CardTitle>
              <CardDescription>Upload media for each room type you've defined</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {roomTypes.filter(room => room.name).map((room, index) => <div key={index} className="border rounded-lg p-4 space-y-4">
                  <h4 className="font-medium">{room.name}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">360 Virtual Tour (Required)</label>
                      <Input type="file" accept="video/*" />
                      <Input placeholder="Tour URL" className="mt-2" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Room Photos</label>
                      <Input type="file" multiple accept="image/*" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Walkthrough Video</label>
                      <Input type="file" accept="video/*" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Floor Plan</label>
                      <Input type="file" accept=".pdf,.jpg,.png" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox />
                    <label className="text-sm">Mark as featured media for this room</label>
                  </div>
                </div>)}
            </CardContent>
          </Card>}

        {/* Save as Draft */}
        <div className="flex justify-center">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="agent-info" className="space-y-8">
        {/* Agent information content would go here */}
        <Card>
          <CardHeader>
            <CardTitle>Agent & Contact Information</CardTitle>
            <CardDescription>Enter agent details and contact information</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Agent form fields would be added here */}
            <p>Agent information form will be added here</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>;
}