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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Plus, X, Upload, Link, Image, Video, FileText, Plane } from "lucide-react"

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
  
  // Active section state
  const [activeSection, setActiveSection] = useState('yacht-info')
  
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

  const sections = [
    { id: 'yacht-info', label: 'Yacht Info' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'class', label: 'Class' },
    { id: 'guest-rules', label: 'Guest Rules' },
    { id: 'access', label: 'Access' },
    { id: 'safety', label: 'Safety' },
    { id: 'cabin-types', label: 'Cabin Types' },
    { id: 'deck-spaces', label: 'Deck Spaces' },
    { id: 'amenities-toys', label: 'Amenities & Toys' },
    { id: 'media-files', label: 'Media & Files' },
    { id: 'management', label: 'Management' }
  ]

  return (
    <div className="flex h-full max-h-[80vh]">
      {/* Vertical Navigation Sidebar */}
      <div className="w-64 border-r bg-muted/30 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Yacht Upload Form</h2>
          <p className="text-sm text-muted-foreground">Configure your yacht listing</p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-200px)]">
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="h-full">
            <ScrollArea className="h-[calc(100vh-200px)] pr-4">
              <div className="space-y-6">
                
                {/* Yacht Info Section */}
                {activeSection === 'yacht-info' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Yacht Information</CardTitle>
                      <CardDescription>
                        Basic details and specifications for your yacht
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="yachtName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yacht Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter yacht name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yachtType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Yacht Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select yacht type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="motor_yacht">Motor Yacht</SelectItem>
                                  <SelectItem value="sailing_yacht">Sailing Yacht</SelectItem>
                                  <SelectItem value="catamaran">Catamaran</SelectItem>
                                  <SelectItem value="expedition">Expedition Yacht</SelectItem>
                                  <SelectItem value="superyacht">Superyacht</SelectItem>
                                  <SelectItem value="mega_yacht">Mega Yacht</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="listingType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Listing Type *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select listing type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="for_sale">For Sale</SelectItem>
                                  <SelectItem value="for_charter">For Charter</SelectItem>
                                  <SelectItem value="sold">Sold</SelectItem>
                                  <SelectItem value="new_construction">New Construction</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="length"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Length (meters)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 50" {...field} />
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
                              <FormLabel>Beam (meters)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 12" {...field} />
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
                              <FormLabel>Draft (meters)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 3.5" {...field} />
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
                              <FormLabel>Builder</FormLabel>
                              <FormControl>
                                <Input placeholder="Yacht builder" {...field} />
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
                              <FormLabel>Year Built</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 2020" {...field} />
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
                              <FormLabel>Guest Cabins</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Number of guest cabins" 
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
                              <FormLabel>Maximum Guests</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Maximum number of guests" 
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
                )}

                {/* Pricing Section */}
                {activeSection === 'pricing' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Pricing Information</CardTitle>
                      <CardDescription>
                        Configure your yacht's charter rates and pricing details
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Base Charter Rates */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Base Charter Rates</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="lowSeasonRateWeekly"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Low Season Weekly Rate</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 50000" {...field} />
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
                                <FormLabel>High Season Weekly Rate</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 75000" {...field} />
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
                                <FormLabel>Day Rate</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 8000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

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
                                    <SelectItem value="EUR">EUR (€)</SelectItem>
                                    <SelectItem value="USD">USD ($)</SelectItem>
                                    <SelectItem value="GBP">GBP (£)</SelectItem>
                                    <SelectItem value="CHF">CHF</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* What's Included */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="crewIncluded"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Crew Included</FormLabel>
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
                            name="fuelIncluded"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Fuel Included</FormLabel>
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
                            name="foodBeverageIncluded"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Food & Beverage Included</FormLabel>
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
                            name="waterToysIncluded"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Water Toys Included</FormLabel>
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
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Class Section */}
                {activeSection === 'class' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Classification & Certification</CardTitle>
                      <CardDescription>
                        Yacht class information, surveys, and certifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <SelectItem value="lloyds">Lloyd's Register</SelectItem>
                                  <SelectItem value="abs">American Bureau of Shipping</SelectItem>
                                  <SelectItem value="dnv">DNV</SelectItem>
                                  <SelectItem value="bv">Bureau Veritas</SelectItem>
                                  <SelectItem value="rina">RINA</SelectItem>
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
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="in_class">In Class</SelectItem>
                                  <SelectItem value="out_of_class">Out of Class</SelectItem>
                                  <SelectItem value="pending_renewal">Pending Renewal</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="flagState"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Flag State</FormLabel>
                              <FormControl>
                                <Input placeholder="Country of registration" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="portOfRegistry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port of Registry</FormLabel>
                              <FormControl>
                                <Input placeholder="Port where registered" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Certifications */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="mcaCommercialCode"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">MCA Commercial Code</FormLabel>
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
                            name="solas"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">SOLAS</FormLabel>
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
                            name="marpol"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">MARPOL</FormLabel>
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
                            name="mlc"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">MLC</FormLabel>
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
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Guest Rules Section */}
                {activeSection === 'guest-rules' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Guest Rules & Policies</CardTitle>
                      <CardDescription>
                        Define rules and policies for charter guests
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="maxGuestsSleeping"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Guests (Sleeping)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  max="50" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="maxGuestsDayUse"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Guests (Day Use)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  max="100" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="childrenAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Children Allowed</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="with_nanny">With Nanny Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="petsAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pets Allowed</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="on_request">On Request</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="smokingAllowed"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Smoking Allowed</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Yes</SelectItem>
                                  <SelectItem value="no">No</SelectItem>
                                  <SelectItem value="outdoor_only">Outdoor Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="minAgeToBook"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Age to Book</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="18" 
                                  max="65" 
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 18)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Access Section */}
                {activeSection === 'access' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Access Permissions</CardTitle>
                      <CardDescription>
                        Configure access permissions for different areas of the yacht
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cabinAccess"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Cabin Access</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="guest_only">Guest Cabins Only</SelectItem>
                                  <SelectItem value="owner_locked">Owner Cabin Locked</SelectItem>
                                  <SelectItem value="all_access">All Cabins Access</SelectItem>
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
                              <FormLabel>Galley Access</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="guest_allowed">Guests Allowed</SelectItem>
                                  <SelectItem value="crew_only">Crew Only</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bridgeAccess"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bridge Access</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="no_access">No Access</SelectItem>
                                  <SelectItem value="tour_with_captain">Tour with Captain</SelectItem>
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
                              <FormLabel>Water Toys Access</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="free_use">Free Use</SelectItem>
                                  <SelectItem value="with_crew">With Crew Supervision</SelectItem>
                                  <SelectItem value="rental_charges">Rental Charges Apply</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Safety Section */}
                {activeSection === 'safety' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Safety & Security</CardTitle>
                      <CardDescription>
                        Safety measures and security protocols
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="safetyBriefing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Safety Briefing</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="mandatory">Mandatory</SelectItem>
                                  <SelectItem value="optional">Optional</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="firstAidTrained"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Aid Trained Crew</FormLabel>
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
                          name="securityCameras"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Security Cameras</FormLabel>
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
                          name="nightWatch"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Night Watch</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="crew_duty">Crew Duty</SelectItem>
                                  <SelectItem value="port_security">Port Security</SelectItem>
                                  <SelectItem value="none">None</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Cabin Types Section */}
                {activeSection === 'cabin-types' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cabin Types</CardTitle>
                      <CardDescription>
                        Configure different cabin types and their features
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {cabinTypes.map((cabin, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Cabin {index + 1}</h4>
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Cabin Name</label>
                              <Input
                                value={cabin.name}
                                onChange={(e) => {
                                  const updated = [...cabinTypes]
                                  updated[index] = { ...updated[index], name: e.target.value }
                                  setCabinTypes(updated)
                                }}
                                placeholder="e.g. Master Suite"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Cabin Type</label>
                              <Select
                                value={cabin.cabinType}
                                onValueChange={(value) => {
                                  const updated = [...cabinTypes]
                                  updated[index] = { ...updated[index], cabinType: value }
                                  setCabinTypes(updated)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select cabin type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="master">Master Suite</SelectItem>
                                  <SelectItem value="vip">VIP Suite</SelectItem>
                                  <SelectItem value="guest">Guest Cabin</SelectItem>
                                  <SelectItem value="twin">Twin Cabin</SelectItem>
                                  <SelectItem value="crew">Crew Cabin</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Sleeps</label>
                              <Input
                                type="number"
                                value={cabin.sleeps}
                                onChange={(e) => {
                                  const updated = [...cabinTypes]
                                  updated[index] = { ...updated[index], sleeps: parseInt(e.target.value) || 2 }
                                  setCabinTypes(updated)
                                }}
                                min="1"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCabinType}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Cabin Type
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Deck Spaces Section */}
                {activeSection === 'deck-spaces' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Deck Spaces</CardTitle>
                      <CardDescription>
                        Configure different deck areas and spaces
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {deckSpaces.map((space, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
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
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium">Space Name</label>
                              <Input
                                value={space.name}
                                onChange={(e) => {
                                  const updated = [...deckSpaces]
                                  updated[index] = { ...updated[index], name: e.target.value }
                                  setDeckSpaces(updated)
                                }}
                                placeholder="e.g. Sun Deck"
                              />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Deck Type</label>
                              <Select
                                value={space.deckType}
                                onValueChange={(value) => {
                                  const updated = [...deckSpaces]
                                  updated[index] = { ...updated[index], deckType: value }
                                  setDeckSpaces(updated)
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select deck type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="main">Main Deck</SelectItem>
                                  <SelectItem value="upper">Upper Deck</SelectItem>
                                  <SelectItem value="sun">Sun Deck</SelectItem>
                                  <SelectItem value="bridge">Bridge Deck</SelectItem>
                                  <SelectItem value="flybridge">Flybridge</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Description</label>
                            <Textarea
                              value={space.description}
                              onChange={(e) => {
                                const updated = [...deckSpaces]
                                updated[index] = { ...updated[index], description: e.target.value }
                                setDeckSpaces(updated)
                              }}
                              placeholder="Describe this deck space..."
                              rows={3}
                            />
                          </div>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        onClick={addDeckSpace}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deck Space
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Amenities & Toys Section */}
                {activeSection === 'amenities-toys' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Amenities & Toys</CardTitle>
                      <CardDescription>
                        Select available amenities and water toys
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Interior Amenities */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Interior Amenities</h3>
                        <FormField
                          control={form.control}
                          name="interiorAmenities"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                        <FormItem
                                          key={item}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item}
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

                      {/* Exterior Amenities */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Exterior Amenities</h3>
                        <FormField
                          control={form.control}
                          name="exteriorAmenities"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                        <FormItem
                                          key={item}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item}
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

                      {/* Water Toys - Motorized */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Water Toys – Motorized</h3>
                        <FormField
                          control={form.control}
                          name="waterToysMotorized"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                        <FormItem
                                          key={item}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item}
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

                      {/* Water Toys - Non-Motorized */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Water Toys – Non-Motorized</h3>
                        <FormField
                          control={form.control}
                          name="waterToysNonMotorized"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
                                        <FormItem
                                          key={item}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(item)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, item])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== item
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {item}
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
                    </CardContent>
                  </Card>
                )}

                {/* Media & Files Section */}
                {activeSection === 'media-files' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Media & Files</CardTitle>
                      <CardDescription>
                        Upload photos, videos, virtual tours, and documents
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Virtual Tours */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Virtual Tours</h3>
                        {yachtVirtualTours.map((tour, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Virtual Tour {index + 1}</h4>
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Tour Name</label>
                                <Input
                                  value={tour.name}
                                  onChange={(e) => updateYachtVirtualTour(index, 'name', e.target.value)}
                                  placeholder="e.g. Main Deck Tour"
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Tour URL</label>
                                <Input
                                  value={tour.url}
                                  onChange={(e) => updateYachtVirtualTour(index, 'url', e.target.value)}
                                  placeholder="https://..."
                                />
                              </div>
                            </div>
                          </div>
                        ))}

                        <Button
                          type="button"
                          variant="outline"
                          onClick={addYachtVirtualTour}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Virtual Tour
                        </Button>
                      </div>

                      {/* File Upload Areas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="font-medium mb-2">Photos</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload yacht photos</p>
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Photos
                          </Button>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="font-medium mb-2">Videos</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload yacht videos</p>
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Videos
                          </Button>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="font-medium mb-2">Drone Footage</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload drone footage</p>
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Footage
                          </Button>
                        </div>

                        <div className="border-2 border-dashed rounded-lg p-6 text-center">
                          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h4 className="font-medium mb-2">Documents</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload yacht documents</p>
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-2" />
                            Upload Documents
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Management Section */}
                {activeSection === 'management' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Management & Access Control</CardTitle>
                      <CardDescription>
                        Configure visibility, booking type, and access management
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="visibility"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Listing Visibility</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="public">Public</SelectItem>
                                  <SelectItem value="private">Private</SelectItem>
                                  <SelectItem value="invite_only">Invite Only</SelectItem>
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

                        <FormField
                          control={form.control}
                          name="coBrokerage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Co-Brokerage</FormLabel>
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

                        <FormField
                          control={form.control}
                          name="guestIdVerification"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Guest ID Verification</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="yes">Required</SelectItem>
                                  <SelectItem value="no">Not Required</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

              </div>
            </ScrollArea>

            <div className="flex justify-end space-x-4 pt-6 border-t bg-background">
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
    </div>
  )
}
