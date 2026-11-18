import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from './Logo';
import {
  PhoneCall,
  MapPin,
  ShieldCheck,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-forest-950 text-white pt-16 pb-12 border-t-4 border-forest-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-forest-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-block group" aria-label="ShetiTech Home">
              <Logo variant="footer" size="md" />
            </Link>
            
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('footer.about')}
            </p>

            <div className="flex items-center gap-2 text-xs text-fresh-light font-semibold bg-forest-900/80 px-3 py-2 rounded-lg border border-forest-800">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{language === 'mr' ? '१००% विश्वासू शेतकरी माहिती' : '100% Verified Farming Guidance'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-fresh pl-2.5">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
              <li>
                <Link to="/season-crops" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'हंगामनिहाय पिके' : 'Season-wise Crops'}
                </Link>
              </li>
              <li>
                <Link to="/harvesters" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'हार्वेस्टर व यंत्रे' : 'Harvester Information'}
                </Link>
              </li>
              <li>
                <Link to="/fertilizers" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'खत माहिती व डोस' : 'Fertilizer Information'}
                </Link>
              </li>
              <li>
                <Link to="/market-overview" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'बाजार आढावा व कल' : 'Market Overview'}
                </Link>
              </li>
              <li>
                <Link to="/buyers-traders" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'खरेदीदार व व्यापारी' : 'Buyers & Traders'}
                </Link>
              </li>
              <li>
                <Link to="/subsidies" className="hover:text-fresh transition-colors flex items-center gap-1.5">
                  • {language === 'mr' ? 'शासकीय सबसिडी व योजना' : 'Subsidy Details'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-fresh pl-2.5">
              {t('footer.toolsLinks')}
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/calculators#land-area" className="hover:text-fresh transition-colors">
                  • {language === 'mr' ? 'जमीन क्षेत्र कनवर्टर (गुंठा/एकर)' : 'Land Area Converter'}
                </Link>
              </li>
              <li>
                <Link to="/calculators#fertilizer" className="hover:text-fresh transition-colors">
                  • {language === 'mr' ? 'खत व्यवस्थापन गणक (NPK)' : 'Fertilizer Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/calculators#crop-profit" className="hover:text-fresh transition-colors">
                  • {language === 'mr' ? 'पीक नफा गणक' : 'Crop Profit Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/calculators#seed" className="hover:text-fresh transition-colors">
                  • {language === 'mr' ? 'बियाणे प्रमाण गणक' : 'Seed Rate Calculator'}
                </Link>
              </li>
              <li>
                <Link to="/calculators#crop-cost" className="hover:text-fresh transition-colors">
                  • {language === 'mr' ? 'पीक उत्पादन खर्च गणक' : 'Cultivation Cost Calculator'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Government & Helpdesk */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-fresh pl-2.5">
              {t('footer.support')}
            </h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="bg-forest-900/90 p-3.5 rounded-xl border border-forest-800">
                <div className="flex items-center gap-2 text-fresh font-bold mb-1">
                  <PhoneCall className="w-4 h-4" />
                  <span>किसान कॉल सेंटर (Kisan Helpline)</span>
                </div>
                <div className="text-xl font-black text-white tracking-wide">
                  1800-180-1551
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {language === 'mr' ? 'सकाळी ६:०० ते रात्री १०:०० (टोल फ्री)' : 'Toll Free • 6:00 AM - 10:00 PM'}
                </p>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-400 pt-1">
                <MapPin className="w-4 h-4 text-fresh shrink-0 mt-0.5" />
                <span>
                  {language === 'mr'
                    ? 'महाराष्ट्र राज्य, भारत - बळीराजाच्या सेवेत सदैव तत्पर.'
                    : 'Maharashtra State, India - Dedicated to Indian Agriculture.'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer banner */}
        <div className="my-8 p-4 rounded-xl bg-forest-900/60 border border-forest-800 text-xs text-gray-300 leading-relaxed">
          <span className="font-bold text-amber-400 mr-2">
            {language === 'mr' ? '⚠️ अस्वीकरण व सूचना:' : '⚠️ Disclaimer:'}
          </span>
          {t('footer.disclaimerText')}
          {' '}
          {language === 'mr'
            ? 'संकेतस्थळावरील हवामान आणि बाजारभाव हे प्रात्यक्षिक स्वरूपाचे (Sample Preview) आहेत.'
            : 'The weather and mandi prices are indicative sample previews.'}
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} ShetiTech. {t('footer.rights')}</p>
          <p className="flex items-center gap-1.5">
            <span>{t('footer.developedFor')}</span>
            <Heart className="w-3.5 h-3.5 text-fresh fill-fresh" />
          </p>
        </div>
      </div>
    </footer>
  );
};
