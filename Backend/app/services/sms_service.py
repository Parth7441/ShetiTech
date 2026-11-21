import logging
import requests
from app.core.config import settings

logger = logging.getLogger(__name__)

def send_sms_otp(phone: str, otp_code: str) -> dict:
    """
    Sends a 6-digit verification OTP to the farmer's mobile number.
    Supports:
    1. Fast2SMS (Indian OTP route)
    2. Twilio (International / Indian SMS)
    3. Simulation / Development mode (Logged to console when no API key configured)
    """
    clean_phone = "".join(filter(str.isdigit, phone))
    if len(clean_phone) > 10:
        clean_phone = clean_phone[-10:]

    # 1. Fast2SMS Integration (Fastest & most popular for India)
    if settings.FAST2SMS_API_KEY:
        try:
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {
                "authorization": settings.FAST2SMS_API_KEY,
                "Content-Type": "application/json"
            }
            payload = {
                "route": "otp",
                "variables_values": otp_code,
                "numbers": clean_phone
            }
            response = requests.post(url, json=payload, headers=headers, timeout=10)
            res_data = response.json()
            if res_data.get("return") is True:
                logger.info(f"Fast2SMS OTP successfully dispatched to {clean_phone}")
                return {
                    "provider": "fast2sms",
                    "success": True,
                    "message": "OTP sent via Fast2SMS SMS Gateway"
                }
            else:
                logger.warning(f"Fast2SMS response: {res_data}")
                return {
                    "provider": "fast2sms",
                    "success": False,
                    "message": res_data.get("message", "Fast2SMS dispatch error")
                }
        except Exception as e:
            logger.error(f"Error calling Fast2SMS: {e}")

    # 2. Twilio Integration (Fallback if Twilio credentials provided)
    if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN and settings.TWILIO_PHONE_NUMBER:
        try:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json"
            data = {
                "From": settings.TWILIO_PHONE_NUMBER,
                "To": f"+91{clean_phone}",
                "Body": f"शेतीटेक (ShetiTech) लॉगिन पडताळणी OTP: {otp_code}. हा कोड ५ मिनिटांसाठी वैध आहे."
            }
            response = requests.post(
                url,
                data=data,
                auth=(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN),
                timeout=10
            )
            if response.status_code in (200, 201):
                logger.info(f"Twilio OTP successfully sent to +91{clean_phone}")
                return {
                    "provider": "twilio",
                    "success": True,
                    "message": "OTP sent via Twilio SMS Gateway"
                }
            else:
                logger.warning(f"Twilio returned {response.status_code}: {response.text}")
        except Exception as e:
            logger.error(f"Error calling Twilio: {e}")

    # 3. Development / Simulation Mode (Fallback when API key is not yet configured)
    print("\n" + "="*60)
    print(f"📱 [SHETITECH SMS GATEWAY] Farmer Phone: +91 {clean_phone}")
    print(f"🔑 [SHETITECH SMS GATEWAY] Verification OTP: {otp_code}")
    print(f"🕒 [SHETITECH SMS GATEWAY] Validity: 5 Minutes")
    print("="*60 + "\n")

    return {
        "provider": "simulation",
        "success": True,
        "message": "Demo mode OTP generated. Add FAST2SMS_API_KEY in .env for live SMS delivery.",
        "debug_otp": otp_code
    }
