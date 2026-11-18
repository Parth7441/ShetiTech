import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Maximize2, ArrowRightLeft, Sparkles } from 'lucide-react';

type UnitType = 'guntha' | 'acre' | 'hectare' | 'bigha' | 'sqft';

export const LandAreaConverter: React.FC = () => {
  const { language } = useLanguage();
  const [value, setValue] = useState<number>(1);
  const [unit, setUnit] = useState<UnitType>('acre');

  // Convert everything to square feet as base
  const toSqFt: Record<UnitType, number> = {
    sqft: 1,
    guntha: 1089,
    bigha: 27225, // 25 gunthas standard
    acre: 43560,  // 40 gunthas
    hectare: 107639.1, // ~2.471 acres
  };

  const sqFtValue = (value || 0) * toSqFt[unit];

  const conversions = {
    guntha: (sqFtValue / toSqFt.guntha).toFixed(2),
    acre: (sqFtValue / toSqFt.acre).toFixed(3),
    hectare: (sqFtValue / toSqFt.hectare).toFixed(4),
    bigha: (sqFtValue / toSqFt.bigha).toFixed(2),
    sqft: Math.round(sqFtValue).toLocaleString('en-IN'),
  };

  const unitLabels: Record<UnitType, { mr: string; en: string }> = {
    guntha: { mr: 'गुंठा (Guntha)', en: 'Guntha' },
    acre: { mr: 'एकर (Acre)', en: 'Acre' },
    hectare: { mr: 'हेक्टर (Hectare)', en: 'Hectare' },
    bigha: { mr: 'बिघा (Bigha)', en: 'Bigha' },
    sqft: { mr: 'स्क्वेअर फूट (Sq. Ft)', en: 'Square Feet' },
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center">
          <Maximize2 className="w-6 h-6 text-forest-700" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-forest-900">
            {language === 'mr' ? 'जमीन क्षेत्र कनवर्टर' : 'Land Area Converter'}
          </h3>
          <p className="text-sm text-charcoal-muted">
            {language === 'mr'
              ? 'गुंठा, एकर, हेक्टर, बिघा आणि स्क्वेअर फूटचे अचूक रूपांतर'
              : 'Accurate instant conversions between regional land units'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'क्षेत्रफळ संख्या टाका' : 'Enter Land Area'}
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={value === 0 ? '' : value}
            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
            placeholder="1"
            className="w-full px-4 py-3 text-lg font-bold text-forest-950 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'एकक निवडा' : 'Select Unit'}
          </label>
          <div className="relative">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as UnitType)}
              className="w-full px-4 py-3 text-base font-semibold text-charcoal bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden appearance-none"
            >
              <option value="guntha">{unitLabels.guntha[language]}</option>
              <option value="acre">{unitLabels.acre[language]}</option>
              <option value="hectare">{unitLabels.hectare[language]}</option>
              <option value="bigha">{unitLabels.bigha[language]}</option>
              <option value="sqft">{unitLabels.sqft[language]}</option>
            </select>
            <ArrowRightLeft className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Result Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-forest-800">
          <Sparkles className="w-4 h-4 text-fresh" />
          <span>{language === 'mr' ? 'रूपांतरित क्षेत्रफळ:' : 'Converted Land Measurements:'}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className={`p-4 rounded-xl border transition-all ${unit === 'guntha' ? 'bg-forest-100/70 border-forest-400' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-xs text-charcoal-muted block font-medium">
              {language === 'mr' ? 'गुंठा' : 'Guntha'}
            </span>
            <span className="text-xl font-black text-forest-900 mt-1 block">
              {conversions.guntha}
            </span>
            <span className="text-[10px] text-gray-500">
              {language === 'mr' ? '१ गुंठा = १०८९ चौ.फू.' : '1 G = 1089 sq ft'}
            </span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${unit === 'acre' ? 'bg-forest-100/70 border-forest-400' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-xs text-charcoal-muted block font-medium">
              {language === 'mr' ? 'एकर' : 'Acre'}
            </span>
            <span className="text-xl font-black text-forest-900 mt-1 block">
              {conversions.acre}
            </span>
            <span className="text-[10px] text-gray-500">
              {language === 'mr' ? '१ एकर = ४० गुंठे' : '1 Acre = 40 Guntha'}
            </span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${unit === 'hectare' ? 'bg-forest-100/70 border-forest-400' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-xs text-charcoal-muted block font-medium">
              {language === 'mr' ? 'हेक्टर' : 'Hectare'}
            </span>
            <span className="text-xl font-black text-forest-900 mt-1 block">
              {conversions.hectare}
            </span>
            <span className="text-[10px] text-gray-500">
              {language === 'mr' ? '१ हेक्टर = २.४७ एकर' : '1 Ha = 2.47 Acre'}
            </span>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${unit === 'bigha' ? 'bg-forest-100/70 border-forest-400' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-xs text-charcoal-muted block font-medium">
              {language === 'mr' ? 'बिघा' : 'Bigha'}
            </span>
            <span className="text-xl font-black text-forest-900 mt-1 block">
              {conversions.bigha}
            </span>
            <span className="text-[10px] text-gray-500">
              {language === 'mr' ? '१ बिघा = २५ गुंठे' : '1 Bigha = 25 Guntha'}
            </span>
          </div>

          <div className={`col-span-2 sm:col-span-1 p-4 rounded-xl border transition-all ${unit === 'sqft' ? 'bg-forest-100/70 border-forest-400' : 'bg-gray-50 border-gray-100'}`}>
            <span className="text-xs text-charcoal-muted block font-medium">
              {language === 'mr' ? 'स्क्वेअर फूट' : 'Square Feet'}
            </span>
            <span className="text-lg font-black text-forest-900 mt-1 block truncate">
              {conversions.sqft}
            </span>
            <span className="text-[10px] text-gray-500">
              {language === 'mr' ? 'चौ. फूट (Sq.Ft)' : 'Square Feet'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
