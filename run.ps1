# Outing Pass Management - Run Script
# Starts a local HTTP server to serve the application

Write-Host "Starting Outing Pass Management server..." -ForegroundColor Cyan
Write-Host "Open http://localhost:8080 in your browser" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

python -m http.server 8080
