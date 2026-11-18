import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F8FAF7]">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 rounded-3xl overflow-hidden mx-auto shadow-md ring-2 ring-forest-200">
          <img src="/logo.svg" alt="ShetiTech Logo" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-forest-950">404</h1>
          <h2 className="text-2xl font-bold text-forest-900">
            {language === 'mr' ? 'पृष्ठ सापडले नाही' : 'Page Not Found'}
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {language === 'mr'
              ? 'तुम्ही शोधत असलेले पृष्ठ उपलब्ध नाही किंवा बदलण्यात आले आहे.'
              : 'The page you are looking for does not exist or has been relocated.'}
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm shadow-md transition-all active:scale-98"
        >
          <Home className="w-4 h-4" />
          <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Return to Home'}</span>
        </Link>
      </div>
    </div>
  );
};
