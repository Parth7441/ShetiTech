from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InquiryCreate(BaseModel):
    farmer_name: str
    phone: str
    crop_name: str
    district: Optional[str] = "Pune"
    question: str

class InquiryResponse(BaseModel):
    id: int
    farmer_name: str
    phone: str
    crop_name: str
    district: Optional[str]
    question: str
    expert_answer: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
