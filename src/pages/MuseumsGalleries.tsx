import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, Globe, BookOpen, DollarSign, Search, TrendingUp, Upload, Zap, Users } from 'lucide-react';
import museumsGalleriesHero from '@/assets/museums-galleries-hero.jpg';

const MuseumsGalleries = () => {
  return (
    <>
      <Helmet>
        <title>Xplor for Museums & Art Galleries – The World's Leading Virtual Exhibition Platform</title>
        <meta 
          name="description" 
          content="Xplor helps museums and art galleries bring their exhibitions to life online with immersive VR tours, global reach, and monetization tools." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={museumsGalleriesHero}
              alt="Elegant art gallery with exhibitions"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-800/60 to-gray-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Showcase Your Museum or Gallery to the World — 
                <span className="text-purple-200"> Virtually</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed">
                Xplor is the world's most advanced platform for immersive cultural experiences. 
                Elevate your exhibitions, reach global audiences, and preserve your collections in a whole new dimension.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Eye className="mr-2 h-5 w-5" />
                  View Demo Tour
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Xplor Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Why Xplor is the Best for Museums & Galleries
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform how the world experiences culture with cutting-edge virtual reality technology
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Immersive VR Tours</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Full 360° walkthroughs with embedded content, curatorial notes, and audio guides.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Global Reach</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Broadcast your exhibitions to a worldwide audience—accessible anytime, anywhere.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Educational Tools</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Perfect for field trips, school groups, and university-level learning.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Monetization-Ready</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Sell tickets, promote events, collect donations, and link directly to your shop.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Deep Artwork Integration</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Link pieces to catalogues, archives, provenance history, and media.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Data & Insights</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Understand what visitors explore most and track interest in real time.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                How It Works
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get your museum or gallery online in three simple steps
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-10 w-10 text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  1. List Your Museum or Gallery
                </h3>
                <p className="text-lg text-muted-foreground">
                  Upload tours, images, collection info, and your story.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-10 w-10 text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  2. Go Live on Xplor
                </h3>
                <p className="text-lg text-muted-foreground">
                  Reach an audience of global culture lovers, educators, and collectors.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  3. Grow and Engage
                </h3>
                <p className="text-lg text-muted-foreground">
                  Update content, promote new shows, and drive real-world visits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Trusted by Cultural Institutions Worldwide
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "Xplor helped us increase virtual attendance by 300% during our contemporary art exhibition."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — Modern Art Museum Director
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "Virtual previews on Xplor led to our fastest-selling gallery opening ever."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — Contemporary Gallery Owner
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "My students can now visit world-class museums from our classroom. It's revolutionary."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — Art History Professor
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Ready to Take Your Gallery Global?
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12">
                Join the cultural revolution. It takes just minutes to list your space.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  List My Museum or Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Talk to a Specialist
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MuseumsGalleries;