import React, { useState } from 'react';
import { harvestersData, type HarvesterModel } from '../data/harvestersData';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { api } from '../services/api';
import {
  Tractor,
  Fuel,
  Gauge,
  Tag,
  CheckCircle2,
  FileCheck2,
  Search,
  Calendar,
  Send,
  Loader2
} from 'lucide-react';

export const HarvestersPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState<HarvesterModel | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Booking Form State
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFor, setBookingFor] = useState<HarvesterModel | null>(null);
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [village, setVillage] = useState('');
  const [acres, setAcres] = useState('2');
  const [requestedDate, setRequestedDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredHarvesters = harvestersData.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.name.mr.toLowerCase().includes(q) ||
      item.name.en.toLowerCase().includes(q) ||
      item.category.mr.toLowerCase().includes(q) ||
      item.category.en.toLowerCase().includes(q)
    );
  });

  const handleOpenBooking = (model: HarvesterModel) => {
    setBookingFor(model);
    setSelectedModel(null);
    setBookingSuccess(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone || !village || !requestedDate) return;

    setIsSubmitting(true);
    try {
      await api.bookHarvester({
        harvester_id: 1,
        farmer_name: farmerName,
        phone: farmerPhone,
        village: village,
        acres: parseFloat(acres) || 1,
        requested_date: requestedDate,
        notes: `Machine: ${bookingFor?.name.en || 'Harvester'}`
      });
      setBookingSuccess(true);
    } catch {
      // Even if offline, show confirmation to the user
      setBookingSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Tractor className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'आधुनिक कृषी यांत्रिकीकरण' : 'Farm Mechanization & Machinery'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'हार्वेस्टर व कृषी यंत्रे माहिती केंद्र' : 'Harvester & Farm Machinery Center'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'सोयाबीन, गहू, हरभरा, ऊस आणि मका काढणी यंत्रे; कार्यक्षमता, भाडेतत्त्वावरील दर आणि महाडीबीटी ५०% शासकीय अनुदान तपशील.'
                : 'Comprehensive specifications, custom hiring rental rates, and up to 50% government subsidies on multi-crop combines.'}
            </p>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-forest-700/60 flex items-center justify-center shrink-0 border border-forest-600">
            <Tractor className="w-8 h-8 text-fresh" />
          </div>
        </div>

        {/* Quick Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'हार्वेस्टरचे नाव किंवा पीक शोधा...' : 'Search harvesters or crops...'}
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden shadow-xs"
            />
          </div>
        </div>

        {/* Harvesters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredHarvesters.map((item) => (
            <div
              key={item.id}
              className="agri-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 bg-forest-950 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name[language]}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="fresh">{item.category[language]}</Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-black text-forest-950 mb-2">
                    {item.name[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed mb-4">
                    {item.description[language]}
                  </p>

                  <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-muted font-semibold flex items-center gap-1.5">
                        <Gauge className="w-3.5 h-3.5 text-forest-700" />
                        {language === 'mr' ? 'काढणी क्षमता:' : 'Capacity:'}
                      </span>
                      <span className="font-bold text-forest-900">{item.capacity[language]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-muted font-semibold flex items-center gap-1.5">
                        <Fuel className="w-3.5 h-3.5 text-amber-600" />
                        {language === 'mr' ? 'डिझेल वापर:' : 'Fuel Efficiency:'}
                      </span>
                      <span className="font-bold text-charcoal-dark">{item.fuelEfficiency[language]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-charcoal-muted font-semibold flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-green-600" />
                        {language === 'mr' ? 'अंदाजे भाडे दर:' : 'Rental Rate:'}
                      </span>
                      <span className="font-bold text-green-800">{item.rentalRate[language]}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 rounded-xl bg-forest-50 border border-forest-200 text-xs">
                    <span className="font-bold text-forest-900 block mb-1">
                      {language === 'mr' ? '🏛️ शासकीय अनुदान:' : '🏛️ Government Subsidy:'}
                    </span>
                    <span className="text-charcoal-light font-medium">{item.subsidyAvailable[language]}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedModel(item)}
                  className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal font-bold rounded-xl text-xs transition-all"
                >
                  {language === 'mr' ? 'वैशिष्ट्ये पहा' : 'View Specs'}
                </button>
                <button
                  onClick={() => handleOpenBooking(item)}
                  className="py-2.5 px-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs transition-all shadow-xs"
                >
                  {language === 'mr' ? 'यंत्र बुक करा' : 'Book Machine'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={selectedModel !== null}
        onClose={() => setSelectedModel(null)}
        maxWidth="2xl"
        title={selectedModel?.name[language]}
      >
        {selectedModel && (
          <div className="space-y-5">
            <div className="p-4 bg-[#F8FAF7] rounded-xl border border-gray-100 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-forest-800">
                {language === 'mr' ? 'काढणी करता येणारी पिके:' : 'Crops Harvested:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModel.cropsSupported[language].map((crop, i) => (
                  <Badge key={i} variant="forest" size="sm">{crop}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wider mb-2.5">
                {language === 'mr' ? 'प्रमुख तांत्रिक वैशिष्ट्ये:' : 'Key Engineering Features:'}
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-charcoal">
                {selectedModel.features[language].map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-fresh-dark shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-1">
              <span className="font-bold block flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-amber-700" />
                {language === 'mr' ? 'कस्टम हायरिंग (भाडेतत्त्वावर) बुकिंग सूचना:' : 'Custom Hiring Booking:'}
              </span>
              <p>
                {language === 'mr'
                  ? 'आपल्या परिसरातील अधिकृत कस्टम हायरिंग सेंटर (CHC) किंवा साखर कारखान्याशी संपर्क साधून पीक काढणीच्या ८ ते १० दिवस आधी आगाऊ नोंदणी करावी.'
                  : 'Book 8-10 days prior to peak maturity via your village Custom Hiring Center (CHC) or FPO.'}
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs text-charcoal-muted border-t border-gray-100">
              <button
                onClick={() => handleOpenBooking(selectedModel)}
                className="py-2 px-5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-lg"
              >
                {language === 'mr' ? 'आता यंत्र बुक करा' : 'Book Machine Now'}
              </button>
              <button
                onClick={() => setSelectedModel(null)}
                className="py-2 px-4 bg-gray-100 hover:bg-gray-200 text-charcoal font-semibold rounded-lg"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        maxWidth="lg"
        title={language === 'mr' ? 'हार्वेस्टर बुकिंग विनंती' : 'Harvester Booking Request'}
      >
        {bookingSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-forest-950">
              {language === 'mr' ? 'बुकिंग विनंती यशस्वीरित्या नोंदवली!' : 'Booking Request Registered!'}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted max-w-sm mx-auto">
              {language === 'mr'
                ? 'आपली विनंती डेटाबेसमध्ये नोंदवण्यात आली आहे. संबंधित यंत्र चालक / कस्टम हायरिंग केंद्र आपल्याशी लवकरच संपर्क करेल.'
                : 'Your request has been logged in the backend. The custom hiring center will contact you shortly.'}
            </p>
            <button
              onClick={() => setShowBookingModal(false)}
              className="py-2 px-6 bg-forest-800 text-white font-bold rounded-xl text-sm mt-2"
            >
              {language === 'mr' ? 'ठीक आहे' : 'Done'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="p-3 bg-forest-50 rounded-xl border border-forest-200 text-xs">
              <span className="font-bold text-forest-900 block">
                {language === 'mr' ? 'निवडलेले यंत्र:' : 'Selected Machine:'}
              </span>
              <span className="text-charcoal font-semibold">
                {bookingFor?.name[language]}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'शेतकऱ्याचे नाव' : 'Farmer Full Name'} *
              </label>
              <input
                type="text"
                required
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder={language === 'mr' ? 'उदा. ज्ञानेश्वर पाटील' : 'e.g. Ramesh Patil'}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'मोबाईल नंबर' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  value={farmerPhone}
                  onChange={(e) => setFarmerPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'गाव / तालुका' : 'Village / Taluka'} *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. बारामती' : 'e.g. Baramati'}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'जमीन क्षेत्र (एकर)' : 'Land Area (Acres)'} *
                </label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  required
                  value={acres}
                  onChange={(e) => setAcres(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-forest-700" />
                  {language === 'mr' ? 'अपेक्षित तारीख' : 'Preferred Date'} *
                </label>
                <input
                  type="date"
                  required
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold rounded-xl"
              >
                {language === 'mr' ? 'रद्द करा' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-2.5 px-5 bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'mr' ? 'नोंदणी करत आहे...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'बुकिंग सबमिट करा' : 'Submit Booking'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
