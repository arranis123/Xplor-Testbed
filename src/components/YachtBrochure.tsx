import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Ship, MapPin, Calendar, Users, Settings, Anchor } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface YachtBrochureProps {
  formData: any;
}

export function YachtBrochure({ formData }: YachtBrochureProps) {
  const brochureRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!brochureRef.current) return;

    try {
      const canvas = await html2canvas(brochureRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      const fileName = `${formData.title || 'yacht'}-brochure.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const formatCurrency = (amount: string, currency: string = 'USD') => {
    if (!amount) return '';
    return `${currency} ${parseFloat(amount).toLocaleString()}`;
  };

  const renderSpecificationRow = (label: string, value: string | undefined) => {
    if (!value) return null;
    return (
      <div className="flex justify-between py-2 border-b border-border/30">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  };

  const renderFeatureList = (features: any[], title: string) => {
    const activeFeatures = features.filter(f => formData[f.id] === true);
    if (activeFeatures.length === 0) return null;
    
    return (
      <div className="space-y-2">
        <h4 className="font-semibold text-primary">{title}</h4>
        <div className="grid grid-cols-2 gap-1">
          {activeFeatures.map(feature => (
            <div key={feature.id} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full" />
              {feature.label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Yacht Brochure
        </h3>
        <Button onClick={generatePDF} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>

      <div ref={brochureRef} className="bg-white text-black p-8 space-y-8" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Header */}
        <div className="text-center border-b border-gray-300 pb-6">
          <h1 className="text-4xl font-bold text-primary mb-2">
            {formData.title || 'Luxury Yacht'}
          </h1>
          {formData.yachtBuilder && formData.yachtModel && (
            <h2 className="text-xl text-gray-600">
              {formData.yachtBuilder} {formData.yachtModel}
            </h2>
          )}
          {formData.yachtYearBuilt && (
            <p className="text-lg text-gray-500">Built {formData.yachtYearBuilt}</p>
          )}
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Ship className="w-5 h-5" />
                Yacht Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderSpecificationRow('Type', formData.yachtSubtype)}
              {renderSpecificationRow('Length Overall', formData.yachtLOA ? `${formData.yachtLOA}m` : undefined)}
              {renderSpecificationRow('Beam', formData.yachtBeam ? `${formData.yachtBeam}m` : undefined)}
              {renderSpecificationRow('Draft', formData.yachtDraft ? `${formData.yachtDraft}m` : undefined)}
              {renderSpecificationRow('Gross Tonnage', formData.yachtGrossTonnage)}
              {renderSpecificationRow('Hull Material', formData.yachtHullMaterial)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="w-5 h-5" />
                Accommodation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderSpecificationRow('Guests', formData.yachtGuestsNumber)}
              {renderSpecificationRow('Guest Cabins', formData.yachtGuestCabins)}
              {renderSpecificationRow('Crew', formData.yachtCrewNumber)}
              {renderSpecificationRow('Crew Cabins', formData.yachtCrewCabins)}
              {formData.yachtInteriorDesigner && renderSpecificationRow('Interior Designer', formData.yachtInteriorDesigner)}
              {formData.yachtExteriorDesigner && renderSpecificationRow('Exterior Designer', formData.yachtExteriorDesigner)}
            </CardContent>
          </Card>
        </div>

        {/* Performance & Technical */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Performance & Technical Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                {renderSpecificationRow('Cruising Speed', formData.yachtCruisingSpeed ? `${formData.yachtCruisingSpeed} knots` : undefined)}
                {renderSpecificationRow('Max Speed', formData.yachtMaxSpeed ? `${formData.yachtMaxSpeed} knots` : undefined)}
                {renderSpecificationRow('Range', formData.yachtRange ? `${formData.yachtRange} nm` : undefined)}
                {renderSpecificationRow('Fuel Consumption', formData.yachtFuelConsumption)}
                {renderSpecificationRow('Fuel Capacity', formData.yachtFuelCapacity ? `${formData.yachtFuelCapacity} liters` : undefined)}
              </div>
              <div className="space-y-2">
                {renderSpecificationRow('Engine Make', formData.yachtEngineMake)}
                {renderSpecificationRow('Engine Count', formData.yachtEngineCount)}
                {renderSpecificationRow('Engine Power', formData.yachtEnginePower ? `${formData.yachtEnginePower} HP` : undefined)}
                {renderSpecificationRow('Propulsion', formData.yachtPropulsionType)}
                {renderSpecificationRow('Water Capacity', formData.yachtWaterCapacity ? `${formData.yachtWaterCapacity} liters` : undefined)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Amenities & Features */}
        <Card>
          <CardHeader>
            <CardTitle>Luxury Amenities & Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Interior Features */}
                {renderFeatureList([
                  { id: 'yachtDeckJacuzzi', label: 'Deck Jacuzzi' },
                  { id: 'yachtPool', label: 'Swimming Pool' },
                  { id: 'yachtSpa', label: 'Spa & Wellness' },
                  { id: 'yachtGym', label: 'Fitness Center' },
                  { id: 'yachtCinema', label: 'Cinema Room' },
                  { id: 'yachtElevator', label: 'Elevator' },
                  { id: 'yachtOffice', label: 'Office/Study' },
                  { id: 'yachtFireplaces', label: 'Fireplaces' }
                ], 'Interior Features')}
              </div>
              <div className="space-y-4">
                {/* Water Toys */}
                {renderFeatureList([
                  { id: 'yachtJetSkis', label: 'Jet Skis' },
                  { id: 'yachtSeabobs', label: 'Seabobs' },
                  { id: 'yachtDivingEquipment', label: 'Diving Equipment' },
                  { id: 'yachtWaterskis', label: 'Water Skis' },
                  { id: 'yachtInflatableToys', label: 'Inflatable Toys' },
                  { id: 'yachtFishingGear', label: 'Fishing Equipment' },
                  { id: 'yachtSubmersibles', label: 'Submersibles' }
                ], 'Water Toys & Equipment')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charter Information */}
        {(formData.yachtCharterRateInfo || formData.yachtCharterRegions) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Charter Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {renderSpecificationRow('Charter Rate', formData.yachtCharterRateInfo)}
              {renderSpecificationRow('Charter Regions', formData.yachtCharterRegions)}
              {renderSpecificationRow('Minimum Booking', formData.yachtMinBookingDuration)}
              {renderSpecificationRow('APA Policy', formData.yachtApaPolicy)}
              {renderSpecificationRow('Charter License', formData.yachtCharterLicense)}
            </CardContent>
          </Card>
        )}

        {/* Location */}
        {(formData.latitude && formData.longitude) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Current Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Coordinates: {formData.latitude}, {formData.longitude}
              </p>
              {formData.address && <p className="text-sm">{formData.address}</p>}
            </CardContent>
          </Card>
        )}

        {/* Charter Rules & Policies */}
        {(formData.yachtSmokingPolicy || formData.yachtPetsPolicy || formData.yachtAlcoholPolicy) && (
          <Card>
            <CardHeader>
              <CardTitle>Charter Rules & Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {renderSpecificationRow('Smoking Policy', formData.yachtSmokingPolicy)}
              {renderSpecificationRow('Pets Policy', formData.yachtPetsPolicy)}
              {renderSpecificationRow('Alcohol Policy', formData.yachtAlcoholPolicy)}
              {renderSpecificationRow('Children Policy', formData.yachtChildrenPolicy)}
              {renderSpecificationRow('Guest Capacity (Day)', formData.yachtGuestCapacityDay)}
              {renderSpecificationRow('Guest Capacity (Sleeping)', formData.yachtGuestCapacitySleeping)}
            </CardContent>
          </Card>
        )}

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Anchor className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {renderSpecificationRow('Broker', formData.yachtBrokerName)}
            {renderSpecificationRow('Brokerage Company', formData.yachtBrokerageCompany)}
            {renderSpecificationRow('Contact', formData.yachtBrokerContact)}
            {formData.yachtWebsiteLink && (
              <div className="flex justify-between py-2 border-b border-gray-300">
                <span className="text-gray-600">Website</span>
                <span className="font-medium text-blue-600">{formData.yachtWebsiteLink}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            Generated on {new Date().toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This brochure contains preliminary information and is subject to change without notice.
          </p>
        </div>
      </div>
    </div>
  );
}