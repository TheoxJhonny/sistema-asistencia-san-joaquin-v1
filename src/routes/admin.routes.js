const router = require('express').Router();
const { allowRoles } = require('../middleware/auth');
const c = require('../controllers/admin.controller');
router.get('/', allowRoles('Administrador'), c.index);
router.post('/unidades', allowRoles('Administrador'), c.unidad);
router.post('/usuarios', allowRoles('Administrador'), c.usuario);
module.exports = router;
