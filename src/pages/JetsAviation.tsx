import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Plane, Calendar, Users, Smartphone, Globe, TrendingUp, Star, CheckCircle, Zap, Wrench, GraduationCap, MapPin } from "lucide-react";
import { AviationUploadDialog } from "@/components/AviationUploadDialog";
import jetsAviationHero from '@/assets/jets-aviation-hero.jpg';

const JetsAviation = () => {
  const [activeDemo, setActiveDemo] = useState("cabin");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const handleListAircraft = () => {
    setUploadDialogOpen(true);
  };

  const features = [
    {
      icon: <Plane className="h-6 w-6" />,
      title: "Showcase the Jet, Not Just the Specs",
      description: "Give clients a real sense of the space with 360° cabin, cockpit, and lounge tours"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Live Charter & Test Flight Booking",
      description: "Enable real-time flight inquiries, reservations, or test flight scheduling via plugin"
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Flight Training Simulation",
      description: "Let prospects explore your simulator rooms or training centers"
    },
    {
      icon: <Badge className="h-6 w-6" />,
      title: "New Model Launches",
      description: "Launch new aircraft models virtually to a global audience"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Viewer Access",
      description: "Reach HNWI clients, brokers, and aviation fans worldwide"
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Fully Responsive",
      description: "Works perfectly on mobile, desktop, or in VR headsets"
    }
  ];

  const useCases = [
    { icon: "✈️", title: "Charter Bookings" },
    { icon: "🧪", title: "Test Flight Registration" },
    { icon: "🧑‍✈️", title: "Flight School / Simulator Booking" },
    { icon: "🆕", title: "New Model Launch RSVP" },
    { icon: "🛬", title: "Maintenance / Service Facility Booking" }
  ];

  const platforms = [
    "Avinode / CharterPad", "Calendly / HubSpot", "Traxxall / CAMP for MRO", 
    "FlightLogger", "Talon Systems", "Custom Aviation CRMs"
  ];

  const audienceTypes = [
    { title: "Private Jet Operators", icon: "🛩️" },
    { title: "Jet Charter Brokers", icon: "✈️" },
    { title: "Aircraft Manufacturers", icon: "🏭" },
    { title: "Maintenance Providers", icon: "🔧" },
    { title: "Flight Training Academies", icon: "🎓" },
    { title: "Airport Lounge Managers", icon: "🏢" },
    { title: "Aircraft Dealerships", icon: "🏪" }
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Upload your aircraft, facility, or training academy"
    },
    {
      step: "2", 
      title: "Add Your Virtual Tour",
      description: "Show cabins, hangars, showrooms, or simulators in immersive 3D"
    },
    {
      step: "3",
      title: "Enable Bookings",
      description: "Connect bookings, charter inquiries, or training demos via API"
    }
  ];

  const demoOptions = [
    { id: "cabin", title: "Private Jet Cabin Tour", description: "Explore luxury seating and amenities" },
    { id: "cockpit", title: "Cockpit Simulation", description: "See the pilot's perspective and controls" },
    { id: "hangar", title: "Hangar Walkthrough", description: "Tour maintenance and storage facilities" },
    { id: "simulator", title: "Flight Training Center", description: "Experience simulator rooms and classrooms" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Jets & Aviation - Virtual Aircraft Tours | Xplor</title>
        <meta name="description" content="Showcase aircraft cabins, hangars, and flight training facilities with immersive virtual tours. Enable charter bookings and flight training demos directly from 3D experiences." />
        <meta name="keywords" content="virtual aircraft tours, private jet charter booking, flight training center, aviation virtual reality, aircraft showcase" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={jetsAviationHero}
            alt="Private jets and aviation facilities"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-800/70 to-purple-900/80"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 backdrop-blur-sm border-white/30 text-white">
            Aviation Excellence
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Take Clients Inside the <span className="text-blue-200">Cabin</span> Before They Even Take Off
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Xplor helps you showcase aircraft interiors, simulators, hangars, and lounges in 3D — while integrating charter, training, or test flight bookings through simple API plugins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleListAircraft} className="text-lg px-8">
              List Your Aircraft or Service
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              View an Aircraft Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Aviation Is Visual. It Deserves to Be Immersive.
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
              From 3D Cabin Tour to Real-World Action — Instantly
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Xplor can connect to your aviation CRM, charter system, or training platform via API or plugin. Your virtual walkthroughs become direct conversion points for bookings, test flights, or flight school trials.
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
            <h3 className="text-xl font-semibold mb-4">Example Platforms & Tools:</h3>
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
              <Button size="lg">Enable API Plugin</Button>
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
              Experience aviation spaces like never before
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
                  <Plane className="h-16 w-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">
                    {demoOptions.find(option => option.id === activeDemo)?.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">Interactive demo coming soon</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" variant="outline">Book This Jet</Button>
                    <Button size="sm" variant="outline">Schedule Test Flight</Button>
                  </div>
                  <Badge className="mt-4">Powered by Xplor + API Plugin Integration</Badge>
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

      {/* Target Audience */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for the Entire Aviation Industry
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
              Virtual Tours That Convert at 30,000 Feet
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">2x</div>
                <p className="text-muted-foreground">Longer engagement with virtual tours</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">Higher</div>
                <p className="text-muted-foreground">Value clients from immersive listings</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">Faster</div>
                <p className="text-muted-foreground">Inquiries and pre-qualified leads</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">Better</div>
                <p className="text-muted-foreground">Transparency in expectations</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-4">
                  "We booked 4 new training trials after uploading our flight sim to Xplor."
                </blockquote>
                <cite className="text-sm text-muted-foreground">– Flight School Director</cite>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-4">
                  "Our charter clients loved walking through the cabin before ever stepping onboard."
                </blockquote>
                <cite className="text-sm text-muted-foreground">– Jet Broker, Monaco</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let the World Explore Your Aircraft — and Take Action
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Upload your jet, training center, or new model to Xplor. Connect your charter or booking system. Convert explorers into clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleListAircraft} className="text-lg px-8">
              List Your Jet or Facility
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Request Plugin Integration
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8">
              View a Demo Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <section className="py-12 px-4 bg-muted/30 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Legal & Compliance:</strong> Xplor supports 360° and 3D virtual tours of aircraft, hangars, training centers, and lounges. API/plugin integrations are available for leading charter and CRM platforms. Contact us to check compatibility with your system.
          </p>
        </div>
      </section>

      <AviationUploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </div>
  );
};

export default JetsAviation;