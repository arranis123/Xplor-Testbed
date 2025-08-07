import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { FileDown, Award, TrendingUp, Ship, Globe, User, Settings, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

// Additional parameters schema for CRI+ calculation
const additionalParamsSchema = z.object({
  monthlyNationalSalary: z.number().optional(),
  totalCharterRevenue: z.number().optional(),
  hoursPerCharter: z.number().optional(),
  repeatGuestCharters: z.number().optional(),
  guestFeedbackRating: z.number().min(1).max(5).optional(),
  leadershipRoles: z.array(z.string()).optional(),
  verificationDocuments: z.array(z.string()).optional(),
});

type AdditionalParams = z.infer<typeof additionalParamsSchema>;

interface CRIScoreBreakdown {
  experienceAndLongevity: number;
  qualificationsAndCertifications: number;
  positionBasedRoleWeighting: number;
  charterPerformance: number;
  navigatedWaters: number;
  availabilityAndMobility: number;
  softSkillsAndLanguages: number;
  total: number;
}

interface CrewData {
  fullName?: string;
  email?: string;
  nationality?: string;
  yachtLength?: string;
  currentVessel?: string;
  yachtSizeCategory?: string;
  positionAppliedFor?: string;
  primaryDepartment?: string;
  primaryCoC?: string;
  totalYearsYachting?: number;
  numberOfYachts?: number;
  largestGRT?: number;
  longevityLastYacht?: number;
  seaMilesLogged?: number;
  atlanticCrossings?: number;
  mediterraneanCrossings?: number;
  indianCrossings?: number;
  pacificCrossings?: number;
  suezTransits?: number;
  panamaTransits?: number;
  corinthTransits?: number;
  charterRevenue?: number;
  languagesSpoken?: string;
}

const leadershipRoleOptions = [
  "Senior Deckhand",
  "Bosun",
  "First Officer",
  "Captain",
  "Chief Engineer",
  "Second Engineer",
  "Chief Steward(ess)",
  "Head Chef",
  "Lead Tour Guide"
];

const scoreBands = {
  elite: { min: 80, max: 100, color: "bg-emerald-500", label: "Elite Tier" },
  pro: { min: 60, max: 79, color: "bg-blue-500", label: "Pro Tier" },
  basic: { min: 0, max: 59, color: "bg-orange-500", label: "Basic Tier" }
};

export default function CRICalculator() {
  const [crewData, setCrewData] = useState<CrewData>({});
  const [criScore, setCriScore] = useState<CRIScoreBreakdown>({
    experienceAndLongevity: 0,
    qualificationsAndCertifications: 0,
    positionBasedRoleWeighting: 0,
    charterPerformance: 0,
    navigatedWaters: 0,
    availabilityAndMobility: 0,
    softSkillsAndLanguages: 0,
    total: 0
  });
  const [isCalculating, setIsCalculating] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const form = useForm<AdditionalParams>({
    resolver: zodResolver(additionalParamsSchema),
    defaultValues: {
      leadershipRoles: [],
      verificationDocuments: []
    }
  });

  // Load crew data from location state (passed from FairShare join)
  useEffect(() => {
    if (location.state?.crewData) {
      setCrewData(location.state.crewData);
    }
  }, [location.state]);

  // Calculate CRI+ score
  const calculateCRIScore = (crew: CrewData, additional: AdditionalParams): CRIScoreBreakdown => {
    const score: CRIScoreBreakdown = {
      experienceAndLongevity: 0,
      qualificationsAndCertifications: 0,
      positionBasedRoleWeighting: 0,
      charterPerformance: 0,
      navigatedWaters: 0,
      availabilityAndMobility: 0,
      softSkillsAndLanguages: 0,
      total: 0
    };

    // Experience & Longevity (25 points)
    const yearsScore = Math.min((crew.totalYearsYachting || 0) * 2, 10);
    const yachtsScore = Math.min((crew.numberOfYachts || 0) * 0.5, 5);
    const longevityScore = Math.min((crew.longevityLastYacht || 0) * 1.5, 5);
    const seaMilesScore = Math.min((crew.seaMilesLogged || 0) / 10000 * 5, 5);
    score.experienceAndLongevity = yearsScore + yachtsScore + longevityScore + seaMilesScore;

    // Qualifications & Certifications (25 points)
    let qualScore = 0;
    if (crew.primaryCoC) {
      const cocMap: { [key: string]: number } = {
        "Yacht Master": 15,
        "Officer of the Watch": 12,
        "RYA Day Skipper": 8,
        "Commercial Endorsement": 10,
        "Chief Engineer": 15,
        "Second Engineer": 12,
        "ENG 1": 10
      };
      qualScore += cocMap[crew.primaryCoC] || 5;
    }
    // Additional points for large yacht experience
    if ((crew.largestGRT || 0) > 3000) qualScore += 5;
    else if ((crew.largestGRT || 0) > 500) qualScore += 3;
    score.qualificationsAndCertifications = Math.min(qualScore, 25);

    // Position-Based Role Weighting (20 points)
    let positionScore = 0;
    const positionMap: { [key: string]: number } = {
      "Captain": 20,
      "First Officer": 16,
      "Chief Engineer": 18,
      "Second Engineer": 14,
      "Bosun": 12,
      "Chief Steward(ess)": 14,
      "Steward(ess)": 10,
      "Deckhand": 8,
      "Head Chef": 15
    };
    positionScore = positionMap[crew.positionAppliedFor || ""] || 5;
    
    // Salary weighting (if provided)
    if (additional.monthlyNationalSalary && additional.monthlyNationalSalary > 8000) {
      positionScore += 2;
    }
    score.positionBasedRoleWeighting = Math.min(positionScore, 20);

    // Charter Performance (10 points)
    let charterScore = 0;
    if (additional.totalCharterRevenue) {
      charterScore += Math.min(additional.totalCharterRevenue / 100000, 4);
    }
    if (additional.repeatGuestCharters) {
      charterScore += Math.min(additional.repeatGuestCharters * 0.5, 3);
    }
    if (additional.guestFeedbackRating) {
      charterScore += additional.guestFeedbackRating - 1; // 1-5 scale becomes 0-4 points
    }
    if (additional.leadershipRoles && additional.leadershipRoles.length > 0) {
      charterScore += additional.leadershipRoles.length * 0.5;
    }
    score.charterPerformance = Math.min(charterScore, 10);

    // Navigated Waters (10 points)
    let waterScore = 0;
    const crossings = [
      crew.atlanticCrossings || 0,
      crew.mediterraneanCrossings || 0,
      crew.indianCrossings || 0,
      crew.pacificCrossings || 0
    ];
    const transits = [
      crew.suezTransits || 0,
      crew.panamaTransits || 0,
      crew.corinthTransits || 0
    ];
    
    waterScore += Math.min(crossings.reduce((a, b) => a + b, 0) * 0.5, 6);
    waterScore += Math.min(transits.reduce((a, b) => a + b, 0) * 0.8, 4);
    score.navigatedWaters = Math.min(waterScore, 10);

    // Availability & Mobility (5 points)
    score.availabilityAndMobility = 4.5; // Base score for being available

    // Soft Skills & Languages (5 points)
    let languageScore = 0;
    if (crew.languagesSpoken) {
      const languages = crew.languagesSpoken.split(',').length;
      languageScore = Math.min(languages * 1.2, 5);
    }
    score.softSkillsAndLanguages = languageScore;

    // Calculate total
    score.total = Object.values(score).reduce((sum, val) => sum + val, 0) - score.total;

    return score;
  };

  // Real-time score calculation
  useEffect(() => {
    const formData = form.getValues();
    const newScore = calculateCRIScore(crewData, formData);
    setCriScore(newScore);
  }, [crewData, form.watch()]);

  const getScoreBand = (score: number) => {
    if (score >= 80) return scoreBands.elite;
    if (score >= 60) return scoreBands.pro;
    return scoreBands.basic;
  };

  const onSubmit = async (data: AdditionalParams) => {
    setIsCalculating(true);
    try {
      // Here you would save the complete CRI+ data to the database
      const finalScore = calculateCRIScore(crewData, data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "CRI+ Score Calculated!",
        description: `Your CRI+ score is ${finalScore.total.toFixed(1)}/100`,
      });
      
      // Navigate to next step or dashboard
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
    // Implementation for PDF download
    toast({
      title: "PDF Download",
      description: "Your CRI+ score report is being generated...",
    });
  };

  const scoreBand = getScoreBand(criScore.total);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CRI+ Score Calculator | Xplor FairShare</title>
        <meta name="description" content="Calculate your Crew Rating Index (CRI+) score for FairShare income distribution." />
      </Helmet>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">CRI+ Score Calculator</h1>
            <p className="text-xl opacity-90">
              Calculate your Crew Rating Index for FairShare income distribution
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Score Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                
                {/* CRI+ Score Display */}
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Your CRI+ Score</CardTitle>
                    <div className={`text-6xl font-bold text-white p-8 rounded-xl ${scoreBand.color}`}>
                      {criScore.total.toFixed(1)}
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {scoreBand.label}
                    </Badge>
                  </CardHeader>
                </Card>

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
                      { label: "Experience & Longevity", value: criScore.experienceAndLongevity, max: 25 },
                      { label: "Qualifications & Certifications", value: criScore.qualificationsAndCertifications, max: 25 },
                      { label: "Position-Based Role Weighting", value: criScore.positionBasedRoleWeighting, max: 20 },
                      { label: "Charter Performance", value: criScore.charterPerformance, max: 10 },
                      { label: "Navigated Waters", value: criScore.navigatedWaters, max: 10 },
                      { label: "Availability & Mobility", value: criScore.availabilityAndMobility, max: 5 },
                      { label: "Soft Skills & Languages", value: criScore.softSkillsAndLanguages, max: 5 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span>{item.value.toFixed(1)}/{item.max}</span>
                        </div>
                        <Progress value={(item.value / item.max) * 100} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="pt-6 space-y-3">
                    <Button onClick={downloadPDF} className="w-full" variant="outline">
                      <FileDown className="h-4 w-4 mr-2" />
                      Download PDF Report
                    </Button>
                    <Button 
                      onClick={() => navigate('/fairshare/join')} 
                      className="w-full" 
                      variant="outline"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Crew Data Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Crew Profile Summary
                  </CardTitle>
                  <CardDescription>
                    Data synced from your FairShare application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {crewData.fullName || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Position:</span> {crewData.positionAppliedFor || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Department:</span> {crewData.primaryDepartment || "Not provided"}
                    </div>
                    <div>
                      <span className="font-medium">Years Experience:</span> {crewData.totalYearsYachting || 0}
                    </div>
                    <div>
                      <span className="font-medium">Yachts Worked:</span> {crewData.numberOfYachts || 0}
                    </div>
                    <div>
                      <span className="font-medium">Largest GRT:</span> {crewData.largestGRT || 0}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Parameters Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Additional Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Provide additional details to enhance your CRI+ score calculation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      
                      {/* Position-Based Salary */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Position-Based Salary Information</h3>
                        <FormField
                          control={form.control}
                          name="monthlyNationalSalary"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Monthly Salary Estimate (USD) - Optional</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="8000" 
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Performance Metrics */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Charter Performance Metrics</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="totalCharterRevenue"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Total Charter Revenue Contributed (USD)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="500000" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="hoursPerCharter"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Average Hours Worked per Charter</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="80" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="repeatGuestCharters"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Repeat Guest Charters Participated</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    placeholder="5" 
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="guestFeedbackRating"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Average Guest Feedback Rating (1-5)</FormLabel>
                                <FormControl>
                                  <Select 
                                    onValueChange={(value) => field.onChange(Number(value))}
                                    value={field.value?.toString()}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="5">5 - Excellent</SelectItem>
                                      <SelectItem value="4">4 - Very Good</SelectItem>
                                      <SelectItem value="3">3 - Good</SelectItem>
                                      <SelectItem value="2">2 - Fair</SelectItem>
                                      <SelectItem value="1">1 - Poor</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <Separator />

                      {/* Leadership Roles */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Leadership Experience</h3>
                        <FormField
                          control={form.control}
                          name="leadershipRoles"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Leadership Roles Held (Select all that apply)</FormLabel>
                              <FormControl>
                                <div className="grid grid-cols-2 gap-2">
                                  {leadershipRoleOptions.map((role) => (
                                    <label key={role} className="flex items-center space-x-2 text-sm">
                                      <input
                                        type="checkbox"
                                        checked={field.value?.includes(role) || false}
                                        onChange={(e) => {
                                          const current = field.value || [];
                                          if (e.target.checked) {
                                            field.onChange([...current, role]);
                                          } else {
                                            field.onChange(current.filter(r => r !== role));
                                          }
                                        }}
                                        className="rounded border-gray-300"
                                      />
                                      <span>{role}</span>
                                    </label>
                                  ))}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator />

                      {/* Submit Button */}
                      <div className="flex gap-4">
                        <Button type="submit" className="flex-1" disabled={isCalculating}>
                          {isCalculating ? "Calculating..." : "Finalize CRI+ Score"}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => navigate('/dashboard')}
                        >
                          Save & Continue Later
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}