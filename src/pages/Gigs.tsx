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
      title: "3D Scanning Specialist for Real Estate",
      description: "Looking for experienced Matterport photographer to capture luxury homes in the Bay Area. Must have Pro2 camera and experience with real estate photography.",
      budget: "$150 - $300 per scan",
      category: "Real Estate",
      skills: ["Matterport Pro2", "Real Estate", "Photography"],
      posted: "2 days ago",
      proposals: 12,
      image: gigWorkImage
    },
    {
      id: 2,
      title: "Virtual Tour Creation for Museums",
      description: "Create immersive virtual tours for art galleries and museums. Experience with Matterport Workshop and post-processing required.",
      budget: "$500 - $1,200 per project",
      category: "Cultural",
      skills: ["Matterport Workshop", "Virtual Tours", "Museums"],
      posted: "1 week ago",
      proposals: 8,
      image: vrTechImage
    },
    {
      id: 3,
      title: "Construction Progress Documentation",
      description: "Document construction progress using 3D scanning technology. Weekly scans required for large commercial project.",
      budget: "$200 - $400 per scan",
      category: "Construction",
      skills: ["Construction", "Progress Tracking", "3D Scanning"],
      posted: "3 days ago",
      proposals: 15,
      image: gigWorkImage
    },
    {
      id: 4,
      title: "VR Experience Development",
      description: "Create immersive VR experiences from Matterport scans for educational institutions. Unity and VR development experience required.",
      budget: "$2,000 - $5,000 per project",
      category: "Technology",
      skills: ["VR Development", "Unity", "Educational Content"],
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
            Find Your Perfect <span className="text-matterport-blue">3D Gig</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with clients who need professional 3D scanning, virtual tours, and Matterport expertise.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Real Estate</Button>
          <Button variant="outline" size="sm">Construction</Button>
          <Button variant="outline" size="sm">Cultural</Button>
          <Button variant="outline" size="sm">Technology</Button>
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
                <CardTitle className="text-lg group-hover:text-matterport-blue transition-colors">
                  {gig.title}
                </CardTitle>
                <CardDescription className="text-sm">
                  {gig.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-matterport-blue">{gig.budget}</span>
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
                  <Button size="sm" className="bg-matterport-blue hover:bg-matterport-blue/90">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-accent/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Your 3D Career?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of professionals earning with their Matterport skills
          </p>
          <Button size="lg" className="bg-matterport-blue hover:bg-matterport-blue/90">
            Create Your Profile
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gigs;