import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import MapboxLocationPicker from "@/components/MapboxLocationPicker";
import { 
  CheckCircle, 
  Upload, 
  User, 
  Briefcase, 
  Camera, 
  MapPin, 
  GraduationCap, 
  FileText,
  Globe,
  Link
} from "lucide-react";

interface VerificationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  country: string;
  otherCountry?: string;
  city: string;
  timezone: string;
  
  // Location Information
  coordinates: { lat: number; lng: number };
  latitude: string;
  longitude: string;
  plusCode: string;
  
  // Skills & Experience
  professionalTitle: string;
  yearsExperience: string;
  industriesServed: string[];
  platformsUsed: string[];
  portfolioLink: string;
  sampleWork: FileList | null;
  
  // Equipment Inventory
  ownsEquipment: boolean;
  camera360Models: string;
  dslrModels: string;
  droneModels: string;
  otherEquipment: string;
  softwareUsed: string;
  
  // Availability & Coverage
  availableForProjects: boolean;
  coverageAreas: string[];
  availability: string;
  willingToTravel: boolean;
  
  // Training & Certification
  virtualTourExperience: boolean;
  wantsFreeTraining: boolean;
  wantsCertificationBadge: boolean;
  preferredLanguage: string;
  
  // Legal & Verification
  businessName: string;
  registeredCompany: boolean;
  vatTaxId: string;
  proofOfId: FileList | null;
  proofOfWork: FileList | null;
  socialMediaLinkedin: string;
  hasInsurance: boolean;
  insuranceUpload: FileList | null;
  
  // Final Declarations
  agreeToTerms: boolean;
  subscribeToUpdates: boolean;
  notes: string;
  
  // Portfolio uploads
  virtualTourFiles: FileList | null;
  virtualTourUrls: string;
  droneFootageFiles: FileList | null;
  droneFootageUrls: string;
  photographFiles: FileList | null;
  photographUrls: string;
  videoFiles: FileList | null;
  videoUrls: string;
  documentFiles: FileList | null;
}

