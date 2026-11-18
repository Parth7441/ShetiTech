from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.core.database import Base

class MandiPrice(Base):
    __tablename__ = "mandi_prices"

    id = Column(Integer, primary_key=True, index=True)
    crop_name_mr = Column(String(100), nullable=False)
    crop_name_en = Column(String(100), nullable=False, index=True)
    market = Column(String(100), nullable=False, index=True)
    district = Column(String(100), nullable=False, index=True)
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    modal_price = Column(Float, nullable=False)
    unit = Column(String(20), default="रु./क्विंटल")
    trend = Column(String(10), default="up") # 'up', 'down', 'stable'
    updated_date = Column(DateTime, default=datetime.utcnow)
