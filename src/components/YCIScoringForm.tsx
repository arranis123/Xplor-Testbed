import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Award, CheckCircle, AlertTriangle, Download } from 'lucide-react';
import jsPDF from 'jspdf';

interface FormData {
  vesselTonnage: string;
  position: string;
  crewName: string;
  yachtSeaTime: string;
  merchantSeaTime: string;
  requiredQualifications: string[];
  chartersCompleted: string;
  repeatCharters: string;
  crewReferred: string;
  yachtsReferred: string;
}

// Vessel tonnage options
const vesselTonnages = ['<200 GRT', '<500 GRT', '<3000 GRT'];

// Dynamic qualification matrix based on tonnage and position
const qualificationMatrix: { [tonnage: string]: { [position: string]: string[] } } = {
  '<200 GRT': {
    'Captain': ['STCW Basic Training', 'ENG1 Medical', 'Yachtmaster Offshore', 'VHF Radio License', 'Basic Fire Fighting'],
    'Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Marine Engineering Certificate', 'Basic Fire Fighting'],
    'Deckhand': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
    'Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1'],
    'Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 2']
  },
  '<500 GRT': {
    'Captain': ['STCW Basic Training', 'ENG1 Medical', 'Master 200 GT CoC', 'GMDSS GOC', 'Advanced Fire Fighting', 'ECDIS Certification'],
    'Chief Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 500 GT', 'GMDSS GOC', 'Basic Fire Fighting'],
    'Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Chief Engineer Motor 750kW', 'Basic Fire Fighting'],
    'Second Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Second Engineer Motor 750kW', 'Basic Fire Fighting'],
    'Bosun': ['STCW Basic Training', 'ENG1 Medical', 'Proficiency in Survival Craft', 'Basic Fire Fighting'],
    'Deckhand': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
    'Chief Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 2', 'First Aid'],
    'Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1'],
    'Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 3']
  },
  '<3000 GRT': {
    'Captain': ['STCW Basic Training', 'ENG1 Medical', 'Master 3000 GT CoC', 'GMDSS GOC', 'Advanced Fire Fighting', 'ECDIS Certification', 'Ship Security Officer'],
    'Chief Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 3000 GT', 'GMDSS GOC', 'Advanced Fire Fighting', 'ECDIS Certification'],
    'Second Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 500 GT', 'GMDSS GOC', 'Basic Fire Fighting'],
    'Chief Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Chief Engineer Motor 3000kW', 'Advanced Fire Fighting'],
    'Second Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Second Engineer Motor 3000kW', 'Basic Fire Fighting'],
    'ETO': ['STCW Basic Training', 'ENG1 Medical', 'Electro-Technical Officer Certificate', 'Basic Fire Fighting'],
    'Bosun': ['STCW Basic Training', 'ENG1 Medical', 'Proficiency in Survival Craft', 'Advanced Fire Fighting'],
    'Deckhand': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
    'Chief Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 2', 'First Aid', 'Ship Security Awareness'],
    '2nd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1', 'First Aid'],
    '3rd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1'],
    'Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 3'],
    'Purser': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Administration Certificate'],
    'Medic/Security': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Medical Care Provider', 'First Aid']
  }
};

