# Database Setup Instructions

This folder contains SQL scripts to set up the EventHub database.

## Quick Setup

### Option 1: Using MySQL Command Line

1. **Open MySQL command line or MySQL Workbench**

2. **Run the setup script:**
   ```bash
   mysql -u root -p < setup.sql
   ```
   
   Or in MySQL command line:
   ```sql
   source setup.sql;
   ```

### Option 2: Using MySQL Workbench

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open `setup.sql` file
4. Execute the script (Ctrl+Shift+Enter)

### Option 3: Manual Setup

1. **Create the database:**
   ```sql
   CREATE DATABASE IF NOT EXISTS eventhub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   USE eventhub_db;
   ```

2. **Run the schema script:**
   - Copy and paste the contents of `schema.sql` into your MySQL client
   - Execute the script

### Option 4: Automatic Setup (Recommended)

The Node.js backend will automatically create all tables when you start the server for the first time. Just make sure:

1. The database exists:
   ```sql
   CREATE DATABASE IF NOT EXISTS eventhub_db;
   ```

2. Your `.env` file has the correct database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=eventhub_db
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

The server will automatically create all tables on first run.

## Database Structure

### Tables

1. **users** - Stores user accounts
   - id, username, email, password, full_name, phone, role, created_at, updated_at

2. **events** - Stores event information
   - id, title, description, category, date, time, location, price, expected_attendees, created_by, created_at, updated_at

3. **registrations** - Stores event registrations
   - id, user_id, event_id, registered_at

### Relationships

- `events.created_by` → `users.id` (Foreign Key)
- `registrations.user_id` → `users.id` (Foreign Key)
- `registrations.event_id` → `events.id` (Foreign Key)

## Creating an Admin User

After setting up the database, you can create an admin user in two ways:

### Method 1: Through the Application
1. Register a new user through the signup page
2. Update the user's role in the database:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

### Method 2: Direct SQL (Not Recommended for Production)
```sql
-- Note: You'll need to hash the password using bcrypt first
-- Use Node.js to generate the hash, then insert:
INSERT INTO users (username, email, password, full_name, role) 
VALUES ('admin', 'admin@eventhub.com', '$2a$10$hashed_password_here', 'Admin User', 'admin');
```

## Troubleshooting

### Error: "Access denied for user"
- Check your MySQL username and password in `.env`
- Make sure the MySQL user has CREATE DATABASE privileges

### Error: "Table already exists"
- The tables already exist. This is fine if you're re-running the setup.
- To start fresh, drop the database first:
  ```sql
  DROP DATABASE IF EXISTS eventhub_db;
  ```
  Then run the setup script again.

### Error: "Foreign key constraint fails"
- Make sure tables are created in the correct order (users → events → registrations)
- Check that referenced IDs exist before creating foreign key relationships

## Backup and Restore

### Backup
```bash
mysqldump -u root -p eventhub_db > backup.sql
```

### Restore
```bash
mysql -u root -p eventhub_db < backup.sql
```

