const express = require('express');
const router = express.Router();
const estagiarioController = require('../controllers/estagiarioController');

router.post('/registrar', estagiarioController.registrar);
router.get('/listar', estagiarioController.listar_estagiario);
router.delete('/:id', estagiarioController.excluirEstagiario);

module.exports = router;