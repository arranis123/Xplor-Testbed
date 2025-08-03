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
import { useToast } from "@/hooks/use-toast"
import { Plus, X, Upload, Link } from "lucide-react"

const yachtRulesSchema = z.object({
  // Basic Info
  yachtName: z.string().min(1, "Yacht name is required"),
  yachtType: z.string().min(1, "Yacht type is required"),
  listingType: z.string().min(1, "Listing type is required"),
  officialNumber: z.string().optional(),
  callSign: z.string().optional(),
  mmsiNumber: z.string().optional(),
  imoNumber: z.string().optional(),
  
  // Pricing
  salePrice: z.string().optional(),
  charterPriceWeekly: z.string().optional(),
  charterPriceDaily: z.string().optional(),
  currency: z.string().optional(),
  priceIncludes: z.string().optional(),
  priceExcludes: z.string().optional(),
  securityDeposit: z.string().optional(),
  advanceProvisioningAllowance: z.string().optional(),
  deliveryFees: z.string().optional(),
  brokerageFee: z.string().optional(),
  
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
    description: z.string().optional(),
  })).optional(),
  
  // Cabin Types
  cabinTypes: z.array(z.object({
    name: z.string(),
    sleeps: z.number().optional(),
    description: z.string().optional(),
  })).optional(),

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
  apaPercentage: z.number().min(0).max(50),

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
  
  // State for dynamic sections
  const [deckSpaces, setDeckSpaces] = useState([{ name: '', description: '' }])
  const [cabinTypes, setCabinTypes] = useState([{ name: '', sleeps: 2, description: '' }])
  
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
      deckSpaces: [],
      cabinTypes: [],
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
      apaPercentage: 30,
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
    setDeckSpaces([...deckSpaces, { name: '', description: '' }])
  }
  
  const removeDeckSpace = (index: number) => {
    setDeckSpaces(deckSpaces.filter((_, i) => i !== index))
  }
  
  const addCabinType = () => {
    setCabinTypes([...cabinTypes, { name: '', sleeps: 2, description: '' }])
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
            <TabsList className="grid w-full grid-cols-9">
              <TabsTrigger value="yacht-info">Yacht Info</TabsTrigger>
              <TabsTrigger value="deck-spaces">Deck Spaces</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="cabin-types">Cabin Types</TabsTrigger>
              <TabsTrigger value="media-files">Media & Files</TabsTrigger>
              <TabsTrigger value="guest-rules">Guest Rules</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
            </TabsList>

            <TabsContent value="yacht-info" className="space-y-4">
               {/* Basic Info */}
               <Card>
                 <CardHeader>
                   <CardTitle>Basic Info</CardTitle>
                  <CardDescription>
                    Basic vessel identification details
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
                          <FormLabel>Official Number (or IMO number for larger vessels)</FormLabel>
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
                           <FormLabel>Listing Type</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                             <FormControl>
                               <SelectTrigger>
                                 <SelectValue placeholder="Select listing type" />
                               </SelectTrigger>
                             </FormControl>
                             <SelectContent>
                               <SelectItem value="for-sale">For Sale</SelectItem>
                               <SelectItem value="for-charter">For Charter</SelectItem>
                               <SelectItem value="both">Both</SelectItem>
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
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>Configure pricing details for sale or charter</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="salePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sale Price</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter sale price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="charterPriceWeekly"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Charter Price (Weekly)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter weekly charter price" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="charterPriceDaily"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Charter Price (Daily)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter daily charter price" {...field} />
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
                              <SelectItem value="usd">USD</SelectItem>
                              <SelectItem value="eur">EUR</SelectItem>
                              <SelectItem value="gbp">GBP</SelectItem>
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
                      name="securityDeposit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Security Deposit</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter security deposit amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advanceProvisioningAllowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Advance Provisioning Allowance (APA)</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter APA amount" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryFees"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Fees</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter delivery fees" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brokerageFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brokerage Fee</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter brokerage fee" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="priceIncludes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Includes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List what is included in the price"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="priceExcludes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price Excludes</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="List what is excluded from the price"
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
            </TabsContent>

            <TabsContent value="deck-spaces" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deck Spaces</CardTitle>
                  <CardDescription>Define the different deck areas and spaces on your yacht</CardDescription>
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
                  ))}
                  <Button type="button" variant="outline" onClick={addDeckSpace}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Deck Space
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cabin-types" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cabin Types</CardTitle>
                  <CardDescription>Define the different cabin types available on your yacht</CardDescription>
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
                          <label className="text-sm font-medium">Sleeps</label>
                          <Input
                            type="number"
                            placeholder="2"
                            value={cabin.sleeps}
                            onChange={(e) => {
                              const updated = [...cabinTypes]
                              updated[index].sleeps = parseInt(e.target.value)
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
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addCabinType}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Cabin Type
                  </Button>
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
                          <Input
                            type="file"
                            accept=".mp4,.mov,.avi"
                            onChange={(e) => updateYachtVirtualTour(index, 'file', e.target.files?.[0])}
                          />
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
                            <Input type="file" accept="video/*" />
                            <Input placeholder="Tour URL" className="mt-2" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Cabin Photos</label>
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

            <TabsContent value="guest-rules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Guest Rules</CardTitle>
                  <CardDescription>Set the basic rules for guests aboard your yacht</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxGuestsSleeping"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Guests (Sleeping)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
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
                            <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                              <SelectItem value="outdoor_only">Outdoor Decks Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="alcoholConsumption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcohol Consumption</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="permitted">Permitted</SelectItem>
                              <SelectItem value="on_request">On Request</SelectItem>
                              <SelectItem value="not_allowed">Not Allowed</SelectItem>
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
                      name="shoesOnboard"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shoes Onboard</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="allowed">Allowed</SelectItem>
                              <SelectItem value="no_shoes">No Shoes Onboard</SelectItem>
                              <SelectItem value="interior_only">Shoes in Interior Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="eventsAllowed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Events or Parties Allowed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="yes">Yes</SelectItem>
                              <SelectItem value="no">No</SelectItem>
                              <SelectItem value="approval_only">On Approval Only</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
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
                    <FormField
                      control={form.control}
                      name="checkInTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
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
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="minAgeToBook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Minimum Age to Book</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
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
                  <CardTitle>Safety & Security</CardTitle>
                  <CardDescription>Configure safety protocols and security measures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="safetyBriefing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Safety Briefing at Check-in</FormLabel>
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
                          <FormLabel>Crew Trained in First Aid</FormLabel>
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

                  <FormField
                    control={form.control}
                    name="securityCameras"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Security Cameras Onboard</FormLabel>
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

                  {form.watch("securityCameras") === "yes" && (
                    <FormField
                      control={form.control}
                      name="camerasLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Camera Locations</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe camera locations for guest awareness..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="nightWatch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Night Watch / Deck Security</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="alcoholRestrictionNavigation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alcohol Restriction During Navigation</FormLabel>
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
          </Tabs>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              Save Yacht Rules
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}