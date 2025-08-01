import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const YachtCrewOffer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/10 mb-8 absolute top-6 left-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-5xl font-bold mb-4">Crew-First Chartering with Xplor</h1>
          <p className="text-xl text-white/90">Earn More. Get Recognized. Be Part of a Better Model.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* What Is Xplor's Crew Commission Model */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">What Is Xplor's Crew Commission Model?</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed">
              <p className="mb-6">
                At Xplor, we believe you — the crew — are the heart of the charter experience. That's why we've built a model where you don't just work the charter — you share in its success.
              </p>
              <p>
                Whenever a charter is booked through Xplor, we give <strong>50% of our commission directly back to the crew</strong>. That means more income, more recognition, and more motivation — without relying on tips alone.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Charter Booked</h3>
                  <p className="text-sm text-muted-foreground">Charter is booked through Xplor (either direct or through our central broker role)</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Commission Earned</h3>
                  <p className="text-sm text-muted-foreground">Xplor receives commission from the charter fee</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">50% Split</h3>
                  <p className="text-sm text-muted-foreground">50% of that commission is split evenly among the active crew onboard</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">You Get Paid</h3>
                  <p className="text-sm text-muted-foreground">You get paid — fairly, transparently, and consistently</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What You Get */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">What You Get</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Guaranteed Bonus for Every Charter Booked Through Xplor</h3>
                      <p className="text-muted-foreground">No more hoping for tips or depending on guest generosity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Performance-Based Income</h3>
                      <p className="text-muted-foreground">The better your charter, the more likely repeat clients book through Xplor — which means more commission back to you.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Be Part of a Global Crew Network</h3>
                      <p className="text-muted-foreground">Certified Xplor yachts and crew get prioritized visibility, direct bookings, and guest loyalty.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Transparent Payouts</h3>
                      <p className="text-muted-foreground">You'll know exactly how much you're receiving and when — no guesswork.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Who Is Eligible */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Who Is Eligible?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Active Crew Members</h3>
                  <p className="text-muted-foreground">Any active, full-time crew member working onboard during a charter booked through Xplor</p>
                </div>
                <div>
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">All Charter Types</h3>
                  <p className="text-muted-foreground">Applies to both Central Agent and Third-Party Broker charters</p>
                </div>
                <div>
                  <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Equal Distribution</h3>
                  <p className="text-muted-foreground">Payout is made evenly among the team, regardless of role</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* How You Can Help */}
        <section className="mb-16">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">How You Can Help</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-6">Want to benefit from this model?</p>
              <p className="mb-8">Encourage your captain or management team to appoint Xplor as the central broker.</p>
              <p className="text-muted-foreground">We'll provide a ready-to-send message or help with the conversation — just ask.</p>
            </CardContent>
          </Card>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Why It Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">&nbsp;</th>
                      <th className="text-left p-4 font-semibold">Traditional Charter Model</th>
                      <th className="text-left p-4 font-semibold bg-primary/5">Xplor Crew-First Model</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Commission Distribution</td>
                      <td className="p-4 text-muted-foreground">Commission goes to brokers</td>
                      <td className="p-4 bg-primary/5 font-semibold">Commission shared with you</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Crew Income</td>
                      <td className="p-4 text-muted-foreground">Crew depends on tips only</td>
                      <td className="p-4 bg-primary/5 font-semibold">You get guaranteed bonuses</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Transparency</td>
                      <td className="p-4 text-muted-foreground">No transparency</td>
                      <td className="p-4 bg-primary/5 font-semibold">Clear payouts, per charter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Crew Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="text-lg mb-4 italic">"We finally feel like part of the business, not just part of the boat."</p>
                  <p className="text-sm text-muted-foreground">— Chief Stewardess, 55m Charter Yacht</p>
                </div>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <p className="text-lg mb-4 italic">"Xplor's model actually rewards us for doing great work. It makes a real difference."</p>
                  <p className="text-sm text-muted-foreground">— Engineer, 45m Feadship</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-primary text-white">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4 text-white">Join the Crew-First Movement</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                  <span>Talk to your Captain or Manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                  <span>Ask to appoint Xplor as the Central Charter Broker</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                  <span>Let us handle the rest</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="secondary" size="lg">
                  Schedule a Crew Briefing
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Contact Xplor Crew Support
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                  Download Info Pack for Yacht Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default YachtCrewOffer;