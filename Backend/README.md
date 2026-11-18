# ShetiTech Backend API (शेतीटेक बॅकएंड)

FastAPI & PostgreSQL backend for **ShetiTech** – Agriculture Technology Platform for Maharashtra, India.

---

## 🚀 Quick Start

### 1. Open Terminal in `Backend/`
```powershell
cd d:\ShetiTech\Backend
```

### 2. Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Start the Server
```powershell
uvicorn app.main:app --reload --port 8000
```

The API will be live at:
- **API Root:** `http://localhost:8000`
- **Interactive Swagger Docs:** `http://localhost:8000/docs`
- **ReDoc Alternative:** `http://localhost:8000/redoc`

---

## 🗄️ Database Configuration

By default, the backend uses **SQLite** (`shetitech.db`) so it works immediately without installing any database software.

### Switching to PostgreSQL (Supabase or Local PostgreSQL):
1. Open `.env`
2. Change `DATABASE_URL`:
   ```env
   # Local PostgreSQL
   DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/shetitech

   # Or Cloud PostgreSQL (Supabase / Neon)
   DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxxx.supabase.co:5432/postgres
   ```
3. Restart the server. SQLAlchemy will automatically create all tables on launch!

---

## 📡 Available API Endpoints

### 🌾 Crops (`/api/v1/crops`)
- `GET /api/v1/crops/` - List all crops with Marathi & English details (filters: `season`, `category`, `search`)
- `GET /api/v1/crops/{crop_id}` - Detailed guide for a specific crop (e.g. `sugarcane`, `turmeric`, `soybean`)

### 📊 Mandi Rates (`/api/v1/mandi`)
- `GET /api/v1/mandi/` - Current APMC market rates in Maharashtra (filters: `district`, `search`)
- `POST /api/v1/mandi/` - Add new mandi rate entry

### 🌦️ Weather Advisory (`/api/v1/weather`)
- `GET /api/v1/weather/?district=pune` - Live temperature, humidity, 5-day forecast, and spray/irrigation advisories

### 🚜 Harvester Machinery (`/api/v1/harvesters`)
- `GET /api/v1/harvesters/` - Available harvesters by district
- `POST /api/v1/harvesters/` - Register new harvester equipment
- `POST /api/v1/harvesters/book` - Farmer booking request
- `GET /api/v1/harvesters/bookings` - List booking requests

### 👨‍🌾 Farmers & Firebase Auth Link (`/api/v1/farmers`)
- `POST /api/v1/farmers/sync` - Sync or register farmer profile after Firebase mobile OTP login
- `GET /api/v1/farmers/{phone}` - Get farmer profile by phone number
- `PUT /api/v1/farmers/{phone}` - Update farmer land size, location, or preferred language

### ❓ Inquiries (`/api/v1/inquiries`)
- `POST /api/v1/inquiries/` - Farmer submits crop problem / question
- `GET /api/v1/inquiries/` - View inquiries and expert answers
