export interface CarVariant {
  value: string;
  label: string;
}

export interface CarModel {
  value: string;
  label: string;
  variants: CarVariant[];
}

export interface CarManufacturer {
  value: string;
  label: string;
  models: CarModel[];
}

export const carDatabase: CarManufacturer[] = [
  {
    value: "abarth",
    label: "Abarth",
    models: [
      {
        value: "500",
        label: "500",
        variants: [
          { value: "500-turismo", label: "500 Turismo" },
          { value: "500-competizione", label: "500 Competizione" },
          { value: "500e", label: "500e" }
        ]
      },
      {
        value: "695",
        label: "695",
        variants: [
          { value: "695-esseesse", label: "695 Esseesse" },
          { value: "695-biposto", label: "695 Biposto" }
        ]
      }
    ]
  },
  {
    value: "acura",
    label: "Acura",
    models: [
      {
        value: "ilx",
        label: "ILX",
        variants: [
          { value: "ilx-base", label: "ILX Base" },
          { value: "ilx-premium", label: "ILX Premium" },
          { value: "ilx-aspec", label: "ILX A-Spec" }
        ]
      },
      {
        value: "tlx",
        label: "TLX",
        variants: [
          { value: "tlx-base", label: "TLX Base" },
          { value: "tlx-aspec", label: "TLX A-Spec" },
          { value: "tlx-type-s", label: "TLX Type S" }
        ]
      },
      {
        value: "rdx",
        label: "RDX",
        variants: [
          { value: "rdx-base", label: "RDX Base" },
          { value: "rdx-aspec", label: "RDX A-Spec" },
          { value: "rdx-pmc", label: "RDX PMC Edition" }
        ]
      },
      {
        value: "mdx",
        label: "MDX",
        variants: [
          { value: "mdx-base", label: "MDX Base" },
          { value: "mdx-aspec", label: "MDX A-Spec" },
          { value: "mdx-type-s", label: "MDX Type S" }
        ]
      }
    ]
  },
  {
    value: "alfa-romeo",
    label: "Alfa Romeo",
    models: [
      {
        value: "giulia",
        label: "Giulia",
        variants: [
          { value: "giulia-base", label: "Giulia Base" },
          { value: "giulia-ti", label: "Giulia Ti" },
          { value: "giulia-quadrifoglio", label: "Giulia Quadrifoglio" }
        ]
      },
      {
        value: "stelvio",
        label: "Stelvio",
        variants: [
          { value: "stelvio-base", label: "Stelvio Base" },
          { value: "stelvio-ti", label: "Stelvio Ti" },
          { value: "stelvio-quadrifoglio", label: "Stelvio Quadrifoglio" }
        ]
      },
      {
        value: "tonale",
        label: "Tonale",
        variants: [
          { value: "tonale-sprint", label: "Tonale Sprint" },
          { value: "tonale-ti", label: "Tonale Ti" },
          { value: "tonale-veloce", label: "Tonale Veloce" }
        ]
      }
    ]
  },
  {
    value: "aston-martin",
    label: "Aston Martin",
    models: [
      {
        value: "vantage",
        label: "Vantage",
        variants: [
          { value: "vantage-coupe", label: "Vantage Coupe" },
          { value: "vantage-roadster", label: "Vantage Roadster" }
        ]
      },
      {
        value: "db11",
        label: "DB11",
        variants: [
          { value: "db11-v8", label: "DB11 V8" },
          { value: "db11-amr", label: "DB11 AMR" }
        ]
      },
      {
        value: "dbs",
        label: "DBS",
        variants: [
          { value: "dbs-superleggera", label: "DBS Superleggera" },
          { value: "dbs-volante", label: "DBS Volante" }
        ]
      },
      {
        value: "dbx",
        label: "DBX",
        variants: [
          { value: "dbx-base", label: "DBX" },
          { value: "dbx707", label: "DBX707" }
        ]
      }
    ]
  },
  {
    value: "audi",
    label: "Audi",
    models: [
      {
        value: "a3",
        label: "A3",
        variants: [
          { value: "a3-premium", label: "A3 Premium" },
          { value: "a3-premium-plus", label: "A3 Premium Plus" },
          { value: "a3-prestige", label: "A3 Prestige" }
        ]
      },
      {
        value: "a4",
        label: "A4",
        variants: [
          { value: "a4-premium", label: "A4 Premium" },
          { value: "a4-premium-plus", label: "A4 Premium Plus" },
          { value: "a4-prestige", label: "A4 Prestige" }
        ]
      },
      {
        value: "a6",
        label: "A6",
        variants: [
          { value: "a6-premium", label: "A6 Premium" },
          { value: "a6-premium-plus", label: "A6 Premium Plus" },
          { value: "a6-prestige", label: "A6 Prestige" }
        ]
      },
      {
        value: "a8",
        label: "A8",
        variants: [
          { value: "a8-base", label: "A8" },
          { value: "a8l", label: "A8 L" }
        ]
      },
      {
        value: "q3",
        label: "Q3",
        variants: [
          { value: "q3-premium", label: "Q3 Premium" },
          { value: "q3-premium-plus", label: "Q3 Premium Plus" },
          { value: "q3-prestige", label: "Q3 Prestige" }
        ]
      },
      {
        value: "q5",
        label: "Q5",
        variants: [
          { value: "q5-premium", label: "Q5 Premium" },
          { value: "q5-premium-plus", label: "Q5 Premium Plus" },
          { value: "q5-prestige", label: "Q5 Prestige" }
        ]
      },
      {
        value: "q7",
        label: "Q7",
        variants: [
          { value: "q7-premium", label: "Q7 Premium" },
          { value: "q7-premium-plus", label: "Q7 Premium Plus" },
          { value: "q7-prestige", label: "Q7 Prestige" }
        ]
      },
      {
        value: "q8",
        label: "Q8",
        variants: [
          { value: "q8-premium-plus", label: "Q8 Premium Plus" },
          { value: "q8-prestige", label: "Q8 Prestige" }
        ]
      },
      {
        value: "e-tron",
        label: "e-tron",
        variants: [
          { value: "e-tron-premium-plus", label: "e-tron Premium Plus" },
          { value: "e-tron-prestige", label: "e-tron Prestige" },
          { value: "e-tron-sportback", label: "e-tron Sportback" }
        ]
      },
      {
        value: "rs3",
        label: "RS3",
        variants: [
          { value: "rs3-sedan", label: "RS3 Sedan" }
        ]
      },
      {
        value: "rs5",
        label: "RS5",
        variants: [
          { value: "rs5-coupe", label: "RS5 Coupe" },
          { value: "rs5-sportback", label: "RS5 Sportback" }
        ]
      },
      {
        value: "rs6",
        label: "RS6",
        variants: [
          { value: "rs6-avant", label: "RS6 Avant" }
        ]
      },
      {
        value: "rs7",
        label: "RS7",
        variants: [
          { value: "rs7-sportback", label: "RS7 Sportback" }
        ]
      },
      {
        value: "r8",
        label: "R8",
        variants: [
          { value: "r8-coupe", label: "R8 Coupe" },
          { value: "r8-spyder", label: "R8 Spyder" }
        ]
      }
    ]
  },
  {
    value: "bentley",
    label: "Bentley",
    models: [
      {
        value: "continental",
        label: "Continental",
        variants: [
          { value: "continental-gt", label: "Continental GT" },
          { value: "continental-gtc", label: "Continental GTC" },
          { value: "continental-gt-speed", label: "Continental GT Speed" }
        ]
      },
      {
        value: "flying-spur",
        label: "Flying Spur",
        variants: [
          { value: "flying-spur-v8", label: "Flying Spur V8" },
          { value: "flying-spur-w12", label: "Flying Spur W12" },
          { value: "flying-spur-speed", label: "Flying Spur Speed" }
        ]
      },
      {
        value: "bentayga",
        label: "Bentayga",
        variants: [
          { value: "bentayga-v8", label: "Bentayga V8" },
          { value: "bentayga-speed", label: "Bentayga Speed" },
          { value: "bentayga-hybrid", label: "Bentayga Hybrid" }
        ]
      }
    ]
  },
  {
    value: "bmw",
    label: "BMW",
    models: [
      {
        value: "2-series",
        label: "2 Series",
        variants: [
          { value: "230i", label: "230i" },
          { value: "m240i", label: "M240i" },
          { value: "m2", label: "M2" },
          { value: "m2-competition", label: "M2 Competition" }
        ]
      },
      {
        value: "3-series",
        label: "3 Series",
        variants: [
          { value: "330i", label: "330i" },
          { value: "330e", label: "330e" },
          { value: "m340i", label: "M340i" },
          { value: "m3", label: "M3" },
          { value: "m3-competition", label: "M3 Competition" }
        ]
      },
      {
        value: "4-series",
        label: "4 Series",
        variants: [
          { value: "430i", label: "430i" },
          { value: "440i", label: "440i" },
          { value: "m4", label: "M4" },
          { value: "m4-competition", label: "M4 Competition" }
        ]
      },
      {
        value: "5-series",
        label: "5 Series",
        variants: [
          { value: "530i", label: "530i" },
          { value: "530e", label: "530e" },
          { value: "540i", label: "540i" },
          { value: "m550i", label: "M550i" },
          { value: "m5", label: "M5" }
        ]
      },
      {
        value: "7-series",
        label: "7 Series",
        variants: [
          { value: "740i", label: "740i" },
          { value: "750i", label: "750i" },
          { value: "760i", label: "760i" }
        ]
      },
      {
        value: "8-series",
        label: "8 Series",
        variants: [
          { value: "840i", label: "840i" },
          { value: "m850i", label: "M850i" },
          { value: "m8", label: "M8" }
        ]
      },
      {
        value: "x1",
        label: "X1",
        variants: [
          { value: "x1-sdrive28i", label: "X1 sDrive28i" },
          { value: "x1-xdrive28i", label: "X1 xDrive28i" }
        ]
      },
      {
        value: "x3",
        label: "X3",
        variants: [
          { value: "x3-sdrive30i", label: "X3 sDrive30i" },
          { value: "x3-xdrive30i", label: "X3 xDrive30i" },
          { value: "x3-m40i", label: "X3 M40i" },
          { value: "x3-m", label: "X3 M" }
        ]
      },
      {
        value: "x5",
        label: "X5",
        variants: [
          { value: "x5-xdrive40i", label: "X5 xDrive40i" },
          { value: "x5-xdrive50i", label: "X5 xDrive50i" },
          { value: "x5-m50i", label: "X5 M50i" },
          { value: "x5-m", label: "X5 M" }
        ]
      },
      {
        value: "x7",
        label: "X7",
        variants: [
          { value: "x7-xdrive40i", label: "X7 xDrive40i" },
          { value: "x7-xdrive50i", label: "X7 xDrive50i" },
          { value: "x7-m60i", label: "X7 M60i" }
        ]
      },
      {
        value: "i3",
        label: "i3",
        variants: [
          { value: "i3-120ah", label: "i3 120Ah" },
          { value: "i3s", label: "i3s" }
        ]
      },
      {
        value: "i4",
        label: "i4",
        variants: [
          { value: "i4-edrive40", label: "i4 eDrive40" },
          { value: "i4-m50", label: "i4 M50" }
        ]
      },
      {
        value: "ix",
        label: "iX",
        variants: [
          { value: "ix-xdrive50", label: "iX xDrive50" },
          { value: "ix-m60", label: "iX M60" }
        ]
      }
    ]
  },
  {
    value: "bugatti",
    label: "Bugatti",
    models: [
      {
        value: "chiron",
        label: "Chiron",
        variants: [
          { value: "chiron-base", label: "Chiron" },
          { value: "chiron-sport", label: "Chiron Sport" },
          { value: "chiron-pur-sport", label: "Chiron Pur Sport" }
        ]
      },
      {
        value: "divo",
        label: "Divo",
        variants: [
          { value: "divo-base", label: "Divo" }
        ]
      }
    ]
  },
  {
    value: "buick",
    label: "Buick",
    models: [
      {
        value: "encore",
        label: "Encore",
        variants: [
          { value: "encore-preferred", label: "Encore Preferred" },
          { value: "encore-essence", label: "Encore Essence" },
          { value: "encore-gx", label: "Encore GX" }
        ]
      },
      {
        value: "envision",
        label: "Envision",
        variants: [
          { value: "envision-preferred", label: "Envision Preferred" },
          { value: "envision-essence", label: "Envision Essence" },
          { value: "envision-avenir", label: "Envision Avenir" }
        ]
      },
      {
        value: "enclave",
        label: "Enclave",
        variants: [
          { value: "enclave-essence", label: "Enclave Essence" },
          { value: "enclave-premium", label: "Enclave Premium" },
          { value: "enclave-avenir", label: "Enclave Avenir" }
        ]
      }
    ]
  },
  {
    value: "cadillac",
    label: "Cadillac",
    models: [
      {
        value: "ct4",
        label: "CT4",
        variants: [
          { value: "ct4-luxury", label: "CT4 Luxury" },
          { value: "ct4-premium-luxury", label: "CT4 Premium Luxury" },
          { value: "ct4-v", label: "CT4-V" },
          { value: "ct4-v-blackwing", label: "CT4-V Blackwing" }
        ]
      },
      {
        value: "ct5",
        label: "CT5",
        variants: [
          { value: "ct5-luxury", label: "CT5 Luxury" },
          { value: "ct5-premium-luxury", label: "CT5 Premium Luxury" },
          { value: "ct5-v", label: "CT5-V" },
          { value: "ct5-v-blackwing", label: "CT5-V Blackwing" }
        ]
      },
      {
        value: "xt4",
        label: "XT4",
        variants: [
          { value: "xt4-luxury", label: "XT4 Luxury" },
          { value: "xt4-premium-luxury", label: "XT4 Premium Luxury" },
          { value: "xt4-sport", label: "XT4 Sport" }
        ]
      },
      {
        value: "xt5",
        label: "XT5",
        variants: [
          { value: "xt5-luxury", label: "XT5 Luxury" },
          { value: "xt5-premium-luxury", label: "XT5 Premium Luxury" },
          { value: "xt5-sport", label: "XT5 Sport" }
        ]
      },
      {
        value: "xt6",
        label: "XT6",
        variants: [
          { value: "xt6-luxury", label: "XT6 Luxury" },
          { value: "xt6-premium-luxury", label: "XT6 Premium Luxury" },
          { value: "xt6-sport", label: "XT6 Sport" }
        ]
      },
      {
        value: "escalade",
        label: "Escalade",
        variants: [
          { value: "escalade-luxury", label: "Escalade Luxury" },
          { value: "escalade-premium-luxury", label: "Escalade Premium Luxury" },
          { value: "escalade-sport", label: "Escalade Sport" },
          { value: "escalade-v", label: "Escalade-V" }
        ]
      },
      {
        value: "lyriq",
        label: "LYRIQ",
        variants: [
          { value: "lyriq-luxury", label: "LYRIQ Luxury" },
          { value: "lyriq-sport", label: "LYRIQ Sport" }
        ]
      }
    ]
  },
  {
    value: "chevrolet",
    label: "Chevrolet",
    models: [
      {
        value: "spark",
        label: "Spark",
        variants: [
          { value: "spark-ls", label: "Spark LS" },
          { value: "spark-lt", label: "Spark LT" },
          { value: "spark-activ", label: "Spark Activ" }
        ]
      },
      {
        value: "sonic",
        label: "Sonic",
        variants: [
          { value: "sonic-ls", label: "Sonic LS" },
          { value: "sonic-lt", label: "Sonic LT" },
          { value: "sonic-premier", label: "Sonic Premier" }
        ]
      },
      {
        value: "cruze",
        label: "Cruze",
        variants: [
          { value: "cruze-l", label: "Cruze L" },
          { value: "cruze-ls", label: "Cruze LS" },
          { value: "cruze-lt", label: "Cruze LT" },
          { value: "cruze-premier", label: "Cruze Premier" }
        ]
      },
      {
        value: "malibu",
        label: "Malibu",
        variants: [
          { value: "malibu-l", label: "Malibu L" },
          { value: "malibu-ls", label: "Malibu LS" },
          { value: "malibu-lt", label: "Malibu LT" },
          { value: "malibu-premier", label: "Malibu Premier" }
        ]
      },
      {
        value: "impala",
        label: "Impala",
        variants: [
          { value: "impala-ls", label: "Impala LS" },
          { value: "impala-lt", label: "Impala LT" },
          { value: "impala-premier", label: "Impala Premier" }
        ]
      },
      {
        value: "camaro",
        label: "Camaro",
        variants: [
          { value: "camaro-1ls", label: "Camaro 1LS" },
          { value: "camaro-1lt", label: "Camaro 1LT" },
          { value: "camaro-2lt", label: "Camaro 2LT" },
          { value: "camaro-1ss", label: "Camaro 1SS" },
          { value: "camaro-2ss", label: "Camaro 2SS" },
          { value: "camaro-zl1", label: "Camaro ZL1" },
          { value: "camaro-z28", label: "Camaro Z/28" }
        ]
      },
      {
        value: "corvette",
        label: "Corvette",
        variants: [
          { value: "corvette-1lt", label: "Corvette 1LT" },
          { value: "corvette-2lt", label: "Corvette 2LT" },
          { value: "corvette-3lt", label: "Corvette 3LT" },
          { value: "corvette-z06", label: "Corvette Z06" },
          { value: "corvette-zr1", label: "Corvette ZR1" }
        ]
      },
      {
        value: "trax",
        label: "Trax",
        variants: [
          { value: "trax-ls", label: "Trax LS" },
          { value: "trax-lt", label: "Trax LT" },
          { value: "trax-premier", label: "Trax Premier" }
        ]
      },
      {
        value: "equinox",
        label: "Equinox",
        variants: [
          { value: "equinox-l", label: "Equinox L" },
          { value: "equinox-ls", label: "Equinox LS" },
          { value: "equinox-lt", label: "Equinox LT" },
          { value: "equinox-premier", label: "Equinox Premier" }
        ]
      },
      {
        value: "blazer",
        label: "Blazer",
        variants: [
          { value: "blazer-l", label: "Blazer L" },
          { value: "blazer-lt", label: "Blazer LT" },
          { value: "blazer-rs", label: "Blazer RS" },
          { value: "blazer-premier", label: "Blazer Premier" }
        ]
      },
      {
        value: "traverse",
        label: "Traverse",
        variants: [
          { value: "traverse-l", label: "Traverse L" },
          { value: "traverse-ls", label: "Traverse LS" },
          { value: "traverse-lt", label: "Traverse LT" },
          { value: "traverse-premier", label: "Traverse Premier" }
        ]
      },
      {
        value: "tahoe",
        label: "Tahoe",
        variants: [
          { value: "tahoe-ls", label: "Tahoe LS" },
          { value: "tahoe-lt", label: "Tahoe LT" },
          { value: "tahoe-rst", label: "Tahoe RST" },
          { value: "tahoe-premier", label: "Tahoe Premier" }
        ]
      },
      {
        value: "suburban",
        label: "Suburban",
        variants: [
          { value: "suburban-ls", label: "Suburban LS" },
          { value: "suburban-lt", label: "Suburban LT" },
          { value: "suburban-rst", label: "Suburban RST" },
          { value: "suburban-premier", label: "Suburban Premier" }
        ]
      },
      {
        value: "colorado",
        label: "Colorado",
        variants: [
          { value: "colorado-work-truck", label: "Colorado Work Truck" },
          { value: "colorado-lt", label: "Colorado LT" },
          { value: "colorado-z71", label: "Colorado Z71" },
          { value: "colorado-zr2", label: "Colorado ZR2" }
        ]
      },
      {
        value: "silverado-1500",
        label: "Silverado 1500",
        variants: [
          { value: "silverado-work-truck", label: "Silverado Work Truck" },
          { value: "silverado-custom", label: "Silverado Custom" },
          { value: "silverado-lt", label: "Silverado LT" },
          { value: "silverado-rst", label: "Silverado RST" },
          { value: "silverado-ltz", label: "Silverado LTZ" },
          { value: "silverado-high-country", label: "Silverado High Country" }
        ]
      },
      {
        value: "bolt-ev",
        label: "Bolt EV",
        variants: [
          { value: "bolt-ev-lt", label: "Bolt EV LT" },
          { value: "bolt-ev-premier", label: "Bolt EV Premier" }
        ]
      },
      {
        value: "bolt-euv",
        label: "Bolt EUV",
        variants: [
          { value: "bolt-euv-lt", label: "Bolt EUV LT" },
          { value: "bolt-euv-premier", label: "Bolt EUV Premier" }
        ]
      }
    ]
  },
  {
    value: "chrysler",
    label: "Chrysler",
    models: [
      {
        value: "300",
        label: "300",
        variants: [
          { value: "300-touring", label: "300 Touring" },
          { value: "300-limited", label: "300 Limited" },
          { value: "300s", label: "300S" },
          { value: "300c", label: "300C" }
        ]
      },
      {
        value: "pacifica",
        label: "Pacifica",
        variants: [
          { value: "pacifica-l", label: "Pacifica L" },
          { value: "pacifica-lx", label: "Pacifica LX" },
          { value: "pacifica-touring", label: "Pacifica Touring" },
          { value: "pacifica-touring-l", label: "Pacifica Touring L" },
          { value: "pacifica-limited", label: "Pacifica Limited" }
        ]
      },
      {
        value: "pacifica-hybrid",
        label: "Pacifica Hybrid",
        variants: [
          { value: "pacifica-hybrid-touring", label: "Pacifica Hybrid Touring" },
          { value: "pacifica-hybrid-touring-l", label: "Pacifica Hybrid Touring L" },
          { value: "pacifica-hybrid-limited", label: "Pacifica Hybrid Limited" }
        ]
      }
    ]
  },
  {
    value: "dodge",
    label: "Dodge",
    models: [
      {
        value: "challenger",
        label: "Challenger",
        variants: [
          { value: "challenger-sxt", label: "Challenger SXT" },
          { value: "challenger-gt", label: "Challenger GT" },
          { value: "challenger-rt", label: "Challenger R/T" },
          { value: "challenger-scat-pack", label: "Challenger Scat Pack" },
          { value: "challenger-hellcat", label: "Challenger Hellcat" },
          { value: "challenger-demon", label: "Challenger Demon" }
        ]
      },
      {
        value: "charger",
        label: "Charger",
        variants: [
          { value: "charger-sxt", label: "Charger SXT" },
          { value: "charger-gt", label: "Charger GT" },
          { value: "charger-rt", label: "Charger R/T" },
          { value: "charger-scat-pack", label: "Charger Scat Pack" },
          { value: "charger-hellcat", label: "Charger Hellcat" }
        ]
      },
      {
        value: "durango",
        label: "Durango",
        variants: [
          { value: "durango-sxt", label: "Durango SXT" },
          { value: "durango-gt", label: "Durango GT" },
          { value: "durango-rt", label: "Durango R/T" },
          { value: "durango-srt", label: "Durango SRT" }
        ]
      },
      {
        value: "journey",
        label: "Journey",
        variants: [
          { value: "journey-se", label: "Journey SE" },
          { value: "journey-sxt", label: "Journey SXT" },
          { value: "journey-crossroad", label: "Journey Crossroad" },
          { value: "journey-gt", label: "Journey GT" }
        ]
      }
    ]
  },
  {
    value: "ferrari",
    label: "Ferrari",
    models: [
      {
        value: "roma",
        label: "Roma",
        variants: [
          { value: "roma-base", label: "Roma" }
        ]
      },
      {
        value: "portofino",
        label: "Portofino",
        variants: [
          { value: "portofino-base", label: "Portofino" },
          { value: "portofino-m", label: "Portofino M" }
        ]
      },
      {
        value: "f8",
        label: "F8",
        variants: [
          { value: "f8-tributo", label: "F8 Tributo" },
          { value: "f8-spider", label: "F8 Spider" }
        ]
      },
      {
        value: "sf90",
        label: "SF90",
        variants: [
          { value: "sf90-stradale", label: "SF90 Stradale" },
          { value: "sf90-spider", label: "SF90 Spider" }
        ]
      },
      {
        value: "812",
        label: "812",
        variants: [
          { value: "812-superfast", label: "812 Superfast" },
          { value: "812-gts", label: "812 GTS" }
        ]
      },
      {
        value: "purosangue",
        label: "Purosangue",
        variants: [
          { value: "purosangue-base", label: "Purosangue" }
        ]
      }
    ]
  },
  {
    value: "ford",
    label: "Ford",
    models: [
      {
        value: "fiesta",
        label: "Fiesta",
        variants: [
          { value: "fiesta-s", label: "Fiesta S" },
          { value: "fiesta-se", label: "Fiesta SE" },
          { value: "fiesta-titanium", label: "Fiesta Titanium" },
          { value: "fiesta-st", label: "Fiesta ST" }
        ]
      },
      {
        value: "focus",
        label: "Focus",
        variants: [
          { value: "focus-s", label: "Focus S" },
          { value: "focus-se", label: "Focus SE" },
          { value: "focus-titanium", label: "Focus Titanium" },
          { value: "focus-st", label: "Focus ST" },
          { value: "focus-rs", label: "Focus RS" }
        ]
      },
      {
        value: "fusion",
        label: "Fusion",
        variants: [
          { value: "fusion-s", label: "Fusion S" },
          { value: "fusion-se", label: "Fusion SE" },
          { value: "fusion-titanium", label: "Fusion Titanium" },
          { value: "fusion-sport", label: "Fusion Sport" }
        ]
      },
      {
        value: "mustang",
        label: "Mustang",
        variants: [
          { value: "mustang-ecoboost", label: "Mustang EcoBoost" },
          { value: "mustang-gt", label: "Mustang GT" },
          { value: "mustang-mach-1", label: "Mustang Mach 1" },
          { value: "mustang-shelby-gt350", label: "Mustang Shelby GT350" },
          { value: "mustang-shelby-gt500", label: "Mustang Shelby GT500" }
        ]
      },
      {
        value: "ecosport",
        label: "EcoSport",
        variants: [
          { value: "ecosport-s", label: "EcoSport S" },
          { value: "ecosport-se", label: "EcoSport SE" },
          { value: "ecosport-titanium", label: "EcoSport Titanium" }
        ]
      },
      {
        value: "escape",
        label: "Escape",
        variants: [
          { value: "escape-s", label: "Escape S" },
          { value: "escape-se", label: "Escape SE" },
          { value: "escape-sel", label: "Escape SEL" },
          { value: "escape-titanium", label: "Escape Titanium" }
        ]
      },
      {
        value: "edge",
        label: "Edge",
        variants: [
          { value: "edge-se", label: "Edge SE" },
          { value: "edge-sel", label: "Edge SEL" },
          { value: "edge-titanium", label: "Edge Titanium" },
          { value: "edge-st", label: "Edge ST" }
        ]
      },
      {
        value: "explorer",
        label: "Explorer",
        variants: [
          { value: "explorer-base", label: "Explorer Base" },
          { value: "explorer-xlt", label: "Explorer XLT" },
          { value: "explorer-limited", label: "Explorer Limited" },
          { value: "explorer-platinum", label: "Explorer Platinum" },
          { value: "explorer-st", label: "Explorer ST" }
        ]
      },
      {
        value: "expedition",
        label: "Expedition",
        variants: [
          { value: "expedition-xlt", label: "Expedition XLT" },
          { value: "expedition-limited", label: "Expedition Limited" },
          { value: "expedition-king-ranch", label: "Expedition King Ranch" },
          { value: "expedition-platinum", label: "Expedition Platinum" }
        ]
      },
      {
        value: "ranger",
        label: "Ranger",
        variants: [
          { value: "ranger-regular-cab", label: "Ranger Regular Cab" },
          { value: "ranger-supercab", label: "Ranger SuperCab" },
          { value: "ranger-supercrew", label: "Ranger SuperCrew" }
        ]
      },
      {
        value: "f-150",
        label: "F-150",
        variants: [
          { value: "f-150-regular-cab", label: "F-150 Regular Cab" },
          { value: "f-150-supercab", label: "F-150 SuperCab" },
          { value: "f-150-supercrew", label: "F-150 SuperCrew" },
          { value: "f-150-raptor", label: "F-150 Raptor" },
          { value: "f-150-lightning", label: "F-150 Lightning" }
        ]
      },
      {
        value: "f-250",
        label: "F-250",
        variants: [
          { value: "f-250-regular-cab", label: "F-250 Regular Cab" },
          { value: "f-250-supercab", label: "F-250 SuperCab" },
          { value: "f-250-crew-cab", label: "F-250 Crew Cab" }
        ]
      },
      {
        value: "f-350",
        label: "F-350",
        variants: [
          { value: "f-350-regular-cab", label: "F-350 Regular Cab" },
          { value: "f-350-supercab", label: "F-350 SuperCab" },
          { value: "f-350-crew-cab", label: "F-350 Crew Cab" }
        ]
      },
      {
        value: "mustang-mach-e",
        label: "Mustang Mach-E",
        variants: [
          { value: "mach-e-select", label: "Mach-E Select" },
          { value: "mach-e-premium", label: "Mach-E Premium" },
          { value: "mach-e-california-route-1", label: "Mach-E California Route 1" },
          { value: "mach-e-gt", label: "Mach-E GT" }
        ]
      }
    ]
  },
  {
    value: "genesis",
    label: "Genesis",
    models: [
      {
        value: "g70",
        label: "G70",
        variants: [
          { value: "g70-20t", label: "G70 2.0T" },
          { value: "g70-33t", label: "G70 3.3T" }
        ]
      },
      {
        value: "g80",
        label: "G80",
        variants: [
          { value: "g80-25t", label: "G80 2.5T" },
          { value: "g80-33t", label: "G80 3.3T" },
          { value: "g80-electrified", label: "G80 Electrified" }
        ]
      },
      {
        value: "g90",
        label: "G90",
        variants: [
          { value: "g90-33t", label: "G90 3.3T" },
          { value: "g90-50", label: "G90 5.0" }
        ]
      },
      {
        value: "gv60",
        label: "GV60",
        variants: [
          { value: "gv60-advanced", label: "GV60 Advanced" },
          { value: "gv60-performance", label: "GV60 Performance" }
        ]
      },
      {
        value: "gv70",
        label: "GV70",
        variants: [
          { value: "gv70-25t", label: "GV70 2.5T" },
          { value: "gv70-36t", label: "GV70 3.5T" },
          { value: "gv70-electrified", label: "GV70 Electrified" }
        ]
      },
      {
        value: "gv80",
        label: "GV80",
        variants: [
          { value: "gv80-25t", label: "GV80 2.5T" },
          { value: "gv80-36t", label: "GV80 3.5T" }
        ]
      }
    ]
  },
  {
    value: "gmc",
    label: "GMC",
    models: [
      {
        value: "terrain",
        label: "Terrain",
        variants: [
          { value: "terrain-sle", label: "Terrain SLE" },
          { value: "terrain-slt", label: "Terrain SLT" },
          { value: "terrain-at4", label: "Terrain AT4" },
          { value: "terrain-denali", label: "Terrain Denali" }
        ]
      },
      {
        value: "acadia",
        label: "Acadia",
        variants: [
          { value: "acadia-sle", label: "Acadia SLE" },
          { value: "acadia-slt", label: "Acadia SLT" },
          { value: "acadia-at4", label: "Acadia AT4" },
          { value: "acadia-denali", label: "Acadia Denali" }
        ]
      },
      {
        value: "yukon",
        label: "Yukon",
        variants: [
          { value: "yukon-sle", label: "Yukon SLE" },
          { value: "yukon-slt", label: "Yukon SLT" },
          { value: "yukon-at4", label: "Yukon AT4" },
          { value: "yukon-denali", label: "Yukon Denali" }
        ]
      },
      {
        value: "canyon",
        label: "Canyon",
        variants: [
          { value: "canyon-base", label: "Canyon Base" },
          { value: "canyon-sle", label: "Canyon SLE" },
          { value: "canyon-slt", label: "Canyon SLT" },
          { value: "canyon-at4", label: "Canyon AT4" },
          { value: "canyon-denali", label: "Canyon Denali" }
        ]
      },
      {
        value: "sierra-1500",
        label: "Sierra 1500",
        variants: [
          { value: "sierra-pro", label: "Sierra Pro" },
          { value: "sierra-sle", label: "Sierra SLE" },
          { value: "sierra-elevation", label: "Sierra Elevation" },
          { value: "sierra-slt", label: "Sierra SLT" },
          { value: "sierra-at4", label: "Sierra AT4" },
          { value: "sierra-denali", label: "Sierra Denali" }
        ]
      }
    ]
  },
  {
    value: "honda",
    label: "Honda",
    models: [
      {
        value: "fit",
        label: "Fit",
        variants: [
          { value: "fit-lx", label: "Fit LX" },
          { value: "fit-sport", label: "Fit Sport" },
          { value: "fit-ex", label: "Fit EX" },
          { value: "fit-ex-l", label: "Fit EX-L" }
        ]
      },
      {
        value: "civic",
        label: "Civic",
        variants: [
          { value: "civic-lx", label: "Civic LX" },
          { value: "civic-sport", label: "Civic Sport" },
          { value: "civic-ex", label: "Civic EX" },
          { value: "civic-touring", label: "Civic Touring" },
          { value: "civic-si", label: "Civic Si" },
          { value: "civic-type-r", label: "Civic Type R" }
        ]
      },
      {
        value: "insight",
        label: "Insight",
        variants: [
          { value: "insight-lx", label: "Insight LX" },
          { value: "insight-ex", label: "Insight EX" },
          { value: "insight-touring", label: "Insight Touring" }
        ]
      },
      {
        value: "accord",
        label: "Accord",
        variants: [
          { value: "accord-lx", label: "Accord LX" },
          { value: "accord-sport", label: "Accord Sport" },
          { value: "accord-ex", label: "Accord EX" },
          { value: "accord-ex-l", label: "Accord EX-L" },
          { value: "accord-touring", label: "Accord Touring" }
        ]
      },
      {
        value: "hr-v",
        label: "HR-V",
        variants: [
          { value: "hr-v-lx", label: "HR-V LX" },
          { value: "hr-v-sport", label: "HR-V Sport" },
          { value: "hr-v-ex", label: "HR-V EX" },
          { value: "hr-v-ex-l", label: "HR-V EX-L" }
        ]
      },
      {
        value: "cr-v",
        label: "CR-V",
        variants: [
          { value: "cr-v-lx", label: "CR-V LX" },
          { value: "cr-v-special-edition", label: "CR-V Special Edition" },
          { value: "cr-v-ex", label: "CR-V EX" },
          { value: "cr-v-ex-l", label: "CR-V EX-L" },
          { value: "cr-v-touring", label: "CR-V Touring" }
        ]
      },
      {
        value: "passport",
        label: "Passport",
        variants: [
          { value: "passport-sport", label: "Passport Sport" },
          { value: "passport-ex-l", label: "Passport EX-L" },
          { value: "passport-touring", label: "Passport Touring" },
          { value: "passport-elite", label: "Passport Elite" }
        ]
      },
      {
        value: "pilot",
        label: "Pilot",
        variants: [
          { value: "pilot-lx", label: "Pilot LX" },
          { value: "pilot-special-edition", label: "Pilot Special Edition" },
          { value: "pilot-ex", label: "Pilot EX" },
          { value: "pilot-ex-l", label: "Pilot EX-L" },
          { value: "pilot-touring", label: "Pilot Touring" },
          { value: "pilot-elite", label: "Pilot Elite" }
        ]
      },
      {
        value: "ridgeline",
        label: "Ridgeline",
        variants: [
          { value: "ridgeline-sport", label: "Ridgeline Sport" },
          { value: "ridgeline-rtl", label: "Ridgeline RTL" },
          { value: "ridgeline-rtl-e", label: "Ridgeline RTL-E" },
          { value: "ridgeline-black-edition", label: "Ridgeline Black Edition" }
        ]
      }
    ]
  },
  {
    value: "hyundai",
    label: "Hyundai",
    models: [
      {
        value: "accent",
        label: "Accent",
        variants: [
          { value: "accent-se", label: "Accent SE" },
          { value: "accent-sel", label: "Accent SEL" },
          { value: "accent-limited", label: "Accent Limited" }
        ]
      },
      {
        value: "elantra",
        label: "Elantra",
        variants: [
          { value: "elantra-se", label: "Elantra SE" },
          { value: "elantra-sel", label: "Elantra SEL" },
          { value: "elantra-n-line", label: "Elantra N Line" },
          { value: "elantra-limited", label: "Elantra Limited" },
          { value: "elantra-n", label: "Elantra N" }
        ]
      },
      {
        value: "sonata",
        label: "Sonata",
        variants: [
          { value: "sonata-se", label: "Sonata SE" },
          { value: "sonata-sel", label: "Sonata SEL" },
          { value: "sonata-n-line", label: "Sonata N Line" },
          { value: "sonata-limited", label: "Sonata Limited" }
        ]
      },
      {
        value: "azera",
        label: "Azera",
        variants: [
          { value: "azera-limited", label: "Azera Limited" }
        ]
      },
      {
        value: "venue",
        label: "Venue",
        variants: [
          { value: "venue-se", label: "Venue SE" },
          { value: "venue-sel", label: "Venue SEL" },
          { value: "venue-denim", label: "Venue Denim" }
        ]
      },
      {
        value: "kona",
        label: "Kona",
        variants: [
          { value: "kona-se", label: "Kona SE" },
          { value: "kona-sel", label: "Kona SEL" },
          { value: "kona-n-line", label: "Kona N Line" },
          { value: "kona-limited", label: "Kona Limited" },
          { value: "kona-ultimate", label: "Kona Ultimate" }
        ]
      },
      {
        value: "tucson",
        label: "Tucson",
        variants: [
          { value: "tucson-se", label: "Tucson SE" },
          { value: "tucson-sel", label: "Tucson SEL" },
          { value: "tucson-n-line", label: "Tucson N Line" },
          { value: "tucson-limited", label: "Tucson Limited" }
        ]
      },
      {
        value: "santa-fe",
        label: "Santa Fe",
        variants: [
          { value: "santa-fe-se", label: "Santa Fe SE" },
          { value: "santa-fe-sel", label: "Santa Fe SEL" },
          { value: "santa-fe-limited", label: "Santa Fe Limited" },
          { value: "santa-fe-calligraphy", label: "Santa Fe Calligraphy" }
        ]
      },
      {
        value: "palisade",
        label: "Palisade",
        variants: [
          { value: "palisade-se", label: "Palisade SE" },
          { value: "palisade-sel", label: "Palisade SEL" },
          { value: "palisade-limited", label: "Palisade Limited" },
          { value: "palisade-calligraphy", label: "Palisade Calligraphy" }
        ]
      },
      {
        value: "ioniq",
        label: "IONIQ",
        variants: [
          { value: "ioniq-blue", label: "IONIQ Blue" },
          { value: "ioniq-sel", label: "IONIQ SEL" },
          { value: "ioniq-limited", label: "IONIQ Limited" }
        ]
      },
      {
        value: "ioniq-5",
        label: "IONIQ 5",
        variants: [
          { value: "ioniq-5-se", label: "IONIQ 5 SE" },
          { value: "ioniq-5-sel", label: "IONIQ 5 SEL" },
          { value: "ioniq-5-limited", label: "IONIQ 5 Limited" }
        ]
      },
      {
        value: "ioniq-6",
        label: "IONIQ 6",
        variants: [
          { value: "ioniq-6-se", label: "IONIQ 6 SE" },
          { value: "ioniq-6-sel", label: "IONIQ 6 SEL" },
          { value: "ioniq-6-limited", label: "IONIQ 6 Limited" }
        ]
      },
      {
        value: "veloster",
        label: "Veloster",
        variants: [
          { value: "veloster-base", label: "Veloster" },
          { value: "veloster-turbo", label: "Veloster Turbo" },
          { value: "veloster-n", label: "Veloster N" }
        ]
      }
    ]
  },
  {
    value: "infiniti",
    label: "Infiniti",
    models: [
      {
        value: "q50",
        label: "Q50",
        variants: [
          { value: "q50-pure", label: "Q50 Pure" },
          { value: "q50-luxe", label: "Q50 Luxe" },
          { value: "q50-sensory", label: "Q50 Sensory" },
          { value: "q50-red-sport-400", label: "Q50 Red Sport 400" }
        ]
      },
      {
        value: "q60",
        label: "Q60",
        variants: [
          { value: "q60-pure", label: "Q60 Pure" },
          { value: "q60-luxe", label: "Q60 Luxe" },
          { value: "q60-sensory", label: "Q60 Sensory" },
          { value: "q60-red-sport-400", label: "Q60 Red Sport 400" }
        ]
      },
      {
        value: "qx50",
        label: "QX50",
        variants: [
          { value: "qx50-pure", label: "QX50 Pure" },
          { value: "qx50-luxe", label: "QX50 Luxe" },
          { value: "qx50-sensory", label: "QX50 Sensory" },
          { value: "qx50-autograph", label: "QX50 Autograph" }
        ]
      },
      {
        value: "qx55",
        label: "QX55",
        variants: [
          { value: "qx55-luxe", label: "QX55 Luxe" },
          { value: "qx55-sensory", label: "QX55 Sensory" },
          { value: "qx55-autograph", label: "QX55 Autograph" }
        ]
      },
      {
        value: "qx60",
        label: "QX60",
        variants: [
          { value: "qx60-pure", label: "QX60 Pure" },
          { value: "qx60-luxe", label: "QX60 Luxe" },
          { value: "qx60-sensory", label: "QX60 Sensory" },
          { value: "qx60-autograph", label: "QX60 Autograph" }
        ]
      },
      {
        value: "qx80",
        label: "QX80",
        variants: [
          { value: "qx80-luxe", label: "QX80 Luxe" },
          { value: "qx80-sensory", label: "QX80 Sensory" },
          { value: "qx80-autograph", label: "QX80 Autograph" }
        ]
      }
    ]
  },
  {
    value: "jaguar",
    label: "Jaguar",
    models: [
      {
        value: "xe",
        label: "XE",
        variants: [
          { value: "xe-base", label: "XE" },
          { value: "xe-s", label: "XE S" },
          { value: "xe-r-dynamic", label: "XE R-Dynamic" }
        ]
      },
      {
        value: "xf",
        label: "XF",
        variants: [
          { value: "xf-base", label: "XF" },
          { value: "xf-s", label: "XF S" },
          { value: "xf-r-dynamic", label: "XF R-Dynamic" }
        ]
      },
      {
        value: "xj",
        label: "XJ",
        variants: [
          { value: "xj-base", label: "XJ" },
          { value: "xjl", label: "XJL" }
        ]
      },
      {
        value: "e-pace",
        label: "E-PACE",
        variants: [
          { value: "e-pace-base", label: "E-PACE" },
          { value: "e-pace-s", label: "E-PACE S" },
          { value: "e-pace-r-dynamic", label: "E-PACE R-Dynamic" }
        ]
      },
      {
        value: "f-pace",
        label: "F-PACE",
        variants: [
          { value: "f-pace-base", label: "F-PACE" },
          { value: "f-pace-s", label: "F-PACE S" },
          { value: "f-pace-r-dynamic", label: "F-PACE R-Dynamic" },
          { value: "f-pace-svr", label: "F-PACE SVR" }
        ]
      },
      {
        value: "i-pace",
        label: "I-PACE",
        variants: [
          { value: "i-pace-base", label: "I-PACE" },
          { value: "i-pace-s", label: "I-PACE S" },
          { value: "i-pace-hse", label: "I-PACE HSE" }
        ]
      },
      {
        value: "f-type",
        label: "F-TYPE",
        variants: [
          { value: "f-type-base", label: "F-TYPE" },
          { value: "f-type-s", label: "F-TYPE S" },
          { value: "f-type-r", label: "F-TYPE R" },
          { value: "f-type-svr", label: "F-TYPE SVR" }
        ]
      }
    ]
  },
  {
    value: "jeep",
    label: "Jeep",
    models: [
      {
        value: "compass",
        label: "Compass",
        variants: [
          { value: "compass-sport", label: "Compass Sport" },
          { value: "compass-latitude", label: "Compass Latitude" },
          { value: "compass-limited", label: "Compass Limited" },
          { value: "compass-trailhawk", label: "Compass Trailhawk" }
        ]
      },
      {
        value: "renegade",
        label: "Renegade",
        variants: [
          { value: "renegade-sport", label: "Renegade Sport" },
          { value: "renegade-latitude", label: "Renegade Latitude" },
          { value: "renegade-limited", label: "Renegade Limited" },
          { value: "renegade-trailhawk", label: "Renegade Trailhawk" }
        ]
      },
      {
        value: "cherokee",
        label: "Cherokee",
        variants: [
          { value: "cherokee-latitude", label: "Cherokee Latitude" },
          { value: "cherokee-latitude-plus", label: "Cherokee Latitude Plus" },
          { value: "cherokee-limited", label: "Cherokee Limited" },
          { value: "cherokee-trailhawk", label: "Cherokee Trailhawk" }
        ]
      },
      {
        value: "grand-cherokee",
        label: "Grand Cherokee",
        variants: [
          { value: "grand-cherokee-laredo", label: "Grand Cherokee Laredo" },
          { value: "grand-cherokee-limited", label: "Grand Cherokee Limited" },
          { value: "grand-cherokee-overland", label: "Grand Cherokee Overland" },
          { value: "grand-cherokee-summit", label: "Grand Cherokee Summit" },
          { value: "grand-cherokee-srt", label: "Grand Cherokee SRT" },
          { value: "grand-cherokee-trackhawk", label: "Grand Cherokee Trackhawk" }
        ]
      },
      {
        value: "wrangler",
        label: "Wrangler",
        variants: [
          { value: "wrangler-sport", label: "Wrangler Sport" },
          { value: "wrangler-sport-s", label: "Wrangler Sport S" },
          { value: "wrangler-sahara", label: "Wrangler Sahara" },
          { value: "wrangler-rubicon", label: "Wrangler Rubicon" },
          { value: "wrangler-4xe", label: "Wrangler 4xe" }
        ]
      },
      {
        value: "gladiator",
        label: "Gladiator",
        variants: [
          { value: "gladiator-sport", label: "Gladiator Sport" },
          { value: "gladiator-sport-s", label: "Gladiator Sport S" },
          { value: "gladiator-overland", label: "Gladiator Overland" },
          { value: "gladiator-rubicon", label: "Gladiator Rubicon" }
        ]
      }
    ]
  },
  {
    value: "kia",
    label: "Kia",
    models: [
      {
        value: "rio",
        label: "Rio",
        variants: [
          { value: "rio-lx", label: "Rio LX" },
          { value: "rio-s", label: "Rio S" }
        ]
      },
      {
        value: "forte",
        label: "Forte",
        variants: [
          { value: "forte-fe", label: "Forte FE" },
          { value: "forte-lxs", label: "Forte LXS" },
          { value: "forte-ex", label: "Forte EX" },
          { value: "forte-gt", label: "Forte GT" }
        ]
      },
      {
        value: "k5",
        label: "K5",
        variants: [
          { value: "k5-lx", label: "K5 LX" },
          { value: "k5-s", label: "K5 S" },
          { value: "k5-ex", label: "K5 EX" },
          { value: "k5-gt-line", label: "K5 GT-Line" },
          { value: "k5-gt", label: "K5 GT" }
        ]
      },
      {
        value: "stinger",
        label: "Stinger",
        variants: [
          { value: "stinger-gt", label: "Stinger GT" },
          { value: "stinger-gt1", label: "Stinger GT1" },
          { value: "stinger-gt2", label: "Stinger GT2" }
        ]
      },
      {
        value: "soul",
        label: "Soul",
        variants: [
          { value: "soul-lx", label: "Soul LX" },
          { value: "soul-s", label: "Soul S" },
          { value: "soul-ex", label: "Soul EX" },
          { value: "soul-turbo", label: "Soul Turbo" }
        ]
      },
      {
        value: "seltos",
        label: "Seltos",
        variants: [
          { value: "seltos-lx", label: "Seltos LX" },
          { value: "seltos-s", label: "Seltos S" },
          { value: "seltos-ex", label: "Seltos EX" },
          { value: "seltos-turbo", label: "Seltos Turbo" }
        ]
      },
      {
        value: "sportage",
        label: "Sportage",
        variants: [
          { value: "sportage-lx", label: "Sportage LX" },
          { value: "sportage-s", label: "Sportage S" },
          { value: "sportage-ex", label: "Sportage EX" },
          { value: "sportage-turbo", label: "Sportage Turbo" }
        ]
      },
      {
        value: "sorento",
        label: "Sorento",
        variants: [
          { value: "sorento-lx", label: "Sorento LX" },
          { value: "sorento-s", label: "Sorento S" },
          { value: "sorento-ex", label: "Sorento EX" },
          { value: "sorento-turbo", label: "Sorento Turbo" }
        ]
      },
      {
        value: "telluride",
        label: "Telluride",
        variants: [
          { value: "telluride-lx", label: "Telluride LX" },
          { value: "telluride-s", label: "Telluride S" },
          { value: "telluride-ex", label: "Telluride EX" },
          { value: "telluride-sx", label: "Telluride SX" }
        ]
      },
      {
        value: "niro",
        label: "Niro",
        variants: [
          { value: "niro-lx", label: "Niro LX" },
          { value: "niro-s", label: "Niro S" },
          { value: "niro-ex", label: "Niro EX" },
          { value: "niro-touring", label: "Niro Touring" }
        ]
      },
      {
        value: "ev6",
        label: "EV6",
        variants: [
          { value: "ev6-light", label: "EV6 Light" },
          { value: "ev6-wind", label: "EV6 Wind" },
          { value: "ev6-gt-line", label: "EV6 GT-Line" },
          { value: "ev6-gt", label: "EV6 GT" }
        ]
      }
    ]
  },
  {
    value: "lamborghini",
    label: "Lamborghini",
    models: [
      {
        value: "huracan",
        label: "Huracán",
        variants: [
          { value: "huracan-evo", label: "Huracán EVO" },
          { value: "huracan-evo-spyder", label: "Huracán EVO Spyder" },
          { value: "huracan-sto", label: "Huracán STO" }
        ]
      },
      {
        value: "aventador",
        label: "Aventador",
        variants: [
          { value: "aventador-lp-740-4-s", label: "Aventador LP 740-4 S" },
          { value: "aventador-lp-740-4-s-roadster", label: "Aventador LP 740-4 S Roadster" },
          { value: "aventador-svj", label: "Aventador SVJ" }
        ]
      },
      {
        value: "urus",
        label: "Urus",
        variants: [
          { value: "urus-base", label: "Urus" },
          { value: "urus-performante", label: "Urus Performante" }
        ]
      },
      {
        value: "revuelto",
        label: "Revuelto",
        variants: [
          { value: "revuelto-base", label: "Revuelto" }
        ]
      }
    ]
  },
  {
    value: "land-rover",
    label: "Land Rover",
    models: [
      {
        value: "discovery-sport",
        label: "Discovery Sport",
        variants: [
          { value: "discovery-sport-base", label: "Discovery Sport" },
          { value: "discovery-sport-s", label: "Discovery Sport S" },
          { value: "discovery-sport-se", label: "Discovery Sport SE" },
          { value: "discovery-sport-hse", label: "Discovery Sport HSE" }
        ]
      },
      {
        value: "discovery",
        label: "Discovery",
        variants: [
          { value: "discovery-base", label: "Discovery" },
          { value: "discovery-s", label: "Discovery S" },
          { value: "discovery-se", label: "Discovery SE" },
          { value: "discovery-hse", label: "Discovery HSE" }
        ]
      },
      {
        value: "range-rover-evoque",
        label: "Range Rover Evoque",
        variants: [
          { value: "evoque-base", label: "Evoque" },
          { value: "evoque-s", label: "Evoque S" },
          { value: "evoque-se", label: "Evoque SE" },
          { value: "evoque-hse", label: "Evoque HSE" }
        ]
      },
      {
        value: "range-rover-velar",
        label: "Range Rover Velar",
        variants: [
          { value: "velar-base", label: "Velar" },
          { value: "velar-s", label: "Velar S" },
          { value: "velar-se", label: "Velar SE" },
          { value: "velar-hse", label: "Velar HSE" }
        ]
      },
      {
        value: "range-rover-sport",
        label: "Range Rover Sport",
        variants: [
          { value: "sport-base", label: "Sport" },
          { value: "sport-se", label: "Sport SE" },
          { value: "sport-hse", label: "Sport HSE" },
          { value: "sport-autobiography", label: "Sport Autobiography" },
          { value: "sport-svr", label: "Sport SVR" }
        ]
      },
      {
        value: "range-rover",
        label: "Range Rover",
        variants: [
          { value: "range-rover-base", label: "Range Rover" },
          { value: "range-rover-se", label: "Range Rover SE" },
          { value: "range-rover-hse", label: "Range Rover HSE" },
          { value: "range-rover-autobiography", label: "Range Rover Autobiography" },
          { value: "range-rover-sv", label: "Range Rover SV" }
        ]
      },
      {
        value: "defender",
        label: "Defender",
        variants: [
          { value: "defender-90", label: "Defender 90" },
          { value: "defender-110", label: "Defender 110" },
          { value: "defender-130", label: "Defender 130" }
        ]
      }
    ]
  },
  {
    value: "lexus",
    label: "Lexus",
    models: [
      {
        value: "is",
        label: "IS",
        variants: [
          { value: "is-300", label: "IS 300" },
          { value: "is-350", label: "IS 350" },
          { value: "is-500", label: "IS 500" }
        ]
      },
      {
        value: "es",
        label: "ES",
        variants: [
          { value: "es-250", label: "ES 250" },
          { value: "es-300h", label: "ES 300h" },
          { value: "es-350", label: "ES 350" }
        ]
      },
      {
        value: "gs",
        label: "GS",
        variants: [
          { value: "gs-300", label: "GS 300" },
          { value: "gs-350", label: "GS 350" },
          { value: "gs-450h", label: "GS 450h" }
        ]
      },
      {
        value: "ls",
        label: "LS",
        variants: [
          { value: "ls-500", label: "LS 500" },
          { value: "ls-500h", label: "LS 500h" }
        ]
      },
      {
        value: "ux",
        label: "UX",
        variants: [
          { value: "ux-200", label: "UX 200" },
          { value: "ux-250h", label: "UX 250h" }
        ]
      },
      {
        value: "nx",
        label: "NX",
        variants: [
          { value: "nx-250", label: "NX 250" },
          { value: "nx-300h", label: "NX 300h" },
          { value: "nx-350", label: "NX 350" },
          { value: "nx-450h", label: "NX 450h+" }
        ]
      },
      {
        value: "rx",
        label: "RX",
        variants: [
          { value: "rx-350", label: "RX 350" },
          { value: "rx-350l", label: "RX 350L" },
          { value: "rx-450h", label: "RX 450h" },
          { value: "rx-450hl", label: "RX 450hL" }
        ]
      },
      {
        value: "gx",
        label: "GX",
        variants: [
          { value: "gx-460", label: "GX 460" }
        ]
      },
      {
        value: "lx",
        label: "LX",
        variants: [
          { value: "lx-600", label: "LX 600" }
        ]
      },
      {
        value: "rc",
        label: "RC",
        variants: [
          { value: "rc-300", label: "RC 300" },
          { value: "rc-350", label: "RC 350" },
          { value: "rc-f", label: "RC F" }
        ]
      },
      {
        value: "lc",
        label: "LC",
        variants: [
          { value: "lc-500", label: "LC 500" },
          { value: "lc-500h", label: "LC 500h" }
        ]
      }
    ]
  },
  {
    value: "lincoln",
    label: "Lincoln",
    models: [
      {
        value: "corsair",
        label: "Corsair",
        variants: [
          { value: "corsair-base", label: "Corsair" },
          { value: "corsair-reserve", label: "Corsair Reserve" },
          { value: "corsair-grand-touring", label: "Corsair Grand Touring" }
        ]
      },
      {
        value: "nautilus",
        label: "Nautilus",
        variants: [
          { value: "nautilus-base", label: "Nautilus" },
          { value: "nautilus-reserve", label: "Nautilus Reserve" },
          { value: "nautilus-black-label", label: "Nautilus Black Label" }
        ]
      },
      {
        value: "aviator",
        label: "Aviator",
        variants: [
          { value: "aviator-base", label: "Aviator" },
          { value: "aviator-reserve", label: "Aviator Reserve" },
          { value: "aviator-grand-touring", label: "Aviator Grand Touring" },
          { value: "aviator-black-label", label: "Aviator Black Label" }
        ]
      },
      {
        value: "navigator",
        label: "Navigator",
        variants: [
          { value: "navigator-base", label: "Navigator" },
          { value: "navigator-reserve", label: "Navigator Reserve" },
          { value: "navigator-black-label", label: "Navigator Black Label" }
        ]
      },
      {
        value: "continental",
        label: "Continental",
        variants: [
          { value: "continental-base", label: "Continental" },
          { value: "continental-reserve", label: "Continental Reserve" },
          { value: "continental-black-label", label: "Continental Black Label" }
        ]
      }
    ]
  },
  {
    value: "maserati",
    label: "Maserati",
    models: [
      {
        value: "ghibli",
        label: "Ghibli",
        variants: [
          { value: "ghibli-base", label: "Ghibli" },
          { value: "ghibli-s", label: "Ghibli S" },
          { value: "ghibli-sq4", label: "Ghibli S Q4" },
          { value: "ghibli-trofeo", label: "Ghibli Trofeo" }
        ]
      },
      {
        value: "quattroporte",
        label: "Quattroporte",
        variants: [
          { value: "quattroporte-base", label: "Quattroporte" },
          { value: "quattroporte-s", label: "Quattroporte S" },
          { value: "quattroporte-sq4", label: "Quattroporte S Q4" },
          { value: "quattroporte-trofeo", label: "Quattroporte Trofeo" }
        ]
      },
      {
        value: "levante",
        label: "Levante",
        variants: [
          { value: "levante-base", label: "Levante" },
          { value: "levante-s", label: "Levante S" },
          { value: "levante-sq4", label: "Levante S Q4" },
          { value: "levante-trofeo", label: "Levante Trofeo" }
        ]
      },
      {
        value: "mc20",
        label: "MC20",
        variants: [
          { value: "mc20-base", label: "MC20" },
          { value: "mc20-cielo", label: "MC20 Cielo" }
        ]
      },
      {
        value: "grecale",
        label: "Grecale",
        variants: [
          { value: "grecale-gt", label: "Grecale GT" },
          { value: "grecale-modena", label: "Grecale Modena" },
          { value: "grecale-trofeo", label: "Grecale Trofeo" }
        ]
      }
    ]
  },
  {
    value: "mazda",
    label: "Mazda",
    models: [
      {
        value: "mazda3",
        label: "Mazda3",
        variants: [
          { value: "mazda3-base", label: "Mazda3" },
          { value: "mazda3-select", label: "Mazda3 Select" },
          { value: "mazda3-preferred", label: "Mazda3 Preferred" },
          { value: "mazda3-premium", label: "Mazda3 Premium" },
          { value: "mazda3-turbo", label: "Mazda3 Turbo" }
        ]
      },
      {
        value: "mazda6",
        label: "Mazda6",
        variants: [
          { value: "mazda6-sport", label: "Mazda6 Sport" },
          { value: "mazda6-touring", label: "Mazda6 Touring" },
          { value: "mazda6-grand-touring", label: "Mazda6 Grand Touring" },
          { value: "mazda6-grand-touring-reserve", label: "Mazda6 Grand Touring Reserve" },
          { value: "mazda6-signature", label: "Mazda6 Signature" }
        ]
      },
      {
        value: "cx-3",
        label: "CX-3",
        variants: [
          { value: "cx-3-sport", label: "CX-3 Sport" },
          { value: "cx-3-touring", label: "CX-3 Touring" },
          { value: "cx-3-grand-touring", label: "CX-3 Grand Touring" }
        ]
      },
      {
        value: "cx-30",
        label: "CX-30",
        variants: [
          { value: "cx-30-base", label: "CX-30" },
          { value: "cx-30-select", label: "CX-30 Select" },
          { value: "cx-30-preferred", label: "CX-30 Preferred" },
          { value: "cx-30-premium", label: "CX-30 Premium" },
          { value: "cx-30-turbo", label: "CX-30 Turbo" }
        ]
      },
      {
        value: "cx-5",
        label: "CX-5",
        variants: [
          { value: "cx-5-sport", label: "CX-5 Sport" },
          { value: "cx-5-touring", label: "CX-5 Touring" },
          { value: "cx-5-grand-touring", label: "CX-5 Grand Touring" },
          { value: "cx-5-grand-touring-reserve", label: "CX-5 Grand Touring Reserve" },
          { value: "cx-5-signature", label: "CX-5 Signature" }
        ]
      },
      {
        value: "cx-9",
        label: "CX-9",
        variants: [
          { value: "cx-9-sport", label: "CX-9 Sport" },
          { value: "cx-9-touring", label: "CX-9 Touring" },
          { value: "cx-9-grand-touring", label: "CX-9 Grand Touring" },
          { value: "cx-9-signature", label: "CX-9 Signature" }
        ]
      },
      {
        value: "mx-5-miata",
        label: "MX-5 Miata",
        variants: [
          { value: "mx-5-sport", label: "MX-5 Sport" },
          { value: "mx-5-club", label: "MX-5 Club" },
          { value: "mx-5-grand-touring", label: "MX-5 Grand Touring" },
          { value: "mx-5-rf", label: "MX-5 RF" }
        ]
      }
    ]
  },
  {
    value: "mclaren",
    label: "McLaren",
    models: [
      {
        value: "570s",
        label: "570S",
        variants: [
          { value: "570s-coupe", label: "570S Coupe" },
          { value: "570s-spider", label: "570S Spider" }
        ]
      },
      {
        value: "720s",
        label: "720S",
        variants: [
          { value: "720s-coupe", label: "720S Coupe" },
          { value: "720s-spider", label: "720S Spider" }
        ]
      },
      {
        value: "765lt",
        label: "765LT",
        variants: [
          { value: "765lt-coupe", label: "765LT Coupe" },
          { value: "765lt-spider", label: "765LT Spider" }
        ]
      },
      {
        value: "artura",
        label: "Artura",
        variants: [
          { value: "artura-base", label: "Artura" }
        ]
      },
      {
        value: "gt",
        label: "GT",
        variants: [
          { value: "gt-base", label: "GT" }
        ]
      }
    ]
  },
  {
    value: "mercedes-benz",
    label: "Mercedes-Benz",
    models: [
      {
        value: "a-class",
        label: "A-Class",
        variants: [
          { value: "a220", label: "A 220" },
          { value: "a220-4matic", label: "A 220 4MATIC" },
          { value: "amg-a35", label: "AMG A 35" },
          { value: "amg-a45-s", label: "AMG A 45 S" }
        ]
      },
      {
        value: "c-class",
        label: "C-Class",
        variants: [
          { value: "c300", label: "C 300" },
          { value: "c300-4matic", label: "C 300 4MATIC" },
          { value: "amg-c43", label: "AMG C 43" },
          { value: "amg-c63", label: "AMG C 63" },
          { value: "amg-c63-s", label: "AMG C 63 S" }
        ]
      },
      {
        value: "e-class",
        label: "E-Class",
        variants: [
          { value: "e350", label: "E 350" },
          { value: "e350-4matic", label: "E 350 4MATIC" },
          { value: "e450-4matic", label: "E 450 4MATIC" },
          { value: "amg-e53", label: "AMG E 53" },
          { value: "amg-e63-s", label: "AMG E 63 S" }
        ]
      },
      {
        value: "s-class",
        label: "S-Class",
        variants: [
          { value: "s500", label: "S 500" },
          { value: "s580", label: "S 580" },
          { value: "amg-s63", label: "AMG S 63" },
          { value: "maybach-s580", label: "Maybach S 580" },
          { value: "maybach-s680", label: "Maybach S 680" }
        ]
      },
      {
        value: "cla-class",
        label: "CLA-Class",
        variants: [
          { value: "cla250", label: "CLA 250" },
          { value: "cla250-4matic", label: "CLA 250 4MATIC" },
          { value: "amg-cla35", label: "AMG CLA 35" },
          { value: "amg-cla45-s", label: "AMG CLA 45 S" }
        ]
      },
      {
        value: "cls-class",
        label: "CLS-Class",
        variants: [
          { value: "cls450", label: "CLS 450" },
          { value: "cls450-4matic", label: "CLS 450 4MATIC" },
          { value: "amg-cls53", label: "AMG CLS 53" }
        ]
      },
      {
        value: "gla-class",
        label: "GLA-Class",
        variants: [
          { value: "gla250", label: "GLA 250" },
          { value: "gla250-4matic", label: "GLA 250 4MATIC" },
          { value: "amg-gla35", label: "AMG GLA 35" },
          { value: "amg-gla45-s", label: "AMG GLA 45 S" }
        ]
      },
      {
        value: "glb-class",
        label: "GLB-Class",
        variants: [
          { value: "glb250", label: "GLB 250" },
          { value: "glb250-4matic", label: "GLB 250 4MATIC" },
          { value: "amg-glb35", label: "AMG GLB 35" }
        ]
      },
      {
        value: "glc-class",
        label: "GLC-Class",
        variants: [
          { value: "glc300", label: "GLC 300" },
          { value: "glc300-4matic", label: "GLC 300 4MATIC" },
          { value: "amg-glc43", label: "AMG GLC 43" },
          { value: "amg-glc63-s", label: "AMG GLC 63 S" }
        ]
      },
      {
        value: "gle-class",
        label: "GLE-Class",
        variants: [
          { value: "gle350", label: "GLE 350" },
          { value: "gle350-4matic", label: "GLE 350 4MATIC" },
          { value: "gle450-4matic", label: "GLE 450 4MATIC" },
          { value: "amg-gle53", label: "AMG GLE 53" },
          { value: "amg-gle63-s", label: "AMG GLE 63 S" }
        ]
      },
      {
        value: "gls-class",
        label: "GLS-Class",
        variants: [
          { value: "gls450", label: "GLS 450" },
          { value: "gls450-4matic", label: "GLS 450 4MATIC" },
          { value: "gls580", label: "GLS 580" },
          { value: "amg-gls63", label: "AMG GLS 63" },
          { value: "maybach-gls600", label: "Maybach GLS 600" }
        ]
      },
      {
        value: "g-class",
        label: "G-Class",
        variants: [
          { value: "g550", label: "G 550" },
          { value: "amg-g63", label: "AMG G 63" }
        ]
      },
      {
        value: "slc-class",
        label: "SLC-Class",
        variants: [
          { value: "slc300", label: "SLC 300" },
          { value: "amg-slc43", label: "AMG SLC 43" }
        ]
      },
      {
        value: "sl-class",
        label: "SL-Class",
        variants: [
          { value: "sl450", label: "SL 450" },
          { value: "sl550", label: "SL 550" },
          { value: "amg-sl63", label: "AMG SL 63" },
          { value: "amg-sl65", label: "AMG SL 65" }
        ]
      },
      {
        value: "amg-gt",
        label: "AMG GT",
        variants: [
          { value: "amg-gt-base", label: "AMG GT" },
          { value: "amg-gt-s", label: "AMG GT S" },
          { value: "amg-gt-c", label: "AMG GT C" },
          { value: "amg-gt-r", label: "AMG GT R" }
        ]
      },
      {
        value: "eqc",
        label: "EQC",
        variants: [
          { value: "eqc400", label: "EQC 400" }
        ]
      },
      {
        value: "eqs",
        label: "EQS",
        variants: [
          { value: "eqs450", label: "EQS 450+" },
          { value: "eqs580", label: "EQS 580" },
          { value: "amg-eqs53", label: "AMG EQS 53" }
        ]
      }
    ]
  },
  {
    value: "mini",
    label: "MINI",
    models: [
      {
        value: "cooper",
        label: "Cooper",
        variants: [
          { value: "cooper-base", label: "Cooper" },
          { value: "cooper-s", label: "Cooper S" },
          { value: "cooper-se", label: "Cooper SE" }
        ]
      },
      {
        value: "countryman",
        label: "Countryman",
        variants: [
          { value: "countryman-base", label: "Countryman" },
          { value: "countryman-s", label: "Countryman S" },
          { value: "countryman-se", label: "Countryman SE" }
        ]
      },
      {
        value: "clubman",
        label: "Clubman",
        variants: [
          { value: "clubman-base", label: "Clubman" },
          { value: "clubman-s", label: "Clubman S" }
        ]
      },
      {
        value: "convertible",
        label: "Convertible",
        variants: [
          { value: "convertible-base", label: "Convertible" },
          { value: "convertible-s", label: "Convertible S" }
        ]
      }
    ]
  },
  {
    value: "mitsubishi",
    label: "Mitsubishi",
    models: [
      {
        value: "mirage",
        label: "Mirage",
        variants: [
          { value: "mirage-es", label: "Mirage ES" },
          { value: "mirage-le", label: "Mirage LE" },
          { value: "mirage-gt", label: "Mirage GT" }
        ]
      },
      {
        value: "eclipse-cross",
        label: "Eclipse Cross",
        variants: [
          { value: "eclipse-cross-es", label: "Eclipse Cross ES" },
          { value: "eclipse-cross-le", label: "Eclipse Cross LE" },
          { value: "eclipse-cross-sel", label: "Eclipse Cross SEL" }
        ]
      },
      {
        value: "outlander",
        label: "Outlander",
        variants: [
          { value: "outlander-es", label: "Outlander ES" },
          { value: "outlander-le", label: "Outlander LE" },
          { value: "outlander-sel", label: "Outlander SEL" },
          { value: "outlander-gt", label: "Outlander GT" }
        ]
      },
      {
        value: "outlander-phev",
        label: "Outlander PHEV",
        variants: [
          { value: "outlander-phev-le", label: "Outlander PHEV LE" },
          { value: "outlander-phev-sel", label: "Outlander PHEV SEL" },
          { value: "outlander-phev-gt", label: "Outlander PHEV GT" }
        ]
      }
    ]
  },
  {
    value: "nissan",
    label: "Nissan",
    models: [
      {
        value: "versa",
        label: "Versa",
        variants: [
          { value: "versa-s", label: "Versa S" },
          { value: "versa-sv", label: "Versa SV" },
          { value: "versa-sr", label: "Versa SR" }
        ]
      },
      {
        value: "sentra",
        label: "Sentra",
        variants: [
          { value: "sentra-s", label: "Sentra S" },
          { value: "sentra-sv", label: "Sentra SV" },
          { value: "sentra-sr", label: "Sentra SR" }
        ]
      },
      {
        value: "altima",
        label: "Altima",
        variants: [
          { value: "altima-s", label: "Altima S" },
          { value: "altima-sv", label: "Altima SV" },
          { value: "altima-sl", label: "Altima SL" },
          { value: "altima-platinum", label: "Altima Platinum" }
        ]
      },
      {
        value: "maxima",
        label: "Maxima",
        variants: [
          { value: "maxima-s", label: "Maxima S" },
          { value: "maxima-sv", label: "Maxima SV" },
          { value: "maxima-sl", label: "Maxima SL" },
          { value: "maxima-platinum", label: "Maxima Platinum" }
        ]
      },
      {
        value: "370z",
        label: "370Z",
        variants: [
          { value: "370z-base", label: "370Z Base" },
          { value: "370z-sport", label: "370Z Sport" },
          { value: "370z-nismo", label: "370Z NISMO" }
        ]
      },
      {
        value: "z",
        label: "Z",
        variants: [
          { value: "z-sport", label: "Z Sport" },
          { value: "z-performance", label: "Z Performance" },
          { value: "z-proto-spec", label: "Z Proto Spec" }
        ]
      },
      {
        value: "gt-r",
        label: "GT-R",
        variants: [
          { value: "gt-r-premium", label: "GT-R Premium" },
          { value: "gt-r-track-edition", label: "GT-R Track Edition" },
          { value: "gt-r-nismo", label: "GT-R NISMO" }
        ]
      },
      {
        value: "kicks",
        label: "Kicks",
        variants: [
          { value: "kicks-s", label: "Kicks S" },
          { value: "kicks-sv", label: "Kicks SV" },
          { value: "kicks-sr", label: "Kicks SR" }
        ]
      },
      {
        value: "rogue",
        label: "Rogue",
        variants: [
          { value: "rogue-s", label: "Rogue S" },
          { value: "rogue-sv", label: "Rogue SV" },
          { value: "rogue-sl", label: "Rogue SL" },
          { value: "rogue-platinum", label: "Rogue Platinum" }
        ]
      },
      {
        value: "murano",
        label: "Murano",
        variants: [
          { value: "murano-s", label: "Murano S" },
          { value: "murano-sv", label: "Murano SV" },
          { value: "murano-sl", label: "Murano SL" },
          { value: "murano-platinum", label: "Murano Platinum" }
        ]
      },
      {
        value: "pathfinder",
        label: "Pathfinder",
        variants: [
          { value: "pathfinder-s", label: "Pathfinder S" },
          { value: "pathfinder-sv", label: "Pathfinder SV" },
          { value: "pathfinder-sl", label: "Pathfinder SL" },
          { value: "pathfinder-platinum", label: "Pathfinder Platinum" }
        ]
      },
      {
        value: "armada",
        label: "Armada",
        variants: [
          { value: "armada-sv", label: "Armada SV" },
          { value: "armada-sl", label: "Armada SL" },
          { value: "armada-platinum", label: "Armada Platinum" }
        ]
      },
      {
        value: "frontier",
        label: "Frontier",
        variants: [
          { value: "frontier-s", label: "Frontier S" },
          { value: "frontier-sv", label: "Frontier SV" },
          { value: "frontier-pro-4x", label: "Frontier PRO-4X" }
        ]
      },
      {
        value: "titan",
        label: "Titan",
        variants: [
          { value: "titan-s", label: "Titan S" },
          { value: "titan-sv", label: "Titan SV" },
          { value: "titan-pro-4x", label: "Titan PRO-4X" },
          { value: "titan-platinum-reserve", label: "Titan Platinum Reserve" }
        ]
      },
      {
        value: "leaf",
        label: "LEAF",
        variants: [
          { value: "leaf-s", label: "LEAF S" },
          { value: "leaf-sv", label: "LEAF SV" },
          { value: "leaf-sl", label: "LEAF SL" }
        ]
      },
      {
        value: "ariya",
        label: "Ariya",
        variants: [
          { value: "ariya-engage", label: "Ariya Engage" },
          { value: "ariya-venture", label: "Ariya Venture+" },
          { value: "ariya-evolve", label: "Ariya Evolve+" },
          { value: "ariya-premiere", label: "Ariya Premiere" }
        ]
      }
    ]
  },
  {
    value: "polestar",
    label: "Polestar",
    models: [
      {
        value: "1",
        label: "1",
        variants: [
          { value: "1-base", label: "1" }
        ]
      },
      {
        value: "2",
        label: "2",
        variants: [
          { value: "2-single-motor", label: "2 Single Motor" },
          { value: "2-dual-motor", label: "2 Dual Motor" },
          { value: "2-performance", label: "2 Performance" }
        ]
      },
      {
        value: "3",
        label: "3",
        variants: [
          { value: "3-single-motor", label: "3 Single Motor" },
          { value: "3-dual-motor", label: "3 Dual Motor" },
          { value: "3-performance", label: "3 Performance" }
        ]
      }
    ]
  },
  {
    value: "porsche",
    label: "Porsche",
    models: [
      {
        value: "718",
        label: "718",
        variants: [
          { value: "718-cayman", label: "718 Cayman" },
          { value: "718-cayman-s", label: "718 Cayman S" },
          { value: "718-cayman-gts", label: "718 Cayman GTS" },
          { value: "718-cayman-gt4", label: "718 Cayman GT4" },
          { value: "718-boxster", label: "718 Boxster" },
          { value: "718-boxster-s", label: "718 Boxster S" },
          { value: "718-boxster-gts", label: "718 Boxster GTS" },
          { value: "718-spyder", label: "718 Spyder" }
        ]
      },
      {
        value: "911",
        label: "911",
        variants: [
          { value: "911-carrera", label: "911 Carrera" },
          { value: "911-carrera-s", label: "911 Carrera S" },
          { value: "911-carrera-4", label: "911 Carrera 4" },
          { value: "911-carrera-4s", label: "911 Carrera 4S" },
          { value: "911-targa-4", label: "911 Targa 4" },
          { value: "911-targa-4s", label: "911 Targa 4S" },
          { value: "911-turbo", label: "911 Turbo" },
          { value: "911-turbo-s", label: "911 Turbo S" },
          { value: "911-gt3", label: "911 GT3" },
          { value: "911-gt3-rs", label: "911 GT3 RS" },
          { value: "911-gt2-rs", label: "911 GT2 RS" }
        ]
      },
      {
        value: "panamera",
        label: "Panamera",
        variants: [
          { value: "panamera-base", label: "Panamera" },
          { value: "panamera-4", label: "Panamera 4" },
          { value: "panamera-4s", label: "Panamera 4S" },
          { value: "panamera-gts", label: "Panamera GTS" },
          { value: "panamera-turbo", label: "Panamera Turbo" },
          { value: "panamera-turbo-s", label: "Panamera Turbo S" }
        ]
      },
      {
        value: "macan",
        label: "Macan",
        variants: [
          { value: "macan-base", label: "Macan" },
          { value: "macan-s", label: "Macan S" },
          { value: "macan-gts", label: "Macan GTS" },
          { value: "macan-turbo", label: "Macan Turbo" }
        ]
      },
      {
        value: "cayenne",
        label: "Cayenne",
        variants: [
          { value: "cayenne-base", label: "Cayenne" },
          { value: "cayenne-s", label: "Cayenne S" },
          { value: "cayenne-gts", label: "Cayenne GTS" },
          { value: "cayenne-turbo", label: "Cayenne Turbo" },
          { value: "cayenne-turbo-s", label: "Cayenne Turbo S" }
        ]
      },
      {
        value: "taycan",
        label: "Taycan",
        variants: [
          { value: "taycan-base", label: "Taycan" },
          { value: "taycan-4s", label: "Taycan 4S" },
          { value: "taycan-turbo", label: "Taycan Turbo" },
          { value: "taycan-turbo-s", label: "Taycan Turbo S" },
          { value: "taycan-cross-turismo", label: "Taycan Cross Turismo" }
        ]
      }
    ]
  },
  {
    value: "ram",
    label: "Ram",
    models: [
      {
        value: "1500",
        label: "1500",
        variants: [
          { value: "1500-tradesman", label: "1500 Tradesman" },
          { value: "1500-big-horn", label: "1500 Big Horn" },
          { value: "1500-rebel", label: "1500 Rebel" },
          { value: "1500-laramie", label: "1500 Laramie" },
          { value: "1500-longhorn", label: "1500 Longhorn" },
          { value: "1500-limited", label: "1500 Limited" },
          { value: "1500-trx", label: "1500 TRX" }
        ]
      },
      {
        value: "2500",
        label: "2500",
        variants: [
          { value: "2500-tradesman", label: "2500 Tradesman" },
          { value: "2500-big-horn", label: "2500 Big Horn" },
          { value: "2500-power-wagon", label: "2500 Power Wagon" },
          { value: "2500-laramie", label: "2500 Laramie" },
          { value: "2500-longhorn", label: "2500 Longhorn" },
          { value: "2500-limited", label: "2500 Limited" }
        ]
      },
      {
        value: "3500",
        label: "3500",
        variants: [
          { value: "3500-tradesman", label: "3500 Tradesman" },
          { value: "3500-big-horn", label: "3500 Big Horn" },
          { value: "3500-laramie", label: "3500 Laramie" },
          { value: "3500-longhorn", label: "3500 Longhorn" },
          { value: "3500-limited", label: "3500 Limited" }
        ]
      },
      {
        value: "promaster",
        label: "ProMaster",
        variants: [
          { value: "promaster-1500", label: "ProMaster 1500" },
          { value: "promaster-2500", label: "ProMaster 2500" },
          { value: "promaster-3500", label: "ProMaster 3500" }
        ]
      },
      {
        value: "promaster-city",
        label: "ProMaster City",
        variants: [
          { value: "promaster-city-tradesman", label: "ProMaster City Tradesman" },
          { value: "promaster-city-wagon", label: "ProMaster City Wagon" }
        ]
      }
    ]
  },
  {
    value: "rolls-royce",
    label: "Rolls-Royce",
    models: [
      {
        value: "ghost",
        label: "Ghost",
        variants: [
          { value: "ghost-base", label: "Ghost" },
          { value: "ghost-extended", label: "Ghost Extended" },
          { value: "ghost-black-badge", label: "Ghost Black Badge" }
        ]
      },
      {
        value: "phantom",
        label: "Phantom",
        variants: [
          { value: "phantom-base", label: "Phantom" },
          { value: "phantom-extended", label: "Phantom Extended" }
        ]
      },
      {
        value: "wraith",
        label: "Wraith",
        variants: [
          { value: "wraith-base", label: "Wraith" },
          { value: "wraith-black-badge", label: "Wraith Black Badge" }
        ]
      },
      {
        value: "dawn",
        label: "Dawn",
        variants: [
          { value: "dawn-base", label: "Dawn" },
          { value: "dawn-black-badge", label: "Dawn Black Badge" }
        ]
      },
      {
        value: "cullinan",
        label: "Cullinan",
        variants: [
          { value: "cullinan-base", label: "Cullinan" },
          { value: "cullinan-black-badge", label: "Cullinan Black Badge" }
        ]
      }
    ]
  },
  {
    value: "subaru",
    label: "Subaru",
    models: [
      {
        value: "impreza",
        label: "Impreza",
        variants: [
          { value: "impreza-base", label: "Impreza" },
          { value: "impreza-premium", label: "Impreza Premium" },
          { value: "impreza-sport", label: "Impreza Sport" },
          { value: "impreza-limited", label: "Impreza Limited" }
        ]
      },
      {
        value: "legacy",
        label: "Legacy",
        variants: [
          { value: "legacy-base", label: "Legacy" },
          { value: "legacy-premium", label: "Legacy Premium" },
          { value: "legacy-sport", label: "Legacy Sport" },
          { value: "legacy-limited", label: "Legacy Limited" },
          { value: "legacy-touring-xt", label: "Legacy Touring XT" }
        ]
      },
      {
        value: "wrx",
        label: "WRX",
        variants: [
          { value: "wrx-base", label: "WRX" },
          { value: "wrx-premium", label: "WRX Premium" },
          { value: "wrx-limited", label: "WRX Limited" },
          { value: "wrx-sti", label: "WRX STI" }
        ]
      },
      {
        value: "brz",
        label: "BRZ",
        variants: [
          { value: "brz-base", label: "BRZ" },
          { value: "brz-premium", label: "BRZ Premium" },
          { value: "brz-limited", label: "BRZ Limited" }
        ]
      },
      {
        value: "crosstrek",
        label: "Crosstrek",
        variants: [
          { value: "crosstrek-base", label: "Crosstrek" },
          { value: "crosstrek-premium", label: "Crosstrek Premium" },
          { value: "crosstrek-sport", label: "Crosstrek Sport" },
          { value: "crosstrek-limited", label: "Crosstrek Limited" }
        ]
      },
      {
        value: "forester",
        label: "Forester",
        variants: [
          { value: "forester-base", label: "Forester" },
          { value: "forester-premium", label: "Forester Premium" },
          { value: "forester-sport", label: "Forester Sport" },
          { value: "forester-limited", label: "Forester Limited" },
          { value: "forester-touring", label: "Forester Touring" }
        ]
      },
      {
        value: "outback",
        label: "Outback",
        variants: [
          { value: "outback-base", label: "Outback" },
          { value: "outback-premium", label: "Outback Premium" },
          { value: "outback-onyx", label: "Outback Onyx" },
          { value: "outback-limited", label: "Outback Limited" },
          { value: "outback-touring", label: "Outback Touring" }
        ]
      },
      {
        value: "ascent",
        label: "Ascent",
        variants: [
          { value: "ascent-base", label: "Ascent" },
          { value: "ascent-premium", label: "Ascent Premium" },
          { value: "ascent-onyx", label: "Ascent Onyx" },
          { value: "ascent-limited", label: "Ascent Limited" },
          { value: "ascent-touring", label: "Ascent Touring" }
        ]
      },
      {
        value: "solterra",
        label: "Solterra",
        variants: [
          { value: "solterra-premium", label: "Solterra Premium" },
          { value: "solterra-limited", label: "Solterra Limited" },
          { value: "solterra-touring", label: "Solterra Touring" }
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
        variants: [
          { value: "model-3-standard-range-plus", label: "Model 3 Standard Range Plus" },
          { value: "model-3-long-range", label: "Model 3 Long Range" },
          { value: "model-3-performance", label: "Model 3 Performance" }
        ]
      },
      {
        value: "model-s",
        label: "Model S",
        variants: [
          { value: "model-s-long-range", label: "Model S Long Range" },
          { value: "model-s-plaid", label: "Model S Plaid" }
        ]
      },
      {
        value: "model-x",
        label: "Model X",
        variants: [
          { value: "model-x-long-range", label: "Model X Long Range" },
          { value: "model-x-plaid", label: "Model X Plaid" }
        ]
      },
      {
        value: "model-y",
        label: "Model Y",
        variants: [
          { value: "model-y-long-range", label: "Model Y Long Range" },
          { value: "model-y-performance", label: "Model Y Performance" }
        ]
      },
      {
        value: "cybertruck",
        label: "Cybertruck",
        variants: [
          { value: "cybertruck-single-motor", label: "Cybertruck Single Motor" },
          { value: "cybertruck-dual-motor", label: "Cybertruck Dual Motor" },
          { value: "cybertruck-tri-motor", label: "Cybertruck Tri Motor" }
        ]
      },
      {
        value: "roadster",
        label: "Roadster",
        variants: [
          { value: "roadster-base", label: "Roadster" },
          { value: "roadster-spacex", label: "Roadster SpaceX" }
        ]
      },
      {
        value: "semi",
        label: "Semi",
        variants: [
          { value: "semi-300-mile", label: "Semi 300 Mile" },
          { value: "semi-500-mile", label: "Semi 500 Mile" }
        ]
      }
    ]
  },
  {
    value: "toyota",
    label: "Toyota",
    models: [
      {
        value: "yaris",
        label: "Yaris",
        variants: [
          { value: "yaris-l", label: "Yaris L" },
          { value: "yaris-le", label: "Yaris LE" },
          { value: "yaris-xle", label: "Yaris XLE" }
        ]
      },
      {
        value: "corolla",
        label: "Corolla",
        variants: [
          { value: "corolla-l", label: "Corolla L" },
          { value: "corolla-le", label: "Corolla LE" },
          { value: "corolla-se", label: "Corolla SE" },
          { value: "corolla-xle", label: "Corolla XLE" },
          { value: "corolla-xse", label: "Corolla XSE" }
        ]
      },
      {
        value: "corolla-hatchback",
        label: "Corolla Hatchback",
        variants: [
          { value: "corolla-hatchback-se", label: "Corolla Hatchback SE" },
          { value: "corolla-hatchback-xse", label: "Corolla Hatchback XSE" }
        ]
      },
      {
        value: "camry",
        label: "Camry",
        variants: [
          { value: "camry-le", label: "Camry LE" },
          { value: "camry-se", label: "Camry SE" },
          { value: "camry-xle", label: "Camry XLE" },
          { value: "camry-xse", label: "Camry XSE" },
          { value: "camry-trd", label: "Camry TRD" }
        ]
      },
      {
        value: "avalon",
        label: "Avalon",
        variants: [
          { value: "avalon-xle", label: "Avalon XLE" },
          { value: "avalon-xse", label: "Avalon XSE" },
          { value: "avalon-limited", label: "Avalon Limited" },
          { value: "avalon-touring", label: "Avalon Touring" }
        ]
      },
      {
        value: "86",
        label: "86",
        variants: [
          { value: "86-base", label: "86" },
          { value: "86-gt", label: "86 GT" },
          { value: "86-hakone", label: "86 Hakone" }
        ]
      },
      {
        value: "supra",
        label: "Supra",
        variants: [
          { value: "supra-20", label: "Supra 2.0" },
          { value: "supra-30", label: "Supra 3.0" },
          { value: "supra-30-premium", label: "Supra 3.0 Premium" }
        ]
      },
      {
        value: "c-hr",
        label: "C-HR",
        variants: [
          { value: "c-hr-le", label: "C-HR LE" },
          { value: "c-hr-xle", label: "C-HR XLE" },
          { value: "c-hr-limited", label: "C-HR Limited" }
        ]
      },
      {
        value: "rav4",
        label: "RAV4",
        variants: [
          { value: "rav4-le", label: "RAV4 LE" },
          { value: "rav4-xle", label: "RAV4 XLE" },
          { value: "rav4-xle-premium", label: "RAV4 XLE Premium" },
          { value: "rav4-adventure", label: "RAV4 Adventure" },
          { value: "rav4-limited", label: "RAV4 Limited" },
          { value: "rav4-trd-off-road", label: "RAV4 TRD Off-Road" },
          { value: "rav4-prime", label: "RAV4 Prime" }
        ]
      },
      {
        value: "venza",
        label: "Venza",
        variants: [
          { value: "venza-le", label: "Venza LE" },
          { value: "venza-xle", label: "Venza XLE" },
          { value: "venza-limited", label: "Venza Limited" }
        ]
      },
      {
        value: "highlander",
        label: "Highlander",
        variants: [
          { value: "highlander-l", label: "Highlander L" },
          { value: "highlander-le", label: "Highlander LE" },
          { value: "highlander-xle", label: "Highlander XLE" },
          { value: "highlander-limited", label: "Highlander Limited" },
          { value: "highlander-platinum", label: "Highlander Platinum" }
        ]
      },
      {
        value: "4runner",
        label: "4Runner",
        variants: [
          { value: "4runner-sr5", label: "4Runner SR5" },
          { value: "4runner-sr5-premium", label: "4Runner SR5 Premium" },
          { value: "4runner-trd-off-road", label: "4Runner TRD Off-Road" },
          { value: "4runner-trd-off-road-premium", label: "4Runner TRD Off-Road Premium" },
          { value: "4runner-limited", label: "4Runner Limited" },
          { value: "4runner-trd-pro", label: "4Runner TRD Pro" }
        ]
      },
      {
        value: "sequoia",
        label: "Sequoia",
        variants: [
          { value: "sequoia-sr5", label: "Sequoia SR5" },
          { value: "sequoia-limited", label: "Sequoia Limited" },
          { value: "sequoia-platinum", label: "Sequoia Platinum" },
          { value: "sequoia-trd-pro", label: "Sequoia TRD Pro" }
        ]
      },
      {
        value: "land-cruiser",
        label: "Land Cruiser",
        variants: [
          { value: "land-cruiser-base", label: "Land Cruiser" },
          { value: "land-cruiser-premium", label: "Land Cruiser Premium" }
        ]
      },
      {
        value: "tacoma",
        label: "Tacoma",
        variants: [
          { value: "tacoma-sr", label: "Tacoma SR" },
          { value: "tacoma-sr5", label: "Tacoma SR5" },
          { value: "tacoma-trd-sport", label: "Tacoma TRD Sport" },
          { value: "tacoma-trd-off-road", label: "Tacoma TRD Off-Road" },
          { value: "tacoma-limited", label: "Tacoma Limited" },
          { value: "tacoma-trd-pro", label: "Tacoma TRD Pro" }
        ]
      },
      {
        value: "tundra",
        label: "Tundra",
        variants: [
          { value: "tundra-sr", label: "Tundra SR" },
          { value: "tundra-sr5", label: "Tundra SR5" },
          { value: "tundra-limited", label: "Tundra Limited" },
          { value: "tundra-platinum", label: "Tundra Platinum" },
          { value: "tundra-1794", label: "Tundra 1794" },
          { value: "tundra-trd-pro", label: "Tundra TRD Pro" }
        ]
      },
      {
        value: "sienna",
        label: "Sienna",
        variants: [
          { value: "sienna-le", label: "Sienna LE" },
          { value: "sienna-xle", label: "Sienna XLE" },
          { value: "sienna-limited", label: "Sienna Limited" },
          { value: "sienna-platinum", label: "Sienna Platinum" }
        ]
      },
      {
        value: "prius",
        label: "Prius",
        variants: [
          { value: "prius-l", label: "Prius L" },
          { value: "prius-le", label: "Prius LE" },
          { value: "prius-xle", label: "Prius XLE" },
          { value: "prius-limited", label: "Prius Limited" }
        ]
      },
      {
        value: "prius-prime",
        label: "Prius Prime",
        variants: [
          { value: "prius-prime-le", label: "Prius Prime LE" },
          { value: "prius-prime-xle", label: "Prius Prime XLE" },
          { value: "prius-prime-limited", label: "Prius Prime Limited" }
        ]
      },
      {
        value: "mirai",
        label: "Mirai",
        variants: [
          { value: "mirai-xle", label: "Mirai XLE" },
          { value: "mirai-limited", label: "Mirai Limited" }
        ]
      }
    ]
  },
  {
    value: "volkswagen",
    label: "Volkswagen",
    models: [
      {
        value: "jetta",
        label: "Jetta",
        variants: [
          { value: "jetta-s", label: "Jetta S" },
          { value: "jetta-se", label: "Jetta SE" },
          { value: "jetta-sel", label: "Jetta SEL" },
          { value: "jetta-sel-premium", label: "Jetta SEL Premium" }
        ]
      },
      {
        value: "passat",
        label: "Passat",
        variants: [
          { value: "passat-s", label: "Passat S" },
          { value: "passat-se", label: "Passat SE" },
          { value: "passat-sel", label: "Passat SEL" },
          { value: "passat-sel-premium", label: "Passat SEL Premium" }
        ]
      },
      {
        value: "arteon",
        label: "Arteon",
        variants: [
          { value: "arteon-se", label: "Arteon SE" },
          { value: "arteon-sel", label: "Arteon SEL" },
          { value: "arteon-sel-premium", label: "Arteon SEL Premium" }
        ]
      },
      {
        value: "golf",
        label: "Golf",
        variants: [
          { value: "golf-s", label: "Golf S" },
          { value: "golf-se", label: "Golf SE" },
          { value: "golf-sel", label: "Golf SEL" },
          { value: "golf-gti", label: "Golf GTI" },
          { value: "golf-r", label: "Golf R" }
        ]
      },
      {
        value: "tiguan",
        label: "Tiguan",
        variants: [
          { value: "tiguan-s", label: "Tiguan S" },
          { value: "tiguan-se", label: "Tiguan SE" },
          { value: "tiguan-sel", label: "Tiguan SEL" },
          { value: "tiguan-sel-premium", label: "Tiguan SEL Premium" }
        ]
      },
      {
        value: "atlas",
        label: "Atlas",
        variants: [
          { value: "atlas-s", label: "Atlas S" },
          { value: "atlas-se", label: "Atlas SE" },
          { value: "atlas-se-w-technology", label: "Atlas SE w/Technology" },
          { value: "atlas-sel", label: "Atlas SEL" },
          { value: "atlas-sel-premium", label: "Atlas SEL Premium" }
        ]
      },
      {
        value: "atlas-cross-sport",
        label: "Atlas Cross Sport",
        variants: [
          { value: "atlas-cross-sport-s", label: "Atlas Cross Sport S" },
          { value: "atlas-cross-sport-se", label: "Atlas Cross Sport SE" },
          { value: "atlas-cross-sport-sel", label: "Atlas Cross Sport SEL" },
          { value: "atlas-cross-sport-sel-premium", label: "Atlas Cross Sport SEL Premium" }
        ]
      },
      {
        value: "id4",
        label: "ID.4",
        variants: [
          { value: "id4-pro", label: "ID.4 Pro" },
          { value: "id4-pro-s", label: "ID.4 Pro S" }
        ]
      },
      {
        value: "taos",
        label: "Taos",
        variants: [
          { value: "taos-s", label: "Taos S" },
          { value: "taos-se", label: "Taos SE" },
          { value: "taos-sel", label: "Taos SEL" }
        ]
      }
    ]
  },
  {
    value: "volvo",
    label: "Volvo",
    models: [
      {
        value: "s60",
        label: "S60",
        variants: [
          { value: "s60-momentum", label: "S60 Momentum" },
          { value: "s60-r-design", label: "S60 R-Design" },
          { value: "s60-inscription", label: "S60 Inscription" },
          { value: "s60-polestar", label: "S60 Polestar" }
        ]
      },
      {
        value: "s90",
        label: "S90",
        variants: [
          { value: "s90-momentum", label: "S90 Momentum" },
          { value: "s90-r-design", label: "S90 R-Design" },
          { value: "s90-inscription", label: "S90 Inscription" }
        ]
      },
      {
        value: "xc40",
        label: "XC40",
        variants: [
          { value: "xc40-momentum", label: "XC40 Momentum" },
          { value: "xc40-r-design", label: "XC40 R-Design" },
          { value: "xc40-inscription", label: "XC40 Inscription" },
          { value: "xc40-recharge", label: "XC40 Recharge" }
        ]
      },
      {
        value: "xc60",
        label: "XC60",
        variants: [
          { value: "xc60-momentum", label: "XC60 Momentum" },
          { value: "xc60-r-design", label: "XC60 R-Design" },
          { value: "xc60-inscription", label: "XC60 Inscription" },
          { value: "xc60-recharge", label: "XC60 Recharge" }
        ]
      },
      {
        value: "xc90",
        label: "XC90",
        variants: [
          { value: "xc90-momentum", label: "XC90 Momentum" },
          { value: "xc90-r-design", label: "XC90 R-Design" },
          { value: "xc90-inscription", label: "XC90 Inscription" },
          { value: "xc90-recharge", label: "XC90 Recharge" }
        ]
      },
      {
        value: "c40",
        label: "C40",
        variants: [
          { value: "c40-recharge", label: "C40 Recharge" }
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

export const getVariantsByModel = (manufacturerValue: string, modelValue: string): CarVariant[] => {
  const manufacturer = getManufacturerByValue(manufacturerValue);
  if (!manufacturer) return [];
  
  const model = manufacturer.models.find(model => model.value === modelValue);
  return model ? model.variants : [];
};