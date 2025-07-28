import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gigWorkImage from "@/assets/gig-work.jpg";
import vrTechImage from "@/assets/vr-tech.jpg";

const Gigs = () => {
  const gigs = [
    {
      id: 1,
      title: "Adventure Tour Guide for Tropical Expeditions",
      description: "Looking for experienced adventure guide to lead eco-tours through tropical rainforests. Must have wilderness first aid certification and experience with group leadership.",
      budget: "$200 - $400 per day",
      category: "Adventure Tourism",
      skills: ["Tour Guiding", "Wilderness First Aid", "Group Leadership"],
      posted: "2 days ago",
      proposals: 12,
      image: gigWorkImage
    },
    {
      id: 2,
      title: "Cultural Experience Coordinator",
      description: "Create immersive cultural experiences for international visitors. Experience with local traditions and multilingual communication required.",
      budget: "$300 - $600 per experience",
      category: "Cultural Tourism",
      skills: ["Cultural Knowledge", "Languages", "Event Planning"],
      posted: "1 week ago",
      proposals: 8,
      image: vrTechImage
    },
    {
      id: 3,
      title: "Extreme Sports Instructor",
      description: "Teach and guide extreme sports activities including zip-lining, rappelling, and rock climbing. Safety certification and insurance required.",
      budget: "$150 - $350 per session",
      category: "Extreme Sports",
      skills: ["Safety Certification", "Rock Climbing", "Instruction"],
      posted: "3 days ago",
      proposals: 15,
      image: gigWorkImage
    },
    {
      id: 4,
      title: "Photography & Videography for Adventures",
      description: "Capture stunning visuals of adventure experiences for marketing and social media. Drone operation and underwater filming experience preferred.",
      budget: "$400 - $800 per project",
      category: "Content Creation",
      skills: ["Photography", "Videography", "Drone Operation"],
      posted: "5 days ago",
      proposals: 6,
      image: vrTechImage
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Find Your Perfect <span className="text-xplor-orange">Adventure Gig</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with clients who need adventure guides, tour operators, and experience creators.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Adventure Tourism</Button>
          <Button variant="outline" size="sm">Cultural Tourism</Button>
          <Button variant="outline" size="sm">Extreme Sports</Button>
          <Button variant="outline" size="sm">Content Creation</Button>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {gigs.map((gig) => (
            <Card key={gig.id} className="hover:shadow-medium transition-all duration-200 cursor-pointer group">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img 
                  src={gig.image} 
                  alt={gig.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-background/90 backdrop-blur"
                >
                  {gig.category}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-xplor-orange transition-colors">
                  {gig.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {gig.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-xplor-blue">{gig.budget}</span>
                  <span className="text-sm text-muted-foreground">{gig.posted}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {gig.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-sm text-muted-foreground">
                    {gig.proposals} proposals
                  </span>
                  <Button size="sm" className="bg-xplor-orange hover:bg-xplor-orange-light">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-card rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Adventure Career?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of professionals earning with their adventure and tourism skills
          </p>
          <Button size="lg" className="bg-xplor-orange hover:bg-xplor-orange-light">
            Create Your Profile
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gigs;