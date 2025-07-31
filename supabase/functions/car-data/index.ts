import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Parse SDK implementation for Deno
class Parse {
  private static appId: string;
  private static jsKey: string;
  private static masterKey: string;
  private static serverURL: string;

  static initialize(appId: string, jsKey: string, masterKey?: string) {
    this.appId = appId;
    this.jsKey = jsKey;
    this.masterKey = masterKey;
    this.serverURL = 'https://parseapi.back4app.com';
  }

  static async makeRequest(method: string, endpoint: string, data?: any, useMasterKey = false) {
    const headers: any = {
      'X-Parse-Application-Id': this.appId,
      'X-Parse-JavaScript-Key': this.jsKey,
      'Content-Type': 'application/json',
    };

    if (useMasterKey && this.masterKey) {
      headers['X-Parse-Master-Key'] = this.masterKey;
      delete headers['X-Parse-JavaScript-Key'];
    }

    const response = await fetch(`${this.serverURL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return await response.json();
  }

  static async createObject(className: string, data: any) {
    return await this.makeRequest('POST', `/parse/classes/${className}`, data, true);
  }

  static async getObjects(className: string, params: any = {}) {
    const queryString = new URLSearchParams(params).toString();
    return await this.makeRequest('GET', `/parse/classes/${className}?${queryString}`);
  }

  static async updateObject(className: string, objectId: string, data: any) {
    return await this.makeRequest('PUT', `/parse/classes/${className}/${objectId}`, data, true);
  }
}

// Comprehensive car manufacturer data
const manufacturersData = [
  // European Manufacturers
  { name: "Abarth", value: "abarth", country: "Italy", region: "Europe" },
  { name: "Acura", value: "acura", country: "Japan", region: "Asia" },
  { name: "Alfa Romeo", value: "alfa-romeo", country: "Italy", region: "Europe" },
  { name: "Aston Martin", value: "aston-martin", country: "United Kingdom", region: "Europe" },
  { name: "Audi", value: "audi", country: "Germany", region: "Europe" },
  { name: "Bentley", value: "bentley", country: "United Kingdom", region: "Europe" },
  { name: "BMW", value: "bmw", country: "Germany", region: "Europe" },
  { name: "Bugatti", value: "bugatti", country: "France", region: "Europe" },
  { name: "Buick", value: "buick", country: "United States", region: "North America" },
  { name: "BYD", value: "byd", country: "China", region: "Asia" },
  { name: "Cadillac", value: "cadillac", country: "United States", region: "North America" },
  { name: "Chery", value: "chery", country: "China", region: "Asia" },
  { name: "Chevrolet", value: "chevrolet", country: "United States", region: "North America" },
  { name: "Chrysler", value: "chrysler", country: "United States", region: "North America" },
  { name: "Citroën", value: "citroen", country: "France", region: "Europe" },
  { name: "Dacia", value: "dacia", country: "Romania", region: "Europe" },
  { name: "Dodge", value: "dodge", country: "United States", region: "North America" },
  { name: "DS Automobiles", value: "ds", country: "France", region: "Europe" },
  { name: "Ferrari", value: "ferrari", country: "Italy", region: "Europe" },
  { name: "Fiat", value: "fiat", country: "Italy", region: "Europe" },
  { name: "Ford", value: "ford", country: "United States", region: "North America" },
  { name: "GAC", value: "gac", country: "China", region: "Asia" },
  { name: "Geely", value: "geely", country: "China", region: "Asia" },
  { name: "Genesis", value: "genesis", country: "South Korea", region: "Asia" },
  { name: "GMC", value: "gmc", country: "United States", region: "North America" },
  { name: "Great Wall", value: "great-wall", country: "China", region: "Asia" },
  { name: "Honda", value: "honda", country: "Japan", region: "Asia" },
  { name: "Hyundai", value: "hyundai", country: "South Korea", region: "Asia" },
  { name: "Infiniti", value: "infiniti", country: "Japan", region: "Asia" },
  { name: "Isuzu", value: "isuzu", country: "Japan", region: "Asia" },
  { name: "Jaguar", value: "jaguar", country: "United Kingdom", region: "Europe" },
  { name: "Jeep", value: "jeep", country: "United States", region: "North America" },
  { name: "Kia", value: "kia", country: "South Korea", region: "Asia" },
  { name: "Lada", value: "lada", country: "Russia", region: "Europe" },
  { name: "Lamborghini", value: "lamborghini", country: "Italy", region: "Europe" },
  { name: "Lancia", value: "lancia", country: "Italy", region: "Europe" },
  { name: "Land Rover", value: "land-rover", country: "United Kingdom", region: "Europe" },
  { name: "Lexus", value: "lexus", country: "Japan", region: "Asia" },
  { name: "Li Auto", value: "li-auto", country: "China", region: "Asia" },
  { name: "Lincoln", value: "lincoln", country: "United States", region: "North America" },
  { name: "Lotus", value: "lotus", country: "United Kingdom", region: "Europe" },
  { name: "Lucid", value: "lucid", country: "United States", region: "North America" },
  { name: "Mahindra", value: "mahindra", country: "India", region: "Asia" },
  { name: "Maruti Suzuki", value: "maruti-suzuki", country: "India", region: "Asia" },
  { name: "Maserati", value: "maserati", country: "Italy", region: "Europe" },
  { name: "Mazda", value: "mazda", country: "Japan", region: "Asia" },
  { name: "McLaren", value: "mclaren", country: "United Kingdom", region: "Europe" },
  { name: "Mercedes-Benz", value: "mercedes-benz", country: "Germany", region: "Europe" },
  { name: "MINI", value: "mini", country: "United Kingdom", region: "Europe" },
  { name: "Mitsubishi", value: "mitsubishi", country: "Japan", region: "Asia" },
  { name: "NIO", value: "nio", country: "China", region: "Asia" },
  { name: "Nissan", value: "nissan", country: "Japan", region: "Asia" },
  { name: "Opel", value: "opel", country: "Germany", region: "Europe" },
  { name: "Peugeot", value: "peugeot", country: "France", region: "Europe" },
  { name: "Polestar", value: "polestar", country: "Sweden", region: "Europe" },
  { name: "Porsche", value: "porsche", country: "Germany", region: "Europe" },
  { name: "Proton", value: "proton", country: "Malaysia", region: "Asia" },
  { name: "Ram", value: "ram", country: "United States", region: "North America" },
  { name: "Renault", value: "renault", country: "France", region: "Europe" },
  { name: "Rivian", value: "rivian", country: "United States", region: "North America" },
  { name: "Rolls-Royce", value: "rolls-royce", country: "United Kingdom", region: "Europe" },
  { name: "SEAT", value: "seat", country: "Spain", region: "Europe" },
  { name: "Škoda", value: "skoda", country: "Czech Republic", region: "Europe" },
  { name: "Smart", value: "smart", country: "Germany", region: "Europe" },
  { name: "Subaru", value: "subaru", country: "Japan", region: "Asia" },
  { name: "Suzuki", value: "suzuki", country: "Japan", region: "Asia" },
  { name: "Tata", value: "tata", country: "India", region: "Asia" },
  { name: "Tesla", value: "tesla", country: "United States", region: "North America" },
  { name: "Toyota", value: "toyota", country: "Japan", region: "Asia" },
  { name: "Volkswagen", value: "volkswagen", country: "Germany", region: "Europe" },
  { name: "Volvo", value: "volvo", country: "Sweden", region: "Europe" },
  { name: "Xpeng", value: "xpeng", country: "China", region: "Asia" }
];

// Sample models and variants data (abbreviated for brevity)
const modelsData = [
  // Toyota Models
  { 
    name: "Camry", 
    value: "camry", 
    manufacturerValue: "toyota", 
    yearStart: 1982, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "Corolla", 
    value: "corolla", 
    manufacturerValue: "toyota", 
    yearStart: 1966, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "RAV4", 
    value: "rav4", 
    manufacturerValue: "toyota", 
    yearStart: 1994, 
    yearEnd: 2025,
    category: "SUV"
  },
  { 
    name: "Prius", 
    value: "prius", 
    manufacturerValue: "toyota", 
    yearStart: 1997, 
    yearEnd: 2025,
    category: "Hybrid"
  },
  // BMW Models
  { 
    name: "3 Series", 
    value: "3-series", 
    manufacturerValue: "bmw", 
    yearStart: 1975, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "X3", 
    value: "x3", 
    manufacturerValue: "bmw", 
    yearStart: 2003, 
    yearEnd: 2025,
    category: "SUV"
  },
  { 
    name: "X5", 
    value: "x5", 
    manufacturerValue: "bmw", 
    yearStart: 1999, 
    yearEnd: 2025,
    category: "SUV"
  },
  // Mercedes-Benz Models
  { 
    name: "C-Class", 
    value: "c-class", 
    manufacturerValue: "mercedes-benz", 
    yearStart: 1993, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "E-Class", 
    value: "e-class", 
    manufacturerValue: "mercedes-benz", 
    yearStart: 1985, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "GLC-Class", 
    value: "glc-class", 
    manufacturerValue: "mercedes-benz", 
    yearStart: 2015, 
    yearEnd: 2025,
    category: "SUV"
  },
  // Tesla Models
  { 
    name: "Model 3", 
    value: "model-3", 
    manufacturerValue: "tesla", 
    yearStart: 2017, 
    yearEnd: 2025,
    category: "Electric Sedan"
  },
  { 
    name: "Model S", 
    value: "model-s", 
    manufacturerValue: "tesla", 
    yearStart: 2012, 
    yearEnd: 2025,
    category: "Electric Sedan"
  },
  { 
    name: "Model Y", 
    value: "model-y", 
    manufacturerValue: "tesla", 
    yearStart: 2020, 
    yearEnd: 2025,
    category: "Electric SUV"
  },
  // Honda Models
  { 
    name: "Civic", 
    value: "civic", 
    manufacturerValue: "honda", 
    yearStart: 1972, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "Accord", 
    value: "accord", 
    manufacturerValue: "honda", 
    yearStart: 1976, 
    yearEnd: 2025,
    category: "Sedan"
  },
  { 
    name: "CR-V", 
    value: "cr-v", 
    manufacturerValue: "honda", 
    yearStart: 1995, 
    yearEnd: 2025,
    category: "SUV"
  },
  // Ford Models
  { 
    name: "Mustang", 
    value: "mustang", 
    manufacturerValue: "ford", 
    yearStart: 1964, 
    yearEnd: 2025,
    category: "Sports Car"
  },
  { 
    name: "F-150", 
    value: "f-150", 
    manufacturerValue: "ford", 
    yearStart: 1975, 
    yearEnd: 2025,
    category: "Pickup Truck"
  },
  { 
    name: "Escape", 
    value: "escape", 
    manufacturerValue: "ford", 
    yearStart: 2001, 
    yearEnd: 2025,
    category: "SUV"
  }
];

const variantsData = [
  // Toyota Camry Variants
  { name: "Camry LE", value: "camry-le", modelValue: "camry", availableYears: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Camry SE", value: "camry-se", modelValue: "camry", availableYears: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Camry XLE", value: "camry-xle", modelValue: "camry", availableYears: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Camry XSE", value: "camry-xse", modelValue: "camry", availableYears: [2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Camry TRD", value: "camry-trd", modelValue: "camry", availableYears: [2020,2021,2022,2023,2024,2025] },
  
  // BMW 3 Series Variants
  { name: "330i", value: "330i", modelValue: "3-series", availableYears: [2019,2020,2021,2022,2023,2024,2025] },
  { name: "330e", value: "330e", modelValue: "3-series", availableYears: [2020,2021,2022,2023,2024,2025] },
  { name: "M340i", value: "m340i", modelValue: "3-series", availableYears: [2019,2020,2021,2022,2023,2024,2025] },
  { name: "M3", value: "m3", modelValue: "3-series", availableYears: [2021,2022,2023,2024,2025] },
  { name: "M3 Competition", value: "m3-competition", modelValue: "3-series", availableYears: [2021,2022,2023,2024,2025] },
  
  // Tesla Model 3 Variants
  { name: "Model 3 Standard Range Plus", value: "model-3-standard-range-plus", modelValue: "model-3", availableYears: [2017,2018,2019,2020,2021] },
  { name: "Model 3 Long Range", value: "model-3-long-range", modelValue: "model-3", availableYears: [2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Model 3 Performance", value: "model-3-performance", modelValue: "model-3", availableYears: [2018,2019,2020,2021,2022,2023,2024,2025] },
  
  // Honda Civic Variants
  { name: "Civic LX", value: "civic-lx", modelValue: "civic", availableYears: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Civic Sport", value: "civic-sport", modelValue: "civic", availableYears: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Civic EX", value: "civic-ex", modelValue: "civic", availableYears: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Civic Touring", value: "civic-touring", modelValue: "civic", availableYears: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025] },
  { name: "Civic Si", value: "civic-si", modelValue: "civic", availableYears: [2017,2018,2019,2020,2022,2023,2024,2025] },
  { name: "Civic Type R", value: "civic-type-r", modelValue: "civic", availableYears: [2017,2018,2019,2020,2021,2023,2024,2025] }
];

serve(async (req) => {
  console.log('Car Data API - Request received:', req.method, req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Parse with Back4App credentials
    const appId = 'XkCU28c4NNa8NKO2CvVHhNkGVGAu1DENMZdzbfPG';
    const jsKey = 'z5E3avuwqZMtp9BAvcctpUFHc0wotqpRNQRhN0Yx';
    const masterKey = 'o7U21XEizdXes6zF67wF2bxgibU48UwM3UAJfOzP';

    if (!appId || !jsKey) {
      throw new Error('Back4App credentials not configured');
    }

    Parse.initialize(appId, jsKey, masterKey);
    console.log('Parse initialized with Back4App credentials');

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'get-manufacturers';
    
    console.log(`Car Data API - Action: ${action}`);

    switch (action) {
      case 'init-database':
        return await initializeDatabase();
      
      case 'get-manufacturers':
        return await getManufacturers();
      
      case 'test-manufacturers':
        // Direct return of hardcoded data for testing
        const testManufacturers = manufacturersData.map(item => ({
          value: item.value,
          label: item.name,
          country: item.country,
          region: item.region
        }));
        return new Response(JSON.stringify({ manufacturers: testManufacturers }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      
      case 'get-models':
        const manufacturerValue = url.searchParams.get('manufacturer');
        return await getModelsByManufacturer(manufacturerValue);
      
      case 'get-years':
        const modelValue = url.searchParams.get('model');
        const manufacturer = url.searchParams.get('manufacturer');
        return await getYearsByModel(manufacturer, modelValue);
      
      case 'get-variants':
        const variantModelValue = url.searchParams.get('model');
        const variantManufacturer = url.searchParams.get('manufacturer');
        const year = url.searchParams.get('year');
        return await getVariantsByModelAndYear(variantManufacturer, variantModelValue, year);
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

  } catch (error) {
    console.error('Error in car-data function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function initializeDatabase() {
  console.log('Initializing car database...');
  
  try {
    // Create manufacturers
    console.log('Creating manufacturers...');
    const createdManufacturers = [];
    for (const manufacturer of manufacturersData) {
      try {
        const result = await Parse.createObject('CarManufacturer', manufacturer);
        createdManufacturers.push({ ...manufacturer, objectId: result.objectId });
        console.log(`Created manufacturer: ${manufacturer.name}`);
      } catch (error) {
        console.error(`Error creating manufacturer ${manufacturer.name}:`, error);
      }
    }

    // Create models
    console.log('Creating models...');
    const createdModels = [];
    for (const model of modelsData) {
      try {
        const manufacturer = createdManufacturers.find(m => m.value === model.manufacturerValue);
        if (manufacturer) {
          const modelData = {
            ...model,
            manufacturer: {
              __type: "Pointer",
              className: "CarManufacturer",
              objectId: manufacturer.objectId
            }
          };
          delete modelData.manufacturerValue;
          
          const result = await Parse.createObject('CarModel', modelData);
          createdModels.push({ ...model, objectId: result.objectId });
          console.log(`Created model: ${model.name}`);
        }
      } catch (error) {
        console.error(`Error creating model ${model.name}:`, error);
      }
    }

    // Create variants
    console.log('Creating variants...');
    const createdVariants = [];
    for (const variant of variantsData) {
      try {
        const model = createdModels.find(m => m.value === variant.modelValue);
        if (model) {
          const variantData = {
            ...variant,
            model: {
              __type: "Pointer",
              className: "CarModel",
              objectId: model.objectId
            }
          };
          delete variantData.modelValue;
          
          const result = await Parse.createObject('CarVariant', variantData);
          createdVariants.push({ ...variant, objectId: result.objectId });
          console.log(`Created variant: ${variant.name}`);
        }
      } catch (error) {
        console.error(`Error creating variant ${variant.name}:`, error);
      }
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Database initialized successfully',
      stats: {
        manufacturers: createdManufacturers.length,
        models: createdModels.length,
        variants: createdVariants.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error initializing database:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to initialize database',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getManufacturers() {
  try {
    console.log('Fetching manufacturers from Back4App...');
    
    const result = await Parse.getObjects('CarManufacturer', {
      order: 'name',
      limit: 1000
    });
    
    console.log('Parse result:', result);
    
    // If no manufacturers exist, auto-initialize the database
    if (!result.results || result.results.length === 0) {
      console.log('No manufacturers found, auto-initializing database...');
      
      // Initialize database and return the result directly
      const initResult = await initializeDatabase();
      if (initResult.success) {
        // Return the hardcoded manufacturers data as backup
        const manufacturers = manufacturersData.map(item => ({
          value: item.value,
          label: item.name,
          country: item.country,
          region: item.region
        }));

        return new Response(JSON.stringify({ manufacturers }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
    }
    
    const manufacturers = result.results.map(item => ({
      value: item.value,
      label: item.name,
      country: item.country,
      region: item.region
    }));

    console.log(`Returning ${manufacturers.length} manufacturers`);

    return new Response(JSON.stringify({ manufacturers }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting manufacturers:', error);
    
    // Fallback to hardcoded manufacturers data
    const manufacturers = manufacturersData.map(item => ({
      value: item.value,
      label: item.name,
      country: item.country,
      region: item.region
    }));

    return new Response(JSON.stringify({ manufacturers }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getModelsByManufacturer(manufacturerValue: string | null) {
  if (!manufacturerValue) {
    return new Response(JSON.stringify({ error: 'Manufacturer value required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // First get the manufacturer
    const manufacturerResult = await Parse.getObjects('CarManufacturer', {
      where: JSON.stringify({ value: manufacturerValue })
    });

    if (!manufacturerResult.results.length) {
      return new Response(JSON.stringify({ models: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const manufacturer = manufacturerResult.results[0];

    // Get models for this manufacturer
    const modelsResult = await Parse.getObjects('CarModel', {
      where: JSON.stringify({
        manufacturer: {
          __type: "Pointer",
          className: "CarManufacturer",
          objectId: manufacturer.objectId
        }
      }),
      order: 'name'
    });

    const models = modelsResult.results.map(item => ({
      value: item.value,
      label: item.name,
      yearRange: {
        start: item.yearStart,
        end: item.yearEnd
      },
      category: item.category
    }));

    return new Response(JSON.stringify({ models }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting models:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getYearsByModel(manufacturerValue: string | null, modelValue: string | null) {
  if (!manufacturerValue || !modelValue) {
    return new Response(JSON.stringify({ error: 'Manufacturer and model values required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get the manufacturer first
    const manufacturerResult = await Parse.getObjects('CarManufacturer', {
      where: JSON.stringify({ value: manufacturerValue })
    });

    if (!manufacturerResult.results.length) {
      return new Response(JSON.stringify({ years: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const manufacturer = manufacturerResult.results[0];

    // Get the model
    const modelsResult = await Parse.getObjects('CarModel', {
      where: JSON.stringify({
        value: modelValue,
        manufacturer: {
          __type: "Pointer",
          className: "CarManufacturer",
          objectId: manufacturer.objectId
        }
      })
    });

    if (!modelsResult.results.length) {
      return new Response(JSON.stringify({ years: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const model = modelsResult.results[0];

    // Generate years from start to end (descending order)
    const years = [];
    for (let year = model.yearEnd; year >= model.yearStart; year--) {
      years.push(year);
    }

    return new Response(JSON.stringify({ years }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting years:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function getVariantsByModelAndYear(manufacturerValue: string | null, modelValue: string | null, year: string | null) {
  if (!manufacturerValue || !modelValue) {
    return new Response(JSON.stringify({ error: 'Manufacturer and model values required' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    // Get the manufacturer first
    const manufacturerResult = await Parse.getObjects('CarManufacturer', {
      where: JSON.stringify({ value: manufacturerValue })
    });

    if (!manufacturerResult.results.length) {
      return new Response(JSON.stringify({ variants: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const manufacturer = manufacturerResult.results[0];

    // Get the model
    const modelsResult = await Parse.getObjects('CarModel', {
      where: JSON.stringify({
        value: modelValue,
        manufacturer: {
          __type: "Pointer",
          className: "CarManufacturer",
          objectId: manufacturer.objectId
        }
      })
    });

    if (!modelsResult.results.length) {
      return new Response(JSON.stringify({ variants: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const model = modelsResult.results[0];

    // Get variants for this model
    const variantsResult = await Parse.getObjects('CarVariant', {
      where: JSON.stringify({
        model: {
          __type: "Pointer",
          className: "CarModel",
          objectId: model.objectId
        }
      }),
      order: 'name'
    });

    let variants = variantsResult.results.map(item => ({
      value: item.value,
      label: item.name,
      years: item.availableYears || []
    }));

    // Filter by year if provided
    if (year) {
      const yearInt = parseInt(year);
      variants = variants.filter(variant => 
        variant.years.includes(yearInt)
      );
    }

    return new Response(JSON.stringify({ variants }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error getting variants:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}