import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Anchor, Ship, Package, Wrench, Globe, Paperclip, MapPin, Link, Share, Check, X, AlertTriangle, Building, Construction, Waves, Dock } from "lucide-react";
import maritimeInfrastructureHero from "@/assets/maritime-infrastructure-hero.jpg";

export default function MaritimeInfrastructure() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url(${maritimeInfrastructureHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Showcase Your Port, Yard, or Terminal — In Full Operational Detail
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            With Xplor, every quay, crane, dry dock, warehouse, and control room becomes part of a single, 
            immersive multi-space experience — accessible from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-800 hover:bg-blue-900 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add Maritime Infrastructure
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-sky-50 dark:from-slate-900 dark:to-sky-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is Ideal for Maritime Infrastructure
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Anchor className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">⚓ Multi-Zone Facility Navigation</h3>
                <p className="text-muted-foreground">
                  Showcase piers, berths, equipment zones, control centers, storage areas, and admin buildings 
                  in one continuous digital tour.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Ship className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🚢 Designed for Operational Transparency</h3>
                <p className="text-muted-foreground">
                  Great for audits, investor reviews, partner walkthroughs, or stakeholder presentations — 
                  without physical site visits.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">📦 Supports Complex Infrastructure</h3>
                <p className="text-muted-foreground">
                  Link thousands of square meters, multiple decks, or segmented workflows into one logical, 
                  user-friendly interface.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🔧 Perfect for Engineering & Planning</h3>
                <p className="text-muted-foreground">
                  Use for construction overviews, upgrade planning, and civil/marine infrastructure tenders.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🌐 Accessible from Anywhere</h3>
                <p className="text-muted-foreground">
                  Let contractors, regulators, and collaborators explore remotely — in full spatial and 
                  operational context.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-sky-100 dark:border-sky-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Paperclip className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">📎 Attach Docs, Maps, Drawings & Specs</h3>
                <p className="text-muted-foreground">
                  Add CAD plans, layout maps, maintenance manuals, and compliance certificates directly 
                  into relevant tour zones.
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
            Use Case Inspiration
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-sky-600/20 flex items-center justify-center">
                <Building className="w-16 h-16 text-blue-700" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Port Authority Operations</h3>
                <p className="text-sm text-muted-foreground">
                  Offer virtual port tours to stakeholders, new employees, regulators, and visiting dignitaries.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-slate-500/20 to-gray-600/20 flex items-center justify-center">
                <Construction className="w-16 h-16 text-slate-700" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Shipyard & Dry Dock Facilities</h3>
                <p className="text-sm text-muted-foreground">
                  Let clients preview build, retrofit, and maintenance areas in advance.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-cyan-500/20 to-teal-600/20 flex items-center justify-center">
                <Waves className="w-16 h-16 text-cyan-700" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Coastal & Engineering Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Document sea walls, breakwaters, bridge access, and ferry terminals in virtual detail.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center">
                <Dock className="w-16 h-16 text-emerald-700" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Marina Management & Expansion Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Help investors, architects, and contractors visualize land + sea assets in one view.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-sky-50 to-slate-50 dark:from-sky-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Listing</h3>
                <p className="text-muted-foreground">
                  Upload location info, zone breakdown, specs, and satellite map if applicable.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add & Link All Spaces</h3>
                <p className="text-muted-foreground">
                  Connect docks, buildings, yards, and marine structures into a coherent, navigable walkthrough.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Share className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Go Live & Share Securely</h3>
                <p className="text-muted-foreground">
                  Share with clients, city planners, engineers, naval architects, or development partners — instantly.
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
            Platform Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white/90 dark:bg-card/90 backdrop-blur rounded-lg shadow-sm border border-sky-100 dark:border-sky-900">
              <thead>
                <tr className="border-b border-sky-100 dark:border-sky-900">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">Google Maps</th>
                  <th className="text-center p-4 font-semibold">PDF Site Reports</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-sky-50 dark:border-sky-950">
                  <td className="p-4">Multi-Space Navigation</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-sky-50 dark:border-sky-950">
                  <td className="p-4">Indoor + Outdoor Zones</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-sky-50 dark:border-sky-950">
                  <td className="p-4">Document & Media Embeds</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-sky-50 dark:border-sky-950">
                  <td className="p-4">VR/AR Readiness</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-sky-50 dark:border-sky-950">
                  <td className="p-4">Designed for Infrastructure</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Live Tour Updates</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-sky-50 dark:from-slate-900 dark:to-sky-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Digitize Your Maritime Infrastructure for the World to See — or Just the Stakeholders Who Need To
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From naval bases to global ports, dry docks to ferry terminals, Xplor lets you present your infrastructure 
            clearly, interactively, and globally — all from one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-800 hover:bg-blue-900 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/20">
              ➕ Add Maritime Infrastructure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}