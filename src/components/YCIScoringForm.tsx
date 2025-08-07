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
  position: string;
  crewName: string;
  yearsInYachting: string;
  seaMiles: string;
  contractsCompleted: string;
  stcwLevel: string;
  additionalCerts: string[];
  requiredQualifications: string[];
  specializedTraining: string[];
  totalCharters: string;
  avgTipsPerCharter: string;
  repeatGuests: string;
  promotions: string;
  crossDepartmental: boolean;
  languages: string;
  specialties: string[];
  yachtsReferred: string;
  crewReferred: string;
  profileUpdates: string;
  eventsAttended: string;
  references: string;
  cleanRecord: boolean;
  avgYearsPerYacht: string;
  returnEmployment: boolean;
  atlanticCrossings: string;
  regionsVisited: string[];
  canalTransits: string[];
}

// Position and qualification data
const positions = [
  'Captain', 'Chief Officer', 'Second Officer', 'Bosun', 'Deckhand',
  'Chief Engineer', 'Second Engineer', 'ETO', 'Assistant Engineer',
  'Chief Steward(ess)', '2nd Steward(ess)', '3rd Steward(ess)',
  'Chef', 'Sous Chef', 'Purser', 'Medic/Security', 'HLO (Helicopter Landing Officer)'
];

const positionQualifications: { [key: string]: string[] } = {
  'Captain': ['STCW Basic Training', 'ENG1 Medical', 'Master 3000 GT CoC', 'GMDSS GOC', 'Advanced Fire Fighting', 'ECDIS Certification'],
  'Chief Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 3000 GT', 'GMDSS GOC', 'Advanced Fire Fighting', 'ECDIS Certification'],
  'Second Officer': ['STCW Basic Training', 'ENG1 Medical', 'Officer of the Watch 500 GT', 'GMDSS GOC', 'Basic Fire Fighting'],
  'Bosun': ['STCW Basic Training', 'ENG1 Medical', 'Proficiency in Survival Craft', 'Basic Fire Fighting'],
  'Deckhand': ['STCW Basic Training', 'ENG1 Medical', 'Basic Fire Fighting'],
  'Chief Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Chief Engineer Motor 3000kW', 'Advanced Fire Fighting'],
  'Second Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Second Engineer Motor 3000kW', 'Basic Fire Fighting'],
  'ETO': ['STCW Basic Training', 'ENG1 Medical', 'Electro-Technical Officer Certificate', 'Basic Fire Fighting'],
  'Assistant Engineer': ['STCW Basic Training', 'ENG1 Medical', 'Marine Engineering Certificate', 'Basic Fire Fighting'],
  'Chief Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 2', 'First Aid'],
  '2nd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1', 'First Aid'],
  '3rd Steward(ess)': ['STCW Basic Training', 'ENG1 Medical', 'Food Safety Level 1'],
  'Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 3'],
  'Sous Chef': ['STCW Basic Training', 'ENG1 Medical', 'Professional Chef Certificate', 'Food Safety Level 2'],
  'Purser': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Administration Certificate'],
  'Medic/Security': ['STCW Basic Training', 'ENG1 Medical', 'Ship Security Officer', 'Medical Care Provider', 'First Aid'],
  'HLO (Helicopter Landing Officer)': ['STCW Basic Training', 'ENG1 Medical', 'Helicopter Landing Officer Certificate', 'Basic Fire Fighting']
};

