import React, { useState } from 'react';
import type { FarmingGuide } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { GuideDetailModal } from '../guides/GuideDetailModal';

interface KnowledgeCenterSectionProps {
  guides: FarmingGuide[];
}

export const KnowledgeCenterSection: React.FC<KnowledgeCenterSectionProps> = ({ guides }) => {
  const { t, language } = useLanguage();
  const [selectedGuide, setSelectedGuide] = useState<FarmingGuide | null>(null);

  return (
    <section id="guides" className="py-16 md:py-24 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="forest" className="mb-3">
            {t('knowledgeSection.badge')}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mb-3">
            {t('knowledgeSection.title')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            {t('knowledgeSection.subtitle')}
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="agri-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="forest" size="sm">
                    {guide.category[language]}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-charcoal-muted font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {guide.readTime[language]}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors mb-2.5 leading-snug line-clamp-2 h-14">
                  {guide.title[language]}
                </h3>

                <p className="text-sm text-charcoal-muted leading-relaxed mb-4 line-clamp-2 h-11">
                  {guide.summary[language]}
                </p>

                {/* Key tip highlights */}
                <div className="p-3 bg-forest-50/60 rounded-xl border border-forest-100 mb-4 space-y-1">
                  <span className="text-[11px] font-bold text-forest-900 uppercase flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-fresh" />
                    {t('knowledgeSection.tips')}:
                  </span>
                  <p className="text-xs text-charcoal line-clamp-1 italic">
                    "{guide.keyTips[language][0]}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-charcoal-muted">
                  {guide.author[language]}
                </span>
                <span className="text-xs font-bold text-forest-800 group-hover:underline flex items-center gap-1">
                  <span>{t('knowledgeSection.readGuide')}</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Detail Modal */}
      <GuideDetailModal
        guide={selectedGuide}
        isOpen={selectedGuide !== null}
        onClose={() => setSelectedGuide(null)}
      />
    </section>
  );
};
