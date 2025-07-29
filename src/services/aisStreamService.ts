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
      console.error('AISStream API key is required');
      return false;
    }

    return new Promise((resolve, reject) => {
      try {
        console.log('Attempting to connect to AISStream WebSocket...');
        this.socket = new WebSocket('wss://stream.aisstream.io/v0/stream');
        
        // Set up connection timeout
        const connectionTimeout = setTimeout(() => {
          console.error('WebSocket connection timeout');
          if (this.socket) {
            this.socket.close();
          }
          resolve(false);
        }, 10000); // 10 second timeout
        
        this.socket.onopen = () => {
          clearTimeout(connectionTimeout);
          console.log('Connected to AISStream.io WebSocket');
          
          // Send subscription message with proper format
          const subscriptionMessage = {
            APIKey: this.apiKey,
            BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
            FilterMessageTypes: ["PositionReport", "ShipAndVoyageData"] // Include both message types
          };
          
          console.log('Sending subscription message:', subscriptionMessage);
          this.socket?.send(JSON.stringify(subscriptionMessage));
          resolve(true);
        };

        this.socket.onmessage = (event) => {
          try {
            const data: AISStreamMessage = JSON.parse(event.data);
            console.log('Received AISStream message:', data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing AISStream message:', error);
          }
        };

        this.socket.onerror = (error) => {
          clearTimeout(connectionTimeout);
          console.error('AISStream WebSocket error:', error);
          resolve(false);
        };

        this.socket.onclose = (event) => {
          clearTimeout(connectionTimeout);
          console.log('AISStream connection closed:', event.code, event.reason);
          
          // Log specific close codes for debugging
          if (event.code === 1006) {
            console.error('WebSocket closed abnormally - possible API key or network issue');
          } else if (event.code === 1008) {
            console.error('WebSocket closed due to policy violation - check API key and subscription');
          }
          
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
    console.log('Handling message type:', data.MessageType);
    
    if ((data.MessageType === 'PositionReport' || data.MessageType === 'ShipAndVoyageData') && data.MetaData) {
      const mmsi = data.MetaData.MMSI.toString();
      console.log('Processing data for MMSI:', mmsi);
      
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
          additionalData: data.Message
        };
        
        console.log('Resolving vessel data for MMSI:', mmsi, response);
        request.resolve(response);
      } else {
        console.log('No pending request found for MMSI:', mmsi);
      }
    } else {
      console.log('Message type not handled or missing metadata:', data.MessageType);
    }
  }

  async getVesselData(mmsi: string, timeoutMs: number = 30000): Promise<AISStreamResponse | null> {
    if (!mmsi || mmsi.length !== 9) {
      console.error('Invalid MMSI number. Must be 9 digits.');
      return null;
    }

    if (!this.apiKey) {
      console.error('AISStream API key is required');
      return null;
    }

    // First try to get real-time data via WebSocket
    const realTimeData = await this.getRealTimeData(mmsi, timeoutMs);
    if (realTimeData) {
      return realTimeData;
    }

    // If real-time data isn't available, try to get last known position via API
    console.log('Real-time data not available, fetching last known position...');
    return await this.getLastKnownPosition(mmsi);
  }

  private async getRealTimeData(mmsi: string, timeoutMs: number): Promise<AISStreamResponse | null> {
    console.log('Attempting to get real-time data for MMSI:', mmsi);
    
    // Check if connection exists, create if needed
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.log('WebSocket not connected, creating new connection...');
      const connected = await this.createConnection();
      if (!connected) {
        console.log('Failed to establish WebSocket connection');
        return null;
      }
      
      // Wait a moment for the connection to stabilize
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return new Promise((resolve) => {
      // Set up timeout
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(mmsi);
        console.log(`Timeout waiting for real-time MMSI ${mmsi} data after ${timeoutMs}ms`);
        resolve(null);
      }, timeoutMs);

      // Store the request
      this.pendingRequests.set(mmsi, { resolve, timeout });
      console.log('Stored pending request for MMSI:', mmsi);

      // Send a new subscription message for the specific MMSI
      const subscriptionMessage = {
        APIKey: this.apiKey,
        BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
        FiltersShipMMSI: [parseInt(mmsi)], // Filter for specific MMSI as integer
        FilterMessageTypes: ["PositionReport", "ShipAndVoyageData"]
      };

      console.log('Sending MMSI-specific subscription:', subscriptionMessage);
      this.socket?.send(JSON.stringify(subscriptionMessage));
    });
  }

  private async getLastKnownPosition(mmsi: string): Promise<AISStreamResponse | null> {
    try {
      // Use AISStream.io REST API for last known position
      const response = await fetch(`https://api.aisstream.io/v0/last_known_position/${mmsi}`, {
        headers: {
          'X-API-Key': this.apiKey!
        }
      });

      if (!response.ok) {
        console.log('AISStream last known position not available');
        return null;
      }

      const data = await response.json();
      
      if (data && data.lat && data.lon) {
        return {
          mmsi,
          latitude: data.lat,
          longitude: data.lon,
          shipName: data.ship_name || data.shipName,
          lastUpdate: data.timestamp || data.time_utc || new Date().toISOString(),
          additionalData: data
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching last known position:', error);
      return null;
    }
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