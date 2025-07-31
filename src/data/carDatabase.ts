export interface CarVariant {
  value: string;
  label: string;
  years: number[]; // Array of years this variant was available
}

export interface CarModel {
  value: string;
  label: string;
  variants: CarVariant[];
  yearRange: {
    start: number;
    end: number;
  };
}

export interface CarManufacturer {
  value: string;
  label: string;
  models: CarModel[];
}

export const carDatabase: CarManufacturer[] = [
  {
    value: "toyota",
    label: "Toyota",
    models: [
      {
        value: "camry",
        label: "Camry",
        yearRange: { start: 1982, end: 2025 },
        variants: [
          { value: "camry-le", label: "Camry LE", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-se", label: "Camry SE", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-xle", label: "Camry XLE", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-xse", label: "Camry XSE", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-trd", label: "Camry TRD", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-hybrid-le", label: "Camry Hybrid LE", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "camry-hybrid-xle", label: "Camry Hybrid XLE", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "corolla",
        label: "Corolla",
        yearRange: { start: 1966, end: 2025 },
        variants: [
          { value: "corolla-l", label: "Corolla L", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corolla-le", label: "Corolla LE", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corolla-se", label: "Corolla SE", years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corolla-xle", label: "Corolla XLE", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corolla-xse", label: "Corolla XSE", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "rav4",
        label: "RAV4",
        yearRange: { start: 1994, end: 2025 },
        variants: [
          { value: "rav4-le", label: "RAV4 LE", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "rav4-xle", label: "RAV4 XLE", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "rav4-adventure", label: "RAV4 Adventure", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "rav4-limited", label: "RAV4 Limited", years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "rav4-trd-off-road", label: "RAV4 TRD Off-Road", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "rav4-prime", label: "RAV4 Prime", years: [2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "prius",
        label: "Prius",
        yearRange: { start: 1997, end: 2025 },
        variants: [
          { value: "prius-l", label: "Prius L", years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021] },
          { value: "prius-le", label: "Prius LE", years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "prius-xle", label: "Prius XLE", years: [2022, 2023, 2024, 2025] },
          { value: "prius-limited", label: "Prius Limited", years: [2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "honda",
    label: "Honda",
    models: [
      {
        value: "civic",
        label: "Civic",
        yearRange: { start: 1972, end: 2025 },
        variants: [
          { value: "civic-lx", label: "Civic LX", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "civic-sport", label: "Civic Sport", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "civic-ex", label: "Civic EX", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "civic-touring", label: "Civic Touring", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "civic-si", label: "Civic Si", years: [2017, 2018, 2019, 2020, 2022, 2023, 2024, 2025] },
          { value: "civic-type-r", label: "Civic Type R", years: [2017, 2018, 2019, 2020, 2021, 2023, 2024, 2025] }
        ]
      },
      {
        value: "accord",
        label: "Accord",
        yearRange: { start: 1976, end: 2025 },
        variants: [
          { value: "accord-lx", label: "Accord LX", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "accord-sport", label: "Accord Sport", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "accord-ex", label: "Accord EX", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "accord-ex-l", label: "Accord EX-L", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "accord-touring", label: "Accord Touring", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "cr-v",
        label: "CR-V",
        yearRange: { start: 1995, end: 2025 },
        variants: [
          { value: "cr-v-lx", label: "CR-V LX", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "cr-v-ex", label: "CR-V EX", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "cr-v-ex-l", label: "CR-V EX-L", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "cr-v-touring", label: "CR-V Touring", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "ford",
    label: "Ford",
    models: [
      {
        value: "mustang",
        label: "Mustang",
        yearRange: { start: 1964, end: 2025 },
        variants: [
          { value: "mustang-ecoboost", label: "Mustang EcoBoost", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "mustang-gt", label: "Mustang GT", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "mustang-mach-1", label: "Mustang Mach 1", years: [2021, 2022, 2023] },
          { value: "mustang-shelby-gt350", label: "Mustang Shelby GT350", years: [2015, 2016, 2017, 2018, 2019, 2020] },
          { value: "mustang-shelby-gt500", label: "Mustang Shelby GT500", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "f-150",
        label: "F-150",
        yearRange: { start: 1975, end: 2025 },
        variants: [
          { value: "f-150-regular-cab", label: "F-150 Regular Cab", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "f-150-supercab", label: "F-150 SuperCab", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "f-150-supercrew", label: "F-150 SuperCrew", years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "f-150-raptor", label: "F-150 Raptor", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "f-150-lightning", label: "F-150 Lightning", years: [2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "escape",
        label: "Escape",
        yearRange: { start: 2001, end: 2025 },
        variants: [
          { value: "escape-s", label: "Escape S", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "escape-se", label: "Escape SE", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "escape-sel", label: "Escape SEL", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "escape-titanium", label: "Escape Titanium", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "chevrolet",
    label: "Chevrolet",
    models: [
      {
        value: "camaro",
        label: "Camaro",
        yearRange: { start: 1966, end: 2024 },
        variants: [
          { value: "camaro-1ls", label: "Camaro 1LS", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
          { value: "camaro-1lt", label: "Camaro 1LT", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
          { value: "camaro-2lt", label: "Camaro 2LT", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
          { value: "camaro-1ss", label: "Camaro 1SS", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
          { value: "camaro-2ss", label: "Camaro 2SS", years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
          { value: "camaro-zl1", label: "Camaro ZL1", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] }
        ]
      },
      {
        value: "corvette",
        label: "Corvette",
        yearRange: { start: 1953, end: 2025 },
        variants: [
          { value: "corvette-1lt", label: "Corvette 1LT", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corvette-2lt", label: "Corvette 2LT", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corvette-3lt", label: "Corvette 3LT", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "corvette-z06", label: "Corvette Z06", years: [2023, 2024, 2025] }
        ]
      },
      {
        value: "equinox",
        label: "Equinox",
        yearRange: { start: 2005, end: 2025 },
        variants: [
          { value: "equinox-l", label: "Equinox L", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "equinox-ls", label: "Equinox LS", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "equinox-lt", label: "Equinox LT", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "equinox-premier", label: "Equinox Premier", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "bmw",
    label: "BMW",
    models: [
      {
        value: "3-series",
        label: "3 Series",
        yearRange: { start: 1975, end: 2025 },
        variants: [
          { value: "330i", label: "330i", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "330e", label: "330e", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "m340i", label: "M340i", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "m3", label: "M3", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "m3-competition", label: "M3 Competition", years: [2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "x3",
        label: "X3",
        yearRange: { start: 2003, end: 2025 },
        variants: [
          { value: "x3-xdrive30i", label: "X3 xDrive30i", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "x3-m40i", label: "X3 M40i", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "x3-m", label: "X3 M", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "x5",
        label: "X5",
        yearRange: { start: 1999, end: 2025 },
        variants: [
          { value: "x5-xdrive40i", label: "X5 xDrive40i", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "x5-xdrive50i", label: "X5 xDrive50i", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "x5-m50i", label: "X5 M50i", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "x5-m", label: "X5 M", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "mercedes-benz",
    label: "Mercedes-Benz",
    models: [
      {
        value: "c-class",
        label: "C-Class",
        yearRange: { start: 1993, end: 2025 },
        variants: [
          { value: "c300", label: "C 300", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "c300-4matic", label: "C 300 4MATIC", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "amg-c43", label: "AMG C 43", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "amg-c63", label: "AMG C 63", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "amg-c63-s", label: "AMG C 63 S", years: [2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "e-class",
        label: "E-Class",
        yearRange: { start: 1985, end: 2025 },
        variants: [
          { value: "e350", label: "E 350", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "e350-4matic", label: "E 350 4MATIC", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "e450-4matic", label: "E 450 4MATIC", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "amg-e53", label: "AMG E 53", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "amg-e63-s", label: "AMG E 63 S", years: [2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "glc-class",
        label: "GLC-Class",
        yearRange: { start: 2015, end: 2025 },
        variants: [
          { value: "glc300", label: "GLC 300", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "glc300-4matic", label: "GLC 300 4MATIC", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "amg-glc43", label: "AMG GLC 43", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "amg-glc63-s", label: "AMG GLC 63 S", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "tesla",
    label: "Tesla",
    models: [
      {
        value: "model-3",
        label: "Model 3",
        yearRange: { start: 2017, end: 2025 },
        variants: [
          { value: "model-3-standard-range-plus", label: "Model 3 Standard Range Plus", years: [2017, 2018, 2019, 2020, 2021] },
          { value: "model-3-long-range", label: "Model 3 Long Range", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "model-3-performance", label: "Model 3 Performance", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "model-s",
        label: "Model S",
        yearRange: { start: 2012, end: 2025 },
        variants: [
          { value: "model-s-long-range", label: "Model S Long Range", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "model-s-plaid", label: "Model S Plaid", years: [2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "model-x",
        label: "Model X",
        yearRange: { start: 2015, end: 2025 },
        variants: [
          { value: "model-x-long-range", label: "Model X Long Range", years: [2021, 2022, 2023, 2024, 2025] },
          { value: "model-x-plaid", label: "Model X Plaid", years: [2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "model-y",
        label: "Model Y",
        yearRange: { start: 2020, end: 2025 },
        variants: [
          { value: "model-y-long-range", label: "Model Y Long Range", years: [2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "model-y-performance", label: "Model Y Performance", years: [2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  },
  {
    value: "audi",
    label: "Audi",
    models: [
      {
        value: "a4",
        label: "A4",
        yearRange: { start: 1994, end: 2025 },
        variants: [
          { value: "a4-premium", label: "A4 Premium", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "a4-premium-plus", label: "A4 Premium Plus", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "a4-prestige", label: "A4 Prestige", years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      },
      {
        value: "q5",
        label: "Q5",
        yearRange: { start: 2008, end: 2025 },
        variants: [
          { value: "q5-premium", label: "Q5 Premium", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "q5-premium-plus", label: "Q5 Premium Plus", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] },
          { value: "q5-prestige", label: "Q5 Prestige", years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025] }
        ]
      }
    ]
  }
];

// Helper functions for the car database
export const getManufacturerByValue = (value: string): CarManufacturer | undefined => {
  return carDatabase.find(manufacturer => manufacturer.value === value);
};

export const getModelsByManufacturer = (manufacturerValue: string): CarModel[] => {
  const manufacturer = getManufacturerByValue(manufacturerValue);
  return manufacturer ? manufacturer.models : [];
};

export const getYearsByModel = (manufacturerValue: string, modelValue: string): number[] => {
  const manufacturer = getManufacturerByValue(manufacturerValue);
  if (!manufacturer) return [];
  
  const model = manufacturer.models.find(model => model.value === modelValue);
  if (!model) return [];
  
  // Generate years from start to end
  const years = [];
  for (let year = model.yearRange.end; year >= model.yearRange.start; year--) {
    years.push(year);
  }
  return years;
};

export const getVariantsByModelAndYear = (manufacturerValue: string, modelValue: string, year?: number): CarVariant[] => {
  const manufacturer = getManufacturerByValue(manufacturerValue);
  if (!manufacturer) return [];
  
  const model = manufacturer.models.find(model => model.value === modelValue);
  if (!model) return [];
  
  // If no year specified, return all variants
  if (!year) return model.variants;
  
  // Filter variants by year
  return model.variants.filter(variant => variant.years.includes(year));
};