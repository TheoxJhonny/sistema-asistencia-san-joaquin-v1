const router = require('express').Router();
const { allowRoles } = require('../middleware/auth');
const c = require('../controllers/porteria.controller');
router.get('/', allowRoles('Administrador','Guardia'), c.index);
router.post('/:id/ingreso', allowRoles('Administrador','Guardia'), c.registrar);
module.exports = router;
