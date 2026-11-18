import React from 'react';
import type { Crop } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import {
  Calendar,
  Clock,
  Droplets,
  Layers,
  TrendingUp,
  FlaskConical,
  Bug,
  DollarSign
} from 'lucide-react';

interface CropDetailModalProps {
  crop: Crop | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCalculator?: () => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  isOpen,
  onClose,
  onOpenCalculator
}) => {
  const { language, t } = useLanguage();

  if (!crop) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="2xl"
      title={
        <div className="flex items-center gap-2">
          <span>{crop.name[language]}</span>
          <span className="text-xs text-charcoal-muted font-normal italic">
            ({crop.botanicalName})
          </span>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Banner with Crop Image & Highlights */}
        <div className="relative rounded-2xl overflow-hidden h-52 sm:h-64 shadow-md">
          <img
            src={crop.image}
            alt={crop.name[language]}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent flex items-end p-5">
            <div className="text-white">
              <Badge variant="fresh" size="sm" className="mb-2">
                {crop.badge[language]}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black">
                {crop.name[language]}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 mt-1 line-clamp-2">
                {crop.description[language]}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Spec Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-[#F8FAF7] p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              {t('cropsSection.duration')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-forest-950 block">
              {crop.duration[language]}
            </span>
          </div>

          <div className="bg-[#F8FAF7] p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase flex items-center gap-1 mb-1">
              <Droplets className="w-3.5 h-3.5 text-forest-700" />
              {t('cropsSection.water')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-forest-950 block">
              {crop.waterRequirement[language]}
            </span>
          </div>

          <div className="bg-[#F8FAF7] p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase flex items-center gap-1 mb-1">
              <Layers className="w-3.5 h-3.5 text-forest-700" />
              {t('cropsSection.soil')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-forest-950 block truncate" title={crop.soilType[language]}>
              {crop.soilType[language]}
            </span>
          </div>

          <div className="bg-[#F8FAF7] p-3 rounded-xl border border-gray-100">
            <span className="text-[11px] font-bold text-charcoal-muted uppercase flex items-center gap-1 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-forest-700" />
              {t('cropsSection.yield')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-forest-950 block">
              {crop.avgYield[language]}
            </span>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-4 text-sm text-charcoal leading-relaxed">
          {/* Sowing Period */}
          <div className="p-4 rounded-xl bg-forest-50/50 border border-forest-100">
            <h4 className="font-bold text-forest-900 flex items-center gap-2 mb-1.5 text-sm">
              <Calendar className="w-4 h-4 text-forest-700" />
              {t('modal.sowing')}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-light">
              {crop.sowingPeriod[language]}
            </p>
          </div>

          {/* Fertilizer Schedule */}
          <div className="p-4 rounded-xl bg-[#F8FAF7] border border-gray-100">
            <h4 className="font-bold text-forest-900 flex items-center gap-2 mb-1.5 text-sm">
              <FlaskConical className="w-4 h-4 text-forest-700" />
              {t('modal.fertilizer')}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-light">
              {crop.fertilizerInfo[language]}
            </p>
          </div>

          {/* Pest & Disease Control */}
          <div className="p-4 rounded-xl bg-[#F8FAF7] border border-gray-100">
            <h4 className="font-bold text-forest-900 flex items-center gap-2 mb-1.5 text-sm">
              <Bug className="w-4 h-4 text-forest-700" />
              {t('modal.pest')}
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-light">
              {crop.pestControl[language]}
            </p>
          </div>

          {/* Expected Profit */}
          <div className="p-4 rounded-xl bg-green-50/60 border border-green-200">
            <h4 className="font-bold text-green-900 flex items-center gap-2 mb-1.5 text-sm">
              <DollarSign className="w-4 h-4 text-green-700" />
              {t('modal.profit')}
            </h4>
            <p className="text-xs sm:text-sm font-semibold text-green-950">
              {crop.profitEstimate[language]}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          {onOpenCalculator && (
            <button
              onClick={() => {
                onClose();
                onOpenCalculator();
              }}
              className="flex-1 py-3 px-4 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-center text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <FlaskConical className="w-4 h-4 text-fresh" />
              {language === 'mr' ? 'या पिकाचा खत डोस काढा' : 'Calculate Fertilizer for this Crop'}
            </button>
          )}

          <button
            onClick={onClose}
            className="py-3 px-6 bg-gray-100 hover:bg-gray-200 text-charcoal font-semibold rounded-xl text-center text-sm transition-all"
          >
            {t('modal.close')}
          </button>
        </div>
      </div>
    </Modal>
  );
};
