import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Camera, 
  Clock, 
  MapPin, 
  Shield, 
  Star, 
  CheckCircle, 
  Zap, 
  Users, 
  Building, 
  Home,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import captureHeroImage from "@/assets/capture-services-hero.jpg";
import pro3CameraImage from "@/assets/pro3-camera.jpg";

const CaptureServices = () => {
  const openCalendly = () => {
    window.open('https://calendly.com/xplor-info/30min', '_blank');
  };
  const industryTabs = [
    { 
      id: "design", 
      label: "Design & Construction", 
      title: "3D solutions for Design & Construction",
      description: "Transform your construction and design projects with precise digital twins that enhance collaboration and streamline workflows."
    },
    { 
      id: "marketing", 
      label: "Property Marketing", 
      title: "Elevate your property marketing",
      description: "Create immersive virtual tours that captivate potential buyers and tenants, increasing engagement and accelerating sales."
    },
    { 
      id: "facilities", 
      label: "Facilities Management", 
      title: "Smart facilities management",
      description: "Manage your properties more efficiently with detailed digital records and remote access capabilities."
    }
  ];

  const onDemandFeatures = [
    "See availability instantly and choose a time that works best for you",
    "Available in 200+ cities around the world", 
    "Created by fully vetted and skilled local capture technicians",
    "Receive your digital twin in as fast as 24–48 hours",
    "Property size up to 30,000 sq. ft.",
    "Priced by property location and size",
    "Secure credit card checkout",
    "Starting at $238 (excludes subscription to host and share your twin)"
  ];

  const enterpriseFeatures = [
    "Enhanced Enterprise services to manage and support your projects",
    "Available in 700+ cities around the world",
    "Customized service plans to support your organization's needs", 
    "No property size limit",
    "Access to a Customer Success Manager",
    "Access to robust APIs & SDKs for enterprise-scale automation and integrations",
    "Flexible billing and payment options",
    "Volume discount pricing"
  ];

  const companyLogos = [
    { 
      name: "Marriott International", 
      logo: (
        <img 
          src="/logos/marriott-logo.png" 
          alt="Marriott International" 
          className="h-8 w-auto max-w-24 object-contain"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='20' viewBox='0 0 80 20'%3E%3Crect width='80' height='20' fill='%23B91C1C'/%3E%3Ctext x='40' y='14' text-anchor='middle' fill='white' font-family='Arial' font-size='10' font-weight='bold'%3EMarriott%3C/text%3E%3C/svg%3E";
          }}
        />
      )
    },
    { 
      name: "Hilton Worldwide", 
      logo: (
        <img 
          src="/lovable-uploads/9bfb88d3-dbb4-4763-8f50-fcb672976283.png" 
          alt="Hilton Worldwide" 
          className="h-8 w-auto max-w-20 object-contain opacity-100 contrast-150 brightness-125 saturate-150"
        />
      )
    },
    { 
      name: "H World Group", 
      logo: (
        <img 
          src="/lovable-uploads/6ad3281a-a5d0-44a9-a553-384f5d39e7fa.png" 
          alt="H World Group" 
          className="h-8 w-auto max-w-16 object-contain opacity-100 contrast-150 brightness-125 saturate-150"
        />
      )
    },
    { 
      name: "InterContinental Hotels Group", 
      logo: (
        <img 
          src="/logos/ihg-logo.png" 
          alt="IHG" 
          className="h-8 w-auto max-w-16 object-contain opacity-100 contrast-150 brightness-125 saturate-150"
          onError={(e) => {
            e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='20' viewBox='0 0 50 20'%3E%3Crect width='50' height='20' fill='%23059669'/%3E%3Ctext x='25' y='14' text-anchor='middle' fill='white' font-family='Arial' font-size='10' font-weight='bold'%3EIHG%3C/text%3E%3C/svg%3E";
          }}
        />
      )
    },
    { 
      name: "Wyndham Hotels & Resorts", 
      logo: (
        <img 
          src="/lovable-uploads/6cdc2896-6f3e-4e17-8888-9a915dc6fc19.png" 
          alt="Wyndham Hotels & Resorts" 
          className="h-8 w-auto max-w-24 object-contain opacity-100 contrast-150 brightness-125 saturate-150"
        />
      )
    },
    { 
      name: "Accor", 
      logo: (
        <img 
          src="/lovable-uploads/0c8d415d-b85e-416b-8605-6efa731d96e1.png" 
          alt="Accor" 
          className="h-8 w-auto max-w-16 object-contain opacity-100 contrast-150 brightness-125 saturate-150"
        />
      )
    }
  ];

  const faqs = [
    {
      question: "Is a xplor subscription required to use Capture Services?",
      answer: "Yes, you'll need an active xplor subscription to host and share your digital twins. We offer various subscription plans to meet your needs."
    },
    {
      question: "How long does it take to capture a space?",
      answer: "Capture time depends on the size and complexity of your space. Typically, it takes 1-3 hours for most properties, and your digital twin will be ready in 24-48 hours."
    },
    {
      question: "How do Capture Technicians capture my space?",
      answer: "Our certified technicians use professional 3D LiDAR cameras to scan your space, capturing millions of data points to create an accurate digital twin."
    },
    {
      question: "How do I access my models after my property is captured?",
      answer: "Once processing is complete, you'll receive an email with access to your digital twin through your xplor account dashboard."
    },
    {
      question: "What if I'm not satisfied with the quality of a capture?",
      answer: "We guarantee high-quality results. If you're not satisfied, we'll work with you to recapture the space at no additional cost."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing varies by location and property size. On-Demand services start at $238, while Enterprise solutions offer volume discounts for larger projects."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge className="bg-xplor-yellow text-xplor-black font-medium">
                CAPTURE SERVICES
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Let us create your digital twin for you.
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Professional 3D capture services that transform your spaces into detailed digital twins, 
              so you can access, manage, and promote your properties anytime, from anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" onClick={openCalendly}>
                Book Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/vr-cameras'}>
                VR Cameras & Equipment
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={captureHeroImage} 
              alt="Professional capture technician with 3D scanning equipment"
              className="w-full h-auto rounded-lg shadow-medium"
            />
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              3D solutions for every type of business.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Capture Services is ready to transform all your properties into detailed digital twins, 
              so you can access, manage, and promote your spaces anytime, from anywhere.
            </p>
          </div>

          <Tabs defaultValue="design" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {industryTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {industryTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{tab.title}</h3>
                  <p className="text-muted-foreground">{tab.description}</p>
                </div>
                
                {/* Demo Spaces */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Springfield Steel (DEMO)", type: "Industrial Space" },
                    { name: "712 Mission Hill Rd (DEMO)", type: "Residential Property" },
                    { name: "CRE Facilities Management Demo", type: "Commercial Space" }
                  ].map((demo) => (
                    <Card key={demo.name} className="border-border hover:shadow-medium transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-xplor-yellow/20 to-xplor-grey/20 rounded-t-lg relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Building className="h-12 w-12 text-xplor-yellow" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{demo.name}</CardTitle>
                        <CardDescription>{demo.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          View 3D portfolio
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Speed & Accuracy Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Speed, accuracy, and worldwide availability.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            After your appointment, your digital twins will be ready for you to start using in as fast as 24-48 hours. 
            Use your digital twin to collaborate with your team and create transformative experiences for your customers.
          </p>
          <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" onClick={openCalendly}>
            Book Now
          </Button>
        </div>
      </section>

      {/* Service Plans */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              For teams and spaces of all sizes.
            </h2>
            <p className="text-lg text-muted-foreground">
              Capture Service solutions are designed to support a variety of business needs and sizes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* On-Demand */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">On-Demand</CardTitle>
                <CardDescription className="text-lg">
                  Let us create a high-quality digital twin for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {onDemandFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" onClick={openCalendly}>
                  Book Now
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card className="border-border border-xplor-yellow/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Enterprise Service</CardTitle>
                <CardDescription className="text-lg">
                  Includes all benefits of On-Demand, and more powerful tools for your team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {enterpriseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Trusted by leading companies worldwide
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-60">
              {companyLogos.map((company) => (
                <div key={company.name} className="text-center">
                  <div className="mb-2 flex justify-center">{company.logo}</div>
                  <span className="text-sm text-muted-foreground">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-xplor-yellow text-xplor-yellow" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Today, prospects and existing clients alike expect xplor scans to be part of the process 
                  as they find commercial spaces perfectly suited to their needs. Fortunately, we can now 
                  more easily meet the demands with xplor Capture Services."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-xplor-yellow rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-xplor-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Dreyer</p>
                    <p className="text-sm text-muted-foreground">VP & Head of Americas Research | Savills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-xplor-yellow text-xplor-yellow" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Using xplor Capture Services On-Demand costs 30 percent less than if we send someone 
                  who lives in the same city to do it, and it costs 70 percent less than sending someone 
                  long distance. It makes sense to delegate this to people who capture spaces for a living."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-xplor-yellow rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-xplor-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Lance Amato</p>
                    <p className="text-sm text-muted-foreground">Head of Compliance | Canoa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-green-100 text-green-800 mb-4">
                Certified Capture Technicians
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Committed to providing the highest quality.
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Digital Pro media packages are produced by xplor-certified capture technicians who are 
                highly vetted, expertly trained, and bring years of experience. Their expertise ensures 
                exceptional service and delivers the most effective assets to elevate your property marketing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                  Order Digital Pro Now
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/capture-business-signup'}>
                  Become a Technician
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-xplor-yellow rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-xplor-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Joseph Williams</p>
                    <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-xplor-yellow text-xplor-yellow" />
                    <span className="font-semibold">4.9</span>
                  </div>
                  <span className="text-sm text-muted-foreground">428 models completed</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pro3 Experience */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src={pro3CameraImage} 
                alt="Pro3 LiDAR camera"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Experience Pro3 lidar capture.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our team is ready to create your digital twins worldwide using the most innovative 
                3D <strong>Lidar</strong> camera on the market.
              </p>
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" onClick={openCalendly}>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Capture Services FAQs
          </h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default CaptureServices;