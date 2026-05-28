const express = require("express");

const {
  createProduct,
  getProducts,
  addReview,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, admin } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// Public routes
router.get("/", getProducts);

// Protected routes
router.post("/:id/reviews", protect, addReview);

// Administrative routes
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;