import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, X, User, Camera, Ship, GraduationCap, FileText, Phone, UserCheck, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const crewMemberSchema = z.object({
  // Basic Identification
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  nationality: z.string().min(1, "Nationality is required"),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  passportNumber: z.string().optional(),
  visaStatus: z.string().optional(),
  
  // Photo
  photoUrl: z.string().optional(),
  
  // Yacht Experience
  totalYearsYachting: z.string().optional(),
  pastYachts: z.array(z.object({
    yachtName: z.string(),
    length: z.string(),
    type: z.string(),
    roleHeld: z.string(),
    datesOfService: z.string(),
    charterOrPrivate: z.string(),
  })).optional(),
  similarClassExperience: z.string().optional(),
  
  // Certifications
  stcwBasic: z.boolean().optional(),
  eng1Medical: z.boolean().optional(),
  yachtmasterLicense: z.string().optional(),
  engineeringLicense: z.string().optional(),
  foodHygieneCert: z.boolean().optional(),
  additionalCertificates: z.string().optional(),
  languagesSpoken: z.string().optional(),
  safetyEndorsements: z.string().optional(),
  
  // Education & Skills
  educationLevel: z.string().optional(),
  maritimeTraining: z.string().optional(),
  technicalSkills: z.string().optional(),
  
  // Biography
  biography: z.string().optional(),
  
  // Contact
  phoneNumber: z.string().optional(),
  emailAddress: z.string().optional(),
  emergencyContact: z.string().optional(),
  availability: z.string().optional(),
  
  // Contract & Availability
  rotationSchedule: z.string().optional(),
  employmentType: z.string().optional(),
  startDate: z.date().optional(),
  noticePeriod: z.string().optional(),
  employer: z.string().optional(),
  
  // Attachments
  cvResume: z.string().optional(),
  referenceLetters: z.string().optional(),
  licenseCopies: z.string().optional(),
  vaccinationRecords: z.string().optional(),
});

const crewFormSchema = z.object({
  crewMembers: z.array(crewMemberSchema).min(1, "At least one crew member is required"),
});

type CrewFormData = z.infer<typeof crewFormSchema>;

interface CrewProfileFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (crewData: CrewFormData) => void;
}

const jobTitles = [
  "Captain", "Chief Stewardess", "Engineer", "First Officer", "Chef", 
  "Stewardess", "Deckhand", "Second Engineer", "Bosun", "Third Engineer",
  "Sous Chef", "Interior Crew", "Deck Crew", "Purser", "Dive Instructor"
];

const yachtTypes = ["Motor Yacht", "Sailing Yacht", "Catamaran", "Superyacht", "Mega Yacht"];
const employmentTypes = ["Full-time", "Freelance", "Relief", "Seasonal"];
const educationLevels = ["High School", "College", "Bachelor's Degree", "Master's Degree", "Maritime Academy"];

