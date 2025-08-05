import React from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, 
  Wine, 
  Camera, 
  Calendar, 
  Globe, 
  Smartphone, 
  BarChart3,
  CheckCircle, 
  ArrowRight, 
  Play, 
  Link,
  Music,
  Building,
  Coffee,
  Users,
  MapPin,
  Clock,
  DollarSign,
  TrendingUp,
  Star,
  Eye,
  PartyPopper
} from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

export default function RestaurantsBars() {
  const features = [
    {
      icon: Wine,
      title: "Atmosphere Is Everything",
      description: "Let guests see your vibe, seating layout, and ambiance before visiting"
    },
    {
      icon: Camera,
      title: "Full-Space Tours",
      description: "Showcase indoor/outdoor spaces, VIP sections, private dining, bar areas"
    },
    {
      icon: Calendar,
      title: "Integrated Reservations",
      description: "Use your current booking system with Xplor's API plugin"
    },
    {
      icon: PartyPopper,
      title: "Book Events, Private Hire or Tables",
      description: "Let users book dinners, birthdays, corporate events, and more"
    },
    {
      icon: Globe,
      title: "Global Visibility",
      description: "Tap into locals and travelers exploring nearby experiences"
    },
    {
      icon: Smartphone,
      title: "Desktop + Mobile",
      description: "Fully responsive immersive experiences on all devices"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Add Your Venue",
      description: "Upload details, menus, photos, and a virtual tour"
    },
    {
      number: 2,
      title: "Connect Booking System",
      description: "Enable real-time reservations with your preferred plugin"
    },
    {
      number: 3,
      title: "Watch Guests Explore and Book",
      description: "Convert digital visitors into real ones"
    }
  ];

  const venueTypes = [
    { icon: Utensils, name: "Fine Dining" },
    { icon: Building, name: "Rooftop Bars" },
    { icon: Music, name: "Nightclubs & Lounges" },
    { icon: MapPin, name: "Beach Clubs" },
    { icon: Coffee, name: "Street Cafés" },
    { icon: Building, name: "Fast Casual & Chains" },
    { icon: Users, name: "Food Halls" },
    { icon: PartyPopper, name: "Event Spaces" }
  ];

  const bookingPlatforms = [
    "OpenTable", "Resy", "SevenRooms", "Tock", 
    "EatApp", "Bookenda", "TableCheck", "Yelp Reservations"
  ];

  const benefits = [
    {
      stat: "5x",
      description: "more time spent on tour-enabled listings"
    },
    {
      stat: "33%",
      description: "more likely to book with immersive previews"
    },
    {
      stat: "22%",
      description: "spike in group reservations with virtual tours"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Restaurants & Bars Virtual Tours - Book More Tables | Xplor</title>
        <meta name="description" content="Transform restaurant marketing with immersive virtual tours. Let guests feel the vibe before booking with API-integrated reservation systems." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-foreground mb-6">
                Make Them Feel the <span className="text-primary">Vibe</span> Before They Book the Table
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto">
                Xplor lets guests explore your restaurant or bar virtually — before they book. Show off your space, ambiance, and energy in a way photos never could, then connect it to your booking engine with a simple API plugin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <RouterLink to="/upload-space" className="flex items-center gap-2">
                    Add Your Venue <ArrowRight className="w-5 h-5" />
                  </RouterLink>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See a Sample Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Restaurants & Bars Should Use Xplor */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                You Don't Just Sell Food. You Sell Experience.
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

        {/* Sample Venue Tour */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Experience Your Venue Like Never Before
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                See how guests can explore table placement, atmosphere, and book directly from your virtual tour.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-semibold text-foreground mb-2">Interactive Restaurant Tour Demo</p>
                      <p className="text-muted-foreground">Explore seating areas, atmosphere, and booking options</p>
                    </div>
                    <div className="absolute top-4 left-4 space-y-2">
                      <Badge className="bg-primary text-primary-foreground">
                        Reserve This Table
                      </Badge>
                      <Badge variant="outline">
                        Book Private Room
                      </Badge>
                    </div>
                    <Badge className="absolute bottom-4 right-4 bg-secondary text-secondary-foreground">
                      Powered by Xplor + OpenTable
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* API Booking Plugin Integration */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Turn Exploration into Reservations — Instantly
              </h2>
              <p className="text-lg text-muted-foreground">
                Xplor's smart booking plugin connects to your existing reservation system. Whether you use Resy, OpenTable, TableCheck, SevenRooms, or a custom setup — guests can explore and book directly from your tour.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {bookingPlatforms.map((platform, index) => (
                <Card key={index} className="text-center p-4">
                  <CardContent className="p-2">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{platform}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="p-6">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center relative">
                  <div className="text-center">
                    <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
                    <p className="font-semibold text-foreground">Interactive Booking Demo</p>
                    <p className="text-sm text-muted-foreground">Click tables to see availability and book</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="absolute bottom-4 right-4 bg-primary text-primary-foreground"
                  >
                    Book This Table
                  </Button>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Request Booking API Integration
              </Button>
              <Button size="lg" variant="outline">
                Talk to Xplor for Setup
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

        {/* Why This Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Restaurants Using Virtual Tours Get More Bookings
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground italic mb-2">
                        "Touring the restaurant online helped us book a perfect table for my anniversary. Loved it before we even arrived."
                      </p>
                      <p className="text-sm text-muted-foreground">— Guest, Barcelona</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Star className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="text-foreground italic mb-2">
                        "We saw a 22% spike in group reservations once we uploaded our tour to Xplor."
                      </p>
                      <p className="text-sm text-muted-foreground">— Lounge Owner, Dubai</p>
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
                  <span className="text-muted-foreground">Reduced no-shows and cancellations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Increased group bookings and events</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Better table selection experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Enhanced online presence</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Venue Types */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Venue Types We Support
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {venueTypes.map((type, index) => (
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
                Let Guests Feel the Space — and Book Right Then and There
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Don't just list your venue. Let it come alive. Upload your tour and start accepting bookings today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <RouterLink to="/upload-space" className="flex items-center gap-2">
                    List My Restaurant or Bar <ArrowRight className="w-5 h-5" />
                  </RouterLink>
                </Button>
                <Button size="lg" variant="outline">
                  Connect to Booking System
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
                      <h4 className="font-semibold text-foreground mb-2">Can I connect my current reservation system?</h4>
                      <p className="text-muted-foreground">Yes! Xplor integrates with OpenTable, Resy, SevenRooms, Tock, and most major reservation platforms through our API system.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">What types of virtual tours work best?</h4>
                      <p className="text-muted-foreground">We support Matterport, iStaging, Kuula, and custom 360° tours. Tours showcasing ambiance, seating areas, and atmosphere perform best.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">How quickly can I start taking bookings?</h4>
                      <p className="text-muted-foreground">Basic setup takes minutes. Reservation API integration typically takes 1-2 weeks depending on your current booking system.</p>
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
                Xplor supports 360° virtual tours built with Matterport, iStaging, Kuula, and others. 
                Booking plugin functionality is available via supported APIs or iframe integrations. Contact us for compatibility with your system.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}