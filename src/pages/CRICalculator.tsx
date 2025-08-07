import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { Calculator, Download, Edit, Trophy, AlertTriangle, ChevronDown, Ship, Award, Users, TrendingUp, Share2, CheckCircle, Globe, Star, Zap } from 'lucide-react';

// Enhanced schema for comprehensive CRI+ calculation
const criFormSchema = z.object({
  // Yacht History
  yachts: z.array(z.object({
    name: z.string().optional(),
    position: z.string(),
    grtCategory: z.enum(['<200', '<500', '<3000']),
    charterType: z.enum(['charter', 'private']),
    crewSize: z.string().optional(),
    timeServed: z.string(),
    employmentType: z.enum(['full-time', 'temp', 'rotational']),
  })).optional(),
  
  // Qualifications
  qualifications: z.object({
    coc: z.string().optional(),
    stcw: z.boolean().optional(),
    eng1: z.boolean().optional(),
    yachtmaster: z.boolean().optional(),
    edh: z.boolean().optional(),
    aec: z.boolean().optional(),
    helm: z.boolean().optional(),
    flagEndorsements: z.array(z.string()).optional(),
  }).optional(),
  
  // Navigation
  navigation: z.object({
    zones: z.array(z.string()).optional(),
    seaMiles: z.string().optional(),
    chartersCompleted: z.string().optional(),
  }).optional(),
  
  // Readiness
  readiness: z.object({
    certValid: z.boolean().optional(),
    dualPassport: z.boolean().optional(),
    quickDeploy: z.boolean().optional(),
    vaccinations: z.boolean().optional(),
  }).optional(),
  
  // Engagement
  engagement: z.object({
    yachtTour: z.boolean().optional(),
    yachtMedia: z.string().optional(),
    monthlyUpdates: z.boolean().optional(),
    stories: z.string().optional(),
    faqHelp: z.string().optional(),
    completeFields: z.boolean().optional(),
    quickResponse: z.boolean().optional(),
    videoContent: z.string().optional(),
  }).optional(),
  
  // Social & Community
  social: z.object({
    socialShares: z.array(z.string()).optional(),
    crewReferrals: z.string().optional(),
    ownerReferrals: z.string().optional(),
    livestreams: z.boolean().optional(),
    interviews: z.boolean().optional(),
  }).optional(),
  
  // Charter Success
  charter: z.object({
    chartersCompleted: z.string().optional(),
    fiveStarReviews: z.string().optional(),
    repeatGuests: z.string().optional(),
    namedInReviews: z.string().optional(),
  }).optional(),
  
  // Training & Badges
  training: z.object({
    onboardingComplete: z.boolean().optional(),
    webinarsAttended: z.string().optional(),
    verifiedBadges: z.array(z.string()).optional(),
    crewOfMonth: z.boolean().optional(),
  }).optional(),
});

type CRIFormData = z.infer<typeof criFormSchema>;

interface CRIScoreBreakdown {
  professional: number; // 50 max
  engagement: number; // 30 max
  charter: number; // 25 max
  training: number; // 10 max
  penalties: number; // up to -30
  total: number;
}

interface CrewTier {
  name: string;
  range: string;
  benefits: string;
  color: string;
  bgColor: string;
}

interface CrewData {
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    position?: string;
    yachtLength?: string;
  };
  experience?: Array<{
    position: string;
    yachtSize: string;
    duration: string;
  }>;
  qualifications?: Array<{
    name: string;
    issueDate: string;
    expiryDate: string;
  }>;
  navigation?: {
    seasNavigated?: string[];
    charterParticipation?: string;
  };
  availability?: {
    deploymentReadiness?: string;
    medicalStatus?: string;
  };
}

const navigationZones = [
  "Atlantic Crossing", "Mediterranean", "Red Sea", "Indian Ocean", 
  "Pacific", "Polar", "Asia", "Panama Canal", "Suez Canal", "Caribbean"
];

const socialPlatforms = [
  "Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube", "Twitter"
];

const verifiedBadges = [
  "Officer of the Watch", "Chief Engineer", "Head Chef", "Chief Steward(ess)", 
  "Bosun", "Safety Officer", "Environmental Officer"
];

