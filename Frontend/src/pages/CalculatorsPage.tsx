import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation } from 'react-router-dom';
import { LandAreaConverter } from '../components/calculators/LandAreaConverter';
import { FertilizerCalculator } from '../components/calculators/FertilizerCalculator';
import { SeedCalculator } from '../components/calculators/SeedCalculator';
import { ProfitCalculator } from '../components/calculators/ProfitCalculator';
import {
  Maximize2,
  FlaskConical,
  Sprout,
  TrendingUp,
  Calculator,
  Sparkles
} from 'lucide-react';

export const CalculatorsPage: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'land-area' | 'fertilizer' | 'seed' | 'crop-profit'>('land-area');

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'fertilizer' || hash === 'land-area' || hash === 'seed' || hash === 'crop-profit' || hash === 'crop-cost') {
      setActiveTab(hash === 'crop-cost' ? 'crop-profit' : (hash as any));
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  const tabs = [
    {
      id: 'land-area',
      name: language === 'mr' ? 'जमीन क्षेत्र कनवर्टर' : 'Land Area Converter',
      icon: Maximize2,
    },
    {
      id: 'fertilizer',
      name: language === 'mr' ? 'खत व्यवस्थापन गणक' : 'Fertilizer Calculator',
      icon: FlaskConical,
    },
    {
      id: 'seed',
      name: language === 'mr' ? 'बियाणे प्रमाण गणक' : 'Seed Calculator',
      icon: Sprout,
    },
    {
      id: 'crop-profit',
      name: language === 'mr' ? 'पीक खर्च व नफा गणक' : 'Cost & Profit Calculator',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'डिजिटल शेती साधने' : 'Smart Farm Calculators'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'स्मार्ट शेती गणक केंद्र' : 'Agricultural Calculation Hub'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'जमिनीचे अचूक क्षेत्रफळ मोजा, पिकासाठी लागणाऱ्या खतांच्या बॅगा काढा, बियाण्याचे प्रमाण ठरवा आणि नफ्याचा हिशोब करा.'
                : 'Accurate instant calculations for land area conversions, NPK fertilizer bag dosages, seed rates, and cultivation economics.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <Sparkles className="w-8 h-8 text-fresh" />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[160px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  isActive
                    ? 'bg-forest-800 text-white shadow-md'
                    : 'text-charcoal hover:bg-forest-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-fresh' : 'text-forest-700'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Calculator Component View */}
        <div className="mb-12">
          {activeTab === 'land-area' && (
            <div id="land-area">
              <LandAreaConverter />
            </div>
          )}
          {activeTab === 'fertilizer' && (
            <div id="fertilizer">
              <FertilizerCalculator />
            </div>
          )}
          {activeTab === 'seed' && (
            <div id="seed">
              <SeedCalculator />
            </div>
          )}
          {activeTab === 'crop-profit' && (
            <div id="crop-profit">
              <ProfitCalculator />
            </div>
          )}
        </div>

        {/* All Calculators in Stack for easy scrolling & reference */}
        <div className="pt-8 border-t border-gray-200 space-y-10">
          <div className="text-center">
            <h2 className="text-2xl font-black text-forest-950">
              {language === 'mr' ? 'सर्व गणके एका दृष्टीक्षेपात' : 'All Calculators Overview'}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              {language === 'mr' ? 'खाली स्क्रोल करून सर्व गणके वापरू शकता' : 'Scroll down to access any calculator directly'}
            </p>
          </div>

          <div className="space-y-8">
            <LandAreaConverter />
            <FertilizerCalculator />
            <SeedCalculator />
            <ProfitCalculator />
          </div>
        </div>

      </div>
    </div>
  );
};
