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
        if clean[0] not in "6789":
            raise ValueError("Phone number must start with 6, 7, 8, or 9")
        return clean

class SendOtpResponse(BaseModel):
    status: str
    message: str
    phone: str
    expires_in_seconds: int = 300
    resend_cooldown_seconds: int = 60

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
        if len(clean) != 6:
            raise ValueError("OTP must be exactly 6 digits")
        return clean

class VerifyOtpResponse(BaseModel):
    status: str
    verified: bool
    message: str
    is_new_user: bool
    farmer: Optional[FarmerResponse] = None
    access_token: Optional[str] = None
    token_type: Optional[str] = "bearer"
