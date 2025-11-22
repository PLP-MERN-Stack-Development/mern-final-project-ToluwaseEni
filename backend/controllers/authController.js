const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function createToken(user) {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not set in env!');
    throw new Error('JWT secret missing on server. Check env.');
  }
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
}

/* ================================================================
   REGISTER
================================================================ */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: 'Name, email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    let user = await User.findOne({ email: normalizedEmail });
    if (user) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });
    await user.save();

    const token = createToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ================================================================
   LOGIN
================================================================ */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: 'Email and password required' });

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user)
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);

    // Legacy falling-back to plaintext check
    if (!isMatch) {
      if (user.password === password) {
        console.warn(
          `Legacy plaintext password detected for user ${user.email}. Re-hashing.`
        );
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      } else {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
    }

    const token = createToken(user);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/* ================================================================
   GET CURRENT USER /auth/me
   (Fixed to match login/register user format)
================================================================ */
exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // ⭐ FIX: return **same shape** as login/register
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('ME error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
