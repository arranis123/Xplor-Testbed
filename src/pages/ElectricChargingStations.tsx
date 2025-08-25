import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, Zap, MapPin, Clock, Battery, Users, Smartphone, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import electricChargingHero from '@/assets/electric-charging-hero.jpg';

const features = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Real-Time Station Mapping",
    description: "Show exact locations with 360° views of charging stations, helping drivers find and identify the right charging points."
  },
  {
    icon: <Battery className="h-6 w-6" />,
    title: "Charging Port Details",
    description: "Display connector types, power levels, availability status, and pricing information for each charging port."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Live Availability Updates",
    description: "Real-time updates on which charging ports are available, occupied, or out of service."
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Interactive Station Tours",
    description: "Virtual walkthroughs showing station layout, accessibility features, and nearby amenities."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Driver Experience Insights",
    description: "Help drivers understand the charging experience before arrival with detailed station previews."
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Increased Station Utilization",
    description: "Better visibility and information leads to higher usage rates and customer satisfaction."
  }
];

const useCases = [
  {
    title: "Public Charging Networks",
    description: "Showcase your network of charging stations with detailed location information",
    icon: <Zap className="h-8 w-8" />
  },
  {
    title: "Workplace Charging",
    description: "Help employees easily locate and use workplace charging facilities",
    icon: <Users className="h-8 w-8" />
  },
  {
    title: "Retail & Shopping Centers",
    description: "Attract EV drivers by showcasing charging amenities alongside shopping experiences",
    icon: <MapPin className="h-8 w-8" />
  },
  {
    title: "Highway Rest Stops",
    description: "Provide clear guidance for long-distance travelers needing charging stops",
    icon: <Battery className="h-8 w-8" />
  }
];

const steps = [
  {
    number: "01",
    title: "Upload Station Data",
    description: "Add your charging station locations, port specifications, and pricing information."
  },
  {
    number: "02",
    title: "Create Virtual Tours",
    description: "Generate 360° views and interactive maps of your charging stations."
  },
  {
    number: "03",
    title: "Go Live",
    description: "Publish your enhanced charging station listings for EV drivers to discover."
  }
];

const comparisonFeatures = [
  { feature: "360° Station Views", xplor: "full", basic: "none", static: "none" },
  { feature: "Real-time Port Status", xplor: "full", basic: "limited", static: "none" },
  { feature: "Interactive Station Maps", xplor: "full", basic: "none", static: "none" },
  { feature: "Detailed Port Information", xplor: "full", basic: "limited", static: "basic" },
  { feature: "Virtual Station Tours", xplor: "full", basic: "none", static: "none" },
  { feature: "Mobile-Optimized Experience", xplor: "full", basic: "limited", static: "basic" },
  { feature: "Integration with Navigation", xplor: "full", basic: "none", static: "none" },
  { feature: "Analytics & Insights", xplor: "full", basic: "none", static: "none" }
];

const getIcon = (status: string) => {
  switch (status) {
    case "full":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "limited":
      return <CheckCircle className="h-5 w-5 text-yellow-500" />;
    case "basic":
      return <CheckCircle className="h-5 w-5 text-blue-500" />;
    default:
      return <div className="h-5 w-5" />;
  }
};

const ElectricChargingStations: React.FC = () => {
  const navigate = useNavigate();

  const handleUploadStation = () => {
    navigate('/dashboard', { state: { openChargeStationUpload: true } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${electricChargingHero})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge variant="secondary" className="mb-6">
              Electric Vehicle Charging Solutions
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Charging Stations with 
              <span className="text-primary"> Immersive Experiences</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Help EV drivers find, understand, and confidently use your charging stations with detailed virtual tours, real-time availability, and comprehensive station information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={handleUploadStation} className="bg-primary hover:bg-primary/90">
                <Zap className="mr-2 h-5 w-5" />
                Upload Charging Station
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Charging Station Operators Choose Xplor */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Charging Station Operators Choose Xplor
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Give EV drivers the confidence to choose your charging stations with detailed, interactive experiences that showcase your facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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

      {/* Use Cases */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect for Every Charging Scenario</h2>
            <p className="text-xl text-muted-foreground">
              From public networks to workplace charging, Xplor enhances every type of charging station
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {useCase.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Get your charging stations online in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Xplor vs Traditional Charging Apps</h2>
            <p className="text-xl text-muted-foreground">
              See how Xplor's immersive approach transforms the charging station discovery experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div></div>
                  <div className="font-semibold text-primary">Xplor</div>
                  <div className="font-semibold text-muted-foreground">Basic Charging Apps</div>
                  <div className="font-semibold text-muted-foreground">Static Listings</div>
                </div>
              </CardHeader>
              <CardContent>
                {comparisonFeatures.map((item, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 last:border-b-0 items-center">
                    <div className="font-medium">{item.feature}</div>
                    <div className="flex justify-center">{getIcon(item.xplor)}</div>
                    <div className="flex justify-center">{getIcon(item.basic)}</div>
                    <div className="flex justify-center">{getIcon(item.static)}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Revolutionize Your Charging Network?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the growing network of charging station operators using Xplor to provide better experiences for EV drivers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleUploadStation}
              className="bg-white text-primary hover:bg-gray-100"
            >
              <Zap className="mr-2 h-5 w-5" />
              Upload Your First Station
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Schedule a Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="opacity-90">Charging Stations Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="opacity-90">EV Driver Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2.5M+</div>
              <div className="opacity-90">Virtual Station Views</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ElectricChargingStations;