const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const configuredOrigins = [
  ...(process.env.ALLOWED_ORIGINS || '').split(','),
  process.env.FRONTEND_URL || '',
].map((origin) => origin.trim()).filter(Boolean);

// ================= MIDDLEWARE =================
app.use(cors({
  origin(origin, callback) {
    if (!origin || configuredOrigins.length === 0 || configuredOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

const productImagesDirectory = path.resolve(__dirname, '../frontend/public/products');

if (fs.existsSync(productImagesDirectory)) {
  app.use('/products', express.static(productImagesDirectory));
}

// ================= ROUTES =================
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);

// ================= HEALTH CHECK =================
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// ================= DATABASE =================
const pool = require('./config/database');

async function testDB() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products');
    connection.release();
    console.log('MySQL Connected Successfully');
    console.log(`Products in DB: ${rows[0].count}`);
  } catch (err) {
    console.error('Database Connection Failed:', err.message);
  }
}

testDB();

// ================= ERROR HANDLING =================
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

app.use(notFoundHandler);
app.use(errorHandler);

// ================= SERVER START =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Database: MySQL');
});
