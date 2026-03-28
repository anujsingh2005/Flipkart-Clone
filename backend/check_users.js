const pool = require('./config/database');

async function checkUsers() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const [users] = await connection.execute('SELECT id, email, name FROM users');
    
    console.log('Users in database:');
    if (users.length === 0) {
      console.log('❌ No users found!');
    } else {
      users.forEach(u => {
        console.log(`  - ID: ${u.id}, Email: ${u.email}, Name: ${u.name}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

checkUsers();
