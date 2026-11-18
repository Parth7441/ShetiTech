import React from 'react';
import { Modal } from './Modal';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  featureName
}) => {
  const { t, language } = useLanguage();

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="text-center py-4 px-2">
        <div className="w-16 h-16 bg-forest-50 border-2 border-forest-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-forest-700 shadow-sm">
          <Sparkles className="w-8 h-8 text-forest-600" />
        </div>

        <h3 className="text-2xl font-bold text-forest-900 mb-2">
          {featureName ? (
            language === 'mr' ? `${featureName} - लवकरच येत आहे!` : `${featureName} - Coming Soon!`
          ) : (
            t('modal.comingSoonTitle')
          )}
        </h3>

        <p className="text-charcoal-muted text-sm md:text-base leading-relaxed mb-6">
          {t('modal.comingSoonDesc')}
        </p>

        <div className="bg-[#F8FAF7] border border-forest-100 rounded-xl p-4 text-left mb-6 space-y-2 text-sm text-charcoal">
          <div className="font-semibold text-forest-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-forest-600" />
            {language === 'mr' ? 'फेज २ मधील आगामी वैशिष्ट्ये:' : 'Upcoming in Phase 2:'}
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-charcoal-muted pl-1">
            <li>{language === 'mr' ? 'थेट उपग्रह व हवामान API जोडणी' : 'Live satellite & IMD weather radar integration'}</li>
            <li>{language === 'mr' ? 'थेट महाराष्ट्र APMC बाजारभाव अपडेट्स' : 'Live Maharashtra APMC auction data feeds'}</li>
            <li>{language === 'mr' ? 'कॅमेराद्वारे पीक रोग निदान' : 'AI-assisted crop disease leaf scanning'}</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-semibold rounded-xl transition-colors shadow-sm"
        >
          {t('modal.gotIt')}
        </button>
      </div>
    </Modal>
  );
};
