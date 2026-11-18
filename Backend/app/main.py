from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base, SessionLocal
from app.seed.seed_data import seed_initial_data
import app.models # ensure all models are imported

from app.routers import crops, mandi, weather, harvesters, farmers, inquiries

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables and seed initial data
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_initial_data(db)
    finally:
        db.close()
    yield
    # Shutdown logic (if any)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for ShetiTech - Smart Farming Agriculture Technology Platform (Maharashtra, India)",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API v1 Routers
app.include_router(crops.router, prefix=settings.API_V1_STR)
app.include_router(mandi.router, prefix=settings.API_V1_STR)
app.include_router(weather.router, prefix=settings.API_V1_STR)
app.include_router(harvesters.router, prefix=settings.API_V1_STR)
app.include_router(farmers.router, prefix=settings.API_V1_STR)
app.include_router(inquiries.router, prefix=settings.API_V1_STR)

@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "ShetiTech Agriculture API",
        "version": settings.VERSION,
        "docs": "/docs",
        "tagline": "शेती स्मार्ट, भविष्य समृद्ध! | Smart Farming, Better Future."
    }
