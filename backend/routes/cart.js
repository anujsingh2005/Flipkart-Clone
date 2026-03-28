const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET cart items for a user
router.get('/:userId', cartController.getCart);

// ADD item to cart
router.post('/:userId', cartController.addToCart);

// UPDATE cart item quantity
router.put('/:cartItemId', cartController.updateCartItem);

// REMOVE item from cart
router.delete('/:cartItemId', cartController.removeFromCart);

// CLEAR entire cart
router.delete('/user/:userId', cartController.clearCart);

module.exports = router;
