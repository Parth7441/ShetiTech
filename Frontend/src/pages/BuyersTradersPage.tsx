import React, { useState } from 'react';
import { buyersTradersData, type BuyerTrader } from '../data/buyersTradersData';
import { useLanguage } from '../context/LanguageContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import {
  Users,
  ShieldCheck,
  MapPin,
  PhoneCall,
  Search,
  PlusCircle,
  CheckCircle,
  Building2,
  DollarSign
} from 'lucide-react';

export const BuyersTradersPage: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrader, setSelectedTrader] = useState<BuyerTrader | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const filteredTraders = buyersTradersData.filter((trader) => {
    const q = searchTerm.toLowerCase();
    return (
      trader.name.mr.toLowerCase().includes(q) ||
      trader.name.en.toLowerCase().includes(q) ||
      trader.firmName.mr.toLowerCase().includes(q) ||
      trader.firmName.en.toLowerCase().includes(q) ||
      trader.district.mr.toLowerCase().includes(q) ||
      trader.district.en.toLowerCase().includes(q)
    );
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterSuccess(false);
      setShowRegisterModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-10 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-forest-900 to-forest-800 text-white p-8 rounded-3xl shadow-lg border border-forest-700 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-700/80 text-fresh text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'शेतमाल थेट विक्री नेटवर्क' : 'Direct Buyer & Trader Network'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'खरेदीदार, व्यापारी व FPO डिरेक्टरी' : 'Buyers, Traders & FPO Directory'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl">
              {language === 'mr'
                ? 'कांदा, सोयाबीन, हळद, भाजीपाला व धान्य खरेदी करणारे महाराष्ट्रातील नोंदणीकृत व्यापारी, प्रक्रियादार व शेतकरी उत्पादक कंपन्या (FPO).'
                : 'Verified direct traders, agro-processing units, and FPOs purchasing commodities across Maharashtra.'}
            </p>
          </div>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="px-6 py-3.5 bg-fresh hover:bg-fresh-light text-forest-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-forest-950" />
            <span>{language === 'mr' ? 'शेतमाल विक्री नोंदणी करा' : 'Register Commodity for Sale'}</span>
          </button>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={language === 'mr' ? 'जिल्हा, व्यापारी किंवा पीक शोधा...' : 'Search trader, crop or district...'}
              className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden shadow-xs"
            />
          </div>
        </div>

        {/* Traders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTraders.map((trader) => (
            <div
              key={trader.id}
              className="agri-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700">
                    <Building2 className="w-6 h-6" />
                  </div>
                  {trader.verifiedBadge && (
                    <Badge variant="fresh" size="sm">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'प्रमाणित व्यापारी' : 'Verified'}</span>
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-black text-forest-950 mb-1">
                  {trader.firmName[language]}
                </h3>

                <p className="text-xs font-semibold text-charcoal-muted mb-4">
                  {trader.name[language]}
                </p>

                <div className="space-y-2.5 text-xs border-t border-gray-100 pt-3">
                  <div>
                    <span className="text-charcoal-muted font-bold block mb-1">
                      {language === 'mr' ? 'खरेदी केले जाणारे शेतमाल:' : 'Commodities Procured:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {trader.cropsBought[language].map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-forest-50 text-forest-800 font-semibold text-[11px] border border-forest-200">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-charcoal pt-1">
                    <MapPin className="w-4 h-4 text-forest-700 shrink-0" />
                    <span className="truncate">{trader.location[language]} ({trader.district[language]})</span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-charcoal-muted bg-[#F8FAF7] p-2.5 rounded-xl border border-gray-100">
                    <DollarSign className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>{trader.paymentTerms[language]}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedTrader(trader)}
                  className="w-full py-2.5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-fresh" />
                  <span>{language === 'mr' ? 'संपर्क क्रमांक व चौकशी' : 'View Contact Details'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Trader Contact Modal */}
      <Modal
        isOpen={selectedTrader !== null}
        onClose={() => setSelectedTrader(null)}
        maxWidth="md"
        title={selectedTrader?.firmName[language]}
      >
        {selectedTrader && (
          <div className="space-y-4 text-sm text-charcoal">
            <div className="bg-forest-50 p-4 rounded-xl border border-forest-200 text-center">
              <span className="text-xs text-forest-800 font-bold uppercase tracking-wider block mb-1">
                {language === 'mr' ? 'थेट फोन / व्हॉट्सॲप संपर्क:' : 'Direct Phone & WhatsApp:'}
              </span>
              <div className="text-2xl font-black text-forest-950">
                {selectedTrader.phone}
              </div>
              <span className="text-xs text-charcoal-muted mt-1 block">
                ({selectedTrader.contactPerson})
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <strong>{language === 'mr' ? 'पत्ता / मुख्य कार्यालय:' : 'Location Address:'}</strong>
                <p className="text-charcoal-muted mt-0.5">{selectedTrader.location[language]}, {selectedTrader.district[language]}</p>
              </div>
              <div>
                <strong>{language === 'mr' ? 'पेमेंट अटी:' : 'Payment Terms:'}</strong>
                <p className="text-charcoal-muted mt-0.5">{selectedTrader.paymentTerms[language]}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedTrader(null)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 font-semibold rounded-xl text-xs"
            >
              {language === 'mr' ? 'बंद करा' : 'Close'}
            </button>
          </div>
        )}
      </Modal>

      {/* Commodity Registration Modal */}
      <Modal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        maxWidth="md"
        title={language === 'mr' ? 'शेतमाल विक्री नोंदणी (शेतकऱ्यांसाठी)' : 'Register Crop for Sale'}
      >
        {registerSuccess ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-fresh mx-auto" />
            <h3 className="text-lg font-bold text-forest-900">
              {language === 'mr' ? 'शेतमाल यशस्वीरित्या नोंदवला गेला!' : 'Commodity Registered Successfully!'}
            </h3>
            <p className="text-xs text-charcoal-muted">
              {language === 'mr'
                ? 'नजीकचे व्यापारी २४ तासांच्या आत आपल्याशी संपर्क साधतील.'
                : 'Designated buyers and traders in your district will contact you shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-charcoal-dark mb-1">
                {language === 'mr' ? 'शेतकऱ्याचे नाव:' : 'Farmer Full Name:'}
              </label>
              <input required type="text" placeholder="उदा. रमेश पाटील" className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-charcoal-dark mb-1">
                  {language === 'mr' ? 'मोबाईल नंबर:' : 'Mobile Number:'}
                </label>
                <input required type="tel" placeholder="98XXXXXXXX" className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-charcoal-dark mb-1">
                  {language === 'mr' ? 'जिल्हा:' : 'District:'}
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-xl">
                  <option>नाशिक (Nashik)</option>
                  <option>पुणे (Pune)</option>
                  <option>लातूर (Latur)</option>
                  <option>सांगली (Sangli)</option>
                  <option>सोलापूर (Solapur)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-charcoal-dark mb-1">
                  {language === 'mr' ? 'शेतमाल:' : 'Commodity:'}
                </label>
                <input required type="text" placeholder="कांदा / सोयाबीन / हळद" className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block font-bold text-charcoal-dark mb-1">
                  {language === 'mr' ? 'अंदाजे प्रमाण (क्विंटल):' : 'Quantity (Qtl):'}
                </label>
                <input required type="number" placeholder="50" className="w-full px-3 py-2 border border-gray-200 rounded-xl" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm shadow-md"
              >
                {language === 'mr' ? 'नोंदणी सबमिट करा' : 'Submit Registration'}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
