from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.models.inquiry import CropInquiry
from app.schemas.inquiry import InquiryCreate, InquiryResponse

router = APIRouter(prefix="/inquiries", tags=["Farmer Inquiries"])

@router.post("/", response_model=InquiryResponse)
def submit_crop_inquiry(data: InquiryCreate, db: Session = Depends(get_db)):
    inquiry = CropInquiry(**data.model_dump())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry

@router.get("/", response_model=List[InquiryResponse])
def get_inquiries(db: Session = Depends(get_db)):
    return db.query(CropInquiry).order_by(CropInquiry.id.desc()).all()
