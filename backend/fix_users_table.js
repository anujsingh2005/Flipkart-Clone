const pool = require('./config/database');

async function fixUsersTable() {
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Add password columns if they don't exist
    try {
      await connection.execute(
        `ALTER TABLE users ADD COLUMN password_hash VARCHAR(255) NOT NULL`
      );
      console.log('✅ Added password_hash column');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ password_hash column already exists');
      } else {
        throw err;
      }
    }
    
    try {
      await connection.execute(
        `ALTER TABLE users ADD COLUMN password_salt VARCHAR(255)`
      );
      console.log('✅ Added password_salt column');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('✓ password_salt column already exists');
      } else {
        throw err;
      }
    }
    
    console.log('\n✅ Users table schema updated!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
}

fixUsersTable();
