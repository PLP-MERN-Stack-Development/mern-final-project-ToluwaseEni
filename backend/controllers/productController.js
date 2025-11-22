const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    // store path without leading slash
    const imagePath = `uploads/products/${req.file.filename}`;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imagePath,
      designer: req.user?.id || req.user?._id,
    });

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("createProduct error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET DESIGNER'S PRODUCTS (protected)
exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      designer: req.user?.id || req.user?._id,
    }).sort({ createdAt: -1 });

    res.json(Array.isArray(products) ? products : []);
  } catch (err) {
    console.error("getMyProducts error:", err);
    res.status(500).json({ message: "Could not fetch products" });
  }
};

// GET ALL PRODUCTS (PUBLIC)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(Array.isArray(products) ? products : []);
  } catch (err) {
    console.error("getAllProducts error:", err);
    res.status(500).json({ message: "Could not load products" });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // only the designer who uploaded the product can delete it
    if (product.designer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    // delete image file if exists
    if (product.image) {
      const imagePath = path.join(__dirname, "..", product.image);

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn("Image delete warning:", err.message);
          // continue even if image deletion fails
        }
      });
    }

    // delete from DB
    await Product.findByIdAndDelete(productId);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    res.status(500).json({ message: "Server error deleting product" });
  }
};
