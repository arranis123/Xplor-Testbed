import { supabase } from "@/integrations/supabase/client";

export interface CarManufacturer {
  value: string;
  label: string;
  country: string;
  region: string;
}

export interface CarModel {
  value: string;
  label: string;
  yearRange: {
    start: number;
    end: number;
  };
  category: string;
}

export interface CarVariant {
  value: string;
  label: string;
  years: number[];
}

class CarDataService {
  private cache = new Map<string, any>();
  private cacheExpiry = 5 * 60 * 1000; // 5 minutes

  private isCacheValid(key: string): boolean {
    const cached = this.cache.get(key);
    if (!cached) return false;
    return Date.now() - cached.timestamp < this.cacheExpiry;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private getCache(key: string): any {
    const cached = this.cache.get(key);
    return cached ? cached.data : null;
  }

  async initializeDatabase(): Promise<{ success: boolean; message: string; stats?: any }> {
    try {
      console.log('Initializing car database...');
      
      const { data, error } = await supabase.functions.invoke('car-data', {
        body: null,
        method: 'GET'
      });

      if (error) {
        console.error('Error invoking car-data function:', error);
        throw new Error(error.message);
      }

      // Call with init-database action
      const response = await fetch(`https://mlbxdswayzjckmuibcfk.functions.supabase.co/car-data?action=init-database`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Database initialization result:', result);
      
      return result;
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  async getManufacturers(): Promise<CarManufacturer[]> {
    const cacheKey = 'manufacturers';
    
    if (this.isCacheValid(cacheKey)) {
      console.log('Returning cached manufacturers');
      return this.getCache(cacheKey);
    }

    try {
      console.log('Fetching manufacturers from Back4App...');
      
      const response = await fetch(`https://mlbxdswayzjckmuibcfk.functions.supabase.co/car-data?action=test-manufacturers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      const manufacturers = result.manufacturers || [];
      this.setCache(cacheKey, manufacturers);
      
      console.log(`Fetched ${manufacturers.length} manufacturers`);
      return manufacturers;
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      throw error;
    }
  }

  async getModelsByManufacturer(manufacturerValue: string): Promise<CarModel[]> {
    const cacheKey = `models-${manufacturerValue}`;
    
    if (this.isCacheValid(cacheKey)) {
      console.log(`Returning cached models for ${manufacturerValue}`);
      return this.getCache(cacheKey);
    }

    try {
      console.log(`Fetching models for manufacturer: ${manufacturerValue}`);
      
      const response = await fetch(`https://mlbxdswayzjckmuibcfk.functions.supabase.co/car-data?action=get-models&manufacturer=${encodeURIComponent(manufacturerValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      const models = result.models || [];
      this.setCache(cacheKey, models);
      
      console.log(`Fetched ${models.length} models for ${manufacturerValue}`);
      return models;
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }

  async getYearsByModel(manufacturerValue: string, modelValue: string): Promise<number[]> {
    const cacheKey = `years-${manufacturerValue}-${modelValue}`;
    
    if (this.isCacheValid(cacheKey)) {
      console.log(`Returning cached years for ${manufacturerValue} ${modelValue}`);
      return this.getCache(cacheKey);
    }

    try {
      console.log(`Fetching years for model: ${manufacturerValue} ${modelValue}`);
      
      const response = await fetch(`https://mlbxdswayzjckmuibcfk.functions.supabase.co/car-data?action=get-years&manufacturer=${encodeURIComponent(manufacturerValue)}&model=${encodeURIComponent(modelValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      const years = result.years || [];
      this.setCache(cacheKey, years);
      
      console.log(`Fetched ${years.length} years for ${manufacturerValue} ${modelValue}`);
      return years;
    } catch (error) {
      console.error('Error fetching years:', error);
      throw error;
    }
  }

  async getVariantsByModelAndYear(manufacturerValue: string, modelValue: string, year?: number): Promise<CarVariant[]> {
    const cacheKey = `variants-${manufacturerValue}-${modelValue}-${year || 'all'}`;
    
    if (this.isCacheValid(cacheKey)) {
      console.log(`Returning cached variants for ${manufacturerValue} ${modelValue} ${year || 'all years'}`);
      return this.getCache(cacheKey);
    }

    try {
      console.log(`Fetching variants for: ${manufacturerValue} ${modelValue} ${year || 'all years'}`);
      
      let url = `https://mlbxdswayzjckmuibcfk.functions.supabase.co/car-data?action=get-variants&manufacturer=${encodeURIComponent(manufacturerValue)}&model=${encodeURIComponent(modelValue)}`;
      
      if (year) {
        url += `&year=${year}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      const variants = result.variants || [];
      this.setCache(cacheKey, variants);
      
      console.log(`Fetched ${variants.length} variants for ${manufacturerValue} ${modelValue} ${year || 'all years'}`);
      return variants;
    } catch (error) {
      console.error('Error fetching variants:', error);
      throw error;
    }
  }

  clearCache(): void {
    this.cache.clear();
    console.log('Car data cache cleared');
  }
}

export const carDataService = new CarDataService();