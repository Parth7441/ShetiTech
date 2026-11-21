from pydantic import BaseModel, field_validator
from typing import Optional
from app.schemas.farmer import FarmerResponse

class SendOtpRequest(BaseModel):
    phone: str

    @field_validator("phone")
    def validate_phone(cls, v: str) -> str:
        clean = "".join(filter(str.isdigit, v))
        if len(clean) > 10:
            clean = clean[-10:]
        if len(clean) != 10:
            raise ValueError("Phone number must be a valid 10-digit mobile number")
        return clean

class SendOtpResponse(BaseModel):
    status: str
    message: str
    phone: str
    expires_in_seconds: int = 300
    debug_otp: Optional[str] = None

class VerifyOtpRequest(BaseModel):
    phone: str
    otp: str

    @field_validator("phone")
    def validate_phone(cls, v: str) -> str:
        clean = "".join(filter(str.isdigit, v))
        if len(clean) > 10:
            clean = clean[-10:]
        if len(clean) != 10:
            raise ValueError("Phone number must be a valid 10-digit mobile number")
        return clean

    @field_validator("otp")
    def validate_otp(cls, v: str) -> str:
        clean = "".join(filter(str.isdigit, v))
        if len(clean) < 4:
            raise ValueError("OTP must be 4 to 6 digits")
        return clean

class VerifyOtpResponse(BaseModel):
    status: str
    verified: bool
    message: str
    is_new_user: bool
    farmer: Optional[FarmerResponse] = None
