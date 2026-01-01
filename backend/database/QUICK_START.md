# Quick Database Setup Guide

## 🚀 Fastest Way to Set Up the Database

### Method 1: Automatic Setup (Recommended) ⭐

The backend server will automatically create all tables when you start it for the first time!

**Steps:**
1. Make sure MySQL is running
2. Create the database manually (one-time):
   ```sql
   CREATE DATABASE eventhub_db;
   ```
3. Configure your `.env` file in the `backend` folder:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=eventhub_db
   ```
4. Start the backend server:
   ```bash
   cd backend
   npm install
   npm start
   ```

That's it! The tables will be created automatically. ✅

---

### Method 2: Using SQL Scripts

#### On Windows:
1. Open Command Prompt in the `backend/database` folder
2. Run:
   ```cmd
   setup-database.bat
   ```
   Or manually:
   ```cmd
   mysql -u root -p < setup.sql
   ```

#### On Linux/Mac:
1. Open Terminal in the `backend/database` folder
2. Make the script executable:
   ```bash
   chmod +x setup-database.sh
   ./setup-database.sh
   ```
   Or manually:
   ```bash
   mysql -u root -p < setup.sql
   ```

#### Using MySQL Workbench:
1. Open MySQL Workbench
2. Connect to your server
3. Open `setup.sql`
4. Execute the script (Ctrl+Shift+Enter or Cmd+Shift+Enter)

---

### Method 3: Manual SQL Execution

1. Open MySQL command line or any MySQL client
2. Run these commands:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE eventhub_db;

-- Then copy and paste the contents of setup.sql and execute
```

---

## 📋 What Gets Created?

- ✅ Database: `eventhub_db`
- ✅ Table: `users` (for user accounts)
- ✅ Table: `events` (for events)
- ✅ Table: `registrations` (for event registrations)
- ✅ All foreign key relationships
- ✅ All indexes for performance

---

## 🧪 Optional: Add Sample Data

If you want to test with sample data:

```bash
mysql -u root -p eventhub_db < sample-data.sql
```

This will create:
- 3 sample users (including 1 admin)
- 6 sample events

**Sample Login Credentials:**
- Email: `john@example.com`, Password: `password123`
- Email: `jane@example.com`, Password: `password123`
- Email: `admin@eventhub.com`, Password: `password123` (Admin)

---

## ✅ Verify Setup

Check if everything is set up correctly:

```sql
USE eventhub_db;
SHOW TABLES;
```

You should see:
- users
- events
- registrations

---

## 🐛 Troubleshooting

### "Access denied for user"
- Check your MySQL username and password
- Make sure the user has CREATE DATABASE privileges

### "Database already exists"
- That's fine! The script uses `IF NOT EXISTS`
- You can continue with the setup

### "Table already exists"
- Tables are already created
- You can skip the setup or drop the database to start fresh:
  ```sql
  DROP DATABASE eventhub_db;
  ```

---

## 📝 Next Steps

After database setup:
1. ✅ Configure `.env` file in `backend` folder
2. ✅ Start the backend server: `npm start`
3. ✅ Start the frontend: `npm start` (in root folder)
4. ✅ Open http://localhost:3000 in your browser

---

**Need help?** Check the main README.md or the database/README.md for more details.

