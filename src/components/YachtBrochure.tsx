import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Ship, Anchor, Users, Calendar, DollarSign, MapPin, Ruler, Zap } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface YachtBrochureProps {
  yachtData: any;
  onClose?: () => void;
}

export function YachtBrochure({ yachtData, onClose }: YachtBrochureProps) {
  const generatePDF = async () => {
    const element = document.getElementById('yacht-brochure');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      const fileName = `${yachtData.title || 'yacht'}-brochure.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Yacht Brochure Preview</h2>
        <div className="flex gap-2">
          <Button onClick={generatePDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>

      <div id="yacht-brochure" className="bg-white p-8 space-y-8 text-black min-h-[297mm]" style={{ width: '210mm' }}>
        {/* Header */}
        <div className="text-center space-y-4 border-b pb-6">
          <h1 className="text-4xl font-bold text-blue-900">{yachtData.title || 'Luxury Yacht'}</h1>
          <p className="text-xl text-gray-600">{yachtData.yachtBuilder && yachtData.yachtModel ? `${yachtData.yachtBuilder} ${yachtData.yachtModel}` : 'Premium Charter Experience'}</p>
          <div className="flex justify-center gap-4 text-sm">
            {yachtData.yachtYearBuilt && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Built {yachtData.yachtYearBuilt}
              </Badge>
            )}
            {yachtData.yachtLOA && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {yachtData.yachtLOA}m
              </Badge>
            )}
            {yachtData.yachtGuestsNumber && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {yachtData.yachtGuestsNumber} Guests
              </Badge>
            )}
          </div>
        </div>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Ship className="h-5 w-5" />
              Yacht Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{yachtData.description || 'Discover the ultimate luxury charter experience aboard this magnificent yacht.'}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {yachtData.yachtBuilder && (
                <div>
                  <span className="font-semibold text-gray-900">Builder:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtBuilder}</span>
                </div>
              )}
              {yachtData.yachtModel && (
                <div>
                  <span className="font-semibold text-gray-900">Model:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtModel}</span>
                </div>
              )}
              {yachtData.yachtYearBuilt && (
                <div>
                  <span className="font-semibold text-gray-900">Year Built:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtYearBuilt}</span>
                </div>
              )}
              {yachtData.yachtYearRefit && (
                <div>
                  <span className="font-semibold text-gray-900">Last Refit:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtYearRefit}</span>
                </div>
              )}
              {yachtData.yachtClassification && (
                <div>
                  <span className="font-semibold text-gray-900">Classification:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtClassification}</span>
                </div>
              )}
              {yachtData.location && (
                <div>
                  <span className="font-semibold text-gray-900">Location:</span>
                  <span className="ml-2 text-gray-700">{yachtData.location}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Ruler className="h-5 w-5" />
              Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {yachtData.yachtLOA && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Length Overall</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtLOA}m</div>
                </div>
              )}
              {yachtData.yachtBeam && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Beam</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtBeam}m</div>
                </div>
              )}
              {yachtData.yachtDraft && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Draft</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtDraft}m</div>
                </div>
              )}
              {yachtData.yachtGrossTonnage && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Gross Tonnage</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtGrossTonnage}</div>
                </div>
              )}
              {yachtData.yachtMaxSpeed && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Max Speed</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtMaxSpeed} kts</div>
                </div>
              )}
              {yachtData.yachtCruisingSpeed && (
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="font-semibold text-gray-900">Cruising Speed</div>
                  <div className="text-xl text-blue-600">{yachtData.yachtCruisingSpeed} kts</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Accommodations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Users className="h-5 w-5" />
              Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Guest Accommodation</h4>
                <div className="space-y-1">
                  {yachtData.yachtGuestsNumber && (
                    <div>Maximum Guests: <span className="font-medium">{yachtData.yachtGuestsNumber}</span></div>
                  )}
                  {yachtData.yachtGuestCabins && (
                    <div>Guest Cabins: <span className="font-medium">{yachtData.yachtGuestCabins}</span></div>
                  )}
                  {yachtData.bedrooms && (
                    <div>Bedrooms: <span className="font-medium">{yachtData.bedrooms}</span></div>
                  )}
                  {yachtData.bathrooms && (
                    <div>Bathrooms: <span className="font-medium">{yachtData.bathrooms}</span></div>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Crew</h4>
                <div className="space-y-1">
                  {yachtData.yachtCrewNumber && (
                    <div>Crew Members: <span className="font-medium">{yachtData.yachtCrewNumber}</span></div>
                  )}
                  {yachtData.yachtCrewCabins && (
                    <div>Crew Cabins: <span className="font-medium">{yachtData.yachtCrewCabins}</span></div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engine & Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Zap className="h-5 w-5" />
              Engine & Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {yachtData.yachtEngineMake && (
                <div>
                  <span className="font-semibold text-gray-900">Engine Make:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtEngineMake}</span>
                </div>
              )}
              {yachtData.yachtEngineCount && (
                <div>
                  <span className="font-semibold text-gray-900">Engine Count:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtEngineCount}</span>
                </div>
              )}
              {yachtData.yachtEnginePower && (
                <div>
                  <span className="font-semibold text-gray-900">Engine Power:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtEnginePower}</span>
                </div>
              )}
              {yachtData.yachtPropulsionType && (
                <div>
                  <span className="font-semibold text-gray-900">Propulsion:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtPropulsionType}</span>
                </div>
              )}
              {yachtData.yachtRange && (
                <div>
                  <span className="font-semibold text-gray-900">Range:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtRange}</span>
                </div>
              )}
              {yachtData.yachtFuelConsumption && (
                <div>
                  <span className="font-semibold text-gray-900">Fuel Consumption:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtFuelConsumption}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Amenities & Features */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Anchor className="h-5 w-5" />
              Luxury Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {yachtData.yachtDeckJacuzzi && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Deck Jacuzzi</span>
                </div>
              )}
              {yachtData.yachtBeachClub && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Beach Club</span>
                </div>
              )}
              {yachtData.yachtPool && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Swimming Pool</span>
                </div>
              )}
              {yachtData.yachtSpa && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Spa</span>
                </div>
              )}
              {yachtData.yachtGym && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Gymnasium</span>
                </div>
              )}
              {yachtData.yachtCinema && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Cinema</span>
                </div>
              )}
              {yachtData.yachtElevator && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Elevator</span>
                </div>
              )}
              {yachtData.yachtSunDeck && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Sun Deck</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Water Toys */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Anchor className="h-5 w-5" />
              Water Toys & Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {yachtData.yachtJetSkis && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Jet Skis</span>
                </div>
              )}
              {yachtData.yachtSeabobs && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Seabobs</span>
                </div>
              )}
              {yachtData.yachtDivingEquipment && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Diving Equipment</span>
                </div>
              )}
              {yachtData.yachtWaterskis && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Water Skis</span>
                </div>
              )}
              {yachtData.yachtInflatableToys && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Inflatable Toys</span>
                </div>
              )}
              {yachtData.yachtFishingGear && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span>Fishing Gear</span>
                </div>
              )}
              {yachtData.yachtPrimaryTender && (
                <div className="col-span-2">
                  <span className="font-semibold">Primary Tender:</span>
                  <span className="ml-2">{yachtData.yachtPrimaryTender}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Charter Information */}
        {(yachtData.charterRate || yachtData.yachtCharterRateInfo) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <DollarSign className="h-5 w-5" />
                Charter Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {yachtData.charterRate && (
                  <div>
                    <span className="font-semibold text-gray-900">Charter Rate:</span>
                    <span className="ml-2 text-gray-700">{yachtData.charterRate}</span>
                  </div>
                )}
                {yachtData.yachtCharterRateInfo && (
                  <div>
                    <span className="font-semibold text-gray-900">Rate Details:</span>
                    <span className="ml-2 text-gray-700">{yachtData.yachtCharterRateInfo}</span>
                  </div>
                )}
                {yachtData.yachtCharterRegions && (
                  <div>
                    <span className="font-semibold text-gray-900">Charter Regions:</span>
                    <span className="ml-2 text-gray-700">{yachtData.yachtCharterRegions}</span>
                  </div>
                )}
                {yachtData.yachtMinBookingDuration && (
                  <div>
                    <span className="font-semibold text-gray-900">Minimum Charter:</span>
                    <span className="ml-2 text-gray-700">{yachtData.yachtMinBookingDuration}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <MapPin className="h-5 w-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {yachtData.yachtBrokerageCompany && (
                <div>
                  <span className="font-semibold text-gray-900">Brokerage:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtBrokerageCompany}</span>
                </div>
              )}
              {yachtData.yachtBrokerName && (
                <div>
                  <span className="font-semibold text-gray-900">Broker:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtBrokerName}</span>
                </div>
              )}
              {yachtData.yachtBrokerContact && (
                <div>
                  <span className="font-semibold text-gray-900">Contact:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtBrokerContact}</span>
                </div>
              )}
              {yachtData.yachtWebsiteLink && (
                <div>
                  <span className="font-semibold text-gray-900">Website:</span>
                  <span className="ml-2 text-gray-700">{yachtData.yachtWebsiteLink}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pt-6 border-t">
          <p className="text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()} | This brochure contains the latest available information
          </p>
        </div>
      </div>
    </div>
  );
}