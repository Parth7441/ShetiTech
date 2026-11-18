from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.farmer import Farmer
from app.schemas.farmer import FarmerCreate, FarmerUpdate, FarmerResponse

router = APIRouter(prefix="/farmers", tags=["Farmers / Auth Link"])

@router.post("/sync", response_model=FarmerResponse)
def sync_farmer_profile(data: FarmerCreate, db: Session = Depends(get_db)):
    """
    Called after Firebase OTP verification to fetch or auto-create the farmer record.
    """
    farmer = db.query(Farmer).filter(Farmer.phone == data.phone).first()
    if not farmer:
        farmer = Farmer(**data.model_dump())
        db.add(farmer)
        db.commit()
        db.refresh(farmer)
    return farmer

@router.get("/{phone}", response_model=FarmerResponse)
def get_farmer_by_phone(phone: str, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.phone == phone).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not registered")
    return farmer

@router.put("/{phone}", response_model=FarmerResponse)
def update_farmer_profile(phone: str, update: FarmerUpdate, db: Session = Depends(get_db)):
    farmer = db.query(Farmer).filter(Farmer.phone == phone).first()
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer not found")
    
    for key, value in update.model_dump(exclude_unset=True).items():
        setattr(farmer, key, value)
        
    db.commit()
    db.refresh(farmer)
    return farmer

@router.get("/", response_model=List[FarmerResponse])
def list_farmers(db: Session = Depends(get_db)):
    return db.query(Farmer).order_by(Farmer.id.desc()).all()
