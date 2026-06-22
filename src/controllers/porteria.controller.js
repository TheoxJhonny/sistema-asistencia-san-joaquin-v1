const repo = require('../repositories/porteria.repository');
async function index(req, res) { res.render('pages/porteria', { title: 'Portería', esperados: await repo.esperadosHoy() }); }
async function registrar(req, res) { await repo.registrar(req.params.id, req.session.user); req.flash('success','Ingreso efectivo registrado.'); res.redirect('/porteria'); }
module.exports = { index, registrar };
