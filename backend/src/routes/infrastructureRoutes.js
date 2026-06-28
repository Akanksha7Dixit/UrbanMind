const express = require("express");

const {
  getInfrastructure,
  createInfrastructure,
  updateInfrastructure,
  deleteInfrastructure,
} = require("../controllers/infrastructureController");

const { protect } = require("../middleware/authMiddleware");

const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  protect,
  getInfrastructure
);

router.post(
  "/",
  protect,
  authorize("admin", "planner"),
  createInfrastructure
);

router.put(
  "/:id",
  protect,
  authorize("admin", "planner"),
  updateInfrastructure
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "planner"),
  deleteInfrastructure
);

module.exports = router;