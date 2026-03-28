const bcrypt = require('bcryptjs');
const pool = require('../config/database');

// Get or create default user
exports.getDefaultUser = async (req, res, next) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [results] = await connection.execute('SELECT * FROM users WHERE email = ?', [
      'demo@flipkart.com',
    ]);

    let user;
    if (results.length === 0) {
      const demoPassword = 'demo123456';
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(demoPassword, salt);

      const [insertResult] = await connection.execute(
        'INSERT INTO users (email, name, password_hash, password_salt) VALUES (?, ?, ?, ?)',
        ['demo@flipkart.com', 'Demo User', passwordHash, salt]
      );

      user = {
        id: insertResult.insertId,
        email: 'demo@flipkart.com',
        name: 'Demo User',
      };
    } else {
      user = results[0];
    }

    res.json(user);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
