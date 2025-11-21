// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set in env!');
    // Throwing helps catch config problems early instead of silent failures
    throw new Error('JWT secret missing on server. Check env.');
  }
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Register a new user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists (case-insensitive via normalized email)
    let user = await User.findOne({ email: normalizedEmail });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({ name, email: normalizedEmail, password: hashedPassword, role });
    await user.save();

    // Create token
    const token = createToken(user);

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user exists
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // LEGACY-FALLBACK: If compare fails but DB has plain-text password (dev-mistake), rehash & save.
    if (!isMatch) {
      // If stored password matches plain text (legacy), re-hash and continue
      if (user.password === password) {
        console.warn(`Legacy plaintext password detected for user ${user.email}. Re-hashing.`);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // now set isMatch true for flow below
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    // Create token
    const token = createToken(user);

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
