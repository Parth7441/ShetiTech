import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { CropsPage } from './pages/CropsPage';
import { SeasonCropsPage } from './pages/SeasonCropsPage';
import { HarvestersPage } from './pages/HarvestersPage';
import { FertilizersPage } from './pages/FertilizersPage';
import { BuyersTradersPage } from './pages/BuyersTradersPage';
import { SubsidiesPage } from './pages/SubsidiesPage';
import { MarketOverviewPage } from './pages/MarketOverviewPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { WeatherPage } from './pages/WeatherPage';
import { MandiPage } from './pages/MandiPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top on route change (unless hash is present)
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#F8FAF7] text-charcoal w-full overflow-x-hidden">
          {/* Global Navigation Bar (Fixed at top) */}
          <Navbar />

          {/* Main Content Routing (Offset for fixed 80px navbar) */}
          <div className="flex-1 pt-20 w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/season-crops" element={<SeasonCropsPage />} />
              <Route path="/harvesters" element={<HarvestersPage />} />
              <Route path="/fertilizers" element={<FertilizersPage />} />
              <Route path="/buyers-traders" element={<BuyersTradersPage />} />
              <Route path="/subsidies" element={<SubsidiesPage />} />
              <Route path="/market-overview" element={<MarketOverviewPage />} />
              <Route path="/crops" element={<CropsPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/mandi" element={<MandiPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* Global Agriculture Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
