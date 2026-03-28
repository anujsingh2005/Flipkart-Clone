const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const authMiddleware = require('../middleware/auth');

// All wishlist routes require authentication
router.use(authMiddleware);

// Get user's wishlist
router.get('/:userId', wishlistController.getWishlist);

// Add to wishlist
router.post('/:userId', wishlistController.addToWishlist);

// Check if product in wishlist
router.get('/check/:userId/:productId', wishlistController.checkWishlist);

// Remove from wishlist
router.delete('/product/:productId/user/:userId', wishlistController.removeFromWishlist);

// Clear entire wishlist
router.delete('/user/:userId', wishlistController.clearWishlist);

module.exports = router;
