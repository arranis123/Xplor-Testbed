import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

const yachtRulesSchema = z.object({
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
  securityDeposit: z.enum(["yes", "no"]),
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

type YachtRulesFormData = z.infer<typeof yachtRulesSchema>

interface YachtRulesFormProps {
  onSubmit: (data: YachtRulesFormData) => void
  onCancel: () => void
}

export function YachtRulesForm({ onSubmit, onCancel }: YachtRulesFormProps) {
  const { toast } = useToast()
  
  const form = useForm<YachtRulesFormData>({
    resolver: zodResolver(yachtRulesSchema),
    defaultValues: {
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

  const handleSubmit = (data: YachtRulesFormData) => {
    onSubmit(data)
    toast({
      title: "Yacht rules saved",
      description: "Your yacht rules and access parameters have been configured.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Yacht Rules & Access Parameters</h2>
        <p className="text-muted-foreground">Configure rules and access permissions for your yacht charter</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Tabs defaultValue="guest-rules" className="w-full">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="guest-rules">Guest Rules</TabsTrigger>
              <TabsTrigger value="access">Access</TabsTrigger>
              <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="legal">Legal</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
            </TabsList>

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