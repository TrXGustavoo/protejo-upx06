const express = require('express');
const router = express.Router();
const professorController = require('../controllers/gestor_controller'); 

router.post('/registrar', professorController.registrar); 

module.exports = router;