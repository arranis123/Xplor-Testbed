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
import { useToast } from "@/hooks/use-toast"
import { Plus, X, Upload, Link, Image, Video, FileText, Plane, Ship, Settings, Users, Shield, Home, Anchor, Star } from "lucide-react"
import { cn } from "@/lib/utils"

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

  // Guest Rules
  maxGuestsSleeping: z.number().min(1).max(50),
  maxGuestsDayUse: z.number().min(1).max(100),
  childrenAllowed: z.enum(["yes", "no", "with_nanny"]),
  petsAllowed: z.enum(["yes", "no", "on_request"]),
  smokingAllowed: z.enum(["yes", "no", "outdoor_only"]),
  alcoholConsumption: z.enum(["permitted", "on_request", "not_allowed"]),
  shoesOnboard: z.enum(["allowed", "no_shoes", "interior_only"]),
  quietHoursStart: z.string(),
  quietHoursEnd: z.string(),
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

  // Safety & Security
  lifeJackets: z.literal("yes"),
  safetyBriefing: z.enum(["mandatory", "optional"]),
  firstAidTrained: z.enum(["yes", "no"]),
  securityCameras: z.enum(["yes", "no"]),
  camerasLocation: z.string().optional(),
  fireSuppressionSystems: z.literal("yes"),
  nightWatch: z.enum(["crew_duty", "port_security", "none"]),
  alcoholRestrictionNavigation: z.enum(["yes", "no"]),

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
  
  // State for active section navigation
  const [activeSection, setActiveSection] = useState("yacht-info")
  
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

  // Navigation sections
  const sections = [
    { id: "yacht-info", title: "Yacht Info", icon: Ship },
    { id: "pricing", title: "Pricing", icon: FileText },
    { id: "class", title: "Class", icon: Shield },
    { id: "guest-rules", title: "Guest Rules", icon: Users },
    { id: "access", title: "Access", icon: Settings },
    { id: "safety", title: "Safety", icon: Shield },
    { id: "cabin-types", title: "Cabin Types", icon: Home },
    { id: "deck-spaces", title: "Deck Spaces", icon: Anchor },
    { id: "amenities", title: "Amenities & Toys", icon: Star },
    { id: "media-files", title: "Media & Files", icon: Image },
    { id: "management", title: "Management", icon: Settings },
  ]
  
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
      maxGuestsSleeping: 10,
      maxGuestsDayUse: 12,
      childrenAllowed: "yes",
      petsAllowed: "no",
      smokingAllowed: "outdoor_only",
      alcoholConsumption: "permitted",
      shoesOnboard: "no_shoes",
      quietHoursStart: "23:00",
      quietHoursEnd: "08:00",
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
      lifeJackets: "yes",
      safetyBriefing: "mandatory",
      firstAidTrained: "yes",
      securityCameras: "no",
      fireSuppressionSystems: "yes",
      nightWatch: "crew_duty",
      alcoholRestrictionNavigation: "yes",
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

  const renderYachtInfoSection = () => (
    <div className="space-y-6">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderAmenitiesSection = () => (
    <div className="space-y-6">
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
    </div>
  )

  const renderCurrentSection = () => {
    switch (activeSection) {
      case "yacht-info":
        return renderYachtInfoSection()
      case "amenities":
        return renderAmenitiesSection()
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>{sections.find(s => s.id === activeSection)?.title}</CardTitle>
              <CardDescription>This section is under development.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Content for this section will be added soon.</p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Yacht Upload Form</h2>
          <p className="text-sm text-muted-foreground mt-1">Configure rules and access permissions</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    {section.title}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              {renderCurrentSection()}
            </div>
            
            {/* Footer with action buttons */}
            <div className="border-t border-gray-200 bg-white p-6">
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Yacht Listing
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
