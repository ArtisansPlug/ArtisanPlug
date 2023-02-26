const express = require("express");
const router = express.Router();
const { getSignupsForToday } = require("../controllers/analytics.controller");

router.get("/signups", getSignupsForToday);

module.exports = router;