const VerificationForm = ({ open, onOpenChange }: VerificationFormProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      coordinates: { lat: 0, lng: 0 },
      latitude: "",
      longitude: "",
      plusCode: ""
    }
  });
  const [industriesServed, setIndustriesServed] = useState<string[]>([]);
  const [platformsUsed, setPlatformsUsed] = useState<string[]>([]);
  const [coverageAreas, setCoverageAreas] = useState<string[]>([]);
  const [showOtherCountry, setShowOtherCountry] = useState(false);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const ownsEquipment = watch("ownsEquipment");

  const onSubmit = (data: FormData) => {
    console.log("Verification form submitted:", data);
    toast({
      title: "Application Submitted Successfully!",
      description: "We'll review your verification application and get back to you within 2-3 business days.",
    });
    onOpenChange(false);
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setIndustriesServed(prev => [...prev, industry]);
    } else {
      setIndustriesServed(prev => prev.filter(i => i !== industry));
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setPlatformsUsed(prev => [...prev, platform]);
    } else {
      setPlatformsUsed(prev => prev.filter(p => p !== platform));
    }
  };

  const handleCoverageChange = (area: string, checked: boolean) => {
    if (checked) {
      setCoverageAreas(prev => [...prev, area]);
    } else {
      setCoverageAreas(prev => prev.filter(a => a !== area));
    }
  };

  const handleCoordinatesChange = (newCoordinates: { lat: number; lng: number }) => {
    setCoordinates(newCoordinates);
    setValue("coordinates", newCoordinates);
    setValue("latitude", newCoordinates.lat.toString());
    setValue("longitude", newCoordinates.lng.toString());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            Become a Verified Tour Pro
          </DialogTitle>
          <DialogDescription>
            Complete this comprehensive application to join our global network of verified capture specialists.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="application" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="application">Application Form</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName"
                        {...register("fullName", { required: "Full name is required" })}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        {...register("phone", { required: "Phone number is required" })}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="timezone">Time Zone *</Label>
                      <Select onValueChange={(value) => setValue("timezone", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          <SelectItem value="cet">Central European Time (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select onValueChange={(value) => {
                        setValue("country", value);
                        setShowOtherCountry(value === "other");
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="ar">Argentina</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="at">Austria</SelectItem>
                          <SelectItem value="by">Belarus</SelectItem>
                          <SelectItem value="be">Belgium</SelectItem>
                          <SelectItem value="br">Brazil</SelectItem>
                          <SelectItem value="bg">Bulgaria</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="cl">Chile</SelectItem>
                          <SelectItem value="cn">China</SelectItem>
                          <SelectItem value="co">Colombia</SelectItem>
                          <SelectItem value="hr">Croatia</SelectItem>
                          <SelectItem value="cz">Czech Republic</SelectItem>
                          <SelectItem value="dk">Denmark</SelectItem>
                          <SelectItem value="eg">Egypt</SelectItem>
                          <SelectItem value="ee">Estonia</SelectItem>
                          <SelectItem value="fi">Finland</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="gh">Ghana</SelectItem>
                          <SelectItem value="gr">Greece</SelectItem>
                          <SelectItem value="hk">Hong Kong</SelectItem>
                          <SelectItem value="hu">Hungary</SelectItem>
                          <SelectItem value="in">India</SelectItem>
                          <SelectItem value="id">Indonesia</SelectItem>
                          <SelectItem value="ie">Ireland</SelectItem>
                          <SelectItem value="il">Israel</SelectItem>
                          <SelectItem value="it">Italy</SelectItem>
                          <SelectItem value="jp">Japan</SelectItem>
                          <SelectItem value="ke">Kenya</SelectItem>
                          <SelectItem value="kw">Kuwait</SelectItem>
                          <SelectItem value="lv">Latvia</SelectItem>
                          <SelectItem value="lt">Lithuania</SelectItem>
                          <SelectItem value="my">Malaysia</SelectItem>
                          <SelectItem value="mx">Mexico</SelectItem>
                          <SelectItem value="ma">Morocco</SelectItem>
                          <SelectItem value="nl">Netherlands</SelectItem>
                          <SelectItem value="nz">New Zealand</SelectItem>
                          <SelectItem value="ng">Nigeria</SelectItem>
                          <SelectItem value="no">Norway</SelectItem>
                          <SelectItem value="pe">Peru</SelectItem>
                          <SelectItem value="ph">Philippines</SelectItem>
                          <SelectItem value="pl">Poland</SelectItem>
                          <SelectItem value="pt">Portugal</SelectItem>
                          <SelectItem value="qa">Qatar</SelectItem>
                          <SelectItem value="ro">Romania</SelectItem>
                          <SelectItem value="ru">Russia</SelectItem>
                          <SelectItem value="sa">Saudi Arabia</SelectItem>
                          <SelectItem value="sg">Singapore</SelectItem>
                          <SelectItem value="sk">Slovakia</SelectItem>
                          <SelectItem value="si">Slovenia</SelectItem>
                          <SelectItem value="za">South Africa</SelectItem>
                          <SelectItem value="kr">South Korea</SelectItem>
                          <SelectItem value="es">Spain</SelectItem>
                          <SelectItem value="se">Sweden</SelectItem>
                          <SelectItem value="ch">Switzerland</SelectItem>
                          <SelectItem value="tw">Taiwan</SelectItem>
                          <SelectItem value="th">Thailand</SelectItem>
                          <SelectItem value="tr">Turkey</SelectItem>
                          <SelectItem value="ua">Ukraine</SelectItem>
                          <SelectItem value="ae">United Arab Emirates</SelectItem>
                          <SelectItem value="ve">Venezuela</SelectItem>
                          <SelectItem value="vn">Vietnam</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {showOtherCountry && (
                        <div className="mt-2">
                          <Label htmlFor="otherCountry">Please specify your country</Label>
                          <Input 
                            id="otherCountry"
                            {...register("otherCountry", { 
                              required: showOtherCountry ? "Please specify your country" : false 
                            })}
                            placeholder="Enter your country"
                          />
                          {errors.otherCountry && <p className="text-sm text-destructive">{errors.otherCountry.message}</p>}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="city">City/Town *</Label>
                      <Input 
                        id="city"
                        {...register("city", { required: "City is required" })}
                        placeholder="Enter your city"
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location Information
                  </CardTitle>
                  <CardDescription>
                    Set your location on the map or enter coordinates manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 rounded-lg border">
                    <MapboxLocationPicker
                      coordinates={coordinates}
                      onCoordinatesChange={handleCoordinatesChange}
                      zoom={10}
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="latitude">Latitude</Label>
                      <Input 
                        id="latitude"
                        {...register("latitude")}
                        value={watch("latitude")}
                        onChange={(e) => {
                          setValue("latitude", e.target.value);
                          const lat = parseFloat(e.target.value);
                          const lng = parseFloat(watch("longitude"));
                          if (!isNaN(lat) && !isNaN(lng)) {
                            setCoordinates({ lat, lng });
                            setValue("coordinates", { lat, lng });
                          }
                        }}
                        placeholder="e.g., 40.7128"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longitude">Longitude</Label>
                      <Input 
                        id="longitude"
                        {...register("longitude")}
                        value={watch("longitude")}
                        onChange={(e) => {
                          setValue("longitude", e.target.value);
                          const lng = parseFloat(e.target.value);
                          const lat = parseFloat(watch("latitude"));
                          if (!isNaN(lat) && !isNaN(lng)) {
                            setCoordinates({ lat, lng });
                            setValue("coordinates", { lat, lng });
                          }
                        }}
                        placeholder="e.g., -74.0060"
                      />
                    </div>
                    <div>
                      <Label htmlFor="plusCode">Google Plus Code</Label>
                      <Input 
                        id="plusCode"
                        {...register("plusCode")}
                        placeholder="e.g., 87G8Q23M+GF"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Skills & Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="professionalTitle">Professional Title</Label>
                      <Input 
                        id="professionalTitle"
                        {...register("professionalTitle")}
                        placeholder="e.g., Photographer, Videographer, Drone Operator"
                      />
                    </div>
                    <div>
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Select onValueChange={(value) => setValue("yearsExperience", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="<1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Industries Served</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {["Real Estate", "Yachting", "Hospitality", "Retail", "Architecture", "Other"].map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox 
                            id={industry}
                            checked={industriesServed.includes(industry)}
                            onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                          />
                          <Label htmlFor={industry} className="text-sm">{industry}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Platforms Used</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {["Matterport", "Kuula", "Zillow 3D", "Ricoh Tours", "Custom 360", "Other"].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox 
                            id={platform}
                            checked={platformsUsed.includes(platform)}
                            onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
                          />
                          <Label htmlFor={platform} className="text-sm">{platform}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="portfolioLink">Link to Portfolio</Label>
                    <Input 
                      id="portfolioLink"
                      {...register("portfolioLink")}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sampleWork">Upload Sample Work (Max 3 files)</Label>
                    <Input 
                      id="sampleWork"
                      type="file"
                      multiple
                      accept="image/*,video/*,.zip"
                      {...register("sampleWork")}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Images, videos, or zipped folder</p>
                  </div>
                </CardContent>
              </Card>

              {/* Equipment Inventory */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Equipment Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="ownsEquipment"
                      {...register("ownsEquipment")}
                      onCheckedChange={(checked) => setValue("ownsEquipment", checked as boolean)}
                    />
                    <Label htmlFor="ownsEquipment">I own capture equipment</Label>
                  </div>

                  {ownsEquipment && (
                    <div className="space-y-4 border-l-2 border-primary/20 pl-4">
                      <div>
                        <Label htmlFor="camera360Models">360° Camera Model(s)</Label>
                        <Input 
                          id="camera360Models"
                          {...register("camera360Models")}
                          placeholder="e.g., Ricoh Theta Z1, Insta360 One X2"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="dslrModels">DSLR/Video Camera Model(s)</Label>
                        <Input 
                          id="dslrModels"
                          {...register("dslrModels")}
                          placeholder="e.g., Canon EOS R5, Sony A7III"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="droneModels">Drone Model(s)</Label>
                        <Input 
                          id="droneModels"
                          {...register("droneModels")}
                          placeholder="e.g., DJI Mavic 3, Mini 4 Pro"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="otherEquipment">Other Equipment</Label>
                        <Input 
                          id="otherEquipment"
                          {...register("otherEquipment")}
                          placeholder="e.g., Gimbal, Lighting, Tripod, VR-ready laptop"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="softwareUsed">Software You Use</Label>
                        <Input 
                          id="softwareUsed"
                          {...register("softwareUsed")}
                          placeholder="e.g., Matterport, Final Cut, Photoshop, Lightroom"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Availability & Coverage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Availability & Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="availableForProjects"
                      {...register("availableForProjects")}
                      onCheckedChange={(checked) => setValue("availableForProjects", checked as boolean)}
                    />
                    <Label htmlFor="availableForProjects">I am available for projects</Label>
                  </div>

                  <div>
                    <Label>Areas You Can Cover</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {["Local City", "State/Province", "National", "International", "Remote Work", "Travel Projects"].map((area) => (
                        <div key={area} className="flex items-center space-x-2">
                          <Checkbox 
                            id={area}
                            checked={coverageAreas.includes(area)}
                            onCheckedChange={(checked) => handleCoverageChange(area, checked as boolean)}
                          />
                          <Label htmlFor={area} className="text-sm">{area}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select onValueChange={(value) => setValue("availability", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="on-request">On request</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="willingToTravel"
                      {...register("willingToTravel")}
                      onCheckedChange={(checked) => setValue("willingToTravel", checked as boolean)}
                    />
                    <Label htmlFor="willingToTravel">Willing to travel (domestic/international)</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Training & Certification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Training & Certification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="virtualTourExperience"
                      {...register("virtualTourExperience")}
                      onCheckedChange={(checked) => setValue("virtualTourExperience", checked as boolean)}
                    />
                    <Label htmlFor="virtualTourExperience">I have worked with virtual tours before</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wantsFreeTraining"
                      {...register("wantsFreeTraining")}
                      onCheckedChange={(checked) => setValue("wantsFreeTraining", checked as boolean)}
                    />
                    <Label htmlFor="wantsFreeTraining">I would like free Xplor training</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="wantsCertificationBadge"
                      {...register("wantsCertificationBadge")}
                      onCheckedChange={(checked) => setValue("wantsCertificationBadge", checked as boolean)}
                    />
                    <Label htmlFor="wantsCertificationBadge">I'm interested in certification badge for website/profile</Label>
                  </div>

                  <div>
                    <Label htmlFor="preferredLanguage">Preferred Language for Training</Label>
                    <Select onValueChange={(value) => setValue("preferredLanguage", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Legal & Verification */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Legal & Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessName">Business Name (if any)</Label>
                      <Input 
                        id="businessName"
                        {...register("businessName")}
                        placeholder="Your Business Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vatTaxId">VAT/Tax ID</Label>
                      <Input 
                        id="vatTaxId"
                        {...register("vatTaxId")}
                        placeholder="Tax identification number"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="registeredCompany"
                      {...register("registeredCompany")}
                      onCheckedChange={(checked) => setValue("registeredCompany", checked as boolean)}
                    />
                    <Label htmlFor="registeredCompany">I have a registered company</Label>
                  </div>

                  <div>
                    <Label htmlFor="proofOfId">Proof of ID (Passport or Driver's License)</Label>
                    <Input 
                      id="proofOfId"
                      type="file"
                      accept="image/*,.pdf"
                      {...register("proofOfId")}
                    />
                  </div>

                  <div>
                    <Label htmlFor="proofOfWork">Proof of Work (Invoice or Client Contract)</Label>
                    <Input 
                      id="proofOfWork"
                      type="file"
                      accept="image/*,.pdf"
                      {...register("proofOfWork")}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Optional for experienced applicants</p>
                  </div>

                  <div>
                    <Label htmlFor="socialMediaLinkedin">Social Media / LinkedIn</Label>
                    <Input 
                      id="socialMediaLinkedin"
                      {...register("socialMediaLinkedin")}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="hasInsurance"
                      {...register("hasInsurance")}
                      onCheckedChange={(checked) => setValue("hasInsurance", checked as boolean)}
                    />
                    <Label htmlFor="hasInsurance">I have liability/drone insurance</Label>
                  </div>

                  {watch("hasInsurance") && (
                    <div>
                      <Label htmlFor="insuranceUpload">Insurance Documentation</Label>
                      <Input 
                        id="insuranceUpload"
                        type="file"
                        accept=".pdf,image/*"
                        {...register("insuranceUpload")}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Final Declarations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Final Declarations & Submission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="agreeToTerms"
                      {...register("agreeToTerms", { required: "You must agree to the terms and conditions" })}
                      onCheckedChange={(checked) => setValue("agreeToTerms", checked as boolean)}
                    />
                    <Label htmlFor="agreeToTerms">I agree to Xplor Technician Terms & Conditions *</Label>
                  </div>
                  {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="subscribeToUpdates"
                      {...register("subscribeToUpdates")}
                      onCheckedChange={(checked) => setValue("subscribeToUpdates", checked as boolean)}
                    />
                    <Label htmlFor="subscribeToUpdates">Subscribe to Creator Updates / Opportunities</Label>
                  </div>

                  <div>
                    <Label htmlFor="notes">Notes or Questions</Label>
                    <Textarea 
                      id="notes"
                      {...register("notes")}
                      placeholder="Any additional information or questions you'd like to share..."
                      rows={4}
                    />
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button type="submit" size="lg" className="flex-1">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Submit Verification Application
                    </Button>
                    <Button type="button" variant="outline" size="lg" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Portfolio Upload
                </CardTitle>
                <CardDescription>
                  Upload your best work samples and provide links to showcase your expertise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Virtual Tours */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Virtual Tours</h3>
                  </div>
                  <div>
                    <Label htmlFor="virtualTourFiles">Upload Files</Label>
                    <Input 
                      id="virtualTourFiles"
                      type="file"
                      multiple
                      accept="image/*,video/*,.zip"
                      {...register("virtualTourFiles")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="virtualTourUrls">URLs (one per line)</Label>
                    <Textarea 
                      id="virtualTourUrls"
                      {...register("virtualTourUrls")}
                      placeholder="https://example.com/tour1&#10;https://example.com/tour2"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Drone Footage */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Drone Footage</h3>
                  </div>
                  <div>
                    <Label htmlFor="droneFootageFiles">Upload Files</Label>
                    <Input 
                      id="droneFootageFiles"
                      type="file"
                      multiple
                      accept="video/*,image/*"
                      {...register("droneFootageFiles")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="droneFootageUrls">URLs (one per line)</Label>
                    <Textarea 
                      id="droneFootageUrls"
                      {...register("droneFootageUrls")}
                      placeholder="https://youtube.com/watch?v=example&#10;https://vimeo.com/example"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Photographs */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Photographs</h3>
                  </div>
                  <div>
                    <Label htmlFor="photographFiles">Upload Files</Label>
                    <Input 
                      id="photographFiles"
                      type="file"
                      multiple
                      accept="image/*"
                      {...register("photographFiles")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="photographUrls">URLs (one per line)</Label>
                    <Textarea 
                      id="photographUrls"
                      {...register("photographUrls")}
                      placeholder="https://flickr.com/photos/example&#10;https://instagram.com/p/example"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Videos */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Videos</h3>
                  </div>
                  <div>
                    <Label htmlFor="videoFiles">Upload Files</Label>
                    <Input 
                      id="videoFiles"
                      type="file"
                      multiple
                      accept="video/*"
                      {...register("videoFiles")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="videoUrls">URLs (one per line)</Label>
                    <Textarea 
                      id="videoUrls"
                      {...register("videoUrls")}
                      placeholder="https://youtube.com/watch?v=example&#10;https://vimeo.com/example"
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Documents */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Documents</h3>
                  </div>
                  <div>
                    <Label htmlFor="documentFiles">Upload Files</Label>
                    <Input 
                      id="documentFiles"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      {...register("documentFiles")}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Certificates, testimonials, case studies, etc.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationForm;