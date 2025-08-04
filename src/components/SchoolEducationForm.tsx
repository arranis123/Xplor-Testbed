import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MapboxLocationPicker from '@/components/MapboxLocationPicker';
import { PlusCircle, X, Upload, GraduationCap, Building, Users, Calendar, Lock, MapPin, Eye } from 'lucide-react';
import { toast } from 'sonner';

const facilitySchema = z.object({
  name: z.string().min(1, 'Space name is required'),
  type: z.string().min(1, 'Space type is required'),
  description: z.string().optional(),
  associatedMedia: z.array(z.string()).optional()
});

const mediaFileSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  type: z.enum(['360tour', 'photo', 'video', 'drone', 'floorplan', 'document']),
  url: z.string().optional(),
  file: z.any().optional(),
  spaceAssociation: z.string().optional(),
  visibility: z.enum(['public', 'admin', 'private']).default('public'),
  pinProtected: z.boolean().default(false),
  pin: z.string().optional()
});

const schoolEducationSchema = z.object({
  // Basic Info
  institutionName: z.string().min(1, 'Institution name is required'),
  institutionType: z.string().min(1, 'Institution type is required'),
  customInstitutionType: z.string().optional(),
  ownership: z.string().min(1, 'Ownership type is required'),
  accreditationBody: z.string().optional(),
  yearEstablished: z.number().optional(),
  description: z.string().min(1, 'Description is required'),
  tagline: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  socialMedia: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional()
  }).optional(),
  
  // Education Type & Programs
  levelsOffered: z.array(z.string()).min(1, 'At least one level must be selected'),
  curriculums: z.array(z.string()).min(1, 'At least one curriculum must be selected'),
  customCurriculum: z.string().optional(),
  languagesOfInstruction: z.array(z.string()).min(1, 'At least one language must be selected'),
  optionalPrograms: z.object({
    boarding: z.boolean().default(false),
    boardingDescription: z.string().optional(),
    afterSchool: z.boolean().default(false),
    afterSchoolDescription: z.string().optional(),
    summerCamps: z.boolean().default(false),
    summerCampsDescription: z.string().optional(),
    exchangePrograms: z.boolean().default(false),
    exchangeProgramsDescription: z.string().optional(),
    eslSupport: z.boolean().default(false),
    eslSupportDescription: z.string().optional(),
    giftedPrograms: z.boolean().default(false),
    giftedProgramsDescription: z.string().optional()
  }).optional(),
  
  // Facilities & Spaces
  campusSize: z.string().optional(),
  numberOfClassrooms: z.number().optional(),
  facilities: z.array(facilitySchema).optional(),
  
  // Admissions & Visitor Info
  ageRange: z.string().optional(),
  admissionProcess: z.string().optional(),
  applicationFee: z.string().optional(),
  requiredDocuments: z.array(z.string()).optional(),
  campusToursOffered: z.boolean().default(false),
  openHouseDates: z.string().optional(),
  visitorSchedulingURL: z.string().url('Invalid URL').optional().or(z.literal('')),
  scholarshipsAvailable: z.boolean().default(false),
  scholarshipsDescription: z.string().optional(),
  
  // Access & Rules
  publicAccess: z.string().min(1, 'Public access level is required'),
  photographyAllowed: z.boolean().default(true),
  advanceBookingRequired: z.boolean().default(false),
  bookingNoticePeriod: z.string().optional(),
  visitingHours: z.string().optional(),
  idRequired: z.boolean().default(false),
  accessibilityFeatures: z.object({
    wheelchairAccessible: z.boolean().default(false),
    elevators: z.boolean().default(false),
    hearingAssistance: z.boolean().default(false),
    brailleSignage: z.boolean().default(false),
    accessibleBathrooms: z.boolean().default(false)
  }).optional(),
  
  // Media & Files
  mediaFiles: z.array(mediaFileSchema).optional(),
  
  // Location
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  postalCode: z.string().optional(),
  googlePlusCode: z.string().optional(),
  displayLocation: z.string().default('exact'),
  publicTransitAccess: z.string().optional(),
  distanceFromLandmarks: z.string().optional(),
  coordinates: z.object({
    lat: z.number().optional(),
    lng: z.number().optional()
  }).optional(),
  
  // Visibility & Permissions
  listingStatus: z.string().default('draft'),
  visibility: z.string().default('public'),
  assignedTourPro: z.string().optional(),
  attribution: z.string().optional(),
  pinProtection: z.boolean().default(false),
  accessPin: z.string().optional()
});

