import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Anchor, Search, Wrench, Globe, Package, Monitor, Upload, Link, Share, Check, X, AlertTriangle, Ship, Navigation, Settings } from "lucide-react";
import merchantShippingHero from "@/assets/merchant-shipping-hero.jpg";

export default function MerchantShipping() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url(${merchantShippingHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Bring Your Fleet to Life with Immersive, Multi-Space Virtual Tours
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Xplor gives shipping operators, charterers, and marine professionals the ability to digitally showcase 
            every space onboard — from bridge to engine room — in one seamless, interactive tour.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-700 hover:bg-blue-800 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add a Ship
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is Built for Merchant Shipping
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Anchor className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">⚓ Multi-Space Navigation</h3>
                <p className="text-muted-foreground">
                  Showcase all major zones onboard — from wheelhouse to cargo holds, machinery spaces, 
                  and accommodation — in one interactive experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🔎 Transparency for Inspection & Sales</h3>
                <p className="text-muted-foreground">
                  Support pre-charter checks, insurance evaluations, and fleet sales with visual transparency.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Wrench className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🛠 Ideal for Training & Handover</h3>
                <p className="text-muted-foreground">
                  Let new crew familiarize themselves remotely with layout, procedures, and equipment locations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🌍 Remote Access for Global Clients</h3>
                <p className="text-muted-foreground">
                  Perfect for buyers, inspectors, and stakeholders unable to travel to port.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Package className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">📦 Boost Charter & Logistics Confidence</h3>
                <p className="text-muted-foreground">
                  Show vessel readiness, cargo capacity, onboard systems, and loading gear.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-blue-100 dark:border-blue-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-blue-700 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🖥 Link Specs, Documents & Manuals</h3>
                <p className="text-muted-foreground">
                  Attach safety certs, machinery logs, GA plans, and videos within the virtual tour.
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
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-slate-500/20 flex items-center justify-center">
                <Ship className="w-16 h-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Vessel Sale or Charter Marketing</h3>
                <p className="text-sm text-muted-foreground">
                  Let prospective buyers or charterers walk through every deck before a decision.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <Search className="w-16 h-16 text-emerald-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Marine Insurance & Surveys</h3>
                <p className="text-sm text-muted-foreground">
                  Offer pre-inspection access to insurers, surveyors, or flag/state agencies.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center">
                <Navigation className="w-16 h-16 text-purple-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Fleet Promotion for Operators</h3>
                <p className="text-sm text-muted-foreground">
                  Digitally display multiple vessels with consistent, professional 360° documentation.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                <Settings className="w-16 h-16 text-orange-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Training for Crews & Cadets</h3>
                <p className="text-sm text-muted-foreground">
                  Let maritime academies and shipping lines use immersive learning environments for 
                  familiarization and drills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-slate-50 dark:from-blue-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Vessel Listing</h3>
                <p className="text-muted-foreground">
                  Upload photos, 360° scans, specs, classification details, and ship particulars.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add and Link All Spaces</h3>
                <p className="text-muted-foreground">
                  Include bridge, crew quarters, galley, engine room, ECR, cargo deck, stern thruster rooms, etc.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Share className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Go Live and Share</h3>
                <p className="text-muted-foreground">
                  Share with brokers, technical managers, insurers, port agents, or buyers via private or public links.
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
            <table className="w-full bg-white/80 dark:bg-card/80 backdrop-blur rounded-lg shadow-sm border border-blue-100 dark:border-blue-900">
              <thead>
                <tr className="border-b border-blue-100 dark:border-blue-900">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">PDF Brochure</th>
                  <th className="text-center p-4 font-semibold">Broker Listing</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-50 dark:border-blue-950">
                  <td className="p-4">Multi-Zone Navigation</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-blue-50 dark:border-blue-950">
                  <td className="p-4">Immersive 360° Experience</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-blue-50 dark:border-blue-950">
                  <td className="p-4">Training & Familiarization Use</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-blue-50 dark:border-blue-950">
                  <td className="p-4">Link Manuals & Specs</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-blue-50 dark:border-blue-950">
                  <td className="p-4">Supports All Ship Types</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">VR & Mobile Ready</td>
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
      <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Make Your Ship Accessible Anytime, Anywhere
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're selling, chartering, inspecting, or training, Xplor gives you the tools to showcase 
            your ship like never before — with full control, global access, and technical clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-700 hover:bg-blue-800 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-blue-950/20">
              ➕ Add a Ship
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}