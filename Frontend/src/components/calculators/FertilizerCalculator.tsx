import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FlaskConical, Info, Sparkles } from 'lucide-react';

interface CropFertilizerProfile {
  name: { mr: string; en: string };
  nPerAcre: number; // kg Nitrogen per acre
  pPerAcre: number; // kg Phosphorus per acre
  kPerAcre: number; // kg Potash per acre
  timing: { mr: string; en: string };
}

const cropProfiles: Record<string, CropFertilizerProfile> = {
  sugarcane: {
    name: { mr: 'ऊस (Sugarcane)', en: 'Sugarcane' },
    nPerAcre: 100,
    pPerAcre: 46,
    kPerAcre: 46,
    timing: {
      mr: 'लागवड, दीड महिना, ३ महिने आणि मोठ्या बांधणीवेळी ४ हप्त्यांत खत द्यावे.',
      en: 'Split across basal planting, 45 days, 90 days, and final earthing up.'
    }
  },
  onion: {
    name: { mr: 'कांदा (Onion)', en: 'Onion' },
    nPerAcre: 40,
    pPerAcre: 20,
    kPerAcre: 20,
    timing: {
      mr: 'लागवडीवेळी पूर्ण स्फुरद-पालाश आणि १/२ नत्र द्यावे. उरलेले नत्र ३० व ४५ दिवसांनी द्यावे.',
      en: 'Basal application of full P, K and half N. Remaining N split at 30 & 45 days.'
    }
  },
  soybean: {
    name: { mr: 'सोयाबीन (Soybean)', en: 'Soybean' },
    nPerAcre: 12,
    pPerAcre: 24,
    kPerAcre: 12,
    timing: {
      mr: 'पेरणीच्या वेळी सर्व खते बेसल डोस म्हणून एकरकमी द्यावीत.',
      en: 'Apply entire dosage as basal application during sowing.'
    }
  },
  turmeric: {
    name: { mr: 'हळद (Turmeric)', en: 'Turmeric' },
    nPerAcre: 80,
    pPerAcre: 40,
    kPerAcre: 40,
    timing: {
      mr: 'लागवडीवेळी, ४५ दिवसांनी आणि ९० ते १०५ दिवसांनी खतांची मात्रा विभागून द्यावी.',
      en: 'Apply in 3 splits: at sowing, 45 days, and 90-105 days after planting.'
    }
  },
  wheat: {
    name: { mr: 'गहू (Wheat)', en: 'Wheat' },
    nPerAcre: 48,
    pPerAcre: 24,
    kPerAcre: 16,
    timing: {
      mr: 'पेरणीवेळी निम्मे नत्र व पूर्ण स्फुरद-पालाश. उर्वरित नत्र पहिल्या पाण्यावेळी (२१ दिवस) द्यावे.',
      en: 'Half N + full P & K at sowing; remaining N at CRI stage (21 days).'
    }
  },
  maize: {
    name: { mr: 'मका (Maize)', en: 'Maize' },
    nPerAcre: 48,
    pPerAcre: 24,
    kPerAcre: 16,
    timing: {
      mr: 'पेरणीवेळी, गुडघाभर उंचीवर असताना आणि तुरा निघताना खतांचे हप्ते द्यावेत.',
      en: 'Split into sowing, knee-high stage, and tasseling stage.'
    }
  },
  chickpea: {
    name: { mr: 'हरभरा (Chickpea)', en: 'Chickpea' },
    nPerAcre: 10,
    pPerAcre: 20,
    kPerAcre: 12,
    timing: {
      mr: 'पेरणीच्या वेळी बियाण्याखाली ५ सेमी खोल खत द्यावे.',
      en: 'Place basal dose 5 cm below seed depth during sowing.'
    }
  }
};

