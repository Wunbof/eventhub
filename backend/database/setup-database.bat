@echo off
echo ========================================
echo EventHub Database Setup
echo ========================================
echo.

REM Check if MySQL is available
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: MySQL command line tool not found!
    echo Please make sure MySQL is installed and added to your PATH.
    echo.
    pause
    exit /b 1
)

echo Please enter your MySQL root password:
set /p MYSQL_PASSWORD=

echo.
echo Creating database and tables...
mysql -u root -p%MYSQL_PASSWORD% < setup.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Database setup completed successfully!
    echo ========================================
    echo.
    echo You can now start the backend server.
) else (
    echo.
    echo ========================================
    echo Database setup failed!
    echo ========================================
    echo Please check your MySQL credentials and try again.
)

echo.
pause