type SchoolEducationFormData = z.infer<typeof schoolEducationSchema>;

interface SchoolEducationFormProps {
  onSubmit: (data: SchoolEducationFormData) => Promise<void>;
  onCancel: () => void;
}

const institutionTypes = [
  'Kindergarten',
  'Primary School',
  'Secondary School',
  'High School',
  'College / University',
  'Technical / Trade School',
  'Language School',
  'Online Learning Center',
  'Other'
];

const ownershipTypes = [
  'Public',
  'Private',
  'Religious',
  'Charter',
  'International',
  'NGO'
];

const levelsOffered = [
  'Early Years',
  'Elementary',
  'Middle',
  'High School',
  'Undergraduate',
  'Postgraduate',
  'Adult Learning',
  'Vocational / Technical',
  'Special Needs',
  'Online / Distance'
];

const curriculumOptions = [
  'IB',
  'British (IGCSE / A-Levels)',
  'American',
  'French',
  'German',
  'Local/National',
  'Montessori',
  'Reggio Emilia',
  'STEM / STEAM',
  'Custom'
];

const languageOptions = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Arabic',
  'Japanese',
  'Italian',
  'Portuguese',
  'Russian',
  'Other'
];

const spaceTypes = [
  'Classroom',
  'Lab',
  'Library',
  'Auditorium',
  'Sports Hall',
  'Pool',
  'Outdoor Field',
  'Cafeteria',
  'Dormitory',
  'Music Room',
  'Art Studio',
  'Tech Center',
  'Admin / Staff Room',
  'Other'
];

const requiredDocumentOptions = [
  'Birth Certificate',
  'Previous School Records',
  'Medical Records',
  'Passport/ID',
  'Parent/Guardian ID',
  'Proof of Address',
  'Financial Documents',
  'Recommendation Letters',
  'Portfolio (for arts programs)',
  'Test Scores'
];

const publicAccessOptions = [
  { value: 'yes', label: 'Yes - Open to public' },
  { value: 'limited', label: 'Limited - Scheduled visits only' },
  { value: 'private', label: 'Private - Restricted access' }
];

