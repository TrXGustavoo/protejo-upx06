const express = require('express');
const router = express.Router();
const estagiarioController = require('../controllers/estagiarioController');
const estagiarioAuthController = require('../controllers/estagiarioAuthController');

router.post('/registrar', estagiarioController.registrar);
router.get('/listar', estagiarioController.listar_estagiario);
router.delete('/:id', estagiarioController.excluirEstagiario);
router.put('/editar/:id', estagiarioController.editarEstagiario);
router.get('/buscar/:id', estagiarioController.buscarEstagiarioPorId);

module.exports = router;