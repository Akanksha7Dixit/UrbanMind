const express = require("express");

const {
  getScenarios,
  getScenario,
  createScenario,
  updateScenario,
  deleteScenario,
} = require("../controllers/scenarioController");

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

/*
  GET ALL SCENARIOS
  Admin + Planner
*/
router.get(
  "/",
  protect,
  authorize("admin", "planner"),
  getScenarios
);

/*
  GET SINGLE SCENARIO
  Admin + Planner
*/
router.get(
  "/:id",
  protect,
  authorize("admin", "planner"),
  getScenario
);

/*
  CREATE SCENARIO
  Admin + Planner
*/
router.post(
  "/",
  protect,
  authorize("admin", "planner"),
  createScenario
);

/*
  UPDATE SCENARIO
  Admin + Planner
*/
router.put(
  "/:id",
  protect,
  authorize("admin", "planner"),
  updateScenario
);

/*
  DELETE SCENARIO
  Admin + Planner
*/
router.delete(
  "/:id",
  protect,
  authorize("admin", "planner"),
  deleteScenario
);

module.exports = router;