import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Upload, Check, X, AlertCircle, Ship, Award, Globe, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  currentVessel: z.string().optional(),
  positionAppliedFor: z.string().min(1, "Position is required"),
  primaryDepartment: z.string().min(1, "Department is required"),
  highestQualification: z.string().min(1, "Highest qualification is required"),
  vesselSizeExperience: z.array(z.string()).min(1, "Select at least one vessel size"),
  totalYearsYachting: z.number().min(0, "Years must be positive"),
  numberOfYachts: z.number().min(0, "Number must be positive"),
  largestGRT: z.number().min(0, "GRT must be positive"),
  longevityLastYacht: z.number().min(0, "Longevity must be positive"),
  seaMilesLogged: z.number().min(0, "Sea miles must be positive"),
  atlanticCrossings: z.number().min(0, "Crossings must be positive"),
  mediterraneanCrossings: z.number().min(0, "Crossings must be positive"),
  indianCrossings: z.number().min(0, "Crossings must be positive"),
  pacificCrossings: z.number().min(0, "Crossings must be positive"),
  suezTransits: z.number().min(0, "Transits must be positive"),
  panamaTransits: z.number().min(0, "Transits must be positive"),
  corinthTransits: z.number().min(0, "Transits must be positive"),
  charterRevenue: z.number().min(0, "Revenue must be positive"),
  medicalCertifications: z.string().optional(),
  languagesSpoken: z.string().optional(),
  technicalCertifications: z.string().optional(),
  guestServiceTraining: z.string().optional(),
  foodSafetyLevel: z.string().optional(),
  aviationHandling: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val, "Terms must be accepted")
});

type FormData = z.infer<typeof formSchema>;

// Qualification matrix
const qualificationMatrix: { [position: string]: string[] } = {
  'Captain': ['STCW Basic Training', 'ENG1 Medical', 'Master 3000 GT CoC', 'GMDSS GOC', 'ECDIS Certification', 'Advanced Fire Fighting', 'Ship Security Officer'],
  'Chief Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 3000 GT', 'GMDSS GOC', 'ECDIS Certification', 'Advanced Fire Fighting'],
  'Second Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 500 GT', 'GMDSS GOC', 'Basic Fire Fighting'],
  'Bosun': ['STCW Basic Training', 'ENG1 Medical', 'Proficiency in Survival Craft', 'Advanced Fire Fighting'],
  'Deckhand': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
  'Chief Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Chief Engineer Motor 3000kW', 'Advanced Fire Fighting'],
  'Second Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Second Engineer Motor 3000kW', 'Basic Fire Fighting'],
  'ETO': ['STCW Basic Training', 'ENG1 Medical', 'Electro-Technical Officer Certificate', 'Basic Fire Fighting'],
  'Assistant Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
  'Chief Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 2', 'First Aid', 'Ship Security Awareness'],
  '2nd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1', 'First Aid'],
  '3rd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1'],
  'Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 3'],
  'Sous Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 2'],
  'Purser': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Administration Certificate'],
  'Medic/Security': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Medical Care Provider', 'First Aid'],
  'HLO (Helicopter Landing Officer)': ['STCW Basic Training', 'ENG1 Medical', 'Helicopter Landing Officer Certificate', 'Aviation Fuel Handling']
};

const positions = Object.keys(qualificationMatrix);
const departments = ['Deck', 'Engineering', 'Interior', 'Hospitality', 'AVIT', 'Specialist'];
const vesselSizes = ['Under 200 GRT', 'Under 500 GRT', 'Under 3000 GRT'];

