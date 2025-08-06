import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, School, Globe, BookOpen, DollarSign, FlaskConical, Shield, Upload, MessageSquare, Users, Star } from 'lucide-react';
import educationSchoolsHero from '@/assets/education-schools-hero.jpg';

const EducationAndSchools = () => {
  return (
    <>
      <Helmet>
        <title>Xplor for Schools & Education – The Best Virtual Tour Platform for Academic Institutions</title>
        <meta 
          name="description" 
          content="Showcase your school or university on Xplor with immersive virtual tours. Reach global families, increase enrollment, and present your learning environment like never before." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={educationSchoolsHero}
              alt="Modern educational institution"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-teal-900/70"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium text-white mb-8">
                <Star className="w-4 h-4 mr-2" />
                Trusted by Leading Institutions Worldwide
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                Showcase Your School to the World — 
                <span className="text-blue-200"> Virtually</span>
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed">
                From international schools to elite universities, Xplor connects your institution to parents, 
                students, and educators everywhere through immersive, interactive tours.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  Create Your School Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Eye className="mr-2 h-5 w-5" />
                  See a Live Example
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
                Why Xplor is the #1 Choice for Schools & Education
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Transform how families discover and experience your educational environment
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <School className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Campus Tours Anywhere</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Let families explore classrooms, dorms, labs, sports facilities, and more — from any device.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <CardTitle className="text-xl">Global Reach</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Ideal for international schools and universities attracting students from abroad.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Academic Integration</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Embed curriculum highlights, subject videos, faculty bios, and student testimonials.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Drive Enrollment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Turn views into visits — link to inquiry forms, admissions portals, and scholarship applications.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FlaskConical className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-xl">STEM, Arts & Labs</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Showcase your facilities, equipment, and innovation hubs in immersive 360° detail.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <CardTitle className="text-xl">Secure & Controlled Access</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base">
                    Control visibility by department, password-protect private areas, or allow full open access.
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
                Get your school online in three simple steps
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  1. Upload Your School Tour
                </h3>
                <p className="text-lg text-muted-foreground">
                  Create a virtual experience of your school using VR walkthroughs or 360° media.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  2. Tell Your Story
                </h3>
                <p className="text-lg text-muted-foreground">
                  Add key details — programs, activities, culture, and what makes your school unique.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  3. Reach Future Students
                </h3>
                <p className="text-lg text-muted-foreground">
                  Share with families, agents, and communities around the world — instantly.
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
                Success Stories from Leading Institutions
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "Xplor helped us attract boarders from over 20 countries. Virtual tours became our most powerful recruitment tool."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — International School Administrator
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "Our rural district used Xplor to showcase our new STEM labs, increasing enrollment by 40%."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — District Superintendent
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-background/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <blockquote className="text-lg text-muted-foreground mb-6 italic">
                    "Virtual tours are now integral to our digital admissions process. We've seen a 60% increase in qualified applications."
                  </blockquote>
                  <div className="text-sm font-medium text-foreground">
                    — University Admissions Director
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-8">
                Trusted by Accredited Institutions Worldwide
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                <div className="text-center">
                  <div className="text-sm font-medium">International Baccalaureate</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">Cognia Accredited</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">NEASC Member</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">Ofsted Rated</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-8">
                Transform the Way the World Sees Your School
              </h2>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-12">
                Join the leading platform for immersive education discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="text-lg px-8 py-4">
                  Start Your Tour
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Talk to the Xplor Education Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EducationAndSchools;