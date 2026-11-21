import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import {
  Menu,
  X,
  Home,
  Calendar,
  Tractor,
  FlaskConical,
  BarChart3,
  Users,
  Building,
  Calculator,
  CloudSun,
  ChevronDown,
  Layers,
  Sparkles,
  User,
  Stethoscope
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const { t, language } = useLanguage();
  const { farmer, isLoggedIn, openAuthModal, openProfileModal } = useAuth();
  const location = useLocation();

  // Primary desktop navigation links (concise labels to prevent any overflow on laptops)
  const mainLinks = [
    {
      name: language === 'mr' ? 'मुख्यपृष्ठ' : 'Home',
      path: '/',
      icon: Home
    },
    {
      name: language === 'mr' ? 'हंगाम पिके' : 'Season Crops',
      path: '/season-crops',
      icon: Calendar
    },
    {
      name: language === 'mr' ? 'हार्वेस्टर' : 'Harvesters',
      path: '/harvesters',
      icon: Tractor
    },
    {
      name: language === 'mr' ? 'खत माहिती' : 'Fertilizers',
      path: '/fertilizers',
      icon: FlaskConical
    },
    {
      name: language === 'mr' ? 'बाजार आढावा' : 'Market',
      path: '/market-overview',
      icon: BarChart3
    },
    {
      name: language === 'mr' ? 'व्यापारी' : 'Traders',
      path: '/buyers-traders',
      icon: Users
    },
    {
      name: language === 'mr' ? 'सबसिडी' : 'Subsidies',
      path: '/subsidies',
      icon: Building
    },
    {
      name: language === 'mr' ? 'शेती गणक' : 'Calculators',
      path: '/calculators',
      icon: Calculator
    },
  ];

  // Secondary links in "अधिक (More)" dropdown
  const moreLinks = [
    {
      name: language === 'mr' ? 'पीक डॉक्टर' : 'Crop Doctor',
      path: '/crop-doctor',
      icon: Stethoscope,
      desc: language === 'mr' ? 'किड-रोग निदान व फवारणी सल्ला' : 'Pest/Disease Diagnosis & Advisory'
    },
    {
      name: language === 'mr' ? 'हवामान अंदाज' : 'Weather Forecast',
      path: '/weather',
      icon: CloudSun,
      desc: language === 'mr' ? 'जिल्हावार कृषी हवामान' : 'District Agro Weather'
    },
    {
      name: language === 'mr' ? 'पिके व्यवस्थापन' : 'Crop Management',
      path: '/crops',
      icon: Layers,
      desc: language === 'mr' ? '८ प्रमुख पिकांचे संपूर्ण मार्गदर्शन' : '8 Major Crop Guides'
    },
  ];

  const allNavLinks = [...mainLinks, ...moreLinks];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isMoreActive = moreLinks.some(link => isActive(link.path));

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-[0_2px_12px_rgba(22,101,52,0.05)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full gap-2 lg:gap-4">
          
          {/* 1. Logo on the Far Left (shrink-0 ensures it never moves or shrinks) */}
          <Link
            to="/"
            className="flex items-center group focus:outline-hidden focus:ring-2 focus:ring-forest-600 rounded-2xl shrink-0 py-1"
            aria-label="ShetiTech Home"
          >
            <Logo variant="navbar" size="md" />
          </Link>

          {/* 2. Desktop Navigation Menu (XL and 2XL screens) */}
          <nav className="hidden xl:flex items-center gap-1 shrink">
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-2.5 2xl:px-3 py-2 rounded-xl text-xs 2xl:text-sm font-bold transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-forest-800 text-white shadow-xs ring-1 ring-forest-700'
                      : 'text-charcoal hover:text-forest-950 hover:bg-forest-50/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-fresh' : 'text-forest-700'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            {/* "More / अधिक" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 220)}
                className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs 2xl:text-sm font-bold transition-colors whitespace-nowrap ${
                  isMoreActive
                    ? 'bg-forest-800 text-white shadow-xs ring-1 ring-forest-700'
                    : 'text-charcoal hover:text-forest-950 hover:bg-forest-50/80'
                }`}
                aria-expanded={moreDropdownOpen}
              >
                <span>{language === 'mr' ? 'अधिक' : 'More'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-forest-100 p-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-charcoal-muted uppercase tracking-wider border-b border-gray-100 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-fresh" />
                    <span>{language === 'mr' ? 'इतर शेती साधने' : 'Additional Features'}</span>
                  </div>
                  {moreLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMoreDropdownOpen(false)}
                        className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          active
                            ? 'bg-forest-50 text-forest-900 font-extrabold'
                            : 'text-charcoal hover:bg-forest-50/70'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-forest-800" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{link.name}</span>
                          <span className="text-[10px] text-charcoal-muted block">{link.desc}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Medium Desktop Compact Navigation (lg screens: 1024px to 1279px) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 shrink">
            <Link
              to="/season-crops"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'पिके' : 'Crops'}
            </Link>
            <Link
              to="/harvesters"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'हार्वेस्टर' : 'Harvesters'}
            </Link>
            <Link
              to="/fertilizers"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'खते' : 'Fertilizers'}
            </Link>
            <Link
              to="/market-overview"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'बाजार' : 'Market'}
            </Link>
            <Link
              to="/buyers-traders"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'व्यापारी' : 'Traders'}
            </Link>
            <Link
              to="/subsidies"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'सबसिडी' : 'Subsidies'}
            </Link>
            <Link
              to="/calculators"
              className="px-2 py-1.5 text-xs font-bold text-charcoal hover:bg-forest-50 rounded-lg whitespace-nowrap"
            >
              {language === 'mr' ? 'गणक' : 'Calculators'}
            </Link>
          </nav>

          {/* 3. Right Action Area: Login/Profile + Language Switcher (shrink-0 guaranteed within navbar) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Farmer Auth Button */}
            {isLoggedIn ? (
              <button
                onClick={openProfileModal}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-forest-50 hover:bg-forest-100 text-forest-950 border border-forest-200 shadow-2xs transition-all whitespace-nowrap"
                title={language === 'mr' ? 'शेतकरी प्रोफाईल उघडा' : 'Open Farmer Profile'}
              >
                <span className="w-6 h-6 rounded-lg bg-forest-800 text-white flex items-center justify-center text-xs font-black">
                  {farmer?.name ? farmer.name[0] : '👨‍🌾'}
                </span>
                <span className="hidden sm:inline-block max-w-[85px] truncate font-semibold">
                  {farmer?.name}
                </span>
              </button>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-forest-800 hover:bg-forest-900 text-white shadow-xs transition-all whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-fresh" />
                <span>{language === 'mr' ? 'लॉगिन' : 'Login'}</span>
              </button>
            )}

            <LanguageSwitcher variant="header" />

            {/* Mobile Hamburger Toggle (hidden on desktop lg+) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-forest-900 hover:bg-forest-50 border border-forest-200/80 transition-colors lg:hidden focus:outline-hidden focus:ring-2 focus:ring-forest-600 shrink-0"
              aria-label={mobileMenuOpen ? t('nav.close') : t('nav.menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Strictly positioned overlay directly under 80px navbar) */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 w-full border-b border-forest-100 bg-white px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Mobile Auth Button */}
          <div className="mb-3 pb-3 border-b border-gray-100">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProfileModal();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-forest-50 border border-forest-200 text-left font-bold text-xs text-forest-950"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-forest-800 text-white flex items-center justify-center text-xs font-black">
                    {farmer?.name ? farmer.name[0] : '👨‍🌾'}
                  </span>
                  <div>
                    <span className="block">{farmer?.name}</span>
                    <span className="text-[10px] text-charcoal-muted font-normal">+91 {farmer?.phone}</span>
                  </div>
                </div>
                <span className="text-forest-700 text-xs font-bold">{language === 'mr' ? 'प्रोफाईल पहा →' : 'View Profile →'}</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal();
                }}
                className="w-full py-2.5 bg-forest-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <User className="w-4 h-4 text-fresh" />
                <span>{language === 'mr' ? 'शेतकरी लॉगिन / नोंदणी करा' : 'Farmer Login / Register'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {allNavLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    active
                      ? 'bg-forest-800 text-white font-extrabold shadow-xs ring-1 ring-forest-700'
                      : 'text-charcoal hover:bg-forest-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-fresh' : 'text-forest-700'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs font-semibold text-charcoal-muted mb-2 px-1">
              {language === 'mr' ? 'भाषा निवडा:' : 'Select Language:'}
            </p>
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      )}
    </header>
  );
};
