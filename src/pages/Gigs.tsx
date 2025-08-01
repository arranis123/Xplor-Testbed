import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Camera, 
  Plane, 
  MapPin, 
  DollarSign, 
  Globe, 
  TrendingUp, 
  GraduationCap,
  CheckCircle,
  Users,
  Star,
  Download,
  Briefcase,
  Clock,
  Award
} from "lucide-react";

const Gigs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    skillLevel: "",
    equipment: "",
    portfolio: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, portfolio: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you within 48 hours.",
    });
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/yacht-hero-man-with-equipment.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Become a Tour Pro for <span className="text-primary">xplor</span> and Join the Future of Virtual Exploration
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Become a Verified Xplor Technician. Capture spaces. Earn income. Work anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              <CheckCircle className="mr-2 h-5 w-5" />
              Apply Now
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Start Your Verification
            </Button>
          </div>
        </div>
      </section>

      {/* Who We're Looking For */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Are You a Content Creator, Photographer, or Virtual Tour Specialist?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Camera className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Professional Photographers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Seeking new income streams and opportunities to showcase your skills on a global platform.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Plane className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Matterport/360°/Drone Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Experienced with virtual tour technology and aerial capture systems.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real Estate & Hospitality Specialists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Media specialists working in luxury properties, hotels, and yacht industries.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Beginners Ready to Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Ready to learn high-demand digital skills in the virtual tour industry.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Small Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Offering capture services and looking to expand your client base.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Flexible Workers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Looking for part-time or freelance opportunities with flexible scheduling.</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Register Your Interest
            </Button>
          </div>
        </div>
      </section>

      {/* Why Join Xplor */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Become a Certified Xplor Technician?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Work on Your Terms</h3>
              <p className="text-muted-foreground">Freelance locally or travel globally with complete flexibility over your schedule.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Earn Per Project</h3>
              <p className="text-muted-foreground">We send projects to you depending on your location and availability.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Global Exposure</h3>
              <p className="text-muted-foreground">Showcase your portfolio featured on a world-class platform.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expand Your Skills</h3>
              <p className="text-muted-foreground">Up-to-date notifications on the latest training, tech and tools.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Official Verification</h3>
              <p className="text-muted-foreground">Gain credibility with verified credentials and our ratings & reviews system.</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Support</h3>
              <p className="text-muted-foreground">Join a network of professionals and get ongoing support from our team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Simple Steps to Get Certified
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: "1", title: "Apply Online", description: "Complete our simple application form" },
              { step: "2", title: "Complete Free Onboarding", description: "Access our training materials and resources" },
              { step: "3", title: "Pass the Verification Test", description: "Demonstrate your skills and knowledge" },
              { step: "4", title: "Get Matched to Projects", description: "Receive projects in your area" },
              { step: "5", title: "Capture Tours, Get Paid", description: "Grow with us and build your reputation" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Verified Now
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Our Verified Creators
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Maria Santos</h3>
                    <p className="text-muted-foreground text-sm">Lisbon-based Drone Pilot</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"Working with Xplor has transformed my photography business. I've captured stunning properties across Europe and built an amazing portfolio."</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Plane className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ahmed Al-Rashid</h3>
                    <p className="text-muted-foreground text-sm">Dubai Yacht Photographer</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"The luxury yacht market in Dubai is incredible. Xplor connected me with high-end clients I never would have reached on my own."</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Jennifer Park</h3>
                    <p className="text-muted-foreground text-sm">Real Estate Specialist, NYC</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"Started as a beginner with no VR experience. Now I'm the top-rated technician in Manhattan, earning 6 figures annually."</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="equipment">
              <AccordionTrigger className="text-left">What equipment do I need?</AccordionTrigger>
              <AccordionContent>
                We support various equipment levels. Basic requirements include a smartphone or camera capable of 360° capture. We also work with Matterport cameras, Insta360 cameras, drones, and professional photography equipment. Don't have equipment? We can help you get started with rental programs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="part-time">
              <AccordionTrigger className="text-left">Can I do this part-time?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Many of our technicians work part-time around their existing schedules. You choose when you're available and we match you with projects that fit your timeline.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earnings">
              <AccordionTrigger className="text-left">How much can I earn?</AccordionTrigger>
              <AccordionContent>
                Earnings vary by location, project type, and experience level. Entry-level technicians typically earn $200-500 per project, while experienced professionals can earn $1,000-5,000+ for luxury properties and yachts. Top performers earn $50,000-150,000+ annually.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="training">
              <AccordionTrigger className="text-left">Is training really free?</AccordionTrigger>
              <AccordionContent>
                Yes! Our comprehensive onboarding and training program is completely free. This includes access to our learning platform, technical guides, best practices, and ongoing support from our team.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support">
              <AccordionTrigger className="text-left">What support do I get from Xplor?</AccordionTrigger>
              <AccordionContent>
                You'll receive dedicated account management, technical support, marketing assistance, equipment recommendations, ongoing training updates, and access to our community of verified technicians worldwide.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Start Capturing the World?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our growing global network and turn your skills into revenue with Xplor.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
              <CardDescription>Tell us about yourself and let's get started</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input 
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input 
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Skill Level</label>
                  <Select onValueChange={(value) => handleInputChange("skillLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner - New to virtual tours</SelectItem>
                      <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                      <SelectItem value="professional">Professional - Experienced photographer/operator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Equipment Owned</label>
                  <Textarea 
                    placeholder="List any cameras, drones, or VR equipment you own"
                    value={formData.equipment}
                    onChange={(e) => handleInputChange("equipment", e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Portfolio Upload (Optional)</label>
                  <Input 
                    type="file"
                    accept=".pdf,.zip,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload portfolio files (PDF, ZIP, or images)
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button type="submit" size="lg" className="flex-1">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Become a Certified Technician
                  </Button>
                  <Button type="button" variant="outline" size="lg">
                    <Download className="mr-2 h-5 w-5" />
                    Download Info Pack
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Gigs;