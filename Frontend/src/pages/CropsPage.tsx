import React, { useState } from 'react';
import { cropsData } from '../data/cropsData';
import { PopularCropsSection } from '../components/home/PopularCropsSection';
import { CropDetailModal } from '../components/crops/CropDetailModal';
import type { Crop } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CropsPage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const { language } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        {/* Breadcrumb / Top Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'पीक माहिती भांडार' : 'Crop Knowledge Base'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'महाराष्ट्रातील प्रमुख पिकांची संपूर्ण माहिती' : 'Agronomy Guide for Maharashtra Crops'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'योग्य हंगाम, पेरणी तंत्रज्ञान, खत व्यवस्थापन आणि भरघोस नफ्यासाठी सविस्तर मार्गदर्शक.'
                : 'Scientific guidelines covering sowing seasons, fertigation, plant protection, and yield estimation.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <Sprout className="w-8 h-8 text-fresh" />
          </div>
        </div>
      </div>

      <PopularCropsSection
        crops={cropsData}
        onSelectCrop={(crop) => setSelectedCrop(crop)}
      />

      <CropDetailModal
        crop={selectedCrop}
        isOpen={selectedCrop !== null}
        onClose={() => setSelectedCrop(null)}
        onOpenCalculator={() => navigate('/calculators#fertilizer')}
      />
    </div>
  );
};
