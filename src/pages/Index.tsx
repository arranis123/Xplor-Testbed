import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Ship, Home, Landmark, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import TourProFinderForm from "@/components/TourProFinderForm";
import adventureParkImage from "@/assets/adventure-park-hero.jpg";
import scanningHeroImage from "@/assets/3d-scanning-hero.jpg";
import vrTechImage from "@/assets/vr-tech.jpg";
import luxuryYacht1 from "@/assets/luxury-yacht-1.jpg";
import luxuryYacht2 from "@/assets/luxury-yacht-2.jpg";
import luxuryProperty1 from "@/assets/luxury-property-1.jpg";
import luxuryInterior from "@/assets/luxury-interior.jpg";
import modernHouse from "@/assets/modern-house.jpg";
import yachtDetail from "@/assets/yacht-detail.jpg";
const Index = () => {
  const [showFinderForm, setShowFinderForm] = useState(false);
  return <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] flex items-start pt-8 sm:pt-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="/lovable-uploads/aa974283-f5dc-4cca-bfc2-703fe4393e5c.png" alt="Luxury Properties Worldwide Map" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          {/* Crew Member Button - Top Right */}
          <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-20">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey px-6 py-4 font-medium w-64 h-16 rounded-lg" asChild>
              
            </Button>
          </div>
          
          <div className="relative z-10 text-white w-full max-w-md lg:max-w-lg xl:max-w-xl px-mobile-md sm:px-8 lg:px-16">
            <h1 className="text-mobile-5xl sm:text-7xl md:text-8xl font-bold mb-mobile-sm sm:mb-2 font-typografix text-black">
              xplor
            </h1>
            <h2 className="text-mobile-lg sm:text-2xl md:text-3xl font-light mb-mobile-lg sm:mb-6 opacity-90">
              The World's Map of Virtual Spaces
            </h2>
            <p className="text-mobile-sm sm:text-base md:text-lg mb-mobile-xl sm:mb-8 opacity-90 leading-relaxed">
              Discover, share, and explore immersive 3D tours of real-world locations — from luxury homes and yachts to cultural landmarks and travel destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-mobile-md sm:gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 !text-xplor-grey text-mobile-base sm:text-lg px-mobile-xl sm:px-8 py-mobile-md sm:py-3 min-h-touch-comfortable font-medium">
                Map
              </Button>
              <Dialog open={showFinderForm} onOpenChange={setShowFinderForm}>
                <DialogTrigger asChild>
                  
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <TourProFinderForm onClose={() => setShowFinderForm(false)} />
                </DialogContent>
              </Dialog>
              <Button size="lg" className="bg-primary hover:bg-primary/90 !text-xplor-grey text-mobile-base sm:text-lg px-mobile-xl sm:px-8 py-mobile-md sm:py-3 min-h-touch-comfortable font-medium" asChild>
                <Link to="/auth">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-mobile-2xl sm:py-20 bg-background">
          <div className="container mx-auto px-mobile-md sm:px-4">
            <div className="text-center mb-mobile-2xl sm:mb-16">
              <h2 className="text-mobile-3xl sm:text-4xl font-bold text-foreground mb-mobile-md sm:mb-4">
                Everything you need for luxury experiences
              </h2>
              <p className="text-mobile-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                From exclusive yachts to stunning properties, curate your perfect luxury getaway
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-mobile-lg sm:gap-8">
              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card">
                <CardHeader className="p-mobile-lg sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-xplor-yellow rounded-full flex items-center justify-center mx-auto mb-mobile-md sm:mb-4 group-hover:scale-110 transition-transform">
                    <Ship className="w-6 h-6 sm:w-8 sm:h-8 text-xplor-black" />
                  </div>
                  <CardTitle className="text-mobile-lg sm:text-xl">Yachts</CardTitle>
                  <CardDescription className="text-mobile-sm sm:text-base">
                    Charter world-class luxury yachts with professional crews and premium amenities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card">
                <CardHeader className="p-mobile-lg sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-xplor-black rounded-full flex items-center justify-center mx-auto mb-mobile-md sm:mb-4 group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6 sm:w-8 sm:h-8 text-xplor-yellow" />
                  </div>
                  <CardTitle className="text-mobile-lg sm:text-xl">Properties</CardTitle>
                  <CardDescription className="text-mobile-sm sm:text-base">
                    Stay in extraordinary luxury properties and exclusive architectural marvels
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card sm:col-span-2 md:col-span-1">
                <CardHeader className="p-mobile-lg sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-xplor-grey rounded-full flex items-center justify-center mx-auto mb-mobile-md sm:mb-4 group-hover:scale-110 transition-transform">
                    <Landmark className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-mobile-lg sm:text-xl">Experiences</CardTitle>
                  <CardDescription className="text-mobile-sm sm:text-base">
                    Personalized service and exclusive access to the world's finest experiences
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* FairShare Program Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 max-w-4xl mx-auto">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Checkout our <span className="text-primary">FairShare</span> program for yachts
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8">
                    Where crew get 50% of charter commissions
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/yacht-crew-offer">
                      <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                        Yacht Crew
                      </Button>
                    </Link>
                    <Link to="/yacht-owners-clients">
                      <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-medium">
                        Yacht Owners
                      </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="font-medium">
                      Yacht Charter Clients
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gigs CTA Section */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Exclusive Property <span className="text-xplor-yellow">Partnerships</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Partner with us to showcase your luxury properties to discerning clients worldwide. 
                  From modern architectural masterpieces to historic estates, we connect property owners 
                  with guests seeking extraordinary accommodations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/gigs">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey font-medium">
                      List Your Property
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Partnership Info
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img src={luxuryProperty1} alt="Luxury Property Architecture" className="rounded-lg shadow-medium w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* VR Store Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img src={modernHouse} alt="Luxury Glass Architecture" className="rounded-lg shadow-medium w-full" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Premium <span className="text-xplor-yellow">Virtual Tours</span> & Documentation
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Showcase your luxury properties and yachts with cutting-edge virtual reality technology. 
                  Our professional 3D scanning and VR services create immersive experiences that allow 
                  clients to explore every detail before their visit.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Property Virtual Tours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Yacht Documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">3D Interactive Experiences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Premium Marketing Materials</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/vr-cameras">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey font-medium">
                      Request Virtual Tour
                    </Button>
                  </Link>
                  <Link to="/capture-services">
                    <Button size="lg" variant="outline">
                      Documentation Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Yachts Section */}
        <section className="py-20 bg-accent/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Luxury <span className="text-xplor-yellow">Yacht</span> Experiences
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the ultimate in maritime luxury with our exclusive yacht charter collection
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Charter Premium Vessels
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Experience the ocean like never before aboard our fleet of luxury yachts. 
                  From intimate sunset cruises to extended voyages, our professionally crewed 
                  vessels offer unparalleled comfort and sophistication.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-muted-foreground">Professional crew and captain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-muted-foreground">Gourmet dining and beverages</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-muted-foreground">Water sports and amenities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-muted-foreground">Custom itineraries available</span>
                  </div>
                </div>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey font-medium">
                  Explore Yacht Charters
                </Button>
              </div>
              <div className="relative">
                <img src={luxuryYacht1} alt="Luxury yacht on ocean waves" className="rounded-lg shadow-medium w-full object-cover h-[400px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Properties Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Luxury <span className="text-xplor-yellow">Property</span> Experiences
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay in extraordinary properties designed for the ultimate luxury experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
                <div className="relative">
                  <img src={luxuryInterior} alt="Modern architectural property" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-xplor-yellow text-xplor-black px-3 py-1 rounded-full text-sm font-medium">
                      Modern
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Contemporary Villas</h3>
                  <p className="text-muted-foreground mb-4">
                    Sleek, modern architecture with cutting-edge amenities and breathtaking views.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">From $2,500/night</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
                <div className="relative">
                  <img src={yachtDetail} alt="Glass tower luxury property" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-xplor-yellow text-xplor-black px-3 py-1 rounded-full text-sm font-medium">
                      Urban
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Sky Penthouses</h3>
                  <p className="text-muted-foreground mb-4">
                    Exclusive penthouses offering panoramic city views and world-class luxury.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">From $4,000/night</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover:shadow-medium transition-all duration-300 group">
                <div className="relative">
                  <img src={luxuryYacht2} alt="Unique wavy architecture property" className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-xplor-yellow text-xplor-black px-3 py-1 rounded-full text-sm font-medium">
                      Iconic
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Architectural Marvels</h3>
                  <p className="text-muted-foreground mb-4">
                    One-of-a-kind properties featuring innovative design and artistic excellence.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">From $3,500/night</span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black mr-4">
                Browse All Properties
              </Button>
              <Button size="lg" variant="outline">
                Contact Concierge
              </Button>
            </div>
          </div>
        </section>

        {/* Luxury Experience CTA */}
        <section className="py-20 bg-gradient-to-r from-primary/10 to-xplor-yellow/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready for the Ultimate Luxury Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our concierge team create a bespoke experience combining luxury yachts, 
              exclusive properties, and unforgettable adventures tailored just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-xplor-grey font-medium">
                Start Planning
              </Button>
              <Button size="lg" variant="outline">
                View Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-xplor-yellow mb-2">500+</div>
                <div className="text-muted-foreground">Luxury Properties</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-black mb-2">150+</div>
                <div className="text-muted-foreground">Premium Yachts</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-yellow mb-2">5★</div>
                <div className="text-muted-foreground">Exclusive Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-black mb-2">24/7</div>
                <div className="text-muted-foreground">Concierge Service</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;