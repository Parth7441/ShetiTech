import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp, DollarSign, PieChart } from 'lucide-react';

export const ProfitCalculator: React.FC = () => {
  const { language } = useLanguage();

  const [tillageCost, setTillageCost] = useState<number>(4500);
  const [seedCost, setSeedCost] = useState<number>(3500);
  const [fertCost, setFertCost] = useState<number>(6500);
  const [laborCost, setLaborCost] = useState<number>(8500);
  const [yieldQuintal, setYieldQuintal] = useState<number>(14);
  const [marketRate, setMarketRate] = useState<number>(4800);

  const totalCost = (tillageCost || 0) + (seedCost || 0) + (fertCost || 0) + (laborCost || 0);
  const grossIncome = (yieldQuintal || 0) * (marketRate || 0);
  const netProfit = grossIncome - totalCost;
  const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : '0';
  const costPerQuintal = yieldQuintal > 0 ? (totalCost / yieldQuintal).toFixed(0) : '0';

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-forest-700" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-forest-900">
            {language === 'mr' ? 'पीक खर्च व नफा गणक' : 'Crop Cultivation Cost & Profit Calculator'}
          </h3>
          <p className="text-sm text-charcoal-muted">
            {language === 'mr'
              ? 'लागवड खर्च, अपेक्षित उत्पादन आणि बाजारभावानुसार अचूक नफ्याचा अंदाज'
              : 'Calculate total farming expenses, gross yield turnover, and net farm profits'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Expenses Form */}
        <div className="space-y-4 bg-[#F8FAF7] p-5 rounded-xl border border-gray-100">
          <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wider flex items-center gap-2">
            <PieChart className="w-4 h-4 text-forest-700" />
            {language === 'mr' ? '१. मशागत व लागवड खर्च (रुपये):' : '1. Cultivation Expenses (₹):'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                {language === 'mr' ? 'नांगरणी व मशागत (रु.)' : 'Land Prep / Tillage (₹)'}
              </label>
              <input
                type="number"
                min="0"
                value={tillageCost === 0 ? '' : tillageCost}
                onChange={(e) => setTillageCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                {language === 'mr' ? 'बियाणे व प्रक्रिया (रु.)' : 'Seed & Treatment (₹)'}
              </label>
              <input
                type="number"
                min="0"
                value={seedCost === 0 ? '' : seedCost}
                onChange={(e) => setSeedCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                {language === 'mr' ? 'खते व औषधे (रु.)' : 'Fertilizers & Chemicals (₹)'}
              </label>
              <input
                type="number"
                min="0"
                value={fertCost === 0 ? '' : fertCost}
                onChange={(e) => setFertCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-light mb-1">
                {language === 'mr' ? 'मजुरी, सिंचन व काढणी (रु.)' : 'Labor & Harvesting (₹)'}
              </label>
              <input
                type="number"
                min="0"
                value={laborCost === 0 ? '' : laborCost}
                onChange={(e) => setLaborCost(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-gray-200/60 flex justify-between items-center text-sm">
            <span className="font-semibold text-charcoal-muted">
              {language === 'mr' ? 'एकूण लागवड खर्च:' : 'Total Expenditure:'}
            </span>
            <span className="font-black text-base text-charcoal-dark">
              ₹{totalCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Income / Harvest Form */}
        <div className="space-y-4 bg-forest-50/50 p-5 rounded-xl border border-forest-100 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-forest-700" />
              {language === 'mr' ? '२. अपेक्षित उत्पादन व बाजारभाव:' : '2. Expected Harvest & Rate:'}
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal-light mb-1">
                  {language === 'mr' ? 'अपेक्षित उत्पादन (क्विंटल किंवा टन)' : 'Expected Harvest (Quintals)'}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={yieldQuintal === 0 ? '' : yieldQuintal}
                  onChange={(e) => setYieldQuintal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-base font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-light mb-1">
                  {language === 'mr' ? 'अपेक्षित सरासरी दर (रु./क्विंटल)' : 'Expected Market Price (₹/Quintal)'}
                </label>
                <input
                  type="number"
                  min="0"
                  value={marketRate === 0 ? '' : marketRate}
                  onChange={(e) => setMarketRate(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-base font-bold text-charcoal bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-forest-200/60 flex justify-between items-center text-sm">
            <span className="font-semibold text-forest-800">
              {language === 'mr' ? 'अपेक्षित एकूण उत्पन्न:' : 'Gross Turnover:'}
            </span>
            <span className="font-black text-base text-forest-900">
              ₹{grossIncome.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Net Profit Summary Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        netProfit >= 0
          ? 'bg-gradient-to-br from-forest-800 to-forest-900 text-white border-forest-700 shadow-md'
          : 'bg-red-50 text-red-950 border-red-200'
      }`}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div>
            <span className={`text-xs uppercase tracking-wider font-bold block mb-1 ${netProfit >= 0 ? 'text-forest-200' : 'text-red-700'}`}>
              {language === 'mr' ? 'निव्वळ नफा (Net Profit)' : 'Net Farm Profit'}
            </span>
            <div className={`text-3xl lg:text-4xl font-black tracking-tight ${netProfit >= 0 ? 'text-white' : 'text-red-600'}`}>
              ₹{netProfit.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="sm:border-l sm:border-white/20 sm:pl-6">
            <span className={`text-xs uppercase tracking-wider font-bold block mb-1 ${netProfit >= 0 ? 'text-forest-200' : 'text-red-700'}`}>
              {language === 'mr' ? 'नफ्याचे प्रमाण (ROI)' : 'Return on Investment'}
            </span>
            <div className={`text-3xl font-black ${netProfit >= 0 ? 'text-fresh' : 'text-red-600'}`}>
              {roi}%
            </div>
          </div>

          <div className="sm:border-l sm:border-white/20 sm:pl-6">
            <span className={`text-xs uppercase tracking-wider font-bold block mb-1 ${netProfit >= 0 ? 'text-forest-200' : 'text-red-700'}`}>
              {language === 'mr' ? 'उत्पादन खर्च (प्रति क्विंटल)' : 'Production Cost / Qtl'}
            </span>
            <div className="text-2xl font-black">
              ₹{costPerQuintal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