export function CrewProfileForm({ open, onOpenChange, onSave }: CrewProfileFormProps) {
  const { toast } = useToast();
  const [currentCrewIndex, setCurrentCrewIndex] = useState(0);

  const form = useForm<CrewFormData>({
    resolver: zodResolver(crewFormSchema),
    defaultValues: {
      crewMembers: [{
        fullName: "",
        jobTitle: "",
        nationality: "",
        pastYachts: [],
      }]
    }
  });

  const { watch, setValue, getValues } = form;
  const crewMembers = watch("crewMembers");

  const addCrewMember = () => {
    const currentMembers = getValues("crewMembers");
    setValue("crewMembers", [
      ...currentMembers,
      {
        fullName: "",
        jobTitle: "",
        nationality: "",
        pastYachts: [],
      }
    ]);
    setCurrentCrewIndex(currentMembers.length);
  };

  const removeCrewMember = (index: number) => {
    const currentMembers = getValues("crewMembers");
    if (currentMembers.length > 1) {
      const newMembers = currentMembers.filter((_, i) => i !== index);
      setValue("crewMembers", newMembers);
      if (currentCrewIndex >= newMembers.length) {
        setCurrentCrewIndex(newMembers.length - 1);
      }
    }
  };

  const addPastYacht = (crewIndex: number) => {
    const currentCrew = getValues(`crewMembers.${crewIndex}`);
    const currentYachts = currentCrew.pastYachts || [];
    setValue(`crewMembers.${crewIndex}.pastYachts`, [
      ...currentYachts,
      {
        yachtName: "",
        length: "",
        type: "",
        roleHeld: "",
        datesOfService: "",
        charterOrPrivate: "",
      }
    ]);
  };

  const removePastYacht = (crewIndex: number, yachtIndex: number) => {
    const currentYachts = getValues(`crewMembers.${crewIndex}.pastYachts`) || [];
    const newYachts = currentYachts.filter((_, i) => i !== yachtIndex);
    setValue(`crewMembers.${crewIndex}.pastYachts`, newYachts);
  };

  const onSubmit = (data: CrewFormData) => {
    onSave?.(data);
    toast({
      title: "Success",
      description: "Crew profile(s) saved successfully!",
    });
    onOpenChange(false);
  };

  const currentCrew = crewMembers[currentCrewIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Crew Profile Management
          </DialogTitle>
          <DialogDescription>
            Create comprehensive profiles for all crew members
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Crew Member Selection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-medium">Crew Member:</Label>
                <Select 
                  value={currentCrewIndex.toString()} 
                  onValueChange={(value) => setCurrentCrewIndex(parseInt(value))}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {crewMembers.map((member, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {member.fullName || `Crew Member ${index + 1}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addCrewMember} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Crew
                </Button>
                {crewMembers.length > 1 && (
                  <Button 
                    type="button" 
                    onClick={() => removeCrewMember(currentCrewIndex)} 
                    size="sm" 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {currentCrewIndex + 1} of {crewMembers.length}
              </div>
            </div>

            <Separator />

            {/* Current Crew Member Form */}
            <div className="space-y-6">
              {/* Basic Identification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Basic Identification
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.fullName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter full name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.jobTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title / Role *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select job title" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobTitles.map((title) => (
                              <SelectItem key={title} value={title}>{title}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.nationality`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nationality *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter nationality" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.dateOfBirth`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
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
                    name={`crewMembers.${currentCrewIndex}.gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.passportNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passport Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter passport number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.visaStatus`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Visa Status</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., Schengen, B1/B2" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Photo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.photoUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Photo URL</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter photo URL or upload" />
                        </FormControl>
                        <FormDescription>
                          High-resolution portrait photo in uniform or professional attire preferred
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Yacht Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-4 w-4" />
                    Yacht Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.totalYearsYachting`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Years in Yachting</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 5 years" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.similarClassExperience`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience on Similar-Class Yachts</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Describe experience on similar vessels" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Past Yachts */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium">Past Yacht Experience</Label>
                      <Button 
                        type="button" 
                        onClick={() => addPastYacht(currentCrewIndex)} 
                        size="sm" 
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Yacht
                      </Button>
                    </div>

                    {currentCrew.pastYachts?.map((yacht, yachtIndex) => (
                      <Card key={yachtIndex} className="mb-4">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">Yacht {yachtIndex + 1}</CardTitle>
                            <Button
                              type="button"
                              onClick={() => removePastYacht(currentCrewIndex, yachtIndex)}
                              size="sm"
                              variant="ghost"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.yachtName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Yacht Name</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Enter yacht name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.length`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Length (LOA)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., 60m" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.type`}
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
                                    {yachtTypes.map((type) => (
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
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.roleHeld`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role Held</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Enter role" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.datesOfService`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dates of Service</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., 2020-2022" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`crewMembers.${currentCrewIndex}.pastYachts.${yachtIndex}.charterOrPrivate`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Charter or Private</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="charter">Charter</SelectItem>
                                    <SelectItem value="private">Private</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Certifications & Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Certifications & Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.yachtmasterLicense`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Yachtmaster / Captain's License</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter license details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.engineeringLicense`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Engineering License</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter license details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.additionalCertificates`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Certificates</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="e.g., PWC instructor, dive master, bartender, massage therapy" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.languagesSpoken`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages Spoken</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., English (Native), Spanish (Fluent)" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.safetyEndorsements`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Safety or Security Endorsements</FormLabel>
                          <FormControl>
                            <Textarea {...field} placeholder="Enter safety/security certifications" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Education & Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Education & Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.educationLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest Education Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {educationLevels.map((level) => (
                              <SelectItem key={level} value={level}>{level}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.maritimeTraining`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maritime or Hospitality Training</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter training details" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.technicalSkills`}
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Technical or Special Skills</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="e.g., AV/IT, massage, wine service, scuba diving" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Biography Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Biography Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.biography`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Personal Bio (3-5 sentences)</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Describe personality traits, strengths on board, hobbies or interests, and guest service style"
                            rows={4}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.phoneNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.emailAddress`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="Enter email address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.emergencyContact`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Emergency Contact</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter emergency contact details" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.availability`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Availability / Next Port</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter availability details" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contract & Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Contract & Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.rotationSchedule`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rotation Schedule / Leave Dates</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 2 months on / 1 month off" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.employmentType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {employmentTypes.map((type) => (
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
                      name={`crewMembers.${currentCrewIndex}.startDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                      name={`crewMembers.${currentCrewIndex}.noticePeriod`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notice Period</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 30 days" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`crewMembers.${currentCrewIndex}.employer`}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Employer / Management Company</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter employer details" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Optional Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Optional Attachments</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.cvResume`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CV/Resume (PDF)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter file URL or upload" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.referenceLetters`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Letters</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter file URL or upload" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.licenseCopies`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Copy of Licenses</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter file URL or upload" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`crewMembers.${currentCrewIndex}.vaccinationRecords`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vaccination Records</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter file URL or upload" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Crew Profile{crewMembers.length > 1 ? 's' : ''}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}