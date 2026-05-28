const express = require("express");

const {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected user routes
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);

// Administrative routes
router.get("/", protect, admin, getAllOrders);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;