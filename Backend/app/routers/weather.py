from fastapi import APIRouter, Query
from app.schemas.weather import WeatherResponse
from app.services.weather_service import get_weather_for_district

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/", response_model=WeatherResponse)
def get_weather(
    district: str = Query("pune", description="Maharashtra district name: pune, nashik, kolhapur, satara, sangli, etc.")
):
    """Returns real-time weather and 5-day forecast with agricultural advisory for the requested district."""
    return get_weather_for_district(district)
