const router = require('express').Router();
const { allowRoles } = require('../middleware/auth');
const c = require('../controllers/reportes.controller');
router.get('/', allowRoles('Administrador','Funcionario'), c.index);
module.exports = router;
