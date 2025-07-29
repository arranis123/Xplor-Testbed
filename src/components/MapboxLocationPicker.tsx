import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

// Mapbox access token - this should be provided by the user
// In production, this should be stored in Supabase secrets
const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTE0eXE2Y2UxZjdkMnFtd2N5dGgxc3l3In0.example'; // This won't work - user needs to provide their own

interface MapboxLocationPickerProps {
  coordinates: { lat: number; lng: number } | null;
  onCoordinatesChange: (coordinates: { lat: number; lng: number }) => void;
  onZoomChange?: (zoom: number) => void;
  zoom?: number;
  className?: string;
}

const MapboxLocationPicker: React.FC<MapboxLocationPickerProps> = ({
  coordinates,
  onCoordinatesChange,
  onZoomChange,
  zoom = 10,
  className = "h-48"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState(false);

  // Initialize map when token is provided
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates ? [coordinates.lng, coordinates.lat] : [0, 0],
        zoom: zoom,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Handle map clicks to set location
      map.current.on('click', (e) => {
        const { lng, lat } = e.lngLat;
        onCoordinatesChange({ lat, lng });
      });

      // Handle zoom changes
      map.current.on('zoom', () => {
        if (map.current && onZoomChange) {
          onZoomChange(map.current.getZoom());
        }
      });

      setIsTokenValid(true);

      return () => {
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Mapbox initialization error:', error);
      setIsTokenValid(false);
      toast({
        title: "Mapbox Error",
        description: "Invalid Mapbox token. Please check your token and try again.",
        variant: "destructive",
      });
    }
  }, [mapboxToken]);

  // Update marker when coordinates change
  useEffect(() => {
    if (!map.current || !coordinates) return;

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Add new marker
    marker.current = new mapboxgl.Marker({
      color: '#ef4444', // red-500
      draggable: true
    })
      .setLngLat([coordinates.lng, coordinates.lat])
      .addTo(map.current);

    // Handle marker drag
    marker.current.on('dragend', () => {
      if (marker.current) {
        const lngLat = marker.current.getLngLat();
        onCoordinatesChange({ lat: lngLat.lat, lng: lngLat.lng });
      }
    });

    // Center map on new coordinates
    map.current.flyTo({
      center: [coordinates.lng, coordinates.lat],
      zoom: map.current.getZoom()
    });
  }, [coordinates, isTokenValid]);

  // Update zoom when prop changes
  useEffect(() => {
    if (map.current && zoom !== map.current.getZoom()) {
      map.current.setZoom(zoom);
    }
  }, [zoom]);

  const handleZoomIn = () => {
    if (map.current) {
      const newZoom = Math.min(map.current.getZoom() + 1, 20);
      map.current.setZoom(newZoom);
      onZoomChange?.(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      const newZoom = Math.max(map.current.getZoom() - 1, 1);
      map.current.setZoom(newZoom);
      onZoomChange?.(newZoom);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      // Force re-initialization
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      // The useEffect will handle re-initialization
    }
  };

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  if (!mapboxToken) {
    return (
      <div className={`${className} bg-muted rounded-lg flex flex-col items-center justify-center p-4`}>
        <MapPin className="h-8 w-8 mb-4 text-muted-foreground" />
        <h3 className="text-sm font-medium mb-2">Mapbox Token Required</h3>
        <p className="text-xs text-muted-foreground text-center mb-4">
          Enter your Mapbox public token to enable the interactive map. 
          Get your free token from <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <div className="flex gap-2 w-full max-w-sm">
          <Input
            placeholder="pk.eyJ1Ijoi..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="text-xs"
          />
          <Button size="sm" onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
            Use
          </Button>
        </div>
      </div>
    );
  }

  if (!isTokenValid) {
    return (
      <div className={`${className} bg-muted rounded-lg flex flex-col items-center justify-center p-4`}>
        <MapPin className="h-8 w-8 mb-4 text-muted-foreground" />
        <h3 className="text-sm font-medium mb-2 text-destructive">Invalid Mapbox Token</h3>
        <p className="text-xs text-muted-foreground text-center mb-4">
          The provided Mapbox token is invalid. Please check your token and try again.
        </p>
        <Button size="sm" onClick={() => {
          localStorage.removeItem('mapbox_token');
          setMapboxToken('');
          setIsTokenValid(false);
        }}>
          Enter New Token
        </Button>
      </div>
    );
  }

  return (
    <div className={`${className} relative rounded-lg overflow-hidden`}>
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Custom zoom controls */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-1">
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

      {/* Coordinates display */}
      {coordinates && (
        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-gray-800/90 px-2 py-1 rounded text-xs font-medium">
          {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
        </div>
      )}

      {/* Instructions overlay when no coordinates */}
      {!coordinates && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center shadow-lg">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Click on the map to set location</p>
            <p className="text-xs text-muted-foreground">Or enter coordinates above</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxLocationPicker;