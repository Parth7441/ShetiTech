from pydantic import BaseModel
from typing import List, Optional

class WeatherCurrent(BaseModel):
    temperature: float
    humidity: int
    wind_speed: float
    rain_probability: int
    condition: str
    condition_mr: str
    icon: str

class WeatherForecastItem(BaseModel):
    day: str
    day_mr: str
    max_temp: float
    min_temp: float
    rain_probability: int
    condition: str
    condition_mr: str

class AgriAdvisory(BaseModel):
    spray_recommended: bool
    irrigation_needed: bool
    advisory_mr: str
    advisory_en: str

class WeatherResponse(BaseModel):
    location: str
    current: WeatherCurrent
    forecast: List[WeatherForecastItem]
    agri_advisory: AgriAdvisory
