@echo off
REM OCMS2 Backend Setup Script for Windows
REM This script sets up and runs the Django backend

echo ===============================================
echo  OCMS2 - Canteen Management System Backend
echo ===============================================
echo.

REM Check if venv exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
    echo Virtual environment created.
)

REM Activate virtual environment
echo Activating virtual environment...
call .\venv\Scripts\activate.bat

REM Install/Update requirements
echo Installing dependencies...
pip install -r requirements.txt

REM Run migrations
echo Running database migrations...
.\venv\Scripts\python.exe manage.py migrate

REM Create superuser if needed
echo.
echo Admin credentials:
echo Username: admin
echo Password: admin123
echo.

REM Start server
echo.
echo Starting Django development server...
echo Server will run at: http://localhost:8000
echo Admin panel: http://localhost:8000/admin/
echo.
echo Press CTRL+C to stop the server.
echo.

.\venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000

pause
