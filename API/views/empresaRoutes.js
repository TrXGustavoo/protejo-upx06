const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/registrar', empresaController.criarEmpresa);
router.get('/', empresaController.listarEmpresas);
router.put('/:id', empresaController.editarEmpresa);
router.delete('/:id', empresaController.excluirEmpresa);
router.post('/login', empresaController.loginEmpresa); 

module.exports = router;