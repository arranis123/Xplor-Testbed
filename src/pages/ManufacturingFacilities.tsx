import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Factory, Cog, ClipboardCheck, GraduationCap, Globe, FileText, Upload, Link, Key, Check, X, AlertTriangle, Car, Beaker, Cpu, Wrench } from "lucide-react";
import manufacturingHero from "@/assets/manufacturing-hero.jpg";

export default function ManufacturingFacilities() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.8), rgba(30, 41, 59, 0.8)), url(${manufacturingHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Showcase Your Facility. Demonstrate Your Standards. Impress the World.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Xplor enables you to capture your entire production environment — from R&D labs to assembly lines 
            and loading bays — in one secure, immersive 360° listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add Manufacturing Facility
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is Built for Manufacturing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Factory className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🏭 Multi-Space Facility Walkthroughs</h3>
                <p className="text-muted-foreground">
                  Include all key zones: production lines, assembly, QA, warehousing, R&D, offices, 
                  loading docks, cleanrooms — all in one navigable experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Cog className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">⚙️ Great for B2B Clients & Investors</h3>
                <p className="text-muted-foreground">
                  Show your capabilities, quality systems, and operational scale remotely to 
                  decision-makers and potential clients.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">📋 Compliance & Certification Support</h3>
                <p className="text-muted-foreground">
                  Document safety zones, PPE signage, fire exits, and ISO/OSHA readiness visually.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🧑‍🏫 Training & Onboarding</h3>
                <p className="text-muted-foreground">
                  Use immersive tours to onboard factory workers, technicians, engineers, 
                  and visitors before they step onsite.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🌐 Remote Global Access</h3>
                <p className="text-muted-foreground">
                  Share a secure link with suppliers, auditors, or partners anywhere in the world.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/90 dark:bg-card/90 backdrop-blur border-gray-200 dark:border-gray-700">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">🗂 Attach SOPs & Documentation</h3>
                <p className="text-muted-foreground">
                  Link MSDS, user manuals, safety procedures, and process videos to specific areas of the tour.
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
              <div className="h-48 bg-gradient-to-br from-gray-400/20 to-slate-500/20 flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Automotive Parts Manufacturer</h3>
                <p className="text-sm text-muted-foreground">
                  Virtual walkthrough of CNC lines, robotics, QA room, storage, and shipping.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center">
                <Beaker className="w-16 h-16 text-green-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Food or Pharma Processing Plant</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase hygiene zones, batching rooms, cleanrooms, packaging lines, and HACCP compliance.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center">
                <Cpu className="w-16 h-16 text-blue-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Electronics Assembly Line</h3>
                <p className="text-sm text-muted-foreground">
                  Demonstrate ESD controls, precision tools, process traceability, and quality assurance points.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-700">
              <div className="h-48 bg-gradient-to-br from-orange-400/20 to-red-500/20 flex items-center justify-center">
                <Wrench className="w-16 h-16 text-orange-600" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Heavy Industry & Fabrication Plants</h3>
                <p className="text-sm text-muted-foreground">
                  Highlight material flow, heavy equipment areas, welding bays, and operator safety systems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-100 to-slate-100 dark:from-gray-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Facility Profile</h3>
                <p className="text-muted-foreground">
                  Upload basic info, factory overview, company branding, and safety protocols.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Link className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add and Connect All Zones</h3>
                <p className="text-muted-foreground">
                  Showcase all production, storage, and office spaces using connected 360° capture — 
                  viewable in sequence or freely navigated.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Publish & Share</h3>
                <p className="text-muted-foreground">
                  Distribute to clients, agencies, inspectors, internal teams, or job candidates via 
                  private or public links.
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
            <table className="w-full bg-white/90 dark:bg-card/90 backdrop-blur rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">Static Brochures</th>
                  <th className="text-center p-4 font-semibold">Video Walkthrough</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">Multi-Space Navigation</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">Interactive Info Layers</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">SOPs & Media Attachments</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">Mobile + VR Ready</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-4">Remote Team Training</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">ISO/OSHA Integration</td>
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
      <section className="py-20 px-4 bg-gradient-to-b from-slate-100 to-gray-100 dark:from-slate-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Bring Your Facility Online — Without Sacrificing Control or Clarity
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're showcasing capabilities to clients, meeting compliance requirements, or onboarding 
            your next shift, Xplor helps you present your facility with the precision and flexibility the 
            industrial world demands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20">
              ➕ Add Manufacturing Facility
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}