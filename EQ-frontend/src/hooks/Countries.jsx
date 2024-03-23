export const cities = [
  { name: "MAROS", latLng: [46.54245, 24.55747] },
  { name: "BUCHAREST", latLng: [44.439663, 26.096306] },
  { name: "BUDAPEST", latLng: [47.497913, 19.040236] },
  { name: "BERLIN", latLng: [52.520008, 13.404954] },
  { name: "ROME", latLng: [41.902782, 12.496366] },
  { name: "PARIS", latLng: [48.864716, 2.349014] },
];

export const neighbours = {
  RO: ["HU", "UK", "MD", "BG"],
  HU: ["RO", "SK", "UA", "AT", "SI", "HR", "RS"],
  UK: ["RO", "HU", "FR", "BE", "NL", "DE"],
  MD: ["RO", "UA"],
  BG: ["RO", "GR", "TR", "MK", "RS"],
  SK: ["HU", "AT", "CZ", "PL", "UA"],
  UA: ["HU", "RO", "MD", "BY", "PL", "SK", "RU"],
  AT: ["HU", "SK", "CZ", "DE", "CH", "IT", "SI"],
  SI: ["AT", "IT", "HR", "HU"],
  HR: ["SI", "HU", "RS", "BA"],
  RS: ["HU", "HR", "BA", "BG", "MK"],
  FR: ["UK", "BE", "DE", "CH", "IT", "ES"],
  BE: ["UK", "FR", "NL", "DE", "LU"],
  NL: ["UK", "BE", "DE"],
  DE: ["UK", "FR", "NL", "BE", "CH", "AT", "CZ", "PL", "DK"],
  RU: ["NO", "FI", "EE", "LV", "LT", "BY", "UA", "GE", "KZ", "MN", "CN"],
  GR: ["BG", "TR", "AL", "MK"],
  TR: ["BG", "GR", "IR", "IQ", "SY", "GE", "AM", "AZ"],
  MK: ["BG", "AL", "RS", "GR"],
  PL: ["DE", "CZ", "SK", "UA", "BY", "LT"],
  CZ: ["DE", "AT", "SK", "PL"],
  IT: ["FR", "CH", "AT", "SI"],
  ES: ["FR", "PT"],
  CH: ["DE", "AT", "IT", "FR", "LI"],
  LI: ["CH"],
  LU: ["BE", "DE", "FR"],
  SM: ["IT"],
};

export const countries = {
  IN: 88,
  CN: 33,
  RU: 79,
  MY: 2,
  GB: 100,
  FK: 10,
  AR: 50,
  VE: 90,
};

export const selectedColor = "#4CAF50"; // Zöld
export const neighbourColor = "#FFC107"; // Sárga

export const campaignTypes = [
  {
    label: "Children",
    value: 0,
  },
  {
    label: "General education",
    value: 1,
  },
  { label: "Social sensitivity", value: 2 },
];
