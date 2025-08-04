import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Upload, Building2, MapPin, Contact, Camera, Tag, FileText, Settings, Shield } from 'lucide-react';
import { toast } from 'sonner';
import MapboxLocationPicker from './MapboxLocationPicker';

const exhibitSchema = z.object({
  name: z.string().min(1, 'Room/Exhibit name is required'),
  type: z.enum(['permanent', 'temporary', 'private', 'vip', 'outdoor']),
  description: z.string().optional(),
  tourUrl: z.string().url().optional().or(z.literal('')),
  floor: z.string().optional(),
  associatedArtist: z.string().optional(),
});

const museumGallerySchema = z.object({
  // Section 1: Basic Information
  name: z.string().min(1, 'Institution name is required'),
  type: z.enum(['museum', 'art-gallery', 'cultural-center', 'exhibition-hall', 'other']),
  description: z.string().max(500, 'Description must be 500 characters or less'),
  yearFounded: z.string().optional(),
  ownerOrganization: z.string().optional(),
  operatingStatus: z.enum(['open', 'temporarily-closed', 'permanent-exhibit-only', 'archived']),

  // Section 2: Categories & Content
  focusAreas: z.array(z.string()),
  typeOfCollections: z.string().optional(),
  notableArtistsOrExhibits: z.string().optional(),

  // Section 3: Exhibitions & Rooms (handled separately with exhibits array)
  exhibits: z.array(exhibitSchema),

  // Section 4: Visitor Information
  hoursOfOperation: z.string().optional(),
  entryFee: z.string().optional(),
  onlineBookingAvailable: z.boolean().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  socialMedia: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
  }),
  accessibilityFeatures: z.array(z.string()),

  // Section 5: Access & Rules
  ageRestrictions: z.string().optional(),
  photographyAllowed: z.boolean().optional(),
  tripodsAllowed: z.boolean().optional(),
  touchingExhibits: z.enum(['allowed', 'supervised', 'not-allowed']).optional(),
  petsAllowed: z.boolean().optional(),
  groupVisitsAllowed: z.boolean().optional(),
  maxGroupSize: z.string().optional(),
  covidGuidelines: z.string().optional(),
  requiredIdOrPass: z.string().optional(),

  // Section 6: Media & Files
  virtualTourUrl: z.string().url().optional().or(z.literal('')),
  tourDescription: z.string().optional(),

  // Section 7: Location
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  postalCode: z.string().optional(),
  googlePlusCode: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  nearbyTransport: z.array(z.string()),

  // Section 8: Visibility & Permissions
  visibility: z.enum(['public', 'link-only', 'private']),
  pinProtection: z.boolean().optional(),
  pin: z.string().optional(),
  attribution: z.string().optional(),
  partnerAffiliation: z.string().optional(),
  publishNow: z.boolean(),
  submitterName: z.string().min(1, 'Submitter name is required'),
  submitterEmail: z.string().email('Valid email is required'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type MuseumGalleryFormData = z.infer<typeof museumGallerySchema>;

const institutionTypes = [
  { value: 'museum', label: 'Museum' },
  { value: 'art-gallery', label: 'Art Gallery' },
  { value: 'cultural-center', label: 'Cultural Center' },
  { value: 'exhibition-hall', label: 'Exhibition Hall' },
  { value: 'other', label: 'Other' },
];

const operatingStatuses = [
  { value: 'open', label: 'Open' },
  { value: 'temporarily-closed', label: 'Temporarily Closed' },
  { value: 'permanent-exhibit-only', label: 'Permanent Exhibit Only' },
  { value: 'archived', label: 'Archived' },
];

const focusAreaOptions = [
  'Art (Modern)', 'Art (Classical)', 'Art (Contemporary)', 'History', 'Science', 'Nature', 
  'Children / Interactive', 'Technology', 'Cultural Heritage', 'Temporary Exhibitions', 
  'Private Collection', 'Architecture / Design', 'Photography', 'Other'
];

const touchingOptions = [
  { value: 'allowed', label: 'Allowed' },
  { value: 'supervised', label: 'Supervised' },
  { value: 'not-allowed', label: 'Not Allowed' },
];

const transportOptions = [
  'Bus', 'Metro/Subway', 'Train', 'Tram', 'Taxi', 'Car Parking', 'Bicycle Parking'
];

const accessibilityOptions = [
  'Wheelchair Access',
  'Guided Tours',
  'Audio Guides',
  'Tactile Exhibits',
  'Hearing Assistance',
  'Elevator Access',
  'Braille Materials',
];

const countries = [
  'United States',
  'United Kingdom',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'Canada',
  'Australia',
  'Japan',
  // Add more countries as needed
];

interface MuseumGalleryFormProps {
  onSubmit: (data: MuseumGalleryFormData) => Promise<void>;
  onCancel: () => void;
}

export const MuseumGalleryForm: React.FC<MuseumGalleryFormProps> = ({ onSubmit, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);

  const form = useForm<MuseumGalleryFormData>({
    resolver: zodResolver(museumGallerySchema),
    defaultValues: {
      operatingStatus: 'open',
      focusAreas: [],
      accessibilityFeatures: [],
      onlineBookingAvailable: false,
      photographyAllowed: true,
      tripodsAllowed: false,
      touchingExhibits: 'not-allowed',
      petsAllowed: false,
      groupVisitsAllowed: true,
      pinProtection: false,
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
      },
      nearbyTransport: [],
      exhibits: [],
      visibility: 'public',
      publishNow: true,
      agreeToTerms: false,
    },
  });

  const { fields: exhibitFields, append: appendExhibit, remove: removeExhibit } = useFieldArray({
    control: form.control,
    name: 'exhibits',
  });

  const handleSubmit = async (data: MuseumGalleryFormData) => {
    setIsSubmitting(true);
    try {
      data.focusAreas = selectedFocusAreas;
      await onSubmit(data);
      toast.success('Museum/Gallery submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFocusArea = (area: string) => {
    setSelectedFocusAreas(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-8 text-xs">
            <TabsTrigger value="basic" className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              <span className="hidden lg:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-1">
              <Tag className="h-3 w-3" />
              <span className="hidden lg:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="exhibits" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span className="hidden lg:inline">Exhibitions</span>
            </TabsTrigger>
            <TabsTrigger value="visitor" className="flex items-center gap-1">
              <Contact className="h-3 w-3" />
              <span className="hidden lg:inline">Visitor Info</span>
            </TabsTrigger>
            <TabsTrigger value="access" className="flex items-center gap-1">
              <Settings className="h-3 w-3" />
              <span className="hidden lg:inline">Access</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-1">
              <Camera className="h-3 w-3" />
              <span className="hidden lg:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden lg:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="visibility" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span className="hidden lg:inline">Visibility</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: Basic Info */}
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details about your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name of Institution *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter institution name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select institution type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {institutionTypes.map((type) => (
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief public-facing summary (max 500 characters)"
                          className="resize-none"
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value?.length || 0}/500 characters
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearFounded"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Founded (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 1985"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerOrganization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner / Managing Organization (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., City Cultural Department"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operatingStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select operating status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {operatingStatuses.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Categories & Content */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories & Content</CardTitle>
                <CardDescription>Define your institution's focus areas and collections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <FormLabel>Focus Area (multi-select)</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {focusAreaOptions.map((area) => (
                      <div
                        key={area}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                          selectedFocusAreas.includes(area)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-accent'
                        }`}
                        onClick={() => toggleFocusArea(area)}
                      >
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="typeOfCollections"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Collections</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the types of collections in your institution"
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
                  name="notableArtistsOrExhibits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notable Artists or Exhibits</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List notable artists, exhibits, or collections"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 3: Exhibitions & Rooms */}
          <TabsContent value="exhibits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exhibitions & Rooms</CardTitle>
                <CardDescription>Add information about specific spaces within your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exhibitFields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Room/Space {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeExhibit(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Room / Space Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Main Hall, Gallery A" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="permanent">Permanent Exhibition</SelectItem>
                                <SelectItem value="temporary">Temporary</SelectItem>
                                <SelectItem value="private">Private Room</SelectItem>
                                <SelectItem value="vip">VIP Room</SelectItem>
                                <SelectItem value="outdoor">Outdoor Area</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe this exhibit or room"
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
                        name={`exhibits.${index}.associatedArtist`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Associated Artist or Theme (optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Vincent van Gogh"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.floor`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Floor Number</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Ground Floor, 2nd Floor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.tourUrl`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Linked Tour URL (optional)</FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://tour-url.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendExhibit({ 
                    name: '', 
                    type: 'permanent', 
                    description: '', 
                    tourUrl: '', 
                    floor: '', 
                    associatedArtist: '' 
                  })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room/Space
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Visitor Information */}
          <TabsContent value="visitor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visitor Information</CardTitle>
                <CardDescription>Provide information for visitors and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="hoursOfOperation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opening Hours</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Mon-Fri: 9:00-17:00, Sat-Sun: 10:00-16:00"
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
                  name="entryFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Entry Fee</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., $15 adults, $10 students, Free for children under 12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onlineBookingAvailable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Online Booking Available</FormLabel>
                        <FormDescription>
                          Can visitors book tickets online?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@museum.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://www.museum.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel>Social Media Links</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="socialMedia.facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Facebook</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://facebook.com/museum" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialMedia.instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://instagram.com/museum" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="socialMedia.twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input type="url" placeholder="https://twitter.com/museum" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="accessibilityFeatures"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Accessibility Features</FormLabel>
                        <FormDescription>
                          Select all accessibility features available
                        </FormDescription>
                      </div>
                      {accessibilityOptions.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="accessibilityFeatures"
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
                                            field.value?.filter((value) => value !== item)
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 5: Access & Rules */}
          <TabsContent value="access" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Access & Rules</CardTitle>
                <CardDescription>Define access restrictions and visitor rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="ageRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age Restrictions (if any)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Children under 16 must be accompanied by an adult"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photographyAllowed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Photography Allowed</FormLabel>
                        <FormDescription>
                          Can visitors take photos inside?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tripodsAllowed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Tripods Allowed</FormLabel>
                        <FormDescription>
                          Are camera tripods permitted?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="touchingExhibits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Touching Exhibits</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select touching policy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {touchingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="petsAllowed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Pets Allowed</FormLabel>
                        <FormDescription>
                          Are pets permitted (service animals are always allowed)?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="groupVisitsAllowed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Group Visits Allowed</FormLabel>
                        <FormDescription>
                          Are group tours and visits permitted?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="maxGroupSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Group Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., 25 people"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="covidGuidelines"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COVID-19 Guidelines (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special health and safety guidelines"
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
                  name="requiredIdOrPass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Required ID or Pass (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Valid ID required for entry"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 6: Media & Files */}
          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>Upload or link virtual tours and media content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="virtualTourUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>360° Virtual Tours</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="https://matterport.com/tour or YouTube embed URL"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Support for Matterport, 360°, YouTube, Kuula, etc.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tourDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tour Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what visitors will see in the virtual tour"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Upload Photos</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Upload gallery photos (JPG/PNG)</p>
                      <Button type="button" variant="outline" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Upload Videos</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Upload videos (MP4/MOV)</p>
                      <Button type="button" variant="outline" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Floor Plans or Layout Maps</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Upload floor plan (PDF or image)</p>
                      <Button type="button" variant="outline" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <FormLabel>Documents</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Catalogues, brochures, PDFs</p>
                      <Button type="button" variant="outline" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 7: Location */}
          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Provide location information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
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

                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter postal code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="googlePlusCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Google Plus Code (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 9G8F+5X New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Map Location</FormLabel>
                  <MapboxLocationPicker
                    coordinates={form.watch('latitude') && form.watch('longitude') ? 
                      { lat: form.watch('latitude')!, lng: form.watch('longitude')! } : undefined
                    }
                    onCoordinatesChange={(coords) => {
                      if (Array.isArray(coords)) {
                        form.setValue('latitude', coords[1]);
                        form.setValue('longitude', coords[0]);
                      } else {
                        form.setValue('latitude', coords.lat);
                        form.setValue('longitude', coords.lng);
                      }
                    }}
                    className="h-64"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="nearbyTransport"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">Nearby Public Transport</FormLabel>
                        <FormDescription>
                          Select all applicable transportation options
                        </FormDescription>
                      </div>
                      {transportOptions.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="nearbyTransport"
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
                                            field.value?.filter((value) => value !== item)
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 8: Visibility & Permissions */}
          <TabsContent value="visibility" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visibility & Permissions</CardTitle>
                <CardDescription>Configure how your listing will be published and accessed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="link-only">Link Only</SelectItem>
                          <SelectItem value="private">Private to Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pinProtection"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">PIN Protection</FormLabel>
                        <FormDescription>
                          Require a PIN to access this listing
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch('pinProtection') && (
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter 4-6 digit PIN"
                            maxLength={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="attribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attribution</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name or entity for display credit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="partnerAffiliation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner / Network Affiliation (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Museum Network, Cultural Association"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishNow"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Publish Now</FormLabel>
                        <FormDescription>
                          Make this listing live immediately upon submission
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="submitterName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submitter Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormDescription>For admin tracking purposes</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="submitterEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submitter Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormDescription>For admin tracking purposes</FormDescription>
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
                          I agree to the terms and conditions *
                        </FormLabel>
                        <FormDescription>
                          You must agree to our terms to submit this listing.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? 'Submitting...' : 'Submit Museum/Gallery'}
          </Button>
        </div>
      </form>
    </Form>
  );
};