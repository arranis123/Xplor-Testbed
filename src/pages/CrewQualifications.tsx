import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MinimumRequirementsForm } from '@/components/MinimumRequirementsForm';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, Download, Users, Ship, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CrewQualifications() {
  const staticQualifications = [
    {
      position: "Captain",
      under200: ["RYA YM Offshore", "STCW", "ENG1", "VHF Radio"],
      under500: ["MCA Master <500 GT", "GMDSS", "HELM"],
      under3000: ["MCA Master <3000 GT", "ECDIS", "GMDSS", "SSO"]
    },
    {
      position: "Chief Engineer", 
      under200: ["AEC 1", "STCW", "ENG1"],
      under500: ["MEOL (Y)", "AEC 1&2"],
      under3000: ["Y3/Y4 CoC", "HV Cert", "AEC 1,2&3", "STCW Adv"]
    },
    {
      position: "Deckhand",
      under200: ["STCW", "ENG1", "RYA PB2"],
      under500: ["+ PWC", "PDSD"],
      under3000: ["+ Yacht Rating Cert"]
    },
    {
      position: "Chief Steward(ess)",
      under200: ["STCW", "ENG1"],
      under500: ["+ GUEST", "WSET"],
      under3000: ["+ WSET 2–3", "HELM Optional"]
    },
    {
      position: "Chef",
      under200: ["STCW", "ENG1", "Food Hygiene L2"],
      under500: ["+ Culinary Cert", "L3 Food Safety"],
      under3000: ["+ Culinary Diploma", "HACCP"]
    },
    {
      position: "ETO",
      under200: ["—"],
      under500: ["—"],
      under3000: ["ETO CoC", "AV/IT Certs", "STCW"]
    },
    {
      position: "Purser",
      under200: ["—"],
      under500: ["Optional Experience"],
      under3000: ["Purser Cert", "Admin & Accounting"]
    }
  ];

  const flagStateInfo = [
    {
      flag: "🇬🇧 MCA CoCs",
      description: "UK Maritime and Coastguard Agency certificates recognized worldwide for commercial yacht operations."
    },
    {
      flag: "🇺🇸 USCG Equivalents", 
      description: "US Coast Guard licenses can be converted to MCA equivalents through endorsement process."
    },
    {
      flag: "🇨🇾 Marshall Islands / Cayman",
      description: "Popular flag states offering streamlined certification processes for yacht crew."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Minimum Crew Qualifications by Position & Yacht Size | Xplor</title>
        <meta 
          name="description" 
          content="Understand mandatory certifications and qualifications required for yacht crew positions based on vessel tonnage. Stay compliant with MCA, STCW, and international standards." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/20">
              <Award className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Understand Your Crew Certification Requirements
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore the mandatory certifications and qualifications required for each yacht crew position, 
            based on vessel tonnage. Stay compliant, advance your career, and align with MCA, STCW, and international standards.
          </p>
          <Button size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download MCA Certification Guide
          </Button>
        </div>
      </section>

      {/* Interactive Lookup Tool */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Qualification Lookup</h2>
            <p className="text-muted-foreground text-lg">
              Select your yacht size and position to see specific requirements
            </p>
          </div>
          <MinimumRequirementsForm />
        </div>
      </section>

      {/* Static Reference Table */}
      <section className="py-16 px-4 bg-secondary/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Complete Reference Table</h2>
            <p className="text-muted-foreground text-lg">
              Overview of qualifications across all positions and yacht sizes
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4 font-semibold">Position</th>
                      <th className="text-left p-4 font-semibold">Under 200 GRT</th>
                      <th className="text-left p-4 font-semibold">Under 500 GRT</th>
                      <th className="text-left p-4 font-semibold">Under 3000 GRT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticQualifications.map((row, index) => (
                      <tr key={index} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-medium">{row.position}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {row.under200.map((qual, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {row.under500.map((qual, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {row.under3000.map((qual, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Flag State Notes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Flag State Certification Notes</h2>
            <p className="text-muted-foreground text-lg">
              Important information about different maritime authorities and endorsements
            </p>
          </div>

          <div className="space-y-4">
            {flagStateInfo.map((info, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{info.flag}</CardTitle>
                        <ChevronDown className="h-5 w-5 transition-transform" />
                      </div>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 border-t-0 rounded-t-none">
                    <CardContent className="pt-4">
                      <p className="text-muted-foreground">{info.description}</p>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-full bg-primary/20">
              <Users className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Profile?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Use your qualifications to calculate your YCI+ score and join the network of top-performing yacht crew worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/crew-rating">Calculate Your YCI+ Score</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/fair-share-crew">Join FairShare Program</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}