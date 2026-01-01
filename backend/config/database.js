const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'eventhub_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection and initialize database
const connect = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection established');
    connection.release();
    
    // Initialize database schema
    await initializeDatabase();
    
    return pool;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
};

// Initialize database schema
const initializeDatabase = async () => {
  try {
    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100),
        phone VARCHAR(20),
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create Events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        category VARCHAR(50) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        location VARCHAR(200) NOT NULL,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        expected_attendees INT NOT NULL DEFAULT 0,
        created_by INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
        INDEX idx_category (category),
        INDEX idx_date (date),
        INDEX idx_created_by (created_by)
      )
    `);

    // Create Registrations table (for event registrations)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
        UNIQUE KEY unique_registration (user_id, event_id),
        INDEX idx_user_id (user_id),
        INDEX idx_event_id (event_id)
      )
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

module.exports = {
  pool,
  connect
};

