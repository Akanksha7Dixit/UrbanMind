const express = require("express");

const {
  getInfrastructure,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
} = require("../controllers/infrastructureController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorize,
} = require("../middleware/roleMiddleware");

const router = express.Router();


// ==========================================
// GET
// ==========================================

router.get(
  "/",
  protect,
  getInfrastructure
);


// ==========================================
// CREATE
// ==========================================

router.post(
  "/",
  protect,
  authorize("admin", "planner"),
  createInfrastructure
);


// ==========================================
// UPDATE
// ==========================================

router.put(
  "/:id",
  protect,
  authorize("admin", "planner"),
  updateInfrastructure
);


// ==========================================
// DELETE
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize("admin", "planner"),
  deleteInfrastructure
);


module.exports = router;