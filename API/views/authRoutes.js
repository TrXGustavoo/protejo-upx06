const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login); // Rota única para login

module.exports = router;