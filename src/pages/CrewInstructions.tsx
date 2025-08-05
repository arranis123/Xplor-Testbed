import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Users, 
  DollarSign, 
  CheckCircle, 
  MapPin, 
  Settings, 
  Camera, 
  FileText,
  Star,
  TrendingUp,
  Heart,
  MessageCircle,
  Info,
  Ship,
  Calendar,
  ChefHat,
  Anchor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CrewInstructions() {
  const navigate = useNavigate();

  const uploadItems = [
    { icon: Info, text: "Basic Info: Yacht name, type, builder, length, year" },
    { icon: Settings, text: "Specifications: Speed, engines, range, stabilizers, GT" },
    { icon: Star, text: "Amenities: Jacuzzi, beach club, spa, AV systems" },
    { icon: Anchor, text: "Water Toys & Equipment: Tenders, jet skis, scuba gear, etc." },
    { icon: DollarSign, text: "Charter Rates: Summer/winter rates, APA, tax info" },
    { icon: Camera, text: "Photos & Media: Matterport/360° tours, high-res images, deck plans" },
    { icon: Users, text: "Crew Highlights: Captain bio, chef specialties, sample menus" }
  ];

  const updateItems = [
    { icon: MapPin, title: "Current Location & Availability", desc: "Update cruising region regularly, mark blackout dates" },
    { icon: Settings, title: "Equipment & Toys", desc: "Add new water toys or gear, remove outdated features" },
    { icon: ChefHat, title: "Food & Service", desc: "Update seasonal menus, mention new dietary options" },
    { icon: Camera, title: "Media Refresh", desc: "Add new guest photos, replace old images after refits" },
    { icon: Calendar, title: "Charter Status", desc: "Mark yacht as 'Available,' 'Booked,' 'For Sale,' etc." }
  ];

  const eligibilityItems = [
    "Make sure the yacht is listed for charter with Xplor (central agent or brokered)",
    "Register yourself as active crew via the FairShare Crew Form",
    "Keep your role and crew status up to date", 
    "Make sure the yacht profile is complete and current",
    "Keep proof of crew contract or employment uploaded"
  ];

  const proTips = [
    { tip: "Add a virtual tour", benefit: "Increases listing views and time spent on page" },
    { tip: "Keep descriptions guest-focused", benefit: "Highlight experiences, not just specs" },
    { tip: "Feature the crew", benefit: "Clients love knowing who's onboard" },
    { tip: "Mention special itineraries", benefit: "Caribbean holidays, wellness retreats, etc." },
    { tip: "Respond to inquiries quickly", benefit: "Boosts ranking and guest confidence" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Crew Instructions: Promote Your Yacht, Get Booked, Earn Fairly
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            As a crew member, you play a critical role in helping your yacht stand out. Here's everything you need to know to upload, manage, and maintain your yacht on Xplor — and to stay eligible for FairShare commission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/yacht-brokerage')} className="text-lg px-8">
              <Upload className="mr-2 h-5 w-5" />
              Upload a Yacht
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/fairshare-crew')} className="text-lg px-8">
              <Users className="mr-2 h-5 w-5" />
              Join FairShare
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        {/* Step 1: Upload Complete Yacht Profile */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">Step 1</Badge>
            <h2 className="text-3xl font-bold">Upload Your Yacht to Xplor</h2>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Upload the following:
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {uploadItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div className="flex items-start gap-2">
                      <item.icon className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      <span className="text-sm">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Step 2: Keep Listing Updated */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">Step 2</Badge>
            <h2 className="text-3xl font-bold">Keep It Current — Always</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-lg text-muted-foreground">
              Guests want accuracy. Brokers need clarity. You must keep your listing up to date to stay discoverable and eligible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {updateItems.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Step 3: Stay FairShare Eligible */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <Badge variant="secondary" className="text-lg px-4 py-2">Step 3</Badge>
            <h2 className="text-3xl font-bold">Earn Your Fair Share of the Charter Commission</h2>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-500" />
                How to stay eligible:
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eligibilityItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
              
              <Separator className="my-6" />
              
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Reminder:
                </h4>
                <p className="text-muted-foreground">
                  When your yacht is chartered through Xplor, 50% of the net commission is split equally among all verified crew. No tiers. No tricks. Just fairness.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pro Tips */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Pro Tips for Better Visibility & More Bookings
          </h2>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Tip</th>
                      <th className="text-left p-4 font-semibold">Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proTips.map((tip, index) => (
                      <tr key={index} className="border-b last:border-b-0 hover:bg-muted/25">
                        <td className="p-4 font-medium">{tip.tip}</td>
                        <td className="p-4 text-muted-foreground">{tip.benefit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Start Promoting Your Yacht the Right Way</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create a complete profile. Keep it updated. Get booked. Get paid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/yacht-brokerage')} className="text-lg px-8">
              <Ship className="mr-2 h-5 w-5" />
              Upload a Yacht Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/fairshare-crew')} className="text-lg px-8">
              <Users className="mr-2 h-5 w-5" />
              Register for FairShare
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/about')} className="text-lg px-8">
              <MessageCircle className="mr-2 h-5 w-5" />
              Contact Support
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
