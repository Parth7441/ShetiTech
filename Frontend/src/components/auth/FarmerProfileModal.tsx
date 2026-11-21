import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { api } from '../../services/api';
import {
  Phone,
  MapPin,
  Tractor,
  LogOut,
  Save,
  CheckCircle2,
  Clock,
  Layers,
  Stethoscope,
  Sparkles,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface BookingItem {
  id: number;
  harvester_id: number;
  farmer_name: string;
  phone: string;
  village: string;
  acres: number;
  requested_date: string;
  status: string;
  notes?: string;
}

interface InquiryItem {
  id: number;
  farmer_name: string;
  phone: string;
  crop_name: string;
  district?: string;
  question: string;
  expert_answer?: string;
  status: string;
}

export const FarmerProfileModal: React.FC = () => {
  const { farmer, isProfileModalOpen, closeProfileModal, logout, updateProfile } = useAuth();
  const { language } = useLanguage();

  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'inquiries' | 'quicklinks'>('profile');
  const [name, setName] = useState(farmer?.name || '');
  const [district, setDistrict] = useState(farmer?.district || 'Pune');
  const [village, setVillage] = useState(farmer?.village || '');
  const [landSize, setLandSize] = useState(farmer?.landSizeAcres?.toString() || '3.5');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Sync state when farmer updates
  useEffect(() => {
    if (farmer) {
      setName(farmer.name);
      setDistrict(farmer.district);
      setVillage(farmer.village);
      setLandSize(farmer.landSizeAcres?.toString() || '3.5');
    }
  }, [farmer]);

  // Load farmer's harvester bookings and inquiries
  useEffect(() => {
    if (isProfileModalOpen && farmer?.phone) {
      setLoadingBookings(true);
      api.getBookings().then((allBookings: BookingItem[]) => {
        const filtered = allBookings.filter(
          (b) => b.phone === farmer.phone || b.farmer_name.includes(farmer.name)
        );
        setBookings(filtered.length > 0 ? filtered : allBookings.slice(0, 3));
        setLoadingBookings(false);
      });

      setLoadingInquiries(true);
      api.getInquiries(farmer.phone).then((res: InquiryItem[]) => {
        setInquiries(res || []);
        setLoadingInquiries(false);
      });
    }
  }, [isProfileModalOpen, farmer]);

  if (!farmer) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      name,
      district,
      village,
      landSizeAcres: parseFloat(landSize) || 3.0
    });
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <Modal
      isOpen={isProfileModalOpen}
      onClose={closeProfileModal}
      maxWidth="lg"
      title={language === 'mr' ? 'शेतकरी प्रोफाईल व सेवा केंद्र' : 'Farmer Profile & Services'}
    >
      <div className="space-y-6">
        
        {/* Header Farmer Info Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-forest-900 to-forest-800 text-white flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-fresh/20 border border-fresh/30 flex items-center justify-center text-fresh font-black text-2xl shrink-0">
              {farmer.name ? farmer.name[0] : '👨‍🌾'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">{farmer.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-fresh text-forest-950 uppercase tracking-wide">
                  {language === 'mr' ? 'सत्यापित शेतकरी' : 'Verified'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-200 mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-fresh" />
                  +91 {farmer.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-fresh" />
                  {farmer.village ? `${farmer.village}, ` : ''}{farmer.district}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-fresh" />
                  {farmer.landSizeAcres} {language === 'mr' ? 'एकर जमीन' : 'Acres'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title={language === 'mr' ? 'लॉगआउट' : 'Logout'}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
          >
            <LogOut className="w-5 h-5 text-red-300" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 sm:px-4 transition-all relative shrink-0 ${
              activeTab === 'profile'
                ? 'text-forest-800 border-b-2 border-forest-800'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {language === 'mr' ? 'माझी माहिती' : 'Personal Details'}
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-3 sm:px-4 transition-all relative shrink-0 ${
              activeTab === 'bookings'
                ? 'text-forest-800 border-b-2 border-forest-800'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {language === 'mr' ? 'हार्वेस्टर बुकिंग' : 'Machinery Bookings'}
            {bookings.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-forest-100 text-forest-800 font-bold">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`pb-3 px-3 sm:px-4 transition-all relative shrink-0 ${
              activeTab === 'inquiries'
                ? 'text-forest-800 border-b-2 border-forest-800'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {language === 'mr' ? 'माझे प्रश्न व सल्ला' : 'My Inquiries'}
            {inquiries.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">
                {inquiries.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('quicklinks')}
            className={`pb-3 px-3 sm:px-4 transition-all relative shrink-0 ${
              activeTab === 'quicklinks'
                ? 'text-forest-800 border-b-2 border-forest-800'
                : 'text-charcoal-muted hover:text-charcoal'
            }`}
          >
            {language === 'mr' ? 'शेती सेवा' : 'Farm Tools'}
          </button>
        </div>

        {/* TAB 1: Edit Profile */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {saveSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>
                  {language === 'mr' ? 'माहिती यशस्वीरित्या जतन केली!' : 'Profile updated successfully!'}
                </span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'शेतकऱ्याचे संपूर्ण नाव' : 'Farmer Name'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'जिल्हा' : 'District'}
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'गाव / परिसर' : 'Village'}
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'एकूण जमीन क्षेत्र (एकर)' : 'Land Area (Acres)'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="py-2.5 px-6 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>
                  {isSaving
                    ? language === 'mr'
                      ? 'जतन करत आहे...'
                      : 'Saving...'
                    : language === 'mr'
                    ? 'बदल जतन करा'
                    : 'Save Changes'}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            {loadingBookings ? (
              <p className="text-center py-6 text-xs text-charcoal-muted">
                {language === 'mr' ? 'बुकिंग माहिती लोड होत आहे...' : 'Loading bookings...'}
              </p>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 bg-[#F8FAF7] rounded-2xl border border-gray-100">
                <Tractor className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-charcoal-muted font-medium">
                  {language === 'mr'
                    ? 'अद्याप कोणतेही यंत्र बुक केलेले नाही.'
                    : 'No machinery bookings yet.'}
                </p>
                <Link
                  to="/harvesters"
                  onClick={closeProfileModal}
                  className="inline-block mt-3 text-xs font-bold text-forest-800 hover:underline"
                >
                  {language === 'mr' ? 'हार्वेस्टर सूची पहा व बुक करा →' : 'Browse & Book Harvesters →'}
                </Link>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 rounded-xl bg-[#F8FAF7] border border-gray-200 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Tractor className="w-4 h-4 text-forest-700" />
                      <span className="font-bold text-sm text-forest-950">
                        {b.notes || (language === 'mr' ? 'कम्बाईन हार्वेस्टर' : 'Combine Harvester')}
                      </span>
                    </div>
                    <div className="text-xs text-charcoal-muted">
                      📍 {b.village} • {b.acres} {language === 'mr' ? 'एकर' : 'Acres'} • 📅 {b.requested_date}
                    </div>
                  </div>

                  <Badge
                    variant={b.status === 'confirmed' ? 'fresh' : 'amber'}
                    size="sm"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {b.status === 'confirmed'
                      ? (language === 'mr' ? 'मंजूर' : 'Confirmed')
                      : (language === 'mr' ? 'प्रलंबित' : 'Pending')}
                  </Badge>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: Crop Doctor Inquiries & Advisories */}
        {activeTab === 'inquiries' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-muted uppercase">
                {language === 'mr' ? 'माझे विचारलेले प्रश्न व सल्ला' : 'My Questions & Expert Answers'}
              </span>
              <Link
                to="/crop-doctor"
                onClick={closeProfileModal}
                className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1"
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? '+ नवीन प्रश्न विचारा' : '+ Ask New Question'}</span>
              </Link>
            </div>

            {loadingInquiries ? (
              <div className="text-center py-8 text-xs text-charcoal-muted">
                {language === 'mr' ? 'प्रश्न लोड होत आहेत...' : 'Loading inquiries...'}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-8 bg-[#F8FAF7] rounded-2xl border border-gray-100">
                <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-xs text-charcoal-muted font-medium">
                  {language === 'mr'
                    ? 'आपण अद्याप कोणताही प्रश्न विचारलेला नाही.'
                    : 'No crop inquiries submitted yet.'}
                </p>
                <Link
                  to="/crop-doctor"
                  onClick={closeProfileModal}
                  className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-forest-800 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-forest-900 transition-colors"
                >
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'पीक डॉक्टरला विचारा' : 'Consult Crop Doctor'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-xl bg-[#F8FAF7] border border-gray-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-forest-100 text-forest-800">
                      🌾 {inq.crop_name}
                    </span>
                    <Badge variant="fresh" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {language === 'mr' ? 'सल्ला उपलब्ध' : 'Advisory Ready'}
                    </Badge>
                  </div>

                  <p className="text-xs font-bold text-forest-950">
                    ❓ {inq.question}
                  </p>

                  {inq.expert_answer && (
                    <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed font-medium">
                      <strong className="block text-emerald-900 font-bold mb-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        {language === 'mr' ? 'कृषी तज्ज्ञ शिफारस:' : 'Expert Advisory Recommendation:'}
                      </strong>
                      {inq.expert_answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Quick Farm Tools */}
        {activeTab === 'quicklinks' && (
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/crop-doctor"
              onClick={closeProfileModal}
              className="col-span-2 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-forest-50 border border-emerald-200 hover:border-emerald-400 transition-all text-left flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-black text-forest-950 flex items-center gap-1.5 mb-0.5">
                  <Stethoscope className="w-4 h-4 text-emerald-600" />
                  {language === 'mr' ? 'पीक डॉक्टर व किड-रोग निदान' : 'Crop Doctor & Pest Diagnosis'}
                </span>
                <span className="text-[11px] text-charcoal-muted">
                  {language === 'mr'
                    ? 'सोयाबीन, ऊस, कांदा, हळद रोगांचे निदान व अचूक फवारणी डोस'
                    : 'ICAR research-backed disease treatment & spray dosage'}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-forest-800 shrink-0" />
            </Link>

            <Link
              to="/calculators#fertilizer"
              onClick={closeProfileModal}
              className="p-4 rounded-xl bg-forest-50/70 border border-forest-100 hover:border-forest-300 transition-all text-left flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-forest-900 block mb-1">
                🧪 {language === 'mr' ? 'खत मात्रा गणक' : 'Fertilizer Calculator'}
              </span>
              <span className="text-[11px] text-charcoal-muted">
                {language === 'mr' ? 'आपल्या जमिनीनुसार युरिया, डीएपी शिफारस' : 'Tailored NPK dosages'}
              </span>
            </Link>

            <Link
              to="/weather"
              onClick={closeProfileModal}
              className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 hover:border-blue-300 transition-all text-left flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-blue-900 block mb-1">
                🌦️ {language === 'mr' ? 'हवामान व फवारणी सल्ला' : 'Weather & Spray Guide'}
              </span>
              <span className="text-[11px] text-charcoal-muted">
                {language === 'mr' ? `${farmer.district} हवामान अंदाज` : `${farmer.district} 5-day forecast`}
              </span>
            </Link>

            <Link
              to="/mandi"
              onClick={closeProfileModal}
              className="p-4 rounded-xl bg-amber-50/60 border border-amber-100 hover:border-amber-300 transition-all text-left flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-amber-900 block mb-1">
                📊 {language === 'mr' ? 'आजचे बाजारभाव' : 'Live Mandi Rates'}
              </span>
              <span className="text-[11px] text-charcoal-muted">
                {language === 'mr' ? 'लातूर, नाशिक, पुणे APMC दर' : 'Check Maharashtra APMC rates'}
              </span>
            </Link>

            <Link
              to="/subsidies"
              onClick={closeProfileModal}
              className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 hover:border-purple-300 transition-all text-left flex flex-col justify-between"
            >
              <span className="text-xs font-bold text-purple-900 block mb-1">
                🏛️ {language === 'mr' ? 'शासकीय योजना' : 'Govt Subsidies'}
              </span>
              <span className="text-[11px] text-charcoal-muted">
                {language === 'mr' ? 'महाडीबीटी योजना व अर्ज' : 'MahaDBT 50% schemes'}
              </span>
            </Link>
          </div>
        )}

      </div>
    </Modal>
  );
};
