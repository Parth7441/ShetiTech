import React from 'react';
import type { FarmingGuide } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { BookOpen, Clock, CheckCircle2, UserCheck } from 'lucide-react';

interface GuideDetailModalProps {
  guide: FarmingGuide | null;
  isOpen: boolean;
  onClose: () => void;
}

export const GuideDetailModal: React.FC<GuideDetailModalProps> = ({
  guide,
  isOpen,
  onClose
}) => {
  const { language, t } = useLanguage();

  if (!guide) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2 text-forest-900">
          <BookOpen className="w-5 h-5 text-forest-700 shrink-0" />
          <span className="truncate">{guide.title[language]}</span>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="forest">{guide.category[language]}</Badge>
          <Badge variant="amber">{guide.tag[language]}</Badge>
          <span className="flex items-center gap-1 text-xs text-charcoal-muted ml-auto font-medium">
            <Clock className="w-3.5 h-3.5" />
            {guide.readTime[language]}
          </span>
        </div>

        <p className="text-sm md:text-base text-charcoal leading-relaxed font-medium bg-[#F8FAF7] p-4 rounded-xl border border-gray-100">
          {guide.summary[language]}
        </p>

        {/* Detailed Content Points */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wider">
            {language === 'mr' ? 'तपशीलवार तंत्रज्ञान व मार्गदर्शक पायऱ्या:' : 'Detailed Agronomy Guidelines & Steps:'}
          </h4>
          <div className="space-y-2.5">
            {guide.content[language].map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-charcoal-light">
                <span className="w-6 h-6 rounded-full bg-forest-100 text-forest-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Tips Box */}
        <div className="p-4 rounded-xl bg-forest-50 border border-forest-200 space-y-2">
          <h4 className="font-bold text-forest-900 text-xs md:text-sm uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-fresh-dark" />
            {t('knowledgeSection.tips')}
          </h4>
          <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal pl-2">
            {guide.keyTips[language].map((tip, idx) => (
              <li key={idx} className="list-disc list-inside leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Author / Source */}
        <div className="flex items-center justify-between text-xs text-charcoal-muted pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-forest-700" />
            <span>
              {language === 'mr' ? 'संकलन व प्रमाणीकरण:' : 'Authored & Verified By:'}{' '}
              <strong className="text-forest-900">{guide.author[language]}</strong>
            </span>
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-gray-100 hover:bg-gray-200 text-charcoal font-semibold rounded-lg transition-colors"
          >
            {t('modal.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
};
