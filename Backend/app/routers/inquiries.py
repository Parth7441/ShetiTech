from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.inquiry import CropInquiry
from app.schemas.inquiry import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/inquiries", tags=["Farmer Inquiries & Crop Doctor"])

def generate_instant_advisory(crop: str, question: str) -> str:
    """Generate instant research-backed ICAR / Maharashtra Agri University recommendation."""
    q = question.lower()
    c = crop.lower()

    if "सोयाबीन" in c or "soybean" in c:
        if "चक्री" in q or "खोड" in q or "girdle" in q or "stem" in q:
            return "सोयाबीनवरील चक्रीभुंगा व खोडमाशी नियंत्रणासाठी: क्लोरँट्रानिलीप्रोल (कोराजन) १८.५% SC - ३ मिली प्रति १० लिटर पाणी किंवा इमामेक्टिन बेन्झोएट ५% SG - ४ ग्रॅम फवारावे. प्रादुर्भावग्रस्त फांद्या नष्ट कराव्यात."
        elif "पिवळी" in q or "yellow" in q or "मोझॅक" in q:
            return "सोयाबीन पाने पिवळी पडत असल्यास: १) नत्र किंवा लोहाची कमतरता असल्यास चिलेटेड फेरस किंवा १९:१९:१९ विद्राव्य खत ५० ग्रॅम/१० लिटर फवारावे. २) पिवळा मोझॅक असल्यास पांढरी माशी नियंत्रणासाठी थायामेथोक्साम २५% WG ४ ग्रॅम फवारावे."
        else:
            return "सोयाबीन पिकासाठी: प्रादुर्भावाच्या सुरुवातीला ५% निंबोळी अर्क (५० मिली/१० लि) फवारावा. अधिक किडीसाठी लॅम्बडा सायहॅलोथ्रीन ५% EC - ६ मिली किंवा क्लोरँट्रानिलीप्रोल ३ मिली प्रति १० लिटर पाणी फवारावे."

    elif "हळद" in c or "turmeric" in c:
        if "कुज" in q or "rot" in q:
            return "हळदीतील कंदकुज नियंत्रणासाठी: कॉपर ऑक्सिक्लोराईड (३० ग्रॅम) + स्ट्रेप्टोसायक्लिन (२ ग्रॅम) प्रति १० लिटर पाण्यात मिसळून रोपांच्या बुंध्याभोवती आळवणी (Drenching) करावी. ट्रायकोडर्मा विरिडी सेंद्रिय खतातून द्यावे."
        elif "करपा" in q or "blotch" in q:
            return "हळदीवरील करपा रोगासाठी: मॅन्कोझेब ७५% WP (२५ ग्रॅम) किंवा अझॉक्सीस्ट्रॉबिन + डायफेनोकोनॅझोल (१० मिली) प्रति १० लिटर पाण्यात मिसळून १० दिवसांच्या अंतराने २ फवारण्या कराव्यात."
        else:
            return "हळद पिकासाठी: कंद पोसण्यासाठी ००:५२:३४ किंवा ००:००:५० हे विद्राव्य खत ठिबक किंवा फवारणीद्वारे (५ ग्रॅम/लि) द्यावे."

    elif "ऊस" in c or "sugarcane" in c:
        if "खोड" in q or "borer" in q:
            return "उसावरील खोडकीड नियंत्रणासाठी: कोरोजन (क्लोराँट्रानिलीप्रोल १८.५% SC) ०.४ मिली प्रति लिटर पाण्यात मिसळून ओळीत आळवणी करावी. ट्रायकोकार्ड्सचा वापर करावा."
        elif "पांढरी माशी" in q or "whitefly" in q or "पायरीला" in q:
            return "उसातील पांढरी माशी व पायरीलासाठी: थायामेथोक्साम २५% WG (४ ग्रॅम/१० लि) किंवा इमिडाक्लोप्रिड १७.८% SL (५ मिली/१० लि) फवारावे."
        else:
            return "ऊस पिकासाठी: उसाची कांडी भरताना युरिया व पोटॅशचा संतुलित डोस द्यावा व आंतरमशागत करून भर लावावी."

    elif "कांदा" in c or "onion" in c:
        if "थ्रिप्स" in q or "फुलकिडे" in q or "thrips" in q:
            return "कांद्यावरील फुलकिडे (थ्रिप्स) नियंत्रणासाठी: फिप्रोनिल ५% SC (२० मिली/१० लि) किंवा स्पिनोसॅड ४५% SC (३.५ मिली/१० लि) सोबत स्टिकर मिसळून फवारावे."
        elif "करपा" in q or "blotch" in q:
            return "कांद्यावरील जांभळा करपा रोगासाठी: प्रोपिकोनाझोल २५% EC (१० मिली) किंवा टेब्युकोनाझोल (१० मिली) प्रति १० लिटर पाणी फवारावे."
        else:
            return "कांदा पिकासाठी: गंधक (सल्फर) ३ किलो प्रति एकर खतासोबत दिल्यास कांद्याचा आकार व साठवणूक क्षमता वाढते."

    elif "आले" in c or "ginger" in c:
        return "आले (अद्रक) कंदकुज व कंदमाशीसाठी: ट्रायकोडर्मा विरिडीची आळवणी करावी. रासायनिक उपायासाठी मेटलॅक्सिल + मॅन्कोझेब (२५ ग्रॅम/१० लि) आळवणी करावी."

    elif "हरभरा" in c or "chickpea" in c or "chana" in c:
        return "हरभऱ्यावरील घाटे अळी नियंत्रणासाठी: सुरुवातीला कामगंध सापळे (हेक्टर ५) लावावेत. ५% निंबोळी अर्क फवारावा. जास्त प्रादुर्भाव असल्यास इमामेक्टिन बेन्झोएट ५% SG - ४ ग्रॅम प्रति १० लिटर पाणी फवारावे."

    return "आपल्या प्रश्नाची कृषी शिफारशीनुसार नोंद घेतली आहे: प्राथमिक उपचारासाठी ५% निंबोळी अर्क (५० मिली/१० लि) फवारावा आणि जमिनीचा योग्य निचरा ठेवावा. अतिरिक्त तांत्रिक सल्ला लवकरच अद्ययावत केला जाईल."

@router.post("/", response_model=InquiryResponse)
def submit_crop_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    """Farmer submits a crop pest/disease query and receives an immediate agricultural advisory."""
    advisory = generate_instant_advisory(data.crop_name, data.question)
    
    inquiry = CropInquiry(
        farmer_name=data.farmer_name,
        phone=data.phone,
        crop_name=data.crop_name,
        district=data.district or "Pune",
        question=data.question,
        expert_answer=advisory,
        status="answered"
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry

@router.get("/", response_model=List[InquiryResponse])
def get_inquiries(
    phone: Optional[str] = Query(None, description="Filter inquiries by farmer phone number"),
    crop: Optional[str] = Query(None, description="Filter by crop name"),
    db: Session = Depends(get_db)
):
    query = db.query(CropInquiry)
    if phone:
        query = query.filter(CropInquiry.phone == phone)
    if crop and crop.lower() != "all":
        query = query.filter(CropInquiry.crop_name.ilike(f"%{crop}%"))
    return query.order_by(CropInquiry.id.desc()).all()
