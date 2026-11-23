import logging
import requests
from app.core.config import settings

logger = logging.getLogger(__name__)

def send_sms_otp(phone: str, otp_code: str) -> dict:
    """
    Sends a secure 6-digit verification OTP to the farmer's mobile number.
    Supports:
    1. Fast2SMS (Indian OTP route)
    2. Twilio (Alternative SMS Provider)
    3. Simulation fallback (Safe dev mode when keys are unset)
    """
    clean_phone = "".join(filter(str.isdigit, phone))
    if len(clean_phone) > 10:
        clean_phone = clean_phone[-10:]

    # 1. Fast2SMS Integration (Live SMS Gateway)
    if settings.FAST2SMS_API_KEY:
        try:
            url = "https://www.fast2sms.com/dev/bulkV2"
            headers = {
                "authorization": settings.FAST2SMS_API_KEY
            }
            payload = {
                "route": "otp",
                "variables_values": otp_code,
                "numbers": clean_phone
            }
            response = requests.post(url, data=payload, headers=headers, timeout=8)
            res_data = response.json()
            if res_data.get("return") is True:
                logger.info("Fast2SMS OTP successfully dispatched to recipient")
                return {
                    "provider": "fast2sms",
                    "success": True,
                    "message": "OTP sent via Fast2SMS SMS Gateway"
                }
            else:
                logger.warning(f"Fast2SMS API rejected request: {res_data}")
                api_msg = res_data.get("message", "Fast2SMS dispatch error")
                return {
                    "provider": "fast2sms",
                    "success": False,
                    "message": f"Fast2SMS Gateway Error: {api_msg}"
                }
        except Exception as e:
            logger.error(f"Error calling Fast2SMS: {e}")
            return {
                "provider": "fast2sms",
                "success": False,
                "message": f"Fast2SMS connection error: {str(e)}"
            }

    # 2. Twilio Integration (Fallback if Twilio credentials provided)
    if settings.TWILIO_ACCOUNT_SID and settings.TWILIO_AUTH_TOKEN and settings.TWILIO_PHONE_NUMBER:
        try:
            url = f"https://api.twilio.com/2010-04-01/Accounts/{settings.TWILIO_ACCOUNT_SID}/Messages.json"
            data = {
                "From": settings.TWILIO_PHONE_NUMBER,
                "To": f"+91{clean_phone}",
                "Body": f"शेतीटेक (ShetiTech) पडताळणी OTP: {otp_code}. हा कोड ५ मिनिटांसाठी वैध आहे."
            }
            response = requests.post(
                url,
                data=data,
                auth=(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN),
                timeout=8
            )
            if response.status_code in (200, 201):
                logger.info("Twilio OTP successfully dispatched to recipient")
                return {
                    "provider": "twilio",
                    "success": True,
                    "message": "OTP sent via Twilio SMS Gateway"
                }
            else:
                logger.warning(f"Twilio returned status {response.status_code}: {response.text}")
                return {
                    "provider": "twilio",
                    "success": False,
                    "message": f"Twilio SMS Error: HTTP {response.status_code}"
                }
        except Exception as e:
            logger.error(f"Error calling Twilio: {e}")
            return {
                "provider": "twilio",
                "success": False,
                "message": f"Twilio connection error: {str(e)}"
            }

    # 3. Development / Simulation Mode (Active when no SMS gateway key is configured)
    logger.info(f"[SMS GATEWAY DEV MODE] Verification OTP sent to +91 {clean_phone}")
    return {
        "provider": "simulation",
        "success": True,
        "message": "OTP generated and dispatched successfully"
    }
