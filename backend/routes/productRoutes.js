const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");
const multer = require("../middleware/uploadMiddleware");

// GET ALL PRODUCTS
router.get("/", productController.getAllProducts);

// GET DESIGNER'S PRODUCTS
router.get("/my-products", auth, productController.getMyProducts);

// UPLOAD PRODUCT
router.post(
  "/upload",
  auth,
  multer.single("image"),
  productController.createProduct
);

// DELETE PRODUCT (IMPORTANT: THIS MUST BE BEFORE /:id)
router.delete("/:id", auth, productController.deleteProduct);

// GET PRODUCT BY ID (LAST!)
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

module.exports = router;
