import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, BookOpen, Heart, GraduationCap, Globe, Navigation, Check, X, AlertTriangle, Church, Scroll, DoorOpen } from "lucide-react";
import heritageWorshipHero from "@/assets/heritage-worship-hero.jpg";

export default function HeritageAndWorship() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heritageWorshipHero})`
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif">
            Preserve the Past. Inspire the Present. Share the Sacred — Virtually.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
            Xplor lets you showcase heritage sites, temples, mosques, churches, synagogues, and sacred landmarks 
            in a way that honors their beauty, spirit, and history — with multiple connected spaces, stories, 
            and details all in one immersive listing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-amber-700 hover:bg-amber-800 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              ➕ Add a Heritage Site or Place of Worship
            </Button>
          </div>
        </div>
      </section>

      {/* Why Xplor Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50/50 to-stone-50/50 dark:from-amber-950/20 dark:to-stone-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-serif">
            Why Xplor is Ideal for Heritage & Worship Spaces
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🕌 Multi-Space Virtual Journeys</h3>
                <p className="text-muted-foreground">
                  Link all areas of a site — from main sanctuaries to side chapels, courtyards, towers, 
                  or historical rooms — into one flowing tour.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🏛️ Preservation Through Immersion</h3>
                <p className="text-muted-foreground">
                  Digitally archive your heritage site or sacred space in high fidelity for global access, 
                  cultural education, and future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🕊️ Spiritual Experience with Context</h3>
                <p className="text-muted-foreground">
                  Add prayers, narrations, historical guides, inscriptions, and sacred teachings within 
                  the virtual space.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🎓 Educational & Accessible</h3>
                <p className="text-muted-foreground">
                  Ideal for students, researchers, and the general public unable to visit in person.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Globe className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🌐 Global Cultural Discovery</h3>
                <p className="text-muted-foreground">
                  Reach millions around the world interested in heritage, faith, history, and architecture.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 bg-white/80 dark:bg-card/80 backdrop-blur border-amber-100 dark:border-amber-900">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <Navigation className="w-8 h-8 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold">🧭 Respectful, Custom Navigation</h3>
                <p className="text-muted-foreground">
                  Choose guided paths, restricted areas, or story-driven flows that reflect the nature 
                  and values of your space.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-serif">
            Inspiration & Use Case Examples
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-amber-100 dark:border-amber-900">
              <div className="h-48 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30 flex items-center justify-center">
                <Church className="w-16 h-16 text-amber-700 dark:text-amber-400" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Cathedrals & Churches</h3>
                <p className="text-sm text-muted-foreground">
                  Showcase the nave, chapels, towers, crypts, organ loft, and historical displays.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-amber-100 dark:border-amber-900">
              <div className="h-48 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center">
                  <span className="text-2xl">🕌</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Mosques & Madrasas</h3>
                <p className="text-sm text-muted-foreground">
                  Tour courtyards, prayer halls, minarets, ablution areas, and Quranic schools.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-amber-100 dark:border-amber-900">
              <div className="h-48 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-rose-200 dark:bg-rose-800 flex items-center justify-center">
                  <span className="text-2xl">🏛️</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Temples, Shrines & Pagodas</h3>
                <p className="text-sm text-muted-foreground">
                  Display sacred statues, ritual paths, and seasonal events in immersive form.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-amber-100 dark:border-amber-900">
              <div className="h-48 bg-gradient-to-br from-stone-100 to-slate-100 dark:from-stone-900/30 dark:to-slate-900/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                  <span className="text-2xl">🏺</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">World Heritage Landmarks</h3>
                <p className="text-sm text-muted-foreground">
                  Digitally protect centuries-old ruins, tombs, libraries, and sacred mountains.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-stone-50/50 to-amber-50/50 dark:from-stone-950/20 dark:to-amber-950/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-serif">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <Scroll className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Create Your Listing</h3>
                <p className="text-muted-foreground">
                  Upload your site's story, architectural images, rituals, and accessibility information.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Add All Spaces</h3>
                <p className="text-muted-foreground">
                  Showcase connected areas — worship halls, courtyards, sacred objects, archives, side rooms — 
                  with guided navigation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center flex-shrink-0">
                <DoorOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Go Live on Xplor</h3>
                <p className="text-muted-foreground">
                  Share with visitors, worshipers, historians, and schools worldwide — with full control 
                  over visibility and flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12 font-serif">
            Platform Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white/80 dark:bg-card/80 backdrop-blur rounded-lg shadow-sm border border-amber-100 dark:border-amber-900">
              <thead>
                <tr className="border-b border-amber-100 dark:border-amber-900">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-center p-4 font-semibold">Xplor</th>
                  <th className="text-center p-4 font-semibold">Static Pages</th>
                  <th className="text-center p-4 font-semibold">Tourist Brochures</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-amber-50 dark:border-amber-950">
                  <td className="p-4">Multi-Zone Virtual Tour</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-amber-50 dark:border-amber-950">
                  <td className="p-4">Respectful Custom Flow</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-amber-50 dark:border-amber-950">
                  <td className="p-4">Multimedia & Guided Narration</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-amber-50 dark:border-amber-950">
                  <td className="p-4">Educational Access</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                </tr>
                <tr className="border-b border-amber-50 dark:border-amber-950">
                  <td className="p-4">Cultural Archiving</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4">Global Visibility</td>
                  <td className="text-center p-4"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  <td className="text-center p-4"><AlertTriangle className="w-5 h-5 text-yellow-500 mx-auto" /></td>
                  <td className="text-center p-4"><X className="w-5 h-5 text-red-500 mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50/50 to-stone-50/50 dark:from-amber-950/20 dark:to-stone-950/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-serif">
            Honor the Past. Guide the Future. Let the World Experience Your Sacred Site.
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            With Xplor, you can preserve your place of worship or heritage site and share it with the world 
            in a way that respects its history, meaning, and beauty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-amber-700 hover:bg-amber-800 text-white">
              📩 Contact the Xplor Team
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/20">
              ➕ Add a Heritage Site or Place of Worship
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}