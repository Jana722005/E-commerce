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

const router = express.Router();

const upload = require(
  "../middleware/uploadMiddleware"
);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile/:id", getProfile);

router.put(
  "/profile/:id",
  upload.single("profileImage"),
  updateProfile
);

router.post(
  "/wishlist/:userId",
  addToWishlist
);

router.get(
  "/wishlist/:userId",
  getWishlist
);

router.delete(
  "/wishlist/:userId/:productId",
  removeFromWishlist
);

module.exports = router;