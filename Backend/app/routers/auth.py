from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import secrets
import hashlib

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

router = APIRouter(prefix="/auth", tags=["Farmer Authentication & OTP Verification"])

def hash_otp(otp_code: str) -> str:
    """Generate SHA-256 cryptographic hash of the 6-digit OTP."""
    return hashlib.sha256(otp_code.encode("utf-8")).hexdigest()

@router.post("/send-otp", response_model=SendOtpResponse)
def send_otp(payload: SendOtpRequest, db: Session = Depends(get_db)):
    """
    Validates mobile number, enforces 60-second cooldown, generates a secure 6-digit OTP,
    hashes the OTP before storing in database, and dispatches via configured SMS provider.
    """
    phone = payload.phone
    now = datetime.utcnow()

    # Check 60-second resend cooldown
    recent_record = (
        db.query(OtpVerification)
        .filter(OtpVerification.phone == phone)
        .order_by(OtpVerification.id.desc())
        .first()
    )

    if recent_record:
        elapsed = (now - recent_record.created_at).total_seconds()
        if elapsed < 60:
            remaining = int(60 - elapsed)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Please wait {remaining} seconds before requesting a new OTP."
            )

    # Generate cryptographically secure 6-digit random OTP
    otp_code = str(secrets.randbelow(900000) + 100000)
    otp_hashed = hash_otp(otp_code)

    # Store hashed OTP in database with 5-minute expiry and attempt tracking
    verification_record = OtpVerification(
        phone=phone,
        otp_hash=otp_hashed,
        attempts=0,
        is_verified=False,
        expires_at=now + timedelta(minutes=5),
        created_at=now
    )
    db.add(verification_record)
    db.commit()

    # Dispatch via SMS Provider (Fast2SMS / Twilio)
    sms_result = send_sms_otp(phone, otp_code)

    if not sms_result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=sms_result.get("message", "Failed to dispatch SMS via gateway")
        )

    return SendOtpResponse(
        status="success",
        message=f"OTP successfully sent to +91 {phone}",
        phone=phone,
        expires_in_seconds=300,
        resend_cooldown_seconds=60
    )

@router.post("/resend-otp", response_model=SendOtpResponse)
def resend_otp(payload: SendOtpRequest, db: Session = Depends(get_db)):
    """Explicit resend endpoint that delegates to send_otp with cooldown enforcement."""
    return send_otp(payload, db)

@router.post("/verify-otp", response_model=VerifyOtpResponse)
def verify_otp(payload: VerifyOtpRequest, db: Session = Depends(get_db)):
    """
    Verifies 6-digit OTP against stored SHA-256 hash.
    Enforces expiration (5 mins), attempt restrictions (max 3), and reuse prevention.
    Completes user authentication session upon successful verification.
    """
    phone = payload.phone
    entered_otp = payload.otp
    now = datetime.utcnow()

    # Fetch latest OTP verification record for this phone number
    record = (
        db.query(OtpVerification)
        .filter(OtpVerification.phone == phone)
        .order_by(OtpVerification.id.desc())
        .first()
    )

    if not record:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No OTP was requested for this phone number. Please click 'Send OTP'."
        )

    # 1. Reuse Prevention: Check if already verified
    if record.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This OTP has already been verified and cannot be reused. Please request a new OTP."
        )

    # 2. Maximum Attempts Restriction (Max 3 incorrect attempts)
    if record.attempts >= 3:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Maximum verification attempts exceeded. Please request a fresh OTP."
        )

    # 3. Expiration Check (5 minutes validity)
    if record.expires_at < now:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="OTP has expired. Please request a fresh OTP."
        )

    # 4. Cryptographic Hash Verification
    entered_hash = hash_otp(entered_otp)
    if entered_hash != record.otp_hash:
        record.attempts += 1
        db.commit()
        remaining = 3 - record.attempts
        if remaining <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid OTP. Maximum attempts exceeded. Please request a new OTP."
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid OTP code. {remaining} attempt(s) remaining."
        )

    # 5. Mark as verified immediately to prevent any reuse
    record.is_verified = True
    db.commit()

    # 6. Complete Authentication: Retrieve existing farmer profile or flag as new user
    farmer = db.query(Farmer).filter(Farmer.phone == phone).first()
    session_token = secrets.token_urlsafe(32)

    return VerifyOtpResponse(
        status="success",
        verified=True,
        message="Phone number successfully verified.",
        is_new_user=(farmer is None),
        farmer=FarmerResponse.model_validate(farmer) if farmer else None,
        access_token=session_token,
        token_type="bearer"
    )
