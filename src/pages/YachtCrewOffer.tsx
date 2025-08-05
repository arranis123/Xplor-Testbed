import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  ArrowLeft, 
  Users, 
  DollarSign, 
  Ship, 
  CheckCircle, 
  Star,
  ChevronDown,
  PieChart,
  Handshake,
  Award,
  Shield,
  Globe,
  FileText
} from "lucide-react";

const YachtCrewOffer = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleFaqToggle = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Commission Payouts",
      description: "Earn a real share of the deal you helped secure"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Equal Split",
      description: "All verified crew split the 50% fairly — no hierarchy"
    },
    {
      icon: <Ship className="h-6 w-6" />,
      title: "Easy Eligibility",
      description: "Just be crew on an Xplor-listed charter yacht"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Transparent System",
      description: "You'll see when you're eligible and what you're owed"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Rollout",
      description: "Starting in yachting, expanding into other sectors soon"
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Yacht is listed for charter with Xplor",
      description: "You upload or link your yacht profile"
    },
    {
      number: "2", 
      title: "Xplor secures a booking",
      description: "As central agent or 3rd-party broker"
    },
    {
      number: "3",
      title: "FairShare is triggered", 
      description: "50% of net commission is split evenly among the verified crew"
    },
    {
      number: "4",
      title: "You get paid",
      description: "Simple, fair, and direct"
    }
  ];

  const joinSteps = [
    {
      step: "1",
      action: "Create or find your yacht's listing",
      description: "Use Upload a Yacht if needed"
    },
    {
      step: "2",
      action: "Register as crew",
      description: "Use the FairShare signup form"
    },
    {
      step: "3", 
      action: "Upload proof of employment",
      description: "Valid contract or crew ID"
    },
    {
      step: "4",
      action: "Stay active and updated",
      description: "Ensure your yacht and role are current"
    },
    {
      step: "5",
      action: "Get notified when a charter is booked",
      description: "Track eligibility via your dashboard"
    }
  ];

  const faqs = [
    {
      id: "captain",
      question: "Do I have to be a captain to join FairShare?",
      answer: "No. All verified crew members share equally."
    },
    {
      id: "listing",
      question: "What if my yacht is not listed yet?",
      answer: "You can upload it, or join FairShare and we'll notify you if/when it gets listed."
    },
    {
      id: "license",
      question: "Do I need a brokerage license?",
      answer: "No. You just need to be crew on a participating charter yacht."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Custom FairShare Text */}
      <div className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-2xl font-bold text-primary" style={{ fontFamily: 'Typografix, sans-serif' }}>
              fairshare
            </div>
            <div></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              FairShare: Because Crew Deserve a Cut of the Commission.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Xplor is the only platform that shares 50% of net charter commission with active crew members on yachts chartered through us.
              <span className="block mt-2 font-semibold text-foreground">No tiers. No secrets. Just fair.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/fairshare-crew')}>
                Join FairShare Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/crew-instructions')}>
                Crew Instructions
              </Button>
            </div>
            
            {/* 50/50 Split Visual */}
            <div className="mt-12 max-w-md mx-auto">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <PieChart className="h-8 w-8 text-primary mr-2" />
                  <span className="text-lg font-semibold">50/50 Commission Split</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="bg-primary/20 rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold text-primary">50%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">For Crew</span>
                  </div>
                  <div className="text-center">
                    <div className="bg-secondary/20 rounded-lg p-3 mb-2">
                      <span className="text-2xl font-bold text-secondary">50%</span>
                    </div>
                    <span className="text-sm text-muted-foreground">For Xplor</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is FairShare */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Is FairShare?</h2>
            <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
              <p className="mb-4">
                FairShare is Xplor's commission-sharing program designed for active crew on charter yachts.
                If your yacht is chartered through Xplor — either as the central agent or a 3rd-party broker — we split 50% of our net commission equally among the crew on board.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5" />
                  Breakdown of the Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why We Built FairShare */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why FairShare Exists</h2>
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We've spent decades in the yachting industry. We know the truth:<br />
                <strong className="text-foreground">Crew help close deals, make guests return, and create unforgettable experiences — yet get nothing from the commission.</strong><br />
                That's broken. FairShare fixes it.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-500">Traditional Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Brokerages keep all commission</li>
                    <li>• Crew get no financial recognition</li>
                    <li>• Hidden fee structures</li>
                    <li>• No transparency</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-500">FairShare Model</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 50% commission shared with crew</li>
                    <li>• Recognition for your contribution</li>
                    <li>• Complete transparency</li>
                    <li>• Fair compensation system</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <blockquote className="text-lg italic text-center">
                  "Crew aren't just service providers — they're the reason the charter succeeds. FairShare puts that into action."
                </blockquote>
                <div className="text-center mt-4">
                  <cite className="text-sm text-muted-foreground">— Capt. Johnny Drummond, Founder, Xplor</cite>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Who's Eligible for FairShare?</h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg mb-6 text-center text-muted-foreground">You qualify for FairShare if:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You're an active crew member on a yacht</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>The yacht is listed for charter with Xplor (central agent or 3rd-party broker)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You've registered and uploaded proof of crew status (e.g. contract, ID)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>You're on board during a charter booked via Xplor</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate('/fairshare-crew')}>
                    Join FairShare Now
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/crew-instructions')}>
                    Crew Instructions & Upload Guide
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Join FairShare?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ready to Join? It's Simple.</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  {joinSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {step.step}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{step.action}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator className="my-8" />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => navigate('/fairshare-crew')}>
                    Join FairShare Now
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/crew-instructions')}>
                    Crew Instructions
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/yacht-brokerage')}>
                    Upload Your Yacht
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <Collapsible key={faq.id}>
                  <CollapsibleTrigger
                    className="flex items-center justify-between w-full p-4 text-left bg-card rounded-lg border hover:bg-card/80 transition-colors"
                    onClick={() => handleFaqToggle(faq.id)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    <ChevronDown 
                      className={`h-4 w-4 transition-transform ${
                        openFaq === faq.id ? 'transform rotate-180' : ''
                      }`} 
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => navigate('/faqs')}>
                <FileText className="h-4 w-4 mr-2" />
                View Full FAQs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Work Deserves a Share of the Reward.
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              "FairShare was built to change how things are done in yachting — and you're the reason we started it."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/fairshare-crew')}>
                Join FairShare Now
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/crew-instructions')}>
                Crew Instructions
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/yacht-brokerage')}>
                Upload a Yacht
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YachtCrewOffer;