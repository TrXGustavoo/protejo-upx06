const express = require('express');
const router = express.Router();
const gestorController = require('../controllers/gestor_controller'); 

router.post('/registrar', gestorController.registrar); 

module.exports = router;