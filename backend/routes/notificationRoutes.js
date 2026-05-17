const express = require("express");

const {
  getNotifications,
  markAsRead,
} = require(
  "../controllers/notificationController"
);

const router = express.Router();

router.get("/:userId", getNotifications);

router.put("/:id", markAsRead);

module.exports = router;