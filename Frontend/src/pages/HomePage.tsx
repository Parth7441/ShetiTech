import React, { useState } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { PopularCropsSection } from '../components/home/PopularCropsSection';
import { AgricultureToolsSection } from '../components/home/AgricultureToolsSection';
import { WeatherPreviewSection } from '../components/home/WeatherPreviewSection';
import { MandiRatesSection } from '../components/home/MandiRatesSection';
import { KnowledgeCenterSection } from '../components/home/KnowledgeCenterSection';
import { HelplineBanner } from '../components/home/HelplineBanner';
import { CropDetailModal } from '../components/crops/CropDetailModal';
import { cropsData } from '../data/cropsData';
import { toolsData } from '../data/toolsData';
import { weatherData } from '../data/weatherData';
import { mandiData } from '../data/mandiData';
import { guidesData } from '../data/guidesData';
import type { Crop } from '../types';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();

  const handleSearchCrop = (query: string) => {
    setSearchQuery(query);
  };

  const scrollToCrops = () => {
    const el = document.getElementById('crops');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTools = () => {
    const el = document.getElementById('tools');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection
        onSearchCrop={handleSearchCrop}
        onExploreCrops={scrollToCrops}
        onExploreTools={scrollToTools}
        allCrops={cropsData}
        onSelectCrop={(crop) => setSelectedCrop(crop)}
      />

      {/* 2. Popular Crops */}
      <PopularCropsSection
        crops={cropsData}
        onSelectCrop={(crop) => setSelectedCrop(crop)}
        searchQuery={searchQuery}
      />

      {/* 3. Agriculture Tools */}
      <AgricultureToolsSection tools={toolsData} />

      {/* 4. Weather Preview */}
      <WeatherPreviewSection weatherList={weatherData} />

      {/* 5. Mandi Price Preview */}
      <MandiRatesSection rates={mandiData} />

      {/* 6. Farming Knowledge Centre */}
      <KnowledgeCenterSection guides={guidesData} />

      {/* 7. Helpline Banner */}
      <HelplineBanner />

      {/* Crop Detail Modal */}
      <CropDetailModal
        crop={selectedCrop}
        isOpen={selectedCrop !== null}
        onClose={() => setSelectedCrop(null)}
        onOpenCalculator={() => navigate('/calculators#fertilizer')}
      />
    </main>
  );
};
