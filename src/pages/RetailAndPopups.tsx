import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Store, MapPin, Users, Globe, Smartphone, Check, X, AlertTriangle } from "lucide-react";
import retailPopupsHero from "@/assets/retail-popups-hero.jpg";

export default function RetailAndPopups() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${retailPopupsHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Showcase Your Retail Space — Inside and Out
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            From flagship stores to pop-up activations, Xplor helps brands, landlords, and retail marketers 
            bring their physical locations to life with immersive 360° experiences — with multiple zones in one listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add a Retail Space
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Xplor is the Best for Retail & Pop-Ups
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🧭 Multi-Zone Retail Tours</h3>
                <p className="text-muted-foreground">
                  Display the entrance, retail floor, back-of-house, fitting rooms, cashier area, 
                  product displays — all within one experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🛍️ Perfect for Pop-Ups & Events</h3>
                <p className="text-muted-foreground">
                  Show off temporary installations, branded activations, and seasonal venues 
                  before they open or travel.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🏬 Landlord & Mall Ready</h3>
                <p className="text-muted-foreground">
                  Highlight multiple units inside a single retail complex or mall wing, 
                  including shared spaces.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🛒 Support Sales, Leasing & Marketing</h3>
                <p className="text-muted-foreground">
                  Connect your tour to ecommerce links, rental pages, or lead capture forms.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">🌍 Attract Tenants & Buyers Globally</h3>
                <p className="text-muted-foreground">
                  Allow remote brands, franchisees, and leasing agents to explore locations from anywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">📱 Made for Sharing</h3>
                <p className="text-muted-foreground">
                  Integrate directly into your brand site, listings, marketing materials, and QR campaigns.
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
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/40"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Flagship Retail Stores</h3>
                <p className="text-sm text-muted-foreground">
                  Give shoppers or brand partners an inside look at your best-in-class experience.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/40"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Malls & Mixed-Use Retail</h3>
                <p className="text-sm text-muted-foreground">
                  Offer leasing teams or investors a view of multiple available units, kiosks, 
                  and shared amenities in one listing.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/40"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Pop-Up Shops & Brand Activations</h3>
                <p className="text-sm text-muted-foreground">
                  Document temporary installations and limited-run collaborations for PR, 
                  case studies, and future brand partners.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Franchise Models & Chains</h3>
                <p className="text-sm text-muted-foreground">
                  Standardize virtual previews of store formats for potential partners, 
                  landlords, and global investors.
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
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Retail Listing</h3>
                <p className="text-muted-foreground">
                  Upload your shop details, location, visual branding, and immersive tour content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add All Spaces</h3>
                <p className="text-muted-foreground">
                  Connect individual areas (floor sections, fitting rooms, kiosks, adjacent stores, etc.) 
                  into a single navigable experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Go Live on Xplor</h3>
                <p className="text-muted-foreground">
                  Share the experience across your website, sales deck, social media, or real estate listings.
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
                  <th className="text-center p-4 font-semibold">Standard Lease Portals</th>
                  <th className="text-center p-4 font-semibold">Broker PDFs</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Multi-space Virtual Tour</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Pop-Up & Seasonal Friendly</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Lead Collection</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Store Navigation & Info Tags</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Mobile, VR, and Web Support</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Global Platform Visibility</td>
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
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Let People Step Inside Your Retail Space?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you're showcasing a high-end store, a startup pop-up, or a shopping destination, 
            Xplor gives you the tools to present it in full immersive detail — with no app required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              ➕ Add a Retail Space
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}