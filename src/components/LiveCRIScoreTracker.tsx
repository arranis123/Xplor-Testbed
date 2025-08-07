import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Trophy, Star, Award, Target, TrendingUp, Eye, Lightbulb } from "lucide-react";

interface CRIScoreBreakdown {
  experience: number;
  certifications: number;
  positionWeight: number;
  navigation: number;
  availability: number;
  engagement: number;
  social: number;
  charter: number;
  training: number;
  penalties: number;
}

interface LiveCRIScoreTrackerProps {
  formData: any;
  qualificationStatus: { [key: string]: { status: string; hasFile: boolean } };
  yachtExperiences: any[];
  navigationExperience: { [key: string]: { checked: boolean; year?: string } };
  selectedYachtSize: string;
  selectedPosition: string;
  selectedCoC: string;
}

const tierThresholds = [
  { min: 0, max: 30, name: "Standard", color: "bg-gray-500", icon: Target },
  { min: 31, max: 60, name: "Active Crew", color: "bg-blue-500", icon: Star },
  { min: 61, max: 90, name: "Top Contributor", color: "bg-yellow-500", icon: Award },
  { min: 91, max: 100, name: "Elite Crew", color: "bg-green-500", icon: Trophy }
];

export function LiveCRIScoreTracker({
  formData,
  qualificationStatus,
  yachtExperiences,
  navigationExperience,
  selectedYachtSize,
  selectedPosition,
  selectedCoC
}: LiveCRIScoreTrackerProps) {
  const [scoreBreakdown, setScoreBreakdown] = useState<CRIScoreBreakdown>({
    experience: 0,
    certifications: 0,
    positionWeight: 0,
    navigation: 0,
    availability: 0,
    engagement: 0,
    social: 0,
    charter: 0,
    training: 0,
    penalties: 0
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Position salary weightings by yacht size and position
  const positionWeights = {
    "Under 200 GRT": {
      "Master (200 GT)": 10,
      "Mate": 6,
      "Sole Engineer": 8,
      "Chef (Solo or dual-role)": 6,
      "Steward/Stewardess": 4,
      "Deckhand": 3,
      "Cook/Stew": 3
    },
    "Under 500 GRT": {
      "Master <500GT": 10,
      "Chief Mate": 8,
      "Chief Engineer": 9,
      "Chef": 7,
      "Chief Steward/Stewardess": 6,
      "OOW": 6,
      "Second Engineer": 7,
      "Bosun": 5
    },
    "Under 3000 GRT": {
      "Master <3000 GT": 10,
      "Chief Mate <3000 GT": 9,
      "Chief Engineer <3000 GT": 9,
      "Executive Chef": 8,
      "Chief Steward/Stewardess": 7,
      "OOW <3000 GT": 7,
      "Second Engineer <3000 GT": 8,
      "Purser": 6
    }
  };

  useEffect(() => {
    console.log("CRI+ useEffect triggered with:", {
      formData,
      selectedYachtSize,
      selectedPosition,
      selectedCoC
    });
    calculateCRIScore();
  }, [formData, qualificationStatus, yachtExperiences, navigationExperience, selectedYachtSize, selectedPosition, selectedCoC]);

  const calculateCRIScore = () => {
    const scores: CRIScoreBreakdown = {
      experience: calculateExperience(),
      certifications: calculateCertifications(),
      positionWeight: calculatePositionWeight(),
      navigation: calculateNavigation(),
      availability: calculateAvailability(),
      engagement: 0, // Will be updated as user engages
      social: 0, // Will be updated for referrals
      charter: 0, // Will be updated for charter history
      training: 0, // Will be updated for training completion
      penalties: 0 // Backend only
    };

    setScoreBreakdown(scores);
  };

  const calculateExperience = (): number => {
    let score = 0;
    
    // Debug logging
    console.log("CRI+ Experience Calculation - Form Data:", {
      totalYearsYachting: formData.totalYearsYachting,
      longevityLastYacht: formData.longevityLastYacht,
      numberOfYachts: formData.numberOfYachts,
      largestGRT: formData.largestGRT
    });
    
    // +1 per full year yachting (max 10)
    const years = formData.totalYearsYachting || 0;
    score += Math.min(years, 10);
    console.log("Years score:", Math.min(years, 10));
    
    // +2 per rotational role (up to 2) - assuming if longevity < 12 months, it's rotational
    const longevity = formData.longevityLastYacht || 0;
    if (longevity < 12 && longevity > 0) {
      score += Math.min(2, 2); // Up to 2 rotational roles
      console.log("Rotational score added:", 2);
    }
    
    // +1 per yacht served over 12 months (up to 5)
    if (longevity >= 12) {
      const longTermScore = Math.min(Math.floor(longevity / 12), 5);
      score += longTermScore;
      console.log("Long-term score added:", longTermScore);
    }
    
    // +1 for experience on 3+ GRT categories
    const largestGRT = formData.largestGRT || 0;
    const yachtCount = formData.numberOfYachts || 0;
    if (yachtCount >= 3 && largestGRT > 0) {
      score += 1;
      console.log("GRT categories score added:", 1);
    }

    console.log("Total experience score:", Math.min(Math.round(score), 20));
    return Math.min(Math.round(score), 20);
  };

  const calculateCertifications = (): number => {
    let score = 0;
    
    // +5 = STCW + ENG1
    const hasSTCW = Object.keys(qualificationStatus).some(cert => 
      cert.includes("STCW") && qualificationStatus[cert]?.status === 'valid'
    );
    const hasENG1 = qualificationStatus["ENG1 Medical Certificate"]?.status === 'valid';
    if (hasSTCW && hasENG1) score += 5;
    
    // +5 = Valid CoC
    if (selectedCoC) score += 5;
    
    // +5 = 2+ advanced role certs (EDH, AEC, HELM)
    const advancedCerts = Object.keys(qualificationStatus).filter(cert => 
      (cert.includes("EDH") || cert.includes("AEC") || cert.includes("HELM")) &&
      qualificationStatus[cert]?.status === 'valid'
    ).length;
    if (advancedCerts >= 2) score += 5;
    
    // +5 = Flag endorsements
    const flagCerts = Object.keys(qualificationStatus).filter(cert => 
      (cert.includes("Marshall") || cert.includes("Cayman") || cert.includes("USCG")) &&
      qualificationStatus[cert]?.status === 'valid'
    ).length;
    if (flagCerts > 0) score += 5;

    return Math.min(Math.round(score), 20);
  };

  const calculatePositionWeight = (): number => {
    console.log("CRI+ Position Weight Calculation:", {
      selectedYachtSize,
      selectedPosition,
      availableWeights: positionWeights
    });
    
    if (!selectedYachtSize || !selectedPosition) {
      console.log("Missing yacht size or position");
      return 0;
    }
    
    const weights = positionWeights[selectedYachtSize as keyof typeof positionWeights];
    if (!weights) {
      console.log("No weights found for yacht size:", selectedYachtSize);
      return 0;
    }
    
    const positionScore = weights[selectedPosition as keyof typeof weights] || 0;
    console.log("Position score calculated:", positionScore);
    return positionScore;
  };

  const calculateNavigation = (): number => {
    let score = 0;
    
    // +1 per major zone (Atlantic, Med, Pacific, etc.)
    const zones = [
      formData.atlanticCrossings || 0,
      formData.mediterraneanCrossings || 0,
      formData.indianCrossings || 0,
      formData.pacificCrossings || 0
    ].filter(zone => zone > 0).length;
    score += zones;
    
    // +1 for each canal transit (Panama, Suez, etc.)
    const transits = (formData.suezTransits || 0) + 
                     (formData.panamaTransits || 0) + 
                     (formData.corinthTransits || 0);
    score += transits;

    return Math.min(Math.round(score), 10);
  };

  const calculateAvailability = (): number => {
    let score = 0;
    
    // +2 = ENG1 valid
    if (qualificationStatus["ENG1 Medical Certificate"]?.status === 'valid') {
      score += 2;
    }
    
    // +2 = Ready to deploy within 48h (assumed if form completed)
    if (formData.email) score += 2;
    
    // +2 = Dual passport or long-term visa (assumed if nationality provided)
    if (formData.nationality) score += 2;
    
    // +2 = Up-to-date vaccinations (assumed)
    score += 2;
    
    // +2 = Port/airport proximity (assumed)
    score += 2;

    return Math.min(score, 10);
  };

  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0);
  const currentTier = tierThresholds.find(tier => totalScore >= tier.min && totalScore <= tier.max) || tierThresholds[0];
  const nextTier = tierThresholds.find(tier => tier.min > totalScore);

  return (
    <>
      {/* Desktop: Floating right-side panel */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 w-80 z-50">
        <Card className="shadow-xl border-primary/30 bg-gradient-to-br from-background via-background to-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-primary">
              <TrendingUp className="h-5 w-5" />
              Live CRI+ Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Large Score Display */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full border-4 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="text-3xl font-bold text-primary">{totalScore}</div>
                <div className="absolute -bottom-2 text-sm text-muted-foreground">/100</div>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="text-center space-y-2">
              <Badge variant="outline" className={`${currentTier.color} text-white border-none px-3 py-1`}>
                <currentTier.icon className="h-3 w-3 mr-1" />
                {currentTier.name}
              </Badge>
              {nextTier && (
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 inline mr-1" />
                  {nextTier.min - totalScore} points to {nextTier.name}
                </p>
              )}
            </div>

            {/* Visual Score Breakdown */}
            <div className="space-y-2">
              <ScoreItem label="Experience & Longevity" current={scoreBreakdown.experience} max={20} />
              <ScoreItem label="Certifications & Qualifications" current={scoreBreakdown.certifications} max={20} />
              <ScoreItem label="Position & GRT Weighting" current={scoreBreakdown.positionWeight} max={10} />
              <ScoreItem label="Navigation Zones & Sea Time" current={scoreBreakdown.navigation} max={10} />
              <ScoreItem label="Availability & Compliance" current={scoreBreakdown.availability} max={10} />
              <ScoreItem label="Platform Engagement" current={scoreBreakdown.engagement} max={15} />
              <ScoreItem label="Social & Community" current={scoreBreakdown.social} max={10} />
              <ScoreItem label="Charter Participation" current={scoreBreakdown.charter} max={5} />
              <ScoreItem label="Training & Badges" current={scoreBreakdown.training} max={5} />
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <Button variant="outline" size="sm" className="w-full text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Full Breakdown
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-xs text-primary">
                <Lightbulb className="h-3 w-3 mr-1" />
                Improve My Score
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Sticky expandable bar at bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-background/95 border-t border-primary/20">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="font-semibold">CRI+ Score: {totalScore}/100</span>
              </div>
              <Badge variant="outline" className={`${currentTier.color} text-white border-none text-xs px-2`}>
                <currentTier.icon className="h-3 w-3 mr-1" />
                {currentTier.name}
              </Badge>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform text-primary ${isExpanded ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="p-4 pt-0 max-h-72 overflow-y-auto bg-background/95">
            <div className="space-y-2">
              <ScoreItem label="Experience & Longevity" current={scoreBreakdown.experience} max={20} />
              <ScoreItem label="Certifications & Qualifications" current={scoreBreakdown.certifications} max={20} />
              <ScoreItem label="Position & GRT Weighting" current={scoreBreakdown.positionWeight} max={10} />
              <ScoreItem label="Navigation Zones & Sea Time" current={scoreBreakdown.navigation} max={10} />
              <ScoreItem label="Availability & Compliance" current={scoreBreakdown.availability} max={10} />
              <ScoreItem label="Platform Engagement" current={scoreBreakdown.engagement} max={15} />
              <ScoreItem label="Social & Community" current={scoreBreakdown.social} max={10} />
            </div>
            {nextTier && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {nextTier.min - totalScore} more points to reach {nextTier.name}
              </p>
            )}
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Full
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-xs text-primary">
                <Lightbulb className="h-3 w-3 mr-1" />
                Improve
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}

function ScoreItem({ label, current, max }: { label: string; current: number; max: number }) {
  const percentage = (current / max) * 100;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{current}/{max}</span>
      </div>
      <Progress value={percentage} className="h-1.5" />
    </div>
  );
}