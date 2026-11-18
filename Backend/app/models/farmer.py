from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    phone = Column(String(15), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=True)
    district = Column(String(50), nullable=True, default="Pune")
    taluka = Column(String(50), nullable=True)
    village = Column(String(100), nullable=True)
    land_size_acres = Column(Float, nullable=True, default=0.0)
    preferred_language = Column(String(5), default="mr")
    created_at = Column(DateTime, default=datetime.utcnow)
