const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const verificarEmpresa = require('../middlewares/verificarEmpresa'); 
const verificarGestor = require('../middlewares/verificarGestor'); 


router.post('/registrar', empresaController.criarEmpresa);
router.get('/', empresaController.listarEmpresas);
router.put('/:id', empresaController.editarEmpresa);
router.delete('/:id', empresaController.excluirEmpresa);
router.post('/login', empresaController.loginEmpresa); 
router.get('/buscar/:id', empresaController.buscarEmpresaPorId);


router.post('/gestores', verificarEmpresa, empresaController.cadastrarGestor);
router.put('/estagiarios/:id/vincular', verificarGestor, empresaController.atribuirEstagiario); 


router.get('/:id/gestores', verificarEmpresa, empresaController.listarGestoresDaEmpresa);
router.get('/:id/estagiarios', verificarEmpresa, empresaController.listarEstagiariosDaEmpresa);

module.exports = router;