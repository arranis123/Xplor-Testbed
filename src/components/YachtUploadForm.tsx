import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { Plus, X, Upload, Link, Image, Video, FileText, Plane, ChevronDown, HelpCircle } from "lucide-react"

const yachtRulesSchema = z.object({
  // Basic Info
  yachtName: z.string().min(1, "Yacht name is required"),
  yachtType: z.string().min(1, "Yacht type is required"),
  listingType: z.string().min(1, "Listing type is required"),
  officialNumber: z.string().optional(),
  callSign: z.string().optional(),
  mmsiNumber: z.string().optional(),
  imoNumber: z.string().optional(),
  
  // Yacht Listing Types by Build / Readiness Stage - Dropdown Filters
  buildReadinessStage: z.string().optional(),
  operationalStatus: z.string().optional(),
  specialListingCategory: z.string().optional(),
  
  // Sale Price
  askingPrice: z.string().optional(),
  askingPriceCurrency: z.string().optional(),
  isPriceNegotiable: z.boolean().optional(),
  displayPricePublicly: z.boolean().optional(),
  pricingType: z.string().optional(),
  priceReductionNote: z.string().optional(),
  yachtCurrentLocation: z.string().optional(),
  vatStatus: z.string().optional(),
  vatIncludedInPrice: z.boolean().optional(),
  lastAskingPrice: z.string().optional(),
  estimatedRunningCosts: z.string().optional(),
  refitsUpgradesCost: z.string().optional(),
  brokerCommission: z.string().optional(),
  saleOwnershipType: z.string().optional(),
  mortgageEncumbrance: z.boolean().optional(),
  availableImmediately: z.boolean().optional(),
  partExchangeConsidered: z.boolean().optional(),
  notesToBuyer: z.string().optional(),
  
  // Base Charter Rates
  lowSeasonRateWeekly: z.string().optional(),
  highSeasonRateWeekly: z.string().optional(),
  midSeasonRateWeekly: z.string().optional(),
  shoulderSeasonRate: z.string().optional(),
  dayRate: z.string().optional(),
  weekendRate: z.string().optional(),
  hourlyRate: z.string().optional(),
  customQuotePOA: z.boolean().optional(),
  
  // Currency & Duration
  currency: z.string().optional(),
  showCurrencySymbol: z.boolean().optional(),
  minimumCharterDuration: z.string().optional(),
  maximumCharterDuration: z.string().optional(),
  flexibleBookingAvailable: z.boolean().optional(),
  
  // What's Included
  crewIncluded: z.boolean().optional(),
  fuelIncluded: z.boolean().optional(),
  foodBeverageIncluded: z.boolean().optional(),
  waterToysIncluded: z.boolean().optional(),
  dockingFeesIncluded: z.boolean().optional(),
  localVATIncluded: z.boolean().optional(),
  
  // Additional Pricing Details
  apaPercentage: z.string().optional(),
  apaNotes: z.string().optional(),
  vatPercentage: z.string().optional(),
  vatIncludedInBase: z.boolean().optional(),
  securityDepositAmount: z.string().optional(),
  securityDepositType: z.string().optional(),
  deliveryFeesCharged: z.boolean().optional(),
  deliveryFromTo: z.string().optional(),
  deliveryPriceType: z.string().optional(),
  deliveryRate: z.string().optional(),
  
  // Discounts & Offers
  earlyBookingDiscount: z.string().optional(),
  lastMinuteDiscount: z.string().optional(),
  repeatClientDiscount: z.string().optional(),
  multiWeekDiscount: z.string().optional(),
  brokerCommissionPercent: z.string().optional(),
  customOffers: z.string().optional(),
  
  // Season Dates
  highSeasonStart: z.string().optional(),
  highSeasonEnd: z.string().optional(),
  lowSeasonStart: z.string().optional(),
  lowSeasonEnd: z.string().optional(),
  midSeasonStart: z.string().optional(),
  midSeasonEnd: z.string().optional(),
  
  // Charter Packages
  dayCruisePackage: z.boolean().optional(),
  weekendEscape: z.boolean().optional(),
  weeklyCharter: z.boolean().optional(),
  corporateCharter: z.boolean().optional(),
  weddingEventCharter: z.boolean().optional(),
  scubaDivingCharter: z.boolean().optional(),
  fishingCharter: z.boolean().optional(),
  wellnessSpaCharter: z.boolean().optional(),
  
  // Location-Specific Info
  commercialCharterLicensed: z.boolean().optional(),
  primaryHomePort: z.string().optional(),
  availableCruisingAreas: z.string().optional(),
  seasonalLocations: z.string().optional(),
  
  // Legacy fields (keeping for compatibility)
  priceIncludes: z.string().optional(),
  priceExcludes: z.string().optional(),
  securityDeposit: z.string().optional(),
  advanceProvisioningAllowance: z.string().optional(),
  deliveryFees: z.string().optional(),
  brokerageFee: z.string().optional(),
  
  // Class Information
  classificationSociety: z.string().optional(),
  classificationStatus: z.string().optional(),
  initialClassificationDate: z.string().optional(),
  lastRenewalDate: z.string().optional(),
  nextSurveyDue: z.string().optional(),
  classNotations: z.string().optional(),
  classCertificateUpload: z.string().optional(),
  mcaCommercialCode: z.boolean().optional(),
  ismCode: z.boolean().optional(),
  ispsCode: z.boolean().optional(),
  mlc: z.boolean().optional(),
  solas: z.boolean().optional(),
  marpol: z.boolean().optional(),
  ceCertification: z.boolean().optional(),
  rcdRcr: z.boolean().optional(),
  uscgDocumentation: z.boolean().optional(),
  surveyType: z.string().optional(),
  lastSurveyDate: z.string().optional(),
  surveyorName: z.string().optional(),
  surveyReportUpload: z.string().optional(),
  iceClassRating: z.string().optional(),
  fireClassSafetyZones: z.string().optional(),
  hullIdentificationNumber: z.string().optional(),
  stabilityDocumentationAvailable: z.boolean().optional(),
  loadLineCertificate: z.boolean().optional(),
  flagStateInspectionRecord: z.boolean().optional(),
  
  // Registration Details
  portOfRegistry: z.string().optional(),
  flagState: z.string().optional(),
  dateOfRegistration: z.string().optional(),
  placeOfIssue: z.string().optional(),
  issuingAuthority: z.string().optional(),
  registryExpirationDate: z.string().optional(),
  
  // Tonnage & Dimensions
  grossTonnage: z.string().optional(),
  netTonnage: z.string().optional(),
  length: z.string().optional(),
  beam: z.string().optional(),
  draft: z.string().optional(),
  yearBuilt: z.string().optional(),
  builder: z.string().optional(),
  placeOfBuild: z.string().optional(),
  
  // Guest and Crew Info
  guestCabins: z.number().optional(),
  crewCabins: z.number().optional(),
  maxGuests: z.number().optional(),
  maxCrew: z.number().optional(),
  
  // Ownership & Management
  ownerName: z.string().optional(),
  ownerAddress: z.string().optional(),
  ownershipType: z.string().optional(),
  managingCompany: z.string().optional(),
  beneficialOwner: z.string().optional(),
  
  // Operational Status
  vesselUse: z.string().optional(),
  navigationLimits: z.string().optional(),
  registryStatus: z.string().optional(),
  
  // Deck Spaces
  deckSpaces: z.array(z.object({
    name: z.string(),
    deckType: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  
  // Cabin Types
  cabinTypes: z.array(z.object({
    name: z.string(),
    deckLevel: z.string().optional(),
    cabinType: z.string().optional(),
    bedConfiguration: z.array(z.string()).optional(),
    cabinFeatures: z.array(z.string()).optional(),
    sleeps: z.number().optional(),
    description: z.string().optional(),
  })).optional(),

  // Amenities & Toys
  interiorAmenities: z.array(z.string()).optional(),
  accommodationFeatures: z.array(z.string()).optional(),
  exteriorAmenities: z.array(z.string()).optional(),
  wellnessAndFitness: z.array(z.string()).optional(),
  entertainmentTech: z.array(z.string()).optional(),
  galleyFeatures: z.array(z.string()).optional(),
  waterToysMotorized: z.array(z.string()).optional(),
  waterToysNonMotorized: z.array(z.string()).optional(),
  adventureGear: z.array(z.string()).optional(),
  crewSupport: z.array(z.string()).optional(),
  certificationsCapabilities: z.array(z.string()).optional(),

  // Guest Rules & Access - Section 1: Access Information
  embarkationPort: z.string().optional(),
  disembarkationPort: z.string().optional(),
  embarkationTime: z.string().optional(),
  disembarkationTime: z.string().optional(),
  boardingInstructionsRequired: z.boolean().optional(),
  captainsBriefingRequired: z.boolean().optional(),
  crewAssistsWithLuggage: z.boolean().optional(),
  idRequiredAtCheckIn: z.boolean().optional(),
  shoreAccess: z.array(z.string()).optional(),
  marinaDockName: z.string().optional(),

  // Section 2: Navigation & Movement
  yachtCanMoveDuringCharter: z.boolean().optional(),
  itineraryCustomizable: z.boolean().optional(),
  nightCruisingAllowed: z.boolean().optional(),
  tenderUsePermittedByGuests: z.boolean().optional(),
  cruisingRestrictions: z.array(z.string()).optional(),

  // Section 3: Guest Use Rules
  maxDayGuests: z.number().optional(),
  maxNightGuests: z.number().optional(),
  extraGuestsRequireApproval: z.boolean().optional(),
  galleyUsePermitted: z.boolean().optional(),
  bridgeAccessAllowed: z.array(z.string()).optional(),
  quietHoursStart: z.string().optional(),
  quietHoursEnd: z.string().optional(),
  crewQuartersAccess: z.boolean().optional(),

  // Section 4: Children & Pets
  childrenAllowed: z.boolean().optional(),
  minimumAge: z.number().optional(),
  childproofingAvailable: z.boolean().optional(),
  petsAllowed: z.array(z.string()).optional(),
  petNotes: z.string().optional(),

  // Section 5: Behavior & Onboard Conduct
  smokingPolicy: z.array(z.string()).optional(),
  vapingPermitted: z.boolean().optional(),
  shoesOnboard: z.array(z.string()).optional(),
  alcoholPolicy: z.array(z.string()).optional(),
  illegalSubstancesProhibited: z.boolean().optional(),
  firearmsWeaponsNotAllowed: z.boolean().optional(),
  noPartiesWithoutApproval: z.boolean().optional(),

  // Legacy fields for compatibility
  maxGuestsSleeping: z.number().min(1).max(50),
  maxGuestsDayUse: z.number().min(1).max(100),
  eventsAllowed: z.enum(["yes", "no", "approval_only"]),
  minAgeToBook: z.number().min(18).max(65),
  checkInTime: z.string(),
  checkOutTime: z.string(),

  // Access Permissions
  cabinAccess: z.enum(["guest_only", "owner_locked", "all_access"]),
  galleyAccess: z.enum(["guest_allowed", "crew_only"]),
  crewQuarters: z.literal("no_access"),
  bridgeAccess: z.enum(["no_access", "tour_with_captain"]),
  engineRoom: z.literal("no_access"),
  tenderGarage: z.enum(["no_access", "crew_only"]),
  swimPlatform: z.enum(["open_access", "supervision_only"]),
  waterToys: z.enum(["free_use", "with_crew", "rental_charges"]),
  jacuzziAccess: z.enum(["yes", "no", "crew_supervision"]),
  wifiAccess: z.enum(["free", "limited", "extra_charge"]),

  // Cleaning & Maintenance
  dailyHousekeeping: z.enum(["included", "optional", "extra_charge"]),
  laundryService: z.enum(["available", "not_available", "charges_apply"]),
  cleaningFee: z.string(),
  crewTipGuidelines: z.string(),

  // Safety & Security - Section 1: General Safety Equipment
  certifiedLifejackets: z.boolean().default(false),
  inflatableLifeRafts: z.boolean().default(false),
  lifeRaftCapacity: z.string().optional(),
  epirb: z.boolean().default(false),
  fireExtinguishers: z.boolean().default(false),
  fireSuppressionSystem: z.boolean().default(false),
  smokeCoDetectors: z.boolean().default(false),
  emergencyFlares: z.boolean().default(false),
  satellitePhone: z.boolean().default(false),
  aedDefibrillator: z.boolean().default(false),
  firstAidKit: z.boolean().default(false),
  emergencyLighting: z.boolean().default(false),
  musterStation: z.boolean().default(false),
  generalSafetyNotes: z.string().optional(),

  // Section 2: Crew Certifications & Protocols
  captainCommercialLicense: z.boolean().default(false),
  crewStcwCertified: z.boolean().default(false),
  safetyBriefingRequired: z.boolean().default(false),
  trainedMedicalResponder: z.boolean().default(false),
  regularSafetyDrills: z.boolean().default(false),
  evacuationPlanPosted: z.boolean().default(false),
  childElderlySafetyProcedures: z.boolean().default(false),

  // Section 3: Fire & Electrical Safety
  fireproofMaterials: z.boolean().default(false),
  fireRetardantUpholstery: z.boolean().default(false),
  galleyFireSuppression: z.boolean().default(false),
  circuitBreakers: z.boolean().default(false),
  engineRoomSealed: z.boolean().default(false),
  smokeAlarmsAllAreas: z.boolean().default(false),
  batteryCutoffSystems: z.boolean().default(false),

  // Section 4: Navigational Safety
  aisRadarGpsActive: z.boolean().default(false),
  stabilizers: z.boolean().default(false),
  weatherMonitoring: z.boolean().default(false),
  redundantNavigation: z.boolean().default(false),
  vhfRadioBridge24_7: z.boolean().default(false),
  bridgeAccessRestricted: z.boolean().default(false),

  // Section 5: Physical & Deck Safety
  nonSlipDeckSurfaces: z.boolean().default(false),
  childSafeRailings: z.boolean().default(false),
  grabHandles: z.boolean().default(false),
  swimmingZonesMarked: z.boolean().default(false),
  waterToysSupervised: z.boolean().default(false),
  antiJellyfishPool: z.boolean().default(false),
  deckLightingNight: z.boolean().default(false),
  uvProtectedAreas: z.boolean().default(false),

  // Section 6: Medical & Sanitation Preparedness
  medicalGradeFirstAid: z.boolean().default(false),
  dedicatedMedicalStorage: z.boolean().default(false),
  nearbyHospitalsListed: z.boolean().default(false),
  nurseMedicOnboard: z.boolean().default(false),
  emergencyEvacuationPlan: z.boolean().default(false),
  sanitizerStations: z.boolean().default(false),
  healthSanitationProtocols: z.boolean().default(false),

  // Additional safety notes for each section
  crewCertificationNotes: z.string().optional(),
  fireElectricalSafetyNotes: z.string().optional(),
  navigationalSafetyNotes: z.string().optional(),
  physicalDeckSafetyNotes: z.string().optional(),
  medicalSanitationNotes: z.string().optional(),
  certificationsComplianceNotes: z.string().optional(),

  // Verified by Captain toggle
  verifiedByCaptain: z.boolean().default(false),

  // Documents section
  documents: z.array(z.object({
    name: z.string(),
    type: z.enum(['insurance', 'registration', 'charter_license', 'safety_certificate', 'survey_report', 'other']),
    url: z.string().optional(),
    uploadDate: z.string().optional(),
    expiryDate: z.string().optional(),
    description: z.string().optional(),
  })).default([]),

  // Location-Based Rules
  allowedRegions: z.string(),
  portAccessRules: z.enum(["restricted", "prebooked_only", "open"]),
  overnightAnchor: z.enum(["yes", "no", "weather_dependent"]),
  dockingPermitted: z.enum(["yes", "no", "captain_discretion"]),

  // Legal & Financial
  charterContract: z.literal("yes"),
  securityDepositRequired: z.enum(["yes", "no"]),
  depositAmount: z.string().optional(),
  insuranceCoverage: z.enum(["covered", "recommended", "required"]),
  vatHandling: z.enum(["included", "not_included", "on_request"]),
  apaPercentageOld: z.number().min(0).max(50),

  // Access Management
  visibility: z.enum(["public", "private", "invite_only"]),
  privatePinCode: z.string().optional(),
  pinRequestEmail: z.string().email().optional(),
  bookingType: z.enum(["instant_book", "request_to_book"]),
  hostApproval: z.enum(["yes", "no"]),
  coBrokerage: z.enum(["yes", "no", "with_agreement"]),
  virtualTourAccess: z.enum(["public", "logged_in", "on_request"]),
  reviewsVisible: z.enum(["yes", "no"]),
  guestIdVerification: z.enum(["yes", "no"]),
  ndaRequired: z.enum(["yes", "no", "celebrities_only"]),
})

type YachtUploadFormData = z.infer<typeof yachtRulesSchema>

interface YachtUploadFormProps {
  onSubmit: (data: YachtUploadFormData) => void
  onCancel: () => void
}

export function YachtUploadForm({ onSubmit, onCancel }: YachtUploadFormProps) {
  const { toast } = useToast()
  
  // State for dynamic sections
  const [deckSpaces, setDeckSpaces] = useState([{ name: '', deckType: '', description: '' }])
  const [cabinTypes, setCabinTypes] = useState([{ name: '', deckLevel: '', cabinType: '', bedConfiguration: [], cabinFeatures: [], sleeps: 2, description: '' }])
  
  // State for media uploads
  const [yachtVirtualTours, setYachtVirtualTours] = useState([{ name: '', url: '', file: null }])
  const [yachtPhotos, setYachtPhotos] = useState([])
  const [yachtVideos, setYachtVideos] = useState([])
  const [yachtDroneFootage, setYachtDroneFootage] = useState([])
  const [yachtFloorPlans, setYachtFloorPlans] = useState([])
  const [yachtDocuments, setYachtDocuments] = useState([])
  
  const [spaceMedia, setSpaceMedia] = useState({})
  const [cabinMedia, setCabinMedia] = useState({})
  
  const form = useForm<YachtUploadFormData>({
    resolver: zodResolver(yachtRulesSchema),
    defaultValues: {
      yachtName: '',
      yachtType: '',
      length: '',
      beam: '',
      draft: '',
      builder: '',
      yearBuilt: '',
      guestCabins: 0,
      crewCabins: 0,
      maxGuests: 0,
      maxCrew: 0,
      deckSpaces: [],
      cabinTypes: [],
      interiorAmenities: [],
      accommodationFeatures: [],
      exteriorAmenities: [],
      wellnessAndFitness: [],
      entertainmentTech: [],
      galleyFeatures: [],
      waterToysMotorized: [],
      waterToysNonMotorized: [],
      adventureGear: [],
      crewSupport: [],
      certificationsCapabilities: [],
      // Guest Rules & Access defaults
      embarkationPort: "",
      disembarkationPort: "",
      embarkationTime: "12:00",
      disembarkationTime: "10:00",
      boardingInstructionsRequired: false,
      captainsBriefingRequired: true,
      crewAssistsWithLuggage: true,
      idRequiredAtCheckIn: true,
      shoreAccess: [],
      marinaDockName: "",
      yachtCanMoveDuringCharter: true,
      itineraryCustomizable: true,
      nightCruisingAllowed: false,
      tenderUsePermittedByGuests: false,
      cruisingRestrictions: [],
      maxDayGuests: 12,
      maxNightGuests: 10,
      extraGuestsRequireApproval: true,
      galleyUsePermitted: false,
      bridgeAccessAllowed: [],
      quietHoursStart: "23:00",
      quietHoursEnd: "08:00",
      crewQuartersAccess: false,
      childrenAllowed: true,
      minimumAge: 0,
      childproofingAvailable: false,
      petsAllowed: [],
      petNotes: "",
      smokingPolicy: [],
      vapingPermitted: false,
      shoesOnboard: [],
      alcoholPolicy: [],
      illegalSubstancesProhibited: true,
      firearmsWeaponsNotAllowed: true,
      noPartiesWithoutApproval: true,
      // Legacy compatibility
      maxGuestsSleeping: 10,
      maxGuestsDayUse: 12,
      eventsAllowed: "approval_only",
      minAgeToBook: 25,
      checkInTime: "12:00",
      checkOutTime: "10:00",
      cabinAccess: "guest_only",
      galleyAccess: "guest_allowed",
      crewQuarters: "no_access",
      bridgeAccess: "tour_with_captain",
      engineRoom: "no_access",
      tenderGarage: "crew_only",
      swimPlatform: "open_access",
      waterToys: "with_crew",
      jacuzziAccess: "crew_supervision",
      wifiAccess: "free",
      dailyHousekeeping: "included",
      laundryService: "charges_apply",
      cleaningFee: "Included in charter rate",
      crewTipGuidelines: "10-15% of charter fee",
      // Safety default values - all false by default, can be enabled
      certifiedLifejackets: false,
      inflatableLifeRafts: false,
      epirb: false,
      fireExtinguishers: false,
      fireSuppressionSystem: false,
      smokeCoDetectors: false,
      emergencyFlares: false,
      satellitePhone: false,
      aedDefibrillator: false,
      firstAidKit: false,
      emergencyLighting: false,
      musterStation: false,
      captainCommercialLicense: false,
      crewStcwCertified: false,
      safetyBriefingRequired: false,
      trainedMedicalResponder: false,
      regularSafetyDrills: false,
      evacuationPlanPosted: false,
      childElderlySafetyProcedures: false,
      fireproofMaterials: false,
      fireRetardantUpholstery: false,
      galleyFireSuppression: false,
      circuitBreakers: false,
      engineRoomSealed: false,
      smokeAlarmsAllAreas: false,
      batteryCutoffSystems: false,
      aisRadarGpsActive: false,
      stabilizers: false,
      weatherMonitoring: false,
      redundantNavigation: false,
      vhfRadioBridge24_7: false,
      bridgeAccessRestricted: false,
      nonSlipDeckSurfaces: false,
      childSafeRailings: false,
      grabHandles: false,
      swimmingZonesMarked: false,
      waterToysSupervised: false,
      antiJellyfishPool: false,
      deckLightingNight: false,
      uvProtectedAreas: false,
      medicalGradeFirstAid: false,
      dedicatedMedicalStorage: false,
      nearbyHospitalsListed: false,
      nurseMedicOnboard: false,
      emergencyEvacuationPlan: false,
      sanitizerStations: false,
      healthSanitationProtocols: false,
      verifiedByCaptain: false,
      documents: [],
      allowedRegions: "",
      portAccessRules: "prebooked_only",
      overnightAnchor: "weather_dependent",
      dockingPermitted: "captain_discretion",
      charterContract: "yes",
      securityDeposit: "yes",
      insuranceCoverage: "covered",
      vatHandling: "not_included",
      apaPercentageOld: 30,
      visibility: "private",
      bookingType: "request_to_book",
      hostApproval: "yes",
      coBrokerage: "with_agreement",
      virtualTourAccess: "logged_in",
      reviewsVisible: "yes",
      guestIdVerification: "yes",
      ndaRequired: "celebrities_only",
    },
  })

  // Helper functions for media management
  const addYachtVirtualTour = () => {
    setYachtVirtualTours([...yachtVirtualTours, { name: '', url: '', file: null }])
  }
  
  const removeYachtVirtualTour = (index: number) => {
    setYachtVirtualTours(yachtVirtualTours.filter((_, i) => i !== index))
  }
  
  const updateYachtVirtualTour = (index: number, field: string, value: any) => {
    const updated = [...yachtVirtualTours]
    updated[index] = { ...updated[index], [field]: value }
    setYachtVirtualTours(updated)
  }
  
  const addDeckSpace = () => {
    setDeckSpaces([...deckSpaces, { name: '', deckType: '', description: '' }])
  }
  
  const removeDeckSpace = (index: number) => {
    setDeckSpaces(deckSpaces.filter((_, i) => i !== index))
  }
  
  const addCabinType = () => {
    setCabinTypes([...cabinTypes, { name: '', deckLevel: '', cabinType: '', bedConfiguration: [], cabinFeatures: [], sleeps: 2, description: '' }])
  }
  
  const removeCabinType = (index: number) => {
    setCabinTypes(cabinTypes.filter((_, i) => i !== index))
  }

  const handleSubmit = (data: YachtUploadFormData) => {
    const formData = {
      ...data,
      deckSpaces,
      cabinTypes,
      media: {
        yacht: {
          virtualTours: yachtVirtualTours,
          photos: yachtPhotos,
          videos: yachtVideos,
          droneFootage: yachtDroneFootage,
          floorPlans: yachtFloorPlans,
          documents: yachtDocuments,
        },
        spaces: spaceMedia,
        cabins: cabinMedia,
      }
    }
    onSubmit(formData)
    toast({
      title: "Yacht listing saved",
      description: "Your yacht listing and media have been configured.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Yacht Upload Form</h2>
        <p className="text-muted-foreground">Configure rules and access permissions for your yacht charter</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Tabs defaultValue="yacht-info" className="w-full">
            <div className="flex gap-6">
              <TabsList className="flex flex-col h-fit w-60 p-2 space-y-1">
                <TabsTrigger value="yacht-info" className="w-full justify-start">Yacht Info</TabsTrigger>
                <TabsTrigger value="pricing" className="w-full justify-start">Pricing</TabsTrigger>
                <TabsTrigger value="class" className="w-full justify-start">Class</TabsTrigger>
                <TabsTrigger value="guest-rules-access" className="w-full justify-start">Guest Rules & Access</TabsTrigger>
                
                <TabsTrigger value="access" className="w-full justify-start">Access</TabsTrigger>
                <TabsTrigger value="safety" className="w-full justify-start">Safety</TabsTrigger>
                <TabsTrigger value="cabin-types" className="w-full justify-start">Cabin Types</TabsTrigger>
                <TabsTrigger value="deck-spaces" className="w-full justify-start">Deck Spaces</TabsTrigger>
                <TabsTrigger value="amenities" className="w-full justify-start">Amenities & Toys</TabsTrigger>
                <TabsTrigger value="media-files" className="w-full justify-start">Media & Files</TabsTrigger>
                <TabsTrigger value="documents" className="w-full justify-start">Documents</TabsTrigger>
                <TabsTrigger value="management" className="w-full justify-start">Management</TabsTrigger>
              </TabsList>
              
              <div className="flex-1">

            <TabsContent value="yacht-info" className="space-y-4">
               {/* Basic Info */}
               <Card>
                 <CardHeader>
                   <CardTitle>Basic Info</CardTitle>
                   <CardDescription>
                     Basic vessel identification details and listing categories
                   </CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField
                       control={form.control}
                       name="yachtName"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Vessel Name</FormLabel>
                           <FormControl>
                             <Input placeholder="Enter vessel name" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="officialNumber"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Official Number</FormLabel>
                           <FormControl>
                             <Input placeholder="Enter official number" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="callSign"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Call Sign</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter call sign" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mmsiNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>MMSI Number (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter MMSI number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imoNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IMO Number (commercial yachts over 24m)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter IMO number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     <FormField
                       control={form.control}
                       name="listingType"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Sale/Charter/Both</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Select listing type" />
                               </SelectTrigger>
                             </FormControl>
                               <SelectContent>
                                 <SelectItem value="sale">Sale</SelectItem>
                                 <SelectItem value="charter">Charter</SelectItem>
                                 <SelectItem value="both">Both</SelectItem>
                               </SelectContent>
                           </Select>
                           <FormMessage />
                         </FormItem>
                       )}
                      />

                      {/* Yacht Listing Types by Build / Readiness Stage */}
                      <FormField
                        control={form.control}
                        name="buildReadinessStage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>🛠️ Build / Readiness Stage</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select build stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Design & Construction Phases</SelectLabel>
                                  <SelectItem value="concept-design-only">Concept / Design Only</SelectItem>
                                  <SelectItem value="project-build-slot">Project / Build Slot Available</SelectItem>
                                  <SelectItem value="under-construction">Under Construction / In Build</SelectItem>
                                  <SelectItem value="hull-launched">Hull Launched / Unfinished Project</SelectItem>
                                  <SelectItem value="partially-completed">Partially Completed Yacht</SelectItem>
                                </SelectGroup>
                                <SelectGroup>
                                  <SelectLabel>Ready for Market / Operation</SelectLabel>
                                  <SelectItem value="new-delivery">New Delivery / Recently Delivered</SelectItem>
                                  <SelectItem value="turnkey-new">Turnkey New Yacht</SelectItem>
                                  <SelectItem value="pre-owned">Pre-Owned / Brokerage Yacht</SelectItem>
                                  <SelectItem value="refitted-yacht">Refitted Yacht</SelectItem>
                                  <SelectItem value="conversion-opportunity">Conversion Opportunity</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operationalStatus"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>🧭 Operational Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select operational status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="in-navigation">In Navigation / Fully Operational</SelectItem>
                                <SelectItem value="laid-up">Laid-Up / Out of Service</SelectItem>
                                <SelectItem value="out-of-class">Out of Class</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="specialListingCategory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>⚠️ Special Listing Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select special category (optional)" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="off-market">Off Market</SelectItem>
                                <SelectItem value="charter-ready">Charter-Ready</SelectItem>
                                <SelectItem value="not-for-sale-us">Not for Sale to U.S. Residents While in U.S. Waters</SelectItem>
                                <SelectItem value="in-survey">In Survey / Pre-Sale Condition Assessment</SelectItem>
                                <SelectItem value="yacht-fraction">Yacht Fraction / Co-Ownership Opportunity</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                     <FormField
                       control={form.control}
                       name="yachtType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Vessel</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vessel type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[300px]">
                              <SelectGroup>
                                <SelectLabel>Motor Yachts</SelectLabel>
                                <SelectItem value="motor-yacht">Motor Yacht</SelectItem>
                                <SelectItem value="superyacht">Superyacht (24m–60m)</SelectItem>
                                <SelectItem value="megayacht">Megayacht (60m+)</SelectItem>
                                <SelectItem value="sport-yacht">Sport Yacht</SelectItem>
                                <SelectItem value="flybridge-yacht">Flybridge Yacht</SelectItem>
                                <SelectItem value="hardtop-open-yacht">Hardtop / Open Yacht</SelectItem>
                                <SelectItem value="cruiser">Cruiser</SelectItem>
                                <SelectItem value="trawler-yacht">Trawler Yacht</SelectItem>
                                <SelectItem value="cabin-cruiser">Cabin Cruiser</SelectItem>
                                <SelectItem value="day-boat">Day Boat</SelectItem>
                                <SelectItem value="jet-boat">Jet Boat</SelectItem>
                                <SelectItem value="power-catamaran">Power Catamaran</SelectItem>
                                <SelectItem value="classic-yacht">Classic Yacht</SelectItem>
                                <SelectItem value="custom-yacht">Custom Yacht</SelectItem>
                                <SelectItem value="semi-custom-yacht">Semi-Custom Yacht</SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>Sailing Yachts</SelectLabel>
                                <SelectItem value="sailing-yacht">Sailing Yacht</SelectItem>
                                <SelectItem value="catamaran-sailing">Catamaran (Sailing)</SelectItem>
                                <SelectItem value="trimaran">Trimaran</SelectItem>
                                <SelectItem value="gulet">Gulet</SelectItem>
                                <SelectItem value="classic-sailing-yacht">Classic Sailing Yacht</SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>Explorer & Long-Range</SelectLabel>
                                <SelectItem value="expedition-yacht">Expedition Yacht / Explorer Yacht</SelectItem>
                                <SelectItem value="trawler-yacht-explorer">Trawler Yacht</SelectItem>
                                <SelectItem value="support-vessel">Support Vessel / Shadow Boat</SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>Special Purpose / Sport</SelectLabel>
                                <SelectItem value="fishing-yacht">Fishing Yacht / Sportfisher</SelectItem>
                                <SelectItem value="chase-boat">Chase Boat / Tender</SelectItem>
                                <SelectItem value="jet-boat-sport">Jet Boat</SelectItem>
                                <SelectItem value="rib">RIB (Rigid Inflatable Boat)</SelectItem>
                              </SelectGroup>
                              <SelectGroup>
                                <SelectLabel>Liveaboard & Commercial</SelectLabel>
                                <SelectItem value="houseboat">Houseboat</SelectItem>
                                <SelectItem value="passenger-vessel">Passenger Vessel (Mini Cruise / Hotel Yacht)</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Registration Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Details</CardTitle>
                  <CardDescription>
                    Vessel registration and flag state information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="portOfRegistry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port of Registry</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., George Town, London, Valletta" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="flagState"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Flag State / Country of Registration</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter flag state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfRegistration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Registration</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="placeOfIssue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Issue</FormLabel>
                          <FormControl>
                            <Input placeholder="Where the registry was issued" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="issuingAuthority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issuing Authority</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Cayman Islands Shipping Registry, MCA, USCG" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="registryExpirationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiration Date of Registry</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Tonnage & Dimensions */}
              <Card>
                <CardHeader>
                  <CardTitle>Tonnage & Dimensions</CardTitle>
                  <CardDescription>
                    Vessel specifications and build information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="grossTonnage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gross Tonnage (GT)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter GT" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="netTonnage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Net Tonnage (NT)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter NT" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                     <FormField
                       control={form.control}
                       name="length"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Length Overall (LOA)</FormLabel>
                           <FormControl>
                             <Input type="number" placeholder="Meters" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="beam"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Beam (Width)</FormLabel>
                           <FormControl>
                             <Input type="number" placeholder="Meters" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="guestCabins"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Number of Guest Cabins</FormLabel>
                           <FormControl>
                             <Input
                               type="number"
                               placeholder="e.g., 5"
                               {...field}
                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="crewCabins"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Number of Crew Cabins</FormLabel>
                           <FormControl>
                             <Input
                               type="number"
                               placeholder="e.g., 6"
                               {...field}
                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="maxGuests"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Max Number of Guests</FormLabel>
                           <FormControl>
                             <Input
                               type="number"
                               placeholder="e.g., 12"
                               {...field}
                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                     <FormField
                       control={form.control}
                       name="maxCrew"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>Max Number of Crew</FormLabel>
                           <FormControl>
                             <Input
                               type="number"
                               placeholder="e.g., 10"
                               {...field}
                               onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />

                    <FormField
                      control={form.control}
                      name="draft"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Depth / Draft</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Meters" {...field} />
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
                          <FormLabel>Year of Build</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="2023" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="builder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Builder / Shipyard</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter builder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="placeOfBuild"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Place of Build</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter build location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Ownership & Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Ownership & Management</CardTitle>
                  <CardDescription>
                    Owner and management company details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Name(s)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter owner name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ownerAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter owner address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="company">Company</SelectItem>
                              <SelectItem value="trust">Trust</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="managingCompany"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Managing Company / Commercial Manager</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter managing company (if applicable)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="beneficialOwner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Beneficial Owner</FormLabel>
                          <FormControl>
                            <Input placeholder="If known or disclosed" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Operational Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Operational Status</CardTitle>
                  <CardDescription>
                    Current operational and registry status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vesselUse"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Commercial or Private Use</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select use type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="private">Private Use</SelectItem>
                              <SelectItem value="commercial">Commercial Use</SelectItem>
                              <SelectItem value="charter">Charter</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="navigationLimits"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Navigation Limits / Area of Operation</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter operational area" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="registryStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status / Validity of Registry</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select registry status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                              <SelectItem value="suspended">Suspended</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              {/* Sale Price Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sale Price Information</CardTitle>
                  <CardDescription>Configure sale pricing and terms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="askingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asking Price Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter asking price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="askingPriceCurrency"
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
                              <SelectItem value="aed">AED</SelectItem>
                              <SelectItem value="aud">AUD</SelectItem>
                              <SelectItem value="cad">CAD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isPriceNegotiable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Price Negotiable?</FormLabel>
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
                      name="displayPricePublicly"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Display Price Publicly?</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="pricingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pricing Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pricing type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="poa">Price on Application (POA)</SelectItem>
                            <SelectItem value="auction">Auction / Tender</SelectItem>
                            <SelectItem value="offers">Open to Offers</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priceReductionNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recent Price Reduction (add note/date)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Reduced by $50K on Jan 2024" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yachtCurrentLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Location (Port, Marina, Country)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Monaco, Port Hercules" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vatStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VAT Status of Sale</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select VAT status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="paid">VAT Paid</SelectItem>
                              <SelectItem value="not-paid">VAT Not Paid</SelectItem>
                              <SelectItem value="exempt">VAT Exempt</SelectItem>
                              <SelectItem value="qualifying">VAT Qualifying</SelectItem>
                              <SelectItem value="buyer-jurisdiction">VAT Applicable in Buyer's Jurisdiction</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vatIncludedInPrice"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">VAT Included in Asking Price?</FormLabel>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="lastAskingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Asking Price (if changed recently)</FormLabel>
                          <FormControl>
                            <Input placeholder="Previous asking price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimatedRunningCosts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estimated Running Costs (annual)</FormLabel>
                          <FormControl>
                            <Input placeholder="Annual running costs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="refitsUpgradesCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Refits / Upgrades Cost Summary</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Summary of recent refits and costs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brokerCommission"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Broker Commission % (internal use only)</FormLabel>
                          <FormControl>
                            <Input placeholder="Commission percentage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="saleOwnershipType"
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
                              <SelectItem value="sole">Sole Ownership</SelectItem>
                              <SelectItem value="co-ownership">Co-Ownership</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mortgageEncumbrance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mortgage or Encumbrance?</FormLabel>
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availableImmediately"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Available Immediately?</FormLabel>
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
                      name="partExchangeConsidered"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Part Exchange Considered?</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="notesToBuyer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes to Buyer (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Notable sale incentives, delivery options, included add-ons, survey terms, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Base Charter Rates */}
              <Card>
                <CardHeader>
                  <CardTitle>Base Charter Rates</CardTitle>
                  <CardDescription>Configure seasonal charter pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <FormField
                      control={form.control}
                      name="lowSeasonRateWeekly"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Low-Season Rate (Weekly)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter low season weekly rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="highSeasonRateWeekly"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>High-Season Rate (Weekly)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter high season weekly rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="midSeasonRateWeekly"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mid-Season Rate (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mid season weekly rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shoulderSeasonRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shoulder Season Rate (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter shoulder season rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dayRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Day Rate (10-20% of weekly)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter daily rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weekendRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weekend Rate (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter weekend rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hourlyRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hourly Rate (For events/day charters)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter hourly rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="customQuotePOA"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Custom Quote / POA (Price on Application)</FormLabel>
                          <FormDescription>
                            Enable this if pricing is variable or only available on request
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Currency & Duration */}
              <Card>
                <CardHeader>
                  <CardTitle>Currency & Charter Duration</CardTitle>
                  <CardDescription>Configure currency display and booking duration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <SelectItem value="aed">AED</SelectItem>
                              <SelectItem value="aud">AUD</SelectItem>
                              <SelectItem value="cad">CAD</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minimumCharterDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Charter Duration</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select minimum duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-day">1 Day</SelectItem>
                              <SelectItem value="3-days">3 Days</SelectItem>
                              <SelectItem value="7-days">7 Days</SelectItem>
                              <SelectItem value="14-days">14 Days</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maximumCharterDuration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Charter Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 30 days, No limit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="showCurrencySymbol"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Display currency symbol alongside rates</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="flexibleBookingAvailable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Flexible Booking Available</FormLabel>
                            <FormDescription>
                              Allow flexible dates and duration adjustments
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* What's Included in Base Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Included in the Base Rate?</CardTitle>
                  <CardDescription>Select what is included in your charter pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="crewIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Crew</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fuelIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Fuel (Within standard cruising limits)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="foodBeverageIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Food & Beverage (APA applies vs all-inclusive)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="waterToysIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Water Toys / Jet Skis</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dockingFeesIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Docking Fees (if included at home port)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="localVATIncluded"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Local VAT / Tax</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Pricing Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Pricing Details</CardTitle>
                  <CardDescription>Configure additional charges and fees</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="apaPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>APA (Advance Provisioning Allowance) %</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 25-35%" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="vatPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VAT / Sales Tax %</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter VAT percentage" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="securityDepositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter security deposit amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="securityDepositType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select deposit type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="flat-fee">Flat Fee</SelectItem>
                              <SelectItem value="percentage">Percentage of Charter</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryFromTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery From / To Locations</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter delivery locations" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Rate</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., $500 per nautical mile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="vatIncludedInBase"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>VAT Included in Base Rate</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryFeesCharged"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Delivery / Repositioning Fees Charged</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="apaNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>APA Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Clarify how APA is handled"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Charter Packages */}
              <Card>
                <CardHeader>
                  <CardTitle>Charter Packages</CardTitle>
                  <CardDescription>Select available charter packages and experiences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dayCruisePackage"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Day Cruise Package</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weekendEscape"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Weekend Escape</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weeklyCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Weekly Charter</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="corporateCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Corporate Charter / Event Hire</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="weddingEventCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Wedding / Private Event</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scubaDivingCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Scuba / Diving Charter</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fishingCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Fishing Charter</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="wellnessSpaCharter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Wellness / Spa Charter</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Location-Specific Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Location-Specific Information</CardTitle>
                  <CardDescription>Charter location and licensing details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="primaryHomePort"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Home Port</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Monaco, Fort Lauderdale" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="availableCruisingAreas"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Available Cruising Areas</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Mediterranean, Caribbean" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seasonalLocations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Seasonal Locations (Winter/Summer)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe seasonal location changes"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="commercialCharterLicensed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Yacht currently licensed for commercial charter</FormLabel>
                          <FormDescription>
                            Confirm the yacht has proper commercial charter licensing
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deck-spaces" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deck Spaces other than Cabins</CardTitle>
                  <CardDescription>Yachts can be huge with lots of nooks and crannies. Defining the different spaces on your yacht will automatically create multiple upload options within the Media & Files upload tab to help organize your listing into sections.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deckSpaces.map((space, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Deck Space {index + 1}</h4>
                        {deckSpaces.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDeckSpace(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="text-sm font-medium">Deck Type</label>
                          <Select
                            value={space.deckType}
                            onValueChange={(value) => {
                              const updated = [...deckSpaces]
                              updated[index].deckType = value
                              setDeckSpaces(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select deck type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Upper-Level Decks (Top–Down)</SelectLabel>
                                <SelectItem value="sun-deck">Sun Deck - Highest open deck, often with sun loungers, spa pool, bar, gym, or helipad</SelectItem>
                                <SelectItem value="bridge-deck">Bridge Deck - Home to the wheelhouse (bridge), captain's cabin, and often exterior lounges</SelectItem>
                                <SelectItem value="owners-deck">Owner's Deck / Private Deck - A full deck reserved for the owner's suite and private use</SelectItem>
                                <SelectItem value="sky-lounge-deck">Sky Lounge Deck - Features a second salon/lounge with bar, cinema, or game area</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Main Exterior & Social Decks</SelectLabel>
                                <SelectItem value="main-deck">Main Deck - Includes main salon, dining area, galley, and often the master suite</SelectItem>
                                <SelectItem value="upper-aft-deck">Upper Aft Deck / Upper Lounge Deck - Outdoor lounge or dining area at the rear</SelectItem>
                                <SelectItem value="foredeck">Foredeck / Bow Deck - Forward-facing exterior deck with seating, sunpads, Jacuzzi</SelectItem>
                                <SelectItem value="cockpit">Cockpit - Exterior area used for seating and helm controls</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Lower-Level Decks & Access</SelectLabel>
                                <SelectItem value="lower-deck">Lower Deck - Contains guest cabins, crew quarters, engine room, and storage</SelectItem>
                                <SelectItem value="beach-club-deck">Beach Club Deck / Swim Platform - At sea level; lounge area with water access</SelectItem>
                                <SelectItem value="tender-garage-deck">Tender Garage Deck / Toys Deck - Space for storing tenders, Jet Skis, and water toys</SelectItem>
                                <SelectItem value="crew-deck">Crew Deck / Crew Mess Area - Designated for crew operations, mess, laundry</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Functional or Specialized Decks</SelectLabel>
                                <SelectItem value="helideck">Helideck / Helicopter Landing Deck - Certified landing area for helicopters</SelectItem>
                                <SelectItem value="technical-deck">Technical Deck / Tank Deck - Houses systems like ballast, fuel tanks, watermakers</SelectItem>
                                <SelectItem value="engine-room-deck">Engine Room Deck - Houses propulsion and mechanical systems</SelectItem>
                                <SelectItem value="garage-access-deck">Garage Access Deck - Entry/exit platform for launching tenders and toys</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Additional Sailing Yacht Decks</SelectLabel>
                                <SelectItem value="flybridge">Flybridge (Open Helm Deck) - Includes helm controls and guest seating</SelectItem>
                                <SelectItem value="coachroof-deck">Coachroof Deck - Slightly raised structure for headroom and visibility</SelectItem>
                                <SelectItem value="cockpit-deck">Cockpit Deck - Primary control area for sailing yachts with winches and wheels</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Space Name</label>
                            <Input
                              placeholder="e.g., Upper Deck, Flybridge"
                              value={space.name}
                              onChange={(e) => {
                                const updated = [...deckSpaces]
                                updated[index].name = e.target.value
                                setDeckSpaces(updated)
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Input
                              placeholder="Brief description"
                              value={space.description}
                              onChange={(e) => {
                                const updated = [...deckSpaces]
                                updated[index].description = e.target.value
                                setDeckSpaces(updated)
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addDeckSpace}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deck Space
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="class" className="space-y-4">
              {/* Classification Society */}
              <Card>
                <CardHeader>
                  <CardTitle>Classification Society</CardTitle>
                  <CardDescription>Vessel classification and society information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="classificationSociety"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classification Society</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select classification society" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Major Classification Societies</SelectLabel>
                              <SelectItem value="lloyds-register">Lloyd's Register (LR)</SelectItem>
                              <SelectItem value="bureau-veritas">Bureau Veritas (BV)</SelectItem>
                              <SelectItem value="rina">RINA (Registro Italiano Navale)</SelectItem>
                              <SelectItem value="dnv">DNV (Det Norske Veritas / GL)</SelectItem>
                              <SelectItem value="abs">ABS (American Bureau of Shipping)</SelectItem>
                              <SelectItem value="ccs">CCS (China Classification Society)</SelectItem>
                              <SelectItem value="nk">NK (Nippon Kaiji Kyokai)</SelectItem>
                              <SelectItem value="kr">KR (Korean Register)</SelectItem>
                              <SelectItem value="prs">Polish Register of Shipping (PRS)</SelectItem>
                              <SelectItem value="turkish-lloyd">Turkish Lloyd</SelectItem>
                              <SelectItem value="croatian-register">Croatian Register of Shipping</SelectItem>
                              <SelectItem value="other">Other (manual entry)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="classificationStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classification Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select classification status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="classed">Classed</SelectItem>
                            <SelectItem value="not-classed">Not Classed</SelectItem>
                            <SelectItem value="built-to-class">Built to Class but Not Maintained</SelectItem>
                            <SelectItem value="de-classed">De-Classed / Withdrawn</SelectItem>
                            <SelectItem value="in-class-conditions">In Class with Conditions</SelectItem>
                            <SelectItem value="reclassification">Undergoing Reclassification</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Class Certificate Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Class Certificate Details</CardTitle>
                  <CardDescription>Classification certificate information and dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="initialClassificationDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Initial Classification</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastRenewalDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Last Renewal</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nextSurveyDue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Next Survey / Renewal Due</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="classNotations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Notation(s)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ✠100A1, MCA LY3" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter classification notations (e.g., ✠100A1, MCA LY3)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="classCertificateUpload"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Class Certificate</FormLabel>
                        <FormControl>
                          <Input type="file" accept=".pdf,.jpg,.png" {...field} />
                        </FormControl>
                        <FormDescription>
                          Upload PDF or image file of the class certificate
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Compliance Standards */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Standards</CardTitle>
                  <CardDescription>Select applicable compliance standards and certifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="mcaCommercialCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>MCA Commercial Code (LY2 / LY3 / MGN 280)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ismCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>ISM Code (International Safety Management)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ispsCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>ISPS Code (International Ship & Port Facility Security)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="mlc"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>MLC (Maritime Labour Convention)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="solas"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>SOLAS (Safety of Life at Sea)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="marpol"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>MARPOL (Marine Pollution Compliance)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ceCertification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>CE Certification (for EU-built vessels)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rcdRcr"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>RCD / RCR (Recreational Craft Directive)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="uscgDocumentation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>USCG Documentation (if applicable)</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Survey & Technical Records */}
              <Card>
                <CardHeader>
                  <CardTitle>Survey & Technical Records</CardTitle>
                  <CardDescription>Survey information and technical documentation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="surveyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Survey Completed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select survey type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full-survey">Full Survey</SelectItem>
                              <SelectItem value="partial-survey">Partial Survey</SelectItem>
                              <SelectItem value="pre-sale-survey">Pre-Sale Survey</SelectItem>
                              <SelectItem value="condition-valuation">Condition & Valuation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastSurveyDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Last Survey</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="surveyorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Surveyor Name / Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter surveyor details" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="surveyReportUpload"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Survey Report</FormLabel>
                        <FormControl>
                          <Input type="file" accept=".pdf" {...field} />
                        </FormControl>
                        <FormDescription>
                          Upload survey report in PDF format
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Additional Classification Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Classification Notes</CardTitle>
                  <CardDescription>Additional vessel classification and documentation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="iceClassRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ice Class Rating (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1A, 1AS, B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fireClassSafetyZones"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fire Class / Safety Zones</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter fire safety classification" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hullIdentificationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hull Identification Number (HIN)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter HIN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="stabilityDocumentationAvailable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Stability Documentation Available</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="loadLineCertificate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Load Line Certificate</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="flagStateInspectionRecord"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Flag State Inspection Record</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guest-rules-access" className="space-y-6">
              <TooltipProvider>
                {/* Section 1: Access Information */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h3 className="text-lg font-semibold">Access Information</h3>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="embarkationPort"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Embarkation Port</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter embarkation port" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="disembarkationPort"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Disembarkation Port</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter disembarkation port" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="embarkationTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Embarkation Time</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="disembarkationTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Disembarkation Time</FormLabel>
                                <FormControl>
                                  <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="boardingInstructionsRequired"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Boarding Instructions Required?</FormLabel>
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
                            name="captainsBriefingRequired"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Captain's Briefing Required Before Departure</FormLabel>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="crewAssistsWithLuggage"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Crew Assists with Luggage</FormLabel>
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
                            name="idRequiredAtCheckIn"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">ID Required at Check-in</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="shoreAccess"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shore Access (multi-select)</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["By Tender", "By Gangway", "Via Port Office", "Restricted Hours Only"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={option}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={option} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="marinaDockName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Marina/Dock Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter marina or dock name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Section 2: Navigation & Movement */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h3 className="text-lg font-semibold">Navigation & Movement</h3>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="yachtCanMoveDuringCharter"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Yacht Can Move During Charter</FormLabel>
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
                            name="itineraryCustomizable"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Itinerary Customizable</FormLabel>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="nightCruisingAllowed"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Night Cruising Allowed</FormLabel>
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
                            name="tenderUsePermittedByGuests"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Tender Use Permitted by Guests</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="cruisingRestrictions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cruising Restrictions (multi-select)</FormLabel>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {["Coastal Only", "International Waters Not Permitted", "Zone Restricted", "Owner's Approval Required", "None"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`cruise-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`cruise-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Section 3: Guest Use Rules */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h3 className="text-lg font-semibold">Guest Use Rules</h3>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="maxDayGuests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Day Guests</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="1" 
                                    max="100" 
                                    placeholder="12"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="maxNightGuests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Max Night Guests</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="1" 
                                    max="50" 
                                    placeholder="10"
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="extraGuestsRequireApproval"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Extra Guests Require Approval</FormLabel>
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
                            name="galleyUsePermitted"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Galley Use Permitted</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="bridgeAccessAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bridge Access Allowed (multi-select)</FormLabel>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {["Yes", "No", "With Captain Supervision"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`bridge-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`bridge-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                        <FormField
                          control={form.control}
                          name="crewQuartersAccess"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Crew Quarters Access</FormLabel>
                                <FormDescription>Allow guests access to crew quarters</FormDescription>
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
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>

                {/* Section 4: Children & Pets */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h3 className="text-lg font-semibold">Children & Pets</h3>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="childrenAllowed"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Children Allowed</FormLabel>
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
                            name="childproofingAvailable"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Childproofing Available</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="minimumAge"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Age</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="0" 
                                  max="18" 
                                  placeholder="0"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormDescription>Minimum age for children (0 = no restriction)</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petsAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pets Allowed (multi-select)</FormLabel>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {["Yes", "No", "Small Pets Only", "By Request Only"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`pets-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`pets-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pet Notes</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Additional notes about pet policies..."
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
                  </CollapsibleContent>
                </Collapsible>

                {/* Section 5: Behavior & Onboard Conduct */}
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <h3 className="text-lg font-semibold">Behavior & Onboard Conduct</h3>
                    <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <FormField
                          control={form.control}
                          name="smokingPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Smoking Policy (multi-select)</FormLabel>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {["Not Allowed", "Designated Areas Only", "Outdoor Only"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`smoking-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`smoking-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="vapingPermitted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Vaping Permitted</FormLabel>
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
                          name="shoesOnboard"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Shoes Onboard (multi-select)</FormLabel>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {["No Shoes", "Yacht Shoes Only", "No Restriction"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`shoes-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`shoes-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="alcoholPolicy"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2">
                                <FormLabel>Alcohol Policy (multi-select)</FormLabel>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>BYO = Bring Your Own alcohol</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {["BYO Allowed", "Crew Served Only", "Yacht-Stocked Bar"].map((option) => (
                                  <div key={option} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`alcohol-${option}`}
                                      checked={field.value?.includes(option) || false}
                                      onCheckedChange={(checked) => {
                                        const currentValue = field.value || []
                                        if (checked) {
                                          field.onChange([...currentValue, option])
                                        } else {
                                          field.onChange(currentValue.filter((v: string) => v !== option))
                                        }
                                      }}
                                    />
                                    <label htmlFor={`alcohol-${option}`} className="text-sm">{option}</label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="illegalSubstancesProhibited"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Illegal Substances Prohibited</FormLabel>
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
                            name="firearmsWeaponsNotAllowed"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Firearms / Weapons Not Allowed</FormLabel>
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
                            name="noPartiesWithoutApproval"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">No Parties Without Approval</FormLabel>
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
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              </TooltipProvider>
            </TabsContent>

            <TabsContent value="cabin-types" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cabin Types</CardTitle>
                  <CardDescription>Define the different cabin types available on your yacht. Defining the different types of cabins will automatically create Media upload sections for each cabin within the Media & Files tab</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cabinTypes.map((cabin, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Cabin Type {index + 1}</h4>
                        {cabinTypes.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCabinType(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-4">
                        {/* Deck Level */}
                        <div>
                          <label className="text-sm font-medium">Deck Level</label>
                          <Select
                            value={cabin.deckLevel}
                            onValueChange={(value) => {
                              const updated = [...cabinTypes]
                              updated[index].deckLevel = value
                              setCabinTypes(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select deck level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sun-deck">Sun Deck</SelectItem>
                              <SelectItem value="bridge-deck">Bridge Deck</SelectItem>
                              <SelectItem value="upper-deck">Upper Deck</SelectItem>
                              <SelectItem value="main-deck">Main Deck</SelectItem>
                              <SelectItem value="lower-deck">Lower Deck</SelectItem>
                              <SelectItem value="tank-crew-deck">Tank Deck / Crew Deck</SelectItem>
                              <SelectItem value="convertible-interior">Convertible Interior (e.g., Salon, Office)</SelectItem>
                              <SelectItem value="other">Other (Manual Entry)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Cabin Type */}
                        <div>
                          <label className="text-sm font-medium">Cabin Type</label>
                          <Select
                            value={cabin.cabinType}
                            onValueChange={(value) => {
                              const updated = [...cabinTypes]
                              updated[index].cabinType = value
                              setCabinTypes(updated)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select cabin type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Owner / VIP</SelectLabel>
                                <SelectItem value="master-cabin">Master Cabin / Owner's Suite</SelectItem>
                                <SelectItem value="vip-cabin">VIP Cabin / VIP Suite</SelectItem>
                                <SelectItem value="private-owners-deck">Private Owner's Deck Cabin</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Guest Cabins</SelectLabel>
                                <SelectItem value="double-cabin">Double Cabin</SelectItem>
                                <SelectItem value="twin-cabin">Twin Cabin</SelectItem>
                                <SelectItem value="convertible-twin-double">Convertible Twin/Double Cabin</SelectItem>
                                <SelectItem value="triple-cabin">Triple Cabin</SelectItem>
                                <SelectItem value="quad-family-cabin">Quad Cabin / Family Cabin</SelectItem>
                                <SelectItem value="pullman-cabin">Pullman Cabin</SelectItem>
                                <SelectItem value="bunk-bed-cabin">Bunk Bed Cabin</SelectItem>
                                <SelectItem value="accessible-cabin">Accessible Cabin</SelectItem>
                                <SelectItem value="cinema-convertible">Cinema Room Convertible Cabin</SelectItem>
                                <SelectItem value="office-convertible">Office Convertible Cabin</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Crew & Staff</SelectLabel>
                                <SelectItem value="captains-cabin">Captain's Cabin</SelectItem>
                                <SelectItem value="engineers-cabin">Engineer's Cabin</SelectItem>
                                <SelectItem value="officer-chief-stew">Officer / Chief Stew Cabin</SelectItem>
                                <SelectItem value="double-crew-cabin">Double Crew Cabin</SelectItem>
                                <SelectItem value="triple-crew-cabin">Triple Crew Cabin</SelectItem>
                                <SelectItem value="nanny-staff-cabin">Nanny / Staff Cabin</SelectItem>
                                <SelectItem value="security-escort-cabin">Security / Escort Cabin</SelectItem>
                              </SelectGroup>
                              
                              <SelectGroup>
                                <SelectLabel>Auxiliary Sleeping Areas</SelectLabel>
                                <SelectItem value="sofa-bed-convertible">Sofa Bed / Convertible Salon Cabin</SelectItem>
                                <SelectItem value="gym-spa-convertible">Gym / Spa Convertible Cabin</SelectItem>
                                <SelectItem value="guest-overflow">Guest Overflow Cabin</SelectItem>
                                <SelectItem value="childrens-cabin">Children's Cabin</SelectItem>
                                <SelectItem value="day-cabin">Day Cabin</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Bed Configuration */}
                        <div>
                          <label className="text-sm font-medium">Bed Configuration</label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {['King Bed', 'Queen Bed', 'Double Bed', 'Single Bed', 'Twin Beds', 'Bunk Beds (2+)', 'Pullman Bed', 'Sofa Bed', 'Custom'].map((bed) => (
                              <label key={bed} className="flex items-center space-x-2 text-sm">
                                <Checkbox
                                  checked={cabin.bedConfiguration?.includes(bed) || false}
                                  onCheckedChange={(checked) => {
                                    const updated = [...cabinTypes]
                                    if (!updated[index].bedConfiguration) {
                                      updated[index].bedConfiguration = []
                                    }
                                    if (checked) {
                                      updated[index].bedConfiguration = [...updated[index].bedConfiguration, bed]
                                    } else {
                                      updated[index].bedConfiguration = updated[index].bedConfiguration.filter(b => b !== bed)
                                    }
                                    setCabinTypes(updated)
                                  }}
                                />
                                <span>{bed}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Cabin Features */}
                        <div>
                          <label className="text-sm font-medium">Cabin Features</label>
                          <div className="grid grid-cols-3 gap-2 mt-2">
                            {[
                              'Ensuite Bathroom', 'Shared Bathroom', 'Shower', 'Bathtub', 'Walk-in Closet', 'Vanity / Desk',
                              'Sofa Seating Area', 'Sea View / Windows', 'Porthole Only', 'Balcony / Terrace', 'Skylight / Overhead Hatch',
                              'Entertainment System', 'Soundproofing / Acoustic Treatment', 'Direct Access to Deck / Salon',
                              'Private Office or Lounge', 'Safe / Lockbox', 'Accessible / Mobility Friendly'
                            ].map((feature) => (
                              <label key={feature} className="flex items-center space-x-2 text-sm">
                                <Checkbox
                                  checked={cabin.cabinFeatures?.includes(feature) || false}
                                  onCheckedChange={(checked) => {
                                    const updated = [...cabinTypes]
                                    if (!updated[index].cabinFeatures) {
                                      updated[index].cabinFeatures = []
                                    }
                                    if (checked) {
                                      updated[index].cabinFeatures = [...updated[index].cabinFeatures, feature]
                                    } else {
                                      updated[index].cabinFeatures = updated[index].cabinFeatures.filter(f => f !== feature)
                                    }
                                    setCabinTypes(updated)
                                  }}
                                />
                                <span>{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Basic Info Grid */}
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="text-sm font-medium">Cabin Name</label>
                            <Input
                              placeholder="e.g., Master Suite, VIP Cabin"
                              value={cabin.name}
                              onChange={(e) => {
                                const updated = [...cabinTypes]
                                updated[index].name = e.target.value
                                setCabinTypes(updated)
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Sleeps (Pax Count)</label>
                            <Input
                              type="number"
                              placeholder="2"
                              min="1"
                              max="10"
                              value={cabin.sleeps}
                              onChange={(e) => {
                                const updated = [...cabinTypes]
                                updated[index].sleeps = parseInt(e.target.value) || 1
                                setCabinTypes(updated)
                              }}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Input
                              placeholder="Brief description"
                              value={cabin.description}
                              onChange={(e) => {
                                const updated = [...cabinTypes]
                                updated[index].description = e.target.value
                                setCabinTypes(updated)
                              }}
                            />
                          </div>
                        </div>

                        {/* Optional Media Upload per Cabin */}
                        <div className="border-t pt-4">
                          <h5 className="font-medium text-sm mb-3">Optional Media Upload per Cabin</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">360° Virtual Tour</label>
                              <Input
                                type="file"
                                accept=".jpg,.jpeg,.png"
                                placeholder="Upload 360° tour"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Photos</label>
                              <Input
                                type="file"
                                multiple
                                accept=".jpg,.jpeg,.png"
                                placeholder="Upload photos"
                              />
                            </div>
                          </div>
                          <div className="mt-2">
                            <label className="text-sm font-medium">Floorplan / Layout</label>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              placeholder="Upload floorplan"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addCabinType}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cabin Type
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-6">
              {/* Interior Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Interior Amenities</CardTitle>
                  <CardDescription>Select interior features available on your yacht</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="interiorAmenities"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Main Salon", "Formal Dining Area", "Skylounge / Upper Salon", "Cinema / Movie Room",
                            "Library / Study / Office", "Wine Cellar / Humidor", "Bar (Interior)", "Observation Lounge",
                            "Fireplace", "Elevator / Lift", "Onboard Art Collection", "Grand Piano",
                            "Aquarium", "Interior Sound System", "Smart Home Controls", "Air Conditioning", "Heating System"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="interiorAmenities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Accommodation Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Accommodation Features</CardTitle>
                  <CardDescription>Select accommodation features and amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="accommodationFeatures"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Owner's Suite", "VIP Suites", "Ensuite Bathrooms", "Walk-in Closets",
                            "Massage Room", "Hammam / Steam Room", "Sauna", "Interior Jacuzzi"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="accommodationFeatures"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Exterior Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Exterior Amenities</CardTitle>
                  <CardDescription>Select exterior features and deck amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="exteriorAmenities"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Sun Deck with Loungers", "Exterior Jacuzzi", "Infinity Pool / Plunge Pool", "Al Fresco Dining Area",
                            "Outdoor Bar / BBQ", "Beach Club", "Fold-Down Balconies", "Swim Platform",
                            "On-Deck Showers", "Day Beds / Cabana Setup", "Outdoor Cinema", "Fire Pit",
                            "Open-Air Gym", "Helipad", "Outdoor Sound System", "Deck Shade Awnings",
                            "Underwater Lighting", "Heated Decks"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="exteriorAmenities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Wellness & Fitness */}
              <Card>
                <CardHeader>
                  <CardTitle>Wellness & Fitness</CardTitle>
                  <CardDescription>Select wellness and fitness facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="wellnessAndFitness"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Fully Equipped Gym", "Yoga / Pilates Area", "Spa / Treatment Room", "Hammam / Sauna / Steam Room",
                            "Beauty Salon", "Massage Therapist Cabin", "Medical Room"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="wellnessAndFitness"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Entertainment & Tech */}
              <Card>
                <CardHeader>
                  <CardTitle>Entertainment & Tech</CardTitle>
                  <CardDescription>Select entertainment and technology features</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="entertainmentTech"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Satellite TV / Streaming", "High-Speed Wi-Fi", "Gaming Console", "Karaoke System",
                            "DJ Booth", "Drone Equipment", "Conference Room", "Media Server / Apple TV", "Tablet / iPad Controls"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="entertainmentTech"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Galley & Culinary Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Galley & Culinary Features</CardTitle>
                  <CardDescription>Select galley and culinary amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="galleyFeatures"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Commercial Galley", "Teppanyaki Grill", "Pizza Oven", "Wine Cellar / Fridge",
                            "Juice Bar", "Chef's Table", "Cold Room", "Walk-In Freezer"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="galleyFeatures"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Water Toys – Motorized */}
              <Card>
                <CardHeader>
                  <CardTitle>Water Toys – Motorized</CardTitle>
                  <CardDescription>Select motorized water toys and equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="waterToysMotorized"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Jet Skis", "Seabobs", "eFoils / Fliteboards", "Jet Surfboards",
                            "Hoverboards", "Tenders", "Waterski Equipment", "Towables (Donuts, Tubes)",
                            "RIBs / Chase Boats", "Mini-Sub / Submarine", "Underwater Scooters"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="waterToysMotorized"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Water Toys – Non-Motorized */}
              <Card>
                <CardHeader>
                  <CardTitle>Water Toys – Non-Motorized</CardTitle>
                  <CardDescription>Select non-motorized water toys and equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="waterToysNonMotorized"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Kayaks", "Paddleboards / SUPs", "Windsurfers", "Surfboards",
                            "Kiteboarding Gear", "Snorkeling Gear", "Scuba Diving Equipment", "Inflatable Water Park",
                            "Floating Pool / Jellyfish Net", "Beach Setups", "Fishing Gear"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="waterToysNonMotorized"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Adventure & Exploration Gear */}
              <Card>
                <CardHeader>
                  <CardTitle>Adventure & Exploration Gear</CardTitle>
                  <CardDescription>Select adventure and exploration equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="adventureGear"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Dive Compressor", "Rebreathers", "Diving Suits", "Underwater Cameras",
                            "FPV Drones", "Expedition Tools", "Snowmobiles", "Bikes",
                            "Off-Road Vehicles", "Jetpack / Flyboard", "Helicopter", "Support Vessel"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="adventureGear"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Crew & Support Features */}
              <Card>
                <CardHeader>
                  <CardTitle>Crew & Support Features</CardTitle>
                  <CardDescription>Select crew and support services</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="crewSupport"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Dedicated Crew Quarters", "Captain's Cabin", "Crew Mess & Lounge", "Onboard Chef",
                            "Masseuse / Spa Therapist", "Dive Instructor", "Watersports Instructor", "Personal Trainer",
                            "Nanny / Children's Staff", "Event Host / DJ"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="crewSupport"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Certifications & Special Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Special Capabilities</CardTitle>
                  <CardDescription>Select certifications and special capabilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="certificationsCapabilities"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {[
                            "Commercial Charter Compliant", "MCA / MLC Certified", "Wheelchair Accessible", "Pet-Friendly",
                            "Zero-Speed Stabilizers", "Cruising Permit (Specific Regions)", "Winterized / Ice Class", "Green Tech (Hybrid, Solar, etc.)"
                          ].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="certificationsCapabilities"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item])
                                            : field.onChange(field.value?.filter((value: string) => value !== item))
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">{item}</FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media-files" className="space-y-6">
              {/* Yacht Media (Main Property) */}
              <Card>
                <CardHeader>
                  <CardTitle>Yacht Media (Main Property)</CardTitle>
                  <CardDescription>Upload general media assets that represent the yacht as a whole</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 360 Virtual Tours */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      360 Virtual Tours
                    </h4>
                    {yachtVirtualTours.map((tour, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Tour {index + 1}</span>
                          {yachtVirtualTours.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeYachtVirtualTour(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Tour Name</label>
                            <Input
                              placeholder="e.g., Main Deck Tour"
                              value={tour.name}
                              onChange={(e) => updateYachtVirtualTour(index, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">URL Link</label>
                            <Input
                              placeholder="https://..."
                              value={tour.url}
                              onChange={(e) => updateYachtVirtualTour(index, 'url', e.target.value)}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium">File Upload</label>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">Drag and drop video files here, or</p>
                            <Input
                              type="file"
                              accept=".mp4,.mov,.avi"
                              className="hidden"
                              id={`tour-upload-${index}`}
                              onChange={(e) => updateYachtVirtualTour(index, 'file', e.target.files?.[0])}
                            />
                            <label
                              htmlFor={`tour-upload-${index}`}
                              className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Choose File
                            </label>
                            <p className="text-xs text-muted-foreground mt-2">MP4, MOV, AVI up to 100MB</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={addYachtVirtualTour}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Tour
                    </Button>
                  </div>

                  {/* Photos */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Photos
                    </h4>
                    <div>
                      <label className="text-sm font-medium">Upload Photos</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Image className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop images here, or</p>
                        <Input type="file" multiple accept="image/*" className="hidden" id="photos-upload" />
                        <label
                          htmlFor="photos-upload"
                          className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">JPG, PNG, WEBP up to 10MB each</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Photo URLs</label>
                      <Textarea placeholder="Enter photo URLs (one per line)" />
                    </div>
                  </div>

                  {/* Videos */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Videos
                    </h4>
                    <div>
                      <label className="text-sm font-medium">Upload Videos</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop videos here, or</p>
                        <Input type="file" multiple accept="video/*" className="hidden" id="videos-upload" />
                        <label
                          htmlFor="videos-upload"
                          className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">MP4, MOV, AVI up to 100MB each</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Video URLs (YouTube, Vimeo)</label>
                      <Textarea placeholder="Enter video URLs (one per line)" />
                    </div>
                  </div>

                  {/* Drone Footage */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Plane className="h-4 w-4" />
                      Drone Footage
                    </h4>
                    <div>
                      <label className="text-sm font-medium">Upload Drone Videos</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <Plane className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop drone footage here, or</p>
                        <Input type="file" multiple accept="video/*" className="hidden" id="drone-upload" />
                        <label
                          htmlFor="drone-upload"
                          className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">MP4, MOV, AVI up to 100MB each</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Drone Footage URLs</label>
                      <Textarea placeholder="Enter drone footage URLs (one per line)" />
                    </div>
                  </div>

                  {/* Floor Plans */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Floor Plans
                    </h4>
                    <div>
                      <label className="text-sm font-medium">Upload Floor Plans</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop floor plans here, or</p>
                        <Input type="file" multiple accept=".pdf,.jpg,.png" className="hidden" id="floorplans-upload" />
                        <label
                          htmlFor="floorplans-upload"
                          className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">PDF, JPG, PNG up to 25MB each</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Floor Plan URLs</label>
                      <Textarea placeholder="Enter floor plan URLs (one per line)" />
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Documents
                    </h4>
                    <div>
                      <label className="text-sm font-medium">Upload Documents</label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">Drag and drop documents here, or</p>
                        <Input type="file" multiple accept=".pdf,.doc,.docx" className="hidden" id="documents-upload" />
                        <label
                          htmlFor="documents-upload"
                          className="inline-flex items-center px-3 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Files
                        </label>
                        <p className="text-xs text-muted-foreground mt-2">PDF, DOC, DOCX up to 25MB each</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Document URLs</label>
                      <Textarea placeholder="Enter document URLs (one per line)" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deck Spaces Media */}
              {deckSpaces.length > 0 && deckSpaces.some(space => space.name) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Media for Deck Spaces</CardTitle>
                    <CardDescription>Upload media for each deck space you've defined</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {deckSpaces.filter(space => space.name).map((space, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium">{space.name}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">360 Virtual Tours</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" accept="video/*" className="hidden" id={`deck-tour-${index}`} />
                              <label
                                htmlFor={`deck-tour-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose File
                              </label>
                            </div>
                            <Input placeholder="Tour URL" className="mt-2" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Photos</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Image className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" multiple accept="image/*" className="hidden" id={`deck-photos-${index}`} />
                              <label
                                htmlFor={`deck-photos-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose Files
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Videos</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Video className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" multiple accept="video/*" className="hidden" id={`deck-videos-${index}`} />
                              <label
                                htmlFor={`deck-videos-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose Files
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Drone Footage</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Plane className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" multiple accept="video/*" className="hidden" id={`deck-drone-${index}`} />
                              <label
                                htmlFor={`deck-drone-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose Files
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Cabin Types Media */}
              {cabinTypes.length > 0 && cabinTypes.some(cabin => cabin.name) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Media for Cabin Types</CardTitle>
                    <CardDescription>Upload media for each cabin type you've defined</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {cabinTypes.filter(cabin => cabin.name).map((cabin, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <h4 className="font-medium">{cabin.name}</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">360 Virtual Tour (Required)</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" accept="video/*" className="hidden" id={`cabin-tour-${index}`} />
                              <label
                                htmlFor={`cabin-tour-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose File
                              </label>
                            </div>
                            <Input placeholder="Tour URL" className="mt-2" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Cabin Photos</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Image className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" multiple accept="image/*" className="hidden" id={`cabin-photos-${index}`} />
                              <label
                                htmlFor={`cabin-photos-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose Files
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Walkthrough Video</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <Video className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" accept="video/*" className="hidden" id={`cabin-video-${index}`} />
                              <label
                                htmlFor={`cabin-video-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Floor Plan</label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                              <FileText className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                              <Input type="file" accept=".pdf,.jpg,.png" className="hidden" id={`cabin-floorplan-${index}`} />
                              <label
                                htmlFor={`cabin-floorplan-${index}`}
                                className="inline-flex items-center px-2 py-1 border border-primary text-primary rounded text-xs font-medium hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox />
                          <label className="text-sm">Mark as featured media for this cabin</label>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Save as Draft */}
              <div className="flex justify-center">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
              </div>
            </TabsContent>


            <TabsContent value="access" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Access Permissions</CardTitle>
                  <CardDescription>Define which areas guests can access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cabinAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cabins</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="guest_only">Guest Cabins Only</SelectItem>
                              <SelectItem value="owner_locked">Owner's Cabin Locked</SelectItem>
                              <SelectItem value="all_access">All Access</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="galleyAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Galley (Kitchen)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="guest_allowed">Guest Use Allowed</SelectItem>
                              <SelectItem value="crew_only">Crew Only</SelectItem>
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
                      name="bridgeAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bridge / Helm Station</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_access">No Access</SelectItem>
                              <SelectItem value="tour_with_captain">Tour Allowed with Captain</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tenderGarage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tender Garage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_access">No Access</SelectItem>
                              <SelectItem value="crew_only">With Crew Only</SelectItem>
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
                      name="swimPlatform"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Swim Platform</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="open_access">Open Access</SelectItem>
                              <SelectItem value="supervision_only">With Supervision Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="waterToys"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Water Toys</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free_use">Free Use</SelectItem>
                              <SelectItem value="with_crew">With Crew</SelectItem>
                              <SelectItem value="rental_charges">Rental Charges May Apply</SelectItem>
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
                      name="jacuzziAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jacuzzi / Spa</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="crew_supervision">Crew Supervision Required</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="wifiAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Wi-Fi Access</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="free">Free</SelectItem>
                              <SelectItem value="limited">Limited</SelectItem>
                              <SelectItem value="extra_charge">Extra Charge Applies</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cleaning" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cleaning & Maintenance Rules</CardTitle>
                  <CardDescription>Set policies for housekeeping and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dailyHousekeeping"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Daily Housekeeping</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="included">Included</SelectItem>
                              <SelectItem value="optional">Optional</SelectItem>
                              <SelectItem value="extra_charge">Extra Charge</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="laundryService"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Laundry Service</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="available">Available</SelectItem>
                              <SelectItem value="not_available">Not Available</SelectItem>
                              <SelectItem value="charges_apply">Charges Apply</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cleaningFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post-Charter Cleaning Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Included in charter rate or €500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="crewTipGuidelines"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crew Tip Guidelines</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10-15% of charter fee" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="safety" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Information</CardTitle>
                  <CardDescription>Comprehensive safety equipment, certifications, and protocols</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <TooltipProvider>
                    {/* Section 1: General Safety Equipment */}
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">General Safety Equipment</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="certifiedLifejackets"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Certified Lifejackets (incl. child sizes)
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="inflatableLifeRafts"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Inflatable Life Rafts
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="epirb"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      EPIRB (Emergency Beacon)
                                      <HelpCircle className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Emergency Position Indicating Radio Beacon
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="fireExtinguishers"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Fire Extinguishers (in all areas)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="fireSuppressionSystem"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Fire Suppression System (engine room/galley)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="smokeCoDetectors"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Smoke & CO2 Detectors
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyFlares"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Emergency Flares & Signal Devices
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="satellitePhone"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Satellite Phone / Emergency Comms System
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="aedDefibrillator"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      AED / Defibrillator
                                      <HelpCircle className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Automated External Defibrillator
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="firstAidKit"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  First Aid Kit (up-to-date)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyLighting"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Emergency Lighting
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="musterStation"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Muster Station / Assembly Area
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        {form.watch("inflatableLifeRafts") && (
                          <FormField
                            control={form.control}
                            name="lifeRaftCapacity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Life Raft Capacity</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 12 persons" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}

                        <FormField
                          control={form.control}
                          name="generalSafetyNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (General Safety)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Replaced AED in 2024, Life rafts serviced annually..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Section 2: Crew Certifications & Protocols */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">Crew Certifications & Protocols</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="captainCommercialLicense"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      Captain holds valid commercial license (STCW/MCA)
                                      <HelpCircle className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Standards of Training, Certification and Watchkeeping / Maritime and Coastguard Agency
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="crewStcwCertified"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  All crew are STCW certified
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="safetyBriefingRequired"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Safety briefing required on embarkation
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="trainedMedicalResponder"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Trained medical responder onboard
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="regularSafetyDrills"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Regular crew safety drills conducted
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="evacuationPlanPosted"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Posted emergency evacuation plan
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="childElderlySafetyProcedures"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Child/elderly safety procedures in place
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="crewCertificationNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Crew Certifications)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Captain has 15 years experience, Chief Officer is certified paramedic..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Section 3: Fire & Electrical Safety */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">Fire & Electrical Safety</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="fireproofMaterials"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Fireproof cabin and interior materials
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="fireRetardantUpholstery"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Fire retardant upholstery and fabrics
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="galleyFireSuppression"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Galley fire suppression system
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="circuitBreakers"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Circuit breakers with surge protection
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="engineRoomSealed"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Engine room is sealed and fire-rated
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="smokeAlarmsAllAreas"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Smoke alarms in all guest and crew areas
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="batteryCutoffSystems"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Battery cutoff and isolation systems
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="fireElectricalSafetyNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Fire & Electrical Safety)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Fire suppression system serviced 2024, All electrical systems inspected annually..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Section 4: Navigational Safety */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">Navigational Safety</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="aisRadarGpsActive"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      AIS, radar, and GPS active
                                      <HelpCircle className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Automatic Identification System for vessel tracking
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="stabilizers"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Stabilizers (zero-speed or underway)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="weatherMonitoring"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Weather monitoring system
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="redundantNavigation"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Dual/redundant navigation systems
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="vhfRadioBridge24_7"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  VHF radio and bridge watch active 24/7
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="bridgeAccessRestricted"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Bridge access restricted while underway
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="navigationalSafetyNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Navigational Safety)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Dual GPS systems installed, Weather routing software updated..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Section 5: Physical & Deck Safety */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">Physical & Deck Safety</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="nonSlipDeckSurfaces"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Non-slip deck surfaces
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="childSafeRailings"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Child-safe railings or safety nets
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="grabHandles"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Grab handles on stairs and bathrooms
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="swimmingZonesMarked"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Swimming zones clearly marked
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="waterToysSupervised"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Use of water toys supervised
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="antiJellyfishPool"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Anti-jellyfish pool available
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="deckLightingNight"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Deck lighting at night
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="uvProtectedAreas"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  UV-protected outdoor shaded areas
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="physicalDeckSafetyNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Physical & Deck Safety)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., New non-slip coating applied 2024, Safety nets installed for families..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Section 6: Medical & Sanitation Preparedness */}
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
                        <h3 className="text-lg font-semibold">Medical & Sanitation Preparedness</h3>
                        <ChevronDown className="h-4 w-4" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="p-4 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="medicalGradeFirstAid"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Medical-grade first aid kit onboard
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dedicatedMedicalStorage"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Dedicated medical storage area
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="nearbyHospitalsListed"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  <Tooltip>
                                    <TooltipTrigger className="flex items-center gap-1">
                                      Nearby hospitals/ports listed in SOP
                                      <HelpCircle className="h-3 w-3" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Standard Operating Procedures
                                    </TooltipContent>
                                  </Tooltip>
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="nurseMedicOnboard"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Nurse/medic onboard (full-time or on-call)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyEvacuationPlan"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Emergency evacuation plan available (sea/air)
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="sanitizerStations"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Sanitizer stations onboard
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="healthSanitationProtocols"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-2">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  Covid-19 / health sanitation protocols enforced
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="medicalSanitationNotes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes (Medical & Sanitation)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="e.g., Crew member certified in advanced first aid, helicopter landing zone available..." 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Verified by Captain Toggle */}
                    <div className="pt-4 border-t">
                      <FormField
                        control={form.control}
                        name="verifiedByCaptain"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">
                                Verified by Captain
                              </FormLabel>
                              <FormDescription>
                                Confirm that this safety information has been verified by the vessel's captain or qualified officer
                              </FormDescription>
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
                    <div className="pt-4 border-t">
                      <FormField
                        control={form.control}
                        name="verifiedByCaptain"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base font-medium">
                                Verified by Captain
                              </FormLabel>
                              <FormDescription>
                                Confirm that this safety information has been verified by the vessel's captain or qualified officer
                              </FormDescription>
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
                  </TooltipProvider>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Location-Based Rules</CardTitle>
                  <CardDescription>Set geographical and location restrictions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="allowedRegions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allowed Cruising Regions</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Amalfi Coast only, French Riviera, Balearic Islands..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="portAccessRules"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Port Access Rules</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="restricted">Restricted Ports</SelectItem>
                              <SelectItem value="prebooked_only">Pre-booked Marina Only</SelectItem>
                              <SelectItem value="open">Open Access</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="overnightAnchor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overnight at Anchor Allowed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="weather_dependent">Weather Dependent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="dockingPermitted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Docking Permitted During Charter</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="captain_discretion">Captain's Discretion</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="legal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Legal, Insurance & Financial Terms</CardTitle>
                  <CardDescription>Configure legal and financial requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="securityDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="insuranceCoverage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Insurance Coverage</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="covered">Charter Liability Covered</SelectItem>
                              <SelectItem value="recommended">Travel Insurance Recommended</SelectItem>
                              <SelectItem value="required">Travel Insurance Required</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {form.watch("securityDeposit") === "yes" && (
                    <FormField
                      control={form.control}
                      name="depositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit Amount</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., €10,000 or 20% of charter rate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="vatHandling"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VAT / Tax Handling</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="included">Included</SelectItem>
                              <SelectItem value="not_included">Not Included</SelectItem>
                              <SelectItem value="on_request">On Request</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="apaPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advance Provisioning Allowance (%)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormDescription>Percentage of charter rate (typically 30%)</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Yacht Documents</CardTitle>
                  <CardDescription>Upload and manage official yacht documents organized by category with security controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Charter-Specific Documents */}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="charter-specific">
                      <AccordionTrigger className="text-lg font-semibold">
                        🔝 Charter-Specific Documents
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "Charter Brochure / PDF", field: "charterBrochure", description: "Marketing or overview document for guests" },
                          { name: "Sample Charter Contract", field: "sampleCharterContract", description: "MYBA, IYBA, or custom contract template" },
                          { name: "APA Guidelines / Provisions Policy", field: "apaGuidelines", description: "Outline of how APA is managed" },
                          { name: "Guest Welcome Pack / Yacht Manual", field: "guestWelcomePack", description: "Includes rules, crew contact, itinerary, etc." },
                          { name: "Crew List & CVs", field: "crewListCvs", description: "Full crew profiles in PDF or spreadsheet" },
                          { name: "Sample Menus", field: "sampleMenus", description: "Optional culinary previews" },
                          { name: "Watersports & Toy Waivers", field: "watersportWaivers", description: "Jet ski licenses, dive waivers, etc." }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🔓 Public – No PIN Required" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input - Only show when PIN Required options are selected */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Optional & Marketing Documents */}
                    <AccordionItem value="marketing-optional">
                      <AccordionTrigger className="text-lg font-semibold">
                        🔝 Optional & Marketing Documents
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "Builder's Brochure (PDF)", field: "buildersBrochure", description: "Original promotional material" },
                          { name: "Interior Design Documentation", field: "interiorDesignDocs", description: "Schematics, drawings, branded specs" },
                          { name: "Awards or Press Mentions", field: "awardsPress", description: "PDF clippings or screenshots" },
                          { name: "3D Tour / Matterport URL Document", field: "threeDTour", description: "PDF or .txt file with tour links or instructions" },
                          { name: "Owner's Notes or Vessel Letter", field: "ownerNotes", description: "Custom comments, care notes, personal overview" }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🔓 Public – No PIN Required" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Legal & Ownership Documents */}
                    <AccordionItem value="legal-ownership">
                      <AccordionTrigger className="text-lg font-semibold">
                        📂 Legal & Ownership Documents
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "Certificate of Registry", field: "certificateOfRegistry", description: "Flag and jurisdiction details" },
                          { name: "Bill of Sale", field: "billOfSale", description: "For ownership transfer verification" },
                          { name: "Builder's Certificate", field: "buildersCertificate", description: "Original manufacturing certificate" },
                          { name: "Proof of Ownership", field: "proofOfOwnership", description: "Generic document upload field" },
                          { name: "Certificate of Incorporation", field: "certificateOfIncorporation", description: "For legal entity listing" },
                          { name: "VAT Status Documentation", field: "vatStatusDocs", description: "Paid/exempt declarations" },
                          { name: "Charter License", field: "charterLicense", description: "Regional or flag authority licenses" },
                          { name: "Local Cruising Permits", field: "cruisingPermits", description: "Temporary or area-based charter approvals" }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🧑‍💼 Broker-Only – No PIN" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Compliance & Classification Documents */}
                    <AccordionItem value="compliance-classification">
                      <AccordionTrigger className="text-lg font-semibold">
                        📂 Compliance & Classification Documents
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "Class Certificate (BV, Lloyd's, etc.)", field: "classCertificate", description: "Required for many commercial charters" },
                          { name: "Tonnage Certificate", field: "tonnageCertificate", description: "GT and NT data" },
                          { name: "Load Line Certificate", field: "loadLineCertificate", description: "Required for >24m vessels" },
                          { name: "MCA LY2 / LY3 / MLC 2006 Cert", field: "mcaCertificate", description: "Compliance with crew and safety standards" },
                          { name: "ISM Compliance Certificate", field: "ismCertificate", description: "Safety management standard" },
                          { name: "Fire & Safety Equipment Log", field: "fireAndSafetyLog", description: "Current or last audit log" },
                          { name: "Charter Insurance Certificate", field: "charterInsurance", description: "Commercial P&I or hull coverage" },
                          { name: "Survey Reports (last 3–5 years)", field: "surveyReports", description: "Full or summary inspections" }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🧑‍💼 Broker-Only – No PIN" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Technical & Operational Documentation */}
                    <AccordionItem value="technical-operational">
                      <AccordionTrigger className="text-lg font-semibold">
                        📂 Technical & Operational Documentation
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "General Arrangement Plan (GA)", field: "generalArrangementPlan", description: "Deck-by-deck layout" },
                          { name: "Stability Booklet", field: "stabilityBooklet", description: "Required for charter and class" },
                          { name: "Engine Room Schematics", field: "engineRoomSchematics", description: "Tech layout for engineers or surveyors" },
                          { name: "Electrical System Diagram", field: "electricalSystemDiagram", description: "For refits or resale reviews" },
                          { name: "Technical Specification Sheet", field: "technicalSpecSheet", description: "Central doc for full build info" }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🧑‍💼 Broker-Only – No PIN" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Maintenance & Refit History */}
                    <AccordionItem value="maintenance-refit">
                      <AccordionTrigger className="text-lg font-semibold">
                        📂 Maintenance & Refit History
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {[
                          { name: "Engine Service Reports", field: "engineServiceReports", description: "Manufacturer or shipyard certified" },
                          { name: "Generator Service Logs", field: "generatorServiceLogs", description: "Same as above" },
                          { name: "Dry Dock / Haul-Out Reports", field: "dryDockReports", description: "Summary or full invoices" },
                          { name: "Refit History & Invoices", field: "refitHistory", description: "Include date ranges and value (if possible)" },
                          { name: "ISM / Safety Drill Records", field: "ismSafetyRecords", description: "Charter readiness indicator" }
                        ].map((doc) => (
                          <div key={doc.field} className="p-4 border rounded-lg bg-muted/30 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">{doc.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">📎</Badge>
                                <span className="text-sm text-muted-foreground">⚠️ Missing</span>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-xs">Last Updated</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Expiry Date</Label>
                                <Input type="date" className="h-8" />
                              </div>
                              <div>
                                <Label className="text-xs">Visibility & Access Control</Label>
                                <Select>
                                  <SelectTrigger className="h-8">
                                    <SelectValue placeholder="🧑‍💼 Broker-Only – No PIN" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public-no-pin">🔓 Public – No PIN Required</SelectItem>
                                    <SelectItem value="public-pin-required">🔓 Public – PIN Required</SelectItem>
                                    <SelectItem value="broker-only-no-pin">🧑‍💼 Broker-Only – No PIN</SelectItem>
                                    <SelectItem value="broker-only-pin-required">🧑‍💼 Broker-Only – PIN Required</SelectItem>
                                    <SelectItem value="private-no-pin">🔒 Private – No PIN</SelectItem>
                                    <SelectItem value="private-pin-required">🔒 Private – PIN Required for Viewing/Download</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            {/* Conditional PIN Input */}
                            <div className="space-y-2">
                              <div>
                                <Label className="text-xs">Enter PIN Code</Label>
                                <div className="flex gap-2">
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    className="h-8 flex-1"
                                    maxLength={10}
                                    minLength={4}
                                  />
                                  <div className="flex items-center gap-1">
                                    <Checkbox id={`show-pin-${doc.field}`} />
                                    <Label htmlFor={`show-pin-${doc.field}`} className="text-xs">Show PIN</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm">
                                  <Upload className="h-4 w-4 mr-1" />
                                  Upload
                                </Button>
                                <div className="flex items-center gap-1">
                                  <Checkbox id={`download-${doc.field}`} />
                                  <Label htmlFor={`download-${doc.field}`} className="text-xs">Allow Download</Label>
                                </div>
                              </div>
                              <Button type="button" variant="ghost" size="sm">
                                📤 Generate Link
                              </Button>
                            </div>
                            
                            <div>
                              <Label className="text-xs">Notes</Label>
                              <Textarea placeholder="Additional comments..." className="h-20" />
                            </div>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {/* Global Actions */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4">Batch Operations</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" size="sm">
                        📁 Upload Multiple Files
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        🔄 Request Missing Documents
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        📧 Send Document Package
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        🔗 Generate Master Share Link
                      </Button>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="management" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Access Management</CardTitle>
                  <CardDescription>Platform-level settings for your yacht listing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="visibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visibility</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="invite_only">Invite-only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bookingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Booking Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="instant_book">Instant Book</SelectItem>
                              <SelectItem value="request_to_book">Request to Book</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Conditional PIN fields for Private visibility */}
                  {form.watch("visibility") === "private" && (
                    <div className="p-4 border rounded-lg bg-muted/30 space-y-4">
                      <h4 className="font-medium text-foreground">Private Access Settings</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="privatePinCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Create PIN Code</FormLabel>
                              <div className="flex gap-2">
                                <FormControl>
                                  <Input 
                                    type="password"
                                    placeholder="4-10 characters" 
                                    {...field}
                                    maxLength={10}
                                    minLength={4}
                                  />
                                </FormControl>
                                <div className="flex items-center gap-1">
                                  <Checkbox id="show-management-pin" />
                                  <Label htmlFor="show-management-pin" className="text-xs">Show PIN</Label>
                                </div>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="pinRequestEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email for PIN Requests</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="contact@example.com" 
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-xs text-amber-600">
                                ⚠️ This email is visible to admin only
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="hostApproval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Host Approval Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coBrokerage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Co-Brokerage Allowed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="with_agreement">With Agreement</SelectItem>
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
                      name="virtualTourAccess"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Virtual Tour Access</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public</SelectItem>
                              <SelectItem value="logged_in">Logged-in Users Only</SelectItem>
                              <SelectItem value="on_request">On Request</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="reviewsVisible"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reviews Visible</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
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
                      name="guestIdVerification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest ID Verification Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ndaRequired"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>NDA Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="celebrities_only">For Celebrities/VIP Guests Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
              </div>
            </div>
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}