@echo off
echo ========================================
echo   Backend Deploy Script
echo ========================================
echo.
echo [1/4] Building JAR...
call mvnw.cmd clean package -DskipTests
if errorlevel 1 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [2/4] Uploading JAR to server...
scp target\coopProject-0.0.1-SNAPSHOT.jar root@95.142.38.51:/opt/authepta/app.jar
if errorlevel 1 (
    echo ERROR: Upload failed!
    pause
    exit /b 1
)

echo.
echo [3/4] Restarting backend service...
ssh root@95.142.38.51 "systemctl restart authepta"

echo.
echo [4/4] Checking status...
timeout /t 3 /nobreak >nul
ssh root@95.142.38.51 "systemctl status authepta --no-pager -l"

echo.
echo ========================================
echo   Backend deployed successfully!
echo ========================================
pause