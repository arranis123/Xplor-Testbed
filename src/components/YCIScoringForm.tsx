import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Award } from 'lucide-react';

interface FormData {
  yearsInYachting: string;
  seaMiles: string;
  contractsCompleted: string;
  stcwLevel: string;
  additionalCerts: string[];
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

export const YCIScoringForm = () => {
  const [formData, setFormData] = useState<FormData>({
    yearsInYachting: '',
    seaMiles: '',
    contractsCompleted: '',
    stcwLevel: '',
    additionalCerts: [],
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
    totalScore += formData.additionalCerts.length * 2; // Up to 6 points
    totalScore += formData.specializedTraining.length * 2; // Up to 6 points

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          YCI+ Score Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
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