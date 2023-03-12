const express = require('express');
const { isAuth } = require('../middleware/isAuth');
const upload  = require('../utils/artisanMulter');
const { createProvider, verifyEmail, providerForm, deleteProvider } = require('../controllers/provider.controller');
const { createArtisan, artistView, updateArtisan, artistDelete } = require('../controllers/artisanWork.controller');
const { alertMessage } = require('../controllers/request.alert.controller');
const { artisanPaystack } = require('../controllers/transaction.controller');
const router = express.Router();






// Provider to create Profile
router.post('/createProvider', isAuth, createProvider);
router.get('/verifyingEmail/:id', verifyEmail);
router.delete('/delete', isAuth, deleteProvider);
router.put('/update', isAuth, providerForm);



// Artisan to display their works
router.post('/upload', isAuth, upload.array('file', 4), createArtisan);
router.get('/viewArtisan', isAuth, artistView);
router.put('/artisanUpdate', isAuth, upload.array('file', 4), updateArtisan);
router.delete('/deleteArtisan', isAuth, artistDelete);



// Users to send message to Artisan (Requesting Message) Contact form
router.post('/requestContact', isAuth, alertMessage);




// Paystack or any other payment channels
router.post('/paystack', artisanPaystack );









module.exports = router;