import sys
import os
from datetime import datetime, timedelta
import hashlib

# Ensure Backend is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.core.database import SessionLocal, engine, Base
from app.models.otp import OtpVerification
from app.models.farmer import Farmer
from app.routers.auth import send_otp, verify_otp, hash_otp, resend_otp
from app.schemas.auth import SendOtpRequest, VerifyOtpRequest
from fastapi import HTTPException
import app.routers.auth as auth_router

def run_all_tests():
    # Mock SMS dispatcher for deterministic unit testing without eating API credits
    auth_router.send_sms_otp = lambda phone, code: {"provider": "mock", "success": True, "message": "SMS dispatched"}

    db = SessionLocal()
    print("=" * 70)
    print("RUNNING BACKEND OTP AUTHENTICATION TEST SUITE")
    print("=" * 70)

    test_phone = "9822012345"

    # Clean existing test data
    db.query(OtpVerification).filter(OtpVerification.phone == test_phone).delete()
    db.query(Farmer).filter(Farmer.phone == test_phone).delete()
    db.commit()

    # -------------------------------------------------------------
    # TEST 1: OTP Generation & Hashing (5-min expiry)
    # -------------------------------------------------------------
    print("\n[TEST 1] Sending OTP for phone", test_phone)
    send_res = send_otp(SendOtpRequest(phone=test_phone), db)
    assert send_res.status == "success"
    assert send_res.phone == test_phone
    assert send_res.expires_in_seconds == 300
    assert not hasattr(send_res, "debug_otp") or send_res.debug_otp is None, "OTP must not be leaked in response"

    # Verify database record
    record = db.query(OtpVerification).filter(OtpVerification.phone == test_phone).order_by(OtpVerification.id.desc()).first()
    assert record is not None
    assert len(record.otp_hash) == 64, "OTP must be stored as SHA-256 hash"
    assert record.is_verified == False
    assert record.attempts == 0
    assert record.expires_at > datetime.utcnow()
    print("✓ Test 1 Passed: Secure 6-digit OTP generated, hashed with SHA-256 and stored with 5-min expiry.")

    # -------------------------------------------------------------
    # TEST 2: Resend Cooldown (Enforce 60s cooldown)
    # -------------------------------------------------------------
    print("\n[TEST 2] Testing Resend Cooldown within 60 seconds...")
    try:
        send_otp(SendOtpRequest(phone=test_phone), db)
        assert False, "Should have raised 429 Too Many Requests within 60s"
    except HTTPException as e:
        assert e.status_code == 429
        print(f"✓ Test 2 Passed: Resend cooldown enforced: {e.detail}")

    # -------------------------------------------------------------
    # TEST 3: Incorrect OTP Verification & Attempt Tracking
    # -------------------------------------------------------------
    print("\n[TEST 3] Testing Incorrect OTP verification...")
    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp="000000"), db)
        assert False, "Should have rejected invalid OTP"
    except HTTPException as e:
        assert e.status_code == 400
        assert "Invalid OTP code" in e.detail or "remaining" in e.detail
        print(f"✓ Test 3 Passed: Invalid OTP rejected properly ({e.detail})")

    # Verify attempt count incremented
    record = db.query(OtpVerification).filter(OtpVerification.phone == test_phone).order_by(OtpVerification.id.desc()).first()
    assert record.attempts == 1

    # -------------------------------------------------------------
    # TEST 4: Maximum Attempt Restrictions (Block after 3 attempts)
    # -------------------------------------------------------------
    print("\n[TEST 4] Testing Maximum Attempts restriction (Exceeding 3 attempts)...")
    # 2nd failed attempt
    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp="111111"), db)
    except HTTPException:
        pass
    # 3rd failed attempt
    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp="222222"), db)
    except HTTPException:
        pass

    record = db.query(OtpVerification).filter(OtpVerification.phone == test_phone).order_by(OtpVerification.id.desc()).first()
    assert record.attempts >= 3

    # 4th attempt must be rejected due to attempt limit exceeded
    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp="333333"), db)
        assert False, "Should have rejected due to max attempts exceeded"
    except HTTPException as e:
        assert e.status_code == 400
        assert "Maximum" in e.detail
        print(f"✓ Test 4 Passed: Maximum attempt restriction enforced: {e.detail}")

    # -------------------------------------------------------------
    # TEST 5: Expired OTP Rejection
    # -------------------------------------------------------------
    print("\n[TEST 5] Testing Expired OTP rejection...")
    # Inject an expired record
    expired_code = "777888"
    expired_hash = hash_otp(expired_code)
    expired_record = OtpVerification(
        phone=test_phone,
        otp_hash=expired_hash,
        attempts=0,
        is_verified=False,
        expires_at=datetime.utcnow() - timedelta(minutes=1), # Expired 1 min ago
        created_at=datetime.utcnow() - timedelta(minutes=6)
    )
    db.add(expired_record)
    db.commit()

    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp=expired_code), db)
        assert False, "Should have rejected expired OTP"
    except HTTPException as e:
        assert e.status_code == 400
        assert "expired" in e.detail.lower()
        print(f"✓ Test 5 Passed: Expired OTP rejected: {e.detail}")

    # -------------------------------------------------------------
    # TEST 6: Correct OTP Verification & Authentication
    # -------------------------------------------------------------
    print("\n[TEST 6] Testing Correct OTP Verification & Authentication...")
    valid_code = "543210"
    valid_hash = hash_otp(valid_code)
    active_record = OtpVerification(
        phone=test_phone,
        otp_hash=valid_hash,
        attempts=0,
        is_verified=False,
        expires_at=datetime.utcnow() + timedelta(minutes=5),
        created_at=datetime.utcnow()
    )
    db.add(active_record)
    db.commit()

    # Pre-register a farmer to verify authentication lookup
    existing_farmer = Farmer(
        phone=test_phone,
        name="रमेश जाधव (Ramesh Jadhav)",
        district="Pune",
        taluka="Haveli",
        village="Wagholi",
        land_size_acres=5.0,
        preferred_language="mr"
    )
    db.add(existing_farmer)
    db.commit()

    v_res = verify_otp(VerifyOtpRequest(phone=test_phone, otp=valid_code), db)
    assert v_res.status == "success"
    assert v_res.verified == True
    assert v_res.is_new_user == False
    assert v_res.farmer is not None
    assert v_res.farmer.name == "रमेश जाधव (Ramesh Jadhav)"
    assert v_res.access_token is not None
    print(f"✓ Test 6 Passed: Correct OTP verified, farmer authenticated, token issued: {v_res.access_token[:10]}...")

    # -------------------------------------------------------------
    # TEST 7: OTP Reuse Prevention
    # -------------------------------------------------------------
    print("\n[TEST 7] Testing OTP Reuse Prevention (trying same code again)...")
    try:
        verify_otp(VerifyOtpRequest(phone=test_phone, otp=valid_code), db)
        assert False, "Should have rejected reused OTP"
    except HTTPException as e:
        assert e.status_code == 400
        assert "already been verified" in e.detail or "reused" in e.detail
        print(f"✓ Test 7 Passed: OTP reuse prevented: {e.detail}")

    # -------------------------------------------------------------
    # TEST 8: New Farmer Detection on Verify
    # -------------------------------------------------------------
    print("\n[TEST 8] Testing New Farmer Detection on OTP verification...")
    new_phone = "9765432100"
    db.query(OtpVerification).filter(OtpVerification.phone == new_phone).delete()
    db.query(Farmer).filter(Farmer.phone == new_phone).delete()
    db.commit()

    new_code = "654321"
    new_record = OtpVerification(
        phone=new_phone,
        otp_hash=hash_otp(new_code),
        attempts=0,
        is_verified=False,
        expires_at=datetime.utcnow() + timedelta(minutes=5),
        created_at=datetime.utcnow()
    )
    db.add(new_record)
    db.commit()

    new_v_res = verify_otp(VerifyOtpRequest(phone=new_phone, otp=new_code), db)
    assert new_v_res.verified == True
    assert new_v_res.is_new_user == True
    assert new_v_res.farmer is None
    print("✓ Test 8 Passed: New farmer recognized correctly, prompting for profile setup.")

    print("\n" + "=" * 70)
    print("ALL 8 BACKEND OTP AUTHENTICATION TESTS PASSED SUCCESSFULLY! ✓")
    print("=" * 70)

if __name__ == "__main__":
    run_all_tests()
