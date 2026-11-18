import type { AgriTool } from '../types';

export const toolsData: AgriTool[] = [
  {
    id: 'land-area',
    title: {
      mr: 'जमीन क्षेत्र कनवर्टर',
      en: 'Land Area Converter'
    },
    subtitle: {
      mr: 'गुंठा, एकर, हेक्टर, बिघा रूपांतर',
      en: 'Guntha, Acre, Hectare, Bigha, Sq.Ft'
    },
    description: {
      mr: 'जमिनीचे गुंठा, एकर, हेक्टर, बिघा आणि स्क्वेअर फूटमध्ये अचूक रूपांतर करा.',
      en: 'Accurately convert land areas across Guntha, Acre, Hectare, Bigha, and Square Feet.'
    },
    iconName: 'Maximize2',
    badge: {
      mr: 'सर्वाधिक वापरलेले',
      en: 'Most Popular'
    },
    path: '/calculators#land-area',
    isReady: true
  },
  {
    id: 'fertilizer',
    title: {
      mr: 'खत व्यवस्थापन गणक',
      en: 'Fertilizer Calculator'
    },
    subtitle: {
      mr: 'युरिया, डीएपी, पोटॅश मात्रा',
      en: 'Urea, DAP, Potash dosage per acre'
    },
    description: {
      mr: 'तुमच्या पिकासाठी आणि क्षेत्रफळानुसार आवश्यक NPK आणि खतांच्या बॅगांचे अचूक प्रमाण मोजा.',
      en: 'Calculate accurate NPK recommendations and commercial fertilizer bags needed for your acreage.'
    },
    iconName: 'FlaskConical',
    badge: {
      mr: 'अचूक डोस',
      en: 'Accurate Dosage'
    },
    path: '/calculators#fertilizer',
    isReady: true
  },
  {
    id: 'crop-profit',
    title: {
      mr: 'पीक नफा गणक',
      en: 'Crop Profit Calculator'
    },
    subtitle: {
      mr: 'उत्पादन आणि नफ्याचा अंदाज',
      en: 'Gross revenue and net margin'
    },
    description: {
      mr: 'अपेक्षित उत्पादन आणि बाजारभावानुसार एकूण नफ्याचा त्वरित अंदाज घ्या.',
      en: 'Project your expected farm revenue and net margins based on market price benchmarks.'
    },
    iconName: 'TrendingUp',
    badge: {
      mr: 'आर्थिक नियोजन',
      en: 'Farm Economics'
    },
    path: '/calculators#crop-profit',
    isReady: true
  },
  {
    id: 'crop-cost',
    title: {
      mr: 'पीक खर्च गणक',
      en: 'Crop Cost Calculator'
    },
    subtitle: {
      mr: 'मशागत, बियाणे, मजुरी खर्च',
      en: 'Tillage, inputs & labor costing'
    },
    description: {
      mr: 'लागवडीपासून काढणीपर्यंत होणाऱ्या सर्व खर्चाचा अचूक हिशोब ठेवा.',
      en: 'Track total cultivation expenditure from soil preparation to final harvesting.'
    },
    iconName: 'Calculator',
    badge: {
      mr: 'खर्च व्यवस्थापन',
      en: 'Cost Tracking'
    },
    path: '/calculators#crop-cost',
    isReady: true
  },
  {
    id: 'seed',
    title: {
      mr: 'बियाणे प्रमाण गणक',
      en: 'Seed Calculator'
    },
    subtitle: {
      mr: 'क्षेत्रानुसार बियाण्यांचे वजन',
      en: 'Seed weight per acre calculation'
    },
    description: {
      mr: 'जमीन क्षेत्रफळ आणि पेरणीच्या पद्धतीनुसार आवश्यक बियाणांचे प्रमाण आणि अंतर काढा.',
      en: 'Estimate required seed quantity and recommended row spacing for optimal plant density.'
    },
    iconName: 'Sprout',
    badge: {
      mr: 'पेरणी सहाय्य',
      en: 'Sowing Aid'
    },
    path: '/calculators#seed',
    isReady: true
  }
];
