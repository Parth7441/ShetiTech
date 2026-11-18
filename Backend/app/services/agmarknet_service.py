import requests
from typing import Dict, Any, Optional
from sqlalchemy.orm import Session
from datetime import datetime

from app.core.config import settings
from app.models.mandi import MandiPrice

COMMODITY_TRANSLATIONS = {
    "soyabean": "सोयाबीन",
    "soybean": "सोयाबीन",
    "onion": "कांदा",
    "turmeric": "हळद",
    "wheat": "गहू",
    "gram": "हरभरा (चना)",
    "bengal gram(gram)(whole)": "हरभरा (चना)",
    "chickpea": "हरभरा (चना)",
    "maize": "मका",
    "cotton": "कापूस",
    "sugarcane": "ऊस",
    "ginger": "आले (अद्रक)",
    "ginger(green)": "आले (ताजे अद्रक)",
    "arhar (tur/red gram)(whole)": "तूर",
    "tur": "तूर",
    "urad": "उडीद",
    "moong": "मूग",
    "paddy(dhan)(common)": "भात (धान)",
    "tomato": "टोमॅटो",
    "potato": "बटाटा",
    "garlic": "लसूण",
    "chilli red": "सुकी लाल मिरची",
    "green chilli": "हिरवी मिरची"
}

def translate_commodity(commodity_en: str) -> str:
    cleaned = commodity_en.lower().strip()
    return COMMODITY_TRANSLATIONS.get(cleaned, commodity_en)

def sync_agmarknet_prices(db: Session, district: Optional[str] = None) -> Dict[str, Any]:
    """
    Connects to Government of India (data.gov.in) official Agmarknet API
    and updates the database with live APMC mandi prices for Maharashtra.
    """
    api_key = settings.DATA_GOV_IN_API_KEY.strip() if settings.DATA_GOV_IN_API_KEY else ""

    if not api_key:
        return {
            "status": "waiting_for_api_key",
            "api_key_configured": False,
            "records_synced": 0,
            "message": (
                "DATA_GOV_IN_API_KEY is not configured yet. "
                "Get your free official API key from https://data.gov.in "
                "and paste it into d:\\ShetiTech\\Backend\\.env"
            ),
            "instructions": [
                "1. Register free at https://data.gov.in",
                "2. Go to 'My Account' -> 'API Key'",
                "3. Copy key and set DATA_GOV_IN_API_KEY=<your_key> in .env",
                "4. Call POST /api/v1/mandi/sync to fetch live rates anytime"
            ]
        }

    # API Endpoint for Agmarknet Real-time Daily Prices
    url = f"https://api.data.gov.in/resource/{settings.AGMARKNET_RESOURCE_ID}"
    params = {
        "api-key": api_key,
        "format": "json",
        "limit": 150,
        "filters[state]": "Maharashtra"
    }
    if district and district.lower() != "all":
        params["filters[district]"] = district.capitalize()

    try:
        response = requests.get(url, params=params, timeout=12)
        if response.status_code != 200:
            return {
                "status": "api_error",
                "api_key_configured": True,
                "status_code": response.status_code,
                "message": f"Agmarknet API responded with status {response.status_code}: {response.text[:200]}"
            }

        data = response.json()
        records = data.get("records", [])

        if not records:
            return {
                "status": "empty",
                "api_key_configured": True,
                "records_synced": 0,
                "message": "No new records returned by Agmarknet for today yet (mandis typically upload after 12:00 PM)."
            }

        synced_count = 0
        for rec in records:
            market = rec.get("market") or rec.get("Market", "APMC")
            dist = rec.get("district") or rec.get("District", "Maharashtra")
            commodity = rec.get("commodity") or rec.get("Commodity", "")
            
            try:
                min_p = float(rec.get("min_price") or rec.get("Min_Price", 0))
                max_p = float(rec.get("max_price") or rec.get("Max_Price", 0))
                modal_p = float(rec.get("modal_price") or rec.get("Modal_Price", 0))
            except (ValueError, TypeError):
                continue

            if modal_p <= 0:
                continue

            commodity_mr = translate_commodity(commodity)

            # Check if this market + commodity entry already exists
            existing = db.query(MandiPrice).filter(
                MandiPrice.market.ilike(market),
                MandiPrice.crop_name_en.ilike(commodity)
            ).first()

            if existing:
                existing.min_price = min_p
                existing.max_price = max_p
                existing.modal_price = modal_p
                existing.updated_date = datetime.utcnow()
            else:
                new_entry = MandiPrice(
                    crop_name_mr=commodity_mr,
                    crop_name_en=commodity,
                    market=market,
                    district=dist,
                    min_price=min_p,
                    max_price=max_p,
                    modal_price=modal_p,
                    unit="रु./क्विंटल",
                    trend="up",
                    updated_date=datetime.utcnow()
                )
                db.add(new_entry)

            synced_count += 1

        db.commit()

        return {
            "status": "success",
            "api_key_configured": True,
            "records_synced": synced_count,
            "message": f"Successfully updated {synced_count} live APMC mandi prices from Agmarknet!"
        }

    except requests.RequestException as e:
        return {
            "status": "network_error",
            "api_key_configured": True,
            "message": f"Connection error reaching data.gov.in: {str(e)}"
        }
