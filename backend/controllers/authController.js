const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const { generateToken } = require('../utils/jwt');

// Signup - Create new user
exports.signup = async (req, res, next) => {
  let connection;
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: { status: 400, message: 'Email, password, and name are required' }
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: { status: 400, message: 'Password must be at least 6 characters' }
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    connection = await pool.getConnection();

    // Check if user already exists
    const [existingUser] = await connection.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        error: { status: 409, message: 'User with this email already exists' }
      });
    }

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (email, name, password_hash, password_salt) VALUES (?, ?, ?, ?)',
      [email, name, password_hash, salt]
    );

    // Get the created user
    const [user] = await connection.execute(
      'SELECT id, email, name FROM users WHERE id = ?',
      [result.insertId]
    );

    const token = generateToken(user[0].id, user[0].email);

    res.status(201).json({
      message: 'Signup successful',
      user: user[0],
      token
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Login - Authenticate user
exports.login = async (req, res, next) => {
  let connection;
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: { status: 400, message: 'Email and password are required' }
      });
    }

    connection = await pool.getConnection();

    // Find user by email
    const [users] = await connection.execute(
      'SELECT id, email, name, password_hash FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: { status: 401, message: 'Invalid email or password' }
      });
    }

    const user = users[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: { status: 401, message: 'Invalid email or password' }
      });
    }

    const token = generateToken(user.id, user.email);

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Validate token
exports.validateToken = async (req, res, next) => {
  let connection;
  try {
    const { userId } = req.user;

    connection = await pool.getConnection();
    const [user] = await connection.execute(
      'SELECT id, email, name FROM users WHERE id = ?',
      [userId]
    );

    if (user.length === 0) {
      return res.status(401).json({
        error: { status: 401, message: 'User not found' }
      });
    }

    res.status(200).json({
      valid: true,
      user: user[0]
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
