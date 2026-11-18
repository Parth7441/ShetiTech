from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.core.config import settings
from app.models.mandi import MandiPrice
from app.schemas.mandi import MandiPriceResponse, MandiPriceCreate
from app.services.agmarknet_service import sync_agmarknet_prices

router = APIRouter(prefix="/mandi", tags=["Mandi Rates"])

@router.get("/sync/status")
def get_agmarknet_sync_status(db: Session = Depends(get_db)):
    """Check whether the government Data.gov.in Agmarknet API key is configured."""
    api_key = settings.DATA_GOV_IN_API_KEY.strip() if settings.DATA_GOV_IN_API_KEY else ""
    return {
        "api_key_configured": bool(api_key),
        "api_source": "Ministry of Agriculture - Agmarknet (data.gov.in)",
        "resource_id": settings.AGMARKNET_RESOURCE_ID,
        "total_records_in_db": db.query(MandiPrice).count(),
        "hint": "Set DATA_GOV_IN_API_KEY in d:\\ShetiTech\\Backend\\.env to enable live automatic sync." if not api_key else "Live API key is active."
    }

@router.post("/sync")
def trigger_agmarknet_sync(
    district: Optional[str] = Query(None, description="Optional district filter (e.g. Latur, Pune, Nashik)"),
    db: Session = Depends(get_db)
):
    """
    Fetch real-time daily mandi rates from Government of India (data.gov.in)
    and update the database.
    """
    return sync_agmarknet_prices(db, district=district)

@router.get("/", response_model=List[MandiPriceResponse])
def get_mandi_rates(
    district: Optional[str] = Query(None, description="Filter by district (e.g. Pune, Sangli, Nashik)"),
    search: Optional[str] = Query(None, description="Search crop name in Marathi or English"),
    db: Session = Depends(get_db)
):
    query = db.query(MandiPrice)
    if district and district.lower() != "all":
        query = query.filter(MandiPrice.district.ilike(f"%{district}%"))
    if search:
        s = f"%{search.strip()}%"
        query = query.filter(
            (MandiPrice.crop_name_en.ilike(s)) | (MandiPrice.crop_name_mr.ilike(s))
        )
    return query.order_by(MandiPrice.id.asc()).all()

@router.post("/", response_model=MandiPriceResponse)
def add_mandi_rate(item: MandiPriceCreate, db: Session = Depends(get_db)):
    mandi_entry = MandiPrice(**item.model_dump())
    db.add(mandi_entry)
    db.commit()
    db.refresh(mandi_entry)
    return mandi_entry
