import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectSeparator, SelectGroup } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, ImageIcon, Video, MapPin, Home, DollarSign, Calendar as CalendarIcon, Ruler, Users, Car, Wifi, Shield, Bath, Bed, Coffee, Waves, Utensils, Tv, Wind, Heater, Gamepad2, TreePine, ParkingCircle, Dumbbell, Dog, Cigarette, PartyPopper, User, MessageCircle, Clock, Zap, Shirt, Laptop, Flame, HeartHandshake, AlertTriangle, Plus, FileText, ZoomIn, ZoomOut, Minus, Building, Cog, Ship, Phone, Plane, Camera, Music, Monitor, Anchor, Sailboat, Compass, Wrench, Settings, Eye, Globe, Sun, Star, Heart, Gift, Lock, Thermometer, Droplets, Wifi as WifiIcon, Radio, Headphones, Mic, Package, Truck } from "lucide-react";
import MapboxLocationPicker from "./MapboxLocationPicker";
import { MapboxService } from "@/services/mapboxService";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HotelUploadForm } from "./HotelUploadForm";
import { YachtBrochure } from "./YachtBrochure";
import { CrewProfileForm } from "./CrewProfileForm";
import { RealEstatePropertyForm } from "./RealEstatePropertyForm";
import { RealEstateAgentForm } from "./RealEstateAgentForm";
import { YachtRulesForm } from "./YachtRulesForm";
import { aisStreamService } from "../services/aisStreamService";
import { CarDataService } from "@/services/carDataService";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  propertyType: z.string().min(1, "Please select a property type"),
  realEstatePropertyType: z.string().optional(),
  yachtSaleOrCharter: z.string().optional(),
  yachtSizeClass: z.string().optional(),
  yachtStyleLayout: z.string().optional(),
  yachtSpecialPurpose: z.string().optional(),
  yachtMaterialsBuildType: z.string().optional(),
  yachtSubtype: z.string().optional(),
  yachtUsePurpose: z.string().optional(),
  yachtUsePurposeSubtype: z.string().optional(),
  yachtHullConfiguration: z.string().optional(),
  listingType: z.string().optional(),
  salePricePrefix: z.string().optional(),
  salePrice: z.string().optional(),
  rentalPricePrefix: z.string().optional(),
  rentalPrice: z.string().optional(),
  rentalPriceRange: z.string().optional(),
  rentalPeriod: z.string().optional(),
  availableFrom: z.date().optional(),
  availableTo: z.date().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  beds: z.string().optional(),
  maxGuests: z.string().optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  infants: z.string().optional(),
  pets: z.string().optional(),
  area: z.string().optional(),
  yearBuilt: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  amenities: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  accessibility: z.array(z.string()).optional(),
  houseRules: z.array(z.string()).optional(),
  healthSafety: z.array(z.string()).optional(),
  workFeatures: z.array(z.string()).optional(),
  additionalAmenities: z.string().optional(),
  hostLanguage: z.string().optional(),
  responseTime: z.string().optional(),
  bookingType: z.string().optional(),
  availability: z.string().min(1, "Please select availability"),
  visibility: z.string().min(1, "Please select visibility"),
  // Hotel-specific fields
  hotelStarRating: z.string().optional(),
  hotelChain: z.string().optional(),
  roomType: z.string().optional(),
  bedConfiguration: z.string().optional(),
  maxOccupancy: z.string().optional(),
  roomSize: z.string().optional(),
  floorLevel: z.string().optional(),
  averageNightlyRate: z.string().optional(),
  seasonalPricing: z.string().optional(),
  minimumStay: z.string().optional(),
  hotelAmenities: z.array(z.string()).optional(),
  checkInTime: z.string().optional(),
  checkOutTime: z.string().optional(),
  hotelPolicies: z.string().optional(),
  nearbyAttractions: z.string().optional(),
  roomProfiles: z.array(z.object({
    id: z.string(),
    roomType: z.string(),
    bedConfiguration: z.string(),
    maxOccupancy: z.string(),
    roomSize: z.string().optional(),
    roomSizeUnit: z.string().optional(),
    floorLevel: z.string().optional(),
    averageNightlyRate: z.string(),
  })).optional(),
  // Special Deals fields
  dealTitle: z.string().optional(),
  dealType: z.string().optional(),
  dealDescription: z.string().optional(),
  dealCode: z.string().optional(),
  dealMinStay: z.string().optional(),
  dealApplicableRooms: z.array(z.string()).optional(),
  dealGuestRestrictions: z.string().optional(),
  dealBookingStart: z.date().optional(),
  dealBookingEnd: z.date().optional(),
  dealStayStart: z.date().optional(),
  dealStayEnd: z.date().optional(),
  dealDaysOfWeek: z.array(z.string()).optional(),
  dealBlackoutDates: z.string().optional(),
  dealPriceMethod: z.string().optional(),
  dealDiscountValue: z.string().optional(),
  dealTermsConditions: z.string().optional(),
  dealActive: z.boolean().optional(),
  dealFeatured: z.boolean().optional(),
  dealUrgencyTag: z.string().optional(),
  // Location-specific fields
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  googlePlusCode: z.string().optional(),
  marineTrafficUrl: z.string().optional(),
  mmsiNumber: z.string().optional(),
  imoNumber: z.string().optional(),
  officialNumber: z.string().optional(),
  askingPrice: z.string().optional(),
  charterRate: z.string().optional(),
  charterWeekly: z.boolean().optional(),
  charterDaily: z.boolean().optional(),
  charterSeasonal: z.boolean().optional(),
  portOfRegistry: z.string().optional(),
  // Comprehensive Yacht Details
  yachtBuilder: z.string().optional(),
  yachtModel: z.string().optional(),
  yachtYearBuilt: z.string().optional(),
  yachtYearRefit: z.string().optional(),
  yachtClassification: z.string().optional(),
  yachtVatStatus: z.string().optional(),
  yachtRegistrationNumber: z.string().optional(),
  yachtCurrency: z.string().optional(),
  yachtLOA: z.string().optional(),
  yachtBeam: z.string().optional(),
  yachtDraft: z.string().optional(),
  yachtGrossTonnage: z.string().optional(),
  yachtDisplacement: z.string().optional(),
  yachtHullMaterial: z.string().optional(),
  yachtSuperstructureMaterial: z.string().optional(),
  yachtCruisingSpeed: z.string().optional(),
  yachtMaxSpeed: z.string().optional(),
  yachtRange: z.string().optional(),
  yachtFuelConsumption: z.string().optional(),
  yachtEngineMake: z.string().optional(),
  yachtEngineCount: z.string().optional(),
  yachtEnginePower: z.string().optional(),
  yachtPropulsionType: z.string().optional(),
  yachtGenerators: z.string().optional(),
  yachtStabilizers: z.string().optional(),
  yachtBowThruster: z.boolean().optional(),
  yachtBowThrusterMakeModel: z.string().optional(),
  yachtSternThruster: z.boolean().optional(),
  yachtSternThrusterMakeModel: z.string().optional(),
  yachtFuelCapacity: z.string().optional(),
  yachtWaterCapacity: z.string().optional(),
  yachtWasteWaterCapacity: z.string().optional(),
  yachtNavigationEquipment: z.string().optional(),
  yachtCommunicationSystems: z.string().optional(),
  yachtGuestsNumber: z.string().optional(),
  yachtGuestCabins: z.string().optional(),
  yachtCrewNumber: z.string().optional(),
  yachtCrewCabins: z.string().optional(),
  yachtInteriorDesigner: z.string().optional(),
  yachtExteriorDesigner: z.string().optional(),
  yachtCharterRateInfo: z.string().optional(),
  yachtCharterRegions: z.string().optional(),
  yachtApaPolicy: z.string().optional(),
  yachtMinBookingDuration: z.string().optional(),
  yachtSeasonalRates: z.string().optional(),
  yachtCharterLicense: z.string().optional(),
  yachtDeckJacuzzi: z.boolean().optional(),
  yachtBeachClub: z.boolean().optional(),
  yachtPool: z.boolean().optional(),
  yachtSpa: z.boolean().optional(),
  yachtGym: z.boolean().optional(),
  yachtCinema: z.boolean().optional(),
  yachtElevator: z.boolean().optional(),
  yachtSunDeck: z.boolean().optional(),
  yachtOffice: z.boolean().optional(),
  yachtFireplaces: z.boolean().optional(),
  yachtWifiSatelliteTV: z.boolean().optional(),
  yachtPrimaryTender: z.string().optional(),
  yachtAdditionalTenders: z.string().optional(),
  yachtJetSkis: z.boolean().optional(),
  yachtSeabobs: z.boolean().optional(),
  yachtDivingEquipment: z.boolean().optional(),
  yachtWaterskis: z.boolean().optional(),
  yachtInflatableToys: z.boolean().optional(),
  yachtFishingGear: z.boolean().optional(),
  yachtSubmersibles: z.boolean().optional(),
  yachtOwnershipStructure: z.string().optional(),
  yachtCharterLicenseStatus: z.string().optional(),
  yachtCompliance: z.string().optional(),
  yachtInsuranceCoverage: z.string().optional(),
  yachtCrewCertifications: z.string().optional(),
  yachtRegistryJurisdiction: z.string().optional(),
  yachtBrokerageCompany: z.string().optional(),
  yachtBrokerName: z.string().optional(),
  yachtBrokerContact: z.string().optional(),
  yachtWebsiteLink: z.string().optional(),
  yachtListingDate: z.string().optional(),
  yachtListingType: z.string().optional(),
  // Real Estate Property Specifications
  price: z.string().optional(),
  currency: z.string().optional(),
  pricePerSqm: z.string().optional(),
  areaSize: z.string().optional(),
  areaUnit: z.string().optional(),
  plotSize: z.string().optional(),
  plotUnit: z.string().optional(),
  parkingSpaces: z.string().optional(),
  balconies: z.string().optional(),
  floors: z.string().optional(),
  floorNumber: z.string().optional(),
  propertyCondition: z.string().optional(),
  constructionStatus: z.string().optional(),
  furnishing: z.string().optional(),
  buildingType: z.string().optional(),
  architectureStyle: z.string().optional(),
  ownershipType: z.string().optional(),
  titleDeedAvailable: z.string().optional(),
  mortgageStatus: z.string().optional(),
  occupancyStatus: z.string().optional(),
  occupancyCertificate: z.string().optional(),
  featuresAmenities: z.array(z.string()).optional(),
  buildingFeatures: z.array(z.string()).optional(),
  parkingType: z.string().optional(),
  availabilityDate: z.date().optional(),
  openHouseDates: z.string().optional(),
  sellerName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  agencyName: z.string().optional(),
  agentLicense: z.string().optional(),
  preferredContact: z.string().optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  urlSlug: z.string().optional(),
  listingId: z.string().optional(),
  listingStatus: z.string().optional(),
  priorityListing: z.string().optional(),
  dateListed: z.date().optional(),
  lastUpdated: z.date().optional(),
  // Yacht Charter Rules
  yachtSmokingPolicy: z.string().optional(),
  yachtPetsPolicy: z.string().optional(),
  yachtAlcoholPolicy: z.string().optional(),
  yachtGuestCapacityDay: z.string().optional(),
  yachtGuestCapacitySleeping: z.string().optional(),
  yachtChildrenPolicy: z.string().optional(),
  yachtWaterToysRestrictions: z.string().optional(),
  yachtDronePolicy: z.string().optional(),
  yachtFishingPolicy: z.string().optional(),
  yachtNudityPolicy: z.string().optional(),
  yachtShoePolicy: z.string().optional(),
  yachtMusicRestrictions: z.string().optional(),
  yachtRedWinePolicy: z.string().optional(),
  yachtSubstancesPolicy: z.string().optional(),
  // Access Areas
  yachtAllowedAreas: z.array(z.string()).optional(),
  yachtRestrictedAreas: z.array(z.string()).optional(),
  yachtBridgeAccess: z.string().optional(),
  yachtNightCruising: z.string().optional(),
  yachtAnchoringPolicy: z.string().optional(),
  yachtTenderOperation: z.string().optional(),
  // Booking Rules
  yachtMinCharterDuration: z.string().optional(),
  yachtCheckInTime: z.string().optional(),
  yachtCheckOutTime: z.string().optional(),
  yachtTurnaroundTime: z.string().optional(),
  yachtApaRequired: z.string().optional(),
  yachtCustomsPermits: z.string().optional(),
  // Additional Rules
  yachtCrewTipExpectation: z.string().optional(),
  yachtCurfewPolicy: z.string().optional(),
  yachtSafetyBriefing: z.string().optional(),
  yachtCovidRequirements: z.string().optional(),
  yachtEnvironmentalRules: z.string().optional(),
  // Yacht Compliance Fields
  mcaCompliant: z.boolean().optional(),
  ismCertified: z.boolean().optional(),
  ispsCertified: z.boolean().optional(),
  solasCompliant: z.boolean().optional(),
  marpolCompliant: z.boolean().optional(),
  mlcCompliant: z.boolean().optional(),
  rinaClassed: z.boolean().optional(),
  lloydsRegisterClassed: z.boolean().optional(),
  dnvClassed: z.boolean().optional(),
  absClassed: z.boolean().optional(),
  bureauVeritasClassed: z.boolean().optional(),
  germanischerLloydClassed: z.boolean().optional(),
  commerciallyCoded: z.boolean().optional(),
  ceCertified: z.string().optional(),
  flaggedCommercialUse: z.boolean().optional(),
  privateUseOnly: z.boolean().optional(),
  dualRegistrationAvailable: z.boolean().optional(),
  euVatPaid: z.string().optional(),
  temporaryImportationAllowed: z.boolean().optional(),
  uscgDocumented: z.boolean().optional(),
  stcwCertifiedCrewRequired: z.boolean().optional(),
  minimumSafeManning: z.boolean().optional(),
  passengerCapacityCompliance: z.boolean().optional(),
  helideckCertification: z.string().optional(),
  crewRotationPolicy: z.boolean().optional(),
  medicalBayEquipped: z.boolean().optional(),
  tierIiiEngineCompliance: z.boolean().optional(),
  exhaustGasScrubbersInstalled: z.boolean().optional(),
  ballastWaterTreatmentSystem: z.boolean().optional(),
  greyWaterTreatmentSystem: z.boolean().optional(),
  garbageManagementPlan: z.boolean().optional(),
  sewageTreatmentPlantCertified: z.boolean().optional(),
  ecoLabelCertified: z.boolean().optional(),
  securityPlanOnboard: z.boolean().optional(),
  cctvSurveillanceSystem: z.boolean().optional(),
  cybersecurityProtocols: z.boolean().optional(),
  shipSecurityOfficerAssigned: z.boolean().optional(),
  insuranceComplianceComplete: z.boolean().optional(),
  upToDateClassCertificate: z.boolean().optional(),
  upToDateSurveyReports: z.boolean().optional(),
  validInsuranceCertificate: z.boolean().optional(),
  validCharterLicense: z.boolean().optional(),
  ownerCompanyGoodStanding: z.boolean().optional(),
  annualFlagStateInspectionPassed: z.boolean().optional(),
  crewCertificatesOnboard: z.boolean().optional(),
  technicalManualAvailability: z.boolean().optional(),
  pinCode: z.string().optional(),
  pinRequestEmail: z.string().optional(),
  // Location & Proximity fields
  walkScore: z.string().optional(),
  nearbyLandmarks: z.string().optional(),
  transportLinks: z.string().optional(),
  schoolCatchment: z.string().optional(),
  distanceToCityCenter: z.string().optional(),
  // Real Estate Rules & Access Fields
  maximumOccupancy: z.string().optional(),
  minimumLeaseTerm: z.string().optional(),
  shortTermRentalAllowed: z.string().optional(),
  sublettingAllowed: z.string().optional(),
  corporateLeasingPermitted: z.string().optional(),
  studentTenantsAccepted: z.string().optional(),
  domesticStaffPermitted: z.string().optional(),
  petsAllowed: z.string().optional(),
  petTypeRestrictions: z.string().optional(),
  petDepositRequired: z.string().optional(),
  assistanceAnimalsOnly: z.string().optional(),
  smokingAllowedIndoors: z.string().optional(),
  alcoholRestrictions: z.string().optional(),
  quietHoursEnforced: z.string().optional(),
  partiesEventsAllowed: z.string().optional(),
  fireplaceUseAllowed: z.string().optional(),
  bbqUseAllowed: z.string().optional(),
  sharedAreasAccess: z.array(z.string()).optional(),
  balconyAccess: z.string().optional(),
  elevatorAccess: z.string().optional(),
  roofTerraceAccess: z.string().optional(),
  atticBasementUse: z.string().optional(),
  garageUseRules: z.string().optional(),
  smartHomeDeviceRestrictions: z.string().optional(),
  keyType: z.string().optional(),
  intercomSystem: z.string().optional(),
  visitorAccessRules: z.string().optional(),
  alarmSystemUse: z.string().optional(),
  doormanSecurity: z.string().optional(),
  gatedEntryRules: z.string().optional(),
  securityCameraPolicy: z.string().optional(),
  tenantLawnGardenResponsibility: z.string().optional(),
  wasteDisposalRules: z.string().optional(),
  cleaningFeeOnExit: z.string().optional(),
  hoaCleaningPolicy: z.string().optional(),
  pestControlPolicy: z.string().optional(),
  utility_water: z.string().optional(),
  utility_electricity: z.string().optional(),
  utility_gas: z.string().optional(),
  utility_internet: z.string().optional(),
  utility_trash_collection: z.string().optional(),
  rentIncludesUtilities: z.string().optional(),
  homeInsuranceRequired: z.string().optional(),
  rentalLicenseRegistration: z.string().optional(),
  packageRoomAccess: z.string().optional(),
  parcelLockersAccess: z.string().optional(),
  storageCageAccess: z.string().optional(),
  bikeStorageRules: z.string().optional(),
  moveInTimeRestrictions: z.string().optional(),
  elevatorBookingRequired: z.string().optional(),
  moveInFeeDeposit: z.string().optional(),
  furnitureDeliveryRules: z.string().optional(),
  noticePeriodRequired: z.string().optional(),
  parkingAvailability: z.string().optional(),
  visitorParkingRules: z.string().optional(),
  evChargingAllowed: z.string().optional(),
  motorbikeScooterStorage: z.string().optional(),
  boatRvParkingRestrictions: z.string().optional(),
  // Car & Vehicle specific fields  
  carManufacturer: z.string().optional(),
  carModel: z.string().optional(),
  carVariant: z.string().optional(),
  carYear: z.string().optional(),
  carCondition: z.string().optional(),
  carMileage: z.string().optional(),
  carFuelType: z.string().optional(),
  carEngineSize: z.string().optional(),
  carTransmission: z.string().optional(),
  carDriveType: z.string().optional(),
  carBodyStyle: z.string().optional(),
  carExteriorColor: z.string().optional(),
  carInteriorColor: z.string().optional(),
  carRegionalSpecs: z.string().optional(),
  carSellerType: z.string().optional(),
  carWarranty: z.string().optional(),
  carServiceHistory: z.string().optional(),
  carAccidentHistory: z.string().optional(),
  carFinancing: z.string().optional(),
  // AutoTrader-inspired advanced filters
  carDoors: z.string().optional(),
  carSeats: z.string().optional(),
  carOwners: z.string().optional(),
  carEmissionClass: z.string().optional(),
  carInsuranceGroup: z.string().optional(),
  carBHP: z.string().optional(),
  carAcceleration: z.string().optional(),
  carTopSpeed: z.string().optional(),
  carCO2Emissions: z.string().optional(),
  carMpg: z.string().optional(),
  carTaxBand: z.string().optional(),
  carAnnualTax: z.string().optional(),
  
  carKeyFeatures: z.array(z.string()).optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadSpaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
}

