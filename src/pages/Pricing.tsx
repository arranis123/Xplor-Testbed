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
  Headphones,
  ArrowRight,
  Crown,
  Building
} from "lucide-react";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started with virtual tours",
      features: [
        "3 uploads",
        "Standard visibility", 
        "Public profile",
        "Mobile-friendly playback",
        "Global map visibility",
        "Community support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Star
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Ideal for professionals and content creators",
      features: [
        "Unlimited uploads",
        "Analytics dashboard",
        "Embed support",
        "Custom branding",
        "Mobile-friendly playback",
        "Global map visibility",
        "Public user profile",
        "Priority email support"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "default" as const,
      popular: true,
      icon: Zap
    },
    {
      name: "Business",
      price: "$99",
      period: "/month",
      description: "Perfect for teams and growing businesses",
      features: [
        "Everything in Pro",
        "5 team members",
        "White-label tours",
        "Lead tracking",
        "Geo heatmaps",
        "Advanced analytics",
        "Team collaboration tools",
        "Phone & email support"
      ],
      buttonText: "Start Business Trial",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Users
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large organizations",
      features: [
        "Everything in Business",
        "API access",
        "Data exports",
        "Custom UI",
        "Third-party integrations",
        "Priority support",
        "Dedicated account manager",
        "Custom SLA",
        "On-premise deployment options"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
      icon: Building
    }
  ];

  const commonFeatures = [
    "Mobile-friendly playback",
    "Global map visibility", 
    "Public user profile",
    "SSL security",
    "99.9% uptime guarantee"
  ];

  const industries = [
    { name: "Real Estate", icon: "🏠", description: "Showcase properties with immersive virtual tours" },
    { name: "Hospitality", icon: "🏨", description: "Give guests a preview of their experience" },
    { name: "Education", icon: "🎓", description: "Virtual campus tours and online learning" },
    { name: "Retail", icon: "🛍️", description: "Create engaging shopping experiences" },
    { name: "Events", icon: "🎪", description: "Virtual venue tours and event planning" },
    { name: "Healthcare", icon: "🏥", description: "Facility tours for patients and staff" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Choose Your 
              <span className="text-xplor-yellow"> Xplor </span>
              Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Flexible subscription options for individuals, teams, and enterprise clients who want to 
              publish and manage immersive virtual tours across real-world industries.
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-green-100 text-green-800">
                <Check className="h-3 w-3 mr-1" />
                30-day free trial
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Shield className="h-3 w-3 mr-1" />
                No setup fees
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Headphones className="h-3 w-3 mr-1" />
                24/7 support
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 -mt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative border-border hover:shadow-medium transition-all duration-300 ${
                  tier.popular ? 'border-xplor-yellow shadow-medium scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-xplor-yellow text-xplor-black font-medium px-4 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      Most Popular
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
                    {tier.period && (
                      <span className="text-muted-foreground text-lg">{tier.period}</span>
                    )}
                  </div>
                  <CardDescription className="text-center">
                    {tier.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {tier.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
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
                  >
                    {tier.buttonText}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Features */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            All plans include these core features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {commonFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 justify-center p-3 bg-background rounded-lg border border-border">
                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span className="text-sm text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Trusted across industries
            </h2>
            <p className="text-lg text-muted-foreground">
              Xplor powers immersive virtual experiences for businesses worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Card key={industry.name} className="border-border hover:shadow-medium transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{industry.icon}</div>
                    <CardTitle className="text-lg text-foreground">{industry.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{industry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, all paid plans come with a 30-day free trial. No credit card required to start.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Do you offer custom integrations?</h3>
                <p className="text-muted-foreground text-sm">
                  Enterprise plans include custom integrations and API access for seamless workflow integration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What kind of support do you provide?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer email support for all plans, with phone support for Business and Enterprise customers.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can cancel your subscription at any time with no cancellation fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who trust Xplor for their virtual tour needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;