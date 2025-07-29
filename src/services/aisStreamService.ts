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
    console.log('Setting AISStream API key:', apiKey ? 'API key provided' : 'No API key');
    this.apiKey = apiKey;
    localStorage.setItem('aisstream_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey || localStorage.getItem('aisstream_api_key');
  }


  private async createConnection(): Promise<boolean> {
    const currentApiKey = this.getApiKey();
    if (!currentApiKey) {
      console.error('AISStream API key is required');
      return false;
    }

    console.log('Creating WebSocket connection with API key:', currentApiKey.substring(0, 8) + '...');

    return new Promise((resolve) => {
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
            APIKey: currentApiKey,
            BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
            FilterMessageTypes: ["PositionReport", "ShipAndVoyageData"] // Include both message types
          };
          
          console.log('Sending subscription message with API key:', currentApiKey.substring(0, 8) + '...');
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

    const currentApiKey = this.getApiKey();
    if (!currentApiKey) {
      console.error('AISStream API key is required. Please set it first.');
      return null;
    }

    console.log('Using API key for vessel data:', currentApiKey ? 'API key available' : 'No API key');

    // Try to get real-time data via WebSocket only (REST API blocked by CORS)
    console.log('Attempting WebSocket connection for real-time AIS data...');
    const realTimeData = await this.getRealTimeData(mmsi, timeoutMs);
    if (realTimeData) {
      return realTimeData;
    }

    console.log('No real-time data available from WebSocket');
    return null;
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
      // Reduce timeout for faster testing
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(mmsi);
        console.log(`Timeout waiting for real-time MMSI ${mmsi} data after ${timeoutMs}ms`);
        resolve(null);
      }, Math.min(timeoutMs, 15000)); // Max 15 seconds for WebSocket data

      // Store the request
      this.pendingRequests.set(mmsi, { resolve, timeout });
      console.log('Stored pending request for MMSI:', mmsi);

      // Send a new subscription message for the specific MMSI
      const subscriptionMessage = {
        APIKey: this.getApiKey(),
        BoundingBoxes: [[[-90, -180], [90, 180]]], // Global coverage
        FiltersShipMMSI: [parseInt(mmsi)], // Filter for specific MMSI as integer
        FilterMessageTypes: ["PositionReport", "ShipAndVoyageData"]
      };

      console.log('Sending MMSI-specific subscription:', subscriptionMessage);
      this.socket?.send(JSON.stringify(subscriptionMessage));
    });
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