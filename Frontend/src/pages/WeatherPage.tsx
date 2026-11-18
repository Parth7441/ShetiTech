import React from 'react';
import { weatherData } from '../data/weatherData';
import { WeatherPreviewSection } from '../components/home/WeatherPreviewSection';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun, ShieldCheck } from 'lucide-react';

export const WeatherPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <CloudSun className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'हवामान सल्लागार' : 'Agro Weather Advisory'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'महाराष्ट्रातील जिल्हावार कृषी हवामान अंदाज' : 'District Agricultural Weather Forecast'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'तापमान, पर्जन्यमान, वाऱ्याचा वेग आणि पिकांच्या फवारणी-सिंचनासाठी विशेष कृषी हवामान सल्ला.'
                : 'Temperature, precipitation probability, wind velocity, and specialized agricultural weather advisories.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <CloudSun className="w-8 h-8 text-fresh" />
          </div>
        </div>
      </div>

      <WeatherPreviewSection weatherList={weatherData} />

      {/* Advisory Tips Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-forest-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-fresh-dark" />
            <span>{language === 'mr' ? 'हवामानानुसार शेती कामांचे नियम:' : 'Weather-Driven Agricultural Best Practices:'}</span>
          </div>
          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-charcoal-light pl-2">
            <li>
              {language === 'mr'
                ? 'हवेतील आर्द्रता ८०% पेक्षा जास्त असताना कीटकनाशकांची फवारणी टाळावी.'
                : 'Avoid foliar pesticide spraying when relative humidity exceeds 80% to curb runoff.'}
            </li>
            <li>
              {language === 'mr'
                ? 'दुपारी १२ ते ३ दरम्यान जास्त तापमान असल्यास ठिबक सिंचन सकाळी लवकर किंवा संध्याकाळी करावे.'
                : 'During peak heat hours, schedule drip irrigation early in the morning or post 4 PM.'}
            </li>
            <li>
              {language === 'mr'
                ? 'पावसाची शक्यता ४०% पेक्षा जास्त असल्यास युरिया किंवा नत्रयुक्त खते उघड्यावर टाकू नयेत.'
                : 'Do not broad-cast Urea when rain probability exceeds 40% to prevent nitrogen leaching.'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
