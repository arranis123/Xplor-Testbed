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
    
    // Get all entries for this specific brand/model combination
    const variants = this.vehiclesData
      .filter(vehicle => 
        vehicle.brand === manufacturerLabel && 
        vehicle.model === modelLabel
      );
    
    // Each entry in the database represents a variant
    // Group by category to create meaningful variant names
    const variantsByCategory = variants.reduce((acc, variant, index) => {
      const categoryKey = variant.category;
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push({
        value: `${modelValue}-${categoryKey.toLowerCase().replace(/\s+/g, '-')}-${index}`,
        label: `${modelLabel} (${categoryKey})`,
        category: categoryKey
      });
      return acc;
    }, {} as Record<string, CarVariant[]>);
    
    // Flatten the variants and return them
    const allVariants = Object.values(variantsByCategory).flat();
    
    // If multiple variants exist for the same category, add numbering
    const categoryCount = {} as Record<string, number>;
    
    return allVariants.map(variant => {
      const categoryKey = variant.category!;
      categoryCount[categoryKey] = (categoryCount[categoryKey] || 0) + 1;
      
      if (categoryCount[categoryKey] > 1) {
        return {
          ...variant,
          label: `${modelLabel} (${categoryKey}) - Variant ${categoryCount[categoryKey]}`
        };
      }
      
      return variant;
    });
  }
}