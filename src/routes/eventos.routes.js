const router = require('express').Router();
const { allowRoles } = require('../middleware/auth');
const c = require('../controllers/eventos.controller');
router.get('/', allowRoles('Administrador','Funcionario'), c.index);
router.post('/', allowRoles('Administrador','Funcionario'), c.store);
router.post('/:id/anfitriones', allowRoles('Administrador','Funcionario'), c.anfitrion);
router.post('/invitar', allowRoles('Administrador','Funcionario'), c.invitar);
module.exports = router;
