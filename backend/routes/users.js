const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET or create default user
router.get('/default', userController.getDefaultUser);

module.exports = router;
