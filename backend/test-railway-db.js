// Test Railway MySQL Database Connection
const mysql = require('mysql2/promise');

const config = {
  host: 'switchback.proxy.rlwy.net', // External Railway URL
  port: 31509,
  user: 'root',
  password: 'RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz',
  database: 'railway'
};

async function testConnection() {
  console.log('🧪 Testing Railway MySQL Connection...\n');
  console.log('Configuration:');
  console.log(`  Host: ${config.host}`);
  console.log(`  Port: ${config.port}`);
  console.log(`  User: ${config.user}`);
  console.log(`  Database: ${config.database}\n`);

  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connection successful!\n');
    
    // Test query
    const [rows] = await connection.query('SELECT DATABASE() as current_db, VERSION() as version');
    console.log(`✅ Connected to database: ${rows[0].current_db}`);
    console.log(`✅ MySQL Version: ${rows[0].version}\n`);
    
    // Check if tables exist
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables in database`);
    
    if (tables.length > 0) {
      console.log('\nTables:');
      tables.forEach((table, index) => {
        console.log(`  ${index + 1}. ${Object.values(table)[0]}`);
      });
    } else {
      console.log('\n💡 No tables found. Tables will be created automatically when backend starts.');
    }
    
    await connection.end();
    console.log('\n✅ Connection test completed successfully!');
    console.log('\n📝 For Railway backend, use these values:');
    console.log('   DB_HOST=mysql.railway.internal (internal connection)');
    console.log('   DB_PORT=3306');
    console.log('   DB_USER=root');
    console.log('   DB_PASSWORD=RgYjXgwXQnVInzWbkjzrjXgVSHAgXJpz');
    console.log('   DB_NAME=railway\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed!\n');
    console.error(`Error: ${error.message}\n`);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your credentials');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 Cannot connect to database. Check if Railway database is running.');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database does not exist');
    }
    
    process.exit(1);
  }
}

testConnection();

