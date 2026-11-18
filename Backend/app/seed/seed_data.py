from sqlalchemy.orm import Session
from app.models.mandi import MandiPrice
from app.models.harvester import Harvester

def seed_initial_data(db: Session):
    # Seed Mandi Prices if table is empty
    if db.query(MandiPrice).count() == 0:
        sample_mandi = [
            {
                "crop_name_mr": "कांदा (लाल)",
                "crop_name_en": "Onion (Red)",
                "market": "लासलगाव (Lasalgaon)",
                "district": "Nashik",
                "min_price": 1400.0,
                "max_price": 2850.0,
                "modal_price": 2450.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "सोयाबीन (पिवळा - लातूर मुख्य)",
                "crop_name_en": "Soybean (Latur Main)",
                "market": "लातूर मुख्य (Latur Main APMC)",
                "district": "Latur",
                "min_price": 7382.0,
                "max_price": 7690.0,
                "modal_price": 7580.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "सोयाबीन (अहमदपूर)",
                "crop_name_en": "Soybean (Ahmedpur)",
                "market": "अहमदपूर (Ahmedpur APMC)",
                "district": "Latur",
                "min_price": 6600.0,
                "max_price": 7608.0,
                "modal_price": 7481.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "सोयाबीन (लातूर - मुरुड)",
                "crop_name_en": "Soybean (Murud)",
                "market": "लातूर - मुरुड (Murud Sub-market)",
                "district": "Latur",
                "min_price": 7450.0,
                "max_price": 7500.0,
                "modal_price": 7480.0,
                "unit": "रु./क्विंटल",
                "trend": "stable"
            },
            {
                "crop_name_mr": "सोयाबीन (उदगीर)",
                "crop_name_en": "Soybean (Udgir)",
                "market": "उदगीर (Udgir APMC)",
                "district": "Latur",
                "min_price": 7411.0,
                "max_price": 7470.0,
                "modal_price": 7440.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "सोयाबीन (चाकूर)",
                "crop_name_en": "Soybean (Chakur)",
                "market": "चाकूर (Chakur APMC)",
                "district": "Latur",
                "min_price": 7101.0,
                "max_price": 7430.0,
                "modal_price": 7324.0,
                "unit": "रु./क्विंटल",
                "trend": "stable"
            },
            {
                "crop_name_mr": "हळद (राजापुरी)",
                "crop_name_en": "Turmeric (Rajapuri)",
                "market": "सांगली (Sangli)",
                "district": "Sangli",
                "min_price": 12500.0,
                "max_price": 18200.0,
                "modal_price": 15800.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "हरभरा (चना)",
                "crop_name_en": "Chickpea (Chana)",
                "market": "अकोला (Akola)",
                "district": "Akola",
                "min_price": 5400.0,
                "max_price": 6150.0,
                "modal_price": 5850.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "गहू (शरबती)",
                "crop_name_en": "Wheat (Sharbati)",
                "market": "पुणे (Pune)",
                "district": "Pune",
                "min_price": 2700.0,
                "max_price": 3400.0,
                "modal_price": 3150.0,
                "unit": "रु./क्विंटल",
                "trend": "stable"
            },
            {
                "crop_name_mr": "आले (ओले आले)",
                "crop_name_en": "Ginger (Fresh)",
                "market": "सातारा (Satara)",
                "district": "Satara",
                "min_price": 4500.0,
                "max_price": 7200.0,
                "modal_price": 6100.0,
                "unit": "रु./क्विंटल",
                "trend": "up"
            },
            {
                "crop_name_mr": "मका (पिवळी)",
                "crop_name_en": "Maize (Yellow)",
                "market": "छत्रपती संभाजीनगर",
                "district": "Chhatrapati Sambhajinagar",
                "min_price": 1950.0,
                "max_price": 2320.0,
                "modal_price": 2180.0,
                "unit": "रु./क्विंटल",
                "trend": "down"
            }
        ]
        for item in sample_mandi:
            db.add(MandiPrice(**item))
        db.commit()

    # Seed Harvesters if table is empty
    if db.query(Harvester).count() == 0:
        sample_harvesters = [
            {
                "owner_name": "सचिन शेळके (कृषी सेवा)",
                "phone": "9822334455",
                "machine_type": "ऊस तोडणी व तुकडे यंत्र (New Holland Sugarcane Harvester)",
                "capacity": "४०-५० टन प्रतिदिन",
                "rate_per_hour": 3200.0,
                "district": "Pune",
                "taluka": "Baramati",
                "is_available": True
            },
            {
                "owner_name": "बाळासाहेब जाधव",
                "phone": "9422001122",
                "machine_type": "मल्टीक्रॉप कम्बाईन हार्वेस्टर (सोयाबीन, गहू, हरभरा)",
                "capacity": "२ ते ३ एकर प्रति तास",
                "rate_per_hour": 2400.0,
                "district": "Latur",
                "taluka": "Ausa",
                "is_available": True
            },
            {
                "owner_name": "रमेश थोरात ऍग्रो",
                "phone": "9881776655",
                "machine_type": "हळद काढणी यंत्र (Turmeric Digger / Harvester)",
                "capacity": "१.५ एकर प्रतिदिन",
                "rate_per_hour": 1800.0,
                "district": "Sangli",
                "taluka": "Walwa",
                "is_available": True
            }
        ]
        for item in sample_harvesters:
            db.add(Harvester(**item))
        db.commit()
