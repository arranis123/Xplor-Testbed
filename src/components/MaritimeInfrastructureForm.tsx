import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload, MapPin } from 'lucide-react';
import { toast } from "sonner";
import MapboxLocationPicker from './MapboxLocationPicker';

const maritimeInfrastructureSchema = z.object({
  listingTitle: z.string().min(1, "Listing title is required"),
  facilityType: z.string().min(1, "Facility type is required"),
  description: z.string().optional(),
  yearBuilt: z.string().optional(),
  operatedBy: z.string().optional(),
  operationalStatus: z.string().min(1, "Operational status is required"),
  listingType: z.string().min(1, "Listing type is required"),
  designation: z.string().optional(),
  primaryUse: z.array(z.string()).default([]),
  maxVesselSize: z.string().optional(),
  numberOfBerths: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  fullAddress: z.string().optional(),
  portCode: z.string().optional(),
  listingStatus: z.string().default("draft"),
  visibility: z.string().default("public"),
});

type MaritimeInfrastructureFormData = z.infer<typeof maritimeInfrastructureSchema>;

const facilityTypes = [
  "Cruise Ship Terminal", "Commercial Dock / Cargo Terminal", "Lighthouse", 
  "Multi-Use Port Facility", "Other"
];

const primaryUseOptions = [
  "Passenger Embarkation", "Cargo Handling", "Refueling", "Bunkering", 
  "Light Beaconing", "Navigation & Signal", "Pilot Station", "Tourism", 
  "Emergency Response", "Maintenance Dock", "Other"
];

export default function MaritimeInfrastructureForm() {
  const [activeTab, setActiveTab] = useState("basic-info");

  const form = useForm<MaritimeInfrastructureFormData>({
    resolver: zodResolver(maritimeInfrastructureSchema),
    defaultValues: {
      listingStatus: "draft",
      visibility: "public",
      primaryUse: [],
    },
  });

  const onSubmit = (data: MaritimeInfrastructureFormData) => {
    console.log('Form submitted:', data);
    toast.success("Maritime infrastructure listing saved successfully!");
  };

  const handleCoordinatesChange = (lat: number, lng: number) => {
    form.setValue('coordinates', { lat, lng });
  };

  const tabs = [
    { id: "basic-info", label: "Basic Info", icon: "📋" },
    { id: "facility-operations", label: "Facility & Operations", icon: "⚓" },
    { id: "docking", label: "Docking Infrastructure", icon: "🚢" },
    { id: "services", label: "Services & Amenities", icon: "🏢" },
    { id: "safety", label: "Access & Safety", icon: "🔒" },
    { id: "media", label: "Media & Files", icon: "📸" },
    { id: "location", label: "Location", icon: "📍" },
    { id: "visibility", label: "Visibility", icon: "👁️" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Upload Maritime Infrastructure</h1>
        <p className="text-muted-foreground">
          Showcase cruise terminals, commercial docks and lighthouses with comprehensive facility details
        </p>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {activeTab === "basic-info" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="listingTitle"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Listing Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Port of Malaga Cruise Terminal" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facilityType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facility Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select facility type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {facilityTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
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
                            <FormLabel>Operational Status *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="seasonal">Seasonal</SelectItem>
                                <SelectItem value="decommissioned">Decommissioned</SelectItem>
                                <SelectItem value="heritage-site">Heritage Site</SelectItem>
                                <SelectItem value="under-construction">Under Construction</SelectItem>
                              </SelectContent>
                            </Select>
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
                              <Input placeholder="e.g., 1995" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="operatedBy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Operated By</FormLabel>
                            <FormControl>
                              <Input placeholder="Company, Port Authority, or Municipality" {...field} />
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
                            <FormLabel>Listing Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select listing type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="showcase">Showcase</SelectItem>
                                <SelectItem value="for-lease">For Lease</SelectItem>
                                <SelectItem value="for-sale">For Sale</SelectItem>
                                <SelectItem value="for-charter">For Charter</SelectItem>
                                <SelectItem value="public-info">Public Info</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select designation" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="heritage">Heritage</SelectItem>
                                <SelectItem value="tourist-attraction">Tourist Attraction</SelectItem>
                                <SelectItem value="government">Government</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed description of the maritime facility..."
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
                </div>
              )}

              {activeTab === "facility-operations" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Primary Use & Operations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-4">Primary Use (Select all that apply)</h4>
                        <FormField
                          control={form.control}
                          name="primaryUse"
                          render={() => (
                            <FormItem>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {primaryUseOptions.map((use) => (
                                  <FormField
                                    key={use}
                                    control={form.control}
                                    name="primaryUse"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={use}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(use)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, use])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== use
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {use}
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="maxVesselSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Vessel Size (LOA in meters)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 350m, 50,000 GT" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="numberOfBerths"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Number of Berths</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 4" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "location" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Location & Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="fullAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Address</FormLabel>
                            <FormControl>
                              <Input placeholder="Port address and location" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="portCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Port Code (UN/LOCODE)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., ESMAL" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold flex items-center">
                          <MapPin className="h-5 w-5 mr-2" />
                          GPS Coordinates
                        </h4>
                        <div className="h-96 border rounded-lg overflow-hidden">
                          <MapboxLocationPicker
                            coordinates={form.watch('coordinates') && form.watch('coordinates')?.lat && form.watch('coordinates')?.lng ? 
                              { lat: form.watch('coordinates')!.lat!, lng: form.watch('coordinates')!.lng! } : 
                              undefined}
                            onCoordinatesChange={(coords) => handleCoordinatesChange(coords.lat, coords.lng)}
                            zoom={10}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Other tabs would show placeholder content */}
              {["docking", "services", "safety", "media", "visibility"].includes(activeTab) && (
                <Card>
                  <CardHeader>
                    <CardTitle>{tabs.find(t => t.id === activeTab)?.label} Section</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This section is ready for detailed implementation. Key fields and functionality will be added here.
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between pt-6 border-t">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <div className="space-x-4">
                  <Button type="button" variant="outline">
                    Preview
                  </Button>
                  <Button type="submit">
                    Save Listing
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
