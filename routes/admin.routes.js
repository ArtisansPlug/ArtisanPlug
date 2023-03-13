const express = require('express');
const { SwitchToAdmin, AllUsers, countUsersAndArtisans, softDeleteUser, createAlert, fetchAllAlerts, fetchActiveAlerts } = require('../controllers/admin/admin.controllers');
const { authenticate, isAdmin} = require("../middleware/auth");
const router = express.Router();


router.put('/switchadmin/:id', authenticate, isAdmin, SwitchToAdmin);
router.get('/allusers',authenticate, isAdmin, AllUsers);
router.get("/counts", authenticate, isAdmin, countUsersAndArtisans);
router.delete('/delete/:id', authenticate, isAdmin, softDeleteUser);
router.post('/create-alert', authenticate, isAdmin,createAlert);
router.get('/fetch-alert', fetchAllAlerts);
router.get('/fetch-active-alert', fetchActiveAlerts);

module.exports = router;