export const SchoolEducationForm: React.FC<SchoolEducationFormProps> = ({ onSubmit, onCancel }) => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [facilities, setFacilities] = useState<z.infer<typeof facilitySchema>[]>([]);
  const [mediaFiles, setMediaFiles] = useState<z.infer<typeof mediaFileSchema>[]>([]);

  const form = useForm<SchoolEducationFormData>({
    resolver: zodResolver(schoolEducationSchema),
    defaultValues: {
      institutionType: '',
      ownership: '',
      levelsOffered: [],
      curriculums: [],
      languagesOfInstruction: [],
      optionalPrograms: {
        boarding: false,
        afterSchool: false,
        summerCamps: false,
        exchangePrograms: false,
        eslSupport: false,
        giftedPrograms: false
      },
      publicAccess: '',
      photographyAllowed: true,
      advanceBookingRequired: false,
      idRequired: false,
      accessibilityFeatures: {
        wheelchairAccessible: false,
        elevators: false,
        hearingAssistance: false,
        brailleSignage: false,
        accessibleBathrooms: false
      },
      campusToursOffered: false,
      scholarshipsAvailable: false,
      displayLocation: 'exact',
      listingStatus: 'draft',
      visibility: 'public',
      pinProtection: false,
      facilities: [],
      mediaFiles: []
    }
  });

  const handleFormSubmit = async (data: SchoolEducationFormData) => {
    try {
      data.facilities = facilities;
      data.mediaFiles = mediaFiles;
      await onSubmit(data);
      toast.success('School listing created successfully!');
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
      throw error;
    }
  };

  const addFacility = () => {
    const newFacility = {
      name: '',
      type: '',
      description: '',
      associatedMedia: []
    };
    setFacilities([...facilities, newFacility]);
  };

  const removeFacility = (index: number) => {
    setFacilities(facilities.filter((_, i) => i !== index));
  };

  const updateFacility = (index: number, field: string, value: any) => {
    const updatedFacilities = [...facilities];
    updatedFacilities[index] = { ...updatedFacilities[index], [field]: value };
    setFacilities(updatedFacilities);
  };

  const addMediaFile = (type: 'photo' | 'video' | '360tour' | 'drone' | 'floorplan' | 'document') => {
    const newMedia = {
      id: Date.now().toString(),
      title: '',
      type,
      visibility: 'public' as const,
      pinProtected: false
    };
    setMediaFiles([...mediaFiles, newMedia]);
  };

  const removeMediaFile = (id: string) => {
    setMediaFiles(mediaFiles.filter(file => file.id !== id));
  };

  const updateMediaFile = (id: string, field: string, value: any) => {
    const updatedMedia = mediaFiles.map(file =>
      file.id === id ? { ...file, [field]: value } : file
    );
    setMediaFiles(updatedMedia);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="basic-info" className="text-xs">
              <GraduationCap className="h-3 w-3 mr-1" />
              Basic
            </TabsTrigger>
            <TabsTrigger value="education-programs" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              Programs
            </TabsTrigger>
            <TabsTrigger value="facilities" className="text-xs">
              <Building className="h-3 w-3 mr-1" />
              Facilities
            </TabsTrigger>
            <TabsTrigger value="admissions" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Admissions
            </TabsTrigger>
            <TabsTrigger value="access-rules" className="text-xs">
              <Lock className="h-3 w-3 mr-1" />
              Access
            </TabsTrigger>
            <TabsTrigger value="media" className="text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Media
            </TabsTrigger>
            <TabsTrigger value="location" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </TabsTrigger>
            <TabsTrigger value="visibility" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              Visibility
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic-info" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Essential details about your educational institution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="institutionName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Lincoln Elementary School" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="institutionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution Type *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {institutionTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch('institutionType') === 'Other' && (
                    <FormField
                      control={form.control}
                      name="customInstitutionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Institution Type</FormLabel>
                          <FormControl>
                            <Input placeholder="Specify institution type" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="ownership"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ownership *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ownership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ownershipTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
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
                    name="accreditationBody"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accreditation Body</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Ministry of Education" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearEstablished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Established</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 1985" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your institution, its mission, values, and unique features..."
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline or Motto</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Excellence in Education" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h4 className="font-medium">Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="info@school.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.school.edu" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Social Media Links</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="socialMedia.facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Facebook</FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/school" {...field} />
                            </FormControl>
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
                              <Input placeholder="https://instagram.com/school" {...field} />
                            </FormControl>
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
                              <Input placeholder="https://twitter.com/school" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="socialMedia.linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/company/school" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Type & Programs Tab */}
          <TabsContent value="education-programs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Education Type & Programs</CardTitle>
                <CardDescription>
                  Define the educational offerings and specializations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="levelsOffered"
                  render={() => (
                    <FormItem>
                      <FormLabel>Levels Offered *</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {levelsOffered.map((level) => (
                          <FormField
                            key={level}
                            control={form.control}
                            name="levelsOffered"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(level)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, level]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== level));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {level}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="curriculums"
                  render={() => (
                    <FormItem>
                      <FormLabel>Curriculums *</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {curriculumOptions.map((curriculum) => (
                          <FormField
                            key={curriculum}
                            control={form.control}
                            name="curriculums"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(curriculum)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, curriculum]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== curriculum));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {curriculum}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('curriculums')?.includes('Custom') && (
                  <FormField
                    control={form.control}
                    name="customCurriculum"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Curriculum Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your custom curriculum..."
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="languagesOfInstruction"
                  render={() => (
                    <FormItem>
                      <FormLabel>Languages of Instruction *</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {languageOptions.map((language) => (
                          <FormField
                            key={language}
                            control={form.control}
                            name="languagesOfInstruction"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(language)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, language]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== language));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {language}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h4 className="font-medium">Optional Programs</h4>
                  
                  {[
                    { key: 'boarding', label: 'Boarding' },
                    { key: 'afterSchool', label: 'After School Activities' },
                    { key: 'summerCamps', label: 'Summer Camps' },
                    { key: 'exchangePrograms', label: 'Exchange Programs' },
                    { key: 'eslSupport', label: 'ESL / Language Support' },
                    { key: 'giftedPrograms', label: 'Gifted Programs' }
                  ].map((program) => (
                    <div key={program.key} className="space-y-2">
                      <FormField
                        control={form.control}
                        name={`optionalPrograms.${program.key}` as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>{program.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch(`optionalPrograms.${program.key}` as any) && (
                        <FormField
                          control={form.control}
                          name={`optionalPrograms.${program.key}Description` as any}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea 
                                  placeholder={`Describe your ${program.label.toLowerCase()} program...`}
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Facilities & Spaces Tab */}
          <TabsContent value="facilities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Facilities & Spaces</CardTitle>
                <CardDescription>
                  Define the physical spaces and facilities available
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="campusSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Campus Size</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10,000 sq ft or 2 acres" {...field} />
                        </FormControl>
                        <FormDescription>Optional: Include units (sq ft, sq m, acres, etc.)</FormDescription>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfClassrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Classrooms</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="e.g., 25" 
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Space Listing</h4>
                    <Button type="button" onClick={addFacility} variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Space
                    </Button>
                  </div>

                  {facilities.map((facility, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h5 className="font-medium">Space {index + 1}</h5>
                        <Button 
                          type="button" 
                          onClick={() => removeFacility(index)}
                          variant="ghost" 
                          size="sm"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Space Name *</label>
                          <Input 
                            placeholder="e.g., Main Auditorium"
                            value={facility.name}
                            onChange={(e) => updateFacility(index, 'name', e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium">Space Type *</label>
                          <Select 
                            value={facility.type}
                            onValueChange={(value) => updateFacility(index, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              {spaceTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea 
                            placeholder="Describe this space..."
                            value={facility.description}
                            onChange={(e) => updateFacility(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admissions & Visitor Info Tab */}
          <TabsContent value="admissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admissions & Visitor Information</CardTitle>
                <CardDescription>
                  Information for prospective students and visitors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ageRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 3-18 years" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="applicationFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Fee</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., $50 USD" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="admissionProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admission Process</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the admission process, requirements, deadlines..."
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requiredDocuments"
                  render={() => (
                    <FormItem>
                      <FormLabel>Required Documents</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {requiredDocumentOptions.map((document) => (
                          <FormField
                            key={document}
                            control={form.control}
                            name="requiredDocuments"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(document)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      if (checked) {
                                        field.onChange([...value, document]);
                                      } else {
                                        field.onChange(value.filter((item) => item !== document));
                                      }
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {document}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="campusToursOffered"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Campus Tours Offered</FormLabel>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="openHouseDates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Open House Dates</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., First Saturday of each month" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="visitorSchedulingURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visitor Scheduling URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://calendly.com/school-tours" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="scholarshipsAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Scholarships or Financial Aid Available</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch('scholarshipsAvailable') && (
                    <FormField
                      control={form.control}
                      name="scholarshipsDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe available scholarships and financial aid options..."
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Access & Rules Tab */}
          <TabsContent value="access-rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Access & Rules</CardTitle>
                <CardDescription>
                  Define access policies and visitor guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="publicAccess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Public Access *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select access level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {publicAccessOptions.map((option) => (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="photographyAllowed"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Photography Allowed</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advanceBookingRequired"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Advance Booking Required</FormLabel>
                        </FormItem>
                      )}
                    />

                    {form.watch('advanceBookingRequired') && (
                      <FormField
                        control={form.control}
                        name="bookingNoticePeriod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notice Period</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 48 hours, 1 week" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="idRequired"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>ID or Visitor Badge Required</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div>
                    <FormField
                      control={form.control}
                      name="visitingHours"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Visiting Hours</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="e.g., Monday-Friday: 9:00 AM - 3:00 PM&#10;Saturday: 10:00 AM - 2:00 PM&#10;Sunday: Closed"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Accessibility Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { key: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
                      { key: 'elevators', label: 'Elevators' },
                      { key: 'hearingAssistance', label: 'Hearing Assistance' },
                      { key: 'brailleSignage', label: 'Braille Signage' },
                      { key: 'accessibleBathrooms', label: 'Accessible Bathrooms' }
                    ].map((feature) => (
                      <FormField
                        key={feature.key}
                        control={form.control}
                        name={`accessibilityFeatures.${feature.key}` as any}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">{feature.label}</FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media & Files Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Media & Files</CardTitle>
                <CardDescription>
                  Upload virtual tours, photos, videos, and documents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { type: '360tour', label: '360° Virtual Tours', icon: '🏫' },
                  { type: 'photo', label: 'Photos', icon: '📷' },
                  { type: 'video', label: 'Videos', icon: '🎥' },
                  { type: 'drone', label: 'Drone Footage', icon: '🚁' },
                  { type: 'floorplan', label: 'Floor Plans & Campus Maps', icon: '🗺️' },
                  { type: 'document', label: 'Documents', icon: '📄' }
                ].map((mediaType) => (
                  <div key={mediaType.type} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium flex items-center gap-2">
                        <span>{mediaType.icon}</span>
                        {mediaType.label}
                      </h4>
                      <Button 
                        type="button" 
                        onClick={() => addMediaFile(mediaType.type as any)}
                        variant="outline" 
                        size="sm"
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add {mediaType.label}
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {mediaFiles
                        .filter(file => file.type === mediaType.type)
                        .map((file) => (
                          <Card key={file.id} className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <Badge variant="outline">{mediaType.label}</Badge>
                              <Button 
                                type="button" 
                                onClick={() => removeMediaFile(file.id)}
                                variant="ghost" 
                                size="sm"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium">Title *</label>
                                <Input 
                                  placeholder="Enter title..."
                                  value={file.title}
                                  onChange={(e) => updateMediaFile(file.id, 'title', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Space Association</label>
                                <Select 
                                  value={file.spaceAssociation}
                                  onValueChange={(value) => updateMediaFile(file.id, 'spaceAssociation', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Link to space" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {facilities.map((facility, index) => (
                                      <SelectItem key={index} value={facility.name}>
                                        {facility.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <label className="text-sm font-medium">URL or File Upload</label>
                                <Input 
                                  placeholder="Enter URL or upload file..."
                                  value={file.url}
                                  onChange={(e) => updateMediaFile(file.id, 'url', e.target.value)}
                                />
                              </div>

                              <div>
                                <label className="text-sm font-medium">Visibility</label>
                                <Select 
                                  value={file.visibility}
                                  onValueChange={(value) => updateMediaFile(file.id, 'visibility', value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="public">Public</SelectItem>
                                    <SelectItem value="admin">Admin Only</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={file.pinProtected}
                                  onCheckedChange={(checked) => updateMediaFile(file.id, 'pinProtected', checked)}
                                />
                                <label className="text-sm font-medium">PIN Protected</label>
                              </div>

                              {file.pinProtected && (
                                <div>
                                  <label className="text-sm font-medium">PIN</label>
                                  <Input 
                                    placeholder="Enter PIN..."
                                    value={file.pin}
                                    onChange={(e) => updateMediaFile(file.id, 'pin', e.target.value)}
                                  />
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Location Tab */}
          <TabsContent value="location" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>
                  Set the geographical location and address details
                </CardDescription>
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input placeholder="City" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country *</FormLabel>
                        <FormControl>
                          <Input placeholder="Country" {...field} />
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
                          <Input placeholder="Postal Code" {...field} />
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

                <FormField
                  control={form.control}
                  name="displayLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Location</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="exact">Exact Location</SelectItem>
                          <SelectItem value="approximate">Approximate Location</SelectItem>
                          <SelectItem value="hide">Hide on Map</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="publicTransitAccess"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Public Transit Access</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Metro Line 1, Bus routes 45, 67..."
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="distanceFromLandmarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance from Key Landmarks</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., 5 km from city center, 20 minutes from airport..."
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="h-96 rounded-lg border">
                  <MapboxLocationPicker
                    coordinates={form.watch('coordinates') ? { lat: form.watch('coordinates')!.lat || 0, lng: form.watch('coordinates')!.lng || 0 } : null}
                    onCoordinatesChange={(coords) => form.setValue('coordinates', coords)}
                    zoom={15}
                    className="h-full w-full rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visibility & Permissions Tab */}
          <TabsContent value="visibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibility & Permissions</CardTitle>
                <CardDescription>
                  Control who can access and view this listing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="listingStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Listing Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="live">Live</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visibility Level</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="unlisted">Unlisted (Link Only)</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="assignedTourPro"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assigned Tour Pro</FormLabel>
                        <FormControl>
                          <Input placeholder="Tour professional name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attribution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Attribution</FormLabel>
                        <FormControl>
                          <Input placeholder="Uploader name or company" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="pinProtection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>PIN Protection</FormLabel>
                      </FormItem>
                    )}
                  />

                  {form.watch('pinProtection') && (
                    <FormField
                      control={form.control}
                      name="accessPin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access PIN</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="Enter access PIN" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Shareable Link</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    This link will be generated after creating the listing
                  </p>
                  <Input 
                    readOnly 
                    value="Link will be generated automatically" 
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Create School Listing
          </Button>
        </div>
      </form>
    </Form>
  );
};