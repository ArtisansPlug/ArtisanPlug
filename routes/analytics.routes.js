const express = require("express");
const router = express.Router();
const { getSignupsForToday, getProviderSignupsForToday } = require("../controllers/admin/analytics.controller");
const { authenticate, isAdmin} = require("../middleware/auth");

router.get("/signups", authenticate, isAdmin, getSignupsForToday);
router.get("/providers/signups", authenticate, isAdmin, getProviderSignupsForToday);

module.exports = router;
