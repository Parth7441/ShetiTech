import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC<{ variant?: 'header' | 'footer' | 'mobile' }> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'mobile') {
    return (
      <div className="flex items-center gap-2 bg-[#F8FAF7] p-1.5 rounded-2xl border border-forest-200">
        <button
          onClick={() => setLanguage('mr')}
          className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all ${
            language === 'mr'
              ? 'bg-forest-800 text-white shadow-xs'
              : 'text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          मराठी
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`flex-1 py-2.5 text-center text-sm font-bold rounded-xl transition-all ${
            language === 'en'
              ? 'bg-forest-800 text-white shadow-xs'
              : 'text-forest-900 hover:bg-forest-100/60'
          }`}
        >
          English
        </button>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center rounded-2xl bg-[#F8FAF7] p-1 border border-forest-200/90 shadow-2xs shrink-0 select-none">
      <div className="pl-2 pr-1 text-forest-700 hidden sm:flex items-center">
        <Globe className="w-3.5 h-3.5 text-forest-700" />
      </div>
      <button
        onClick={() => setLanguage('mr')}
        className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
          language === 'mr'
            ? 'bg-forest-800 text-white shadow-xs'
            : 'text-charcoal-muted hover:text-forest-950 hover:bg-white/80'
        }`}
        aria-label="मराठी भाषा निवडा"
      >
        मराठी
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-colors ${
          language === 'en'
            ? 'bg-forest-800 text-white shadow-xs'
            : 'text-charcoal-muted hover:text-forest-950 hover:bg-white/80'
        }`}
        aria-label="Select English language"
      >
        English
      </button>
    </div>
  );
};
