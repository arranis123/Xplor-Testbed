import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Camera, 
  MapPin, 
  Star, 
  CheckCircle, 
  Upload, 
  Building,
  Users,
  Clock,
  DollarSign,
  Shield,
  Award
} from "lucide-react";

const CaptureBusinessSignup = () => {
  const requirements = [
    "Professional 3D camera equipment (Pro3, Pro2, or equivalent)",
    "Minimum 2 years experience in photography or 3D capture",
    "Valid business license and insurance",
    "Portfolio of at least 10 completed capture projects",
    "Reliable transportation and ability to travel within service area",
    "Professional communication skills and customer service experience"
  ];

  const benefits = [
    { icon: DollarSign, title: "Competitive Earnings", description: "Starting at $150-300 per capture session" },
    { icon: Clock, title: "Flexible Schedule", description: "Choose your own hours and availability" },
    { icon: MapPin, title: "Local Opportunities", description: "Work in your area with minimal travel" },
    { icon: Shield, title: "Full Support", description: "Training, technical support, and marketing assistance" },
    { icon: Award, title: "Professional Growth", description: "Join a network of certified professionals" },
    { icon: Users, title: "Steady Work", description: "Access to growing demand for virtual tours" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-xplor-yellow/10 to-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge className="bg-xplor-yellow text-xplor-black font-medium mb-4">
              JOIN OUR NETWORK
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Become a Certified Capture Technician
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join xplor's global network of professional capture technicians and help businesses 
              create stunning digital twins while building your own thriving capture services business.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Partner with xplor?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-xplor-yellow rounded-full flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-xplor-black" />
                    </div>
                    <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Certification Requirements
          </h2>
          <Card className="border-border">
            <CardContent className="p-8">
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{requirement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Apply to Join Our Network
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete the application below to start your journey as a certified capture technician.
            </p>
          </div>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Business Application</CardTitle>
              <CardDescription>
                Please provide detailed information about your business and experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Business Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input id="businessName" placeholder="Your Photography Business LLC" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="llc">LLC</SelectItem>
                        <SelectItem value="corporation">Corporation</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input id="website" type="url" placeholder="https://yourwebsite.com" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Trading Location */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Service Area & Location
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Primary City *</Label>
                    <Input id="city" placeholder="San Francisco" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input id="state" placeholder="California" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" placeholder="United States" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceRadius">Service Radius (miles) *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select service radius" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">Up to 25 miles</SelectItem>
                        <SelectItem value="50">Up to 50 miles</SelectItem>
                        <SelectItem value="100">Up to 100 miles</SelectItem>
                        <SelectItem value="unlimited">Unlimited (travel anywhere)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalAreas">Additional Service Areas</Label>
                  <Textarea 
                    id="additionalAreas" 
                    placeholder="List any additional cities or regions you can service..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>

              <Separator />

              {/* Equipment & Experience */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Equipment & Experience
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="equipment">Camera Equipment *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select your primary equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pro3">xplor Pro3 Camera</SelectItem>
                        <SelectItem value="pro2">xplor Pro2 Camera</SelectItem>
                        <SelectItem value="ricoh-z1">Ricoh Theta Z1</SelectItem>
                        <SelectItem value="other-lidar">Other LiDAR Camera</SelectItem>
                        <SelectItem value="dslr-360">DSLR + 360° Equipment</SelectItem>
                        <SelectItem value="other">Other (please specify)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of 3D/360° Photography Experience *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-3">2-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousWork">Previous Work Description *</Label>
                    <Textarea 
                      id="previousWork" 
                      placeholder="Describe your experience with real estate photography, 3D scanning, virtual tours, or related services..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Portfolio & Samples */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Portfolio & Samples
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl">Portfolio Website/Gallery URL *</Label>
                    <Input 
                      id="portfolioUrl" 
                      type="url" 
                      placeholder="https://yourportfolio.com"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sampleUrls">Sample Work URLs</Label>
                    <Textarea 
                      id="sampleUrls" 
                      placeholder="Please provide 3-5 URLs of your best work (virtual tours, 3D scans, property photos)..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientTypes">Types of Properties You've Captured</Label>
                    <Textarea 
                      id="clientTypes" 
                      placeholder="e.g., Residential homes, Commercial spaces, Retail stores, Hotels, etc..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Availability & Pricing */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Availability & Rates
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="availability">Weekly Availability *</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="part-time">Part-time (10-20 hours/week)</SelectItem>
                        <SelectItem value="full-time">Full-time (30+ hours/week)</SelectItem>
                        <SelectItem value="weekends">Weekends only</SelectItem>
                        <SelectItem value="flexible">Flexible/On-demand</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rates">Desired Rate per Session</Label>
                    <Select>
                      <SelectTrigger className="border-2 border-border">
                        <SelectValue placeholder="Select rate range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="150-200">$150-200</SelectItem>
                        <SelectItem value="200-250">$200-250</SelectItem>
                        <SelectItem value="250-300">$250-300</SelectItem>
                        <SelectItem value="300+">$300+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea 
                    id="additionalInfo" 
                    placeholder="Tell us anything else you'd like us to know about your business, specialties, or goals..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  size="lg" 
                  className="w-full bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black"
                >
                  Submit Application
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Applications are typically reviewed within 3-5 business days. We'll contact you 
                  via email with next steps.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Application Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Apply", description: "Complete the application form" },
              { step: "2", title: "Review", description: "We review your application and portfolio" },
              { step: "3", title: "Interview", description: "Brief video call to discuss partnership" },
              { step: "4", title: "Onboard", description: "Training and certification process" }
            ].map((item) => (
              <Card key={item.step} className="border-border text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-xplor-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xplor-black font-bold text-lg">{item.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaptureBusinessSignup;