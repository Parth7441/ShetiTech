import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FarmerUser, Language } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  farmer: FarmerUser | null;
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  isProfileModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  login: (userData: {
    phone: string;
    name?: string;
    district?: string;
    taluka?: string;
    village?: string;
    landSizeAcres?: number;
    preferredLanguage?: Language;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<FarmerUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'shetitech_farmer_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [farmer, setFarmer] = useState<FarmerUser | null>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync with backend on initial load if logged in
  useEffect(() => {
    if (farmer?.phone) {
      api.getFarmer(farmer.phone).then((backendFarmer) => {
        if (backendFarmer) {
          const updated: FarmerUser = {
            id: backendFarmer.id,
            phone: backendFarmer.phone,
            name: backendFarmer.name || farmer.name,
            district: backendFarmer.district || farmer.district,
            taluka: backendFarmer.taluka || farmer.taluka,
            village: backendFarmer.village || farmer.village,
            landSizeAcres: backendFarmer.land_size_acres || farmer.landSizeAcres,
            preferredLanguage: (backendFarmer.preferred_language as Language) || farmer.preferredLanguage,
            isLoggedIn: true,
            registeredDate: backendFarmer.created_at || farmer.registeredDate
          };
          setFarmer(updated);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        }
      });
    }
  }, [farmer?.phone]);

  const login = async (userData: {
    phone: string;
    name?: string;
    district?: string;
    taluka?: string;
    village?: string;
    landSizeAcres?: number;
    preferredLanguage?: Language;
  }) => {
    const user: FarmerUser = {
      phone: userData.phone,
      name: userData.name || (userData.phone.endsWith('0') ? 'ज्ञानेश्वर पाटील' : 'शेतकरी मित्र'),
      district: userData.district || 'Pune',
      taluka: userData.taluka || 'Baramati',
      village: userData.village || '',
      landSizeAcres: userData.landSizeAcres ?? 3.0,
      preferredLanguage: userData.preferredLanguage || 'mr',
      isLoggedIn: true,
      registeredDate: new Date().toISOString()
    };

    setFarmer(user);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    setIsAuthModalOpen(false);

    // Sync to backend DB
    try {
      await api.syncFarmer({
        phone: user.phone,
        name: user.name,
        district: user.district,
        taluka: user.taluka,
        village: user.village,
        land_size_acres: user.landSizeAcres,
        preferred_language: user.preferredLanguage
      });
    } catch {
      // Offline fallback
    }
  };

  const logout = () => {
    setFarmer(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setIsProfileModalOpen(false);
  };

  const updateProfile = async (updates: Partial<FarmerUser>) => {
    if (!farmer) return;
    const updated = { ...farmer, ...updates };
    setFarmer(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    // Update in backend
    try {
      await api.updateFarmer(farmer.phone, {
        name: updated.name,
        district: updated.district,
        taluka: updated.taluka,
        village: updated.village,
        land_size_acres: updated.landSizeAcres,
        preferred_language: updated.preferredLanguage
      });
    } catch {
      // Offline fallback
    }
  };

  return (
    <AuthContext.Provider
      value={{
        farmer,
        isLoggedIn: !!farmer?.isLoggedIn,
        isAuthModalOpen,
        isProfileModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        openProfileModal: () => setIsProfileModalOpen(true),
        closeProfileModal: () => setIsProfileModalOpen(false),
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
