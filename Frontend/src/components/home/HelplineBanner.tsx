import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PhoneCall, Sparkles, HelpCircle } from 'lucide-react';
import { ComingSoonModal } from '../common/ComingSoonModal';

export const HelplineBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-forest-900 text-white py-10 border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-forest-800 to-forest-950 p-6 sm:p-8 rounded-3xl border border-forest-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-forest-700/80 border border-forest-600 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <PhoneCall className="w-8 h-8 text-fresh" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-fresh uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? '२४/७ शेतकरी सहाय्य' : 'Farmer Assistance'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black">
                {t('helpline.title')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
                {t('helpline.desc')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:18001801551"
              className="px-6 py-3.5 bg-fresh hover:bg-fresh-light text-forest-950 font-black rounded-xl text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 active:scale-98"
            >
              <PhoneCall className="w-5 h-5 text-forest-950" />
              <span>1800-180-1551 (टोल फ्री)</span>
            </a>

            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-fresh" />
              <span>{t('helpline.btn')}</span>
            </button>
          </div>

        </div>
      </div>

      <ComingSoonModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        featureName={language === 'mr' ? 'सरकारी कृषी योजना व तज्ज्ञ सल्ला' : 'Government Agri Schemes & Advisory'}
      />
    </div>
  );
};
