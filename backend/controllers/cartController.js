const pool = require('../config/database');

// Get all cart items for a user
exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const connection = await pool.getConnection();

    const [results] = await connection.execute(
      `SELECT c.id, c.quantity, p.id as product_id, p.name, p.price, p.images, p.stock
       FROM cart c
       JOIN products p ON c.product_id = p.id
       WHERE c.user_id = ?
       ORDER BY c.added_at DESC`,
      [userId]
    );

    connection.release();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// Add item to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const connection = await pool.getConnection();

    // Check if product already in cart
    const [checkResults] = await connection.execute(
      'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    let result;
    if (checkResults.length > 0) {
      // Update quantity
      await connection.execute(
        'UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
        [quantity, userId, productId]
      );
      const [updatedResults] = await connection.execute(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      result = updatedResults[0];
    } else {
      // Insert new item
      await connection.execute(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
      const [insertedResults] = await connection.execute(
        'SELECT * FROM cart WHERE user_id = ? AND product_id = ?',
        [userId, productId]
      );
      result = insertedResults[0];
    }

    connection.release();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const connection = await pool.getConnection();

    if (quantity <= 0) {
      // Delete if quantity is 0 or negative
      await connection.execute('DELETE FROM cart WHERE id = ?', [cartItemId]);
      connection.release();
      return res.json({ message: 'Item removed from cart' });
    }

    await connection.execute('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartItemId]);
    const [results] = await connection.execute('SELECT * FROM cart WHERE id = ?', [cartItemId]);

    connection.release();

    if (results.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json(results[0]);
  } catch (error) {
    next(error);
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;
    const connection = await pool.getConnection();

    const [checkResults] = await connection.execute('SELECT * FROM cart WHERE id = ?', [cartItemId]);
    await connection.execute('DELETE FROM cart WHERE id = ?', [cartItemId]);

    connection.release();

    if (checkResults.length === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart', item: checkResults[0] });
  } catch (error) {
    next(error);
  }
};

// Clear entire cart for a user
exports.clearCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const connection = await pool.getConnection();

    await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);
    connection.release();

    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};
