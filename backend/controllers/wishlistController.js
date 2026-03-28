const pool = require('../config/database');

const getAuthorizedUserId = (req) => {
  const authenticatedUserId = Number(req.user?.userId);
  const requestedUserId = req.params.userId ? Number(req.params.userId) : authenticatedUserId;

  if (!Number.isInteger(authenticatedUserId)) {
    return {
      error: { status: 401, message: 'Invalid authenticated user' }
    };
  }

  if (!Number.isInteger(requestedUserId)) {
    return {
      error: { status: 400, message: 'Invalid user id' }
    };
  }

  if (requestedUserId !== authenticatedUserId) {
    return {
      error: { status: 403, message: 'You can only access your own wishlist' }
    };
  }

  return { userId: authenticatedUserId };
};

const ensureUserExists = async (connection, userId) => {
  const [users] = await connection.execute(
    'SELECT id FROM users WHERE id = ?',
    [userId]
  );

  return users.length > 0;
};

// Get user's wishlist
exports.getWishlist = async (req, res, next) => {
  let connection;
  try {
    const authorization = getAuthorizedUserId(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ error: authorization.error });
    }

    const { userId } = authorization;
    connection = await pool.getConnection();

    const userExists = await ensureUserExists(connection, userId);
    if (!userExists) {
      return res.status(401).json({
        error: { status: 401, message: 'Authenticated user no longer exists' }
      });
    }

    const [results] = await connection.execute(
      `SELECT p.*, p.id as product_id, w.id as wishlist_id FROM wishlist w
       JOIN products p ON w.product_id = p.id
       WHERE w.user_id = ?
       ORDER BY w.added_at DESC`,
      [userId]
    );

    res.json(results);
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Add to wishlist
exports.addToWishlist = async (req, res, next) => {
  let connection;
  try {
    const authorization = getAuthorizedUserId(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ error: authorization.error });
    }

    const { userId } = authorization;
    const { productId } = req.body;

    if (!Number.isInteger(Number(productId))) {
      return res.status(400).json({
        error: { status: 400, message: 'Valid productId is required' }
      });
    }

    connection = await pool.getConnection();

    const userExists = await ensureUserExists(connection, userId);
    if (!userExists) {
      return res.status(401).json({
        error: { status: 401, message: 'Authenticated user no longer exists' }
      });
    }

    const [products] = await connection.execute(
      'SELECT id FROM products WHERE id = ?',
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        error: { status: 404, message: 'Product not found' }
      });
    }

    // Check if already in wishlist
    const [existing] = await connection.execute(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        error: { status: 400, message: 'Product already in wishlist' }
      });
    }

    // Add to wishlist
    const [result] = await connection.execute(
      'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );

    res.status(201).json({
      message: 'Added to wishlist',
      id: result.insertId
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res, next) => {
  let connection;
  try {
    const authorization = getAuthorizedUserId(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ error: authorization.error });
    }

    const { userId } = authorization;
    const { productId } = req.params;

    connection = await pool.getConnection();

    const userExists = await ensureUserExists(connection, userId);
    if (!userExists) {
      return res.status(401).json({
        error: { status: 401, message: 'Authenticated user no longer exists' }
      });
    }

    const [result] = await connection.execute(
      'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: { status: 404, message: 'Item not found in wishlist' }
      });
    }

    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Check if product in wishlist
exports.checkWishlist = async (req, res, next) => {
  let connection;
  try {
    const authorization = getAuthorizedUserId(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ error: authorization.error });
    }

    const { userId } = authorization;
    const { productId } = req.params;

    connection = await pool.getConnection();

    const userExists = await ensureUserExists(connection, userId);
    if (!userExists) {
      return res.status(401).json({
        error: { status: 401, message: 'Authenticated user no longer exists' }
      });
    }

    const [results] = await connection.execute(
      'SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    res.json({
      inWishlist: results.length > 0
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

// Clear entire wishlist
exports.clearWishlist = async (req, res, next) => {
  let connection;
  try {
    const authorization = getAuthorizedUserId(req);
    if (authorization.error) {
      return res.status(authorization.error.status).json({ error: authorization.error });
    }

    const { userId } = authorization;

    connection = await pool.getConnection();

    const userExists = await ensureUserExists(connection, userId);
    if (!userExists) {
      return res.status(401).json({
        error: { status: 401, message: 'Authenticated user no longer exists' }
      });
    }

    await connection.execute(
      'DELETE FROM wishlist WHERE user_id = ?',
      [userId]
    );

    res.json({ message: 'Wishlist cleared' });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
