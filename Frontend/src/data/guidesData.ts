import type { FarmingGuide } from '../types';

export const guidesData: FarmingGuide[] = [
  {
    id: 'drip-irrigation',
    title: {
      mr: 'ठिबक सिंचन तंत्रज्ञान: पाणी आणि खतांची ५०% बचत',
      en: 'Drip Irrigation Mastery: Save 50% Water and Fertilizer'
    },
    category: {
      mr: 'जल व्यवस्थापन',
      en: 'Water Management'
    },
    readTime: {
      mr: '४ मिनिटे वाचन',
      en: '4 min read'
    },
    summary: {
      mr: 'कमी पाण्यात जास्तीत जास्त उत्पादन घेण्यासाठी ठिबक सिंचन आणि व्हेंचुरीद्वारे विद्राव्य खते देण्याचे शास्त्रोक्त तंत्र.',
      en: 'Scientific techniques for drip irrigation and fertigation via venturi to maximize crop output under water scarcity.'
    },
    content: {
      mr: [
        'ठिबक सिंचनामुळे पिकाच्या मुळांच्या कार्यक्षम कक्षेतच पाणी आणि खते थेंब-थेंब दिली जातात.',
        'पारंपारिक मोकाट पाण्याच्या तुलनेत ठिबकमुळे ४० ते ६० टक्के पाण्याची बचत होते.',
        'व्हेंचुरी किंवा फर्टिलायझर टँकचा वापर करून १९:१९:१९, १२:६१:००, ०:५२:३४ यांसारखी पाण्यात १००% विद्राव्य खते थेट मुळांना पोहोचवता येतात.',
        'ठिबकच्या नळ्यांमध्ये क्षार साचू नये म्हणून दर ३ महिन्यांनी हायड्रोक्लोरिक आम्ल (Acid Treatment) द्वारे फ्लशिंग करावे.'
      ],
      en: [
        'Drip irrigation supplies water and dissolved nutrients directly to the root zone drop-by-drop.',
        'Saves 40% to 60% of water compared to traditional flood irrigation methods.',
        'Utilizing Venturi systems allows 100% water-soluble fertilizers (19:19:19, 12:61:00, 0:52:34) to feed the plants efficiently.',
        'Regular acid flushing with dilute hydrochloric acid prevents mineral scaling and emitter clogging.'
      ]
    },
    keyTips: {
      mr: [
        'लॅटरल नळ्यांवर नेहमी १.२ ते २.० केजी/चौ.सेमी दाबाने पाणी सोडावे.',
        'उन्हाळ्यात बाष्पीभवन रोखण्यासाठी ठिबक नळ्यांवर उसाचे पाचट किंवा प्लॅस्टिक मल्चिंग वापरावे.'
      ],
      en: [
        'Maintain operating lateral pressure around 1.2 to 2.0 kg/cm² for uniform discharge.',
        'Pair drip laterals with organic mulching to minimize soil moisture evaporation.'
      ]
    },
    author: {
      mr: 'कृषी विद्यापीठ तज्ज्ञ समिती',
      en: 'Agri University Advisory Panel'
    },
    tag: {
      mr: 'जलसंधारण',
      en: 'Conservation'
    }
  },
  {
    id: 'organic-manure-jeevamrut',
    title: {
      mr: 'देशी गाईचे शेण-गोमूत्र वापरून जिवामृत तयार करण्याची कृती',
      en: 'How to Prepare Bio-Fertilizer Jeevamrut on Your Farm'
    },
    category: {
      mr: 'सेंद्रिय शेती',
      en: 'Organic Farming'
    },
    readTime: {
      mr: '५ मिनिटे वाचन',
      en: '5 min read'
    },
    summary: {
      mr: 'जमिनीतील सूक्ष्मजीव आणि गांडुळांची संख्या वाढवण्यासाठी घरच्या घरी जिवामृत तयार करण्याचे सोपे व प्रभावी सूत्र.',
      en: 'A cost-effective home-brewed microbiological formulation that activates soil microbes and earthworms naturally.'
    },
    content: {
      mr: [
        '२०० लिटर पाण्यासाठी १० किलो देशी गाईचे ताजे शेण, ५ ते १० लिटर गोमूत्र, २ किलो गूळ आणि २ किलो डाळीचे पीठ (बेसन) घ्या.',
        'झाडाखालील किंवा बांधावरील १ मूठ जिवंत माती त्यात मिसळावी.',
        'हे मिश्रण सावलीत ठेवून दररोज सकाळ-संध्याकाळ लाकडी काठीने घड्याळाच्या दिशेने २ मिनिटे ढवळावे.',
        '४८ ते ७२ तासांत जिवामृत तयार होते. हे जिवामृत पाटाच्या पाण्यासोबत किंवा ठिबक गाळून पिकांना द्यावे.'
      ],
      en: [
        'For a 200-liter drum, combine 10 kg fresh indigenous cow dung, 5-10 liters cow urine, 2 kg jaggery, and 2 kg pulse flour.',
        'Incorporate a handful of active topsoil gathered beneath old banyan or peepal trees.',
        'Keep the concoction in deep shade and stir clockwise with a wooden stick twice daily for 2 minutes.',
        'Ready for application within 48 to 72 hours via flood water or filtered through drip systems.'
      ]
    },
    keyTips: {
      mr: [
        'जिवामृत तयार झाल्यावर ७ दिवसांच्या आत शेतात वापरून संपवावे.',
        'प्रत्येक महिन्याला एकरी २०० लिटर जिवामृत दिल्यास जमिनीचा सेंद्रिय कर्ब झपाट्याने वाढतो.'
      ],
      en: [
        'Utilize prepared Jeevamrut within 7 days of fermentation for peak microbial vitality.',
        'Applying 200 liters per acre monthly substantially enhances active soil organic carbon.'
      ]
    },
    author: {
      mr: 'सेंद्रिय कृषी मित्र मंडळ',
      en: 'Natural Farming Guild'
    },
    tag: {
      mr: 'सेंद्रिय शेती',
      en: 'Zero Budget'
    }
  },
  {
    id: 'onion-storage-chawl',
    title: {
      mr: 'रब्बी कांदा साठवणूक तंत्रज्ञान आणि चाळ व्यवस्थापन',
      en: 'Rabi Onion Storage and Ventilation Chawl Management'
    },
    category: {
      mr: 'काढणीपश्चात तंत्रज्ञान',
      en: 'Post-Harvest'
    },
    readTime: {
      mr: '६ मिनिटे वाचन',
      en: '6 min read'
    },
    summary: {
      mr: 'कांदा सड आणि वजनातील घट रोखण्यासाठी शास्त्रोक्त कांदा चाळ उभारणी आणि साठवणुकीचे नियम.',
      en: 'Scientific post-harvest curing, grading, and ventilated chawl storage to preserve bulb quality for 5-6 months.'
    },
    content: {
      mr: [
        'कांदा काढणीपूर्वी १० ते १५ दिवस पाणी पूर्णपणे बंद करावे, ज्यामुळे कांद्याची मान घट्ट होते.',
        'काढणीनंतर कांदा शेतात पाल्यासह ३ ते ४ दिवस सुकवावा (फील्ड क्युरिंग). नंतर २ ते ३ सेमी मान ठेवून पात कापावी.',
        'चाळीची दिशा पूर्व-पश्चिम असावी जेणेकरून हवा खेळती राहील. जमिनीपासून २ फूट उंचीवर जाळीदार तळ असावा.',
        'चाळीत कांद्याची थप्पी ४ ते ४.५ फुटांपेक्षा जास्त उंच लावू नये.'
      ],
      en: [
        'Cease irrigation 10 to 15 days prior to harvest to harden neck tissues and suppress post-harvest sprouting.',
        'Field-cure bulbs under leaf canopies for 3-4 days before trimming foliage, leaving a 2.5 cm stem neck intact.',
        'Erect storage chawls in an East-West orientation to harness prevailing air currents; ensure bottom slats 2 feet above soil.',
        'Do not pile bulbs higher than 4 to 4.5 feet to prevent heat buildup and crushing.'
      ]
    },
    keyTips: {
      mr: [
        'साठवणुकीपूर्वी डागी, फुटके व जोड कांदे निवडून वेगळे काढावेत.',
        'चाळीतील तापमान २५ ते ३० अंश सेल्सिअस आणि हवेतील आर्द्रता ६५ ते ७०% असावी.'
      ],
      en: [
        'Strictly segregate thick-necked, bruised, and twin bulbs prior to bulk loading.',
        'Maintain storage temperature between 25-30°C and relative humidity around 65-70%.'
      ]
    },
    author: {
      mr: 'कांदा व लसूण संशोधन केंद्र (राजगुरुनगर)',
      en: 'DOGR Onion Research Centre'
    },
    tag: {
      mr: 'काढणीपश्चात',
      en: 'Post-Harvest'
    }
  },
  {
    id: 'ipm-pest-control',
    title: {
      mr: 'एकात्मिक कीड नियंत्रण (IPM): रासायनिक औषधांचा खर्च कमी करा',
      en: 'Integrated Pest Management (IPM): Cut Chemical Costs'
    },
    category: {
      mr: 'पीक संरक्षण',
      en: 'Plant Protection'
    },
    readTime: {
      mr: '४ मिनिटे वाचन',
      en: '4 min read'
    },
    summary: {
      mr: 'पिवळे-निळे चिकट सापळे, कामगंध सापळे आणि मित्र कीटकांच्या सहाय्याने किडींचे नैसर्गिक नियंत्रण.',
      en: 'Deploy yellow/blue sticky traps, pheromone lures, and beneficial bio-agents to minimize pesticide spray expenses.'
    },
    content: {
      mr: [
        'रासायनिक फवारणीवर थेट अवलंबून न राहता प्रथम भौतिक व जैविक पद्धतींचा अवलंब करावा.',
        'पांढरी माशी आणि तुडतुड्यांसाठी एकरी १५ ते २० पिवळे चिकट सापळे लावावेत.',
        'फुलकिडे (थ्रिप्स) नियंत्रणासाठी निळे चिकट सापळे अत्यंत प्रभावी ठरतात.',
        'लष्करी अळी व बोंडअळीच्या नर पतंगांना पकडण्यासाठी एकरी ५ कामगंध सापळे (Pheromone Traps) लावावेत.'
      ],
      en: [
        'Adopt biological and cultural defenses as the frontline safeguard before resorting to expensive chemicals.',
        'Deploy 15-20 yellow sticky cards per acre to trap whiteflies, leafhoppers, and winged aphids.',
        'Utilize blue sticky traps specifically for capturing destructive thrips in vegetables and spices.',
        'Install 5 pheromone lure traps per acre to disrupt mating cycles of nocturnal caterpillars.'
      ]
    },
    keyTips: {
      mr: [
        'फवारणी नेहमी सकाळी १० च्या आत किंवा संध्याकाळी ४ नंतर थंड हवेत करावी.',
        '५% निंबोळी अर्काची फवारणी अंडी व लहान अळ्यांच्या अवस्थेत १००% गुणकारी ठरते.'
      ],
      en: [
        'Perform foliar spraying before 10 AM or after 4 PM to prevent rapid evaporation and leaf scorch.',
        'Neem seed kernel extract (NSKE 5%) exhibits extraordinary oviposition deterrence.'
      ]
    },
    author: {
      mr: 'कृषी विज्ञान केंद्र (KVK)',
      en: 'Krishi Vigyan Kendra (KVK)'
    },
    tag: {
      mr: 'कीड नियंत्रण',
      en: 'Pest Control'
    }
  }
];
