import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Train, 
  Users, 
  Mountain, 
  Armchair, 
  Globe, 
  Camera,
  Mail,
  Plus,
  Check,
  X,
  AlertTriangle
} from "lucide-react";
import trainsTramsHero from "@/assets/trains-trams-hero.jpg";

const TrainsAndTrams = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.7)), url(${trainsTramsHero})`
        }}
      >
        
        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Showcase Every Carriage, Cabin, and 
            <span className="text-blue-300">Corridor — Seamlessly</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Xplor is the only immersive platform built to display full trains and trams in 360°, with every space — from engine to observation car — linked into a single, intuitive experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-800 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" />
              Contact the Xplor Team
            </Button>
            <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
              <Plus className="mr-2 h-5 w-5" />
              Add Your Train or Tram
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Xplor is the Best Platform for Trains & Trams
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The complete platform for showcasing every aspect of your rail experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Train className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Multi-Carriage Virtual Tours</h3>
              <p className="text-muted-foreground">
                Let users explore each carriage or section as if they're walking through the train in person.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Multiple Spaces in One Listing</h3>
              <p className="text-muted-foreground">
                Group linked spaces like cabins, lounges, dining areas, restrooms, and driver cabins into a single tour flow.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mountain className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Great for Scenic & Heritage Lines</h3>
              <p className="text-muted-foreground">
                Promote unique landscapes, restored classics, or historic interiors with immersive views.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Armchair className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Luxury & Charter Rail Marketing</h3>
              <p className="text-muted-foreground">
                Perfect for rail-based experiences where ambience, design, and comfort are key to conversion.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Global Reach</h3>
              <p className="text-muted-foreground">
                Xplor's experience-focused discovery platform brings your train or tram to a worldwide audience.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Engaging Storytelling</h3>
              <p className="text-muted-foreground">
                Add pop-up info, video clips, narrated tours, booking links, and historical context directly inside the tour.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Perfect for Every Type of Rail Experience
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                <span className="text-white font-medium">Luxury Rail Interior</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Luxury Tourist Trains</h3>
                <p className="text-muted-foreground">
                  Showcase staterooms, dining lounges, and panoramic observation cars to sell the journey.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-white font-medium">Modern Tram</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Urban Trams & Public Systems</h3>
                <p className="text-muted-foreground">
                  Help cities highlight accessibility, interior layouts, and design features.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center">
                <span className="text-white font-medium">Heritage Locomotive</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Heritage Railways</h3>
                <p className="text-muted-foreground">
                  Digitize vintage locomotives and classic carriages for global viewing and preservation.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <span className="text-white font-medium">Design Studio</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Train Designers & Builders</h3>
                <p className="text-muted-foreground">
                  Use immersive showcases to pitch to transport agencies and governments.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get your train or tram live on Xplor in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-slate-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Upload Your Train or Tram</h3>
              <p className="text-muted-foreground">
                Include each section with 360° photos or video — from engine cab to dining car.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-slate-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Link All Spaces Together</h3>
              <p className="text-muted-foreground">
                Connect carriages and cabins with intuitive navigation inside a single listing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-slate-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Go Live on Xplor</h3>
              <p className="text-muted-foreground">
                Share via your website, booking pages, press kits, or tourism boards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Xplor vs Alternative Platforms
            </h2>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold text-blue-600">Xplor</th>
                    <th className="text-center p-4 font-semibold">Basic Webpages</th>
                    <th className="text-center p-4 font-semibold">Transport Directories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Multi-Space Immersive Tour</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-blue-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">360° Interactive Content</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-blue-600 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Global Discovery Directory</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-blue-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Embedded Booking Links</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-blue-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Full Mobile & VR Support</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-blue-600 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Let the World Step Inside Your Train or Tram?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From heritage restorations to modern marvels, Xplor helps you showcase every part of your journey in immersive detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-slate-600 hover:bg-slate-700 px-8 py-4 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" />
              Contact the Xplor Team
            </Button>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg font-semibold">
              <Plus className="mr-2 h-5 w-5" />
              Add Your Train or Tram
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainsAndTrams;