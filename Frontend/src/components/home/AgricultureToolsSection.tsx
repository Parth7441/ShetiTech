import React, { useState } from 'react';
import type { AgriTool, ToolId } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import {
  FlaskConical,
  Maximize2,
  TrendingUp,
  Calculator,
  Sprout,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { LandAreaConverter } from '../calculators/LandAreaConverter';
import { FertilizerCalculator } from '../calculators/FertilizerCalculator';
import { SeedCalculator } from '../calculators/SeedCalculator';
import { ProfitCalculator } from '../calculators/ProfitCalculator';
import { Link } from 'react-router-dom';

interface AgricultureToolsSectionProps {
  tools: AgriTool[];
}

export const AgricultureToolsSection: React.FC<AgricultureToolsSectionProps> = ({ tools }) => {
  const { t, language } = useLanguage();
  const [activeToolModal, setActiveToolModal] = useState<ToolId | null>(null);

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'FlaskConical':
        return <FlaskConical className="w-7 h-7 text-forest-700" />;
      case 'Maximize2':
        return <Maximize2 className="w-7 h-7 text-forest-700" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-forest-700" />;
      case 'Calculator':
        return <Calculator className="w-7 h-7 text-forest-700" />;
      case 'Sprout':
        return <Sprout className="w-7 h-7 text-forest-700" />;
      default:
        return <Calculator className="w-7 h-7 text-forest-700" />;
    }
  };

  const renderActiveCalculator = () => {
    switch (activeToolModal) {
      case 'land-area':
        return <LandAreaConverter />;
      case 'fertilizer':
        return <FertilizerCalculator />;
      case 'seed':
        return <SeedCalculator />;
      case 'crop-profit':
      case 'crop-cost':
        return <ProfitCalculator />;
      default:
        return null;
    }
  };

  return (
    <section id="tools" className="py-16 md:py-24 bg-white border-y border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="forest" className="mb-3">
            {t('toolsSection.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mb-3">
            {t('toolsSection.title')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            {t('toolsSection.subtitle')}
          </p>
        </div>

        {/* 5 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => setActiveToolModal(tool.id)}
              className="agri-card p-6 flex flex-col justify-between cursor-pointer border border-forest-100/80 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-200/80 flex items-center justify-center group-hover:bg-forest-100 transition-colors">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <Badge variant="amber" size="sm">
                    {tool.badge[language]}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors mb-1.5">
                  {tool.title[language]}
                </h3>

                <p className="text-xs font-semibold text-fresh-dark mb-3">
                  {tool.subtitle[language]}
                </p>

                <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-6 line-clamp-2 h-10">
                  {tool.description[language]}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-forest-800 group-hover:underline flex items-center gap-1">
                  <span>{t('toolsSection.openTool')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </span>
                <span className="text-[11px] font-semibold text-charcoal-muted bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                  {language === 'mr' ? 'मोफत' : 'Free Tool'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Page View Button */}
        <div className="text-center">
          <Link
            to="/calculators"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-forest-50 hover:bg-forest-100 text-forest-900 font-bold rounded-xl text-sm border border-forest-200 transition-all shadow-xs"
          >
            <span>{language === 'mr' ? 'सर्व शेती गणक एकाच पानावर पहा' : 'View All Farm Calculators on Dedicated Page'}</span>
            <ExternalLink className="w-4 h-4 text-forest-700" />
          </Link>
        </div>

      </div>

      {/* Interactive Tool Modal */}
      <Modal
        isOpen={activeToolModal !== null}
        onClose={() => setActiveToolModal(null)}
        maxWidth="3xl"
        title={
          activeToolModal ? (
            <span className="text-forest-900 font-bold">
              {tools.find((t) => t.id === activeToolModal)?.title[language]}
            </span>
          ) : undefined
        }
      >
        <div className="py-2">
          {renderActiveCalculator()}
        </div>
      </Modal>
    </section>
  );
};
