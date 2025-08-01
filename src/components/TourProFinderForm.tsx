import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, Phone, Mail, MessageCircle } from 'lucide-react';

interface TourProFinderFormProps {
  onClose?: () => void;
}

const TourProFinderForm: React.FC<TourProFinderFormProps> = ({ onClose }) => {
  const [step, setStep] = useState<'form' | 'results'>('form');
  const [formData, setFormData] = useState({
    country: '',
    cityZip: '',
    radius: '',
    services: [] as string[],
    indoorOutdoor: '',
    spaceSize: '',
    timeframe: '',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    contactMethod: '',
  });

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Other'
  ];

  const serviceTypes = [
    'Real Estate', 'Yachts', 'Hotels/Resorts', 'Restaurants', 'Commercial Spaces', 
    'Drone Footage', 'Aerial Mapping', 'Virtual Tour (360°)', 'Photography', 'Video', 'Other'
  ];

  const mockTourPros = [
    {
      id: 1,
      name: 'Sarah Johnson',
      services: ['Real Estate', 'Commercial Spaces', 'Photography'],
      city: 'Miami, FL',
      rating: 4.9,
      reviews: 47,
    },
    {
      id: 2,
      name: 'Mike Chen',
      services: ['Yachts', 'Drone Footage', 'Video'],
      city: 'Fort Lauderdale, FL',
      rating: 4.8,
      reviews: 32,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      services: ['Hotels/Resorts', 'Virtual Tour (360°)', 'Photography'],
      city: 'Key Biscayne, FL',
      rating: 5.0,
      reviews: 23,
    },
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('results');
  };

  const handleContactSubmit = (proId: number) => {
    console.log('Contact request sent to pro:', proId, contactForm);
    // Here you would send the contact request
    alert('Your request has been sent to the Tour Pro!');
  };

  if (step === 'results') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Available Tour Pros Near You</h2>
          <Button variant="outline" onClick={() => setStep('form')}>
            Modify Search
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTourPros.map((pro) => (
            <Card key={pro.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{pro.name}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{pro.rating} ({pro.reviews})</span>
                  </div>
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {pro.city}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {pro.services.map((service) => (
                      <span key={service} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <Input
                    placeholder="Phone (optional)"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Brief project description"
                    value={contactForm.description}
                    onChange={(e) => setContactForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={2}
                  />
                  <Select value={contactForm.contactMethod} onValueChange={(value) => setContactForm(prev => ({ ...prev, contactMethod: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred contact method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    className="w-full" 
                    onClick={() => handleContactSubmit(pro.id)}
                    disabled={!contactForm.name || !contactForm.email}
                  >
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Find an Xplor Tour Pro Near You</h2>
        <p className="text-muted-foreground">Connect with certified professionals for your capture needs</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cityZip">City / ZIP Code</Label>
              <Input
                id="cityZip"
                placeholder="Enter city or ZIP code"
                value={formData.cityZip}
                onChange={(e) => setFormData(prev => ({ ...prev, cityZip: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="radius">Search Radius</Label>
              <Select value={formData.radius} onValueChange={(value) => setFormData(prev => ({ ...prev, radius: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select search radius" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                  <SelectItem value="100">100 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Service Type Section */}
        <Card>
          <CardHeader>
            <CardTitle>What do you need captured?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {serviceTypes.map((service) => (
                <div key={service} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={formData.services.includes(service)}
                    onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                  />
                  <Label htmlFor={service} className="text-sm">{service}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Details Section */}
        <Card>
          <CardHeader>
            <CardTitle>Project Details (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="indoorOutdoor">Indoor or Outdoor Capture?</Label>
              <Select value={formData.indoorOutdoor} onValueChange={(value) => setFormData(prev => ({ ...prev, indoorOutdoor: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select capture type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="spaceSize">Approximate Size of Space</Label>
              <Select value={formData.spaceSize} onValueChange={(value) => setFormData(prev => ({ ...prev, spaceSize: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select space size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under100">Under 100 sqm</SelectItem>
                  <SelectItem value="100-300">100–300 sqm</SelectItem>
                  <SelectItem value="300-1000">300–1000 sqm</SelectItem>
                  <SelectItem value="over1000">Over 1000 sqm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeframe">How soon do you need it?</Label>
              <Select value={formData.timeframe} onValueChange={(value) => setFormData(prev => ({ ...prev, timeframe: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="thisweek">This Week</SelectItem>
                  <SelectItem value="2weeks">Within 2 Weeks</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="flex-1"
            disabled={!formData.country}
          >
            Find Tour Pros
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TourProFinderForm;