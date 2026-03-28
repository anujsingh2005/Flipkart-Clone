const pool = require('./config/database');
const bcrypt = require('bcryptjs');

async function createDemoUser() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const hashedPassword = await bcrypt.hash('demo123456', 10);
    
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      ['Demo User', 'demo@flipkart.com', hashedPassword]
    );
    
    console.log('✅ Demo user created!');
    console.log(`   ID: ${result.insertId}`);
    console.log('   Email: demo@flipkart.com');
    console.log('   Password: demo123456');
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('✅ Demo user already exists');
    } else {
      console.error('Error:', error.message);
    }
    process.exit(0);
  } finally {
    if (connection) connection.release();
  }
}

createDemoUser();
