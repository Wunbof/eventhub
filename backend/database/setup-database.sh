#!/bin/bash

echo "========================================"
echo "EventHub Database Setup"
echo "========================================"
echo ""

# Check if MySQL is available
if ! command -v mysql &> /dev/null; then
    echo "ERROR: MySQL command line tool not found!"
    echo "Please make sure MySQL is installed and added to your PATH."
    exit 1
fi

# Prompt for MySQL password
read -sp "Enter MySQL root password: " MYSQL_PASSWORD
echo ""

echo "Creating database and tables..."
mysql -u root -p"$MYSQL_PASSWORD" < setup.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "Database setup completed successfully!"
    echo "========================================"
    echo ""
    echo "You can now start the backend server."
else
    echo ""
    echo "========================================"
    echo "Database setup failed!"
    echo "========================================"
    echo "Please check your MySQL credentials and try again."
    exit 1
fi

