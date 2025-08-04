import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, MapPin, Star, Hotel, Camera, Video, FileText, Users, Bed, Wifi, Car, Coffee, Utensils, Waves, Dumbbell, Link } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import MapboxLocationPicker from "@/components/MapboxLocationPicker";
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
  assignedRoom?: string;
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
  priceCurrency: string;
  bookingUrl: string;
  floorWing: string;
}
export function HotelUploadForm({
  form
}: HotelUploadFormProps) {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [currentFacility, setCurrentFacility] = useState<Partial<Facility>>({});
  const [currentRoom, setCurrentRoom] = useState<Partial<RoomType>>({});
  const [tours, setTours] = useState<Tour[]>([]);
  const [currentTour, setCurrentTour] = useState<Partial<Tour>>({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(10);
  const [hotelVirtualTours, setHotelVirtualTours] = useState<Array<{
    id: string;
    name: string;
    url: string;
    file?: File;
  }>>([]);
  const hotelCategories = [{
    value: "business-hotel",
    label: "Business Hotel"
  }, {
    value: "resort-hotel",
    label: "Resort Hotel"
  }, {
    value: "boutique-hotel",
    label: "Boutique Hotel"
  }, {
    value: "airport-hotel",
    label: "Airport Hotel"
  }, {
    value: "conference-convention",
    label: "Conference / Convention Hotel"
  }, {
    value: "extended-stay",
    label: "Extended Stay Hotel"
  }, {
    value: "casino-hotel",
    label: "Casino Hotel"
  }, {
    value: "all-inclusive",
    label: "All-Inclusive Hotel"
  }, {
    value: "timeshare",
    label: "Timeshare / Vacation Ownership"
  }, {
    value: "eco-hotel",
    label: "Eco-Hotel / Sustainable Hotel"
  }, {
    value: "wellness-spa",
    label: "Wellness or Spa Hotel"
  }, {
    value: "heritage-hotel",
    label: "Heritage Hotel"
  }, {
    value: "cultural-art",
    label: "Cultural / Art Hotel"
  }, {
    value: "transit-hotel",
    label: "Transit Hotel"
  }, {
    value: "luxury-5star",
    label: "Luxury Hotel (5-Star)"
  }, {
    value: "upscale-4star",
    label: "Upscale Hotel (4-Star)"
  }, {
    value: "midscale-3star",
    label: "Midscale Hotel (3-Star)"
  }, {
    value: "economy-budget",
    label: "Economy / Budget Hotel (1–2 Star)"
  }, {
    value: "hostel",
    label: "Hostel"
  }, {
    value: "motel",
    label: "Motel"
  }, {
    value: "capsule-hotel",
    label: "Capsule Hotel"
  }, {
    value: "micro-hotel",
    label: "Micro Hotel"
  }, {
    value: "urban-hotel",
    label: "Urban Hotel"
  }, {
    value: "suburban-hotel",
    label: "Suburban Hotel"
  }, {
    value: "rural-hotel",
    label: "Rural Hotel"
  }, {
    value: "beach-resort",
    label: "Beach Resort"
  }, {
    value: "mountain-ski",
    label: "Mountain / Ski Resort Hotel"
  }, {
    value: "island-resort",
    label: "Island Resort"
  }, {
    value: "safari-lodge",
    label: "Safari Lodge / Jungle Retreat"
  }, {
    value: "desert-resort",
    label: "Desert Resort"
  }, {
    value: "chain-branded",
    label: "Chain / Branded Hotel"
  }, {
    value: "independent",
    label: "Independent Hotel"
  }, {
    value: "franchise",
    label: "Franchise Hotel"
  }, {
    value: "soft-branded",
    label: "Soft-Branded Hotel"
  }, {
    value: "adults-only",
    label: "Adults-Only Hotel"
  }, {
    value: "family-hotel",
    label: "Family Hotel"
  }, {
    value: "pet-friendly",
    label: "Pet-Friendly Hotel"
  }, {
    value: "themed-hotel",
    label: "Themed Hotel"
  }, {
    value: "lgbtq-friendly",
    label: "LGBTQ+ Friendly Hotel"
  }, {
    value: "lifestyle-hotel",
    label: "Lifestyle Hotel"
  }, {
    value: "adventure-hotel",
    label: "Adventure Hotel"
  }, {
    value: "digital-nomad",
    label: "Digital Nomad Hotel"
  }, {
    value: "monastery-religious",
    label: "Monastery Stay / Religious Hotel"
  }, {
    value: "floating-houseboat",
    label: "Floating Hotel / Houseboat"
  }, {
    value: "ice-hotel",
    label: "Ice Hotel"
  }, {
    value: "treehouse",
    label: "Treehouse Hotel"
  }, {
    value: "cave-hotel",
    label: "Cave Hotel"
  }, {
    value: "underwater",
    label: "Underwater Hotel"
  }];
  const hotelChains = [
  // Marriott International
  {
    category: "Marriott International",
    value: "marriott-hotels-resorts",
    label: "Marriott Hotels & Resorts"
  }, {
    category: "Marriott International",
    value: "jw-marriott",
    label: "JW Marriott"
  }, {
    category: "Marriott International",
    value: "ritz-carlton",
    label: "The Ritz-Carlton"
  }, {
    category: "Marriott International",
    value: "edition",
    label: "Edition"
  }, {
    category: "Marriott International",
    value: "w-hotels",
    label: "W Hotels"
  }, {
    category: "Marriott International",
    value: "sheraton",
    label: "Sheraton"
  }, {
    category: "Marriott International",
    value: "westin",
    label: "Westin"
  }, {
    category: "Marriott International",
    value: "le-meridien",
    label: "Le Méridien"
  }, {
    category: "Marriott International",
    value: "renaissance-hotels",
    label: "Renaissance Hotels"
  }, {
    category: "Marriott International",
    value: "autograph-collection",
    label: "Autograph Collection"
  }, {
    category: "Marriott International",
    value: "tribute-portfolio",
    label: "Tribute Portfolio"
  }, {
    category: "Marriott International",
    value: "courtyard-marriott",
    label: "Courtyard by Marriott"
  }, {
    category: "Marriott International",
    value: "ac-hotels",
    label: "AC Hotels"
  }, {
    category: "Marriott International",
    value: "moxy-hotels",
    label: "Moxy Hotels"
  }, {
    category: "Marriott International",
    value: "residence-inn",
    label: "Residence Inn"
  }, {
    category: "Marriott International",
    value: "springhill-suites",
    label: "SpringHill Suites"
  }, {
    category: "Marriott International",
    value: "fairfield-inn-suites",
    label: "Fairfield Inn & Suites"
  }, {
    category: "Marriott International",
    value: "towneplace-suites",
    label: "TownePlace Suites"
  }, {
    category: "Marriott International",
    value: "marriott-executive-apartments",
    label: "Marriott Executive Apartments"
  }, {
    category: "Marriott International",
    value: "delta-hotels",
    label: "Delta Hotels"
  }, {
    category: "Marriott International",
    value: "protea-hotels",
    label: "Protea Hotels"
  }, {
    category: "Marriott International",
    value: "gaylord-hotels",
    label: "Gaylord Hotels"
  },
  // Hilton Worldwide
  {
    category: "Hilton Worldwide",
    value: "hilton-hotels-resorts",
    label: "Hilton Hotels & Resorts"
  }, {
    category: "Hilton Worldwide",
    value: "waldorf-astoria",
    label: "Waldorf Astoria"
  }, {
    category: "Hilton Worldwide",
    value: "conrad-hotels",
    label: "Conrad Hotels & Resorts"
  }, {
    category: "Hilton Worldwide",
    value: "lxr-hotels",
    label: "LXR Hotels & Resorts"
  }, {
    category: "Hilton Worldwide",
    value: "curio-collection",
    label: "Curio Collection"
  }, {
    category: "Hilton Worldwide",
    value: "canopy-hilton",
    label: "Canopy by Hilton"
  }, {
    category: "Hilton Worldwide",
    value: "signia-hilton",
    label: "Signia Hilton"
  }, {
    category: "Hilton Worldwide",
    value: "doubletree-hilton",
    label: "DoubleTree by Hilton"
  }, {
    category: "Hilton Worldwide",
    value: "tapestry-collection",
    label: "Tapestry Collection"
  }, {
    category: "Hilton Worldwide",
    value: "embassy-suites",
    label: "Embassy Suites"
  }, {
    category: "Hilton Worldwide",
    value: "hilton-garden-inn",
    label: "Hilton Garden Inn"
  }, {
    category: "Hilton Worldwide",
    value: "hampton-hilton",
    label: "Hampton by Hilton"
  }, {
    category: "Hilton Worldwide",
    value: "tru-hilton",
    label: "Tru by Hilton"
  }, {
    category: "Hilton Worldwide",
    value: "homewood-suites",
    label: "Homewood Suites"
  }, {
    category: "Hilton Worldwide",
    value: "home2-suites",
    label: "Home2 Suites"
  }, {
    category: "Hilton Worldwide",
    value: "hilton-grand-vacations",
    label: "Hilton Grand Vacations"
  },
  // InterContinental Hotels Group (IHG)
  {
    category: "InterContinental Hotels Group (IHG)",
    value: "intercontinental-hotels",
    label: "InterContinental Hotels & Resorts"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "kimpton-hotels",
    label: "Kimpton Hotels"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "regent-hotels",
    label: "Regent Hotels"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "hotel-indigo",
    label: "Hotel Indigo"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "voco",
    label: "voco"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "hualuxe-hotels",
    label: "Hualuxe Hotels"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "crowne-plaza",
    label: "Crowne Plaza"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "even-hotels",
    label: "Even Hotels"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "holiday-inn",
    label: "Holiday Inn"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "holiday-inn-express",
    label: "Holiday Inn Express"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "holiday-inn-resort",
    label: "Holiday Inn Resort"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "holiday-inn-club",
    label: "Holiday Inn Club Vacations"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "avid-hotels",
    label: "Avid Hotels"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "staybridge-suites",
    label: "Staybridge Suites"
  }, {
    category: "InterContinental Hotels Group (IHG)",
    value: "candlewood-suites",
    label: "Candlewood Suites"
  },
  // Accor Group
  {
    category: "Accor Group",
    value: "sofitel",
    label: "Sofitel"
  }, {
    category: "Accor Group",
    value: "fairmont",
    label: "Fairmont"
  }, {
    category: "Accor Group",
    value: "raffles",
    label: "Raffles"
  }, {
    category: "Accor Group",
    value: "pullman",
    label: "Pullman"
  }, {
    category: "Accor Group",
    value: "mgallery",
    label: "MGallery"
  }, {
    category: "Accor Group",
    value: "swissotel",
    label: "Swissôtel"
  }, {
    category: "Accor Group",
    value: "movenpick",
    label: "Mövenpick"
  }, {
    category: "Accor Group",
    value: "grand-mercure",
    label: "Grand Mercure"
  }, {
    category: "Accor Group",
    value: "novotel",
    label: "Novotel"
  }, {
    category: "Accor Group",
    value: "mercure",
    label: "Mercure"
  }, {
    category: "Accor Group",
    value: "adagio",
    label: "Adagio"
  }, {
    category: "Accor Group",
    value: "ibis",
    label: "ibis"
  }, {
    category: "Accor Group",
    value: "ibis-styles",
    label: "ibis Styles"
  }, {
    category: "Accor Group",
    value: "ibis-budget",
    label: "ibis Budget"
  }, {
    category: "Accor Group",
    value: "the-sebel",
    label: "The Sebel"
  }, {
    category: "Accor Group",
    value: "tribe",
    label: "Tribe"
  }, {
    category: "Accor Group",
    value: "orient-express",
    label: "Orient Express"
  }, {
    category: "Accor Group",
    value: "mama-shelter",
    label: "Mama Shelter"
  }, {
    category: "Accor Group",
    value: "25hours-hotels",
    label: "25hours Hotels"
  }, {
    category: "Accor Group",
    value: "jo-joe",
    label: "Jo&Joe"
  }, {
    category: "Accor Group",
    value: "greet",
    label: "Greet"
  }, {
    category: "Accor Group",
    value: "banyan-tree",
    label: "Banyan Tree"
  },
  // Hyatt Hotels Corporation
  {
    category: "Hyatt Hotels Corporation",
    value: "park-hyatt",
    label: "Park Hyatt"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "grand-hyatt",
    label: "Grand Hyatt"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "hyatt-regency",
    label: "Hyatt Regency"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "andaz",
    label: "Andaz"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "alila",
    label: "Alila"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "thompson-hotels",
    label: "Thompson Hotels"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "hyatt-centric",
    label: "Hyatt Centric"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "jdv-hyatt",
    label: "JdV by Hyatt (Joie de Vivre)"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "unbound-collection",
    label: "The Unbound Collection"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "caption-hyatt",
    label: "Caption by Hyatt"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "hyatt-place",
    label: "Hyatt Place"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "hyatt-house",
    label: "Hyatt House"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "destination-hyatt",
    label: "Destination by Hyatt"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "miraval",
    label: "Miraval"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "secrets-resorts",
    label: "Secrets Resorts & Spas"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "dreams-resorts",
    label: "Dreams Resorts & Spas"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "zoetry-wellness",
    label: "Zoëtry Wellness & Spa Resorts"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "alua-hotels",
    label: "Alua Hotels & Resorts"
  }, {
    category: "Hyatt Hotels Corporation",
    value: "breathless-resorts",
    label: "Breathless Resorts & Spas"
  },
  // Radisson Hotel Group
  {
    category: "Radisson Hotel Group",
    value: "radisson-collection",
    label: "Radisson Collection"
  }, {
    category: "Radisson Hotel Group",
    value: "radisson-blu",
    label: "Radisson Blu"
  }, {
    category: "Radisson Hotel Group",
    value: "radisson-red",
    label: "Radisson RED"
  }, {
    category: "Radisson Hotel Group",
    value: "radisson-individuals",
    label: "Radisson Individuals"
  }, {
    category: "Radisson Hotel Group",
    value: "radisson",
    label: "Radisson"
  }, {
    category: "Radisson Hotel Group",
    value: "park-plaza",
    label: "Park Plaza"
  }, {
    category: "Radisson Hotel Group",
    value: "park-inn-radisson",
    label: "Park Inn by Radisson"
  }, {
    category: "Radisson Hotel Group",
    value: "country-inn-suites",
    label: "Country Inn & Suites by Radisson"
  }, {
    category: "Radisson Hotel Group",
    value: "prizeotel",
    label: "Prizeotel"
  }, {
    category: "Radisson Hotel Group",
    value: "artotel",
    label: "Art'otel"
  },
  // Wyndham Hotels & Resorts
  {
    category: "Wyndham Hotels & Resorts",
    value: "wyndham-grand",
    label: "Wyndham Grand"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "dolce-hotels",
    label: "Dolce Hotels & Resorts"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "tryp-wyndham",
    label: "TRYP by Wyndham"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "wyndham",
    label: "Wyndham"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "esplendor",
    label: "Esplendor"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "dazzler-hotels",
    label: "Dazzler Hotels"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "wingate-wyndham",
    label: "Wingate by Wyndham"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "ramada",
    label: "Ramada"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "ramada-encore",
    label: "Ramada Encore"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "baymont-wyndham",
    label: "Baymont by Wyndham"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "microtel-inn",
    label: "Microtel Inn & Suites"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "days-inn",
    label: "Days Inn"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "super-8",
    label: "Super 8"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "howard-johnson",
    label: "Howard Johnson"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "travelodge",
    label: "Travelodge"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "la-quinta",
    label: "La Quinta Inn & Suites"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "americinn",
    label: "AmericInn"
  }, {
    category: "Wyndham Hotels & Resorts",
    value: "hawthorn-suites",
    label: "Hawthorn Suites"
  },
  // Choice Hotels International
  {
    category: "Choice Hotels International",
    value: "ascend-hotel",
    label: "Ascend Hotel Collection"
  }, {
    category: "Choice Hotels International",
    value: "cambria-hotels",
    label: "Cambria Hotels"
  }, {
    category: "Choice Hotels International",
    value: "clarion",
    label: "Clarion"
  }, {
    category: "Choice Hotels International",
    value: "quality-inn",
    label: "Quality Inn"
  }, {
    category: "Choice Hotels International",
    value: "comfort-inn",
    label: "Comfort Inn / Comfort Suites"
  }, {
    category: "Choice Hotels International",
    value: "sleep-inn",
    label: "Sleep Inn"
  }, {
    category: "Choice Hotels International",
    value: "econo-lodge",
    label: "Econo Lodge"
  }, {
    category: "Choice Hotels International",
    value: "rodeway-inn",
    label: "Rodeway Inn"
  }, {
    category: "Choice Hotels International",
    value: "mainstay-suites",
    label: "MainStay Suites"
  }, {
    category: "Choice Hotels International",
    value: "woodspring-suites",
    label: "WoodSpring Suites"
  }, {
    category: "Choice Hotels International",
    value: "everhome-suites",
    label: "Everhome Suites"
  }, {
    category: "Choice Hotels International",
    value: "suburban-extended",
    label: "Suburban Extended Stay"
  },
  // Minor Hotels
  {
    category: "Minor Hotels",
    value: "anantara",
    label: "Anantara Hotels & Resorts"
  }, {
    category: "Minor Hotels",
    value: "avani-hotels",
    label: "Avani Hotels & Resorts"
  }, {
    category: "Minor Hotels",
    value: "oaks-hotels",
    label: "Oaks Hotels & Resorts"
  }, {
    category: "Minor Hotels",
    value: "tivoli-hotels",
    label: "Tivoli Hotels"
  }, {
    category: "Minor Hotels",
    value: "nh-hotels",
    label: "NH Hotels"
  }, {
    category: "Minor Hotels",
    value: "nh-collection",
    label: "NH Collection"
  }, {
    category: "Minor Hotels",
    value: "nhow",
    label: "nhow"
  }, {
    category: "Minor Hotels",
    value: "elewana-collection",
    label: "Elewana Collection"
  },
  // Melia Hotels International
  {
    category: "Melia Hotels International",
    value: "gran-melia",
    label: "Gran Meliá"
  }, {
    category: "Melia Hotels International",
    value: "me-melia",
    label: "ME by Meliá"
  }, {
    category: "Melia Hotels International",
    value: "paradisus-melia",
    label: "Paradisus by Meliá"
  }, {
    category: "Melia Hotels International",
    value: "melia-hotels",
    label: "Meliá Hotels & Resorts"
  }, {
    category: "Melia Hotels International",
    value: "innside-melia",
    label: "INNSiDE by Meliá"
  }, {
    category: "Melia Hotels International",
    value: "sol-hotels",
    label: "Sol Hotels"
  },
  // Louvre Hotels Group
  {
    category: "Louvre Hotels Group",
    value: "royal-tulip",
    label: "Royal Tulip"
  }, {
    category: "Louvre Hotels Group",
    value: "golden-tulip",
    label: "Golden Tulip"
  }, {
    category: "Louvre Hotels Group",
    value: "tulip-inn",
    label: "Tulip Inn"
  }, {
    category: "Louvre Hotels Group",
    value: "campanile",
    label: "Campanile"
  }, {
    category: "Louvre Hotels Group",
    value: "kyriad",
    label: "Kyriad"
  }, {
    category: "Louvre Hotels Group",
    value: "premiere-classe",
    label: "Première Classe"
  }, {
    category: "Louvre Hotels Group",
    value: "hotels-preference",
    label: "Hôtels & Préférence"
  }, {
    category: "Louvre Hotels Group",
    value: "metropolo",
    label: "Metropolo"
  }, {
    category: "Louvre Hotels Group",
    value: "sarovar-hotels",
    label: "Sarovar Hotels"
  },
  // Best Western Hotels & Resorts
  {
    category: "Best Western Hotels & Resorts",
    value: "best-western",
    label: "Best Western"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "best-western-plus",
    label: "Best Western Plus"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "best-western-premier",
    label: "Best Western Premier"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "bw-signature",
    label: "BW Signature Collection"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "bw-premier",
    label: "BW Premier Collection"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "surestay-hotel",
    label: "SureStay Hotel by Best Western"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "surestay-plus",
    label: "SureStay Plus"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "surestay-studio",
    label: "SureStay Studio"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "surestay-collection",
    label: "SureStay Collection"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "aiden-best-western",
    label: "Aiden by Best Western"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "sadie-best-western",
    label: "Sadie by Best Western"
  }, {
    category: "Best Western Hotels & Resorts",
    value: "executive-residency",
    label: "Executive Residency by Best Western"
  },
  // Other Notable Regional & Luxury Groups
  {
    category: "Other Notable Groups",
    value: "four-seasons",
    label: "Four Seasons Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "leading-hotels",
    label: "The Leading Hotels of the World (LHW)"
  }, {
    category: "Other Notable Groups",
    value: "rosewood-hotels",
    label: "Rosewood Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "mandarin-oriental",
    label: "Mandarin Oriental Hotel Group"
  }, {
    category: "Other Notable Groups",
    value: "belmond",
    label: "Belmond"
  }, {
    category: "Other Notable Groups",
    value: "aman-resorts",
    label: "Aman Resorts"
  }, {
    category: "Other Notable Groups",
    value: "six-senses",
    label: "Six Senses"
  }, {
    category: "Other Notable Groups",
    value: "bulgari-hotels",
    label: "Bulgari Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "capella-hotels",
    label: "Capella Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "oberoi-hotels",
    label: "Oberoi Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "taj-hotels",
    label: "Taj Hotels (IHCL)"
  }, {
    category: "Other Notable Groups",
    value: "itc-hotels",
    label: "ITC Hotels"
  }, {
    category: "Other Notable Groups",
    value: "jumeirah-hotels",
    label: "Jumeirah Hotels & Resorts"
  }, {
    category: "Other Notable Groups",
    value: "shangri-la",
    label: "Shangri-La Hotels and Resorts"
  }, {
    category: "Other Notable Groups",
    value: "langham-hotels",
    label: "Langham Hotels"
  }, {
    category: "Other Notable Groups",
    value: "ghm-hotels",
    label: "GHM Hotels"
  }, {
    category: "Other Notable Groups",
    value: "dusit-international",
    label: "Dusit International"
  }, {
    category: "Other Notable Groups",
    value: "millennium-copthorne",
    label: "Millennium & Copthorne Hotels"
  }, {
    category: "Other Notable Groups",
    value: "citizenm",
    label: "CitizenM"
  }, {
    category: "Other Notable Groups",
    value: "selina-hotels",
    label: "Selina Hotels"
  }, {
    category: "Other Notable Groups",
    value: "zoku",
    label: "Zoku"
  }, {
    category: "Other Notable Groups",
    value: "red-planet",
    label: "Red Planet Hotels"
  }, {
    category: "Other Notable Groups",
    value: "yotel",
    label: "Yotel"
  }];
  const starRatings = [{
    value: "1",
    label: "1 Star"
  }, {
    value: "2",
    label: "2 Stars"
  }, {
    value: "3",
    label: "3 Stars"
  }, {
    value: "4",
    label: "4 Stars"
  }, {
    value: "5",
    label: "5 Stars"
  }];
  const countries = [{
    value: "us",
    label: "United States"
  }, {
    value: "uk",
    label: "United Kingdom"
  }, {
    value: "ca",
    label: "Canada"
  }, {
    value: "au",
    label: "Australia"
  }, {
    value: "de",
    label: "Germany"
  }, {
    value: "fr",
    label: "France"
  }, {
    value: "es",
    label: "Spain"
  }, {
    value: "it",
    label: "Italy"
  }, {
    value: "jp",
    label: "Japan"
  }, {
    value: "ae",
    label: "United Arab Emirates"
  }];
  const roomCategories = [{
    value: "single-room",
    label: "Single Room"
  }, {
    value: "double-room",
    label: "Double Room"
  }, {
    value: "twin-room",
    label: "Twin Room"
  }, {
    value: "triple-room",
    label: "Triple Room"
  }, {
    value: "quad-room",
    label: "Quad Room"
  }, {
    value: "king-room",
    label: "King Room"
  }, {
    value: "queen-room",
    label: "Queen Room"
  }, {
    value: "double-double-room",
    label: "Double Double Room"
  }, {
    value: "studio-room",
    label: "Studio Room"
  }, {
    value: "suite",
    label: "Suite"
  }, {
    value: "junior-suite",
    label: "Junior Suite"
  }, {
    value: "executive-suite",
    label: "Executive Suite"
  }, {
    value: "presidential-suite",
    label: "Presidential Suite"
  }, {
    value: "penthouse-suite",
    label: "Penthouse Suite"
  }, {
    value: "connecting-rooms",
    label: "Connecting Rooms"
  }, {
    value: "adjoining-rooms",
    label: "Adjoining Rooms"
  }, {
    value: "accessible-room",
    label: "Accessible Room (ADA / Mobility-Friendly)"
  }, {
    value: "family-room",
    label: "Family Room"
  }, {
    value: "bunk-room",
    label: "Bunk Room"
  }, {
    value: "sofa-bed-room",
    label: "Sofa Bed Room"
  }, {
    value: "apartment-condo-suite",
    label: "Apartment / Condo Suite"
  }, {
    value: "duplex-room-loft",
    label: "Duplex Room / Loft"
  }, {
    value: "cabana-room",
    label: "Cabana Room"
  }, {
    value: "garden-room",
    label: "Garden Room"
  }, {
    value: "pool-access-room",
    label: "Pool Access Room"
  }, {
    value: "sea-view-room",
    label: "Sea View Room"
  }, {
    value: "mountain-view-room",
    label: "Mountain View Room"
  }, {
    value: "city-view-room",
    label: "City View Room"
  }, {
    value: "courtyard-view-room",
    label: "Courtyard View Room"
  }, {
    value: "balcony-room",
    label: "Balcony Room"
  }, {
    value: "smoking-room",
    label: "Smoking Room"
  }, {
    value: "non-smoking-room",
    label: "Non-Smoking Room"
  }];
  const bedTypes = [{
    value: "king",
    label: "King"
  }, {
    value: "queen",
    label: "Queen"
  }, {
    value: "twin",
    label: "Twin"
  }, {
    value: "bunk",
    label: "Bunk"
  }, {
    value: "sofa-bed",
    label: "Sofa Bed"
  }];
  const amenitiesList = [
  // Room Amenities
  {
    category: "Room Amenities",
    id: "air-conditioning",
    label: "Air Conditioning",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "heating",
    label: "Heating",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "flat-screen-tv",
    label: "Flat-Screen TV",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "satellite-cable",
    label: "Satellite / Cable Channels",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "wifi",
    label: "Wi-Fi / High-Speed Internet",
    icon: Wifi
  }, {
    category: "Room Amenities",
    id: "minibar",
    label: "Minibar",
    icon: Coffee
  }, {
    category: "Room Amenities",
    id: "safe-lockbox",
    label: "Safe / Lockbox",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "desk-workstation",
    label: "Desk / Workstation",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "coffee-maker",
    label: "Coffee Maker / Nespresso Machine",
    icon: Coffee
  }, {
    category: "Room Amenities",
    id: "kettle-tea",
    label: "Kettle / Tea Set",
    icon: Coffee
  }, {
    category: "Room Amenities",
    id: "telephone",
    label: "Telephone",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "alarm-clock",
    label: "Alarm Clock / Wake-Up Service",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "iron-board",
    label: "Iron and Ironing Board",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "hairdryer",
    label: "Hairdryer",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "bathrobe-slippers",
    label: "Bathrobe & Slippers",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "blackout-curtains",
    label: "Blackout Curtains",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "balcony-terrace",
    label: "Balcony / Terrace",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "soundproofed",
    label: "Soundproofed Rooms",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "smoking-options",
    label: "Smoking / Non-Smoking Options",
    icon: Hotel
  }, {
    category: "Room Amenities",
    id: "room-service",
    label: "In-Room Dining / Room Service",
    icon: Utensils
  }, {
    category: "Room Amenities",
    id: "kitchenette",
    label: "Kitchenette / Full Kitchen",
    icon: Utensils
  }, {
    category: "Room Amenities",
    id: "laundry-facilities",
    label: "Laundry Facilities (In-Room or Shared)",
    icon: Hotel
  },
  // Bathroom Amenities
  {
    category: "Bathroom Amenities",
    id: "walk-in-shower",
    label: "Walk-in Shower",
    icon: Waves
  }, {
    category: "Bathroom Amenities",
    id: "bathtub",
    label: "Bathtub (Standard, Jetted, or Soaking)",
    icon: Waves
  }, {
    category: "Bathroom Amenities",
    id: "double-vanity",
    label: "Double Vanity",
    icon: Hotel
  }, {
    category: "Bathroom Amenities",
    id: "premium-toiletries",
    label: "Premium Toiletries",
    icon: Hotel
  }, {
    category: "Bathroom Amenities",
    id: "bidet",
    label: "Bidet",
    icon: Hotel
  }, {
    category: "Bathroom Amenities",
    id: "towel-warmer",
    label: "Towel Warmer",
    icon: Hotel
  }, {
    category: "Bathroom Amenities",
    id: "makeup-mirror",
    label: "Makeup Mirror",
    icon: Hotel
  }, {
    category: "Bathroom Amenities",
    id: "bathroom-phone",
    label: "Bathroom Phone",
    icon: Hotel
  },
  // Connectivity & Tech
  {
    category: "Connectivity & Tech",
    id: "free-wifi",
    label: "Free Wi-Fi",
    icon: Wifi
  }, {
    category: "Connectivity & Tech",
    id: "wired-internet",
    label: "Wired Internet",
    icon: Wifi
  }, {
    category: "Connectivity & Tech",
    id: "smart-tv",
    label: "Smart TV / Streaming Access",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "usb-charging",
    label: "USB Charging Ports",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "bluetooth-speakers",
    label: "Bluetooth Speakers",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "chromecast-appletv",
    label: "Chromecast or Apple TV",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "digital-key",
    label: "Digital Key or Mobile Room Access",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "smart-lighting",
    label: "Smart Lighting / Thermostat",
    icon: Hotel
  }, {
    category: "Connectivity & Tech",
    id: "room-tablet",
    label: "In-room Tablet / Hotel App Access",
    icon: Hotel
  },
  // Food & Beverage
  {
    category: "Food & Beverage",
    id: "onsite-restaurants",
    label: "On-Site Restaurant(s)",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "bar-lounge",
    label: "Bar / Lounge",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "rooftop-bar",
    label: "Rooftop Bar",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "pool-bar",
    label: "Pool Bar",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "breakfast-buffet",
    label: "Breakfast Buffet",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "alacarte-breakfast",
    label: "À La Carte Breakfast",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "room-dining",
    label: "In-Room Dining / Room Service",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "grab-go",
    label: "Grab & Go / Deli Counter",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "cafe-coffee",
    label: "Café / Coffee Shop",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "mini-market",
    label: "Mini Market / Convenience Store",
    icon: Hotel
  }, {
    category: "Food & Beverage",
    id: "wine-cellar",
    label: "Wine Cellar / Tasting Room",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "welcome-drink",
    label: "Complimentary Welcome Drink",
    icon: Coffee
  }, {
    category: "Food & Beverage",
    id: "kids-menu",
    label: "Kids' Menu or High Chairs",
    icon: Utensils
  }, {
    category: "Food & Beverage",
    id: "special-diet",
    label: "Special Diet Menus (Vegan, Gluten-Free, etc.)",
    icon: Utensils
  },
  // Wellness & Fitness
  {
    category: "Wellness & Fitness",
    id: "spa",
    label: "Spa",
    icon: Hotel
  }, {
    category: "Wellness & Fitness",
    id: "sauna",
    label: "Sauna",
    icon: Hotel
  }, {
    category: "Wellness & Fitness",
    id: "steam-room",
    label: "Steam Room",
    icon: Hotel
  }, {
    category: "Wellness & Fitness",
    id: "jacuzzi-hot-tub",
    label: "Jacuzzi / Hot Tub",
    icon: Waves
  }, {
    category: "Wellness & Fitness",
    id: "massage-services",
    label: "Massage Services",
    icon: Hotel
  }, {
    category: "Wellness & Fitness",
    id: "yoga-studio",
    label: "Yoga Studio",
    icon: Dumbbell
  }, {
    category: "Wellness & Fitness",
    id: "meditation-room",
    label: "Meditation Room",
    icon: Hotel
  }, {
    category: "Wellness & Fitness",
    id: "fitness-center",
    label: "Fitness Center / Gym",
    icon: Dumbbell
  }, {
    category: "Wellness & Fitness",
    id: "personal-trainer",
    label: "Personal Trainer",
    icon: Dumbbell
  }, {
    category: "Wellness & Fitness",
    id: "fitness-classes",
    label: "Fitness Classes",
    icon: Dumbbell
  }, {
    category: "Wellness & Fitness",
    id: "wellness-packages",
    label: "Wellness Retreat Packages",
    icon: Hotel
  },
  // Leisure & Recreation
  {
    category: "Leisure & Recreation",
    id: "outdoor-pool",
    label: "Outdoor Pool",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "indoor-pool",
    label: "Indoor Pool",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "children-pool",
    label: "Children's Pool",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "infinity-pool",
    label: "Infinity Pool",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "rooftop-pool",
    label: "Rooftop Pool",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "beach-access",
    label: "Private Beach Access",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "cabanas-poolside",
    label: "Cabanas / Poolside Lounge",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "game-room",
    label: "Game Room",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "cinema",
    label: "Cinema / Screening Room",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "library",
    label: "Library / Reading Room",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "garden-courtyard",
    label: "Garden or Courtyard",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "bike-rental",
    label: "Bike Rental",
    icon: Car
  }, {
    category: "Leisure & Recreation",
    id: "water-sports",
    label: "Water Sports Equipment",
    icon: Waves
  }, {
    category: "Leisure & Recreation",
    id: "golf-course",
    label: "Golf Course Access",
    icon: Hotel
  }, {
    category: "Leisure & Recreation",
    id: "tennis-courts",
    label: "Tennis Courts",
    icon: Hotel
  },
  // Family & Kids
  {
    category: "Family & Kids",
    id: "family-rooms",
    label: "Family Rooms / Connecting Rooms",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "baby-cots",
    label: "Baby Cots / Cribs",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "babysitting",
    label: "Babysitting Services",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "kids-club",
    label: "Kids' Club",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "children-activities",
    label: "Children's Activities",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "playground",
    label: "Playground",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "childproofing",
    label: "Childproofing Equipment",
    icon: Users
  }, {
    category: "Family & Kids",
    id: "children-pool-kids",
    label: "Children's Pool",
    icon: Waves
  },
  // Pet-Friendly Services
  {
    category: "Pet-Friendly Services",
    id: "pet-rooms",
    label: "Pet-Friendly Rooms",
    icon: Hotel
  }, {
    category: "Pet-Friendly Services",
    id: "pet-welcome",
    label: "Pet Welcome Kit",
    icon: Hotel
  }, {
    category: "Pet-Friendly Services",
    id: "dog-park",
    label: "On-Site Dog Park",
    icon: Hotel
  }, {
    category: "Pet-Friendly Services",
    id: "pet-sitting",
    label: "Pet Sitting or Walking",
    icon: Hotel
  }, {
    category: "Pet-Friendly Services",
    id: "pet-menu",
    label: "Pet Menu or Treats",
    icon: Utensils
  }, {
    category: "Pet-Friendly Services",
    id: "pet-spa",
    label: "Pet Spa / Grooming",
    icon: Hotel
  },
  // Shopping & Retail
  {
    category: "Shopping & Retail",
    id: "gift-shop",
    label: "Gift Shop",
    icon: Hotel
  }, {
    category: "Shopping & Retail",
    id: "boutiques",
    label: "Designer Boutiques",
    icon: Hotel
  }, {
    category: "Shopping & Retail",
    id: "beauty-salon",
    label: "Beauty Salon / Hairdresser",
    icon: Hotel
  }, {
    category: "Shopping & Retail",
    id: "jewelry-shop",
    label: "Jewelry or Watch Shop",
    icon: Hotel
  }, {
    category: "Shopping & Retail",
    id: "art-gallery",
    label: "Art Gallery",
    icon: Hotel
  },
  // Business & Events
  {
    category: "Business & Events",
    id: "business-center",
    label: "Business Center",
    icon: Hotel
  }, {
    category: "Business & Events",
    id: "meeting-rooms",
    label: "Meeting Rooms",
    icon: Users
  }, {
    category: "Business & Events",
    id: "conference-rooms",
    label: "Conference Rooms",
    icon: Users
  }, {
    category: "Business & Events",
    id: "event-venues",
    label: "Event Venues / Banquet Halls",
    icon: Users
  }, {
    category: "Business & Events",
    id: "coworking",
    label: "Coworking Space",
    icon: Hotel
  }, {
    category: "Business & Events",
    id: "av-equipment",
    label: "AV Equipment Rental",
    icon: Hotel
  }, {
    category: "Business & Events",
    id: "printing",
    label: "Printing / Scanning Services",
    icon: Hotel
  }, {
    category: "Business & Events",
    id: "executive-lounge",
    label: "Executive Lounge",
    icon: Hotel
  }, {
    category: "Business & Events",
    id: "vip-checkin",
    label: "VIP Check-In Area",
    icon: Hotel
  },
  // Transportation & Access
  {
    category: "Transportation & Access",
    id: "onsite-parking",
    label: "On-Site Parking",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "valet-parking",
    label: "Valet Parking",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "ev-charging",
    label: "EV Charging Station",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "airport-shuttle",
    label: "Airport Shuttle",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "chauffeur",
    label: "Chauffeur / Car Service",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "bike-scooter",
    label: "Bike or Scooter Rentals",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "private-jet",
    label: "Private Jet Transfer",
    icon: Car
  }, {
    category: "Transportation & Access",
    id: "dock-marina",
    label: "Dock / Marina Access",
    icon: Waves
  }, {
    category: "Transportation & Access",
    id: "helipad",
    label: "Helipad",
    icon: Car
  },
  // Accessibility Features
  {
    category: "Accessibility Features",
    id: "wheelchair-rooms",
    label: "Wheelchair Accessible Rooms",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "elevator-access",
    label: "Elevator Access",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "braille-signage",
    label: "Braille Signage",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "visual-alarm",
    label: "Visual Alarm Alert",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "accessible-bathrooms",
    label: "Accessible Bathrooms",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "ramps",
    label: "Ramps / Step-Free Entry",
    icon: Hotel
  }, {
    category: "Accessibility Features",
    id: "hearing-aid",
    label: "Hearing Aid Compatible Phones",
    icon: Hotel
  },
  // Safety & Security
  {
    category: "Safety & Security",
    id: "24hour-security",
    label: "24-Hour Security",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "key-card",
    label: "Key Card Access",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "fire-alarms",
    label: "Fire Alarms & Smoke Detectors",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "cctv",
    label: "CCTV in Common Areas",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "inroom-safe",
    label: "In-Room Safe",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "emergency-procedures",
    label: "Emergency Procedures / Evacuation Maps",
    icon: Hotel
  }, {
    category: "Safety & Security",
    id: "security-staff",
    label: "Security Staff or Concierge",
    icon: Hotel
  },
  // General Services
  {
    category: "General Services",
    id: "24hour-reception",
    label: "24-Hour Reception",
    icon: Hotel
  }, {
    category: "General Services",
    id: "concierge",
    label: "Concierge Services",
    icon: Hotel
  }, {
    category: "General Services",
    id: "luggage-storage",
    label: "Luggage Storage",
    icon: Hotel
  }, {
    category: "General Services",
    id: "daily-housekeeping",
    label: "Daily Housekeeping",
    icon: Hotel
  }, {
    category: "General Services",
    id: "dry-cleaning",
    label: "Dry Cleaning / Laundry",
    icon: Hotel
  }, {
    category: "General Services",
    id: "shoe-shine",
    label: "Shoe Shine",
    icon: Hotel
  }, {
    category: "General Services",
    id: "currency-exchange",
    label: "Currency Exchange",
    icon: Hotel
  }, {
    category: "General Services",
    id: "multilingual-staff",
    label: "Multilingual Staff",
    icon: Hotel
  }, {
    category: "General Services",
    id: "wake-up-call",
    label: "Wake-Up Call",
    icon: Hotel
  }, {
    category: "General Services",
    id: "early-checkin",
    label: "Early Check-In / Late Check-Out",
    icon: Hotel
  }, {
    category: "General Services",
    id: "express-checkin",
    label: "Express Check-In / Check-Out",
    icon: Hotel
  }, {
    category: "General Services",
    id: "butler-service",
    label: "Butler Service",
    icon: Hotel
  }, {
    category: "General Services",
    id: "turndown-service",
    label: "Turndown Service",
    icon: Hotel
  }];
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
        priceCurrency: currentRoom.priceCurrency || 'USD',
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
  const addHotelVirtualTour = () => {
    const newTour = {
      id: Date.now().toString(),
      name: '',
      url: '',
      file: undefined
    };
    setHotelVirtualTours([...hotelVirtualTours, newTour]);
  };
  const removeHotelVirtualTour = (id: string) => {
    setHotelVirtualTours(hotelVirtualTours.filter(tour => tour.id !== id));
  };
  const updateHotelVirtualTour = (id: string, field: string, value: any) => {
    setHotelVirtualTours(hotelVirtualTours.map(tour => tour.id === id ? {
      ...tour,
      [field]: value
    } : tour));
  };
  return <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex gap-6">
          <TabsList className="flex flex-col h-fit w-48 p-1">
            <TabsTrigger value="overview" className="w-full justify-start">Overview</TabsTrigger>
            <TabsTrigger value="location" className="w-full justify-start">Location</TabsTrigger>
            <TabsTrigger value="amenities" className="w-full justify-start">Amenities</TabsTrigger>
            <TabsTrigger value="rooms" className="w-full justify-start">Rooms</TabsTrigger>
            <TabsTrigger value="media" className="w-full justify-start">Media & Files</TabsTrigger>
            <TabsTrigger value="submission" className="w-full justify-start">Visibility</TabsTrigger>
          </TabsList>
          
          <div className="flex-1">

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
                <FormField control={form.control} name="hotelName" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Hotel Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter hotel name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="hotelCategory" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Hotel Category *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border shadow-lg z-50">
                          {hotelCategories.map(category => <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>} />

                 <FormField control={form.control} name="hotelChain" render={({
                    field
                  }) => <FormItem>
                       <FormLabel>Hotel Chain</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="bg-background border-border">
                             <SelectValue placeholder="Select hotel chain" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent className="bg-background border-border shadow-lg z-50 max-h-96 overflow-y-auto">
                           {Object.entries(hotelChains.reduce((acc, chain) => {
                          if (!acc[chain.category]) {
                            acc[chain.category] = [];
                          }
                          acc[chain.category].push(chain);
                          return acc;
                        }, {} as Record<string, typeof hotelChains>)).map(([category, categoryChains]) => <div key={category}>
                               <div className="px-2 py-1 text-xs font-semibold text-muted-foreground border-b">
                                 {category}
                               </div>
                               {categoryChains.map(chain => <SelectItem key={chain.value} value={chain.value}>
                                   {chain.label}
                                 </SelectItem>)}
                             </div>)}
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>} />

                 <FormField control={form.control} name="starRating" render={({
                    field
                  }) => <FormItem>
                       <FormLabel>Star Rating</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                         <FormControl>
                           <SelectTrigger className="bg-background border-border">
                             <SelectValue placeholder="Select rating" />
                           </SelectTrigger>
                         </FormControl>
                         <SelectContent className="bg-background border-border shadow-lg z-50">
                           {starRatings.map(rating => <SelectItem key={rating.value} value={rating.value}>
                               <div className="flex items-center gap-1">
                                 {[...Array(parseInt(rating.value))].map((_, i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                                 <span className="ml-1">{rating.label}</span>
                               </div>
                             </SelectItem>)}
                         </SelectContent>
                       </Select>
                       <FormMessage />
                     </FormItem>} />

                 <FormField control={form.control} name="numberOfFloors" render={({
                    field
                  }) => <FormItem>
                       <FormLabel>Number of Floors</FormLabel>
                       <FormControl>
                         <Input type="number" placeholder="e.g., 15" {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>} />
               </div>

              <FormField control={form.control} name="description" render={({
                  field
                }) => <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief overview of the property (max 500 characters)" maxLength={500} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="fullDescription" render={({
                  field
                }) => <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detailed description of the property" rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 2: Hotel Location */}
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Hotel Location
              </CardTitle>
              <CardDescription>Location details and address information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="fullAddress" render={({
                  field
                }) => <FormItem>
                    <FormLabel>Full Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Complete street address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="city" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>City *</FormLabel>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="state" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="State or Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="postalCode" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="ZIP/Postal Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <FormField control={form.control} name="country" render={({
                  field
                }) => <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="googlePlusCode" render={({
                  field
                }) => <FormItem>
                    <FormLabel>Google Plus Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 8Q7X+VW New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="latitude" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 40.7128" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="longitude" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., -74.0060" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Select Location on Map</h4>
                    <p className="text-sm text-muted-foreground">Click on the map to set the hotel location</p>
                  </div>
                </div>
                <div className="h-96 border rounded-lg overflow-hidden">
                  <MapboxLocationPicker coordinates={mapCoordinates} onCoordinatesChange={coords => {
                      setMapCoordinates(coords);
                      if (coords) {
                        form.setValue('latitude', coords.lat.toString());
                        form.setValue('longitude', coords.lng.toString());
                      }
                    }} zoom={mapZoom} onZoomChange={setMapZoom} className="w-full h-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 3: Hotel Media & Files */}
        <TabsContent value="media" className="space-y-6">
          {/* 1. Section: Parent Hotel Media */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hotel className="h-5 w-5" />
                Hotel Media (Main Property)
              </CardTitle>
              <CardDescription>Upload general media assets that represent the hotel as a whole</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 360 Virtual Tours */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    360 Virtual Tours
                  </h4>
                  <Button type="button" onClick={addHotelVirtualTour} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Tour
                  </Button>
                </div>
                
                {hotelVirtualTours.length === 0 && <div className="text-center py-8 border border-dashed border-border rounded-lg">
                    <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-4">No virtual tours added yet</p>
                    <Button type="button" onClick={addHotelVirtualTour} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add First Tour
                    </Button>
                  </div>}

                {hotelVirtualTours.map((tour, index) => <div key={tour.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium">Tour {index + 1}</h5>
                      <Button type="button" onClick={() => removeHotelVirtualTour(tour.id)} variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Tour Name</label>
                        <Input placeholder="Enter tour name (e.g., Main Lobby Tour, Pool Area)" value={tour.name} onChange={e => updateHotelVirtualTour(tour.id, 'name', e.target.value)} />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Tour URL</label>
                          <Input placeholder="Matterport, Kuula, 3DVista URL" value={tour.url} onChange={e => updateHotelVirtualTour(tour.id, 'url', e.target.value)} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Tour File</label>
                          <div className="border border-border rounded-lg p-3">
                            <input type="file" accept="video/*,.360,.mp4,.mov" onChange={e => updateHotelVirtualTour(tour.id, 'file', e.target.files?.[0])} className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* Photos */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Photos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photo URLs</label>
                    <Textarea placeholder="Enter photo URLs (one per line)" className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photo Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Camera className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <input type="file" multiple accept="image/*,.jpg,.jpeg,.png,.webp" className="hidden" id="hotel-photos-upload" />
                      <label htmlFor="hotel-photos-upload" className="cursor-pointer">
                        <p className="text-sm text-muted-foreground">Upload hotel photos (max 15MB each)</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Videos */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Videos
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video URLs</label>
                    <Textarea placeholder="Enter YouTube, Vimeo URLs (one per line)" className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Video className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <input type="file" multiple accept="video/*,.mp4,.mov" className="hidden" id="hotel-videos-upload" />
                      <label htmlFor="hotel-videos-upload" className="cursor-pointer">
                        <p className="text-sm text-muted-foreground">Upload videos (max 500MB each)</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drone Footage */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Drone Footage
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Drone URLs</label>
                    <Textarea placeholder="Enter aerial/drone video URLs (one per line)" className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Drone Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Video className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <input type="file" multiple accept="video/*,.mp4,.mov" className="hidden" id="hotel-drone-upload" />
                      <label htmlFor="hotel-drone-upload" className="cursor-pointer">
                        <p className="text-sm text-muted-foreground">Upload drone footage</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Plans */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Floor Plans
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Floor Plan URLs</label>
                    <Textarea placeholder="Enter floor plan URLs (one per line)" className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Floor Plan Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <input type="file" multiple accept=".pdf,image/*" className="hidden" id="hotel-floorplans-upload" />
                      <label htmlFor="hotel-floorplans-upload" className="cursor-pointer">
                        <p className="text-sm text-muted-foreground">Upload floor plans</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Documents
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document URLs</label>
                    <Textarea placeholder="Enter document URLs (one per line)" className="min-h-[100px]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Files</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <FileText className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                      <input type="file" multiple accept=".pdf,.doc,.docx" className="hidden" id="hotel-documents-upload" />
                      <label htmlFor="hotel-documents-upload" className="cursor-pointer">
                        <p className="text-sm text-muted-foreground">Upload documents (max 20MB each)</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Section: Spaces Media (if facilities exist) */}
          {facilities.length > 0 && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Media for Hotel Spaces
                </CardTitle>
                <CardDescription>Upload media for each hotel space (e.g., Gym, Restaurant)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {facilities.map(facility => <div key={facility.id} className="border border-border rounded-lg p-4 space-y-4">
                    <h4 className="font-semibold text-lg">{facility.name}</h4>
                    
                    {/* 360 Virtual Tours */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        360 Virtual Tours
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Tour URL (Matterport, Kuula, etc.)" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept="video/*,.360" className="hidden" id={`space-${facility.id}-tour`} />
                          <label htmlFor={`space-${facility.id}-tour`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload tour file
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Photos */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Photos
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Textarea placeholder="Photo URLs (one per line)" rows={3} />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" multiple accept="image/*" className="hidden" id={`space-${facility.id}-photos`} />
                          <label htmlFor={`space-${facility.id}-photos`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload photos
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Videos */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Videos
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Video URL (YouTube, Vimeo)" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept="video/*" className="hidden" id={`space-${facility.id}-video`} />
                          <label htmlFor={`space-${facility.id}-video`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload video
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Drone Footage */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Drone Footage
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Drone footage URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept="video/*" className="hidden" id={`space-${facility.id}-drone`} />
                          <label htmlFor={`space-${facility.id}-drone`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload drone footage
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Floor Plans (Optional) */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Floor Plans (Optional)
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Floor plan URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept=".pdf,image/*" className="hidden" id={`space-${facility.id}-floorplan`} />
                          <label htmlFor={`space-${facility.id}-floorplan`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload floor plan
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Documents (Optional) */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documents (Optional)
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Document URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id={`space-${facility.id}-docs`} />
                          <label htmlFor={`space-${facility.id}-docs`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload documents
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </CardContent>
            </Card>}

          {/* 3. Section: Room Type Media */}
          {roomTypes.length > 0 && <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  Media for Room Types
                </CardTitle>
                <CardDescription>Upload media for each room type</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {roomTypes.map(room => <div key={room.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{room.name}</h4>
                      <Badge variant="outline">{room.category}</Badge>
                    </div>
                    
                    {/* 360 Virtual Tour (Required if available) */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        360 Virtual Tour <span className="text-red-500">*</span>
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Virtual tour URL (Matterport, Kuula, etc.)" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept="video/*,.360" className="hidden" id={`room-${room.id}-tour`} />
                          <label htmlFor={`room-${room.id}-tour`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload tour file
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Room Photos */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Room Photos
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Textarea placeholder="Photo URLs (one per line)" rows={3} />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" multiple accept="image/*" className="hidden" id={`room-${room.id}-photos`} />
                          <label htmlFor={`room-${room.id}-photos`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload room photos
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Walkthrough Video */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        Walkthrough Video
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Walkthrough video URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept="video/*" className="hidden" id={`room-${room.id}-walkthrough`} />
                          <label htmlFor={`room-${room.id}-walkthrough`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload walkthrough video
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Floor Plan */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Floor Plan
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Floor plan URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept=".pdf,image/*" className="hidden" id={`room-${room.id}-floorplan`} />
                          <label htmlFor={`room-${room.id}-floorplan`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload floor plan
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Room Info PDF or Brochure */}
                    <div className="space-y-3">
                      <h5 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Room Info PDF or Brochure
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input placeholder="Brochure URL" />
                        <div className="border border-dashed border-border rounded p-2 text-center">
                          <input type="file" accept=".pdf,.doc,.docx" className="hidden" id={`room-${room.id}-brochure`} />
                          <label htmlFor={`room-${room.id}-brochure`} className="cursor-pointer text-sm text-muted-foreground">
                            Upload brochure/info PDF
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Featured Media Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox id={`featured-${room.id}`} />
                      <label htmlFor={`featured-${room.id}`} className="text-sm font-medium">
                        Mark as featured media for this room
                      </label>
                    </div>
                  </div>)}
              </CardContent>
            </Card>}

          {/* Save as Draft Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Media Upload Progress</h4>
                  <p className="text-sm text-muted-foreground">Save your media uploads as draft to continue later</p>
                </div>
                <Button variant="outline">
                  Save as Draft
                </Button>
              </div>
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
              {Object.entries(amenitiesList.reduce((acc, amenity) => {
                  if (!acc[amenity.category]) {
                    acc[amenity.category] = [];
                  }
                  acc[amenity.category].push(amenity);
                  return acc;
                }, {} as Record<string, typeof amenitiesList>)).map(([category, categoryAmenities]) => <div key={category} className="space-y-3">
                  <h4 className="font-medium text-primary">{category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryAmenities.map(amenity => {
                      const Icon = amenity.icon;
                      return <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox id={amenity.id} checked={selectedAmenities.includes(amenity.id)} onCheckedChange={checked => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity.id]);
                          } else {
                            setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.id));
                          }
                        }} />
                          <label htmlFor={amenity.id} className="text-sm flex items-center gap-2 cursor-pointer">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            {amenity.label}
                          </label>
                        </div>;
                    })}
                  </div>
                </div>)}
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
              <CardDescription>Adding different room types here will create a media upload box for each room in the media & files section.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg p-4 space-y-4">
                <h4 className="font-medium">Add New Room Type</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Room name (e.g., Deluxe King Suite)" value={currentRoom.name || ''} onChange={e => setCurrentRoom({
                      ...currentRoom,
                      name: e.target.value
                    })} />
                  <Select value={currentRoom.category || ''} onValueChange={value => setCurrentRoom({
                      ...currentRoom,
                      category: value
                    })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Room category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      {roomCategories.map(category => <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <Textarea placeholder="Room description" value={currentRoom.description || ''} onChange={e => setCurrentRoom({
                    ...currentRoom,
                    description: e.target.value
                  })} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input type="number" placeholder="Max guests" value={currentRoom.maxGuests || ''} onChange={e => setCurrentRoom({
                      ...currentRoom,
                      maxGuests: parseInt(e.target.value)
                    })} />
                  <div className="flex gap-2">
                    <Input placeholder="Room size" value={currentRoom.roomSize || ''} onChange={e => setCurrentRoom({
                        ...currentRoom,
                        roomSize: e.target.value
                      })} />
                    <Select value={currentRoom.roomSizeUnit || 'sqm'} onValueChange={value => setCurrentRoom({
                        ...currentRoom,
                        roomSizeUnit: value
                      })}>
                      <SelectTrigger className="w-20 bg-background border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-lg z-50">
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="sqft">sqft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={currentRoom.bedType || ''} onValueChange={value => setCurrentRoom({
                      ...currentRoom,
                      bedType: value
                    })}>
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Bed type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border shadow-lg z-50">
                      {bedTypes.map(bed => <SelectItem key={bed.value} value={bed.value}>
                          {bed.label}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <Select value={currentRoom.priceCurrency || 'USD'} onValueChange={value => setCurrentRoom({
                        ...currentRoom,
                        priceCurrency: value
                      })}>
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                        <SelectItem value="AUD">AUD</SelectItem>
                        <SelectItem value="CHF">CHF</SelectItem>
                        <SelectItem value="CNY">CNY</SelectItem>
                        <SelectItem value="SEK">SEK</SelectItem>
                        <SelectItem value="NOK">NOK</SelectItem>
                        <SelectItem value="DKK">DKK</SelectItem>
                        <SelectItem value="PLN">PLN</SelectItem>
                        <SelectItem value="CZK">CZK</SelectItem>
                        <SelectItem value="HUF">HUF</SelectItem>
                        <SelectItem value="RUB">RUB</SelectItem>
                        <SelectItem value="BRL">BRL</SelectItem>
                        <SelectItem value="MXN">MXN</SelectItem>
                        <SelectItem value="INR">INR</SelectItem>
                        <SelectItem value="KRW">KRW</SelectItem>
                        <SelectItem value="SGD">SGD</SelectItem>
                        <SelectItem value="HKD">HKD</SelectItem>
                        <SelectItem value="TWD">TWD</SelectItem>
                        <SelectItem value="THB">THB</SelectItem>
                        <SelectItem value="MYR">MYR</SelectItem>
                        <SelectItem value="IDR">IDR</SelectItem>
                        <SelectItem value="PHP">PHP</SelectItem>
                        <SelectItem value="VND">VND</SelectItem>
                        <SelectItem value="AED">AED</SelectItem>
                        <SelectItem value="SAR">SAR</SelectItem>
                        <SelectItem value="EGP">EGP</SelectItem>
                        <SelectItem value="ZAR">ZAR</SelectItem>
                        <SelectItem value="TRY">TRY</SelectItem>
                        <SelectItem value="ILS">ILS</SelectItem>
                        <SelectItem value="NZD">NZD</SelectItem>
                        <SelectItem value="CLP">CLP</SelectItem>
                        <SelectItem value="COP">COP</SelectItem>
                        <SelectItem value="PEN">PEN</SelectItem>
                        <SelectItem value="UYU">UYU</SelectItem>
                        <SelectItem value="ARS">ARS</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Price range (e.g., 150–250/night)" value={currentRoom.priceRange || ''} onChange={e => setCurrentRoom({
                        ...currentRoom,
                        priceRange: e.target.value
                      })} className="flex-1" />
                  </div>
                  <Input placeholder="Floor/Wing" value={currentRoom.floorWing || ''} onChange={e => setCurrentRoom({
                      ...currentRoom,
                      floorWing: e.target.value
                    })} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                </div>
                <Button type="button" onClick={addRoomType} disabled={!currentRoom.name || !currentRoom.description || !currentRoom.category} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room Type
                </Button>
              </div>

               {roomTypes.length > 0 && <div className="mt-6">
                   <h4 className="font-medium mb-4">Created Rooms</h4>
                   <div className="border rounded-lg">
                     <Table>
                       <TableHeader>
                         <TableRow>
                           <TableHead>Room Name</TableHead>
                           <TableHead>Category</TableHead>
                           <TableHead>Max Guests</TableHead>
                           <TableHead>Room Size</TableHead>
                           <TableHead>Bed Type</TableHead>
                           <TableHead>Price Range</TableHead>
                           <TableHead>Floor/Wing</TableHead>
                           <TableHead className="w-[100px]">Actions</TableHead>
                         </TableRow>
                       </TableHeader>
                       <TableBody>
                         {roomTypes.map(room => <TableRow key={room.id}>
                             <TableCell className="font-medium">
                               <div>
                                 <div className="font-medium">{room.name}</div>
                                 <div className="text-sm text-muted-foreground line-clamp-2">
                                   {room.description}
                                 </div>
                               </div>
                             </TableCell>
                             <TableCell>
                               <Badge variant="outline">
                                 {roomCategories.find(cat => cat.value === room.category)?.label || room.category}
                               </Badge>
                             </TableCell>
                             <TableCell>{room.maxGuests || '-'}</TableCell>
                             <TableCell>
                               {room.roomSize ? `${room.roomSize} ${room.roomSizeUnit}` : '-'}
                             </TableCell>
                             <TableCell>{room.bedType || '-'}</TableCell>
                             <TableCell>{room.priceRange ? `${room.priceCurrency || 'USD'} ${room.priceRange}` : '-'}</TableCell>
                             <TableCell>{room.floorWing || '-'}</TableCell>
                             <TableCell>
                               <Button variant="outline" size="sm" onClick={() => removeRoomType(room.id)} className="h-8 w-8 p-0">
                                 <Trash2 className="h-4 w-4" />
                               </Button>
                             </TableCell>
                           </TableRow>)}
                       </TableBody>
                     </Table>
                   </div>
                 </div>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SECTION 5: Visibility & Submission */}
        <TabsContent value="submission" className="space-y-6">
          <Card>
             <CardHeader>
               <CardTitle>Visibility Settings</CardTitle>
               <CardDescription>Configure listing visibility and access settings</CardDescription>
             </CardHeader>
            <CardContent className="space-y-4">
              <FormField control={form.control} name="listingVisibility" render={({
                  field
                }) => <FormItem>
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
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="admin-only">Admin Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>} />

              {form.watch('listingVisibility') === 'private' && <>
                  <FormField control={form.control} name="createPin" render={({
                    field
                  }) => <FormItem>
                        <FormLabel>Create PIN for Access</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border">
                              <SelectValue placeholder="Select PIN option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-background border-border shadow-lg z-50">
                            <SelectItem value="auto-generate">Auto-generate PIN</SelectItem>
                            <SelectItem value="custom">Custom PIN</SelectItem>
                            <SelectItem value="no-pin">No PIN required</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  {form.watch('createPin') === 'auto-generate' && <div className="p-4 bg-muted/50 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium">Auto-Generated PIN</label>
                          <p className="text-xs text-muted-foreground">This PIN will be required for access</p>
                        </div>
                        <div className="text-lg font-mono font-bold tracking-wider bg-background px-3 py-1 rounded border">
                          {Math.random().toString().slice(2, 8)}
                        </div>
                      </div>
                    </div>}

                  {form.watch('createPin') === 'custom' && <FormField control={form.control} name="customPin" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Custom PIN</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Enter your custom PIN" maxLength={8} {...field} />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">Enter a 4-8 digit PIN for access control</p>
                          <FormMessage />
                        </FormItem>} />}

                  <FormField control={form.control} name="pinRequestEmail" render={({
                    field
                  }) => <FormItem>
                        <FormLabel>Email for PIN Requests</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="submitterName" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Submitter Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name="submitterEmail" render={({
                    field
                  }) => <FormItem>
                      <FormLabel>Submitter Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>

              <FormField control={form.control} name="agreeToTerms" render={({
                  field
                }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to Xplor Terms of Service *
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>} />
          </CardContent>
        </Card>
      </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>;
}