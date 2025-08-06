import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Ship, 
  Globe, 
  Calendar, 
  Theater, 
  Briefcase, 
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  X,
  Anchor,
  Waves,
  Star
} from "lucide-react";

const CruiseShips = () => {
  const features = [
    {
      icon: <Ship className="h-8 w-8" />,
      title: "Immersive Deck-by-Deck Tours",
      description: "Let users explore staterooms, lounges, spas, and public spaces — in interactive 360°."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Booking Exposure",
      description: "Appear on the world's top discovery platform for real-world travel, accessible worldwide."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Pre-Sell Voyages & Itineraries",
      description: "Link virtual tours directly to seasonal sailings, routes, or charter availabilities."
    },
    {
      icon: <Theater className="h-8 w-8" />,
      title: "Experience-Centered Selling",
      description: "Promote onboard entertainment, dining, excursions, and lifestyle offerings."
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Agent & Group Sales Ready",
      description: "Embed into B2B travel portals, training tools, or presentation decks."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Boost Trust & Reduce Questions",
      description: "No more confusion over cabin layouts or deck plans — see it, feel it, book it."
    }
  ];

  const targetAudiences = [
    {
      title: "Major Cruise Lines",
      icon: "🛳",
      image: "/lovable-uploads/luxury-yacht-1.jpg"
    },
    {
      title: "Boutique Expedition Ships",
      icon: "🚢",
      image: "/lovable-uploads/luxury-yacht-2.jpg"
    },
    {
      title: "Charter Cruise Operators",
      icon: "🌐",
      image: "/lovable-uploads/yacht-detail.jpg"
    },
    {
      title: "Educational / Themed Voyages",
      icon: "🎓",
      image: "/lovable-uploads/yacht-hero-man.jpg"
    },
    {
      title: "Corporate Cruise Planners",
      icon: "💼",
      image: "/lovable-uploads/yacht-hero-man-with-equipment.jpg"
    },
    {
      title: "Travel Agents & Wholesalers",
      icon: "🏝",
      image: "/lovable-uploads/luxury-interior.jpg"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Capture & Upload Tour",
      description: "List your cruise ship with VR or 360° imagery of decks, cabins, and experiences."
    },
    {
      number: "02",
      title: "Customize & Brand It",
      description: "Add your logo, itinerary links, sailing dates, and booking CTAs."
    },
    {
      number: "03",
      title: "Go Live on Xplor",
      description: "Reach a global audience ready to book. Share tours via your website, agents, and partners."
    }
  ];

  const comparisonFeatures = [
    {
      feature: "360° Immersive Tours",
      xplor: "full",
      brochures: "none",
      bookingEngines: "none"
    },
    {
      feature: "Embedded Booking Links",
      xplor: "full",
      brochures: "none",
      bookingEngines: "limited"
    },
    {
      feature: "Global Experience Directory",
      xplor: "full",
      brochures: "none",
      bookingEngines: "none"
    },
    {
      feature: "VR & Mobile Friendly",
      xplor: "full",
      brochures: "limited",
      bookingEngines: "limited"
    },
    {
      feature: "Stateroom Transparency",
      xplor: "full",
      brochures: "none",
      bookingEngines: "limited"
    },
    {
      feature: "Cross-Platform Sharing",
      xplor: "full",
      brochures: "none",
      bookingEngines: "full"
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
    <div className="min-h-screen bg-gradient-to-b from-background via-blue-50/20 to-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with ocean theme */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,33,77,0.7), rgba(0,64,122,0.7)), url('/lovable-uploads/luxury-yacht-1.jpg')`
          }}
        />
        
        {/* Animated waves overlay */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="m-160,44c30,0 58,-18 88,-18s 58,18 88,18 58,-18 88,-18 58,18 88,18 v44h-352z" />
            </defs>
            <g className="parallax">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
              <use href="#gentle-wave" x="48" y="7" fill="#fff" />
            </g>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl">
          <Badge className="mb-6 bg-blue-600/30 text-white border-blue-300/30">
            <Anchor className="h-4 w-4 mr-2" />
            The Future of Cruise Marketing
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Let Travelers{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Step Aboard
            </span>{" "}
            — Before They Even Book
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Xplor transforms cruise marketing with immersive 360° tours that showcase cabins, restaurants, entertainment, and entire decks — across desktop, mobile, and VR.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Showcase Your Cruise Ship
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg">
              View Live Cruise Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Why Cruise Lines Choose Xplor */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Cruise Lines Choose{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Xplor
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform how travelers discover and book your cruise experience with immersive virtual tours
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className="text-blue-600 mb-4 flex justify-center">
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

      {/* Who It's For Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50/30 to-cyan-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect for Every{" "}
              <span className="text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Maritime Experience
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From luxury liners to expedition vessels, showcase what makes your cruise unforgettable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <Card key={index} className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={audience.image} 
                    alt={audience.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-2">{audience.icon}</div>
                    <h3 className="text-lg font-semibold">{audience.title}</h3>
                  </div>
                  <Button variant="outline" className="absolute bottom-4 right-4 text-white border-white hover:bg-white hover:text-blue-900 text-sm">
                    See Example
                  </Button>
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
              <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get your cruise ship online and discoverable in three simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500" />
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
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50/30 to-cyan-50/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Xplor vs{" "}
              <span className="text-gradient bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Others
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we compare to traditional cruise brochures and booking engines
            </p>
          </div>

          <Card className="overflow-hidden shadow-xl">
            <div className="grid grid-cols-4 bg-blue-50/50 p-4 font-semibold">
              <div>Feature</div>
              <div className="text-center text-blue-600">Xplor</div>
              <div className="text-center">Cruise Brochures</div>
              <div className="text-center">Booking Engines</div>
            </div>
            {comparisonFeatures.map((item, index) => (
              <div key={index} className="grid grid-cols-4 p-4 border-t items-center hover:bg-blue-50/20 transition-colors">
                <div className="font-medium">{item.feature}</div>
                <div className="flex justify-center">{getIcon(item.xplor)}</div>
                <div className="flex justify-center">{getIcon(item.brochures)}</div>
                <div className="flex justify-center">{getIcon(item.bookingEngines)}</div>
              </div>
            ))}
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The Future of Cruise Booking Is{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Virtual
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Show travelers exactly what makes your ship special — and convert curiosity into cabin reservations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              List Your Cruise Ship
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
              Talk to a Cruise Marketing Expert
            </Button>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Waves className="h-4 w-4" />
              <span>500+ Vessels</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>98% Booking Increase</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>80+ Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for wave animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .waves {
          position: relative;
          width: 100%;
          height: 15vh;
          margin-bottom: -7px;
          min-height: 100px;
          max-height: 150px;
        }

        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px,0,0);
          }
          100% { 
            transform: translate3d(85px,0,0);
          }
        }
        `
      }} />
    </div>
  );
};

export default CruiseShips;