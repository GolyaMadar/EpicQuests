export const cities = [
  { name: "MAROS", latLng: [46.54245, 24.55747] },
  { name: "BUCHAREST", latLng: [44.439663, 26.096306] },
  { name: "BUDAPEST", latLng: [47.497913, 19.040236] },
  { name: "BERLIN", latLng: [52.520008, 13.404954] },
  { name: "ROME", latLng: [41.902782, 12.496366] },
  { name: "PARIS", latLng: [48.864716, 2.349014] },
];

export const neighbours = {
  RO: ["HU", "UA", "MD", "BG", "RS"],
  HU: ["RO", "SK", "UA", "AT", "SI", "HR", "RS"],
  MD: ["RO", "UA"],
  BG: ["RO", "GR", "TR", "MK", "RS"],
  SK: ["HU", "AT", "CZ", "PL", "UA"],
  UA: ["HU", "RO", "MD", "BY", "PL", "SK", "RU"],
  AT: ["HU", "SK", "CZ", "DE", "CH", "IT", "SI"],
  SI: ["AT", "IT", "HR", "HU"],
  HR: ["SI", "HU", "RS", "BA"],
  RS: ["HU", "HR", "BA", "BG", "ME", "RO", "XK"],
  FR: ["UK", "BE", "DE", "CH", "IT", "ES"],
  BE: ["UK", "FR", "NL", "DE", "LU"],
  NL: ["UK", "BE", "DE"],
  DE: ["UK", "FR", "NL", "BE", "CH", "AT", "CZ", "PL", "DK", "LU"],
  RU: ["NO", "FI", "EE", "LV", "LT", "BY", "UA", "GE", "KZ", "MN", "CN", "PL"],
  GR: ["BG", "TR", "AL", "MK"],
  TR: ["BG", "GR", "IR", "IQ", "SY", "GE", "AM", "AZ"],
  MK: ["BG", "AL", "RS", "GR", "XK"],
  PL: ["DE", "CZ", "SK", "UA", "BY", "LT", "RU"],
  CZ: ["DE", "AT", "SK", "PL"],
  IT: ["FR", "CH", "AT", "SI"],
  ES: ["FR", "PT", "AD"],
  CH: ["DE", "AT", "IT", "FR", "LI"],
  LI: ["CH", "AT"],
  LU: ["BE", "DE", "FR"],
  SM: ["IT"],
  XK: ["RS", "ME", "AL", "MK"],
  ME: ["XK", "BA", "AL", "RS"],
  BA: ["ME", "RS", "HR"],
  AL: ["ME", "MK", "GR", "XK"],
  GB: ["IE"],
  IE: ["GB"],
  NO: ["SE"],
  SE: ["NO", "FI"],
  FI: ["SE"],
  DK: ["DE"],
  AD: ["ES"],
  BY: ["RU", "UA", "LT", "LV", "PL"],
  LV: ["EE", "LT", "BY"],
  EE: ["LV", "RU"],
  LT: ["LV", "BY", "PL", "RU"],
  IS: [],
  FO: [],
};

export const selectedColor = ["#4CBF50", "#4CAF50"]; // Zöld
export const neighbourColor = ["#FBD700", "#FFD700"]; // Sárga

export const campaignTypes = [
  {
    label: "Children",
    value: 0,
  },
  {
    label: "General education",
    value: 1,
  },
  {
    label: "Social sensitivity",
    value: 2,
  },
];
