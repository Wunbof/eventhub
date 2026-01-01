# MySQL Database Setup Guide

## 📦 What's Included

I've created a complete MySQL database setup for your EventHub project. Here's what you have:

### Database Files Created:
- ✅ `backend/database/setup.sql` - Main setup script (creates database and all tables)
- ✅ `backend/database/schema.sql` - Detailed schema with comments
- ✅ `backend/database/sample-data.sql` - Optional sample data for testing
- ✅ `backend/database/setup-database.bat` - Windows setup script
- ✅ `backend/database/setup-database.sh` - Linux/Mac setup script
- ✅ `backend/database/README.md` - Detailed documentation
- ✅ `backend/database/QUICK_START.md` - Quick setup guide

---

## 🚀 Quick Setup (Choose One Method)

### ⭐ Method 1: Automatic (Easiest - Recommended)

The backend will create tables automatically when you start it!

1. **Create the database manually** (one-time):
   ```sql
   CREATE DATABASE eventhub_db;
   ```

2. **Configure `.env` file** in `backend` folder:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=eventhub_db
   ```

3. **Start the backend**:
   ```bash
   cd backend
   npm install
   npm start
   ```

The tables will be created automatically! ✅

---

### Method 2: Run SQL Script

#### Option A: Using the Batch File (Windows)
```cmd
cd backend\database
setup-database.bat
```

#### Option B: Using MySQL Command Line
```bash
cd backend/database
mysql -u root -p < setup.sql
```

#### Option C: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your server
3. Open `backend/database/setup.sql`
4. Execute the script

---

## 📊 Database Structure

The database includes 3 main tables:

### 1. `users` Table
- Stores user accounts (username, email, password, role, etc.)
- Supports both regular users and admins

### 2. `events` Table
- Stores event information (title, description, date, location, etc.)
- Linked to users via `created_by` foreign key

### 3. `registrations` Table
- Tracks which users registered for which events
- Prevents duplicate registrations

---

## 🧪 Optional: Add Sample Data

To test with sample data:

```bash
mysql -u root -p eventhub_db < backend/database/sample-data.sql
```

This creates:
- 3 sample users (including 1 admin)
- 6 sample events

**Test Credentials:**
- Email: `john@example.com`, Password: `password123`
- Email: `admin@eventhub.com`, Password: `password123` (Admin)

---

## ✅ Verify Setup

Check if everything is working:

```sql
USE eventhub_db;
SHOW TABLES;
```

You should see: `users`, `events`, `registrations`

---

## 🔧 Configuration

Make sure your `backend/.env` file has:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=eventhub_db
```

---

## 📝 Next Steps

1. ✅ Database is set up
2. ✅ Configure `.env` file
3. ✅ Start backend: `cd backend && npm start`
4. ✅ Start frontend: `npm start`
5. ✅ Open http://localhost:3000

---

## 🆘 Need Help?

- Check `backend/database/README.md` for detailed instructions
- Check `backend/database/QUICK_START.md` for quick reference
- The backend will automatically create tables if they don't exist

---

**Your database is ready to go!** 🎉

