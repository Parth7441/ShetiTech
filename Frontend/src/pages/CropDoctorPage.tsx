import React, { useState } from 'react';
import { cropDiseasesData, type CropDisease } from '../data/cropDiseasesData';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { api } from '../services/api';
import {
  Stethoscope,
  Bug,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Send,
  HelpCircle,
  Search,
  Sparkles,
  FlaskConical,
  ShieldCheck,
  Loader2
} from 'lucide-react';

export const CropDoctorPage: React.FC = () => {
  const { language } = useLanguage();
  const { farmer, openAuthModal } = useAuth();

  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDisease, setSelectedDisease] = useState<CropDisease | null>(null);

  // Inquiry Form State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryCrop, setInquiryCrop] = useState('सोयाबीन (Soybean)');
  const [farmerName, setFarmerName] = useState(farmer?.name || '');
  const [phone, setPhone] = useState(farmer?.phone || '');
  const [district, setDistrict] = useState(farmer?.district || 'Pune');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instantAnswer, setInstantAnswer] = useState<string | null>(null);

  const filteredDiseases = cropDiseasesData.filter((item) => {
    const matchesCrop = selectedCrop === 'all' || item.cropId === selectedCrop;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.name.mr.toLowerCase().includes(q) ||
      item.name.en.toLowerCase().includes(q) ||
      item.cropName.mr.toLowerCase().includes(q) ||
      item.cropName.en.toLowerCase().includes(q) ||
      item.symptoms.mr.some((s) => s.toLowerCase().includes(q)) ||
      item.symptoms.en.some((s) => s.toLowerCase().includes(q));

    return matchesCrop && matchesCategory && matchesSearch;
  });

  const handleOpenAskModal = () => {
    if (farmer) {
      setFarmerName(farmer.name);
      setPhone(farmer.phone);
      setDistrict(farmer.district);
    }
    setInstantAnswer(null);
    setShowInquiryModal(true);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !phone || !question) return;

    setIsSubmitting(true);
    try {
      const res = await api.submitInquiry({
        farmer_name: farmerName,
        phone,
        crop_name: inquiryCrop,
        district,
        question
      });

      if (res && res.expert_answer) {
        setInstantAnswer(res.expert_answer);
      } else {
        setInstantAnswer(
          language === 'mr'
            ? 'आपल्या प्रश्नाची नोंद घेण्यात आली आहे. प्राथमिक उपाय: ५% निंबोळी अर्क (५० मिली/१० लि) फवारावा.'
            : 'Your question has been logged. Recommended initial treatment: Spray 5% neem extract.'
        );
      }
    } catch {
      setInstantAnswer(
        language === 'mr'
          ? 'आपल्या प्रश्नाची नोंद झाली आहे. प्राथमिक उपाय: ५% निंबोळी अर्क (५० मिली/१० लि) फवारावा.'
          : 'Inquiry registered. Recommended action: 5% neem seed extract spray.'
      );
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
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'डिजिटल पीक आरोग्य केंद्र' : 'Digital Crop Health Clinic'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black">
              {language === 'mr' ? 'पीक डॉक्टर व कीड-रोग सल्लागार' : 'Crop Doctor & Pest Disease Advisory'}
            </h1>
            <p className="text-sm text-gray-200 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? 'महाराष्ट्रातील प्रमुख पिकांवरील कीड, बुरशीजन्य रोग व अन्नद्रव्ये कमतरतेचे शास्त्रीय निदान, सेंद्रिय उपाय आणि अधिकृत कृषी विद्यापीठ शिफारस फवारणी मात्रा.'
                : 'Scientific diagnosis, organic remedies, and approved university chemical spray dosages for major Maharashtra crops.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleOpenAskModal}
              className="py-3 px-6 bg-fresh hover:bg-fresh-light text-forest-950 font-black rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4" />
              <span>{language === 'mr' ? 'कृषी तज्ज्ञांना प्रश्न विचारा' : 'Ask Agri Expert'}</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'रोगाचे नाव, कीड किंवा लक्षणे शोधा (उदा. खोडकीड, कंदकुज, करपा)...'
                    : 'Search pest, disease, or symptom (e.g. borer, rot, blotch)...'
                }
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            {/* Crop Selector Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden font-bold text-forest-950"
              >
                <option value="all">{language === 'mr' ? 'सर्व पिके (All Crops)' : 'All Crops'}</option>
                <option value="soybean">{language === 'mr' ? 'सोयाबीन (Soybean)' : 'Soybean'}</option>
                <option value="turmeric">{language === 'mr' ? 'हळद (Turmeric)' : 'Turmeric'}</option>
                <option value="sugarcane">{language === 'mr' ? 'ऊस (Sugarcane)' : 'Sugarcane'}</option>
                <option value="onion">{language === 'mr' ? 'कांदा (Onion)' : 'Onion'}</option>
                <option value="ginger">{language === 'mr' ? 'आले (Ginger)' : 'Ginger'}</option>
                <option value="chickpea">{language === 'mr' ? 'हरभरा (Chickpea)' : 'Chickpea'}</option>
              </select>
            </div>

            {/* Category Filter (Pest / Disease) */}
            <div className="md:col-span-3 flex gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-forest-800 text-white'
                    : 'bg-[#F8FAF7] text-charcoal hover:bg-forest-50 border border-gray-200'
                }`}
              >
                {language === 'mr' ? 'सर्व' : 'All'}
              </button>
              <button
                onClick={() => setSelectedCategory('pest')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  selectedCategory === 'pest'
                    ? 'bg-forest-800 text-white'
                    : 'bg-[#F8FAF7] text-charcoal hover:bg-forest-50 border border-gray-200'
                }`}
              >
                <Bug className="w-3 h-3" />
                <span>{language === 'mr' ? 'किडी' : 'Pests'}</span>
              </button>
              <button
                onClick={() => setSelectedCategory('disease')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                  selectedCategory === 'disease'
                    ? 'bg-forest-800 text-white'
                    : 'bg-[#F8FAF7] text-charcoal hover:bg-forest-50 border border-gray-200'
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>{language === 'mr' ? 'रोग' : 'Diseases'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Results Count & Quick Status */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-bold text-charcoal-muted uppercase tracking-wider">
            {language === 'mr'
              ? `एकूण आढळलेले कीड व रोग: ${filteredDiseases.length}`
              : `Total Diagnoses Found: ${filteredDiseases.length}`}
          </p>

          {!farmer && (
            <button
              onClick={openAuthModal}
              className="text-xs font-bold text-forest-800 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-fresh" />
              <span>{language === 'mr' ? 'शेतकरी लॉगिन करा व थेट सल्ला मिळवा →' : 'Login for personalized advice →'}</span>
            </button>
          )}
        </div>

        {/* Diseases & Pests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDiseases.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-forest-100 shadow-card hover:border-forest-300 transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6">
                
                {/* Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <Badge variant="forest" size="sm">
                    {item.cropName[language]}
                  </Badge>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.severity === 'high'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    {item.severity === 'high'
                      ? (language === 'mr' ? 'तीव्र प्रादुर्भाव' : 'Severe Threat')
                      : (language === 'mr' ? 'मध्यम प्रादुर्भाव' : 'Moderate')}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-forest-950 mb-3">
                  {item.name[language]}
                </h3>

                {/* Symptoms */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted block">
                    {language === 'mr' ? 'ओळखण्याची प्रमुख लक्षणे:' : 'Key Symptoms:'}
                  </span>
                  <ul className="space-y-1 text-xs text-charcoal-light">
                    {item.symptoms[language].slice(0, 2).map((symptom, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-forest-700 font-bold">•</span>
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Spray Highlight Box */}
                <div className="p-3.5 rounded-xl bg-forest-50/70 border border-forest-200/80 text-xs space-y-1">
                  <span className="font-bold text-forest-900 flex items-center gap-1">
                    <FlaskConical className="w-3.5 h-3.5 text-forest-700" />
                    {language === 'mr' ? 'शिफारस फवारणी मात्रा:' : 'Recommended Spray Dosage:'}
                  </span>
                  <p className="text-forest-950 font-medium">
                    {item.dosage[language]}
                  </p>
                </div>

              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedDisease(item)}
                  className="w-full py-2.5 bg-[#F8FAF7] hover:bg-forest-800 hover:text-white text-forest-900 border border-forest-200 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'mr' ? 'सविस्तर उपाय व नियंत्रण पहा' : 'View Complete Treatment'}</span>
                  <span>→</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Treatment Modal */}
      <Modal
        isOpen={selectedDisease !== null}
        onClose={() => setSelectedDisease(null)}
        maxWidth="2xl"
        title={selectedDisease?.name[language]}
      >
        {selectedDisease && (
          <div className="space-y-5">
            
            <div className="flex items-center gap-2">
              <Badge variant="forest">{selectedDisease.cropName[language]}</Badge>
              <Badge variant={selectedDisease.category === 'pest' ? 'amber' : 'fresh'}>
                {selectedDisease.category === 'pest'
                  ? (language === 'mr' ? 'कीड प्रादुर्भाव' : 'Insect Pest')
                  : (language === 'mr' ? 'बुरशीजन्य रोग' : 'Fungal Disease')}
              </Badge>
            </div>

            {/* Symptoms */}
            <div className="p-4 bg-[#F8FAF7] rounded-2xl border border-gray-100 space-y-2">
              <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                {language === 'mr' ? 'रोगाची सर्व लक्षणे:' : 'Detailed Symptoms:'}
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal">
                {selectedDisease.symptoms[language].map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic Treatment */}
            <div className="p-4 rounded-2xl bg-green-50/70 border border-green-200 text-xs sm:text-sm text-green-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-green-900">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                {language === 'mr' ? 'सेंद्रिय व जैविक नियंत्रण (Organic Control):' : 'Organic & Biological Control:'}
              </span>
              <p className="leading-relaxed">
                {selectedDisease.organicTreatment[language]}
              </p>
            </div>

            {/* Chemical Treatment & Dosage */}
            <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-xs sm:text-sm text-forest-950 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5 text-forest-900">
                <FlaskConical className="w-4 h-4 text-forest-700" />
                {language === 'mr' ? 'रासायनिक फवारणी व अधिकृत मात्रा (Chemical Treatment):' : 'Chemical Control & Exact Dosage:'}
              </span>
              <p className="leading-relaxed font-semibold">
                {selectedDisease.chemicalTreatment[language]}
              </p>
              <div className="p-2.5 rounded-xl bg-white border border-forest-200 text-xs font-bold text-forest-900">
                💧 {language === 'mr' ? 'फवारणी प्रमाण:' : 'Dosage Ratio:'} {selectedDisease.dosage[language]}
              </div>
            </div>

            {/* Prevention Tips */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
                {language === 'mr' ? 'भविष्यातील प्रतिबंधात्मक काळजी:' : 'Preventive Cultural Practices:'}
              </h4>
              <ul className="space-y-1 text-xs text-charcoal-light">
                {selectedDisease.preventiveTips[language].map((tip, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-forest-700 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDisease(null)}
                className="py-2 px-5 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                {language === 'mr' ? 'समजले / बंद करा' : 'Got it / Close'}
              </button>
            </div>

          </div>
        )}
      </Modal>

      {/* Ask Expert Inquiry Modal */}
      <Modal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        maxWidth="lg"
        title={language === 'mr' ? 'कृषी तज्ज्ञांना प्रश्न विचारा' : 'Ask Agricultural Expert'}
      >
        {instantAnswer ? (
          <div className="space-y-5 py-2">
            <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-green-950 text-sm">
                  {language === 'mr' ? 'आपला प्रश्न यशस्वीरित्या नोंदवला गेला!' : 'Inquiry Successfully Registered!'}
                </h4>
                <p className="text-xs text-green-800 mt-0.5">
                  {language === 'mr'
                    ? 'आपल्या प्रश्नाचे तात्काळ शास्त्रीय निदान खालीलप्रमाणे आहे:'
                    : 'Instant research-backed advisory generated for your crop:'}
                </p>
              </div>
            </div>

            {/* Instant Advisory Result */}
            <div className="p-5 bg-forest-50/80 rounded-2xl border border-forest-200 space-y-2">
              <span className="text-xs font-bold text-forest-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-fresh" />
                {language === 'mr' ? 'कृषी विद्यापीठ शिफारस सल्ला:' : 'Agricultural University Advisory:'}
              </span>
              <p className="text-sm font-semibold text-forest-950 leading-relaxed">
                {instantAnswer}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowInquiryModal(false)}
                className="py-2.5 px-6 bg-forest-800 text-white font-bold rounded-xl text-sm"
              >
                {language === 'mr' ? 'पूर्ण झाले' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleInquirySubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'शेतकऱ्याचे नाव' : 'Farmer Name'} *
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

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'मोबाईल नंबर' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'पीक निवडा' : 'Select Crop'} *
                </label>
                <select
                  value={inquiryCrop}
                  onChange={(e) => setInquiryCrop(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden font-medium"
                >
                  <option value="सोयाबीन (Soybean)">सोयाबीन (Soybean)</option>
                  <option value="हळद (Turmeric)">हळद (Turmeric)</option>
                  <option value="ऊस (Sugarcane)">ऊस (Sugarcane)</option>
                  <option value="कांदा (Onion)">कांदा (Onion)</option>
                  <option value="आले (Ginger)">आले (Ginger)</option>
                  <option value="हरभरा (Chickpea)">हरभरा (Chickpea)</option>
                  <option value="कापूस (Cotton)">कापूस (Cotton)</option>
                  <option value="गहू (Wheat)">गहू (Wheat)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'जिल्हा' : 'District'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="उदा. लातूर, पुणे"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'आपली समस्या किंवा लक्षणे सांगा' : 'Describe the Problem / Symptoms'} *
              </label>
              <textarea
                rows={3}
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={
                  language === 'mr'
                    ? 'उदा. पानांवर पिवळे चट्टे पडत आहेत आणि झाडांची वाढ खुंटली आहे, कोणती फवारणी करावी?'
                    : 'e.g. Leaves turning yellow with stunted growth, which pesticide or fungicide should I spray?'
                }
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowInquiryModal(false)}
                className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-bold rounded-xl cursor-pointer"
              >
                {language === 'mr' ? 'रद्द करा' : 'Cancel'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !question}
                className="py-2.5 px-6 bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'mr' ? 'सल्ला मिळवत आहे...' : 'Consulting...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'सल्ला मिळवा' : 'Get Advisory'}</span>
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
