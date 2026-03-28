const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CREATE new order
router.post('/', orderController.createOrder);

// GET user's orders
router.get('/user/:userId', orderController.getUserOrders);

// GET order by ID
router.get('/:orderId', orderController.getOrderById);

module.exports = router;
