from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HarvesterBase(BaseModel):
    owner_name: str
    phone: str
    machine_type: str
    capacity: Optional[str] = None
    rate_per_hour: float
    district: str
    taluka: Optional[str] = None
    is_available: bool = True

class HarvesterCreate(HarvesterBase):
    pass

class HarvesterResponse(HarvesterBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class HarvesterBookingCreate(BaseModel):
    harvester_id: int
    farmer_name: str
    phone: str
    village: str
    acres: float
    requested_date: str
    notes: Optional[str] = None

class HarvesterBookingResponse(BaseModel):
    id: int
    harvester_id: int
    farmer_name: str
    phone: str
    village: str
    acres: float
    requested_date: str
    status: str
    notes: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True