const crewTiers: CrewTier[] = [
  { name: "Standard", range: "0-30", benefits: "Basic visibility", color: "text-gray-600", bgColor: "bg-gray-100" },
  { name: "Active Crew", range: "31-60", benefits: "Boosted search results", color: "text-blue-600", bgColor: "bg-blue-100" },
  { name: "Top Contributor", range: "61-90", benefits: "Featured placement, badge eligibility", color: "text-emerald-600", bgColor: "bg-emerald-100" },
  { name: "Elite Crew", range: "91-100+", benefits: "Elite badge, platform recognition, perks", color: "text-purple-600", bgColor: "bg-purple-100" }
];

export default function CRICalculator() {
  const [crewData, setCrewData] = useState<CrewData>({});
  const [criScore, setCriScore] = useState<CRIScoreBreakdown>({
    professional: 0,
    engagement: 0,
    charter: 0,
    training: 0,
    penalties: 0,
    total: 0
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    penalties: false
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const form = useForm<CRIFormData>({
    resolver: zodResolver(criFormSchema),
    defaultValues: {
      qualifications: {},
      navigation: { zones: [] },
      readiness: {},
      engagement: {},
      social: { socialShares: [] },
      charter: {},
      training: { verifiedBadges: [] },
    }
  });

  // Load crew data from location state and auto-populate form
  useEffect(() => {
    if (location.state?.crewData) {
      const fairshareData = location.state.crewData;
      setCrewData(fairshareData);
      
      // Auto-populate form with available data from FairShare
      const zones = [];
      if (fairshareData.atlanticCrossings > 0) zones.push("Atlantic Crossing");
      if (fairshareData.mediterraneanCrossings > 0) zones.push("Mediterranean");  
      if (fairshareData.indianCrossings > 0) zones.push("Indian Ocean");
      if (fairshareData.pacificCrossings > 0) zones.push("Pacific");
      if (fairshareData.suezTransits > 0) zones.push("Suez Canal");
      if (fairshareData.panamaTransits > 0) zones.push("Panama Canal");
      if (fairshareData.corinthTransits > 0) zones.push("Red Sea");
      
      // Auto-populate yacht history if available
      const yachtHistory = [];
      if (fairshareData.currentVessel && fairshareData.positionAppliedFor) {
        yachtHistory.push({
          name: fairshareData.currentVessel,
          position: fairshareData.positionAppliedFor,
          grtCategory: fairshareData.yachtSizeCategory?.includes("200") ? "<200" :
                      fairshareData.yachtSizeCategory?.includes("500") ? "<500" : "<3000",
          charterType: "charter" as const,
          crewSize: "10-20",
          timeServed: fairshareData.longevityLastYacht?.toString() || "12",
          employmentType: "full-time" as const
        });
      }
      
      // Update form with auto-populated data
      form.reset({
        yachts: yachtHistory,
        qualifications: {
          coc: fairshareData.primaryCoC,
          stcw: true,
          eng1: true,
        },
        navigation: {
          zones: zones,
          seaMiles: fairshareData.seaMilesLogged?.toString(),
          chartersCompleted: "0"
        },
        readiness: {
          certValid: true,
          dualPassport: false,
          quickDeploy: true,
          vaccinations: true
        },
        engagement: {},
        social: { socialShares: [] },
        charter: {},
        training: { verifiedBadges: [] }
      });
      
      toast({
        title: "Data Imported Successfully",
        description: "Your FairShare profile data has been imported. Complete additional fields to improve your CRI+ score.",
      });
    }
  }, [location.state, form]);

  // Calculate comprehensive CRI+ score
  const calculateCRIScore = (crew: CrewData, formData: CRIFormData): CRIScoreBreakdown => {
    const score: CRIScoreBreakdown = {
      professional: 0,
      engagement: 0,
      charter: 0,
      training: 0,
      penalties: 0,
      total: 0
    };

    // Professional/Qualifications (50 max)
    let professionalScore = 0;
    
    // Experience points (20 max)
    if (crew.experience?.length) {
      professionalScore += Math.min(crew.experience.length * 2, 10);
    }
    
    // Qualifications points (15 max)
    if (formData.qualifications?.coc) professionalScore += 5;
    if (formData.qualifications?.stcw) professionalScore += 3;
    if (formData.qualifications?.yachtmaster) professionalScore += 4;
    if (formData.qualifications?.eng1) professionalScore += 3;
    
    // Navigation zones (10 max)
    if (formData.navigation?.zones?.length) {
      professionalScore += Math.min(formData.navigation.zones.length * 1, 10);
    }
    
    // Readiness (5 max)
    if (formData.readiness?.certValid) professionalScore += 1;
    if (formData.readiness?.dualPassport) professionalScore += 1;
    if (formData.readiness?.quickDeploy) professionalScore += 2;
    if (formData.readiness?.vaccinations) professionalScore += 1;
    
    score.professional = Math.min(professionalScore, 50);

    // Engagement & Content (30 max)
    let engagementScore = 0;
    
    if (formData.engagement?.yachtTour) engagementScore += 5;
    if (formData.engagement?.yachtMedia) engagementScore += Math.min(parseInt(formData.engagement.yachtMedia) * 2, 6);
    if (formData.engagement?.monthlyUpdates) engagementScore += 5;
    if (formData.engagement?.stories) engagementScore += Math.min(parseInt(formData.engagement.stories) * 2, 10);
    if (formData.engagement?.faqHelp) engagementScore += Math.min(parseInt(formData.engagement.faqHelp) * 1, 5);
    if (formData.engagement?.completeFields) engagementScore += 5;
    if (formData.engagement?.quickResponse) engagementScore += 3;
    if (formData.engagement?.videoContent) engagementScore += Math.min(parseInt(formData.engagement.videoContent) * 2, 6);
    
    // Social & Community points
    if (formData.social?.socialShares?.length) {
      engagementScore += Math.min(formData.social.socialShares.length * 2, 12);
    }
    if (formData.social?.crewReferrals) engagementScore += Math.min(parseInt(formData.social.crewReferrals) * 1, 5);
    if (formData.social?.ownerReferrals) engagementScore += Math.min(parseInt(formData.social.ownerReferrals) * 3, 9);
    if (formData.social?.livestreams) engagementScore += 3;
    if (formData.social?.interviews) engagementScore += 3;
    
    score.engagement = Math.min(engagementScore, 30);

    // Charter Success (25 max)
    let charterScore = 0;
    
    if (formData.charter?.chartersCompleted) {
      charterScore += Math.min(parseInt(formData.charter.chartersCompleted) * 5, 15);
    }
    if (formData.charter?.fiveStarReviews) {
      charterScore += Math.min(parseInt(formData.charter.fiveStarReviews) * 3, 9);
    }
    if (formData.charter?.repeatGuests) {
      charterScore += Math.min(parseInt(formData.charter.repeatGuests) * 2, 6);
    }
    if (formData.charter?.namedInReviews) {
      charterScore += Math.min(parseInt(formData.charter.namedInReviews) * 2, 4);
    }
    
    score.charter = Math.min(charterScore, 25);

    // Training & Badges (10 max)
    let trainingScore = 0;
    
    if (formData.training?.onboardingComplete) trainingScore += 2;
    if (formData.training?.webinarsAttended) {
      trainingScore += Math.min(parseInt(formData.training.webinarsAttended) * 1, 3);
    }
    if (formData.training?.verifiedBadges?.length) {
      trainingScore += Math.min(formData.training.verifiedBadges.length * 2, 4);
    }
    if (formData.training?.crewOfMonth) trainingScore += 3;
    
    score.training = Math.min(trainingScore, 10);

    // Penalties (up to -30)
    let penaltyScore = 0;
    // These would be calculated based on backend data
    // For demo purposes, we'll show potential penalties
    
    score.penalties = penaltyScore;

    // Calculate total
    score.total = score.professional + score.engagement + score.charter + score.training + score.penalties;

    return score;
  };

  // Real-time score calculation
  useEffect(() => {
    const formData = form.getValues();
    const newScore = calculateCRIScore(crewData, formData);
    setCriScore(newScore);
  }, [crewData, form.watch()]);

  const getCurrentTier = (score: number): CrewTier => {
    if (score >= 91) return crewTiers[3];
    if (score >= 61) return crewTiers[2];
    if (score >= 31) return crewTiers[1];
    return crewTiers[0];
  };

  const getNextTier = (score: number): CrewTier | null => {
    if (score < 31) return crewTiers[1];
    if (score < 61) return crewTiers[2];
    if (score < 91) return crewTiers[3];
    return null;
  };

  const onSubmit = async (data: CRIFormData) => {
    setIsCalculating(true);
    try {
      const finalScore = calculateCRIScore(crewData, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "CRI+ Score Updated!",
        description: `Your CRI+ score is ${finalScore.total.toFixed(0)}/100`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save CRI+ data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const downloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Your CRI+ score report is being generated...",
    });
  };

  const currentTier = getCurrentTier(criScore.total);
  const nextTier = getNextTier(criScore.total);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CRI+ Score Calculator | Xplor FairShare</title>
        <meta name="description" content="Calculate your comprehensive Crew Rating Index (CRI+) score for FairShare income distribution and platform visibility." />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Your CRI+ (Crew Rating Index)</h1>
            <p className="text-xl opacity-90">
              Your CRI+ represents your professional value and community participation on Xplor. It's used to calculate your FairShare charter income share and platform visibility.
            </p>
            
            {!crewData.personalInfo && (
              <div className="mt-6">
                <Button 
                  onClick={() => navigate('/fairshare/join')}
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Complete FairShare Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Score Overview */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* CRI+ Score Display */}
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your CRI+ Score</CardTitle>
                    <div className={`text-6xl font-bold p-8 rounded-xl ${currentTier.bgColor} ${currentTier.color}`}>
                      {criScore.total.toFixed(0)}
                      <span className="text-2xl">/100</span>
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {currentTier.name}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentTier.benefits}
                    </p>
                  </CardHeader>
                </Card>

                {/* Tier Progress */}
                {nextTier && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Trophy className="h-5 w-5" />
                        Next Tier: {nextTier.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to {nextTier.name}</span>
                          <span>{Math.max(0, parseInt(nextTier.range.split('-')[0]) - criScore.total)} points needed</span>
                        </div>
                        <Progress 
                          value={Math.min((criScore.total / parseInt(nextTier.range.split('-')[0])) * 100, 100)} 
                          className="h-2" 
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Score Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Professional/Qualifications", value: criScore.professional, max: 50, icon: Award },
                      { label: "Engagement & Content", value: criScore.engagement, max: 30, icon: Share2 },
                      { label: "Charter Success", value: criScore.charter, max: 25, icon: Star },
                      { label: "Training & Badges", value: criScore.training, max: 10, icon: CheckCircle },
                      ...(criScore.penalties < 0 ? [{ label: "Penalties", value: criScore.penalties, max: 0, icon: AlertTriangle }] : [])
                    ].map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm items-center">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4" />
                              <span>{item.label}</span>
                            </div>
                            <span className={item.value < 0 ? "text-destructive" : ""}>
                              {item.value.toFixed(0)}/{item.max}
                            </span>
                          </div>
                          <Progress 
                            value={item.max > 0 ? (item.value / item.max) * 100 : 0} 
                            className="h-2" 
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  <Button onClick={downloadPDF} className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard/profile')} 
                    className="w-full" 
                    variant="outline"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    View My Crew Profile
                  </Button>
                  <Button 
                    onClick={() => navigate('/dashboard/yacht-profile')} 
                    className="w-full" 
                    variant="outline"
                  >
                    <Ship className="h-4 w-4 mr-2" />
                    Complete My Yacht Listing
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Crew Data Summary */}
              {crewData.personalInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Profile Summary
                    </CardTitle>
                    <CardDescription>
                      Data from your FairShare application
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {crewData.personalInfo?.firstName} {crewData.personalInfo?.lastName}
                      </div>
                      <div>
                        <span className="font-medium">Position:</span> {crewData.personalInfo?.position || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Yacht Length:</span> {crewData.personalInfo?.yachtLength || "Not specified"}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span> {crewData.experience?.length || 0} yachts
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Professional Parameters */}
                  <Tabs defaultValue="qualifications" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
                      <TabsTrigger value="navigation">Navigation</TabsTrigger>
                      <TabsTrigger value="readiness">Readiness</TabsTrigger>
                      <TabsTrigger value="engagement">Engagement</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="qualifications" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Qualifications & Certifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          
                          <FormField
                            control={form.control}
                            name="qualifications.coc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Certificate of Competency (CoC)</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select CoC" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="yachtmaster">Yacht Master</SelectItem>
                                      <SelectItem value="oow">Officer of the Watch</SelectItem>
                                      <SelectItem value="day-skipper">RYA Day Skipper</SelectItem>
                                      <SelectItem value="commercial">Commercial Endorsement</SelectItem>
                                      <SelectItem value="chief-engineer">Chief Engineer</SelectItem>
                                      <SelectItem value="second-engineer">Second Engineer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { name: "stcw", label: "STCW" },
                              { name: "eng1", label: "ENG1" },
                              { name: "yachtmaster", label: "Yachtmaster" },
                              { name: "edh", label: "EDH" },
                              { name: "aec", label: "AEC1/2" },
                              { name: "helm", label: "HELM" }
                            ].map((cert) => (
                              <FormField
                                key={cert.name}
                                control={form.control}
                                name={`qualifications.${cert.name}` as any}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {cert.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="navigation" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Navigation Zones
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          
                          <FormField
                            control={form.control}
                            name="navigation.zones"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Major Navigation Zones (Select all that apply)</FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-2 gap-2">
                                    {navigationZones.map((zone) => (
                                      <label key={zone} className="flex items-center space-x-2 text-sm">
                                        <Checkbox
                                          checked={field.value?.includes(zone) || false}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || [];
                                            if (checked) {
                                              field.onChange([...current, zone]);
                                            } else {
                                              field.onChange(current.filter(z => z !== zone));
                                            }
                                          }}
                                        />
                                        <span>{zone}</span>
                                      </label>
                                    ))}
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="navigation.seaMiles"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Total Sea Miles</FormLabel>
                                  <FormControl>
                                    <Input placeholder="50000" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="navigation.chartersCompleted"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Charters Completed</FormLabel>
                                  <FormControl>
                                    <Input placeholder="25" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="readiness" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            Deployment Readiness
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { name: "certValid", label: "Certifications Valid" },
                              { name: "dualPassport", label: "Dual Passport" },
                              { name: "quickDeploy", label: "Ready to Deploy (48h)" },
                              { name: "vaccinations", label: "Vaccinations Compliant" }
                            ].map((item) => (
                              <FormField
                                key={item.name}
                                control={form.control}
                                name={`readiness.${item.name}` as any}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item.label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="engagement" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Share2 className="h-5 w-5" />
                            Platform Engagement
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          
                          {/* Content Contribution */}
                          <div className="space-y-4">
                            <h4 className="font-medium">Content Contribution (+30 CRI+)</h4>
                            
                            <FormField
                              control={form.control}
                              name="engagement.yachtTour"
                              render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    Upload full yacht tour (+5)
                                  </FormLabel>
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="engagement.yachtMedia"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Yacht media uploads count (+2 each)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="5" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="engagement.stories"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Stories/updates posted (+2 each)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="10" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="engagement.monthlyUpdates"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      Monthly yacht info updates (+5)
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="engagement.quickResponse"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      Respond to messages {"<"}24h (+3)
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          <Separator />

                          {/* Social & Community */}
                          <div className="space-y-4">
                            <h4 className="font-medium">Social & Community (+15 CRI+)</h4>
                            
                            <FormField
                              control={form.control}
                              name="social.socialShares"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Social media platforms shared on (+2 each, max 6)</FormLabel>
                                  <FormControl>
                                    <div className="grid grid-cols-2 gap-2">
                                      {socialPlatforms.map((platform) => (
                                        <label key={platform} className="flex items-center space-x-2 text-sm">
                                          <Checkbox
                                            checked={field.value?.includes(platform) || false}
                                            onCheckedChange={(checked) => {
                                              const current = field.value || [];
                                              if (checked) {
                                                field.onChange([...current, platform]);
                                              } else {
                                                field.onChange(current.filter(p => p !== platform));
                                              }
                                            }}
                                          />
                                          <span>{platform}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                control={form.control}
                                name="social.crewReferrals"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Crew referrals (+1 each, max 5)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="3" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="social.ownerReferrals"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Owner referrals (+3 each)</FormLabel>
                                    <FormControl>
                                      <Input placeholder="1" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="social.livestreams"
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      Hosted livestream (+3)
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Charter Success */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Charter Success (+25 CRI+)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="charter.chartersCompleted"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Charters completed on Xplor (+5 each)</FormLabel>
                              <FormControl>
                                <Input placeholder="3" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="charter.fiveStarReviews"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>5-star guest reviews (+3 each)</FormLabel>
                              <FormControl>
                                <Input placeholder="5" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="charter.repeatGuests"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Repeat guest charters (+2 each)</FormLabel>
                              <FormControl>
                                <Input placeholder="2" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="charter.namedInReviews"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Named in positive reviews (+2 each)</FormLabel>
                              <FormControl>
                                <Input placeholder="3" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Training & Badges */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Training & Achievements (+10 CRI+)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="training.onboardingComplete"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Xplor onboarding complete (+2)
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="training.crewOfMonth"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Crew of the Month (+3)
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="training.webinarsAttended"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Webinars/training attended (+1 each)</FormLabel>
                            <FormControl>
                              <Input placeholder="5" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="training.verifiedBadges"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Verified badges earned (+2 each)</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-2 gap-2">
                                {verifiedBadges.map((badge) => (
                                  <label key={badge} className="flex items-center space-x-2 text-sm">
                                    <Checkbox
                                      checked={field.value?.includes(badge) || false}
                                      onCheckedChange={(checked) => {
                                        const current = field.value || [];
                                        if (checked) {
                                          field.onChange([...current, badge]);
                                        } else {
                                          field.onChange(current.filter(b => b !== badge));
                                        }
                                      }}
                                    />
                                    <span>{badge}</span>
                                  </label>
                                ))}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Penalty Logic */}
                  <Collapsible 
                    open={openSections.penalties} 
                    onOpenChange={(open) => setOpenSections({...openSections, penalties: open})}
                  >
                    <CollapsibleTrigger asChild>
                      <Card className="cursor-pointer border-destructive/20">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between text-destructive">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5" />
                              Penalty Logic (Decay)
                            </div>
                            <ChevronDown className={`h-4 w-4 transition-transform ${openSections.penalties ? 'rotate-180' : ''}`} />
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card className="border-destructive/20">
                        <CardContent className="pt-6">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span>Yacht info outdated 60+ days</span>
                              <span className="text-destructive">-3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Failure to respond {">"}72h</span>
                              <span className="text-destructive">-2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Verified guest complaint</span>
                              <span className="text-destructive">-5 to -10</span>
                            </div>
                            <div className="flex justify-between">
                              <span>False/misleading info</span>
                              <span className="text-destructive">-10 (with review)</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Crew Tier System */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        CRI+ Tier System
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {crewTiers.map((tier, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg border ${tier.name === currentTier.name ? 'border-primary bg-primary/5' : 'border-border'}`}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Badge variant={tier.name === currentTier.name ? "default" : "secondary"}>
                                  {tier.range}
                                </Badge>
                                <div>
                                  <div className={`font-medium ${tier.color}`}>{tier.name}</div>
                                  <div className="text-sm text-muted-foreground">{tier.benefits}</div>
                                </div>
                              </div>
                              {tier.name === currentTier.name && (
                                <Badge variant="default">Current</Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sticky Footer */}
                  <div className="sticky bottom-0 bg-background border-t p-4 flex gap-4">
                    <Button type="submit" className="flex-1" disabled={isCalculating}>
                      {isCalculating ? "Calculating..." : "Save My Progress"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        const formData = form.getValues();
                        const newScore = calculateCRIScore(crewData, formData);
                        setCriScore(newScore);
                        toast({
                          title: "CRI+ Recalculated",
                          description: `Your score is ${newScore.total.toFixed(0)}/100`,
                        });
                      }}
                    >
                      Recalculate My CRI+
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}