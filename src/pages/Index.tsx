import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import adventureParkImage from "@/assets/adventure-park-hero.jpg";
import scanningHeroImage from "@/assets/3d-scanning-hero.jpg";
import vrTechImage from "@/assets/vr-tech.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={scanningHeroImage} 
              alt="3D Scanning Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/60"></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Explore Beyond Limits
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover thrilling adventures and unique experiences that push boundaries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black text-lg px-8 py-3">
                Start Exploring
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                Watch Adventures
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Everything you need to explore and experience
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From planning to adventure, manage your entire journey in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-xplor-yellow rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-xplor-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <CardTitle>Adventure</CardTitle>
                  <CardDescription>
                    Discover thrilling adventures and adrenaline-pumping experiences
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-xplor-black rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-xplor-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <CardTitle>Experience</CardTitle>
                  <CardDescription>
                    Create unforgettable memories with our guided tours and activities
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200 group hover:bg-gradient-card">
                <CardHeader>
                  <div className="w-16 h-16 bg-xplor-grey rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <CardTitle>Community</CardTitle>
                  <CardDescription>
                    Connect with fellow adventurers and share your experiences
                  </CardDescription>
                </CardHeader>
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
                  Turn Your Passion Into <span className="text-xplor-yellow">Profit</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join our marketplace and connect with clients who need adventure guides, 
                  tour operators, and experience creators. From outdoor expeditions to cultural tours, 
                  find gigs that match your expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/gigs">
                    <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                      Browse Gigs
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={adventureParkImage} 
                  alt="Adventure Experiences"
                  className="rounded-lg shadow-medium w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VR Store Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src={vrTechImage} 
                  alt="VR Cameras and Headsets"
                  className="rounded-lg shadow-medium w-full"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Professional <span className="text-xplor-yellow">VR Equipment</span> Store
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Complete your virtual reality setup with professional Matterport cameras and VR headsets. 
                  From 3D scanning to immersive viewing experiences, we have everything you need to create 
                  and showcase digital twins.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Matterport Pro3 & Pro2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">VR Headsets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Professional Accessories</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-xplor-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Enterprise Solutions</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/vr-cameras">
                    <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                      Shop VR Equipment
                    </Button>
                  </Link>
                  <Link to="/capture-services">
                    <Button size="lg" variant="outline">
                      Capture Services
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
                <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                  Explore Yacht Charters
                </Button>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80" 
                  alt="Luxury yacht on ocean waves"
                  className="rounded-lg shadow-medium w-full object-cover h-[400px]"
                />
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
                  <img 
                    src="https://images.unsplash.com/photo-1486718448742-163732cd1544?auto=format&fit=crop&w=400&q=80" 
                    alt="Modern architectural property"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <img 
                    src="https://images.unsplash.com/photo-1497604401993-f2e922e5cb0a?auto=format&fit=crop&w=400&q=80" 
                    alt="Glass tower luxury property"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                  <img 
                    src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop&w=400&q=80" 
                    alt="Unique wavy architecture property"
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
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
                <div className="text-4xl font-bold text-xplor-yellow mb-2">1M+</div>
                <div className="text-muted-foreground">Adventures Booked</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-black mb-2">50+</div>
                <div className="text-muted-foreground">Destinations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-yellow mb-2">5★</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-xplor-black mb-2">24/7</div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
