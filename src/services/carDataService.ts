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
    
    const variants = this.vehiclesData
      .filter(vehicle => 
        vehicle.brand === manufacturerLabel && 
        vehicle.model === modelLabel
      );
    
    // Since the vehicles.json doesn't have specific variants, we'll use categories as variants
    // and create base variants based on the model
    const uniqueCategories = Array.from(new Set(variants.map(v => v.category)));
    
    return uniqueCategories.map(category => ({
      value: `${modelValue}-${category.toLowerCase().replace(/\s+/g, '-')}`,
      label: `${modelLabel} (${category})`,
      category
    }));
  }
}