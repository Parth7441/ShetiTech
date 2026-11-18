import React, { useState } from 'react';
import { fertilizerGuideData } from '../data/fertilizerGuideData';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from '../components/common/Badge';
import {
  FlaskConical,
  Sparkles,
  AlertCircle,
  Clock,
  ArrowRight,
  Calculator,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FertilizersPage: React.FC = () => {
  const { language } = useLanguage();
  const [filterCategory, setFilterCategory] = useState<'all' | 'primary' | 'soluble'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFertilizers = fertilizerGuideData.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.mr.toLowerCase().includes(q) ||
      item.name.en.toLowerCase().includes(q) ||
      item.npkRatio.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'संतुलित खत व्यवस्थापन' : 'Integrated Nutrient Management'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'खत माहिती, NPK मात्रा व नियोजन' : 'Fertilizer Information & NPK Schedule'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'युरिया, डीएपी, पोटॅश, १९:१९:१९, ०:५२:३४ आणि १३:००:४५ खतांचे कार्य, अचूक डोस, देण्याची योग्य वेळ आणि घ्यावयाची काळजी.'
                : 'Comprehensive guide covering primary NPK fertilizers, water-soluble fertigation grades, stage-wise dosage, and precautions.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/calculators#fertilizer"
              className="px-5 py-3 bg-fresh hover:bg-fresh-light text-forest-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-forest-950" />
              <span>{language === 'mr' ? 'खत गणक वापरा' : 'Open Fertilizer Calculator'}</span>
            </Link>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setFilterCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterCategory === 'all'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-white text-charcoal border border-gray-200'
              }`}
            >
              {language === 'mr' ? 'सर्व खते' : 'All Fertilizers'}
            </button>
            <button
              onClick={() => setFilterCategory('primary')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterCategory === 'primary'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-white text-charcoal border border-gray-200'
              }`}
            >
              {language === 'mr' ? 'दाणेदार खते (Urea/DAP/MOP)' : 'Granular (Urea/DAP/MOP)'}
            </button>
            <button
              onClick={() => setFilterCategory('soluble')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                filterCategory === 'soluble'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'bg-white text-charcoal border border-gray-200'
              }`}
            >
              {language === 'mr' ? 'विद्राव्य खते (19:19:19 / 0:52:34)' : 'Water-Soluble (19:19:19 etc)'}
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'खताचे नाव शोधा...' : 'Search fertilizer...'}
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Fertilizers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredFertilizers.map((item) => (
            <div
              key={item.id}
              className="agri-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-black text-forest-950">
                      {item.name[language]}
                    </h3>
                    <span className="text-xs font-bold text-fresh-dark">
                      {item.npkRatio}
                    </span>
                  </div>
                  <Badge variant={item.category === 'soluble' ? 'fresh' : 'forest'} size="sm">
                    {item.category === 'soluble' ? (language === 'mr' ? 'विद्राव्य' : 'Soluble') : (language === 'mr' ? 'दाणेदार' : 'Granular')}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                  {item.role[language]}
                </p>

                <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
                  <div className="bg-[#F8FAF7] p-2.5 rounded-xl border border-gray-100">
                    <span className="text-charcoal-muted font-bold block mb-0.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-forest-700" />
                      {language === 'mr' ? 'देण्याची सर्वोत्तम वेळ:' : 'Optimal Timing:'}
                    </span>
                    <span className="font-semibold text-forest-950">{item.bestStage[language]}</span>
                  </div>

                  <div className="bg-forest-50/60 p-2.5 rounded-xl border border-forest-100">
                    <span className="text-forest-900 font-bold block mb-0.5 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-fresh" />
                      {language === 'mr' ? 'शिफारस डोस:' : 'Dosage Guideline:'}
                    </span>
                    <span className="font-semibold text-charcoal-dark">{item.dosageGuideline[language]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-amber-900 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
                <span className="font-bold block mb-0.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  {language === 'mr' ? 'काळजी व सूचना:' : 'Precaution:'}
                </span>
                <p className="leading-relaxed">{item.precautions[language]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-black text-forest-950">
              {language === 'mr' ? 'तुमच्या शेतासाठी अचूक खतांच्या बॅगा मोजायच्या आहेत का?' : 'Need to calculate exact fertilizer bags for your field?'}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              {language === 'mr'
                ? 'ऊस, कांदा, सोयाबीन, गहू किंवा मका निवडून एकर क्षेत्रफळ टाका आणि युरिया, डीएपी, पोटॅशचे प्रमाण काढा.'
                : 'Select your crop and land acreage to compute precise bag counts instantly.'}
            </p>
          </div>
          <Link
            to="/calculators#fertilizer"
            className="px-6 py-3.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <span>{language === 'mr' ? 'खत गणक वापरा' : 'Launch Fertilizer Calculator'}</span>
            <ArrowRight className="w-4 h-4 text-fresh" />
          </Link>
        </div>

      </div>
    </div>
  );
};
