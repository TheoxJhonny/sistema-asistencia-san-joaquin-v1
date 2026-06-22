const router = require('express').Router();
const c = require('../controllers/auth.controller');
router.get('/', (req, res) => res.redirect('/login'));
router.get('/login', c.loginView);
router.post('/login', c.login);
router.post('/logout', c.logout);
module.exports = router;
