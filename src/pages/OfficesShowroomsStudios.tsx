import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Building2, Globe, Sofa, Mic, Lock, Paperclip, Upload, Link, Share, Check, X, AlertTriangle, Store, Users, Briefcase } from "lucide-react";
import officesShowroomsStudiosHero from "@/assets/offices-showrooms-studios-hero.jpg";

export default function OfficesShowroomsStudios() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${officesShowroomsStudiosHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let Them Step Inside Before They Step In
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Showcase your workspace, showroom, or creative studio in stunning 360° — with connected, navigable zones 
            that let clients, tenants, or collaborators experience the layout from anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add Offices, Showrooms & Studios
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is the Ultimate Tool for Commercial Spaces
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🏢 Multi-Zone Virtual Tour Support</h3>
                <p className="text-muted-foreground">
                  Present reception, meeting rooms, workstations, studios, server rooms, showrooms, 
                  and more — all in one listing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🌍 Perfect for Remote Leasing & Sales</h3>
                <p className="text-muted-foreground">
                  Let potential tenants or partners explore space configurations before they 
                  ever step foot onsite.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Sofa className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🛋 Design & Fit-Out Visualization</h3>
                <p className="text-muted-foreground">
                  Show off renovations, mockups, or design options — perfect for interior designers 
                  and project teams.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎙 Great for Content & Creator Spaces</h3>
                <p className="text-muted-foreground">
                  Present recording studios, photo bays, podcast setups, and editing rooms to 
                  attract brands and collaborators.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🔐 Private or Public Access</h3>
                <p className="text-muted-foreground">
                  Keep tours gated for pre-qualified leads or open for public marketing — your choice.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Paperclip className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">📎 Attach Floorplans, Specs & Contracts</h3>
                <p className="text-muted-foreground">
                  Add downloadable PDFs, layout plans, size data, or leasing details directly 
                  within the experience.
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
            Use Case Inspiration for Clients
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <Briefcase className="w-16 h-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Corporate HQ or Flexible Offices</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase large or modular office layouts to enterprise clients or remote-first teams.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Store className="w-16 h-16 text-purple-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Designer Showrooms or Brand Hubs</h3>
                <p className="text-sm text-muted-foreground">
                  Present retail-inspired spaces for fashion, automotive, furniture, or tech hardware.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Mic className="w-16 h-16 text-green-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Creative Studios & Content Spaces</h3>
                <p className="text-sm text-muted-foreground">
                  Attract creators, agencies, or influencers with walkable 360° previews of your 
                  production spaces.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Users className="w-16 h-16 text-orange-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Coworking or Innovation Hubs</h3>
                <p className="text-sm text-muted-foreground">
                  Highlight meeting rooms, breakout spaces, pods, and amenities to attract 
                  memberships or partnerships.
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
                <h3 className="text-xl font-semibold mb-2">Create Your Space Listing</h3>
                <p className="text-muted-foreground">
                  Add your business name, address, features, and any contact or leasing info.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add All Rooms, Zones & Features</h3>
                <p className="text-muted-foreground">
                  Use the Xplor platform to connect all rooms — from reception to boardroom to breakout zone — 
                  in one immersive tour.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Share className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Publish and Share Anywhere</h3>
                <p className="text-muted-foreground">
                  Share your listing on your website, real estate portals, social media, or privately 
                  with vetted clients.
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
                  <th className="text-center p-4 font-semibold">PDF Brochure</th>
                  <th className="text-center p-4 font-semibold">Static Listings</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Multi-Space Virtual Walkthrough</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Attach Files & Floorplans</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">VR & Mobile Ready</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Private/Custom Access</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Designed for Studios & Offices</td>
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
            Elevate How You Present Your Space
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're leasing offices, marketing a showroom, or promoting a creative studio, Xplor helps you 
            deliver immersive, shareable walkthroughs that bring your space to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              ➕ Add Offices, Showrooms & Studios
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}