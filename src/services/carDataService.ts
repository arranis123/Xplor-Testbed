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

  static getVehicleTypes(): CarVariant[] {
    const categoriesSet = new Set(this.vehiclesData.map(vehicle => vehicle.category));
    return Array.from(categoriesSet)
      .sort()
      .map(category => ({
        value: category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and'),
        label: category
      }));
  }

  static getManufacturersByVehicleType(vehicleTypeValue: string): CarManufacturer[] {
    const vehicleTypeLabel = this.getVehicleTypes()
      .find(type => type.value === vehicleTypeValue)?.label;
    
    if (!vehicleTypeLabel) return [];

    const brandsSet = new Set(
      this.vehiclesData
        .filter(vehicle => vehicle.category === vehicleTypeLabel)
        .map(vehicle => vehicle.brand)
    );
    
    return Array.from(brandsSet)
      .sort()
      .map(brand => ({
        value: brand.toLowerCase().replace(/\s+/g, '-'),
        label: brand
      }));
  }

  static getManufacturers(): CarManufacturer[] {
    const brandsSet = new Set(this.vehiclesData.map(vehicle => vehicle.brand));
    return Array.from(brandsSet)
      .sort()
      .map(brand => ({
        value: brand.toLowerCase().replace(/\s+/g, '-'),
        label: brand
      }));
  }

  static getModelsByManufacturerAndVehicleType(vehicleTypeValue: string, manufacturerValue: string): CarModel[] {
    if (!vehicleTypeValue || !manufacturerValue) return [];
    
    const vehicleTypeLabel = this.getVehicleTypes()
      .find(type => type.value === vehicleTypeValue)?.label;
    
    const manufacturers = this.getManufacturersByVehicleType(vehicleTypeValue);
    const selectedManufacturer = manufacturers.find(m => m.value === manufacturerValue);
    
    if (!vehicleTypeLabel || !selectedManufacturer) return [];
    
    const manufacturerLabel = selectedManufacturer.label;
    
    const models = this.vehiclesData
      .filter(vehicle => vehicle.category === vehicleTypeLabel && vehicle.brand === manufacturerLabel)
      .map(vehicle => vehicle.model);
    
    const uniqueModels = Array.from(new Set(models));
    
    return uniqueModels
      .sort()
      .map(model => ({
        value: model.toLowerCase().replace(/\s+/g, '-'),
        label: model
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

  static getVariantsByModelAndVehicleType(vehicleTypeValue: string, manufacturerValue: string, modelValue: string): CarVariant[] {
    if (!vehicleTypeValue || !manufacturerValue || !modelValue) return [];
    
    const vehicleTypeLabel = this.getVehicleTypes()
      .find(type => type.value === vehicleTypeValue)?.label;
    
    const manufacturers = this.getManufacturersByVehicleType(vehicleTypeValue);
    const selectedManufacturer = manufacturers.find(m => m.value === manufacturerValue);
    
    const models = this.getModelsByManufacturerAndVehicleType(vehicleTypeValue, manufacturerValue);
    const selectedModel = models.find(m => m.value === modelValue);
    
    if (!vehicleTypeLabel || !selectedManufacturer || !selectedModel) return [];
    
    const manufacturerLabel = selectedManufacturer.label;
    const modelLabel = selectedModel.label;
    
    // Generate variants based on manufacturer and model
    return this.generateVariantsForModel(manufacturerLabel, modelLabel, modelValue);
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
    
    // Generate variants based on manufacturer and model
    return this.generateVariantsForModel(manufacturerLabel, modelLabel, modelValue);
  }
  
  private static generateVariantsForModel(manufacturerLabel: string, modelLabel: string, modelValue: string): CarVariant[] {
    // BMW variants
    if (manufacturerLabel === 'BMW') {
      return this.generateBMWVariants(modelLabel, modelValue);
    }
    
    // Audi variants
    if (manufacturerLabel === 'Audi') {
      return this.generateAudiVariants(modelLabel, modelValue);
    }
    
    // Mercedes-Benz variants
    if (manufacturerLabel === 'Mercedes-Benz') {
      return this.generateMercedesVariants(modelLabel, modelValue);
    }
    
    // Volkswagen variants
    if (manufacturerLabel === 'Volkswagen') {
      return this.generateVolkswagenVariants(modelLabel, modelValue);
    }
    
    // Ford variants
    if (manufacturerLabel === 'Ford') {
      return this.generateFordVariants(modelLabel, modelValue);
    }
    
    // Toyota variants
    if (manufacturerLabel === 'Toyota') {
      return this.generateToyotaVariants(modelLabel, modelValue);
    }
    
    // Honda variants
    if (manufacturerLabel === 'Honda') {
      return this.generateHondaVariants(modelLabel, modelValue);
    }
    
    // Nissan variants
    if (manufacturerLabel === 'Nissan') {
      return this.generateNissanVariants(modelLabel, modelValue);
    }
    
    // Hyundai variants
    if (manufacturerLabel === 'Hyundai') {
      return this.generateHyundaiVariants(modelLabel, modelValue);
    }
    
    // Kia variants
    if (manufacturerLabel === 'Kia') {
      return this.generateKiaVariants(modelLabel, modelValue);
    }
    
    // Generic fallback for other manufacturers
    return this.generateGenericVariants(modelLabel, modelValue);
  }
  
  private static generateBMWVariants(modelLabel: string, modelValue: string): CarVariant[] {
    // Handle BMW Series models
    if (modelLabel.includes('Serisi')) {
      const seriesNumber = modelLabel.replace(' Serisi', '');
      const variantMap: Record<string, string[]> = {
        '1': ['116i', '118i', '120i', '125i', 'M135i'],
        '2': ['218i', '220i', '225i', 'M235i', '228i'],
        '3': ['316i', '318i', '320i', '325i', '330i', '335i', 'M3'],
        '4': ['418i', '420i', '425i', '430i', '435i', 'M4'],
        '5': ['520i', '525i', '530i', '535i', '540i', 'M5'],
        '6': ['630i', '640i', '650i', 'M6'],
        '7': ['730i', '740i', '750i', '760i'],
        '8': ['840i', '850i', 'M8'],
      };
      
      const variants = variantMap[seriesNumber] || [`${seriesNumber}16i`, `${seriesNumber}20i`, `${seriesNumber}25i`];
      return variants.map(variant => ({
        value: `${modelValue}-${variant.toLowerCase()}`,
        label: `BMW ${seriesNumber} Series ${variant}`,
        category: 'Automobile'
      }));
    }
    
    // Handle specific BMW models
    const modelVariants: Record<string, string[]> = {
      'X1': ['sDrive18i', 'xDrive20i', 'xDrive25i', 'xDrive28i'],
      'X2': ['sDrive18i', 'xDrive20i', 'xDrive25i', 'M35i'],
      'X3': ['xDrive20i', 'xDrive30i', 'M40i', 'M Competition'],
      'X4': ['xDrive20i', 'xDrive30i', 'M40i', 'M Competition'],
      'X5': ['xDrive30i', 'xDrive40i', 'xDrive50i', 'M50i'],
      'X6': ['xDrive30i', 'xDrive40i', 'xDrive50i', 'M50i'],
      'X7': ['xDrive40i', 'xDrive50i', 'M50i'],
      'iX': ['xDrive40', 'xDrive50', 'M60'],
      'iX1': ['xDrive30', 'sDrive20'],
      'iX3': ['Premier Edition', 'Impressive'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'Premium', 'Sport'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `BMW ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateAudiVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'A1': ['25 TFSI', '30 TFSI', '35 TFSI', 'S1'],
      'A3': ['30 TFSI', '35 TFSI', '40 TFSI', 'S3', 'RS3'],
      'A4': ['35 TFSI', '40 TFSI', '45 TFSI', 'S4', 'RS4'],
      'A5': ['35 TFSI', '40 TFSI', '45 TFSI', 'S5', 'RS5'],
      'A6': ['40 TFSI', '45 TFSI', '55 TFSI', 'S6', 'RS6'],
      'A7': ['45 TFSI', '55 TFSI', 'S7', 'RS7'],
      'A8': ['50 TFSI', '55 TFSI', '60 TFSI', 'S8'],
      'Q2': ['30 TFSI', '35 TFSI', '40 TFSI', 'SQ2'],
      'Q3': ['35 TFSI', '40 TFSI', '45 TFSI', 'RS Q3'],
      'Q5': ['40 TFSI', '45 TFSI', '55 TFSI', 'SQ5'],
      'Q7': ['45 TFSI', '55 TFSI', 'SQ7'],
      'Q8': ['50 TFSI', '55 TFSI', 'SQ8', 'RS Q8'],
      'TT': ['40 TFSI', '45 TFSI', 'TTS', 'TT RS'],
      'R8': ['V10', 'V10 Plus', 'V10 Performance'],
      'E-Tron': ['50 quattro', '55 quattro', 'S'],
    };
    
    const variants = modelVariants[modelLabel] || ['TFSI', 'TDI', 'Quattro'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Audi ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateMercedesVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'A-Class': ['A 180', 'A 200', 'A 220', 'A 250', 'AMG A 35', 'AMG A 45'],
      'B-Class': ['B 180', 'B 200', 'B 220'],
      'C-Class': ['C 180', 'C 200', 'C 220', 'C 250', 'C 300', 'AMG C 43', 'AMG C 63'],
      'E-Class': ['E 200', 'E 220', 'E 250', 'E 300', 'E 350', 'AMG E 53', 'AMG E 63'],
      'S-Class': ['S 350', 'S 400', 'S 450', 'S 500', 'S 580', 'AMG S 63'],
      'GLA': ['GLA 180', 'GLA 200', 'GLA 220', 'GLA 250', 'AMG GLA 35', 'AMG GLA 45'],
      'GLB': ['GLB 180', 'GLB 200', 'GLB 220', 'GLB 250', 'AMG GLB 35'],
      'GLC': ['GLC 200', 'GLC 220', 'GLC 250', 'GLC 300', 'AMG GLC 43', 'AMG GLC 63'],
      'GLE': ['GLE 300', 'GLE 350', 'GLE 400', 'GLE 450', 'AMG GLE 53', 'AMG GLE 63'],
      'GLS': ['GLS 350', 'GLS 400', 'GLS 450', 'GLS 500', 'AMG GLS 63'],
      'G-Class': ['G 350', 'G 400', 'G 500', 'AMG G 63'],
      'SL': ['SL 55', 'SL 63', 'SL 65'],
      'SLK': ['SLK 200', 'SLK 250', 'SLK 350', 'SLK 55 AMG'],
    };
    
    const variants = modelVariants[modelLabel] || ['200', '250', '300', 'AMG'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Mercedes-Benz ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateVolkswagenVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Golf': ['1.0 TSI', '1.4 TSI', '2.0 TSI', 'GTI', 'R', 'TDI'],
      'Polo': ['1.0 TSI', '1.2 TSI', '1.4 TSI', 'GTI'],
      'Passat': ['1.4 TSI', '2.0 TSI', '2.0 TDI', 'Alltrack', 'R-Line'],
      'Tiguan': ['1.4 TSI', '2.0 TSI', '2.0 TDI', 'R-Line'],
      'Touareg': ['3.0 V6 TSI', '3.0 V6 TDI', '4.0 V8 TSI'],
      'Arteon': ['2.0 TSI', '2.0 TDI', 'R-Line', 'R'],
      'T-Cross': ['1.0 TSI', '1.5 TSI'],
      'T-Roc': ['1.0 TSI', '1.5 TSI', '2.0 TSI', 'R'],
      'Jetta': ['1.4 TSI', '2.0 TSI', 'GLI'],
      'Up Club': ['1.0', '1.0 TSI', 'GTI'],
      'Beetle': ['1.2 TSI', '2.0 TSI', 'Dune'],
      'Scirocco': ['1.4 TSI', '2.0 TSI', 'R'],
    };
    
    const variants = modelVariants[modelLabel] || ['TSI', 'TDI', 'Comfortline', 'Highline'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Volkswagen ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateFordVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Focus': ['1.0 EcoBoost', '1.5 EcoBoost', '2.0 EcoBoost', 'ST', 'RS'],
      'Fiesta': ['1.0 EcoBoost', '1.1 Ti-VCT', '1.5 EcoBoost', 'ST'],
      'Mustang': ['2.3 EcoBoost', '5.0 V8', 'GT', 'Shelby'],
      'Kuga': ['1.5 EcoBoost', '2.0 EcoBoost', '2.5 Hybrid', 'ST-Line'],
      'Explorer': ['2.3 EcoBoost', '3.0 EcoBoost', 'Platinum'],
      'Mondeo': ['1.5 EcoBoost', '2.0 EcoBoost', '2.0 TDCi', 'Titanium'],
      'Ranger': ['2.0 EcoBlue', '3.2 TDCi', 'Raptor', 'Wildtrak'],
      'Transit': ['2.0 EcoBlue', '2.2 TDCi', 'Custom', 'Connect'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'Trend', 'Titanium', 'ST-Line'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Ford ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateToyotaVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Corolla': ['1.2T', '1.8 Hybrid', '2.0 Hybrid', 'GR Sport'],
      'Camry': ['2.5 Hybrid', '3.5 V6', 'TRD'],
      'RAV4': ['2.0', '2.5 Hybrid', '2.5 AWD', 'Prime'],
      'Highlander': ['3.5 V6', '2.5 Hybrid', 'Limited', 'Platinum'],
      'Prius': ['1.8 Hybrid', '1.8 AWD', 'Prime'],
      'Yaris': ['1.0', '1.5', 'GR', 'Cross'],
      'Supra': ['2.0', '3.0', 'A91'],
      'Land Cruiser': ['4.6 V8', '5.7 V8', 'Heritage Edition'],
      'Hilux': ['2.4D', '2.8D', '4.0 V6', 'TRD'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'Active', 'Dynamic', 'Premium'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Toyota ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateHondaVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Civic': ['1.0 VTEC', '1.5 VTEC', '2.0 VTEC', 'Type R', 'Si'],
      'Accord': ['1.5 Turbo', '2.0 Turbo', 'Hybrid', 'Sport'],
      'CR-V': ['1.5 Turbo', '2.0 Hybrid', 'AWD', 'Touring'],
      'HR-V': ['1.8 i-VTEC', '1.5 i-VTEC', 'e:HEV'],
      'Pilot': ['3.5 V6', 'Elite', 'Touring', 'Black Edition'],
      'Ridgeline': ['3.5 V6', 'Sport', 'RTL', 'Black Edition'],
      'Insight': ['1.5 Hybrid', 'LX', 'EX', 'Touring'],
      'Fit': ['1.5 i-VTEC', 'LX', 'Sport', 'EX-L'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'LX', 'EX', 'Touring'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Honda ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateNissanVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Altima': ['2.5L', '2.0 VC-Turbo', 'SR', 'Platinum'],
      'Sentra': ['2.0L', 'SV', 'SR', 'SL'],
      'Rogue': ['2.5L', 'SV', 'SL', 'Platinum'],
      'Murano': ['3.5L V6', 'SV', 'SL', 'Platinum'],
      'Pathfinder': ['3.5L V6', 'SV', 'SL', 'Platinum'],
      'Armada': ['5.6L V8', 'SV', 'SL', 'Platinum'],
      'Maxima': ['3.5L V6', 'SV', 'SL', 'Platinum', 'SR'],
      'Kicks': ['1.6L', 'S', 'SV', 'SR'],
      'Leaf': ['S', 'SV', 'SL', 'Plus'],
      'GT-R': ['Premium', 'Track Edition', 'NISMO'],
      '370Z': ['Base', 'Sport', 'Touring', 'NISMO'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'SV', 'SL', 'Platinum'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Nissan ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateHyundaiVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Elantra': ['2.0L', '1.6T', 'SEL', 'Limited', 'N'],
      'Sonata': ['2.5L', '1.6T', 'SEL', 'Limited', 'N Line'],
      'Tucson': ['2.5L', '1.6T', 'SEL', 'Limited', 'N Line'],
      'Santa Fe': ['2.5L', '2.5T', 'SEL', 'Limited', 'Calligraphy'],
      'Palisade': ['3.8L V6', 'SE', 'SEL', 'Limited', 'Calligraphy'],
      'Accent': ['1.6L', 'SE', 'SEL', 'Limited'],
      'Venue': ['1.6L', 'SE', 'SEL', 'Denim'],
      'Kona': ['2.0L', '1.6T', 'SE', 'SEL', 'Limited', 'N'],
      'Ioniq': ['Hybrid', 'Plug-in', 'Electric'],
      'Genesis': ['3.8L', '5.0L', 'Luxury', 'Ultimate'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'SE', 'SEL', 'Limited'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Hyundai ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateKiaVariants(modelLabel: string, modelValue: string): CarVariant[] {
    const modelVariants: Record<string, string[]> = {
      'Forte': ['2.0L', '1.6T', 'LXS', 'S', 'EX', 'GT'],
      'Optima': ['2.4L', '1.6T', '2.0T', 'LX', 'S', 'EX', 'SX'],
      'Sportage': ['2.4L', '2.0T', 'LX', 'S', 'EX', 'SX'],
      'Sorento': ['2.5L', '2.5T', '1.6T Hybrid', 'LX', 'S', 'EX', 'SX'],
      'Telluride': ['3.8L V6', 'LX', 'S', 'EX', 'SX'],
      'Rio': ['1.6L', 'LX', 'S', 'EX'],
      'Soul': ['2.0L', '1.6T', 'LX', 'S', 'EX', 'GT-Line'],
      'Seltos': ['2.0L', '1.6T', 'LX', 'S', 'EX', 'SX'],
      'Niro': ['1.6L Hybrid', 'LX', 'S', 'EX', 'SX'],
      'Stinger': ['2.0T', '3.3T', 'GT', 'GT1', 'GT2'],
    };
    
    const variants = modelVariants[modelLabel] || ['Base', 'LX', 'S', 'EX'];
    return variants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase().replace(/\s+/g, '-')}`,
      label: `Kia ${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
  
  private static generateGenericVariants(modelLabel: string, modelValue: string): CarVariant[] {
    // Generic variants for manufacturers not specifically mapped
    const genericVariants = ['Base', 'Standard', 'Premium', 'Sport', 'Luxury'];
    
    return genericVariants.map(variant => ({
      value: `${modelValue}-${variant.toLowerCase()}`,
      label: `${modelLabel} ${variant}`,
      category: 'Automobile'
    }));
  }
}