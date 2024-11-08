const express = require('express');
const router = express.Router();
const estagiarioController = require('../controllers/estagiarioController');

router.post('/registrar', estagiarioController.registrar);

module.exports = router;