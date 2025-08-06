import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Globe, Ruler, Brain, CheckCircle, X, Plus, Mail, Crown, Zap, Camera } from 'lucide-react';
import UAEDevelopmentUploadDialog from "@/components/UAEDevelopmentUploadDialog";

export default function UAEDevelopments() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Multi-Space Virtual Listings",
      description: "Add and connect multiple units, amenities, commercial spaces, and lobbies under one development umbrella."
    },
    {
      icon: <Ruler className="h-8 w-8 text-primary" />,
      title: "From Masterplan to Model Room",
      description: "Showcase the full lifecycle: renders, construction progress, and finished units with immersive storytelling."
    },
    {
      icon: <Crown className="h-8 w-8 text-primary" />,
      title: "Tailored for the UAE Market",
      description: "Optimized for luxury real estate, multi-tower projects, and branded residences."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Exposure",
      description: "Attract investors, agents, and HNWIs from around the world — especially GCC, UK, Russia, and Asia."
    },
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Interactive & Multimedia Ready",
      description: "Embed videos, floorplans, availability charts, maps, branded sales material, and walk-throughs."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Built for Sales & Leasing Teams",
      description: "Collect leads, guide virtual viewings, and empower remote decision-making."
    }
  ];

  const useCases = [
    {
      title: "Emaar or Aldar-style Master Developments",
      description: "Showcase show villas, sales suites, tower lobbies, gyms, and multiple unit types from a central listing.",
      image: "/lovable-uploads/luxury-property-1.jpg"
    },
    {
      title: "Branded Residences & Hotel-Linked Properties",
      description: "Offer luxury buyers a guided virtual preview of lifestyle offerings, from interiors to private beach access.",
      image: "/lovable-uploads/luxury-interior.jpg"
    },
    {
      title: "Commercial Parks & Mixed-Use Communities",
      description: "Present business towers, retail zones, and urban planning components in one cohesive tour.",
      image: "/lovable-uploads/modern-house.jpg"
    },
    {
      title: "Boutique Developers in Dubai, Abu Dhabi, Sharjah",
      description: "Elevate smaller projects with world-class presentation — win attention, trust, and conversions.",
      image: "/lovable-uploads/luxury-yacht-1.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Development Profile",
      description: "Add your brand, masterplan, project renders, and progress visuals."
    },
    {
      number: "02",
      title: "Add Spaces: Units, Amenities, Zones",
      description: "Showcase model units, pools, gyms, lobbies, rooftops, showrooms, and more — as connected tour elements."
    },
    {
      number: "03",
      title: "Go Live on Xplor",
      description: "Share the full listing with brokers, agents, investors, and public audiences."
    }
  ];

  const comparisonFeatures = [
    { feature: "Multi-space 360° Listing", xplor: true, traditional: false, microsites: "limited" },
    { feature: "VR/AR Integration", xplor: true, traditional: false, microsites: "limited" },
    { feature: "Interactive Navigation", xplor: true, traditional: false, microsites: false },
    { feature: "Global Discovery Platform", xplor: true, traditional: false, microsites: false },
    { feature: "Lead Capture & CRM-Ready", xplor: true, traditional: "basic", microsites: "basic" },
    { feature: "Integrated Media & Docs", xplor: true, traditional: "limited", microsites: true }
  ];

  const renderComparisonIcon = (value: boolean | string) => {
    if (value === true) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    if (value === false) return <X className="h-5 w-5 text-red-500" />;
    return <Badge variant="outline" className="text-xs">{value}</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Xplor for UAE Developments – The Premier Platform for Immersive Real Estate Showcases</title>
        <meta name="description" content="Showcase your UAE development with immersive, multi-space 360° listings on Xplor. Perfect for villas, towers, showrooms, and branded residences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20" />
          <div className="absolute inset-0 bg-[url('/lovable-uploads/luxury-property-1.jpg')] bg-cover bg-center opacity-40" />
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 bg-white/10 backdrop-blur-sm border-white/20 text-amber-600">
              UAE Development Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              Showcase Your UAE Development
              <span className="text-primary block">to the World — Virtually</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              With Xplor, you can present your entire development in stunning 360° — from masterplans and show units to towers, malls, and amenities — all connected in one immersive listing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                <Mail className="mr-2 h-5 w-5" />
                Contact the Xplor Team
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add UAE Development
              </Button>
            </div>
          </div>
        </section>

        {/* Why Xplor is Built for UAE Developments */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Why Xplor is Built for UAE Developments
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Premium features designed specifically for the UAE luxury real estate market
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
                  <CardContent className="p-0">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Inspiration for Potential Clients */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Inspiration for Potential Clients
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how different types of UAE developments leverage Xplor's capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-foreground">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Three simple steps to showcase your UAE development
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Compare Platforms
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how Xplor compares to traditional portals and developer microsites
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-center p-4 font-semibold text-foreground">Xplor</th>
                      <th className="text-center p-4 font-semibold text-foreground">Traditional Portals</th>
                      <th className="text-center p-4 font-semibold text-foreground">Developer Microsites</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium text-foreground">{item.feature}</td>
                        <td className="p-4 text-center">{renderComparisonIcon(item.xplor)}</td>
                        <td className="p-4 text-center">{renderComparisonIcon(item.traditional)}</td>
                        <td className="p-4 text-center">{renderComparisonIcon(item.microsites)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Final Contact Section */}
        <section className="py-20 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Let Investors, Buyers, and Agents Step Inside Your Vision
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Whether you're selling towers, villas, or mixed-use communities, Xplor is the immersive platform that brings your development to life — and to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
                onClick={() => setUploadDialogOpen(true)}
              >
                <Plus className="mr-2 h-5 w-5" />
                Add UAE Development
              </Button>
            </div>
          </div>
        </section>
      </div>

      <UAEDevelopmentUploadDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen} 
      />
    </>
  );
}