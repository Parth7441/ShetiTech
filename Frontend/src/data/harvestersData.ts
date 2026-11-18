export interface HarvesterModel {
  id: string;
  name: { mr: string; en: string };
  category: { mr: string; en: string };
  cropsSupported: { mr: string[]; en: string[] };
  capacity: { mr: string; en: string };
  fuelEfficiency: { mr: string; en: string };
  rentalRate: { mr: string; en: string };
  subsidyAvailable: { mr: string; en: string };
  description: { mr: string; en: string };
  features: { mr: string[]; en: string[] };
  image: string;
}

export const harvestersData: HarvesterModel[] = [
  {
    id: 'combine-multi',
    name: {
      mr: 'मल्टी-क्रॉप कंबाईन हार्वेस्टर (Combine Harvester)',
      en: 'Multi-Crop Combine Harvester'
    },
    category: {
      mr: 'धान्य व कडधान्य काढणी',
      en: 'Grain & Pulse Harvesting'
    },
    cropsSupported: {
      mr: ['सोयाबीन', 'गहू', 'हरभरा', 'भात', 'सूर्यफूल'],
      en: ['Soybean', 'Wheat', 'Gram', 'Paddy', 'Sunflower']
    },
    capacity: {
      mr: '१.५ ते २.५ एकर प्रति तास',
      en: '1.5 to 2.5 Acres per Hour'
    },
    fuelEfficiency: {
      mr: '६ ते ८ लिटर डिझेल प्रति तास',
      en: '6 to 8 Liters Diesel/Hour'
    },
    rentalRate: {
      mr: 'रु. २,००० ते २,५०० प्रति एकर (चालकासह)',
      en: '₹2,000 to ₹2,500 per Acre (with operator)'
    },
    subsidyAvailable: {
      mr: 'महाडीबीटी अंतर्गत ४०% ते ५०% शासकीय अनुदान (रु. ५ ते ८ लाख)',
      en: '40% to 50% Govt Subsidy under MahaDBT (₹5 to ₹8 Lakhs)'
    },
    description: {
      mr: 'काढणी, मळणी आणि पाखडणी एकाच वेळी करणारे अत्यंत कार्यक्षम आधुनिक यंत्र. कमीत कमी धान्य नुकसान आणि स्वच्छ उत्पादनाची हमी.',
      en: 'Performs simultaneous cutting, threshing, and grain cleaning with minimal shattering losses.'
    },
    features: {
      mr: [
        'कापणीची उंची ५ ते २० सेमी समायोजित करता येते',
        'अनाज टाकी क्षमता १,५०० ते २,००० किलो',
        'कटर बार रुंदी १० ते १४ फूट',
        'रात्रीच्या कामासाठी शक्तिशाली LED फोकस'
      ],
      en: [
        'Adjustable cutting height from 5 to 20 cm',
        'Grain tank capacity 1500 - 2000 kg',
        '10 to 14 feet cutter bar width',
        'High-intensity LED lights for night operations'
      ]
    },
    image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sugarcane-harvester',
    name: {
      mr: 'ऊस तोडणी व तुकडे यंत्र (Sugarcane Harvester)',
      en: 'Self-Propelled Sugarcane Harvester'
    },
    category: {
      mr: 'नगदी पीक काढणी',
      en: 'Commercial Cane Harvester'
    },
    cropsSupported: {
      mr: ['ऊस (अडसाली, सुरू, पूर्वहंगामी)'],
      en: ['Sugarcane (All planting seasons)']
    },
    capacity: {
      mr: '२५ ते ३५ टन प्रति तास (४ ते ६ एकर/दिवस)',
      en: '25 to 35 Tons per Hour (4-6 Acres/Day)'
    },
    fuelEfficiency: {
      mr: '१.८ ते २.२ लिटर प्रति टन ऊस',
      en: '1.8 to 2.2 Liters per Ton'
    },
    rentalRate: {
      mr: 'रु. ४०० ते ५०० प्रति टन (तोडणी व ट्रॅक्टर भरणे)',
      en: '₹400 to ₹500 per Ton (Cutting + Loading)'
    },
    subsidyAvailable: {
      mr: 'साखर कारखाने व FPO साठी ५०% विशेष अनुदान (रु. २५ लाख)',
      en: '50% Special Subsidy for FPOs and Co-ops (Up to ₹25 Lakhs)'
    },
    description: {
      mr: 'ऊस तोडणी मजुरांच्या टंचाईवर सर्वोत्तम उपाय. मुळापासून योग्य कांडी कापणे, पाला वेगळा करणे आणि थेट ट्रॅक्टर ट्रॉलीत भरणे.',
      en: 'Eliminates sugarcane harvesting labor shortages by cutting close to soil, de-trashing, and direct loading.'
    },
    features: {
      mr: [
        'बेस कटरमुळे खोडवा उसाची फुटवा क्षमता वाढते',
        'उसाचे २५ ते ३० सेमी तुकडे करून ट्रॉलीत भरते',
        'पाचट बारीक करून शेतात पसरवते, ज्यामुळे खत बनते'
      ],
      en: [
        'Base cutter preserves ratoon stools for vigorous regrowth',
        'Precision billet chopping (25-30 cm)',
        'Extensive trash extractor spreads organic mulch back to soil'
      ]
    },
    image: 'https://images.unsplash.com/photo-1594771804886-a933bb2d609b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'maize-harvester',
    name: {
      mr: 'मका कणसे काढणी यंत्र (Maize Combine / Picker)',
      en: 'Maize Cob Harvester & Picker'
    },
    capacity: {
      mr: '१.५ ते २ एकर प्रति तास',
      en: '1.5 to 2.0 Acres/Hour'
    },
    category: {
      mr: 'तृणधान्य काढणी',
      en: 'Corn Harvesting'
    },
    cropsSupported: {
      mr: ['मका (दाणे किंवा अख्खे कणीस)'],
      en: ['Maize (Grain or whole cob)']
    },
    fuelEfficiency: {
      mr: '५ ते ७ लिटर प्रति तास',
      en: '5 to 7 Liters/Hour'
    },
    rentalRate: {
      mr: 'रु. १,८०० ते २,२०० प्रति एकर',
      en: '₹1,800 to ₹2,200 per Acre'
    },
    subsidyAvailable: {
      mr: 'कृषी यांत्रिकीकरण अभियानाखाली ४०% ते ५०% अनुदान',
      en: '40% - 50% Subsidy under Farm Mechanization Mission'
    },
    description: {
      mr: 'मका काढणीचा वेळ व मजुरी खर्च ७०% पर्यंत वाचवणारे यंत्र. मका दाणे वेगळे करणे किंवा जनावरांसाठी मुरघास तयार करणे शक्य.',
      en: 'Reduces corn harvesting labor costs by 70%, capable of grain de-husking and green forage chopping.'
    },
    features: {
      mr: [
        '३ ते ४ ओळींची एकाच वेळी कापणी',
        'कणसातून दाणे वेगळे करण्याची ९९% अचूकता',
        'उरलेला ताटांचा चारा बारीक करण्याची सुविधा'
      ],
      en: [
        '3-4 row header configurations',
        '99% de-husking and grain separation efficiency',
        'Integrated stalk shredder for animal fodder preparation'
      ]
    },
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'groundnut-digger',
    name: {
      mr: 'भुईमूग शेंगा काढणी व मळणी यंत्र (Groundnut Digger Thresher)',
      en: 'Groundnut Digger Inverter & Thresher'
    },
    category: {
      mr: 'तेलबिया काढणी',
      en: 'Oilseed Harvesting'
    },
    cropsSupported: {
      mr: ['भुईमूग (उन्हाळी व खरीप)'],
      en: ['Groundnut (Kharif and Summer)']
    },
    capacity: {
      mr: '०.७५ ते १ एकर प्रति तास',
      en: '0.75 to 1.0 Acre/Hour'
    },
    fuelEfficiency: {
      mr: '३ ते ४ लिटर प्रति तास',
      en: '3 to 4 Liters/Hour'
    },
    rentalRate: {
      mr: 'रु. १,५०० ते १,८०० प्रति एकर',
      en: '₹1,500 to ₹1,800 per Acre'
    },
    subsidyAvailable: {
      mr: '५०% कृषी विभाग अनुदान (रु. १.२ लाखांपर्यंत)',
      en: '50% Department of Agriculture Subsidy (Up to ₹1.2 Lakhs)'
    },
    description: {
      mr: 'जमिनीतील भुईमुगाच्या शेंगा न तुटता उपटून, माती झटकून शेंगा उन्हात वाळवण्यासाठी वरच्या बाजूने पलटी करणारे यंत्र.',
      en: 'Gently excavates groundnut pods, shakes off soil clumps, and inverts vines upside-down for rapid solar curing.'
    },
    features: {
      mr: [
        'शेंगा जमिनीत तुटण्याचे प्रमाण १% पेक्षा कमी',
        'ट्रॅक्टर पीटीओ (PTO) वर सहज चालते',
        'माती वेगळी करणारी विशेष व्हायब्रेटिंग कन्व्हेयर सिस्टीम'
      ],
      en: [
        'Pod loss in soil suppressed below 1%',
        'Tractor 3-point PTO operated',
        'Vibrating soil-separating screen'
      ]
    },
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80'
  }
];
