export interface FertilizerItem {
  id: string;
  name: { mr: string; en: string };
  category: 'primary' | 'secondary' | 'soluble' | 'organic';
  npkRatio: string;
  role: { mr: string; en: string };
  bestStage: { mr: string; en: string };
  dosageGuideline: { mr: string; en: string };
  precautions: { mr: string; en: string };
}

export const fertilizerGuideData: FertilizerItem[] = [
  {
    id: 'urea',
    name: { mr: 'युरिया (Urea)', en: 'Urea' },
    category: 'primary',
    npkRatio: '46:0:0 (४६% नत्र / Nitrogen)',
    role: {
      mr: 'पिकांची शाकीय वाढ, हिरवेगार पाने, फुटवे आणि क्लोरोफिल तयार करण्यासाठी अत्यंत आवश्यक.',
      en: 'Essential for vegetative canopy vigor, tillering, and chlorophyll production.'
    },
    bestStage: {
      mr: 'पिकाच्या सुरुवातीच्या वाढीच्या टप्प्यात (३० ते ६० दिवसांपर्यंत)',
      en: 'Early vegetative growth and active tillering stages'
    },
    dosageGuideline: {
      mr: 'एकरानुसार ४५ किलोची १ ते ३ बॅगा (हप्त्यांत विभागून द्यावे)',
      en: '1 to 3 bags (45 kg) per acre in split doses'
    },
    precautions: {
      mr: 'उन्हात उघड्यावर टाकू नये. जमिनीत ओल असताना किंवा पाण्यासोबत द्यावा. जास्त वापरामुळे कीड-रोगांचा प्रादुर्भाव वाढतो.',
      en: 'Apply into moist soil; excessive doses attract sucking insects.'
    }
  },
  {
    id: 'dap',
    name: { mr: 'डीएपी (Di-Ammonium Phosphate)', en: 'DAP' },
    category: 'primary',
    npkRatio: '18:46:0 (१८% नत्र, ४६% स्फुरद)',
    role: {
      mr: 'मुळांचा भक्कम विकास, खोड मजबूत करणे आणि फुलोऱ्यासाठी स्फुरद पुरवणे.',
      en: 'Promotes vigorous root establishment, stalk strength, and flower bud initiation.'
    },
    bestStage: {
      mr: 'पेरणी किंवा लागवडीच्या वेळी (बेसल डोस म्हणून)',
      en: 'Basal application placed directly into furrow at sowing'
    },
    dosageGuideline: {
      mr: '१ ते २ बॅगा (५० किलो) प्रति एकर लागवडवेळी',
      en: '1 to 2 bags (50 kg) per acre at planting'
    },
    precautions: {
      mr: 'बियाण्यालगत थेट न ठेवता ५ सेमी खाली टाकावे. सूक्ष्म अन्नद्रव्यांसोबत थेट मिसळू नये.',
      en: 'Place 5 cm below seed level to prevent seedling burn.'
    }
  },
  {
    id: 'mop',
    name: { mr: 'एमओपी पोटॅश (Muriate of Potash)', en: 'MOP (Potash)' },
    category: 'primary',
    npkRatio: '0:0:60 (६०% पालाश / Potash)',
    role: {
      mr: 'दाणे व फळांचा आकार, चकाकी, वजन, साखर प्रमाण वाढवणे आणि दुष्काळ-रोगांशी लढण्याची ताकद देणे.',
      en: 'Drives grain filling, fruit size, sweetness, and builds disease/drought resistance.'
    },
    bestStage: {
      mr: 'लागवडवेळी आणि फळे/दाणे भरण्याच्या अवस्थेत',
      en: 'Basal planting and reproductive grain/fruit enlargement stages'
    },
    dosageGuideline: {
      mr: '१ ते २ बॅगा (५० किलो) प्रति एकर',
      en: '1 to 2 bags (50 kg) per acre'
    },
    precautions: {
      mr: 'तंबाखू व बटाटा पिकात एमओपी ऐवजी एसओपी (SOP 0:0:50) चा वापर करावा.',
      en: 'Use SOP (0:0:50) for chloride-sensitive crops like tobacco and potato.'
    }
  },
  {
    id: '19-19-19',
    name: { mr: '१९:१९:१९ (१००% पाण्यात विद्राव्य खत)', en: '19:19:19 Water Soluble' },
    category: 'soluble',
    npkRatio: '19:19:19 Balanced NPK',
    role: {
      mr: 'सर्व पोषक घटकांचे संतुलित प्रमाण. ठिबक सिंचन आणि फवारणीद्वारे जलद अन्नद्रव्य पुरवठा.',
      en: 'Equally balanced NPK formulation for vegetative boost via drip or foliar spray.'
    },
    bestStage: {
      mr: 'लागवडीनंतर १५ ते ४० दिवसांच्या दरम्यान',
      en: '15 to 40 days after crop transplanting'
    },
    dosageGuideline: {
      mr: 'फवारणी: ५ ग्रॅम प्रति लिटर पाणी; ठिबक: ३ ते ५ किलो प्रति एकर',
      en: 'Foliar: 5g/liter; Fertigation: 3 to 5 kg per acre'
    },
    precautions: {
      mr: 'सकाळी किंवा संध्याकाळी फवारणी करावी. कडक उन्हात फवारू नये.',
      en: 'Spray early morning or late afternoon to maximize leaf absorption.'
    }
  },
  {
    id: '0-52-34',
    name: { mr: '०:५२:३४ (मोनो पोटॅशियम फॉस्फेट - MKP)', en: '0:52:34 (MKP)' },
    category: 'soluble',
    npkRatio: '0:52:34 (स्फुरद + पालाश)',
    role: {
      mr: 'फुलकळी निर्मिती, फुलोरा टिकवणे आणि परागीभवनास चालना देणे. नत्र शून्य असल्याने पिकाची अवाजवी शाकीय वाढ रोखते.',
      en: 'Suppresses unwanted vegetative surge while accelerating heavy flowering and fruit set.'
    },
    bestStage: {
      mr: 'फुलोरा येण्यापूर्वी आणि फुलोरा अवस्थेत',
      en: 'Flower bud differentiation and pre-flowering stages'
    },
    dosageGuideline: {
      mr: 'फवारणी: ४ ते ५ ग्रॅम प्रति लिटर; ठिबक: ५ किलो प्रति एकर',
      en: 'Foliar: 4-5 g/liter; Drip: 5 kg per acre'
    },
    precautions: {
      mr: 'कॅल्शियमयुक्त खतांसोबत (उदा. कॅल्शियम नायट्रेट) एकत्र मिसळू नये.',
      en: 'Do not tank-mix directly with calcium-based fertilizers to avoid precipitation.'
    }
  },
  {
    id: '13-00-45',
    name: { mr: '१३:००:४५ (पोटॅशियम नायट्रेट)', en: '13:00:45 (Potassium Nitrate)' },
    category: 'soluble',
    npkRatio: '13:0:45 (१३% नायट्रेट नत्र, ४५% पालाश)',
    role: {
      mr: 'फळांचा व धान्याचा आकार, वजन, रंग आणि चकाकी वाढवण्यासाठी सर्वोत्तम विद्राव्य खत.',
      en: 'Premier grade for final stage fruit sizing, blemish-free color, and high sugar index.'
    },
    bestStage: {
      mr: 'फळे मोठी होताना आणि दाणे भरण्याच्या अंतिम टप्प्यात',
      en: 'Fruit enlargement, color break, and grain development stages'
    },
    dosageGuideline: {
      mr: 'फवारणी: ५ ते ७ ग्रॅम प्रति लिटर; ठिबक: ५ किलो प्रति एकर',
      en: 'Foliar: 5-7 g/liter; Fertigation: 5 kg per acre'
    },
    precautions: {
      mr: 'काढणीपूर्वी १५ ते २० दिवस आधी देणे बंद करावे.',
      en: 'Discontinue 15-20 days prior to final harvest.'
    }
  }
];
