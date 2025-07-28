import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Video, 
  Zap, 
  Smartphone,
  Monitor,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Package
} from "lucide-react";
import vrTechImage from "@/assets/vr-tech.jpg";

const VRCameras = () => {
  const cameraSpecs = [
    {
      name: "Matterport Pro3",
      price: "$5,995",
      image: "📷",
      specs: ["LiDAR Technology", "Indoor/Outdoor capture", "3D point cloud data", "E57 export capability"],
      useCases: ["Architecture & Construction", "Industrial documentation", "Large commercial spaces"],
      popular: true
    },
    {
      name: "Matterport Pro2",
      price: "$3,395",
      image: "📹",
      specs: ["Structured light technology", "4K photography", "Infrared depth sensor", "134MP resolution"],
      useCases: ["Real estate", "Hospitality", "Retail spaces"],
      popular: false
    },
    {
      name: "Ricoh Theta Z1",
      price: "$999",
      image: "🎥",
      specs: ["360° capture", "4K video recording", "Dual fisheye lenses", "Mobile app control"],
      useCases: ["Quick virtual tours", "Social media content", "Small residential spaces"],
      popular: false
    }
  ];

  const accessories = [
    { name: "Matterport Tripod", price: "$299", description: "Professional-grade stabilization for Pro3/Pro2" },
    { name: "Extra Battery Pack", price: "$149", description: "Extended capture sessions" },
    { name: "Carrying Case Pro", price: "$199", description: "Protective transport solution" },
    { name: "Lens Cleaning Kit", price: "$49", description: "Keep your camera pristine" }
  ];

  const contentCreationTools = [
    "Matterport Cloud Processing",
    "3D Showcase Platform",
    "MatterPak™ Bundle",
    "E57 Point Cloud Export",
    "SDK & API Access",
    "White-label Solutions"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto px-6 py-16">
          <div className="space-y-6">
            <div className="space-y-2">
              <Badge className="bg-xplor-yellow text-xplor-black font-medium">
                VR CAMERAS & EQUIPMENT
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Professional Matterport 3D cameras for digital twins.
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Capture precise 3D digital twins with Matterport's professional camera lineup. 
              From real estate to architecture, we have the perfect solution for creating immersive 3D experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                Shop Cameras
              </Button>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src={vrTechImage} 
              alt="Professional VR camera equipment"
              className="w-full h-auto rounded-lg shadow-medium"
            />
          </div>
        </div>
      </section>

      {/* Camera Lineup */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Matterport 3D Camera Lineup
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose from Matterport's range of professional 3D cameras designed for different capture needs and project scales.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {cameraSpecs.map((camera) => (
              <Card 
                key={camera.name} 
                className={`border-border relative ${camera.popular ? 'border-xplor-yellow shadow-lg' : ''}`}
              >
                {camera.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-xplor-yellow text-xplor-black">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <div className="text-6xl mb-4">{camera.image}</div>
                  <CardTitle className="text-2xl">{camera.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-xplor-yellow">
                    {camera.price}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Technical Specs:</h4>
                    {camera.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-muted-foreground">{spec}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Best For:</h4>
                    {camera.useCases.map((useCase, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-xplor-yellow" />
                        <span className="text-sm text-muted-foreground">{useCase}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${camera.popular ? 'bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black' : ''}`}
                    variant={camera.popular ? 'default' : 'outline'}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Content Creation Tools */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Complete content creation ecosystem.
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every VR camera purchase includes access to our comprehensive suite of content creation tools and platforms.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {contentCreationTools.map((tool, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{tool}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
                Learn More About Tools
              </Button>
            </div>
            
            <div className="space-y-6">
              <Card className="border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Video className="h-8 w-8 text-xplor-yellow" />
                  <div>
                    <h3 className="font-semibold text-foreground">360° Video Editor</h3>
                    <p className="text-sm text-muted-foreground">Professional editing suite</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Monitor className="h-8 w-8 text-xplor-yellow" />
                  <div>
                    <h3 className="font-semibold text-foreground">VR Viewer Platform</h3>
                    <p className="text-sm text-muted-foreground">Share and distribute content</p>
                  </div>
                </div>
              </Card>
              
              <Card className="border-border p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Zap className="h-8 w-8 text-xplor-yellow" />
                  <div>
                    <h3 className="font-semibold text-foreground">Live Streaming</h3>
                    <p className="text-sm text-muted-foreground">Real-time VR broadcasting</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Essential Accessories
            </h2>
            <p className="text-lg text-muted-foreground">
              Complete your VR camera setup with professional accessories.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((accessory) => (
              <Card key={accessory.name} className="border-border">
                <CardHeader className="text-center">
                  <Package className="h-12 w-12 text-xplor-yellow mx-auto mb-4" />
                  <CardTitle className="text-lg">{accessory.name}</CardTitle>
                  <CardDescription className="text-xl font-bold text-xplor-yellow">
                    {accessory.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {accessory.description}
                  </p>
                  <Button variant="outline" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to start creating VR content?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get started with our professional VR cameras and create immersive experiences that captivate your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-xplor-yellow hover:bg-xplor-yellow-light text-xplor-black">
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VRCameras;