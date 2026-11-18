import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Search,
  ArrowRight,
  Sprout,
  Calculator,
  ShieldCheck,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import type { Crop } from '../../types';

interface HeroSectionProps {
  onSearchCrop: (query: string) => void;
  onExploreCrops: () => void;
  onExploreTools: () => void;
  allCrops: Crop[];
  onSelectCrop: (crop: Crop) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchCrop,
  onExploreCrops,
  onExploreTools,
  allCrops,
  onSelectCrop
}) => {
  const { t, language } = useLanguage();
  const [searchInput, setSearchInput] = useState('');
  const [suggestions, setSuggestions] = useState<Crop[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    onSearchCrop(val);

    if (val.trim().length > 0) {
      const filtered = allCrops.filter(
        (c) =>
          c.name.mr.toLowerCase().includes(val.toLowerCase()) ||
          c.name.en.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (crop: Crop) => {
    setSearchInput(crop.name[language]);
    setSuggestions([]);
    onSelectCrop(crop);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchCrop(searchInput);
    setSuggestions([]);
    onExploreCrops();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-50/70 via-[#F8FAF7] to-[#F8FAF7] py-12 md:py-20 border-b border-forest-100">
      {/* Decorative background grid & blur shapes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#166534_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-fresh/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-forest-800/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Search */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-forest-200 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-fresh" />
              <span className="text-xs md:text-sm font-bold text-forest-900">
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Headline in Marathi & English */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-forest-950 leading-tight">
                {t('hero.titlePrefix')}{' '}
                <span className="text-forest-700 underline decoration-fresh decoration-4 underline-offset-8">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-forest-800/90 tracking-wide">
                {language === 'mr' ? 'Smart Farming, Better Future.' : 'शेती स्मार्ट, भविष्य समृद्ध!'}
              </p>
            </div>

            {/* Short Platform Introduction */}
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('hero.description')}
            </p>

            {/* Search Crops Input with Autocomplete */}
            <div className="relative max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <div className="absolute left-4 pointer-events-none text-forest-800">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleInputChange}
                  placeholder={t('hero.searchPlaceholder')}
                  className="w-full pl-12 pr-28 py-4 text-base font-medium rounded-2xl bg-white border-2 border-forest-200 text-charcoal-dark placeholder-gray-400 focus:outline-hidden focus:border-forest-700 shadow-card transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm shadow-sm transition-all"
                >
                  {t('hero.searchBtn')}
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-forest-100 p-2 z-30 divide-y divide-gray-50">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-charcoal-muted uppercase">
                    {language === 'mr' ? 'सुचवलेली पिके:' : 'Suggested Crops:'}
                  </div>
                  {suggestions.map((crop) => (
                    <button
                      key={crop.id}
                      onClick={() => handleSelectSuggestion(crop)}
                      className="w-full text-left px-3 py-2.5 hover:bg-forest-50 rounded-xl flex items-center justify-between text-sm transition-colors group"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={crop.image}
                          alt={crop.name[language]}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <span className="font-bold text-forest-900 group-hover:text-forest-700">
                            {crop.name[language]}
                          </span>
                          <span className="text-xs text-charcoal-muted ml-2">
                            ({crop.botanicalName})
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-fresh-dark">
                        {crop.badge[language]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Action Buttons (Stable: no jumping on hover) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreCrops}
                className="px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-base shadow-sm hover:shadow-md transition-colors flex items-center gap-2"
              >
                <Sprout className="w-5 h-5 text-fresh shrink-0" />
                <span>{t('hero.exploreCrops')}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={onExploreTools}
                className="px-6 py-3.5 bg-white hover:bg-forest-50 text-forest-900 font-bold rounded-xl text-base border-2 border-forest-200 shadow-xs hover:border-forest-600 transition-colors flex items-center gap-2"
              >
                <Calculator className="w-5 h-5 text-forest-700 shrink-0" />
                <span>{t('hero.exploreTools')}</span>
              </button>
            </div>

            {/* Quick Farmer Trust Metrics (Fixed min-height to prevent language shift) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-forest-100/80 min-h-[44px]">
              <div className="flex items-center gap-2 text-xs font-bold text-forest-900">
                <CheckCircle className="w-4 h-4 text-fresh shrink-0" />
                <span className="truncate">{t('hero.stats.cropsCount')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest-900">
                <CheckCircle className="w-4 h-4 text-fresh shrink-0" />
                <span className="truncate">{t('hero.stats.toolsCount')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest-900">
                <CheckCircle className="w-4 h-4 text-fresh shrink-0" />
                <span className="truncate">{t('hero.stats.langSupport')}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-forest-900">
                <CheckCircle className="w-4 h-4 text-fresh shrink-0" />
                <span className="truncate">{t('hero.stats.farmerFocus')}</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Agriculture in Maharashtra"
                  className="w-full h-96 sm:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-fresh" />
                    <span className="text-xs font-bold uppercase tracking-wider text-fresh">
                      {language === 'mr' ? 'आधुनिक कृषी तंत्रज्ञान' : 'Precision Agro Tech'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    {language === 'mr' ? 'बळीराजाच्या प्रगतीचा नवा मार्ग' : 'Empowering Maharashtra’s Farmers'}
                  </h3>
                  <p className="text-xs text-gray-200 mt-1">
                    {language === 'mr'
                      ? 'माती परीक्षण ते काढणी, प्रत्येक टप्प्यावर शास्त्रोक्त सहाय्य.'
                      : 'Scientific agronomy guidance from sowing to harvest.'}
                  </p>
                </div>
              </div>

              {/* Static Feature Pill 1 (Stable: inside card, no negative margins, no bouncing) */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-forest-100/90 flex items-center gap-2.5 max-w-[220px] hidden sm:flex">
                <div className="w-9 h-9 rounded-lg bg-forest-100 text-forest-800 flex items-center justify-center shrink-0">
                  <Sprout className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-charcoal-muted block">
                    {language === 'mr' ? 'शेती यश' : 'Farm Economics'}
                  </span>
                  <span className="text-xs font-extrabold text-forest-900 block truncate">
                    {language === 'mr' ? 'कमी खर्च, जास्त नफा' : 'High Yields & Profits'}
                  </span>
                </div>
              </div>

              {/* Static Feature Pill 2: 100% Free Tools (Stable: top right inside card) */}
              <div className="absolute top-4 right-4 bg-forest-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-md border border-forest-700/80 flex items-center gap-1.5 hidden sm:flex">
                <ShieldCheck className="w-4 h-4 text-fresh" />
                <span className="text-xs font-bold">
                  {language === 'mr' ? '१००% मोफत साधने' : '100% Free Tools'}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
