function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}
function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    if (!roles.includes(req.session.user.rol)) {
      req.flash('error', 'No tienes permisos para acceder a esta sección.');
      return res.redirect('/dashboard');
    }
    next();
  };
}
module.exports = { requireAuth, allowRoles };
