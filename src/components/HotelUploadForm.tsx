import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bed, Bath, Users, DollarSign, Star, MapPin, Wifi, Car, Coffee, Utensils, Waves, Dumbbell, Tv, Wind, Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

interface HotelUploadFormProps {
  form: UseFormReturn<any>;
}

interface RoomProfile {
  id: string;
  roomType: string;
  bedConfiguration: string;
  maxOccupancy: string;
  roomSize: string;
  floorLevel: string;
  averageNightlyRate: string;
}

export function HotelUploadForm({ form }: HotelUploadFormProps) {
  const [roomProfiles, setRoomProfiles] = useState<RoomProfile[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Partial<RoomProfile>>({});

  const addRoomProfile = () => {
    if (currentRoom.roomType && currentRoom.bedConfiguration && currentRoom.maxOccupancy && currentRoom.averageNightlyRate) {
      const newRoom: RoomProfile = {
        id: Math.random().toString(36).substr(2, 9),
        roomType: currentRoom.roomType,
        bedConfiguration: currentRoom.bedConfiguration,
        maxOccupancy: currentRoom.maxOccupancy,
        roomSize: currentRoom.roomSize || '',
        floorLevel: currentRoom.floorLevel || '',
        averageNightlyRate: currentRoom.averageNightlyRate
      };
      setRoomProfiles([...roomProfiles, newRoom]);
      setCurrentRoom({});
    }
  };

  const removeRoomProfile = (id: string) => {
    setRoomProfiles(roomProfiles.filter(room => room.id !== id));
  };

  const getRoomTypeLabel = (value: string) => {
    return hotelRoomTypes.find(rt => rt.value === value)?.label.split(' – ')[0] || value;
  };

  const getBedConfigLabel = (value: string) => {
    const bedConfigs = {
      'single': '1 Single Bed',
      'double': '1 Double Bed',
      'queen': '1 Queen Bed',
      'king': '1 King Bed',
      'twin': '2 Twin Beds',
      'double-double': '2 Double Beds',
      'queen-queen': '2 Queen Beds',
      'multiple': 'Multiple Beds',
      'sofa-bed': 'Sofa Bed Available'
    };
    return bedConfigs[value as keyof typeof bedConfigs] || value;
  };
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
    // Standard Room Types (Common Across All Hotels)
    { value: "single-room", label: "Single Room – 1 single bed for 1 guest" },
    { value: "double-room", label: "Double Room – 1 double bed for 2 guests" },
    { value: "twin-room", label: "Twin Room – 2 single beds for 2 guests" },
    { value: "triple-room", label: "Triple Room – Beds for 3 guests (double + single or 3 singles)" },
    { value: "quad-room", label: "Quad Room – Beds for 4 guests" },
    { value: "king-room", label: "King Room – 1 king-sized bed" },
    { value: "queen-room", label: "Queen Room – 1 queen-sized bed" },
    { value: "family-room", label: "Family Room – Designed for families, often includes extra beds or sofa beds" },
    { value: "accessible-room", label: "Accessible Room – Wheelchair-accessible, includes assistive features" },
    { value: "connecting-rooms", label: "Connecting Rooms – Two rooms with an internal door between them" },
    { value: "adjoining-rooms", label: "Adjoining Rooms – Next to each other, but no internal door" },

    // Upgraded & Suite Room Types
    { value: "deluxe-room", label: "Deluxe Room – Larger or more upgraded standard room" },
    { value: "premier-room", label: "Premier Room – View, size, or amenity upgrade over Deluxe" },
    { value: "executive-room", label: "Executive Room – Often includes lounge access, suited to business travelers" },
    { value: "junior-suite", label: "Junior Suite – Includes a sitting area, typically open plan" },
    { value: "suite", label: "Suite – Separate living and bedroom areas" },
    { value: "executive-suite", label: "Executive Suite – Premium suite with work areas and VIP amenities" },
    { value: "presidential-suite", label: "Presidential Suite – One of the largest, most luxurious suites in the hotel" },
    { value: "royal-suite", label: "Royal Suite – Often the most prestigious suite; ultra-luxury" },
    { value: "penthouse-suite", label: "Penthouse Suite – Located on the top floor, often with private terraces" },
    { value: "duplex-suite", label: "Duplex Suite – Two-floor layout" },
    { value: "honeymoon-suite", label: "Honeymoon Suite – Romantic amenities, often with jacuzzi or private terrace" },
    { value: "bridal-suite", label: "Bridal Suite – Decorated for newlyweds, similar to honeymoon suite" },
    { value: "studio-suite", label: "Studio Suite – Open-plan room with kitchenette or sitting area" },
    { value: "family-suite", label: "Family Suite – Multi-room layout for family groups" },
    { value: "governor-suite", label: "Governor / Ambassador Suite – High-end suite, just below presidential tier" },

    // Resort-Specific & Luxury Room Types
    { value: "beachfront-room", label: "Beachfront Room / Suite – Direct access or view of the beach" },
    { value: "ocean-view-room", label: "Ocean View Room / Suite – Facing the sea, typically with balcony" },
    { value: "garden-view-room", label: "Garden View Room – Views of landscaped grounds" },
    { value: "mountain-lake-view", label: "Mountain / Lake View Room – Scenic natural vistas" },
    { value: "overwater-bungalow", label: "Overwater Bungalow / Villa – Built over water, typically in island resorts" },
    { value: "pool-villa", label: "Pool Villa – Private pool included" },
    { value: "plunge-pool-suite", label: "Plunge Pool Suite – Includes small private plunge pool" },
    { value: "jacuzzi-suite", label: "Jacuzzi Suite – Includes hot tub or in-room jacuzzi" },
    { value: "swim-up-room", label: "Swim-up Room – Direct access to pool from the room terrace" },
    { value: "private-villa", label: "Private Villa – Freestanding unit with private entrances" },
    { value: "tent-glamping-suite", label: "Tent / Glamping Suite – Luxury canvas or semi-permanent structures" },
    { value: "treehouse-villa", label: "Treehouse Villa – Elevated accommodation among trees" },
    { value: "cave-room-suite", label: "Cave Room / Suite – Built into or styled like natural caves" },
    { value: "igloo-ice-suite", label: "Igloo Room / Ice Suite – Seasonal, built from ice and snow" },

    // By Guest Type or Use Case
    { value: "business-room", label: "Business Room – Equipped with desk, fast Wi-Fi, ergonomic chair" },
    { value: "solo-traveler-room", label: "Solo Traveler Room – Smaller rooms with solo traveler rates" },
    { value: "couples-room", label: "Couples Room – Romantic setups with king beds and soft lighting" },
    { value: "family-room-guest", label: "Family Room / Suite – Includes multiple beds or bunk beds" },
    { value: "pet-friendly-room", label: "Pet-Friendly Room – Pet amenities and direct outdoor access" },
    { value: "wellness-suite", label: "Wellness Suite – In-room spa tools, yoga mats, or massage tables" },
    { value: "accessible-ada-room", label: "Accessible / ADA Room – Designed for disabled or limited mobility guests" },

    // Extended Stay / Apartment-Style Units
    { value: "studio-apartment", label: "Studio Apartment – Compact unit with kitchen and open layout" },
    { value: "1-bedroom-apartment", label: "1-Bedroom Apartment – Living room + separate bedroom" },
    { value: "2-bedroom-apartment", label: "2-Bedroom Apartment / Suite – For families or groups" },
    { value: "penthouse-apartment", label: "Penthouse Apartment – Luxury residential-style suite" },
    { value: "serviced-residence", label: "Serviced Residence – Apartment units with daily hotel services" },
    { value: "condo-hotel-units", label: "Condo-Hotel Units – For rent or ownership with full hotel access" },
  ];

  const hotelChains = [
    {
      category: "Marriott International", 
      options: [
        { value: "jw-marriott", label: "JW Marriott" },
        { value: "marriott-hotels", label: "Marriott Hotels & Resorts" },
        { value: "ritz-carlton", label: "Ritz-Carlton" },
        { value: "st-regis", label: "St. Regis" },
        { value: "w-hotels", label: "W Hotels" },
        { value: "luxury-collection", label: "The Luxury Collection" },
        { value: "sheraton", label: "Sheraton" },
        { value: "westin", label: "Westin" },
        { value: "le-meridien", label: "Le Méridien" },
        { value: "renaissance-hotels", label: "Renaissance Hotels" },
        { value: "autograph-collection", label: "Autograph Collection" },
        { value: "tribute-portfolio", label: "Tribute Portfolio" },
        { value: "four-points-sheraton", label: "Four Points by Sheraton" },
        { value: "ac-hotels", label: "AC Hotels" },
        { value: "moxy", label: "Moxy" },
        { value: "aloft", label: "Aloft" },
        { value: "courtyard-marriott", label: "Courtyard by Marriott" },
        { value: "residence-inn", label: "Residence Inn" },
        { value: "springhill-suites", label: "SpringHill Suites" },
        { value: "fairfield-inn", label: "Fairfield Inn & Suites" },
        { value: "towneplace-suites", label: "TownePlace Suites" },
        { value: "element", label: "Element" },
        { value: "marriott-executive", label: "Marriott Executive Apartments" },
        { value: "gaylord-hotels", label: "Gaylord Hotels" },
        { value: "delta-hotels", label: "Delta Hotels" }
      ]
    },
    {
      category: "Hilton Worldwide",
      options: [
        { value: "waldorf-astoria", label: "Waldorf Astoria" },
        { value: "conrad", label: "Conrad" },
        { value: "lxr-hotels", label: "LXR Hotels & Resorts" },
        { value: "hilton-hotels", label: "Hilton Hotels & Resorts" },
        { value: "curio-collection", label: "Curio Collection" },
        { value: "canopy-hilton", label: "Canopy by Hilton" },
        { value: "doubletree", label: "DoubleTree" },
        { value: "tapestry-collection", label: "Tapestry Collection" },
        { value: "hilton-garden-inn", label: "Hilton Garden Inn" },
        { value: "hampton-hilton", label: "Hampton by Hilton" },
        { value: "tru-hilton", label: "Tru by Hilton" },
        { value: "homewood-suites", label: "Homewood Suites" },
        { value: "home2-suites", label: "Home2 Suites" },
        { value: "motto-hilton", label: "Motto by Hilton" },
        { value: "tempo-hilton", label: "Tempo by Hilton" },
        { value: "signia-hilton", label: "Signia by Hilton" }
      ]
    },
    {
      category: "Hyatt Hotels Corporation",
      options: [
        { value: "park-hyatt", label: "Park Hyatt" },
        { value: "grand-hyatt", label: "Grand Hyatt" },
        { value: "andaz", label: "Andaz" },
        { value: "hyatt-regency", label: "Hyatt Regency" },
        { value: "hyatt-centric", label: "Hyatt Centric" },
        { value: "hyatt-place", label: "Hyatt Place" },
        { value: "hyatt-house", label: "Hyatt House" },
        { value: "unbound-collection", label: "The Unbound Collection" },
        { value: "destination-hyatt", label: "Destination by Hyatt" },
        { value: "thompson-hotels", label: "Thompson Hotels" },
        { value: "alila", label: "Alila" },
        { value: "joie-de-vivre", label: "Joie de Vivre" },
        { value: "caption-hyatt", label: "Caption by Hyatt" },
        { value: "miraval", label: "Miraval" },
        { value: "hyatt-ziva-zilara", label: "Hyatt Ziva / Hyatt Zilara (All-Inclusive)" }
      ]
    },
    {
      category: "Accor Group",
      options: [
        { value: "raffles", label: "Raffles" },
        { value: "fairmont", label: "Fairmont" },
        { value: "sofitel", label: "Sofitel" },
        { value: "pullman", label: "Pullman" },
        { value: "mgallery", label: "MGallery" },
        { value: "swissotel", label: "Swissôtel" },
        { value: "movenpick", label: "Mövenpick" },
        { value: "grand-mercure", label: "Grand Mercure" },
        { value: "novotel", label: "Novotel" },
        { value: "mercure", label: "Mercure" },
        { value: "ibis", label: "ibis" },
        { value: "ibis-styles", label: "ibis Styles" },
        { value: "ibis-budget", label: "ibis Budget" },
        { value: "adagio-aparthotels", label: "Adagio Aparthotels" },
        { value: "the-sebel", label: "The Sebel" },
        { value: "tribe", label: "Tribe" },
        { value: "25hours-hotels", label: "25hours Hotels" },
        { value: "mama-shelter", label: "Mama Shelter" },
        { value: "orient-express", label: "Orient Express (revival brand)" }
      ]
    },
    {
      category: "InterContinental Hotels Group (IHG)",
      options: [
        { value: "intercontinental", label: "InterContinental" },
        { value: "kimpton", label: "Kimpton" },
        { value: "regent-hotels", label: "Regent Hotels" },
        { value: "six-senses", label: "Six Senses" },
        { value: "hotel-indigo", label: "Hotel Indigo" },
        { value: "voco", label: "voco" },
        { value: "even-hotels", label: "EVEN Hotels" },
        { value: "hualuxe", label: "Hualuxe" },
        { value: "crowne-plaza", label: "Crowne Plaza" },
        { value: "holiday-inn", label: "Holiday Inn" },
        { value: "holiday-inn-express", label: "Holiday Inn Express" },
        { value: "holiday-inn-club", label: "Holiday Inn Club Vacations" },
        { value: "holiday-inn-resort", label: "Holiday Inn Resort" },
        { value: "avid", label: "Avid" },
        { value: "atwell-suites", label: "Atwell Suites" },
        { value: "staybridge-suites", label: "Staybridge Suites" },
        { value: "candlewood-suites", label: "Candlewood Suites" }
      ]
    },
    {
      category: "Radisson Hotel Group",
      options: [
        { value: "radisson-collection", label: "Radisson Collection" },
        { value: "radisson-blu", label: "Radisson Blu" },
        { value: "radisson-red", label: "Radisson RED" },
        { value: "radisson", label: "Radisson" },
        { value: "radisson-individuals", label: "Radisson Individuals" },
        { value: "park-plaza", label: "Park Plaza" },
        { value: "park-inn-radisson", label: "Park Inn by Radisson" },
        { value: "country-inn-suites", label: "Country Inn & Suites" }
      ]
    },
    {
      category: "Wyndham Hotels & Resorts",
      options: [
        { value: "wyndham-grand", label: "Wyndham Grand" },
        { value: "wyndham", label: "Wyndham" },
        { value: "dolce-hotels", label: "Dolce Hotels & Resorts" },
        { value: "tryp-wyndham", label: "TRYP by Wyndham" },
        { value: "esplendor", label: "Esplendor" },
        { value: "dazzler", label: "Dazzler" },
        { value: "ramada", label: "Ramada" },
        { value: "ramada-encore", label: "Ramada Encore" },
        { value: "wingate", label: "Wingate" },
        { value: "microtel", label: "Microtel" },
        { value: "hawthorn-suites", label: "Hawthorn Suites" },
        { value: "baymont-inn", label: "Baymont Inn & Suites" },
        { value: "days-inn", label: "Days Inn" },
        { value: "super-8", label: "Super 8" },
        { value: "howard-johnson", label: "Howard Johnson" },
        { value: "travelodge", label: "Travelodge" },
        { value: "americinn", label: "AmericInn" }
      ]
    },
    {
      category: "Choice Hotels International",
      options: [
        { value: "ascend-hotel", label: "Ascend Hotel Collection" },
        { value: "cambria-hotels", label: "Cambria Hotels" },
        { value: "clarion", label: "Clarion" },
        { value: "comfort-inn", label: "Comfort Inn / Comfort Suites" },
        { value: "quality-inn", label: "Quality Inn" },
        { value: "sleep-inn", label: "Sleep Inn" },
        { value: "mainstay-suites", label: "MainStay Suites" },
        { value: "suburban-studios", label: "Suburban Studios" },
        { value: "econo-lodge", label: "Econo Lodge" },
        { value: "rodeway-inn", label: "Rodeway Inn" },
        { value: "everhome-suites", label: "Everhome Suites" },
        { value: "woodspring-suites", label: "WoodSpring Suites" }
      ]
    },
    {
      category: "Four Seasons Hotels & Resorts",
      options: [
        { value: "four-seasons-hotels", label: "Four Seasons Hotels" },
        { value: "four-seasons-residences", label: "Four Seasons Private Residences" },
        { value: "four-seasons-yachts", label: "Four Seasons Yachts (in development)" }
      ]
    },
    {
      category: "Mandarin Oriental Hotel Group",
      options: [
        { value: "mandarin-oriental", label: "Mandarin Oriental Hotels (Luxury)" },
        { value: "residences-mandarin", label: "Residences at Mandarin Oriental" }
      ]
    },
    {
      category: "Rosewood Hotel Group",
      options: [
        { value: "rosewood-hotels", label: "Rosewood Hotels & Resorts" },
        { value: "new-world-hotels", label: "New World Hotels" },
        { value: "khos", label: "KHOS" }
      ]
    },
    {
      category: "Minor Hotels",
      options: [
        { value: "anantara", label: "Anantara" },
        { value: "avani", label: "Avani" },
        { value: "nh-hotels", label: "NH Hotels" },
        { value: "nh-collection", label: "NH Collection" },
        { value: "tivoli", label: "Tivoli" },
        { value: "oaks-hotels", label: "Oaks Hotels" },
        { value: "elewana-collection", label: "Elewana Collection" }
      ]
    },
    {
      category: "Langham Hospitality Group",
      options: [
        { value: "the-langham", label: "The Langham" },
        { value: "cordis-hotels", label: "Cordis Hotels" },
        { value: "yingnflo", label: "Ying'nFlo" }
      ]
    },
    {
      category: "Banyan Tree Holdings",
      options: [
        { value: "banyan-tree", label: "Banyan Tree" },
        { value: "angsana", label: "Angsana" },
        { value: "cassia", label: "Cassia" },
        { value: "dhawa", label: "Dhawa" },
        { value: "laguna", label: "Laguna" }
      ]
    },
    {
      category: "LVMH Hotel Management",
      options: [
        { value: "cheval-blanc", label: "Cheval Blanc" },
        { value: "belmond", label: "Belmond (formerly Orient-Express Hotels)" }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Room Details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Bed className="h-5 w-5" />
            Room Details
          </h3>
          <Button 
            type="button"
            onClick={addRoomProfile}
            className="px-4 py-2"
          >
            Add Room
          </Button>
        </div>
        
        {/* Room Input Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 border border-border rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Room Type</label>
            <Select 
              value={currentRoom.roomType || ""} 
              onValueChange={(value) => setCurrentRoom({...currentRoom, roomType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {hotelRoomTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label.split(' – ')[0]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Bed Configuration</label>
            <Select 
              value={currentRoom.bedConfiguration || ""} 
              onValueChange={(value) => setCurrentRoom({...currentRoom, bedConfiguration: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select bed configuration" />
              </SelectTrigger>
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
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Max Occupancy</label>
            <Select 
              value={currentRoom.maxOccupancy || ""} 
              onValueChange={(value) => setCurrentRoom({...currentRoom, maxOccupancy: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select max guests" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1} {i === 0 ? 'guest' : 'guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Room Size (sq ft)</label>
            <Input 
              placeholder="e.g., 350"
              value={currentRoom.roomSize || ""}
              onChange={(e) => setCurrentRoom({...currentRoom, roomSize: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Floor Level</label>
            <Input 
              placeholder="e.g., 5th Floor"
              value={currentRoom.floorLevel || ""}
              onChange={(e) => setCurrentRoom({...currentRoom, floorLevel: e.target.value})}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Average Nightly Rate</label>
            <Input 
              placeholder="e.g., $150"
              value={currentRoom.averageNightlyRate || ""}
              onChange={(e) => setCurrentRoom({...currentRoom, averageNightlyRate: e.target.value})}
            />
          </div>
        </div>

        {/* Room Profiles Table */}
        {roomProfiles.length > 0 && (
          <div className="mt-6">
            <h4 className="text-base font-medium mb-3">Added Room Profiles</h4>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Room Type</TableHead>
                    <TableHead>Bed Configuration</TableHead>
                    <TableHead>Max Occupancy</TableHead>
                    <TableHead>Room Size</TableHead>
                    <TableHead>Floor Level</TableHead>
                    <TableHead>Nightly Rate</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roomProfiles.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>{getRoomTypeLabel(room.roomType)}</TableCell>
                      <TableCell>{getBedConfigLabel(room.bedConfiguration)}</TableCell>
                      <TableCell>{room.maxOccupancy} guests</TableCell>
                      <TableCell>{room.roomSize || 'N/A'}</TableCell>
                      <TableCell>{room.floorLevel || 'N/A'}</TableCell>
                      <TableCell>{room.averageNightlyRate}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => removeRoomProfile(room.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Property Information</h3>
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-border">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
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

      {/* Hotel Chain */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="hotelChain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hotel Chain (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-2 border-border">
                    <SelectValue placeholder="Select hotel chain" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {hotelChains.map((chain) => (
                    <SelectGroup key={chain.category}>
                      <SelectLabel>{chain.category}</SelectLabel>
                      {chain.options.map((option) => (
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

    </div>
  );
}