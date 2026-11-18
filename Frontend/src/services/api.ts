// ShetiTech Backend API Service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    rain_probability: number;
    condition: string;
    condition_mr: string;
    icon: string;
  };
  forecast: Array<{
    day: string;
    day_mr: string;
    max_temp: number;
    min_temp: number;
    rain_probability: number;
    condition: string;
    condition_mr: string;
  }>;
  agri_advisory: {
    spray_recommended: boolean;
    irrigation_needed: boolean;
    advisory_mr: string;
    advisory_en: string;
  };
}

export interface MandiRateItem {
  id: number;
  crop_name_mr: string;
  crop_name_en: string;
  market: string;
  district: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  updated_date: string;
}

export interface HarvesterItem {
  id: number;
  owner_name: string;
  phone: string;
  machine_type: string;
  capacity?: string;
  rate_per_hour: number;
  district: string;
  taluka?: string;
  is_available: boolean;
}

export const api = {
  // Weather
  async getWeather(district = 'pune'): Promise<WeatherData | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/weather/?district=${district}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Mandi Rates
  async getMandiRates(district?: string, search?: string): Promise<MandiRateItem[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'all') params.append('district', district);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE_URL}/mandi/?${params.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Agmarknet Live Sync
  async getMandiSyncStatus() {
    try {
      const res = await fetch(`${API_BASE_URL}/mandi/sync/status`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async triggerMandiSync(district?: string) {
    try {
      const url = district ? `${API_BASE_URL}/mandi/sync?district=${district}` : `${API_BASE_URL}/mandi/sync`;
      const res = await fetch(url, { method: 'POST' });
      return await res.json();
    } catch (err) {
      return { status: 'error', message: 'Failed to connect to backend sync service' };
    }
  },

  // Harvesters
  async getHarvesters(district?: string): Promise<HarvesterItem[]> {
    try {
      const params = new URLSearchParams();
      if (district && district !== 'all') params.append('district', district);

      const res = await fetch(`${API_BASE_URL}/harvesters/?${params.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Book a Harvester
  async bookHarvester(payload: {
    harvester_id: number;
    farmer_name: string;
    phone: string;
    village: string;
    acres: number;
    requested_date: string;
    notes?: string;
  }) {
    const res = await fetch(`${API_BASE_URL}/harvesters/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Booking failed');
    return await res.json();
  },

  // Sync Farmer Profile (Firebase Phone OTP linkage)
  async syncFarmer(phone: string, name?: string, district?: string, preferred_language = 'mr') {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name, district, preferred_language })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
