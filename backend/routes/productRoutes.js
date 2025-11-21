const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const multer = require("../middleware/uploadMiddleware");

// GET ALL PRODUCTS (public)
router.get("/", productController.getAllProducts);

// GET DESIGNER'S PRODUCTS (protected)
router.get("/my-products", auth, productController.getMyProducts);

// GET PRODUCT BY ID (public)
router.get("/:id", async (req, res) => {
  try {
    const Product = require("../models/Product");
    const prod = await Product.findById(req.params.id);

    if (!prod) return res.status(404).json({ message: "Product not found" });

    res.json(prod);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPLOAD PRODUCT (designer only)
router.post(
  "/upload",
  auth,
  multer.single("image"),
  productController.createProduct
);

module.exports = router;
