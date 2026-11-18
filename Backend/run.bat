@echo off
title ShetiTech FastAPI Backend
echo Starting ShetiTech FastAPI Backend on http://localhost:8000 ...
set PYTHONPATH=d:\ShetiTech\Backend
d:\ShetiTech\Backend\venv\Scripts\uvicorn.exe app.main:app --reload --port 8000 --host 0.0.0.0
pause
