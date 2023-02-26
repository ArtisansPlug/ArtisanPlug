const express = require('express');
const { SwitchToAdmin, AllUsers, countUsersAndArtisans, softDeleteUser } = require('../controllers/admin.controllers');
const { authenticate, isAdmin} = require("../middleware/auth");
const router = express.Router();


router.put('/switchadmin/:id', SwitchToAdmin);
router.get('/allusers', authenticate, isAdmin, AllUsers);
router.get("/counts", authenticate, isAdmin, countUsersAndArtisans);
router.delete('/delete/:id', authenticate, isAdmin, softDeleteUser);

module.exports = router;