export const YCIScoringForm = () => {
  const [formData, setFormData] = useState<FormData>({
    vesselTonnage: '',
    position: '',
    crewName: '',
    yachtSeaTime: '',
    merchantSeaTime: '',
    requiredQualifications: [],
    chartersCompleted: '',
    repeatCharters: '',
    crewReferred: '',
    yachtsReferred: ''
  });

  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [badge, setBadge] = useState<string>('');
  const [positionRequirements, setPositionRequirements] = useState<string[]>([]);
  const [availablePositions, setAvailablePositions] = useState<string[]>([]);

  // Update available positions when tonnage changes
  useEffect(() => {
    if (formData.vesselTonnage && qualificationMatrix[formData.vesselTonnage]) {
      setAvailablePositions(Object.keys(qualificationMatrix[formData.vesselTonnage]));
      // Reset position if it's not available for this tonnage
      if (formData.position && !Object.keys(qualificationMatrix[formData.vesselTonnage]).includes(formData.position)) {
        setFormData(prev => ({ ...prev, position: '', requiredQualifications: [] }));
      }
    } else {
      setAvailablePositions([]);
    }
  }, [formData.vesselTonnage]);

  // Update required qualifications when position changes
  useEffect(() => {
    if (formData.vesselTonnage && formData.position && qualificationMatrix[formData.vesselTonnage]?.[formData.position]) {
      setPositionRequirements(qualificationMatrix[formData.vesselTonnage][formData.position]);
      // Reset checked qualifications when position changes
      setFormData(prev => ({ ...prev, requiredQualifications: [] }));
    } else {
      setPositionRequirements([]);
    }
  }, [formData.vesselTonnage, formData.position]);

  const calculateScore = () => {
    // YCI+ Calculation Logic
    const yachtSeaTime = parseInt(formData.yachtSeaTime) || 0;
    const merchantSeaTime = parseInt(formData.merchantSeaTime) || 0;
    const charters = parseInt(formData.chartersCompleted) || 0;
    const repeatCharters = parseInt(formData.repeatCharters) || 0;
    const crewReferrals = parseInt(formData.crewReferred) || 0;
    const yachtReferrals = parseInt(formData.yachtsReferred) || 0;

    // Qualification Score (0-20 points)
    const qualificationScore = positionRequirements.length > 0 
      ? (formData.requiredQualifications.length / positionRequirements.length) * 20 
      : 0;

    // Experience Score (0-20 points) - Yacht time weighted fully, merchant time at 10%
    const effectiveSeaTime = yachtSeaTime + (merchantSeaTime * 0.1);
    const experienceScore = Math.min(effectiveSeaTime / 12, 20); // Capped at 20 points

    // Charter Score (0-20 points) - 1 point per 5 charters + 1 point per repeat
    const charterScore = Math.min((charters / 5) + repeatCharters, 20);

    // Contribution Score (0-10 points) - Crew and yacht referrals, max 10 each
    const contributionScore = Math.min(
      Math.min(crewReferrals, 10) + Math.min(yachtReferrals, 10), 
      10
    );

    // Total YCI+ Score (max 70 points)
    const totalScore = qualificationScore + experienceScore + charterScore + contributionScore;
    
    setCalculatedScore(Math.round(totalScore * 10) / 10);

    // Determine badge based on percentage of max score
    const percentage = (totalScore / 70) * 100;
    if (percentage >= 90) setBadge('Platinum Crew');
    else if (percentage >= 75) setBadge('Gold Crew');
    else if (percentage >= 60) setBadge('Silver Crew');
    else setBadge('Bronze Crew');
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Platinum Crew': return 'bg-slate-800 text-white';
      case 'Gold Crew': return 'bg-yellow-500 text-black';
      case 'Silver Crew': return 'bg-slate-400 text-black';
      case 'Bronze Crew': return 'bg-amber-600 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const handleCheckboxChange = (value: string, field: keyof FormData, checked: boolean) => {
    const currentArray = formData[field] as string[];
    if (checked) {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: currentArray.filter(item => item !== value)
      }));
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('YCI+ Crew Rating Report', 20, 30);
    
    // Crew details
    doc.setFontSize(12);
    doc.text(`Crew Name: ${formData.crewName || 'Not specified'}`, 20, 50);
    doc.text(`Position: ${formData.position || 'Not specified'}`, 20, 60);
    doc.text(`YCI+ Score: ${calculatedScore || 'Not calculated'}`, 20, 70);
    doc.text(`Badge Level: ${badge || 'Not assigned'}`, 20, 80);
    
    // Required qualifications
    if (positionRequirements.length > 0) {
      doc.text('Required Qualifications:', 20, 100);
      let yPos = 110;
      positionRequirements.forEach((qual) => {
        const status = formData.requiredQualifications.includes(qual) ? '✓' : '✗';
        doc.text(`${status} ${qual}`, 25, yPos);
        yPos += 10;
      });
      
      const completedCount = formData.requiredQualifications.length;
      const totalCount = positionRequirements.length;
      doc.text(`Completed: ${completedCount}/${totalCount} required qualifications`, 20, yPos + 10);
    }
    
    // Footer
    doc.text('Generated by Xplor YCI+ System', 20, 270);
    
    doc.save(`YCI_Report_${formData.crewName || 'Crew'}.pdf`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          YCI+ Score Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Crew Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Crew Information</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="crewName">Crew Name</Label>
              <Input
                id="crewName"
                value={formData.crewName}
                onChange={(e) => setFormData(prev => ({ ...prev, crewName: e.target.value }))}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="vesselTonnage">Vessel Tonnage</Label>
              <Select value={formData.vesselTonnage} onValueChange={(value) => setFormData(prev => ({ ...prev, vesselTonnage: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vessel tonnage" />
                </SelectTrigger>
                <SelectContent>
                  {vesselTonnages.map((tonnage) => (
                    <SelectItem key={tonnage} value={tonnage}>{tonnage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="position">Position on Yacht</Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}
                disabled={!formData.vesselTonnage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
                <SelectContent>
                  {availablePositions.map((position) => (
                    <SelectItem key={position} value={position}>{position}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Required Qualifications */}
        {positionRequirements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Required Qualifications</h3>
            <div className="border rounded-lg p-4 bg-muted/20">
              <div className="space-y-3">
                {positionRequirements.map((qualification) => (
                  <div key={qualification} className="flex items-center space-x-3">
                    <Checkbox
                      id={qualification}
                      checked={formData.requiredQualifications.includes(qualification)}
                      onCheckedChange={(checked) => handleCheckboxChange(qualification, 'requiredQualifications', !!checked)}
                    />
                    <Label htmlFor={qualification} className="text-sm flex-1">{qualification}</Label>
                    {formData.requiredQualifications.includes(qualification) && (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-md bg-background">
                {formData.requiredQualifications.length === positionRequirements.length ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">All required qualifications confirmed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {positionRequirements.length - formData.requiredQualifications.length} required qualifications missing
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Performance Criteria */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Performance Criteria</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yachtSeaTime">Yacht Sea Time (months)</Label>
              <Input
                id="yachtSeaTime"
                type="number"
                value={formData.yachtSeaTime}
                onChange={(e) => setFormData(prev => ({ ...prev, yachtSeaTime: e.target.value }))}
                placeholder="24"
              />
              <p className="text-sm text-muted-foreground mt-1">Full-time yacht experience</p>
            </div>
            <div>
              <Label htmlFor="merchantSeaTime">Merchant Sea Time (months)</Label>
              <Input
                id="merchantSeaTime"
                type="number"
                value={formData.merchantSeaTime}
                onChange={(e) => setFormData(prev => ({ ...prev, merchantSeaTime: e.target.value }))}
                placeholder="12"
              />
              <p className="text-sm text-muted-foreground mt-1">Automatically weighted at 10%</p>
            </div>
            <div>
              <Label htmlFor="chartersCompleted">Charters Completed</Label>
              <Input
                id="chartersCompleted"
                type="number"
                value={formData.chartersCompleted}
                onChange={(e) => setFormData(prev => ({ ...prev, chartersCompleted: e.target.value }))}
                placeholder="25"
              />
              <p className="text-sm text-muted-foreground mt-1">One point per 5 charters</p>
            </div>
            <div>
              <Label htmlFor="repeatCharters">Repeat Charters</Label>
              <Input
                id="repeatCharters"
                type="number"
                value={formData.repeatCharters}
                onChange={(e) => setFormData(prev => ({ ...prev, repeatCharters: e.target.value }))}
                placeholder="5"
              />
              <p className="text-sm text-muted-foreground mt-1">One point each</p>
            </div>
            <div>
              <Label htmlFor="crewReferred">Crew Referred to Xplor</Label>
              <Input
                id="crewReferred"
                type="number"
                value={formData.crewReferred}
                onChange={(e) => setFormData(prev => ({ ...prev, crewReferred: e.target.value }))}
                placeholder="3"
              />
              <p className="text-sm text-muted-foreground mt-1">One point each (max 10)</p>
            </div>
            <div>
              <Label htmlFor="yachtsReferred">Yachts Referred to Xplor</Label>
              <Input
                id="yachtsReferred"
                type="number"
                value={formData.yachtsReferred}
                onChange={(e) => setFormData(prev => ({ ...prev, yachtsReferred: e.target.value }))}
                placeholder="2"
              />
              <p className="text-sm text-muted-foreground mt-1">One point each (max 10)</p>
            </div>
          </div>
        </div>

        {/* Calculate Button and Results */}
        <div className="space-y-4">
          <Button 
            onClick={calculateScore} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            Calculate YCI+ Score
          </Button>

          {calculatedScore !== null && (
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold text-primary">YCI+ Score</h4>
                    <div className="text-4xl font-bold text-foreground">{calculatedScore}/70</div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round((calculatedScore / 70) * 100)}% of maximum score
                    </p>
                  </div>
                  
                  {badge && (
                    <div className="flex justify-center">
                      <Badge 
                        className={`text-lg px-4 py-2 ${getBadgeColor(badge)}`}
                      >
                        <Award className="mr-2 h-5 w-5" />
                        {badge}
                      </Badge>
                    </div>
                  )}

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Qualifications:</span>
                        <span className="font-medium">
                          {positionRequirements.length > 0 
                            ? Math.round((formData.requiredQualifications.length / positionRequirements.length) * 20 * 10) / 10
                            : 0}/20
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span className="font-medium">
                          {Math.round(Math.min(((parseInt(formData.yachtSeaTime) || 0) + ((parseInt(formData.merchantSeaTime) || 0) * 0.1)) / 12, 20) * 10) / 10}/20
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Charters:</span>
                        <span className="font-medium">
                          {Math.round(Math.min(((parseInt(formData.chartersCompleted) || 0) / 5) + (parseInt(formData.repeatCharters) || 0), 20) * 10) / 10}/20
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contributions:</span>
                        <span className="font-medium">
                          {Math.min(Math.min((parseInt(formData.crewReferred) || 0), 10) + Math.min((parseInt(formData.yachtsReferred) || 0), 10), 10)}/10
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center pt-4">
                    <Button 
                      onClick={exportToPDF}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  );
};