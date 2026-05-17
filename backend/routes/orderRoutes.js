const express = require(
  "express"
);

const router =
  express.Router();

const {

  placeOrder,

  getUserOrders,

  getAllOrders,

  updateOrderStatus,

} = require(
  "../controllers/orderController"
);

// PLACE ORDER
router.post(
  "/",
  placeOrder
);

// GET USER ORDERS
router.get(
  "/my-orders",
  getUserOrders
);

// GET ALL ORDERS (ADMIN)
router.get(
  "/",
  getAllOrders
);

// UPDATE ORDER STATUS
router.put(
  "/:id",
  updateOrderStatus
);

module.exports = router;