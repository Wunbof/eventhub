# Database Setup - Steps 1 & 2 Completed ✅

## ✅ Step 1: Database Creation

I've created a script to help you create the database. Choose one method:

### Method A: Run the Script (Easiest)
1. Open Command Prompt or PowerShell
2. Navigate to the backend folder:
   ```cmd
   cd backend
   ```
3. Run the database creation script:
   ```cmd
   create-database.bat
   ```
4. Enter your MySQL root password when prompted (or press Enter if no password)

### Method B: Manual Creation
1. Open **MySQL Workbench** or **MySQL Command Line**
2. Connect to your MySQL server
3. Run this command:
   ```sql
   CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

### Method C: Using MySQL Command Line
```cmd
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

## ✅ Step 2: .env File Configuration

The `.env` file has been created in the `backend` folder! 

**⚠️ IMPORTANT: You need to add your MySQL password**

1. Open `backend/.env` file
2. Find this line:
   ```env
   DB_PASSWORD=your_password_here
   ```
3. Replace `your_password_here` with your actual MySQL root password:
   ```env
   DB_PASSWORD=your_actual_mysql_password
   ```

If your MySQL has no password, leave it empty:
```env
DB_PASSWORD=
```

---

## 📋 Current .env Configuration

Your `.env` file is located at: `backend/.env`

Current settings:
- ✅ `DB_HOST=localhost`
- ✅ `DB_USER=root`
- ⚠️ `DB_PASSWORD=` ← **YOU NEED TO ADD YOUR PASSWORD HERE**
- ✅ `DB_NAME=eventhub_db`
- ✅ `PORT=5000`
- ✅ `JWT_SECRET` (already configured)

---

## ✅ Next Steps

After completing steps 1 & 2:

1. **Verify database exists:**
   ```sql
   SHOW DATABASES;
   ```
   You should see `eventhub_db` in the list.

2. **Start the backend server:**
   ```cmd
   cd backend
   npm install
   npm start
   ```
   
   The server will automatically create all tables when it starts!

3. **Start the frontend:**
   ```cmd
   npm start
   ```

---

## 🆘 Troubleshooting

### "Access denied for user"
- Check your MySQL password in `.env`
- Make sure MySQL is running

### "Database doesn't exist"
- Run the database creation script again
- Or create it manually using Method B above

### "Cannot find MySQL"
- Make sure MySQL is installed
- Add MySQL to your system PATH
- Or use MySQL Workbench instead

---

**You're almost ready! Just add your MySQL password to the .env file and create the database!** 🚀

