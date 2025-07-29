import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';

// Mapbox access token - can be set by users and stored for all to use
let MAPBOX_TOKEN = ''; // Will be populated when user enters token

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
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null); // null = not tested, true = valid, false = invalid
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize map when token is provided
  useEffect(() => {
    const activeToken = mapboxToken || MAPBOX_TOKEN;
    if (!mapContainer.current || !activeToken) return;

    // Validate token format
    if (!activeToken.startsWith('pk.')) {
      setIsTokenValid(false);
      toast({
        title: "Invalid Token Format",
        description: "Mapbox public tokens must start with 'pk.'",
        variant: "destructive",
      });
      return;
    }

    try {
      mapboxgl.accessToken = activeToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: coordinates ? [coordinates.lng, coordinates.lat] : [0, 0],
        zoom: zoom,
        attributionControl: false
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Handle successful load
      map.current.on('load', () => {
        setIsTokenValid(true);
        toast({
          title: "Map Loaded",
          description: "Mapbox map initialized successfully!",
        });
      });

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

      // Handle errors
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setIsTokenValid(false);
        toast({
          title: "Mapbox Error",
          description: "Failed to load map. Please check your token and internet connection.",
          variant: "destructive",
        });
      });

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
  }, [mapboxToken, MAPBOX_TOKEN]);

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
      setIsInitializing(true);
      setIsTokenValid(null); // Reset to untested state
      
      const tokenToStore = mapboxToken.trim();
      localStorage.setItem('mapbox_token', tokenToStore);
      MAPBOX_TOKEN = tokenToStore; // Update global token for immediate use
      
      // Force re-initialization by clearing current map
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      setIsInitializing(false);
      
      toast({
        title: "Token Saved",
        description: "Mapbox token has been saved for all users to use.",
      });
    }
  };

  // Load token from localStorage or global token on mount
  useEffect(() => {
    // Check global token first, then localStorage
    const savedToken = MAPBOX_TOKEN || localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      MAPBOX_TOKEN = savedToken; // Ensure global token is set
    }
  }, []);

  // Show token input only if no token is available anywhere
  if (!mapboxToken && !MAPBOX_TOKEN) {
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

  if (isTokenValid === false) {
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
          setIsTokenValid(null);
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