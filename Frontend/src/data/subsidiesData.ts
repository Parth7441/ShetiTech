export interface SubsidyScheme {
  id: string;
  title: { mr: string; en: string };
  department: { mr: string; en: string };
  subsidyAmount: { mr: string; en: string };
  subsidyPercent: string;
  targetBeneficiary: { mr: string; en: string };
  keyObjective: { mr: string; en: string };
  eligibility: { mr: string[]; en: string[] };
  requiredDocuments: { mr: string[]; en: string[] };
  portalLink: string;
  badge: { mr: string; en: string };
}

export const subsidiesData: SubsidyScheme[] = [
  {
    id: 'drip-irrigation-scheme',
    title: {
      mr: 'प्रधानमंत्री कृषी सिंचन योजना (प्रति थेंब अधिक पीक - ठिबक/तुषार अनुदान)',
      en: 'Pradhan Mantri Krishi Sinchayee Yojana (Micro Irrigation Subsidy)'
    },
    department: {
      mr: 'कृषी विभाग, महाराष्ट्र शासन (महाडीबीटी पोर्टल)',
      en: 'Dept. of Agriculture, Govt. of Maharashtra (MahaDBT)'
    },
    subsidyAmount: {
      mr: 'खर्चाच्या ७०% ते ८०% पर्यंत थेट खात्यात सबसिडी (अनुदान)',
      en: '70% to 80% of project cost direct to bank account'
    },
    subsidyPercent: '७०% - ८०%',
    targetBeneficiary: {
      mr: 'अल्प व अत्यल्प भूधारक शेतकरी (५ एकरांपर्यंत प्राधान्य)',
      en: 'Small and marginal farmers (up to 5 acres prioritized)'
    },
    keyObjective: {
      mr: 'पाण्याची ५०% पर्यंत बचत करणे आणि उत्पादनात किमान २५% वाढ साध्य करणे.',
      en: 'Conserve water by up to 50% while scaling crop output by 25%.'
    },
    eligibility: {
      mr: [
        'शेतकऱ्याच्या नावावर ७/१२ आणि ८-अ उतारा असणे आवश्यक',
        'शेतजमिनीत विहीर, बोअरवेल किंवा शेततळे यांसारखा पाण्याचा शाश्वत स्त्रोत असावा',
        'गेल्या ७ वर्षांत या योजनेचा लाभ घेतलेला नसावा'
      ],
      en: [
        'Must possess updated 7/12 and 8-A land registry records',
        'Must have assured perennial irrigation source (well/borewell/pond)',
        'Should not have availed this subsidy in the past 7 years'
      ]
    },
    requiredDocuments: {
      mr: ['७/१२ व ८-अ उतारा', 'आधार कार्ड', 'बँक पासबुक झेरॉक्स', 'विहिरीचा पाणी दाखला', 'अधिकृत डीलरचे कोटेशन बिल'],
      en: ['7/12 & 8-A extracts', 'Aadhaar Card', 'Bank Passbook copy', 'Water availability proof', 'Authorized dealer quotation']
    },
    portalLink: 'https://mahadbt.maharashtra.gov.in',
    badge: { mr: 'सर्वाधिक लोकप्रिय', en: 'Most Popular' }
  },
  {
    id: 'farm-mechanization-scheme',
    title: {
      mr: 'कृषी यांत्रिकीकरण उपअभियान (ट्रॅक्टर, हार्वेस्टर व कृषी अवजारे अनुदान)',
      en: 'Sub-Mission on Agricultural Mechanization (SMAM - Tractor & Harvester Subsidy)'
    },
    department: {
      mr: 'कृषी अभियांत्रिकी संचालनालय, महाराष्ट्र राज्य',
      en: 'Directorate of Agricultural Engineering, Maharashtra'
    },
    subsidyAmount: {
      mr: 'ट्रॅक्टरसाठी रु. १.२५ लाख; हार्वेस्टरसाठी रु. ५ लाख ते ८ लाख अनुदान',
      en: 'Tractor subsidy up to ₹1.25 Lakhs; Harvesters up to ₹5 - ₹8 Lakhs'
    },
    subsidyPercent: '४०% - ५०%',
    targetBeneficiary: {
      mr: 'सर्व शेतकरी, महिला शेतकरी, अनुसूचित जाती/जमाती व FPO गट',
      en: 'Individual farmers, women cultivators, SC/ST, and FPO collectives'
    },
    keyObjective: {
      mr: 'शेती कामातील मजुरी टंचाईवर मात करणे आणि आधुनिक यंत्रांचा वापर वाढवणे.',
      en: 'Overcome acute farm labor shortages through accessible mechanization.'
    },
    eligibility: {
      mr: [
        'शेतकऱ्याकडे स्वतःची शेतजमीन असावी',
        'कुटुंबातील एकाच व्यक्तीला ट्रॅक्टर अनुदानाचा लाभ मिळतो',
        'महाडीबीटी पोर्टलवर ऑनलाईन लॉटरीद्वारे निवड केली जाते'
      ],
      en: [
        'Must hold registered farmland in Maharashtra',
        'One beneficiary per family household for tractor grant',
        'Beneficiary selected via transparent MahaDBT randomized lottery'
      ]
    },
    requiredDocuments: {
      mr: ['७/१२ उतारा', 'आधार कार्ड', 'जातीचा दाखला (लागू असल्यास)', 'यंत्र खरेदी कोटेशन', 'बँक खाते तपशील'],
      en: ['7/12 Record', 'Aadhaar Card', 'Caste Certificate (if applicable)', 'Machinery Quotation', 'Bank details']
    },
    portalLink: 'https://mahadbt.maharashtra.gov.in',
    badge: { mr: 'लॉटरी योजना', en: 'MahaDBT Lottery' }
  },
  {
    id: 'onion-chawl-subsidy',
    title: {
      mr: 'एकात्मिक फलोत्पादन विकास अभियान - कांदा चाळ उभारणी अनुदान',
      en: 'Mission for Integrated Development of Horticulture - Onion Chawl Subsidy'
    },
    department: {
      mr: 'महाराष्ट्र राज्य फलोत्पादन मंडळ',
      en: 'Maharashtra State Horticulture Board'
    },
    subsidyAmount: {
      mr: '२५ मेट्रिक टन क्षमतेच्या कांदा चाळीसाठी रु. ८७,५०० पर्यंत ५०% अनुदान',
      en: '50% subsidy up to ₹87,500 for a 25 MT ventilated onion storage chawl'
    },
    subsidyPercent: '५०%',
    targetBeneficiary: {
      mr: 'नाशिक, अहमदनगर, पुणे, सोलापूर, धुळे, छत्रपती संभाजीनगर कांदा उत्पादक',
      en: 'Onion growers in Nashik, Pune, Ahmednagar, Solapur, and Marathwada'
    },
    keyObjective: {
      mr: 'कांद्याची काढणीनंतरची सड व नुकसान रोखणे आणि भाव वाढल्यावर विक्रीची संधी देणे.',
      en: 'Prevent post-harvest rotting and enable farmers to hold stock for peak rates.'
    },
    eligibility: {
      mr: [
        'शेतकऱ्याने कांदा पीक घेतलेले असणे आवश्यक (७/१२ वर कांदा पीक नोंद)',
        'चाळ कृषी विद्यापीठाच्या शिफारशीत डिझाइननुसार बांधलेली असावी'
      ],
      en: [
        'Must have verified onion crop entry registered on 7/12 extract',
        'Chawl must conform to approved state university architectural specs'
      ]
    },
    requiredDocuments: {
      mr: ['७/१२ व पीक पाहणी नोंद', 'चाळ उभारणीचे फोटो (GPS टॅग)', 'खर्च पावती', 'बँक पासबुक'],
      en: ['7/12 with crop survey entry', 'Geo-tagged photos of constructed chawl', 'Material invoices', 'Bank passbook']
    },
    portalLink: 'https://mahadbt.maharashtra.gov.in',
    badge: { mr: 'साठवणूक अनुदान', en: 'Storage Subsidy' }
  },
  {
    id: 'solar-pump-kusum',
    title: {
      mr: 'पीएम-कुसुम सोलर कृषी पंप योजना (९०% ते ९५% अनुदानावर सौर कृषी पंप)',
      en: 'PM-KUSUM Solar Agricultural Pump Scheme'
    },
    department: {
      mr: 'महाऊर्जा (MEDA) व महाराष्ट्र शासन',
      en: 'MEDA & Ministry of New and Renewable Energy'
    },
    subsidyAmount: {
      mr: '३, ५ व ७.५ HP क्षमतेच्या सोलर पंपासाठी ९०% ते ९५% पर्यंत अनुदान',
      en: '90% to 95% subsidy on 3, 5, and 7.5 HP off-grid solar water pumps'
    },
    subsidyPercent: '९०% - ९५%',
    targetBeneficiary: {
      mr: 'पारंपारिक वीज कनेक्शन नसलेले किंवा दिवसा अखंड वीज हवी असणारे शेतकरी',
      en: 'Farmers lacking conventional grid connection needing daylight power'
    },
    keyObjective: {
      mr: 'दिवसा शेतकऱ्यांना सिंचनासाठी भरवशाची व मोफत वीज उपलब्ध करून देणे.',
      en: 'Guarantee reliable daytime free solar electricity for crop irrigation.'
    },
    eligibility: {
      mr: [
        'शेतकऱ्याकडे शाश्वत पाण्याचा स्त्रोत (विहीर किंवा शेततळे) उपलब्ध असावा',
        'शेतकऱ्याने केवळ ५% ते १०% हिस्सा भरणे आवश्यक'
      ],
      en: [
        'Functional open well or borewell on farm',
        'Farmer only contributes remaining 5% - 10% self-share'
      ]
    },
    requiredDocuments: {
      mr: ['७/१२ व ८-अ', 'आधार कार्ड', 'पाण्याचा दाखला', 'पासपोर्ट साईज फोटो'],
      en: ['7/12 & 8-A', 'Aadhaar Card', 'Water source verification', 'Passport photos']
    },
    portalLink: 'https://kusum.mahaurja.com',
    badge: { mr: 'मोफत वीज', en: 'Daytime Solar Power' }
  }
];
