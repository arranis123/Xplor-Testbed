import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Star, 
  Users, 
  Camera, 
  Building, 
  Home, 
  Plane, 
  Ship, 
  GraduationCap,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Award,
  Zap,
  DollarSign,
  Smartphone
} from "lucide-react";

export default function VirtualTourPlatforms() {
  const [sortBy, setSortBy] = useState<'rank' | 'rating' | 'name'>('rank');

  const platforms = [
    {
      rank: 1,
      name: "Kuula",
      rating: 4.9,
      idealFor: "Freelancers, real estate photographers",
      pros: ["Easy to use, clean interface", "Mobile-friendly and quick sharing", "Affordable/free tiers available"],
      cons: ["Limited depth and spatial data", "Creative control is somewhat restricted"],
      logo: "🏆"
    },
    {
      rank: 2,
      name: "CloudPano",
      rating: 4.8,
      idealFor: "Real estate agents, small businesses",
      pros: ["Drag-and-drop interface", "White-label solutions", "Good customer support"],
      cons: ["Limited advanced features", "Can be slow with large tours"],
      logo: "☁️"
    },
    {
      rank: 3,
      name: "3DVista",
      rating: 4.7,
      idealFor: "Professional tour creators, agencies",
      pros: ["Extensive customization options", "Advanced hotspot features", "Multi-platform publishing"],
      cons: ["Steep learning curve", "Higher price point"],
      logo: "🔮"
    },
    {
      rank: 4,
      name: "Pano2VR",
      rating: 4.6,
      idealFor: "Advanced users, custom branding",
      pros: ["Complete creative control", "Powerful skin editor", "Floor plan integration"],
      cons: ["Complex interface", "Requires technical knowledge"],
      logo: "🎯"
    },
    {
      rank: 5,
      name: "TeliportMe",
      rating: 4.5,
      idealFor: "Quick sharing, social media",
      pros: ["Simple upload process", "Social sharing features", "Mobile app available"],
      cons: ["Limited customization", "Basic analytics"],
      logo: "📱"
    },
    {
      rank: 6,
      name: "My360",
      rating: 4.4,
      idealFor: "Budget-conscious users",
      pros: ["Very affordable pricing", "Easy to learn", "Good mobile experience"],
      cons: ["Limited features", "Basic branding options"],
      logo: "💰"
    },
    {
      rank: 7,
      name: "Asteroom",
      rating: 4.3,
      idealFor: "Real estate professionals",
      pros: ["AI-powered enhancements", "Virtual staging", "Fast processing"],
      cons: ["Limited platform support", "Subscription required"],
      logo: "🌟"
    },
    {
      rank: 8,
      name: "Metareal",
      rating: 4.2,
      idealFor: "Enterprise solutions",
      pros: ["Enterprise-grade features", "Custom integrations", "Excellent support"],
      cons: ["Expensive for small users", "Complex setup"],
      logo: "🏢"
    },
    {
      rank: 9,
      name: "iGUIDE",
      rating: 4.1,
      idealFor: "Real estate with floor plans",
      pros: ["Automatic floor plan generation", "Measurement tools", "Property reports"],
      cons: ["Requires special camera", "Limited customization"],
      logo: "📐"
    },
    {
      rank: 10,
      name: "Concept3D",
      rating: 4.0,
      idealFor: "Campus tours, large venues",
      pros: ["Interactive maps", "Wayfinding features", "Scalable for large properties"],
      cons: ["Expensive", "Overkill for simple tours"],
      logo: "🗺️"
    },
    {
      rank: 11,
      name: "Realync",
      rating: 3.9,
      idealFor: "Real estate live tours",
      pros: ["Live tour capabilities", "CRM integration", "Lead generation tools"],
      cons: ["Focused on live tours only", "Limited editing"],
      logo: "📹"
    },
    {
      rank: 12,
      name: "CubiCasa",
      rating: 3.8,
      idealFor: "Floor plan focus",
      pros: ["AI floor plan creation", "Fast turnaround", "Accurate measurements"],
      cons: ["No virtual tour creation", "Floor plans only"],
      logo: "📋"
    },
    {
      rank: 13,
      name: "Zillow 3D Home",
      rating: 3.7,
      idealFor: "Zillow-focused real estate",
      pros: ["Direct Zillow integration", "Free for listings", "Good mobile viewing"],
      cons: ["Limited to Zillow platform", "Basic features"],
      logo: "🏠"
    },
    {
      rank: 14,
      name: "Matterport",
      rating: 4.5,
      idealFor: "High-end 3D scanning, digital twins",
      pros: ["Industry-leading 3D capture", "Dollhouse view", "Measurement tools", "Enterprise features"],
      cons: ["Expensive hardware required", "High subscription costs", "Overkill for simple tours"],
      logo: "🏗️"
    },
    {
      rank: 15,
      name: "Panoskin",
      rating: 3.6,
      idealFor: "Custom tour development",
      pros: ["HTML5 output", "Custom coding options", "Responsive design"],
      cons: ["Requires coding knowledge", "Limited support"],
      logo: "💻"
    },
    {
      rank: 16,
      name: "Roundme",
      rating: 3.5,
      idealFor: "Hobbyists, photographers",
      pros: ["Free tier available", "Community features", "Easy sharing"],
      cons: ["Limited business features", "Basic analytics"],
      logo: "🌍"
    },
    {
      rank: 17,
      name: "Veer VR",
      rating: 3.4,
      idealFor: "VR content creators",
      pros: ["VR headset support", "Social VR features", "Creative community"],
      cons: ["Limited business use", "Requires VR hardware"],
      logo: "🥽"
    },
    {
      rank: 18,
      name: "SeekBeak",
      rating: 3.3,
      idealFor: "Interactive presentations",
      pros: ["Interactive hotspots", "Presentation mode", "Analytics"],
      cons: ["Limited tour features", "Focused on presentations"],
      logo: "🎭"
    },
    {
      rank: 19,
      name: "Lapentor",
      rating: 3.2,
      idealFor: "Basic virtual tours",
      pros: ["Simple interface", "Affordable pricing", "Mobile editing"],
      cons: ["Limited features", "Basic customization"],
      logo: "🎪"
    },
    {
      rank: 20,
      name: "Panoraven",
      rating: 3.1,
      idealFor: "Simple panoramic tours",
      pros: ["Easy panorama stitching", "Quick setup", "Free options"],
      cons: ["Very basic features", "Limited support"],
      logo: "📸"
    }
  ];

  const sortedPlatforms = [...platforms].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return a.rank - b.rank;
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-xplor-yellow fill-current' : 'text-xplor-grey'
        }`}
      />
    ));
  };

  const recommendationGuide = [
    { need: "Fast and beginner-friendly", platforms: "Kuula, CloudPano, TeliportMe", icon: <Zap className="w-5 h-5" /> },
    { need: "Full control & branding", platforms: "3DVista, Pano2VR", icon: <Award className="w-5 h-5" /> },
    { need: "Best 3D scans", platforms: "Matterport, iGUIDE", icon: <Camera className="w-5 h-5" /> },
    { need: "Budget-conscious", platforms: "My360, Asteroom, Metareal", icon: <DollarSign className="w-5 h-5" /> },
    { need: "Floor plans only", platforms: "CubiCasa, iGUIDE", icon: <Building className="w-5 h-5" /> },
    { need: "Campus/large venues", platforms: "Concept3D, Realync", icon: <GraduationCap className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Banner */}
      <div className="bg-gradient-hero text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-xplor-black drop-shadow-lg">
            The Top 20 Virtual Tour Platforms
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto text-xplor-black/80">
            (2025 Expert Guide)
          </p>
          <p className="text-base md:text-lg max-w-5xl mx-auto text-xplor-black/70">
            Explore the leading virtual tour software on the market — with ratings, pros and cons, 
            use cases, and feature comparisons to help you choose the right solution for your project.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-xplor-black mb-8 text-center">
            At-a-Glance: Compare the Top 20 Platforms
          </h2>
          
          <div className="flex flex-wrap gap-4 mb-6 justify-center">
            <Button
              variant={sortBy === 'rank' ? 'default' : 'outline'}
              onClick={() => setSortBy('rank')}
              className="bg-xplor-yellow text-xplor-black hover:bg-xplor-yellow-dark"
            >
              Sort by Rank
            </Button>
            <Button
              variant={sortBy === 'rating' ? 'default' : 'outline'}
              onClick={() => setSortBy('rating')}
              className="bg-xplor-yellow text-xplor-black hover:bg-xplor-yellow-dark"
            >
              Sort by Rating
            </Button>
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              onClick={() => setSortBy('name')}
              className="bg-xplor-yellow text-xplor-black hover:bg-xplor-yellow-dark"
            >
              Sort by Name
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedPlatforms.map((platform) => (
              <Card key={platform.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{platform.logo}</span>
                    <Badge variant="secondary" className="bg-xplor-yellow text-xplor-black">
                      #{platform.rank}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{platform.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(platform.rating)}</div>
                    <span className="text-sm font-medium">{platform.rating}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-xplor-grey mb-3">{platform.idealFor}</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{platform.pros[0]}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-xs">{platform.cons[0]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Detailed Platform Reviews */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-xplor-black mb-8 text-center">
            Detailed Platform Reviews
          </h2>
          
          <Accordion type="multiple" className="space-y-4">
            {platforms.map((platform) => (
              <AccordionItem 
                key={platform.name} 
                value={platform.name}
                className="border rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-2xl">{platform.logo}</span>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="secondary" className="bg-xplor-yellow text-xplor-black">
                          #{platform.rank}
                        </Badge>
                        <h3 className="text-xl font-bold">{platform.name}</h3>
                        <div className="flex items-center gap-1">
                          {renderStars(platform.rating)}
                          <span className="text-sm font-medium ml-1">{platform.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-xplor-grey">Ideal For: {platform.idealFor}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                        <CheckCircle className="w-5 h-5" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {platform.pros.map((pro, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 font-semibold text-orange-600 mb-3">
                        <AlertTriangle className="w-5 h-5" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {platform.cons.map((con, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Matterport Spotlight */}
        <section className="mb-16">
          <Card className="bg-gradient-card border-2 border-xplor-yellow">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-xplor-black mb-4">
                Why Matterport Stands Out in 2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6 text-xplor-grey">
                    Matterport revolutionized the virtual tour industry with their 3D capture technology and dollhouse view. 
                    While ranked #14 in our list due to cost considerations, they remain the gold standard for high-end 
                    3D scanning and digital twin creation.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5 text-xplor-yellow" />
                      <span>Industry-leading 3D capture quality</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-xplor-yellow" />
                      <span>Unique dollhouse view for property overview</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-xplor-yellow" />
                      <span>Enterprise-grade features and integrations</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-xplor-yellow/20 rounded-lg p-6 mb-4">
                    <Building className="w-16 h-16 text-xplor-black mx-auto mb-3" />
                    <p className="text-sm text-xplor-grey">
                      Best for luxury real estate, commercial spaces, and projects requiring precise measurements
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Expert Recommendation Summary */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-xplor-black mb-8 text-center">
            Which Platform Should You Use?
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Decision Support Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendationGuide.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-xplor-yellow/10 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-xplor-yellow">{item.icon}</div>
                      <h4 className="font-semibold text-sm">{item.need}</h4>
                    </div>
                    <p className="text-sm text-xplor-grey">{item.platforms}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Educational CTA Block */}
        <section className="mb-16">
          <Card className="bg-gradient-hero text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-xplor-black mb-4">
                Learn How to Create Your Own Virtual Tour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  className="bg-xplor-yellow text-xplor-black hover:bg-xplor-yellow-dark"
                  onClick={() => window.location.href = '/how-to-create-virtual-tour'}
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  How to Create a Virtual Tour
                </Button>
                <Button 
                  variant="outline" 
                  className="border-xplor-black text-xplor-black hover:bg-xplor-yellow/20"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Compare Virtual Tour Hardware
                </Button>
                <Button 
                  variant="outline"
                  className="border-xplor-black text-xplor-black hover:bg-xplor-yellow/20"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Become a Verified Xplor Tour Pro
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Footer - External Links */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">External Resources & Ratings</CardTitle>
              <CardDescription className="text-center">
                Additional resources for your virtual tour research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Capterra Virtual Tour Reviews
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  GoodFirms VR Rankings
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  SoftwareWorld Comparison
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}