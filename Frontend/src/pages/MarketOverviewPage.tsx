import React from 'react';
import { mandiData } from '../data/mandiData';
import { MandiRatesSection } from '../components/home/MandiRatesSection';
import { useLanguage } from '../context/LanguageContext';
import {
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export const MarketOverviewPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'दैनिक कृषी बाजार विश्लेषण' : 'Daily Agro Market Intelligence'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'महाराष्ट्र कृषी बाजार आढावा व कल' : 'Maharashtra Mandi Market Overview'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'प्रमुख बाजार समित्यांमधील आवक, किमान-कमाल व सरासरी दर, दरातील चढ-उताराचे विश्लेषण आणि विक्रीसाठी उपयुक्त कल.'
                : 'Indicative commodity price fluctuations, arrivals volume, and market trends across major Maharashtra APMCs.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <TrendingUp className="w-8 h-8 text-fresh" />
          </div>
        </div>

        {/* Market Highlights Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-forest-100 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-charcoal-muted uppercase">
                {language === 'mr' ? 'कांदा बाजार कल (नाशिक)' : 'Onion Trend (Nashik)'}
              </span>
              <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                +₹११०/क्विं.
              </span>
            </div>
            <div className="text-2xl font-black text-forest-950">
              ₹२,४२० <span className="text-xs font-normal text-charcoal-muted">सरासरी</span>
            </div>
            <p className="text-[11px] text-charcoal-muted mt-1">
              {language === 'mr' ? 'लासलगाव आवक स्थिर, चांगल्या प्रतीच्या कांद्यास मागणी' : 'Steady arrivals, strong export demand'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-forest-100 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-charcoal-muted uppercase">
                {language === 'mr' ? 'सोयाबीन बाजार कल (लातूर मुख्य)' : 'Soybean Trend (Latur Main)'}
              </span>
              <span className="flex items-center text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                +₹२००/क्विं.
              </span>
            </div>
            <div className="text-2xl font-black text-forest-950">
              ₹७,५८० <span className="text-xs font-normal text-charcoal-muted">सरासरी</span>
            </div>
            <p className="text-[11px] text-charcoal-muted mt-1">
              {language === 'mr' ? 'लातूर मुख्य आवक ९,४६० क्विंटल; कमाल ₹७,६९०' : 'Latur arrivals 9,460 Qtl; High ₹7,690'}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-forest-100 shadow-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-charcoal-muted uppercase">
                {language === 'mr' ? 'हळद बाजार कल (सांगली)' : 'Turmeric Trend (Sangli)'}
              </span>
              <span className="flex items-center text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md">
                स्थिर (Steady)
              </span>
            </div>
            <div className="text-2xl font-black text-forest-950">
              ₹१५,४०० <span className="text-xs font-normal text-charcoal-muted">सरासरी</span>
            </div>
            <p className="text-[11px] text-charcoal-muted mt-1">
              {language === 'mr' ? 'राजापुरी व सेलम हळदीचे भाव स्थिर' : 'Premium finger turmeric holding steady'}
            </p>
          </div>
        </div>

        {/* Detailed APMC Rates Table Section */}
        <MandiRatesSection rates={mandiData} />

        {/* Trading Advisory Box */}
        <div className="mt-10 p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
            <span>{language === 'mr' ? 'शेतकऱ्यांसाठी शेतमाल विक्री सल्ला:' : 'Agricultural Marketing Advisory for Farmers:'}</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              {language === 'mr'
                ? 'शेतमाल बाजारात आणण्यापूर्वी प्रतवारी (Grading & Sorting) करून आणल्यास सरासरी १५ ते २०% जास्त भाव मिळतो.'
                : 'Proper cleaning, grading, and moisture control yields 15-20% higher market realization.'}
            </li>
            <li>
              {language === 'mr'
                ? 'कांदा, हळद यांसारख्या साठवणूकक्षम पिकांची एकदम आवक वाढल्यावर घाईगडबडीने विक्री करणे टाळावे.'
                : 'Avoid distress selling storable crops during temporary peak arrival gluts.'}
            </li>
            <li>
              {language === 'mr'
                ? 'APMC मध्ये अधिकृत वजनकाट्यावरच वजन करून अधिकृत लिलाव पावती घ्यावी.'
                : 'Insist on digital weighbridge receipts and authorized APMC auction settlement slips.'}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
