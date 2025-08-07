import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle } from 'lucide-react';

const qualificationMatrix = {
  "<200 GRT": {
    Captain: [
      { name: "RYA Yachtmaster Offshore", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "VHF Radio License", mandatory: true },
      { name: "Basic Fire Fighting", mandatory: true }
    ],
    Engineer: [
      { name: "AEC 1 (Assistant Engineer Certificate)", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Basic Fire Fighting", mandatory: true }
    ],
    Deckhand: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "RYA Powerboat Level 2", mandatory: true }
    ],
    "Chief Steward(ess)": [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Food Hygiene Level 2", mandatory: true },
      { name: "Guest Service Training", mandatory: false }
    ],
    "2nd Steward(ess)": [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Food Hygiene Level 2", mandatory: true }
    ],
    Chef: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Food Hygiene Level 2", mandatory: true },
      { name: "Culinary Certificate", mandatory: false }
    ]
  },
  "<500 GRT": {
    Captain: [
      { name: "MCA Master <500 GT", mandatory: true },
      { name: "GMDSS GOC", mandatory: true },
      { name: "HELM (Human Element Leadership & Management)", mandatory: true },
      { name: "STCW Advanced Fire Fighting", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    "Chief Officer": [
      { name: "OOW <500 GT", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Basic Fire Fighting", mandatory: true }
    ],
    Engineer: [
      { name: "MEOL (Y) - Marine Engineer Officer License", mandatory: true },
      { name: "AEC 1 & 2", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    Deckhand: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "RYA Powerboat Level 2", mandatory: true },
      { name: "PWC License", mandatory: true },
      { name: "PDSD (Personal Watercraft)", mandatory: true }
    ],
    "Chief Steward(ess)": [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "GUEST (Guest Service Training)", mandatory: true },
      { name: "WSET Level 1", mandatory: true },
      { name: "Food Hygiene Level 3", mandatory: true }
    ],
    Chef: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Culinary Certificate", mandatory: true },
      { name: "Food Safety Level 3", mandatory: true }
    ]
  },
  "<3000 GRT": {
    Captain: [
      { name: "MCA Master <3000 GT", mandatory: true },
      { name: "ECDIS Certification", mandatory: true },
      { name: "GMDSS GOC", mandatory: true },
      { name: "HELM (Human Element Leadership & Management)", mandatory: true },
      { name: "STCW Advanced Fire Fighting", mandatory: true },
      { name: "Ship Security Officer (SSO)", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    "Chief Officer": [
      { name: "OOW <3000 GT", mandatory: true },
      { name: "ECDIS Certification", mandatory: true },
      { name: "STCW Advanced Fire Fighting", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    "Chief Engineer": [
      { name: "Y3/Y4 CoC (Engineer Certificate of Competency)", mandatory: true },
      { name: "HV Certificate (High Voltage)", mandatory: true },
      { name: "AEC 1, 2 & 3", mandatory: true },
      { name: "STCW Advanced Fire Fighting", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    ETO: [
      { name: "ETO CoC (Electro Technical Officer)", mandatory: true },
      { name: "AV/IT Certifications", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ],
    Deckhand: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Yacht Rating Certificate", mandatory: true },
      { name: "RYA Powerboat Level 2", mandatory: true }
    ],
    "Chief Steward(ess)": [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "WSET Level 2-3", mandatory: true },
      { name: "HELM Optional", mandatory: false },
      { name: "Food Hygiene Level 3", mandatory: true }
    ],
    Chef: [
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true },
      { name: "Culinary Diploma", mandatory: true },
      { name: "HACCP Certification", mandatory: true },
      { name: "Food Safety Level 3", mandatory: true }
    ],
    Purser: [
      { name: "Purser Certificate", mandatory: true },
      { name: "Administration & Accounting", mandatory: true },
      { name: "STCW Basic Training", mandatory: true },
      { name: "ENG1 Medical", mandatory: true }
    ]
  }
};

export function MinimumRequirementsForm() {
  const [selectedTonnage, setSelectedTonnage] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const tonnageOptions = Object.keys(qualificationMatrix);
  const positionOptions = selectedTonnage ? Object.keys(qualificationMatrix[selectedTonnage as keyof typeof qualificationMatrix]) : [];
  const qualifications = selectedTonnage && selectedPosition 
    ? qualificationMatrix[selectedTonnage as keyof typeof qualificationMatrix][selectedPosition as keyof typeof qualificationMatrix[keyof typeof qualificationMatrix]]
    : [];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Quick Qualification Lookup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Yacht Size</label>
            <Select value={selectedTonnage} onValueChange={setSelectedTonnage}>
              <SelectTrigger>
                <SelectValue placeholder="Choose yacht tonnage" />
              </SelectTrigger>
              <SelectContent>
                {tonnageOptions.map((tonnage) => (
                  <SelectItem key={tonnage} value={tonnage}>
                    {tonnage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select Crew Position</label>
            <Select 
              value={selectedPosition} 
              onValueChange={setSelectedPosition}
              disabled={!selectedTonnage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose crew position" />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {qualifications.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Required Qualifications for {selectedPosition} on {selectedTonnage} vessel:
            </h3>
            <div className="grid gap-3">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {qual.mandatory ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                    )}
                    <span className="font-medium">{qual.name}</span>
                  </div>
                  <Badge variant={qual.mandatory ? "default" : "secondary"}>
                    {qual.mandatory ? "Mandatory" : "Optional"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}