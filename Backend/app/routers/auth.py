from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import secrets

from app.core.database import get_db
from app.models.otp import OtpVerification
from app.models.farmer import Farmer
from app.schemas.auth import (
    SendOtpRequest,
    SendOtpResponse,
    VerifyOtpRequest,
    VerifyOtpResponse
)
from app.schemas.farmer import FarmerResponse
from app.services.sms_service import send_sms_otp

router = APIRouter(prefix="/auth", tags=["Farmer Authentication & SMS Gateway"])

@router.post("/send-otp", response_model=SendOtpResponse)
def send_otp(payload: SendOtpRequest, db: Session = Depends(get_db)):
    """
    Sends a 6-digit verification OTP to the farmer's mobile number via SMS Gateway.
    """
    phone = payload.phone

    # Rate limiting: Check if an OTP was sent in the last 45 seconds
    now = datetime.utcnow()
    recent_otp = (
        db.query(OtpVerification)
        .filter(OtpVerification.phone == phone)
        .order_by(OtpVerification.id.desc())
        .first()
    )

    if recent_otp and (now - recent_otp.created_at).total_seconds() < 45:
        # Re-use recent unexpired OTP if within 45 seconds to avoid spamming
        otp_code = recent_otp.otp_code
    else:
        # Generate new 6-digit cryptographically secure OTP
        otp_code = str(secrets.randbelow(900000) + 100000)
        
        # Save record with 5-minute expiry
        verification_record = OtpVerification(
            phone=phone,
            otp_code=otp_code,
            attempts=0,
            is_verified=False,
            expires_at=now + timedelta(minutes=5)
        )
        db.add(verification_record)
        db.commit()

    # Dispatch via SMS Gateway (Fast2SMS / Twilio)
    sms_result = send_sms_otp(phone, otp_code)

    if not sms_result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=sms_result.get("message", "Failed to dispatch SMS via Gateway")
        )

    return SendOtpResponse(
        status="success",
        message=f"OTP sent successfully to +91 {phone}",
        phone=phone,
        expires_in_seconds=300
    )

@router.post("/verify-otp", response_model=VerifyOtpResponse)
def verify_otp(payload: VerifyOtpRequest, db: Session = Depends(get_db)):
    """
    Verifies the 6-digit OTP code entered by the farmer.
    """
    phone = payload.phone
    entered_otp = payload.otp
    now = datetime.utcnow()

    # Allow master test OTP '123456' for instant demo testing
    is_master_demo_otp = (entered_otp == "123456")

    # Fetch latest OTP verification record for this phone
    record = (
        db.query(OtpVerification)
        .filter(OtpVerification.phone == phone)
        .order_by(OtpVerification.id.desc())
        .first()
    )

    if not record and not is_master_demo_otp:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No OTP was requested for this phone number. Please click 'Send OTP'."
        )

    if record:
        if record.attempts >= 5:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Maximum verification attempts exceeded. Please request a new OTP."
            )

        if record.expires_at < now and not is_master_demo_otp:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="OTP has expired. Please request a fresh OTP."
            )

        # Check match
        if record.otp_code != entered_otp and not is_master_demo_otp:
            record.attempts += 1
            db.commit()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid OTP code. Please check the SMS and re-enter."
            )

        # Mark verified
        record.is_verified = True
        db.commit()

    # Check if this farmer already has a profile registered
    farmer = db.query(Farmer).filter(Farmer.phone == phone).first()

    return VerifyOtpResponse(
        status="success",
        verified=True,
        message="Phone number successfully verified.",
        is_new_user=(farmer is None),
        farmer=FarmerResponse.model_validate(farmer) if farmer else None
    )
