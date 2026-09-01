const express =
    require("express");

const {
    chat,
    health,
} = require(
    "../controllers/aiController"
);

const {
    protect,
} = require(
    "../middleware/authMiddleware"
);


const router =
    express.Router();


/* =========================================
   AI CHAT
========================================= */

router.post(
    "/chat",
    protect,
    chat
);


/* =========================================
   AI HEALTH
========================================= */

router.get(
    "/health",
    protect,
    health
);


module.exports =
    router;