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
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const hotelCategories = [
    { value: "business-hotel", label: "Business Hotel" },
    { value: "resort-hotel", label: "Resort Hotel" },
    { value: "boutique-hotel", label: "Boutique Hotel" },
    { value: "airport-hotel", label: "Airport Hotel" },
    { value: "conference-convention", label: "Conference / Convention Hotel" },
    { value: "extended-stay", label: "Extended Stay Hotel" },
    { value: "casino-hotel", label: "Casino Hotel" },
    { value: "all-inclusive", label: "All-Inclusive Hotel" },
    { value: "timeshare", label: "Timeshare / Vacation Ownership" },
    { value: "eco-hotel", label: "Eco-Hotel / Sustainable Hotel" },
    { value: "wellness-spa", label: "Wellness or Spa Hotel" },
    { value: "heritage-hotel", label: "Heritage Hotel" },
    { value: "cultural-art", label: "Cultural / Art Hotel" },
    { value: "transit-hotel", label: "Transit Hotel" },
    { value: "luxury-5star", label: "Luxury Hotel (5-Star)" },
    { value: "upscale-4star", label: "Upscale Hotel (4-Star)" },
    { value: "midscale-3star", label: "Midscale Hotel (3-Star)" },
    { value: "economy-budget", label: "Economy / Budget Hotel (1–2 Star)" },
    { value: "hostel", label: "Hostel" },
    { value: "motel", label: "Motel" },
    { value: "capsule-hotel", label: "Capsule Hotel" },
    { value: "micro-hotel", label: "Micro Hotel" },
    { value: "urban-hotel", label: "Urban Hotel" },
    { value: "suburban-hotel", label: "Suburban Hotel" },
    { value: "rural-hotel", label: "Rural Hotel" },
    { value: "beach-resort", label: "Beach Resort" },
    { value: "mountain-ski", label: "Mountain / Ski Resort Hotel" },
    { value: "island-resort", label: "Island Resort" },
    { value: "safari-lodge", label: "Safari Lodge / Jungle Retreat" },
    { value: "desert-resort", label: "Desert Resort" },
    { value: "chain-branded", label: "Chain / Branded Hotel" },
    { value: "independent", label: "Independent Hotel" },
    { value: "franchise", label: "Franchise Hotel" },
    { value: "soft-branded", label: "Soft-Branded Hotel" },
    { value: "adults-only", label: "Adults-Only Hotel" },
    { value: "family-hotel", label: "Family Hotel" },
    { value: "pet-friendly", label: "Pet-Friendly Hotel" },
    { value: "themed-hotel", label: "Themed Hotel" },
    { value: "lgbtq-friendly", label: "LGBTQ+ Friendly Hotel" },
    { value: "lifestyle-hotel", label: "Lifestyle Hotel" },
    { value: "adventure-hotel", label: "Adventure Hotel" },
    { value: "digital-nomad", label: "Digital Nomad Hotel" },
    { value: "monastery-religious", label: "Monastery Stay / Religious Hotel" },
    { value: "floating-houseboat", label: "Floating Hotel / Houseboat" },
    { value: "ice-hotel", label: "Ice Hotel" },
    { value: "treehouse", label: "Treehouse Hotel" },
    { value: "cave-hotel", label: "Cave Hotel" },
    { value: "underwater", label: "Underwater Hotel" }
  ];

  const hotelChains = [
    // Marriott International
    { category: "Marriott International", value: "marriott-hotels-resorts", label: "Marriott Hotels & Resorts" },
    { category: "Marriott International", value: "jw-marriott", label: "JW Marriott" },
    { category: "Marriott International", value: "ritz-carlton", label: "The Ritz-Carlton" },
    { category: "Marriott International", value: "edition", label: "Edition" },
    { category: "Marriott International", value: "w-hotels", label: "W Hotels" },
    { category: "Marriott International", value: "sheraton", label: "Sheraton" },
    { category: "Marriott International", value: "westin", label: "Westin" },
    { category: "Marriott International", value: "le-meridien", label: "Le Méridien" },
    { category: "Marriott International", value: "renaissance-hotels", label: "Renaissance Hotels" },
    { category: "Marriott International", value: "autograph-collection", label: "Autograph Collection" },
    { category: "Marriott International", value: "tribute-portfolio", label: "Tribute Portfolio" },
    { category: "Marriott International", value: "courtyard-marriott", label: "Courtyard by Marriott" },
    { category: "Marriott International", value: "ac-hotels", label: "AC Hotels" },
    { category: "Marriott International", value: "moxy-hotels", label: "Moxy Hotels" },
    { category: "Marriott International", value: "residence-inn", label: "Residence Inn" },
    { category: "Marriott International", value: "springhill-suites", label: "SpringHill Suites" },
    { category: "Marriott International", value: "fairfield-inn-suites", label: "Fairfield Inn & Suites" },
    { category: "Marriott International", value: "towneplace-suites", label: "TownePlace Suites" },
    { category: "Marriott International", value: "marriott-executive-apartments", label: "Marriott Executive Apartments" },
    { category: "Marriott International", value: "delta-hotels", label: "Delta Hotels" },
    { category: "Marriott International", value: "protea-hotels", label: "Protea Hotels" },
    { category: "Marriott International", value: "gaylord-hotels", label: "Gaylord Hotels" },

    // Hilton Worldwide
    { category: "Hilton Worldwide", value: "hilton-hotels-resorts", label: "Hilton Hotels & Resorts" },
    { category: "Hilton Worldwide", value: "waldorf-astoria", label: "Waldorf Astoria" },
    { category: "Hilton Worldwide", value: "conrad-hotels", label: "Conrad Hotels & Resorts" },
    { category: "Hilton Worldwide", value: "lxr-hotels", label: "LXR Hotels & Resorts" },
    { category: "Hilton Worldwide", value: "curio-collection", label: "Curio Collection" },
    { category: "Hilton Worldwide", value: "canopy-hilton", label: "Canopy by Hilton" },
    { category: "Hilton Worldwide", value: "signia-hilton", label: "Signia Hilton" },
    { category: "Hilton Worldwide", value: "doubletree-hilton", label: "DoubleTree by Hilton" },
    { category: "Hilton Worldwide", value: "tapestry-collection", label: "Tapestry Collection" },
    { category: "Hilton Worldwide", value: "embassy-suites", label: "Embassy Suites" },
    { category: "Hilton Worldwide", value: "hilton-garden-inn", label: "Hilton Garden Inn" },
    { category: "Hilton Worldwide", value: "hampton-hilton", label: "Hampton by Hilton" },
    { category: "Hilton Worldwide", value: "tru-hilton", label: "Tru by Hilton" },
    { category: "Hilton Worldwide", value: "homewood-suites", label: "Homewood Suites" },
    { category: "Hilton Worldwide", value: "home2-suites", label: "Home2 Suites" },
    { category: "Hilton Worldwide", value: "hilton-grand-vacations", label: "Hilton Grand Vacations" },

    // InterContinental Hotels Group (IHG)
    { category: "InterContinental Hotels Group (IHG)", value: "intercontinental-hotels", label: "InterContinental Hotels & Resorts" },
    { category: "InterContinental Hotels Group (IHG)", value: "kimpton-hotels", label: "Kimpton Hotels" },
    { category: "InterContinental Hotels Group (IHG)", value: "regent-hotels", label: "Regent Hotels" },
    { category: "InterContinental Hotels Group (IHG)", value: "hotel-indigo", label: "Hotel Indigo" },
    { category: "InterContinental Hotels Group (IHG)", value: "voco", label: "voco" },
    { category: "InterContinental Hotels Group (IHG)", value: "hualuxe-hotels", label: "Hualuxe Hotels" },
    { category: "InterContinental Hotels Group (IHG)", value: "crowne-plaza", label: "Crowne Plaza" },
    { category: "InterContinental Hotels Group (IHG)", value: "even-hotels", label: "Even Hotels" },
    { category: "InterContinental Hotels Group (IHG)", value: "holiday-inn", label: "Holiday Inn" },
    { category: "InterContinental Hotels Group (IHG)", value: "holiday-inn-express", label: "Holiday Inn Express" },
    { category: "InterContinental Hotels Group (IHG)", value: "holiday-inn-resort", label: "Holiday Inn Resort" },
    { category: "InterContinental Hotels Group (IHG)", value: "holiday-inn-club", label: "Holiday Inn Club Vacations" },
    { category: "InterContinental Hotels Group (IHG)", value: "avid-hotels", label: "Avid Hotels" },
    { category: "InterContinental Hotels Group (IHG)", value: "staybridge-suites", label: "Staybridge Suites" },
    { category: "InterContinental Hotels Group (IHG)", value: "candlewood-suites", label: "Candlewood Suites" },

    // Accor Group
    { category: "Accor Group", value: "sofitel", label: "Sofitel" },
    { category: "Accor Group", value: "fairmont", label: "Fairmont" },
    { category: "Accor Group", value: "raffles", label: "Raffles" },
    { category: "Accor Group", value: "pullman", label: "Pullman" },
    { category: "Accor Group", value: "mgallery", label: "MGallery" },
    { category: "Accor Group", value: "swissotel", label: "Swissôtel" },
    { category: "Accor Group", value: "movenpick", label: "Mövenpick" },
    { category: "Accor Group", value: "grand-mercure", label: "Grand Mercure" },
    { category: "Accor Group", value: "novotel", label: "Novotel" },
    { category: "Accor Group", value: "mercure", label: "Mercure" },
    { category: "Accor Group", value: "adagio", label: "Adagio" },
    { category: "Accor Group", value: "ibis", label: "ibis" },
    { category: "Accor Group", value: "ibis-styles", label: "ibis Styles" },
    { category: "Accor Group", value: "ibis-budget", label: "ibis Budget" },
    { category: "Accor Group", value: "the-sebel", label: "The Sebel" },
    { category: "Accor Group", value: "tribe", label: "Tribe" },
    { category: "Accor Group", value: "orient-express", label: "Orient Express" },
    { category: "Accor Group", value: "mama-shelter", label: "Mama Shelter" },
    { category: "Accor Group", value: "25hours-hotels", label: "25hours Hotels" },
    { category: "Accor Group", value: "jo-joe", label: "Jo&Joe" },
    { category: "Accor Group", value: "greet", label: "Greet" },
    { category: "Accor Group", value: "banyan-tree", label: "Banyan Tree" },

    // Hyatt Hotels Corporation
    { category: "Hyatt Hotels Corporation", value: "park-hyatt", label: "Park Hyatt" },
    { category: "Hyatt Hotels Corporation", value: "grand-hyatt", label: "Grand Hyatt" },
    { category: "Hyatt Hotels Corporation", value: "hyatt-regency", label: "Hyatt Regency" },
    { category: "Hyatt Hotels Corporation", value: "andaz", label: "Andaz" },
    { category: "Hyatt Hotels Corporation", value: "alila", label: "Alila" },
    { category: "Hyatt Hotels Corporation", value: "thompson-hotels", label: "Thompson Hotels" },
    { category: "Hyatt Hotels Corporation", value: "hyatt-centric", label: "Hyatt Centric" },
    { category: "Hyatt Hotels Corporation", value: "jdv-hyatt", label: "JdV by Hyatt (Joie de Vivre)" },
    { category: "Hyatt Hotels Corporation", value: "unbound-collection", label: "The Unbound Collection" },
    { category: "Hyatt Hotels Corporation", value: "caption-hyatt", label: "Caption by Hyatt" },
    { category: "Hyatt Hotels Corporation", value: "hyatt-place", label: "Hyatt Place" },
    { category: "Hyatt Hotels Corporation", value: "hyatt-house", label: "Hyatt House" },
    { category: "Hyatt Hotels Corporation", value: "destination-hyatt", label: "Destination by Hyatt" },
    { category: "Hyatt Hotels Corporation", value: "miraval", label: "Miraval" },
    { category: "Hyatt Hotels Corporation", value: "secrets-resorts", label: "Secrets Resorts & Spas" },
    { category: "Hyatt Hotels Corporation", value: "dreams-resorts", label: "Dreams Resorts & Spas" },
    { category: "Hyatt Hotels Corporation", value: "zoetry-wellness", label: "Zoëtry Wellness & Spa Resorts" },
    { category: "Hyatt Hotels Corporation", value: "alua-hotels", label: "Alua Hotels & Resorts" },
    { category: "Hyatt Hotels Corporation", value: "breathless-resorts", label: "Breathless Resorts & Spas" },

    // Radisson Hotel Group
    { category: "Radisson Hotel Group", value: "radisson-collection", label: "Radisson Collection" },
    { category: "Radisson Hotel Group", value: "radisson-blu", label: "Radisson Blu" },
    { category: "Radisson Hotel Group", value: "radisson-red", label: "Radisson RED" },
    { category: "Radisson Hotel Group", value: "radisson-individuals", label: "Radisson Individuals" },
    { category: "Radisson Hotel Group", value: "radisson", label: "Radisson" },
    { category: "Radisson Hotel Group", value: "park-plaza", label: "Park Plaza" },
    { category: "Radisson Hotel Group", value: "park-inn-radisson", label: "Park Inn by Radisson" },
    { category: "Radisson Hotel Group", value: "country-inn-suites", label: "Country Inn & Suites by Radisson" },
    { category: "Radisson Hotel Group", value: "prizeotel", label: "Prizeotel" },
    { category: "Radisson Hotel Group", value: "artotel", label: "Art'otel" },

    // Wyndham Hotels & Resorts
    { category: "Wyndham Hotels & Resorts", value: "wyndham-grand", label: "Wyndham Grand" },
    { category: "Wyndham Hotels & Resorts", value: "dolce-hotels", label: "Dolce Hotels & Resorts" },
    { category: "Wyndham Hotels & Resorts", value: "tryp-wyndham", label: "TRYP by Wyndham" },
    { category: "Wyndham Hotels & Resorts", value: "wyndham", label: "Wyndham" },
    { category: "Wyndham Hotels & Resorts", value: "esplendor", label: "Esplendor" },
    { category: "Wyndham Hotels & Resorts", value: "dazzler-hotels", label: "Dazzler Hotels" },
    { category: "Wyndham Hotels & Resorts", value: "wingate-wyndham", label: "Wingate by Wyndham" },
    { category: "Wyndham Hotels & Resorts", value: "ramada", label: "Ramada" },
    { category: "Wyndham Hotels & Resorts", value: "ramada-encore", label: "Ramada Encore" },
    { category: "Wyndham Hotels & Resorts", value: "baymont-wyndham", label: "Baymont by Wyndham" },
    { category: "Wyndham Hotels & Resorts", value: "microtel-inn", label: "Microtel Inn & Suites" },
    { category: "Wyndham Hotels & Resorts", value: "days-inn", label: "Days Inn" },
    { category: "Wyndham Hotels & Resorts", value: "super-8", label: "Super 8" },
    { category: "Wyndham Hotels & Resorts", value: "howard-johnson", label: "Howard Johnson" },
    { category: "Wyndham Hotels & Resorts", value: "travelodge", label: "Travelodge" },
    { category: "Wyndham Hotels & Resorts", value: "la-quinta", label: "La Quinta Inn & Suites" },
    { category: "Wyndham Hotels & Resorts", value: "americinn", label: "AmericInn" },
    { category: "Wyndham Hotels & Resorts", value: "hawthorn-suites", label: "Hawthorn Suites" },

    // Choice Hotels International
    { category: "Choice Hotels International", value: "ascend-hotel", label: "Ascend Hotel Collection" },
    { category: "Choice Hotels International", value: "cambria-hotels", label: "Cambria Hotels" },
    { category: "Choice Hotels International", value: "clarion", label: "Clarion" },
    { category: "Choice Hotels International", value: "quality-inn", label: "Quality Inn" },
    { category: "Choice Hotels International", value: "comfort-inn", label: "Comfort Inn / Comfort Suites" },
    { category: "Choice Hotels International", value: "sleep-inn", label: "Sleep Inn" },
    { category: "Choice Hotels International", value: "econo-lodge", label: "Econo Lodge" },
    { category: "Choice Hotels International", value: "rodeway-inn", label: "Rodeway Inn" },
    { category: "Choice Hotels International", value: "mainstay-suites", label: "MainStay Suites" },
    { category: "Choice Hotels International", value: "woodspring-suites", label: "WoodSpring Suites" },
    { category: "Choice Hotels International", value: "everhome-suites", label: "Everhome Suites" },
    { category: "Choice Hotels International", value: "suburban-extended", label: "Suburban Extended Stay" },

    // Minor Hotels
    { category: "Minor Hotels", value: "anantara", label: "Anantara Hotels & Resorts" },
    { category: "Minor Hotels", value: "avani-hotels", label: "Avani Hotels & Resorts" },
    { category: "Minor Hotels", value: "oaks-hotels", label: "Oaks Hotels & Resorts" },
    { category: "Minor Hotels", value: "tivoli-hotels", label: "Tivoli Hotels" },
    { category: "Minor Hotels", value: "nh-hotels", label: "NH Hotels" },
    { category: "Minor Hotels", value: "nh-collection", label: "NH Collection" },
    { category: "Minor Hotels", value: "nhow", label: "nhow" },
    { category: "Minor Hotels", value: "elewana-collection", label: "Elewana Collection" },

    // Melia Hotels International
    { category: "Melia Hotels International", value: "gran-melia", label: "Gran Meliá" },
    { category: "Melia Hotels International", value: "me-melia", label: "ME by Meliá" },
    { category: "Melia Hotels International", value: "paradisus-melia", label: "Paradisus by Meliá" },
    { category: "Melia Hotels International", value: "melia-hotels", label: "Meliá Hotels & Resorts" },
    { category: "Melia Hotels International", value: "innside-melia", label: "INNSiDE by Meliá" },
    { category: "Melia Hotels International", value: "sol-hotels", label: "Sol Hotels" },

    // Louvre Hotels Group
    { category: "Louvre Hotels Group", value: "royal-tulip", label: "Royal Tulip" },
    { category: "Louvre Hotels Group", value: "golden-tulip", label: "Golden Tulip" },
    { category: "Louvre Hotels Group", value: "tulip-inn", label: "Tulip Inn" },
    { category: "Louvre Hotels Group", value: "campanile", label: "Campanile" },
    { category: "Louvre Hotels Group", value: "kyriad", label: "Kyriad" },
    { category: "Louvre Hotels Group", value: "premiere-classe", label: "Première Classe" },
    { category: "Louvre Hotels Group", value: "hotels-preference", label: "Hôtels & Préférence" },
    { category: "Louvre Hotels Group", value: "metropolo", label: "Metropolo" },
    { category: "Louvre Hotels Group", value: "sarovar-hotels", label: "Sarovar Hotels" },

    // Best Western Hotels & Resorts
    { category: "Best Western Hotels & Resorts", value: "best-western", label: "Best Western" },
    { category: "Best Western Hotels & Resorts", value: "best-western-plus", label: "Best Western Plus" },
    { category: "Best Western Hotels & Resorts", value: "best-western-premier", label: "Best Western Premier" },
    { category: "Best Western Hotels & Resorts", value: "bw-signature", label: "BW Signature Collection" },
    { category: "Best Western Hotels & Resorts", value: "bw-premier", label: "BW Premier Collection" },
    { category: "Best Western Hotels & Resorts", value: "surestay-hotel", label: "SureStay Hotel by Best Western" },
    { category: "Best Western Hotels & Resorts", value: "surestay-plus", label: "SureStay Plus" },
    { category: "Best Western Hotels & Resorts", value: "surestay-studio", label: "SureStay Studio" },
    { category: "Best Western Hotels & Resorts", value: "surestay-collection", label: "SureStay Collection" },
    { category: "Best Western Hotels & Resorts", value: "aiden-best-western", label: "Aiden by Best Western" },
    { category: "Best Western Hotels & Resorts", value: "sadie-best-western", label: "Sadie by Best Western" },
    { category: "Best Western Hotels & Resorts", value: "executive-residency", label: "Executive Residency by Best Western" },

    // Other Notable Regional & Luxury Groups
    { category: "Other Notable Groups", value: "four-seasons", label: "Four Seasons Hotels & Resorts" },
    { category: "Other Notable Groups", value: "leading-hotels", label: "The Leading Hotels of the World (LHW)" },
    { category: "Other Notable Groups", value: "rosewood-hotels", label: "Rosewood Hotels & Resorts" },
    { category: "Other Notable Groups", value: "mandarin-oriental", label: "Mandarin Oriental Hotel Group" },
    { category: "Other Notable Groups", value: "belmond", label: "Belmond" },
    { category: "Other Notable Groups", value: "aman-resorts", label: "Aman Resorts" },
    { category: "Other Notable Groups", value: "six-senses", label: "Six Senses" },
    { category: "Other Notable Groups", value: "bulgari-hotels", label: "Bulgari Hotels & Resorts" },
    { category: "Other Notable Groups", value: "capella-hotels", label: "Capella Hotels & Resorts" },
    { category: "Other Notable Groups", value: "oberoi-hotels", label: "Oberoi Hotels & Resorts" },
    { category: "Other Notable Groups", value: "taj-hotels", label: "Taj Hotels (IHCL)" },
    { category: "Other Notable Groups", value: "itc-hotels", label: "ITC Hotels" },
    { category: "Other Notable Groups", value: "jumeirah-hotels", label: "Jumeirah Hotels & Resorts" },
    { category: "Other Notable Groups", value: "shangri-la", label: "Shangri-La Hotels and Resorts" },
    { category: "Other Notable Groups", value: "langham-hotels", label: "Langham Hotels" },
    { category: "Other Notable Groups", value: "ghm-hotels", label: "GHM Hotels" },
    { category: "Other Notable Groups", value: "dusit-international", label: "Dusit International" },
    { category: "Other Notable Groups", value: "millennium-copthorne", label: "Millennium & Copthorne Hotels" },
    { category: "Other Notable Groups", value: "citizenm", label: "CitizenM" },
    { category: "Other Notable Groups", value: "selina-hotels", label: "Selina Hotels" },
    { category: "Other Notable Groups", value: "zoku", label: "Zoku" },
    { category: "Other Notable Groups", value: "red-planet", label: "Red Planet Hotels" },
    { category: "Other Notable Groups", value: "yotel", label: "Yotel" }
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
    // Room Amenities
    { category: "Room Amenities", id: "air-conditioning", label: "Air Conditioning", icon: Hotel },
    { category: "Room Amenities", id: "heating", label: "Heating", icon: Hotel },
    { category: "Room Amenities", id: "flat-screen-tv", label: "Flat-Screen TV", icon: Hotel },
    { category: "Room Amenities", id: "satellite-cable", label: "Satellite / Cable Channels", icon: Hotel },
    { category: "Room Amenities", id: "wifi", label: "Wi-Fi / High-Speed Internet", icon: Wifi },
    { category: "Room Amenities", id: "minibar", label: "Minibar", icon: Coffee },
    { category: "Room Amenities", id: "safe-lockbox", label: "Safe / Lockbox", icon: Hotel },
    { category: "Room Amenities", id: "desk-workstation", label: "Desk / Workstation", icon: Hotel },
    { category: "Room Amenities", id: "coffee-maker", label: "Coffee Maker / Nespresso Machine", icon: Coffee },
    { category: "Room Amenities", id: "kettle-tea", label: "Kettle / Tea Set", icon: Coffee },
    { category: "Room Amenities", id: "telephone", label: "Telephone", icon: Hotel },
    { category: "Room Amenities", id: "alarm-clock", label: "Alarm Clock / Wake-Up Service", icon: Hotel },
    { category: "Room Amenities", id: "iron-board", label: "Iron and Ironing Board", icon: Hotel },
    { category: "Room Amenities", id: "hairdryer", label: "Hairdryer", icon: Hotel },
    { category: "Room Amenities", id: "bathrobe-slippers", label: "Bathrobe & Slippers", icon: Hotel },
    { category: "Room Amenities", id: "blackout-curtains", label: "Blackout Curtains", icon: Hotel },
    { category: "Room Amenities", id: "balcony-terrace", label: "Balcony / Terrace", icon: Hotel },
    { category: "Room Amenities", id: "soundproofed", label: "Soundproofed Rooms", icon: Hotel },
    { category: "Room Amenities", id: "smoking-options", label: "Smoking / Non-Smoking Options", icon: Hotel },
    { category: "Room Amenities", id: "room-service", label: "In-Room Dining / Room Service", icon: Utensils },
    { category: "Room Amenities", id: "kitchenette", label: "Kitchenette / Full Kitchen", icon: Utensils },
    { category: "Room Amenities", id: "laundry-facilities", label: "Laundry Facilities (In-Room or Shared)", icon: Hotel },
    
    // Bathroom Amenities
    { category: "Bathroom Amenities", id: "walk-in-shower", label: "Walk-in Shower", icon: Waves },
    { category: "Bathroom Amenities", id: "bathtub", label: "Bathtub (Standard, Jetted, or Soaking)", icon: Waves },
    { category: "Bathroom Amenities", id: "double-vanity", label: "Double Vanity", icon: Hotel },
    { category: "Bathroom Amenities", id: "premium-toiletries", label: "Premium Toiletries", icon: Hotel },
    { category: "Bathroom Amenities", id: "bidet", label: "Bidet", icon: Hotel },
    { category: "Bathroom Amenities", id: "towel-warmer", label: "Towel Warmer", icon: Hotel },
    { category: "Bathroom Amenities", id: "makeup-mirror", label: "Makeup Mirror", icon: Hotel },
    { category: "Bathroom Amenities", id: "bathroom-phone", label: "Bathroom Phone", icon: Hotel },
    
    // Connectivity & Tech
    { category: "Connectivity & Tech", id: "free-wifi", label: "Free Wi-Fi", icon: Wifi },
    { category: "Connectivity & Tech", id: "wired-internet", label: "Wired Internet", icon: Wifi },
    { category: "Connectivity & Tech", id: "smart-tv", label: "Smart TV / Streaming Access", icon: Hotel },
    { category: "Connectivity & Tech", id: "usb-charging", label: "USB Charging Ports", icon: Hotel },
    { category: "Connectivity & Tech", id: "bluetooth-speakers", label: "Bluetooth Speakers", icon: Hotel },
    { category: "Connectivity & Tech", id: "chromecast-appletv", label: "Chromecast or Apple TV", icon: Hotel },
    { category: "Connectivity & Tech", id: "digital-key", label: "Digital Key or Mobile Room Access", icon: Hotel },
    { category: "Connectivity & Tech", id: "smart-lighting", label: "Smart Lighting / Thermostat", icon: Hotel },
    { category: "Connectivity & Tech", id: "room-tablet", label: "In-room Tablet / Hotel App Access", icon: Hotel },
    
    // Food & Beverage
    { category: "Food & Beverage", id: "onsite-restaurants", label: "On-Site Restaurant(s)", icon: Utensils },
    { category: "Food & Beverage", id: "bar-lounge", label: "Bar / Lounge", icon: Coffee },
    { category: "Food & Beverage", id: "rooftop-bar", label: "Rooftop Bar", icon: Coffee },
    { category: "Food & Beverage", id: "pool-bar", label: "Pool Bar", icon: Coffee },
    { category: "Food & Beverage", id: "breakfast-buffet", label: "Breakfast Buffet", icon: Utensils },
    { category: "Food & Beverage", id: "alacarte-breakfast", label: "À La Carte Breakfast", icon: Utensils },
    { category: "Food & Beverage", id: "room-dining", label: "In-Room Dining / Room Service", icon: Utensils },
    { category: "Food & Beverage", id: "grab-go", label: "Grab & Go / Deli Counter", icon: Utensils },
    { category: "Food & Beverage", id: "cafe-coffee", label: "Café / Coffee Shop", icon: Coffee },
    { category: "Food & Beverage", id: "mini-market", label: "Mini Market / Convenience Store", icon: Hotel },
    { category: "Food & Beverage", id: "wine-cellar", label: "Wine Cellar / Tasting Room", icon: Coffee },
    { category: "Food & Beverage", id: "welcome-drink", label: "Complimentary Welcome Drink", icon: Coffee },
    { category: "Food & Beverage", id: "kids-menu", label: "Kids' Menu or High Chairs", icon: Utensils },
    { category: "Food & Beverage", id: "special-diet", label: "Special Diet Menus (Vegan, Gluten-Free, etc.)", icon: Utensils },
    
    // Wellness & Fitness
    { category: "Wellness & Fitness", id: "spa", label: "Spa", icon: Hotel },
    { category: "Wellness & Fitness", id: "sauna", label: "Sauna", icon: Hotel },
    { category: "Wellness & Fitness", id: "steam-room", label: "Steam Room", icon: Hotel },
    { category: "Wellness & Fitness", id: "jacuzzi-hot-tub", label: "Jacuzzi / Hot Tub", icon: Waves },
    { category: "Wellness & Fitness", id: "massage-services", label: "Massage Services", icon: Hotel },
    { category: "Wellness & Fitness", id: "yoga-studio", label: "Yoga Studio", icon: Dumbbell },
    { category: "Wellness & Fitness", id: "meditation-room", label: "Meditation Room", icon: Hotel },
    { category: "Wellness & Fitness", id: "fitness-center", label: "Fitness Center / Gym", icon: Dumbbell },
    { category: "Wellness & Fitness", id: "personal-trainer", label: "Personal Trainer", icon: Dumbbell },
    { category: "Wellness & Fitness", id: "fitness-classes", label: "Fitness Classes", icon: Dumbbell },
    { category: "Wellness & Fitness", id: "wellness-packages", label: "Wellness Retreat Packages", icon: Hotel },
    
    // Leisure & Recreation
    { category: "Leisure & Recreation", id: "outdoor-pool", label: "Outdoor Pool", icon: Waves },
    { category: "Leisure & Recreation", id: "indoor-pool", label: "Indoor Pool", icon: Waves },
    { category: "Leisure & Recreation", id: "children-pool", label: "Children's Pool", icon: Waves },
    { category: "Leisure & Recreation", id: "infinity-pool", label: "Infinity Pool", icon: Waves },
    { category: "Leisure & Recreation", id: "rooftop-pool", label: "Rooftop Pool", icon: Waves },
    { category: "Leisure & Recreation", id: "beach-access", label: "Private Beach Access", icon: Waves },
    { category: "Leisure & Recreation", id: "cabanas-poolside", label: "Cabanas / Poolside Lounge", icon: Hotel },
    { category: "Leisure & Recreation", id: "game-room", label: "Game Room", icon: Hotel },
    { category: "Leisure & Recreation", id: "cinema", label: "Cinema / Screening Room", icon: Hotel },
    { category: "Leisure & Recreation", id: "library", label: "Library / Reading Room", icon: Hotel },
    { category: "Leisure & Recreation", id: "garden-courtyard", label: "Garden or Courtyard", icon: Hotel },
    { category: "Leisure & Recreation", id: "bike-rental", label: "Bike Rental", icon: Car },
    { category: "Leisure & Recreation", id: "water-sports", label: "Water Sports Equipment", icon: Waves },
    { category: "Leisure & Recreation", id: "golf-course", label: "Golf Course Access", icon: Hotel },
    { category: "Leisure & Recreation", id: "tennis-courts", label: "Tennis Courts", icon: Hotel },
    
    // Family & Kids
    { category: "Family & Kids", id: "family-rooms", label: "Family Rooms / Connecting Rooms", icon: Users },
    { category: "Family & Kids", id: "baby-cots", label: "Baby Cots / Cribs", icon: Users },
    { category: "Family & Kids", id: "babysitting", label: "Babysitting Services", icon: Users },
    { category: "Family & Kids", id: "kids-club", label: "Kids' Club", icon: Users },
    { category: "Family & Kids", id: "children-activities", label: "Children's Activities", icon: Users },
    { category: "Family & Kids", id: "playground", label: "Playground", icon: Users },
    { category: "Family & Kids", id: "childproofing", label: "Childproofing Equipment", icon: Users },
    { category: "Family & Kids", id: "children-pool-kids", label: "Children's Pool", icon: Waves },
    
    // Pet-Friendly Services
    { category: "Pet-Friendly Services", id: "pet-rooms", label: "Pet-Friendly Rooms", icon: Hotel },
    { category: "Pet-Friendly Services", id: "pet-welcome", label: "Pet Welcome Kit", icon: Hotel },
    { category: "Pet-Friendly Services", id: "dog-park", label: "On-Site Dog Park", icon: Hotel },
    { category: "Pet-Friendly Services", id: "pet-sitting", label: "Pet Sitting or Walking", icon: Hotel },
    { category: "Pet-Friendly Services", id: "pet-menu", label: "Pet Menu or Treats", icon: Utensils },
    { category: "Pet-Friendly Services", id: "pet-spa", label: "Pet Spa / Grooming", icon: Hotel },
    
    // Shopping & Retail
    { category: "Shopping & Retail", id: "gift-shop", label: "Gift Shop", icon: Hotel },
    { category: "Shopping & Retail", id: "boutiques", label: "Designer Boutiques", icon: Hotel },
    { category: "Shopping & Retail", id: "beauty-salon", label: "Beauty Salon / Hairdresser", icon: Hotel },
    { category: "Shopping & Retail", id: "jewelry-shop", label: "Jewelry or Watch Shop", icon: Hotel },
    { category: "Shopping & Retail", id: "art-gallery", label: "Art Gallery", icon: Hotel },
    
    // Business & Events
    { category: "Business & Events", id: "business-center", label: "Business Center", icon: Hotel },
    { category: "Business & Events", id: "meeting-rooms", label: "Meeting Rooms", icon: Users },
    { category: "Business & Events", id: "conference-rooms", label: "Conference Rooms", icon: Users },
    { category: "Business & Events", id: "event-venues", label: "Event Venues / Banquet Halls", icon: Users },
    { category: "Business & Events", id: "coworking", label: "Coworking Space", icon: Hotel },
    { category: "Business & Events", id: "av-equipment", label: "AV Equipment Rental", icon: Hotel },
    { category: "Business & Events", id: "printing", label: "Printing / Scanning Services", icon: Hotel },
    { category: "Business & Events", id: "executive-lounge", label: "Executive Lounge", icon: Hotel },
    { category: "Business & Events", id: "vip-checkin", label: "VIP Check-In Area", icon: Hotel },
    
    // Transportation & Access
    { category: "Transportation & Access", id: "onsite-parking", label: "On-Site Parking", icon: Car },
    { category: "Transportation & Access", id: "valet-parking", label: "Valet Parking", icon: Car },
    { category: "Transportation & Access", id: "ev-charging", label: "EV Charging Station", icon: Car },
    { category: "Transportation & Access", id: "airport-shuttle", label: "Airport Shuttle", icon: Car },
    { category: "Transportation & Access", id: "chauffeur", label: "Chauffeur / Car Service", icon: Car },
    { category: "Transportation & Access", id: "bike-scooter", label: "Bike or Scooter Rentals", icon: Car },
    { category: "Transportation & Access", id: "private-jet", label: "Private Jet Transfer", icon: Car },
    { category: "Transportation & Access", id: "dock-marina", label: "Dock / Marina Access", icon: Waves },
    { category: "Transportation & Access", id: "helipad", label: "Helipad", icon: Car },
    
    // Accessibility Features
    { category: "Accessibility Features", id: "wheelchair-rooms", label: "Wheelchair Accessible Rooms", icon: Hotel },
    { category: "Accessibility Features", id: "elevator-access", label: "Elevator Access", icon: Hotel },
    { category: "Accessibility Features", id: "braille-signage", label: "Braille Signage", icon: Hotel },
    { category: "Accessibility Features", id: "visual-alarm", label: "Visual Alarm Alert", icon: Hotel },
    { category: "Accessibility Features", id: "accessible-bathrooms", label: "Accessible Bathrooms", icon: Hotel },
    { category: "Accessibility Features", id: "ramps", label: "Ramps / Step-Free Entry", icon: Hotel },
    { category: "Accessibility Features", id: "hearing-aid", label: "Hearing Aid Compatible Phones", icon: Hotel },
    
    // Safety & Security
    { category: "Safety & Security", id: "24hour-security", label: "24-Hour Security", icon: Hotel },
    { category: "Safety & Security", id: "key-card", label: "Key Card Access", icon: Hotel },
    { category: "Safety & Security", id: "fire-alarms", label: "Fire Alarms & Smoke Detectors", icon: Hotel },
    { category: "Safety & Security", id: "cctv", label: "CCTV in Common Areas", icon: Hotel },
    { category: "Safety & Security", id: "inroom-safe", label: "In-Room Safe", icon: Hotel },
    { category: "Safety & Security", id: "emergency-procedures", label: "Emergency Procedures / Evacuation Maps", icon: Hotel },
    { category: "Safety & Security", id: "security-staff", label: "Security Staff or Concierge", icon: Hotel },
    
    // General Services
    { category: "General Services", id: "24hour-reception", label: "24-Hour Reception", icon: Hotel },
    { category: "General Services", id: "concierge", label: "Concierge Services", icon: Hotel },
    { category: "General Services", id: "luggage-storage", label: "Luggage Storage", icon: Hotel },
    { category: "General Services", id: "daily-housekeeping", label: "Daily Housekeeping", icon: Hotel },
    { category: "General Services", id: "dry-cleaning", label: "Dry Cleaning / Laundry", icon: Hotel },
    { category: "General Services", id: "shoe-shine", label: "Shoe Shine", icon: Hotel },
    { category: "General Services", id: "currency-exchange", label: "Currency Exchange", icon: Hotel },
    { category: "General Services", id: "multilingual-staff", label: "Multilingual Staff", icon: Hotel },
    { category: "General Services", id: "wake-up-call", label: "Wake-Up Call", icon: Hotel },
    { category: "General Services", id: "early-checkin", label: "Early Check-In / Late Check-Out", icon: Hotel },
    { category: "General Services", id: "express-checkin", label: "Express Check-In / Check-Out", icon: Hotel },
    { category: "General Services", id: "butler-service", label: "Butler Service", icon: Hotel },
    { category: "General Services", id: "turndown-service", label: "Turndown Service", icon: Hotel }
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
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
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
                   name="hotelChain"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Hotel Chain</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="bg-background border-border">
                             <SelectValue placeholder="Select hotel chain" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent className="bg-background border-border shadow-lg z-50 max-h-96 overflow-y-auto">
                           {Object.entries(
                             hotelChains.reduce((acc, chain) => {
                               if (!acc[chain.category]) {
                                 acc[chain.category] = [];
                               }
                               acc[chain.category].push(chain);
                               return acc;
                             }, {} as Record<string, typeof hotelChains>)
                           ).map(([category, categoryChains]) => (
                             <div key={category}>
                               <div className="px-2 py-1 text-xs font-semibold text-muted-foreground border-b">
                                 {category}
                               </div>
                               {categoryChains.map((chain) => (
                                 <SelectItem key={chain.value} value={chain.value}>
                                   {chain.label}
                                 </SelectItem>
                               ))}
                             </div>
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
                  <Select
                    value={currentTour.name || ''}
                    onValueChange={(value) => setCurrentTour({...currentTour, name: value})}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select tour name" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50 max-h-80 overflow-y-auto">
                      {/* Public Areas */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">PUBLIC AREAS</div>
                      <SelectItem value="Main Lobby">Main Lobby</SelectItem>
                      <SelectItem value="Reception / Front Desk">Reception / Front Desk</SelectItem>
                      <SelectItem value="Lounge / Waiting Area">Lounge / Waiting Area</SelectItem>
                      <SelectItem value="Concierge Desk">Concierge Desk</SelectItem>
                      <SelectItem value="Business Center / Co-working Space">Business Center / Co-working Space</SelectItem>
                      <SelectItem value="Hallways / Corridors">Hallways / Corridors</SelectItem>
                      
                      {/* Food & Beverage */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">FOOD & BEVERAGE</div>
                      <SelectItem value="Main Restaurant(s)">Main Restaurant(s)</SelectItem>
                      <SelectItem value="Fine Dining Room">Fine Dining Room</SelectItem>
                      <SelectItem value="Buffet Area">Buffet Area</SelectItem>
                      <SelectItem value="Poolside Bar">Poolside Bar</SelectItem>
                      <SelectItem value="Coffee Shop or Café">Coffee Shop or Café</SelectItem>
                      <SelectItem value="Rooftop Bar or Lounge">Rooftop Bar or Lounge</SelectItem>
                      <SelectItem value="Wine Cellar / Tasting Room">Wine Cellar / Tasting Room</SelectItem>
                      <SelectItem value="Private Dining Room">Private Dining Room</SelectItem>
                      <SelectItem value="Kitchen Tour">Kitchen Tour</SelectItem>
                      
                      {/* Event & Meeting Spaces */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">EVENT & MEETING SPACES</div>
                      <SelectItem value="Grand Ballroom">Grand Ballroom</SelectItem>
                      <SelectItem value="Conference Room(s)">Conference Room(s)</SelectItem>
                      <SelectItem value="Meeting Rooms">Meeting Rooms</SelectItem>
                      <SelectItem value="Breakout Rooms">Breakout Rooms</SelectItem>
                      <SelectItem value="Pre-function Areas">Pre-function Areas</SelectItem>
                      <SelectItem value="VIP Lounges">VIP Lounges</SelectItem>
                      <SelectItem value="Outdoor Event Lawn / Terrace">Outdoor Event Lawn / Terrace</SelectItem>
                      <SelectItem value="Wedding Gazebo or Pavilion">Wedding Gazebo or Pavilion</SelectItem>
                      
                      {/* Wellness & Recreation */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">WELLNESS & RECREATION</div>
                      <SelectItem value="Gym / Fitness Center">Gym / Fitness Center</SelectItem>
                      <SelectItem value="Spa / Treatment Rooms">Spa / Treatment Rooms</SelectItem>
                      <SelectItem value="Sauna / Steam Room">Sauna / Steam Room</SelectItem>
                      <SelectItem value="Meditation Room / Yoga Studio">Meditation Room / Yoga Studio</SelectItem>
                      <SelectItem value="Wellness Reception or Juice Bar">Wellness Reception or Juice Bar</SelectItem>
                      <SelectItem value="Locker Rooms / Changing Areas">Locker Rooms / Changing Areas</SelectItem>
                      
                      {/* Leisure Areas */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">LEISURE AREAS</div>
                      <SelectItem value="Outdoor Swimming Pool">Outdoor Swimming Pool</SelectItem>
                      <SelectItem value="Indoor Swimming Pool">Indoor Swimming Pool</SelectItem>
                      <SelectItem value="Children's Pool">Children's Pool</SelectItem>
                      <SelectItem value="Pool Deck / Cabanas">Pool Deck / Cabanas</SelectItem>
                      <SelectItem value="Hot Tub / Jacuzzi">Hot Tub / Jacuzzi</SelectItem>
                      <SelectItem value="Beach Area">Beach Area</SelectItem>
                      <SelectItem value="Rooftop Deck / Sky Lounge">Rooftop Deck / Sky Lounge</SelectItem>
                      <SelectItem value="Garden / Courtyard">Garden / Courtyard</SelectItem>
                      <SelectItem value="Game Room / Recreation Area">Game Room / Recreation Area</SelectItem>
                      <SelectItem value="Cinema / Screening Room">Cinema / Screening Room</SelectItem>
                      
                      {/* Retail & Convenience */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">RETAIL & CONVENIENCE</div>
                      <SelectItem value="Hotel Gift Shop">Hotel Gift Shop</SelectItem>
                      <SelectItem value="Designer Boutiques">Designer Boutiques</SelectItem>
                      <SelectItem value="Convenience Store / Mini Mart">Convenience Store / Mini Mart</SelectItem>
                      <SelectItem value="Jewelry / Souvenir Shop">Jewelry / Souvenir Shop</SelectItem>
                      <SelectItem value="Hair or Nail Salon">Hair or Nail Salon</SelectItem>
                      <SelectItem value="In-house Travel or Tour Desk">In-house Travel or Tour Desk</SelectItem>
                      
                      {/* Specialty Areas */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">SPECIALTY AREAS</div>
                      <SelectItem value="Airport Transfer Lounge">Airport Transfer Lounge</SelectItem>
                      <SelectItem value="Executive Club Lounge / VIP Lounge">Executive Club Lounge / VIP Lounge</SelectItem>
                      <SelectItem value="Butler's Pantry or Guest Services Station">Butler's Pantry or Guest Services Station</SelectItem>
                      <SelectItem value="Art Gallery or On-site Exhibition">Art Gallery or On-site Exhibition</SelectItem>
                      <SelectItem value="Library or Reading Room">Library or Reading Room</SelectItem>
                      <SelectItem value="Kids' Club or Play Area">Kids' Club or Play Area</SelectItem>
                      <SelectItem value="Pet Relief Area / Pet Spa">Pet Relief Area / Pet Spa</SelectItem>
                      
                      {/* Back-of-House */}
                      <div className="px-2 py-1 text-xs font-semibold text-muted-foreground mt-2">BACK-OF-HOUSE (OPTIONAL)</div>
                      <SelectItem value="Staff Reception or Office">Staff Reception or Office</SelectItem>
                      <SelectItem value="Service Corridor">Service Corridor</SelectItem>
                      <SelectItem value="Laundry or Sustainability Facility">Laundry or Sustainability Facility</SelectItem>
                      <SelectItem value="Green Energy Installations">Green Energy Installations</SelectItem>
                    </SelectContent>
                  </Select>
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

          {/* Hotel Photos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Hotel Photos
              </CardTitle>
              <CardDescription>Upload high-quality photos of your hotel</CardDescription>
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
            </CardContent>
          </Card>

          {/* Hotel Videos Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Hotel Videos
              </CardTitle>
              <CardDescription>Upload promotional and showcase videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="hotelVideos"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Hotel Videos</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="video/*"
                          onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                          className="hidden"
                          id="hotel-videos-upload"
                        />
                        <label htmlFor="hotel-videos-upload" className="cursor-pointer">
                          <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium mb-2">Upload Hotel Videos</p>
                          <p className="text-sm text-muted-foreground">
                            Drop videos here or click to browse. Supports MP4, MOV, AVI
                          </p>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Drone Footage Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Drone Footage
              </CardTitle>
              <CardDescription>Upload aerial footage and drone videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="droneFootage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Drone Footage</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept="video/*,image/*"
                          onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                          className="hidden"
                          id="drone-footage-upload"
                        />
                        <label htmlFor="drone-footage-upload" className="cursor-pointer">
                          <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium mb-2">Upload Drone Footage</p>
                          <p className="text-sm text-muted-foreground">
                            Drop aerial footage here or click to browse. Supports videos and images
                          </p>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documents
              </CardTitle>
              <CardDescription>Upload menus, awards, certificates, and other documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="hotelDocuments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Documents</FormLabel>
                    <FormControl>
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => field.onChange(Array.from(e.target.files || []))}
                          className="hidden"
                          id="hotel-documents-upload"
                        />
                        <label htmlFor="hotel-documents-upload" className="cursor-pointer">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <p className="text-lg font-medium mb-2">Upload Documents</p>
                          <p className="text-sm text-muted-foreground">
                            Menus, awards, certificates, etc. Supports PDF, DOC, JPG, PNG
                          </p>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Floor Plan Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Floor Plans
              </CardTitle>
              <CardDescription>Upload hotel floor plans and layouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">

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

        {/* SECTION 3: Hotel Amenities */}
        <TabsContent value="amenities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Hotel Amenities
              </CardTitle>
              <CardDescription>Select amenities available at your hotel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(
                amenitiesList.reduce((acc, amenity) => {
                  if (!acc[amenity.category]) {
                    acc[amenity.category] = [];
                  }
                  acc[amenity.category].push(amenity);
                  return acc;
                }, {} as Record<string, typeof amenitiesList>)
              ).map(([category, categoryAmenities]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-primary">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryAmenities.map((amenity) => {
                      const Icon = amenity.icon;
                      return (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAmenities([...selectedAmenities, amenity.id]);
                              } else {
                                setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.id));
                              }
                            }}
                          />
                          <label htmlFor={amenity.id} className="text-sm flex items-center gap-2 cursor-pointer">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {amenity.label}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
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