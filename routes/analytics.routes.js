const express = require("express");
const router = express.Router();
const { getSignupsForToday } = require("../controllers/analytics.controller");
const { authenticate, isAdmin} = require("../middleware/auth");

router.get("/signups", authenticate, isAdmin, getSignupsForToday);

module.exports = router;
