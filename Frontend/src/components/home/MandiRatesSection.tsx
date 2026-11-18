import React, { useState, useEffect } from 'react';
import type { MandiRate } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { api, type MandiRateItem } from '../../services/api';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Search,
  Info,
  Radio,
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface MandiRatesSectionProps {
  rates: MandiRate[];
}

export const MandiRatesSection: React.FC<MandiRatesSectionProps> = ({ rates }) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [liveRates, setLiveRates] = useState<MandiRate[] | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    api.getMandiRates().then((data: MandiRateItem[]) => {
      if (!isMounted) return;
      if (data && data.length > 0) {
        // Map backend API data to MandiRate interface
        const mapped: MandiRate[] = data.map((item) => ({
          id: String(item.id),
          cropName: {
            mr: item.crop_name_mr,
            en: item.crop_name_en
          },
          variety: {
            mr: 'मानक प्रत',
            en: 'Standard Grade'
          },
          market: {
            mr: item.market,
            en: item.market
          },
          district: {
            mr: item.district,
            en: item.district
          },
          minPrice: item.min_price,
          maxPrice: item.max_price,
          modalPrice: item.modal_price,
          unit: {
            mr: item.unit || 'रु./क्विंटल',
            en: '₹/Quintal'
          },
          trend: item.trend,
          trendAmount: Math.round(item.modal_price * 0.02),
          date: item.updated_date ? item.updated_date.slice(0, 10) : 'आज (Today)'
        }));
        setLiveRates(mapped);
        setIsConnected(true);
      } else {
        setLiveRates(null);
        setIsConnected(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const activeRates = liveRates && liveRates.length > 0 ? liveRates : rates;

  const filteredRates = activeRates.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.cropName.mr.toLowerCase().includes(q) ||
      item.cropName.en.toLowerCase().includes(q) ||
      item.market.mr.toLowerCase().includes(q) ||
      item.market.en.toLowerCase().includes(q) ||
      item.district.mr.toLowerCase().includes(q) ||
      item.district.en.toLowerCase().includes(q)
    );
  });

  const renderTrend = (trend: 'up' | 'down' | 'stable', amount: number) => {
    if (trend === 'up') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
          <TrendingUp className="w-3.5 h-3.5 text-green-600" />
          +₹{amount}
        </span>
      );
    }
    if (trend === 'down') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
          <TrendingDown className="w-3.5 h-3.5 text-red-600" />
          -₹{amount}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
        <Minus className="w-3.5 h-3.5 text-gray-500" />
        {t('mandiSection.trendStable')}
      </span>
    );
  };

  return (
    <section id="mandi" className="py-16 md:py-24 bg-white border-b border-forest-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="amber">
              <Database className="w-3.5 h-3.5 text-amber-700" />
              {t('mandiSection.badge')}
            </Badge>

            {/* Backend Connection Indicator */}
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {language === 'mr' ? 'लाइव्ह बाजारभाव API जोडले' : 'Live APMC Database Connected'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                <Radio className="w-3 h-3 text-gray-500" />
                {language === 'mr' ? 'ऑफलाइन नमुना भाव' : 'Offline Sample Rates'}
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mb-3">
            {t('mandiSection.title')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            {t('mandiSection.subtitle')}
          </p>
        </div>

        {/* Clear Sample Disclaimer Box */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950 max-w-4xl mx-auto shadow-xs">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>{t('mandiSection.disclaimer')}</strong>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('mandiSection.filterPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-card max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-fixed">
              <thead>
                <tr className="bg-forest-900 text-white text-xs uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4 w-[24%]">{t('mandiSection.table.crop')}</th>
                  <th className="py-3.5 px-4 w-[22%]">{t('mandiSection.table.market')}</th>
                  <th className="py-3.5 px-4 w-[14%]">{t('mandiSection.table.min')}</th>
                  <th className="py-3.5 px-4 w-[14%]">{t('mandiSection.table.max')}</th>
                  <th className="py-3.5 px-4 w-[14%]">{t('mandiSection.table.modal')}</th>
                  <th className="py-3.5 px-4 w-[12%] text-center">{t('mandiSection.table.trend')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredRates.map((item) => (
                  <tr key={item.id} className="hover:bg-forest-50/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-forest-950">
                      <div>{item.cropName[language]}</div>
                      <span className="text-xs font-normal text-charcoal-muted">
                        {item.variety[language]}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-charcoal">
                      <span className="font-semibold block">{item.market[language]}</span>
                      <span className="text-xs text-charcoal-muted">{item.district[language]}</span>
                    </td>
                    <td className="py-4 px-4 font-semibold text-charcoal-light">
                      ₹{item.minPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4 font-semibold text-charcoal-light">
                      ₹{item.maxPrice.toLocaleString('en-IN')}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-black text-forest-900 text-base">
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-charcoal-muted block">
                        /{item.unit[language]}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {renderTrend(item.trend, item.trendAmount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {filteredRates.map((item) => (
            <div key={item.id} className="agri-card p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-black text-forest-950 text-base">
                    {item.cropName[language]}
                  </h4>
                  <span className="text-xs text-charcoal-muted">
                    {item.variety[language]}
                  </span>
                </div>
                {renderTrend(item.trend, item.trendAmount)}
              </div>

              <div className="text-xs text-charcoal bg-[#F8FAF7] p-2.5 rounded-xl border border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-forest-900">
                  📍 {item.market[language]}
                </span>
                <span className="text-charcoal-muted">
                  {item.district[language]}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-gray-100">
                <div>
                  <span className="text-[10px] text-charcoal-muted block">
                    {t('mandiSection.table.min')}
                  </span>
                  <span className="text-xs font-bold text-charcoal-dark">
                    ₹{item.minPrice}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-charcoal-muted block">
                    {t('mandiSection.table.max')}
                  </span>
                  <span className="text-xs font-bold text-charcoal-dark">
                    ₹{item.maxPrice}
                  </span>
                </div>
                <div className="bg-forest-50 rounded-lg py-1">
                  <span className="text-[10px] text-forest-800 font-bold block">
                    {t('mandiSection.table.modal')}
                  </span>
                  <span className="text-xs font-black text-forest-900">
                    ₹{item.modalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Mandi Page Link */}
        <div className="text-center mt-10">
          <Link
            to="/mandi"
            className="text-xs sm:text-sm font-bold text-forest-800 hover:text-forest-950 underline underline-offset-4"
          >
            {language === 'mr' ? 'सर्व बाजार समित्यांचे दर पहा →' : 'View All APMC Market Rates →'}
          </Link>
        </div>

      </div>
    </section>
  );
};
