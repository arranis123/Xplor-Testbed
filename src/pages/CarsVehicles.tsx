import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Car, Truck, Bike, Shield, Upload, Play, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
const CarsVehicles = () => {
  const [activeDemo, setActiveDemo] = useState("sedan");
  const navigate = useNavigate();

  const handleAddVehicle = () => {
    // Navigate to dashboard with cars category
    navigate("/dashboard", { state: { openUpload: true, category: "car" } });
  };
  const vehicleTypes = [{
    id: "sedan",
    name: "Sedans & Coupes",
    icon: Car,
    description: "Luxury cars, sports cars, electric vehicles"
  }, {
    id: "suv",
    name: "SUVs & Trucks",
    icon: Truck,
    description: "Full-size SUVs, pickup trucks, commercial vehicles"
  }, {
    id: "motorcycle",
    name: "Motorcycles",
    icon: Bike,
    description: "Sport bikes, cruisers, touring motorcycles"
  }, {
    id: "classic",
    name: "Classic Cars",
    icon: Car,
    description: "Vintage automobiles, collector vehicles"
  }];
  const benefits = [{
    title: "Immersive Shopping Experience",
    description: "Allow customers to explore every detail of your vehicles from home",
    icon: Star
  }, {
    title: "Increase Sales Conversion",
    description: "Virtual tours lead to 40% higher engagement and faster purchase decisions",
    icon: CheckCircle
  }, {
    title: "Reduce Physical Visits",
    description: "Pre-qualify buyers and save time with virtual showroom visits",
    icon: Shield
  }, {
    title: "24/7 Availability",
    description: "Your inventory is always accessible to potential buyers worldwide",
    icon: Upload
  }];
  const technicalSpecs = [{
    category: "Image Quality",
    requirement: "Minimum 4K resolution (3840×2160)"
  }, {
    category: "File Formats",
    requirement: "JPEG, PNG, MP4, MOV for media uploads"
  }, {
    category: "360° Content",
    requirement: "Equirectangular format, 8K recommended"
  }, {
    category: "File Size",
    requirement: "Maximum 500MB per file, 5GB total per vehicle"
  }, {
    category: "Lighting",
    requirement: "Even lighting, minimal shadows, HDR preferred"
  }, {
    category: "Coverage",
    requirement: "Interior, exterior, engine bay, trunk/cargo area"
  }];
  return <>
      <Helmet>
        <title>Cars & Vehicles Virtual Tours | Xplor - Automotive 360° Experiences</title>
        <meta name="description" content="Create immersive virtual tours for cars, trucks, motorcycles, and classic vehicles. Boost automotive sales with 360° virtual showrooms and interactive vehicle experiences." />
        <meta name="keywords" content="automotive virtual tours, car 360 tour, vehicle virtual showroom, automotive photography, car dealership virtual tour, motorcycle 360 view, classic car virtual tour" />
        <meta property="og:title" content="Cars & Vehicles Virtual Tours | Xplor" />
        <meta property="og:description" content="Transform your automotive inventory with immersive virtual tours. Perfect for dealerships, private sellers, and collectors." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/cars-vehicles" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/d7b16b5e-5336-435d-b326-38c27f982f57.png')] bg-cover bg-center opacity-20" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="w-fit">
                    Automotive Virtual Tours
                  </Badge>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    Transform Your
                    <span className="block text-accent"> Vehicle Inventory</span>
                  </h1>
                  <p className="text-xl text-primary-foreground/90 leading-relaxed">
                    Create stunning 360° virtual tours that let customers explore every detail of your cars, trucks, and motorcycles from anywhere in the world.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4 text-black" onClick={handleAddVehicle}>
                    Add a Vehicle
                  </Button>
                  
                </div>
              </div>
              <div className="relative">
                
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Types Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Vehicle Types We Support
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From luxury sedans to heavy-duty trucks, create immersive virtual tours for any type of vehicle in your inventory.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleTypes.map(type => <Card key={type.id} className={`cursor-pointer transition-all duration-300 hover:scale-105 ${activeDemo === type.id ? 'ring-2 ring-primary' : ''}`} onClick={() => setActiveDemo(type.id)}>
                  <CardHeader className="text-center">
                    <type.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {type.description}
                    </CardDescription>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Demo Viewer Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Interactive 360° Experience
              </h2>
              <p className="text-xl text-muted-foreground">
                See how virtual tours bring vehicles to life with our interactive demo
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center relative overflow-hidden rounded-lg">
                  <img src="/lovable-uploads/a50d42f1-34a8-4ff5-985c-368dc9a57114.png" alt="360° Vehicle Tour Demo - Luxury Car Showroom" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center space-y-4 text-white">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">360° Vehicle Tour Demo</h3>
                      <p className="text-white/90">Click to explore a sample {vehicleTypes.find(v => v.id === activeDemo)?.name.toLowerCase()}</p>
                      <Button variant="secondary" className="text-black" asChild>
                        <a href="https://my.matterport.com/show/?m=7NWztaa4NaG" target="_blank" rel="noopener noreferrer">
                          Launch Interactive Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose Virtual Tours for Automotive?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform how customers experience your vehicles and boost your sales with immersive technology.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <benefit.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>)}
            </div>
          </div>
        </section>

        {/* Technical Requirements Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-4xl font-bold">
                    Technical Upload Criteria
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Ensure the highest quality virtual tours with our recommended technical specifications for automotive content.
                  </p>
                </div>
                <div className="space-y-4">
                  {technicalSpecs.map((spec, index) => <Card key={index} className="p-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold">{spec.category}</h4>
                          <p className="text-sm text-muted-foreground">{spec.requirement}</p>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      </div>
                    </Card>)}
                </div>
              </div>
              <div className="space-y-6">
                <Card className="p-6 bg-primary text-primary-foreground">
                  <div className="space-y-4">
                    <Upload className="h-12 w-12" />
                    <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                    <p className="text-primary-foreground/90">
                      Upload your first vehicle and create a stunning virtual tour in minutes. Our platform supports all major automotive content formats.
                    </p>
                    <Button size="lg" variant="secondary" className="w-full text-black" onClick={handleAddVehicle}>
                      Upload Your First Vehicle
                    </Button>
                  </div>
                </Card>
                <Card className="p-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Need Professional Capture?</h4>
                    <p className="text-muted-foreground">
                      Our certified photographers specialize in automotive virtual tours and can capture your entire inventory.
                    </p>
                    <Button variant="outline" className="w-full">
                      Book Capture Service
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Transform Your Automotive Business Today
              </h2>
              <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of dealerships and private sellers who've revolutionized their sales process with immersive virtual vehicle tours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4 text-black">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm text-primary-foreground/70">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </div>
    </>;
};
export default CarsVehicles;