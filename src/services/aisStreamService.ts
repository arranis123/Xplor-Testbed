interface AISStreamMessage {
  MessageType: string;
  MetaData: {
    MMSI: number;
    ShipName?: string;
    latitude: number;
    longitude: number;
    time_utc: string;
  };
  Message: {
    [key: string]: any;
  };
}

interface AISStreamResponse {
  mmsi: string;
  latitude: number;
  longitude: number;
  shipName?: string;
  lastUpdate: string;
  additionalData?: any;
}

export class AISStreamService {
  private socket: WebSocket | null = null;
  private apiKey: string | null = null;
  private pendingRequests: Map<string, {
    resolve: (value: AISStreamResponse | null) => void;
    timeout: NodeJS.Timeout;
  }> = new Map();

  constructor() {
    this.apiKey = localStorage.getItem('aisstream_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('aisstream_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private async createConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.warn('AISStream API key is required. Get one free at https://aisstream.io/apikeys');
      return false;
    }

    return new Promise((resolve) => {
      try {
        this.socket = new WebSocket('wss://stream.aisstream.io/v0/stream');
        
        this.socket.onopen = () => {
          console.log('Connected to AISStream.io');
          
          // Send subscription message for all ship data (including historical)
          const subscriptionMessage = {
            APIKey: this.apiKey,
            BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
            FilterMessageTypes: ['PositionReport', 'ShipStaticData'] // Include both current and voyage data
          };
          
          this.socket?.send(JSON.stringify(subscriptionMessage));
          resolve(true);
        };

        this.socket.onmessage = (event) => {
          try {
            const data: AISStreamMessage = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing AISStream message:', error);
          }
        };

        this.socket.onerror = (error) => {
          console.error('AISStream WebSocket error:', error);
          resolve(false);
        };

        this.socket.onclose = (event) => {
          console.log('AISStream connection closed:', event.code, event.reason);
          this.socket = null;
          // Clear pending requests
          this.pendingRequests.forEach(({ timeout }) => clearTimeout(timeout));
          this.pendingRequests.clear();
        };

      } catch (error) {
        console.error('Failed to create AISStream connection:', error);
        resolve(false);
      }
    });
  }

  private handleMessage(data: AISStreamMessage) {
    // Handle both PositionReport and ShipStaticData for vessel data
    if ((data.MessageType === 'PositionReport' || data.MessageType === 'ShipStaticData') && data.MetaData) {
      const mmsi = data.MetaData.MMSI.toString();
      const request = this.pendingRequests.get(mmsi);
      
      if (request) {
        clearTimeout(request.timeout);
        this.pendingRequests.delete(mmsi);
        
        const response: AISStreamResponse = {
          mmsi,
          latitude: data.MetaData.latitude,
          longitude: data.MetaData.longitude,
          shipName: data.MetaData.ShipName,
          lastUpdate: data.MetaData.time_utc,
          additionalData: { ...data.Message, messageType: data.MessageType }
        };
        
        console.log(`Received ${data.MessageType} data for MMSI ${mmsi}:`, response);
        request.resolve(response);
      }
    }
  }

  private async fetchFromMarineTraffic(mmsi: string): Promise<AISStreamResponse | null> {
    try {
      console.log('Fetching from MarineTraffic as fallback...');
      
      // Try multiple CORS proxy services for better reliability
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
      ];
      
      const marineTrafficUrl = `https://www.marinetraffic.com/en/ais/details/ships/mmsi:${mmsi}`;
      
      for (const proxy of proxies) {
        try {
          const response = await fetch(`${proxy}${encodeURIComponent(marineTrafficUrl)}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          if (!response.ok) continue;
          
          const html = await response.text();
          
          // Extract ship data from HTML using regex
          const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
          const latMatch = html.match(/latitude['":\s]*([+-]?\d*\.?\d+)/i);
          const lonMatch = html.match(/longitude['":\s]*([+-]?\d*\.?\d+)/i);
          const timeMatch = html.match(/last_pos['":\s]*"([^"]+)"/i);
          
          if (latMatch && lonMatch) {
            return {
              mmsi: mmsi,
              latitude: parseFloat(latMatch[1]),
              longitude: parseFloat(lonMatch[1]),
              shipName: nameMatch ? nameMatch[1].trim() : undefined,
              lastUpdate: timeMatch ? timeMatch[1] : new Date().toISOString(),
              additionalData: { source: 'marinetraffic' }
            };
          }
        } catch (error) {
          console.warn(`Proxy ${proxy} failed:`, error);
          continue;
        }
      }
      
      console.warn('All MarineTraffic proxies failed');
      return null;
    } catch (error) {
      console.error('MarineTraffic fallback failed:', error);
      return null;
    }
  }

  async getVesselData(mmsi: string, timeoutMs: number = 30000): Promise<AISStreamResponse | null> {
    if (!mmsi || mmsi.length !== 9) {
      console.error('Invalid MMSI number. Must be 9 digits.');
      return null;
    }

    // Try AISStream first if API key is available
    if (this.apiKey) {
      console.log('Using AISStream.io for vessel data...');
      try {
        // Check if connection exists, create if needed
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
          const connected = await this.createConnection();
          if (!connected) {
            console.log('No real-time data available from AISStream');
            return await this.fetchFromMarineTraffic(mmsi);
          }
        }

        const aisResult = await new Promise<AISStreamResponse | null>((resolve) => {
          // Set up timeout
          const timeout = setTimeout(() => {
            this.pendingRequests.delete(mmsi);
            console.log(`Timeout waiting for MMSI ${mmsi} data from AISStream`);
            resolve(null);
          }, timeoutMs);

          // Store the request
          this.pendingRequests.set(mmsi, { resolve, timeout });

          // Update subscription to filter for specific MMSI
          const subscriptionMessage = {
            APIKey: this.apiKey,
            BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
            FiltersShipMMSI: [mmsi], // Filter for specific MMSI
            FilterMessageTypes: ['PositionReport', 'ShipStaticData'] // Include both message types
          };

          this.socket?.send(JSON.stringify(subscriptionMessage));
          console.log(`Requesting last known data for MMSI: ${mmsi}`);
        });

        // If AISStream returns data, use it
        if (aisResult) {
          return aisResult;
        }
      } catch (error) {
        console.error('AISStream error:', error);
      }
    } else {
      console.warn('⚠️  AISStream.io API key not found');
      console.info('ℹ️  To get real-time vessel data:');
      console.info('1. Sign up at https://aisstream.io/authenticate');
      console.info('2. Get your free API key at https://aisstream.io/apikeys');  
      console.info('3. Store it using: aisStreamService.setApiKey("your-api-key")');
    }

    // Fallback to MarineTraffic
    console.log('Falling back to MarineTraffic.com scraping...');
    return await this.fetchFromMarineTraffic(mmsi);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    // Clear all pending requests
    this.pendingRequests.forEach(({ timeout }) => clearTimeout(timeout));
    this.pendingRequests.clear();
  }
}

// Create singleton instance
export const aisStreamService = new AISStreamService();