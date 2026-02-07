@echo off
echo ========================================
echo   Frontend Deploy Script
echo ========================================
echo.
echo [1/3] Building React app...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Uploading to server...
scp -r build\* root@95.142.38.51:/var/www/authepta/
if errorlevel 1 (
    echo ERROR: Upload failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Reloading nginx...
ssh root@95.142.38.51 "nginx -t && systemctl reload nginx"

echo.
echo ========================================
echo   Frontend deployed successfully!
echo   URL: http://ew-app.ru
echo ========================================
pause