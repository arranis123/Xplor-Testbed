import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Star, 
  Trophy, 
  Award, 
  Users, 
  CheckCircle, 
  XCircle, 
  Target, 
  TrendingUp, 
  Shield, 
  Video,
  MapPin,
  Calendar,
  MessageCircle,
  Share2,
  UserCheck,
  Navigation,
  GraduationCap,
  AlertTriangle,
  Camera,
  Phone,
  Clock,
  BarChart3,
  Menu,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CRIExplanation = () => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const tierData = [
    { range: "0–30", name: "Standard", color: "xplor-grey", benefits: ["Basic visibility"] },
    { range: "31–60", name: "Active Crew", color: "turquoise", benefits: ["Boosted search results"] },
    { range: "61–90", name: "Top Contributor", color: "xplor-yellow", benefits: ["Featured placement", "badge eligibility"] },
    { range: "91–100+", name: "Elite Crew", color: "primary", benefits: ["Elite badge", "platform recognition", "perks"] }
  ];

  const sections = [
    { id: "what-is", title: "What is CRI+?" },
    { id: "breakdown", title: "Points Breakdown" },
    { id: "tiers", title: "Tier System" },
    { id: "track", title: "Track & Improve" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setShowMobileMenu(false);
  };

  return (
    <>
      <Helmet>
        <title>Crew Rating Index Plus (CRI+) – How It Works | Xplor</title>
        <meta name="description" content="Learn how to increase your CRI+ score on Xplor. Understand the rating system that measures your professionalism and contribution to the yacht crew community." />
      </Helmet>

      <div className="min-h-screen bg-background font-sans">
        {/* Navigation Menu */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="hidden md:flex space-x-6">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={() => navigate('/fairshare/join')} className="ml-auto">
                Join Xplor Crew
              </Button>
            </div>
            {showMobileMenu && (
              <div className="md:hidden pb-4 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-2"
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                How to Increase Your{' '}
                <span className="text-primary">CRI+</span>{' '}
                on Xplor
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                Your CRI+ (Crew Rating Index Plus) is the measure of your professionalism, engagement, 
                and contribution to the Xplor community. The higher your score, the more visibility, 
                perks, and trust you gain on the platform.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/fairshare/join')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Join Xplor Crew <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* What is CRI+ Section */}
          <section id="what-is" className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                What is CRI+ and Why Does it Matter?
              </h2>
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    CRI+ reflects your value as a crew member in the Xplor ecosystem. It's calculated 
                    from your qualifications, verified activity, engagement, and contributions to your 
                    yacht's profile on Xplor.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-foreground flex items-center">
                        <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                        Higher CRI+ scores mean:
                      </h3>
                      <div className="space-y-3">
                        {[
                          "Better platform ranking",
                          "Higher chances of direct charter bookings",
                          "Eligibility for bonuses and rewards",
                          "Recognition as a verified, trusted professional"
                        ].map((benefit, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-card rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">88.7</div>
                        <div className="text-sm text-muted-foreground mb-4">Sample CRI+ Score</div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                          Elite Tier
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CRI+ Points Breakdown */}
          <section id="breakdown" className="mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                CRI+ Points Breakdown
              </h2>
              
              <Accordion type="multiple" className="space-y-4">
                {/* Profile Completion */}
                <AccordionItem value="profile" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <UserCheck className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Profile Completion & Verification</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +10 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Complete full profile", points: "+2", icon: CheckCircle },
                        { task: "Upload certifications and references", points: "+2", icon: Award },
                        { task: "Verified ID and LinkedIn link", points: "+3", icon: Shield },
                        { task: "Add a video intro", points: "+2", icon: Video },
                        { task: "Full yacht role history", points: "+1", icon: Calendar }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Qualifications & Experience */}
                <AccordionItem value="qualifications" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <GraduationCap className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Qualifications & Experience</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +20 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Valid licenses and endorsements", points: "+3", icon: Award },
                        { task: "1–5+ years experience on charter yachts", points: "+2 to +5", icon: Clock },
                        { task: "Logged trips, references, and STCW", points: "+5", icon: CheckCircle },
                        { task: "Bridge/ISM/MLC training", points: "+2", icon: Navigation }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Engagement & Contribution */}
                <AccordionItem value="engagement" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <Target className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Engagement & Contribution</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +30 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Upload virtual tours", points: "+5", icon: Camera },
                        { task: "Keep yacht info and availability updated monthly", points: "+5", icon: Calendar },
                        { task: "Upload high-quality crew videos", points: "+2 each", icon: Video },
                        { task: "Respond to guest questions/help", points: "+1 each", icon: MessageCircle },
                        { task: "Complete all yacht listing fields", points: "+5", icon: CheckCircle },
                        { task: "Timely guest response (<24h)", points: "+3", icon: Clock }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Social Sharing & Referrals */}
                <AccordionItem value="social" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <Share2 className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Social Sharing & Referrals</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +15 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Share Xplor listing on social media", points: "+2/platform (max 6)", icon: Share2 },
                        { task: "Refer another crew member", points: "+1 each (max 5)", icon: Users },
                        { task: "Refer a yacht owner", points: "+3", icon: UserCheck },
                        { task: "Host a livestream or feature", points: "+3", icon: Video }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Charter Success */}
                <AccordionItem value="charter" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <Navigation className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Charter Success Participation</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +25 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Successful charter via Xplor", points: "+5 per charter", icon: Navigation },
                        { task: "5-Star guest review", points: "+3", icon: Star },
                        { task: "Repeat charter from same guest", points: "+2", icon: Users },
                        { task: "Named in a positive review", points: "+2", icon: Award }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Training & Achievements */}
                <AccordionItem value="training" className="border border-border rounded-lg">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center w-full">
                      <div className="flex items-center flex-1">
                        <Trophy className="h-6 w-6 text-primary mr-3" />
                        <span className="text-xl font-semibold">Training & Achievements</span>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary ml-4">
                        +10 CRI+
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="grid gap-3">
                      {[
                        { task: "Xplor onboarding module completed", points: "+2", icon: CheckCircle },
                        { task: "Attend Xplor webinars or training", points: "+1 each", icon: GraduationCap },
                        { task: "Earn Xplor verified badge", points: "+2", icon: Shield },
                        { task: "Featured as Crew of the Month", points: "+3", icon: Trophy }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                          <div className="flex items-center">
                            <item.icon className="h-4 w-4 text-turquoise mr-3" />
                            <span className="text-muted-foreground">{item.task}</span>
                          </div>
                          <Badge variant="secondary">{item.points}</Badge>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Negative Behaviors */}
              <Card className="mt-8 border-destructive/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-destructive mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Negative Behaviors (Decay)
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: "Outdated yacht profile (60+ days)", penalty: "-3" },
                      { action: "Unanswered messages (>72h)", penalty: "-2" },
                      { action: "Verified guest complaint", penalty: "-5 to -10" },
                      { action: "Uploading false or misleading info", penalty: "-10 (reviewed case-by-case)" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-destructive mr-3" />
                          <span className="text-muted-foreground">{item.action}</span>
                        </div>
                        <Badge variant="destructive">{item.penalty}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Crew Tier System */}
          <section id="tiers" className="mb-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-center">
                Crew Tier System
              </h2>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {tierData.map((tier, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                        tier.color === 'xplor-grey' ? 'bg-xplor-grey/20' :
                        tier.color === 'turquoise' ? 'bg-turquoise/20' :
                        tier.color === 'xplor-yellow' ? 'bg-xplor-yellow/20' :
                        'bg-primary/20'
                      }`}>
                        <BarChart3 className={`h-8 w-8 ${
                          tier.color === 'xplor-grey' ? 'text-xplor-grey' :
                          tier.color === 'turquoise' ? 'text-turquoise' :
                          tier.color === 'xplor-yellow' ? 'text-xplor-yellow' :
                          'text-primary'
                        }`} />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground mb-2">{tier.name}</h3>
                      <div className="text-2xl font-bold mb-4 text-primary">{tier.range}</div>
                      
                      <div className="space-y-2">
                        {tier.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Track & Improve */}
          <section id="track" className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">
                Track Your CRI+ and Climb the Ranks
              </h2>
              <Card className="p-8">
                <CardContent className="space-y-6">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Crew can monitor their CRI+ from their Xplor dashboard. Your actions, content, 
                    and verified feedback all contribute to your ongoing score. Take action, be consistent, 
                    and be seen.
                  </p>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Button asChild variant="outline" className="h-auto p-4 flex-col">
                      <Link to="/fairshare/join">
                        <Users className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Join the Xplor Fairshare Crew</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-auto p-4 flex-col">
                      <Link to="/dashboard">
                        <Camera className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Upload Yacht Info Now</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-auto p-4 flex-col">
                      <Link to="/auth">
                        <Shield className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Become Verified</span>
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="h-auto p-4 flex-col">
                      <Link to="/fairshare/cri-calculator">
                        <BarChart3 className="h-6 w-6 mb-2" />
                        <span className="text-sm font-medium">Calculate Your CRI+</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CRIExplanation;