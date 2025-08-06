import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Globe, Ruler, Brain, CheckCircle, X, Plus, Mail } from 'lucide-react';
import developmentsHero from '@/assets/developments-hero.jpg';

export default function Developments() {
  const features = [
    {
      icon: <Building2 className="h-8 w-8 text-primary" />,
      title: "Masterplan-to-Model Room",
      description: "Showcase the entire development lifecycle — from vision to final units."
    },
    {
      icon: <MapPin className="h-8 w-8 text-primary" />,
      title: "Multiple Spaces in One Listing",
      description: "Add apartments, offices, showrooms, clubhouses, gyms, and lobbies as connected virtual spaces."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Designed for Sales Teams",
      description: "Built-in tools for lead generation, contact capture, and real estate CRM integrations."
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Visibility",
      description: "Be discovered by investors, agents, and buyers browsing immersive listings worldwide."
    },
    {
      icon: <Ruler className="h-8 w-8 text-primary" />,
      title: "Professional Presentation",
      description: "Present scale, finish, lifestyle, and spatial flow with total clarity and control."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Smart Tagging & Navigation",
      description: "Link between spaces, highlight features, and guide users through the experience."
    }
  ];

  const useCases = [
    {
      title: "Luxury Apartment Development",
      description: "One listing, multiple show units, rooftop spaces, and amenity walkthroughs.",
      image: "/lovable-uploads/luxury-property-1.jpg"
    },
    {
      title: "Mixed-Use Projects",
      description: "Showcase retail, co-working, hospitality, and residential zones in one cohesive journey.",
      image: "/lovable-uploads/modern-house.jpg"
    },
    {
      title: "Branded Residences or Hotel Condos",
      description: "Preview branded styling, operator benefits, and various layouts from a single entry point.",
      image: "/lovable-uploads/luxury-interior.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Upload Your Development",
      description: "Add your masterplan, building exteriors, and digital media."
    },
    {
      number: "02",
      title: "Add Your Spaces",
      description: "Create individual rooms or zones: show units, amenities, lobbies, etc."
    },
    {
      number: "03",
      title: "Go Live and Generate Leads",
      description: "Your virtual development is ready for global viewing, embedded sharing, and agent outreach."
    }
  ];

  const comparisonFeatures = [
    { feature: "Multi-space Listings", xplor: true, traditional: false },
    { feature: "360°/VR Capability", xplor: true, traditional: "limited" },
    { feature: "Masterplan Visualization", xplor: true, traditional: false },
    { feature: "Custom Navigation Links", xplor: true, traditional: false },
    { feature: "Global Immersive Discovery", xplor: true, traditional: false },
    { feature: "Real-Time Lead Collection", xplor: true, traditional: "basic" }
  ];

  const renderComparisonIcon = (value: boolean | string) => {
    if (value === true) return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    if (value === false) return <X className="h-5 w-5 text-red-500" />;
    return <Badge variant="outline" className="text-xs">{value}</Badge>;
  };

  return (
    <>
      <Helmet>
        <title>Xplor for Property Developments – Multi-Space Virtual Tours for Real Estate Projects</title>
        <meta name="description" content="Showcase your entire development — masterplan to model rooms — with Xplor's immersive multi-space listings built for developers, sales teams, and global buyers." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${developmentsHero})` }}
          />
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
              Property Development Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              The Complete Platform for
              <span className="text-primary block">Showcasing Property Developments</span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-normal block mt-4">— In Full Immersion</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
              Present your entire project with precision — from masterplan to model units, amenities, and everything in between — all in one immersive Xplor listing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                <Mail className="mr-2 h-5 w-5" />
                Contact the Xplor Team
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4">
                <Plus className="mr-2 h-5 w-5" />
                Add Your Development
              </Button>
            </div>
          </div>
        </section>

        {/* Why Developers Use Xplor */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Why Developers Use Xplor
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The only platform designed specifically for comprehensive development showcasing
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

        {/* Use Case Examples */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
                Use Case Examples
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how different types of developments leverage Xplor's multi-space capabilities
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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
                Three simple steps to showcase your entire development
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
                What Makes Xplor Unique for Developments
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare Xplor's development-focused features with traditional property portals
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                      <th className="text-center p-4 font-semibold text-foreground">Xplor</th>
                      <th className="text-center p-4 font-semibold text-foreground">Traditional Property Portals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((item, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="p-4 font-medium text-foreground">{item.feature}</td>
                        <td className="p-4 text-center">{renderComparisonIcon(item.xplor)}</td>
                        <td className="p-4 text-center">{renderComparisonIcon(item.traditional)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </section>

        {/* Final Contact Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              Ready to Showcase Your Entire Development the Right Way?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Xplor is the only platform that supports complete, immersive, multi-space listings for developments of all sizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us to Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4">
                <Plus className="mr-2 h-5 w-5" />
                Add Your Development
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}