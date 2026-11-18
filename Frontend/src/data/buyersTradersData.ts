export interface BuyerTrader {
  id: string;
  name: { mr: string; en: string };
  firmName: { mr: string; en: string };
  type: 'apmc_trader' | 'fpo' | 'processor' | 'exporter';
  cropsBought: { mr: string[]; en: string[] };
  district: { mr: string; en: string };
  location: { mr: string; en: string };
  contactPerson: string;
  phone: string;
  paymentTerms: { mr: string; en: string };
  verifiedBadge: boolean;
}

export const buyersTradersData: BuyerTrader[] = [
  {
    id: 'trader-1',
    name: { mr: 'राजेश पाटील (व्यापारी प्रतिनिधी)', en: 'Rajesh Patil' },
    firmName: { mr: 'श्री महालक्ष्मी ॲग्रो ट्रेडर्स', en: 'Shree Mahalakshmi Agro Traders' },
    type: 'apmc_trader',
    cropsBought: {
      mr: ['कांदा (लाल/रांगडा)', 'लसूण', 'बटाटा'],
      en: ['Onion (Red)', 'Garlic', 'Potato']
    },
    district: { mr: 'नाशिक', en: 'Nashik' },
    location: { mr: 'लासलगाव मुख्य मार्केट यार्ड', en: 'Lasalgaon Main Market Yard' },
    contactPerson: 'राजेश पाटील',
    phone: '+91 98220 XXXXX',
    paymentTerms: {
      mr: 'वजन झाल्यावर ४८ तासांत थेट बँक खात्यात आरटीजीएस (RTGS/NEFT)',
      en: 'Direct RTGS/NEFT bank transfer within 48 hours of weighing'
    },
    verifiedBadge: true
  },
  {
    id: 'trader-2',
    name: { mr: 'सचिन देशमुख (खरेदी प्रमुख)', en: 'Sachin Deshmukh' },
    firmName: { mr: 'मराठवाडा ऑइल रिफायनरी व सीड्स लि.', en: 'Marathwada Oil Refineries & Seeds Ltd.' },
    type: 'processor',
    cropsBought: {
      mr: ['सोयाबीन (पिवळा)', 'सूर्यफूल', 'करडई'],
      en: ['Soybean (Yellow)', 'Sunflower', 'Safflower']
    },
    district: { mr: 'लातूर', en: 'Latur' },
    location: { mr: 'एमआयडीसी परिसर, लातूर', en: 'MIDC Industrial Area, Latur' },
    contactPerson: 'सचिन देशमुख',
    phone: '+91 94231 XXXXX',
    paymentTerms: {
      mr: 'काटा पावती झाल्यावर २४ तासांत थेट खात्यात रक्कम',
      en: 'Direct account credit within 24 hours of weighbridge receipt'
    },
    verifiedBadge: true
  },
  {
    id: 'trader-3',
    name: { mr: 'बाळासाहेब जाधव (अध्यक्ष)', en: 'Balasaheb Jadhav' },
    firmName: { mr: 'सह्याद्री फार्मर प्रोड्युसर कंपनी (FPO)', en: 'Sahyadri Farmer Producer Co. (FPO)' },
    type: 'fpo',
    cropsBought: {
      mr: ['द्राक्षे', 'डाळिंब', 'टोमॅटो', 'सिमला मिरची'],
      en: ['Grapes', 'Pomegranate', 'Tomato', 'Capsicum']
    },
    district: { mr: 'नाशिक / पुणे', en: 'Nashik / Pune' },
    location: { mr: 'मोहाडी, दिंडोरी रोड, नाशिक', en: 'Mohadi, Dindori Road, Nashik' },
    contactPerson: 'बाळासाहेब जाधव',
    phone: '+91 98812 XXXXX',
    paymentTerms: {
      mr: 'गुणवत्ता तपासणीनंतर ७ दिवसांत ठरलेला हमी दर',
      en: 'Pre-agreed contracted price paid in 7 days after quality grading'
    },
    verifiedBadge: true
  },
  {
    id: 'trader-4',
    name: { mr: 'विक्रम शहा (एक्सपोर्ट मॅनेजर)', en: 'Vikram Shah' },
    firmName: { mr: 'कृष्णा स्पायसेस व हळद ट्रेडिंग कॉर्प', en: 'Krishna Spices & Turmeric Trading' },
    type: 'exporter',
    cropsBought: {
      mr: ['हळद (राजापुरी/सेलम फिंगर)', 'सुंठ (सुकवलेले आले)'],
      en: ['Turmeric (Rajapuri/Salem Finger)', 'Dry Ginger']
    },
    district: { mr: 'सांगली', en: 'Sangli' },
    location: { mr: 'सांगली APMC वखार महामंडळ शेजारी', en: 'Sangli APMC Yard Warehouse' },
    contactPerson: 'विक्रम शहा',
    phone: '+91 97633 XXXXX',
    paymentTerms: {
      mr: 'कडप्पा/फिंगर ग्रेडिंगनुसार रोख किंवा चेकद्वारे थेट व्यवहार',
      en: 'Immediate spot payment based on finger polish and curcumin grade'
    },
    verifiedBadge: true
  },
  {
    id: 'trader-5',
    name: { mr: 'अशोक गायकवाड', en: 'Ashok Gaikwad' },
    firmName: { mr: 'पुणे धान्य आ Rene अडत व्यापारी संघटना', en: 'Pune Grain Merchants & Commission Agents' },
    type: 'apmc_trader',
    cropsBought: {
      mr: ['गहू (लोकवान/शरबती)', 'हरभरा (चना)', 'तूर'],
      en: ['Wheat (Lokwan)', 'Chickpea', 'Pigeon Pea (Tur)']
    },
    district: { mr: 'पुणे', en: 'Pune' },
    location: { mr: 'गुलटेकडी मार्केट यार्ड, पुणे', en: 'Gultekdi Market Yard, Pune' },
    contactPerson: 'अशोक गायकवाड',
    phone: '+91 99224 XXXXX',
    paymentTerms: {
      mr: 'बोली लिलावाच्या दिवशीच संपूर्ण पेमेंट पावती',
      en: 'Same-day settlement on APMC auction slip'
    },
    verifiedBadge: true
  }
];
