import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Compass, 
  CreditCard, 
  Globe, 
  Backpack, 
  Headphones, 
  Eye,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  X,
  MapPin,
  Star,
  Users
} from "lucide-react";
import experiencesAttractionsHero from "@/assets/experiences-attractions-hero.jpg";

const ExperiencesAttractions = () => {
  const features = [
    {
      icon: <Compass className="h-8 w-8" />,
      title: "Immersive Previews",
      description: "Let guests explore your venue, trail, or experience before booking—VR-ready."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Drive More Bookings",
      description: "Integrated links to ticketing platforms, booking engines, or affiliate sites."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Discovery",
      description: "Be part of a platform visited by travelers, influencers, and travel planners worldwide."
    },
    {
      icon: <Backpack className="h-8 w-8" />,
      title: "Ideal for Tour Operators & Venues",
      description: "From nature parks to tasting rooms, historic landmarks to festivals—show what makes you unforgettable."
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Multi-Sensory Storytelling",
      description: "Add audio guides, voiceovers, music, or pop-ups to guide the journey."
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Trust-Building & Transparency",
      description: "Let guests know exactly what to expect. Reduce no-shows and build brand confidence."
    }
  ];

  const useCases = [
    {
      title: "Theme Parks & Adventure Attractions",
      icon: "🎢",
      image: "/lovable-uploads/adventure-park-hero.jpg"
    },
    {
      title: "National Parks & Natural Wonders",
      icon: "🏞️",
      image: "/lovable-uploads/virtual360ny-hero.jpg"
    },
    {
      title: "Wine, Food & Beverage Tastings",
      icon: "🍷",
      image: "/lovable-uploads/luxury-interior.jpg"
    },
    {
      title: "Guided Tours & Expeditions",
      icon: "🧗",
      image: "/lovable-uploads/bangkok-virtual-tour.jpg"
    },
    {
      title: "Cultural & Historical Sites",
      icon: "🏛️",
      image: "/lovable-uploads/luxury-property-1.jpg"
    },
    {
      title: "Live Performances & Seasonal Events",
      icon: "🎭",
      image: "/lovable-uploads/modern-house.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Virtual Experience",
      description: "Upload your tour, photos, highlights, or booking details."
    },
    {
      number: "02",
      title: "Customize & Tell Your Story",
      description: "Add maps, voiceovers, schedules, reviews, or seasonal offers."
    },
    {
      number: "03",
      title: "Go Live & Get Discovered",
      description: "Visitors can view, share, book, and plan from anywhere in the world."
    }
  ];

  const comparisonFeatures = [
    {
      feature: "360° / VR Ready",
      xplor: "full",
      basicApps: "limited",
      bookingSites: "none"
    },
    {
      feature: "Tour Monetization",
      xplor: "full",
      basicApps: "none",
      bookingSites: "limited"
    },
    {
      feature: "Embedded Storytelling",
      xplor: "full",
      basicApps: "limited",
      bookingSites: "none"
    },
    {
      feature: "Global Experience Directory",
      xplor: "full",
      basicApps: "none",
      bookingSites: "none"
    },
    {
      feature: "Custom Branding & Control",
      xplor: "full",
      basicApps: "limited",
      bookingSites: "none"
    }
  ];

  const getIcon = (status: string) => {
    switch (status) {
      case "full":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "limited":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "none":
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={experiencesAttractionsHero}
            alt="Exciting experiences and attractions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-coral-900/70 via-orange-800/60 to-teal-900/70"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl">
          <Badge className="mb-6 bg-primary/20 text-white border-white/20">
            Trusted by Leading Attractions Worldwide
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Turn Your Experience into an{" "}
            <span className="text-gradient bg-gradient-to-r from-coral-400 to-teal-400 bg-clip-text text-transparent">
              Immersive Attraction
            </span>{" "}
            — Instantly
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Xplor connects global travelers and local explorers to your destination with stunning 360° virtual previews that boost bookings, visibility, and trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg">
              Showcase Your Experience
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white px-8 py-4 text-lg">
              View Sample Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Xplor Is the Best Platform for{" "}
              <span className="text-gradient bg-gradient-to-r from-coral-500 to-teal-500 bg-clip-text text-transparent">
                Experiences & Attractions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the platform that's revolutionizing how travelers discover and book unforgettable experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-coral-500 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect for Every Type of{" "}
              <span className="text-primary">
                Experience
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From adventure parks to cultural landmarks, showcase what makes your attraction unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-2">{useCase.icon}</div>
                    <h3 className="text-lg font-semibold">{useCase.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It{" "}
              <span className="text-primary">
                Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get your experience online and discoverable in three simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-coral-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-coral-500 to-teal-500" />
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Makes Xplor{" "}
              <span className="text-primary">
                Different
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we compare to basic tour apps and booking sites
            </p>
          </div>

          <Card className="overflow-hidden shadow-xl">
            <div className="grid grid-cols-4 bg-muted/50 p-4 font-semibold">
              <div>Feature</div>
              <div className="text-center text-coral-600">Xplor</div>
              <div className="text-center">Basic Tour Apps</div>
              <div className="text-center">Booking Sites</div>
            </div>
            {comparisonFeatures.map((item, index) => (
              <div key={index} className="grid grid-cols-4 p-4 border-t items-center hover:bg-muted/20 transition-colors">
                <div className="font-medium">{item.feature}</div>
                <div className="flex justify-center">{getIcon(item.xplor)}</div>
                <div className="flex justify-center">{getIcon(item.basicApps)}</div>
                <div className="flex justify-center">{getIcon(item.bookingSites)}</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let the World Step Inside Your{" "}
            <span className="text-primary">
              Experience
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join the most immersive platform for showcasing unforgettable attractions and experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-4 text-lg">
              Create Your Tour Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              Get Help from Xplor Team
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>1000+ Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>99% Customer Satisfaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>50+ Countries</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExperiencesAttractions;