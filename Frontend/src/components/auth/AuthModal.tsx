import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import {
  KeyRound,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const MAHARASHTRA_DISTRICTS = [
  'Pune (पुणे)',
  'Latur (लातूर)',
  'Nashik (नाशिक)',
  'Kolhapur (कोल्हापूर)',
  'Sangli (सांगली)',
  'Satara (सातारा)',
  'Solapur (सोलापूर)',
  'Ahmednagar (अहमदनगर)',
  'Chhatrapati Sambhajinagar (छत्रपती संभाजीनगर)',
  'Nagpur (नागपूर)',
  'Amravati (अमरावती)',
  'Jalgaon (जळगाव)',
  'Nanded (नांदेड)',
  'Yavatmal (यवतमाळ)',
  'Beed (बीड)',
  'Parbhani (परभणी)',
  'Buldhana (बुलढाणा)'
];

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const { language } = useLanguage();

  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [district, setDistrict] = useState('Pune (पुणे)');
  const [village, setVillage] = useState('');
  const [landSize, setLandSize] = useState('3.5');
  const [timer, setTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Timer for resending OTP
  useEffect(() => {
    let interval: number;
    if (step === 'otp' && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Reset modal on close
  useEffect(() => {
    if (!isAuthModalOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setErrorMsg('');
      setTimer(30);
    }
  }, [isAuthModalOpen]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMsg(
        language === 'mr'
          ? 'कृपया वैध १० अंकी मोबाईल नंबर टाका.'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setTimer(30);
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg(
        language === 'mr' ? 'कृपया संपूर्ण OTP टाका.' : 'Please enter the complete OTP.'
      );
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    // For test OTP (any 4-6 digit code works, default demo: 123456)
    setTimeout(() => {
      setIsLoading(false);
      // If user hasn't set name, go to quick profile setup; otherwise finish
      if (!farmerName) {
        setStep('profile');
      } else {
        completeLogin();
      }
    }, 500);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeLogin();
  };

  const completeLogin = async () => {
    setIsLoading(true);
    const distName = district.split(' ')[0];
    await login({
      phone: phoneNumber,
      name: farmerName || (language === 'mr' ? 'शेतकरी मित्र' : 'Farmer Friend'),
      district: distName,
      village: village || (language === 'mr' ? 'गाव' : 'Village'),
      landSizeAcres: parseFloat(landSize) || 3.0,
      preferredLanguage: language
    });
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
      title={
        step === 'phone'
          ? language === 'mr'
            ? 'शेतकरी लॉगिन / नोंदणी'
            : 'Farmer Login / Register'
          : step === 'otp'
          ? language === 'mr'
            ? 'OTP पडताळणी'
            : 'Verify OTP'
          : language === 'mr'
          ? 'आपली शेतकरी प्रोफाईल'
          : 'Your Farmer Profile'
      }
    >
      <div className="space-y-5">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs font-bold text-charcoal-muted px-2 pb-2 border-b border-gray-100">
          <span className={`flex items-center gap-1.5 ${step === 'phone' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center text-[11px]">
              १
            </span>
            {language === 'mr' ? 'मोबाईल नंबर' : 'Phone'}
          </span>
          <span className="text-gray-300">→</span>
          <span className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center text-[11px]">
              २
            </span>
            {language === 'mr' ? 'OTP' : 'OTP'}
          </span>
          <span className="text-gray-300">→</span>
          <span className={`flex items-center gap-1.5 ${step === 'profile' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-900 flex items-center justify-center text-[11px]">
              ३
            </span>
            {language === 'mr' ? 'प्रोफाईल' : 'Profile'}
          </span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl font-medium">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: Phone Number */}
        {step === 'phone' && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="p-4 bg-forest-50/70 rounded-2xl border border-forest-100 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-forest-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-forest-950 leading-relaxed">
                <strong>{language === 'mr' ? 'सुरक्षित व सोपे लॉगिन' : 'Quick & Secure Login'}:</strong>
                <span className="block text-charcoal-muted text-xs mt-0.5">
                  {language === 'mr'
                    ? 'पासवर्डची गरज नाही. मोबाईलवर येणाऱ्या OTP द्वारे लॉगिन करा.'
                    : 'No password needed. Simply login using OTP sent to your phone.'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1.5">
                {language === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'} *
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-bold text-gray-500 border-r border-gray-200 pr-2">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full pl-22 pr-4 py-3 text-base font-bold tracking-wide bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length < 10}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{language === 'mr' ? 'OTP पाठवा' : 'Send OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto text-forest-800">
                <KeyRound className="w-6 h-6" />
              </div>
              <p className="text-xs text-charcoal-muted pt-2">
                {language === 'mr'
                  ? `+91 ${phoneNumber} वर पाठवलेला OTP टाका:`
                  : `Enter the OTP sent to +91 ${phoneNumber}:`}
              </p>
            </div>

            {/* Test OTP Hint Banner */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center text-xs text-amber-950 font-medium">
              💡 {language === 'mr' ? 'चाचणी OTP (Demo OTP):' : 'Test OTP:'}{' '}
              <strong className="underline tracking-wider font-mono text-amber-900">123456</strong>
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="• • • • • •"
                className="w-full py-3 text-center text-2xl font-black tracking-widest bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-charcoal-muted">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="hover:text-forest-800 underline"
              >
                {language === 'mr' ? 'नंबर बदला' : 'Change Number'}
              </button>

              {timer > 0 ? (
                <span>
                  {language === 'mr' ? 'पुन्हा पाठवा' : 'Resend in'} ({timer}s)
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setTimer(30)}
                  className="font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {language === 'mr' ? 'OTP पुन्हा पाठवा' : 'Resend OTP'}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{language === 'mr' ? 'पडताळणी करा आणि पुढे जा' : 'Verify & Continue'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 3: Quick Profile Registration */}
        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="p-3 bg-forest-50 rounded-xl border border-forest-100 flex items-center gap-2 text-xs text-forest-900">
              <Sparkles className="w-4 h-4 text-fresh shrink-0" />
              <span>
                {language === 'mr'
                  ? 'आपली माहिती भरून ShetiTech च्या सर्व सुविधा मिळवा:'
                  : 'Complete your profile for personalized agricultural advisory:'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'शेतकऱ्याचे संपूर्ण नाव' : 'Farmer Full Name'} *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. ज्ञानेश्वर पाटील' : 'e.g. Ramesh Patil'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'जिल्हा' : 'District'} *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden font-medium"
                >
                  {MAHARASHTRA_DISTRICTS.map((dist, i) => (
                    <option key={i} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                  {language === 'mr' ? 'गाव / तालुका' : 'Village / Taluka'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder={language === 'mr' ? 'उदा. बारामती' : 'e.g. Baramati'}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase mb-1">
                {language === 'mr' ? 'एकूण जमीन क्षेत्र (एकर)' : 'Total Land Area (Acres)'}
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAF7] border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !farmerName}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-white font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{language === 'mr' ? 'नोंदणी पूर्ण करा' : 'Complete Setup'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </Modal>
  );
};
