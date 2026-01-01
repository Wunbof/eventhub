// Check Database Contents
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkDatabase() {
  console.log('📊 Checking EventHub Database Contents...\n');
  console.log('='.repeat(50));

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'eventhub_db'
    });

    // Check Users
    console.log('\n👥 USERS:');
    console.log('-'.repeat(50));
    const [users] = await connection.query('SELECT id, username, email, full_name, role, created_at FROM users ORDER BY created_at DESC');
    
    if (users.length === 0) {
      console.log('  No users found.');
    } else {
      console.log(`  Total Users: ${users.length}\n`);
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.username} (${user.email})`);
        console.log(`     Role: ${user.role} | Created: ${new Date(user.created_at).toLocaleString()}`);
        if (user.full_name) {
          console.log(`     Name: ${user.full_name}`);
        }
        console.log('');
      });
    }

    // Check Events
    console.log('\n📅 EVENTS:');
    console.log('-'.repeat(50));
    const [events] = await connection.query(`
      SELECT e.*, u.username as creator_username 
      FROM events e 
      LEFT JOIN users u ON e.created_by = u.id 
      ORDER BY e.created_at DESC
    `);
    
    if (events.length === 0) {
      console.log('  No events found.');
    } else {
      console.log(`  Total Events: ${events.length}\n`);
      events.forEach((event, index) => {
        console.log(`  ${index + 1}. ${event.title}`);
        console.log(`     Category: ${event.category} | Price: $${event.price}`);
        console.log(`     Date: ${new Date(event.date).toLocaleDateString()} at ${event.time}`);
        console.log(`     Location: ${event.location}`);
        console.log(`     Expected Attendees: ${event.expected_attendees}`);
        console.log(`     Created by: ${event.creator_username || 'Unknown'} (ID: ${event.created_by})`);
        console.log(`     Created: ${new Date(event.created_at).toLocaleString()}`);
        console.log('');
      });
    }

    // Check Registrations
    console.log('\n🎫 REGISTRATIONS:');
    console.log('-'.repeat(50));
    const [registrations] = await connection.query(`
      SELECT r.*, u.username, u.email, e.title as event_title
      FROM registrations r
      LEFT JOIN users u ON r.user_id = u.id
      LEFT JOIN events e ON r.event_id = e.id
      ORDER BY r.registered_at DESC
    `);
    
    if (registrations.length === 0) {
      console.log('  No registrations found.');
    } else {
      console.log(`  Total Registrations: ${registrations.length}\n`);
      registrations.forEach((reg, index) => {
        console.log(`  ${index + 1}. ${reg.username} (${reg.email})`);
        console.log(`     Registered for: ${reg.event_title}`);
        console.log(`     Registered on: ${new Date(reg.registered_at).toLocaleString()}`);
        console.log('');
      });
    }

    // Summary Statistics
    console.log('\n📈 SUMMARY STATISTICS:');
    console.log('-'.repeat(50));
    
    const [userCount] = await connection.query('SELECT COUNT(*) as total FROM users');
    const [eventCount] = await connection.query('SELECT COUNT(*) as total FROM events');
    const [regCount] = await connection.query('SELECT COUNT(*) as total FROM registrations');
    const [adminCount] = await connection.query("SELECT COUNT(*) as total FROM users WHERE role = 'admin'");
    
    console.log(`  Total Users: ${userCount[0].total}`);
    console.log(`  - Admins: ${adminCount[0].total}`);
    console.log(`  - Regular Users: ${userCount[0].total - adminCount[0].total}`);
    console.log(`  Total Events: ${eventCount[0].total}`);
    console.log(`  Total Registrations: ${regCount[0].total}`);
    
    // Events by category
    const [eventsByCategory] = await connection.query(`
      SELECT category, COUNT(*) as count 
      FROM events 
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    if (eventsByCategory.length > 0) {
      console.log('\n  Events by Category:');
      eventsByCategory.forEach(cat => {
        console.log(`    - ${cat.category}: ${cat.count}`);
      });
    }

    await connection.end();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Database check completed!\n');
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Fix: Check your MySQL password in backend/.env');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Fix: Database does not exist. Run: backend\\create-database.bat');
    }
    process.exit(1);
  }
}

checkDatabase();

