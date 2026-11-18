from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class FarmerBase(BaseModel):
    phone: str = Field(..., example="9876543210")
    name: Optional[str] = Field(None, example="ज्ञानेश्वर पाटील")
    district: Optional[str] = Field("Pune", example="Pune")
    taluka: Optional[str] = Field(None, example="Baramati")
    village: Optional[str] = Field(None, example="Malegaon")
    land_size_acres: Optional[float] = Field(0.0, example=4.5)
    preferred_language: Optional[str] = Field("mr", example="mr")

class FarmerCreate(FarmerBase):
    pass

class FarmerUpdate(BaseModel):
    name: Optional[str] = None
    district: Optional[str] = None
    taluka: Optional[str] = None
    village: Optional[str] = None
    land_size_acres: Optional[float] = None
    preferred_language: Optional[str] = None

class FarmerResponse(FarmerBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