export function UploadSpaceDialog({ open, onOpenChange, category }: UploadSpaceDialogProps) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Debug logging
  console.log("UploadSpaceDialog - category:", category);
  console.log("UploadSpaceDialog - open:", open);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormType, setContactFormType] = useState<'floor-plans' | 'itinerary' | 'brochure' | 'crew-profile'>('floor-plans');
  const [showItineraryForm, setShowItineraryForm] = useState(false);
  const [isFetchingAIS, setIsFetchingAIS] = useState(false);
  const [showBrochure, setShowBrochure] = useState(false);
  const [showCrewProfileForm, setShowCrewProfileForm] = useState(false);
  const [itineraryLocations, setItineraryLocations] = useState({
    pickUp: { address: '', coordinates: null as { lat: number; lng: number } | null },
    dropOff: { address: '', coordinates: null as { lat: number; lng: number } | null },
    via: [] as { address: string; coordinates: { lat: number; lng: number } | null }[]
  });
  const [mapCoordinates, setMapCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [mapZoom, setMapZoom] = useState(10);
  const [uploadedFiles, setUploadedFiles] = useState<{
    photos: (File & { roomId?: string })[];
    videos: (File & { roomId?: string })[];
    droneFootage: (File & { roomId?: string })[];
    documents: File[];
    floorPlans: File[];
    sampleItineraries: File[];
    crewProfile: File[];
    brochure: File[];
    vrWalkthrough: (File & { roomId?: string })[];
    virtualTour: (File & { roomId?: string; url?: string })[];
  }>({
    photos: [],
    videos: [],
    droneFootage: [],
    documents: [],
    floorPlans: [],
    sampleItineraries: [],
    crewProfile: [],
    brochure: [],
    vrWalkthrough: [],
    virtualTour: [],
  });

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "",
      yachtSaleOrCharter: "",
      yachtSizeClass: "",
      yachtStyleLayout: "",
      yachtSpecialPurpose: "",
      yachtMaterialsBuildType: "",
      yachtSubtype: "",
      yachtUsePurpose: "",
      yachtUsePurposeSubtype: "",
      yachtHullConfiguration: "",
      listingType: "",
      salePricePrefix: "",
      salePrice: "",
      rentalPricePrefix: "",
      rentalPriceRange: "",
      rentalPeriod: "",
      bedrooms: "",
      bathrooms: "",
      beds: "",
      maxGuests: "",
      adults: "",
      children: "",
      infants: "",
      pets: "",
      area: "",
      yearBuilt: "",
      location: "",
      amenities: [],
      facilities: [],
      accessibility: [],
      houseRules: [],
      healthSafety: [],
      workFeatures: [],
      additionalAmenities: "",
      hostLanguage: "",
      responseTime: "",
      bookingType: "",
      availability: "",
      visibility: "public",
      // Hotel-specific default values
      hotelStarRating: "",
      hotelChain: "",
      roomType: "",
      bedConfiguration: "",
      maxOccupancy: "",
      roomSize: "",
      floorLevel: "",
      averageNightlyRate: "",
      seasonalPricing: "",
      minimumStay: "",
      hotelAmenities: [],
      checkInTime: "",
      checkOutTime: "",
      hotelPolicies: "",
      nearbyAttractions: "",
      roomProfiles: [],
      // Location-specific default values
      country: "",
      region: "",
      city: "",
      neighborhood: "",
      streetAddress: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      googlePlusCode: "",
      marineTrafficUrl: "",
      mmsiNumber: "",
      imoNumber: "",
      officialNumber: "",
      askingPrice: "",
      charterRate: "",
      charterWeekly: false,
      charterDaily: false,
      charterSeasonal: false,
      portOfRegistry: "",
      // Comprehensive Yacht Details default values
      yachtBuilder: "",
      yachtModel: "",
      yachtYearBuilt: "",
      yachtYearRefit: "",
      yachtClassification: "",
      yachtVatStatus: "",
      yachtRegistrationNumber: "",
      yachtCurrency: "",
      yachtLOA: "",
      yachtBeam: "",
      yachtDraft: "",
      yachtGrossTonnage: "",
      yachtDisplacement: "",
      yachtHullMaterial: "",
      yachtSuperstructureMaterial: "",
      yachtCruisingSpeed: "",
      yachtMaxSpeed: "",
      yachtRange: "",
      yachtFuelConsumption: "",
      yachtEngineMake: "",
      yachtEngineCount: "",
      yachtEnginePower: "",
      yachtPropulsionType: "",
      yachtGenerators: "",
      yachtStabilizers: "",
      yachtBowThruster: false,
      yachtBowThrusterMakeModel: "",
      yachtSternThruster: false,
      yachtSternThrusterMakeModel: "",
      yachtFuelCapacity: "",
      yachtWaterCapacity: "",
      yachtWasteWaterCapacity: "",
      yachtNavigationEquipment: "",
      yachtCommunicationSystems: "",
      yachtGuestsNumber: "",
      yachtGuestCabins: "",
      yachtCrewNumber: "",
      yachtCrewCabins: "",
      yachtInteriorDesigner: "",
      yachtExteriorDesigner: "",
      yachtCharterRateInfo: "",
      yachtCharterRegions: "",
      yachtApaPolicy: "",
      yachtMinBookingDuration: "",
      yachtSeasonalRates: "",
      yachtCharterLicense: "",
      yachtDeckJacuzzi: false,
      yachtBeachClub: false,
      yachtPool: false,
      yachtSpa: false,
      yachtGym: false,
      yachtCinema: false,
      yachtElevator: false,
      yachtSunDeck: false,
      yachtOffice: false,
      yachtFireplaces: false,
      yachtWifiSatelliteTV: false,
      yachtPrimaryTender: "",
      yachtAdditionalTenders: "",
      yachtJetSkis: false,
      yachtSeabobs: false,
      yachtDivingEquipment: false,
      yachtWaterskis: false,
      yachtInflatableToys: false,
      yachtFishingGear: false,
      yachtSubmersibles: false,
      yachtOwnershipStructure: "",
      yachtCharterLicenseStatus: "",
      yachtCompliance: "",
      yachtInsuranceCoverage: "",
      yachtCrewCertifications: "",
      yachtRegistryJurisdiction: "",
      yachtBrokerageCompany: "",
      yachtBrokerName: "",
      yachtBrokerContact: "",
      yachtWebsiteLink: "",
      yachtListingDate: "",
      yachtListingType: "",
      // Real Estate Property Specifications default values
      realEstatePropertyType: "",
      price: "",
      currency: "USD",
      pricePerSqm: "",
      areaSize: "",
      areaUnit: "sqm",
      plotSize: "",
      plotUnit: "sqm",
      parkingSpaces: "",
      balconies: "",
      floors: "",
      floorNumber: "",
      propertyCondition: "",
      constructionStatus: "",
      furnishing: "",
      buildingType: "",
      architectureStyle: "",
      ownershipType: "",
      titleDeedAvailable: "",
      mortgageStatus: "",
      occupancyStatus: "",
      occupancyCertificate: "",
      featuresAmenities: [],
      buildingFeatures: [],
      parkingType: "",
      availabilityDate: undefined,
      openHouseDates: "",
      sellerName: "",
      contactPhone: "",
      contactEmail: "",
      agencyName: "",
      agentLicense: "",
      preferredContact: "",
      seoTitle: "",
      metaDescription: "",
      urlSlug: "",
      listingId: "",
      listingStatus: "draft",
      priorityListing: "",
      dateListed: undefined,
      lastUpdated: undefined,
      // Yacht Charter Rules default values
      yachtSmokingPolicy: "",
      yachtPetsPolicy: "",
      yachtAlcoholPolicy: "",
      yachtGuestCapacityDay: "",
      yachtGuestCapacitySleeping: "",
      yachtChildrenPolicy: "",
      yachtWaterToysRestrictions: "",
      yachtDronePolicy: "",
      yachtFishingPolicy: "",
      yachtNudityPolicy: "",
      yachtShoePolicy: "",
      yachtMusicRestrictions: "",
      yachtRedWinePolicy: "",
      yachtSubstancesPolicy: "",
      yachtAllowedAreas: [],
      yachtRestrictedAreas: [],
      yachtBridgeAccess: "",
      yachtNightCruising: "",
      yachtAnchoringPolicy: "",
      yachtTenderOperation: "",
      yachtMinCharterDuration: "",
      yachtCheckInTime: "",
      yachtCheckOutTime: "",
      yachtTurnaroundTime: "",
      yachtApaRequired: "",
      yachtCustomsPermits: "",
      yachtCrewTipExpectation: "",
      yachtCurfewPolicy: "",
      yachtSafetyBriefing: "",
      yachtCovidRequirements: "",
      yachtEnvironmentalRules: "",
      // Yacht Compliance default values
      mcaCompliant: false,
      ismCertified: false,
      ispsCertified: false,
      solasCompliant: false,
      marpolCompliant: false,
      mlcCompliant: false,
      rinaClassed: false,
      lloydsRegisterClassed: false,
      dnvClassed: false,
      absClassed: false,
      bureauVeritasClassed: false,
      germanischerLloydClassed: false,
      commerciallyCoded: false,
      ceCertified: "",
      flaggedCommercialUse: false,
      privateUseOnly: false,
      dualRegistrationAvailable: false,
      euVatPaid: "",
      temporaryImportationAllowed: false,
      uscgDocumented: false,
      stcwCertifiedCrewRequired: false,
      minimumSafeManning: false,
      passengerCapacityCompliance: false,
      helideckCertification: "",
      crewRotationPolicy: false,
      medicalBayEquipped: false,
      tierIiiEngineCompliance: false,
      exhaustGasScrubbersInstalled: false,
      ballastWaterTreatmentSystem: false,
      greyWaterTreatmentSystem: false,
      garbageManagementPlan: false,
      sewageTreatmentPlantCertified: false,
      ecoLabelCertified: false,
      securityPlanOnboard: false,
      cctvSurveillanceSystem: false,
      cybersecurityProtocols: false,
      shipSecurityOfficerAssigned: false,
      insuranceComplianceComplete: false,
      upToDateClassCertificate: false,
      upToDateSurveyReports: false,
      validInsuranceCertificate: false,
      validCharterLicense: false,
      ownerCompanyGoodStanding: false,
      annualFlagStateInspectionPassed: false,
      crewCertificatesOnboard: false,
      technicalManualAvailability: false,
      pinCode: "",
      pinRequestEmail: "",
    },
  });

  // Helper function to convert Google Plus Code to coordinates
  const convertPlusCodeToCoordinates = async (plusCode: string) => {
    try {
      const cleanPlusCode = plusCode.replace(/\s/g, '');
      
      // Validate Plus Code format
      const plusCodeRegex = /^[23456789CFGHJMPQRVWX]{4,8}\+[23456789CFGHJMPQRVWX]{2,3}$/;
      if (!plusCodeRegex.test(cleanPlusCode)) {
        toast({
          title: "Invalid Plus Code",
          description: "Please enter a valid Google Plus Code format (e.g., 8FW4V75V+8Q)",
          variant: "destructive",
        });
        return null;
      }

      // Basic Plus Code decoding (simplified implementation)
      // This is a basic approximation - in production you'd use Google Maps API
      try {
        const decoded = decodePlusCodeBasic(cleanPlusCode);
        if (decoded) {
          setMapCoordinates(decoded);
          form.setValue('latitude', decoded.lat.toString());
          form.setValue('longitude', decoded.lng.toString());
          
          toast({
            title: "Plus Code Converted",
            description: `Location set to ${decoded.lat.toFixed(4)}, ${decoded.lng.toFixed(4)}`,
          });
          return decoded;
        }
      } catch (decodeError) {
        console.error("Plus Code decode error:", decodeError);
      }
      
      toast({
        title: "Plus Code Validation",
        description: "Plus Code format is valid. For precise conversion, connect to Google Maps API.",
      });
      return null;
    } catch (error) {
      console.error("Error converting Plus Code:", error);
      toast({
        title: "Plus Code Error",
        description: "Error processing Plus Code",
        variant: "destructive",
      });
      return null;
    }
  };

  // Basic Plus Code decoder (simplified approximation)
  const decodePlusCodeBasic = (plusCode: string): { lat: number; lng: number } | null => {
    try {
      // This is a very simplified decoder for demonstration
      // Real Plus Codes require the full Google algorithm
      const parts = plusCode.split('+');
      if (parts.length !== 2) return null;
      
      const base = parts[0];
      const extension = parts[1];
      
      // Very basic approximation based on code structure
      // Note: This is NOT accurate for real use - use Google Maps API in production
      const baseHash = base.split('').reduce((acc, char, idx) => {
        const val = '23456789CFGHJMPQRVWX'.indexOf(char);
        return acc + val * Math.pow(20, base.length - idx - 1);
      }, 0);
      
      // Rough approximation to lat/lng
      const lat = -90 + (baseHash % 18000) / 100;
      const lng = -180 + (Math.floor(baseHash / 18000) % 36000) / 100;
      
      // Validate reasonable coordinates
      if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return { lat, lng };
      }
      
      return null;
    } catch (error) {
      console.error("Plus Code decode error:", error);
      return null;
    }
  };

  // Helper function to generate mock coordinates based on MMSI number (for demonstration)
  const getMockCoordinatesFromMMSI = (mmsi: string): { lat: number; lng: number } | null => {
    try {
      // Generate semi-realistic coordinates based on MMSI
      // First 3 digits of MMSI indicate country/region
      const regionCode = mmsi.substring(0, 3);
      
      // Common maritime regions with their approximate coordinates
      const regionCoordinates: { [key: string]: { lat: number; lng: number } } = {
        '201': { lat: 47.6062, lng: -122.3321 }, // US West Coast (Seattle area)
        '303': { lat: 25.7617, lng: -80.1918 },  // Florida (Miami area)
        '311': { lat: 40.7589, lng: -73.9851 },  // New York area
        '332': { lat: 41.9028, lng: -87.6317 },  // Great Lakes (Chicago)
        '366': { lat: 37.7749, lng: -122.4194 }, // California (San Francisco)
        '367': { lat: 33.9425, lng: -118.4081 }, // California (LA area)
        '368': { lat: 25.7617, lng: -80.1918 },  // Florida
        '369': { lat: 43.6532, lng: -79.3832 },  // Canada (Toronto area)
        '235': { lat: 51.5074, lng: -0.1278 },   // UK (London area)
        '227': { lat: 48.8566, lng: 2.3522 },    // France (Paris area)
        '247': { lat: 45.4642, lng: 9.1900 },    // Italy (Milan area)
        '211': { lat: 52.5200, lng: 13.4050 },   // Germany (Berlin area)
        '205': { lat: 52.3676, lng: 4.9041 },    // Netherlands (Amsterdam area)
        '219': { lat: 55.6761, lng: 12.5683 },   // Denmark (Copenhagen area)
        '257': { lat: 59.9139, lng: 10.7522 },   // Norway (Oslo area)
        '265': { lat: 59.3293, lng: 18.0686 },   // Sweden (Stockholm area)
        '636': { lat: 35.6762, lng: 139.6503 },  // Japan (Tokyo area)
        '477': { lat: 1.3521, lng: 103.8198 },   // Singapore
        '503': { lat: -33.8688, lng: 151.2093 }, // Australia (Sydney)
        '538': { lat: -22.9068, lng: -43.1729 }, // Brazil (Rio)
      };
      
      // Try exact match first
      if (regionCoordinates[regionCode]) {
        const base = regionCoordinates[regionCode];
        // Add small random offset to make it more realistic
        const hash = mmsi.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const latOffset = ((hash % 200) - 100) / 1000; // ±0.1 degree variation
        const lngOffset = ((hash % 300) - 150) / 1000; // ±0.15 degree variation
        
        return {
          lat: Math.max(-90, Math.min(90, base.lat + latOffset)),
          lng: Math.max(-180, Math.min(180, base.lng + lngOffset))
        };
      }
      
      // Fallback to Mediterranean for unknown regions
      const hash = mmsi.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return {
        lat: 35 + ((hash % 100) - 50) / 100,  // Mediterranean area
        lng: 15 + ((hash % 200) - 100) / 100
      };
    } catch (error) {
      console.error("Error generating mock coordinates:", error);
      return null;
    }
  };

  // Function to fetch yacht details and location using MMSI or IMO number
  const fetchYachtDetailsFromIdentifier = async (identifier: string, type: 'mmsi' | 'imo') => {
    if (!identifier) return null;
    
    // Basic validation - IMO numbers are typically 7 digits but can vary
    if (type === 'mmsi' && (identifier.length < 9 || identifier.length > 9)) {
      console.log(`Invalid MMSI: ${identifier} (length: ${identifier.length})`);
      return null;
    }
    if (type === 'imo' && (identifier.length < 6 || identifier.length > 8)) {
      console.log(`Invalid IMO: ${identifier} (length: ${identifier.length})`);
      return null;
    }
    
    console.log(`Fetching details for ${type.toUpperCase()}: ${identifier}`);
    
    // Use MarineTraffic directly for all vessel lookups
    console.log(`Fetching vessel data from MarineTraffic for ${type.toUpperCase()}: ${identifier}`);
    setIsFetchingAIS(true);
    
    toast({
      title: "Fetching vessel data from MarineTraffic...",
      duration: 3000,
    });
    
    // Fallback to original method for IMO numbers or when AISStream is not available
    try {
      // Create MarineTraffic URL based on identifier type
      const trackingUrl = type === 'mmsi' 
        ? `https://www.marinetraffic.com/en/ais/details/ships/mmsi:${identifier}`
        : `https://www.marinetraffic.com/en/ais/details/ships/imo:${identifier}`;
      
      // Try to fetch vessel data from Marine Traffic via CORS proxy
      const corsProxy = 'https://api.allorigins.win/raw?url=';
      
      try {
        console.log(`Attempting to fetch from: ${corsProxy}${encodeURIComponent(trackingUrl)}`);
        const response = await fetch(`${corsProxy}${encodeURIComponent(trackingUrl)}`);
        const html = await response.text();
        
        console.log(`Response status: ${response.status}`);
        console.log(`HTML length: ${html.length}`);
        
        // Extract yacht details from HTML
        const yachtDetails: any = {};
        
        // Extract vessel name from title or page content
        const nameMatch = html.match(/<title[^>]*>Ship\s+([^(]+)\s*\(/i) || 
                         html.match(/vessel["\s]*name["\s]*[:\s]*["\s]*([^"<>\n]+)/i) ||
                         html.match(/ship["\s]*name["\s]*[:\s]*["\s]*([^"<>\n]+)/i);
        if (nameMatch && nameMatch[1]) {
          yachtDetails.vesselName = nameMatch[1].trim();
        }

        // Extract vessel type
        const typeMatch = html.match(/vessel["\s]*type["\s]*[:\s]*["\s]*([^"<>\n]+)/i) ||
                         html.match(/ship["\s]*type["\s]*[:\s]*["\s]*([^"<>\n]+)/i) ||
                         html.match(/\(([^)]*(?:yacht|vessel|ship|tanker|cargo|passenger)[^)]*)\)/i);
        if (typeMatch && typeMatch[1]) {
          yachtDetails.vesselType = typeMatch[1].trim();
        }

        // Extract dimensions (Length, Beam, Draft)
        const lengthMatch = html.match(/length["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i) ||
                           html.match(/loa["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i);
        if (lengthMatch) {
          yachtDetails.length = lengthMatch[1];
        }

        const beamMatch = html.match(/beam["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i) ||
                         html.match(/width["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i);
        if (beamMatch) {
          yachtDetails.beam = beamMatch[1];
        }

        const draftMatch = html.match(/draft["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i) ||
                          html.match(/draught["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i);
        if (draftMatch) {
          yachtDetails.draft = draftMatch[1];
        }

        // Extract year built
        const yearMatch = html.match(/year["\s]*built["\s]*[:\s]*["\s]*(\d{4})/i) ||
                         html.match(/built["\s]*[:\s]*["\s]*(\d{4})/i);
        if (yearMatch) {
          yachtDetails.yearBuilt = yearMatch[1];
        }

        // Extract builder/shipyard
        const builderMatch = html.match(/builder["\s]*[:\s]*["\s]*([^"<>\n]+)/i) ||
                            html.match(/shipyard["\s]*[:\s]*["\s]*([^"<>\n]+)/i);
        if (builderMatch && builderMatch[1]) {
          yachtDetails.builder = builderMatch[1].trim();
        }

        // Extract gross tonnage
        const tonnageMatch = html.match(/gross["\s]*tonnage["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i) ||
                            html.match(/gt["\s]*[:\s]*["\s]*(\d+(?:\.\d+)?)/i);
        if (tonnageMatch) {
          yachtDetails.grossTonnage = tonnageMatch[1];
        }

        // Extract location coordinates
        const patterns = [
          /latitude["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
          /"lat"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
          /lat["\s]*=["\s]*([+-]?\d+\.?\d*)/i,
          /position["\s]*:["\s]*\{[^}]*lat["\s]*:["\s]*([+-]?\d+\.?\d*)/i
        ];
        
        const lngPatterns = [
          /longitude["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
          /"lng"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
          /"lon"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
          /lng["\s]*=["\s]*([+-]?\d+\.?\d*)/i,
          /position["\s]*:["\s]*\{[^}]*lng["\s]*:["\s]*([+-]?\d+\.?\d*)/i
        ];
        
        let latMatch = null;
        let lngMatch = null;
        
        // Try each pattern
        for (const pattern of patterns) {
          latMatch = html.match(pattern);
          if (latMatch) break;
        }
        
        for (const pattern of lngPatterns) {
          lngMatch = html.match(pattern);
          if (lngMatch) break;
        }
        
        if (latMatch && lngMatch) {
          const coordinates = {
            lat: parseFloat(latMatch[1]),
            lng: parseFloat(lngMatch[1])
          };
          
          // Validate coordinates are reasonable
          if (coordinates.lat >= -90 && coordinates.lat <= 90 && 
              coordinates.lng >= -180 && coordinates.lng <= 180) {
            yachtDetails.coordinates = coordinates;
          }
        }

        // If no real coordinates found, provide mock coordinates based on MMSI region
        if (!yachtDetails.coordinates && type === 'mmsi') {
          const mockCoordinates = getMockCoordinatesFromMMSI(identifier);
          if (mockCoordinates) {
            yachtDetails.coordinates = mockCoordinates;
            yachtDetails.mockLocation = true;
          }
        }

        console.log('Extracted yacht details:', yachtDetails);

        // Auto-fill form fields if details were found
        if (Object.keys(yachtDetails).length > 0) {
          // Basic Info section
          if (yachtDetails.vesselName) {
            const currentTitle = form.getValues('title');
            if (!currentTitle || currentTitle.trim() === '') {
              form.setValue('title', yachtDetails.vesselName);
            }
            
            // Auto-generate description if empty
            const currentDescription = form.getValues('description');
            if (!currentDescription || currentDescription.trim() === '') {
              form.setValue('description', `Experience the luxury aboard ${yachtDetails.vesselName}, a magnificent yacht available for charter. This exceptional vessel offers unparalleled comfort and elegance for your perfect maritime adventure.`);
            }
          }
          
          // Set property type to yacht
          form.setValue('propertyType', 'yacht');
          
          // Yacht Details section
          if (yachtDetails.vesselType) {
            // Try to map vessel type to our yacht categories
            const vesselTypeLower = yachtDetails.vesselType.toLowerCase();
            if (vesselTypeLower.includes('yacht') || vesselTypeLower.includes('pleasure')) {
              form.setValue('propertyType', 'yacht');
              if (vesselTypeLower.includes('motor') || vesselTypeLower.includes('power')) {
                form.setValue('yachtSubtype', 'motor-yacht');
              } else if (vesselTypeLower.includes('sail')) {
                form.setValue('yachtSubtype', 'sailing-yacht');
              } else {
                form.setValue('yachtSubtype', 'pleasure-yacht');
              }
            }
          }
          
          // Set yacht dimensions
          if (yachtDetails.length) {
            form.setValue('yachtLOA', yachtDetails.length);
          }
          if (yachtDetails.beam) {
            form.setValue('yachtBeam', yachtDetails.beam);
          }
          if (yachtDetails.draft) {
            form.setValue('yachtDraft', yachtDetails.draft);
          }
          if (yachtDetails.yearBuilt) {
            form.setValue('yachtYearBuilt', yachtDetails.yearBuilt);
            form.setValue('yearBuilt', yachtDetails.yearBuilt);
          }
          if (yachtDetails.builder) {
            form.setValue('yachtBuilder', yachtDetails.builder);
          }
          if (yachtDetails.grossTonnage) {
            form.setValue('yachtGrossTonnage', yachtDetails.grossTonnage);
          }
          
          // Set default yacht charter/sale settings
          form.setValue('yachtSaleOrCharter', 'charter');
          form.setValue('listingType', 'rent');
          form.setValue('availability', 'available');
          form.setValue('visibility', 'public');
          
          // Set some default amenities for yachts
          const defaultYachtAmenities = ['wifi', 'air-conditioning', 'deck-space', 'water-sports-equipment'];
          form.setValue('amenities', defaultYachtAmenities);
          
          // Location Details section
          if (yachtDetails.coordinates) {
            setMapCoordinates(yachtDetails.coordinates);
            form.setValue('latitude', yachtDetails.coordinates.lat.toString());
            form.setValue('longitude', yachtDetails.coordinates.lng.toString());
            
            // Try to reverse geocode coordinates for location details
            try {
              const geoData = await MapboxService.reverseGeocode(yachtDetails.coordinates.lng, yachtDetails.coordinates.lat);
              
              if (geoData.features && geoData.features.length > 0) {
                const feature = geoData.features[0];
                const context = feature.context || [];
                
                // Extract location components
                const country = context.find((c: any) => c.id.includes('country'))?.text;
                const region = context.find((c: any) => c.id.includes('region'))?.text;
                const place = context.find((c: any) => c.id.includes('place'))?.text;
                
                if (country) form.setValue('country', country);
                if (region) form.setValue('region', region);
                if (place) form.setValue('city', place);
                
                // Set general location field
                const locationParts = [place, region, country].filter(Boolean);
                if (locationParts.length > 0) {
                  form.setValue('location', locationParts.join(', '));
                }
              }
            } catch (error) {
              console.warn('Failed to reverse geocode coordinates:', error);
              // Fallback location
              form.setValue('location', `Maritime location at ${yachtDetails.coordinates.lat.toFixed(4)}, ${yachtDetails.coordinates.lng.toFixed(4)}`);
            }
            
            toast({
              title: yachtDetails.mockLocation ? `${type.toUpperCase()} Location (Estimated)` : "Vessel Location Found",
              description: `${yachtDetails.vesselName || 'Vessel'} located at ${yachtDetails.coordinates.lat.toFixed(4)}, ${yachtDetails.coordinates.lng.toFixed(4)}${yachtDetails.mockLocation ? ' (Regional estimate)' : ''}`,
            });
          }

          // Set Marine Traffic URL
          form.setValue('marineTrafficUrl', trackingUrl);

          toast({
            title: `${type.toUpperCase()} ${identifier} Details Loaded`,
            description: `Yacht details auto-filled from MarineTraffic.com`,
            action: (
              <a 
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                View on MarineTraffic
              </a>
            ),
            duration: 10000,
          });
          
          return yachtDetails;
        }
      } catch (fetchError) {
        console.log('CORS proxy failed:', fetchError);
      }
      
      // Fallback: Open Marine Traffic for manual lookup
      toast({
        title: "Manual Lookup Required",
        description: `Please verify yacht details for ${type.toUpperCase()}: ${identifier} manually.`,
        action: (
          <a 
            href={trackingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
            onClick={() => {
              // Auto-open Marine Traffic in new tab
              window.open(trackingUrl, '_blank');
            }}
          >
            Open Marine Traffic
          </a>
        ),
        duration: 15000,
      });
      
      return null;
    } catch (error) {
      console.error('Error fetching yacht details:', error);
      return null;
    }
  };

  // Watch for changes in latitude, longitude, Google Plus Code, and MMSI
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'latitude' || name === 'longitude') {
        const lat = parseFloat(value.latitude || '');
        const lng = parseFloat(value.longitude || '');
        
        if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          setMapCoordinates({ lat, lng });
          toast({
            title: "Coordinates Updated",
            description: `Location set to ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          });
        } else if (value.latitude === '' && value.longitude === '') {
          setMapCoordinates(null);
        }
      } else if (name === 'googlePlusCode' && value.googlePlusCode) {
        convertPlusCodeToCoordinates(value.googlePlusCode);
      } else if (name === 'mmsiNumber' && value.mmsiNumber) {
        // Fetch yacht details and location when MMSI is entered
        const fetchDetails = async () => {
          await fetchYachtDetailsFromIdentifier(value.mmsiNumber, 'mmsi');
        };
        fetchDetails();
      } else if (name === 'imoNumber' && value.imoNumber) {
        // Fetch yacht details and location when IMO is entered
        const fetchDetails = async () => {
          await fetchYachtDetailsFromIdentifier(value.imoNumber, 'imo');
        };
        fetchDetails();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, toast]);

  // Zoom functions
  // Handle map coordinate changes from Mapbox
  const handleMapCoordinatesChange = (coordinates: { lat: number; lng: number }) => {
    setMapCoordinates(coordinates);
    form.setValue('latitude', coordinates.lat.toString());
    form.setValue('longitude', coordinates.lng.toString());
  };

  // Handle map zoom changes from Mapbox
  const handleMapZoomChange = (zoom: number) => {
    setMapZoom(zoom);
  };

  const propertyTypes = [
    { value: "entire-place", label: "Entire Place" },
    { value: "private-room", label: "Private Room" },
    { value: "shared-room", label: "Shared Room" },
    { value: "hotel-room", label: "Hotel Room" },
    { value: "residential-house", label: "Residential House" },
    { value: "apartment", label: "Apartment" },
    { value: "condo", label: "Condominium" },
    { value: "townhouse", label: "Townhouse" },
    { value: "villa", label: "Villa" },
    { value: "treehouse", label: "Treehouse" },
    { value: "castle", label: "Castle" },
    { value: "boat", label: "Boat" },
    { value: "yacht", label: "Yacht" },
    { value: "cabin", label: "Cabin" },
    { value: "commercial-office", label: "Commercial Office" },
    { value: "retail-space", label: "Retail Space" },
    { value: "warehouse", label: "Warehouse" },
    { value: "land", label: "Land/Plot" },
    { value: "hotel", label: "Hotel/Resort" },
    { value: "restaurant", label: "Restaurant/Cafe" },
    { value: "other", label: "Other" },
  ];

  const realEstatePropertyTypes = [
    { value: "residential", label: "Residential Property" },
    { value: "commercial", label: "Commercial Property" },
    { value: "land-development", label: "Land & Development" },
    { value: "special-purpose", label: "Special-Purpose Real Estate" },
    { value: "luxury-international", label: "International & Luxury Real Estate" },
  ];

  const hotelPropertyTypes = [
    // 🛏️ By Type of Accommodation - 🏙️ Urban / City Hotels
    { value: "business-hotel", label: "🏢 Business Hotel" },
    { value: "boutique-hotel", label: "🎨 Boutique Hotel" },
    { value: "heritage-hotel", label: "🏛️ Heritage Hotel" },
    { value: "lifestyle-hotel", label: "✨ Lifestyle Hotel" },
    { value: "capsule-hotel", label: "🔲 Capsule Hotel / Pod Hotel" },
    { value: "apartment-hotel", label: "🏠 Apartment Hotel (Aparthotel)" },
    { value: "extended-stay-hotel", label: "📅 Extended Stay Hotel" },
    { value: "budget-hotel", label: "💰 Budget / Economy Hotel" },
    { value: "airport-hotel", label: "✈️ Airport Hotel" },
    
    // 🏖️ Resorts
    { value: "beach-resort", label: "🏖️ Beach Resort" },
    { value: "island-resort", label: "🏝️ Island Resort" },
    { value: "mountain-resort", label: "⛰️ Mountain Resort" },
    { value: "lakefront-resort", label: "🌊 Lakefront Resort" },
    { value: "desert-resort", label: "🏜️ Desert Resort" },
    { value: "golf-resort", label: "⛳ Golf Resort" },
    { value: "ski-resort", label: "🎿 Ski Resort" },
    { value: "safari-lodge", label: "🦁 Safari Lodge / Game Lodge" },
    { value: "spa-resort", label: "🧘 Spa Resort / Wellness Retreat" },
    { value: "all-inclusive-resort", label: "🍽️ All-Inclusive Resort" },
    { value: "eco-resort", label: "🌱 Eco-Resort / Sustainable Resort" },
    { value: "adults-only-resort", label: "🔞 Adults-Only Resort" },
    { value: "family-resort", label: "👨‍👩‍👧‍👦 Family Resort" },
    
    // 🌍 Destination & Specialty Lodging
    { value: "eco-lodge", label: "🌿 Eco-Lodge / Nature Lodge" },
    { value: "jungle-lodge", label: "🌳 Jungle Lodge" },
    { value: "overwater-bungalow", label: "🌊 Overwater Bungalow" },
    { value: "treehouse-hotel", label: "🌲 Treehouse Hotel" },
    { value: "glamping-resort", label: "⛺ Glamping Resort / Tent Camp" },
    { value: "ice-hotel", label: "❄️ Ice Hotel / Igloo Lodge" },
    { value: "cave-hotel", label: "🕳️ Cave Hotel" },
    { value: "floating-hotel", label: "🚢 Floating Hotel / Boat Hotel" },
    { value: "castle-hotel", label: "🏰 Castle / Palace Hotel" },
    { value: "winery-hotel", label: "🍷 Winery Hotel" },
    { value: "historical-mansion", label: "🏛️ Historical Mansion Stay" },
    { value: "monastery-hotel", label: "🕊️ Monastery Hotel / Heritage Inn" },
    { value: "desert-camp", label: "🐪 Desert Camp" },
    
    // 🧘 By Theme / Experience
    { value: "wellness-retreat", label: "🧘 Wellness Retreat / Detox Center" },
    { value: "yoga-retreat", label: "🧘‍♀️ Yoga & Meditation Retreat" },
    { value: "medical-tourism", label: "🏥 Medical Tourism Hotel" },
    { value: "art-hotel", label: "🎨 Art Hotel" },
    { value: "music-hotel", label: "🎵 Music or Fashion-Themed Hotel" },
    { value: "romantic-hotel", label: "💕 Romantic / Honeymoon Hotel" },
    { value: "lgbtq-hotel", label: "🏳️‍🌈 LGBTQ+ Friendly Hotel" },
    { value: "adventure-hotel", label: "🗻 Adventure Hotel" },
    { value: "surf-hotel", label: "🏄 Surf Hotel" },
    { value: "diving-resort", label: "🤿 Diving Resort" },
    { value: "sports-resort", label: "⚽ Sports Resort" },
    { value: "cultural-stay", label: "🎭 Cultural Immersion Stay" },
    
    // 🏢 By Ownership / Brand Model
    { value: "independent-hotel", label: "🏪 Independent Hotel" },
    { value: "chain-hotel", label: "🔗 Chain Hotel" },
    { value: "franchise-hotel", label: "🤝 Franchise Hotel" },
    { value: "timeshare-resort", label: "⏰ Timeshare Resort" },
    { value: "serviced-residence", label: "🏠 Serviced Residence" },
    { value: "branded-residence", label: "🏷️ Branded Residence" },
    { value: "condo-hotel", label: "🏢 Condo-Hotel" },
    
    // 👥 By Guest Profile
    { value: "family-hotel", label: "👨‍👩‍👧‍👦 Family Hotel / Kid-Friendly" },
    { value: "adults-only-hotel", label: "🔞 Adults-Only Hotel" },
    { value: "pet-friendly-hotel", label: "🐕 Pet-Friendly Hotel" },
    { value: "couples-hotel", label: "💑 Couples Hotel" },
    { value: "group-hotel", label: "👥 Group Accommodation / Event Hotel" },
    { value: "solo-hostel", label: "🎒 Solo Traveler Hostel / Backpacker Lodge" },
    { value: "corporate-hotel", label: "💼 Corporate / Business Traveler Hotel" },
    { value: "vip-luxury", label: "👑 VIP / Celebrity-Ready Luxury Hotel" },
    
    // 🕌 By Cultural or Legal Context
    { value: "halal-hotel", label: "☪️ Halal Hotel (Sharia-compliant)" },
    { value: "dry-hotel", label: "🚫 Dry Hotel (No alcohol served)" },
    { value: "kosher-hotel", label: "✡️ Kosher Hotel" },
    { value: "vegan-hotel", label: "🌱 Vegan Hotel" },
    { value: "non-smoking-hotel", label: "🚭 Non-Smoking Hotels" },
    { value: "female-only-floors", label: "👩 Female-Only Hotel Floors" },
    { value: "religious-retreat", label: "🙏 Religious Retreat Lodge" },
    
    // 🏕️ By Physical Form or Architecture
    { value: "high-rise-hotel", label: "🏢 High-Rise Hotel" },
    { value: "courtyard-hotel", label: "🏛️ Courtyard Hotel" },
    { value: "motel", label: "🚗 Motel / Motor Inn" },
    { value: "ryokan", label: "🏮 Ryokan (Japanese Inn)" },
    { value: "riad", label: "🕌 Riad (Moroccan Traditional Home)" },
    { value: "gite-agriturismo", label: "🌾 Gîte / Agriturismo (Rural Europe)" },
    { value: "bed-breakfast", label: "🍳 B&B (Bed and Breakfast)" },
    { value: "country-house", label: "🏡 Country House Hotel" },
    { value: "chalet-lodge", label: "🏔️ Chalet / Alpine Lodge" },
    { value: "caravan-park", label: "🚐 Caravan Park / Trailer Lodge" },
    { value: "houseboat-hotel", label: "🛥️ Floating Barge / Houseboat Hotel" },
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

  const yachtPropertyTypes = [
    { value: "motor-yacht", label: "Motor Yacht" },
    { value: "sailing-yacht", label: "Sailing Yacht" },
    { value: "hybrid-electric-yacht", label: "Hybrid & Electric Yachts" },
  ];


  const sailingYachtSubtypes = [
    { value: "sloop-single-mast", label: "Sloop (single-mast)" },
    { value: "ketch-two-mast", label: "Ketch (two-mast)" },
    { value: "schooner-three-or-more-masts", label: "Schooner (three or more masts)" },
    { value: "cutter", label: "Cutter" },
    { value: "yawl", label: "Yawl" },
    { value: "classic-sailing-yacht", label: "Classic Sailing Yacht" },
    { value: "racing-yacht", label: "Racing Yacht" },
    { value: "bluewater-cruiser", label: "Bluewater Cruiser" },
    { value: "performance-cruiser", label: "Performance Cruiser" },
    { value: "daysailer", label: "Daysailer" },
  ];

  const privateYachtSubtypes = [
    { value: "family-yacht", label: "Family Yacht" },
    { value: "luxury-private-yacht", label: "Luxury Private Yacht" },
    { value: "liveaboard-yacht", label: "Liveaboard Yacht" },
  ];

  const sportLeisureYachtSubtypes = [
    { value: "sports-yacht", label: "Sports Yacht" },
    { value: "day-cruiser", label: "Day Cruiser" },
    { value: "watersports-yacht", label: "Watersports Yacht" },
    { value: "fishing-yacht", label: "Fishing Yacht" },
    { value: "sportfisher", label: "Sportfisher" },
    { value: "convertible-fishing-yacht", label: "Convertible Fishing Yacht" },
    { value: "walkaround-fishing-yacht", label: "Walkaround Fishing Yacht" },
  ];

  const yachtHullConfigurations = [
    { value: "monohull-yacht", label: "Monohull Yacht" },
    { value: "catamaran-yacht", label: "Catamaran Yacht (Power or Sail)" },
    { value: "trimaran-yacht", label: "Trimaran Yacht" },
    { value: "swath-yacht", label: "SWATH Yacht (Small Waterplane Area Twin Hull)" },
    { value: "hydrofoil-yacht", label: "Hydrofoil Yacht (rare)" },
  ];

  const yachtSizeClasses = [
    { value: "pocket-yacht", label: "Pocket Yacht < 24m (80 ft)" },
    { value: "superyacht", label: "Superyacht 24m – 60m (80–197 ft)" },
    { value: "megayacht", label: "Megayacht 60m – 90m (197–295 ft)" },
    { value: "gigayacht", label: "Gigayacht / Ultra Large 90m+ (295+ ft)" },
  ];

  const yachtStyleLayouts = [
    { value: "open-express", label: "Open / Express Yacht" },
    { value: "flybridge", label: "Flybridge Yacht" },
    { value: "raised-pilothouse", label: "Raised Pilothouse Yacht" },
    { value: "tri-deck-multi-deck", label: "Tri-deck / Multi-deck Yacht" },
    { value: "convertible", label: "Convertible Yacht" },
    { value: "beach-club", label: "Beach Club Yacht" },
    { value: "explorer", label: "Explorer Yacht (long range, rugged)" },
    { value: "retro-classic", label: "Retro Classic Yacht" },
    { value: "minimalist-avant-garde", label: "Minimalist / Avant-garde Yacht" },
  ];

  const yachtSpecialPurposes = [
    { value: "ice-class-icebreaker", label: "Ice-Class Yacht / Icebreaker Yacht" },
    { value: "amphibious", label: "Amphibious Yacht (land & water)" },
    { value: "submersible", label: "Submersible Yacht (rare, conceptual)" },
    { value: "stealth", label: "Stealth Yacht (military-derived designs)" },
    { value: "autonomous-ai", label: "Autonomous / AI-Powered Yacht" },
    { value: "sail-assisted-motor", label: "Sail-Assisted Motor Yacht (e.g. Perini Navi Falcon rigs)" },
  ];

  const yachtMaterialsBuildTypes = [
    { value: "fiberglass-grp", label: "Fiberglass/GRP (Glass Reinforced Plastic)" },
    { value: "carbon-fiber", label: "Carbon Fiber" },
    { value: "aluminum", label: "Aluminum" },
    { value: "steel", label: "Steel" },
    { value: "wood-traditional", label: "Wood (Traditional)" },
    { value: "composite-materials", label: "Composite Materials" },
    { value: "kevlar", label: "Kevlar" },
    { value: "titanium", label: "Titanium (Luxury)" },
    { value: "hybrid-materials", label: "Hybrid Materials" },
  ];

  const charterYachtSubtypes = [
    { value: "crewed-charter-yacht", label: "Crewed Charter Yacht" },
    { value: "bareboat-charter-yacht", label: "Bareboat Charter Yacht" },
    { value: "cabin-charter-yacht", label: "Cabin Charter Yacht" },
    { value: "corporate-charter-yacht", label: "Corporate Charter Yacht" },
  ];

  const hybridElectricYachtSubtypes = [
    { value: "hybrid-propulsion-yacht", label: "Hybrid Propulsion Yacht" },
    { value: "electric-yacht", label: "Electric Yacht" },
    { value: "solar-powered-yacht", label: "Solar-powered Yacht" },
    { value: "hydrogen-powered-yacht", label: "Hydrogen-powered Yacht (emerging)" },
  ];

  const motorYachtSubtypes = [
    { value: "flybridge-motor-yacht", label: "Flybridge Motor Yacht" },
    { value: "hardtop-motor-yacht", label: "Hardtop Motor Yacht" },
    { value: "open-sport-yacht", label: "Open / Sport Yacht" },
    { value: "semi-displacement-yacht", label: "Semi-Displacement Yacht" },
    { value: "displacement-yacht", label: "Displacement Yacht" },
    { value: "trawler-yacht", label: "Trawler Yacht" },
    { value: "expedition-explorer-yacht", label: "Expedition / Explorer Yacht" },
    { value: "fast-displacement-yacht", label: "Fast Displacement Yacht" },
    { value: "planing-yacht", label: "Planing Yacht" },
  ];

  const amenities = [
    { id: "kitchen", label: "Kitchen", icon: Utensils },
    { id: "washer", label: "Washer", icon: Waves },
    { id: "dryer", label: "Dryer", icon: Wind },
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "heating", label: "Heating", icon: Heater },
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "tv", label: "TV", icon: Tv },
    { id: "hair-dryer", label: "Hair Dryer", icon: Wind },
    { id: "iron", label: "Iron", icon: Shirt },
  ];

  const hotelAmenities = [
    // Room Amenities
    { id: "ac", label: "Air Conditioning", icon: Wind },
    { id: "heating", label: "Heating", icon: Heater },
    { id: "private-bathroom", label: "Private Bathroom", icon: Bath },
    { id: "bathtub-shower", label: "Bathtub / Rain Shower", icon: Bath },
    { id: "towels-toiletries", label: "Towels & Toiletries", icon: Bath },
    { id: "hair-dryer", label: "Hair Dryer", icon: Wind },
    { id: "bathrobe-slippers", label: "Bathrobe & Slippers", icon: Shirt },
    { id: "in-room-safe", label: "In-room Safe", icon: Lock },
    { id: "mini-bar", label: "Mini-Bar", icon: Coffee },
    { id: "coffee-tea-maker", label: "Coffee / Tea Maker", icon: Coffee },
    { id: "electric-kettle", label: "Electric Kettle", icon: Coffee },
    { id: "bottled-water", label: "Bottled Water (Complimentary)", icon: Droplets },
    { id: "work-desk", label: "Work Desk", icon: Laptop },
    { id: "iron-board", label: "Iron & Ironing Board", icon: Shirt },
    { id: "alarm-clock", label: "Alarm Clock / Wake-up Service", icon: Clock },
    { id: "closet-wardrobe", label: "Closet / Wardrobe", icon: Package },
    { id: "full-mirror", label: "Full-length Mirror", icon: Eye },
    { id: "smart-tv", label: "Smart TV / Satellite TV", icon: Tv },
    { id: "streaming-services", label: "Streaming Services (e.g. Netflix)", icon: Monitor },
    { id: "telephone", label: "Telephone", icon: Phone },
    { id: "usb-charging", label: "USB Charging Ports", icon: Zap },
    { id: "balcony-terrace", label: "Balcony / Terrace", icon: TreePine },
    { id: "kitchenette", label: "Kitchenette / Full Kitchen", icon: Utensils },
    { id: "washer-dryer", label: "Washer / Dryer (in-room or shared)", icon: Shirt },
    
    // Guest Services
    { id: "24h-reception", label: "24-Hour Reception", icon: Clock },
    { id: "concierge", label: "Concierge Services", icon: Users },
    { id: "bellhop", label: "Bellhop / Porter Service", icon: Users },
    { id: "currency-exchange", label: "Currency Exchange", icon: DollarSign },
    { id: "multilingual-staff", label: "Multilingual Staff", icon: Globe },
    { id: "room-service", label: "Room Service (24/7 or limited)", icon: Coffee },
    { id: "daily-housekeeping", label: "Daily Housekeeping", icon: Shirt },
    { id: "laundry-service", label: "Laundry & Dry Cleaning", icon: Shirt },
    { id: "luggage-storage", label: "Luggage Storage", icon: Package },
    { id: "express-checkin", label: "Express Check-in / Check-out", icon: Clock },
    { id: "valet-parking", label: "Valet Parking", icon: Car },
    { id: "airport-shuttle", label: "Airport Shuttle / Transportation Services", icon: Car },
    { id: "tour-desk", label: "Tour Desk / Excursion Booking", icon: MapPin },
    { id: "babysitting", label: "Babysitting / Childcare Services", icon: Users },
    { id: "wake-up-calls", label: "Wake-Up Calls", icon: Phone },
    { id: "pet-friendly", label: "Pet-Friendly Services (e.g., dog beds, pet menus)", icon: Dog },
    
    // Connectivity & Tech
    { id: "free-wifi", label: "Free Wi-Fi", icon: Wifi },
    { id: "premium-wifi", label: "Premium High-Speed Wi-Fi", icon: WifiIcon },
    { id: "business-center", label: "Business Center", icon: Laptop },
    { id: "public-workstations", label: "Public Workstations", icon: Monitor },
    { id: "meeting-rooms", label: "Meeting / Conference Rooms", icon: Users },
    { id: "av-equipment", label: "Audio-Visual Equipment", icon: Monitor },
    { id: "fax-printing", label: "Fax / Printing Services", icon: FileText },
    { id: "mobile-keys", label: "Mobile Room Keys", icon: Phone },
    { id: "self-checkin", label: "Self Check-in Kiosks", icon: Monitor },
    { id: "smart-controls", label: "Smart Room Controls / Tablets", icon: Monitor },
    
    // Dining & Beverage Options
    { id: "restaurant", label: "On-site Restaurant(s)", icon: Utensils },
    { id: "rooftop-bar", label: "Rooftop Bar / Lounge", icon: Coffee },
    { id: "pool-bar", label: "Pool Bar / Swim-up Bar", icon: Coffee },
    { id: "coffee-shop", label: "Coffee Shop / Café", icon: Coffee },
    { id: "in-room-dining", label: "In-Room Dining", icon: Utensils },
    { id: "buffet-breakfast", label: "Buffet Breakfast", icon: Coffee },
    { id: "carte-dining", label: "À la Carte Dining", icon: Utensils },
    { id: "grab-go-snacks", label: "Grab-and-Go Snacks", icon: Package },
    { id: "wine-cellar", label: "Wine Cellar / Tasting Room", icon: Coffee },
    { id: "cooking-classes", label: "Cooking Classes", icon: Utensils },
    { id: "themed-dinners", label: "Themed Dinners", icon: Utensils },
    { id: "private-chef", label: "Private Chef / Table Service", icon: Utensils },
    
    // Wellness & Spa
    { id: "full-spa", label: "Full-Service Spa", icon: Bath },
    { id: "massage", label: "Massage Services", icon: HeartHandshake },
    { id: "sauna-steam", label: "Sauna / Steam Room", icon: Thermometer },
    { id: "hammam", label: "Hammam / Turkish Bath", icon: Bath },
    { id: "hot-tub", label: "Hot Tub / Jacuzzi", icon: Bath },
    { id: "outdoor-pool", label: "Outdoor Pool", icon: Waves },
    { id: "indoor-pool", label: "Indoor Pool", icon: Waves },
    { id: "infinity-pool", label: "Infinity Pool", icon: Waves },
    { id: "plunge-pool", label: "Plunge Pool", icon: Waves },
    { id: "cold-therapy", label: "Cold Therapy Room", icon: Thermometer },
    { id: "yoga-classes", label: "Yoga Classes / Studio", icon: HeartHandshake },
    { id: "meditation", label: "Meditation Area", icon: HeartHandshake },
    { id: "beauty-salon", label: "Beauty Salon / Hairdresser", icon: Users },
    { id: "personal-trainer", label: "Personal Trainer Services", icon: Dumbbell },
    
    // Fitness & Recreation
    { id: "fitness-center", label: "Fitness Center / Gym", icon: Dumbbell },
    { id: "tennis-court", label: "Tennis Court(s)", icon: Gamepad2 },
    { id: "squash-court", label: "Squash Court", icon: Gamepad2 },
    { id: "golf-course", label: "Golf Course / Putting Green", icon: Gamepad2 },
    { id: "bicycles", label: "Bicycles for Guest Use", icon: Car },
    { id: "hiking-trails", label: "Hiking / Running Trails", icon: TreePine },
    { id: "water-sports", label: "Water Sports (e.g., kayaking, paddleboarding)", icon: Waves },
    { id: "ski-access", label: "Ski Access / Ski Storage", icon: TreePine },
    { id: "surfboard-rental", label: "Surfboard Rental", icon: Waves },
    { id: "kids-club", label: "Kids' Club / Play Area", icon: Users },
    { id: "game-room", label: "Game Room / Arcade", icon: Gamepad2 },
    { id: "bowling", label: "Bowling Alley", icon: Gamepad2 },
    { id: "climbing-wall", label: "Climbing Wall", icon: TreePine },
    { id: "dance-studio", label: "Dance Studio", icon: Music },
    { id: "library", label: "Library / Reading Lounge", icon: FileText },
    
    // Shopping & Extras
    { id: "gift-shop", label: "Gift Shop", icon: Gift },
    { id: "convenience-store", label: "Convenience Store", icon: Package },
    { id: "luxury-boutiques", label: "Luxury Retail Boutiques", icon: Gift },
    { id: "florist", label: "Florist", icon: TreePine },
    { id: "atm", label: "ATM on Site", icon: DollarSign },
    { id: "currency-booth", label: "Currency Exchange Booth", icon: DollarSign },
    { id: "art-gallery", label: "Art Gallery / Cultural Display", icon: Eye },
    { id: "craft-market", label: "Local Craft Market Access", icon: Gift },
    
    // Accessibility Features
    { id: "wheelchair-rooms", label: "Wheelchair-Accessible Rooms", icon: Users },
    { id: "elevator-access", label: "Elevator Access to All Floors", icon: Building },
    { id: "accessible-bathroom", label: "Accessible Bathroom (Grab Bars, Roll-in Shower)", icon: Bath },
    { id: "visual-alarms", label: "Visual / Audible Alarms", icon: AlertTriangle },
    { id: "braille-signage", label: "Braille Signage", icon: Eye },
    { id: "step-free", label: "Step-Free Entrance", icon: Building },
    { id: "accessible-parking", label: "Accessible Parking", icon: Car },
    { id: "service-animal", label: "Service Animal Friendly", icon: Dog },
    
    // Parking & Transport
    { id: "free-parking", label: "Free Parking", icon: Car },
    { id: "valet", label: "Valet Parking", icon: Car },
    { id: "ev-charging", label: "EV Charging Station", icon: Zap },
    { id: "secured-garage", label: "Secured Garage", icon: Lock },
    { id: "bicycle-parking", label: "Bicycle Parking", icon: Car },
    { id: "shuttle", label: "Airport Shuttle", icon: Plane },
    { id: "car-rental", label: "Car Rental Desk", icon: Car },
    { id: "chauffeur", label: "Chauffeur / Limo Service", icon: Car },
    
    // Security & Safety
    { id: "24h-security", label: "24-Hour Security", icon: Shield },
    { id: "cctv", label: "CCTV Surveillance", icon: Camera },
    { id: "smoke-detectors", label: "Smoke Detectors", icon: AlertTriangle },
    { id: "carbon-detectors", label: "Carbon Monoxide Detectors", icon: AlertTriangle },
    { id: "sprinkler", label: "Sprinkler System", icon: Droplets },
    { id: "fire-extinguishers", label: "Fire Extinguishers", icon: AlertTriangle },
    { id: "evacuation-plan", label: "Emergency Evacuation Plan", icon: AlertTriangle },
    { id: "room-safe", label: "In-Room Safe", icon: Lock },
    { id: "security-patrols", label: "Security Patrols", icon: Shield },
    { id: "keycard-access", label: "Keycard Access", icon: Lock },
    
    // Sustainability / Eco-Friendly Amenities
    { id: "energy-efficient", label: "Energy-Efficient Lighting", icon: Zap },
    { id: "green-certification", label: "Green Building Certification (e.g., LEED)", icon: TreePine },
    { id: "water-reuse", label: "Water Reuse System", icon: Droplets },
    { id: "plastic-free", label: "Plastic-Free Toiletries", icon: TreePine },
    { id: "organic-linen", label: "Organic Linen / Towels", icon: Shirt },
    { id: "local-food", label: "Locally Sourced Food", icon: Utensils },
    { id: "carbon-offset", label: "Carbon Offset Options", icon: TreePine },
    { id: "electric-transport", label: "Electric Shuttle or Bikes", icon: Zap },
    { id: "recycling-bins", label: "Recycling Bins in Rooms", icon: Package },
    { id: "no-single-plastic", label: "No Single-Use Plastics", icon: TreePine },
  ];
  const facilities = [
    { id: "pool", label: "Pool", icon: Waves },
    { id: "hot-tub", label: "Hot Tub", icon: Bath },
    { id: "parking", label: "Free Parking", icon: ParkingCircle },
    { id: "ev-charger", label: "EV Charger", icon: Zap },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "bbq", label: "BBQ Grill", icon: Flame },
    { id: "patio", label: "Patio or Balcony", icon: TreePine },
    { id: "garden", label: "Garden or Backyard", icon: TreePine },
  ];

  const houseRules = [
    { id: "pets-allowed", label: "Pets Allowed", icon: Dog },
    { id: "smoking-allowed", label: "Smoking Allowed", icon: Cigarette },
    { id: "events-allowed", label: "Events Allowed", icon: PartyPopper },
  ];

  const accessibility = [
    { id: "step-free", label: "Step-free Entry", icon: User },
    { id: "wide-doorways", label: "Wide Doorways", icon: Home },
    { id: "accessible-bathroom", label: "Accessible Bathroom", icon: Bath },
    { id: "shower-grab-bars", label: "Shower Grab Bars", icon: Shield },
    { id: "wheelchair-paths", label: "Wheelchair-accessible Paths", icon: User },
  ];

  const workFeatures = [
    { id: "workspace", label: "Laptop-friendly Workspace", icon: Laptop },
    { id: "fast-wifi", label: "Fast WiFi", icon: Wifi },
    { id: "iron", label: "Iron", icon: Shirt },
    { id: "hangers", label: "Hangers", icon: Shirt },
  ];

  const healthSafety = [
    { id: "cleaning-protocol", label: "Enhanced Cleaning Protocol", icon: HeartHandshake },
    { id: "smoke-detector", label: "Smoke Detector", icon: AlertTriangle },
    { id: "carbon-detector", label: "Carbon Monoxide Detector", icon: AlertTriangle },
    { id: "first-aid", label: "First Aid Kit", icon: Plus },
    { id: "fire-extinguisher", label: "Fire Extinguisher", icon: Flame },
  ];

  // Yacht-specific amenities organized by category
  const yachtInteriorFeatures = [
    { id: "main-salon", label: "Main Salon", icon: Home },
    { id: "formal-dining", label: "Formal Dining Room", icon: Utensils },
    { id: "observation-lounge", label: "Observation Lounge", icon: Eye },
    { id: "skylounge", label: "Skylounge / Upper Salon", icon: Sun },
    { id: "fireplace", label: "Fireplace", icon: Flame },
    { id: "wine-cellar", label: "Wine Cellar / Wine Fridge", icon: Coffee },
    { id: "library", label: "Library / Reading Room", icon: FileText },
    { id: "elevator", label: "Elevator (All decks access)", icon: Building },
    { id: "day-head", label: "Day Head / Guest WC", icon: Bath },
    { id: "pantry", label: "Pantry / Stewardess Station", icon: Home },
    { id: "office", label: "Office / Study", icon: Laptop },
    { id: "massage-room", label: "Massage Room / Spa", icon: Heart },
    { id: "sauna", label: "Sauna / Steam Room", icon: Thermometer },
    { id: "hammam", label: "Hammam / Turkish Bath", icon: Droplets },
    { id: "beauty-salon", label: "Beauty Salon / Treatment Room", icon: Star },
    { id: "laundry", label: "Laundry Room", icon: Shirt },
    { id: "entertainment-system", label: "Entertainment System (Cinema-quality AV)", icon: Monitor },
    { id: "surround-sound", label: "Surround Sound / Audio Zones", icon: Headphones },
    { id: "satellite-tv", label: "Satellite TV", icon: Tv },
    { id: "onboard-wifi", label: "Onboard Wi-Fi (Starlink / VSAT / 4G)", icon: Wifi },
  ];

  const yachtGalleyDining = [
    { id: "commercial-galley", label: "Commercial Galley", icon: Utensils },
    { id: "teppanyaki-grill", label: "Teppanyaki Grill", icon: Flame },
    { id: "pizza-oven", label: "Pizza Oven", icon: Flame },
    { id: "bbq-grill", label: "BBQ / Grill (Interior or Exterior)", icon: Flame },
    { id: "ice-maker", label: "Ice Maker", icon: Droplets },
    { id: "espresso-machine", label: "Espresso Machine", icon: Coffee },
    { id: "outdoor-dining", label: "Outdoor Dining Area", icon: Utensils },
    { id: "formal-dining-area", label: "Formal Dining Area", icon: Utensils },
  ];

  const yachtExteriorFeatures = [
    { id: "sun-deck", label: "Sun Deck", icon: Sun },
    { id: "jacuzzi", label: "Jacuzzi / Hot Tub", icon: Bath },
    { id: "swimming-pool", label: "Swimming Pool", icon: Waves },
    { id: "infinity-pool", label: "Infinity Pool", icon: Waves },
    { id: "swim-platform", label: "Swim Platform / Beach Club", icon: Waves },
    { id: "retractable-roof", label: "Retractable Roof / Skylight", icon: Sun },
    { id: "outdoor-cinema", label: "Outdoor Cinema", icon: Monitor },
    { id: "outdoor-bar", label: "Outdoor Bar / Wet Bar", icon: Coffee },
    { id: "fire-pit", label: "Fire Pit", icon: Flame },
    { id: "alfresco-lounge", label: "Alfresco Lounge Areas", icon: Home },
    { id: "day-beds", label: "Day Beds / Sun Pads", icon: Bed },
    { id: "hammocks", label: "Hammocks", icon: TreePine },
    { id: "glass-balustrades", label: "Glass Balustrades", icon: Eye },
    { id: "outdoor-showers", label: "Outdoor Showers", icon: Droplets },
    { id: "heating-misting", label: "Heating or Misting Systems", icon: Thermometer },
    { id: "convertible-spaces", label: "Convertible Spaces (e.g. gym-to-lounge)", icon: Building },
  ];

  const yachtWellnessFitness = [
    { id: "gym", label: "Gym / Fitness Area", icon: Dumbbell },
    { id: "trainer-station", label: "Personal Trainer Station", icon: User },
    { id: "yoga-space", label: "Yoga / Meditation Space", icon: Heart },
    { id: "spa-massage", label: "Spa / Massage Room", icon: Heart },
    { id: "sauna-steam", label: "Sauna / Steam Room", icon: Thermometer },
    { id: "beauty-treatment", label: "Beauty Salon / Treatment Room", icon: Star },
    { id: "medical-room", label: "Medical Room", icon: Plus },
  ];

  const yachtEntertainmentTech = [
    { id: "movie-theater", label: "Movie Theater / Cinema Room", icon: Monitor },
    { id: "karaoke", label: "Karaoke System", icon: Mic },
    { id: "video-games", label: "Video Game Console (PS5, Xbox)", icon: Gamepad2 },
    { id: "vr-headsets", label: "VR Headsets", icon: Monitor },
    { id: "dj-booth", label: "DJ Booth", icon: Music },
    { id: "disco-lighting", label: "Disco Lighting", icon: Zap },
    { id: "nightclub", label: "Nightclub / Dance Floor", icon: Music },
    { id: "projection-screens", label: "Projection Screens (Indoor/Outdoor)", icon: Monitor },
    { id: "onboard-server", label: "Onboard Server (Media Storage)", icon: Settings },
    { id: "music-streaming", label: "Music Streaming System (Sonos, Kaleidescape)", icon: Headphones },
  ];

  const yachtTendersToys = [
    { id: "primary-tender", label: "Primary Tender (RIB, Limo Tender)", icon: Ship },
    { id: "secondary-tender", label: "Secondary Tender / Rescue Tender", icon: Ship },
    { id: "jet-skis", label: "Jet Skis / WaveRunners", icon: Waves },
    { id: "seabobs", label: "SeaBobs / AquaBikes", icon: Waves },
    { id: "flyboard", label: "Flyboard / Hoverboard", icon: Waves },
    { id: "electric-surfboards", label: "Electric Surfboards / eFoils", icon: Waves },
    { id: "paddleboards", label: "Paddleboards / SUPs", icon: Waves },
    { id: "kayaks", label: "Kayaks (Single/Double)", icon: Waves },
    { id: "waterskis", label: "Waterskis / Wakeboard", icon: Waves },
    { id: "towables", label: "Towables / Inflatables", icon: Waves },
    { id: "floating-pool", label: "Floating Pool / Beach Mat", icon: Waves },
    { id: "scuba-equipment", label: "Scuba Diving Equipment", icon: Waves },
    { id: "snorkeling-gear", label: "Snorkeling Gear", icon: Waves },
    { id: "submarine", label: "Submarine / Mini-sub", icon: Ship },
    { id: "fishing-gear", label: "Fishing Gear", icon: Coffee },
    { id: "underwater-scooter", label: "Underwater Scooter", icon: Waves },
    { id: "hovercraft", label: "Hovercraft", icon: Waves },
    { id: "sailing-dinghy", label: "Sailing Dinghy", icon: Sailboat },
  ];

  const yachtAviation = [
    { id: "helipad", label: "Touch-and-Go Helipad", icon: Plane },
    { id: "certified-helideck", label: "Certified Helideck", icon: Plane },
    { id: "hangar-storage", label: "Hangar Storage", icon: Building },
    { id: "heli-refueling", label: "Helicopter Refueling System", icon: Zap },
  ];

  const yachtTechnical = [
    { id: "stabilizers", label: "Zero-Speed Stabilizers", icon: Anchor },
    { id: "thrusters", label: "Bow and Stern Thrusters", icon: Compass },
    { id: "dps", label: "Dynamic Positioning System (DPS)", icon: Compass },
    { id: "hybrid-propulsion", label: "Hybrid Propulsion System", icon: Zap },
    { id: "solar-panels", label: "Solar Panels", icon: Sun },
    { id: "shore-power", label: "Shore Power Converter", icon: Zap },
    { id: "watermaker", label: "Watermaker / Desalinator", icon: Droplets },
    { id: "wastewater-treatment", label: "Advanced Wastewater Treatment", icon: Droplets },
    { id: "fuel-polishing", label: "Fuel Polishing System", icon: Wrench },
  ];

  const yachtCrewServices = [
    { id: "24-7-crew", label: "24/7 Captain and Crew Service", icon: User },
    { id: "multilingual-crew", label: "Multilingual Crew", icon: Globe },
    { id: "michelin-chef", label: "Michelin-Star Chef / Trained Culinary Staff", icon: Star },
    { id: "concierge", label: "Dedicated Concierge", icon: User },
    { id: "butler-service", label: "Butler Service", icon: User },
    { id: "dive-master", label: "Dive Master / Water Sports Instructor", icon: Waves },
    { id: "spa-therapist", label: "Spa Therapist / Masseuse", icon: Heart },
    { id: "childcare", label: "Childcare / Nanny Available", icon: User },
    { id: "security-staff", label: "Security Staff / Bodyguard", icon: Shield },
  ];

  const yachtSafetyCompliance = [
    { id: "mca-compliance", label: "MCA / ISM Compliance", icon: Shield },
    { id: "life-rafts", label: "Life Rafts", icon: Shield },
    { id: "epirbs", label: "EPIRBs & SARTs", icon: Radio },
    { id: "fire-detection", label: "Fire Detection System", icon: AlertTriangle },
    { id: "cctv", label: "CCTV Surveillance", icon: Camera },
    { id: "security-alarm", label: "Security Alarm System", icon: AlertTriangle },
    { id: "cabin-safes", label: "Safe in Master Cabin and VIPs", icon: Lock },
    { id: "defibrillator", label: "Defibrillator / Medical Bay", icon: Plus },
  ];

  // Real Estate Property Types
  const residentialDwellingTypes = [
    { value: "single-family-home", label: "Single-Family Home (Detached)" },
    { value: "multi-family-home", label: "Multi-Family Home (Duplex, Triplex, Fourplex)" },
    { value: "condominium", label: "Condominium (Condo)" },
    { value: "townhouse", label: "Townhouse / Row House" },
    { value: "apartment", label: "Apartment (Unit in a building)" },
    { value: "bungalow", label: "Bungalow" },
    { value: "cottage", label: "Cottage / Cabin" },
    { value: "studio-apartment", label: "Studio Apartment" },
    { value: "penthouse", label: "Penthouse" },
    { value: "loft", label: "Loft" },
    { value: "villa", label: "Villa" },
    { value: "manufactured-home", label: "Manufactured Home / Mobile Home" },
    { value: "park-home", label: "Park Home / Static Caravan" },
    { value: "tiny-house", label: "Tiny House" },
    { value: "farmhouse", label: "Farmhouse / Country House" },
  ];

  const residentialSettingTypes = [
    { value: "urban-residential", label: "Urban Residential Property" },
    { value: "suburban-home", label: "Suburban Home" },
    { value: "rural-property", label: "Rural Property" },
    { value: "waterfront-property", label: "Waterfront Property (Lake, River, Ocean)" },
    { value: "mountain-countryside", label: "Mountain / Countryside Home" },
    { value: "gated-community", label: "Gated Community Property" },
    { value: "golf-course", label: "Golf Course Property" },
  ];

  const residentialUsageTypes = [
    { value: "primary-residence", label: "Primary Residence" },
    { value: "second-home", label: "Second Home / Vacation Home" },
    { value: "investment-property", label: "Investment Property (Buy-to-let)" },
    { value: "co-living", label: "Co-living / Shared Housing" },
    { value: "senior-living", label: "Senior Living / Retirement Home" },
    { value: "student-housing", label: "Student Housing Unit" },
  ];

  const commercialRetailTypes = [
    { value: "retail-store", label: "Retail Store / Shopfront" },
    { value: "shopping-mall", label: "Shopping Mall Unit" },
    { value: "restaurant", label: "Restaurant / Café Property" },
    { value: "hotel", label: "Hotel / Motel / Inn" },
    { value: "bed-breakfast", label: "Bed & Breakfast (B&B)" },
    { value: "resort", label: "Resort Property" },
  ];

  const commercialOfficeTypes = [
    { value: "office-building", label: "Office Building (Standalone)" },
    { value: "office-unit", label: "Office Unit (within a building)" },
    { value: "shared-office", label: "Shared Office / Co-working Space" },
    { value: "executive-suite", label: "Executive Suite" },
  ];

  const commercialIndustrialTypes = [
    { value: "warehouse", label: "Warehouse" },
    { value: "distribution-center", label: "Distribution Center" },
    { value: "light-industrial", label: "Light Industrial Unit" },
    { value: "heavy-manufacturing", label: "Heavy Manufacturing Facility" },
    { value: "cold-storage", label: "Cold Storage Facility" },
    { value: "flex-space", label: "Flex Space (Office + Warehouse)" },
    { value: "data-center", label: "Data Center" },
  ];

  const landDevelopmentTypes = [
    { value: "residential-land", label: "Residential Land" },
    { value: "agricultural-land", label: "Agricultural Land" },
    { value: "commercial-land", label: "Commercial Land" },
    { value: "industrial-land", label: "Industrial Land" },
    { value: "waterfront-land", label: "Waterfront Land" },
    { value: "forest-timberland", label: "Forest / Timberland" },
    { value: "desert-ranch", label: "Desert / Ranch Land" },
    { value: "mixed-use-development", label: "Mixed-Use Development Site" },
    { value: "subdivided-lots", label: "Subdivided Lots" },
    { value: "urban-infill", label: "Urban Infill Lot" },
    { value: "brownfield-site", label: "Brownfield Site (previous industrial use)" },
    { value: "greenfield-site", label: "Greenfield Site (never developed)" },
  ];

  const specialPurposeTypes = [
    { value: "religious-building", label: "Religious Building (Church, Temple, Mosque)" },
    { value: "school-university", label: "School / University Property" },
    { value: "hospital-clinic", label: "Hospital / Clinic" },
    { value: "nursing-home", label: "Nursing Home / Care Facility" },
    { value: "sports-complex", label: "Sports Complex / Gym Facility" },
    { value: "marina-boatyard", label: "Marina / Boatyard" },
    { value: "parking-lot", label: "Parking Lot / Parking Garage" },
    { value: "government-building", label: "Government Building" },
    { value: "gas-station", label: "Gas Station / Auto Shop" },
    { value: "theater", label: "Theater / Entertainment Venue" },
  ];

  const luxuryInternationalTypes = [
    { value: "chateau-castle", label: "Château / Castle" },
    { value: "estate-manor", label: "Estate / Manor House" },
    { value: "private-island", label: "Private Island" },
    { value: "ski-chalet", label: "Ski Chalet" },
    { value: "eco-lodge", label: "Eco-Lodge or Sustainable Property" },
    { value: "historical-property", label: "Historical Property" },
    { value: "embassy", label: "Embassy / Diplomatic Residence" },
  ];


  const handleFileUpload = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans' | 'sampleItineraries' | 'crewProfile' | 'brochure' | 'vrWalkthrough' | 'virtualTour', files: FileList | null | any[], roomId?: string) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      if (type === 'photos' || type === 'floorPlans') {
        return file.type.startsWith('image/');
      } else if (type === 'documents' || type === 'sampleItineraries' || type === 'crewProfile' || type === 'brochure') {
        return file.type === 'application/pdf' || file.type.includes('document') || file.type === 'text/plain';
      } else {
        return file.type.startsWith('video/');
      }
    });

    // Add roomId to files if provided and applicable
    const filesWithRoomId = validFiles.map(file => {
      if ((type === 'photos' || type === 'videos' || type === 'droneFootage' || type === 'vrWalkthrough') && roomId) {
        return Object.assign(file, { roomId });
      }
      return file;
    });

    setUploadedFiles(prev => ({
      ...prev,
      [type]: [...prev[type], ...filesWithRoomId],
    }));

    toast({
      title: "Files Added",
      description: `${validFiles.length} ${type} added successfully${roomId ? ` to room` : ''}`,
    });
  };

  const removeFile = (type: 'photos' | 'videos' | 'droneFootage' | 'documents' | 'floorPlans' | 'sampleItineraries' | 'crewProfile' | 'brochure' | 'vrWalkthrough' | 'virtualTour', index: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (data: UploadFormValues) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Combine form data with uploaded files
    const completeSubmissionData = {
      ...data,
      uploadedFiles,
      category,
      totalFiles: totalFiles,
    };

    // Log all collected data from all tabs
    console.log("Complete submission data from all tabs:", completeSubmissionData);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      // Here you would send the completeSubmissionData to your API
      // await yourApiService.createSpace(completeSubmissionData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setUploadProgress(100);
      
      toast({
        title: "Space Uploaded Successfully!",
        description: "Your virtual space has been created and is now processing. All data from all tabs has been saved.",
      });
      
      // Reset form and close dialog
      form.reset();
      setUploadedFiles({ photos: [], videos: [], droneFootage: [], documents: [], floorPlans: [], sampleItineraries: [], crewProfile: [], brochure: [], vrWalkthrough: [], virtualTour: [] });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your space. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const totalFiles = uploadedFiles.photos.length + uploadedFiles.videos.length + uploadedFiles.droneFootage.length + uploadedFiles.documents.length + uploadedFiles.floorPlans.length + uploadedFiles.sampleItineraries.length + uploadedFiles.crewProfile.length + uploadedFiles.brochure.length;
  const isRentalProperty = category === "real-estate" && form.watch("listingType") === "for-rent";

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Virtual Space
          </DialogTitle>
          <DialogDescription>
            Create a new virtual space by uploading photos, videos, and providing property details.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className={`grid w-full ${(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? "grid-cols-8" : (category === "real-estate") ? "grid-cols-7" : (category === "yacht" || category === "car") ? "grid-cols-8" : "grid-cols-7"}`}>
                  <TabsTrigger value="basic">{(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? "Hotel Basic Info" : "Basic Info"}</TabsTrigger>
                   {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? (
                     <TabsTrigger value="hotel-details">Rooms</TabsTrigger>
                   ) : category === "yacht" ? (
                     <TabsTrigger value="details">Yacht Details</TabsTrigger>
                   ) : category === "car" ? (
                     <TabsTrigger value="details">Vehicle Details</TabsTrigger>
                   ) : (
                     <TabsTrigger value="details">Property Details</TabsTrigger>
                   )}
                   <TabsTrigger value="location">Location Details</TabsTrigger>
                   {category === "real-estate" && (
                     <TabsTrigger value="agent">Agent Info</TabsTrigger>
                   )}
                   {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                     <>
                       <TabsTrigger value="hotel-amenities">Hotel Amenities</TabsTrigger>
                       <TabsTrigger value="special-deals">Special Deals</TabsTrigger>
                     </>
                   )}
                  {!(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && category !== "real-estate" && category !== "car" && (
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                   )}
                   {category === "yacht" && (
                     <TabsTrigger value="compliance">Compliance</TabsTrigger>
                   )}
                   {category === "car" && (
                     <TabsTrigger value="specifications">Specifications</TabsTrigger>
                   )}
                   <TabsTrigger value="rules">Rules & Access</TabsTrigger>
                  <TabsTrigger value="media">Media Upload</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                 <TabsContent value="basic" className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                       {category !== "car" && (
                         <FormField
                           control={form.control}
                           name="title"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>{category === "yacht" ? "Yacht Name" : "Property Title"}</FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., Modern Downtown Apartment" {...field} />
                               </FormControl>
                               <FormMessage />
                             </FormItem>
                            )}
                          />
                       )}
                       
                       {/* Real Estate Listing Type Field */}
                       {category === "real-estate" && (
                         <FormField
                           control={form.control}
                           name="listingType"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>For Sale or For Rent</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select listing type" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="for-sale">For Sale</SelectItem>
                                   <SelectItem value="for-rent">For Rent</SelectItem>
                                   <SelectItem value="both">Both</SelectItem>
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                          />
                        )}
                        {/* Car Condition Field - only show for cars */}
                        {category === "car" && (
                          <FormField
                            control={form.control}
                            name="carCondition"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Condition</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select condition" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="new">New</SelectItem>
                                    <SelectItem value="used">Used</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        {/* Real Estate Sale Price Field - only show for "for-sale" or "both" */}
                        {category === "real-estate" && (form.watch("listingType") === "for-sale" || form.watch("listingType") === "both") && (
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={form.control}
                              name="salePricePrefix"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="from">From</SelectItem>
                                      <SelectItem value="guide">Guide Price</SelectItem>
                                      <SelectItem value="poa">POA</SelectItem>
                                      <SelectItem value="exact">Exact Price</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="col-span-2">
                              <FormField
                                control={form.control}
                                name="salePrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Sale Price</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="e.g., 750000" 
                                        {...field} 
                                        disabled={form.watch("salePricePrefix") === "poa"}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Property sale price (optional)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        )}

                        {/* Real Estate Rental Price Field - only show for "for-rent" or "both" */}
                        {category === "real-estate" && (form.watch("listingType") === "for-rent" || form.watch("listingType") === "both") && (
                          <div className="grid grid-cols-3 gap-2">
                            <FormField
                              control={form.control}
                              name="rentalPricePrefix"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Price Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="from">From</SelectItem>
                                      <SelectItem value="guide">Guide Price</SelectItem>
                                      <SelectItem value="poa">POA</SelectItem>
                                      <SelectItem value="exact">Exact Price</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="col-span-2">
                              <FormField
                                control={form.control}
                                name="rentalPrice"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Rental Price (Monthly)</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="e.g., 2500" 
                                        {...field} 
                                        disabled={form.watch("rentalPricePrefix") === "poa"}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      Monthly rental price (optional)
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                         )}

                      {category === "yacht" && (
                        <>

                          <FormField
                            control={form.control}
                            name="mmsiNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  MMSI Number (9 digits)
                                  <Radio className="h-4 w-4 text-blue-500" />
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input 
                                      placeholder="e.g., 123456789" 
                                      {...field}
                                      disabled={isFetchingAIS}
                                    />
                                    {isFetchingAIS && (
                                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                      </div>
                                    )}
                                  </div>
                                </FormControl>
                              <FormDescription>
                                Optional: 9-digit Maritime Mobile Service Identity number
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        </>
                      )}

                      {category === "yacht" && (
                         <FormField
                           control={form.control}
                           name="imoNumber"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="flex items-center gap-2">
                                 IMO Number (7 digits)
                                 <MapPin className="h-4 w-4 text-blue-500" />
                               </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 1234567" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: 7-digit International Maritime Organization number
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {category === "yacht" && (
                        <FormField
                          control={form.control}
                          name="officialNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>O/N (Official Number)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 123456" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Official Number assigned by the port of registry
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {category === "yacht" && (
                        <FormField
                          control={form.control}
                          name="portOfRegistry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port of Registry</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select registry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>🇬🇧 British-Related Registries</SelectLabel>
                                    <SelectItem value="uk">United Kingdom (UK)</SelectItem>
                                    <SelectItem value="isle-of-man">Isle of Man</SelectItem>
                                    <SelectItem value="cayman-islands">Cayman Islands</SelectItem>
                                    <SelectItem value="bermuda">Bermuda</SelectItem>
                                    <SelectItem value="gibraltar">Gibraltar</SelectItem>
                                    <SelectItem value="bvi">British Virgin Islands (BVI)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇺🇸 United States Registries</SelectLabel>
                                    <SelectItem value="usa">USA (US Coast Guard)</SelectItem>
                                    <SelectItem value="delaware">Delaware (State-level flag, often used by small yachts)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇫🇷 France</SelectLabel>
                                    <SelectItem value="france">France (including RIF – French International Register)</SelectItem>
                                    <SelectItem value="wallis-futuna">Wallis and Futuna</SelectItem>
                                    <SelectItem value="french-polynesia">French Polynesia</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇮🇹 Italy</SelectLabel>
                                    <SelectItem value="italy">Italy (Registro Internazionale for commercial yachts)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇲🇹 Malta</SelectLabel>
                                    <SelectItem value="malta">Malta (Very popular for both commercial and private use)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇳🇱 Netherlands</SelectLabel>
                                    <SelectItem value="netherlands">Netherlands (Zeebrief for commercial use)</SelectItem>
                                    <SelectItem value="caribbean-netherlands">Bonaire, Sint Eustatius, and Saba (Caribbean Netherlands)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇱🇺 Luxembourg</SelectLabel>
                                    <SelectItem value="luxembourg">Luxembourg (occasionally used for pleasure crafts)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇵🇦 Panama</SelectLabel>
                                    <SelectItem value="panama">Panama (large fleet but less reputable for superyachts)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇲🇭 Marshall Islands</SelectLabel>
                                    <SelectItem value="marshall-islands">Marshall Islands (Yacht Engaged in Trade program available)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇧🇸 Bahamas</SelectLabel>
                                    <SelectItem value="bahamas">Bahamas (Popular for charter yachts in the Caribbean/US)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇻🇺 Vanuatu</SelectLabel>
                                    <SelectItem value="vanuatu">Vanuatu (Flexible commercial registration)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇸🇻 St. Vincent and the Grenadines</SelectLabel>
                                    <SelectItem value="st-vincent">St. Vincent (Used for some smaller commercial vessels)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇸🇬 Singapore</SelectLabel>
                                    <SelectItem value="singapore">Singapore (Popular in Southeast Asia for commercial yachts)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇭🇰 Hong Kong</SelectLabel>
                                    <SelectItem value="hong-kong">Hong Kong (Used for yachts based in Asia)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇳🇴 Norway</SelectLabel>
                                    <SelectItem value="norway">Norwegian International Ship Register (NIS)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇹🇷 Turkey</SelectLabel>
                                    <SelectItem value="turkey">Turkey (for yachts based in the Eastern Med)</SelectItem>
                                  </SelectGroup>
                                  
                                  <SelectSeparator />
                                  <SelectGroup>
                                    <SelectLabel>🇨🇾 Cyprus</SelectLabel>
                                    <SelectItem value="cyprus">Cyprus (Part of EU and attractive for tax structuring)</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                       />
                     )}
                     
                     {/* Hotel Chain Field - only show for hotels */}
                     {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                       <FormField
                         control={form.control}
                         name="hotelChain"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Hotel Chain (Optional)</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select hotel chain" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent className="max-h-80">
                                 <SelectItem value="independent">Independent Hotel</SelectItem>
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
                     )}
                      
                      {category === "yacht" && (
                       <FormField
                         control={form.control}
                         name="yachtSaleOrCharter"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Sale or Charter</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select sale or charter" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                 <SelectItem value="sale">For Sale</SelectItem>
                                 <SelectItem value="charter">For Charter</SelectItem>
                                 <SelectItem value="both">Both</SelectItem>
                               </SelectContent>
                             </Select>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}

                     {category === "yacht" && (
                       <FormField
                         control={form.control}
                         name="askingPrice"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Asking Price</FormLabel>
                             <FormControl>
                               <Input 
                                 placeholder="e.g., €2,500,000" 
                                 {...field} 
                               />
                             </FormControl>
                             <FormDescription>
                               Price for sale (include currency)
                             </FormDescription>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}

                      {category === "yacht" && (
                        <FormField
                          control={form.control}
                          name="charterRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Charter Rate</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., €50,000/week" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Charter rate per period (include currency and time period)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {category === "yacht" && (
                        <div className="flex items-center space-x-6">
                          <FormField
                            control={form.control}
                            name="charterWeekly"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Weekly</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="charterDaily"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Daily</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="charterSeasonal"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Seasonal</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                     
                     
                     
                     {/* Hotel Star Rating Field - only show for hotels */}
                     {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
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
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select star rating" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                 <SelectItem value="1">⭐ 1 Star</SelectItem>
                                 <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
                                 <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
                                 <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
                                 <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
                                 <SelectItem value="boutique">🎨 Boutique (No Rating)</SelectItem>
                                 <SelectItem value="luxury">👑 Luxury (No Rating)</SelectItem>
                               </SelectContent>
                             </Select>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}
                    
                    {category === "yacht" && form.watch("propertyType") === "motor-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Motor Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select motor yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {motorYachtSubtypes.map((type) => (
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
                    )}

                    {category === "yacht" && form.watch("propertyType") === "sailing-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sailing Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select sailing yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {sailingYachtSubtypes.map((type) => (
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
                    )}

                    {category === "yacht" && form.watch("propertyType") === "hybrid-electric-yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtSubtype"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hybrid & Electric Yacht Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select hybrid/electric yacht type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hybridElectricYachtSubtypes.map((type) => (
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
                    )}
                    
                    {category === "yacht" && (
                      <FormField
                        control={form.control}
                        name="yachtUsePurpose"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Use/Purpose</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select use/purpose" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                 <SelectItem value="private">Private</SelectItem>
                                 <SelectItem value="charter">Charter</SelectItem>
                                 <SelectItem value="sport-leisure">Sport & Leisure Yachts</SelectItem>
                               </SelectContent>
                             </Select>
                            <FormMessage />
                           </FormItem>
                         )}
                       />
                     )}
                     
                     {category === "yacht" && form.watch("yachtUsePurpose") === "charter" && (
                       <FormField
                         control={form.control}
                         name="yachtUsePurposeSubtype"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Charter Yacht Type</FormLabel>
                             <Select onValueChange={field.onChange} defaultValue={field.value}>
                               <FormControl>
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select charter yacht type" />
                                 </SelectTrigger>
                               </FormControl>
                               <SelectContent>
                                 {charterYachtSubtypes.map((type) => (
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
                     )}
                     
                      {category === "yacht" && form.watch("yachtUsePurpose") === "private" && (
                        <FormField
                          control={form.control}
                          name="yachtUsePurposeSubtype"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Private Yacht Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select private yacht type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {privateYachtSubtypes.map((type) => (
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
                      )}
                      
                      {category === "yacht" && form.watch("yachtUsePurpose") === "sport-leisure" && (
                        <FormField
                          control={form.control}
                          name="yachtUsePurposeSubtype"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sport & Leisure Yacht Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select sport & leisure yacht type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {sportLeisureYachtSubtypes.map((type) => (
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
                      )}
                      
                      {category === "yacht" && (
                        <FormField
                          control={form.control}
                          name="yachtHullConfiguration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hull Configuration</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select hull configuration" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {yachtHullConfigurations.map((config) => (
                                    <SelectItem key={config.value} value={config.value}>
                                      {config.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       )}
                       
                       {category === "yacht" && (
                         <FormField
                           control={form.control}
                           name="yachtSizeClass"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Size Class</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select size class" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   {yachtSizeClasses.map((sizeClass) => (
                                     <SelectItem key={sizeClass.value} value={sizeClass.value}>
                                       {sizeClass.label}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       )}
                       
                       {category === "yacht" && (
                         <FormField
                           control={form.control}
                           name="yachtStyleLayout"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Style and Layout</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select style and layout" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   {yachtStyleLayouts.map((style) => (
                                     <SelectItem key={style.value} value={style.value}>
                                       {style.label}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       )}
                       
                       {category === "yacht" && (
                         <FormField
                           control={form.control}
                           name="yachtMaterialsBuildType"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Materials / Build Types</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select materials/build type" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   {yachtMaterialsBuildTypes.map((material) => (
                                     <SelectItem key={material.value} value={material.value}>
                                       {material.label}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       )}
                       
                        {category === "yacht" && (
                          <FormField
                            control={form.control}
                            name="yachtSpecialPurpose"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Purpose & Niche Yachts</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select special purpose" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {yachtSpecialPurposes.map((purpose) => (
                                     <SelectItem key={purpose.value} value={purpose.value}>
                                       {purpose.label}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                         )}


                    </div>



                </TabsContent>

                {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") ? (
                  <>
                    <TabsContent value="hotel-details" className="space-y-4">
                      <HotelUploadForm form={form} />
                    </TabsContent>
                    
                    <TabsContent value="hotel-amenities" className="space-y-4">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <Wifi className="h-5 w-5" />
                          Hotel Amenities
                        </h3>
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
                                              className="border-2 border-border"
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
                    </TabsContent>

                    <TabsContent value="special-deals" className="space-y-6">
                      <div className="space-y-6">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <Gift className="h-5 w-5" />
                          Special Deals & Offers
                        </h3>

                        {/* Deal Title */}
                        <FormField
                          control={form.control}
                          name="dealTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deal Title <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Stay 3 Nights, Pay for 2" {...field} />
                              </FormControl>
                              <FormDescription>
                                Clear, concise name for the offer
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Deal Type */}
                        <FormField
                          control={form.control}
                          name="dealType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deal Type <span className="text-destructive">*</span></FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select deal type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="percentage-discount">% Discount</SelectItem>
                                  <SelectItem value="fixed-discount">Fixed Amount Discount</SelectItem>
                                  <SelectItem value="free-nights">Free Night(s)</SelectItem>
                                  <SelectItem value="free-upgrade">Free Upgrade</SelectItem>
                                  <SelectItem value="free-breakfast">Free Breakfast / Half Board</SelectItem>
                                  <SelectItem value="seasonal-special">Seasonal Special</SelectItem>
                                  <SelectItem value="last-minute">Last-Minute Deal</SelectItem>
                                  <SelectItem value="early-bird">Early Bird Offer</SelectItem>
                                  <SelectItem value="package-deal">Package Deal</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Deal Description */}
                        <FormField
                          control={form.control}
                          name="dealDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Detailed explanation of the offer, what it includes, any upsells..."
                                  rows={4}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Include all details about what the offer includes and any special conditions
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Deal Code */}
                        <FormField
                          control={form.control}
                          name="dealCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deal Code or Coupon (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., SAVE20, WELCOME10" {...field} />
                              </FormControl>
                              <FormDescription>
                                Code users must enter at booking (if applicable)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Minimum Stay Requirement */}
                          <FormField
                            control={form.control}
                            name="dealMinStay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Minimum Stay Requirement</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 2 nights" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Guest Restrictions */}
                          <FormField
                            control={form.control}
                            name="dealGuestRestrictions"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Guest Restrictions</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select restriction" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="none">No Restrictions</SelectItem>
                                    <SelectItem value="adults-only">Adults Only</SelectItem>
                                    <SelectItem value="families-only">Families Only</SelectItem>
                                    <SelectItem value="couples-only">Couples Only</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Applicable Room Types */}
                        <FormField
                          control={form.control}
                          name="dealApplicableRooms"
                          render={() => (
                            <FormItem>
                              <FormLabel>Applicable Room Types</FormLabel>
                              <FormDescription>Select which room types this deal applies to</FormDescription>
                              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {form.watch("roomProfiles")?.map((room: any) => (
                                  <FormField
                                    key={room.id}
                                    control={form.control}
                                    name="dealApplicableRooms"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={room.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(room.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, room.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value: string) => value !== room.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            {room.roomType} - {room.bedConfiguration}
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

                        {/* Booking Window */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Booking Window</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="dealBookingStart"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Booking Start Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className="w-full pl-3 text-left font-normal"
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
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
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dealBookingEnd"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Booking End Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className="w-full pl-3 text-left font-normal"
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
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
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Stay Window */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Stay Window</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="dealStayStart"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Stay Start Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className="w-full pl-3 text-left font-normal"
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
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
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dealStayEnd"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Stay End Date</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className="w-full pl-3 text-left font-normal"
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
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
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Days of Week */}
                        <FormField
                          control={form.control}
                          name="dealDaysOfWeek"
                          render={() => (
                            <FormItem>
                              <FormLabel>Valid Days of Week</FormLabel>
                              <FormDescription>Select which days of the week this deal is valid</FormDescription>
                              <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
                                {[
                                  { id: "monday", label: "Mon" },
                                  { id: "tuesday", label: "Tue" },
                                  { id: "wednesday", label: "Wed" },
                                  { id: "thursday", label: "Thu" },
                                  { id: "friday", label: "Fri" },
                                  { id: "saturday", label: "Sat" },
                                  { id: "sunday", label: "Sun" }
                                ].map((day) => (
                                  <FormField
                                    key={day.id}
                                    control={form.control}
                                    name="dealDaysOfWeek"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={day.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(day.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, day.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value: string) => value !== day.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="text-sm font-normal cursor-pointer">
                                            {day.label}
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

                        {/* Blackout Dates */}
                        <FormField
                          control={form.control}
                          name="dealBlackoutDates"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blackout Dates</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="List specific dates when this deal is not valid (e.g., holidays, local events)"
                                  rows={2}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Price Adjustment Method */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="dealPriceMethod"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price Adjustment Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select method" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="percentage-off">% off base price</SelectItem>
                                    <SelectItem value="fixed-discount">Fixed € discount</SelectItem>
                                    <SelectItem value="override-rate">Override room rate</SelectItem>
                                    <SelectItem value="add-on-value">Add-on value</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dealDiscountValue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Discount Value</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 15 (for 15% off) or 100 (for €100 off)" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Terms & Conditions */}
                        <FormField
                          control={form.control}
                          name="dealTermsConditions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Terms & Conditions <span className="text-destructive">*</span></FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Cancellation rules, prepayment requirements, no-show policies, etc."
                                  rows={4}
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Activation and Features */}
                        <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
                          <h4 className="font-medium">Deal Settings</h4>
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name="dealActive"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Activate Deal</FormLabel>
                                    <FormDescription>
                                      Enable this deal for bookings
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dealFeatured"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Featured Deal</FormLabel>
                                    <FormDescription>
                                      Highlight this deal for exposure
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="dealUrgencyTag"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Urgency Tag</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select tag" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="none">No Tag</SelectItem>
                                      <SelectItem value="limited-time">Limited Time</SelectItem>
                                      <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                                      <SelectItem value="last-chance">Last Chance</SelectItem>
                                      <SelectItem value="flash-sale">Flash Sale</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </>
                ) : (
                  <TabsContent value="details" className="space-y-6">
                    {/* Real Estate Details Section */}
                    {category === "real-estate" && (
                      <RealEstatePropertyForm form={form} />
                    )}

                    {/* Yacht Details Section */}
                    {category === "yacht" && (
                      <>
                        {/* Builder Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            Builder Information
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtBuilder"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Builder</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Azimut, Ferretti" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtModel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Model</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Grande 32M" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtYearBuilt"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year Built</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="e.g., 2018" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtYearRefit"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year Refit (if applicable)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="e.g., 2022" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtClassification"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Classification</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select classification" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="lloyds">Lloyd's Register</SelectItem>
                                        <SelectItem value="rina">RINA</SelectItem>
                                        <SelectItem value="abs">American Bureau of Shipping</SelectItem>
                                        <SelectItem value="dnv">DNV GL</SelectItem>
                                        <SelectItem value="bv">Bureau Veritas</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtVatStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>VAT Status</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select VAT status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="not-paid">Not Paid</SelectItem>
                                        <SelectItem value="exempt">Exempt</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtRegistrationNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Registration Number / IMO Number / MMSI</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Registration details" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCurrency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Currency</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="EUR">EUR (€)</SelectItem>
                                        <SelectItem value="USD">USD ($)</SelectItem>
                                        <SelectItem value="GBP">GBP (£)</SelectItem>
                                        <SelectItem value="CHF">CHF</SelectItem>
                                        <SelectItem value="AUD">AUD</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Dimensions & Performance */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Ruler className="h-5 w-5" />
                            Dimensions & Performance
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtLOA"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Length Overall (LOA)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 32m / 105ft" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtBeam"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Beam</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 7.2m / 23.6ft" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtDraft"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Draft</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2.1m / 6.9ft" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtGrossTonnage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gross Tonnage</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 200 GT" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtDisplacement"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Displacement</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 180 tonnes" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtHullMaterial"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Hull Type / Material</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select hull material" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="aluminum">Aluminum</SelectItem>
                                        <SelectItem value="steel">Steel</SelectItem>
                                        <SelectItem value="grp">GRP (Fiberglass)</SelectItem>
                                        <SelectItem value="carbon-fiber">Carbon Fiber</SelectItem>
                                        <SelectItem value="wood">Wood</SelectItem>
                                        <SelectItem value="composite">Composite</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtSuperstructureMaterial"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Superstructure Material</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Aluminum, GRP" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCruisingSpeed"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cruising Speed</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 14 knots" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtMaxSpeed"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Max Speed</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 16 knots" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtRange"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Range (nm)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 3,800 nm" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtFuelConsumption"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Fuel Consumption (at cruising speed)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 300 l/h" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Machinery & Technical */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Cog className="h-5 w-5" />
                            Machinery & Technical
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtEngineMake"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Engine Make & Model</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2x CAT C32 Acert" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtEngineCount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Number of Engines</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="e.g., 2" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtEnginePower"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Engine Power (kW or HP)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2x 1,400 HP" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtPropulsionType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Propulsion Type</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select propulsion type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="shaft">Shaft Drive</SelectItem>
                                        <SelectItem value="jet">Jet Drive</SelectItem>
                                        <SelectItem value="pod">POD Drive</SelectItem>
                                        <SelectItem value="outboard">Outboard</SelectItem>
                                        <SelectItem value="saildrive">Saildrive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtGenerators"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Generator(s) – Make, Model, Output</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2x Kohler 27kW" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtStabilizers"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Stabilizers (Type, At Anchor/Underway)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Seakeeper gyro, underway & at anchor" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <FormField
                                  control={form.control}
                                  name="yachtBowThruster"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Bow Thruster</FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                {form.watch("yachtBowThruster") && (
                                  <FormField
                                    control={form.control}
                                    name="yachtBowThrusterMakeModel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input placeholder="Make/Model (e.g., Side-Power SP125T)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                              </div>
                              <div className="space-y-3">
                                <FormField
                                  control={form.control}
                                  name="yachtSternThruster"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>Stern Thruster</FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                                {form.watch("yachtSternThruster") && (
                                  <FormField
                                    control={form.control}
                                    name="yachtSternThrusterMakeModel"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input placeholder="Make/Model (e.g., Side-Power SP185T)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                )}
                              </div>
                            </div>
                            <FormField
                              control={form.control}
                              name="yachtFuelCapacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Fuel Capacity</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 8,000L" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtWaterCapacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Water Capacity</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 2,000L" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtWasteWaterCapacity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Waste Water Capacity</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 1,000L" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtNavigationEquipment"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Navigation Equipment</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="List navigation equipment..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCommunicationSystems"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Communication Systems</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="List communication systems..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Accommodation */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Accommodation
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtGuestsNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Number of Guests (Sleeping)</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="e.g., 10" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtGuestCabins"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Guest Cabins (configuration: Double, Twin, Convertible, etc.)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 5 cabins: 1 Master, 2 VIP, 2 Twin" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCrewNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Number of Crew</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="e.g., 6" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCrewCabins"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Crew Cabins</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 3 crew cabins for 6" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtInteriorDesigner"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Interior Designer</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Cristiano Gatto" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtExteriorDesigner"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Exterior Designer</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Filippo Salvetti" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Charter Information */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5" />
                            Charter Information (if applicable)
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtCharterRegions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Charter Region(s)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Mediterranean, Caribbean" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtApaPolicy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>APA (Advanced Provisioning Allowance) Policy</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 30% of charter rate" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtMinBookingDuration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Minimum Booking Duration</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., 7 days" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtSeasonalRates"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>High/Low Season Rates</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Detail seasonal rate variations..." {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCharterLicense"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Charter License (if required)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="License details if required" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Legal & Operational */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Legal & Operational
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtOwnershipStructure"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Ownership Structure</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select ownership type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="corporate">Corporate</SelectItem>
                                        <SelectItem value="private">Private</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCharterLicenseStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Charter License Status</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Status of charter license" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCompliance"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Compliance (MCA, ISM, ISPS)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., MCA compliant, ISM certified" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtInsuranceCoverage"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Insurance Coverage</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Insurance details" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtCrewCertifications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Crew Certifications</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Crew certification details" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtRegistryJurisdiction"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Registry Jurisdiction</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Cayman Islands" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Broker / Contact Info */}
                        <div className="space-y-4 border-t pt-6">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            Broker / Contact Info
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="yachtBrokerageCompany"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Brokerage Company</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Fraser Yachts" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtBrokerName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Broker Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Broker's name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtBrokerContact"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Contact Phone / Email</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Phone / Email contact" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtWebsiteLink"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website Link</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Website URL" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtListingDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Listing Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="yachtListingType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Central Agent / Joint CA / Open Listing</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select listing type" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="central-agent">Central Agent</SelectItem>
                                        <SelectItem value="joint-ca">Joint CA</SelectItem>
                                        <SelectItem value="open-listing">Open Listing</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </>
                    )}
                    

                     {/* Default property details for non-real-estate and non-car */}
                     {category !== "real-estate" && category !== "car" && (
                       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                         <FormField
                           control={form.control}
                           name="bedrooms"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="flex items-center gap-2">
                                 <Bed className="h-4 w-4" />
                                 Bedrooms
                               </FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select bedrooms" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="studio">Studio</SelectItem>
                                   <SelectItem value="1">1 bedroom</SelectItem>
                                   <SelectItem value="2">2 bedrooms</SelectItem>
                                   <SelectItem value="3">3 bedrooms</SelectItem>
                                   <SelectItem value="4">4 bedrooms</SelectItem>
                                   <SelectItem value="5+">5+ bedrooms</SelectItem>
                                 </SelectContent>
                               </Select>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="bathrooms"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="flex items-center gap-2">
                                 <Bath className="h-4 w-4" />
                                 Bathrooms
                               </FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select bathrooms" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="1">1 bathroom</SelectItem>
                                   <SelectItem value="1.5">1.5 bathrooms</SelectItem>
                                   <SelectItem value="2">2 bathrooms</SelectItem>
                                   <SelectItem value="2.5">2.5 bathrooms</SelectItem>
                                   <SelectItem value="3">3 bathrooms</SelectItem>
                                   <SelectItem value="3.5">3.5 bathrooms</SelectItem>
                                   <SelectItem value="4+">4+ bathrooms</SelectItem>
                                 </SelectContent>
                               </Select>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="area"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel className="flex items-center gap-2">
                                 <Ruler className="h-4 w-4" />
                                 Area (sq ft)
                               </FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., 1,200" {...field} />
                               </FormControl>
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
                                 <Input placeholder="e.g., 2020" {...field} />
                               </FormControl>
                             </FormItem>
                           )}
                         />
                        </div>
                      )}

                     {/* Car Details Section */}
                     {category === "car" && (
                       <>
                         <div className="space-y-4">
                           <h3 className="text-lg font-semibold flex items-center gap-2">
                             <Car className="h-5 w-5" />
                             Vehicle Information
                           </h3>
                            <div className="grid grid-cols-2 gap-4">
                               <FormField
                                 control={form.control}
                                 name="propertyType"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Vehicle Type</FormLabel>
                                      <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        setSelectedVehicleType(value);
                                        setSelectedManufacturer("");
                                        setSelectedModel("");
                                        form.setValue("carManufacturer", "");
                                        form.setValue("carModel", "");
                                        form.setValue("carVariant", "");
                                      }} defaultValue={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle type" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                          {CarDataService.getVehicleTypes().map((type) => (
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
                                name="carManufacturer"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Manufacturer</FormLabel>
                                     <Select onValueChange={(value) => {
                                       field.onChange(value);
                                       setSelectedManufacturer(value);
                                       setSelectedModel("");
                                       form.setValue("carModel", "");
                                       form.setValue("carVariant", "");
                                     }} defaultValue={field.value} disabled={!selectedVehicleType}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder={selectedVehicleType ? "Select manufacturer" : "Select vehicle type first"} />
                                         </SelectTrigger>
                                       </FormControl>
                                        <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                          {CarDataService.getManufacturersByVehicleType(selectedVehicleType).map((manufacturer) => (
                                            <SelectItem key={manufacturer.value} value={manufacturer.value}>
                                              {manufacturer.label}
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
                                name="carModel"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <Select onValueChange={(value) => {
                                      field.onChange(value);
                                      setSelectedModel(value);
                                      form.setValue("carVariant", "");
                                    }} defaultValue={field.value} disabled={!selectedManufacturer}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder={selectedManufacturer ? "Select model" : "Select manufacturer first"} />
                                        </SelectTrigger>
                                      </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         {CarDataService.getModelsByManufacturerAndVehicleType(selectedVehicleType, selectedManufacturer).map((model) => (
                                           <SelectItem key={model.value} value={model.value}>
                                             {model.label}
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
                                name="carVariant"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Variant</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedModel}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder={selectedModel ? "Select variant" : "Select model first"} />
                                        </SelectTrigger>
                                      </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         {CarDataService.getVariantsByModelAndVehicleType(selectedVehicleType, selectedManufacturer, selectedModel).map((variant) => (
                                           <SelectItem key={variant.value} value={variant.value}>
                                             {variant.label}
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
                                name="carYear"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Year</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select year" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999] max-h-[200px] overflow-y-auto">
                                        {Array.from({ length: 126 }, (_, i) => {
                                          const year = 2025 - i;
                                          return (
                                            <SelectItem key={year} value={year.toString()}>
                                              {year}
                                            </SelectItem>
                                          );
                                        })}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />


                             <FormField
                               control={form.control}
                               name="carMileage"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Mileage</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., 25,000 miles" {...field} />
                                   </FormControl>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="carFuelType"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Fuel Type</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select fuel type" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="gasoline">Gasoline</SelectItem>
                                       <SelectItem value="diesel">Diesel</SelectItem>
                                       <SelectItem value="electric">Electric</SelectItem>
                                       <SelectItem value="hybrid">Hybrid</SelectItem>
                                       <SelectItem value="plug-in-hybrid">Plug-in Hybrid</SelectItem>
                                       <SelectItem value="hydrogen">Hydrogen</SelectItem>
                                       <SelectItem value="other">Other</SelectItem>
                                     </SelectContent>
                                   </Select>
                                   <FormMessage />
                                 </FormItem>
                               )}
                             />
                            </div>

                            {/* Vehicle Description */}
                            <div className="space-y-4">
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Vehicle Description</FormLabel>
                                    <FormControl>
                                      <Textarea 
                                        placeholder="Describe the vehicle's condition, features, service history, and any unique selling points..."
                                        className="min-h-[100px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                       </>
                     )}

                   </TabsContent>
                 )}

                 {/* Car Specifications Tab */}
                 {category === "car" && (
                   <TabsContent value="specifications" className="space-y-6">
                     <div className="space-y-6">
                       <h3 className="text-lg font-semibold flex items-center gap-2">
                         <Car className="h-5 w-5" />
                         Vehicle Specifications
                       </h3>
                       
                       {/* Performance & Engine */}
                       <div className="space-y-4">
                         <h4 className="text-md font-medium text-muted-foreground">Performance & Engine</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="carEngineSize"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Engine Size</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 2.5L, 3000cc" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carBHP"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>BHP (Brake Horsepower)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 150, 300" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carAcceleration"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>0-60 mph (seconds)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 6.5, 8.2" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carTopSpeed"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Top Speed (mph)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 120, 155" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Transmission & Drive */}
                       <div className="space-y-4">
                         <h4 className="text-md font-medium text-muted-foreground">Transmission & Drive</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="carTransmission"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Transmission</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select transmission" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="manual">Manual</SelectItem>
                                     <SelectItem value="automatic">Automatic</SelectItem>
                                     <SelectItem value="cvt">CVT</SelectItem>
                                     <SelectItem value="dual-clutch">Dual Clutch</SelectItem>
                                     <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carDriveType"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Drive Type</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select drive type" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="fwd">Front-Wheel Drive</SelectItem>
                                     <SelectItem value="rwd">Rear-Wheel Drive</SelectItem>
                                     <SelectItem value="awd">All-Wheel Drive</SelectItem>
                                     <SelectItem value="4wd">4-Wheel Drive</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Body & Design */}
                       <div className="space-y-4">
                         <h4 className="text-md font-medium text-muted-foreground">Body & Design</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="carBodyStyle"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Body Style</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select body style" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="hatchback">Hatchback</SelectItem>
                                     <SelectItem value="saloon">Saloon</SelectItem>
                                     <SelectItem value="estate">Estate</SelectItem>
                                     <SelectItem value="suv">SUV</SelectItem>
                                     <SelectItem value="coupe">Coupe</SelectItem>
                                     <SelectItem value="convertible">Convertible</SelectItem>
                                     <SelectItem value="mpv">MPV</SelectItem>
                                     <SelectItem value="pickup">Pick-up</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carDoors"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Number of Doors</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select doors" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="2">2 Doors</SelectItem>
                                     <SelectItem value="3">3 Doors</SelectItem>
                                     <SelectItem value="4">4 Doors</SelectItem>
                                     <SelectItem value="5">5 Doors</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carSeats"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Number of Seats</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select seats" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="2">2 Seats</SelectItem>
                                     <SelectItem value="4">4 Seats</SelectItem>
                                     <SelectItem value="5">5 Seats</SelectItem>
                                     <SelectItem value="7">7 Seats</SelectItem>
                                     <SelectItem value="8">8+ Seats</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carOwners"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Previous Owners</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select owners" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="0">0 (Brand New)</SelectItem>
                                     <SelectItem value="1">1 Owner</SelectItem>
                                     <SelectItem value="2">2 Owners</SelectItem>
                                     <SelectItem value="3">3 Owners</SelectItem>
                                     <SelectItem value="4+">4+ Owners</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Colors */}
                       <div className="space-y-4">
                         <h4 className="text-md font-medium text-muted-foreground">Colors</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="carExteriorColor"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Exterior Color</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., Black, White, Silver" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carInteriorColor"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Interior Color</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., Black Leather, Beige Cloth" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                       {/* Emissions & Efficiency */}
                       <div className="space-y-4">
                         <h4 className="text-md font-medium text-muted-foreground">Emissions & Efficiency</h4>
                         <div className="grid grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="carCO2Emissions"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>CO2 Emissions (g/km)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 120, 95" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carMpg"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>MPG (Combined)</FormLabel>
                                 <FormControl>
                                   <Input placeholder="e.g., 45.6, 32.1" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                           <FormField
                             control={form.control}
                             name="carEmissionClass"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel>Emission Class</FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select emission class" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                     <SelectItem value="euro6">Euro 6</SelectItem>
                                     <SelectItem value="euro5">Euro 5</SelectItem>
                                     <SelectItem value="euro4">Euro 4</SelectItem>
                                     <SelectItem value="euro3">Euro 3</SelectItem>
                                     <SelectItem value="other">Other</SelectItem>
                                   </SelectContent>
                                 </Select>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                       </div>

                     </div>
                   </TabsContent>
                 )}

                 <TabsContent value="location" className="space-y-4">
                   <div className="space-y-4">
                     <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                       <MapPin className="h-5 w-5" />
                       Location Details
                     </h3>
                     
                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="country"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Country</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., United States" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name="region"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Region / State / Province</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., California" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="city"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>City / Town</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., San Francisco" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name="neighborhood"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Neighborhood / District</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., Mission District" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                     </div>

                     <FormField
                       control={form.control}
                       name="streetAddress"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Street Address</FormLabel>
                           <FormControl>
                             <Input placeholder="e.g., 123 Main Street, Apt 4B" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <div className="grid grid-cols-2 gap-4">
                       <FormField
                         control={form.control}
                         name="postalCode"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Postal / ZIP Code</FormLabel>
                             <FormControl>
                               <Input placeholder="e.g., 94103" {...field} />
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
                               <Input placeholder="e.g., 849VCWC8+R9" {...field} />
                             </FormControl>
                             <FormDescription>
                               Optional: 10-11 character location code from Google Maps
                             </FormDescription>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                      </div>

                      {(() => {
                        const propertyType = form.watch("propertyType");
                        const yachtSizeClass = form.watch("yachtSizeClass");
                        const yachtStyleLayout = form.watch("yachtStyleLayout");
                        const yachtSubtype = form.watch("yachtSubtype");
                        
                        console.log("Debug Marine Traffic Field:", {
                          propertyType,
                          yachtSizeClass,
                          yachtStyleLayout,
                          yachtSubtype,
                          category
                        });
                        
                        return (category === "yacht" && (category === "yacht" || propertyType === "yacht" || propertyType === "boat" || 
                          yachtSizeClass || yachtStyleLayout || yachtSubtype));
                      })() && (
                        <FormField
                          control={form.control}
                          name="marineTrafficUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marinetraffic.com Real Time Location</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., https://www.marinetraffic.com/en/ais/details/ships/shipid:384311/mmsi:319011900/imo:1009326/vessel:AWATEA" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Real-time location tracking URL from MarineTraffic.com
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {(() => {
                        const propertyType = form.watch("propertyType");
                        const yachtSizeClass = form.watch("yachtSizeClass");
                        const yachtStyleLayout = form.watch("yachtStyleLayout");
                        const yachtSubtype = form.watch("yachtSubtype");
                        
                        return (category === "yacht" && (category === "yacht" || propertyType === "yacht" || propertyType === "boat" || 
                          yachtSizeClass || yachtStyleLayout || yachtSubtype));
                      })() && (
                          <FormField
                            control={form.control}
                            name="mmsiNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2">
                                  MMSI Number (9 digits)
                                  <MapPin className="h-4 w-4 text-blue-500" />
                                </FormLabel>
                               <FormControl>
                                 <Input 
                                   placeholder="e.g., 319011900" 
                                   {...field} 
                                 />
                               </FormControl>
                               <FormDescription className="flex items-center gap-1">
                                 <span>9-digit Maritime Mobile Service Identity number.</span>
                                 <span className="text-blue-600 dark:text-blue-400 font-medium">Auto-locates yacht on map when entered.</span>
                               </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <div className="space-y-4">
                        <h4 className="text-md font-medium">Map Integration (Optional)</h4>
                       <div className="grid grid-cols-2 gap-4">
                         <FormField
                           control={form.control}
                           name="latitude"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Latitude</FormLabel>
                               <FormControl>
                                 <Input placeholder="e.g., 37.7749" {...field} />
                               </FormControl>
                               <FormDescription>
                                 Optional: Used for precise map positioning
                               </FormDescription>
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
                                 <Input placeholder="e.g., -122.4194" {...field} />
                               </FormControl>
                               <FormDescription>
                                 Optional: Used for precise map positioning
                               </FormDescription>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       </div>
                       
                         <Card className="p-4">
                           <div className="flex items-center gap-2 mb-2">
                             <MapPin className="h-4 w-4" />
                             <span className="text-sm font-medium">Map Pin Drop / Location Picker</span>
                           </div>
                           <p className="text-sm text-muted-foreground mb-3">
                             {mapCoordinates 
                               ? "Location shown on interactive map below. Click to adjust position."
                               : "Enter coordinates above to see location on map, or click on the map to set location."
                             }
                           </p>
                           
                           <MapboxLocationPicker
                             coordinates={mapCoordinates}
                             onCoordinatesChange={handleMapCoordinatesChange}
                             onZoomChange={handleMapZoomChange}
                             zoom={mapZoom}
                             className="h-64"
                           />
                           
                           {mapCoordinates && (
                             <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                               <div className="flex items-center gap-2 text-sm">
                                 <MapPin className="h-4 w-4 text-primary" />
                                 <span className="font-medium">Location Detected:</span>
                                 <span>{mapCoordinates.lat.toFixed(6)}, {mapCoordinates.lng.toFixed(6)}</span>
                               </div>
                             </div>
                           )}
                          </Card>
                      </div>

                      {category === "real-estate" && (
                        <div className="space-y-4 mt-8">
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
                       )}
                       
                       {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                         <div className="space-y-4 mt-8">
                           <h3 className="text-lg font-semibold flex items-center gap-2">
                             <MapPin className="h-5 w-5" />
                             Nearby Attractions & Landmarks
                           </h3>
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
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                         </div>
                        )}
                     </div>
                   </TabsContent>

                  {category === "real-estate" && (
                    <TabsContent value="agent" className="space-y-4">
                      <RealEstateAgentForm form={form} />
                    </TabsContent>
                  )}

                  {!(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && category !== "real-estate" && category !== "car" && (
                   <TabsContent value="amenities" className="space-y-4">
                   <div className="space-y-6">
                     {category === "yacht" ? (
                       <>
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Home className="h-5 w-5" />
                             Interior Features
                           </h3>
                           <FormField
                             control={form.control}
                             name="amenities"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {yachtInteriorFeatures.map((amenity) => (
                                     <FormField
                                       key={amenity.id}
                                       control={form.control}
                                       name="amenities"
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
                                                           (value) => value !== amenity.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Utensils className="h-5 w-5" />
                             Galley & Dining
                           </h3>
                           <FormField
                             control={form.control}
                             name="facilities"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {yachtGalleyDining.map((facility) => (
                                     <FormField
                                       key={facility.id}
                                       control={form.control}
                                       name="facilities"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={facility.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(facility.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, facility.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== facility.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <facility.icon className="h-4 w-4" />
                                               {facility.label}
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Sun className="h-5 w-5" />
                             Exterior Deck Features
                           </h3>
                           <FormField
                             control={form.control}
                             name="workFeatures"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {yachtExteriorFeatures.map((feature) => (
                                     <FormField
                                       key={feature.id}
                                       control={form.control}
                                       name="workFeatures"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={feature.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(feature.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, feature.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== feature.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <feature.icon className="h-4 w-4" />
                                               {feature.label}
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Dumbbell className="h-5 w-5" />
                             Wellness & Fitness
                           </h3>
                           <FormField
                             control={form.control}
                             name="accessibility"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {yachtWellnessFitness.map((wellness) => (
                                     <FormField
                                       key={wellness.id}
                                       control={form.control}
                                       name="accessibility"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={wellness.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(wellness.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, wellness.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== wellness.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <wellness.icon className="h-4 w-4" />
                                               {wellness.label}
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Monitor className="h-5 w-5" />
                             Entertainment & Tech
                           </h3>
                           <FormField
                             control={form.control}
                             name="healthSafety"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {yachtEntertainmentTech.map((tech) => (
                                     <FormField
                                       key={tech.id}
                                       control={form.control}
                                       name="healthSafety"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={tech.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(tech.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, tech.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== tech.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <tech.icon className="h-4 w-4" />
                                               {tech.label}
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Ship className="h-5 w-5" />
                             Tenders & Toys
                           </h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {yachtTendersToys.map((toy) => (
                               <FormField
                                 key={toy.id}
                                 control={form.control}
                                 name="amenities"
                                 render={({ field }) => {
                                   return (
                                     <FormItem
                                       key={toy.id}
                                       className="flex flex-row items-start space-x-3 space-y-0"
                                     >
                                       <FormControl>
                                         <Checkbox
                                           checked={field.value?.includes(toy.id)}
                                           onCheckedChange={(checked) => {
                                             return checked
                                               ? field.onChange([...field.value, toy.id])
                                               : field.onChange(
                                                   field.value?.filter(
                                                     (value) => value !== toy.id
                                                   )
                                                 )
                                           }}
                                         />
                                       </FormControl>
                                       <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                         <toy.icon className="h-4 w-4" />
                                         {toy.label}
                                       </FormLabel>
                                     </FormItem>
                                   )
                                 }}
                               />
                             ))}
                           </div>
                         </div>

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Plane className="h-5 w-5" />
                             Aviation
                           </h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {yachtAviation.map((aviation) => (
                               <FormField
                                 key={aviation.id}
                                 control={form.control}
                                 name="facilities"
                                 render={({ field }) => {
                                   return (
                                     <FormItem
                                       key={aviation.id}
                                       className="flex flex-row items-start space-x-3 space-y-0"
                                     >
                                       <FormControl>
                                         <Checkbox
                                           checked={field.value?.includes(aviation.id)}
                                           onCheckedChange={(checked) => {
                                             return checked
                                               ? field.onChange([...field.value, aviation.id])
                                               : field.onChange(
                                                   field.value?.filter(
                                                     (value) => value !== aviation.id
                                                   )
                                                 )
                                           }}
                                         />
                                       </FormControl>
                                       <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                         <aviation.icon className="h-4 w-4" />
                                         {aviation.label}
                                       </FormLabel>
                                     </FormItem>
                                   )
                                 }}
                               />
                             ))}
                           </div>
                         </div>

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Wrench className="h-5 w-5" />
                             Technical / Operational Features
                           </h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {yachtTechnical.map((technical) => (
                               <FormField
                                 key={technical.id}
                                 control={form.control}
                                 name="workFeatures"
                                 render={({ field }) => {
                                   return (
                                     <FormItem
                                       key={technical.id}
                                       className="flex flex-row items-start space-x-3 space-y-0"
                                     >
                                       <FormControl>
                                         <Checkbox
                                           checked={field.value?.includes(technical.id)}
                                           onCheckedChange={(checked) => {
                                             return checked
                                               ? field.onChange([...field.value, technical.id])
                                               : field.onChange(
                                                   field.value?.filter(
                                                     (value) => value !== technical.id
                                                   )
                                                 )
                                           }}
                                         />
                                       </FormControl>
                                       <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                         <technical.icon className="h-4 w-4" />
                                         {technical.label}
                                       </FormLabel>
                                     </FormItem>
                                   )
                                 }}
                               />
                             ))}
                           </div>
                         </div>

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <User className="h-5 w-5" />
                             Crew & Guest Services
                           </h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {yachtCrewServices.map((service) => (
                               <FormField
                                 key={service.id}
                                 control={form.control}
                                 name="accessibility"
                                 render={({ field }) => {
                                   return (
                                     <FormItem
                                       key={service.id}
                                       className="flex flex-row items-start space-x-3 space-y-0"
                                     >
                                       <FormControl>
                                         <Checkbox
                                           checked={field.value?.includes(service.id)}
                                           onCheckedChange={(checked) => {
                                             return checked
                                               ? field.onChange([...field.value, service.id])
                                               : field.onChange(
                                                   field.value?.filter(
                                                     (value) => value !== service.id
                                                   )
                                                 )
                                           }}
                                         />
                                       </FormControl>
                                       <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                         <service.icon className="h-4 w-4" />
                                         {service.label}
                                       </FormLabel>
                                     </FormItem>
                                   )
                                 }}
                               />
                             ))}
                           </div>
                         </div>

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Shield className="h-5 w-5" />
                             Safety & Compliance
                           </h3>
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                             {yachtSafetyCompliance.map((safety) => (
                               <FormField
                                 key={safety.id}
                                 control={form.control}
                                 name="healthSafety"
                                 render={({ field }) => {
                                   return (
                                     <FormItem
                                       key={safety.id}
                                       className="flex flex-row items-start space-x-3 space-y-0"
                                     >
                                       <FormControl>
                                         <Checkbox
                                           checked={field.value?.includes(safety.id)}
                                           onCheckedChange={(checked) => {
                                             return checked
                                               ? field.onChange([...field.value, safety.id])
                                               : field.onChange(
                                                   field.value?.filter(
                                                     (value) => value !== safety.id
                                                   )
                                                 )
                                           }}
                                         />
                                       </FormControl>
                                       <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                         <safety.icon className="h-4 w-4" />
                                         {safety.label}
                                       </FormLabel>
                                     </FormItem>
                                   )
                                 }}
                               />
                             ))}
                           </div>
                         </div>
                       </>
                     ) : (
                       <>
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Coffee className="h-5 w-5" />
                             Property Amenities
                           </h3>
                           <FormField
                             control={form.control}
                             name="amenities"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {amenities.map((amenity) => (
                                     <FormField
                                       key={amenity.id}
                                       control={form.control}
                                       name="amenities"
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
                                                           (value) => value !== amenity.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Waves className="h-5 w-5" />
                             Facilities
                           </h3>
                           <FormField
                             control={form.control}
                             name="facilities"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                   {facilities.map((facility) => (
                                     <FormField
                                       key={facility.id}
                                       control={form.control}
                                       name="facilities"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={facility.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(facility.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, facility.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== facility.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <facility.icon className="h-4 w-4" />
                                               {facility.label}
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

                         {isRentalProperty && (
                           <div>
                             <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                               <Laptop className="h-5 w-5" />
                               Work Features
                             </h3>
                             <FormField
                               control={form.control}
                               name="workFeatures"
                               render={() => (
                                 <FormItem>
                                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                     {workFeatures.map((feature) => (
                                       <FormField
                                         key={feature.id}
                                         control={form.control}
                                         name="workFeatures"
                                         render={({ field }) => {
                                           return (
                                             <FormItem
                                               key={feature.id}
                                               className="flex flex-row items-start space-x-3 space-y-0"
                                             >
                                               <FormControl>
                                                 <Checkbox
                                                   checked={field.value?.includes(feature.id)}
                                                   onCheckedChange={(checked) => {
                                                     return checked
                                                       ? field.onChange([...field.value, feature.id])
                                                       : field.onChange(
                                                           field.value?.filter(
                                                             (value) => value !== feature.id
                                                           )
                                                         )
                                                   }}
                                                 />
                                               </FormControl>
                                               <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                                 <feature.icon className="h-4 w-4" />
                                                 {feature.label}
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
                          )}

                          {category === "yacht" && (
                            <div className="mt-6">
                              <FormField
                                control={form.control}
                                name="additionalAmenities"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Additional Amenities</FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Describe any additional amenities not listed above..."
                                        className="min-h-[100px]"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormDescription>
                                      List any additional amenities, features, or services that weren't covered in the categories above
                                    </FormDescription>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                   </TabsContent>
                 )}

                 {category === "yacht" && (
                    <TabsContent value="compliance" className="space-y-4">
                     <div className="space-y-6">

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Shield className="h-5 w-5" />
                         Certification & Regulation Compliance
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="mcaCompliant"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>MCA Compliant (LY2/LY3)</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ismCertified"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>ISM Certified</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ispsCertified"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>ISPS Certified</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="solasCompliant"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>SOLAS Compliant</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="marpolCompliant"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>MARPOL Compliant</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="mlcCompliant"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>MLC Compliant</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="rinaClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>RINA Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="lloydsRegisterClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Lloyd's Register Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="dnvClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>DNV Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="absClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>ABS Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="bureauVeritasClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Bureau Veritas Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="germanischerLloydClassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Germanischer Lloyd Classed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="commerciallyCoded"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Commercially Coded</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ceCertified"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>CE Certified</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select CE class" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="class-a">Class A</SelectItem>
                                   <SelectItem value="class-b">Class B</SelectItem>
                                   <SelectItem value="class-c">Class C</SelectItem>
                                   <SelectItem value="class-d">Class D</SelectItem>
                                   <SelectItem value="not-applicable">Not Applicable</SelectItem>
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Globe className="h-5 w-5" />
                         Flag State & Registry
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="flaggedCommercialUse"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Flagged for Commercial Use</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="privateUseOnly"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Private Use Only</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="dualRegistrationAvailable"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Dual Registration Available</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="euVatPaid"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>EU VAT Paid</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select VAT status" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="yes">Yes</SelectItem>
                                   <SelectItem value="no">No</SelectItem>
                                   <SelectItem value="not-applicable">Not Applicable</SelectItem>
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="temporaryImportationAllowed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Temporary Importation Allowed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="uscgDocumented"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>USCG Documented</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Users className="h-5 w-5" />
                         Crew & Operational Compliance
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="stcwCertifiedCrewRequired"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>STCW Certified Crew Required</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="minimumSafeManning"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Minimum Safe Manning Certificate</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="passengerCapacityCompliance"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Passenger Capacity Compliance</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="helideckCertification"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Helideck Certification</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select certification type" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="touch-and-go">Touch-and-go</SelectItem>
                                   <SelectItem value="fully-certified">Fully Certified</SelectItem>
                                   <SelectItem value="not-applicable">Not Applicable</SelectItem>
                                 </SelectContent>
                               </Select>
                               <FormMessage />
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="crewRotationPolicy"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Crew Rotation Policy Documented</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="medicalBayEquipped"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Medical Bay Equipped & Certified</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <TreePine className="h-5 w-5" />
                         Environmental & Emissions Compliance
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="tierIiiEngineCompliance"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Tier III Engine Compliance</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="exhaustGasScrubbersInstalled"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Exhaust Gas Scrubbers Installed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ballastWaterTreatmentSystem"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Ballast Water Treatment System</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="greyWaterTreatmentSystem"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Grey Water Treatment System</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="garbageManagementPlan"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Garbage Management Plan</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="sewageTreatmentPlantCertified"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Sewage Treatment Plant Certified</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ecoLabelCertified"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Eco-Label Certified</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Lock className="h-5 w-5" />
                         Security & Risk Compliance
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="securityPlanOnboard"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Security Plan Onboard</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="cctvSurveillanceSystem"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>CCTV Surveillance System</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="cybersecurityProtocols"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Cybersecurity Protocols</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="shipSecurityOfficerAssigned"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Ship Security Officer Assigned</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="insuranceComplianceComplete"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Insurance Compliance Complete</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                     <div>
                       <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                         <FileText className="h-5 w-5" />
                         Documentation & Legal Readiness
                       </h3>
                       <div className="grid grid-cols-3 gap-4">
                         <FormField
                           control={form.control}
                           name="upToDateClassCertificate"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Up-to-Date Class Certificate</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="upToDateSurveyReports"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Up-to-Date Survey Reports</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="validInsuranceCertificate"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Valid Insurance Certificate</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="validCharterLicense"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Valid Charter License</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="ownerCompanyGoodStanding"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Owner Company in Good Standing</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="annualFlagStateInspectionPassed"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Annual Flag State Inspection Passed</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="crewCertificatesOnboard"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Crew Certificates Onboard</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                         <FormField
                           control={form.control}
                           name="technicalManualAvailability"
                           render={({ field }) => (
                             <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                               <FormControl>
                                 <Checkbox
                                   checked={field.value}
                                   onCheckedChange={field.onChange}
                                 />
                               </FormControl>
                               <div className="space-y-1 leading-none">
                                 <FormLabel>Technical Manual Availability</FormLabel>
                               </div>
                             </FormItem>
                           )}
                         />
                       </div>
                     </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Safety & Environmental Compliance
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                          <FormField
                            control={form.control}
                            name="yachtCovidRequirements"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>COVID-19 Requirements</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Detail current COVID-19 protocols, testing requirements, vaccination policies" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="yachtEnvironmentalRules"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Environmental Compliance</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Environmental regulations compliance: MARPOL, local marine park rules, waste management protocols" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="yachtSafetyBriefing"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Safety Briefing Requirements</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Required safety briefings for guests, emergency procedures, equipment locations" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                 )}

                  <TabsContent value="rules" className="space-y-4">
                   <div className="space-y-6">
                     {category === "real-estate" && (
                       <>
                         {/* Occupancy Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Users className="h-5 w-5" />
                             Occupancy Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="maximumOccupancy"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Maximum Occupancy Allowed</FormLabel>
                                   <FormControl>
                                     <Input type="number" placeholder="Number of residents" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                             
                             <FormField
                               control={form.control}
                               name="minimumLeaseTerm"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Minimum Lease Term</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select minimum lease term" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="3-months">3 Months</SelectItem>
                                       <SelectItem value="6-months">6 Months</SelectItem>
                                       <SelectItem value="1-year">1 Year</SelectItem>
                                       <SelectItem value="2-years">2 Years</SelectItem>
                                       <SelectItem value="month-to-month">Month to Month</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="shortTermRentalAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Short-Term Rental Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="licensed-only">Licensed Only</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="sublettingAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Subletting Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="with-permission">With Permission</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="corporateLeasingPermitted"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Corporate Leasing Permitted</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="studentTenantsAccepted"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Student Tenants Accepted</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="on-request">On Request</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="domesticStaffPermitted"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Live-in Domestic Staff Permitted</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="limited-rooms">Limited Rooms</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Pet & Animal Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Heart className="h-5 w-5" />
                             Pet & Animal Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="petsAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Pets Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="on-request">On Request</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="petTypeRestrictions"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Pet Type Restrictions</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., no dogs over 25kg" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="petDepositRequired"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Pet Deposit Required</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="amount">Specific Amount</SelectItem>
                                       <SelectItem value="non-refundable">Non-refundable</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="assistanceAnimalsOnly"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Assistance Animals Only</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="certification-required">Certification Required</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Behavioral & Lifestyle Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Shield className="h-5 w-5" />
                             Behavioral & Lifestyle Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="smokingAllowedIndoors"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Smoking Allowed Indoors</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="balcony-only">Balcony Only</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="alcoholRestrictions"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Alcohol Restrictions</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="none">None</SelectItem>
                                       <SelectItem value="restrictions-apply">Restrictions Apply</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="quietHoursEnforced"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Quiet Hours Enforced</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., 10pm–8am" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="partiesEventsAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Parties / Events Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="with-approval">With Approval</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="fireplaceUseAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Fireplace Use Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="seasonal-use">Seasonal Use</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="bbqUseAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>BBQ Use Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                       <SelectItem value="only-gas">Only Gas</SelectItem>
                                       <SelectItem value="not-on-balcony">Not on Balcony</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Access & Property Use Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Building className="h-5 w-5" />
                             Access & Property Use Rules
                           </h3>
                           
                           <div className="space-y-4">
                             <div>
                               <Label className="text-sm font-medium mb-2 block">Access to Shared Areas</Label>
                               <FormField
                                 control={form.control}
                                 name="sharedAreasAccess"
                                 render={() => (
                                   <FormItem>
                                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                       {[
                                         { id: "gym", label: "Gym" },
                                         { id: "pool", label: "Pool" },
                                         { id: "rooftop", label: "Rooftop" },
                                         { id: "garden-courtyard", label: "Garden / Courtyard" },
                                         { id: "laundry-room", label: "Laundry Room" },
                                         { id: "parking-garage", label: "Parking Garage" },
                                         { id: "storage-unit", label: "Storage Unit / Locker" },
                                         { id: "common-rooms", label: "Common Rooms" },
                                       ].map((area) => (
                                         <FormField
                                           key={area.id}
                                           control={form.control}
                                           name="sharedAreasAccess"
                                           render={({ field }) => {
                                             return (
                                               <FormItem
                                                 key={area.id}
                                                 className="flex flex-row items-start space-x-3 space-y-0"
                                               >
                                                 <FormControl>
                                                   <Checkbox
                                                     checked={field.value?.includes(area.id)}
                                                     onCheckedChange={(checked) => {
                                                       return checked
                                                         ? field.onChange([...field.value, area.id])
                                                         : field.onChange(
                                                             field.value?.filter(
                                                               (value) => value !== area.id
                                                             )
                                                           )
                                                     }}
                                                   />
                                                 </FormControl>
                                                 <FormLabel className="text-sm font-normal">
                                                   {area.label}
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

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField
                                 control={form.control}
                                 name="balconyAccess"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Balcony Access</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="private">Private</SelectItem>
                                         <SelectItem value="shared">Shared</SelectItem>
                                         <SelectItem value="none">None</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="elevatorAccess"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Elevator Access</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="yes">Yes</SelectItem>
                                         <SelectItem value="private">Private</SelectItem>
                                         <SelectItem value="shared">Shared</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="roofTerraceAccess"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Access to Roof or Terrace</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="yes">Yes</SelectItem>
                                         <SelectItem value="no">No</SelectItem>
                                         <SelectItem value="by-request-only">By Request Only</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="atticBasementUse"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Attic / Basement Use Included</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="yes">Yes</SelectItem>
                                         <SelectItem value="no">No</SelectItem>
                                         <SelectItem value="partial">Partial</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="garageUseRules"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Garage Use Rules</FormLabel>
                                     <FormControl>
                                       <Input placeholder="e.g., no mechanical work, no subletting" {...field} />
                                     </FormControl>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="smartHomeDeviceRestrictions"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Smart Home Device Restrictions</FormLabel>
                                     <FormControl>
                                       <Input placeholder="e.g., thermostat control only" {...field} />
                                     </FormControl>
                                   </FormItem>
                                 )}
                               />
                             </div>
                           </div>
                         </div>

                         {/* Security & Entry Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Lock className="h-5 w-5" />
                             Security & Entry Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="keyType"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Key Type</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select key type" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="physical">Physical</SelectItem>
                                       <SelectItem value="smart-lock">Smart Lock</SelectItem>
                                       <SelectItem value="fob">FOB</SelectItem>
                                       <SelectItem value="keypad">Keypad</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="intercomSystem"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Intercom System</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="video">Video</SelectItem>
                                       <SelectItem value="audio-only">Audio Only</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="visitorAccessRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Visitor Access Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., must be escorted, sign-in required" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="alarmSystemUse"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Alarm System Use</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="monitored">Monitored</SelectItem>
                                       <SelectItem value="code-to-be-shared">Code to be Shared</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="doormanSecurity"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>24/7 Doorman / Security</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="limited-hours">Limited Hours</SelectItem>
                                       <SelectItem value="none">None</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="gatedEntryRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Gated Entry / Community Access Rules</FormLabel>
                                   <FormControl>
                                     <Textarea placeholder="Describe gated community access rules" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="securityCameraPolicy"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Security Camera Policy</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., CCTV in common areas / unit cameras restricted" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Maintenance & Cleanliness Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Wrench className="h-5 w-5" />
                             Maintenance & Cleanliness Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="tenantLawnGardenResponsibility"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Tenant Responsible for Lawn/Garden</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="shared">Shared</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="wasteDisposalRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Waste Disposal Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., schedule, sorting requirements" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="cleaningFeeOnExit"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Cleaning Fee or Requirements on Exit</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Fee amount or cleaning requirements" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="hoaCleaningPolicy"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>HOA Cleaning Policy</FormLabel>
                                   <FormControl>
                                     <Input placeholder="For condos/townhouses" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="pestControlPolicy"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Pest Control Policy</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="tenant">Tenant Responsibility</SelectItem>
                                       <SelectItem value="landlord">Landlord Responsibility</SelectItem>
                                       <SelectItem value="shared">Shared Responsibility</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Legal & Utility Access Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <FileText className="h-5 w-5" />
                             Legal & Utility Access
                           </h3>
                           
                           <div className="space-y-4">
                             <div>
                               <Label className="text-sm font-medium mb-2 block">Utility Payment Responsibility</Label>
                               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                 <FormField
                                   control={form.control}
                                   name="utility_water"
                                   render={({ field }) => (
                                     <FormItem>
                                       <FormLabel>Water</FormLabel>
                                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                                         <FormControl>
                                           <SelectTrigger>
                                             <SelectValue placeholder="Select responsibility" />
                                           </SelectTrigger>
                                         </FormControl>
                                         <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                           <SelectItem value="tenant">Tenant</SelectItem>
                                           <SelectItem value="landlord">Landlord</SelectItem>
                                           <SelectItem value="shared">Shared</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </FormItem>
                                   )}
                                 />
                                 <FormField
                                   control={form.control}
                                   name="utility_electricity"
                                   render={({ field }) => (
                                     <FormItem>
                                       <FormLabel>Electricity</FormLabel>
                                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                                         <FormControl>
                                           <SelectTrigger>
                                             <SelectValue placeholder="Select responsibility" />
                                           </SelectTrigger>
                                         </FormControl>
                                         <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                           <SelectItem value="tenant">Tenant</SelectItem>
                                           <SelectItem value="landlord">Landlord</SelectItem>
                                           <SelectItem value="shared">Shared</SelectItem>
                                         </SelectContent>
                                       </Select>
                                     </FormItem>
                                   )}
                                 />
                               </div>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <FormField
                                 control={form.control}
                                 name="rentIncludesUtilities"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Rent Includes Utilities</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="yes">Yes</SelectItem>
                                         <SelectItem value="no">No</SelectItem>
                                         <SelectItem value="partial">Partial</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="homeInsuranceRequired"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Home Insurance Required</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                       <FormControl>
                                         <SelectTrigger>
                                           <SelectValue placeholder="Select option" />
                                         </SelectTrigger>
                                       </FormControl>
                                       <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                         <SelectItem value="yes">Yes</SelectItem>
                                         <SelectItem value="optional">Optional</SelectItem>
                                         <SelectItem value="provided-by-owner">Provided by Owner</SelectItem>
                                       </SelectContent>
                                     </Select>
                                   </FormItem>
                                 )}
                               />

                               <FormField
                                 control={form.control}
                                 name="rentalLicenseRegistration"
                                 render={({ field }) => (
                                   <FormItem>
                                     <FormLabel>Rental License or Registration #</FormLabel>
                                     <FormControl>
                                       <Input placeholder="If required by city" {...field} />
                                     </FormControl>
                                   </FormItem>
                                 )}
                               />
                             </div>
                           </div>
                         </div>

                         {/* Delivery & Storage Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Package className="h-5 w-5" />
                             Delivery & Storage Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="packageRoomAccess"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Package Room / Locker Access</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="parcelLockersAccess"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Parcel Lockers (e.g., Amazon Hub)</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="storageCageAccess"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Storage Cage / Locker Access</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Yes / Size / Number" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="bikeStorageRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Bike Storage Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Describe bike storage rules" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Move-In / Move-Out Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Truck className="h-5 w-5" />
                             Move-In / Move-Out Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="moveInTimeRestrictions"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Move-In Time Restrictions</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., weekdays only, elevator booking required" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="elevatorBookingRequired"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Elevator Booking Required for Move</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="no">No</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="moveInFeeDeposit"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Move-In Fee or Deposit</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Fee amount" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="furnitureDeliveryRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Furniture Delivery Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Describe furniture delivery rules" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="noticePeriodRequired"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Notice Period Required (for tenants)</FormLabel>
                                   <FormControl>
                                     <Input placeholder="e.g., 30 days, 60 days" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>

                         {/* Parking Rules Section */}
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Car className="h-5 w-5" />
                             Parking Rules
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                               control={form.control}
                               name="parkingAvailability"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Parking Availability</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="garage">Garage</SelectItem>
                                       <SelectItem value="on-street">On-street</SelectItem>
                                       <SelectItem value="designated-space">Designated Space</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="visitorParkingRules"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Visitor Parking Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Describe visitor parking rules" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="evChargingAllowed"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Electric Vehicle Charging Allowed</FormLabel>
                                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                                     <FormControl>
                                       <SelectTrigger>
                                         <SelectValue placeholder="Select option" />
                                       </SelectTrigger>
                                     </FormControl>
                                     <SelectContent className="bg-popover text-popover-foreground border shadow-xl z-[9999]">
                                       <SelectItem value="yes">Yes</SelectItem>
                                       <SelectItem value="shared">Shared</SelectItem>
                                       <SelectItem value="private">Private</SelectItem>
                                     </SelectContent>
                                   </Select>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="motorbikeScooterStorage"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Motorbike / Scooter Storage Rules</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Describe storage rules" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />

                             <FormField
                               control={form.control}
                               name="boatRvParkingRestrictions"
                               render={({ field }) => (
                                 <FormItem>
                                   <FormLabel>Boat / RV Parking Restrictions</FormLabel>
                                   <FormControl>
                                     <Input placeholder="Describe restrictions" {...field} />
                                   </FormControl>
                                 </FormItem>
                               )}
                             />
                           </div>
                         </div>
                       </>
                     )}

                     {/* Keep existing rental property and yacht sections unchanged */}
                     {isRentalProperty && category !== "real-estate" && (
                       <>
                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <Shield className="h-5 w-5" />
                             House Rules
                           </h3>
                           <FormField
                             control={form.control}
                             name="houseRules"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {houseRules.map((rule) => (
                                     <FormField
                                       key={rule.id}
                                       control={form.control}
                                       name="houseRules"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={rule.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(rule.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, rule.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== rule.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <rule.icon className="h-4 w-4" />
                                               {rule.label}
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

                         <div>
                           <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                             <HeartHandshake className="h-5 w-5" />
                             Health & Safety
                           </h3>
                           <FormField
                             control={form.control}
                             name="healthSafety"
                             render={() => (
                               <FormItem>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   {healthSafety.map((safety) => (
                                     <FormField
                                       key={safety.id}
                                       control={form.control}
                                       name="healthSafety"
                                       render={({ field }) => {
                                         return (
                                           <FormItem
                                             key={safety.id}
                                             className="flex flex-row items-start space-x-3 space-y-0"
                                           >
                                             <FormControl>
                                               <Checkbox
                                                 checked={field.value?.includes(safety.id)}
                                                 onCheckedChange={(checked) => {
                                                   return checked
                                                     ? field.onChange([...field.value, safety.id])
                                                     : field.onChange(
                                                         field.value?.filter(
                                                           (value) => value !== safety.id
                                                         )
                                                       )
                                                 }}
                                               />
                                             </FormControl>
                                             <FormLabel className="flex items-center gap-2 text-sm font-normal">
                                               <safety.icon className="h-4 w-4" />
                                               {safety.label}
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

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField
                             control={form.control}
                             name="hostLanguage"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel className="flex items-center gap-2">
                                   <MessageCircle className="h-4 w-4" />
                                   Host Language
                                 </FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select host language" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="english">English</SelectItem>
                                     <SelectItem value="spanish">Spanish</SelectItem>
                                     <SelectItem value="french">French</SelectItem>
                                     <SelectItem value="german">German</SelectItem>
                                     <SelectItem value="italian">Italian</SelectItem>
                                     <SelectItem value="portuguese">Portuguese</SelectItem>
                                     <SelectItem value="chinese">Chinese</SelectItem>
                                     <SelectItem value="japanese">Japanese</SelectItem>
                                     <SelectItem value="other">Other</SelectItem>
                                   </SelectContent>
                                 </Select>
                               </FormItem>
                             )}
                           />

                           <FormField
                             control={form.control}
                             name="responseTime"
                             render={({ field }) => (
                               <FormItem>
                                 <FormLabel className="flex items-center gap-2">
                                   <Clock className="h-4 w-4" />
                                   Response Time
                                 </FormLabel>
                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                   <FormControl>
                                     <SelectTrigger>
                                       <SelectValue placeholder="Select response time" />
                                     </SelectTrigger>
                                   </FormControl>
                                   <SelectContent>
                                     <SelectItem value="within-hour">Within an hour</SelectItem>
                                     <SelectItem value="within-few-hours">Within a few hours</SelectItem>
                                     <SelectItem value="within-day">Within a day</SelectItem>
                                     <SelectItem value="few-days">A few days or more</SelectItem>
                                   </SelectContent>
                                 </Select>
                               </FormItem>
                             )}
                           />
                         </div>

                         <FormField
                           control={form.control}
                           name="bookingType"
                           render={({ field }) => (
                             <FormItem>
                               <FormLabel>Booking Type</FormLabel>
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                   <SelectTrigger>
                                     <SelectValue placeholder="Select booking type" />
                                   </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                   <SelectItem value="instant-book">Instant Book</SelectItem>
                                   <SelectItem value="request-book">Request to Book</SelectItem>
                                 </SelectContent>
                               </Select>
                             </FormItem>
                           )}
                         />
                       </>
                     )}

                      {/* Yacht Charter Rules Section */}
                      {category === "yacht" && (
                        <YachtRulesForm 
                          onSubmit={(data) => {
                            console.log('Yacht rules data:', data);
                            // Handle the yacht rules data submission here
                          }}
                          onCancel={() => {
                            // Handle cancel if needed
                          }}
                        />
                       )}
                      
                      {/* Hotel Policies Section for Hotel/Resort categories */}
                      {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                        <div className="space-y-4 mt-8">
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Hotel Policies & Restrictions
                          </h3>
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
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                      
                      {/* Hotel Special Features & Policies Section for Hotel/Resort categories */}
                      {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                        <div className="space-y-4 mt-8">
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                            <Star className="h-5 w-5" />
                            Hotel Special Features & Policies
                          </h3>
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
                                  <FormMessage />
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
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Hotel Pricing Information Section for Hotel/Resort categories */}
                      {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                        <div className="space-y-4 mt-8">
                          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
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
                                  <FormMessage />
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
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                 </TabsContent>

                <TabsContent value="media" className="space-y-4">
                  <div className="space-y-6">
                    
                    {/* Virtual Upload Section for Yacht categories */}
                    {category === "yacht" && (
                      <div>
                        <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                          <Monitor className="h-5 w-5" />
                          Virtual Tour & VR Content
                        </Label>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Upload className="h-8 w-8" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Upload Virtual Tour Content</p>
                                <p className="text-xs">360° tours, VR content, or provide URLs to existing virtual tours</p>
                              </div>
                            </div>
                            
                             {/* URL Input Section */}
                             <div className="w-full max-w-md space-y-2">
                               <Label className="text-sm">Virtual Tour URLs</Label>
                               <div className="flex gap-2">
                                 <Input
                                   id="virtual-tour-url-input"
                                   placeholder="https://example.com/virtual-tour or embed link"
                                   className="flex-1"
                                 />
                                 <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={() => {
                                     const input = document.getElementById('virtual-tour-url-input') as HTMLInputElement;
                                     const url = input?.value?.trim();
                                     if (url) {
                                       handleFileUpload('virtualTour', [{
                                         name: `Virtual Tour - ${url}`,
                                         type: 'url',
                                         url: url,
                                         size: 0
                                       } as any]);
                                       input.value = '';
                                     }
                                   }}
                                 >
                                   Add URL
                                 </Button>
                               </div>
                             </div>
                             
                             <div className="text-sm text-muted-foreground">OR</div>
                             
                             <div className="w-full max-w-md">
                               <Label className="text-sm">Upload Multiple Files</Label>
                               <Input
                                 id="virtual-upload"
                                 type="file"
                                 multiple
                                 accept="image/*,video/*,.mp4,.mov,.avi"
                                 className="mt-2"
                                 onChange={(e) => handleFileUpload('virtualTour', e.target.files)}
                               />
                               <p className="text-xs text-muted-foreground mt-1">
                                 Select multiple files at once by holding Ctrl/Cmd while clicking
                               </p>
                             </div>
                          </div>
                          {uploadedFiles.virtualTour && uploadedFiles.virtualTour.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {uploadedFiles.virtualTour.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <div className="flex items-center gap-2">
                                    <Monitor className="h-4 w-4" />
                                    <div className="flex flex-col">
                                      <span className="text-sm truncate">{file.name}</span>
                                      {(file as any).url && (
                                        <span className="text-xs text-muted-foreground truncate">
                                          URL: {(file as any).url}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('virtualTour', index)}
                                    className="text-destructive hover:text-destructive/80"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                       </div>
                     </div>
                    )}
                    
                     {/* VR Walkthrough Section for Hotel/Resort categories */}
                     {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                       <div>
                         <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                           <Headphones className="h-5 w-5" />
                           VR Walkthrough
                         </Label>
                         <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                           <div className="flex flex-col items-center gap-4">
                             <div className="flex items-center gap-2 text-muted-foreground">
                               <Upload className="h-8 w-8" />
                               <div className="text-center">
                                 <p className="text-sm font-medium">Upload VR Content</p>
                                 <p className="text-xs">360° images, VR tours, or immersive content</p>
                               </div>
                             </div>
                             
                             {/* Room Selection for Hotel/Resort */}
                             <div className="w-full max-w-xs space-y-2">
                               <Label className="text-sm">Assign to Room (Optional)</Label>
                               <Select
                                 onValueChange={(roomId) => {
                                   const fileInput = document.getElementById('vr-upload') as HTMLInputElement;
                                   if (fileInput?.files) {
                                     const finalRoomId = roomId === "general" ? undefined : roomId;
                                     handleFileUpload('vrWalkthrough', fileInput.files, finalRoomId);
                                     fileInput.value = '';
                                   }
                                 }}
                               >
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select a room or upload as general" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="general">General VR Content</SelectItem>
                                   {(form.watch("roomProfiles") || []).map((room: any) => (
                                     <SelectItem key={room.id} value={room.id}>
                                       {room.roomType} - {room.bedConfiguration}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                             </div>
                             
                             <Input
                               id="vr-upload"
                               type="file"
                               multiple
                               accept="image/*,video/*,.mp4,.mov,.avi"
                               className="max-w-xs"
                               onChange={(e) => handleFileUpload('vrWalkthrough', e.target.files)}
                             />
                           </div>
                           {uploadedFiles.vrWalkthrough && uploadedFiles.vrWalkthrough.length > 0 && (
                             <div className="mt-4 space-y-2">
                               {uploadedFiles.vrWalkthrough.map((file, index) => {
                                 const roomInfo = (file as any).roomId ? 
                                   (form.watch("roomProfiles") || []).find((room: any) => room.id === (file as any).roomId) : null;
                                 return (
                                   <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                     <div className="flex items-center gap-2">
                                       <Headphones className="h-4 w-4" />
                                       <div className="flex flex-col">
                                         <span className="text-sm truncate">{file.name}</span>
                                         {roomInfo && (
                                           <span className="text-xs text-muted-foreground">
                                             Room: {roomInfo.roomType} - {roomInfo.bedConfiguration}
                                           </span>
                                         )}
                                       </div>
                                     </div>
                                     <button
                                       type="button"
                                       onClick={() => removeFile('vrWalkthrough', index)}
                                       className="text-destructive hover:text-destructive/80"
                                     >
                                       <X className="h-4 w-4" />
                                     </button>
                                   </div>
                                 );
                               })}
                             </div>
                           )}
                        </div>
                      </div>
                    )}
                     <div>
                       <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                         <ImageIcon className="h-5 w-5" />
                         Photos
                       </Label>
                       <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Upload className="h-8 w-8" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Upload Photos</p>
                                <p className="text-xs">Upload files or provide image URLs</p>
                              </div>
                            </div>
                            
                             {/* URL Input Section */}
                             <div className="w-full max-w-md space-y-2">
                               <Label className="text-sm">Photo URLs</Label>
                               <div className="flex gap-2">
                                 <Input
                                   id="photo-url-input"
                                   placeholder="https://example.com/image.jpg"
                                   className="flex-1"
                                 />
                                 <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={() => {
                                     const input = document.getElementById('photo-url-input') as HTMLInputElement;
                                     const url = input?.value?.trim();
                                     if (url) {
                                       handleFileUpload('photos', [{
                                         name: `Photo from URL - ${url.split('/').pop() || 'image'}`,
                                         type: 'url',
                                         url: url,
                                         size: 0
                                       } as any]);
                                       input.value = '';
                                     }
                                   }}
                                 >
                                   Add URL
                                 </Button>
                               </div>
                             </div>
                            
                            <div className="text-sm text-muted-foreground">OR</div>
                            
                            {/* Room Selection for Hotel/Resort */}
                            {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                              <div className="w-full max-w-xs space-y-2">
                                <Label className="text-sm">Assign to Room (Optional)</Label>
                                <Select
                                  onValueChange={(roomId) => {
                                    const fileInput = document.getElementById('photos-upload') as HTMLInputElement;
                                    if (fileInput?.files) {
                                      const finalRoomId = roomId === "general" ? undefined : roomId;
                                      handleFileUpload('photos', fileInput.files, finalRoomId);
                                      fileInput.value = '';
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a room or upload as general" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General Photos</SelectItem>
                                    {(form.watch("roomProfiles") || []).map((room: any) => (
                                      <SelectItem key={room.id} value={room.id}>
                                        {room.roomType} - {room.bedConfiguration}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                             <div className="w-full max-w-md">
                               <Label className="text-sm">Upload Multiple Photos</Label>
                               <Input
                                 id="photos-upload"
                                 type="file"
                                 multiple
                                 accept="image/*"
                                 className="mt-2"
                                 onChange={(e) => handleFileUpload('photos', e.target.files)}
                               />
                               <p className="text-xs text-muted-foreground mt-1">
                                 Select multiple images at once by holding Ctrl/Cmd while clicking
                               </p>
                             </div>
                          </div>
                         {uploadedFiles.photos.length > 0 && (
                           <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                             {uploadedFiles.photos.map((file, index) => {
                               const roomInfo = (file as any).roomId ? 
                                 (form.watch("roomProfiles") || []).find((room: any) => room.id === (file as any).roomId) : null;
                               return (
                                 <div key={index} className="relative group">
                                   <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                     <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                   </div>
                                   <button
                                     type="button"
                                     onClick={() => removeFile('photos', index)}
                                     className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                   >
                                     <X className="h-3 w-3" />
                                   </button>
                                    <div className="mt-1">
                                      <p className="text-xs truncate">{file.name}</p>
                                      {(file as any).url && (
                                        <p className="text-xs text-muted-foreground truncate">
                                          URL: {(file as any).url}
                                        </p>
                                      )}
                                      {roomInfo && (
                                        <p className="text-xs text-muted-foreground truncate">
                                          {roomInfo.roomType} - {roomInfo.bedConfiguration}
                                        </p>
                                      )}
                                    </div>
                                 </div>
                               );
                             })}
                           </div>
                         )}
                      </div>
                    </div>

                     <div>
                       <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Video className="h-5 w-5" />
                         Videos
                       </Label>
                       <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Upload className="h-8 w-8" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Upload Videos</p>
                                <p className="text-xs">Upload files or provide video URLs (YouTube, Vimeo, etc.)</p>
                              </div>
                            </div>
                            
                             {/* URL Input Section */}
                             <div className="w-full max-w-md space-y-2">
                               <Label className="text-sm">Video URLs</Label>
                               <div className="flex gap-2">
                                 <Input
                                   id="video-url-input"
                                   placeholder="https://youtube.com/watch?v=... or direct video URL"
                                   className="flex-1"
                                 />
                                 <Button
                                   type="button"
                                   variant="outline"
                                   size="sm"
                                   onClick={() => {
                                     const input = document.getElementById('video-url-input') as HTMLInputElement;
                                     const url = input?.value?.trim();
                                     if (url) {
                                       handleFileUpload('videos', [{
                                         name: `Video from URL - ${url.includes('youtube') ? 'YouTube' : url.includes('vimeo') ? 'Vimeo' : 'Video'}`,
                                         type: 'url',
                                         url: url,
                                         size: 0
                                       } as any]);
                                       input.value = '';
                                     }
                                   }}
                                 >
                                   Add URL
                                 </Button>
                               </div>
                             </div>
                            
                            <div className="text-sm text-muted-foreground">OR</div>
                            
                            {/* Room Selection for Hotel/Resort */}
                            {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                              <div className="w-full max-w-xs space-y-2">
                                <Label className="text-sm">Assign to Room (Optional)</Label>
                                <Select
                                  onValueChange={(roomId) => {
                                    const fileInput = document.getElementById('videos-upload') as HTMLInputElement;
                                    if (fileInput?.files) {
                                      const finalRoomId = roomId === "general" ? undefined : roomId;
                                      handleFileUpload('videos', fileInput.files, finalRoomId);
                                      fileInput.value = '';
                                    }
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a room or upload as general" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="general">General Videos</SelectItem>
                                    {(form.watch("roomProfiles") || []).map((room: any) => (
                                      <SelectItem key={room.id} value={room.id}>
                                        {room.roomType} - {room.bedConfiguration}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            )}
                            
                             <div className="w-full max-w-md">
                               <Label className="text-sm">Upload Multiple Videos</Label>
                               <Input
                                 id="videos-upload"
                                 type="file"
                                 multiple
                                 accept="video/*"
                                 className="mt-2"
                                 onChange={(e) => handleFileUpload('videos', e.target.files)}
                               />
                               <p className="text-xs text-muted-foreground mt-1">
                                 Select multiple videos at once by holding Ctrl/Cmd while clicking
                               </p>
                             </div>
                          </div>
                         {uploadedFiles.videos.length > 0 && (
                           <div className="mt-4 space-y-2">
                             {uploadedFiles.videos.map((file, index) => {
                               const roomInfo = (file as any).roomId ? 
                                 (form.watch("roomProfiles") || []).find((room: any) => room.id === (file as any).roomId) : null;
                               return (
                                 <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                   <div className="flex items-center gap-2">
                                     <Video className="h-4 w-4" />
                                      <div className="flex flex-col">
                                        <span className="text-sm truncate">{file.name}</span>
                                        {(file as any).url && (
                                          <span className="text-xs text-muted-foreground truncate">
                                            URL: {(file as any).url}
                                          </span>
                                        )}
                                        {roomInfo && (
                                          <span className="text-xs text-muted-foreground">
                                            Room: {roomInfo.roomType} - {roomInfo.bedConfiguration}
                                          </span>
                                        )}
                                      </div>
                                   </div>
                                   <button
                                     type="button"
                                     onClick={() => removeFile('videos', index)}
                                     className="text-destructive hover:text-destructive/80"
                                   >
                                     <X className="h-4 w-4" />
                                   </button>
                                 </div>
                               );
                             })}
                           </div>
                         )}
                      </div>
                    </div>

                     <div>
                       <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                         <Video className="h-5 w-5" />
                         Drone Footage
                       </Label>
                       <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                         <div className="flex flex-col items-center gap-4">
                           <div className="flex items-center gap-2 text-muted-foreground">
                             <Upload className="h-8 w-8" />
                             <div className="text-center">
                               <p className="text-sm font-medium">Upload Drone Footage</p>
                               <p className="text-xs">Drag and drop or click to browse</p>
                             </div>
                           </div>
                           
                           {/* Room Selection for Hotel/Resort */}
                           {(category === "hotel" || category === "hotel/resort" || category === "hotel-resort") && (
                             <div className="w-full max-w-xs space-y-2">
                               <Label className="text-sm">Assign to Room (Optional)</Label>
                               <Select
                                 onValueChange={(roomId) => {
                                   const fileInput = document.getElementById('drone-upload') as HTMLInputElement;
                                   if (fileInput?.files) {
                                     const finalRoomId = roomId === "general" ? undefined : roomId;
                                     handleFileUpload('droneFootage', fileInput.files, finalRoomId);
                                     fileInput.value = '';
                                   }
                                 }}
                               >
                                 <SelectTrigger>
                                   <SelectValue placeholder="Select a room or upload as general" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="general">General Drone Footage</SelectItem>
                                   {(form.watch("roomProfiles") || []).map((room: any) => (
                                     <SelectItem key={room.id} value={room.id}>
                                       {room.roomType} - {room.bedConfiguration}
                                     </SelectItem>
                                   ))}
                                 </SelectContent>
                               </Select>
                             </div>
                           )}
                           
                            {/* URL Input Section */}
                            <div className="w-full max-w-md space-y-2">
                              <Label className="text-sm">Drone Footage URLs</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="drone-url-input"
                                  placeholder="https://example.com/drone-video or YouTube/Vimeo link"
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const input = document.getElementById('drone-url-input') as HTMLInputElement;
                                    const url = input?.value?.trim();
                                    if (url) {
                                      handleFileUpload('droneFootage', [{
                                        name: `Drone Footage - ${url}`,
                                        type: 'url',
                                        url: url,
                                        size: 0
                                      } as any]);
                                      input.value = '';
                                    }
                                  }}
                                >
                                  Add URL
                                </Button>
                              </div>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">OR</div>
                            
                             <div className="w-full max-w-md">
                               <Label className="text-sm">Upload Multiple Drone Videos</Label>
                               <Input
                                 id="drone-upload"
                                 type="file"
                                 multiple
                                 accept="video/*"
                                 className="mt-2"
                                 onChange={(e) => handleFileUpload('droneFootage', e.target.files)}
                               />
                               <p className="text-xs text-muted-foreground mt-1">
                                 Select multiple videos at once by holding Ctrl/Cmd while clicking
                               </p>
                             </div>
                         </div>
                         {uploadedFiles.droneFootage.length > 0 && (
                           <div className="mt-4 space-y-2">
                             {uploadedFiles.droneFootage.map((file, index) => {
                               const roomInfo = (file as any).roomId ? 
                                 (form.watch("roomProfiles") || []).find((room: any) => room.id === (file as any).roomId) : null;
                               return (
                                 <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                   <div className="flex items-center gap-2">
                                     <Video className="h-4 w-4" />
                                      <div className="flex flex-col">
                                        <span className="text-sm truncate">{file.name}</span>
                                        {(file as any).url && (
                                          <span className="text-xs text-muted-foreground truncate">
                                            URL: {(file as any).url}
                                          </span>
                                        )}
                                        {roomInfo && (
                                          <span className="text-xs text-muted-foreground">
                                            Room: {roomInfo.roomType} - {roomInfo.bedConfiguration}
                                          </span>
                                        )}
                                      </div>
                                   </div>
                                   <button
                                     type="button"
                                     onClick={() => removeFile('droneFootage', index)}
                                     className="text-destructive hover:text-destructive/80"
                                   >
                                     <X className="h-4 w-4" />
                                   </button>
                                 </div>
                               );
                             })}
                           </div>
                         )}
                      </div>
                    </div>

                    {category !== "car" && (
                     <div>
                       <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                         <FileText className="h-5 w-5" />
                         Floor Plans
                       </Label>
                       <p className="text-sm text-muted-foreground mb-4">
                         Need Floor Plans? <button type="button" onClick={() => {setContactFormType('floor-plans'); setShowContactForm(true);}} className="hover:underline" style={{ color: '#0000FF' }}>Click Here</button> to contact a Floor Plan creator
                       </p>
                       <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                         <div className="flex flex-col items-center gap-4">
                           <div className="flex items-center gap-2 text-muted-foreground">
                             <Upload className="h-8 w-8" />
                             <div className="text-center">
                               <p className="text-sm font-medium">Upload Floor Plans</p>
                               <p className="text-xs">Drag and drop or click to browse</p>
                             </div>
                           </div>
                           <Input
                             type="file"
                             multiple
                             accept="image/*"
                             className="max-w-xs"
                             onChange={(e) => handleFileUpload('floorPlans', e.target.files)}
                           />
                         </div>
                         {uploadedFiles.floorPlans.length > 0 && (
                           <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                             {uploadedFiles.floorPlans.map((file, index) => (
                               <div key={index} className="relative group">
                                 <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                                   <FileText className="h-8 w-8 text-muted-foreground" />
                                 </div>
                                 <button
                                   type="button"
                                   onClick={() => removeFile('floorPlans', index)}
                                   className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                 >
                                   <X className="h-3 w-3" />
                                 </button>
                                 <p className="text-xs truncate mt-1">{file.name}</p>
                               </div>
                             ))}
                           </div>
                         )}
                       </div>
                     </div>
                    )}

                    {category === "yacht" && (
                      <div>
                        <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Sample Itineraries
                        </Label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Need to create an itinerary? <button type="button" onClick={() => setShowItineraryForm(true)} className="hover:underline" style={{ color: '#0000FF' }}>Click here for AI assistance</button>
                        </p>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Upload className="h-8 w-8" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Upload Sample Itineraries</p>
                                <p className="text-xs">Drag and drop or click to browse</p>
                              </div>
                            </div>
                            <Input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.txt"
                              className="max-w-xs"
                              onChange={(e) => handleFileUpload('sampleItineraries', e.target.files)}
                            />
                          </div>
                          {uploadedFiles.sampleItineraries.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {uploadedFiles.sampleItineraries.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm truncate">{file.name}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('sampleItineraries', index)}
                                    className="text-destructive hover:text-destructive/80"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {category === "yacht" && (
                      <>
                        <div>
                          <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Brochure
                          </Label>
                           <p className="text-sm text-muted-foreground mb-4">
                             Need to create a Brochure in PDF format ? <button type="button" onClick={() => setShowBrochure(true)} className="hover:underline" style={{ color: '#0000FF' }}>Create brochure</button>
                           </p>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                            <div className="flex flex-col items-center gap-4">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Upload className="h-8 w-8" />
                                <div className="text-center">
                                  <p className="text-sm font-medium">Upload Brochure</p>
                                  <p className="text-xs">Drag and drop or click to browse</p>
                                </div>
                              </div>
                              <Input
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.txt"
                                className="max-w-xs"
                                onChange={(e) => handleFileUpload('brochure', e.target.files)}
                              />
                            </div>
                            {uploadedFiles.brochure.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {uploadedFiles.brochure.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      <span className="text-sm truncate">{file.name}</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile('brochure', index)}
                                      className="text-destructive hover:text-destructive/80"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {category === "yacht" && (
                      <div>
                        <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Crew Profile
                        </Label>
                        <p className="text-sm text-muted-foreground mb-4">
                          Need to generate a crew profile ? <button type="button" onClick={() => setShowCrewProfileForm(true)} className="hover:underline" style={{ color: '#0000FF' }}>Create brochure</button>
                        </p>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                          <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Upload className="h-8 w-8" />
                              <div className="text-center">
                                <p className="text-sm font-medium">Upload Crew Profile</p>
                                <p className="text-xs">Drag and drop or click to browse</p>
                              </div>
                            </div>
                            <Input
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx,.txt"
                              className="max-w-xs"
                              onChange={(e) => handleFileUpload('crewProfile', e.target.files)}
                            />
                          </div>
                          {uploadedFiles.crewProfile.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {uploadedFiles.crewProfile.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="text-sm truncate">{file.name}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFile('crewProfile', index)}
                                    className="text-destructive hover:text-destructive/80"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <Label className="text-lg font-medium mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Documents
                      </Label>
                      <p className="text-sm text-muted-foreground mb-4">
                        Miscelaneous e.g, Sample Contracts, Awards, History, Build Specification etc
                      </p>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Upload className="h-8 w-8" />
                            <div className="text-center">
                              <p className="text-sm font-medium">Upload Documents</p>
                              <p className="text-xs">Drag and drop or click to browse</p>
                            </div>
                          </div>
                          <Input
                            type="file"
                            multiple
                            accept=".pdf,.doc,.docx,.txt"
                            className="max-w-xs"
                            onChange={(e) => handleFileUpload('documents', e.target.files)}
                          />
                        </div>
                        {uploadedFiles.documents.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.documents.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm truncate">{file.name}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeFile('documents', index)}
                                  className="text-destructive hover:text-destructive/80"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {totalFiles > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Upload Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-4">
                              <Badge variant="secondary">
                                {uploadedFiles.photos.length} Photos
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.videos.length} Videos
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.droneFootage.length} Drone Footage
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.documents.length} Documents
                              </Badge>
                              <Badge variant="secondary">
                                {uploadedFiles.floorPlans.length} Floor Plans
                              </Badge>
                              {category === "yacht" && (
                                <Badge variant="secondary">
                                  {uploadedFiles.sampleItineraries.length} Sample Itineraries
                                </Badge>
                              )}
                              {category === "yacht" && (
                                <Badge variant="secondary">
                                  {uploadedFiles.crewProfile.length} Crew Profile
                                </Badge>
                              )}
                              {category === "yacht" && (
                                <Badge variant="secondary">
                                  {uploadedFiles.brochure.length} Brochure
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Total: {totalFiles} files
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Availability</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="available">Available Now</SelectItem>
                              <SelectItem value="coming-soon">Coming Soon</SelectItem>
                              <SelectItem value="under-construction">Under Construction</SelectItem>
                              <SelectItem value="maintenance">Under Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visibility</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="unlisted">Unlisted</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                     />
                     {form.watch("visibility") === "private" && (
                       <>
                       <FormField
                         control={form.control}
                         name="pinCode"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Create Pin Code</FormLabel>
                             <FormControl>
                               <Input 
                                 type="password" 
                                 placeholder="Enter 4-6 digit pin code" 
                                 maxLength={6}
                                 pattern="[0-9]*"
                                 {...field} 
                               />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name="pinRequestEmail"
                         render={({ field }) => (
                           <FormItem>
                             <FormLabel>Email for Pin Request</FormLabel>
                             <FormControl>
                               <Input 
                                 type="email" 
                                 placeholder="email@example.com" 
                                 {...field} 
                               />
                              </FormControl>
                              <FormDescription>
                                Please note that this email is visible to admin only
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                         )}
                        />
                       </>
                     )}
                   </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>

        <DialogFooter className="flex-shrink-0">
          {isUploading && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Uploading...</span>
                <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
          {!isUploading && (
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                Save
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>

      {/* Contact Form Dialog */}
      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {contactFormType === 'floor-plans' && 'Contact Floor Plan Creator'}
              {contactFormType === 'itinerary' && 'Itinerary Creator'}
              {contactFormType === 'brochure' && 'Brochure Creator'}
              {contactFormType === 'crew-profile' && 'Crew Profile Creator'}
            </DialogTitle>
            <DialogDescription>
              {contactFormType === 'floor-plans' && 'Get in touch with our floor plan specialists to create professional floor plans for your property.'}
              {contactFormType === 'itinerary' && 'Get assistance with creating detailed itineraries for your yacht charter.'}
              {contactFormType === 'brochure' && 'Get help creating professional brochures in PDF format for your yacht.'}
              {contactFormType === 'crew-profile' && 'Get assistance with generating professional crew profiles for your yacht.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const data = {
              name: formData.get('name'),
              email: formData.get('email'),
              description: formData.get('description')
            };
            console.log('Contact form data:', data);
            toast({
              title: "Message Sent!",
              description: "We'll get back to you within 24 hours with a quote.",
            });
            setShowContactForm(false);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input
                id="contact-name"
                name="name"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-description">Pick up location drop off location via locations</Label>
              <Textarea
                id="contact-description"
                name="description"
                placeholder="Enter start location, stops, and end location..."
                className="min-h-[100px]"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowContactForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Itinerary Form Dialog */}
      <Dialog open={showItineraryForm} onOpenChange={setShowItineraryForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Yacht Itinerary</DialogTitle>
            <DialogDescription>
              Plan your yacht journey by selecting pick-up, drop-off, and via locations on the map.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            toast({
              title: "Itinerary Request Sent!",
              description: "We'll create your custom itinerary and send it to you within 24 hours.",
            });
            setShowItineraryForm(false);
            setItineraryLocations({
              pickUp: { address: '', coordinates: null },
              dropOff: { address: '', coordinates: null },
              via: []
            });
          }} className="space-y-6">
            
            {/* Pick-up Location */}
            <div className="space-y-2">
              <Label>Pick-up Location</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter pick-up location or select from map"
                  value={itineraryLocations.pickUp.address}
                  onChange={(e) => setItineraryLocations(prev => ({
                    ...prev,
                    pickUp: { ...prev.pickUp, address: e.target.value }
                  }))}
                  required
                />
                <div className="h-48 border rounded-lg overflow-hidden">
                  <MapboxLocationPicker
                    coordinates={itineraryLocations.pickUp.coordinates}
                    onCoordinatesChange={(coordinates) => {
                      setItineraryLocations(prev => ({
                        ...prev,
                        pickUp: { ...prev.pickUp, coordinates }
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Drop-off Location */}
            <div className="space-y-2">
              <Label>Drop-off Location</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Enter drop-off location or select from map"
                  value={itineraryLocations.dropOff.address}
                  onChange={(e) => setItineraryLocations(prev => ({
                    ...prev,
                    dropOff: { ...prev.dropOff, address: e.target.value }
                  }))}
                  required
                />
                <div className="h-48 border rounded-lg overflow-hidden">
                  <MapboxLocationPicker
                    coordinates={itineraryLocations.dropOff.coordinates}
                    onCoordinatesChange={(coordinates) => {
                      setItineraryLocations(prev => ({
                        ...prev,
                        dropOff: { ...prev.dropOff, coordinates }
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Via Locations */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Via Locations (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setItineraryLocations(prev => ({
                    ...prev,
                    via: [...prev.via, { address: '', coordinates: null }]
                  }))}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Stop
                </Button>
              </div>
              
              {itineraryLocations.via.map((location, index) => (
                <div key={index} className="space-y-2 border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Label>Stop {index + 1}</Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setItineraryLocations(prev => ({
                        ...prev,
                        via: prev.via.filter((_, i) => i !== index)
                      }))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Enter via location or select from map"
                    value={location.address}
                    onChange={(e) => setItineraryLocations(prev => ({
                      ...prev,
                      via: prev.via.map((loc, i) => 
                        i === index ? { ...loc, address: e.target.value } : loc
                      )
                    }))}
                  />
                  <div className="h-48 border rounded-lg overflow-hidden">
                    <MapboxLocationPicker
                      coordinates={location.coordinates}
                      onCoordinatesChange={(coordinates) => {
                        setItineraryLocations(prev => ({
                          ...prev,
                          via: prev.via.map((loc, i) => 
                            i === index ? { ...loc, coordinates } : loc
                          )
                        }));
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowItineraryForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Itinerary
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Dialog>

    {/* Yacht Brochure Dialog */}
    <Dialog open={showBrochure} onOpenChange={setShowBrochure}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <YachtBrochure 
          yachtData={form.getValues()} 
          onClose={() => setShowBrochure(false)} 
        />
      </DialogContent>
    </Dialog>

    {/* Crew Profile Form Component */}
    <CrewProfileForm 
      open={showCrewProfileForm}
      onOpenChange={setShowCrewProfileForm}
      onSave={(crewData) => {
        console.log('Crew data saved:', crewData);
        // You can handle the crew data here, e.g., save to form state
      }}
    />
    </>
  );
}
