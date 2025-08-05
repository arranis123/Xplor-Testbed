import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Car, MapPin, Calendar, Users, Smartphone, Globe, Clock, TrendingUp, Star, CheckCircle } from "lucide-react";
import { CarUploadDialog } from "@/components/CarUploadDialog";

const CarsVehicles2 = () => {
  const [activeDemo, setActiveDemo] = useState("interior");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleAddVehicle = () => {
    setUploadDialogOpen(true);
  };

  const features = [
    {
      icon: <Car className="h-6 w-6" />,
      title: "Immersive Vehicle Tours",
      description: "Let users explore inside and around your cars, SUVs, classics, or EVs"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Full Showroom Walkthroughs",
      description: "Showcase the layout, service area, or dealership vibe"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "API Booking Plugins",
      description: "Accept real-time requests for test drives, rentals, or showroom visits"
    },
    {
      icon: <Badge className="h-6 w-6" />,
      title: "Launch New Models Virtually",
      description: "Debut your next release in immersive 3D before it hits the road"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile-Ready and Interactive",
      description: "Optimized for desktop, tablet, mobile, and VR"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Reach Local and Global Buyers",
      description: "Make your inventory explorable from anywhere in the world"
    }
  ];

  const useCases = [
    { icon: "🚘", title: "Test Drive Scheduling" },
    { icon: "🚙", title: "Rental Booking" },
    { icon: "🧾", title: "Sales Appointment Setting" },
    { icon: "🆕", title: "New Model Launch Registration" },
    { icon: "📍", title: "Dealer Visit or Event Booking" }
  ];

  const platforms = [
    "DealerSocket", "Salesforce Automotive", "Turo / Getaround APIs", 
    "Rent Centric", "Calendly / Appointlet", "Custom API integrations"
  ];

  const audienceTypes = [
    { title: "Luxury Dealerships", icon: "🏆" },
    { title: "Exotic Rentals", icon: "🏎️" },
    { title: "Auto Event Organizers", icon: "🎪" },
    { title: "Classic Car Sellers", icon: "🚗" },
    { title: "EV Manufacturers", icon: "⚡" },
    { title: "Fleet Owners", icon: "🚐" },
    { title: "Brand Showrooms", icon: "🏢" }
  ];

  const steps = [
    {
      step: "1",
      title: "Upload Your Car or Showroom",
      description: "Use 360° or 3D media + vehicle details"
    },
    {
      step: "2", 
      title: "Add Booking Integration",
      description: "Let users take action: book, reserve, schedule"
    },
    {
      step: "3",
      title: "Convert Views into Revenue", 
      description: "Drive qualified leads, test drives, or rental bookings"
    }
  ];

  const demoOptions = [
    { id: "interior", title: "Car Interior Tour", description: "Experience the dashboard, seats, and features" },
    { id: "showroom", title: "Showroom Walkthrough", description: "Explore our luxury dealership space" },
    { id: "booking", title: "Booking Integration", description: "See how customers can book instantly" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Cars & Vehicles - Virtual Showrooms | Xplor</title>
        <meta name="description" content="Transform your automotive business with immersive virtual tours. Let customers explore vehicles and showrooms in 3D, book test drives, and increase sales conversions." />
        <meta name="keywords" content="virtual car showroom, automotive virtual tours, test drive booking, car dealership digital experience" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Automotive Excellence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Don't Just Show Cars — Let People Step Inside Them
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Xplor lets buyers experience your cars in stunning detail — from interior tours to full showrooms — with direct booking for rentals, test drives, or viewings via API integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleAddVehicle} className="text-lg px-8">
              Add Your Vehicle or Showroom
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View a Virtual Test Drive
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Than a Gallery — This Is the Experience
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Integration Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              From Virtual Tour to Real Booking — Instantly
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Xplor connects to your existing CRM, dealership platform, or rental system via API or plugin integration. Guests can book test drives, reserve rentals, or schedule appointments without ever leaving the tour.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="font-semibold text-sm">{useCase.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-card rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4">Supported Platforms:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {platforms.map((platform, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{platform}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Request Booking Plugin</Button>
              <Button size="lg" variant="outline">Talk to Integration Team</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See It in Action
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience how virtual tours drive real engagement
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              {demoOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className={`cursor-pointer transition-all ${activeDemo === option.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setActiveDemo(option.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="lg:col-span-2">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Car className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    {demoOptions.find(option => option.id === activeDemo)?.title}
                  </h3>
                  <p className="text-muted-foreground">Interactive demo coming soon</p>
                  <Badge className="mt-2">Powered by Xplor</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Types */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for All Automotive Experiences
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {audienceTypes.map((type, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-sm">{type.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Virtual Tours Drive Real Results
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">More time spent on page with tours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">Higher</div>
                <p className="text-muted-foreground">Intent from direct tour bookings</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">35%</div>
                <p className="text-muted-foreground">More inbound leads from immersive viewings</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg italic mb-4">
                "It's like letting someone walk through our showroom without needing to be here. We're seeing better quality leads."
              </blockquote>
              <cite className="text-sm text-muted-foreground">– Dealer in UAE</cite>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let Them Explore the Drive — Then Book It
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Upload your cars and showrooms to Xplor today. Connect your booking engine. Convert browsers into buyers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleAddVehicle} className="text-lg px-8">
              List My Vehicle or Showroom
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Request API Integration
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      <CarUploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </div>
  );
};

export default CarsVehicles2;