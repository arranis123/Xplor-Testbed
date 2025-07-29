import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button } from '@/components/ui/button';
import { MapPin, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapProps {
  coordinates?: { lat: number; lng: number } | null;
  onLocationSelect?: (location: { lat: number; lng: number }) => void;
  apiKey?: string;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  coordinates,
  onLocationSelect,
  apiKey,
  className = "w-full h-48 rounded-lg"
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!apiKey) {
      setError('Google Maps API key required');
      return;
    }

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        await loader.load();
        
        if (!mapRef.current) return;

        const defaultCenter = coordinates || { lat: 40.7128, lng: -74.0060 }; // Default to NYC
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: coordinates ? 15 : 10,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }
          ]
        });

        setMap(mapInstance);

        // Add click listener for location selection
        mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
          const clickedLocation = {
            lat: e.latLng?.lat() || 0,
            lng: e.latLng?.lng() || 0
          };
          
          if (onLocationSelect) {
            onLocationSelect(clickedLocation);
          }
          
          // Update marker position
          if (marker) {
            marker.setPosition(clickedLocation);
          } else {
            const newMarker = new google.maps.Marker({
              position: clickedLocation,
              map: mapInstance,
              title: 'Selected Location',
              animation: google.maps.Animation.DROP
            });
            setMarker(newMarker);
          }
        });

        setIsLoaded(true);
        
        toast({
          title: "Map loaded",
          description: "Click on the map to set location"
        });

      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        toast({
          title: "Map Error",
          description: "Failed to load Google Maps. Please check your API key.",
          variant: "destructive"
        });
      }
    };

    initMap();
  }, [apiKey, toast, onLocationSelect]);

  // Update marker when coordinates change
  useEffect(() => {
    if (map && coordinates) {
      if (marker) {
        marker.setPosition(coordinates);
        map.setCenter(coordinates);
        map.setZoom(15);
      } else {
        const newMarker = new google.maps.Marker({
          position: coordinates,
          map: map,
          title: `Location: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
          animation: google.maps.Animation.DROP
        });
        setMarker(newMarker);
        map.setCenter(coordinates);
        map.setZoom(15);
      }
    }
  }, [coordinates, map, marker]);

  const handleZoomIn = () => {
    if (map) {
      const currentZoom = map.getZoom() || 10;
      map.setZoom(Math.min(currentZoom + 1, 20));
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const currentZoom = map.getZoom() || 10;
      map.setZoom(Math.max(currentZoom - 1, 1));
    }
  };

  if (error) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <p className="text-xs text-muted-foreground">Please configure Google Maps API key</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      <div ref={mapRef} className="w-full h-full" />
      
      {isLoaded && (
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleZoomIn}
          >
            <Plus className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white shadow-sm"
            onClick={handleZoomOut}
          >
            <Minus className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};