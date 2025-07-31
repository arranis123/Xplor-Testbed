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
      <section className="bg-xplor-black text-white py-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-lg font-medium">
            CALLING ALL YACHT CREW, The <span className="font-typografix">xplor</span> brokerage has been set up to allow crew to get their share of charter commissions, Interested ?
            <button className="underline ml-1 hover:text-gray-700 transition-colors" onClick={goToCrewOffer}>
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
              <Badge className="bg-gray-700/20 text-gray-700 font-medium">
                YACHT BROKERAGE SERVICES
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Showcase yachts like never before.
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">Digital twin technology feels like it was specifically designed for the yachting industry. From helping buyers experience every detail of your yacht remotely, helping close deals faster, to making weekly progress scans of your new build yacht still in construction.....and then think of the implications of the unprecedented visual details (and accurate measurements) for planned maintenance & design changes. </p>
            <p className="text-xl text-muted-foreground">Your additional text content goes here.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gray-700 hover:bg-gray-800 text-white" onClick={openCalendly}>
                <Anchor className="h-5 w-5 mr-2" />
                Add Your Yacht
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/vr-cameras'}>
                <Camera className="h-5 w-5 mr-2" />
                Marine Equipment
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <img src={yachtHeroImage} alt="Professional man on yacht deck showcasing yacht capture services" className="w-full h-auto rounded-lg shadow-medium" />
            <div className="flex justify-center">
              <Button size="lg" className="bg-gray-700 hover:bg-gray-800 text-white" onClick={openCalendly}>
                <Globe className="h-5 w-5 mr-2" />
                Find a Technician Near You
              </Button>
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-muted-foreground">
                Are you a technician or capture service provider who wants to add yachts to your Portfolio & skill set? <a href="/capture-business-signup" className="text-gray-700 underline hover:text-gray-800 transition-colors">Click Here</a>
              </p>
            </div>
            
            {/* Demo Yachts Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-center text-foreground mb-8">Experience Virtual Yacht Tours</h3>
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
                }].map(demo => (
                  <Card key={demo.name} className="border-border hover:shadow-medium transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-t-lg relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Ship className="h-12 w-12 text-gray-700" />
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
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Xplor and Virtual Tours Are Excellent for Yachts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why <span className="font-typografix">xplor</span> and Virtual Tours Are Excellent for Yachts
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Here's a comprehensive list of reasons why <span className="font-typografix">xplor</span> and virtual tours are excellent for yachts, tailored for charter, sale, marketing, and operational use.
            </p>
          </div>


          {/* Why Xplor is Excellent for Yachts - Organized by Category */}
          <div className="space-y-12">
            {/* For Charter and Sales Marketing */}
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                🔹 For Charter and Sales Marketing
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "24/7 Global Showcase",
                    description: "Prospects can explore the yacht anytime, anywhere—no need to wait for a boat show or in-person visit."
                  },
                  {
                    title: "Higher-Quality Leads",
                    description: "Virtual tours qualify serious clients early by providing an immersive pre-screening experience."
                  },
                  {
                    title: "Faster Decision-Making",
                    description: "Buyers and charterers feel more confident making decisions after a detailed virtual walkthrough."
                  },
                  {
                    title: "Reduced Time on Market",
                    description: "Virtual access accelerates interest and inquiry conversion for both sales and charters."
                  },
                  {
                    title: "Pre-Charter Familiarization",
                    description: "Guests can preview staterooms, lounges, and deck layouts before boarding, improving their overall satisfaction."
                  },
                  {
                    title: "Repeat Charterer Retention",
                    description: "Past guests can relive their experience and share it with friends, increasing repeat bookings and word-of-mouth."
                  },
                  {
                    title: "Eliminates Geographical Barriers",
                    description: "Brokers and clients in different countries can still tour the yacht without travel costs or delays."
                  },
                  {
                    title: "Stronger Online Listings",
                    description: "Listings with virtual tours stand out on charter and sales platforms, attracting more engagement."
                  },
                  {
                    title: "Increased Broker Efficiency",
                    description: "Brokers can share virtual tours in seconds, replacing or enhancing traditional brochures and slide decks."
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* For Yacht Owners */}
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                🔹 For Yacht Owners
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Better ROI on Marketing",
                    description: "A single virtual tour investment can be used across websites, broker networks, social media, and presentations."
                  },
                  {
                    title: "More Control Over Presentation",
                    description: "Owners ensure their yacht is shown in its best light, consistently, no matter who presents it."
                  },
                  {
                    title: "Attracts More Direct Bookings",
                    description: "Guests who've virtually toured a yacht are more likely to book directly through xplor, reducing third-party commission outflows."
                  },
                  {
                    title: "Reduces Need for Physical Showings",
                    description: "Minimizes crew disruption and operational costs for in-person visits that may not result in bookings."
                  },
                  {
                    title: "Permanent Showcase for Sale",
                    description: "Even if the yacht is moved or unavailable, a virtual tour keeps it accessible for prospective buyers."
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description.includes('through xplor') ? (
                          <>
                            Guests who've virtually toured a yacht are more likely to book directly through <span className="font-typografix">xplor</span>, reducing third-party commission outflows.
                          </>
                        ) : (
                          benefit.description
                        )}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* For Captains & Crew */}
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                🔹 For Captains & Crew
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Operational Clarity",
                    description: "Guests or clients can see layouts and amenities before arrival, reducing repetitive questions and special requests."
                  },
                  {
                    title: "Crew Onboarding & Training",
                    description: "New crew can familiarize themselves with yacht layout, safety equipment locations, and guest areas virtually."
                  },
                  {
                    title: "Enhances Guest Preparation",
                    description: "Helps guests know what to pack, where they'll stay, and what facilities they'll use."
                  },
                  {
                    title: "Smoother Turnarounds",
                    description: "Less need for guided tours during back-to-back charters—guests already know the vessel layout."
                  },
                  {
                    title: "Showcases Crew Excellence",
                    description: "Virtual tours can highlight crew interaction areas or branded moments that emphasize professionalism."
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* For Yacht Brokers & Central Agents */}
            <div>
              <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                🔹 For Yacht Brokers & Central Agents
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Stronger Pitch to Owners",
                    description: "Offering professional virtual tours adds value to your brokerage proposition and sets you apart."
                  },
                  {
                    title: "More Compelling Marketing Packages",
                    description: "Combine with photography, specs, and drone video for a powerful listing presentation."
                  },
                  {
                    title: "Easier Sharing Across Networks",
                    description: "Tours can be embedded or linked in MLS systems, emails, WhatsApp, and social posts."
                  },
                  {
                    title: "Supports Live Negotiations",
                    description: "During calls or negotiations, brokers can walk through the yacht in real-time with clients using the tour."
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="border-border">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  };

export default YachtBrokerage;
