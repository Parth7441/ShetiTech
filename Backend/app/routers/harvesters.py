from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.models.harvester import Harvester, HarvesterBooking
from app.schemas.harvester import (
    HarvesterResponse,
    HarvesterCreate,
    HarvesterBookingCreate,
    HarvesterBookingResponse
)

router = APIRouter(prefix="/harvesters", tags=["Harvesters"])

@router.get("/", response_model=List[HarvesterResponse])
def get_harvesters(
    district: Optional[str] = Query(None, description="Filter by district"),
    available_only: bool = Query(True, description="Filter only currently available machines"),
    db: Session = Depends(get_db)
):
    query = db.query(Harvester)
    if district and district.lower() != "all":
        query = query.filter(Harvester.district.ilike(f"%{district}%"))
    if available_only:
        query = query.filter(Harvester.is_available == True)
    return query.order_by(Harvester.id.asc()).all()

@router.post("/", response_model=HarvesterResponse)
def register_harvester(item: HarvesterCreate, db: Session = Depends(get_db)):
    harvester = Harvester(**item.model_dump())
    db.add(harvester)
    db.commit()
    db.refresh(harvester)
    return harvester

@router.post("/book", response_model=HarvesterBookingResponse)
def book_harvester(booking: HarvesterBookingCreate, db: Session = Depends(get_db)):
    harvester = db.query(Harvester).filter(Harvester.id == booking.harvester_id).first()
    if not harvester:
        raise HTTPException(status_code=404, detail="Harvester machine not found")
    
    new_booking = HarvesterBooking(
        harvester_id=booking.harvester_id,
        farmer_name=booking.farmer_name,
        phone=booking.phone,
        village=booking.village,
        acres=booking.acres,
        requested_date=booking.requested_date,
        notes=booking.notes,
        status="pending"
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("/bookings", response_model=List[HarvesterBookingResponse])
def list_bookings(db: Session = Depends(get_db)):
    return db.query(HarvesterBooking).order_by(HarvesterBooking.id.desc()).all()
