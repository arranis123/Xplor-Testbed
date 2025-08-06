import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Camera, Theater, Music, Globe, Brain, Smartphone, Check, X, AlertTriangle, Film, Mic, Palette, Settings2 } from "lucide-react";
import setsStagesHero from "@/assets/sets-stages-hero.jpg";

export default function SetsStagesAndVenues() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${setsStagesHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Step Into the World of Film, Performance, and Production — Virtually
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            From film sets and rehearsal studios to theatres and arenas, Xplor showcases every creative space 
            in immersive 360° — with connected zones, rooms, and stages all in one listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add a Set or Venue
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is the Best Platform for Sets, Stages & Venues
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎥 Multi-Space Navigation</h3>
                <p className="text-muted-foreground">
                  Tour entire sets, wings, green rooms, tech areas, VIP lounges and seating — all in one 
                  seamless listing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Theater className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎭 Perfect for Creative & Live Use</h3>
                <p className="text-muted-foreground">
                  Ideal for production design, location scouting, rehearsal prep, and event planning.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🎤 Showcase Setup & Flow</h3>
                <p className="text-muted-foreground">
                  Let decision-makers view entry points, tech setups, performer paths, and back-of-house access.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🌍 Remote Access, Global Audience</h3>
                <p className="text-muted-foreground">
                  Great for international clients, scouts, or showrunners who can't be there in person.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🧠 Smart Tags & Media Layers</h3>
                <p className="text-muted-foreground">
                  Embed lighting specs, rigging points, technical drawings, and time-coded notes directly 
                  into the experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-card/80 backdrop-blur">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">📱 Shareable, Mobile-First</h3>
                <p className="text-muted-foreground">
                  Tours can be sent to collaborators, talent, or vendors instantly — no downloads needed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Inspiration & Use Case Examples
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Film className="w-16 h-16 text-purple-500" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">🎬 TV/Film Sets</h3>
                <p className="text-sm text-muted-foreground">
                  Allow directors, DPs, and set designers to preview layouts, camera movement space, 
                  and blocking opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Mic className="w-16 h-16 text-blue-500" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">🎟️ Theatres & Concert Venues</h3>
                <p className="text-sm text-muted-foreground">
                  Help touring acts, stage managers, and production teams pre-plan sound, lighting, 
                  and audience flow.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                <Palette className="w-16 h-16 text-pink-500" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">🧵 Fashion & Art Installations</h3>
                <p className="text-sm text-muted-foreground">
                  Show producers and sponsors how the space accommodates runways, lounges, press zones, 
                  and branded experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                <Settings2 className="w-16 h-16 text-green-500" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">🛠️ Modular Studio Spaces</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase how a venue or soundstage can be reconfigured or repurposed with immersive 
                  before/after visuals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Set or Venue Listing</h3>
                <p className="text-muted-foreground">
                  Upload panoramic imagery, specs, and location information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add All Rooms, Spaces & Zones</h3>
                <p className="text-muted-foreground">
                  Include main stage, backstage, audience, tech booths, green rooms, storage areas — 
                  each with navigable links.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Go Live & Share With Stakeholders</h3>
                <p className="text-muted-foreground">
                  Send links to collaborators, investors, producers, and clients — they can walk the space 
                  in 360°, instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-lg shadow-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">PDFs/Static Media</th>
                  <th className="text-center p-4 font-semibold">Basic Venue Sites</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Multi-Space Virtual Tours</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Media-Embedded Navigation</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Remote Scouting Tool</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Shareable + Interactive</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">VR & Mobile Friendly</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Support for Events & Production</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Let Talent, Tech, and Clients Explore Before They Even Arrive
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're pitching a venue, scouting a set, or preparing for production, Xplor brings your space 
            to life for collaborators everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              ➕ Add a Set or Venue
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}