import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Anchor, Clock, MapPin, Shield, Star, CheckCircle, Waves, Users, Camera, ArrowRight, Ship, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import yachtHeroImage from "@/assets/yacht-hero-man-with-equipment.jpg";
import northropJohnsonLogo from "@/assets/northrop-johnson-logo.jpg";
import burgessYachtsLogo from "@/assets/burgess-yachts-logo.jpg";
import fraserYachtsLogo from "@/assets/fraser-yachts-logo.jpg";
import edmistonLogo from "@/assets/edmiston-logo.jpg";
import camperNicholsonsLogo from "@/assets/camper-nicholsons-logo.jpg";

const YachtBrokerage = () => {
  const navigate = useNavigate();

  const openCalendly = () => {
    window.open('https://calendly.com/xplor-info/30min', '_blank');
  };

  const goToCrewOffer = () => {
    navigate('/yacht-crew-offer');
  };

  const yachtServices = [{
    id: "listing",
    label: "Yacht Listings",
    title: "Immersive yacht showcase experiences",
    description: "Create stunning virtual tours that allow potential buyers to explore every inch of your yacht remotely, increasing qualified leads and accelerating sales."
  }, {
    id: "marketing",
    label: "Marketing & Sales", 
    title: "Elevate your yacht marketing",
    description: "Stand out in competitive markets with high-quality virtual tours that showcase your yacht's unique features and luxury amenities."
  }, {
    id: "documentation",
    label: "Documentation",
    title: "Comprehensive yacht documentation",
    description: "Create detailed digital records for insurance claims, maintenance planning, and condition assessments with millimeter-accurate 3D scans."
  }];

  const yachtFeatures = ["Professional marine-certified capture technicians", "Waterproof and marine-grade 3D scanning equipment", "360° virtual tours of all decks and interior spaces", "High-resolution 4K photography and videography", "Detailed measurements and floor plans", "Virtual staging and enhancement options", "Drone exterior footage (where permitted)", "Fast 24-48 hour turnaround time"];

  const premiumFeatures = ["Dedicated yacht marketing specialist", "Custom virtual tour branding and themes", "Interactive hotspots with yacht specifications", "Virtual reality headset compatibility", "Multi-language support for international buyers", "Integration with major yacht listing platforms", "Professional copywriting and descriptions", "Ongoing tour optimization and analytics"];

  const yachtBrokers = [{
    name: "Northrop & Johnson",
    logo: northropJohnsonLogo
  }, {
    name: "Burgess Yachts",
    logo: burgessYachtsLogo
  }, {
    name: "Fraser Yachts", 
    logo: fraserYachtsLogo
  }, {
    name: "Edmiston",
    logo: edmistonLogo
  }, {
    name: "Camper & Nicholsons",
    logo: camperNicholsonsLogo
  }, {
    name: "Worth Avenue Yachts",
    logo: "/logos/worth-avenue-yachts-logo.png"
  }];

  const yachtFaqs = [{
    question: "Can you capture yachts while they're in the water?",
    answer: "Yes, our marine-certified technicians are equipped to safely capture yachts both in marinas and while moored, using specialized waterproof equipment designed for marine environments."
  }, {
    question: "How long does it take to capture a yacht?",
    answer: "Capture time varies by yacht size - typically 2-4 hours for motor yachts up to 100ft, and 4-8 hours for superyachts. Weather conditions may affect scheduling."
  }, {
    question: "Do you capture exterior deck spaces and equipment?",
    answer: "Absolutely. We capture all accessible areas including upper decks, flybridge, swim platforms, tender garages, and exterior equipment areas to provide a complete virtual experience."
  }, {
    question: "Can virtual tours be integrated with yacht listing websites?",
    answer: "Yes, our virtual tours integrate seamlessly with major yacht listing platforms like YachtWorld, Boat Trader, and custom broker websites."
  }, {
    question: "What about international yacht captures?",
    answer: "We have a global network of certified marine capture technicians in major yachting destinations worldwide including Monaco, Fort Lauderdale, Newport, and the Caribbean."
  }, {
    question: "How much does yacht capture service cost?",
    answer: "Pricing depends on yacht size, location, and services required. Standard captures start at $650 for yachts under 50ft, with premium packages available for superyachts."
  }];

  return <div className="min-h-screen bg-background">
      {/* Crew Call-to-Action Banner */}
      <section className="bg-blue-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium">
            CALLING ALL YACHT CREW, if you want to change the yachting industry for ever, so that you are the one's in charge, 
            <button className="underline ml-1 hover:text-blue-200 transition-colors" onClick={goToCrewOffer}>
              click here
            </button>
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge className="bg-blue-100 text-blue-800 font-medium">
                YACHT BROKERAGE SERVICES
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Showcase yachts like never before.
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">Digital twin technology feels like it was specifically designed for the yachting industry. From helping buyers experience every detail of your yacht remotely, helping close deals faster, to making weekly progress scans of your new build yacht still in construction.....and then think of the implications of the unprecedented visual details (and accurate measurements) for planned maintenance & design changes. </p>
            <p className="text-xl text-muted-foreground">Your additional text content goes here.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={openCalendly}>
                <Anchor className="h-5 w-5 mr-2" />
                Add Your Yacht
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/vr-cameras'}>
                <Camera className="h-5 w-5 mr-2" />
                Marine Equipment
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src={yachtHeroImage} alt="Professional man on yacht deck showcasing yacht capture services" className="w-full h-auto rounded-lg shadow-medium" />
          </div>
        </div>
      </section>

      {/* Yacht Services */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              3D solutions for the yacht industry.
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform how you market and sell yachts with immersive virtual experiences that let 
              buyers explore vessels remotely, anywhere in the world.
            </p>
          </div>

          <Tabs defaultValue="listing" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {yachtServices.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="text-sm">
                  {tab.label}
                </TabsTrigger>)}
            </TabsList>
            
            {yachtServices.map(tab => <TabsContent key={tab.id} value={tab.id} className="space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{tab.title}</h3>
                  <p className="text-muted-foreground">{tab.description}</p>
                </div>
                
                {/* Demo Yachts */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[{
                name: "Sunseeker 76 Yacht (DEMO)",
                type: "Motor Yacht"
              }, {
                name: "Ferretti 920 (DEMO)",
                type: "Luxury Motor Yacht"
              }, {
                name: "Princess S78 Sportbridge (DEMO)",
                type: "Sport Yacht"
              }].map(demo => <Card key={demo.name} className="border-border hover:shadow-medium transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-t-lg relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Ship className="h-12 w-12 text-blue-600" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{demo.name}</CardTitle>
                        <CardDescription>{demo.type}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          <Waves className="h-4 w-4 mr-2" />
                          Tour Virtual Yacht
                        </Button>
                      </CardContent>
                    </Card>)}
                </div>
              </TabsContent>)}
          </Tabs>
        </div>
      </section>

      {/* Marine Expertise */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Marine-certified expertise, worldwide availability.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our certified marine technicians understand the unique challenges of yacht photography and 3D capture. 
            Available in major yachting destinations worldwide with specialized waterproof equipment.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={openCalendly}>
            <Globe className="h-5 w-5 mr-2" />
            Find Technician Near You
          </Button>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              For brokers and yachts of all sizes.
            </h2>
            <p className="text-lg text-muted-foreground">
              Yacht capture services designed for everyone from independent brokers to large brokerage houses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Standard Yacht Capture */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Standard Yacht Capture</CardTitle>
                <CardDescription className="text-lg">
                  Professional 3D tours and photography for effective yacht marketing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {yachtFeatures.map((feature, index) => <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>)}
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={openCalendly}>
                  <Anchor className="h-4 w-4 mr-2" />
                  Book Standard Capture
                </Button>
              </CardContent>
            </Card>

            {/* Premium Yacht Marketing */}
            <Card className="border-border border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Premium Yacht Marketing</CardTitle>
                <CardDescription className="text-lg">
                  Complete marketing solution with enhanced features for luxury yacht sales.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {premiumFeatures.map((feature, index) => <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>)}
                </div>
                <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">
                  Contact Yacht Specialist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Yacht Brokers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Trusted by leading yacht brokers worldwide
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-80">
              {yachtBrokers.map(broker => <div key={broker.name} className="text-center flex flex-col items-center">
                  <div className="h-12 w-auto mb-3 flex items-center justify-center">
                    <img src={broker.logo} alt={`${broker.name} logo`} className="h-11 w-auto max-w-24 object-contain opacity-100 contrast-150 brightness-125 saturate-150 hover:scale-105 transition-all duration-300" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{broker.name}</span>
                </div>)}
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
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-blue-500 text-blue-500" />)}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "The virtual tours have transformed how we present yachts to international buyers. 
                  We can now qualify serious prospects before they even step aboard, which saves everyone time and increases our closing rate significantly."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Anchor className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Captain Marina Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Senior Yacht Broker | Monaco Marine Group</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-blue-500 text-blue-500" />)}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "Having detailed 3D documentation has been invaluable for insurance claims and condition surveys. 
                  The accuracy is incredible and it's much more convenient than traditional surveying methods."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">James Mitchell</p>
                    <p className="text-sm text-muted-foreground">Marine Surveyor | Atlantic Yacht Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently asked questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our yacht capture services.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {yachtFaqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to revolutionize your yacht marketing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join leading yacht brokers who are already using 3D virtual tours to sell more yachts faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={openCalendly}>
              <Anchor className="h-5 w-5 mr-2" />
              Schedule Yacht Capture
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Ship className="h-5 w-5 mr-2" />
              View Demo Tours
            </Button>
          </div>
        </div>
      </section>
    </div>;
};

export default YachtBrokerage;
