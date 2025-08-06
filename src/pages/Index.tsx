import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ship, Home, Building, Car, Plane, Utensils, ArrowRight, Check, Users, DollarSign, ChevronDown, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MuseumGalleryUploadDialog } from "@/components/MuseumGalleryUploadDialog";
import { SchoolEducationUploadDialog } from "@/components/SchoolEducationUploadDialog";
import { AviationUploadDialog } from "@/components/AviationUploadDialog";
import { ExperienceUploadDialog } from "@/components/ExperienceUploadDialog";
import CruiseShipUploadDialog from "@/components/CruiseShipUploadDialog";
import DevelopmentUploadDialog from "@/components/DevelopmentUploadDialog";
import GolfCourseUploadDialog from "@/components/GolfCourseUploadDialog";
import TrainTramUploadDialog from "@/components/TrainTramUploadDialog";
import UAEDevelopmentUploadDialog from "@/components/UAEDevelopmentUploadDialog";
import RetailPopUpUploadDialog from "@/components/RetailPopUpUploadDialog";
import GovHospitalUploadDialog from "@/components/GovHospitalUploadDialog";
import RestaurantBarUploadDialog from "@/components/RestaurantBarUploadDialog";
import SetsStagesVenuesUploadDialog from "@/components/SetsStagesVenuesUploadDialog";
import HeritageWorshipUploadDialog from "@/components/HeritageWorshipUploadDialog";
import MerchantShippingUploadDialog from "@/components/MerchantShippingUploadDialog";
import ManufacturingFacilityUploadDialog from "@/components/ManufacturingFacilityUploadDialog";
import MaritimeInfrastructureUploadDialog from "@/components/MaritimeInfrastructureUploadDialog";
import OfficesShowroomsStudiosUploadDialog from "@/components/OfficesShowroomsStudiosUploadDialog";
import SportsStadiumsThemeParksUploadDialog from "@/components/SportsStadiumsThemeParksUploadDialog";

