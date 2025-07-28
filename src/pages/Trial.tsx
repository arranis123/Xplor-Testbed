import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Star, 
  Shield, 
  Clock,
  CreditCard,
  ArrowLeft,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const Trial = () => {
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const plans = {
    pro: {
      name: "Pro",
      price: "$19",
      period: "/month",
      originalPrice: "$19",
      savings: "",
      features: [
        "Unlimited uploads",
        "Analytics dashboard", 
        "Embed support",
        "Custom branding",
        "Priority email support"
      ]
    },
    business: {
      name: "Business", 
      price: "$99",
      period: "/month",
      originalPrice: "$99",
      savings: "",
      features: [
        "Everything in Pro",
        "5 team members",
        "White-label tours", 
        "Lead tracking",
        "Geo heatmaps",
        "Phone & email support"
      ]
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement trial signup logic when Supabase is connected
    console.log("Trial signup:", { selectedPlan, formData });
    alert("Trial signup functionality will be implemented when backend is connected!");
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link to="/pricing" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pricing
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="bg-green-100 text-green-800 mb-4">
            <Clock className="h-3 w-3 mr-1" />
            30-Day Free Trial
          </Badge>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Try xplor risk-free for 30 days. Create unlimited virtual tours, access all features, 
            and see why thousands of professionals choose our platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Choose Your Plan</h2>
              <p className="text-muted-foreground mb-6">
                Select the plan that's right for you. You can change or cancel anytime during your trial.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(plans).map(([planKey, plan]) => (
                <Card 
                  key={planKey}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPlan === planKey 
                      ? 'border-xplor-yellow bg-xplor-yellow/5' 
                      : 'border-border hover:border-xplor-yellow/50'
                  }`}
                  onClick={() => setSelectedPlan(planKey)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPlan === planKey 
                            ? 'border-xplor-yellow bg-xplor-yellow' 
                            : 'border-muted-foreground'
                        }`}>
                          {selectedPlan === planKey && (
                            <div className="w-full h-full rounded-full bg-xplor-yellow" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <div className="flex items-end gap-1">
                            <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.period}</span>
                          </div>
                        </div>
                      </div>
                      {planKey === "pro" && (
                        <Badge className="bg-xplor-yellow text-xplor-black">
                          <Star className="h-3 w-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Trial Benefits */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  30-Day Trial Includes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Full access to all features",
                    "No credit card required to start",
                    "Cancel anytime during trial",
                    "24/7 customer support",
                    "Free onboarding session"
                  ].map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-green-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signup Form */}
          <div>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Create Your Account</CardTitle>
                <CardDescription>
                  Fill in your details to start your free trial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange("agreeToTerms", !!checked)}
                      />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                        I agree to the <a href="#" className="text-xplor-yellow hover:underline">Terms of Service</a> and{" "}
                        <a href="#" className="text-xplor-yellow hover:underline">Privacy Policy</a> *
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.agreeToMarketing}
                        onCheckedChange={(checked) => handleInputChange("agreeToMarketing", !!checked)}
                      />
                      <Label htmlFor="marketing" className="text-sm text-muted-foreground leading-relaxed">
                        I'd like to receive product updates and marketing communications
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!isFormValid}
                    className="w-full bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black font-medium"
                    size="lg"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Start My Free Trial
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-xs text-muted-foreground">
                      Your trial starts immediately. No credit card required.
                      <br />
                      You can add billing details anytime during your trial.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-foreground mb-6">Trusted by industry leaders</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            <div className="text-2xl">🏢 Microsoft</div>
            <div className="text-2xl">🏠 Redfin</div>
            <div className="text-2xl">🏨 Hilton</div>
            <div className="text-2xl">⭐ Airbnb</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trial;