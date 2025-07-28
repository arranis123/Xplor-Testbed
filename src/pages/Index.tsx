import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import adventureParkImage from "@/assets/adventure-park-hero.jpg";
import scanningHeroImage from "@/assets/3d-scanning-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={scanningHeroImage} 
              alt="3D Scanning Technology"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/60"></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Digitize the Built World
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              The most realistic 3D platform to change how people interact with buildings online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-matterport-blue hover:bg-matterport-blue/90 text-lg px-8 py-3">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary">
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Everything you need to create and share
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                From capture to creation, manage your entire 3D workflow in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-matterport-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-matterport-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <CardTitle>Capture</CardTitle>
                  <CardDescription>
                    Easily capture 3D spaces with our professional cameras and mobile app
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-matterport-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-matterport-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <CardTitle>Create</CardTitle>
                  <CardDescription>
                    Transform your scans into immersive virtual experiences with Workshop
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center hover:shadow-medium transition-all duration-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-matterport-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-matterport-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </div>
                  <CardTitle>Share</CardTitle>
                  <CardDescription>
                    Share and collaborate on your 3D models with teams and clients
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Gigs CTA Section */}
        <section className="py-20 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">
                  Earn with Your 3D Skills
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join our marketplace and connect with clients who need professional 3D scanning, 
                  virtual tours, and Matterport expertise. From real estate to construction, 
                  find gigs that match your skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/gigs">
                    <Button size="lg" className="bg-matterport-blue hover:bg-matterport-blue/90">
                      Browse Gigs
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={adventureParkImage} 
                  alt="Professional 3D Scanning"
                  className="rounded-lg shadow-medium w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-matterport-blue mb-2">10M+</div>
                <div className="text-muted-foreground">Spaces Scanned</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-matterport-blue mb-2">150+</div>
                <div className="text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-matterport-blue mb-2">5B+</div>
                <div className="text-muted-foreground">Square Feet Digitized</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-matterport-blue mb-2">99%</div>
                <div className="text-muted-foreground">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
