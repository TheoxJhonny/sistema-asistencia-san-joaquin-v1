const repo = require('../repositories/admin.repository');
async function index(req, res) { res.render('pages/admin', { title: 'Administración', ...(await repo.datos()) }); }
async function unidad(req, res) { await repo.crearUnidad(req.body); req.flash('success','Unidad creada.'); res.redirect('/admin'); }
async function usuario(req, res) { await repo.crearUsuario(req.body); req.flash('success','Usuario creado.'); res.redirect('/admin'); }
module.exports = { index, unidad, usuario };
