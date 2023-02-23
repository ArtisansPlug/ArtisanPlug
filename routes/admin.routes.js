const express = require('express');
const { SwitchToAdmin, AllUsers } = require('../controllers/admin.controllers');

const router = express.Router();


router.post('/switchadmin/:id', SwitchToAdmin);
router.get('/allusers', AllUsers)
module.exports = router;
