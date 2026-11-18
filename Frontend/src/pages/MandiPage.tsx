import React from 'react';
import { mandiData } from '../data/mandiData';
import { MandiRatesSection } from '../components/home/MandiRatesSection';
import { useLanguage } from '../context/LanguageContext';
import { Store, TrendingUp, AlertTriangle } from 'lucide-react';

export const MandiPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Store className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'बाजारभाव अंदाज' : 'Market Price Estimates'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'महाराष्ट्र कृषी उत्पन्न बाजार समिती (APMC) दर' : 'Maharashtra APMC Mandi Rates'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'कांदा, सोयाबीन, हळद, गहू, आले या प्रमुख पिकांचे बाजारभाव आणि दरातील चढ-उताराचा कल.'
                : 'Indicative commodity pricing across key Maharashtra agricultural market committees.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <TrendingUp className="w-8 h-8 text-fresh" />
          </div>
        </div>
      </div>

      <MandiRatesSection rates={mandiData} />

      {/* Advice Note */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-amber-50/70 border border-amber-200 p-6 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>{language === 'mr' ? 'शेतकऱ्यांसाठी बाजारभाव सूचना:' : 'Notice for Farmers:'}</span>
          </div>
          <p className="leading-relaxed">
            {language === 'mr'
              ? 'येथे दर्शविलेले बाजारभाव नमुना प्रात्यक्षिक (Sample Preview) स्वरूपात आहेत. शेतमाल विक्रीसाठी नेण्यापूर्वी आपल्या जवळच्या अधिकृत कृषी उत्पन्न बाजार समिती (APMC) किंवा व्यापाऱ्याशी प्रत्यक्ष संपर्क साधून आजचे चालू दर तपासून घ्यावेत.'
              : 'The prices displayed above are representative sample data. Farmers are advised to verify real-time auction rates with their designated APMC yard prior to transport.'}
          </p>
        </div>
      </div>
    </div>
  );
};
