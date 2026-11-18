from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MandiPriceBase(BaseModel):
    crop_name_mr: str
    crop_name_en: str
    market: str
    district: str
    min_price: float
    max_price: float
    modal_price: float
    unit: str = "रु./क्विंटल"
    trend: str = "up"

class MandiPriceCreate(MandiPriceBase):
    pass

class MandiPriceResponse(MandiPriceBase):
    id: int
    updated_date: datetime

    class Config:
        from_attributes = True
