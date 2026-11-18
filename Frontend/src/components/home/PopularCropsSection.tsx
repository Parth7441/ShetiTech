import React, { useState, useMemo } from 'react';
import type { Crop, CropCategory } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import {
  Clock,
  Droplets,
  Layers,
  TrendingUp,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react';

interface PopularCropsSectionProps {
  crops: Crop[];
  onSelectCrop: (crop: Crop) => void;
  searchQuery?: string;
}

export const PopularCropsSection: React.FC<PopularCropsSectionProps> = ({
  crops,
  onSelectCrop,
  searchQuery = ''
}) => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = (searchQuery || localSearch).trim().toLowerCase();

  const categories: { key: CropCategory; label: string }[] = [
    { key: 'all', label: t('cropsSection.allFilter') },
    { key: 'cash', label: t('cropsSection.cashFilter') },
    { key: 'spices', label: t('cropsSection.spicesFilter') },
    { key: 'cereals', label: t('cropsSection.cerealsFilter') },
    { key: 'pulses', label: t('cropsSection.pulsesFilter') },
  ];

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      const matchesCategory =
        selectedCategory === 'all' || crop.category === selectedCategory;

      const matchesSearch =
        effectiveSearch === '' ||
        crop.name.mr.toLowerCase().includes(effectiveSearch) ||
        crop.name.en.toLowerCase().includes(effectiveSearch) ||
        crop.botanicalName.toLowerCase().includes(effectiveSearch) ||
        crop.soilType.mr.toLowerCase().includes(effectiveSearch) ||
        crop.soilType.en.toLowerCase().includes(effectiveSearch);

      return matchesCategory && matchesSearch;
    });
  }, [crops, selectedCategory, effectiveSearch]);

  return (
    <section id="crops" className="py-16 md:py-24 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="forest" className="mb-3">
            {t('cropsSection.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mb-3">
            {t('cropsSection.title')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            {t('cropsSection.subtitle')}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200/80">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted hidden sm:flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              {language === 'mr' ? 'वर्ग:' : 'Type:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-white text-charcoal hover:bg-forest-50 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Filter Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder={language === 'mr' ? 'पिकाचे नाव शोधा...' : 'Filter crops...'}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
            />
          </div>

        </div>

        {/* Crops Grid */}
        {filteredCrops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCrops.map((crop) => (
              <div
                key={crop.id}
                onClick={() => onSelectCrop(crop)}
                className="agri-card group flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-forest-900 shrink-0">
                    <img
                      src={crop.image}
                      alt={crop.name[language]}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="fresh" size="sm">
                        {crop.badge[language]}
                      </Badge>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h3 className="text-xl font-black text-forest-950 group-hover:text-forest-700 transition-colors">
                        {crop.name[language]}
                      </h3>
                      <p className="text-xs text-charcoal-muted italic truncate">
                        {crop.botanicalName}
                      </p>
                    </div>

                    <p className="text-xs text-charcoal-muted line-clamp-2 h-9 leading-relaxed mb-4">
                      {crop.description[language]}
                    </p>

                    {/* Quick Specs */}
                    <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-muted flex items-center gap-1.5 font-medium">
                          <Clock className="w-3.5 h-3.5 text-forest-700" />
                          {t('cropsSection.duration')}:
                        </span>
                        <span className="font-bold text-forest-900 truncate max-w-[140px]">
                          {crop.duration[language]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-muted flex items-center gap-1.5 font-medium">
                          <Droplets className="w-3.5 h-3.5 text-forest-700" />
                          {t('cropsSection.water')}:
                        </span>
                        <span className="font-bold text-forest-900 truncate max-w-[140px]">
                          {crop.waterRequirement[language]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-muted flex items-center gap-1.5 font-medium">
                          <Layers className="w-3.5 h-3.5 text-forest-700" />
                          {t('cropsSection.soil')}:
                        </span>
                        <span className="font-bold text-forest-900 truncate max-w-[140px]" title={crop.soilType[language]}>
                          {crop.soilType[language]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-muted flex items-center gap-1.5 font-medium">
                          <TrendingUp className="w-3.5 h-3.5 text-forest-700" />
                          {t('cropsSection.yield')}:
                        </span>
                        <span className="font-bold text-forest-900 truncate max-w-[140px]">
                          {crop.avgYield[language]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-5 pb-5 pt-1">
                  <button
                    type="button"
                    className="w-full py-2.5 px-3 bg-forest-50 group-hover:bg-forest-800 text-forest-800 group-hover:text-white font-bold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 border border-forest-200/60 group-hover:border-transparent shadow-xs"
                  >
                    <span>{t('cropsSection.viewDetails')}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8 max-w-lg mx-auto">
            <p className="text-charcoal-muted font-medium mb-3">
              {t('cropsSection.noResults')}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setLocalSearch('');
              }}
              className="px-4 py-2 bg-forest-800 text-white text-xs font-bold rounded-lg"
            >
              {language === 'mr' ? 'सर्व पिके दाखवा' : 'Show All Crops'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
