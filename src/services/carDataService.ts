import vehiclesData from '@/data/vehicles.json';

export interface CarManufacturer {
  value: string;
  label: string;
}

export interface CarModel {
  value: string;
  label: string;
}

export interface CarVariant {
  value: string;
  label: string;
  category?: string;
}

export class CarDataService {
  private static vehiclesData = vehiclesData.vehicles;

  static getManufacturers(): CarManufacturer[] {
    const brandsSet = new Set(this.vehiclesData.map(vehicle => vehicle.brand));
    return Array.from(brandsSet)
      .sort()
      .map(brand => ({
        value: brand.toLowerCase().replace(/\s+/g, '-'),
        label: brand
      }));
  }

  static getModelsByManufacturer(manufacturerValue: string): CarModel[] {
    if (!manufacturerValue) return [];
    
    // Find the actual brand label from our manufacturers list
    const manufacturers = this.getManufacturers();
    const selectedManufacturer = manufacturers.find(m => m.value === manufacturerValue);
    
    if (!selectedManufacturer) return [];
    
    const manufacturerLabel = selectedManufacturer.label;
    
    const models = this.vehiclesData
      .filter(vehicle => vehicle.brand === manufacturerLabel)
      .map(vehicle => vehicle.model);
    
    const uniqueModels = Array.from(new Set(models));
    
    return uniqueModels
      .sort()
      .map(model => ({
        value: model.toLowerCase().replace(/\s+/g, '-'),
        label: model
      }));
  }

  static getVariantsByModel(manufacturerValue: string, modelValue: string): CarVariant[] {
    if (!manufacturerValue || !modelValue) return [];
    
    // Find the actual brand and model labels
    const manufacturers = this.getManufacturers();
    const selectedManufacturer = manufacturers.find(m => m.value === manufacturerValue);
    
    if (!selectedManufacturer) return [];
    
    const manufacturerLabel = selectedManufacturer.label;
    const models = this.getModelsByManufacturer(manufacturerValue);
    const selectedModel = models.find(m => m.value === modelValue);
    
    if (!selectedModel) return [];
    
    const modelLabel = selectedModel.label;
    
    // For now, since the database doesn't have specific trim/engine variants,
    // we'll create some common variants based on the model
    // This would ideally come from a more detailed database
    
    // Check if this is a BMW series model that could have variants
    if (manufacturerLabel === 'BMW' && modelLabel.includes('Serisi')) {
      const seriesNumber = modelLabel.replace(' Serisi', '');
      return this.generateBMWSeriesVariants(seriesNumber, modelValue);
    }
    
    // For other manufacturers, use the category-based approach as fallback
    const vehicles = this.vehiclesData
      .filter(vehicle => 
        vehicle.brand === manufacturerLabel && 
        vehicle.model === modelLabel
      );
    
    if (vehicles.length === 0) return [];
    
    // Just return the base model as a single variant for now
    return [{
      value: `${modelValue}-base`,
      label: `${modelLabel} (Standard)`,
      category: vehicles[0].category
    }];
  }
  
  private static generateBMWSeriesVariants(seriesNumber: string, modelValue: string): CarVariant[] {
    // Generate common BMW variants based on series
    // This is a placeholder - ideally this data would come from the database
    const variantMap: Record<string, string[]> = {
      '1': ['116i', '118i', '120i', '125i', 'M135i'],
      '2': ['218i', '220i', '225i', 'M235i'],
      '3': ['316i', '318i', '320i', '325i', '330i', '335i', 'M3'],
      '4': ['418i', '420i', '425i', '430i', '435i', 'M4'],
      '5': ['520i', '525i', '530i', '535i', '540i', 'M5'],
      '6': ['630i', '640i', '650i', 'M6'],
      '7': ['730i', '740i', '750i', '760i'],
      '8': ['840i', '850i', 'M8'],
    };
    
    const variants = variantMap[seriesNumber] || [`${seriesNumber}00i`];
    
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase()}`,
      label: `BMW ${seriesNumber} Series ${variant}`,
      category: 'Automobile'
    }));
  }
}