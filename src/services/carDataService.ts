import { carDatabase } from '@/data/carDatabase';

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
  private static carData = carDatabase;

  static getVehicleTypes(): CarVariant[] {
    // Return standard vehicle types since carDatabase doesn't have category classification
    const vehicleTypes = [
      { value: "sedan", label: "Sedan" },
      { value: "hatchback", label: "Hatchback" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "suv", label: "SUV" },
      { value: "luxury-car", label: "Luxury Car" },
      { value: "sports-car", label: "Sports Car" },
      { value: "electric-vehicle", label: "Electric Vehicle" },
      { value: "hybrid-vehicle", label: "Hybrid Vehicle" },
      { value: "truck", label: "Truck" },
      { value: "commercial-van", label: "Commercial Van" },
      { value: "rv", label: "RV/Motorhome" },
      { value: "motorcycle", label: "Motorcycle" },
      { value: "jet-ski", label: "Jet Ski" },
      { value: "snowmobile", label: "Snowmobile" },
      { value: "trailer", label: "Trailer" },
      { value: "camper", label: "Camper" },
      { value: "motorhome", label: "Motorhome" },
      { value: "caravan", label: "Caravan" }
    ];
    
    return vehicleTypes.sort((a, b) => a.label.localeCompare(b.label));
  }

  static getManufacturersByVehicleType(vehicleTypeValue: string): CarManufacturer[] {
    // Since carDatabase doesn't have vehicle type filtering, return all manufacturers
    return this.getManufacturers();
  }

  static getManufacturers(): CarManufacturer[] {
    return this.carData.map(manufacturer => ({
      value: manufacturer.value,
      label: manufacturer.label
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  static getModelsByManufacturerAndVehicleType(vehicleTypeValue: string, manufacturerValue: string): CarModel[] {
    if (!manufacturerValue) return [];
    
    const manufacturer = this.carData.find(m => m.value === manufacturerValue);
    if (!manufacturer) return [];
    
    return manufacturer.models.map(model => ({
      value: model.value,
      label: model.label
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  static getModelsByManufacturer(manufacturerValue: string): CarModel[] {
    if (!manufacturerValue) return [];
    
    const manufacturer = this.carData.find(m => m.value === manufacturerValue);
    if (!manufacturer) return [];
    
    return manufacturer.models.map(model => ({
      value: model.value,
      label: model.label
    })).sort((a, b) => a.label.localeCompare(b.label));
  }

  static getVariantsByModelAndVehicleType(vehicleTypeValue: string, manufacturerValue: string, modelValue: string): CarVariant[] {
    if (!vehicleTypeValue || !manufacturerValue || !modelValue) return [];
    
    const manufacturer = this.carData.find(m => m.value === manufacturerValue);
    if (!manufacturer) return [];
    
    const model = manufacturer.models.find(m => m.value === modelValue);
    if (!model) return [];
    
    return model.variants.map(variant => ({
      value: variant.value,
      label: variant.label,
      category: 'Automobile'
    }));
  }

  static getVariantsByModel(manufacturerValue: string, modelValue: string): CarVariant[] {
    if (!manufacturerValue || !modelValue) return [];
    
    const manufacturer = this.carData.find(m => m.value === manufacturerValue);
    if (!manufacturer) return [];
    
    const model = manufacturer.models.find(m => m.value === modelValue);
    if (!model) return [];
    
    return model.variants.map(variant => ({
      value: variant.value,
      label: variant.label,
      category: 'Automobile'
    }));
  }
}