import React from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Hotel, 
  Bed, 
  Utensils, 
  Waves, 
  Sparkles, 
  Globe, 
  Smartphone, 
  BarChart3,
  CheckCircle, 
  ArrowRight, 
  Play, 
  Link,
  Mountain,
  Building,
  Trees,
  Briefcase,
  Users,
  Heart,
  Eye,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  Zap
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import hotelsHero from '@/assets/hotels-hero.jpg';

export default function Hotels() {
  const features = [
    {
      icon: Bed,
      title: "Sell the Stay",
      description: "Let guests see the exact room, view, amenities, and feel before booking"
    },
    {
      icon: Hotel,
      title: "Full-Property Immersion",
      description: "Showcase every space: rooms, dining, spa, gym, pool, meeting spaces"
    },
    {
      icon: Link,
      title: "API Booking Integration",
      description: "Guests can view + book directly, using your existing system"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Showcase to international travelers in multiple languages"
    },
    {
      icon: Smartphone,
      title: "Mobile-Optimized",
      description: "Explore and book from mobile, anywhere in the world"
    },
    {
      icon: BarChart3,
      title: "Better Engagement = Better Conversions",
      description: "Guests who view a tour are more likely to book and less likely to cancel"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Create Your Hotel Profile",
      description: "Add rooms, amenities, property details"
    },
    {
      number: 2,
      title: "Upload or Link Your Virtual Tours",
      description: "Add immersive 3D walkthroughs of rooms, lobby, spa, etc."
    },
    {
      number: 3,
      title: "Enable Booking Plugin",
      description: "Let guests book directly inside the tour, synced with your live inventory"
    }
  ];

  const propertyTypes = [
    { icon: Hotel, name: "Resorts" },
    { icon: Building, name: "Boutique Hotels" },
    { icon: Building, name: "Urban Hotels" },
    { icon: Trees, name: "Eco-Lodges" },
    { icon: Users, name: "Hostels" },
    { icon: Briefcase, name: "Business Hotels" },
    { icon: Heart, name: "Extended Stays" },
    { icon: Sparkles, name: "Spas & Wellness Retreats" }
  ];

  const bookingPlatforms = [
    "Cloudbeds", "SiteMinder", "Opera", "Little Hotelier", 
    "WooCommerce", "Booking.com API", "RMS Cloud", "Hotelogix"
  ];

  const benefits = [
    {
      stat: "300%",
      description: "more time spent on immersive listings"
    },
    {
      stat: "40%",
      description: "less likely to cancel after viewing tours"
    },
    {
      stat: "2x",
      description: "more direct bookings for rooms with virtual tours"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Hotels & Resorts Virtual Tours - Boost Bookings | Xplor</title>
        <meta name="description" content="Transform hotel marketing with immersive virtual tours. Let guests experience your property before booking with API-integrated booking systems." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={hotelsHero}
              alt="Luxury hotel lobby"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-purple-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Let Guests <span className="text-blue-200">Experience Your Hotel</span> Before They Even Book
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
                Xplor lets travelers explore your rooms, restaurants, pools, and spaces in immersive 3D — and book instantly via API-integrated systems. It's more than visibility. It's conversion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <RouterLink to="/upload-space" className="flex items-center gap-2">
                    Add Your Hotel <ArrowRight className="w-5 h-5" />
                  </RouterLink>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  View Sample Hotel Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hotels Need Xplor */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Virtual Tours Are Now the First Impression — Make Yours Count
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Sample Tour */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Experience the Difference: Interactive Hotel Tours
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                See how guests can explore every detail of your property and book instantly with integrated booking overlays.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-foreground mb-2">Interactive Hotel Tour Demo</p>
                      <p className="text-muted-foreground">Click to explore rooms, amenities, and booking flow</p>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Powered by Xplor Booking API
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Plugin Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Use Your Existing Booking Engine — Seamlessly
              </h2>
              <p className="text-lg text-muted-foreground">
                Xplor connects to your existing PMS or booking platform through simple plugin integration or custom API setup. Whether you use Cloudbeds, SiteMinder, Opera, or others — guests can check availability and book directly from your tour.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {bookingPlatforms.map((platform, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-2">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Link className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{platform}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Request Booking API Setup
              </Button>
              <Button size="lg" variant="outline">
                Talk to an Integration Specialist
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                How It Works
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It's a Win for Hotels */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Better Guests. Fewer No-Shows. More Upsells.
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary mb-2">{benefit.stat}</div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground italic mb-2 text-lg">
                        "We started getting longer stays and higher-end bookings once we listed our suites with Xplor virtual tours."
                      </p>
                      <p className="text-sm text-muted-foreground">— Hotel Manager, Mykonos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">Additional Benefits:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Easier upselling of suites and packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Showcase on-property experiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Reduce booking uncertainties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Attract international travelers</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Property Types We Support
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {propertyTypes.map((type, index) => (
                <div key={index} className="text-center">
                  <type.icon className="w-12 h-12 text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium">{type.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Turn Every Tour into a Booking
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                List your hotel on Xplor, connect your booking engine, and let guests explore their future stay today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <RouterLink to="/upload-space" className="flex items-center gap-2">
                    Add Your Hotel Now <ArrowRight className="w-5 h-5" />
                  </RouterLink>
                </Button>
                <Button size="lg" variant="outline">
                  Book a Demo with Xplor
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Can I connect my current booking engine?</h4>
                      <p className="text-muted-foreground">Yes! Xplor integrates with most major PMS and booking platforms including Cloudbeds, SiteMinder, Opera, and many others through our API system.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What virtual tour formats do you support?</h4>
                      <p className="text-muted-foreground">We support Matterport, iStaging, Kuula, and other standard 360° tour platforms, plus custom uploads.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">How long does setup take?</h4>
                      <p className="text-muted-foreground">Basic listing setup takes minutes. API integration typically takes 1-2 weeks depending on your current systems.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Legal Footer */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                Xplor supports virtual tours created with Matterport, iStaging, Kuula, and other standard platforms. 
                API integrations available for supported PMS and booking systems. Contact us to check compatibility.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}