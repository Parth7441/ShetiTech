export interface SeasonInfo {
  id: 'kharif' | 'rabi' | 'summer' | 'annual';
  name: { mr: string; en: string };
  period: { mr: string; en: string };
  rainfallNeed: { mr: string; en: string };
  soilSuitability: { mr: string; en: string };
  description: { mr: string; en: string };
  crops: {
    name: { mr: string; en: string };
    sowingWindow: { mr: string; en: string };
    duration: { mr: string; en: string };
    avgYield: { mr: string; en: string };
    bestVarieties: { mr: string; en: string };
    tip: { mr: string; en: string };
  }[];
}

export const seasonCropsData: SeasonInfo[] = [
  {
    id: 'kharif',
    name: {
      mr: 'खरीप हंगाम (पावसाळी पिके)',
      en: 'Kharif Season (Monsoon Crops)'
    },
    period: {
      mr: 'जून ते ऑक्टोबर (मान्सून कालावधी)',
      en: 'June to October (Monsoon Period)'
    },
    rainfallNeed: {
      mr: '६०० ते १२०० मिमी पावसाची गरज',
      en: '600 to 1200 mm Rainfall'
    },
    soilSuitability: {
      mr: 'मध्यम काळी, उत्तम निचऱ्याची भुसभुशीत जमीन',
      en: 'Medium black, well-draining loam'
    },
    description: {
      mr: 'महाराष्ट्रातील सर्वात मोठा आणि महत्त्वाचा शेती हंगाम. मान्सूनच्या सुरुवातीस १०० मिमी पाऊस झाल्यावर पेरणी केली जाते.',
      en: 'Maharashtra’s prime agricultural season powered by the Southwest monsoon. Sowing commences upon receiving 100mm initial rains.'
    },
    crops: [
      {
        name: { mr: 'सोयाबीन (Soybean)', en: 'Soybean' },
        sowingWindow: { mr: '२५ जून ते १५ जुलै', en: '25 June to 15 July' },
        duration: { mr: '९५ - १०५ दिवस', en: '95 - 105 Days' },
        avgYield: { mr: '१० - १२ क्विंटल/एकर', en: '10 - 12 Qtl/Acre' },
        bestVarieties: { mr: 'फुले संगम (KDS-726), फुले किमया, JS-335', en: 'Phule Sangam, JS-335' },
        tip: { mr: 'रायझोबियम आणि PSB जीवाणू संवर्धनाची बीजप्रक्रिया आवश्यक.', en: 'Rhizobium and PSB seed inoculation critical.' }
      },
      {
        name: { mr: 'कापूस (Cotton)', en: 'Cotton' },
        sowingWindow: { mr: '१५ जून ते १० जुलै', en: '15 June to 10 July' },
        duration: { mr: '१५० - १८० दिवस', en: '150 - 180 Days' },
        avgYield: { mr: '१२ - १५ क्विंटल/एकर', en: '12 - 15 Qtl/Acre' },
        bestVarieties: { mr: 'अजित १५५, राशी ६५९, कावेरी जादू', en: 'Ajit 155, Rasi 659, Kaveri Jadoo' },
        tip: { mr: 'गुलाबी बोंडअळीच्या नियंत्रणासाठी एकरी ५ फेरोमोन सापळे लावा.', en: 'Install 5 pheromone traps per acre for pink bollworm.' }
      },
      {
        name: { mr: 'हळद (Turmeric)', en: 'Turmeric' },
        sowingWindow: { mr: '१५ मे ते १५ जून', en: '15 May to 15 June' },
        duration: { mr: '२४० - २७० दिवस', en: '240 - 270 Days' },
        avgYield: { mr: '२५ - ३० क्विंटल वाळलेली हळद/एकर', en: '25 - 30 Qtl dry/Acre' },
        bestVarieties: { mr: 'सेलम, प्रगती, राजापुरी', en: 'Salem, Pragati, Rajapuri' },
        tip: { mr: 'गादी वाफ्यावर (Raised bed) लागवड आणि ठिबक सिंचन सर्वोत्तम.', en: 'Raised beds with drip fertigation produce peak yields.' }
      },
      {
        name: { mr: 'मका (Maize)', en: 'Maize' },
        sowingWindow: { mr: '२५ जून ते १० जुलै', en: '25 June to 10 July' },
        duration: { mr: '९५ - ११० दिवस', en: '95 - 110 Days' },
        avgYield: { mr: '२५ - ३२ क्विंटल/एकर', en: '25 - 32 Qtl/Acre' },
        bestVarieties: { mr: 'पायोनिअर ३३९६, डीकेसी ९१४४, राजर्षी', en: 'Pioneer 3396, DKC 9144, Rajarshi' },
        tip: { mr: 'लष्करी अळीच्या नियंत्रणासाठी पेरणीवेळी बीजप्रक्रिया करा.', en: 'Chemical seed dressing shields seedlings from armyworm.' }
      }
    ]
  },
  {
    id: 'rabi',
    name: {
      mr: 'रब्बी हंगाम (हिवाळी पिके)',
      en: 'Rabi Season (Winter Crops)'
    },
    period: {
      mr: 'ऑक्टोबर ते मार्च (थंडीचा काळ)',
      en: 'October to March (Winter Period)'
    },
    rainfallNeed: {
      mr: 'सिंचनावर आधारित (३ ते ५ पाण्याच्या पाळ्या)',
      en: 'Irrigation-based (3 to 5 rounds)'
    },
    soilSuitability: {
      mr: 'भारी काळी, ओलावा टिकवून ठेवणारी खोल जमीन',
      en: 'Heavy moisture-retentive black soil'
    },
    description: {
      mr: 'थंड हवामान, कमी किडींचा प्रादुर्भाव आणि उच्च प्रतीचे उत्पादन देणारा हंगाम. गहू, हरभरा, रब्बी कांदा ही प्रमुख पिके.',
      en: 'Cool temperature season with lower pest pressures, favoring cereal and pulse production.'
    },
    crops: [
      {
        name: { mr: 'गहू (Wheat)', en: 'Wheat' },
        sowingWindow: { mr: '१ नोव्हेंबर ते २० नोव्हेंबर', en: '1 Nov to 20 Nov' },
        duration: { mr: '१०५ - १२० दिवस', en: '105 - 120 Days' },
        avgYield: { mr: '१८ - २५ क्विंटल/एकर', en: '18 - 25 Qtl/Acre' },
        bestVarieties: { mr: 'फुले समाधान, त्र्यंबक, लोकवान', en: 'Phule Samadhan, Lokwan, Tryambak' },
        tip: { mr: 'मुकुट मुळे फुटण्याच्या वेळी (२१ दिवस) पहिले पाणी देणे अत्यंत गरजेचे.', en: 'First irrigation at Crown Root Initiation (21 days) is vital.' }
      },
      {
        name: { mr: 'हरभरा (Gram / Chickpea)', en: 'Chickpea' },
        sowingWindow: { mr: '१० ऑक्टोबर ते १० नोव्हेंबर', en: '10 Oct to 10 Nov' },
        duration: { mr: '९० - ११० दिवस', en: '90 - 110 Days' },
        avgYield: { mr: '१० - १४ क्विंटल/एकर', en: '10 - 14 Qtl/Acre' },
        bestVarieties: { mr: 'दिग्विजय, जाकी ९२१८, विजय', en: 'Digvijay, JAKI 9218, Vijay' },
        tip: { mr: 'फुलोरा अवस्थेत पाणी देणे टाळावे, घाटी भरताना हलके पाणी द्यावे.', en: 'Avoid irrigation during peak flowering; water at pod filling.' }
      },
      {
        name: { mr: 'रब्बी कांदा (उन्हाळी कांदा)', en: 'Rabi Onion' },
        sowingWindow: { mr: 'रोपवाटिका: ऑक्टो-नोव्हे, पुनर्लागवड: डिसें-जाने', en: 'Nursery: Oct-Nov, Transplant: Dec-Jan' },
        duration: { mr: '१२० - १३० दिवस', en: '120 - 130 Days' },
        avgYield: { mr: '१२० - १६० क्विंटल/एकर', en: '120 - 160 Qtl/Acre' },
        bestVarieties: { mr: 'भीमा किरण, फुले समर्थ, भीमा शक्ती', en: 'Bhima Kiran, Phule Samarth' },
        tip: { mr: 'चाळीत ६ महिने टिकणारा कांदा; गंधक (Sulphur) खताचा वापर करा.', en: 'Sulphur application increases storage life in chawls up to 6 months.' }
      },
      {
        name: { mr: 'रब्बी ज्वारी (Rabi Jowar)', en: 'Rabi Sorghum' },
        sowingWindow: { mr: '१५ सप्टेंबर ते १५ ऑक्टोबर', en: '15 Sep to 15 Oct' },
        duration: { mr: '११५ - १२५ दिवस', en: '115 - 125 Days' },
        avgYield: { mr: '१२ - १५ क्विंटल/एकर', en: '12 - 15 Qtl/Acre' },
        bestVarieties: { mr: 'मालदांडी ३५-१, फुले सुचित्रा, फुले अनुराधा', en: 'Maldandi 35-1, Phule Suchitra' },
        tip: { mr: 'हस्त नक्षत्रातील पाऊस ओलावा टिकवून पेरणी केल्यास उत्तम उत्पादन.', en: 'Sow following late-monsoon showers on stored moisture.' }
      }
    ]
  },
  {
    id: 'summer',
    name: {
      mr: 'उन्हाळी हंगाम (गरमीची पिके)',
      en: 'Summer Season (Zaid Crops)'
    },
    period: {
      mr: 'फेब्रुवारी ते मे (उष्ण हवामान)',
      en: 'February to May (Hot Dry Weather)'
    },
    rainfallNeed: {
      mr: '१००% खात्रीशीर सिंचनाची गरज (ठिबक सिंचन आवश्यक)',
      en: '100% Irrigation Dependent'
    },
    soilSuitability: {
      mr: 'मध्यम काळी, उत्तम निचरा असणारी जमीन',
      en: 'Medium loamy with guaranteed drainage'
    },
    description: {
      mr: 'सूर्यप्रकाश भरपूर असल्याने पिकांची वाढ झपाट्याने होते. रोगराई कमी असते, परंतु पाण्याचे काटेकोर व्यवस्थापन आवश्यक असते.',
      en: 'High solar irradiance drives rapid growth with minimal disease, but requires dedicated irrigation.'
    },
    crops: [
      {
        name: { mr: 'उन्हाळी भुईमूग (Summer Groundnut)', en: 'Summer Groundnut' },
        sowingWindow: { mr: '१५ जानेवारी ते १५ फेब्रुवारी', en: '15 Jan to 15 Feb' },
        duration: { mr: '१०५ - १२० दिवस', en: '105 - 120 Days' },
        avgYield: { mr: '१४ - १८ क्विंटल/एकर', en: '14 - 18 Qtl/Acre' },
        bestVarieties: { mr: 'TAG-24, TG-37A, फुले उन्नती', en: 'TAG-24, TG-37A, Phule Unnati' },
        tip: { mr: 'जिप्सम २०० किलो प्रति एकर आऱ्या सुटताना द्यावे.', en: 'Broadcast 200 kg gypsum per acre at peg initiation.' }
      },
      {
        name: { mr: 'उन्हाळी मूग व उडीद', en: 'Summer Green Gram / Black Gram' },
        sowingWindow: { mr: '१५ फेब्रुवारी ते १० मार्च', en: '15 Feb to 10 March' },
        duration: { mr: '६५ - ७० दिवस', en: '65 - 70 Days' },
        avgYield: { mr: '५ - ७ क्विंटल/एकर', en: '5 - 7 Qtl/Acre' },
        bestVarieties: { mr: 'फुले चेतना, BM-2003-2, उत्कर्षा', en: 'Phule Chetana, BM-2003-2' },
        tip: { mr: 'कमी कालावधीत जमीन सुपीक करणारे व अतिरिक्त उत्पन्न देणारे पीक.', en: 'Short duration nitrogen-fixer revitalizing depleted soils.' }
      },
      {
        name: { mr: 'कलिंगड व टरबूज (Watermelon & Melon)', en: 'Watermelon & Muskmelon' },
        sowingWindow: { mr: 'जानेवारी ते फेब्रुवारी', en: 'January to February' },
        duration: { mr: '७५ - ८५ दिवस', en: '75 - 85 Days' },
        avgYield: { mr: '२५ - ३५ टन/एकर', en: '25 - 35 Tons/Acre' },
        bestVarieties: { mr: 'किरण, शुगर बेबी, बाहुबली', en: 'Kiran, Sugar Baby, Bahubali' },
        tip: { mr: 'सिल्व्हर-ब्लॅक प्लास्टिक मल्चिंग आणि ठिबक सिंचनाचा वापर करा.', en: 'Use 25-micron silver-black mulching film and drip fertigation.' }
      }
    ]
  },
  {
    id: 'annual',
    name: {
      mr: 'बारमाही / वार्षिक पिके',
      en: 'Annual & Perennial Crops'
    },
    period: {
      mr: 'वर्षभर चालणारी पिके (१२ ते १८ महिने)',
      en: 'Full Year Cycle (12 to 18 Months)'
    },
    rainfallNeed: {
      mr: 'वर्षभर नियमित पाणी नियोजन',
      en: 'Continuous Year-Round Irrigation'
    },
    soilSuitability: {
      mr: 'खोल भारी काळी कसदार जमीन (सामू ७.० ते ८.०)',
      en: 'Deep fertile clay loam (pH 7.0 - 8.0)'
    },
    description: {
      mr: 'ऊस, केळी, डाळिंब व द्राक्ष यांसारखी दीर्घकालीन आर्थिक स्थैर्य देणारी बारमाही नगदी पिके.',
      en: 'High-capital perennial cash crops such as sugarcane, banana, and fruit vineyards.'
    },
    crops: [
      {
        name: { mr: 'ऊस (Sugarcane)', en: 'Sugarcane' },
        sowingWindow: { mr: 'अडसाली (जुलै-ऑगस्ट), सुरू (जाने-फेब्रु)', en: 'Adsali (Jul-Aug), Suru (Jan-Feb)' },
        duration: { mr: '१२ ते १८ महिने', en: '12 - 18 Months' },
        avgYield: { mr: '५० - ९० टन/एकर', en: '50 - 90 Tons/Acre' },
        bestVarieties: { mr: 'Co-86032 (नीरा), CoM-0265 (फुले २६५)', en: 'Co-86032, CoM-0265' },
        tip: { mr: 'ठिबक सिंचनाने पाण्याची ५०% बचत आणि उत्पादनात २५% वाढ.', en: 'Sub-surface drip saves 50% water with 25% cane tonnage increase.' }
      }
    ]
  }
];
