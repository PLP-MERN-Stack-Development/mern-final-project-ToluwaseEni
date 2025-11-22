const express = require('express');
const router = express.Router();

const { register, login, me } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');  // FIXED import

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// @route   GET /api/auth/me  (Return logged-in user)
router.get('/me', authMiddleware, me);

module.exports = router;
