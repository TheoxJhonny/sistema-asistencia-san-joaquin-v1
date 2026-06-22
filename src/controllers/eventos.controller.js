const repo = require('../repositories/eventos.repository');
const { validarRut } = require('../utils/rut');
async function index(req, res) { res.render('pages/eventos', { title: 'Eventos', eventos: await repo.listar(req.session.user), opciones: await repo.opciones(req.session.user) }); }
async function store(req, res) { await repo.crear(req.body, req.session.user); req.flash('success','Evento creado correctamente.'); res.redirect('/eventos'); }
async function anfitrion(req, res) { await repo.agregarAnfitrion(req.params.id, req.body.id_usuario); req.flash('success','Anfitrión agregado.'); res.redirect('/eventos'); }
async function invitar(req, res) {
  if (req.body.tipo_documento === 'RUT' && !validarRut(req.body.numero_documento)) { req.flash('error','El RUT ingresado no es válido.'); return res.redirect('/eventos'); }
  await repo.invitar(req.body, req.session.user); req.flash('success','Visitante invitado correctamente.'); res.redirect('/eventos');
}
module.exports = { index, store, anfitrion, invitar };