export const YCIScoringForm = () => {
  const [formData, setFormData] = useState<FormData>({
    position: '',
    crewName: '',
    yearsInYachting: '',
    seaMiles: '',
    contractsCompleted: '',
    stcwLevel: '',
    additionalCerts: [],
    requiredQualifications: [],
    specializedTraining: [],
    totalCharters: '',
    avgTipsPerCharter: '',
    repeatGuests: '',
    promotions: '',
    crossDepartmental: false,
    languages: '',
    specialties: [],
    yachtsReferred: '',
    crewReferred: '',
    profileUpdates: '',
    eventsAttended: '',
    references: '',
    cleanRecord: false,
    avgYearsPerYacht: '',
    returnEmployment: false,
    atlanticCrossings: '',
    regionsVisited: [],
    canalTransits: []
  });

  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  const [badge, setBadge] = useState<string>('');
  const [positionRequirements, setPositionRequirements] = useState<string[]>([]);

  // Update required qualifications when position changes
  useEffect(() => {
    if (formData.position && positionQualifications[formData.position]) {
      setPositionRequirements(positionQualifications[formData.position]);
    } else {
      setPositionRequirements([]);
    }
  }, [formData.position]);

  const calculateScore = () => {
    let totalScore = 0;

    // Experience & Longevity (25 points)
    const years = parseInt(formData.yearsInYachting) || 0;
    const miles = parseInt(formData.seaMiles) || 0;
    const contracts = parseInt(formData.contractsCompleted) || 0;
    
    totalScore += Math.min(years * 2, 10); // Max 10 points for years
    totalScore += Math.min(miles / 10000, 10); // Max 10 points for miles
    totalScore += Math.min(contracts * 0.5, 5); // Max 5 points for contracts

    // Qualifications & Training (20 points)
    const stcwPoints = formData.stcwLevel === 'advanced' ? 8 : formData.stcwLevel === 'basic' ? 4 : 0;
    totalScore += stcwPoints;
    
    // Position-based qualification score
    if (positionRequirements.length > 0) {
      const completedRequiredQuals = formData.requiredQualifications.length;
      const totalRequiredQuals = positionRequirements.length;
      const qualificationScore = (completedRequiredQuals / totalRequiredQuals) * 10;
      totalScore += qualificationScore;
    } else {
      totalScore += formData.additionalCerts.length * 2; // Fallback to old system
    }
    
    totalScore += formData.specializedTraining.length * 1; // Reduced from 2 to balance

    // Charter Performance (15 points)
    const charters = parseInt(formData.totalCharters) || 0;
    const tips = parseInt(formData.avgTipsPerCharter) || 0;
    const repeats = parseInt(formData.repeatGuests) || 0;
    
    totalScore += Math.min(charters * 0.2, 5);
    totalScore += Math.min(tips / 100, 5);
    totalScore += Math.min(repeats * 0.5, 5);

    // Career Progression (10 points)
    const promotions = parseInt(formData.promotions) || 0;
    totalScore += Math.min(promotions * 3, 7);
    if (formData.crossDepartmental) totalScore += 3;

    // Skills & Languages (10 points)
    const languages = parseInt(formData.languages) || 0;
    totalScore += Math.min(languages * 2, 6);
    totalScore += Math.min(formData.specialties.length * 1, 4);

    // Xplor Contributions (10 points)
    const yachtsRef = parseInt(formData.yachtsReferred) || 0;
    const crewRef = parseInt(formData.crewReferred) || 0;
    const updates = parseInt(formData.profileUpdates) || 0;
    const events = parseInt(formData.eventsAttended) || 0;
    
    totalScore += Math.min(yachtsRef * 2, 3);
    totalScore += Math.min(crewRef * 1, 3);
    totalScore += Math.min(updates * 0.1, 2);
    totalScore += Math.min(events * 0.5, 2);

    // Professional Standing (5 points)
    const refs = parseInt(formData.references) || 0;
    totalScore += Math.min(refs * 1, 3);
    if (formData.cleanRecord) totalScore += 2;

    // Yacht Loyalty (5 points)
    const avgYears = parseFloat(formData.avgYearsPerYacht) || 0;
    totalScore += Math.min(avgYears, 3);
    if (formData.returnEmployment) totalScore += 2;

    // Global Navigation Experience (Bonus - up to 10 points)
    const crossings = parseInt(formData.atlanticCrossings) || 0;
    totalScore += Math.min(crossings * 2, 4);
    totalScore += Math.min(formData.regionsVisited.length * 1, 4);
    totalScore += Math.min(formData.canalTransits.length * 1, 2);

    // Cap at 100
    totalScore = Math.min(totalScore, 100);
    
    setCalculatedScore(Math.round(totalScore * 10) / 10);

    // Determine badge
    if (totalScore >= 90) setBadge('Platinum Crew');
    else if (totalScore >= 75) setBadge('Gold Crew');
    else if (totalScore >= 60) setBadge('Silver Crew');
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
        {/* Position and Name */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Crew Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
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
              <Label htmlFor="position">Position on Yacht</Label>
              <Select value={formData.position} onValueChange={(value) => setFormData(prev => ({ ...prev, position: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
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

        {/* Experience & Longevity */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Experience & Longevity (25 points)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearsInYachting">Years in Yachting</Label>
              <Input
                id="yearsInYachting"
                type="number"
                value={formData.yearsInYachting}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsInYachting: e.target.value }))}
                placeholder="5"
              />
            </div>
            <div>
              <Label htmlFor="seaMiles">Sea Miles Logged</Label>
              <Input
                id="seaMiles"
                type="number"
                value={formData.seaMiles}
                onChange={(e) => setFormData(prev => ({ ...prev, seaMiles: e.target.value }))}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="contractsCompleted">Contracts Completed</Label>
              <Input
                id="contractsCompleted"
                type="number"
                value={formData.contractsCompleted}
                onChange={(e) => setFormData(prev => ({ ...prev, contractsCompleted: e.target.value }))}
                placeholder="12"
              />
            </div>
          </div>
        </div>

        {/* Qualifications & Training */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Qualifications & Training (20 points)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stcwLevel">STCW Level</Label>
              <Select value={formData.stcwLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, stcwLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select STCW level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic STCW</SelectItem>
                  <SelectItem value="advanced">Advanced STCW</SelectItem>
                  <SelectItem value="officer">Officer Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Additional Certifications</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {['ENG1', 'Yachtmaster', 'Food Safety', 'First Aid', 'Dive Cert', 'AV/IT'].map((cert) => (
                <div key={cert} className="flex items-center space-x-2">
                  <Checkbox
                    id={cert}
                    checked={formData.additionalCerts.includes(cert)}
                    onCheckedChange={(checked) => handleCheckboxChange(cert, 'additionalCerts', !!checked)}
                  />
                  <Label htmlFor={cert} className="text-sm">{cert}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Specialized Training</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {['Beauty/Spa', 'Wine Service', 'Water Sports', 'Photography', 'Medical', 'Security'].map((training) => (
                <div key={training} className="flex items-center space-x-2">
                  <Checkbox
                    id={training}
                    checked={formData.specializedTraining.includes(training)}
                    onCheckedChange={(checked) => handleCheckboxChange(training, 'specializedTraining', !!checked)}
                  />
                  <Label htmlFor={training} className="text-sm">{training}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charter Performance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Charter Performance (15 points)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalCharters">Total Charters</Label>
              <Input
                id="totalCharters"
                type="number"
                value={formData.totalCharters}
                onChange={(e) => setFormData(prev => ({ ...prev, totalCharters: e.target.value }))}
                placeholder="25"
              />
            </div>
            <div>
              <Label htmlFor="avgTipsPerCharter">Avg Tips per Charter (€)</Label>
              <Input
                id="avgTipsPerCharter"
                type="number"
                value={formData.avgTipsPerCharter}
                onChange={(e) => setFormData(prev => ({ ...prev, avgTipsPerCharter: e.target.value }))}
                placeholder="500"
              />
            </div>
            <div>
              <Label htmlFor="repeatGuests">Repeat Guest Trips</Label>
              <Input
                id="repeatGuests"
                type="number"
                value={formData.repeatGuests}
                onChange={(e) => setFormData(prev => ({ ...prev, repeatGuests: e.target.value }))}
                placeholder="8"
              />
            </div>
          </div>
        </div>

        {/* Career Progression */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Career Progression (10 points)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="promotions">Promotions Achieved</Label>
              <Input
                id="promotions"
                type="number"
                value={formData.promotions}
                onChange={(e) => setFormData(prev => ({ ...prev, promotions: e.target.value }))}
                placeholder="2"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="crossDepartmental"
                checked={formData.crossDepartmental}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, crossDepartmental: !!checked }))}
              />
              <Label htmlFor="crossDepartmental">Cross-departmental Experience</Label>
            </div>
          </div>
        </div>

        {/* Skills & Languages */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold border-b pb-2">Skills & Languages (10 points)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="languages">Number of Fluent Languages</Label>
              <Input
                id="languages"
                type="number"
                value={formData.languages}
                onChange={(e) => setFormData(prev => ({ ...prev, languages: e.target.value }))}
                placeholder="3"
              />
            </div>
          </div>
          
          <div>
            <Label>Specialties</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {['Guest Relations', 'Medical Training', 'Technical Skills', 'Event Planning', 'Mixology', 'Navigation'].map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={specialty}
                    checked={formData.specialties.includes(specialty)}
                    onCheckedChange={(checked) => handleCheckboxChange(specialty, 'specialties', !!checked)}
                  />
                  <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Result Display */}
        {calculatedScore !== null && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Your YCI+ Score</h3>
                </div>
                <div className="text-6xl font-bold text-primary">
                  {calculatedScore}
                </div>
                <div className="flex justify-center">
                  <Badge className={getBadgeColor(badge) + " text-lg px-4 py-2"}>
                    {badge}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  This score is based on the information you provided. For official verification, 
                  join the Xplor crew network.
                </p>
                {calculatedScore !== null && (
                  <Button onClick={exportToPDF} variant="outline" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Export as PDF
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-center">
          <Button onClick={calculateScore} size="lg" className="px-8">
            <Calculator className="h-5 w-5 mr-2" />
            Calculate My YCI+ Score
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};