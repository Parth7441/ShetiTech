import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sprout, Ruler, Sparkles } from 'lucide-react';

interface SeedCropInfo {
  name: { mr: string; en: string };
  seedPerAcreKg: number;
  rowSpacingCm: number;
  plantSpacingCm: number;
  seedTreatment: { mr: string; en: string };
}

const seedProfiles: Record<string, SeedCropInfo> = {
  soybean: {
    name: { mr: 'सोयाबीन (Soybean)', en: 'Soybean' },
    seedPerAcreKg: 25, // 25-30 kg per acre
    rowSpacingCm: 45,
    plantSpacingCm: 7.5,
    seedTreatment: {
      mr: 'रायझोबियम आणि PSB जीवाणू संवर्धन प्रत्येकी २५ ग्रॅम प्रति किलो बियाण्यास चोळावे.',
      en: 'Coat with Rhizobium and PSB bio-fertilizer @ 25g/kg seed before sowing.'
    }
  },
  wheat: {
    name: { mr: 'गहू (Wheat)', en: 'Wheat' },
    seedPerAcreKg: 40,
    rowSpacingCm: 22.5,
    plantSpacingCm: 5,
    seedTreatment: {
      mr: 'कॅप्टन किंवा थायरम ३ ग्रॅम प्रति किलो बियाण्यास लावून पेरणी करावी.',
      en: 'Treat seed with Captan or Thiram @ 3g/kg seed.'
    }
  },
  chickpea: {
    name: { mr: 'हरभरा (Gram)', en: 'Chickpea / Gram' },
    seedPerAcreKg: 30,
    rowSpacingCm: 30,
    plantSpacingCm: 10,
    seedTreatment: {
      mr: 'ट्रायकोडर्मा ५ ग्रॅम + रायझोबियम २५ ग्रॅम प्रति किलो बियाण्यास चोळावे.',
      en: 'Trichoderma viride 5g + Rhizobium 25g per kg seed to prevent wilt.'
    }
  },
  maize: {
    name: { mr: 'मका (Maize)', en: 'Maize' },
    seedPerAcreKg: 8,
    rowSpacingCm: 60,
    plantSpacingCm: 20,
    seedTreatment: {
      mr: 'थायमेथॉक्झाम किंवा इमिडाक्लोप्रिड ५ ग्रॅम प्रति किलो बियाण्यास प्रक्रिया करावी.',
      en: 'Thiamethoxam 70 WS @ 5g/kg seed for early sucking pest defense.'
    }
  },
  onion: {
    name: { mr: 'कांदा रोपवाटिका (Onion Seedbed)', en: 'Onion Seedbed' },
    seedPerAcreKg: 4, // 3-4 kg per acre
    rowSpacingCm: 15,
    plantSpacingCm: 10,
    seedTreatment: {
      mr: 'थायरम २.५ ग्रॅम प्रति किलो बियाण्यास लावून रोपवाटिका तयार करावी.',
      en: 'Thiram @ 2.5g/kg seed to protect young nursery seedlings from damping off.'
    }
  }
};

export const SeedCalculator: React.FC = () => {
  const { language } = useLanguage();
  const [cropKey, setCropKey] = useState<string>('soybean');
  const [acres, setAcres] = useState<number>(1);

  const profile = seedProfiles[cropKey] || seedProfiles['soybean'];
  const safeAcres = acres > 0 ? acres : 0;
  const totalKg = (profile.seedPerAcreKg * safeAcres).toFixed(1);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-200 text-forest-800 flex items-center justify-center">
          <Sprout className="w-6 h-6 text-forest-700" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-forest-900">
            {language === 'mr' ? 'बियाणे प्रमाण व अंतर गणक' : 'Seed Rate & Spacing Calculator'}
          </h3>
          <p className="text-sm text-charcoal-muted">
            {language === 'mr'
              ? 'क्षेत्रफळानुसार अचूक बियाणे आणि ओळीतील शिफारस केलेले अंतर'
              : 'Determine required seed mass and optimal row-to-plant geometric spacing'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'पीक निवडा' : 'Select Crop'}
          </label>
          <select
            value={cropKey}
            onChange={(e) => setCropKey(e.target.value)}
            className="w-full px-4 py-3 text-base font-semibold text-charcoal bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
          >
            {Object.entries(seedProfiles).map(([key, data]) => (
              <option key={key} value={key}>
                {data.name[language]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-light uppercase tracking-wider mb-2">
            {language === 'mr' ? 'जमीन क्षेत्र (एकर)' : 'Land Area (Acres)'}
          </label>
          <input
            type="number"
            min="0.25"
            step="0.5"
            value={acres === 0 ? '' : acres}
            onChange={(e) => setAcres(parseFloat(e.target.value) || 0)}
            placeholder="1"
            className="w-full px-4 py-3 text-lg font-bold text-forest-950 bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Output Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-forest-50 border border-forest-200 rounded-xl p-4">
          <span className="text-xs text-charcoal-muted font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'एकूण आवश्यक बियाणे' : 'Required Seed Quantity'}
          </span>
          <div className="text-3xl font-black text-forest-900 mt-2">
            {totalKg} <span className="text-sm font-semibold text-charcoal-muted">किलो</span>
          </div>
          <span className="text-xs text-forest-700 mt-1 block">
            ({profile.seedPerAcreKg} {language === 'mr' ? 'कि./एकर' : 'kg/acre'})
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <span className="text-xs text-charcoal-muted font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'दोन ओळींमधील अंतर' : 'Row Spacing'}
          </span>
          <div className="text-3xl font-black text-amber-900 mt-2">
            {profile.rowSpacingCm} <span className="text-sm font-semibold text-charcoal-muted">सेमी</span>
          </div>
          <span className="text-xs text-amber-800 mt-1 block">
            (~{(profile.rowSpacingCm / 30.48).toFixed(1)} {language === 'mr' ? 'फूट' : 'feet'})
          </span>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <span className="text-xs text-charcoal-muted font-bold uppercase tracking-wider block">
            {language === 'mr' ? 'दोन रोपांमधील अंतर' : 'Plant Spacing'}
          </span>
          <div className="text-3xl font-black text-emerald-900 mt-2">
            {profile.plantSpacingCm} <span className="text-sm font-semibold text-charcoal-muted">सेमी</span>
          </div>
          <span className="text-xs text-emerald-800 mt-1 block">
            (~{(profile.plantSpacingCm / 2.54).toFixed(1)} {language === 'mr' ? 'इंच' : 'inches'})
          </span>
        </div>
      </div>

      {/* Seed Treatment */}
      <div className="p-4 rounded-xl bg-[#F8FAF7] border border-forest-100 flex items-start gap-3 text-xs md:text-sm text-charcoal">
        <Ruler className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-forest-900 block mb-0.5 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-fresh" />
            {language === 'mr' ? 'शिफारस केलेली बीजप्रक्रिया (Seed Treatment):' : 'Recommended Seed Treatment:'}
          </span>
          <p className="text-charcoal-muted leading-relaxed">
            {profile.seedTreatment[language]}
          </p>
        </div>
      </div>
    </div>
  );
};
