@echo off
echo ========================================
echo Fix .env Password Configuration
echo ========================================
echo.

echo This script will help you configure the MySQL password in .env
echo.

echo Current .env location: backend\.env
echo.

echo Options:
echo 1. No password (XAMPP default)
echo 2. Set a password
echo 3. Test current connection
echo.

set /p choice="Enter choice (1, 2, or 3): "

if "%choice%"=="1" (
    echo.
    echo Setting DB_PASSWORD to empty...
    powershell -Command "(Get-Content backend\.env) -replace 'DB_PASSWORD=.*', 'DB_PASSWORD=' | Set-Content backend\.env"
    echo.
    echo ✅ Updated .env file with empty password
    echo.
    echo Testing connection...
    node test-db-connection.js
) else if "%choice%"=="2" (
    echo.
    set /p password="Enter your MySQL password: "
    echo.
    echo Setting DB_PASSWORD...
    powershell -Command "(Get-Content backend\.env) -replace 'DB_PASSWORD=.*', 'DB_PASSWORD=%password%' | Set-Content backend\.env"
    echo.
    echo ✅ Updated .env file with password
    echo.
    echo Testing connection...
    node test-db-connection.js
) else if "%choice%"=="3" (
    echo.
    echo Testing current connection...
    node test-db-connection.js
) else (
    echo Invalid choice!
    pause
    exit /b 1
)

pause

