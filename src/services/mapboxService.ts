import { supabase } from "@/integrations/supabase/client";

// Centralized Mapbox token management service
let GLOBAL_MAPBOX_TOKEN = '';
let tokenPromise: Promise<string> | null = null;

export class MapboxService {
  static async fetchTokenFromSupabase(): Promise<string> {
    try {
      const { data, error } = await supabase.functions.invoke('get-mapbox-token');
      
      if (error) {
        console.error('Error fetching Mapbox token:', error);
        throw new Error('Failed to fetch Mapbox token');
      }
      
      if (data?.token) {
        GLOBAL_MAPBOX_TOKEN = data.token;
        return data.token;
      }
      
      throw new Error('No token received from server');
    } catch (error) {
      console.error('Error in fetchTokenFromSupabase:', error);
      throw error;
    }
  }

  static async getToken(): Promise<string> {
    // Return cached token if available
    if (GLOBAL_MAPBOX_TOKEN) {
      return GLOBAL_MAPBOX_TOKEN;
    }
    
    // If we're already fetching, wait for that promise
    if (tokenPromise) {
      return tokenPromise;
    }
    
    // Fetch token from Supabase
    tokenPromise = this.fetchTokenFromSupabase();
    
    try {
      const token = await tokenPromise;
      tokenPromise = null; // Clear the promise after successful fetch
      return token;
    } catch (error) {
      tokenPromise = null; // Clear the promise on error
      throw error;
    }
  }

  static getTokenSync(): string {
    return GLOBAL_MAPBOX_TOKEN;
  }

  static async hasToken(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch {
      return false;
    }
  }

  static clearToken(): void {
    GLOBAL_MAPBOX_TOKEN = '';
    tokenPromise = null;
  }

  static async reverseGeocode(lng: number, lat: number): Promise<any> {
    const token = await this.getToken();
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