import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Camera, Settings, Upload, Share2, Play, ExternalLink } from "lucide-react";
import heroImage from "@/assets/how-to-create-virtual-tour-hero.jpg";

export default function HowToCreateVirtualTour() {
  const steps = [
    {
      title: "Plan Your Tour",
      icon: Settings,
      content: "Define your tour's objectives, identify key areas to capture, create a shot list, and plan the optimal shooting sequence for smooth navigation flow."
    },
    {
      title: "Capture the Space",
      icon: Camera,
      content: "Use professional 360° cameras or DSLR setups to capture high-quality imagery. Ensure proper lighting, stable positioning, and comprehensive coverage of all important areas."
    },
    {
      title: "Choose Your Virtual Tour Software",
      icon: Settings,
      content: "Select from industry-leading platforms like 3DVista, Matterport, Kuula, or Pano2VR based on your specific needs and budget requirements."
    },
    {
      title: "Edit and Build the Tour",
      icon: Settings,
      content: "Process your captured media, add interactive hotspots, create seamless navigation between scenes, and enhance with multimedia elements like videos and audio."
    },
    {
      title: "Host Your Tour",
      icon: Upload,
      content: "Upload your completed tour to a reliable hosting platform. Xplor.io offers optimized hosting specifically designed for virtual tour performance."
    },
    {
      title: "Share & Embed",
      icon: Share2,
      content: "Distribute your tour through multiple channels including direct links, website embeds, social media, and email campaigns for maximum exposure."
    }
  ];

  const hardware = [
    {
      category: "360° Cameras",
      items: [
        { name: "Ricoh Theta Z1", description: "Compact, pro-grade 360 camera" },
        { name: "Insta360 One RS 1-Inch 360 Edition", description: "Dual-lens system with high resolution" },
        { name: "GoPro Max", description: "Affordable and action-ready" },
        { name: "Trisio Lite 2", description: "Lightweight option for real estate use" }
      ]
    },
    {
      category: "DSLR + Panoramic Heads",
      items: [
        { name: "Canon EOS R or Nikon Z Series + Nodal Ninja pano head", description: "Best for ultra-high-resolution custom photography" }
      ]
    },
    {
      category: "3D Laser Scanners",
      items: [
        { name: "Matterport Pro3", description: "Industry-leading depth and precision" },
        { name: "Leica BLK360", description: "High-end 3D scanning for commercial and architectural use" }
      ]
    },
    {
      category: "Accessories",
      items: [
        { name: "Carbon fiber tripod with leveling base", description: "Stable foundation for quality captures" },
        { name: "Remote shutter trigger or interval timer", description: "Minimize camera shake" },
        { name: "External lighting", description: "Optional for controlled interior environments" }
      ]
    }
  ];

  const softwarePlatforms = [
    { name: "3DVista", featured: true },
    { name: "Matterport", featured: false },
    { name: "Kuula", featured: false },
    { name: "Pano2VR", featured: false },
    { name: "Klapty", featured: false },
    { name: "Cupix", featured: false }
  ];

  const educationalVideos = [
    "Getting Started with 3DVista",
    "360 Camera Shooting Tips",
    "Building a Real Estate Tour from Scratch"
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Background Image */}
        <div className="relative overflow-hidden rounded-2xl mb-16">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
          <div className="relative text-center py-32 px-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Create Stunning Virtual Tours for Any Space
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Whether you're showcasing a luxury yacht, a home, or a commercial space, virtual tours are the gold standard for immersive, high-impact marketing. This guide walks you through the tools, techniques, and expert network available on Xplor.
            </p>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Step-by-Step Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {steps.map((step, index) => (
                <AccordionItem key={index} value={`step-${index}`}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-semibold">{step.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground ml-14 text-base">
                    {step.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Recommended Hardware */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Top Hardware for Capturing Virtual Tours
            </CardTitle>
            <p className="text-center text-muted-foreground text-lg">
              High-quality virtual tours start with the right gear. Here are trusted hardware options used by professionals worldwide:
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              {hardware.map((category, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    {category.category}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                ✅ <strong>Note:</strong> All hardware can be used with 3DVista, Matterport, or other compatible software platforms.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Software Platforms */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Top Software Platforms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
              {softwarePlatforms.map((platform, index) => (
                <div key={index} className="text-center">
                  <div className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                    {platform.featured && <Badge className="mb-2">Featured</Badge>}
                    <h3 className="font-semibold text-foreground">{platform.name}</h3>
                    <Button variant="outline" size="sm" className="mt-2">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Site
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Educational Videos */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Educational Videos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {educationalVideos.map((video, index) => (
                <div key={index} className="border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-4">{video}</h3>
                  <Button variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hosting & Embedding */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Hosting & Embedding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center p-6 border rounded-lg">
                <h3 className="font-semibold text-primary mb-3">Hosting on Xplor.io</h3>
                <Badge className="mb-3">Recommended</Badge>
                <p className="text-sm text-muted-foreground">Optimized hosting specifically designed for virtual tour performance and user experience.</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Third-Party Hosting</h3>
                <p className="text-sm text-muted-foreground">Host via 3DVista, Kuula, or your own server infrastructure for maximum control.</p>
              </div>
              <div className="text-center p-6 border rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Embedding Benefits</h3>
                <p className="text-sm text-muted-foreground">Seamlessly integrate tours in listings, emails, and social media for maximum exposure.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Buttons */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8">
              Find a Tour Pro Near You
            </Button>
            <Button variant="outline" size="lg" className="px-8">
              Become an Xplor Verified Tour Pro
            </Button>
          </div>
          <p className="text-muted-foreground mb-4">
            Encourage experts to join the Xplor network for increased exposure and bookings.
          </p>
        </div>

        {/* Compare Tour Providers */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-center mb-8">
              Which Virtual Tour Platform is Right for You?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button variant="outline" size="lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              3D Virtual Tour Company Ratings
            </Button>
          </CardContent>
        </Card>

        {/* Footer Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button variant="outline">
              📩 Contact
            </Button>
            <Button variant="outline">
              🧠 FAQ
            </Button>
          </div>
          <div className="p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Your space deserves to be explored.
            </h3>
            <p className="text-lg text-muted-foreground">
              Start your virtual tour journey today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}