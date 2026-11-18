from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.database import Base

class Harvester(Base):
    __tablename__ = "harvesters"

    id = Column(Integer, primary_key=True, index=True)
    owner_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    machine_type = Column(String(100), nullable=False) # e.g. 'ऊस तोडणी यंत्र (Sugarcane Harvester)'
    capacity = Column(String(100), nullable=True) # e.g. '३५-४० टन प्रतिदिन'
    rate_per_hour = Column(Float, nullable=False) # In Rupees
    district = Column(String(50), nullable=False, index=True)
    taluka = Column(String(50), nullable=True)
    is_available = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    bookings = relationship("HarvesterBooking", back_populates="harvester")


class HarvesterBooking(Base):
    __tablename__ = "harvester_bookings"

    id = Column(Integer, primary_key=True, index=True)
    harvester_id = Column(Integer, ForeignKey("harvesters.id"), nullable=False)
    farmer_name = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)
    village = Column(String(100), nullable=False)
    acres = Column(Float, nullable=False)
    requested_date = Column(String(50), nullable=False)
    status = Column(String(20), default="pending") # 'pending', 'confirmed', 'completed'
    notes = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    harvester = relationship("Harvester", back_populates="bookings")
