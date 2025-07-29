// Centralized Mapbox token management service
let GLOBAL_MAPBOX_TOKEN = '';

export class MapboxService {
  static setToken(token: string): void {
    GLOBAL_MAPBOX_TOKEN = token;
    localStorage.setItem('mapbox_token', token);
  }

  static getToken(): string {
    if (GLOBAL_MAPBOX_TOKEN) {
      return GLOBAL_MAPBOX_TOKEN;
    }
    
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      GLOBAL_MAPBOX_TOKEN = savedToken;
      return savedToken;
    }
    
    return '';
  }

  static hasToken(): boolean {
    return !!this.getToken();
  }

  static clearToken(): void {
    GLOBAL_MAPBOX_TOKEN = '';
    localStorage.removeItem('mapbox_token');
  }

  static async reverseGeocode(lng: number, lat: number): Promise<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('Mapbox token not available');
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${token}`
    );
    
    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}

export default MapboxService;