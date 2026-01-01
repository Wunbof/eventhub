// Test MySQL Database Connection
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  console.log('Testing MySQL connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`  User: ${process.env.DB_USER || 'root'}`);
  console.log(`  Database: ${process.env.DB_NAME || 'eventhub_db'}`);
  console.log(`  Password: ${process.env.DB_PASSWORD ? '***' + process.env.DB_PASSWORD.slice(-2) : '(empty)'}\n`);

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'eventhub_db'
    });

    console.log('✅ Connection successful!');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as current_db');
    console.log(`✅ Connected to database: ${rows[0].current_db}`);
    
    // Check if tables exist
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables in database`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error(`\nError: ${error.message}\n`);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Solutions:');
      console.log('  1. Check your MySQL password in backend/.env');
      console.log('  2. If no password, make sure DB_PASSWORD is empty: DB_PASSWORD=');
      console.log('  3. Try connecting with MySQL Workbench or phpMyAdmin to verify credentials');
      console.log('  4. For XAMPP, default is usually no password (empty)');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 MySQL server is not running!');
      console.log('  - Start MySQL from XAMPP Control Panel');
      console.log('  - Or start MySQL service');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database does not exist!');
      console.log('  - Run: backend\\create-database.bat');
      console.log('  - Or create manually: CREATE DATABASE eventhub_db;');
    }
    
    process.exit(1);
  }
}

testConnection();

