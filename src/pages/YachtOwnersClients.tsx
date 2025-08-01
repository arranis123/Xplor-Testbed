import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anchor, Users, Award, DollarSign, MessageCircle, Phone, FileText } from "lucide-react";
import ContactForm from "@/components/ContactForm";
const YachtOwnersClients = () => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Anchor className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Xplor Charters
            </h1>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            A Smarter, Fairer Way to Book
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For Yacht Owners & Charter Clients Who Believe in Excellence
          </p>
        </section>

        {/* Main Value Proposition */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Xplor as Your Central Charter Broker?
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              At Xplor, we believe a great charter starts with a great crew — and we back that belief with action.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                  <span className="text-3xl font-bold text-green-800">50%</span>
                  <span className="text-3xl font-bold text-muted-foreground">Commission Share</span>
                </div>
                <p className="text-lg text-foreground max-w-3xl mx-auto">
                  When you appoint Xplor as your central charter broker, 50% of the brokerage commission we earn 
                  is distributed evenly among the onboard crew. This isn't a bonus or a tip — it's a guaranteed 
                  share of success for the people who deliver your guest experience.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Benefits for Owners */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What It Means for You as an Owner
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Higher Guest Satisfaction</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  A fairly compensated, motivated crew delivers better service, better reviews, and more repeat business.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Crew Retention & Loyalty</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When your team feels valued, they stay. That means less turnover, smoother operations, and long-term consistency.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Badge className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Marketing Edge</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yachts listed with Xplor stand out to charterers who appreciate ethical and crew-centric policies.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>No Extra Cost to You</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The commission sharing comes from Xplor's fee — not your charter income.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Benefits for Charter Clients */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What It Means for Charter Clients
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  A Happy Crew Creates a Happy Charter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You'll feel the difference — from service to atmosphere — when the crew knows they're part of the success.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-primary" />
                  Direct Booking Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Repeat clients booking directly with Xplor keep commissions in the hands of those who earned them: the crew and the platform that made it possible.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Sustainability Through Fairness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You're supporting a charter model that's transparent, equitable, and designed to elevate the whole experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What's the Difference?
            </h3>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Broker Role</th>
                      <th className="text-left p-4 font-semibold">Traditional Broker</th>
                      <th className="text-left p-4 font-semibold bg-primary/5">Xplor as Central Broker</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Crew Commission</td>
                      <td className="p-4 text-muted-foreground">0%</td>
                      <td className="p-4 bg-muted font-semibold text-muted-foreground">50% of Xplor's fee</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Owner Cost</td>
                      <td className="p-4 text-muted-foreground">Full Broker Fee</td>
                      <td className="p-4 bg-primary/5 font-semibold text-primary">No additional cost</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Crew Motivation</td>
                      <td className="p-4 text-muted-foreground">Variable</td>
                      <td className="p-4 bg-primary/5 font-semibold text-primary">Strong, consistent</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Client Impact</td>
                      <td className="p-4 text-muted-foreground">Limited</td>
                      <td className="p-4 bg-primary/5 font-semibold text-primary">Enhanced experience</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why It Matters */}
        <section className="text-center space-y-6">
          <h3 className="text-3xl font-bold text-foreground">
            Why It Matters
          </h3>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              Most charter commissions disappear into a network of intermediaries.
            </p>
            <p className="text-lg font-semibold text-foreground">
              At Xplor, we put it back where it belongs — with the crew that makes it all happen.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Appoint Xplor as Central Broker Today
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Transparent commission model</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Global charter network</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Centralized marketing and direct booking support</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Fully crew-aligned charter strategy</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsContactFormOpen(true)}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us
            </Button>
            
            <Button size="lg" variant="outline">
              <FileText className="w-5 h-5 mr-2" />
              Request Central Agency Agreement
            </Button>
          </div>
        </section>
      </main>

      <ContactForm 
        open={isContactFormOpen} 
        onOpenChange={setIsContactFormOpen} 
      />
    </div>;
};
export default YachtOwnersClients;