import React from 'react';
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Globe, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Building, 
  Home, 
  Key,
  Smartphone,
  FileText,
  DollarSign,
  Clock,
  Star,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import realEstateHero from '@/assets/real-estate-hero.jpg';

export default function RealEstate() {
  return (
    <>
      <Helmet>
        <title>Real Estate Virtual Tours - Sell Properties Faster | Xplor</title>
        <meta name="description" content="Transform property marketing with immersive virtual tours. List your real estate on Xplor for better exposure, qualified leads, and faster sales." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 to-primary/5 py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={realEstateHero}
              alt="Luxury real estate properties"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-blue-800/60 to-gray-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Real Estate That <span className="text-green-200">Sells Itself</span> — Because It's Already Been Seen
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Xplor lets you showcase properties like never before — with immersive 3D tours that engage real buyers and renters. No more time-wasters. No more static listings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/upload-space" className="flex items-center gap-2">
                    List a Property <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  See Real Estate in Action
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Xplor Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Professionals Are Moving to Xplor
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Immersive Virtual Tours</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Let buyers explore every corner from their phone or laptop
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Global Reach</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Xplor is built for international exposure — not just local listings
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Qualified Leads Only</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Buyers and renters who view a tour are far more serious
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Professional Upload Tools</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    List with rich media, documents, maps, and more
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Perfect for Sales or Rentals</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Use Xplor for open houses, furnished apartments, or luxury estates
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle>Built for Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    CTA buttons in tours: Inquire, Book Viewing, or Apply Now
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Virtual Tours Are Not the Future. They're the Standard.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Listings with virtual tours generate 49% more qualified leads and close 31% faster. So why are you still using flat images?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Star className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="text-foreground italic mb-2">
                          "Every time we list with a 3D tour on Xplor, we get better inquiries and fewer no-shows."
                        </p>
                        <p className="text-sm text-muted-foreground">— Agent in Dubai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Star className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="text-foreground italic mb-2">
                          "Renting our furnished apartments remotely was only possible through Xplor."
                        </p>
                        <p className="text-sm text-muted-foreground">— Property Manager, Lisbon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Get Started in Minutes
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Create a Listing</h3>
                <p className="text-muted-foreground">
                  Add property details, price, media, and optional virtual tour
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Publish & Promote</h3>
                <p className="text-muted-foreground">
                  Your listing appears on Xplor with global exposure
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Get Leads & Close</h3>
                <p className="text-muted-foreground">
                  Receive qualified inquiries directly from the tour page
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link to="/upload-space">List Your Property</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Xplor vs Traditional Listings
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-semibold">Feature</th>
                          <th className="text-center p-4 font-semibold">Xplor</th>
                          <th className="text-center p-4 font-semibold">Traditional Portals</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-4">Virtual Tours</td>
                          <td className="p-4 text-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            <span className="sr-only">Fully integrated</span>
                          </td>
                          <td className="p-4 text-center text-red-500">✗</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Interactive Maps</td>
                          <td className="p-4 text-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                          </td>
                          <td className="p-4 text-center text-red-500">✗</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Document Uploads</td>
                          <td className="p-4 text-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            <div className="text-xs text-muted-foreground">Floor plans, brochures, PDFs</div>
                          </td>
                          <td className="p-4 text-center text-red-500">✗</td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-4">Mobile-Friendly Tours</td>
                          <td className="p-4 text-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            <div className="text-xs text-muted-foreground">Optimized</div>
                          </td>
                          <td className="p-4 text-center text-yellow-500">〜</td>
                        </tr>
                        <tr>
                          <td className="p-4">Monetization Tools</td>
                          <td className="p-4 text-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            <div className="text-xs text-muted-foreground">Coming soon</div>
                          </td>
                          <td className="p-4 text-center text-red-500">✗</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Property Types We Support
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
              <div className="text-center">
                <Home className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Villas & Houses</p>
              </div>
              <div className="text-center">
                <Building className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Apartments & Penthouses</p>
              </div>
              <div className="text-center">
                <Key className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Furnished Rentals</p>
              </div>
              <div className="text-center">
                <Building className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Commercial Spaces</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Co-living Spaces</p>
              </div>
              <div className="text-center">
                <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Vacation Rentals</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-sm font-medium">Developments</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Make Every Viewing Count — Before They Even Arrive
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                List your property with a virtual tour on Xplor and attract real buyers and renters instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/upload-space" className="flex items-center gap-2">
                    List Your Property Now <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Explore a Sample Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Note */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                Xplor supports all formats of virtual tours, including Matterport, Kuula, iStaging, and custom 360° uploads. 
                Need help capturing your space? Get matched with a photographer.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}