const Index = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const spaceCategories = [
    { title: "Yachts", icon: Ship, url: "/yacht-brokerage" },
    { title: "Villas & Homes", icon: Home, url: "/real-estate" },
    { title: "Hotels & Resorts", icon: Building, url: "/hotels" },
    { title: "Restaurants & Bars", icon: Utensils, url: "/restaurants-bars" },
    { title: "Cars & Showrooms", icon: Car, url: "/cars-vehicles-2" },
    { title: "Jets & Aviation", icon: Plane, url: "/jets-aviation" },
  ];

  const howItWorksSteps = [
    {
      step: "1",
      title: "Yacht is listed with Xplor for charter",
      description: "Your yacht gets added to our charter platform"
    },
    {
      step: "2", 
      title: "Xplor books a charter as central or 3rd-party agent",
      description: "We handle the booking process and client management"
    },
    {
      step: "3",
      title: "You (the crew) get paid a fair share — automatically",
      description: "50% of our commission is split equally among all crew"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Platform-Led, Offer-Aware */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/aa974283-f5dc-4cca-bfc2-703fe4393e5c.png" 
              alt="Luxury Properties Worldwide Map" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* FairShare Program Box - Top Right */}
          <div className="absolute top-4 right-4 z-20 hidden md:block">
            <Card className="bg-white/95 backdrop-blur-sm border-primary/20 max-w-xs">
              <CardContent className="p-4 bg-gray-700">
                <h3 className="text-sm font-bold text-foreground mb-2">
                  <span className="text-primary">FairShare</span> Agreement
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Crew get 50% of charter commissions
                </p>
                <div className="flex flex-col gap-1">
                  <Link to="/fairshare">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-full text-xs py-1">
                      Yacht Crew
                    </Button>
                  </Link>
                  <Link to="/yacht-owners-clients">
                    <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium w-full text-xs py-1">
                      Yacht Owners
                    </Button>
                  </Link>
                  <Link to="/yacht-owners-clients">
                    <Button size="sm" variant="outline" className="font-medium w-full text-xs py-1">
                      Charter Clients
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h2 className="text-8xl md:text-9xl font-typografix font-bold mb-4 text-foreground">
              xplor
            </h2>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-sans text-foreground">
              The World's Most Immersive Virtual Tour Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed text-muted-foreground">
              Discover and share any real-world space — from luxury yachts to boutique hotels. 
              And if you're crew on a yacht, you could start earning through our FairShare charter program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey text-lg px-8 py-3" asChild>
                <a href="https://xplor.io/map" target="_blank" rel="noopener noreferrer">
                  Browse Virtual Tours
                </a>
              </Button>
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow/90 text-xplor-black text-lg px-8 py-3" asChild>
                <Link to="/fairshare-crew">
                  Join FairShare Crew
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Explore the World in 3D */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Explore the World in 3D</h2>
              <p className="text-xl text-muted-foreground">Quick filter grid with icons to tour</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              {spaceCategories.map((category, index) => (
                <Link key={index} to={category.url}>
                  <Card className="text-center hover:shadow-lg transition-all duration-200 group hover:bg-gradient-card cursor-pointer h-full">
                    <CardHeader className="p-6">
                      <div className="w-16 h-16 bg-xplor-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <category.icon className="w-8 h-8 text-xplor-black" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="lg" className="bg-background hover:bg-accent">
                    <Plus className="h-5 w-5 mr-2" />
                    More Space Categories
                    <ChevronDown className="h-5 w-5 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-80 max-h-96 overflow-y-auto">
                  <DropdownMenuItem asChild>
                    <Link to="/museums-galleries" className="cursor-pointer">
                      Museums & Art Galleries
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/education-and-schools" className="cursor-pointer">
                      Schools & Education
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/experiences-and-attractions" className="cursor-pointer">
                      Experiences & Attractions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cruise-ships" className="cursor-pointer">
                      Cruise Ships
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/developments" className="cursor-pointer">
                      Developments
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/golf-courses" className="cursor-pointer">
                      Golf Courses
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/trains-and-trams" className="cursor-pointer">
                      Train & Tram
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/uae-developments" className="cursor-pointer">
                      UAE Developments
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/retail-and-popups" className="cursor-pointer">
                      Retail & Pop-Up
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/government-and-healthcare" className="cursor-pointer">
                      Government & Hospital
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sets-stages-and-venues" className="cursor-pointer">
                      Sets, Stages & Venues
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/heritage-and-worship" className="cursor-pointer">
                      Heritage & Worship
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/merchant-shipping" className="cursor-pointer">
                      Merchant Shipping
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/manufacturing-facilities" className="cursor-pointer">
                      Manufacturing Facility
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/maritime-infrastructure" className="cursor-pointer">
                      Maritime Infrastructure
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/offices-showrooms-studios" className="cursor-pointer">
                      Offices, Showrooms & Studios
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sports-stadiums-theme-parks" className="cursor-pointer">
                      Sports Stadiums & Theme Parks
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* FairShare for Charter Crew */}
        <section className="py-20 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Crew, It's Time You Got a <span className="text-muted-foreground">FairShare</span>.
              </h2>
              <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                If you're crew on a yacht listed with Xplor for charter — either as the central agent or as a 
                3rd-party broker — we split 50% of our net commission equally among the crew. No tiers. No favorites. Just fair.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
              <div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-xplor-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Available for charter deals only</h3>
                      <p className="text-muted-foreground">Only applies to yacht charter bookings through our platform</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-xplor-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Applies if Xplor is central agent or 3rd-party broker</h3>
                      <p className="text-muted-foreground">Whether we're the main agent or working with other brokers</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-xplor-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Payout split equally among all active crew</h3>
                      <p className="text-muted-foreground">Every crew member on the chartered vessel gets an equal share</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Check className="w-6 h-6 text-xplor-yellow mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Automatic and transparent</h3>
                      <p className="text-muted-foreground">No backdoor deals — everything is handled automatically</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <h4 className="font-bold text-foreground mb-2">Example Payout:</h4>
                    <p className="text-muted-foreground">6 crew members = €2,000 each from a typical charter commission</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <Card className="bg-gradient-to-br from-primary/10 to-xplor-yellow/10 border-2 border-dashed border-xplor-yellow/50">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-4">
                        <DollarSign className="w-8 h-8 text-primary" />
                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">50%</div>
                          <div className="text-sm text-muted-foreground">to Xplor</div>
                        </div>
                      </div>
                      
                      <div className="border-t border-dashed border-muted pt-6">
                        <div className="flex items-center justify-center gap-4">
                          <Users className="w-8 h-8 text-xplor-yellow" />
                          <div className="text-center">
                            <div className="text-2xl font-bold text-xplor-yellow">50%</div>
                            <div className="text-sm text-muted-foreground">divided equally among crew</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <Link to="/fairshare-eligibility">Check Eligibility</Link>
                </Button>
                <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow/90 text-xplor-black" asChild>
                  <Link to="/fairshare-crew">Join FairShare Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">3 Simple Steps to Earning Your Fair Share</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {howItWorksSteps.map((step, index) => (
                <Card key={index} className="text-center relative">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-xplor-yellow text-xplor-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                    {index < howItWorksSteps.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground italic">
                "We handle the contracts, compliance, and payouts. You just do your job — and get rewarded."
              </p>
            </div>
          </div>
        </section>

        {/* Why We Built This */}
        <section className="py-20 bg-accent/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">Why We Built This</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Brokers have been keeping it all for decades. We're building a platform that shares the rewards 
              with the people who make charters magical: <span className="text-xplor-yellow font-semibold">you</span>.
            </p>
          </div>
        </section>

        {/* About Xplor */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">About Xplor</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Xplor is the platform to find and share immersive virtual tours of any space. From yachts to homes to resorts, 
              we're building the world's most explorable map — and helping people earn along the way.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-xplor-yellow/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Explore?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Discover amazing spaces or start earning as charter crew
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey" asChild>
                  <a href="https://xplor.io/map" target="_blank" rel="noopener noreferrer">
                    Browse Spaces on Xplor
                  </a>
                </Button>
              </div>
              
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-foreground mb-6">Join FairShare</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Charter crew members can start earning their fair share today
                </p>
                <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow/90 text-xplor-black" asChild>
                  <Link to="/fairshare-crew">Join FairShare as Charter Crew</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer with Legal Clarity */}
        <section className="py-12 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground max-w-4xl mx-auto">
                <strong>Legal Disclaimer:</strong> FairShare applies only to yacht charters where Xplor is the central 
                or participating brokerage. Payouts are based on the net commission Xplor receives and are divided 
                equally among verified crew.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Button variant="link" className="text-muted-foreground">Commission Terms PDF</Button>
              <Button variant="link" className="text-muted-foreground">Privacy Policy</Button>
              <Button variant="link" className="text-muted-foreground">Contact</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Upload Dialogs */}
      {selectedCategory === "museums-art" && (
        <MuseumGalleryUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "schools-education" && (
        <SchoolEducationUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "experiences" && (
        <ExperienceUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "cruise-ships" && (
        <CruiseShipUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "developments" && (
        <DevelopmentUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "golf-courses" && (
        <GolfCourseUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "train-tram" && (
        <TrainTramUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "uae-developments" && (
        <UAEDevelopmentUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "retail-popup" && (
        <RetailPopUpUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "gov-hospital" && (
        <GovHospitalUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "sets-stages" && (
        <SetsStagesVenuesUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "heritage-worship" && (
        <HeritageWorshipUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "merchant-shipping" && (
        <MerchantShippingUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "manufacturing" && (
        <ManufacturingFacilityUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "maritime-infrastructure" && (
        <MaritimeInfrastructureUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "offices-showrooms" && (
        <OfficesShowroomsStudiosUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
      {selectedCategory === "sports-theme-parks" && (
        <SportsStadiumsThemeParksUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      )}
    </div>
  );
};

export default Index;