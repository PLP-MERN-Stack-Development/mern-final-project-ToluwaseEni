// controllers/productController.js
const Product = require('../models/Product');

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    // store path without leading slash; express.static("/uploads", "uploads") serves at /uploads/...
    const imagePath = `uploads/products/${req.file.filename}`;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imagePath,
      designer: req.user?.id || req.user?._id,
    });

    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET DESIGNER'S PRODUCTS (protected)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ designer: req.user?.id || req.user?._id }).sort({ createdAt: -1 });
    res.json(Array.isArray(products) ? products : []);
  } catch (err) {
    console.error('getMyProducts error:', err);
    res.status(500).json({ message: 'Could not fetch products' });
  }
};

// GET ALL PRODUCTS (PUBLIC)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(Array.isArray(products) ? products : []);
  } catch (err) {
    console.error('getAllProducts error:', err);
    res.status(500).json({ message: 'Could not load products' });
  }
};
