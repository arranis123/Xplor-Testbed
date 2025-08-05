import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, Users, DollarSign, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  yachtName: z.string().min(1, 'Please select or enter a yacht name'),
  role: z.string().min(1, 'Please select your role onboard'),
  socialMedia: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  proofDocument: z.any().optional(),
  isActiveCrew: z.boolean().refine((val) => val === true, {
    message: 'You must confirm you are currently active crew',
  }),
});

type FormData = z.infer<typeof formSchema>;

const FairShareCrew = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      yachtName: '',
      role: '',
      socialMedia: '',
      isActiveCrew: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log('Form data:', data);
      toast.success('Application submitted successfully!');
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    }
  };

  const scrollToForm = () => {
    document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isSubmitted && !showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold">Thanks for joining!</CardTitle>
            <CardDescription className="text-lg">
              You'll hear from us once your status is verified. You're now in the FairShare system.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button onClick={() => setShowDashboard(true)} className="w-full">
              View Dashboard
            </Button>
            <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4">
        <Helmet>
          <title>FairShare Crew Dashboard - Xplor</title>
        </Helmet>
        
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">FairShare Crew Dashboard</h1>
            <p className="text-muted-foreground">Track your status and eligibility</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Yacht(s) Linked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium">Lady Sarah</p>
                    <p className="text-sm text-muted-foreground">Captain</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Awaiting Verification</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  We're reviewing your documents and yacht affiliation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Estimated Payout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">$0</p>
                <p className="text-xs text-muted-foreground">
                  Will update when charters are completed
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invite Other Crew</CardTitle>
              <CardDescription>
                Help your crewmates join FairShare and maximize everyone's earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input 
                  value="https://xplor.io/fairshare-crew?ref=ABC123" 
                  readOnly 
                  className="flex-1"
                />
                <Button onClick={() => {
                  navigator.clipboard.writeText('https://xplor.io/fairshare-crew?ref=ABC123');
                  toast.success('Referral link copied!');
                }}>
                  Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button variant="outline" onClick={() => setShowDashboard(false)}>
              Back to Main Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Join FairShare Crew - Get Your Fair Share of Charter Commission | Xplor</title>
        <meta name="description" content="Join FairShare Crew and earn 50% of charter commission equally among crew. No upload needed, just be active crew on a yacht listed for charter with Xplor." />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Get Your Fair Share of the Charter Commission
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            If you're active crew on a yacht listed for charter with Xplor — we'll split 50% of our net commission equally among the crew.
          </p>
          <Button size="lg" onClick={scrollToForm} className="text-lg px-8 py-6">
            Join FairShare Crew
          </Button>
        </div>
      </section>

      {/* Explainer Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">No Upload Needed. Just Be Crew.</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              You don't need to upload a tour or manage listings. If you're active crew on a yacht that's chartered through Xplor — either as central agent or 3rd-party broker — you're eligible for an equal payout of 50% of the commission we earn.
            </p>
          </div>

          {/* 3-step diagram */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>1. Sign up and verify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete our simple form and upload proof of your crew status.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>2. Yacht gets chartered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your yacht receives charter bookings through Xplor's platform.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>3. You get paid (equally, with the crew)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive your fair share of 50% of the commission, split equally among verified crew.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup-form" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Join FairShare Crew</CardTitle>
              <CardDescription className="text-center">
                Complete the form below to get started with FairShare commission sharing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yachtName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yacht Name *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your yacht or choose 'Not Listed Yet'" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="lady-sarah">Lady Sarah</SelectItem>
                            <SelectItem value="ocean-dream">Ocean Dream</SelectItem>
                            <SelectItem value="azure-pearl">Azure Pearl</SelectItem>
                            <SelectItem value="not-listed">Not Listed Yet</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Onboard *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="captain">Captain</SelectItem>
                            <SelectItem value="chief-stew">Chief Stew</SelectItem>
                            <SelectItem value="chef">Chef</SelectItem>
                            <SelectItem value="deckhand">Deckhand</SelectItem>
                            <SelectItem value="engineer">Engineer</SelectItem>
                            <SelectItem value="stew">Stew</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="socialMedia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram / LinkedIn (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/username or LinkedIn profile" {...field} />
                        </FormControl>
                        <FormDescription>
                          Helps us verify your identity and crew status.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="proofDocument"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Proof of Employment *</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                            <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Upload contract, crew ID, payslip, or other proof
                            </p>
                            <Button type="button" variant="outline">
                              Choose File
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Accepted formats: PDF, JPG, PNG (max 10MB)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isActiveCrew"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I am currently active crew on this yacht *
                          </FormLabel>
                          <FormDescription>
                            You must be currently employed as active crew to be eligible.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg">
                    Join FairShare Crew
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Legal/Compliance */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            <strong>Disclaimer:</strong> Eligibility for payout is subject to verification of crew status and actual charter commission being earned by Xplor. All commissions are calculated based on net amounts received.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="text-primary hover:underline">FairShare Terms (PDF)</a>
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="text-primary hover:underline">Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FairShareCrew;