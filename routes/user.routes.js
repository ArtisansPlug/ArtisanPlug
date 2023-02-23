const express = require('express');
const { SignUp, Login, UploadImage, EditUser } = require('../controllers/user.controllers');
const upload = require('../utils/multer');
const authenticate = require('../middleware/auth');
const router = express.Router();

router.post('/register', SignUp);
router.post('/login', Login);
router.post('/profile/:id', EditUser);
router.post('/upload', authenticate, upload.single('image'), UploadImage);
module.exports = router;
