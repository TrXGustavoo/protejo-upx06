const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professorController'); 

router.post('/registrar', professorController.registrar); 

module.exports = router;