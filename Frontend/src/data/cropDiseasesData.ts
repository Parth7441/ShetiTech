import type { LocalizedString } from '../types';

export interface CropDisease {
  id: string;
  cropId: string;
  cropName: LocalizedString;
  name: LocalizedString;
  category: 'pest' | 'disease' | 'deficiency';
  severity: 'high' | 'medium' | 'low';
  symptoms: {
    mr: string[];
    en: string[];
  };
  causes: LocalizedString;
  organicTreatment: LocalizedString;
  chemicalTreatment: LocalizedString;
  dosage: LocalizedString;
  preventiveTips: {
    mr: string[];
    en: string[];
  };
}

export const cropDiseasesData: CropDisease[] = [
  // 1. SOYBEAN
  {
    id: 'soybean-girdle-beetle',
    cropId: 'soybean',
    cropName: { mr: 'सोयाबीन', en: 'Soybean' },
    name: { mr: 'चक्रीभुंगा व खोडमाशी', en: 'Girdle Beetle & Stem Fly' },
    category: 'pest',
    severity: 'high',
    symptoms: {
      mr: [
        'खोडावर किंवा फांदीवर दोन गोलाकार वलये (चक्रे) दिसतात.',
        'फांदी किंवा झाडाचा शेंडा सुकतो आणि खाली वाकतो.',
        'अळी खोडाच्या आत शिरून आतील भाग पोखरते.'
      ],
      en: [
        'Two distinct ring-like cuts visible on stems or petiole.',
        'Wilted and drooping top branches above the cuts.',
        'Larva bores inside the central pith of the stem.'
      ]
    },
    causes: {
      mr: 'ओबेरिया ब्रेव्हिस (Oberia brevis) नावाचा भुंगा खोडावर अंडी घालतो.',
      en: 'Longhorn beetle females laying eggs inside girdled rings of the stem.'
    },
    organicTreatment: {
      mr: '५% निंबोळी अर्क (NSKE) किंवा अझाडिराक्टिन १०,००० ppm (२० मिली प्रति १० लिटर). प्रादुर्भावग्रस्त फांद्या तोडून नष्ट करणे.',
      en: '5% Neem Seed Kernel Extract (50ml/10L) or Azadirachtin 10,000 ppm. Pruning infested branches.'
    },
    chemicalTreatment: {
      mr: 'क्लोरँट्रानिलीप्रोल (कोराजन) १८.५% SC किंवा थायामेथोक्साम १२.६% + लॅम्बडा सायहॅलोथ्रीन ९.५% ZC.',
      en: 'Chlorantraniliprole 18.5% SC or Thiamethoxam 12.6% + Lambda Cyhalothrin 9.5% ZC.'
    },
    dosage: {
      mr: '३ मिली क्लोरँट्रानिलीप्रोल किंवा २.५ मिली थायामेथोक्साम मिश्रण प्रति १० लिटर पाणी.',
      en: '3 ml Chlorantraniliprole or 2.5 ml premix per 10 Liters of water.'
    },
    preventiveTips: {
      mr: [
        'पेरणीच्या वेळी थायामेथोक्साम ३० FS ची बीजप्रक्रिया (१० मिली/किलो) करावी.',
        'पीक २० ते २५ दिवसांचे असताना प्रतिबंधात्मक निंबोळी अर्काची फवारणी करावी.'
      ],
      en: [
        'Seed treatment with Thiamethoxam 30 FS (10 ml/kg seed) before sowing.',
        'Preventive spray of Neem extract at 20-25 days after sowing.'
      ]
    }
  },
  {
    id: 'soybean-yellow-mosaic',
    cropId: 'soybean',
    cropName: { mr: 'सोयाबीन', en: 'Soybean' },
    name: { mr: 'पिवळा मोझॅक विषाणू (पाने पिवळी पडणे)', en: 'Yellow Mosaic Virus (YMV)' },
    category: 'disease',
    severity: 'high',
    symptoms: {
      mr: [
        'पानांवर पिवळे व हिरवे चट्टे दिसतात.',
        'हळूहळू संपूर्ण पान चमकदार पिवळे पडते आणि झाडाची वाढ खुंटते.',
        'शेंगा कमी लागतात आणि आकाराने बारीक राहतात.'
      ],
      en: [
        'Irregular yellow and green patches on young leaves.',
        'Leaves turn completely golden yellow, stunting crop growth.',
        'Poor pod formation and undersized shriveled seeds.'
      ]
    },
    causes: {
      mr: 'पांढरी माशी (Whitefly - Bemisia tabaci) द्वारे विषाणूचा प्रसार होतो.',
      en: 'Whiteflies acting as insect vectors transmitting the geminivirus.'
    },
    organicTreatment: {
      mr: 'पिवळे चिकट सापळे (Yellow Sticky Traps) एकरी १५ ते २० लावावेत. ५% निंबोळी अर्क फवारावा.',
      en: 'Install 15-20 yellow sticky traps per acre. Spray 5% neem extract.'
    },
    chemicalTreatment: {
      mr: 'पांढरी माशी नियंत्रणासाठी: थायामेथोक्साम २५% WG किंवा ॲसिटामिप्रीड २०% SP.',
      en: 'For whitefly control: Thiamethoxam 25% WG or Acetamiprid 20% SP.'
    },
    dosage: {
      mr: 'थायामेथोक्साम ४ ग्रॅम किंवा ॲसिटामिप्रीड ३ ग्रॅम प्रति १० लिटर पाणी.',
      en: '4 grams Thiamethoxam or 3 grams Acetamiprid per 10 Liters water.'
    },
    preventiveTips: {
      mr: [
        'रोगप्रतिकारक जाती (फुले संगम KDS-726, JS-9305) ची निवड करावी.',
        'रोगट झाडे दिसताच शेतातून उपटून नष्ट करावीत.'
      ],
      en: [
        'Cultivate resistant varieties like Phule Sangam (KDS-726).',
        'Rogue out and destroy infected plants immediately.'
      ]
    }
  },

  // 2. TURMERIC
  {
    id: 'turmeric-rhizome-rot',
    cropId: 'turmeric',
    cropName: { mr: 'हळद', en: 'Turmeric' },
    name: { mr: 'हळदीतील कंदकुज (Rhizome Rot)', en: 'Rhizome Rot & Soft Rot' },
    category: 'disease',
    severity: 'high',
    symptoms: {
      mr: [
        'रोपांची खालची पाने कडेने पिवळी पडून वाळतात.',
        'झाडाचा बुंधा मऊ पडून दुर्गंधी येते आणि रोप सहज उपटून येते.',
        'जमिनीखालील कंद मऊ पडून कुजतात.'
      ],
      en: [
        'Lower leaves turn yellow along margins and dry out prematurely.',
        'Base of pseudostem turns soft, water-soaked, emitting foul odor.',
        'Underground rhizomes rot completely into soft decaying mass.'
      ]
    },
    causes: {
      mr: 'पिथियम व फ्युझॅरियम बुरशी; पाण्याचा योग्य निचरा नसणे व कंदमाशीचा प्रादुर्भाव.',
      en: 'Pythium aphanidermatum & Fusarium fungi exacerbated by waterlogging.'
    },
    organicTreatment: {
      mr: 'ट्रायकोडर्मा विरिडी (२.५ किलो प्रति एकर) ५०० किलो शेणखतात मिसळून लागवडीवेळी व नंतर देणे.',
      en: 'Trichoderma viride (2.5 kg/acre) enriched in 500 kg farmyard manure.'
    },
    chemicalTreatment: {
      mr: 'कॉपर ऑक्सिक्लोराईड ५०% WP किंवा मेटलॅक्सिल ८% + मॅन्कोझेब ६४% WP ची आळवणी (Drenching).',
      en: 'Drenching with Copper Oxychloride 50% WP or Metalaxyl + Mancozeb.'
    },
    dosage: {
      mr: 'कॉपर ऑक्सिक्लोराईड ३० ग्रॅम + स्ट्रेप्टोसायक्लिन २ ग्रॅम प्रति १० लिटर पाणी झाडांच्या बुंध्याशी आळवणी.',
      en: '30g Copper Oxychloride + 2g Streptocycline per 10 L water drenching.'
    },
    preventiveTips: {
      mr: [
        'गादी वाफ्यावर (Raised Beds) हळद लागवड करावी, जेणेकरून पाण्याचा उत्तम निचरा होईल.',
        'लागवडीपूर्वी बेणेप्रक्रिया (Quinalphos + Mancozeb) आवर्जून करावी.'
      ],
      en: [
        'Plant exclusively on broad raised beds with furrow drainage.',
        'Rigorous rhizome seed treatment before sowing.'
      ]
    }
  },
  {
    id: 'turmeric-leaf-blotch',
    cropId: 'turmeric',
    cropName: { mr: 'हळद', en: 'Turmeric' },
    name: { mr: 'हळदीवरील करपा (Leaf Blotch)', en: 'Leaf Blotch & Leaf Spot' },
    category: 'disease',
    severity: 'medium',
    symptoms: {
      mr: [
        'पानांवर लंबगोलाकार करड्या किंवा तपकिरी रंगाचे ठिपके दिसतात.',
        'ठिपके एकमेकांत मिसळून संपूर्ण पान करपल्यासारखे दिसते.'
      ],
      en: [
        'Oblong brown and grey spots visible on upper leaf surfaces.',
        'Coalescing lesions cause extensive leaf scorch and blight.'
      ]
    },
    causes: {
      mr: 'टॅफ्रीना मॅक्युलन्स (Taphrina maculans) किंवा कोलेटोट्रायकम बुरशी.',
      en: 'Fungal infection flourishing during overcast humid weather.'
    },
    organicTreatment: {
      mr: 'स्यूडोमोनास फ्लुरोसेन्स (२० ग्रॅम प्रति १० लिटर) ची प्रतिबंधात्मक फवारणी.',
      en: 'Foliar application of Pseudomonas fluorescens (20g/10L).'
    },
    chemicalTreatment: {
      mr: 'मॅन्कोझेब ७५% WP किंवा अझॉक्सीस्ट्रॉबिन १८.२% + डायफेनोकोनॅझोल ११.४% SC.',
      en: 'Mancozeb 75% WP or Azoxystrobin + Difenoconazole.'
    },
    dosage: {
      mr: 'मॅन्कोझेब २५ ग्रॅम किंवा अझॉक्सीस्ट्रॉबिन मिश्रण १० मिली प्रति १० लिटर पाणी.',
      en: '25g Mancozeb or 10ml Azoxystrobin premix per 10 Liters water.'
    },
    preventiveTips: {
      mr: [
        'पानांवर जास्त काळ पाणी साचणार नाही अशा वेळी ठिबक सिंचन चालवावे.',
        'पिकात हवा खेळती राहण्यासाठी योग्य अंतर ठेवावे.'
      ],
      en: [
        'Ensure proper row spacing for optimal sunlight penetration.',
        'Avoid excessive overhead sprinkler watering late in the day.'
      ]
    }
  },

  // 3. SUGARCANE
  {
    id: 'sugarcane-stem-borer',
    cropId: 'sugarcane',
    cropName: { mr: 'ऊस', en: 'Sugarcane' },
    name: { mr: 'उसावरील खोडकीड (Early Shoot Borer)', en: 'Early Shoot Borer' },
    category: 'pest',
    severity: 'high',
    symptoms: {
      mr: [
        'उसाचा मधला पोंगा (शेंडा) वाळून मरतो, ज्याला "डेड हार्ट" (Dead Heart) म्हणतात.',
        'वाळलेला पोंगा ओढल्यास सहज हातामध्ये येतो आणि त्यातून घाण वास येतो.',
        'खोडाच्या खालच्या भागावर बारीक छिद्रे दिसतात.'
      ],
      en: [
        'Central shoot wilts and dries out into classic "Dead Heart".',
        'Dead shoot easily pulls out releasing an offensive rotting odor.',
        'Tiny entry bore holes visible on lower cane joints near soil.'
      ]
    },
    causes: {
      mr: 'कायलो इन्फ्युस्काटेलस (Chilo infuscatellus) अळी खोडात शिरून वाढणारा भाग खाते.',
      en: 'Caterpillar larvae tunneling downwards through seedling nodes.'
    },
    organicTreatment: {
      mr: 'ट्रायकोग्रामा चिलोनीस (Trichogramma chilonis) चे कार्ड्स हेक्टरी ५ या प्रमाणात लागवडीनंतर ४५ दिवसांनी लावावेत.',
      en: 'Release Trichogramma chilonis egg parasitoids (50,000/ha) from 4th week.'
    },
    chemicalTreatment: {
      mr: 'क्लोरँट्रानिलीप्रोल (कोराजन) १८.५% SC किंवा फिप्रोनिल ०.३% GR दाणेदार खतासोबत.',
      en: 'Chlorantraniliprole 18.5% SC drenching or Fipronil 0.3% GR granules.'
    },
    dosage: {
      mr: 'कोराजन ०.४ मिली प्रति लिटर पाणी (एकरी १५० मिली) उसाच्या बुंध्याशी आळवणी करावी.',
      en: '150 ml Coragen per acre mixed in 350-400 Liters water drenched along furrows.'
    },
    preventiveTips: {
      mr: [
        'लागवडीनंतर ४५ दिवसांनी पहिली हलकी भर (Earthing up) द्यावी.',
        'ऊस शेतात कामगंध सापळे (Pheromone Traps) एकरी ५ लावावेत.'
      ],
      en: [
        'Perform earthing-up operations at 45 days to bury shoot bases.',
        'Install 5 pheromone lure traps per acre.'
      ]
    }
  },

  // 4. ONION
  {
    id: 'onion-thrips',
    cropId: 'onion',
    cropName: { mr: 'कांदा', en: 'Onion' },
    name: { mr: 'कांद्यावरील फुलकिडे (थ्रिप्स)', en: 'Onion Thrips' },
    category: 'pest',
    severity: 'high',
    symptoms: {
      mr: [
        'पानांवर बारीक पांढरट-चांदेरी रंगाचे ओरखडे किंवा ठिपके दिसतात.',
        'पाने वाकडी-तिकडी होऊन शेंड्याकडून वाळू लागतात.',
        'कांद्याची मान बारीक राहते आणि कांद्याचा आकार वाढत नाही.'
      ],
      en: [
        'Silvery white speckles and scarring streaks on tubular leaves.',
        'Leaves curl, curl upwards, and dry from leaf tips downwards.',
        'Stunted bulb development resulting in poor commercial size.'
      ]
    },
    causes: {
      mr: 'थ्रिप्स टॅबासी (Thrips tabaci) कीड पानांमधील रस शोषून घेते.',
      en: 'Microscopic yellow nymphs and dark winged adults rasping plant sap.'
    },
    organicTreatment: {
      mr: 'निळे चिकट सापळे (Blue Sticky Traps) एकरी २५ लावावेत. व्हर्टिसिलियम लेकॅनी जैविक बुरशी (५ ग्रॅम/लि) फवारावी.',
      en: 'Install 25 blue sticky traps/acre. Spray Lecanicillium lecanii (5g/L).'
    },
    chemicalTreatment: {
      mr: 'फिप्रोनिल ५% SC किंवा स्पिनोसॅड ४५% SC किंवा सायंट्रानिलीप्रोल १०.२६% OD.',
      en: 'Fipronil 5% SC or Spinosad 45% SC or Cyantraniliprole 10.26% OD.'
    },
    dosage: {
      mr: 'फिप्रोनिल २० मिली किंवा स्पिनोसॅड ३.५ मिली प्रति १० लिटर पाणी + स्टिकर मिसळावा.',
      en: '20 ml Fipronil or 3.5 ml Spinosad per 10 L water with agricultural spreader.'
    },
    preventiveTips: {
      mr: [
        'तुषार (स्प्रिंकलर) सिंचनाचा वापर केल्यास थ्रिप्स कीड धुऊन जाते.',
        'कांदा पिकाच्या कडेने मका किंवा ज्वारीच्या २ ओळी संरक्षक पीक म्हणून लावाव्यात.'
      ],
      en: [
        'Overhead sprinkler irrigation physically knocks off thrips.',
        'Plant barrier rows of maize or sorghum along field borders.'
      ]
    }
  },
  {
    id: 'onion-purple-blotch',
    cropId: 'onion',
    cropName: { mr: 'कांदा', en: 'Onion' },
    name: { mr: 'कांद्यावरील जांभळा करपा (Purple Blotch)', en: 'Purple Blotch' },
    category: 'disease',
    severity: 'high',
    symptoms: {
      mr: [
        'पानांवर मध्यभागी जांभळट-तपकिरी रंगाचे लंबगोलाकार डाग पडतात.',
        'डागांच्या कडा पिवळसर किंवा तांबूस दिसतात.',
        'तीव्र प्रादुर्भावात पाने मधेच मोडून पडतात.'
      ],
      en: [
        'Small water-soaked lesions developing sunken purple-brown centers.',
        'Lesions bordered by pronounced reddish-yellow halo.',
        'Leaves snap and collapse mid-length under severe infection.'
      ]
    },
    causes: {
      mr: 'अल्टरनेरिया पोरी (Alternaria porri) बुरशी. ढगाळ वातावरण आणि जास्त आर्द्रतेमुळे फैलाव.',
      en: 'Alternaria porri fungus thriving during warm humid monsoon periods.'
    },
    organicTreatment: {
      mr: 'ताक + हळद किंवा स्यूडोमोनास फ्लुरोसेन्स (५० ग्रॅम/१० लि) ची फवारणी.',
      en: 'Foliar spray of Pseudomonas fluorescens or bio-fungicide formulations.'
    },
    chemicalTreatment: {
      mr: 'प्रोपिकोनाझोल २५% EC किंवा टेब्युकोनाझोल २५.९% EC किंवा डिफेनोकोनॅझोल २५% EC.',
      en: 'Propiconazole 25% EC or Tebuconazole 25.9% EC.'
    },
    dosage: {
      mr: '१० मिली प्रोपिकोनाझोल किंवा १० मिली टेब्युकोनाझोल प्रति १० लिटर पाणी + स्टिकर.',
      en: '10 ml Propiconazole per 10 L water mixed with non-ionic sticker.'
    },
    preventiveTips: {
      mr: [
        'थ्रिप्स किडीचे वेळेवर नियंत्रण करावे, कारण थ्रिप्सच्या जखमांमधूनच करपा बुरशी शिरते.',
        'नत्राचा (युरिया) अतिवापर टाळावा.'
      ],
      en: [
        'Control thrips diligently as punctures serve as entry gateways for fungi.',
        'Avoid excessive unbalanced nitrogen applications.'
      ]
    }
  },

  // 5. GINGER
  {
    id: 'ginger-soft-rot',
    cropId: 'ginger',
    cropName: { mr: 'आले (अद्रक)', en: 'Ginger' },
    name: { mr: 'आले कंदकुज व कंदमाशी', en: 'Ginger Soft Rot & Rhizome Fly' },
    category: 'disease',
    severity: 'high',
    symptoms: {
      mr: [
        'रोपांचे शेंडे पिवळे पडतात आणि झाडे मऊ पडून जमिनीवर लोळतात.',
        'आल्याचा कंद पाणीदार, मऊ पडून कुजतो आणि अतिशय दुर्गंधी येते.',
        'कंदमाशीच्या अळ्या कंदाच्या आत शिरून सडवतात.'
      ],
      en: [
        'Foliage turns pale yellow from leaf tips spreading to base.',
        'Collar region rots causing pseudostems to collapse flat.',
        'Internal rhizome flesh decomposes into water-soaked, foul pulp.'
      ]
    },
    causes: {
      mr: 'पिथियम बुरशी व कंदमाशी (Mimegralla coeruleifrons).',
      en: 'Pythium fungus combined with rhizome fly maggot infestations.'
    },
    organicTreatment: {
      mr: 'ट्रायकोडर्मा विरिडी + कडुनिंब पेंड लागवडीवेळी व ५० दिवसांनी देणे. कंदमाशीसाठी प्रकाश सापळे लावणे.',
      en: 'Trichoderma viride with neem cake application. Light traps for adult flies.'
    },
    chemicalTreatment: {
      mr: 'मेटलॅक्सिल ८% + मॅन्कोझेब ६४% WP (रिडोमिल गोल्ड) किंवा कॉपर हायड्रॉक्साईडची आळवणी.',
      en: 'Metalaxyl-Mancozeb drenching with Chlorpyriphos for maggot control.'
    },
    dosage: {
      mr: '२५ ग्रॅम मेटलॅक्सिल मिश्रण + २० मिली क्लोरोपायरीफॉस प्रति १० लिटर पाणी आळवणी.',
      en: '25g Metalaxyl-Mancozeb + 20ml Chlorpyriphos per 10 L water drenched.'
    },
    preventiveTips: {
      mr: [
        'गादी वाफ्यावर लागवड आणि पावसाळ्यात पाणी साचू न देणे.',
        'लागवडीपूर्वी निरोगी बेण्याची निवड व बेणेप्रक्रिया.'
      ],
      en: [
        'Select disease-free seed rhizomes from healthy certified plots.',
        'Ensure unimpeded field drainage during heavy monsoon rains.'
      ]
    }
  },

  // 6. CHICKPEA (हरभरा)
  {
    id: 'chickpea-pod-borer',
    cropId: 'chickpea',
    cropName: { mr: 'हरभरा (चना)', en: 'Chickpea / Gram' },
    name: { mr: 'हरभऱ्यावरील घाटे अळी (Pod Borer)', en: 'Chickpea Pod Borer' },
    category: 'pest',
    severity: 'high',
    symptoms: {
      mr: [
        'सुरुवातीला अळी कोवळी पाने व फुले खाते.',
        'घाटे धरल्यावर घाट्याला गोल छिद्र पाडून डोके आत घालून दाणे खाते.',
        'एकच अळी अनेक घाट्यांचे नुकसान करते.'
      ],
      en: [
        'Young larvae scrape and defoliate tender foliage and flower buds.',
        'Bores round holes into green pods and consumes developing grains.',
        'A single caterpillar destroys several pods throughout its lifespan.'
      ]
    },
    causes: {
      mr: 'हेलिकोव्हर्पा आर्मिजेरा (Helicoverpa armigera) पतंगाची अळी.',
      en: 'Helicoverpa armigera moths laying spherical eggs on flower bracts.'
    },
    organicTreatment: {
      mr: 'हेक्टरी ५ कामगंध सापळे (Pheromone Traps) आणि पक्षी थांबे (T-shaped perches) लावावेत. ५% निंबोळी अर्क किंवा HNPV विषाणू २५० LE फवारावा.',
      en: 'Erect bird perches (50/ha) and 5 pheromone traps. Spray HNPV or 5% neem extract.'
    },
    chemicalTreatment: {
      mr: 'इमामेक्टिन बेन्झोएट ५% SG किंवा क्लोरँट्रानिलीप्रोल १८.५% SC किंवा फ्लुबेन्डियामाइड ३९.३५% SC.',
      en: 'Emamectin Benzoate 5% SG or Chlorantraniliprole 18.5% SC.'
    },
    dosage: {
      mr: 'इमामेक्टिन बेन्झोएट ४ ग्रॅम किंवा क्लोरँट्रानिलीप्रोल ३ मिली प्रति १० लिटर पाणी.',
      en: '4 grams Emamectin Benzoate or 3 ml Chlorantraniliprole per 10 L water.'
    },
    preventiveTips: {
      mr: [
        'फुलोऱ्याच्या सुरुवातीला प्रतिबंधात्मक पहिली निंबोळी अर्क फवारणी करावी.',
        'हरभऱ्यात आंतरपीक म्हणून धने किंवा मोहरी लावावी.'
      ],
      en: [
        'Spray neem seed extract proactively at onset of flowering.',
        'Intercrop with coriander or mustard to attract natural predators.'
      ]
    }
  }
];
