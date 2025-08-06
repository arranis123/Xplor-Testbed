import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building, Ticket, Target, Lock, Paperclip, Upload, Link, Share, Check, X, AlertTriangle, Trophy, FerrisWheel, Music, GraduationCap } from "lucide-react";
import sportsStadiumsThemeParksHero from "@/assets/sports-stadiums-theme-parks-hero.jpg";

export default function SportsStadiumsThemeParks() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${sportsStadiumsThemeParksHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let Visitors Explore Your Venue Before They Even Arrive
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Give fans, guests, planners, and sponsors a fully immersive 360° tour of your stadium or park — 
            from VIP boxes to roller coasters — all in one seamless, connected experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add Sports Stadiums & Theme Parks
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is the #1 Platform for Sports & Attractions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🏟 Multi-Zone Interactive Tours</h3>
                <p className="text-muted-foreground">
                  Connect concourses, locker rooms, skyboxes, arenas, rides, queues, restaurants, 
                  and backstage zones in a single, intuitive 360° tour.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Ticket className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎢 Drive Guest Excitement & Pre-Booking</h3>
                <p className="text-muted-foreground">
                  Let future visitors preview rides, seats, and experiences — increasing conversion and upsells.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎯 Sponsor & Retail Visibility</h3>
                <p className="text-muted-foreground">
                  Highlight branded areas, merchandise zones, or partner installations with rich media and links.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎫 Perfect for Event Planners</h3>
                <p className="text-muted-foreground">
                  Let promoters and organizers explore venue layouts, seating options, and backstage access remotely.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🔐 Flexible Access & Navigation</h3>
                <p className="text-muted-foreground">
                  Choose open access for fans or password-protect restricted areas for partners, vendors, or staff.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Paperclip className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">📎 Attach Floorplans, Menus & Guides</h3>
                <p className="text-muted-foreground">
                  Link maps, facility specs, food menus, and ticketing info directly within the tour.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Inspiration & Use Cases
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Trophy className="w-16 h-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Professional Sports Stadium</h3>
                <p className="text-sm text-muted-foreground">
                  Tour suites, media zones, locker rooms, dugouts, and VIP lounges — all in one click.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <FerrisWheel className="w-16 h-16 text-purple-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Theme & Amusement Parks</h3>
                <p className="text-sm text-muted-foreground">
                  Let families preview key rides, attractions, food zones, and accessibility routes from home.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Music className="w-16 h-16 text-green-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Concert & Event Venues</h3>
                <p className="text-sm text-muted-foreground">
                  Show event producers and sponsors the layout, branding zones, and backstage flow.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <GraduationCap className="w-16 h-16 text-orange-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Sports Academies & Training Grounds</h3>
                <p className="text-sm text-muted-foreground">
                  Market to athletes and families by showcasing facilities, fitness zones, and housing options.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Venue Listing</h3>
                <p className="text-muted-foreground">
                  Add location info, amenities, and a visual summary of what guests can expect.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add and Link All Areas</h3>
                <p className="text-muted-foreground">
                  Connect every space — entrances, viewing zones, restrooms, attractions, concessions — 
                  into one immersive tour.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Share className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Share with the World</h3>
                <p className="text-muted-foreground">
                  Publish your venue experience to drive fan engagement, ticket sales, or booking inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Platform Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">Static Maps</th>
                  <th className="text-center p-4 font-semibold">Video Tours</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Multi-Zone Navigation</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">VR & Mobile Friendly</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Sponsor/Attraction Highlights</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Embed Files & Media</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Real-Time Updates</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Designed for Public Venues</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Transform How the World Experiences Your Venue — Virtually
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you manage a stadium, theme park, or entertainment venue, Xplor helps you showcase every space 
            in stunning detail — driving bookings, excitement, and loyalty like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              ➕ Add Sports Stadiums & Theme Parks
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}