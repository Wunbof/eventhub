@echo off
echo ========================================
echo Creating EventHub Database
echo ========================================
echo.

REM Check if MySQL is available
set MYSQL_PATH=
if exist "C:\xampp\mysql\bin\mysql.exe" (
    set MYSQL_PATH=C:\xampp\mysql\bin\mysql.exe
) else if exist "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe
) else if exist "C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe" (
    set MYSQL_PATH=C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe
) else (
    where mysql >nul 2>nul
    if %ERRORLEVEL% EQU 0 (
        set MYSQL_PATH=mysql
    )
)

if "%MYSQL_PATH%"=="" (
    echo ERROR: MySQL command line tool not found!
    echo Please make sure MySQL is installed and running.
    echo.
    echo If using XAMPP:
    echo 1. Start XAMPP Control Panel
    echo 2. Start MySQL service
    echo 3. Run this script again
    echo.
    echo You can also create the database manually:
    echo 1. Open MySQL Workbench or phpMyAdmin
    echo 2. Run: CREATE DATABASE eventhub_db;
    echo.
    pause
    exit /b 1
)

echo Please enter your MySQL root password:
echo (Press Enter if no password is set)
set /p MYSQL_PASSWORD=

echo.
echo Creating database eventhub_db...

if "%MYSQL_PASSWORD%"=="" (
    "%MYSQL_PATH%" -u root -e "CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
) else (
    "%MYSQL_PATH%" -u root -p%MYSQL_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
)

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo Database created successfully!
    echo ========================================
    echo.
    echo Database name: eventhub_db
    echo.
    echo Next steps:
    echo 1. Update backend\.env with your MySQL password
    echo 2. Start the backend server: npm start
    echo.
) else (
    echo.
    echo ========================================
    echo Database creation failed!
    echo ========================================
    echo Please check your MySQL credentials.
    echo.
    echo You can also create the database manually:
    echo 1. Open MySQL Workbench or command line
    echo 2. Run: CREATE DATABASE eventhub_db;
    echo.
)

pause

