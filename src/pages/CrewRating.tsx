import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { YCIScoringForm } from '@/components/YCIScoringForm';
import { Compass, Target, BarChart3, Award, Calculator, Briefcase } from 'lucide-react';

const CrewRating = () => {
  const categoryWeights = [
    { category: "Experience & Longevity", maxPoints: 25, weight: "25%" },
    { category: "Qualifications & Training", maxPoints: 20, weight: "20%" },
    { category: "Charter Performance", maxPoints: 15, weight: "15%" },
    { category: "Career Progression", maxPoints: 10, weight: "10%" },
    { category: "Skills & Languages", maxPoints: 10, weight: "10%" },
    { category: "Xplor Contributions", maxPoints: 10, weight: "10%" },
    { category: "Professional Standing", maxPoints: 5, weight: "5%" },
    { category: "Yacht Loyalty (Avg. Time)", maxPoints: 5, weight: "5%" },
    { category: "Global Navigation Experience", maxPoints: "10 Bonus", weight: "–" },
  ];

  const badgeLevels = [
    { score: "90–100", badge: "Platinum Crew", color: "bg-slate-800 text-white" },
    { score: "75–89.9", badge: "Gold Crew", color: "bg-yellow-500 text-black" },
    { score: "60–74.9", badge: "Silver Crew", color: "bg-slate-400 text-black" },
    { score: "Below 60", badge: "Bronze Crew", color: "bg-amber-600 text-white" },
  ];

  const scoringFactors = [
    {
      icon: "⏳",
      title: "1. Experience & Longevity",
      description: "Years in yachting, Sea miles logged, Number of contracts"
    },
    {
      icon: "🧾",
      title: "2. Qualifications & Training",
      description: "STCW, ENG1, Yachtmaster, etc., Specialized training (AV/IT, Dive, Beauty)"
    },
    {
      icon: "🚤",
      title: "3. Charter Performance",
      description: "Total charters, Tips per charter (avg), Repeat guest trips"
    },
    {
      icon: "📈",
      title: "4. Career Progression",
      description: "Promotions achieved, Cross-departmental experience"
    },
    {
      icon: "🧰",
      title: "5. Skills & Languages",
      description: "Fluent languages, Guest service/medical/technical specialties"
    },
    {
      icon: "🌐",
      title: "6. Xplor Contributions",
      description: "Yachts referred to platform, Verified crew referred, Profile updates, Event participation"
    },
    {
      icon: "🧾",
      title: "7. Professional Standing",
      description: "Written references, Clean record"
    },
    {
      icon: "⛵",
      title: "8. Yacht Loyalty",
      description: "Average years per yacht, Return employment"
    },
    {
      icon: "🌍",
      title: "9. Global Navigation Experience (Bonus)",
      description: "Atlantic crossings, Regions cruised: Med, Caribbean, Indian Ocean, etc., Canal transits: Panama, Suez, Corinth"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Yacht Crew Rating System | Xplor</title>
        <meta name="description" content="Calculate your YCI+ score based on your yachting experience, training, and contributions. Join the top-performing crew worldwide with Xplor." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Compass className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Yacht Crew Rating System (YCI+)
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            Welcome to the Yacht Crew Index Plus (YCI+)
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Xplor, we've developed the YCI+ — a global yacht crew rating system inspired by professional player ratings in sports.
            It's fair, objective, and transparent, based entirely on tangible, non-subjective data from your yachting career.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">What Is YCI+?</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The YCI+ is scored out of 100 points. It evaluates your career performance across 9 objective categories, 
              with each category weighted according to its impact.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Category Weights</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Max Points</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categoryWeights.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.maxPoints}</TableCell>
                      <TableCell>{item.weight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Objective Scoring Factors */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Fixed, Measurable Criteria</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scoringFactors.map((factor, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{factor.icon}</span>
                    <span className="text-sm">{factor.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{factor.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Badge System */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Crew Badge Levels</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {badgeLevels.map((level, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold mb-1">YCI+ Score: {level.score}</p>
                    </div>
                    <Badge className={level.color}>
                      {level.badge}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-muted-foreground mt-8">
            Badges are automatically assigned and can be displayed on your public Xplor profile.
          </p>
        </div>
      </section>

      {/* Try It Yourself Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Calculate Your Score</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Use the form below to enter your verified experience and achievements.<br />
              Your YCI+ score and badge will appear instantly.
            </p>
          </div>

          <YCIScoringForm />
        </div>
      </section>

      {/* Why This Matters */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Briefcase className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">Why We Built This</h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            In yachting, reputation is everything — but reputation must be supported by evidence.<br />
            YCI+ helps owners, charter guests, and fellow crew identify high-performing professionals.<br />
            It's designed to reward loyalty, skill, effort, and network building.
          </p>
        </div>
      </section>

      {/* Join the Xplor Network */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Join the Xplor Network</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <a href="/fairshare-crew">Become a Verified Crew Member</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
              <a href="/yacht-brokerage">Refer a Yacht or Crew Member</a>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <a href="/fairshare">Learn About FairShare Commissions</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CrewRating;