const express = require("express");

const {
  chat,
  health,
} = require("../controllers/aiController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// AI chat requires authentication
router.post("/chat", protect, chat);

// AI health also requires authentication
router.get("/health", protect, health);

module.exports = router;