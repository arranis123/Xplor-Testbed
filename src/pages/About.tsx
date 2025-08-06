import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import aboutHero from "@/assets/about-hero.jpg";
import { 
  Ship, 
  Home, 
  Hotel, 
  Car, 
  Plane, 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Heart, 
  ArrowRight,
  CheckCircle,
  Mail,
  Target,
  Eye,
  DollarSign
} from "lucide-react";

const About = () => {
  const verticals = [
    { icon: Ship, label: "Yachts", description: "List & explore yachts for sale or charter + FairShare program", status: "✅", link: "/yacht-brokerage" },
    { icon: Home, label: "Real Estate", description: "Properties for sale or rent — with immersive walkthroughs", status: "✅", link: "/real-estate" },
    { icon: Hotel, label: "Hotels", description: "Full property tours, rooms, amenities + booking API", status: "✅", link: "/hotels" },
    { icon: Building2, label: "Restaurants & Bars", description: "Showcase ambiance, tables, layouts + reservation plugin", status: "✅", link: "/restaurants-bars" },
    { icon: Car, label: "Cars & Vehicles", description: "360° car walkarounds, test drives, full showrooms", status: "✅", link: "/cars-vehicles-2" },
    { icon: Plane, label: "Jets & Aviation", description: "Cabin tours, charters, training + test flights API", status: "✅", link: "/jets-aviation" },
    { icon: Building2, label: "Developments", description: "Off-plan projects, branded residences, investor pages", status: "✅", link: "/real-estate" }
  ];

  const whyXplorPillars = [
    { 
      icon: Eye, 
      title: "Immersion", 
      description: "360° or 3D walkthroughs that show everything — not just pretty angles" 
    },
    { 
      icon: Target, 
      title: "Action", 
      description: "Tours that convert: Book, Contact, Refer, or Apply — all from within" 
    },
    { 
      icon: Globe, 
      title: "Reach", 
      description: "Global visibility, even for small local businesses" 
    },
    { 
      icon: DollarSign, 
      title: "Monetization", 
      description: "Tools like FairShare let creators and insiders earn from traffic or deals" 
    },
    { 
      icon: Users, 
      title: "Access", 
      description: "Anyone can list a space. No gatekeepers. No exclusivity walls." 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${aboutHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="relative max-w-4xl mx-auto space-y-6 z-10">
          <h1 className="text-5xl font-bold text-foreground">
            We're Building the World's Most Immersive Map.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Xplor is the first global platform where anyone can discover, upload, or monetize immersive virtual tours of real-world spaces — from superyachts and villas to restaurants, showrooms, and jet cabins.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg">
              Explore the Platform
            </Button>
            <Button size="lg" variant="outline">
              List a Space
            </Button>
          </div>
        </div>
      </section>

      {/* What We've Built */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            From Yacht Charters to Skyscrapers — We're Mapping the World in 3D.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {verticals.map((vertical, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <vertical.icon className="h-8 w-8 text-primary" />
                    <span className="text-green-600 font-semibold">{vertical.status}</span>
                  </div>
                  <h3 className="font-semibold text-foreground">{vertical.label}</h3>
                  <p className="text-sm text-muted-foreground">{vertical.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FairShare Program */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            A Platform That Pays the People Who Make It Possible.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            With FairShare, Xplor is redefining commission. Crew members, insiders, or staff can now earn 50% of the net commission we earn on charter deals — fairly and transparently. Starting with yachting, FairShare will expand into other industries soon.
          </p>
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-8 rounded-lg">
            <div className="flex items-center justify-center space-x-4 text-lg font-semibold text-foreground">
              <span>Platform Revenue</span>
              <ArrowRight className="h-5 w-5" />
              <span className="text-primary">50% to Crew/Partners</span>
              <ArrowRight className="h-5 w-5" />
              <span>50% to Xplor</span>
            </div>
          </div>
          <Button size="lg" className="mt-6">
            Join FairShare
          </Button>
        </div>
      </section>

      {/* Why Xplor */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Because Photos Aren't Enough Anymore.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyXplorPillars.map((pillar, index) => (
              <div key={index} className="text-center space-y-4">
                <pillar.icon className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Bigger Vision */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            We're Building the World's Immersive Index.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Just like Google indexed websites, Xplor is indexing real-world spaces — one virtual tour at a time. We're creating a searchable, explorable, monetizable map of everything physical: homes, hotels, yachts, jets, retail, everything.
          </p>
          <div className="flex items-center justify-center space-x-2 text-primary font-semibold">
            <Globe className="h-8 w-8 animate-spin" />
            <span className="text-lg">2,000+ spaces mapped and growing</span>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Built by Explorers, for Explorers.
          </h2>
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Company Details</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p><strong>Company:</strong> XPLORVR Media Group FZCO</p>
                  <p><strong>HQ:</strong> Dubai, UAE</p>
                  <p><strong>Founder:</strong> Capt. Johnny Drummond</p>
                  <p><strong>Experience:</strong> 20+ years in yachting</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To create the world's most comprehensive immersive platform, connecting physical spaces with digital experiences while empowering creators and industry professionals through innovative monetization models.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press + Contact */}
      <section className="py-16 px-6 bg-secondary/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Let's Talk
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to explore partnerships, press opportunities, or learn more about what we're building?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Mail className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline">
              Partner With Xplor
            </Button>
            <Button size="lg" variant="outline">
              Press Kit
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary/10 to-secondary/10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to Explore What Xplor Can Do?
          </h2>
          <p className="text-xl text-muted-foreground">
            Whether you're listing a superyacht, a skyscraper, or your café — if it can be walked through, it can be explored on Xplor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Upload a Space
            </Button>
            <Button size="lg" variant="outline">
              Browse the Map
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;