from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.core.database import Base

class CropInquiry(Base):
    __tablename__ = "crop_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    crop_name = Column(String(100), nullable=False)
    district = Column(String(50), nullable=True)
    question = Column(Text, nullable=False)
    expert_answer = Column(Text, nullable=True)
    status = Column(String(20), default="open") # 'open', 'answered', 'closed'
    created_at = Column(DateTime, default=datetime.utcnow)
