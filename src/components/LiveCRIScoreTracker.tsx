import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Trophy, Star, Award, Target } from "lucide-react";

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
      "Master <3000GT": 10,
      "Chief Mate <3000GT": 9,
      "Chief Engineer <3000GT": 9,
      "Executive Chef": 8,
      "Chief Steward/Stewardess": 7,
      "OOW <3000GT": 7,
      "Second Engineer <3000GT": 8,
      "Purser": 6
    }
  };

  useEffect(() => {
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
    
    // Years of experience (0-8 points)
    const years = formData.totalYearsYachting || 0;
    score += Math.min(years * 1.5, 8);
    
    // Number of yachts (diversity) (0-5 points)
    const yachtCount = formData.numberOfYachts || 0;
    score += Math.min(yachtCount * 0.8, 5);
    
    // Longevity on last yacht (0-4 points)
    const longevity = formData.longevityLastYacht || 0;
    score += Math.min(longevity * 0.3, 4);
    
    // Large yacht experience (0-3 points)
    const largestGRT = formData.largestGRT || 0;
    if (largestGRT >= 3000) score += 3;
    else if (largestGRT >= 500) score += 2;
    else if (largestGRT >= 200) score += 1;

    return Math.min(Math.round(score), 20);
  };

  const calculateCertifications = (): number => {
    let score = 0;
    
    // CoC selected (0-8 points)
    if (selectedCoC) {
      if (selectedCoC.includes("Master")) score += 8;
      else if (selectedCoC.includes("Chief")) score += 6;
      else if (selectedCoC.includes("OOW")) score += 5;
      else score += 3;
    }
    
    // Valid certifications (0-12 points)
    const validCerts = Object.values(qualificationStatus).filter(
      cert => cert.status === 'valid'
    ).length;
    score += Math.min(validCerts * 0.8, 12);

    return Math.min(Math.round(score), 20);
  };

  const calculatePositionWeight = (): number => {
    if (!selectedYachtSize || !selectedPosition) return 0;
    
    const weights = positionWeights[selectedYachtSize as keyof typeof positionWeights];
    if (!weights) return 0;
    
    return weights[selectedPosition as keyof typeof weights] || 0;
  };

  const calculateNavigation = (): number => {
    let score = 0;
    
    // Sea miles (0-4 points)
    const seaMiles = formData.seaMilesLogged || 0;
    if (seaMiles >= 100000) score += 4;
    else if (seaMiles >= 50000) score += 3;
    else if (seaMiles >= 25000) score += 2;
    else if (seaMiles >= 10000) score += 1;
    
    // Ocean crossings (0-6 points)
    const crossings = (formData.atlanticCrossings || 0) + 
                     (formData.mediterraneanCrossings || 0) + 
                     (formData.indianCrossings || 0) + 
                     (formData.pacificCrossings || 0);
    score += Math.min(crossings * 1.2, 6);

    return Math.min(Math.round(score), 10);
  };

  const calculateAvailability = (): number => {
    let score = 0;
    
    // ENG1 Medical (5 points if valid)
    if (qualificationStatus["ENG1 Medical Certificate"]?.status === 'valid') {
      score += 5;
    }
    
    // Basic availability factors (5 points total)
    if (formData.nationality) score += 1;
    if (formData.email) score += 1;
    if (formData.languagesSpoken) score += 1;
    score += 2; // Assume ready to deploy and vaccinations

    return Math.min(score, 10);
  };

  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0);
  const currentTier = tierThresholds.find(tier => totalScore >= tier.min && totalScore <= tier.max) || tierThresholds[0];
  const nextTier = tierThresholds.find(tier => tier.min > totalScore);

  return (
    <>
      {/* Desktop: Fixed right sidebar */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-80 z-50">
        <Card className="shadow-lg border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-primary">
              <currentTier.icon className="h-5 w-5" />
              Your CRI+ Score
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Score Circle */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-primary/20">
                <div className={`absolute inset-0 rounded-full ${currentTier.color} opacity-10`} />
                <div className="text-2xl font-bold text-primary">{totalScore}</div>
                <div className="absolute -bottom-1 text-xs text-muted-foreground">/100</div>
              </div>
            </div>

            {/* Tier Badge */}
            <div className="text-center">
              <Badge variant="outline" className={`${currentTier.color} text-white border-none`}>
                {currentTier.name}
              </Badge>
              {nextTier && (
                <p className="text-xs text-muted-foreground mt-1">
                  {nextTier.min - totalScore} points to {nextTier.name}
                </p>
              )}
            </div>

            {/* Progress Bars */}
            <div className="space-y-2">
              <ScoreItem label="Experience" current={scoreBreakdown.experience} max={20} />
              <ScoreItem label="Certifications" current={scoreBreakdown.certifications} max={20} />
              <ScoreItem label="Position Weight" current={scoreBreakdown.positionWeight} max={10} />
              <ScoreItem label="Navigation" current={scoreBreakdown.navigation} max={10} />
              <ScoreItem label="Availability" current={scoreBreakdown.availability} max={10} />
              <ScoreItem label="Engagement" current={scoreBreakdown.engagement} max={15} />
              <ScoreItem label="Social" current={scoreBreakdown.social} max={10} />
              <ScoreItem label="Charter" current={scoreBreakdown.charter} max={5} />
              <ScoreItem label="Training" current={scoreBreakdown.training} max={5} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile: Sticky footer */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <currentTier.icon className="h-5 w-5 text-primary" />
                <span className="font-semibold">CRI+ Score: {totalScore}/100</span>
              </div>
              <Badge variant="outline" className={`${currentTier.color} text-white border-none text-xs`}>
                {currentTier.name}
              </Badge>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="p-4 pt-0 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              <ScoreItem label="Experience" current={scoreBreakdown.experience} max={20} />
              <ScoreItem label="Certifications" current={scoreBreakdown.certifications} max={20} />
              <ScoreItem label="Position Weight" current={scoreBreakdown.positionWeight} max={10} />
              <ScoreItem label="Navigation" current={scoreBreakdown.navigation} max={10} />
              <ScoreItem label="Availability" current={scoreBreakdown.availability} max={10} />
              <ScoreItem label="Engagement" current={scoreBreakdown.engagement} max={15} />
            </div>
            {nextTier && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {nextTier.min - totalScore} more points to reach {nextTier.name}
              </p>
            )}
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