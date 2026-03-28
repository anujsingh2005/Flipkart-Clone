const pool = require('../config/database');

// Get all products with filtering and pagination
exports.getProducts = async (req, res, next) => {
  let connection;
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const { category, search } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category_id = ?';
      params.push(parseInt(category));
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT ${offset}, ${limit}`;

    connection = await pool.getConnection();
    const [results] = await connection.execute(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as count FROM products WHERE 1=1';
    const countParams = [];

    if (category) {
      countQuery += ' AND category_id = ?';
      countParams.push(parseInt(category));
    }

    if (search) {
      countQuery += ' AND (name LIKE ? OR description LIKE ?)';
      countParams.push(`%${search}%`, `%${search}%`);
    }

    const [countResults] = await connection.execute(countQuery, countParams);
    const total = countResults[0].count;

    res.json({
      products: results,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Get single product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [results] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
    connection.release();

    if (results.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(results[0]);
  } catch (error) {
    next(error);
  }
};

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.execute('SELECT * FROM categories ORDER BY name');
    connection.release();
    res.json(results);
  } catch (error) {
    next(error);
  }
};
