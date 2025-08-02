import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Ship, 
  Hotel, 
  Image, 
  GraduationCap, 
  Car, 
  Plane, 
  Building, 
  ShoppingBag, 
  Landmark,
  Film,
  MapPin,
  Briefcase,
  Target,
  Link,
  Settings,
  Brain,
  ArrowRight
} from "lucide-react";

const About = () => {
  const spaceTypes = [
    { icon: Home, label: "Real Estate", subtitle: "Residential & Commercial" },
    { icon: Ship, label: "Yachts & Charter Vessels", subtitle: "Marine Properties" },
    { icon: Hotel, label: "Hotels & Resorts", subtitle: "Hospitality Spaces" },
    { icon: Image, label: "Museums & Art Galleries", subtitle: "Cultural Spaces" },
    { icon: GraduationCap, label: "Schools & Educational Spaces", subtitle: "Learning Environments" },
    { icon: Car, label: "Cars, Motorcycles, & Vehicles", subtitle: "Automotive Showcase" },
    { icon: Plane, label: "Aircraft & Private Jets", subtitle: "Aviation Assets" },
    { icon: Building, label: "Offices, Showrooms, & Studios", subtitle: "Business Spaces" },
    { icon: ShoppingBag, label: "Retail & Pop-Up Experiences", subtitle: "Shopping Venues" },
    { icon: Landmark, label: "Heritage Sites & Places of Worship", subtitle: "Historic Locations" },
    { icon: Film, label: "Sets, Stages, and Venues", subtitle: "Entertainment Spaces" }
  ];

  const steps = [
    "Create a free account",
    "Upload or link your virtual tour (Matterport, 360°, drone, etc.)",
    "Add details, categories, and location",
    "Publish to the Xplor map",
    "Share it or embed it anywhere"
  ];

  const benefits = [
    { icon: MapPin, title: "Global reach through a map-based interface" },
    { icon: Briefcase, title: "Suitable for individuals or businesses" },
    { icon: Target, title: "Versatile across industries" },
    { icon: Link, title: "Shareable links, embeddable tours, versioning" },
    { icon: Settings, title: "Compatible with Matterport, Kuula, and more" },
    { icon: Brain, title: "Designed for discoverability, lead capture, and engagement" }
  ];

  const testimonials = [
    {
      quote: "As a real estate agent, I use Xplor to send 360° home tours to international buyers.",
      role: "Residential Agent, Spain"
    },
    {
      quote: "I uploaded a virtual gallery and sold two paintings from Xplor views alone.",
      role: "Independent Artist, Italy"
    },
    {
      quote: "We showcase our charter yachts to guests long before they ever step on board.",
      role: "Yacht Manager, Monaco"
    },
    {
      quote: "We gave virtual campus tours to families across the globe.",
      role: "Private School Director, UK"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold text-foreground">
            Your Space. Your Story. Seen Globally.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Xplor is the world's platform for showcasing real-world spaces through immersive virtual tours — anytime, anywhere.
          </p>
          <Button size="lg" className="mt-8">
            Get Started with Xplor
          </Button>
        </div>
      </section>

      {/* What Is Xplor */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            One Platform. Every Space.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Xplor is a global discovery and publishing platform built to host and share immersive virtual tours of any space on earth.
            Whether you're a property developer, curator, captain, or collector — if you have a space worth showcasing, Xplor makes it easy to upload, organize, and present it beautifully.
          </p>
          <Button variant="outline" className="mt-6">
            🔍 Explore the Map
          </Button>
        </div>
      </section>

      {/* Supported Space Types */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            What Can You Xplor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0 space-y-3">
                  <type.icon className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold text-foreground">{type.label}</h3>
                  <p className="text-sm text-muted-foreground">{type.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Xplor Works */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            How Xplor Works
          </h2>
          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <p className="text-lg text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Xplor */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Xplor?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <benefit.icon className="h-6 w-6 text-primary mt-1" />
                <p className="text-foreground">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0 space-y-4">
                  <p className="text-foreground italic">"{testimonial.quote}"</p>
                  <Badge variant="outline" className="text-sm">
                    {testimonial.role}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Share Your Space with the World?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Create Your Free Listing
            </Button>
            <Button size="lg" variant="outline">
              Request a Demo or Tour Review
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;