export const FertilizerCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCropKey, setSelectedCropKey] = useState<string>('sugarcane');
  const [acres, setAcres] = useState<number>(1);

  const profile = cropProfiles[selectedCropKey] || cropProfiles['sugarcane'];
  const safeAcres = acres > 0 ? acres : 0;

  // NPK calculation
  // DAP (18:46:0) -> 100kg DAP provides 18kg N and 46kg P
  // Urea (46:0:0) -> 100kg Urea provides 46kg N
  // MOP (0:0:60)  -> 100kg MOP provides 60kg K
  const totalP = profile.pPerAcre * safeAcres;
  const totalK = profile.kPerAcre * safeAcres;
  const totalN = profile.nPerAcre * safeAcres;

  // DAP required for P
  const dapKg = totalP > 0 ? (totalP / 0.46) : 0;
  const dapBags = (dapKg / 50).toFixed(1);

  // Nitrogen from DAP
  const nFromDap = dapKg * 0.18;
  const remainingN = Math.max(0, totalN - nFromDap);

  // Urea required for remaining N (45kg bag standard in India)
  const ureaKg = remainingN > 0 ? (remainingN / 0.46) : 0;
  const ureaBags = (ureaKg / 45).toFixed(1);

  // MOP required for K (50kg bag)
  const mopKg = totalK > 0 ? (totalK / 0.60) : 0;
  const mopBags = (mopKg / 50).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center">
          <FlaskConical className="w-6 h-6 text-forest-700" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-forest-900">
            {language === 'mr' ? 'खत व्यवस्थापन गणक (NPK)' : 'Fertilizer Dosage Calculator'}
          </h3>
          <p className="text-sm text-charcoal-muted">
            {language === 'mr'
              ? 'तुमच्या पिकासाठी आणि जमिनीनुसार आवश्यक खतांच्या बॅगांचे प्रमाण'
              : 'Compute commercial Urea, DAP & MOP bags required for your acreage'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'पीक निवडा' : 'Select Crop'}
          </label>
          <select
            value={selectedCropKey}
            onChange={(e) => setSelectedCropKey(e.target.value)}
            className="w-full px-4 py-3 text-base font-semibold text-charcoal bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
          >
            {Object.entries(cropProfiles).map(([key, data]) => (
              <option key={key} value={key}>
                {data.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'जमीन क्षेत्र (एकर मध्ये)' : 'Land Area (in Acres)'}
          </label>
          <input
            type="number"
            min="0.1"
            step="0.5"
            value={acres === 0 ? '' : acres}
            onChange={(e) => setAcres(parseFloat(e.target.value) || 0)}
            placeholder="1"
            className="w-full px-4 py-3 text-lg font-bold text-forest-950 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Bag Outputs */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-forest-800">
          <Sparkles className="w-4 h-4 text-fresh" />
          <span>
            {language === 'mr'
              ? `${acres} एकरासाठी आवश्यक खतांच्या गोण्या (Bags):`
              : `Recommended Fertilizer Bags for ${acres} Acre(s):`}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-forest-50/70 border border-forest-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-forest-900">
                {language === 'mr' ? 'युरिया (Urea)' : 'Urea (46% N)'}
              </span>
              <span className="text-xs bg-forest-200 text-forest-800 px-2 py-0.5 rounded-full font-semibold">
                ४५ किलो बॅग
              </span>
            </div>
            <div className="text-3xl font-black text-forest-800 mt-2">
              {ureaBags} <span className="text-sm font-semibold text-charcoal-muted">बॅगा</span>
            </div>
            <div className="text-xs text-charcoal-muted mt-1">
              {Math.round(ureaKg)} किलो युरिया
            </div>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-amber-950">
                {language === 'mr' ? 'डीएपी (DAP)' : 'DAP (18:46:0)'}
              </span>
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                ५० किलो बॅग
              </span>
            </div>
            <div className="text-3xl font-black text-amber-900 mt-2">
              {dapBags} <span className="text-sm font-semibold text-charcoal-muted">बॅगा</span>
            </div>
            <div className="text-xs text-charcoal-muted mt-1">
              {Math.round(dapKg)} किलो डीएपी
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold text-emerald-950">
                {language === 'mr' ? 'एमओपी पोटॅश (MOP)' : 'MOP Potash (60% K)'}
              </span>
              <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-semibold">
                ५० किलो बॅग
              </span>
            </div>
            <div className="text-3xl font-black text-emerald-900 mt-2">
              {mopBags} <span className="text-sm font-semibold text-charcoal-muted">बॅगा</span>
            </div>
            <div className="text-xs text-charcoal-muted mt-1">
              {Math.round(mopKg)} किलो पोटॅश
            </div>
          </div>
        </div>
      </div>

      {/* Advisory Timing */}
      <div className="p-4 rounded-xl bg-[#F8FAF7] border border-forest-100 flex items-start gap-3 text-xs md:text-sm text-charcoal">
        <Info className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-forest-900 block mb-0.5">
            {language === 'mr' ? 'खते देण्याची शिफारस वेळ (Application Schedule):' : 'Recommended Application Timing:'}
          </span>
          <p className="text-charcoal-muted leading-relaxed">
            {profile.timing[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
