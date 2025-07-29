// Enhanced MMSI lookup utility for real-time vessel tracking
export interface VesselData {
  vesselName?: string;
  coordinates?: { lat: number; lng: number };
  vesselType?: string;
  length?: string;
  beam?: string;
  draft?: string;
  yearBuilt?: string;
  builder?: string;
  grossTonnage?: string;
  realTimeLocation?: boolean;
  mockLocation?: boolean;
  lastUpdate?: string;
}

export const fetchRealTimeVesselLocation = async (mmsi: string): Promise<VesselData | null> => {
  if (!mmsi || mmsi.length !== 9) {
    console.log(`Invalid MMSI: ${mmsi}`);
    return null;
  }

  console.log(`Fetching real-time location for MMSI: ${mmsi}`);

  try {
    // Method 1: Try MarineTraffic's public data endpoints
    const apiEndpoints = [
      `https://www.marinetraffic.com/en/data/?asset_type=vessels&columns=shipname,lat_of_latest_position,lon_of_latest_position,time_of_latest_position,ship_type,length,width,year_built&mmsi=${mmsi}`,
      `https://services.marinetraffic.com/api/exportvessel/v:8/${mmsi}/protocol:json`,
    ];

    for (const endpoint of apiEndpoints) {
      try {
        console.log(`Trying endpoint: ${endpoint}`);
        const response = await fetch(endpoint, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/json, text/html, */*',
            'Accept-Language': 'en-US,en;q=0.9',
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('API response:', data);

          if (data && Array.isArray(data) && data.length > 0) {
            const vessel = data[0];
            if (vessel.lat_of_latest_position && vessel.lon_of_latest_position) {
              const coordinates = {
                lat: parseFloat(vessel.lat_of_latest_position),
                lng: parseFloat(vessel.lon_of_latest_position)
              };

              if (coordinates.lat >= -90 && coordinates.lat <= 90 && 
                  coordinates.lng >= -180 && coordinates.lng <= 180) {
                
                return {
                  vesselName: vessel.shipname || vessel.SHIPNAME,
                  coordinates: coordinates,
                  vesselType: vessel.ship_type || vessel.TYPESUMMARY,
                  length: vessel.length || vessel.LENGTH,
                  beam: vessel.width || vessel.WIDTH,
                  yearBuilt: vessel.year_built || vessel.YEAR_BUILT,
                  realTimeLocation: true,
                  lastUpdate: vessel.time_of_latest_position || vessel.TIMESTAMP
                };
              }
            }
          }
        }
      } catch (error) {
        console.log(`Endpoint ${endpoint} failed:`, error);
      }
    }

    // Method 2: Try web scraping with CORS proxies
    const scrapingUrls = [
      `https://www.marinetraffic.com/en/ais/details/ships/mmsi:${mmsi}`,
      `https://www.marinetraffic.com/en/ais/details/ships/${mmsi}`
    ];

    const corsProxies = [
      'https://api.allorigins.win/raw?url=',
      'https://api.codetabs.com/v1/proxy?quest=',
    ];

    for (const proxy of corsProxies) {
      for (const url of scrapingUrls) {
        try {
          console.log(`Scraping: ${proxy}${encodeURIComponent(url)}`);
          const response = await fetch(`${proxy}${encodeURIComponent(url)}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });

          if (response.ok) {
            const html = await response.text();
            if (html.length > 5000) {
              const vesselData = parseMarineTrafficHTML(html);
              if (vesselData && vesselData.coordinates) {
                return { ...vesselData, realTimeLocation: true };
              }
            }
          }
        } catch (error) {
          console.log(`Scraping failed:`, error);
        }
      }
    }

    // Method 3: Generate estimated coordinates based on MMSI region
    console.log('No real-time data found, generating estimated location...');
    const mockCoordinates = getMockCoordinatesFromMMSI(mmsi);
    if (mockCoordinates) {
      return {
        vesselName: `Vessel ${mmsi}`,
        coordinates: mockCoordinates,
        mockLocation: true
      };
    }

    return null;
  } catch (error) {
    console.error('Error in fetchRealTimeVesselLocation:', error);
    return null;
  }
};

const parseMarineTrafficHTML = (html: string): VesselData | null => {
  try {
    const vesselData: VesselData = {};

    // Extract vessel name
    const nameMatch = html.match(/<title[^>]*>(?:Ship\s+)?([^(|\-|<]+)/i) || 
                     html.match(/vessel["\s]*name["\s]*[:\s]*["\s]*([^"<>\n]+)/i);
    if (nameMatch && nameMatch[1]) {
      vesselData.vesselName = nameMatch[1].trim();
    }

    // Enhanced coordinate extraction patterns
    const latPatterns = [
      /data-lat["\s]*=["\s]*["]([+-]?\d+\.?\d*)['"]/i,
      /latitude["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /"lat"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /lat_of_latest_position["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /position.*lat.*?([+-]?\d+\.\d+)/i,
      /lat.*?([+-]?\d{1,2}\.\d{4,})/i
    ];

    const lngPatterns = [
      /data-lng["\s]*=["\s]*["]([+-]?\d+\.?\d*)['"]/i,
      /longitude["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /"lng"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /"lon"["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /lon_of_latest_position["\s]*:["\s]*([+-]?\d+\.?\d*)/i,
      /position.*lng.*?([+-]?\d+\.\d+)/i,
      /lng.*?([+-]?\d{1,3}\.\d{4,})/i
    ];

    let lat = null;
    let lng = null;

    // Try each pattern for latitude
    for (const pattern of latPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const parsedLat = parseFloat(match[1]);
        if (!isNaN(parsedLat) && parsedLat >= -90 && parsedLat <= 90) {
          lat = parsedLat;
          break;
        }
      }
    }

    // Try each pattern for longitude
    for (const pattern of lngPatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        const parsedLng = parseFloat(match[1]);
        if (!isNaN(parsedLng) && parsedLng >= -180 && parsedLng <= 180) {
          lng = parsedLng;
          break;
        }
      }
    }

    if (lat !== null && lng !== null) {
      vesselData.coordinates = { lat, lng };
    }

    return vesselData.coordinates ? vesselData : null;
  } catch (error) {
    console.error('Error parsing HTML:', error);
    return null;
  }
};

const getMockCoordinatesFromMMSI = (mmsi: string): { lat: number; lng: number } | null => {
  try {
    const regionCode = mmsi.substring(0, 3);
    
    // Maritime regions with their coordinates
    const regionCoordinates: { [key: string]: { lat: number; lng: number } } = {
      '201': { lat: 47.6062, lng: -122.3321 }, // US West Coast
      '303': { lat: 25.7617, lng: -80.1918 },  // Florida
      '311': { lat: 40.7589, lng: -73.9851 },  // New York
      '366': { lat: 37.7749, lng: -122.4194 }, // California
      '367': { lat: 33.9425, lng: -118.4081 }, // LA area
      '235': { lat: 51.5074, lng: -0.1278 },   // UK
      '227': { lat: 48.8566, lng: 2.3522 },    // France
      '247': { lat: 45.4642, lng: 9.1900 },    // Italy
      '211': { lat: 52.5200, lng: 13.4050 },   // Germany
      '636': { lat: 35.6762, lng: 139.6503 },  // Japan
      '477': { lat: 1.3521, lng: 103.8198 },   // Singapore
    };
    
    if (regionCoordinates[regionCode]) {
      const base = regionCoordinates[regionCode];
      // Add variation based on MMSI hash
      const hash = mmsi.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const latOffset = ((hash % 200) - 100) / 1000;
      const lngOffset = ((hash % 300) - 150) / 1000;
      
      return {
        lat: Math.max(-90, Math.min(90, base.lat + latOffset)),
        lng: Math.max(-180, Math.min(180, base.lng + lngOffset))
      };
    }
    
    // Default to Mediterranean for unknown regions
    const hash = mmsi.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      lat: 35 + ((hash % 100) - 50) / 100,
      lng: 15 + ((hash % 200) - 100) / 100
    };
  } catch (error) {
    console.error('Error generating mock coordinates:', error);
    return null;
  }
};