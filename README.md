# ShetiTech (शेतीटेक) 🌾🚜
> **Smart Farming, Better Future.**  
> *शेती स्मार्ट, भविष्य समृद्ध!*

An advanced, production-grade Agriculture Technology platform designed for farmers in Maharashtra, India. Features bilingual support (मराठी & English), interactive agricultural calculators, crop guides, machinery rentals, and live APMC market rates & weather advisories.

---

## 🏗️ Architecture

```
ShetiTech/
├── Frontend/                 # React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
│   ├── src/
│   │   ├── components/       # Calculators, Modals, Crop cards, Weather & Mandi sections
│   │   ├── context/          # Centralized Language Context (mr/en)
│   │   ├── data/             # Static crop guides & authentic APMC fallback data
│   │   ├── pages/            # Multi-page agricultural dashboard & tools
│   │   └── services/         # API client connecting to FastAPI backend
│   └── public/               # Static crop assets & logo
│
└── Backend/                  # Python 3.11, FastAPI, SQLAlchemy, PostgreSQL / SQLite
    ├── app/
    │   ├── core/             # Configuration, CORS, Database engines
    │   ├── models/           # Farmers, Mandi Rates, Harvester Bookings, Inquiries
    │   ├── routers/          # REST API endpoints (/api/v1/...)
    │   ├── schemas/          # Pydantic validation schemas
    │   ├── services/         # Weather & Agmarknet Live Mandi sync services
    │   └── seed/             # Pre-seeded authentic Maharashtra market data
    ├── run.ps1 / run.bat     # One-click startup scripts
    └── requirements.txt
```

---

## 🚀 Quick Start

### 1. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 2. Backend Setup
```bash
cd Backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # (On Windows)
pip install -r requirements.txt
.\run.ps1                     # Starts FastAPI on http://localhost:8000
```
Interactive API Documentation: **`http://localhost:8000/docs`**

---

## 🌟 Key Features
- **🌐 100% Bilingual**: Instant real-time switching between Marathi (मराठी) and English with localStorage persistence.
- **📱 Phone-first Architecture**: Designed specifically for farmers with phone-based workflows.
- **🧮 Smart Agriculture Calculators**:
  - Land Area Converter (गुंठा, एकर, हेक्टर, चौरस फूट, बिघा)
  - Fertilizer Dosage Calculator (युरिया, डीएपी, पोटॅश)
  - Seed Rate Calculator
  - Crop Profit & ROI Calculator
- **📊 Live APMC Mandi Rates**: Daily commodity prices across Maharashtra with Agmarknet / Data.gov.in integration.
- **🌦️ Agricultural Weather Advisory**: Real-time satellite weather with spray and irrigation suitability alerts.
- **🚜 Harvester Custom Hiring**: Multi-crop and sugarcane harvester machinery directory & online booking.

---

## 📄 License
MIT License. Built for empowering Indian Agriculture.
