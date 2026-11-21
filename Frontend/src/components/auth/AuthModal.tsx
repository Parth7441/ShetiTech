import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Modal } from '../common/Modal';
import { api } from '../../services/api';
import {
  KeyRound,
  User,
  MapPin,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronLeft
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

  // Reset modal state on close
  useEffect(() => {
    if (!isAuthModalOpen) {
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setErrorMsg('');
      setTimer(30);
    }
  }, [isAuthModalOpen]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '').slice(-10);
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

    try {
      await api.sendOtp(cleanPhone);
      setIsLoading(false);
      setStep('otp');
      setTimer(45);
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'OTP पाठवण्यात अडचण आली.';
      setErrorMsg(errMsg);
      setStep('otp');
      setTimer(45);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg(
        language === 'mr' ? 'कृपया संपूर्ण OTP टाका.' : 'Please enter the complete OTP.'
      );
      return;
    }
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await api.verifyOtp(phoneNumber, otp);
      setIsLoading(false);

      if (res.verified) {
        if (res.farmer && res.farmer.name) {
          // Existing farmer profile returned by backend
          await login({
            phone: res.farmer.phone,
            name: res.farmer.name,
            district: res.farmer.district || 'Pune',
            village: res.farmer.village || '',
            landSizeAcres: res.farmer.land_size_acres || 3.0,
            preferredLanguage: (res.farmer.preferred_language as 'mr' | 'en') || language
          });
        } else {
          // New farmer: prompt for name and land details
          setStep('profile');
        }
      }
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'अवैध OTP कोड. कृपया तपासून पुन्हा टाका.';
      setErrorMsg(errMsg);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0 || !phoneNumber) return;
    setErrorMsg('');
    setIsLoading(true);
    try {
      await api.sendOtp(phoneNumber);
      setIsLoading(false);
      setTimer(45);
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'OTP पुन्हा पाठवण्यात त्रुटी आली.';
      setErrorMsg(errMsg);
    }
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
        <div className="flex items-center justify-between text-xs font-bold text-charcoal-muted px-1 pb-3 border-b border-gray-100">
          <span className={`flex items-center gap-1.5 ${step === 'phone' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 'phone' ? 'bg-forest-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              १
            </span>
            <span>{language === 'mr' ? 'मोबाईल नंबर' : 'Phone'}</span>
          </span>

          <span className="text-gray-300">→</span>

          <span className={`flex items-center gap-1.5 ${step === 'otp' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 'otp' ? 'bg-forest-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              २
            </span>
            <span>{language === 'mr' ? 'OTP' : 'OTP'}</span>
          </span>

          <span className="text-gray-300">→</span>

          <span className={`flex items-center gap-1.5 ${step === 'profile' ? 'text-forest-800' : 'text-gray-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 'profile' ? 'bg-forest-800 text-white' : 'bg-gray-100 text-gray-500'}`}>
              ३
            </span>
            <span>{language === 'mr' ? 'प्रोफाईल' : 'Profile'}</span>
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
            <div className="p-4 bg-forest-50/80 rounded-2xl border border-forest-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-forest-700 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-forest-950 leading-relaxed">
                <strong className="block font-bold mb-0.5">
                  {language === 'mr' ? 'सुरक्षित व सोपे लॉगिन' : 'Quick & Secure Login'}:
                </strong>
                <span className="text-charcoal-muted text-xs block">
                  {language === 'mr'
                    ? 'पासवर्ड लक्षात ठेवण्याची गरज नाही. आपल्या मोबाईल नंबरवर OTP पाठवला जाईल.'
                    : 'No password needed. An instant verification OTP will be sent to your phone.'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-muted uppercase tracking-wider mb-2">
                {language === 'mr' ? 'मोबाईल नंबर टाका' : 'Enter Mobile Number'} *
              </label>

              {/* Robust Flex Input Container: Flag + Prefix is completely isolated from user input */}
              <div className="flex items-center rounded-xl border-2 border-gray-200 bg-white focus-within:border-forest-600 focus-within:ring-2 focus-within:ring-forest-100 transition-all overflow-hidden shadow-2xs">
                <div className="px-3.5 py-3 bg-[#F4F6F3] border-r border-gray-200 text-sm font-bold text-forest-950 flex items-center gap-1.5 select-none shrink-0">
                  <span className="text-base leading-none">🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  required
                  autoFocus
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="98765 43210"
                  className="w-full px-4 py-3 text-base font-bold text-forest-950 bg-transparent border-none outline-hidden tracking-wider placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-400"
                />
              </div>
              <p className="text-[11px] text-charcoal-muted mt-1.5 px-1">
                {language === 'mr'
                  ? '१० अंकी भारतीय मोबाईल नंबर टाका'
                  : 'Enter your 10-digit Indian phone number'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length < 10}
              className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 active:bg-forest-950 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isLoading ? (language === 'mr' ? 'पाठवत आहे...' : 'Sending...') : (language === 'mr' ? 'OTP पाठवा' : 'Send OTP')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="text-center space-y-1 py-1">
              <div className="w-12 h-12 bg-forest-100 rounded-2xl flex items-center justify-center mx-auto text-forest-800">
                <KeyRound className="w-6 h-6" />
              </div>
              <h4 className="text-base font-black text-forest-950 pt-1">
                {language === 'mr' ? 'OTP पडताळणी' : 'Enter OTP'}
              </h4>
              <p className="text-xs text-charcoal-muted">
                {language === 'mr'
                  ? `+91 ${phoneNumber} वर पाठवलेला कोड टाका:`
                  : `Enter the code sent to +91 ${phoneNumber}:`}
              </p>
            </div>

            {/* SMS Gateway Dispatched Notice */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-center text-xs text-emerald-950 font-medium space-y-0.5">
              <div className="flex items-center justify-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {language === 'mr' ? 'SMS द्वारे OTP पाठवला आहे' : 'OTP Dispatched via SMS'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800">
                {language === 'mr'
                  ? `आपल्या +91 ${phoneNumber} मोबाईलवर आलेला ६ अंकी कोड खाली टाका:`
                  : `Enter the 6-digit verification code received on +91 ${phoneNumber}:`}
              </p>
            </div>

            <div>
              <input
                type="text"
                maxLength={6}
                required
                autoFocus
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full py-3.5 text-center text-2xl font-black tracking-[0.4em] bg-white border-2 border-gray-200 rounded-xl focus:border-forest-600 focus:ring-2 focus:ring-forest-100 focus:outline-hidden text-forest-950 shadow-2xs"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-charcoal-muted pt-1">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="hover:text-forest-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'नंबर बदला' : 'Change Number'}</span>
              </button>

              {timer > 0 ? (
                <span>
                  {language === 'mr' ? 'पुन्हा पाठवा' : 'Resend in'} ({timer}s)
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-bold text-forest-800 hover:text-forest-950 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'OTP पुन्हा पाठवा' : 'Resend OTP'}</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 4}
              className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 active:bg-forest-950 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{isLoading ? (language === 'mr' ? 'पडताळत आहे...' : 'Verifying...') : (language === 'mr' ? 'पडताळणी करा आणि पुढे जा' : 'Verify & Continue')}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 3: Quick Profile Registration */}
        {step === 'profile' && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div className="p-3.5 bg-forest-50/80 rounded-xl border border-forest-200/80 flex items-center gap-2.5 text-xs text-forest-900">
              <Sparkles className="w-4 h-4 text-fresh shrink-0" />
              <span>
                {language === 'mr'
                  ? 'आपली माहिती भरून ShetiTech च्या सर्व शेती सुविधा मिळवा:'
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
                  autoFocus
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  placeholder={language === 'mr' ? 'उदा. ज्ञानेश्वर पाटील' : 'e.g. Ramesh Patil'}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
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
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden font-medium"
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
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
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
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-600 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !farmerName}
              className="w-full py-3.5 bg-forest-800 hover:bg-forest-900 active:bg-forest-950 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
