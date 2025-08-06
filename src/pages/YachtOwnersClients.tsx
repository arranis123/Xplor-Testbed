import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anchor, Users, Award, DollarSign, MessageCircle, Phone, FileText, Ship, Search, Video, MapPin, CheckCircle, Globe, BarChart, Link2, Star, Camera, Shield, Heart, TrendingUp, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { YachtUploadDialog } from "@/components/YachtUploadDialog";
import { useNavigate } from 'react-router-dom';
import yachtOwnersClientsHero from "@/assets/yacht-owners-clients-hero.jpg";
const YachtOwnersClients = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isYachtUploadOpen, setIsYachtUploadOpen] = useState(false);
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground">
            The Smartest Way to List and Charter a Yacht.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From immersive virtual tours to a first-in-class crew rewards model, <span style={{
            fontFamily: 'Typografix, sans-serif'
          }}>xplor</span> offers 
            a new standard in exposure, booking, and performance — for both owners and guests.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsYachtUploadOpen(true)}>
              <Ship className="w-5 h-5 mr-2" />
              List Your Yacht
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/yacht-brokerage')}>
              <Search className="w-5 h-5 mr-2" />
              Charter With Xplor
            </Button>
          </div>

          {/* Hero Visual */}
          <div className="mt-12 relative rounded-2xl overflow-hidden h-64 md:h-96">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url(${yachtOwnersClientsHero})`
          }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <Video className="w-16 h-16 text-white mx-auto" />
                <p className="text-white font-semibold text-lg">
                  Explore. Book. Reward.
                </p>
                <p className="text-white/90 text-sm max-w-md mx-auto">
                  3D walkthrough of yacht interior • Guests boarding and being welcomed
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why List with Xplor */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              For Yacht Owners: Smarter Listings, Better Exposure.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Ship className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Immersive Presentation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Virtual tours, interactive layouts, photos, specs, crew bios — all in one stunning profile
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Global Reach</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your yacht becomes visible to HNW charter clients worldwide
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Owner Dashboard</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track interest, inquiries, and listing performance in real time
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Link2 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Booking API Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect your charter calendar or agency seamlessly
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Professional Standardization</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <span style={{
                  fontFamily: 'Typografix, sans-serif'
                }}>Xplor</span> listings are designed for clarity, credibility, and cross-platform promotion
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsYachtUploadOpen(true)}>
              List Your Yacht Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Why Charter with Xplor */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              For Charter Clients: Know Before You Go — With Confidence.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Fully Transparent Listings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore the full yacht layout, amenities, and toys before you commit
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Virtual Tours</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Walk through every deck, room, and detail in 3D or 360°
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Crew Details & Experiences</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Know who's onboard and what to expect — from menus to guest services
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Live Location + Availability</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  See where the yacht is cruising and when it's available (when enabled)
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Verified Listings Only</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every yacht is checked, professionally represented, and fairly priced
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => navigate('/yacht-brokerage')}>
              View Available Charters
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* FairShare Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              <span className="font-sans">FairShare</span>: Why Crew Incentives Create a Better Charter Experience
            </h2>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <p className="text-lg text-foreground max-w-4xl mx-auto leading-relaxed">
                  <span style={{
                  fontFamily: 'Typografix, sans-serif'
                }}>Xplor</span> is the first platform to offer a commission-sharing model where 50% of our net charter commission 
                  is equally split among the crew — if your yacht is chartered through us.
                </p>
                <p className="text-lg font-semibold text-foreground max-w-3xl mx-auto">
                  This isn't an added cost to you — it's part of our brokerage fee, but it delivers major upside to you and your guests.
                </p>
              </div>

              {/* FairShare Diagram */}
              <div className="bg-white rounded-lg p-6 my-8">
                <div className="flex items-center justify-center space-x-8 text-center">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span style={{
                      fontFamily: 'Typografix, sans-serif'
                    }} className="text-blue-800 font-bold">xplor</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Earns Commission</p>
                  </div>
                  <ArrowRight className="text-primary" />
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-green-800 font-bold">50%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Goes to Crew</p>
                  </div>
                  <ArrowRight className="text-primary" />
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Happy Guests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FairShare Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Anchor className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Happier, More Motivated Crew</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">= Exceptional service</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Better Retention</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">= Consistency across seasons</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Word-of-Mouth Promotion</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">= Crew recommend the yacht to other clients</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Guest Satisfaction</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">= Extra care, more enthusiasm, better energy onboard</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>No Cost to Owner</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">= Comes from <span style={{
                  fontFamily: 'Typografix, sans-serif'
                }}>Xplor</span>'s brokerage share, not APA or owner share</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" onClick={() => navigate('/fairshare')}>
              Learn More About <span className="font-sans">FairShare</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              The Result? Better Charters. Better Reviews. Repeat Clients.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <blockquote className="text-lg italic text-blue-900">
                    "Our guests mentioned how amazing the crew were — and we believe <span style={{
                    fontFamily: 'Typografix, sans-serif'
                  }}>FairShare</span> had something to do with that."
                  </blockquote>
                  <p className="text-blue-700 font-semibold">
                    – Owner of 43m M/Y ***
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <blockquote className="text-lg italic text-green-900">
                    "The entire process from tour to booking felt effortless. We knew exactly what we were getting."
                  </blockquote>
                  <p className="text-green-700 font-semibold">
                    – Charter Client, Summer 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Simple, Seamless Onboarding
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-foreground">Submit Your Yacht Details</h3>
                <p className="text-sm text-muted-foreground">Specs, photos, tour links, charter rates</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-foreground">Connect With Our Team</h3>
                <p className="text-sm text-muted-foreground">We'll optimize the profile and publish</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-foreground">Set Booking Preferences</h3>
                <p className="text-sm text-muted-foreground">Choose central agent, co-brokered, or external links</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <h3 className="font-semibold text-foreground">Start Receiving Inquiries</h3>
                <p className="text-sm text-muted-foreground">Fully trackable through your dashboard</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsYachtUploadOpen(true)}>
              <Ship className="w-5 h-5 mr-2" />
              List My Yacht
            </Button>
            
          </div>
        </section>

        {/* Final CTA */}
        <section className="space-y-8 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Join the Only Platform That Works for Everyone Onboard.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              List with <span style={{
              fontFamily: 'Typografix, sans-serif'
            }}>Xplor</span> and unlock the benefits of immersive exposure, smarter bookings, 
              and an incentivized crew — all without added cost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsYachtUploadOpen(true)}>
              <Ship className="w-5 h-5 mr-2" />
              List a Yacht
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/yacht-brokerage')}>
              <Search className="w-5 h-5 mr-2" />
              Charter a Yacht
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/fairshare')}>
              <Heart className="w-5 h-5 mr-2" />
              Learn About <span className="font-sans">FairShare</span>
            </Button>
            <Button size="lg" variant="outline" onClick={() => setIsContactFormOpen(true)}>
              <Phone className="w-5 h-5 mr-2" />
              Contact <span style={{
              fontFamily: 'Typografix, sans-serif'
            }}>xplor</span>
            </Button>
          </div>
        </section>
      </main>

      <ContactForm open={isContactFormOpen} onOpenChange={setIsContactFormOpen} />
      <YachtUploadDialog open={isYachtUploadOpen} onOpenChange={setIsYachtUploadOpen} />
    </div>;
};
export default YachtOwnersClients;