export default function FairShareJoin() {
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [certificationStatus, setCertificationStatus] = useState<{ [key: string]: 'valid' | 'invalid' | 'pending' }>({});
  const [showTerms, setShowTerms] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      currentVessel: "",
      positionAppliedFor: "",
      primaryDepartment: "",
      highestQualification: "",
      vesselSizeExperience: [],
      totalYearsYachting: 0,
      numberOfYachts: 0,
      largestGRT: 0,
      longevityLastYacht: 0,
      seaMilesLogged: 0,
      atlanticCrossings: 0,
      mediterraneanCrossings: 0,
      indianCrossings: 0,
      pacificCrossings: 0,
      suezTransits: 0,
      panamaTransits: 0,
      corinthTransits: 0,
      charterRevenue: 0,
      medicalCertifications: "",
      languagesSpoken: "",
      technicalCertifications: "",
      guestServiceTraining: "",
      foodSafetyLevel: "",
      aviationHandling: "",
      termsAccepted: false
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("FairShare application submitted:", data);
    toast({
      title: "Application Submitted!",
      description: "Your FairShare application has been sent for review. You'll receive a confirmation email shortly.",
    });
  };

  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
    form.setValue("positionAppliedFor", position);
    // Reset certification status when position changes
    setCertificationStatus({});
  };

  const handleCertificationStatus = (cert: string, status: 'valid' | 'invalid' | 'pending') => {
    setCertificationStatus(prev => ({ ...prev, [cert]: status }));
  };

  const requiredCertifications = selectedPosition ? qualificationMatrix[selectedPosition] || [] : [];
  const validCertifications = Object.values(certificationStatus).filter(status => status === 'valid').length;
  const allCertificationsValid = requiredCertifications.length > 0 && validCertifications === requiredCertifications.length;

  return (
    <>
      <Helmet>
        <title>Join FairShare – Crew Revenue Share & Qualification Verification | Xplor</title>
        <meta name="description" content="Join the FairShare crew network and share in yacht charter revenue. Verify your qualifications and become part of the Xplor crew community." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join FairShare – Crew Revenue Share & Qualification Verification
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join the exclusive FairShare crew network where your expertise translates to revenue sharing. 
              Verify your qualifications, showcase your experience, and become part of the Xplor crew community.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Crew Info Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5" />
                    Crew Information
                  </CardTitle>
                  <CardDescription>
                    Tell us about yourself and your current position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="currentVessel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Vessel (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="M/Y Example" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="positionAppliedFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position Applied For *</FormLabel>
                          <Select onValueChange={handlePositionChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {positions.map((position) => (
                                <SelectItem key={position} value={position}>
                                  {position}
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
                      name="primaryDepartment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Department *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="highestQualification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Highest CoC / Qualification *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Master 3000 GT CoC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Vessel Size Experience */}
              <Card>
                <CardHeader>
                  <CardTitle>Vessel Size Experience</CardTitle>
                  <CardDescription>
                    Select all vessel sizes you have experience working on
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="vesselSizeExperience"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {vesselSizes.map((size) => (
                            <div key={size} className="flex items-center space-x-2">
                              <Checkbox
                                id={size}
                                checked={field.value.includes(size)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...field.value, size]);
                                  } else {
                                    field.onChange(field.value.filter((s) => s !== size));
                                  }
                                }}
                              />
                              <Label htmlFor={size} className="text-sm font-medium">
                                {size}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Certification Validation */}
              {selectedPosition && requiredCertifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Required Certifications for {selectedPosition}
                    </CardTitle>
                    <CardDescription>
                      Please confirm your certification status for the required qualifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requiredCertifications.map((cert) => (
                        <div key={cert} className="flex items-center justify-between p-3 border rounded-lg">
                          <span className="font-medium">{cert}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant={certificationStatus[cert] === 'valid' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handleCertificationStatus(cert, 'valid')}
                              className="h-8"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Valid
                            </Button>
                            <Button
                              type="button"
                              variant={certificationStatus[cert] === 'invalid' ? 'destructive' : 'outline'}
                              size="sm"
                              onClick={() => handleCertificationStatus(cert, 'invalid')}
                              className="h-8"
                            >
                              <X className="h-3 w-3 mr-1" />
                              Invalid
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8"
                            >
                              <Upload className="h-3 w-3 mr-1" />
                              Upload
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {allCertificationsValid ? (
                        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-medium">All required qualifications confirmed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span className="text-amber-700 font-medium">Some required qualifications are missing or invalid</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Experience Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Experience & Performance
                  </CardTitle>
                  <CardDescription>
                    Provide details about your yachting experience and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="totalYearsYachting"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Years in Yachting</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="numberOfYachts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Yachts Worked On</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="largestGRT"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Largest GRT Vessel Worked</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="longevityLastYacht"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longevity on Last Yacht (months)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Navigation Experience</h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="seaMilesLogged"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sea Miles Logged</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="atlanticCrossings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Atlantic Crossings</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="mediterraneanCrossings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mediterranean Crossings</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="charterRevenue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Charter Revenue Generated (€)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specialist Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Specialist Skills & Additional Certifications</CardTitle>
                  <CardDescription>
                    Optional additional skills and certifications that enhance your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="medicalCertifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical Certifications</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., EMT, RN, First Aid" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="languagesSpoken"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Languages Spoken</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., English, French, Spanish" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="technicalCertifications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technical Certifications</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., AV/IT, Dive Instructor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aviationHandling"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aviation/Heli Ops</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., HLO Certificate" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Legal Acknowledgement */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Legal Acknowledgement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
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
                            I confirm the above information is true and I accept the terms of FairShare crew membership. *
                          </FormLabel>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Collapsible open={showTerms} onOpenChange={setShowTerms}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" type="button" className="w-full">
                        Read Terms & Conditions
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2 mt-4 p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold">FairShare Terms & Conditions</h4>
                      <p className="text-sm text-muted-foreground">
                        By joining FairShare, you agree to participate in the revenue sharing program based on your 
                        verified qualifications and performance metrics. All information provided must be accurate 
                        and verifiable. Xplor reserves the right to verify all certifications and experience claims.
                      </p>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg"
                  className="min-w-[200px]"
                  disabled={!allCertificationsValid && selectedPosition !== ""}
                >
                  Join FairShare Now
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}