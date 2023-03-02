const express = require('express');
const { SignUp, Login, UploadImage, EditUser,  SearchForProviders, AddFavoriteArtisan, Request, Feedback, Rating } = require('../controllers/user.controllers');
const upload = require('../utils/multer');
const {authenticate} = require('../middleware/auth');
const router = express.Router();

router.post('/register', SignUp);
router.post('/login', Login);
router.post('/profile/:id', EditUser);
router.post('/request/:id',authenticate, Request);
router.post('/addfavorite/:id',authenticate, AddFavoriteArtisan);
router.post('/feedback/:id',authenticate, Feedback);
router.post('/rating/:id', Rating);
router.get('/search', SearchForProviders);
router.post('/upload', authenticate, upload.single('image'), UploadImage);
module.exports = router;
