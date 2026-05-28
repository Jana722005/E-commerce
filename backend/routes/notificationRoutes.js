const express = require("express");

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:userId", protect, getNotifications);
router.put("/:id", protect, markAsRead);

module.exports = router;