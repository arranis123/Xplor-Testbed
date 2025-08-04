import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const YachtCrewOffer = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative py-24 bg-background">
        <div 
          className="absolute inset-0 bg-no-repeat bg-center"
          style={{ 
            backgroundImage: 'url(/lovable-uploads/45cc1ea1-be70-466b-a97c-c44b69684dfa.png)',
            backgroundSize: '80%'
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-slate-700 hover:bg-white/10 mb-8 absolute top-6 left-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* What is FairShare */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">What is FairShare?</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed text-slate-600">
              <p className="mb-6">
                FairShare by <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> is a crew-focused commission-sharing program that ensures you don't just work the charter — you share in the success.
              </p>
              <p className="mb-6">
                Whether <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> is appointed as the central charter broker or acts as a third-party introducing broker, we guarantee that <strong>50% of the net commission we receive goes directly to you and your crew</strong> — split evenly and transparently.
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="font-semibold mb-2 text-slate-700">It's not a tip.</p>
                <p className="font-semibold mb-2 text-slate-700">It's not your salary.</p>
                <p className="font-semibold text-slate-700">It's a real, contractual bonus for the real work you do.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* You Already Give 100% */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">You Already Give 100%. FairShare Gives Back.</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed text-center text-slate-600">
              <p>
                As a professional yacht crew member, your time, talent, and service directly shape every guest's experience. While salary provides stability and gratuities reward generosity, <strong>FairShare provides fairness</strong>.
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
                  <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-700">Charter Booked</h3>
                  <p className="text-sm text-slate-600">A charter is booked through <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> — either as the central broker or as an introducing broker</p>
                </div>
                <div className="text-center">
                  <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-700">Commission Earned</h3>
                  <p className="text-sm text-slate-600"><span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> earns a commission on the charter (typically 10–20% of the charter fee)</p>
                </div>
                <div className="text-center">
                  <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-700">50% Split</h3>
                  <p className="text-sm text-slate-600">50% of that net commission is split equally among the active crew onboard during the charter</p>
                </div>
                <div className="text-center">
                  <div className="bg-slate-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-700">You Get Paid</h3>
                  <p className="text-sm text-slate-600">You receive your share directly, with transparent reporting and zero guesswork</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* FairShare vs Traditional */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">FairShare vs Traditional Chartering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold text-slate-700 bg-white">&nbsp;</th>
                      <th className="text-left p-4 font-semibold text-slate-700 bg-white">Traditional Brokers</th>
                      <th className="text-left p-4 font-semibold text-slate-700 bg-white">FairShare by <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700 bg-white">Commission Sharing</td>
                      <td className="p-4 text-slate-600 bg-white">None</td>
                      <td className="p-4 bg-white font-semibold text-slate-700">50% of net commission to crew</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700 bg-white">Transparency</td>
                      <td className="p-4 text-slate-600 bg-white">Low</td>
                      <td className="p-4 bg-white font-semibold text-slate-700">Full visibility of payouts</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700 bg-white">Income Sources</td>
                      <td className="p-4 text-slate-600 bg-white">Salary + Tips</td>
                      <td className="p-4 bg-white font-semibold text-slate-700">Salary + Tips + Commission</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium text-slate-700 bg-white">Recognition for Crew</td>
                      <td className="p-4 text-slate-600 bg-white">Indirect</td>
                      <td className="p-4 bg-white font-semibold text-slate-700">Direct, structured, guaranteed</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why It Matters */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Why It Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 w-8 h-8 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-lg font-semibold text-white">★</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-slate-700">Motivated Crews Deliver Better Charters</h3>
                      <p className="text-slate-600">When you know you're rewarded fairly, everyone wins — especially the guests.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 w-8 h-8 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-lg font-semibold text-white">↗</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-slate-700">More Than Tips</h3>
                      <p className="text-slate-600">Tipping is unpredictable. FairShare is not. It's a guaranteed reward from the charter itself.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 w-8 h-8 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-lg font-semibold text-white">↻</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-slate-700">Repeat Guests, Repeat Bonuses</h3>
                      <p className="text-slate-600">Guests who book again through <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> bring commission back to your team — without middlemen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-slate-600 w-8 h-8 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                      <span className="text-lg font-semibold text-white">■</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-slate-700">No Extra Cost to the Owner</h3>
                      <p className="text-slate-600">FairShare comes from <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span>'s commission, not the yacht's revenue. It's ethical, sustainable, and owner-approved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Who Gets Paid */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Who Gets Paid?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-4 text-slate-600">
                If you're part of the active crew on board during the charter — regardless of your rank or department — you're part of FairShare. The commission pool is split evenly, from captain to stew to deckhand.
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <p className="font-semibold text-slate-700">No favoritism. No gatekeeping. Just fairness.</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* What You Can Do */}
        <section className="mb-16">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4">What You Can Do</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-6 text-slate-600">Want to earn more for the work you already do?</p>
              <p className="mb-8 text-slate-600">Encourage your captain, yacht manager, or owner to appoint <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> as the Central Charter Broker.</p>
              <p className="text-slate-600">We'll handle everything — including contracts, marketing, and commission processing — while ensuring your crew gets rewarded.</p>
            </CardContent>
          </Card>
        </section>

        {/* Need Help Starting the Conversation */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-8">Need Help Starting the Conversation?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-8 text-slate-600">We've prepared a downloadable message you can send to your captain or management company to help them understand the benefits of working with <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> and enrolling the yacht in the FairShare program.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="default" size="lg">
                  Download Captain Letter Template
                </Button>
                <Button variant="outline" size="lg">
                  Contact Crew Support
                </Button>
                <Button variant="outline" size="lg">
                  See Example Commission Payout Sheet
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Join the Movement */}
        <section>
          <Card className="bg-primary text-slate-600">
            <CardHeader>
              <CardTitle className="text-3xl text-center mb-4 text-slate-600">Join the Movement</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg mb-8 text-slate-600">Thousands of crew worldwide are stepping into a new charter economy — one that recognizes the team that delivers.</p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-slate-600 flex-shrink-0" />
                  <span className="text-slate-600">Talk to your Captain or Manager</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-slate-600 flex-shrink-0" />
                  <span className="text-slate-600">Ask to appoint <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span> as the Central Charter Broker</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-slate-600 flex-shrink-0" />
                  <span className="text-slate-600">Let us handle the rest</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button variant="secondary" size="lg" className="text-slate-600">
                  Talk to a FairShare Advisor
                </Button>
              </div>
              <p className="text-slate-600 font-semibold">Fair. Transparent. Guaranteed. Only with <span style={{ fontFamily: 'Typografix, sans-serif' }}>xplor</span>.</p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default YachtCrewOffer;