import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Home, 
  Users, 
  Hotel, 
  MapPin, 
  Eye, 
  TrendingUp, 
  Globe, 
  Camera,
  Smartphone,
  BarChart3,
  Link2,
  CheckCircle,
  Star
} from "lucide-react";

export default function RealEstate() {
  const [activeFilter, setActiveFilter] = useState<"all" | "realestate" | "hotels">("all");

  const realEstateFeatures = [
    "Show homes 24/7 with immersive walkthroughs",
    "Reach remote buyers and global investors", 
    "Upload multiple tour versions (staged, unfurnished, model units)"
  ];

  const hotelFeatures = [
    "Let guests explore before they book",
    "Link to direct booking engines from the tour",
    "Showcase suites, spas, restaurants, and more in 360°"
  ];

  const platformFeatures = [
    { icon: Camera, title: "Multi-tour support per space" },
    { icon: Link2, title: "Interactive hotspots and booking links" },
    { icon: TrendingUp, title: "Tour versioning (seasonal updates, staging, etc.)" },
    { icon: Smartphone, title: "Works with Matterport, Kuula, Zillow 3D, etc." },
    { icon: MapPin, title: "Global geotagging and map display" },
    { icon: BarChart3, title: "Optional white-labeling and analytics" }
  ];

  const steps = [
    "Create an account",
    "Upload your property or hotel listing", 
    "Attach Matterport or 360° virtual tours",
    "Get discovered on Xplor's global map",
    "Track engagement, clicks, and leads"
  ];

  const testimonials = [
    {
      quote: "We booked 30% more viewings using Xplor virtual tours in our listings.",
      author: "Real Estate Broker, Lisbon"
    },
    {
      quote: "Guests feel like they've already stayed with us before they even arrive.",
      author: "Hotel GM, Mykonos"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Real Estate & Hotels - Virtual Tour Platform | Xplor</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                  Show Your Spaces. Sell the Experience.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                  Elevate How You Showcase Properties & Guest Experiences
                </p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Virtual tours for real estate and hospitality that convert interest into bookings.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Add Your Property
                </Button>
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Xplor Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Global Platform for Virtual Property Tours
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Xplor is a dynamic, map-based platform designed to help real estate agents, property developers, 
              and hotel brands showcase their spaces with immersive 3D and 360° virtual tours. Whether you're 
              selling a villa or filling a suite, Xplor helps you stand out — visually and globally.
            </p>
          </div>
        </section>

        {/* Audience Filter */}
        <section className="py-10 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex justify-center gap-2 mb-12">
              <Button 
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
              >
                All Industries
              </Button>
              <Button 
                variant={activeFilter === "realestate" ? "default" : "outline"}
                onClick={() => setActiveFilter("realestate")}
              >
                Real Estate
              </Button>
              <Button 
                variant={activeFilter === "hotels" ? "default" : "outline"}
                onClick={() => setActiveFilter("hotels")}
              >
                Hotels
              </Button>
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-20 px-4 bg-secondary/5">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Who It's For
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {(activeFilter === "all" || activeFilter === "realestate") && (
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">Real Estate Professionals</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-muted-foreground" />
                      <span>Agents & brokers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>Developers & leasing teams</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                      <span>Property marketers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Short-term rental hosts</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {(activeFilter === "all" || activeFilter === "hotels") && (
                <Card className="p-6">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Hotel className="w-8 h-8 text-primary" />
                      <CardTitle className="text-xl">Hospitality Industry</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Hotel className="w-4 h-4 text-muted-foreground" />
                      <span>Hotels & boutique stays</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span>Resorts & spas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>Serviced apartments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Hospitality groups & chains</span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Why Use Xplor Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Capture Attention. Drive Results.
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {(activeFilter === "all" || activeFilter === "realestate") && (
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-6 h-6 text-primary" />
                      Real Estate Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {realEstateFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {(activeFilter === "all" || activeFilter === "hotels") && (
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hotel className="w-6 h-6 text-primary" />
                      Hotel & Resort Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hotelFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-secondary/5">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              How It Works
            </h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <span className="text-lg text-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Features
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformFeatures.map((feature, index) => (
                <Card key={index} className="p-6 text-center">
                  <CardContent className="space-y-4">
                    <feature.icon className="w-8 h-8 text-primary mx-auto" />
                    <p className="text-foreground font-medium">{feature.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-secondary/5">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
              Success Stories
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <blockquote className="text-lg italic text-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                    <cite className="text-muted-foreground">— {testimonial.author}</cite>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Ready to Show the World Your Space?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Create a Free Account
              </Button>
              <Button size="lg" variant="outline">
                Talk to an Xplor Advisor
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}