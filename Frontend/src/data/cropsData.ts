import type { Crop } from '../types';

export const cropsData: Crop[] = [
  {
    id: 'sugarcane',
    name: {
      mr: 'ऊस',
      en: 'Sugarcane'
    },
    botanicalName: 'Saccharum officinarum',
    category: 'cash',
    season: 'annual',
    duration: {
      mr: '१२ ते १८ महिने',
      en: '12 to 18 Months'
    },
    waterRequirement: {
      mr: '२००० - २५०० मिमी (भरपूर पाणी)',
      en: '2000 - 2500 mm (High)'
    },
    soilType: {
      mr: 'मध्यम ते भारी काळी जमीन, उत्तम निचरा',
      en: 'Medium to heavy black soil, well-drained'
    },
    avgYield: {
      mr: '४० - ८० टन प्रति एकर',
      en: '40 - 80 Tons per Acre'
    },
    description: {
      mr: 'महाराष्ट्रातील सर्वात महत्त्वाचे नगदी पीक. कोल्हापूर, सांगली, सातारा, पुणे, सोलापूर आणि अहमदनगर जिल्ह्यात मोठ्या प्रमाणावर लागवड होते.',
      en: 'The foremost commercial cash crop of Maharashtra, extensively cultivated in Western and Central Maharashtra.'
    },
    sowingPeriod: {
      mr: 'अडसाली (जुलै-ऑगस्ट), पूर्वहंगामी (ऑक्टो-नोव्हे), सुरू (जाने-फेब्रु)',
      en: 'Adsali (Jul-Aug), Pre-seasonal (Oct-Nov), Suru (Jan-Feb)'
    },
    fertilizerInfo: {
      mr: 'NPK: २५०:११५:११५ किलो/हेक्टर. बेसल डोस आणि ठिबकद्वारे खत व्यवस्थापन.',
      en: 'NPK: 250:115:115 kg/ha. Basal and fertigation schedule.'
    },
    pestControl: {
      mr: 'खोडकीड, कांडीकीड आणि पांढरी माशीसाठी ट्रायकोग्रामा आणि योग्य कीटकनाशकांचा वापर.',
      en: 'Trichogramma cards and targeted bio-pesticides for stem borer and whitefly.'
    },
    profitEstimate: {
      mr: 'रु. १,००,००० ते १,८०,००० प्रति एकर',
      en: '₹1,00,000 to ₹1,80,000 per Acre'
    },
    image: '/crops/sugarcane.jpg',
    badge: {
      mr: 'नगदी पीक',
      en: 'Cash Crop'
    }
  },
  {
    id: 'turmeric',
    name: {
      mr: 'हळद',
      en: 'Turmeric'
    },
    botanicalName: 'Curcuma longa',
    category: 'spices',
    season: 'kharif',
    duration: {
      mr: '८ ते ९ महिने (२४० - २७० दिवस)',
      en: '8 to 9 Months (240 - 270 Days)'
    },
    waterRequirement: {
      mr: '१००० - १५०० मिमी (ठिबक सिंचन उत्तम)',
      en: '1000 - 1500 mm (Drip Recommended)'
    },
    soilType: {
      mr: 'भुसभुशीत, सेंद्रिय कर्बयुक्त, उत्तम निचऱ्याची गाळाची जमीन',
      en: 'Loose, organic-rich, well-aerated sandy loam'
    },
    avgYield: {
      mr: '२५ - ३० क्विंटल वाळलेली हळद प्रति एकर',
      en: '25 - 30 Quintals dry turmeric per Acre'
    },
    description: {
      mr: 'सांगली, हिंगोली, नांदेड आणि वसमत पट्ट्यात हळदीचे दर्जेदार उत्पादन घेतले जाते. सेलम आणि प्रगती या जाती प्रसिद्ध आहेत.',
      en: 'Leading spice crop cultivated mainly in Sangli, Hingoli, and Nanded. Salem and Pragati varieties provide high curcumin.'
    },
    sowingPeriod: {
      mr: '१५ मे ते १५ जून (गादी वाफ्यावर लागवड)',
      en: '15 May to 15 June (Raised bed method)'
    },
    fertilizerInfo: {
      mr: 'शेणखत २० टन + NPK २००:१००:१०० किलो/हेक्टर तीन टप्प्यांत द्यावे.',
      en: '20 tons FYM + NPK 200:100:100 kg/ha split in 3 applications.'
    },
    pestControl: {
      mr: 'कंदकुज नियंत्रणासाठी ट्रायकोडर्मा विरिडी आणि कॉपर ऑक्सिक्लोराईडची आळवणी.',
      en: 'Drenching Trichoderma viride and Copper oxychloride to prevent rhizome rot.'
    },
    profitEstimate: {
      mr: 'रु. १,२०,००० ते २,२०,००० प्रति एकर',
      en: '₹1,20,000 to ₹2,20,000 per Acre'
    },
    image: '/crops/turmeric.jpg',
    badge: {
      mr: 'मसाला पीक',
      en: 'Spice Crop'
    }
  },
  {
    id: 'ginger',
    name: {
      mr: 'आले (अद्रक)',
      en: 'Ginger'
    },
    botanicalName: 'Zingiber officinale',
    category: 'spices',
    season: 'kharif',
    duration: {
      mr: '८ ते १० महिने (२४० - ३०० दिवस)',
      en: '8 to 10 Months (240 - 300 Days)'
    },
    waterRequirement: {
      mr: '१२०० - १६०० मिमी',
      en: '1200 - 1600 mm'
    },
    soilType: {
      mr: 'मध्यम काळी, सेंद्रिय खतांनी समृद्ध, उत्तम पाण्याचा निचरा',
      en: 'Medium black, organic loam with optimal drainage'
    },
    avgYield: {
      mr: '१०० - १५० क्विंटल ओले आले प्रति एकर',
      en: '100 - 150 Quintals fresh ginger per Acre'
    },
    description: {
      mr: 'छत्रपती संभाजीनगर, सातारा, सांगली या भागातील अत्यंत फायदेशीर पीक. माहिमा आणि रिओ-डि-जानेरो या प्रमुख जाती आहेत.',
      en: 'High-value spice crop grown widely in Satara, Sangli, and Chhatrapati Sambhajinagar with exceptional market value.'
    },
    sowingPeriod: {
      mr: '१५ एप्रिल ते ३० मे',
      en: '15 April to 30 May'
    },
    fertilizerInfo: {
      mr: 'चांगले कुजलेले शेणखत १५ टन + NPK १५०:१००:१०० किलो/हेक्टर.',
      en: '15 tons well-rotted FYM + NPK 150:100:100 kg/ha.'
    },
    pestControl: {
      mr: 'सूत्रकृमी व कंदमाशी नियंत्रणासाठी कडुनिंब पेंड आणि जैविक कीटकनाशक फवारणी.',
      en: 'Neem cake application and biological fungicides against rhizome rot.'
    },
    profitEstimate: {
      mr: 'रु. १,५०,००० ते २,८०,००० प्रति एकर',
      en: '₹1,50,000 to ₹2,80,000 per Acre'
    },
    image: '/crops/ginger.jpg',
    badge: {
      mr: 'मसाला पीक',
      en: 'High Value'
    }
  },
  {
    id: 'wheat',
    name: {
      mr: 'गहू',
      en: 'Wheat'
    },
    botanicalName: 'Triticum aestivum',
    category: 'cereals',
    season: 'rabi',
    duration: {
      mr: '१०५ ते १२० दिवस',
      en: '105 to 120 Days'
    },
    waterRequirement: {
      mr: '४५० - ६५० मिमी (४ ते ५ पाण्याच्या पाळ्या)',
      en: '450 - 650 mm (4-5 irrigations)'
    },
    soilType: {
      mr: 'भारी ते मध्यम काळी चिकणमाती जमीन',
      en: 'Heavy to medium black clay loam'
    },
    avgYield: {
      mr: '१६ - २५ क्विंटल प्रति एकर',
      en: '16 - 25 Quintals per Acre'
    },
    description: {
      mr: 'महाराष्ट्रातील प्रमुख रब्बी तृणधान्य पीक. समाधान, त्र्यंबक, फुले समाधान या प्रचलित आणि अधिक उत्पादन देणाऱ्या जाती आहेत.',
      en: 'Maharashtra’s premier Rabi cereal crop, ensuring food security and consistent market returns.'
    },
    sowingPeriod: {
      mr: '१ नोव्हेंबर ते १५ नोव्हेंबर (वेळेवर पेरणी)',
      en: '1 November to 15 November'
    },
    fertilizerInfo: {
      mr: 'NPK १२०:६०:४० किलो/हेक्टर. निम्मे नत्र व पूर्ण स्फुरद, पालाश पेरणीवेळी द्यावे.',
      en: 'NPK 120:60:40 kg/ha. Half N + full P and K at sowing.'
    },
    pestControl: {
      mr: 'तांबेरा रोगासाठी मॅन्कोझेब किंवा प्रोपिकोनाझोलची प्रतिबंधात्मक फवारणी.',
      en: 'Mancozeb or Propiconazole spray for rust and leaf blight.'
    },
    profitEstimate: {
      mr: 'रु. ३५,००० ते ६०,००० प्रति एकर',
      en: '₹35,000 to ₹60,000 per Acre'
    },
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    badge: {
      mr: 'रब्बी पीक',
      en: 'Rabi Cereal'
    }
  },
  {
    id: 'soybean',
    name: {
      mr: 'सोयाबीन',
      en: 'Soybean'
    },
    botanicalName: 'Glycine max',
    category: 'cash',
    season: 'kharif',
    duration: {
      mr: '९० ते १०५ दिवस',
      en: '90 to 105 Days'
    },
    waterRequirement: {
      mr: '४५० - ७०० मिमी',
      en: '450 - 700 mm'
    },
    soilType: {
      mr: 'मध्यम काळी, सामू ६.५ ते ७.५ असणारी जमीन',
      en: 'Medium black, neutral pH (6.5 - 7.5)'
    },
    avgYield: {
      mr: '१० - १४ क्विंटल प्रति एकर',
      en: '10 - 14 Quintals per Acre'
    },
    description: {
      mr: 'विदर्भ आणि मराठवाड्यातील मुख्य खरीप पीक. तेल आणि प्रथिनांचे उत्तम प्रमाण. फुले संगम (KDS-726) आणि JS-335 सर्वाधिक लोकप्रिय.',
      en: 'Prime Kharif crop in Vidarbha and Marathwada. Rich in plant protein and oil; Phule Sangam is the top performing variety.'
    },
    sowingPeriod: {
      mr: 'जूनचा शेवटचा आठवडा ते जुलैचा पहिला आठवडा (१०० मिमी पाऊस झाल्यावर)',
      en: 'Late June to Early July (after 100mm monsoon)'
    },
    fertilizerInfo: {
      mr: 'NPK ३०:६०:३० किलो/हेक्टर + रायझोबियम व PSB जीवाणू खतांची बीजप्रक्रिया.',
      en: 'NPK 30:60:30 kg/ha + Rhizobium and PSB seed treatment.'
    },
    pestControl: {
      mr: 'खोडमाशी, चक्रीभुंगा आणि लष्करी अळीसाठी क्लोरँट्रानिलीप्रोलची फवारणी.',
      en: 'Pheromone traps and Chlorantraniliprole against girdle beetle and spodoptera.'
    },
    profitEstimate: {
      mr: 'रु. २५,००० ते ५०,००० प्रति एकर',
      en: '₹25,000 to ₹50,000 per Acre'
    },
    image: '/crops/soybean.jpg',
    badge: {
      mr: 'खरीप पीक',
      en: 'Kharif Crop'
    }
  },
  {
    id: 'maize',
    name: {
      mr: 'मका',
      en: 'Maize (Corn)'
    },
    botanicalName: 'Zea mays',
    category: 'cereals',
    season: 'kharif',
    duration: {
      mr: '९० ते ११० दिवस',
      en: '90 to 110 Days'
    },
    waterRequirement: {
      mr: '५०० - ६५० मिमी',
      en: '500 - 650 mm'
    },
    soilType: {
      mr: 'खोल, कसदार, पाण्याचा चांगला निचरा होणारी जमीन',
      en: 'Deep fertile loam with good water holding capacity'
    },
    avgYield: {
      mr: '२५ - ३५ क्विंटल प्रति एकर',
      en: '25 - 35 Quintals per Acre'
    },
    description: {
      mr: 'अन्नधान्य, पशुखाद्य आणि पोल्ट्री उद्योगासाठी मोठ्या प्रमाणात लागवड केली जाते. खरीप, रब्बी आणि उन्हाळी या तिन्ही हंगामात येते.',
      en: 'Multipurpose crop utilized for food, poultry feed, and starch industry. Adaptable to Kharif, Rabi, and Summer.'
    },
    sowingPeriod: {
      mr: 'खरीप: जून-जुलै, रब्बी: ऑक्टोबर-नोव्हेंबर',
      en: 'Kharif: June-July, Rabi: October-November'
    },
    fertilizerInfo: {
      mr: 'NPK १२०:६०:४० किलो/हेक्टर + झिंक सल्फेट २५ किलो/हेक्टर.',
      en: 'NPK 120:60:40 kg/ha + Zinc Sulphate 25 kg/ha.'
    },
    pestControl: {
      mr: 'अमेरिकन लष्करी अळी (Fall Armyworm) च्या नियंत्रणासाठी कामगंध सापळे व इमामेक्टिन बेन्झोएट.',
      en: 'Fall Armyworm management using pheromone lures and Emamectin benzoate.'
    },
    profitEstimate: {
      mr: 'रु. ३०,००० ते ५५,००० प्रति एकर',
      en: '₹30,000 to ₹55,000 per Acre'
    },
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    badge: {
      mr: 'तृणधान्य',
      en: 'Cereal'
    }
  },
  {
    id: 'onion',
    name: {
      mr: 'कांदा',
      en: 'Onion'
    },
    botanicalName: 'Allium cepa',
    category: 'cash',
    season: 'rabi',
    duration: {
      mr: '११० ते १३० दिवस',
      en: '110 to 130 Days'
    },
    waterRequirement: {
      mr: '५५० - ७०० मिमी',
      en: '550 - 700 mm'
    },
    soilType: {
      mr: 'मध्यम काळी, गाळाची आणि उत्तम पाण्याचा निचरा होणारी जमीन',
      en: 'Medium black, silt loam, highly drained'
    },
    avgYield: {
      mr: '१०० - १४० क्विंटल प्रति एकर',
      en: '100 - 140 Quintals per Acre'
    },
    description: {
      mr: 'नाशिक, अहमदनगर आणि पुणे हे महाराष्ट्रातील प्रमुख कांदा उत्पादक जिल्हे आहेत. फुले समर्थ आणि भीमा किरण या साठवणुकीसाठी उत्तम जाती आहेत.',
      en: 'Maharashtra leads India in onion production, centered in Nashik and Pune. Renowned for export-quality red onions.'
    },
    sowingPeriod: {
      mr: 'खरीप (मे-जून), रांगडा (ऑगस्ट-सप्टेंबर), रब्बी (ऑक्टोबर-नोव्हेंबर)',
      en: 'Kharif (May-Jun), Late Kharif (Aug-Sep), Rabi (Oct-Nov)'
    },
    fertilizerInfo: {
      mr: 'NPK १००:५०:५० किलो/हेक्टर + सल्फर (गंधक) ३० किलो/हेक्टर.',
      en: 'NPK 100:50:50 kg/ha + Sulphur 30 kg/ha for pungency and shelf life.'
    },
    pestControl: {
      mr: 'फुलकिडे (थ्रिप्स) आणि जांभळा करपा रोगासाठी फिपरोनिल आणि ट्रायसायक्लॅझोल फवारणी.',
      en: 'Fipronil and Tricyclazole sprays against thrips and purple blotch.'
    },
    profitEstimate: {
      mr: 'रु. ६०,००० ते १,५०,००० प्रति एकर',
      en: '₹60,000 to ₹1,50,000 per Acre'
    },
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    badge: {
      mr: 'नगदी भाजीपाला',
      en: 'Cash Vegetable'
    }
  },
  {
    id: 'chickpea',
    name: {
      mr: 'हरभरा (चना)',
      en: 'Chickpea (Gram)'
    },
    botanicalName: 'Cicer arietinum',
    category: 'pulses',
    season: 'rabi',
    duration: {
      mr: '९० ते ११० दिवस',
      en: '90 to 110 Days'
    },
    waterRequirement: {
      mr: '२५० - ३५० मिमी (कमी पाण्यात येणारे पीक)',
      en: '250 - 350 mm (Low water need)'
    },
    soilType: {
      mr: 'मध्यम ते भारी, ओल टिकवून ठेवणारी काळी जमीन',
      en: 'Medium to heavy black moisture-retentive soil'
    },
    avgYield: {
      mr: '८ - १२ क्विंटल प्रति एकर',
      en: '8 - 12 Quintals per Acre'
    },
    description: {
      mr: 'कमी पाण्यात आणि कमी खर्चात भरघोस उत्पादन देणारे प्रमुख रब्बी कडधान्य पीक. दिग्विजय, जाकी ९२१८ आणि विजय या लोकप्रिय जाती.',
      en: 'Vital drought-tolerant Rabi pulse crop enriching soil nitrogen naturally. Digvijay and JAKI 9218 are top cultivars.'
    },
    sowingPeriod: {
      mr: '१० ऑक्टोबर ते १० नोव्हेंबर',
      en: '10 October to 10 November'
    },
    fertilizerInfo: {
      mr: 'NPK २५:५०:३० किलो/हेक्टर (पेरणीवेळी बेसल डोस).',
      en: 'NPK 25:50:30 kg/ha applied at sowing time.'
    },
    pestControl: {
      mr: 'घाटे अळी नियंत्रणासाठी ५% निंबोळी अर्क आणि एचपीएनपीव्ही (HNPV) चा वापर.',
      en: '5% Neem seed kernel extract (NSKE) and pheromone traps for pod borer.'
    },
    profitEstimate: {
      mr: 'रु. २५,००० ते ४५,००० प्रति एकर',
      en: '₹25,000 to ₹45,000 per Acre'
    },
    image: '/crops/chana.jpg',
    badge: {
      mr: 'कडधान्य',
      en: 'Pulse'
    }
  }
];
