const express = require("express");

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile/:id", protect, getProfile);
router.put("/profile/:id", protect, upload.single("profileImage"), updateProfile);

router.post("/wishlist/:userId", protect, addToWishlist);
router.get("/wishlist/:userId", protect, getWishlist);
router.delete("/wishlist/:userId/:productId", protect, removeFromWishlist);

module.exports = router;