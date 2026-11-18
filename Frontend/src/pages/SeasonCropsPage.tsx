import React, { useState } from 'react';
import { seasonCropsData } from '../data/seasonCropsData';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from '../components/common/Badge';
import {
  Calendar,
  CloudRain,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const SeasonCropsPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeSeason, setActiveSeason] = useState<'kharif' | 'rabi' | 'summer' | 'annual'>('kharif');

  const currentSeason =
    seasonCropsData.find((s) => s.id === activeSeason) || seasonCropsData[0];

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'हंगामनिहाय शेती नियोजन' : 'Seasonal Agronomy Planning'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'हंगामनिहाय पिके व पेरणी वेळापत्रक' : 'Season-wise Crops & Sowing Calendar'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'खरीप (पावसाळी), रब्बी (हिवाळी), उन्हाळी आणि बारमाही पिकांचे योग्य नियोजन, वाण, पेरणी कालावधी आणि व्यवस्थापन.'
                : 'Comprehensive seasonal guidelines across Kharif, Rabi, Summer, and Annual crop cycles in Maharashtra.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <Sparkles className="w-8 h-8 text-fresh" />
          </div>
        </div>

        {/* Season Selection Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {seasonCropsData.map((s) => {
            const isActive = activeSeason === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isActive
                    ? 'bg-forest-800 text-white border-forest-800 shadow-md ring-2 ring-forest-600/30'
                    : 'bg-white text-charcoal border-gray-200 hover:border-forest-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-forest-200' : 'text-charcoal-muted'}`}>
                    {s.period[language].split('(')[0]}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-fresh" />}
                </div>
                <h3 className={`text-base font-bold ${isActive ? 'text-white' : 'text-forest-950'}`}>
                  {s.name[language].split('(')[0]}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Current Season Summary Card */}
        {currentSeason && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-card mb-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <Badge variant="forest" className="mb-2">
                  {currentSeason.period[language]}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-forest-950">
                  {currentSeason.name[language]}
                </h2>
                <p className="text-sm text-charcoal-muted mt-1 max-w-3xl">
                  {currentSeason.description[language]}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 text-xs bg-[#F8FAF7] p-4 rounded-2xl border border-gray-100 shrink-0">
                <div>
                  <span className="text-charcoal-muted flex items-center gap-1 font-semibold mb-0.5">
                    <CloudRain className="w-3.5 h-3.5 text-blue-600" />
                    {language === 'mr' ? 'पावसाची गरज:' : 'Rainfall:'}
                  </span>
                  <strong className="text-forest-950">{currentSeason.rainfallNeed[language]}</strong>
                </div>
                <div className="sm:border-l sm:border-gray-200 sm:pl-3">
                  <span className="text-charcoal-muted flex items-center gap-1 font-semibold mb-0.5">
                    <Layers className="w-3.5 h-3.5 text-soil-700" />
                    {language === 'mr' ? 'जमिनीचा प्रकार:' : 'Soil Type:'}
                  </span>
                  <strong className="text-forest-950">{currentSeason.soilSuitability[language]}</strong>
                </div>
              </div>
            </div>

            {/* Crops Under This Season */}
            <div>
              <h3 className="text-lg font-bold text-forest-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-fresh" />
                <span>{language === 'mr' ? 'या हंगामातील प्रमुख पिके व व्यवस्थापन:' : 'Key Crops in This Season:'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSeason.crops.map((crop, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#F8FAF7] border border-gray-200/80 hover:border-forest-300 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <h4 className="text-lg font-black text-forest-950">
                        {crop.name[language]}
                      </h4>
                      <Badge variant="fresh" size="sm">
                        {crop.avgYield[language]}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                        <span className="text-charcoal-muted block font-semibold mb-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-forest-700" />
                          {language === 'mr' ? 'पेरणी वेळ:' : 'Sowing Window:'}
                        </span>
                        <strong className="text-forest-900">{crop.sowingWindow[language]}</strong>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-gray-100">
                        <span className="text-charcoal-muted block font-semibold mb-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-forest-700" />
                          {language === 'mr' ? 'कालावधी:' : 'Duration:'}
                        </span>
                        <strong className="text-forest-900">{crop.duration[language]}</strong>
                      </div>
                    </div>

                    <div className="text-xs">
                      <span className="text-charcoal-muted font-bold block mb-0.5">
                        {language === 'mr' ? 'शिफारस केलेले उत्तम वाण:' : 'Best Cultivars / Varieties:'}
                      </span>
                      <p className="text-forest-950 font-medium">{crop.bestVarieties[language]}</p>
                    </div>

                    <div className="p-3 bg-forest-50/70 rounded-xl border border-forest-100 text-xs text-charcoal">
                      <span className="font-bold text-forest-900 flex items-center gap-1 mb-0.5">
                        <Info className="w-3.5 h-3.5 text-forest-700" />
                        {language === 'mr' ? 'महत्त्वाची टीप:' : 'Agronomy Tip:'}
                      </span>
                      <p className="leading-relaxed">{crop.tip[language]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-charcoal-muted">
                {language === 'mr'
                  ? 'सर्व पिकांची संपूर्ण माहिती आणि खत वेळापत्रक पाहण्यासाठी पिके सूची पहा.'
                  : 'Explore individual crop guides for complete NPK fertilizer schedules.'}
              </span>
              <Link
                to="/crops"
                className="px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs shrink-0"
              >
                <span>{language === 'mr' ? 'संपूर्ण पीक भांडार पहा' : 'View All Crops'}</span>
                <ArrowRight className="w-4 h-4 text-fresh" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
