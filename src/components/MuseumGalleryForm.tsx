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
import { X, Plus, Upload, Building2, MapPin, Contact, Camera, Tag, FileText, Settings } from 'lucide-react';
import { toast } from 'sonner';

const exhibitSchema = z.object({
  name: z.string().min(1, 'Room/Exhibit name is required'),
  type: z.enum(['permanent', 'temporary']),
  description: z.string().optional(),
  tourUrl: z.string().url().optional().or(z.literal('')),
  floor: z.string().optional(),
});

const museumGallerySchema = z.object({
  // Section 1: Basic Information
  name: z.string().min(1, 'Institution name is required'),
  type: z.enum(['museum', 'art-gallery', 'heritage-site', 'cultural-center', 'exhibition-hall']),
  description: z.string().max(500, 'Description must be 500 characters or less'),
  fullDescription: z.string(),

  // Section 2: Location & Access
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  openToPublic: z.boolean(),
  accessibilityFeatures: z.array(z.string()),
  hoursOfOperation: z.string().optional(),

  // Section 3: Contact & Website
  contactEmail: z.string().email().optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  socialMedia: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
  }),

  // Section 4: Virtual Tours & Media
  virtualTourUrl: z.string().url().optional().or(z.literal('')),
  tourDescription: z.string().optional(),

  // Section 5: Categories & Tags
  categories: z.array(z.string()),
  tags: z.array(z.string()),

  // Section 6: Exhibits
  exhibits: z.array(exhibitSchema),

  // Section 7: Submission & Visibility
  visibility: z.enum(['public', 'unlisted', 'private']),
  publishNow: z.boolean(),
  submitterName: z.string().min(1, 'Submitter name is required'),
  submitterEmail: z.string().email('Valid email is required'),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
});

type MuseumGalleryFormData = z.infer<typeof museumGallerySchema>;

const institutionTypes = [
  { value: 'museum', label: 'Museum' },
  { value: 'art-gallery', label: 'Art Gallery' },
  { value: 'heritage-site', label: 'Heritage Site' },
  { value: 'cultural-center', label: 'Cultural Center' },
  { value: 'exhibition-hall', label: 'Exhibition Hall' },
];

const accessibilityOptions = [
  'Wheelchair Access',
  'Elevator',
  'Braille Labels',
  'Audio Guides',
  'Sign Language Tours',
  'Large Print Materials',
  'Other',
];

const categoryOptions = [
  'Modern Art',
  'Ancient History',
  'Photography',
  'Sculpture',
  'Contemporary Art',
  'Natural History',
  'Science & Technology',
  'Local History',
  'Fine Arts',
  'Cultural Heritage',
  'Archaeological',
  'Military History',
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const form = useForm<MuseumGalleryFormData>({
    resolver: zodResolver(museumGallerySchema),
    defaultValues: {
      openToPublic: true,
      accessibilityFeatures: [],
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
      },
      categories: [],
      tags: [],
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
      data.categories = selectedCategories;
      data.tags = tags;
      await onSubmit(data);
      toast.success('Museum/Gallery submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden md:inline">Basic Info</span>
            </TabsTrigger>
            <TabsTrigger value="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden md:inline">Location</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Contact className="h-4 w-4" />
              <span className="hidden md:inline">Contact</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden md:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="hidden md:inline">Categories</span>
            </TabsTrigger>
            <TabsTrigger value="exhibits" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden md:inline">Exhibits</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

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
                      <FormLabel>Type *</FormLabel>
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
                      <FormLabel>Brief Description</FormLabel>
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
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed overview of the institution, collection, and history"
                          className="resize-none min-h-[120px]"
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

          <TabsContent value="location" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Location & Access</CardTitle>
                <CardDescription>Provide location and accessibility information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <FormLabel>City/Town *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city or town" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="any"
                            placeholder="e.g., 40.7128"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
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
                          <Input
                            type="number"
                            step="any"
                            placeholder="e.g., -74.0060"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="openToPublic"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Open to Public</FormLabel>
                        <FormDescription>
                          Is this institution open for public visits?
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

                <FormField
                  control={form.control}
                  name="hoursOfOperation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hours of Operation</FormLabel>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Website</CardTitle>
                <CardDescription>Provide contact information and online presence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Virtual Tours & Media</CardTitle>
                <CardDescription>Upload or link virtual tours and media content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="virtualTourUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Virtual Tour URL</FormLabel>
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
                    <FormLabel>Upload Floor Plan</FormLabel>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Upload floor plan (PDF or image)</p>
                      <Button type="button" variant="outline" className="mt-2">
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories & Tags</CardTitle>
                <CardDescription>Categorize your institution for better discoverability</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <FormLabel>Categories</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {categoryOptions.map((category) => (
                      <div
                        key={category}
                        className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                          selectedCategories.includes(category)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background hover:bg-accent'
                        }`}
                        onClick={() => toggleCategory(category)}
                      >
                        <span className="text-sm">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Add a tag (e.g., Picasso, Impressionism)"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exhibits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exhibit & Room Information</CardTitle>
                <CardDescription>Add information about specific spaces within your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exhibitFields.map((field, index) => (
                  <Card key={field.id} className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Exhibit/Room {index + 1}</h4>
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
                            <FormLabel>Name of Room/Exhibit</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter room or exhibit name" {...field} />
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
                                <SelectItem value="permanent">Permanent</SelectItem>
                                <SelectItem value="temporary">Temporary</SelectItem>
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
                        name={`exhibits.${index}.tourUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Linked Tour URL</FormLabel>
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

                      <FormField
                        control={form.control}
                        name={`exhibits.${index}.floor`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Floor or Wing</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Ground Floor, East Wing" {...field} />
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
                  onClick={() => appendExhibit({ name: '', type: 'permanent', description: '', tourUrl: '', floor: '' })}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exhibit/Room
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Submission & Visibility Settings</CardTitle>
                <CardDescription>Configure how your listing will be published</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="visibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listing Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="unlisted">Unlisted</SelectItem>
                          <SelectItem value="private">Private (Admin Only)</SelectItem>
                        </SelectContent>
                      </Select>
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