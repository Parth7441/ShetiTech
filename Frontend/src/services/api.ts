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

  // Sync / Register Farmer Profile
  async syncFarmer(farmerData: {
    phone: string;
    name?: string;
    district?: string;
    taluka?: string;
    village?: string;
    land_size_acres?: number;
    preferred_language?: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(farmerData)
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Get Farmer Profile by Phone
  async getFarmer(phone: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers/${phone}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Update Farmer Profile
  async updateFarmer(phone: string, updates: Record<string, unknown>) {
    try {
      const res = await fetch(`${API_BASE_URL}/farmers/${phone}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Get Bookings
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/harvesters/bookings`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Submit Crop Inquiry / Ask Expert
  async submitInquiry(payload: {
    farmer_name: string;
    phone: string;
    crop_name: string;
    district?: string;
    question: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  // Get Inquiries (Optionally filter by phone)
  async getInquiries(phone?: string, crop?: string) {
    try {
      const params = new URLSearchParams();
      if (phone) params.append('phone', phone);
      if (crop && crop !== 'all') params.append('crop', crop);
      const res = await fetch(`${API_BASE_URL}/inquiries/?${params.toString()}`);
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // SMS Gateway OTP Services
  async sendOtp(phone: string): Promise<{
    status: string;
    message: string;
    phone: string;
    expires_in_seconds?: number;
    debug_otp?: string;
  }> {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to dispatch OTP via SMS Gateway');
    }
    return await res.json();
  },

  async verifyOtp(phone: string, otp: string): Promise<{
    status: string;
    verified: boolean;
    message: string;
    is_new_user: boolean;
    farmer?: {
      phone: string;
      name?: string;
      district?: string;
      taluka?: string;
      village?: string;
      land_size_acres?: number;
      preferred_language?: string;
    } | null;
  }> {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, otp })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Invalid or expired OTP code');
    }
    return await res.json();
  }
};
