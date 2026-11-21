export type Language = 'mr' | 'en';

export type CropCategory = 'all' | 'cash' | 'spices' | 'cereals' | 'pulses';
export type SeasonType = 'kharif' | 'rabi' | 'summer' | 'annual';

export interface LocalizedString {
  en: string;
  mr: string;
}

export interface Crop {
  id: string;
  name: LocalizedString;
  botanicalName: string;
  category: CropCategory;
  season: SeasonType;
  duration: LocalizedString;
  waterRequirement: LocalizedString;
  soilType: LocalizedString;
  avgYield: LocalizedString;
  description: LocalizedString;
  sowingPeriod: LocalizedString;
  fertilizerInfo: LocalizedString;
  pestControl: LocalizedString;
  profitEstimate: LocalizedString;
  image: string;
  badge: LocalizedString;
}

export type ToolId = 'fertilizer' | 'land-area' | 'crop-cost' | 'crop-profit' | 'seed';

export interface AgriTool {
  id: ToolId;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  iconName: string;
  badge: LocalizedString;
  path: string;
  isReady: boolean;
}

export interface WeatherDay {
  day: LocalizedString;
  temp: number;
  condition: LocalizedString;
  rainProb: number;
  icon: 'sun' | 'cloud' | 'rain' | 'cloud-rain';
}

export interface DistrictWeather {
  id: string;
  districtName: LocalizedString;
  currentTemp: number;
  tempRange: { min: number; max: number };
  condition: LocalizedString;
  humidity: number;
  rainfallChance: number;
  windSpeed: number;
  advisory: LocalizedString;
  forecast: WeatherDay[];
}

export interface MandiRate {
  id: string;
  cropName: LocalizedString;
  variety: LocalizedString;
  market: LocalizedString;
  district: LocalizedString;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: LocalizedString;
  trend: 'up' | 'down' | 'stable';
  trendAmount: number;
  date: string;
}

export interface FarmingGuide {
  id: string;
  title: LocalizedString;
  category: LocalizedString;
  readTime: LocalizedString;
  summary: LocalizedString;
  content: {
    mr: string[];
    en: string[];
  };
  keyTips: {
    mr: string[];
    en: string[];
  };
  author: LocalizedString;
  tag: LocalizedString;
}

export interface FarmerUser {
  id?: number;
  phone: string;
  name: string;
  district: string;
  taluka: string;
  village: string;
  landSizeAcres: number;
  preferredLanguage: Language;
  isLoggedIn: boolean;
  registeredDate?: string;
}
