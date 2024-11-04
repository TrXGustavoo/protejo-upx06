const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registrar', usuarioController.registrar);

module.exports = router;