import type { DistrictWeather } from '../types';

export const weatherData: DistrictWeather[] = [
  {
    id: 'pune',
    districtName: { mr: 'पुणे (Pune)', en: 'Pune' },
    currentTemp: 29,
    tempRange: { min: 21, max: 31 },
    condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' },
    humidity: 62,
    rainfallChance: 15,
    windSpeed: 14,
    advisory: {
      mr: 'हवामान फवारणीसाठी आणि आंतरमशागतीसाठी अनुकूल आहे. दुपारी उष्णता वाढू शकते.',
      en: 'Favorable conditions for foliar spraying and weeding. Keep irrigation scheduled for early morning.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 29, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 15, icon: 'cloud' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 30, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 31, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 5, icon: 'sun' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 28, condition: { mr: 'हलका पाऊस', en: 'Light Rain' }, rainProb: 40, icon: 'rain' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 27, condition: { mr: 'ढगाळ', en: 'Cloudy' }, rainProb: 35, icon: 'cloud-rain' }
    ]
  },
  {
    id: 'nashik',
    districtName: { mr: 'नाशिक (Nashik)', en: 'Nashik' },
    currentTemp: 27,
    tempRange: { min: 19, max: 29 },
    condition: { mr: 'स्वच्छ व आल्हाददायक', en: 'Clear & Pleasant' },
    humidity: 58,
    rainfallChance: 10,
    windSpeed: 12,
    advisory: {
      mr: 'द्राक्ष व कांदा पिकात रोगांचा प्रादुर्भाव रोखण्यासाठी प्रतिबंधात्मक बुरशीनाशक फवारणीस अनुकूल वेळ.',
      en: 'Ideal time for preventive fungicide spray in grape vineyards and late-season onion plots.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 27, condition: { mr: 'स्वच्छ', en: 'Clear' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 28, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 29, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 20, icon: 'cloud' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 28, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 15, icon: 'cloud' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 26, condition: { mr: 'हलका पाऊस', en: 'Light Rain' }, rainProb: 30, icon: 'rain' }
    ]
  },
  {
    id: 'kolhapur',
    districtName: { mr: 'कोल्हापूर (Kolhapur)', en: 'Kolhapur' },
    currentTemp: 31,
    tempRange: { min: 23, max: 32 },
    condition: { mr: 'उष्ण व दमट', en: 'Warm & Humid' },
    humidity: 74,
    rainfallChance: 25,
    windSpeed: 16,
    advisory: {
      mr: 'उसात ठिबक सिंचनाचे नियोजन करा. हवेतील आर्द्रता जास्त असल्याने खोडकीड व तांबेरा यावर लक्ष ठेवा.',
      en: 'Schedule drip irrigation for sugarcane crops. Monitor for rust and stalk borer due to elevated humidity.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 31, condition: { mr: 'उष्ण', en: 'Warm' }, rainProb: 25, icon: 'sun' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 30, condition: { mr: 'हलकी सर', en: 'Passing Shower' }, rainProb: 35, icon: 'rain' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 30, condition: { mr: 'ढगाळ', en: 'Cloudy' }, rainProb: 30, icon: 'cloud' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 29, condition: { mr: 'हलका पाऊस', en: 'Light Rain' }, rainProb: 45, icon: 'cloud-rain' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 30, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 20, icon: 'cloud' }
    ]
  },
  {
    id: 'solapur',
    districtName: { mr: 'सोलापूर (Solapur)', en: 'Solapur' },
    currentTemp: 34,
    tempRange: { min: 24, max: 35 },
    condition: { mr: 'कडक ऊन व उष्ण', en: 'Sunny & Hot' },
    humidity: 42,
    rainfallChance: 5,
    windSpeed: 10,
    advisory: {
      mr: 'डाळिंब व द्राक्ष बागांमध्ये बाष्पीभवन रोखण्यासाठी आच्छादन (Mulching) चा वापर करावा. पाण्याचे योग्य नियोजन करा.',
      en: 'Use organic mulching in pomegranate orchards to curb moisture loss under elevated temperatures.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 34, condition: { mr: 'कडक ऊन', en: 'Sunny' }, rainProb: 5, icon: 'sun' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 35, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 5, icon: 'sun' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 34, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 33, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 15, icon: 'cloud' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 32, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 10, icon: 'cloud' }
    ]
  },
  {
    id: 'nagpur',
    districtName: { mr: 'नागपूर (Nagpur)', en: 'Nagpur' },
    currentTemp: 32,
    tempRange: { min: 22, max: 33 },
    condition: { mr: 'कोरडे हवामान', en: 'Dry Weather' },
    humidity: 48,
    rainfallChance: 5,
    windSpeed: 11,
    advisory: {
      mr: 'संत्रा बागांमध्ये मृग बहाराच्या फळांची वाढ सुरू आहे. सूक्ष्म अन्नद्रव्ये आणि पोटॅशची फवारणी करावी.',
      en: 'Foliar application of micronutrients and potassium nitrate recommended for fruit swelling in orange orchards.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 32, condition: { mr: 'स्वच्छ', en: 'Clear' }, rainProb: 5, icon: 'sun' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 33, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 5, icon: 'sun' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 33, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 31, condition: { mr: 'ढगाळ', en: 'Cloudy' }, rainProb: 20, icon: 'cloud' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 30, condition: { mr: 'हलका पाऊस', en: 'Light Rain' }, rainProb: 25, icon: 'rain' }
    ]
  },
  {
    id: 'sambhajinagar',
    districtName: { mr: 'छत्रपती संभाजीनगर (Aurangabad)', en: 'Chhatrapati Sambhajinagar' },
    currentTemp: 30,
    tempRange: { min: 20, max: 31 },
    condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' },
    humidity: 55,
    rainfallChance: 12,
    windSpeed: 13,
    advisory: {
      mr: 'कापूस व आले पिकात बुरशीजन्य रोगांचा प्रादुर्भाव टाळण्यासाठी ट्रायकोडर्माचा जमिनीतून वापर करा.',
      en: 'Apply Trichoderma soil drenching in cotton and ginger plots to safeguard root zones against wilt.'
    },
    forecast: [
      { day: { mr: 'आज', en: 'Today' }, temp: 30, condition: { mr: 'अंशतः ढगाळ', en: 'Partly Cloudy' }, rainProb: 12, icon: 'cloud' },
      { day: { mr: 'उद्या', en: 'Tomorrow' }, temp: 31, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'बुध', en: 'Wed' }, temp: 31, condition: { mr: 'सूर्यप्रकाश', en: 'Sunny' }, rainProb: 10, icon: 'sun' },
      { day: { mr: 'गुरू', en: 'Thu' }, temp: 29, condition: { mr: 'ढगाळ', en: 'Cloudy' }, rainProb: 20, icon: 'cloud' },
      { day: { mr: 'शुक्र', en: 'Fri' }, temp: 28, condition: { mr: 'हलका पाऊस', en: 'Light Rain' }, rainProb: 30, icon: 'rain' }
    ]
  }
];
