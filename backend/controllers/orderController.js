const pool = require('../config/database');
const { sendOrderConfirmationEmail } = require('../utils/emailService');

// Create new order
exports.createOrder = async (req, res, next) => {
  try {
    const { userId, items, shippingAddress, totalAmount } = req.body;
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Create order
      const [orderResult] = await connection.execute(
        `INSERT INTO orders (user_id, total_amount, status, shipping_address)
         VALUES (?, ?, ?, ?)`,
        [userId, totalAmount, 'confirmed', JSON.stringify(shippingAddress)]
      );

      const orderId = orderResult.insertId;

      // Insert order items
      for (const item of items) {
        await connection.execute(
          `INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
           VALUES (?, ?, ?, ?)`,
          [orderId, item.productId, item.quantity, item.price]
        );
      }

      // Clear cart
      await connection.execute('DELETE FROM cart WHERE user_id = ?', [userId]);

      await connection.commit();

      // Fetch the created order with items
      const [orders] = await connection.execute('SELECT * FROM orders WHERE id = ?', [orderId]);
      const order = orders[0];

      // Fetch order items for email before releasing connection
      const [orderItems] = await connection.execute(
        `SELECT oi.id, oi.product_id, p.name as product_name, p.images, oi.quantity, oi.price_at_purchase
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [orderId]
      );

      connection.release();

      // Send confirmation email asynchronously (don't wait for it)
      const customerEmail = shippingAddress?.email;
      if (customerEmail) {
        // Send email async without awaiting
        sendOrderConfirmationEmail(order, orderItems, customerEmail).catch((err) => {
          console.error('Email sending error (not critical):', err);
        });
      }

      res.status(201).json({
        message: 'Order placed successfully',
        order: {
          ...order,
          items: orderItems.map((item) => ({
            ...item,
            name: item.product_name,
          })),
        },
      });
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (error) {
    next(error);
  }
};

// Get user's orders
exports.getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const connection = await pool.getConnection();

    const [results] = await connection.execute(
      `SELECT o.id, o.total_amount, o.status, o.created_at, o.shipping_address
       FROM orders o
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    // Get items for each order
    for (let order of results) {
      const [items] = await connection.execute(
        `SELECT oi.id, oi.product_id, p.name as product_name, p.images, oi.quantity, oi.price_at_purchase
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = ?`,
        [order.id]
      );
      order.order_items = items;
    }

    connection.release();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// Get order by ID
exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const connection = await pool.getConnection();

    const [orderResults] = await connection.execute('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (orderResults.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Order not found' });
    }

    const [itemResults] = await connection.execute(
      `SELECT oi.id, oi.product_id, p.name, p.images, oi.quantity, oi.price_at_purchase
       FROM order_items oi
       JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    connection.release();

    const order = orderResults[0];
    order.items = itemResults;

    res.json(order);
  } catch (error) {
    next(error);
  }
};
