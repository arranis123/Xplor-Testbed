import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UploadSpaceDialog } from "@/components/UploadSpaceDialog";
import { useState } from "react";

const YachtCrewOffer = () => {
  const navigate = useNavigate();
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-xplor-black text-white py-6">
        <div className="max-w-4xl mx-auto px-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-xplor-grey mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Yacht Crew Offer</h1>
        </div>
      </div>

      {/* Add Your Yacht Button - Top */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowUploadDialog(true)}
            className="bg-xplor-yellow hover:bg-xplor-yellow-dark text-xplor-black px-8 py-3 text-lg"
          >
            Add Your Yacht
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-xplor-yellow-dark font-typografix">
              xplor Brokerage Charter Commission Model
            </h2>
            
            <p className="text-lg mb-8 leading-relaxed">
              <span className="font-typografix">xplor</span> Brokerage is designed to reward the crew by distributing 50% of all charter commission fees evenly among them. When appointed as the central broker, we have the infrastructure to ensure direct and transparent payments to the crew—guaranteeing their share regardless of how or when the yacht is chartered.
            </p>

            <p className="text-lg mb-12 leading-relaxed">
              For charters booked directly through <span className="font-typografix">xplor</span>, with no third-party brokers involved, the full commission is shared exclusively between <span className="font-typografix">xplor</span> and the crew—maximizing the benefit for all onboard. This is ideal for repeat charter guests who prefer to book directly.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits to Crew */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-xplor-yellow-dark flex items-center">
                  🔹 Benefits to Crew
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">1. Guaranteed Income Boost</h4>
                    <p className="text-sm text-muted-foreground">
                      Crew members receive a direct share (50%) of all charter commission fees, increasing their overall earnings beyond salary and gratuities.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Consistent Compensation</h4>
                    <p className="text-sm text-muted-foreground">
                      Payments are guaranteed regardless of the charter source (broker network or direct booking), offering financial stability.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Direct Payouts</h4>
                    <p className="text-sm text-muted-foreground">
                      Funds are distributed directly to crew by <span className="font-typografix">xplor</span>, ensuring transparency, fairness, and timely delivery.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4. Incentive for Exceptional Service</h4>
                    <p className="text-sm text-muted-foreground">
                      A tangible reward structure motivates crew to maintain high service levels, knowing repeat charters benefit them directly.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">5. Attracts Top Talent</h4>
                    <p className="text-sm text-muted-foreground">
                      Yachts offering commission-sharing programs are more attractive to experienced crew looking for high-value roles.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">6. Improved Morale and Loyalty</h4>
                    <p className="text-sm text-muted-foreground">
                      Sharing in the yacht's commercial success fosters a sense of ownership and teamwork among crew members.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">7. Repeat Guest Leverage</h4>
                    <p className="text-sm text-muted-foreground">
                      Repeat guests booking directly through <span className="font-typografix">xplor</span> maximize the crew's commission share, giving crew a reason to nurture guest relationships.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits to Owners */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-xplor-yellow-dark flex items-center">
                  🔹 Benefits to Owners
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">1. Enhanced Charter Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Motivated, well-compensated crew lead to better guest experiences, increasing the likelihood of repeat bookings.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">2. Stronger Guest Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      Guests are more likely to return to a yacht with an enthusiastic, service-driven crew.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">3. Streamlined Broker-Crew Relationship</h4>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-typografix">xplor</span>'s direct payout model minimizes administrative hassle and ensures clarity in commission handling.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4. Transparent Commission Handling</h4>
                    <p className="text-sm text-muted-foreground">
                      Eliminates ambiguity around who earns what—making financial reporting and charter accounting simpler.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">5. Market Differentiation</h4>
                    <p className="text-sm text-muted-foreground">
                      Promotes the yacht as crew-focused and guest-centered, appealing to charter clients who value service continuity.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">6. Improved Crew Retention</h4>
                    <p className="text-sm text-muted-foreground">
                      Financial incentives tied to charter performance reduce turnover and protect the investment in well-trained crew.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">7. Direct Booking Incentives</h4>
                    <p className="text-sm text-muted-foreground">
                      When clients book directly through <span className="font-typografix">xplor</span>, owners reduce external broker fees, and more commission stays within the yacht's ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Your Yacht Button - Bottom */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowUploadDialog(true)}
            className="bg-xplor-yellow hover:bg-xplor-yellow-dark text-xplor-black px-8 py-3 text-lg"
          >
            Add Your Yacht
          </Button>
        </div>
      </div>

      {/* Upload Dialog */}
      <UploadSpaceDialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        category="yacht"
      />
    </div>
  );
};

export default YachtCrewOffer;