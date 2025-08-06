import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Users, 
  Trophy, 
  Globe, 
  TrendingUp, 
  Puzzle,
  Mail,
  Plus,
  Check,
  X,
  AlertTriangle
} from "lucide-react";

const GolfCourses = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-emerald-700/80 flex items-center justify-center">
            <div className="text-center text-white/60 font-medium">
              Golf Course Flyover Video Background
            </div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Showcase Your Golf Course Like Never Before — 
            <span className="text-emerald-300">Hole by Hole</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Give players, members, and event planners a complete walkthrough of your course, clubhouse, and every amenity — all in one immersive, multi-space Xplor listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-800 hover:bg-white/90 px-8 py-4 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" />
              Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-800 px-8 py-4 text-lg font-semibold">
              <Plus className="mr-2 h-5 w-5" />
              Add Your Golf Course
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Xplor Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose Xplor for Golf Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The complete platform for showcasing every aspect of your golf destination
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Hole-by-Hole Virtual Tours</h3>
              <p className="text-muted-foreground">
                Show every tee, fairway, bunker, and green in 360° clarity.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Puzzle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Multi-Space Listing System</h3>
              <p className="text-muted-foreground">
                Seamlessly connect the entire experience — course, clubhouse, locker rooms, spa, restaurants, and pro shop.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Perfect for Events & Sponsors</h3>
              <p className="text-muted-foreground">
                Help organizers and partners pre-visualize your venue for tournaments and corporate days.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">For Golf Communities</h3>
              <p className="text-muted-foreground">
                Link course listings to adjacent villas, apartments, and amenities.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Increase Membership & Bookings</h3>
              <p className="text-muted-foreground">
                Boost engagement with interactive content that converts curiosity into visits.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Global Discovery on Xplor</h3>
              <p className="text-muted-foreground">
                Be part of a searchable, immersive directory trusted by travelers, agents, and golfers worldwide.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Case Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Perfect for Every Type of Golf Destination
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                <span className="text-white font-medium">Private Club Experience</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Private Clubs</h3>
                <p className="text-muted-foreground">
                  Highlight the member lifestyle: from the front gate to the 18th green.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                <span className="text-white font-medium">Resort & Destination</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Golf Resorts & Destinations</h3>
                <p className="text-muted-foreground">
                  Market to tourists, agents, and planners with a complete tour of both course and hospitality.
                </p>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center">
                <span className="text-white font-medium">Championship Venue</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">Championship Venues</h3>
                <p className="text-muted-foreground">
                  Present your course to tournament organizers and sponsors at a professional level.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get your golf course live on Xplor in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Upload Your Golf Course</h3>
              <p className="text-muted-foreground">
                Submit your 360° media, drone content, and details.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Add All Spaces to One Listing</h3>
              <p className="text-muted-foreground">
                Create a seamless virtual experience linking every hole and facility.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-emerald-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Go Live on Xplor</h3>
              <p className="text-muted-foreground">
                Share your tour with a global audience — no app download required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Xplor vs Traditional Methods
            </h2>
          </div>
          
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold text-emerald-600">Xplor</th>
                    <th className="text-center p-4 font-semibold">Static Websites</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Hole-by-Hole Tours</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Clubhouse + Facilities Tour</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Multi-Space Integration</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Mobile/VR Friendly</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Lead Capture Enabled</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Appears in Global Directory</td>
                    <td className="text-center p-4"><Check className="h-5 w-5 text-emerald-600 mx-auto" /></td>
                    <td className="text-center p-4"><X className="h-5 w-5 text-red-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Let Golfers Explore Before They Even Arrive?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Xplor is the only platform that allows complete, immersive, multi-space golf course experiences — in one listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 px-8 py-4 text-lg font-semibold">
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 text-lg font-semibold">
              <Plus className="mr-2 h-5 w-5" />
              Add Your Golf Course
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GolfCourses;