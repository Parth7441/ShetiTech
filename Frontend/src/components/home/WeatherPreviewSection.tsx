import React, { useState, useEffect } from 'react';
import type { DistrictWeather } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { Badge } from '../common/Badge';
import { api, type WeatherData } from '../../services/api';
import {
  CloudSun,
  Droplets,
  Wind,
  CloudRain,
  Sun,
  MapPin,
  Sparkles,
  Info,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WeatherPreviewSectionProps {
  weatherList: DistrictWeather[];
}

export const WeatherPreviewSection: React.FC<WeatherPreviewSectionProps> = ({ weatherList }) => {
  const { t, language } = useLanguage();
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(weatherList[0]?.id || 'pune');
  const [liveWeather, setLiveWeather] = useState<WeatherData | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch live weather from FastAPI backend
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    api.getWeather(selectedDistrictId).then((data) => {
      if (!isMounted) return;
      if (data) {
        setLiveWeather(data);
        setIsConnected(true);
      } else {
        setLiveWeather(null);
        setIsConnected(false);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [selectedDistrictId]);

  const fallbackDistrict =
    weatherList.find((d) => d.id === selectedDistrictId) || weatherList[0];

  const getWeatherIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'sun':
        return <Sun className="w-6 h-6 text-amber-500" />;
      case 'rain':
      case 'cloud-rain':
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case 'cloud':
      default:
        return <CloudSun className="w-6 h-6 text-forest-700" />;
    }
  };

  // Determine current display values (live API vs fallback)
  const currentTemp = liveWeather
    ? Math.round(liveWeather.current.temperature)
    : fallbackDistrict.currentTemp;

  const currentCondition = liveWeather
    ? (language === 'mr' ? liveWeather.current.condition_mr : liveWeather.current.condition)
    : fallbackDistrict.condition[language];

  const currentHumidity = liveWeather
    ? liveWeather.current.humidity
    : fallbackDistrict.humidity;

  const currentRainProb = liveWeather
    ? liveWeather.current.rain_probability
    : fallbackDistrict.rainfallChance;

  const currentWind = liveWeather
    ? liveWeather.current.wind_speed
    : fallbackDistrict.windSpeed;

  const currentAdvisory = liveWeather
    ? (language === 'mr' ? liveWeather.agri_advisory.advisory_mr : liveWeather.agri_advisory.advisory_en)
    : fallbackDistrict.advisory[language];

  const isSprayOk = liveWeather?.agri_advisory?.spray_recommended ?? true;

  return (
    <section id="weather" className="py-16 md:py-24 bg-[#F8FAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="amber">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              {t('weatherSection.badge')}
            </Badge>

            {/* Backend Connection Indicator */}
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                {language === 'mr' ? 'लाइव्ह हवामान API सक्रिय' : 'Live Weather API Connected'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
                <Radio className="w-3 h-3 text-gray-500" />
                {language === 'mr' ? 'ऑफलाइन नमुना मोड' : 'Offline Sample Mode'}
              </span>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-forest-950 tracking-tight mb-3">
            {t('weatherSection.title')}
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
            {t('weatherSection.subtitle')}
          </p>
        </div>

        {/* Informative Disclaimer */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs sm:text-sm text-amber-950 max-w-4xl mx-auto shadow-xs">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>{t('weatherSection.disclaimer')}</strong>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="bg-white rounded-3xl border border-forest-100 shadow-card p-6 sm:p-8 max-w-4xl mx-auto">
          
          {/* District Selector Tabs */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-charcoal-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest-700" />
              {t('weatherSection.selectDistrict')}
            </label>
            <div className="flex flex-wrap gap-2">
              {weatherList.map((district) => (
                <button
                  key={district.id}
                  onClick={() => setSelectedDistrictId(district.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    selectedDistrictId === district.id
                      ? 'bg-forest-800 text-white shadow-sm'
                      : 'bg-[#F8FAF7] text-charcoal hover:bg-forest-50 border border-gray-200'
                  }`}
                >
                  {district.districtName[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Today's Overview */}
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 items-center pb-8 border-b border-gray-100 ${isLoading ? 'opacity-60' : 'opacity-100'} transition-opacity`}>
            
            {/* Left Temperature Display */}
            <div className="md:col-span-6 flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-forest-50 border border-forest-200 flex items-center justify-center shrink-0">
                <CloudSun className="w-14 h-14 text-forest-700" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black text-forest-950">
                    {currentTemp}°
                  </span>
                  <span className="text-xl font-bold text-charcoal-muted">C</span>
                </div>
                <div className="text-lg font-bold text-forest-900 mt-1">
                  {currentCondition}
                </div>
                <div className="text-xs text-charcoal-muted">
                  {language === 'mr' ? 'कमाल / किमान:' : 'Min / Max:'} {fallbackDistrict.tempRange.min}°C - {fallbackDistrict.tempRange.max}°C
                </div>
              </div>
            </div>

            {/* Right Weather Parameters */}
            <div className="md:col-span-6 grid grid-cols-3 gap-3">
              <div className="bg-[#F8FAF7] p-3.5 rounded-2xl border border-gray-100 text-center">
                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                <span className="text-[11px] text-charcoal-muted block font-medium">
                  {t('weatherSection.humidity')}
                </span>
                <span className="text-base font-black text-charcoal-dark">
                  {currentHumidity}%
                </span>
              </div>

              <div className="bg-[#F8FAF7] p-3.5 rounded-2xl border border-gray-100 text-center">
                <CloudRain className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-[11px] text-charcoal-muted block font-medium">
                  {t('weatherSection.rainChance')}
                </span>
                <span className="text-base font-black text-charcoal-dark">
                  {currentRainProb}%
                </span>
              </div>

              <div className="bg-[#F8FAF7] p-3.5 rounded-2xl border border-gray-100 text-center">
                <Wind className="w-5 h-5 text-teal-600 mx-auto mb-1" />
                <span className="text-[11px] text-charcoal-muted block font-medium">
                  {t('weatherSection.wind')}
                </span>
                <span className="text-base font-black text-charcoal-dark">
                  {currentWind} km/h
                </span>
              </div>
            </div>

          </div>

          {/* Agricultural Weather Advisory */}
          <div className="my-6 p-4 rounded-2xl bg-forest-50/80 border border-forest-200">
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest-900">
                <Sparkles className="w-4 h-4 text-fresh" />
                <span>{t('weatherSection.advisoryTitle')} ({fallbackDistrict.districtName[language]}):</span>
              </div>
              
              {/* Spray condition pill */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                isSprayOk ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isSprayOk 
                  ? (language === 'mr' ? 'फवारणीस अनुकूल' : 'Spray Recommended')
                  : (language === 'mr' ? 'फवारणी लांबणीवर टाका' : 'Postpone Spraying')}
              </span>
            </div>
            <p className="text-sm font-medium text-forest-950 leading-relaxed">
              {currentAdvisory}
            </p>
          </div>

          {/* 5-Day Outlook */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-3">
              {t('weatherSection.forecastTitle')}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {liveWeather?.forecast ? (
                liveWeather.forecast.map((fc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 text-center flex flex-col items-center justify-between"
                  >
                    <span className="text-xs font-bold text-charcoal-muted">
                      {language === 'mr' ? fc.day_mr : fc.day}
                    </span>
                    <div className="my-2">
                      {getWeatherIcon(fc.condition)}
                    </div>
                    <span className="text-base font-black text-forest-950">
                      {Math.round(fc.max_temp)}°C
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold mt-0.5">
                      🌧 {fc.rain_probability}%
                    </span>
                  </div>
                ))
              ) : (
                fallbackDistrict.forecast.map((fc, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-[#F8FAF7] border border-gray-100 text-center flex flex-col items-center justify-between"
                  >
                    <span className="text-xs font-bold text-charcoal-muted">
                      {fc.day[language]}
                    </span>
                    <div className="my-2">
                      {getWeatherIcon(fc.icon)}
                    </div>
                    <span className="text-base font-black text-forest-950">
                      {fc.temp}°C
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold mt-0.5">
                      🌧 {fc.rainProb}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* View Full Weather Page Link */}
        <div className="text-center mt-8">
          <Link
            to="/weather"
            className="text-xs sm:text-sm font-bold text-forest-800 hover:text-forest-950 underline underline-offset-4"
          >
            {language === 'mr' ? 'सर्व जिल्ह्यांचे हवामान पृष्ठ पहा →' : 'View Full Weather Advisory Dashboard →'}
          </Link>
        </div>

      </div>
    </section>
  );
};
