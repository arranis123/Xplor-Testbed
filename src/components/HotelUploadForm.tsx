import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Users, DollarSign, Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, Dumbbell, Tv, Wind } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface HotelUploadFormProps {
  form: UseFormReturn<any>;
}

export function HotelUploadForm({ form }: HotelUploadFormProps) {
  const hotelPropertyTypes = [
    { value: "hotel-room", label: "Hotel Room – Standard guest room in a traditional hotel" },
    { value: "boutique-hotel", label: "Boutique Hotel – Stylish, smaller hotel with personalized service" },
    { value: "resort", label: "Resort – Full-service property with leisure amenities (pools, restaurants, etc.)" },
    { value: "aparthotel", label: "Aparthotel – Apartment-style rooms with hotel services (kitchenette, cleaning)" },
    { value: "hostel", label: "Hostel – Budget lodging, often with shared dormitories" },
    { value: "motel", label: "Motel – Roadside lodging with easy car access" },
    { value: "guesthouse", label: "Guesthouse – Small, privately owned accommodation" },
    { value: "inn", label: "Inn – Traditional and cozy lodging, often with breakfast" },
    { value: "bed-and-breakfast", label: "Bed and Breakfast (B&B) – Home-like stay with breakfast included" },
    { value: "capsule-hotel", label: "Capsule Hotel – Compact, pod-style sleeping spaces" },
    { value: "luxury-hotel", label: "Luxury Hotel – High-end property with premium features and services" },
    { value: "business-hotel", label: "Business Hotel – Designed for professionals and travelers" },
    { value: "extended-stay-hotel", label: "Extended Stay Hotel – Equipped for long-term stays with self-service features" },
    { value: "eco-hotel", label: "Eco-Hotel – Environmentally sustainable lodging" },
    { value: "casino-hotel", label: "Casino Hotel – Hotel with integrated casino and entertainment" },
  ];

  const hotelAmenities = [
    { id: "wifi", label: "Free WiFi", icon: Wifi },
    { id: "parking", label: "Free Parking", icon: Car },
    { id: "breakfast", label: "Free Breakfast", icon: Coffee },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "fitness", label: "Fitness Center", icon: Dumbbell },
    { id: "spa", label: "Spa Services", icon: Bath },
    { id: "tv", label: "Cable/Satellite TV", icon: Tv },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "room-service", label: "24-Hour Room Service", icon: Coffee },
    { id: "concierge", label: "Concierge Service", icon: Users },
    { id: "business-center", label: "Business Center", icon: Wifi },
    { id: "laundry", label: "Laundry Service", icon: Bath },
    { id: "airport-shuttle", label: "Airport Shuttle", icon: Car },
    { id: "bar", label: "Bar/Lounge", icon: Coffee },
  ];

  const hotelRoomTypes = [
    { value: "standard", label: "Standard Room" },
    { value: "deluxe", label: "Deluxe Room" },
    { value: "suite", label: "Suite" },
    { value: "junior-suite", label: "Junior Suite" },
    { value: "executive", label: "Executive Room" },
    { value: "presidential", label: "Presidential Suite" },
    { value: "penthouse", label: "Penthouse Suite" },
    { value: "family", label: "Family Room" },
    { value: "connecting", label: "Connecting Rooms" },
    { value: "accessible", label: "Accessible Room" },
  ];

  return (
    <div className="space-y-6">
      {/* Basic Hotel Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Hotel Information
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select hotel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80">
                    {hotelPropertyTypes.map((type) => (
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

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hotelStarRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Star Rating
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select star rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="boutique">Boutique (No Rating)</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelChain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Chain (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Marriott, Hilton, Independent" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Room Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Room Details
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hotelRoomTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedConfiguration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bed Configuration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select bed type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="single">1 Single Bed</SelectItem>
                    <SelectItem value="double">1 Double Bed</SelectItem>
                    <SelectItem value="queen">1 Queen Bed</SelectItem>
                    <SelectItem value="king">1 King Bed</SelectItem>
                    <SelectItem value="twin">2 Twin Beds</SelectItem>
                    <SelectItem value="double-double">2 Double Beds</SelectItem>
                    <SelectItem value="queen-queen">2 Queen Beds</SelectItem>
                    <SelectItem value="multiple">Multiple Beds</SelectItem>
                    <SelectItem value="sofa-bed">Sofa Bed Available</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxOccupancy"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Max Occupancy
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select max guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[...Array(10)].map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1} {i === 0 ? 'guest' : 'guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="roomSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room Size (sq ft)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 350" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floorLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Floor Level</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5th Floor" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Pricing Information
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="averageNightlyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Average Nightly Rate</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., $150" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seasonalPricing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seasonal Pricing</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select pricing type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Rate Year-Round</SelectItem>
                    <SelectItem value="seasonal">Seasonal Variations</SelectItem>
                    <SelectItem value="dynamic">Dynamic Pricing</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minimumStay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Stay</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border">
                      <SelectValue placeholder="Select minimum stay" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Night</SelectItem>
                    <SelectItem value="2">2 Nights</SelectItem>
                    <SelectItem value="3">3 Nights</SelectItem>
                    <SelectItem value="7">1 Week</SelectItem>
                    <SelectItem value="30">1 Month</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Hotel Amenities */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Hotel Amenities</h3>
        <FormField
          control={form.control}
          name="hotelAmenities"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {hotelAmenities.map((amenity) => (
                  <FormField
                    key={amenity.id}
                    control={form.control}
                    name="hotelAmenities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={amenity.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(amenity.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, amenity.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== amenity.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                            <amenity.icon className="h-4 w-4" />
                            {amenity.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Special Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Special Features & Policies</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkInTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-in Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3:00 PM" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOutTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-out Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 11:00 AM" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="hotelPolicies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Policies & Restrictions</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g., No smoking, Pet policy, Age restrictions, etc."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nearbyAttractions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nearby Attractions & Landmarks</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="e.g., 5 minutes to Central Park, Walking distance to Times Square..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}