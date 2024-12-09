const express = require('express');
const router = express.Router();
const gestorController = require('../controllers/gestor_controller'); 

router.post('/registrar', gestorController.registrar);
router.get('/listar', gestorController.listarGestores); 
router.delete('/:id', gestorController.excluirGestor);
router.get('/buscar/:id', gestorController.buscarGestorPorId); 
router.put('/editar/:id', gestorController.editarGestor); 


module.exports = router;