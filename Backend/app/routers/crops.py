from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional

router = APIRouter(prefix="/crops", tags=["Crops"])

# Central crops repository with full bilingual data
CROPS_DATA = [
    {
        "id": "sugarcane",
        "name": {"mr": "ऊस", "en": "Sugarcane"},
        "botanicalName": "Saccharum officinarum",
        "category": "cash",
        "season": "annual",
        "duration": {"mr": "१२ ते १८ महिने", "en": "12 to 18 Months"},
        "waterRequirement": {"mr": "२५०० - ३००० मिमी", "en": "2500 - 3000 mm"},
        "soilType": {"mr": "मध्यम ते भारी, उत्तम निचऱ्याची काळी जमीन", "en": "Medium to heavy well-drained loam"},
        "avgYield": {"mr": "६० - १०० टन प्रति एकर", "en": "60 - 100 Tons per Acre"},
        "description": {
            "mr": "महाराष्ट्रातील सर्वात महत्त्वाचे नगदी पीक. को ८६०३२ (नीरा) आणि एमएस १०००१ या प्रमुख लोकप्रिय जाती आहेत.",
            "en": "Leading cash crop of Maharashtra with high sugar recovery. Co 86032 and MS 10001 are top performing varieties."
        },
        "profitEstimate": {"mr": "रु. १,००,००० ते १,८०,००० प्रति एकर", "en": "₹1,00,000 to ₹1,80,000 per Acre"},
        "image": "/crops/sugarcane.jpg",
        "badge": {"mr": "नगदी पीक", "en": "Cash Crop"}
    },
    {
        "id": "turmeric",
        "name": {"mr": "हळद", "en": "Turmeric"},
        "botanicalName": "Curcuma longa",
        "category": "spices",
        "season": "kharif",
        "duration": {"mr": "८ ते ९ महिने (२४० - २७० दिवस)", "en": "8 to 9 Months (240 - 270 Days)"},
        "waterRequirement": {"mr": "१००० - १५०० मिमी", "en": "1000 - 1500 mm"},
        "soilType": {"mr": "भुसभुशीत, सेंद्रिय कर्बयुक्त, उत्तम निचऱ्याची गाळाची जमीन", "en": "Loose, organic-rich, well-aerated sandy loam"},
        "avgYield": {"mr": "२५ - ३० क्विंटल वाळलेली हळद प्रति एकर", "en": "25 - 30 Quintals dry turmeric per Acre"},
        "description": {
            "mr": "सांगली, हिंगोली, नांदेड आणि वसमत पट्ट्यात हळदीचे दर्जेदार उत्पादन घेतले जाते. सेलम आणि प्रगती या जाती प्रसिद्ध आहेत.",
            "en": "Leading spice crop cultivated mainly in Sangli, Hingoli, and Nanded. Salem and Pragati varieties provide high curcumin."
        },
        "profitEstimate": {"mr": "रु. १,२०,००० ते २,२०,००० प्रति एकर", "en": "₹1,20,000 to ₹2,20,000 per Acre"},
        "image": "/crops/turmeric.jpg",
        "badge": {"mr": "मसाला पीक", "en": "Spice Crop"}
    },
    {
        "id": "ginger",
        "name": {"mr": "आले (अद्रक)", "en": "Ginger"},
        "botanicalName": "Zingiber officinale",
        "category": "spices",
        "season": "kharif",
        "duration": {"mr": "८ ते १० महिने (२४० - ३०० दिवस)", "en": "8 to 10 Months (240 - 300 Days)"},
        "waterRequirement": {"mr": "१२०० - १६०० मिमी", "en": "1200 - 1600 mm"},
        "soilType": {"mr": "मध्यम काळी, सेंद्रिय खतांनी समृद्ध, उत्तम पाण्याचा निचरा", "en": "Medium black, organic loam with optimal drainage"},
        "avgYield": {"mr": "१०० - १५० क्विंटल ओले आले प्रति एकर", "en": "100 - 150 Quintals fresh ginger per Acre"},
        "description": {
            "mr": "छत्रपती संभाजीनगर, सातारा, सांगली या भागातील अत्यंत फायदेशीर पीक. माहिमा आणि रिओ-डि-जानेरो या प्रमुख जाती आहेत.",
            "en": "High-value spice crop grown widely in Satara, Sangli, and Chhatrapati Sambhajinagar with exceptional market value."
        },
        "profitEstimate": {"mr": "रु. १,५०,००० ते २,८०,००० प्रति एकर", "en": "₹1,50,000 to ₹2,80,000 per Acre"},
        "image": "/crops/ginger.jpg",
        "badge": {"mr": "मसाला पीक", "en": "High Value"}
    },
    {
        "id": "soybean",
        "name": {"mr": "सोयाबीन", "en": "Soybean"},
        "botanicalName": "Glycine max",
        "category": "cash",
        "season": "kharif",
        "duration": {"mr": "९० ते १०५ दिवस", "en": "90 to 105 Days"},
        "waterRequirement": {"mr": "४५० - ७०० मिमी", "en": "450 - 700 mm"},
        "soilType": {"mr": "मध्यम काळी, सामू ६.५ ते ७.५ असणारी जमीन", "en": "Medium black, neutral pH (6.5 - 7.5)"},
        "avgYield": {"mr": "१० - १४ क्विंटल प्रति एकर", "en": "10 - 14 Quintals per Acre"},
        "description": {
            "mr": "विदर्भ आणि मराठवाड्यातील मुख्य खरीप पीक. फुले संगम (KDS-726) आणि JS-335 सर्वाधिक लोकप्रिय.",
            "en": "Prime Kharif crop in Vidarbha and Marathwada. Rich in plant protein and oil; Phule Sangam is the top performing variety."
        },
        "profitEstimate": {"mr": "रु. २५,००० ते ५०,००० प्रति एकर", "en": "₹25,000 to ₹50,000 per Acre"},
        "image": "/crops/soybean.jpg",
        "badge": {"mr": "खरीप पीक", "en": "Kharif Crop"}
    },
    {
        "id": "chickpea",
        "name": {"mr": "हरभरा (चना)", "en": "Chickpea (Gram)"},
        "botanicalName": "Cicer arietinum",
        "category": "pulses",
        "season": "rabi",
        "duration": {"mr": "९० ते ११० दिवस", "en": "90 to 110 Days"},
        "waterRequirement": {"mr": "२५० - ३५० मिमी", "en": "250 - 350 mm"},
        "soilType": {"mr": "मध्यम ते भारी, ओल टिकवून ठेवणारी काळी जमीन", "en": "Medium to heavy black moisture-retentive soil"},
        "avgYield": {"mr": "८ - १२ क्विंटल प्रति एकर", "en": "8 - 12 Quintals per Acre"},
        "description": {
            "mr": "कमी पाण्यात आणि कमी खर्चात भरघोस उत्पादन देणारे प्रमुख रब्बी कडधान्य पीक. दिग्विजय आणि जाकी ९२१८ लोकप्रिय जाती.",
            "en": "Vital drought-tolerant Rabi pulse crop enriching soil nitrogen naturally. Digvijay and JAKI 9218 are top cultivars."
        },
        "profitEstimate": {"mr": "रु. २५,००० ते ४५,००० प्रति एकर", "en": "₹25,000 to ₹45,000 per Acre"},
        "image": "/crops/chana.jpg",
        "badge": {"mr": "कडधान्य", "en": "Pulse"}
    }
]

@router.get("/")
def get_crops(
    season: Optional[str] = Query(None, description="Filter by season: kharif, rabi, annual"),
    category: Optional[str] = Query(None, description="Filter by category: cash, spices, cereals, pulses"),
    search: Optional[str] = Query(None, description="Search by crop name in Marathi or English")
):
    results = CROPS_DATA
    if season and season != "all":
        results = [c for c in results if c.get("season") == season]
    if category and category != "all":
        results = [c for c in results if c.get("category") == category]
    if search:
        s = search.lower().strip()
        results = [
            c for c in results
            if s in c["name"]["en"].lower() or s in c["name"]["mr"] or s in c["botanicalName"].lower()
        ]
    return {"total": len(results), "crops": results}

@router.get("/{crop_id}")
def get_crop_by_id(crop_id: str):
    for crop in CROPS_DATA:
        if crop["id"] == crop_id.lower():
            return crop
    raise HTTPException(status_code=404, detail="Crop not found")
