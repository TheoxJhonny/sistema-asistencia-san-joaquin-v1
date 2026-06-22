const authService = require('../services/auth.service');
function loginView(req, res) { res.render('pages/login', { title: 'Ingresar' }); }
async function login(req, res) {
  const user = await authService.login(req.body.correo, req.body.password);
  if (!user) { req.flash('error', 'Credenciales inválidas.'); return res.redirect('/login'); }
  req.session.user = user;
  res.redirect('/dashboard');
}
function logout(req, res) { req.session.destroy(() => res.redirect('/login')); }
module.exports = { loginView, login, logout };
