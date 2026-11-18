# Start ShetiTech FastAPI Backend
Write-Host "Starting ShetiTech FastAPI Backend..." -ForegroundColor Green
$env:PYTHONPATH = "d:\ShetiTech\Backend"
& "d:\ShetiTech\Backend\venv\Scripts\uvicorn.exe" app.main:app --reload --port 8000 --host 0.0.0.0
