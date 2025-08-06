import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Users, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield, 
  ArrowRight,
  Crown,
  Building,
  Upload,
  Calendar,
  Smartphone,
  Eye,
  Share2,
  Settings,
  TrendingUp,
  Palette,
  Link2,
  Phone,
  Unlock,
  Target,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import pricingHero from "@/assets/pricing-hero.jpg";

const Pricing = () => {
  const { user } = useAuth();
  
  const pricingTiers = [
    {
      name: "Starter",
      price: "Free",
      label: "",
      description: "Perfect for: Crew, agents, or owners listing a few spaces.",
      features: [
        "Upload up to 5 spaces",
        "Unlimited views",
        "Matterport, 360°, video & media uploads",
        "Public exposure on xplor.io",
        "Booking & contact buttons",
        "Eligibility for FairShare program (yacht crew only)",
        "Basic analytics",
        "Editable listings"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "default" as const,
      popular: false,
      icon: Star
    },
    {
      name: "Pro",
      price: "Coming Soon",
      label: "Launching Soon",
      description: "Perfect for: Agencies, dealerships, photographers, or multi-listing owners.",
      features: [
        "All Starter features",
        "Advanced analytics & lead insights",
        "Calendar integration (for rentals, charters, bookings)",
        "API plugin support (Resy, Cloudbeds, Turo, CharterPad, etc.)",
        "White-labeled listing pages (hide Xplor branding)",
        "Custom branded URLs (e.g. yourbrand.xplor.io)",
        "Upload up to 100 spaces",
        "Priority support & onboarding"
      ],
      buttonText: "Join Waitlist",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Zap
    },
    {
      name: "Enterprise / Custom",
      price: "Custom",
      label: "Tailored Solutions",
      description: "Perfect for: Large brokerages, hotel groups, manufacturers, developers.",
      features: [
        "All Pro features",
        "Unlimited listings",
        "Dedicated account manager",
        "Custom integrations (CRM, PMS, rental systems)",
        "API & data sync",
        "SLA support / data protection agreements"
      ],
      buttonText: "Book a Discovery Call",
      buttonVariant: "default" as const,
      popular: false,
      icon: Building
    }
  ];

  const valueJustifications = [
    {
      title: "Always-Free Core",
      description: "Upload. Share. Explore. Get seen — without limits on viewers.",
      icon: Unlock
    },
    {
      title: "Premium Tools = Pro Results",
      description: "Calendar integrations, advanced analytics, and white labeling to help scale faster.",
      icon: Settings
    },
    {
      title: "FairShare Is Always Free",
      description: "We never charge crew to join or earn commission.",
      icon: Share2
    },
    {
      title: "Designed to Grow With You",
      description: "Whether you're listing one yacht or managing 100 showrooms, we'll match your pace.",
      icon: TrendingUp
    }
  ];

  const faqs = [
    {
      question: "Is Xplor free to use?",
      answer: "Yes. The Starter plan is free and includes generous tools for listing and sharing your spaces."
    },
    {
      question: "Do I need a subscription to earn with FairShare?",
      answer: "No. Crew can join and earn FairShare commission 100% free."
    },
    {
      question: "What counts as a \"space\"?",
      answer: "Any unique space with a virtual tour or media package — a yacht, villa, hotel suite, car, jet, restaurant, etc."
    },
    {
      question: "Can I upgrade later?",
      answer: "Yes — you'll be able to upgrade at any time once Pro is launched."
    },
    {
      question: "Can I use my own booking system?",
      answer: "Yes — Pro and Enterprise plans support API plugins or custom links."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pricingHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Simple, Fair Pricing for All Types of Spaces.
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Xplor is free to get started — with professional tools and global exposure included. 
              When you're ready for more, unlock advanced features to grow your brand, bookings, and reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" asChild>
                <Link to="/spaces">Upload a Space</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20" asChild>
                <Link to="/fair-share-crew">Join FairShare</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative border-border hover:shadow-medium transition-all duration-300 ${
                  tier.name === "Starter" ? 'border-green-500 shadow-medium' : ''
                }`}
              >
                {tier.label && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-xplor-yellow text-xplor-black font-medium px-4 py-1">
                      {tier.label}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-xplor-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <tier.icon className="h-6 w-6 text-xplor-yellow" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-foreground">{tier.name}</CardTitle>
                  <div className="flex items-end justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  </div>
                  <CardDescription className="text-center">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${
                      tier.buttonVariant === 'default' 
                        ? 'bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black' 
                        : ''
                    }`}
                    variant={tier.buttonVariant}
                    asChild={tier.name !== 'Enterprise / Custom'}
                  >
                    {tier.name !== 'Enterprise / Custom' ? (
                      <Link to={
                        tier.buttonText === 'Get Started Free' 
                          ? (user ? "/dashboard" : "/auth") 
                          : tier.buttonText === 'Join Waitlist'
                            ? "/trial"
                            : "/trial"
                      }>
                        {tier.buttonText}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    ) : (
                      <>
                        {tier.buttonText}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Value Justification Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            You Only Pay for What Grows Your Business.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueJustifications.map((item) => (
              <Card key={item.title} className="border-border text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-xplor-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-xplor-yellow" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">
              Read All FAQs
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Start Free. Scale Smart. Xplor as You Grow.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're listing your first yacht, launching a digital dealership, or managing 50 hotel suites — Xplor is built for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black" asChild>
              <Link to="/spaces">Upload a Space</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/fair-share-crew">Join FairShare</Link>
            </Button>
            <Button size="lg" variant="outline">
              Book a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;