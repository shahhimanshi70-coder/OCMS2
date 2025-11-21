# OCMS2 Backend Setup Script for PowerShell
# This script sets up and runs the Django backend

Write-Host "===============================================" -ForegroundColor Green
Write-Host "  OCMS2 - Canteen Management System Backend" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""

# Check if venv exists
if (-Not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    Write-Host "Virtual environment created." -ForegroundColor Green
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1

# Install/Update requirements
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
.\venv\Scripts\python.exe manage.py migrate

# Create superuser if needed
Write-Host ""
Write-Host "Admin credentials:" -ForegroundColor Cyan
Write-Host "Username: admin" -ForegroundColor Cyan
Write-Host "Password: admin123" -ForegroundColor Cyan
Write-Host ""

# Start server
Write-Host ""
Write-Host "Starting Django development server..." -ForegroundColor Green
Write-Host "Server will run at: http://localhost:8000" -ForegroundColor Green
Write-Host "Admin panel: http://localhost:8000/admin/" -ForegroundColor Green
Write-Host ""
Write-Host "Press CTRL+C to stop the server." -ForegroundColor Yellow
Write-Host ""

.\venv\Scripts\python.exe manage.py runserver 0.0.0.0:8000
